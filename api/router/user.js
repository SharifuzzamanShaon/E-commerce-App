const { userUpdate, userDelete } = require("../controller/user")
const authMiddleware = require("../middleware/auth/authMiddleware")
const router = require("express").Router()

router.put("/update/:id", authMiddleware, userUpdate)
router.delete("/delete/:id", authMiddleware, userDelete)

module.exports = router