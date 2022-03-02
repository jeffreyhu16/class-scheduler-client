const express = require('express');
const app = express();
app.use(express.json());

exports.postSingleForm = (req, res) => {
    const inputs = req.body.inputs;
    res.send(inputs);
}