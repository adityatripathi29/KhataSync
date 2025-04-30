const express = require('express');
const router = express.Router()
const { CreateHissabController, hissabPageController,readHissabcontroller,readVerifiedHissabController, deleteController,editController,editPostController } = require('../controllers/hissab-controller')

const { isLoggedin, redirectifLoggedin } = require('../middleware/auth-middlewares')

router.get("/create",isLoggedin,hissabPageController)
router.post("/create",isLoggedin,CreateHissabController)

router.get("/view/:id",isLoggedin,readHissabcontroller);

router.get("/delete/:id",isLoggedin,deleteController);
router.get("/edit/:id",isLoggedin,editController);
router.post("/edit/:id",isLoggedin,editPostController);

router.post("/verify/:id",isLoggedin,readVerifiedHissabController);

module.exports = router;