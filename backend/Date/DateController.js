const { DateTime } = require('luxon')

exports.getFullWeek = (req, res) => {
    const currentDate = DateTime.local({ zone: 'Australia/Melbourne' });
    const monday = currentDate.startOf('week');

    res.send({
        mon: monday.toISODate(),
        tue: monday.plus({days: 1}).toISODate(),
        wed: monday.plus({days: 2}).toISODate(),
        thu: monday.plus({days: 3}).toISODate(),
        fri: monday.plus({days: 4}).toISODate(),
        sat: monday.plus({days: 5}).toISODate(),
        sun: monday.plus({days: 6}).toISODate(),
    });
};

