const express = require('express');
const buzzModel = require('../models/buzzModel.js');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwt_helper.js')

router.get('/', verifyAccessToken, async (req, res, next) => {
    try {
        console.log(req.headers['authorization'])
        const buzzes = await buzzModel.find({});
        res.status(200).json(buzzes);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', verifyAccessToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const buzz = await buzzModel.findById(id)
        res.status(200).send(buzz);
    } catch (error) {
        next(error);
    }
});

router.post('/', verifyAccessToken, async (req, res, next) => {
    try {
        const response = await buzzModel.create(req.body);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', verifyAccessToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const buzz = await buzzModel.findByIdAndUpdate(id, req.body);
        if (!buzz) {
            res.status(404).json({ message: `buzz with ${id} is not found` });
        } else {
            const updatedProduct = await buzzModel.findById(id);
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', verifyAccessToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const buzz = await buzzModel.findByIdAndDelete(id);
        if (buzz) {
            res.status(200).json({ message: `buzz with ${id} is deleted successfully` });
        } else {
            res.status(404).json({ message: `buzz with ${id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;