module.exports.ErrorHandler = (statusCode,message,res) => {
    res.status(statusCode).json({success:false,message})
}