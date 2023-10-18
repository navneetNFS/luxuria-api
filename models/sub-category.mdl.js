const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    category: {
        type: String,
        required: [true, "Please Enter Main Category"],
    },
    subcategory: {
        type: String,
        required: [true, "Please Enter Sub Category"],
        unique: [true, "Sub Category Already Available"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('SubCategory', subCategorySchema)