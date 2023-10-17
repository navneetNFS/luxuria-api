const express = require('express');
const api_route = express.Router();

// product_route
const product = require('./slices/product-route')
const user = require('./slices/user-route')
const order = require('./slices/order-route')
const category = require('./slices/category-route')

api_route.use('/user', user)
api_route.use('/product', product)
api_route.use('/orders', order)
api_route.use('/category', category)
api_route.get('/getCookie', (req,res) => {
    res.status(201).json({
        succcess: true,
        cookies: req.cookies
    })
})

module.exports = api_route