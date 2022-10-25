const jwt = require("jsonwebtoken");
const Token = require("../models/token");

const generateToken = async (user) => {
    try {
        const accessToken = jwt.sign(
            { mobileNum: user.mobileNum },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );
        const refreshToken = jwt.sign(
            { mobileNum: user.mobileNum },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10d" }
        );

        const userToken = await Token.findOne({
            mobileNum: user.mobileNum,
        });
        if (userToken) await userToken.remove(); // remove matched document with old refresh token

        await new Token({
            mobileNum: user.mobileNum,
            refreshToken: refreshToken,
        }).save(); // create new document with new refresh token
        return Promise.resolve(accessToken);
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = generateToken;
