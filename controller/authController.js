require("dotenv").config();
const bcrypt = require("bcrypt"); //used to hash mPin
const jwt = require("jsonwebtoken"); //used to create token during signup
const User = require("../models/user");

//function for the signup of user
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

// function for users sign in
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
                // if (
                //     await User.findOne(
                //         { mobileNum: req.body.mobileNum },
                //         { loggedIn: true }
                //     )
                // ) {
                //     res.json({ message: "You have already logged" });
                // }
                await User.findOneAndUpdate(
                    { mobileNum: req.body.mobileNum },
                    { loggedIn: true }
                );
                //created access token with expiry of 1day
                const accessToken = jwt.sign(
                    { mobileNum: user.mobileNum },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "1d" }
                );
                //created refresh token with expiry of 7days
                const refreshToken = jwt.sign(
                    { mobileNum: user.mobileNum },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: "7d" }
                );
                res.json({
                    AccessToken: accessToken,
                    // RefreshToken: refreshToken,
                    message: "Login successfull",
                });
            } else {
                res.json({ message: "Invalid credentials" });
            }
        }
    } catch (err) {
        res.json({ message: err.message });
    }
};

//function to forgot password
let forgotPass = async (req, res) => {
    try {
        const user = await User.findOne({ mobileNum: req.body.mobileNum });
        if (!user) {
            res.json({
                message:
                    "You do not have a registered account. Please Sign up.",
            });
        } else {
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_VALUE));
            const newPass = await bcrypt.hash(req.body.mPin.toString(), salt);
            await User.findOneAndUpdate(
                { mobileNum: req.body.mobileNum },
                { mPin: newPass }
            );
            res.json({
                message: "Password reset",
            });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
};

let logout = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { mobileNum: req.body.mobileNum },
            { loggedIn: false }
        );
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports = { signUp, signIn, forgotPass, logout };
