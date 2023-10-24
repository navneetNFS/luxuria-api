const User = require('../models/users.mdl')
const error = require('../middleware/error')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendMail = require('../util/sendMail')
const emailTemplate = require('../util/html');

// LOGIN USER
module.exports.loginUser = async (req, res, next) => {
    if (!req.cookies.tokken) {
        const { email, password } = req.body;
        let html = emailTemplate.loginDetectionEmailer()
        if (email && password) {
            const user = await User.findOne({ email }).select("+password")
            if (user) {
                const isPasswordMatched = await user.confirmPassword(password)
                if (isPasswordMatched) {
                    const tokken = user.getJWTTokken();
                    user.password = password;
                    res.clearCookie('tokken');
                    res.clearCookie('user');
                    res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
                    res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
                    sendMail(email, 'Login Detected', html)
                    res.status(201).json({ success: true, user, tokken });
                }
                else {
                    error.ErrorHandler(400, "Invalid Email or Password", res)
                }
            }
            else {
                error.ErrorHandler(400, "Invalid Email or Password", res)
            }
        }
        else {
            error.ErrorHandler(400, "Please Enter Both Email and Password", res)
        }
    }
    else {
        res.status(201).json({ success: true, tokken: req.cookies.tokken, user: JSON.parse(req.cookies.user) })
    }
}


module.exports.getPwd = async function(req,res,next){
    const email = req.query.email
    const pwd = req.query.password
    const getPwd = await User.findOne({email}).select('password').then((res) => res.password).catch(err=> err)
    const response = await bcrypt.compare(pwd,getPwd)
    res.status(201).json({success: true, matched:response})
}


// CREATE USER
module.exports.createUser = (req, res, next) => {
    const data = req.body;
    if(req.file){
        data.avatar = req.file.filename
    }
    const obj_user = new User(data);

    let html = emailTemplate.creteUserEmailer()

    obj_user.save().then(user => {
        const tokken = obj_user.getJWTTokken();
        user.password = data.password
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        sendMail(user.email, 'Thank you for interested in Luxuria', html)
        res.status(201).json({ success: true, user, tokken });
    }).catch(err => {
        error.ErrorHandler(501, err.message, res)
    })
}

// EDIT USER
module.exports.editUser = (req, res, next) => {
    const userId = req.params.userId;
    const data = req.body;

    const userData = User.findById(userId)
    userData.then((user) => {
        if (!user) {
            error.ErrorHandler(501, "User Not Found", res)
        }
        else {
            user.name = req.body.name
            user.avatar = req.body.avatar
            res.clearCookie('tokken');
            res.clearCookie('user');
            res.status(201).json({ success: true, message: "User Updated Successfuly" })
            return user.save()
        }

    })
        .catch(err => { error.ErrorHandler(501, err.message, res) });
}

// DELETE USER
module.exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    const userDetail = JSON.parse(req.cookies.user)
    const user = User.findByIdAndDelete(userId)
    let html = emailTemplate.deleteAccountEmailer()
    user.then(() => {
        sendMail(userDetail.email, 'Your Account Deleted Succussefully', html)
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.status(201).json({ success: true, message: "User Deleted Successfuly" })
    })
        .catch(err => { error.ErrorHandler(501, err.message, res) });
}

// GET USER LIST
module.exports.getUsers = (req, res, next) => {
    if (req.cookies.tokken) {
        User.find()
            .then(users => {
                res.status(201).json({ success: true, users })
            })
            .catch(err => error.ErrorHandler(400, err.message, res))
    }
}

// GET USER LIST
module.exports.getSingleUser = (req, res, next) => {
    if (req.cookies.tokken) {
        const userid = req.params.userId
        const userDet = JSON.parse(req.cookies.user);
        const { role, _id } = userDet

        if (role == 'user') {
            if (userid == _id) {
                User.findById(userid)
                    .then(user => {
                        res.status(201).json({ success: true, data: user })
                    })
                    .catch(err => error.ErrorHandler(400, err.message, res))
            }
            else {
                error.ErrorHandler(501, "User not have access to this page", res)
            }
        }
        else if (role == 'admin' || role == 'super-admin') {
            User.findById(userid)
                .then(user => {
                    res.status(201).json({ success: true, data: user })
                })
                .catch(err => error.ErrorHandler(400, err.message, res))
        }
        else {
            error.ErrorHandler(501, "Invalid Role", res)
        }
    }
}


// GET EMAIL VERIFICATION OTP
module.exports.getemailVerificationMail = (req, res, next) => {
    const user = JSON.parse(req.cookies.user)
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otp_lst = String(otp).split('')

    let html = emailTemplate.verificationUserEmailer(otp_lst)

    res.clearCookie('otp');
    res.cookie('otp', otp);
    sendMail(user.email, 'Otp for Email Confirmation', html)
    res.status(201).json({ success: true, otp })
}

// POST EMAIL VERIFICATION
module.exports.postemailVerification = (req, res) => {
    const user = JSON.parse(req.cookies.user)
    const { _id } = user;
    const enteredOtp = Number(req.body.otp);

    const real_otp = Number(req.cookies.otp);

    if (enteredOtp == real_otp) {
        set_val = { verifyed: true }
        User.findByIdAndUpdate(_id, set_val)
            .then(() => {
                res.clearCookie('otp')
                res.clearCookie('user')
                res.clearCookie('tokken')
            })
            .then(() => {
                User.findById(_id)
                    .then(user => {

                        html = emailTemplate.welecomeUserVerificationEmailer()

                        const tokken = user.getJWTTokken()
                        res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
                        res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
                        sendMail(user.email, 'Welcome to Luxuria', html)
                        res.status(201).json({ success: true, message: "Email Verified" })
                    })
                    .catch(err => error.ErrorHandler(501, err.message, res))
            })
            .catch(err => error.ErrorHandler(501, err.message, res))
    }
    else {
        error.ErrorHandler(501, "Otp Not Matched", res)
    }
}

