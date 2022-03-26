const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Object
    },
    phone: {
        type: String
    },
    guardian: {
        type: String
    },
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'Coach',
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }]
},
{
    timestamps: true,
});

module.exports = mongoose.model('Student',studentSchema);