const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getusers = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch {
        res.json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    let user = new User({
        mobileNum: req.body.mobileNum,
        mPin: req.body.mPin,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getusers, createUser };
