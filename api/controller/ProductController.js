const { Subcatagories } = require("../model/CategoryModel");
const Product = require("../model/ProductModel")

const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({ _id: id })
    return res.status(200).send({ product })
}
const addNewProduct = async (req, res) => {
    const user = req.user
    console.log(user);
    const { name, description, brand, category,
        sizes, colors, price, totalQty, totalSold } = req.body
    const newProduct = new Product({
        name, description, brand, category,
        sizes, colors, price, totalQty, totalSold
    })
    const newProductInfo = await newProduct.save()
    // console.log(newProductInfo._id);
    // let addProductToSubcategory = await Subcatagories.findById({ _id: category })
    // addProductToSubcategory.products.push(newProductInfo._id)
    // await addProductToSubcategory.save()
    return res.status(201).send({ messgae: "added successfully", newProductInfo });
}

const searcProduct = async (req, res) => {
    const searchTerm = req.query.searchTerm ? { name: { $regex: req.query.searchTerm, $options: 'i' } } : {}
    const brand = req.query.brand ? { brand: { $in: req.query.brand } } : {}

    const minPrice = req.query.minprice || 0
    const maxPrice = req.query.maxprice || 10000

    const price = { price: { $gte: minPrice, $lte: maxPrice } }

    const query = { $and: [searchTerm, brand, price] }

    const limit = req.query.limit || 2
    const page = req.query.page || 1
    const skip = limit * (page - 1)
    console.log(skip)
    const searchedResult = await Product.find(query).limit(limit).skip(skip).sort({ createdAt: -1 })
    return res.status(200).send(searchedResult);
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

    return res.status(201).send({ message: 'update success', updateProduct })

}

module.exports = {
    getSingleProduct,
    addNewProduct,
    searcProduct,
    patchProduct
}