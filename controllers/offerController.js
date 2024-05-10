const buzzModel = require('../models/buzzModel.js');
const userModel = require('../models/userModel.js');
const offerModel = require('../models/offerModel.js');
const catchError = require('http-errors');

module.exports = {
    sendOffer: async (req, res, next) => {
        try {
            const offerData = { ...req.body, userId: req.userId };
            const { buzzId } = req.body;

            const buzz = await buzzModel.findById(buzzId);
            if (!buzz) throw catchError.NotFound(`Buzz with ID ${buzzId} is not found`);


            const userAlreadyOffered = await offerModel.findOne({
                userId: req.userId,
                buzzId: buzzId
            });
            if (userAlreadyOffered) throw catchError.Forbidden(`Already applied to Buzz with ID ${buzzId}, you can only send one offer`);

            // Create the offer
            const response = await offerModel.create(offerData);

            // Push the offer to the buzz created
            buzz.offers.push(response._id);
            await buzz.save();

            res.status(200).send({ offer: response, userId: req.userId });
        } catch (error) {
            next(error);
        }
    },
};