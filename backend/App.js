const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname,'../frontend/build')));

const indexRouter = require('./router/index')
app.use('/', indexRouter);


app.listen(5000, () => console.log('Listening on port 5000'));

module.exports = app;   