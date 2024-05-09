const buzzModel = require('../models/buzzModel.js');
const userModel = require('../models/userModel.js');

module.exports = {
    getBuzzes: async (req, res, next) => {
        try {
            let buzzes = await buzzModel.find({});
            for (let buzz of buzzes) {
                buzz.user = await userModel
                    .findById(buzz.user)
                    .select('-password -buzzes')
            }
            res.status(200).json({ buzzes: buzzes, count: buzzes.length });
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
            const buzzData = { ...req.body, user: req.userId };
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                buzzData.url = `${baseUrl}/api/buzzes/uploads/${req.file.filename}`;
            }
            const response = await buzzModel.create(buzzData);
            const user = await userModel.findById(req.userId);
            user.buzzes.push(response._id);
            await user.save();
            res.status(200).send({ post: response, userId: user._id });
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
    getFile: async (req, res, next) => {
        try {
            const filename = req.params.filename;
            res.sendFile(filename, { root: 'uploads' });
        } catch (error) {
            next(error);
        }
    }
};