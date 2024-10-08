const { signUp, signIn, googleAuth, foregtPassword, resetPassword, verifyAccount, confirmVerification } = require('../controller/auth')
const { runValidation } = require('../middleware/validation')
const { schemas } = require('../middleware/validation/schema')

const router = require('express').Router()

router.post("/signup", runValidation(schemas.signup), signUp)
router.post("/verify-account", verifyAccount)
router.post("/confirm-verification", confirmVerification)
router.post("/signin", signIn)
router.post("/google", googleAuth)
router.post("/forget-password", foregtPassword)
router.post("/reset-password", runValidation(schemas.resetPassword), resetPassword)
module.exports = router