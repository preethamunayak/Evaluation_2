const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signUp, signIn } = require("../controller/auth");

router.post("/signUp", signUp);
router.post("/signIn", signIn);
module.exports = router;
