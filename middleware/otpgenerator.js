const otpGenerator = require("otp-generator"); //module to generate otp
require("dotenv").config();
module.exports.generateOTP = () => {
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
    return OTP;
};
