const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const ActivityInfo = db.activityInfoModel;
const ActivityOrder = db.activityOrderModel;
const ActivityNode = db.noteModel;
const mailgun = require("mailgun-js");
//
router.get("/", async (req, res) => {
  const ret = await ActivityInfo.findAll();
  res.status(200).json({
    ret,
  });
});
//送出訂單
router.post("/order", async (req, res) => {
  try {
    // const DOMAIN = "";
    // const mg = mailgun({
    //   apiKey: "",
    //   domain: DOMAIN,
    // });
    // const mailgunMail = {
    //   from: "跳躍吧!漁會@example.com",
    //   to: "sunvicky11@gmail.com",
    //   subject: "跳躍吧!漁會活動報名成功",
    //   text: "恭喜你成功完成跳躍吧!漁會的活動報名!!",
    // };
    // mg.messages().send(mailgunMail, function (error, info) {
    //   if (error) {
    //     console.log("失敗Error: " + err);
    //   } else {
    //     console.log("寄成功Response: " + info);
    //   }
    // });
    const signUp = await ActivityOrder.bulkCreate(req.body);
    return res.status(201).json({
      message: "活動報名成功",
      signUp,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
//取得活動訂單資訊
router.get("/order", async (req, res) => {
  try {
    ActivityOrder.belongsTo(ActivityInfo, {
      targetKey: "id",
      foreignKey: "activity_id",
    });
    const orderDetail = await ActivityOrder.findAll({
      //attributes: ["name"],
      include: [
        {
          model: ActivityInfo,
          //attributes: ["activity_name"],
        },
      ],
      where: {
        id: req.query.num,
      },
    });
    res.status(200).json({ activity: orderDetail });
  } catch (error) {
    console.log(error);
  }
});
//取得活動札記資訊
router.get("/note", async (req, res) => {
  try {
    const notelist = await ActivityNode.findAll({
      limit: 3,
    });
    res.status(200).json({
      notelist,
    });
  } catch (error) {
    console.log(error);
  }
});
//取得相對應的活動資訊
router.get("/:ID", async (req, res) => {
  const ret = await ActivityInfo.findAll({
    where: {
      id: req.params.ID,
    },
  });
  res.status(200).json({ ret });
});

module.exports = router;
