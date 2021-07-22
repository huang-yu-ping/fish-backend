"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // await queryInterface.bulkInsert('members', [{
    //     name: 'huang',
    //     account: 'huang',
    //     password: '123456',
    //     gender: 2,
    //     birthday: '1993-04-22',
    //     email: 'ping@test.com',
    //     address: 'taoyuan'
    //   }], {});
    // await queryInterface.bulkInsert(
    //   "activity_info",
    //   [
    //     {
    //       activity_name: "活動名稱-龍洞探險",
    //       place: "正濱漁港",
    //       schedule: "have fun",
    //       apply: "1993-05-30",
    //       cost_adult: 2000,
    //       cost_children: 1500,
    //       start_time: "1993-09-30",
    //       limit_num: 20,
    //       current_apply: 0,
    //     },
    //   ],
    //   {}
    // );
    //-OK------------------------------------------------------activity_order
    // await queryInterface.bulkInsert(
    //   "activity_order",
    //   [
    //     {
    //       activity_id: 2,
    //       member_id: 1,
    //       name: "jay",
    //       phone: "0911111111",
    //       email: "xxx@gmail.com",
    //       remit: 1,
    //     },
    //   ],
    //   {}
    // );
    //OK---------------------------------------------------------member_like_products
    // await queryInterface.bulkInsert(
    //   "member_like_products",
    //   [
    //     {
    //       member_id: 1,
    //       product_id: 4,
    //     },
    //   ],
    //   {}
    // );
    //-OK---------------------------------------------------------favorites_note
    // await queryInterface.bulkInsert(
    //   "favorites_note",
    //   [
    //     {
    //       member_id: 1,
    //       note_id: 5,
    //     },
    //   ],
    //   {}
    // );
    //---OK-------------------------------------------------------------note
    // await queryInterface.bulkInsert(
    //   "note",
    //   [
    //     {
    //       member_id: 4,
    //       note_name: "台中遊",
    //       note_content:
    //         "台中台中台中台中台中台中台中台中台中台中台中台中台中台中台中台中台中",
    //       favorite: 1,
    //       state: 1,
    //     },
    //   ],
    //   {}
    // );
    //這欄OK--------------------------------------------------------------products
    // await queryInterface.bulkInsert(
    //   "products",
    //   [
    //     {
    //       name: "小卷",
    //       dsecriotion: "澎湖現補",
    //       price: 200,
    //       catalog: 4,
    //       reserved: 20,
    //       state: 1,
    //     },
    //   ],
    //   {}
    // );
    //這欄OK----------------------------------------------------------------catalog
    // await queryInterface.bulkInsert(
    //   "catalog",
    //   [
    //     {
    //       catalog: "軟足",
    //     },
    //   ],
    //   {}
    // );
    //這欄OK---------------------------------------------------------------shpping_session
    // await queryInterface.bulkInsert(
    //   "shpping_session",
    //   [
    //     {
    //       member_id: 1,
    //       product_id: 9,
    //       buyNum: 1,
    //     },
    //   ],
    //   {}
    // );
    //-OK-----------------------------------------------------------------cart_items
    // await queryInterface.bulkInsert(
    //   "cart_items",
    //   [
    //     {
    //       session_id: 3,
    //       product_id: 9,
    //       buy_num: 1,
    //     },
    //   ],
    //   {}
    // );
    //--OK-------------------------------------------------------------------order_items
    // await queryInterface.bulkInsert(
    //   "order_items",
    //   [
    //     {
    //       order_id: 1,
    //       product_id: 2,
    //       buy_num: 1,
    //     },
    //   ],
    //   {}
    // );
    //--OK--------------------------------------------------------------------order_detail
    // await queryInterface.bulkInsert("order_detail", [
    //   {
    //     member_id: 1,
    //     payment_id: 1,
    //   },
    // ]);
    //OK---------------------------------------------------------------------payment_detail
    // await queryInterface.bulkInsert(
    //   "payment_detail",
    //   [
    //     {
    //       order_id: 2,
    //       product_id: 6,
    //       buy_num: 1,
    //       total: 300,
    //       pay_status: 1,
    //       pay_way: 3,
    //     },
    //   ],
    //   {}
    // );
    //-OK---------------------------------------------------------------collect_product
    // await queryInterface.bulkInsert(
    //   "collect_product",
    //   [
    //     {
    //       member_id: 1,
    //       product_id: 8,
    //     },
    //   ],
    //   {}
    // );
    //完成---------------------------------------------------------------board
    // await queryInterface.bulkInsert("board", [
    //   {
    //     board_usename: "小白",
    //     board_content: "測試測試測試測試測試測試測試4",
    //     board_update_time: "2021-06-19",
    //     board_state: 1,
    //   },
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("members", null, {});
  },
};
