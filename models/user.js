const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
});

userSchema.pre("save", async function (next) {
    this.mPin = await bcrypt.hash(this.mPin, 8);
    next();
});
module.exports = mongoose.model("User", userSchema);
