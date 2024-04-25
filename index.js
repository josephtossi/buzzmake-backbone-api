require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const buzzController = require('./controllers/buzzController.js');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/buzzes', buzzController);

// Database connection and server start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to Mongo Database');
        app.listen(port, () => console.log(`Node API is running on port ${port}`));
    })
    .catch((error) => {
        console.log(`Error Connecting to Database due to : ${error}`);
    });