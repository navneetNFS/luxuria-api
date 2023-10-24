const express = require('express');
const right_route = express.Router()
const right_ctrl = require('../../controllers/right.ctrl')

right_route.post('/', right_ctrl.postRight)
right_route.get('/:email', right_ctrl.getSingleRight)

module.exports = right_route