const { Subcatagories } = require("../model/CategoryModel");
const Product = require("../model/ProductModel");
const { uploadOnCloudinary } = require("../utils/FileUpload");

const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({ _id: id })
    return res.status(200).send({ product })
}
const addNewProduct = async (req, res, next) => {
    try {

        const { name, description, brand, category,
            sizes, colors,images, price, totalQty, totalSold } = req.body

        const filePath = `./uploads/${req.file.filename}`
        const res = await uploadOnCloudinary(filePath);

        const newProduct = new Product({
            name, description, brand, category,
            sizes, colors,images: res.secure_url, price, totalQty, totalSold
        })
        const newProductInfo = await newProduct.save()
        // console.log(newProductInfo._id);
        // let addProductToSubcategory = await Subcatagories.findById({ _id: category })
        // addProductToSubcategory.products.push(newProductInfo._id)
        // await addProductToSubcategory.save()
        return res.status(201).send({ messgae: "added successfully", newProductInfo });
    } catch (error) {
        next(error)
    }
}

const searcProduct = async (req, res) => {
    const searchTerm = req.query.searchTerm ? { name: { $regex: req.query.searchTerm, $options: 'i' } } : {}
    const brand = req.query.brand ? { brand: { $in: req.query.brand } } : {}

    const minPrice = req.query.minprice || 0
    const maxPrice = req.query.maxprice || 10000



    const price = { price: { $gte: minPrice, $lte: maxPrice } }

    const keyword = { $and: [searchTerm, brand] }

    const limit = req.query.limit || 8
    const page = req.query.page || 1
    const skip = limit * (page - 1)
    const searchedResult = await Product.find(keyword).limit(limit).skip(skip)
    // const searchedResult = await Product.find()
    const totalCount = await Product.countDocuments()
    return res.status(200).send({ products: searchedResult, totalCount });
}

const patchProduct = async (req, res) => {
    const id = req.params.id;
    const {
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        price,
        totalQty,
        totalSold
    } = req.body
    const product = await Product.findById({ _id: id });

    product.name = name ?? product.name,
        product.description = description ?? product.description,
        product.brand = brand ?? product.brand,
        product.category = category ?? product.category,
        product.sizes = sizes ?? product.sizes,
        product.colors = colors ?? product.colors,
        product.price = price ?? product.price,
        product.totalQty = totalQty ?? product.totalQty,
        product.totalSold = totalSold ?? product.totalSold

    const updateProduct = await product.save();

    return res.status(200).send({ message: 'update success', updateProduct })

}

module.exports = {
    getSingleProduct,
    addNewProduct,
    searcProduct,
    patchProduct
}