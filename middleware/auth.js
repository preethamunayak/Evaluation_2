const jwt = require("jsonwebtoken"); //to verify token

//function to authenticate the user to give access to necessary operation
function authenticate(req, res, next) {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (token == null) return res.send("Authentication header not found");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send(err);
        req.user = user;
    });
    console.log(req.user);
    next();
}

module.exports = authenticate;
