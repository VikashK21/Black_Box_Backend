const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vikash21@navgurukul.org",
    pass: "vikash8861007963",
  },
});

const send_OTP = (email, otp) => {
  const mailOptions = {
    from: "vikash21@navgurukul.org",
    to: email,
    // name: "Black Box",
    subject: `${otp} is OTP for your Black Box account`,
    text: "Hey, we recieved a request to reset your Black Box password.\nEnter the follwing OTP for verfication.",
    html: `<h4>${otp}</h4>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    console.log(mailOptions);
    if (err) throw err;
    else {
      console.log(info);
    }
  });
  return true;
};

send_OTP("vikash21@navgurukul.org", 887766)
