require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose');

const buzzRoute = require('./routes/buzzRoute.js');
const authRoute = require('./routes/authRoute.js');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/buzzes', buzzRoute);
app.use('/api/auth', authRoute);

// api general error handle
app.use(async (req, res, next) => next(createError.NotFound("api does not exist")));
app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
});

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to Mongo Database');
        app.listen(PORT, () => console.log(`Node API is running on port ${PORT}`));
    })
    .catch((error) => {
        console.log(`Error Connecting to Database due to : ${error}`);
    });