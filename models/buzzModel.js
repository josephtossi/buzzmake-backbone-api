const mongoose = require('mongoose');

// model schema using mongoose
const buzzSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field is required"],
            default: ""
        },
        poster: {
            type: Map,
            required: [true, "Every buzz should have a poster"],
            default: {}
        },
        url: {
            type: String,
            required: [true, "url is mandatory"],
            default: "https://google.com"
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