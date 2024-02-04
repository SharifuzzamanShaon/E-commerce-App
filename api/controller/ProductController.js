const Product = require("../model/ProductModel")

const getAllProduct = async (req, res) => {
    const products = await Product.find();
    return res.status(200).send({ products })
}
const addNewProduct = async (req, res) => {
    const { name, description, brand, category,
        sizes, colors, price, totalQty, totalSold } = req.body
    const newProduct = new Product({
        name, description, brand, category,
        sizes, colors, price, totalQty, totalSold
    })
    const newProductInfo = await newProduct.save()
    return res.status(201).send({ messgae: "Signup successfully", newProductInfo });
}

const searcProduct = async (req, res) => {
    const searchTerm = req.query.searchTerm ? { name: { $regex: req.query.searchTerm, $options: 'i' } } : {}
    const brand = req.query.brand ? { brand: { $in: req.query.brand } } : {}

    const query = { $and: [searchTerm, brand] }

    const searchedResult = await Product.find(query)
    return res.status(200).send(searchedResult);
}

module.exports = {
    getAllProduct,
    addNewProduct,
    searcProduct
}