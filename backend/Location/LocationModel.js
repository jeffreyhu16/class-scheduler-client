const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numOfCourts: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Location', locationSchema);