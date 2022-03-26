const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'Coach',
    },
    location: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
        },
        courtNo: {
            type: Number,
            required: true
        }
    },
    note: {
        type: String,
    }
});

module.exports = mongoose.model('Class', classSchema);

