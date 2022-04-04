const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const db = require('./config/db');
const IndexRouter = require('./IndexRouter');
const path = require('path');

db.connectDB();
IndexRouter.combinedRoute(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'/frontend/build/index.html'))
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening on port 5000'));

module.exports = app;