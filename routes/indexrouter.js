const express = require('express')
const router = express.Router()
const {landingpagecontroller,registerpagecontroller,RegisterController, loginController, logoutController, profileController} = require('../controllers/index-controller')
const { isLoggedin, redirectifLoggedin } = require('../middleware/auth-middlewares')

router.get('/',redirectifLoggedin,landingpagecontroller)

router.get('/register',registerpagecontroller)
router.post('/register',RegisterController)
router.post('/login',loginController)
router.get('/profile',isLoggedin,profileController)

router.get('/logout',logoutController)

module.exports = router