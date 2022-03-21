const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
    startTime: {
        type: Object,
        required: true
    },
    endTime: {
        type: Object,
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
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Location',
        },
        courtNo: {
            type: String,
            required: true
        }
    },
    note: {
        type: String,
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Class', classSchema);

