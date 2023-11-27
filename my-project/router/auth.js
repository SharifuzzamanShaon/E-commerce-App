const { signUp, signIn, googleAuth } = require('../controller/auth')

const router = require('express').Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/google", googleAuth)
module.exports = router