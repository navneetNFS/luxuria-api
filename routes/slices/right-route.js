const express = require('express');
const right_route = express.Router()
const right_ctrl = require('../../controllers/right.ctrl')
const { authentication, authorizeRoles , isVerified } = require('../../middleware/isAuth')

right_route.post('/', authentication , authorizeRoles("super-admin") , isVerified(true) , right_ctrl.postRight)
right_route.get('/:email' ,  authentication , isVerified(true) , right_ctrl.getSingleRight)
right_route.put('/:rightId' ,  authentication , authorizeRoles("super-admin") , isVerified(true) , right_ctrl.updateRight)
right_route.delete('/delete-right/:rightId' ,  authentication , authorizeRoles("super-admin") , isVerified(true) , right_ctrl.deleteRight)

module.exports = right_route