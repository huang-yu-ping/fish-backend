const mailgun = require("mailgun-js");
const key = require('../config/email-secret')

exports.sendEmail = (email, password) => {
  const DOMAIN = 'sandbox3b0c5ddc54f3416a8c4a3451508186ea.mailgun.org';
    const mg = mailgun({
      apiKey: "110c9dc077c73a5155823dae69e362b7-a0cfb957-056481c0",
      domain: DOMAIN,
    });
    const mailgunMail = {
      from: "跳躍吧!漁會@example.com",
      to: "zz4685441@gmail.com",
      subject: "歡迎加入跳躍吧!!漁會!!",
      text: "您的密碼是" + password,
    };
    mg.messages().send(mailgunMail, function (error, info) {
      // console.log(info);
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });

}

