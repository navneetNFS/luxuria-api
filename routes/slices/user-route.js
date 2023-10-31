const express = require('express');
const user_route = express.Router();
const user_ctrl = require('../../controllers/user.ctrl')
const { authentication, authorizeRoles, isVerified } = require('../../middleware/isAuth')

// FILE UPLOAD
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        const today = new Date();
        const current_time = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}.${today.getHours()}.${today.getMinutes()}.${today.getSeconds()}`;
        cb(null, current_time + '-' + file.originalname); // Set the file name
    },
});

const upload = multer({ storage });


// Login User
user_route.post('/login', user_ctrl.loginUser)
user_route.get('/getPwd', authentication , isVerified(true) , user_ctrl.getPwd)

// create-user
user_route.post('/new-user', upload.single('avatar') , user_ctrl.createUser)

user_route.post('/verify-email-forgot', user_ctrl.verifyForgotPassword)
user_route.post('/check-forgot-otp', user_ctrl.checkForgotOtp)
user_route.put('/forgot-password', user_ctrl.forgotPassword)

// verify user
user_route.get('/email-verify', authentication, isVerified(false), user_ctrl.getemailVerificationMail)
user_route.post('/email-verify', authentication, isVerified(false), user_ctrl.postemailVerification)


// Edit User
user_route.put('/edit-user/:userId', authentication, isVerified(true), user_ctrl.editUser)

// Delete User
user_route.delete('/delete-user/:userId', authentication, isVerified(true), user_ctrl.deleteUser)
user_route.delete('/unwanted-user/:userId', authentication, isVerified(true), user_ctrl.unwantedUser)

// Reset Password
user_route.post('/reset-password/email', authentication, isVerified(true), user_ctrl.resetPwdEmail)
user_route.get('/reset-password/otp', authentication, isVerified(true), user_ctrl.getresetPwdOtp)
user_route.post('/reset-password/otp', authentication, isVerified(true), user_ctrl.resetPwdOtp)
user_route.put('/reset-password/set', authentication, isVerified(true), user_ctrl.setResetPassword)


// Logout User
user_route.get('/logout', authentication, isVerified(true), user_ctrl.logOut)

// User List
user_route.get('/', authentication, authorizeRoles("admin","super-admin"), isVerified(true), user_ctrl.getUsers)
// user_route.get('/' , user_ctrl.getUsers)
user_route.get('/:userId', authentication, isVerified(true), user_ctrl.getSingleUser)

module.exports = user_route