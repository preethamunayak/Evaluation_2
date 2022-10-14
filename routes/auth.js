const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/authController");
const authenticate = require("../middleware/auth");
const {
    viewSite,
    addSite,
    editSite,
    searchSite,
} = require("../controller/siteController");

//routes for different operations
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/mySites", authenticate, viewSite);
router.post("/mySites/addSite", authenticate, addSite);
router.post("/mySites/editSite", authenticate, editSite);
router.post("/mySites/searchSite", authenticate, searchSite);

module.exports = router;
