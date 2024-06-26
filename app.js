const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose');

// route constants
const buzzRoute = require('./routes/buzzRoute.js');
const buzzTypesRoute = require('./routes/buzzTypesRoute.js');
const offerRoute = require('./routes/offerRoute.js');
const authRoute = require('./routes/authRoute.js');
const usersRoute = require('./routes/usersRoute.js');

// helpers constants
const mongooseHelper = require('./helpers/mongoosedb_helper.js');
const redisClient = require('./helpers/init_redis.js');

const specs = require('./swagger/swagger.js');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/buzzes', buzzRoute);
app.use('/api/buzz-types', buzzTypesRoute);
app.use('/api/offer', offerRoute)
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
}));

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
mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log('Connected to Mongo Database');
        mongooseHelper.closeDatabaseConnectionOnAbort();
        redisClient.connectToRedis();
        app.listen(PORT, () => console.log(`Node API is running on port ${PORT}`));
    })
    .catch((error) => {
        console.log(`Error Connecting to Database due to : ${error}`);
    });