const mongoose = require('mongoose');

const offerSchema = mongoose.Schema(
    {
        price: {
            type: Number,
            validate: {
                validator: function (offerPrice) {
                    return offerPrice >= 1;
                },
                message: props => `${props.value} is not a good price. offer price must be between 1 and 100`
            }
        },
        userId: {
            type: String,
            required: true
        },
        buzzId: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;