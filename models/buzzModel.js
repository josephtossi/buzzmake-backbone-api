const mongoose = require('mongoose');

const buzzSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
            default: ""
        },
        description: {
            type: String,
            required: [true, "Description is required", 100],
            default: ""
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        buzzType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BuzzType',
            required: true
        },
        url: {
            type: String,
            required: [true, "url is mandatory"],
            default: ""
        },
        private: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    { timestamps: true }
)

const Buzz = mongoose.model('Buzz', buzzSchema);

module.exports = Buzz;