const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    mobileNum: {
        type: Number,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10 * 86400, // automatically removes after a month
    },
});

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
