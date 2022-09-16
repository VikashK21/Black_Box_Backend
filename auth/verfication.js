const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "blackboxdigital22@gmail.com",
    pass: "blackbox@@22",
  },
});

const send_OTP = (email, otp) => {
  const mailOptions = {
    from: "blackboxdigital22@gmail.com",
    to: email,
    subject: "",
    text: "",
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    else {
      console.log(info);
    }
  });
  return true;
};
