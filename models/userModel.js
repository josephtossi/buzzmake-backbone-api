const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

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

// called before saving a user
userSchema.pre('save', async function (next) {
    try {
        const salt = await bCrypt.genSalt(9);
        const hashedPassword = await bCrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (e) {
        next(error);
    }
});

// called after saving a user
userSchema.post('save', async function (next) {
    try {
        console.log('User saved');
    } catch (e) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bCrypt.compare(password, this.password);
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;