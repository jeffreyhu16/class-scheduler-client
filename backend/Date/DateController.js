const { DateTime } = require('luxon')

exports.getStartOfWeek = (req, res) => {
    const currentDate = DateTime.local({ zone: 'Australia/Melbourne' });
    const monday = currentDate.startOf('week');
    res.send(monday.toObject());
}

exports.getFullWeek = (req, res) => {
    const { startOfWeek } = req.query;
    const monday = DateTime.fromISO(startOfWeek);

    res.send({
        mon: monday.toObject(),
        tue: monday.plus({days: 1}).toObject(),
        wed: monday.plus({days: 2}).toObject(),
        thu: monday.plus({days: 3}).toObject(),
        fri: monday.plus({days: 4}).toObject(),
        sat: monday.plus({days: 5}).toObject(),
        sun: monday.plus({days: 6}).toObject(),
    });
};

