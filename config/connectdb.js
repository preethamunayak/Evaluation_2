const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () =>
    console.log("Connected to Database")
);
