const nodemailer = require("nodemailer");
const fs = require("fs");

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "blackboxcreative42@gmail.com",
    pass: "bcbnvyguitidvkme",
  },
});

const notify = (email, courseID, suggested_by, suggester_email) => {
  const mailOptions = {
    from: "blackboxcreative42@gmail.com",
    to: email,
    subject: `${suggested_by} has suggest and invited you for a course from Black Box Platform`,
    html: `Welcome,<div>
    <h4>
        ${suggested_by} has suggested you a course, the suggester's email-id is ${suggester_email} and to know about the course, click on the following link<br/>
        <strong><a href="https://blackboxnow.com/classes/join/${courseID}">Course/Class</a></strong> <br/><br/>
        
        To know more about the platform <a href="https://blackboxnow.com/">visit</a> once and explore.
    </h4>
    
    </div> <br/>
    ~ Thank you from the Saviers of Black Box.`,
  };
  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    else {
      console.log(info);
      //   const forgetPass = JSON.parse(fs.readFileSync("./youtube.json", "utf-8"));
      //   forgetPass["passCode"] = otp;
      //   forgetPass["passEmail"] = email;
      //   console.log(forgetPass);
      //   fs.writeFileSync("./youtube.json", JSON.stringify(forgetPass, null, 4));
    }
  });
  // return true;
};

// send_OTP("vikash21@navgurukul.org", 435345);
module.exports = { notify };
