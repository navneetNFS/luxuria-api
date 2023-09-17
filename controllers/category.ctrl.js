const Category = require('../models/category.mdl')
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