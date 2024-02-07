const { getParentProduct, getProductByCategory } = require('../controller/ProductByCategory')
const { addCategory, getCategory, addSubCategory, addSubsubCategory } = require('../controller/categoryController')

const router = require('express').Router()

router.post("/", addCategory)
router.get("/", getCategory)
router.post('/subcategory', addSubCategory)
router.get("/:categoryId", getProductByCategory)


module.exports = router