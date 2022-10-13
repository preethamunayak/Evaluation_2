const bcrypt = require("bcrypt");
const User = require("../models/user");

const signUp = async (req, res) => {
    try {
        const user = await User.findOne({ mobileNum: req.body.mobileNum });
        if (user)
            res.json({
                message: "You have already registered. Please Sign-In.",
            });
        else {
            try {
                User.create({
                    mobileNum: req.body.mobileNum,
                    mPin: req.body.mPin,
                });
                res.json({ message: "Created user" });
            } catch (err) {
                res.json({ message: "Invalid details" });
            }
        }
    } catch (err) {
        res.json({ message: err.message });
    }
};

const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ mobileNum: req.body.mobileNum });
        if (!user) res.json({ message: "Invalid User Details" });
        else {
            const result = await bcrypt.compare(
                req.body.mPin.toString(),
                user.mPin
            );
            if (result) {
                res.json({ message: "Login successfull" });
            } else {
                res.json({ message: "Invalid credentials" });
            }
        }
    } catch (err) {
        res.json({ message: err.message });
    }
};
module.exports = { signUp, signIn };
