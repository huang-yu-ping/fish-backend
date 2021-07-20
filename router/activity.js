const express = require("express");
const router = express.Router();
const db = require('../models');
const ActivityInfo = db.activityInfoModel;

router.post('/:id', (req, res) => {})
router.get("/", async (req, res) => {
  // res.render("首頁的活動資訊");
  const ret = await ActivityInfo.findAll()
  res.status(200).json({
    ret
  })

  

  //需要點選日曆顯示活動詳情，也需要點選地點顯示活動日期
  //不用權限
  //   [
  //     {
  //         "name": "活動名稱-海釣",
  //         "apply_date":"7/20",
  //         "cost_adult":"2000",
  //         "cost_children":"1500",
  //         "result":
  //         {
  //             "0":[{
  //                 "place":"正濱漁港",
  //                 "detail":
  //                 [{
  //                     "id": "活動編號A001",
  //                     "start_date":"7/22",
  //                     "limit_num":"20",
  //                     "applynow":"0"
  //                 },
  //                 {
  //                     "id": "活動編號A002",
  //                     "start_date":"7/25",
  //                     "limit_num":"20",
  //                     "applynow":"0"},
  //                 {
  //                     "id": "活動編號A003",
  //                     "start_date":"7/28",
  //                     "limit_num":"20",
  //                     "applynow":"0"},
  //                 ]
  //             }],
  //             "1":[{
  //                 "place":"深澳漁港",
  //                 "detail":
  //                 [{
  //                     "id": "活動編號A004",
  //                     "start_date":"7/30",
  //                     "limit_num":"20",
  //                     "applynow":"0"
  //                 },
  //                 {
  //                     "id": "活動編號A005",
  //                     "start_date":"7/31",
  //                     "limit_num":"20",
  //                     "applynow":"0"},
  //                 {
  //                     "id": "活動編號A006",
  //                     "start_date":"8/01",
  //                     "limit_num":"20",
  //                     "applynow":"0"},
  //                 ]
  //             }]
  //         }
  //     },
  //     {
  //         "name": "活動名稱-海生館",
  //         "apply_date":"8/20",
  //         "cost_children":"500",
  //         "cost_adult":"1000",
  //         "result":
  //             {"place":"深澳漁港",
  //             "detail" :[{
  //                 "id": "活動編號A007",
  //                 "start_date":"8/28",
  //                 "limit_num":"20",
  //                 "applynow":"0",
  //             },
  //             {"id": "活動編號A008",
  //                 "start_date":"8/29",
  //                 "limit_num":"20",
  //                 "applynow":"0",}
  //             ],
  //             }//海生館result
  // }//第二個活動括號
  // ]
});
router.post("/activity/order", (req, res) => {
  res.render("活動訂單");
  //要權限->req內容
});

module.exports = router;
