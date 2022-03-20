const mongoose = require('mongoose');
const { Schema } = mongoose;

const coachSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    payRate: {
        type: Number,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class',
    }]
});

module.exports = mongoose.model('Coach', coachSchema);