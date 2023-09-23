const express = require('express');
const user_route = express.Router();

// create-user
user_route.get('/new-user', (req, res, next) => {
    res.render('register')
})

module.exports = user_route