const nodemailer = require("nodemailer");
const transporter=nodemailer.createTransport({
service:'gmail',
auth:{
    user:'nitish.conversant@gmail.com',
    pass:'rawfshwheyfjrhso'
}

})
module.exports=transporter;