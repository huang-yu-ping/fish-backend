const express = require("express");
const router = express.Router();
//ctrl
const memberCtrl = require("../controllers/members");
//memberValidator
const memberValidator = require("../validator/member");
//verify token middleware
const auth = require("../middleware/auth");

const db = require("../models");
const Members = db.membersModel;
const Notes = db.noteModel;
const MemberLikeProducts = db.memberLikeProductsModel;
const FavoritesNote = db.favoritesNoteModel;
const activityInfo = db.activityInfoModel;
const activityOrder = db.activityOrderModel;

//login
router.post("/login", memberValidator.postLogin, memberCtrl.postLogin);

//register
router.post("/register", memberValidator.postRegister, memberCtrl.postRegister);

//current member profile
router.get("/profile", auth, async (req, res) => {
  //   console.log(req.member);
  const member = await Members.findAll({ where: { id: req.member.id } });
  const memberLikeProducts = await MemberLikeProducts.findAll({
    where: { member_id: 1 },
  });
  const favoritesNote = await FavoritesNote.findAll({
    where: { member_id: req.member.id },
  });
  const note = await Notes.findAll({ where: { member_id: req.member.id } });
  //   activityOrder.belongTo(activityInfo, {
  //     as: "linkActivity",
  //     targetKey: "id",
  //     foreignKey: "activity_id",
  //   });
  //   const activity = await activityInfo.findAll({
  //     include: [
  //       {
  //         model: activityOrder,
  //         attributes: ["id", "activity_id"],
  //       },
  //     ],
  //     where: {
  //       member_id: 1,
  //     },
  //   });

  //console 資料區
  console.log(member);
  console.log(memberLikeProducts);
  console.log(favoritesNote);
  console.log(note);
  //   console.log(activity);

  res.send("get /profile");
});

module.exports = router;
