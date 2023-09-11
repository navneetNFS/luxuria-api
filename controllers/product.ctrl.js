const Products = require('../models/products.mdl')
const error = require('../middleware/error')
const ApiFeature = require('../middleware/apiFeature')

module.exports.getProducts = (req, res, next) => {
    Products.find(ApiFeature.ProductApiFilter(req.query))
        .then(filterData => { return filterData })
        .then((data) => {
            if (req.query.page) {
                const chunck = ApiFeature.paginateData(data, req.query.page, 100)
                if(req.query.page <= chunck.totalPages){
                    res.status(201).send({ success: true, data: chunck.data, page: req.query.page , products: chunck.data.length, totalPages: chunck.totalPages });
                }
                else{
                    res.status(404).send({ success: false, message : "Page Not Found"});
                }
            }
        })
        .catch(err => error.ErrorHandler(401, err.message, res))
}

module.exports.getSingleProduct = (req, res, next) => {
    const productId = req.params.prodId
    Products.findById(productId)
        .then((product) => {
            res.json({ success: true, product })
        })
        .catch(err => error.ErrorHandler(401, err.message, res))
}

module.exports.createProduct = (req, res, next) => {
    const data = req.body
    const product = new Products(data)
    product.save()
        .then(() => {
            res.json({ success: true, product })
        })
        .catch(err => error.ErrorHandler(401, err.message, res))
}

module.exports.editProduct = (req, res, next) => {
    const productId = req.params.prodId
    const data = req.body
    Products.findByIdAndUpdate(productId, data)
        .then(() => {
            res.status(201).json({ success: true, message: 'Product Updated Successfully' })
        })
        .catch(err => error.ErrorHandler(401, err.message, res))
}


module.exports.deleteProduct = (req, res, next) => {
    const productId = req.params.prodId
    Products.findByIdAndDelete(productId)
        .then(() => {
            res.status(201).json({ success: true, message: 'Product Deleted Successfully' })
        })
        .catch(err => error.ErrorHandler(401, err.message, res))
}