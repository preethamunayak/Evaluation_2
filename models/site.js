const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
    url: { type: String, required: true },
    siteName: { type: String, required: true },
    sector: { type: String, required: true },
    userName: { type: String },
    sitePass: { type: String, required: true },
    notes: { type: String, required: true },
});

module.exports = mongoose.model("Site", siteSchema);
