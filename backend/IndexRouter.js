const express = require('express');
const dateRouter = require('./Date/DateRouter');
const classRouter = require('./Class/ClassRouter');
const locationRouter = require('./Location/LocationRouter');
const coachRouter = require('./Coach/CoachRouter');

exports.combinedRoute = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/date', dateRouter);
    app.use('/class', classRouter);
    app.use('/location', locationRouter);
    app.use('/coach', coachRouter);
}

