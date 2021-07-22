const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const mailgunAuth = {
  auth: {
    api_key: "",
    domain: "",
  },
};
const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));
const mailOptions = {
  from: "sendersemail@example.com",
  to: "ashleylai58@gmail.com",
  subject: "這是主旨",
  // 支援有限的 css 跟 html
  // 用 table 來排版 <-- 最痛苦
  html: "<html><body><h1>這是 email</h1></body></html>",
};
smtpTransport.sendMail(mailOptions, function (error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log("成功啦");
  }
});