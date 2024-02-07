const { Category, Subcatagories, subsubCatagories } = require("../model/CategoryModel")

const getCategory = async (req, res) => {
    const category = await Category.find().populate('products', 'name price')
    return res.status(200).send(category)
}

const addCategory = async (req, res) => {
    const { name } = req.body
    console.log(typeof productId);
    const newCategory = new Category({
        name,
        // products: productId
    })
    const category = await newCategory.save()
    return res.status(200).send({ message: "new category created", category });
}

const addSubCategory = async (req, res,next) => {

    const { name, parentCategory } = req.body
    try {
        const myNewSubcategoy = new Subcatagories({
            name,
            parentCategory
        })
        const newSubcategory = await myNewSubcategoy.save();
        let isParent1 = await Category.findById({ _id: parentCategory })
        if (isParent1) {
            isParent1.subCatagories.push(newSubcategory._id);
            await isParent1.save()
        }
        let isParent2 = await Subcatagories.findById({ _id: parentCategory })
        if (isParent2) {
            isParent2.subCatagories.push(newSubcategory._id);
            await isParent2.save()
        }
        
        return res.status(200).send(newSubcategory)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCategory,
    addCategory,
    addSubCategory
}