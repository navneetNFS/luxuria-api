const express =require('express');
const ui_route = express.Router();

// product_route
const user = require('./ui-slices/user-route')
// const product = require('./slices/product-route')
// const order = require('./slices/order-route')
// const category = require('./slices/category-route')

ui_route.use('/user', user)
// ui_route.use('/product', product)
// ui_route.use('/orders', order)
// ui_route.use('/category', category)

module.exports = ui_route