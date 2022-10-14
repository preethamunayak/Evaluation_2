const mongoose = require("mongoose");
//establishing database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () =>
    console.log("Connected to Database")
);
