const express = require("express");
const router = express.Router();
//ctrl
const productCtrl = require("../controllers/product");

//login
router.get("/", productCtrl.getProduct);

//register
router.get("/:name", productCtrl.getProductByName);

module.exports = router;
