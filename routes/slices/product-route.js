const express = require('express');
const product_route = express.Router();
const product_ctrl = require('../../controllers/product.ctrl')
const { authentication, authorizeRoles , isVerified } = require('../../middleware/isAuth')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        const today = new Date();
		const current_time = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}.${today.getHours()}.${today.getMinutes()}.${today.getSeconds()}`;
		cb(null, current_time + '-' + file.originalname); // Set the file name
    },
});

const upload = multer({ storage });

product_route.get('/', product_ctrl.getProducts)

product_route.get('/:prodId', product_ctrl.getSingleProduct)
product_route.post('/create-product' , authentication , authorizeRoles("admin","super-admin") , isVerified(true) , product_ctrl.createProduct)
product_route.put('/edit-product/:prodId', authentication , authorizeRoles("admin","super-admin") , isVerified(true) , product_ctrl.editProduct)
product_route.delete('/delete-product/:prodId', authentication , authorizeRoles("admin","super-admin") , isVerified(true) , product_ctrl.deleteProduct)

product_route.post('/add-review/:productId', authentication , product_ctrl.addReview)

product_route.get('/get-reviews/:productId', product_ctrl.getProductReview)

// Image Related Task
product_route.post('/product-thumb', upload.single('thumb') , authentication , authorizeRoles("admin","super-admin") , isVerified(true) , product_ctrl.thumbImageUpload)
product_route.post('/product-images', upload.single('images') , authentication , authorizeRoles("admin","super-admin") , isVerified(true) , product_ctrl.imagesUpload)
product_route.delete('/delete-product-image/:imageName', authentication , authorizeRoles("admin","super-admin") , isVerified(true) , product_ctrl.deleteProductImage)

module.exports = product_route