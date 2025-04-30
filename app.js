const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require("cookie-parser");

require("dotenv").config();

const indexrouter = require('./routes/indexrouter')
const hissabRouter = require('./routes/hissab-router')
const db = require("./config/mongoose-connection")

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());

app.use('/',indexrouter);
app.use("/hissab",hissabRouter)

app.listen(3000)