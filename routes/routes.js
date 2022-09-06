const { Router } = require('express')
const userContoller = require('../controller/userContoller')
const router = Router()

router.get('/signuser', userContoller.SignUpGet)

router.get('/login', userContoller.LoginUpGet)

router.post('/signupPost', userContoller.SignUPost)

router.post('/loginPost', userContoller.LoginUpPost)

router.get('/logout', userContoller.logoutGet)

module.exports = router 