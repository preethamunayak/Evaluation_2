require("dotenv").config();
const bcrypt = require("bcrypt"); //used to hash mPin
const User = require("../models/user");
const Token = require("../models/token");
const speakeasy = require("speakeasy");
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

//sending otp
const sendOTP = async (req, res) => {
    try {
        const secret = speakeasy.generateSecret({ length: 10 });
        res.send({
            OTP: speakeasy.totp({
                secret: secret.base32,
                encoding: "base32",
                step: 60,
            }),
            secret: secret.base32,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
};

//verification of number using speakeasy
let verifyNum = async (req, res, next) => {
    try {
        const result = speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.OTP,
            window: 0,
            step: 60,
        });
        if (result) {
            // res.send({
            //     message: "Verified",
            // });
            next();
        } else {
            res.json({ message: "Verification unsuccessful" });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
};
//function to forgot password
let forgotPass = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_VALUE));
        const newmPin = await bcrypt.hash(req.body.mPin.toString(), salt);
        await User.findOneAndUpdate(
            { mobileNum: req.body.mobileNum },
            { mPin: newmPin }
        );
        res.json({ message: "MPin changed successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

//password reset when logged in
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
//logout function
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
