const mongoose = require('mongoose');
const buzzTypeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true],
        },
    },
)
const BuzzType = mongoose.model('BuzzType', buzzTypeSchema);
module.exports = BuzzType;