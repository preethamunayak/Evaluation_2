const express = require("express");
const router = express.Router();
const {
    clearUserData,
    clearUserSite,
    clearRefToken,
} = require("../../controller/admin/authController");

//routes for admin purpose
router.delete("/admin/clearUser", clearUserData);
router.delete("/admin/clearSite", clearUserSite);
router.delete("/admin/reftoken", clearRefToken);
module.exports = router;
