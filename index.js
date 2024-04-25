// external modules
const express = require('express');
const mongoose = require('mongoose');
// project modules
const buzzModule = require('./modules/buzzModule.js');
// project models
const buzzModel = require('./models/buzzModel.js')

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());


const catchError = (res, error) => res.status(500).json({ message: error.message });


const getAllBuzzes = () => {
    app.get('/api/buzzes', async (req, res) => {
        try {
            const buzzes = await buzzModel.find({});
            res.status(200).json(buzzes);
        } catch (error) {
            catchError(res, error);
        }
    });
}

const getBuzz = () => {
    app.get('/api/buzzes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const buzz = await buzzModel.findById(id)
            res.status(200).send(buzz);
        } catch (error) {
            catchError(res, error);
        }
    });

}

const addBuzz = () => {
    app.post('/api/buzzes', async (req, res) => {
        try {
            const response = await buzzModel.create(req.body);
            res.status(200).send(response);
        } catch (error) {
            catchError(res, error);
        }
    });
}

const startServer = () => {
    mongoose.connect('mongodb+srv://root:Admin12345!@buzzmakeapi.qg2unda.mongodb.net/Node-API?retryWrites=true&w=majority&appName=buzzmakeAPI').then(() => {
        console.log('Connected to Mongo Databse');
        // initiate all apis
        getAllBuzzes();
        getBuzz();
        addBuzz();
        app.listen(port, () => console.log(`Node API is running on port ${port}`));
    }).catch((error) => {
        console.log(`Error Connecting to Database due to : ${error}`);
    })
}

startServer();
