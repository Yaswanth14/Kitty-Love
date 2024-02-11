const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');

const {User} = require('../Model/userModel');
const {Otp} = require('../Model/otpModel');


module.exports.signUp = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if(user) return res.status(400).send({message: "User already exists"});
    const OTP = otpGenerator.generate(6, {
        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    });
    const email = req.body.email;
    console.log(OTP);

    const otp = new Otp({email: email, otp: OTP});
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    return res.status(200).send({message: "Otp sent succesfully"});
}

module.exports.verifyOtp = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if(user) return res.status(400).send({message: "User already exists"});
    const otpHolder = await Otp.find({
        email: req.body.email
    });
    if(otpHolder.length === 0) return res.status(404).json({message: 'Otp expired or invalid'});
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    if (!validUser) return res.status(403).json({message: 'Invalid user'});

    if(rightOtpFind.email = req.body.email && validUser) {
        const user = new User(_.pick(req.body, ["email"]));
        const token = user.generateJWT();
        const result =  await user.save();
        const OTPDelete = await Otp.deleteMany({
            email: rightOtpFind.email
        });
        return res.status(200).send({
            message: "User created successfully",
            token: token,
            data: result
        })
    }
    else{
        res.status(400).send({
            message: "Invalid Otp"
        });
    }
}
