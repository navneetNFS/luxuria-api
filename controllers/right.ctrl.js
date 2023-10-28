const Right = require('../models/right.mdl');
const error = require('../middleware/error');
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
        if(data){
            res.status(201).json({success: true,id:data._id,rights: data.rights})
        }
        else{
            res.status(201).json({success: false,message: "Not Found"})
        }
    }).catch((err) => error.ErrorHandler(501,err.message,res))
}


module.exports.updateRight = (req,res,next) => {
    const rightId = req.params.rightId;
    const rightData = req.body

    Right.findOne({_id:rightId})
    .then((data) => {
        data.rights = rightData
        data.save()
        res.status(201).json({success:true,rights:data})
    }).catch((err) => error.ErrorHandler(501,err.message,res))
}

module.exports.deleteRight = (req,res,next) => {
    const rightId = req.params.rightId;
    Right.findByIdAndDelete(rightId)
    .then(()=>{
        res.status(201).json({success:true,message: "Delete Successfuly"})
    }).catch((err)=> error.ErrorHandler(501,err.message,res))
}