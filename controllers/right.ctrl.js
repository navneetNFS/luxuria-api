const error = require('../middleware/error')
const Right = require('../models/right.mdl')
module.exports.postRight = (req,res,next)=> {
    const data = req.body
    const right = new Right(data)
    right.save()
    .then(()=>{
        res.status(201).json({success: true,right})
    }).catch((err) => error.ErrorHandler(501,err.message,res))
}


module.exports.getSingleRight = (req,res,next)=> {
    const email = req.params.email;
    Right.findOne({email})
    .then((data)=>{
        res.status(201).json({success: true,rights: data.rights})
    }).catch((err) => error.ErrorHandler(501,err.message,res))
}