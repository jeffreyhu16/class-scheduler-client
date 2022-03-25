const Class = require('./ClassModel');
const Student = require('../Student/StudentModel');
const Coach = require('../Coach/CoachModel');
const Location = require('../Location/LocationModel');
const { DateTime } = require('luxon');

exports.getClasses = async (req, res) => {
    const { currentDate, startOfWeek, day, location, coach } = req.query;
    const locationDoc = await Location.findOne({ name: location });
    const coachDoc = await Coach.findOne({ name: coach });

    let targetDay;
    if (currentDate) targetDay = DateTime.fromISO(currentDate);
    if (startOfWeek) targetDay = DateTime.fromISO(startOfWeek).plus({ days: day - 1 });

    const dbQuery = {
        'startTime.year': targetDay.year,
        'startTime.month': targetDay.month,
        'startTime.day': targetDay.day
    }
    if (location !== 'all') dbQuery['location._id'] = locationDoc;
    if (coach !== 'all') dbQuery.coach = coachDoc;
    
    Class.find(dbQuery)
        .populate('student', 'name')
        .populate('coach', 'name')
        .populate('location._id', 'name')
        .then(data => res.send(data))
        .catch(err => console.log(err));
}

exports.getWeekClasses = async (req, res) => {
    const { period, startOfWeek } = req.query;
    const startPeriod = DateTime.fromISO(startOfWeek).minus({ weeks: period });
    const endPeriod = DateTime.fromISO(startOfWeek).minus({ days: 1 });

    const dbQuery = {
        'startTime.year': startPeriod.year,
        'startTime.month': { $gte: startPeriod.month, $lte: endPeriod.month },
        'startTime.day': { $gte: startPeriod.day, $lte: endPeriod.day }
    }
    console.log(period, startOfWeek)
    Class.find(dbQuery)
        .populate('student', 'name')
        .populate('coach', 'name')
        .populate('location._id', 'name')
        .then(data => res.send(data))
        .catch(err => console.log(err));
}

exports.setClass = async (req, res) => {
    const { startTime, endTime, studentName, coachName, location, note } = req.body;
    const student = await Student.findOne({ name: studentName });
    const coach = await Coach.findOne({ name: coachName });
    const court = await Location.findOne({ name: location.name });
    if (!student) {
        res.status(400).send();
        return;
    } 
    const lesson = await Class.create({
        startTime,
        endTime,
        coach,
        location: { courtNo: location.courtNo , _id: court},
        note
    })
    lesson.student.push(student);
    await lesson.save().catch(err => console.log(err));
    res.send(lesson);
}

exports.setClasses = async (req, res) => {
    const { week, startOfWeek } = req.body;
    let targetFirstDay;
    if (week === 'previous') targetFirstDay = DateTime.fromISO(startOfWeek).minus({ days: 7 });
    Class.insertMany(res.body)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(err => console.log(err));
}

exports.updateClass = async (req, res) => {
    const { _id, startTime, endTime, studentName, coachName, location, note } = req.body;
    const student = await Student.findOne({ name: studentName }); // query an array //
    const coach = await Coach.findOne({ name: coachName });
    const court = await Location.findOne({ name: location.name });

    const lesson = await Class.findByIdAndUpdate(_id, {
        startTime,
        endTime,
        location: { courtNo: location.courtNo },
        note
    }, { new: true });

    lesson.student.push(student); // assign the queried array directly instead of push //
    lesson.location._id = court;
    lesson.coach = coach;
    await lesson.save().catch(err => console.log(err))
    res.send(lesson);
}  // fix update function, missing ObjectId update //

exports.deleteClass = (req, res) => {
    Class.findByIdAndDelete(req.body.id)
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err));
}