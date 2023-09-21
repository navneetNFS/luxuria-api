const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        unique: [true, "Product Already Available"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Product Price Maximum 8 Digit Allowed"]
    },
    rating: {
        type: Number,
        default: 0
    },
    thumb:{
        type: String,
        required: [true, "Please Upload Product Thumbline"]
    },
    images: [{
        type: String,
        required: [true, "Please Upload Product Image"]
    }],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    stock: {
        type: Number,
        default: 1,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Price cannot be more than 4 figures"]
    },
    sku: {
        type: String,
        required: [true, "Please Enter Product SKU"],
        unique: [true, "Product SKU Already Available"],
        maxLength: [15, "Price cannot be more than 15 figures"]
    },
    onsale: {
        type: Boolean,
        default: false
    },
    available : {
        type: Boolean,
        default: true
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        userId: {
            type: String,
            required: true,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('Products', productSchema)