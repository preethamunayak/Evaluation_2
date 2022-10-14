require("dotenv").config(); //importing confidentials
require("./config/connectdb"); //db connect
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const auth = require(".//routes/auth");

//ROUTES
app.use(express.json());
app.use(auth);
app.use(cors());

//listen server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
