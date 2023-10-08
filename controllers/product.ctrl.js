const { unlink } = require('node:fs');
const Products = require('../models/products.mdl')
const Users = require('../models/users.mdl')
const error = require('../middleware/error')
const ApiFeature = require('../middleware/apiFeature')
const path = require('path')

module.exports.thumbImageUpload = (req, res, next) => {
    if (req.file) {
        res.status(201).send({ success: true, thumb: req.file.filename });
    }
    else {
        error.ErrorHandler(501, "File Not Uploaded", res)
    }
}

module.exports.imagesUpload = (req, res, next) => {
    if (req.file) {
        res.status(201).send({ success: true, images: req.file.filename });
    }
    else {
        error.ErrorHandler(501, "File Not Uploaded", res)
    }
}

module.exports.deleteProductImage = (req, res, next) => {
    const image_name = req.params.imageName
    console.log(image_name);
    // res.status(201).json({success:true,message:"Image Delted Successfully"});
    unlink(path.join(__dirname,'../',`/uploads/images/${image_name}`), (err) => {
      if (err){
        error.ErrorHandler(501,err,res)
      }
      else{
          console.log(`successfully deleted ${image_name}`);
          res.status(201).json({success: true,message:"Image Deleted Successfully"})
      }
    });
}

module.exports.getProducts = (req, res, next) => {
    Products.find(ApiFeature.ProductApiFilter(req.query))
        .then(filterData => { return filterData })
        .then((data) => {
            if (req.query.page) {
                const chunck = ApiFeature.paginateData(data, req.query.page, 100)
                if (req.query.page <= chunck.totalPages) {
                    res.status(201).send({ success: true, data: chunck.data, page: req.query.page, products: chunck.data.length, totalPages: chunck.totalPages });
                }
                else {
                    res.status(404).send({ success: false, message: "Page Not Found" });
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

module.exports.addReview = (req, res, next) => {
    const prodId = req.params.productId
    const data = req.body
    const user = JSON.parse(req.cookies.user)
    const reviews = {}
    reviews.userId = user._id
    reviews.username = user.name
    reviews.rating = data.rating
    reviews.comment = data.comment
    Products.findById(prodId)
        .then(product => {
            const reviewList = product.reviews;

            reviewer = reviewList.find((review) => review.userId.includes(user._id))
            result = reviewList.findIndex((review) => review.userId.includes(user._id))
            if (result >= 0) {
                product.reviews[result] = reviews
            }
            else {
                product.reviews.push(reviews)
            }

            // Average Rating
            let total_rating = 0
            reviewList.forEach((item) => {
                total_rating += item.rating
            })

            product.rating = total_rating / reviewList.length

            product.save()
            res.status(201).json({ success: true, message: "Review added successfully", data: product })
        })
        .catch(err => error.ErrorHandler(501, err.message, res))
}

module.exports.getProductReview = (req, res, next) => {
    const prodId = req.params.productId
    Products.findById(prodId)
        .populate('reviews.userId')
        .then(product => {
            return product
        })
        .then(({ reviews }) => {
            res.status(201).json({
                success: true,
                reviews
            })
        })
        .catch(err => error.ErrorHandler(501, err.message, res))
}