const userModel = require('../models/userModel.js');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userModel.find({})
            .select('-password -buzzes');
            res.status(200).json({users: users, count: users.length});
        } catch (error) {
            next(error);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userModel.findById(id)
            .select('-password -buzzes');
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    },
    getUserBuzzes: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userModel.findOne({ _id: id })
            .select('-password -buzzes')
            .populate('buzzes');
            res.status(200).send({buzzes: user.buzzes, count: user.buzzes.length});
        } catch (error) {
            next(error);
        }
    },
};