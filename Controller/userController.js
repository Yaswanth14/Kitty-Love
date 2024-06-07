const bcrypt = require("bcrypt");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const { User } = require("../Model/userModel");
const { Otp } = require("../Model/otpModel");

// Node mailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

module.exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const email = req.body.email;
    const username = email.split("@")[0].toLowerCase();
    // const emailRegex1 = /^.{10}@gvpce\.ac\.in$/;
    // const emailRegex2 = /^.{12}@gvpce\.ac\.in$/;
    // if (!emailRegex1.test(email) || !emailRegex2.test(email)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Only domain mails are accepted" });
    // }
    const emailRegex = /^(?:.{10}|.{12})@gvpce\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Only domain mails are accepted" });
    }

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify your email",
      html: `
            <body style="background-color:grey"> 
                <table align="center" border="0" cellpadding="0" cellspacing="0"
                    width="550" bgcolor="white" style="border:2px solid black"> 
                    <tbody> 
                        <tr> 
                            <td align="center"> 
                                <table align="center" border="0" cellpadding="0"
                                    cellspacing="0" class="col-550" width="550"> 
                                    <tbody> 
                                        <tr> 
                                            <td align="center" style="background-color: #4cb96b; 
                                                    height: 50px;"> 
            
                                                <a href="#" style="text-decoration: none;"> 
                                                    <p style="color:white; 
                                                            font-weight:bold;"> 
                                                        Kitty-Love💕
                                                    </p> 
                                                </a> 
                                            </td> 
                                        </tr> 
                                    </tbody> 
                                </table> 
                            </td> 
                        </tr> 
                        <tr style="height: 300px;"> 
                            <td align="center" style="border: none; 
                                    border-bottom: 2px solid #4cb96b; 
                                    padding-right: 20px;padding-left:20px"> 
            
                                <p style="font-weight: bolder;font-size: 20px; 
                                        letter-spacing: 0.025em; 
                                        color:black;"> 
                                    <span style="font-size:30px;">Hello ${username}!</span>
                                    <br> Your otp is <span style="color:red">${OTP}</span> <br>
                                    This otp is valid only for 5 minutes
                                </p> 
                            </td> 
                        </tr> 
                    </tbody>
                </table>
            </body> 
            `,
    };

    const otp = new Otp({ email: email, otp: OTP });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    await transporter
      .sendMail(mailOptions)
      .then(() => {
        res
          .status(200)
          .json({ success: true, message: "Email has been sent!" });
      })
      .catch((err) => {
        console.log("Error in sending Email : " + err);
      });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    const otpHolder = await Otp.find({
      email: req.body.email,
    });
    if (otpHolder.length === 0)
      return res.status(404).json({ message: "Otp expired or invalid" });
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    if (!validUser) return res.status(403).json({ message: "Invalid user" });
    const password = await bcrypt.hash(req.body.password, 10);
    const username = email.split("@")[0];

    if ((rightOtpFind.email = req.body.email && validUser)) {
      const user = new User({
        email,
        password,
        username,
        hasphoto: false,
      });
      const token = user.generateJWT();
      const result = await user.save();
      const OTPDelete = await Otp.deleteMany({
        email: rightOtpFind.email,
      });
      return res.status(200).send({
        success: true,
        message: "User created successfully",
        token: token,
        user: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid Otp",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const hashedPassword = await user.password;
    const isValid = await bcrypt.compare(req.body.password, hashedPassword);

    if (user && isValid) {
      const token = user.generateJWT();

      res.status(200).send({
        success: true,
        message: "User logged in",
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
        token: token,
      });
    } else {
      res.send({
        success: false,
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Some error occured",
    });
  }
};
