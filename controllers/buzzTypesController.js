const buzzTypeModel = require('../models/buzzTypeModel.js');
const createError = require('http-errors');

module.exports = {
    getBuzzTypes: async (req, res, next) => {
        try {
            const buzzTypes = await buzzTypeModel.find({});
            res.status(200).json({ buzzTypes: buzzTypes, count: buzzTypes.length });
        } catch (error) {
            next(error);
        }
    },
    addBuzzType: async (req, res, next) => {
        try {
            const { name } = req.body;
            const typeExists = await buzzTypeModel.findOne({ name: name });
            if (typeExists) throw createError.Conflict(`type ${name} already exist, please change the name`);
            const response = await buzzTypeModel.create(req.body);
            res.status(200)
                .send({
                    message: "buzz type created",
                    buzzType: response
                })
        } catch (error) {
            next(error);
        }
    },
    deleteBuzzType: async (req, res, next) => {
        try {
            const { id } = req.params;
            const buzz = await buzzTypeModel.findByIdAndDelete(id);
            if (buzz) {
                res.status(200).json({ message: `buzz type with id ${id} is deleted successfully` });
            } else {
                res.status(404).json({ message: `buzz type with ${id} not found` });
            }
        } catch (error) {
            next(error);
        }
    },
};