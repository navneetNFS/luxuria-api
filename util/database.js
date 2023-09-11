const mongoose = require('mongoose');
const uri = process.env.DATABASE;

const connectedDB = function () {
    mongoose.connect(uri).then(result => {
        console.log(`Connected with the server ${result.connection.host}`);
    }).catch(err => console.log(err))
};

module.exports = connectedDB()