const Class = require('./ClassModel');

exports.getClasses = (req, res) => {
    Class.find()
    .then(data => {
        res.send(data);
        console.log(data);
    })
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