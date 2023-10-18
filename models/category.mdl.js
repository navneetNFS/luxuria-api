const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Category Name"],
        unique: [true, "Category Already Available"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Categories', categorySchema)