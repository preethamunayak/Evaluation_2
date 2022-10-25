const user = require("../../models/user");
const Site = require("../../models/user");

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

module.exports = { clearUserData, clearUserSite };
