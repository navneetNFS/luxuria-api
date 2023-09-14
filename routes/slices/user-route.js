const express = require('express');
const user_route = express.Router();
const user_ctrl = require('../../controllers/user.ctrl')
const { authentication, authorizeRoles, isVerified } = require('../../middleware/isAuth')


// User List
user_route.get('/', authentication, authorizeRoles("admin"), isVerified(true), user_ctrl.getUsers)

user_route.get('/email-verify', authentication, user_ctrl.getemailVerificationMail)
user_route.post('/email-verify', authentication, user_ctrl.postemailVerification)

// create-user
user_route.post('/new-user', user_ctrl.createUser)

// Login User
user_route.post('/login', user_ctrl.loginUser)

// Edit User
user_route.put('/edit-user/:userId', authentication, isVerified(true), user_ctrl.editUser)

// Delete User
user_route.delete('/delete-user/:userId', authentication, isVerified(true) , user_ctrl.deleteUser)


// Reset Password
user_route.post('/reset-password/email', authentication , isVerified(true) ,  user_ctrl.resetPwdEmail)
user_route.get('/reset-password/otp', authentication , isVerified(true) , user_ctrl.getresetPwdOtp)
user_route.post('/reset-password/otp', authentication , isVerified(true) , user_ctrl.resetPwdOtp)


// Logout User
user_route.get('/logout', authentication, isVerified, user_ctrl.logOut)

module.exports = user_route