const mongoose = require('mongoose');

// model schema using mongoose
const buzzSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
            default: ""
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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

// exporting model for use 
module.exports = Buzz;