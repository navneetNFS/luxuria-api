const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    shippingInfo : {
        address: {
            type : String,
            required: [true, "Please Enter Address"]
        },
        city: {
            type : String,
            required: [true, "Please Enter City"]
        },
        state: {
            type : String,
            required: [true, "Please Enter State"]
        },
        country: {
            type : String,
            required: [true, "Please Enter Country"]
        },
        pinCode: {
            type : Number,
            required: [true, "Please Enter Pin Code"]
        },
        phoneNumber: {
            type : String,
            required: [true, "Please Enter Phone Num"]
        }
    },
    orderItems : {
        productId: {type : mongoose.Schema.ObjectId},
        name: {
            type : String,
            required: [true, "Please Enter Product Name"]
        },
        price: {
            type : Number,
            required: [true, "Please Enter Price"]
        },
        quantity: {
            type : Number,
            required: [true, "Please Enter Qunatity"]
        },
        image: {
            type : String,
            required: [true, "Please Enter Image"]
        }
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo : {
        id:{
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    paidAt:{
        type: Date,
        default: Date.now()
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus:{
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Orders',orderSchema)