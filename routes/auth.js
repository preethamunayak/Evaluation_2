const express = require("express");
const router = express.Router();
const {
    signUp,
    signIn,
    forgotPass,
    resetPass,
    logout,
    sendOTP,
    verifyNum,
} = require("../controller/authController");
const authenticate = require("../middleware/auth");
const {
    viewSites,
    addSite,
    editSite,
    searchSector,
    search,
    upload,
    deleteSite,
} = require("../controller/siteController");
const { GetNewAccessToken } = require("../controller/refreshTokenController");

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

router.delete("/mySites/removeSite", authenticate, deleteSite);

router.post("/mySites/searchSite", authenticate, searchSector);

router.get("/mySites/search", authenticate, search);

router.get("/sendOTP", sendOTP);

router.post("/verify", verifyNum, forgotPass);

router.patch("/resetPassword", authenticate, resetPass);

router.get("/refreshToken", GetNewAccessToken);

router.delete("/logout", authenticate, logout);

module.exports = router;
