const product = require('../controller/ProductController');

const router = require('express').Router()

router.get("/:id", product.getSingleProduct);
router.get("/search/query", product.searcProduct)
router.post("/add-product", product.addNewProduct);
router.patch('/patch/:id', product.patchProduct)

module.exports = router 