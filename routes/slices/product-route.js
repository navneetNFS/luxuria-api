const express = require('express');
const product_route = express.Router();
const product_ctrl = require('../../controllers/product.ctrl')
const { authentication, authorizeRoles } = require('../../middleware/isAuth')

product_route.get('/', product_ctrl.getProducts)
product_route.get('/:prodId', product_ctrl.getSingleProduct)
product_route.post('/create-product', authentication , authorizeRoles("admin") , product_ctrl.createProduct)
product_route.put('/edit-product/:prodId', authentication , authorizeRoles("admin") , product_ctrl.editProduct)
product_route.delete('/delete-product/:prodId', authentication , authorizeRoles("admin") , product_ctrl.deleteProduct)

module.exports = product_route