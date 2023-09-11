const User = require('../models/users.mdl')
const error = require('../middleware/error')

module.exports.loginUser = async (req, res, next) => {
    if(!req.cookies.tokken){
        const { email, password } = req.body;
        if (!email || !password) {
            error.ErrorHandler(400, "Please Enter Both Email and Password", res)
        }
    
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            error.ErrorHandler(400, "Invalid Email or Password", res)
        }
    
        const isPasswordMatched = await user.confirmPassword(password)
        if (!isPasswordMatched) {
            error.ErrorHandler(400, "Invalid Email or Password", res)
        }
    
        const tokken = user.getJWTTokken();
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        res.json({ success: true, user, tokken });
    }
    else{
        res.json({success: true , tokken : req.cookies.tokken , user : JSON.parse(req.cookies.user)})
    }
}

module.exports.createUser = (req, res, next) => {
    const data = req.body;
    const obj_user = new User(data);
    obj_user.save().then(user => {
        const tokken = obj_user.getJWTTokken();
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.cookie('tokken', String(tokken), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        res.cookie('user', JSON.stringify(user), { maxAge: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000 })
        res.json({ success: true, user, tokken });
    }).catch(err => {
        error.ErrorHandler(501, err.message, res)
    })
}

module.exports.getUsers = (req, res, next) => {
    if(req.cookies.tokken){
        User.find()
        .then(users => {
            res.json({success:true,users})
        })
        .catch(err => error.ErrorHandler(400,err.message,res))
    }
}

module.exports.editUser = (req, res, next) => {
    const userId = req.params.userId;
    const data = req.body;
    const user = User.findByIdAndUpdate(userId,data)
    user.then(() => {
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.status(201).json({success:true,message:"User Updated Successfuly"})
    })
    .catch(err => { error.ErrorHandler(501, err.message, res) });
}


module.exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    const user = User.findByIdAndDelete(userId)
    user.then(() => {
        res.clearCookie('tokken');
        res.clearCookie('user');
        res.status(201).json({success:true,message:"User Deleted Successfuly"})
    })
    .catch(err => { error.ErrorHandler(501, err.message, res) });
}

module.exports.logOut = (req, res, next) => {
    res.clearCookie('tokken');
    res.clearCookie('user');
    res.status(201).json({success:true,message:"Logged Out Successfuly"})
}