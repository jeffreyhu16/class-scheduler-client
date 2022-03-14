const Location = require('./LocationModel');

exports.getLocations = (req, res) => {
    Location.find()
    .then(data => res.send(data))
    .catch(err => console.log(err));
}