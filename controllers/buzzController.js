const buzzModel = require('../models/buzzModel.js');

module.exports = {
    getbuzzes: async (req, res, next) => {
        try {
            console.log(req.headers['authorization'])
            const buzzes = await buzzModel.find({});
            res.status(200).json(buzzes);
        } catch (error) {
            next(error);
        }
    },
    getBuzz: async (req, res, next) => {
        try {
            const { id } = req.params;
            const buzz = await buzzModel.findById(id)
            res.status(200).send(buzz);
        } catch (error) {
            next(error);
        }
    },
    postBuzz: async (req, res, next) => {
        try {
            const response = await buzzModel.create(req.body);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    },
    editBuzz: async (req, res, next) => {
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
    },
    deleteBuzz: async (req, res, next) => {
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
    },
};