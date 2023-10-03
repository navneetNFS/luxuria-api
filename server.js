const path = require('path');

// Env Config File
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" })

// Node - Express.js
const express = require('express')
const app = express()

// DATABASE
const db = require('./util/database')

// Default Port
const port = process.env.PORT

// Handlimg Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Handlimg Uncaught`);
    server.close(() => {
        process.exit(1);
    })
})

// CORS
const cors = require('cors')
app.use(cors({
    origin: '*',
    credentials: true
}));

// body-parser
const bparser = require('body-parser');
app.use(bparser.json());
app.use(bparser.urlencoded({ extended: true }));

// Cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.set("view engine","ejs")
app.set("views","templates")

// UI Route
// const ui_route = require('./routes/ui')
// app.use('/ui', ui_route)

app.use(express.static(path.join(__dirname,'uploads')))
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')))

// Api Route
const api_route = require('./routes/api')
app.use('/api', api_route)

// Api Not Found
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "API not Found" })
})

const server = app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))

process.on("uncaughtException",(err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to unhandel Promise Rejection`);
    server.close(() => {
        process.exit(1);
    })
})