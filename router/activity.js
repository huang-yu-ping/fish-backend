const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const ActivityInfo = db.activityInfoModel;
const ActivityOrder = db.activityOrderModel;

router.get("/", async (req, res) => {
  const ret = await ActivityInfo.findAll();
  res.status(200).json({
    ret,
  });
});



router.post("/order", async (req, res) => {
  try {
    const signUp = await ActivityOrder.create({
      activity_id: req.query.num,
      name: req.query.name,
      phone: req.query.phone,
      email: req.query.email,
      member_id: req.query.member,
      remit: req.query.remit,
    });
    res.json({ signUp });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

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

router.get("/:ID", async (req, res) => {
  const ret = await ActivityInfo.findAll({
    where: {
      id: req.params.ID,
    },
  });
  res.status(200).json({ ret });
});

module.exports = router;
