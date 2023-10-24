const error = require('../middleware/error')
const Role = require('../models/right.mdl')
module.exports.postRight = (req,res,next)=> {
    const data = req.body
    const role = new Role(data)
    role.save()
    .then(()=>{
        res.status(201).json({success: true,role})
    }).catch((err) => error.ErrorHandler(501,err.message,res))
}