const express = require("express");
const router = express.Router();
const {
    clearUserData,
    clearUserSite,
} = require("../../controller/admin/authController");

router.delete("/admin/clearUser", clearUserData);
router.post("/admin/clearSite", clearUserSite);
module.exports = router;
