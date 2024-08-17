const { signUp, signIn, googleAuth, foregtPassword, resetPassword } = require('../controller/auth')
const { runValidation } = require('../middleware/validation')
const { schemas } = require('../middleware/validation/schema')

const router = require('express').Router()

router.post("/signup", runValidation(schemas.signup), signUp)
router.post("/signin", signIn)
router.post("/google", googleAuth)
router.post("/forget-password", foregtPassword)
router.get("/reset-password", resetPassword)
module.exports = router