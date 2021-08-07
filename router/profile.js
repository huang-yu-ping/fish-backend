const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const Promise = require("bluebird");
//password
const bcrypt = Promise.promisifyAll(require("bcrypt"));
// mailgun
const mailgun = require("mailgun-js");

//連MySQL區
const Members = db.membersModel;
const Notes = db.noteModel;
const MemberLikeProducts = db.memberLikeProductsModel;
const FavoritesNote = db.favoritesNoteModel;
const activityInfo = db.activityInfoModel;
const activityOrder = db.activityOrderModel;
const products = db.ProductsModel;
const oderDetail = db.OrderedDetailModel;
const orderItems = db.OrderItemsModel;

const updateMember = require("../validator/updateMember");
const { OrderedDetailModel } = require("../models");

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
  // console.log(req.file);
  // console.log(req.member.id);
  let headPhoto = await Members.update(
    { image: req.file.filename },
    {
      where: {
        id: req.member.id,
      },
    }
  );
  res.status(200).json(req.file.filename);
});

//抓取個人資料
router.get("/", auth, async (req, res) => {
  const member = await Members.findOne({ where: { id: req.member.id } });
  // console.log(member.password);
  res.status(200).json({ member });
});

//update 更新會員表單
router.patch(
  "/update",
  auth,
  updateMember.updateFile,
  async (req, res, next) => {
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

    //有變更資料寄信通知
    const DOMAIN = "sandbox652ca7e9c24a4f8f9b63f67423460ab9.mailgun.org";
    const mg = mailgun({
      apiKey: "991e4f95df850f2d12d1a116c556129a-a0cfb957-72f364db",
      domain: DOMAIN,
    });
    const mailgunMail = {
      from: "跳躍吧!漁會@example.com",
      to: "alex3889660@gmail.com",
      subject: "變更了跳躍吧!漁會個人資訊",
      text: "您變更了您在跳躍吧!漁會的個人資訊!!",
    };
    mg.messages().send(mailgunMail, function (error, info) {
      // console.log(info);
      if (error) {
        console.log("失敗Error: " + err);
      } else {
        console.log("寄成功Response: " + info);
      }
    });

    //處理訊息
    req.session.messages = {
      title: "您已變更內容",
      text: "要記得您變更的內容喔",
    };
  }
);

//抓取收藏商品
router.get("/productLike", auth, async (req, res) => {
  MemberLikeProducts.belongsTo(products, {
    targetKey: "id",
    foreignKey: "product_id",
  });

  const productLike = await MemberLikeProducts.findAll({
    include: [
      {
        model: products,
        attributes: ["name", "price"],
      },
    ],
    where: { member_id: req.member.id },
  });
  res.status(200).json(productLike);
});

//刪除收藏商品
router.delete("/productLike/:productId", auth, async (req, res) => {
  // console.log(req.params.productId);
  await MemberLikeProducts.destroy({
    where: {
      product_id: req.params.productId,
    },
  });
});

//抓取收藏札記
router.get("/noteLike", auth, async (req, res) => {
  FavoritesNote.belongsTo(Notes, {
    targetKey: "id",
    foreignKey: "note_id",
  });
  const noteLike = await FavoritesNote.findAll({
    include: [
      {
        model: Notes,
        attributes: ["note_name", "member_id"],
      },
    ],
    where: { member_id: req.member.id },
  });
  // console.log(noteLike);

  res.status(200).json(noteLike);
});

//刪除收藏札記
router.delete("/noteLike/:noteId", auth, async (req, res) => {
  // console.log(req.params.noteId);
  await FavoritesNote.destroy({
    where: {
      note_id: req.params.noteId,
    },
  });
  res.status(200);
});

//抓取札記note
router.get("/note", auth, async (req, res) => {
  const note = await Notes.findAll({ where: { member_id: req.member.id } });
  // console.log(note);

  res.status(200).json(note);
});

//清除札記note(更改state)
router.patch("/note/patch/:noteId", auth, async (req, res) => {
  // console.log(req.params.noteId);
  let noteState = {
    state: 2,
  };
  const updateNote = await Notes.update(noteState, {
    where: { id: req.params.noteId },
  });
});

//抓取活動紀錄
router.get("/activity", auth, async (req, res) => {
  activityOrder.belongsTo(activityInfo, {
    targetKey: "id",
    foreignKey: "activity_id",
  });
  const myActivity = await activityOrder.findAll({
    include: [
      {
        model: activityInfo,
        attributes: [
          "cost_adult",
          "cost_children",
          "activity_name",
          "place",
          "start_time",
        ],
      },
    ],
    where: {
      member_id: req.member.id,
    },
  });

  res.status(200).json(myActivity);
});

//抓取購買清單
router.get("/order", auth, async (req, res) => {
  oderDetail.belongsTo(orderItems, {
    targetKey: "order_id",
    foreignKey: "id",
  });
  const myOrderDetail = await oderDetail.findAll({
    // attributes: ["order_id"],
    include: [
      {
        model: orderItems,
        attributes: ["order_id", "product_id", "buy_num"],
      },
    ],
    where: {
      member_id: req.member.id,
    },
    raw: true,
  });
  //這邊是做每一筆的資訊
  const orderList = [];
  myOrderDetail.forEach((order) => {
    const index = orderList.findIndex((o) => {
      return o.order_serial_number === order.order_serial_number;
    });
    if (index === -1) {
      order.order_items = [
        {
          order_id: order["order_items_model.order_id"],
          product_id: order["order_items_model.product_id"],
          buy_num: order["order_items_model.buy_num"],
        },
      ];
      orderList.push(order);
    } else {
      orderList[index].order_items.push({
        order_id: order["order_items_model.order_id"],
        product_id: order["order_items_model.product_id"],
        buy_num: order["order_items_model.buy_num"],
      });
    }
  });
  res.status(200).json(orderList);
});

//收藏商品
router.post("/loveProducts/:productId", auth, async (req, res) => {
  // const lovePId = req.params.productId;
  console.log(req.params.productId);
  const addLike = {
    member_id: req.member.id,
    product_id: req.params.productId,
  }
  try {
    const loveProduct = await MemberLikeProducts.findOrCreate({ where: {
      product_id: req.params.productId
     }, defaults: addLike});
    res.status(201).json({
      message: '恭喜添加成功'
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
