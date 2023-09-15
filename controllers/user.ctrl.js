const User = require('../models/users.mdl')
const error = require('../middleware/error')
const crypto = require('crypto');
const sendMail = require('../util/sendMail')

// LOGIN USER
module.exports.loginUser = async (req, res, next) => {
    if (!req.cookies.tokken) {
        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email }).select("+password")
            if (user) {
                const isPasswordMatched = await user.confirmPassword(password)
                if (isPasswordMatched) {
                    const tokken = user.getJWTTokken();
                    res.clearCookie('tokken');
                    res.clearCookie('user');
                    res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
                    res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
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


// CREATE USER
module.exports.createUser = (req, res, next) => {
    const data = req.body;
    const obj_user = new User(data);
    obj_user.save().then(user => {
        const tokken = obj_user.getJWTTokken();
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
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
    const user = User.findByIdAndDelete(userId)
    user.then(() => {
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


// GET EMAIL VERIFICATION OTP
module.exports.getemailVerificationMail = (req, res, next) => {
    const user = JSON.parse(req.cookies.user)
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otp_lst = String(otp).split('')
    const [one, two, three, four, five, six] = otp_lst

    let html = `
    <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Confirmation</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Please confirm your email
                            address</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">
                            Thanks for interested in Luxuria. We are happy to have you. Please verify this 6 digit
                            otp for succesfully sign up.</p>
                        <p
                            style="text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;">
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${one}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${two}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${three}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${four}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${five}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${six}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                        Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>
    `
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

                        html = `
                        <!DOCTYPE html>
                        <html lang="en">
                        
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Welcome to Luxuria</title>
                        </head>
                        
                        <body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
                            <table style="width: 100%;height: 100vh;padding: 15px;">
                                <tr>
                                    <td>
                                        <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                                            cellpadding="0">
                                            <tr>
                                                <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                                        href="javascript: void(0)">Luxuria</a></td>
                                            </tr>
                                            <tr >
                                                <td style="padding-top: 25px;">
                                                    <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Welcome to Luxuria</h1>
                                                    <p style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">Thanks for signing up to Luxuria. We are happy to have you.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Contact us in case you have query <a href="javascript: void(0)">Link Here</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        
                        </body>
                        
                        </html>`

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
    const [one, two, three, four, five, six] = otp_lst

    html = `
    <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Reset Password</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">We have shared you an 6 digit otp for reset you password. this otp is valid for 30 mins</p>
                        <p
                            style="text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;">
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${one}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${two}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${three}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${four}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${five}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${six}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Contact us in case you have query <a href="javascript: void(0)">Link Here</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>`

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
        html = ` 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
    <table style="width: 100%;height: 100vh;padding: 15px;">
        <tr>
            <td>
                <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                    cellpadding="0">
                    <tr>
                        <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                                href="javascript: void(0)">Luxuria</a></td>
                    </tr>
                    <tr >
                        <td style="padding-top: 25px;">
                            <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Reset Password</h1>
                            <p style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">Your password is successfully reseted please Re Login</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Contact us in case you have query <a href="javascript: void(0)">Link Here</a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>

</html>`
        User.findById(user._id)
            .then(user => {
                user.password = req.body.password
                res.clearCookie('tokken')
                res.clearCookie('user')
                res.clearCookie('recoverTkn')
                res.status(201).json({ success: true, message: "User Updated Successfuly" })
                sendMail(user.email, 'Reset Password', html)
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
    const [one, two, three, four, five, six] = otp_lst
    let html = `
    <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forgot Paswword</title>
</head>

<body style="margin: 0;padding: 0;background: #efefef;font-family: Arial, Helvetica, sans-serif;">
<table style="width: 100%;height: 100vh;padding: 15px;">
    <tr>
        <td>
            <table style="width: 100%;max-width: 400px;margin: 0 auto;background: #fff;" cellspacing="0"
                cellpadding="0">
                <tr>
                    <td style="background: gold;text-align: center;padding: 10px 15px;"><a
                            href="javascript: void(0)">Luxuria</a></td>
                </tr>
                <tr>
                    <td style="padding-top: 25px;">
                        <h1 style="font-size: 18px;text-align: center;padding: 0 15px;">Please Verify OTP</h1>
                        <p
                            style="font-size: 12px;text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;color: #a9a9a9;">
                            DOnt worry you can change this password by verify this 6 digit otp for succesfully change password.</p>
                        <p
                            style="text-align: center;display: block;max-width: 60%;margin: 0 auto;padding-bottom: 20px;">
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${one}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${two}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${three}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${four}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${five}</span>
                            <span
                                style="display: inline-block;border: 1px solid #ccc;background-color: #efefef;width: 35px;height: 35px;padding: 9px 0px;box-sizing: border-box;border-radius: 2px;">${six}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;font-size: 14px;padding-bottom: 30px;">Didn't sign up for
                        Luxuriya? <a href="javascript: void(0)">Let us Know</a></td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>

</html>
    `

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

module.exports.forgotPassword = (req,res,next) => {
    const email = req.cookies.email;
    console.log(email);
    const {newPassword,confirmPassword} = req.body
    let data = null
    if(newPassword == confirmPassword){
        // data = {password:newPassword}
        User.findOne({email}).select("+password")
        .then((user) => {
            user.password = newPassword
            res.clearCookie('email')
            res.clearCookie('recoverTokken')
            user.save()
            res.status(201).json({success:true,message:"Password Updated Successfully",user})
        })
        .catch(err => error.ErrorHandler(501,err.message,res))
    }
    else{
        error.ErrorHandler(502,"Password and Confirm Password are not same",res)
    }
}