const { signUp, signIn, googleAuth } = require('../controller/auth')
const { runValidation } = require('../middleware/validation')
const { schemas } = require('../middleware/validation/schema')

const router = require('express').Router()

router.post("/signup", runValidation(schemas.signup), signUp)
router.post("/signin", signIn)
router.post("/google", googleAuth)
module.exports = router