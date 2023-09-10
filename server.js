// Env Config File
const dotenv = require('dotenv');
dotenv.config({path: "./config/config.env"})

// Node - Express.js
const express = require('express')
const app = express()

// Default Port
const port = process.env.PORT

// CORS
const cors = require('cors')
app.use(cors())

// Api Route
const api_route = require('./routes/api')
app.use('/api', api_route)

// Api Not Found
app.use((req,res,next) => {
    res.status(404).json({success: false, message:"API not Found"})
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))