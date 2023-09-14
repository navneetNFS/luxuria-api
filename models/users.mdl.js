const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Enter User Name']
    },
    email: {
        type: String,
        required: [true, 'Enter Your Email Address'],
        unique: [true, 'Email Already Used'],
        validate: [validator.isEmail, "Please Enter a Valid Email Address"]
    },
    password: {
        type: String,
        required: [true, 'Enter Your Password'],
        minLength: [6, "Password should be more than 6 characters"],
        maxLength: [15, "Password Cannon be more than 15 characters"],
        select: false
    },
    avatar: {
        type: String,
        required: [true, "Please upload your avatar"],
    },
    role: {
        type: String,
        required: [true, "Pease enter your role"],
        default: "user"
    },
    verifyed: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTTokken = function(){
    return jwt.sign({id:this._id},process.env.JWT_TOKKEN)
}

userSchema.methods.confirmPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User', userSchema)