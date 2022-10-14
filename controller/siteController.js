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
        return res.json({ message: err.message });
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
        return res.json({ message: err.message });
    }
};

// function to edit Site
const editSite = async (req, res) => {
    try {
        const result = await Site.find(
            { _id: req.body._id },
            { __v: 0, mobileNum: 0 },
            function (err) {
                if (err) return res.sendStatus(401).send(err);
            }
        ).clone();
        delete req.body._id;
        delete req.body.mobileNum;
        if (req.body.password) {
            req.body.password = await cryptr.encrypt(req.body.password);
        }
        const data = await Site.findByIdAndUpdate(
            { _id: result[0]._id },
            req.body,
            function (err) {
                if (err) console.log(err);
            }
        ).clone();
        data.password = cryptr.decrypt(data.password);
        res.send(data);
    } catch (err) {
        return res.json({ message: err.message });
    }
};

// function to search Site using sector
const searchSector = async (req, res) => {
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
        return res.json({ message: err.message });
    }
};

const search = async (req, res) => {
    try {
        let search = req.query.search || req.body.search;
        var regex = new RegExp(search, "i"); //case insensitive
        await Site.find(
            { mobileNum: req.user.mobileNum, $text: { $search: regex } },
            (err, docs) => {
                if (docs) {
                    res.status(200).send({ docs });
                } else res.send(err);
            }
        ).clone();
    } catch (err) {
        return res.json({ message: err.message });
    }
};

module.exports = { viewSite, addSite, searchSector, editSite, search };
