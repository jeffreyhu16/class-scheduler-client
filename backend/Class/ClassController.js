const Class = require('./ClassModel');
const Student = require('../Student/StudentModel');
const Coach = require('../Coach/CoachModel');
const Location = require('../Location/LocationModel');
const { DateTime } = require('luxon');
const csv = require('csvtojson');

exports.getClasses = (req, res) => {
    const { currentDate, startOfWeek, day, location, courtNo, coach } = req.query;
    let targetDay;
    if (currentDate)
        targetDay = DateTime.fromISO(currentDate);
    else
        targetDay = DateTime.fromISO(startOfWeek).plus({ days: day - 1 });

    const dbQuery = {
        'startTime.year': targetDay.year,
        'startTime.month': targetDay.month,
        'startTime.day': targetDay.day,
    }
    if (location !== 'all') dbQuery['location.name'] = location;
    if (courtNo) dbQuery['location.courtNo'] = courtNo;
    if (coach !== 'all') dbQuery.coachName = coach;

    Class.find(dbQuery)
        .then(data => res.send(data))
        .catch(err => console.log(err));
}

exports.setClass = async (req, res) => {
    const { startTime, endTime, studentName, coachName, location, note } = req.body;
    const student = await Student.findOne({ name: studentName });
    const coach = await Coach.findOne({ name: coachName });
    const court = await Location.findOne({ name: location.name });

    Class.create({
        startTime,
        endTime,
        location: { courtNo: location.courtNo },
        note
    }).then(lesson => {
        lesson.student.push(student.id);
        lesson.coach = coach.id;
        lesson.location.id = court.id;
        lesson.save().catch(err => console.log(err));
    })
}

exports.setClasses = (req, res) => {
    Class.insertMany(res.body)
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