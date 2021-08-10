const mailgun = require("mailgun-js");
const key = require('../config/email-secret')

exports.sendEmail = (orderId) => {
  const DOMAIN = key.emailKey;
    const mg = mailgun({
      apiKey: key.apiKey,
      domain: DOMAIN,
    });
    const mailgunMail = {
      from: "跳躍吧!漁會@example.com",
      to: "alex3889660@gmail.com",
      subject: "歡迎加入跳躍吧!!漁會!!",
      text: "謝謝您的訂購, 您的訂單編號是" + orderId
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

