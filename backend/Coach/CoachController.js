const Coach = require('./CoachModel');
const Student = require('../Student/StudentModel');

exports.getCoaches = (req, res) => {
    Coach.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
}

const addStudentIds = async (req, res) => {
    const larry = await Coach.findById('622eb51849ebb5febc2854ed');
    const studentArr = await Student.find();
    studentArr.forEach(student => larry.students.push(student));
    larry.save();
}
