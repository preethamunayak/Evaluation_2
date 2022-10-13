const express = require("express");
const router = express.Router();
const User = require("../models/user");

//importing functions of routes from controller
const { getusers, createUser } = require("../controller/userController");

//get all user
router.get("/", getusers);

//create user
router.post("/User", createUser);

// router.patch("/User/:id", (req, res) => {
//     res.send("We are on home");
// });

router.delete("/", (req, res) => {
    res.send("We are on home");
});

module.exports = router;
