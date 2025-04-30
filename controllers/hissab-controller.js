const { isLoggedin } = require("../middleware/auth-middlewares");
const hissabModel = require("../models/hissab-model");
const userModel = require("../models/user-model");

module.exports.CreateHissabController = async (req,res)=>{
   let{title,description,encrypted,shareable,passcode,editpermissions} = req.body;

    encrypted = encrypted === "on" ? true:false;
    shareable = shareable === "on" ? true:false;
    editpermissions = editpermissions === "on" ? true:false;

 try{ let hissabCreated = await hissabModel.create({
  title,
  description,
  user:req.user._id,
  passcode,
  encrypted,
  shareable,
  editpermissions
});

let user = await userModel.findOne({email:req.user.email});
user.hissab.push(hissabCreated._id);
await user.save();
res.redirect("/profile")
 }
 catch(err){
   res.send(err.message)
 }
 
}

module.exports.hissabPageController = async(req,res)=>{
 res.render("create");
}
module.exports.readHissabcontroller = async(req,res)=>{
  const id = req.params.id;
  const hissab = await hissabModel.findOne({
    _id:id
  })
  if(!hissab){
    return res.redirect('/profile')
  }

  if(hissab.encrypted){
    return res.render("passcode",{isLoggedin:true,id})
  }

  res.render("hissab",{isLoggedin:true,hissab})
}

module.exports.readVerifiedHissabController = async(req,res)=>{
  const id = req.params.id;
  const hissab = await hissabModel.findOne({
    _id:id
  })
  if(!hissab){
    return res.redirect('/profile')
  }
  if(hissab.passcode !== req.body.passcode){
    return res.redirect("/profile")
  }

  return res.render("hissab",{isLoggedin:true,hissab});
};

module.exports.deleteController = async(req,res)=>{
  const id = req.params.id;
  const hissab = await hissabModel.findOne({
    _id:id,
    user:req.user.id
  });
if(!hissab){
  return res.redirect("/profile")
}
await hissabModel.deleteOne({
  _id:id
});
return res.redirect('/profile')
};

module.exports.editController = async(req,res)=>{
  const id = req.params.id;
  const hissab = await hissabModel.findOne({
    _id:id
  })
  if(!hissab){
    return res.redirect('/profile');
  }
  return res.render("edit",{isLoggedin:true,hissab});
}
module.exports.editPostController = async(req,res)=>{
  const id = req.params.id;
  const hissab = await hissabModel.findOne({
    _id:id
  })
  if(!hissab){
    return res.redirect('/profile');
  }

  hissab.title = req.body.title;
  hissab.description = req.body.description;
  hissab.encrypted = req.body.encrypted == 'on'? true:false;
  hissab.editpermissions = req.body.editpermissions = 'on'?true:false;
  hissab.passcode = req.body.passcode;
  hissab.shareable = req.body.shareable == 'on' ? true:false;


  await hissab.save()
  res.redirect('/profile');
}