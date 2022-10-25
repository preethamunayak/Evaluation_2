require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //one way hasing of password

//Pre defined schema for sites
const userSchema = new mongoose.Schema({
    mobileNum: {
        type: Number,
        required: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 10;
            },
            message: (val) => `${val.value} has to be 10 digits`,
        },
    },
    mPin: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 4;
            },
            message: (val) => `${val.value} has to be 4 digits`,
        },
    },

    loggedIn: { type: Boolean, default: false, required: false },
    otp: { type: String, required: false, default: null },
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_VALUE));
    this.mPin = await bcrypt.hash(this.mPin, salt);
    next();
});

module.exports = mongoose.model("User", userSchema);
