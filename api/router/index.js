const express = require('express')
const router = express.Router()
const userRouter = require("./user")
const authRouter = require("./auth")
const accessProfile = require("./profileRouter")
const listingRouter = require("./listingRouter")
const { route } = require('../app')
const productRouter = require('./ProductRouter')
const authMiddleware = require('../middleware/auth/authMiddleware')

router.use("/user", userRouter)
router.use("/profile", authMiddleware, accessProfile);
router.use("/auth", authRouter)
router.use("/products", productRouter)

module.exports = router