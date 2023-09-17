const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        unique: [true, "Product Already Available"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Categories', categorySchema)