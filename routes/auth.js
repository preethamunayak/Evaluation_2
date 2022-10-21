const express = require("express");
const router = express.Router();
const {
    signUp,
    signIn,
    forgotPass,
    logout,
} = require("../controller/authController");
const authenticate = require("../middleware/auth");
const {
    viewSites,
    addSite,
    editSite,
    searchSector,
    search,
    upload,
} = require("../controller/siteController");

//routes for different operations
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/mySites", authenticate, viewSites);
router.post("/mySites/addSite", authenticate, addSite);
router.post(
    "/mySites/upload/logo",
    authenticate,
    upload.single("logo"),
    async (req, res) => {
        res.status(200).json({ message: "Uploaded Logo" });
    },
    (error, req, res, next) => {
        res.status(400).json({ message: error.message });
    }
);
router.patch("/mySites/editSite", authenticate, editSite);
router.post("/mySites/searchSite", authenticate, searchSector);
router.get("/mySites/search", authenticate, search);
router.post("/forgotPassword", forgotPass);
router.post("/logout", authenticate, logout);

module.exports = router;
