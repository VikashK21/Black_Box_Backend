require('dotenv').config();
// console.log(process.env.TWILIO_ACCOUTN_SID);

module.exports = {
    serviceID: process.env.TWILIO_SERVICE_ID,
    accountSID: process.env.TWILIO_ACCOUTN_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
}