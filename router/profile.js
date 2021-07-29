const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const Promise = require("bluebird");
//password
const bcrypt = Promise.promisifyAll(require("bcrypt"));

//連MySQL區
const Members = db.membersModel;
const Notes = db.noteModel;
const MemberLikeProducts = db.memberLikeProductsModel;
const FavoritesNote = db.favoritesNoteModel;
const activityInfo = db.activityInfoModel;
const activityOrder = db.activityOrderModel;

const updateMember = require("../validator/updateMember");

//照片上傳路徑
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "images"));
  },
  //filename
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".");
    console.log(ext);
    cb(null, `${ext[0]}-${Date.now()}.${ext[1]}`);
  },
});

//上傳用工具
const upload = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg") {
      return cb(new Error("不合法照片檔"), false);
    }
    // if (file.originalname.match(/\.(jpg|jpeg|png)/)) {
    //   console.log(file.originalname);
    //   return cb(new Error("不符合的副檔名"));
    // }
    //傳送檔案
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

//大頭照
router.post("/image", auth, upload.single("photo"), async (req, res) => {
  console.log(req.file);
  console.log(req.member.id);
  let headPhoto = await Members.update(
    { image: req.file.filename },
    {
      where: {
        id: req.member.id,
      },
    }
  );
});

//抓取個人資料
router.get("/", auth, async (req, res) => {
  //   console.log(req.member);
  //const member = await Members.findOne({ where: { id: req.member.id } });
  res.status(200).json({
    member: 'member',
  });
});

//update 更新會員表單
router.put("/update", auth, updateMember.updateFile, async (req, res, next) => {
  console.log(req.body);
  let data = {
    name: req.body.member.name,
    gender: req.body.member.gender,
    email: req.body.member.email,
    phone: req.body.member.phone,
    birthday: req.body.member.birthday,
    address: req.body.member.address,
  };
  //判斷有改密碼加密
  if (req.body.member.password) {
    req.body.member.password = await bcrypt.hashAsync(
      req.body.member.password,
      10
    );
  }

  //鍵入MySQL
  const updatemember = await Members.update(data, {
    where: { id: req.member.id },
  });
  res.send("put /profile");
});

//抓取收藏商品、札記
router.get("/favorite", auth, async (req, res) => {
  const memberLikeProducts = await MemberLikeProducts.findAll({
    where: { member_id: req.member.id },
  });
});

//抓取札記note
router.get("/note", auth, async (req, res) => {
  const note = await Notes.findAll({ where: { member_id: req.member.id } });
});

//抓取活動紀錄
router.get("/activity", auth, async (req, res) => {
  activityOrder.belongsTo(activityInfo, {
    targetKey: "id",
    foreignKey: "activity_id",
  });
  const myActivity = await activityOrder.findAll({
    attributes: ["name"],
    include: [
      {
        model: activityInfo,
        attributes: ["cost_adult", "cost_children", "activity_name", "place"],
      },
    ],
    where: {
      member_id: req.member.id,
    },
  });
  res.status(200).json({
    activity: myActivity,
  });
});

//抓取購買清單
router.get("/order", auth, async (req, res) => {});

module.exports = router;
