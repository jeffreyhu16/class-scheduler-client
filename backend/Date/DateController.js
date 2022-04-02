const { DateTime } = require('luxon')

exports.getCurrentDate = (req, res) => {
    const currentDate = DateTime.local().startOf('day');
    res.send(currentDate.toObject());
}

exports.getStartOfWeek = (req, res) => {
    const currentDate = DateTime.local();
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

exports.getTimeOptions = (req, res) => {
    let response = []; 
    let startOfDay = DateTime.local().startOf('day').set({ hour: 6 });
    for (let i = 0; i <= 72; i++) {
        let option = startOfDay.toFormat('h:mm a').toLowerCase();
        response.push(option);
        startOfDay = startOfDay.plus({ minutes: 15 });
    }
    res.send(response);
}
