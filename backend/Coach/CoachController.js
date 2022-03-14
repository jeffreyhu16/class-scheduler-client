const Coach = require('./CoachModel');

exports.getCoaches = (req, res) => {
    Coach.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
}