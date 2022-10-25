const Token = require("../models/token");
const jwt = require("jsonwebtoken");

const verifyRefToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_SECRET;

    return new Promise((resolve, reject) => {
        Token.findOne({ refreshToken: refreshToken }, (err, doc) => {
            if (!doc)
                return reject({
                    error: true,
                    message: "Token not Valid",
                }); // if there is no document to verify refresh token then return error response

            jwt.verify(
                refreshToken.toString(),
                privateKey.toString(),
                (err, tokenDetails) => {
                    // compare refresh tokens
                    if (err)
                        return reject({
                            error: true,
                            message: "Invalid refresh token",
                        });
                    resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token",
                    });
                }
            );
        });
    });
};

module.exports = verifyRefToken;
