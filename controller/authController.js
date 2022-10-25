require("dotenv").config();
const bcrypt = require("bcrypt"); //used to hash mPin
const User = require("../models/user");
const Token = require("../models/token");
const otp = require("../middleware/otpgenerator");
const generateToken = require("../utils/generateToken");

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
                await User.findOneAndUpdate(
                    { mobileNum: req.body.mobileNum },
                    { loggedIn: true }
                );
                const token = await generateToken(user);
                res.json({
                    access_token: token,
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

const sendOTP = async (req, res) => {
    try {
        const Otp = otp.generateOTP();

        await User.findOneAndUpdate(
            { mobileNum: req.body.mobileNum },
            { otp: Otp }
        );
        res.json({ message: "Your otp is " + Otp });
    } catch (err) {
        res.json({ message: err.message });
    }
};

let verifyNum = async (req, res) => {
    try {
        const user = await User.findOne({ mobileNum: req.body.mobileNum });
        if (user) {
            if ((user.otp = req.body.otp)) {
            }
        }
        res.json({ user });
    } catch (err) {
        res.json({ message: err.message });
    }
};
//function to forgot password
let forgotPass = async (req, res) => {
    try {
        const result = await User.findOne({ mobileNum: req.user.mobileNum });
    } catch (err) {
        res.json({ message: err.message });
    }
};

let resetPass = async (req, res) => {
    try {
        const user = await User.findOne({ mobileNum: req.user.mobileNum });
        const result = await bcrypt.compare(
            req.body.mPin.toString(),
            user.mPin
        );

        if (result) {
            res.json({ message: "Your new mPin cannot be same as old!" });
        } else {
            const salt = await bcrypt.genSalt(parseInt(process.env.SALT_VALUE));
            const newmPin = await bcrypt.hash(req.body.mPin.toString(), salt);
            await User.findOneAndUpdate(
                { mobileNum: req.user.mobileNum },
                { mPin: newmPin }
            );
            res.json({ message: "MPin changed successfully" });
        }
    } catch (error) {
        res.json({ message: error });
    }
};
let logout = async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { mobileNum: req.body.mobileNum },
            { loggedIn: false }
        );
        const userToken = await Token.findOne({
            refreshToken: req.body.refreshToken,
        }); // finding document with the matched refresh token
        if (!userToken) {
            return res.status(200).json({
                error: false,
                message: "You have logged out already!",
            }); // if no user exists, by default return logged out
        } else {
            await userToken.remove();
            res.json({ error: false, message: "Logged out successfully" });
        }
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
};

module.exports = {
    signUp,
    signIn,
    forgotPass,
    sendOTP,
    resetPass,
    logout,
    verifyNum,
};
