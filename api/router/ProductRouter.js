const product = require('../controller/ProductController');
const authMiddleware = require('../middleware/authenticate/authMiddleware');
const authorize = require('../middleware/authorize/authorize');
const { runValidation } = require('../middleware/validation');
const { schemas } = require('../middleware/validation/schema');

const router = require('express').Router()

router.get("/:id", product.getSingleProduct);
router.get("/search/query", product.searcProduct)
router.post("/add-product",runValidation(schemas.product), product.addNewProduct); // authMiddleware, authorize(['admin'])
router.patch('/patch/:id', product.patchProduct)

module.exports = router 