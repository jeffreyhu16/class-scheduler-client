const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    startTime: {
        type: Object,
        required: true
    },
    endTime: {
        type: Object,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    coachName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    note: {
        type: String,
        
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Class', classSchema);

