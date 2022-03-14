const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const db = require('./config/db');
const IndexRouter = require('./IndexRouter');

db.connectDB();
IndexRouter.combinedRoute(app);

const path = require('path');
app.use(express.static(path.join(__dirname,'../frontend/build')));

app.listen(5000, () => console.log('Listening on port 5000'));

module.exports = app;