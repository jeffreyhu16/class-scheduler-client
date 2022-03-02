const express = require('express');
const app = express();

const dateRouter = require('./Date/DateRouter')
const classRouter = require('./Class/ClassRouter')
app.use('/date', dateRouter);
app.use('/class', classRouter);


const path = require('path');
app.use(express.static(path.join(__dirname,'../frontend/build')));

app.listen(5000, () => console.log('Listening on port 5000'));

module.exports = app;   