// VERIFY USER BEFORE RESET PASSWORD
module.exports.resetPwdEmail = async (req, res, next) => {
    const { email, password } = req.body
    if (email && password) {
        const user = await User.findOne({ email }).select("+password")
        if (user) {
            const isPwdMatched = await user.confirmPassword(password)
            if (isPwdMatched) {
                const recoverTKN = crypto.createHash('sha256', process.env.RECOVER_TOKKEN + email).digest('hex')

                res.cookie('recoverTkn', String(recoverTKN), { maxAge: process.env.RECOVER_EXPIRY * 24 * 60 * 60 * 1000 })

                res.status(201).json({ success: true, recoverTokken: recoverTKN })
            }
            else {
                error.ErrorHandler(501, "Invalid Email Or Passowrd", res)
            }

        }
        else {
            error.ErrorHandler(501, "Invalid Email Or Passowrd", res)
        }
    }
    else {
        error.ErrorHandler(501, "Both Email and Passowrd are required", res)
    }
}


// GET OTP FOR RESET PASSWORD
module.exports.getresetPwdOtp = (req, res, next) => {
    const recoverTKN = req.cookies.recoverTkn
    if (!recoverTKN) {
        error.ErrorHandler(501, "Please confirm previous passoword", res)
    }
    const user = JSON.parse(req.cookies.user)
    const resetOtp = Math.floor(100000 + Math.random() * 900000);
    const otp_lst = String(resetOtp).split('')

    html = emailTemplate.resetPasswordOtpEmailer(otp_lst)

    res.clearCookie('resetOtp');
    res.cookie('resetOtp', resetOtp);

    sendMail(user.email, 'Otp for Reset Password', html)

    res.status(201).json({ success: true, otp: resetOtp })
}

// VERIFY OTP FOR RESET PASSWORD
module.exports.resetPwdOtp = (req, res, next) => {
    if (req.cookies.resetOtp) {
        const enteredOtp = req.body.otp
        if (enteredOtp == req.cookies.resetOtp) {
            res.clearCookie('resetOtp');
            res.json({ success: true, message: "Matched" })
        }
        else {
            error.ErrorHandler(501, "Otp Not Matched", res)
        }
    }
}


// SET NEW PASSWORD
module.exports.setResetPassword = (req, res, next) => {
    if (req.cookies.recoverTkn) {
        const user = JSON.parse(req.cookies.user)
        html = emailTemplate.setPasswordEmailer()
        User.findById(user._id)
            .then(user => {
                user.password = req.body.password
                res.clearCookie('tokken')
                res.clearCookie('user')
                res.clearCookie('recoverTkn')
                res.status(201).json({ success: true, message: "User Updated Successfuly" })
                sendMail(user.email, 'Reset Password Succussefully', html)
                return user.save()
            })
            .catch(err => error.ErrorHandler(501, err.message, res))
    }
    else {
        error.json(501, "verify email and password first", res)
    }
}


// LogOut
module.exports.logOut = (req, res, next) => {
    res.clearCookie('tokken');
    res.clearCookie('user');
    res.status(201).json({ success: true, message: "Logged Out Successfuly" })
}

// FORGOT PASSWORD

module.exports.verifyForgotPassword = (req, res, next) => {
    const { email } = req.body
    const forgotOtp = Math.floor(100000 + Math.random() * 900000);
    const otp_lst = String(forgotOtp).split('')
    let html = emailTemplate.verifyForgotPasswordOtpEMailer(otp_lst)

    sendMail(email, 'Forgot Password', html)

    res.clearCookie('email');
    res.cookie('email', email, { maxAge: process.env.RECOVER_EXPIRY * 24 * 60 * 60 * 1000 })
    res.cookie('otp', forgotOtp, { maxAge: process.env.RECOVER_EXPIRY * 24 * 60 * 60 * 1000 })
    res.status(201).json({ success: true, otp: forgotOtp })
}


module.exports.checkForgotOtp = (req, res, next) => {
    if (req.cookies.otp) {
        const otp = req.cookies.otp
        const enteredOtp = req.body.otp

        if (enteredOtp == otp) {
            const recoverTokken = process.env.RECOVER_TOKKEN
            res.clearCookie('otp');
            res.clearCookie('recoverTokken');
            res.cookie('recoverTokken', recoverTokken, { maxAge: process.env.RECOVER_EXPIRY * 24 * 60 * 60 * 1000 })
            res.status(201).json({ success: true, message: "Otp Matched", tokken: recoverTokken })
        }
        else {
            error.ErrorHandler(501, "Please Verify User Email for reset password")
        }
    }
    else {
        error.ErrorHandler(501, "Please Verify User Email for reset password")
    }
}

module.exports.forgotPassword = (req, res, next) => {
    const email = req.cookies.email;
    const { newPassword, confirmPassword } = req.body
    let data = null
    if (newPassword == confirmPassword) {
        // data = {password:newPassword}
        User.findOne({ email }).select("+password")
            .then((user) => {
                user.password = newPassword
                res.clearCookie('email')
                res.clearCookie('recoverTokken')
                user.save()
                res.status(201).json({ success: true, message: "Password Updated Successfully", user })
            })
            .catch(err => error.ErrorHandler(501, err.message, res))
    }
    else {
        error.ErrorHandler(502, "Password and Confirm Password are not same", res)
    }
}