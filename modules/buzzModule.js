const Joi = require('joi')
const express = require('express');
const app = express();

// middleware
app.use(express.json());

const buzzes = [
    {
        'id': 1,
        "name": "new poster",
        "poster": { 'id': 3, 'name': 'tania' },
        'url': 'www.fav.com'
    },
    {
        'id': 2,
        "name": "amazing news",
        "poster": { 'id': 4, 'name': 'joe' },
        'url': 'www.fav1.com'
    },
];


const getAllBuzzes = () => {
    try {
        app.get('/api/buzzes', (req, res) => {
            res.status(200).send(buzzes)
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getBuzz = () => {
    try {
        app.get('/api/buzzes/:id', (req, res) => {
            try {
                const buzz = buzzes.find(b => b.id === parseInt(req.params.id));
                if (!buzz) {
                    res.status(404).send({ 'message': 'buzz is not found' })
                } else {
                    res.status(200).send(buzz)
                }
            } catch (e) {
                res.status(500).send({ 'message': 'internal server error' });
            }
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const addBuzz = () => {
    try {
        app.post('/api/buzzes', (req, res) => {
            const { error } = validateBuzz(req.body);
            if (error) {
                res.status(400).send({ 'message': validation.error.details });
                return;
            } else {
                const buzz = {
                    id: buzzes.length + 1,
                    name: req.body.name
                };
                buzzes.push(buzz);
                res.send(buzz)
            }
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const editBuzz = () => {
    try {
        app.put('/api/buzzes/:id', (req, res) => {
            const buzz = buzzes.find(b => b.id === parseInt(req.params.id));
            const { error } = validateBuzz(req.body);
            if (!buzz) {
                res.status(404).send({ 'message': 'buzz doesnt exist' });
                return;
            } else {
                if (error) {
                    res.status(400).send({ 'message': validation.error.details });
                    return;
                } else {
                    console.log(buzz);
                    buzz.name = req.body.name;
                    buzz.url = req.body.url;
                    res.status(200).send({ 'message': `buzz with ${buzz.id} updated` })
                }
            }
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteBuzz = () => {
    try {
        app.delete('/api/buzzes/:id', (req, res) => {
            const buzz = buzzes.find(b => b.id === parseInt(req.params.id));
            if (!buzz) {
                res.status(404).send({ 'message': 'buzz doesnt exist' });
                return;
            } else {
                const index = buzzes.indexOf(buzz)
                buzzes.splice(index, 1);
                res.status(200).send({ 'message': 'Deleted Success' });
            }
        });
    } catch (error) {
        console.log(`Login handeled error: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

function validateBuzz(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        url: Joi.required()
    });
    console.log(schema.validate(body));
    return schema.validate(body);
}

// exports 
module.exports.getAllBuzzes = getAllBuzzes;
module.exports.getBuzz = getBuzz;
module.exports.addBuzz = addBuzz;
module.exports.editBuzz = editBuzz;
module.exports.deleteBuzz = deleteBuzz;
