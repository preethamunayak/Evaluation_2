require("dotenv").config(); //importing confidentials
require("./config/connectdb"); //db connect
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const userRoute = require("./routes/user");
const auth = require(".//routes/auth");
//ROUTES
app.use(express.json());
app.use(userRoute);
app.use(auth);
app.use(cors());
// app.get("/", (req, res) => {
//     res.send("We are on home");
// });
// app.get("/posts", (req, res) => {
//     res.send("We are on posts");
// });

//listen server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
