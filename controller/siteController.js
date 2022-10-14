const Site = require("../models/site");
const Cryptr = require("cryptr"); //used for encryption and decryption of site passwords
const cryptr = new Cryptr("myTotallySecretKey");

// function to view Site
const viewSite = async (req, res) => {
    try {
        let sector = req.body.sector;
        await Site.find(
            {
                $and: [{ sector: sector }, { mobileNum: req.user.mobileNum }],
            },
            { __v: 0 },
            function (err, documents) /*callback*/ {
                if (err) return res.sendStatus(401).send(err);
                else {
                    if (documents.length == 0) {
                        return res.send(`No sites in ${sector} category!`);
                    }
                    return res.send(documents);
                }
            }
        ).clone();
    } catch (err) {
        res.json({ message: err.message });
    }
};

// function to add Site ,stores site wth encrypted password
let addSite = async (req, res) => {
    try {
        const site = new Site({
            mobileNum: req.user.mobileNum,
            url: req.body.url,
            siteName: req.body.siteName,
            sector: req.body.sector,
            userName: req.body.userName,
            password: cryptr.encrypt(req.body.password),
            notes: req.body.notes,
        });

        site.save((err) => {
            if (err) return res.send(err);
            else {
                res.send("Saved Successfully");
            }
        });
    } catch (err) {
        res.json({ message: err.message });
    }
};

// function to edit Site
const editSite = async (req, res) => {
    try {
        await Site.find(
            {
                $and: [
                    { mobileNum: req.user.mobileNum },
                    { siteName: req.body.siteName },
                    { userName: req.body.userName },
                ],
            },
            { __v: 0 } /*projection*/,
            function (err, documents) /*callback*/ {
                if (err) return res.sendStatus(401).send(err);
                else return res.send(documents);
            }
        ).clone();
    } catch (err) {
        res.json({ message: err.message });
    }
};

// function to search Site using sector
const searchSite = async (req, res) => {
    try {
        let sector = req.body.sector;
        await Site.find(
            {
                $and: [{ sector: sector }, { mobileNum: req.user.mobileNum }],
            },
            { __v: 0 },
            function (err, documents) /*callback*/ {
                if (err) return res.sendStatus(401).send(err);
                else {
                    if (documents.length == 0) {
                        return res.send(`No sites in ${sector} category!`);
                    }
                    return res.send(documents);
                }
            }
        ).clone();
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports = { viewSite, addSite, searchSite, editSite };
