const Category = require('../models/category.mdl')
const SubCategory = require('../models/sub-category.mdl')
const error = require('../middleware/error')

module.exports.getCategory = (req,res,next) => {
    Category.find()
    .then((category) => {
        res.status(201).json({success: true,category})
    })
    .catch(err => error.ErrorHandler(501,err.message,res))
}

module.exports.createCategory = (req, res, next) => {
    const data = req.body;
    const category = new Category(data)
    category.save()
    .then((category) => {
        res.status(201).json({success: true,category})
    })
    .catch(err => error.ErrorHandler(501,err.message,res))
}

module.exports.deleteCategory = (req,res,next) => {
    const categoryId = req.params.categoryId
    Category.findByIdAndDelete(categoryId)
    .then((category) => {
        res.status(201).json({success: true,message:"Category Deleted Successfully",category})
    })
    .catch(err => error.ErrorHandler(501,err.message,res))
}


module.exports.getSubsCategory = (req,res,next) => {
    const category_name = req.query.category
    SubCategory.find({category:category_name})
    .then((subcategory) => {
        res.status(201).json({success: true,subcategory})
    })
    .catch(err => error.ErrorHandler(501,err.message,res))
}

module.exports.createSubCategory = (req, res, next) => {
    const data = req.body;
    const subCategory = new SubCategory(data)
    subCategory.save()
    .then((subcategory) => {
        res.status(201).json({success: true,subcategory})
    })
    .catch(err => error.ErrorHandler(501,err.message,res))
}

module.exports.deleteSubCategory = (req,res,next) => {
    const subcategoryId = req.params.subcategoryId
    SubCategory.findByIdAndDelete(subcategoryId)
    .then((subcategory) => {
        res.status(201).json({success: true,message:"Category Deleted Successfully",subcategory})
    })
    .catch(err => error.ErrorHandler(501,err.message,res))
}
