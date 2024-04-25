const express = require('express');
const buzzModel = require('../models/buzzModel.js');
const router = express.Router();

const catchError = (res, error) => res.status(500).json({ message: error.message });

router.get('/', async (req, res) => {
    try {
        const buzzes = await buzzModel.find({});
        res.status(200).json(buzzes);
    } catch (error) {
        catchError(res, error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const buzz = await buzzModel.findById(id)
        res.status(200).send(buzz);
    } catch (error) {
        catchError(res, error);
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await buzzModel.create(req.body);
        res.status(200).send(response);
    } catch (error) {
        catchError(res, error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const buzz = await buzzModel.findByIdAndUpdate(id, req.body);
        if (!buzz) {
            res.status(404).json({ message: `product with ${id} is not found` });
        } else {
            const updatedProduct = await buzzModel.findById(id);
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        catchError(res, error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const buzz = await buzzModel.findByIdAndDelete(id);
        if (buzz) {
            res.status(200).json({ message: `product with ${id} is deleted successfully` });
        } else {
            res.status(404).json({ message: `product with ${id} not found` });
        }
    } catch (error) {
        catchError(res, error);
    }
});

module.exports = router;
