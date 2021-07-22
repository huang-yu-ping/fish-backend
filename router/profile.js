const express = require("express");
const router = express.Router();
const db = require("../models");
const Members = db.membersModel;

//update 更新會員表單
router.put("/", async (req, res, next) => {
  //   console.log(req.body);
  const updatemember = await Members.update(
    {
      password: req.body.password,
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      birthday: req.body.birthday,
      address: req.body.address,
    },
    { where: { id: req.body.id } }
  );

  res.send("put /profile");
});

module.exports = router;
