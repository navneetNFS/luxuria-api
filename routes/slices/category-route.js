const express = require('express');
const category_routes = express.Router()
const category_ctrl = require('../../controllers/category.ctrl')
const { authentication, authorizeRoles , isVerified } = require('../../middleware/isAuth')

category_routes.get('/',category_ctrl.getCategory)
category_routes.post('/', authentication , authorizeRoles("admin") , isVerified(true) , category_ctrl.createCategory)
category_routes.delete('/:categoryId',authentication , authorizeRoles("admin") , isVerified(true),category_ctrl.deleteCategory)

category_routes.get('/sub-category',category_ctrl.getSubsCategory)
category_routes.post('/create-sub-category', authentication , authorizeRoles("admin") , isVerified(true) , category_ctrl.createSubCategory)

category_routes.delete('/delete-subcategory/:subcategoryId',authentication , authorizeRoles("admin") , isVerified(true),category_ctrl.deleteSubCategory)

module.exports = category_routes