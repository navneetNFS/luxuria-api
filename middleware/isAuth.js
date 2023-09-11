module.exports.authentication = (req, res, next) => {
    if (!req.cookies.tokken) {
        res.json({ auth: false, message: "Not Authenticated" })
    }
    else {
        next()
    }
}


module.exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (req.cookies.tokken) {
            const user = JSON.parse(req.cookies.user)
            if (!roles.includes(user.role)) {
                res.json({ auth: false, message: "User is not allowed to access this resource" })
            }
            else {
                next()
            }
        }
    }
}