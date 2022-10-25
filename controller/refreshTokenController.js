require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyRefToken = require("../utils/verifyRefToken");

exports.GetNewAccessToken = async (req, res) => {
    try {
        const result = await verifyRefToken(req.body.refreshToken).catch(
            (err) => res.send(err)
        );
        const accessToken = jwt.sign(
            { mobileNum: result.tokenDetails.mobileNum },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        );
        res.status(200).json({
            error: false,
            accessToken,
            message: "Generated access token",
        });
    } catch (err) {
        res.status(400).json(err.message);
    }
};
