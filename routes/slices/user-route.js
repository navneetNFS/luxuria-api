const express =require('express');
const user_route = express.Router();
const user_ctrl = require('../../controllers/user.ctrl')
const {authentication , authorizeRoles} = require('../../middleware/isAuth')


// User List
user_route.get('/', authentication , authorizeRoles("admin") , user_ctrl.getUsers)

// create-user
user_route.post('/new-user', user_ctrl.createUser)

// Login User
user_route.post('/login', user_ctrl.loginUser)

// Edit User
user_route.put('/edit-user/:userId', user_ctrl.editUser)

// Delete User
user_route.delete('/delete-user/:userId', user_ctrl.deleteUser)


// Logout User
user_route.get('/logout', authentication , user_ctrl.logOut)

module.exports = user_route