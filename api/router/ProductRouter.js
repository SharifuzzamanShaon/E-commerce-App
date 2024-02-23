const product = require('../controller/ProductController');
const {uploadFile} = require('../controller/uploadFileController');
const authMiddleware = require('../middleware/authenticate/authMiddleware');
const authorize = require('../middleware/authorize/authorize');
const { upload } = require('../middleware/fileUpoadMiddleware');
const { runValidation } = require('../middleware/validation');
const { schemas } = require('../middleware/validation/schema');

const router = require('express').Router()

router.get("/:id", product.getSingleProduct);
router.get("/search/query", product.searcProduct)
router.post("/add-product",upload.single('images'), product.addNewProduct); // authMiddleware, authorize(['admin'])
router.patch('/patch/:id', product.patchProduct)
router.post("/uploadfile", upload.single('image'), uploadFile)
module.exports = router 