const { addHotel, getHotel, putHotel } = require('../controller/hotelController')

const router= require('express').Router()

router.post("/add", addHotel)
router.get("/get-all", getHotel)
router.put("/:id",putHotel)
module.exports = router