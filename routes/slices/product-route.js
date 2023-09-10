const express =require('express');
const product_route = express.Router();

product_route.get('/',(req,res,next) => {
    res.send("Product Route")
})

module.exports = product_route