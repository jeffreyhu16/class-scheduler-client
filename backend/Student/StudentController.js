const Student = require('./StudentModel');

exports.getStudentOptions = async (req, res) => {
    const result = await Student.find();
    const response = result.map(student => student.name);
    res.send(response);
}