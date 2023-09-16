const express = require('express');
const product_route = express.Router();
const product_ctrl = require('../../controllers/product.ctrl')
const { authentication, authorizeRoles , isVerified } = require('../../middleware/isAuth')

product_route.get('/', product_ctrl.getProducts)
product_route.get('/:prodId', product_ctrl.getSingleProduct)
product_route.post('/create-product', authentication , authorizeRoles("admin") , isVerified(true) , product_ctrl.createProduct)
product_route.put('/edit-product/:prodId', authentication , authorizeRoles("admin") , isVerified(true) , product_ctrl.editProduct)
product_route.delete('/delete-product/:prodId', authentication , authorizeRoles("admin") , isVerified(true) , product_ctrl.deleteProduct)

product_route.post('/add-review/:productId', authentication , product_ctrl.addReview)

module.exports = product_route