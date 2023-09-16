const Order = require('../models/orders.mdl')
const error = require('../middleware/error')

module.exports.getOrders = (req, res, next) => {
    Order.find()
        .then((orders) => res.status(201).json({ success: true, orders }))
        .catch(err => error.ErrorHandler(501, err.message, res))
}

module.exports.getSingleOrder = (req, res, next) => {
    const order_id = req.params.orderId
    Order.findById(order_id)
        .then((order) => res.status(201).json({ success: true, order }))
        .catch(err => error.ErrorHandler(501, err.message, res))
}

module.exports.getUserOrders = (req, res, next) => {
    if (req.cookies.user) {
        const userJson = JSON.parse(req.cookies.user)
        const user_id = userJson._id
        console.log(user_id);
        Order.find({ user: user_id })
            .then((order) => {
                totalprice = 0
                order.forEach((item) => {
                    totalprice += item.totalPrice
                })
                res.status(201).json({ success: true, totalPrice: totalprice, order })
            }).catch(err => error.ErrorHandler(501, err.message, res))
    }
}

module.exports.newOrder = (req, res, next) => {
    if (req.cookies.user) {
        const user = JSON.parse(req.cookies.user)

        const data = req.body
        data.user = user._id

        const order = new Order(data)
        order.save()
        res.status(201).json({ success: true, order })
    }
}

module.exports.updateOrder = (req, res, next) => {
    if (req.cookies.user) {
        const orderId = req.params.orderId;
        const data = req.body

        Order.findByIdAndUpdate(orderId, data)
            .then((order) => {
                res.status(201).json({ success: true, message: "Order Updated Succssefuly", order })
            })
            .catch(err => error.ErrorHandler(501, err.message, res))
    }
}

module.exports.deleteOrder = (req, res, next) => {
    const order_id = req.params.orderId
    Order.findById(order_id)
        .then((order) => {
            if (!order) {
                error.ErrorHandler(501, "Product Not Found", res)
            }
            else {
                Order.findByIdAndDelete(order_id)
                    .then(() => {
                        res.status(201).json({ success: true, message: "Order Delted Succssefuly" })
                    })
            }
        })
        .catch(err => error.ErrorHandler(501, err.message, res))
}