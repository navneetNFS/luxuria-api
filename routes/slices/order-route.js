const express = require('express');
const order_routes = express.Router()
const order_ctrl = require('../../controllers/orders.ctrl')
const { authentication, authorizeRoles , isVerified } = require('../../middleware/isAuth')

order_routes.get('/user-orders', authentication , isVerified(true) ,order_ctrl.getUserOrders)
order_routes.post('/new-order', authentication , isVerified(true) , order_ctrl.newOrder)

order_routes.put('/update-order/:orderId', authentication , isVerified(true) , order_ctrl.updateOrder)

order_routes.delete('/delete-order/:orderId' , authentication , authorizeRoles("admin") , isVerified(true), order_ctrl.deleteOrder)

order_routes.get('/', authentication , authorizeRoles("admin") , isVerified(true) , order_ctrl.getOrders)
order_routes.get('/:orderId', authentication , isVerified(true) , order_ctrl.getSingleOrder)

module.exports = order_routes