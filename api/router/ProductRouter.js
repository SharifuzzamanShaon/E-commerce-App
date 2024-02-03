const product = require('../controller/ProductController');

const router = require('express').Router()

router.get("/get", product.getAllProduct);
router.post("/add-product", product.addNewProduct);
router.get("/search/query", product.searcProduct)

module.exports = router 