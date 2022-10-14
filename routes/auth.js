const express = require("express");
const router = express.Router();
const { signUp, signIn, forgotPass } = require("../controller/authController");
const authenticate = require("../middleware/auth");
const {
    viewSite,
    addSite,
    editSite,
    searchSector,
    search,
} = require("../controller/siteController");

//routes for different operations
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/mySites", authenticate, viewSite);
router.post("/mySites/addSite", authenticate, addSite);
router.post("/mySites/editSite", authenticate, editSite);
router.post("/mySites/searchSite", authenticate, searchSector);
router.get("/mySites/search", authenticate, search);
router.post("/forgotPassword", forgotPass);

module.exports = router;
