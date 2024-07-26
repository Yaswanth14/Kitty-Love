const nodemailer = require("nodemailer");
const { User } = require("../Model/userModel");

const Sendmail = async (pid, userId) => {
  try {
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

    // Retrieve the email addresses of the users with provided ids (pid and userId)
    const [user1, user2] = await Promise.all([
      User.findById(pid).select("email name username"),
      User.findById(userId).select("email name username"),
    ]);

    // Compose email content
    const mailOptions1 = {
      from: process.env.AUTH_EMAIL,
      to: user1.email,
      subject: "You have a crush!",
      text: `You and ${user2.name} (${user2.username}) have crush on each other!!! \n It's time to go and confess you love 😀 \n Best wishes from team Kitty_Love 💕`,
    };

    const mailOptions2 = {
      from: process.env.AUTH_EMAIL,
      to: user2.email,
      subject: "You have a crush!",
      text: `You and ${user1.name} (${user1.username}) have crush on each other!!! \n It's time to go and confess you love 😀 \n Best wishes from team Kitty_Love 💕`,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(mailOptions1),
      transporter.sendMail(mailOptions2),
    ]);

    console.log("Emails sent successfully!");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

const sendNotification = async (email, subject, htmlmsg) => {
  try {
    // const user = await User.findOne({
    //   email: req.body.email,
    // });
    // const email = req.body.email;

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

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: subject,
      // subject: "Someone sent you a message from your profile on KITTYLOVE",
      html: htmlmsg,
      // html: `
      // <body>
      //     <p>Someone on KITTY LOVE has sent you a message after viewing your profile. Want to see what it is? Go to <a href="https://mykittylove.vercel.app">https://mykittylove.vercel.app</a> and check for yourself.</p>
      //     <br>
      //     <p> From team KITTYLOVE
      // </body>
      // `,
    };
    await transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Email has been sent!");
        // res
        //   .status(200)
        //   .json({ success: true, message: "Email has been sent!" });
      })
      .catch((err) => {
        console.log("Error in sending Email : " + err);
      });
    return;
  } catch (error) {
    console.log(error);
    // res.status(400).send({
    //   success: false,
    //   message: "Server Error",
    // });
  }
};

module.exports = { sendNotification, Sendmail };
