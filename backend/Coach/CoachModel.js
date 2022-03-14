const mongoose = require('mongoose');

const coachSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    payRate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Coach', coachSchema);