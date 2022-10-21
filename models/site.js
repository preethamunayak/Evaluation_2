const mongoose = require("mongoose");

//Pre defined schema for sites
let siteSchema = new mongoose.Schema({
    mobileNum: { type: Number },
    url: { type: String, required: true },
    siteName: { type: String, required: true },
    sector: { type: String, required: true },
    userName: { type: String },
    password: { type: String, required: true },
    notes: { type: String },
    image: { type: String, required: false },
});

siteSchema.index({ "$**": "text" });
module.exports = mongoose.model("Site", siteSchema);
