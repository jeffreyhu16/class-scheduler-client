const Class = require('./ClassModel');
const { DateTime } = require('luxon');

exports.getClasses = (req, res) => {
    const { startOfWeek, day } = req.query;
    const targetDay = DateTime.fromISO(startOfWeek).plus({ days: day - 1 });
    Class.find({
        'startTime.year': targetDay.year,
        'startTime.month': targetDay.month, 
        'startTime.day': targetDay.day
    })
    .then(data => res.send(data))
    .catch(err => console.log(err));
}

exports.setSingleClass = (req, res) => {
    Class.create(req.body)
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => console.log(err));
}

exports.updateClass = (req, res) => {
    Class.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => console.log(err));
}

exports.deleteClass = (req, res) => {
    Class.findByIdAndDelete(req.body.id)
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => console.log(err));
}