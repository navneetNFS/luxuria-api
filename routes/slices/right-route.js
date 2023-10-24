const express = require('express');
const role_route = express.Router()
const role_ctrl = require('../../controllers/right.ctrl')

role_route.post('/',role_ctrl.postRight)

module.exports = role_route