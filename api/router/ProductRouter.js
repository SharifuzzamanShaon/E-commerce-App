const product = require('../controller/ProductController');
const authMiddleware = require('../middleware/authenticate/authMiddleware');
const authorize = require('../middleware/authorize/authorize');

const router = require('express').Router()

router.get("/:id", product.getSingleProduct);
router.get("/search/query", product.searcProduct)
router.post("/add-product", product.addNewProduct); // authMiddleware, authorize(['admin'])
router.patch('/patch/:id', product.patchProduct)

module.exports = router 