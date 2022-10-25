const otpGenerator = require("otp-generator"); //module to generate otp
require("dotenv").config();
module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(parseInt(process.env.OTP_LENGTH), {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
