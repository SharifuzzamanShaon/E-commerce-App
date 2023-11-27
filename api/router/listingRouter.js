const { createListing, getListing, getSearchedListing } = require("../controller/listingController")
const authMiddleware = require("../middleware/auth/authMiddleware")

const router = require("express").Router()


router.post("/create", authMiddleware, createListing)
router.get("/get-listing/:id", authMiddleware, getListing)
router.get("/get", getSearchedListing)

module.exports = router