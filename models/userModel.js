const mongoose = require('mongoose');
const Buzz = require('./buzzModel');

// model schema using mongoose
const userSchema = mongoose.Schema(
    {
        email:
        {
            type: String,
            required: true,
            lowecase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, "Name field is required"],
            default: ""
        },
        buzzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Buzz' }]
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);

// exporting model for use 
module.exports = User;