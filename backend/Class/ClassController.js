const Class = require('./ClassModel');
const Student = require('../Student/StudentModel');
const Coach = require('../Coach/CoachModel');
const Location = require('../Location/LocationModel');
const { DateTime } = require('luxon');

exports.getClasses = async (req, res) => {
    const { currentDate, startOfWeek, day, location, coach } = req.query;
    const locationDoc = await Location.findOne({ name: location });
    const coachDoc = await Coach.findOne({ name: coach });

    let startQuery;
    if (currentDate) startQuery = currentDate;
    if (startOfWeek) startQuery = DateTime.fromISO(startOfWeek).plus({ days: day - 1 }).toISO();
    const endQuery = DateTime.fromISO(startQuery).plus({ days: 1 }).toISO();

    const dbQuery = {
        startTime: { $gt: startQuery, $lt: endQuery }
    }
    if (location !== 'all') dbQuery['location._id'] = locationDoc;
    if (coach !== 'all') dbQuery.coach = coachDoc;

    let result = await Class.find(dbQuery)
        .populate('student', 'name')
        .populate('coach', 'name')
        .populate('location._id', 'name');

    const response = result.map(data => {
        const studentMap = data.student.map(student => student.name);
        return {
            _id: data._id,
            startTime: DateTime.fromISO(data.startTime).toObject(),
            endTime: DateTime.fromISO(data.endTime).toObject(),
            student: studentMap,
            coach: data.coach,
            location: data.location,
            note: data.note
        }
    });
    res.send(response);
}

exports.setClass = async (req, res) => {
    let { startTime, endTime, studentArr, coachName, location, note } = req.body;
    const coach = await Coach.findOne({ name: coachName });
    const court = await Location.findOne({ name: location.name });
    startTime = DateTime.fromObject(startTime).toISO();
    endTime = DateTime.fromObject(endTime).toISO();

    const lesson = await Class.create({
        startTime,
        endTime,
        coach,
        location: { courtNo: location.courtNo, _id: court },
        note
    });

    const student = studentArr.map(async stud => {
        return await Student.findOne({ name: stud }); 
    });

    lesson.student = await Promise.all(student);
    await lesson.save().catch(err => console.log(err));
    res.send(lesson);
}

exports.updateClass = async (req, res) => {
    let { _id, startTime, endTime, studentArr, coachName, location, note } = req.body;
    const coach = await Coach.findOne({ name: coachName });
    const court = await Location.findOne({ name: location.name });
    startTime = DateTime.fromObject(startTime).toISO();
    endTime = DateTime.fromObject(endTime).toISO();
    
    const lesson = await Class.findByIdAndUpdate(_id, {
        startTime,
        endTime,
        coach,
        location: { courtNo: location.courtNo, _id: court },
        note
    }, { new: true });

    const student = studentArr.map(async stud => {
        return await Student.findOne({ name: stud }); 
    });

    lesson.student = await Promise.all(student);
    await lesson.save().catch(err => console.log(err));
    res.send(lesson);
}  // fix update function, missing ObjectId update //

exports.deleteClass = (req, res) => {
    Class.findByIdAndDelete(req.body._id)
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err));
}

exports.copyClasses = async (req, res) => {
    const { period, startOfWeek } = req.body;
    const startPeriod = DateTime.fromObject(startOfWeek).minus({ weeks: period }).toISO();
    const endPeriod = DateTime.fromObject(startOfWeek).toISO();

    const dbQuery = {
        startTime: { $gt: startPeriod, $lt: endPeriod }
    }

    const classData = await Class.find(dbQuery, { _id: 0 });
    classData.forEach(data => {
        data.startTime = DateTime.fromISO(data.startTime).plus({ weeks: period }).toISO();
        data.endTime = DateTime.fromISO(data.endTime).plus({ weeks: period }).toISO();
    });
    const result = await Class.insertMany(classData);
    res.send(result);
}