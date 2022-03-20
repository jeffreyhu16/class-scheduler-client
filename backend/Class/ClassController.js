const Class = require('./ClassModel');
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

exports.setClass = (req, res) => {
    Class.create(req.body)
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => console.log(err));
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