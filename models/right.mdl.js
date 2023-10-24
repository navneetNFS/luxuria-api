const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "EMail Already Available"]
    },
    rights: {
        type: Object,
        required: [true, "Please choose route link"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Role', roleSchema)