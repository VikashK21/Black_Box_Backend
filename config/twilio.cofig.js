require('dotenv').config();
console.log(process.env.SERVICE_ID);

module.exports = {
    serviceID: process.env.SERVICE_ID,
    accountSID: process.env.ACCOUTN_SID,
    authToken: process.env.AUTH_TOKEN
}