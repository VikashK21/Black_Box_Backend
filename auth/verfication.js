const nodemailer = require("nodemailer");
const fs = require("fs");

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "blackboxcreative42@gmail.com",
    pass: "bcbnvyguitidvkme",
  },
});

const send_OTP = (email, otp) => {
  const mailOptions = {
    from: "blackboxcreative42@gmail.com",
    to: email,
    subject: `${otp} is your Black Box account verification OTP`,
    html: `Hey,<div>
    <h4>
        We recieved a request to reset your password. Enter the following OTP to verify the account.<br/>
        <strong>${otp}</strong> <br/><br/>
        If you did not make this request, please don't share this OTP to anyone.
    </h4>
    
    </div> <br/>
    ~ Thank you from the Saviers of Black Box.`,
  };
  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    else {
      console.log(info);
      // const forgetPass = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
      // forgetPass["passCode"] = otp;
      // forgetPass["passEmail"] = email;
      // console.log(forgetPass);
      // fs.writeFileSync("./youtube.json", JSON.stringify(forgetPass, null, 4));
    }
  });
  // return true;
};

// send_OTP("vikash21@navgurukul.org", 435345);
module.exports = { send_OTP };
