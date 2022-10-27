const user = require("../../models/user");
const Site = require("../../models/user");
const Token = require("../../models/token");

//routes for admin purpose
const clearUserData = async (req, res) => {
    try {
        await user.deleteMany();
        res.json({ message: "Deleted all users" });
    } catch (error) {
        res.json({ error });
    }
};
const clearUserSite = async (req, res) => {
    try {
        await Site.deleteMany();
        res.json({ message: "Deleted all sites" });
    } catch (error) {
        res.json({ error });
    }
};

const clearRefToken = async (req, res) => {
    try {
        await Token.deleteMany();
        res.json({ message: "Deleted all refresh tokens" });
    } catch (error) {
        res.json({ error });
    }
};
module.exports = { clearUserData, clearUserSite, clearRefToken };
