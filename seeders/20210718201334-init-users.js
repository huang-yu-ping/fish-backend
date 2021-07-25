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
    // await queryInterface.bulkInsert('activity_info', [{
    //   activity_name: "活動名稱-海釣",
    //   place:"正濱漁港",
    //   schedule: "have fun",
    //   apply:"1993-05-22",
    //   cost_adult: 2000,
    //   cost_children: 1500,
    //   start_time:"1993-09-22",
    //   limit_num: 20,
    //   current_apply: 0}], {});
    //----OK-------------------------------------------activity_order
    await queryInterface.bulkInsert(
      "activity_order",
      [
        {
          activity_id: 1,
          name: "jay",
          phone: "0911111111",
          email: "jay@gmail.com",
          member_id: 4,
          remit: 1,
          order_state: 1,
        },
      ],
      {}
    );
    //----OK-------------------------------------------board
    // await queryInterface.bulkInsert("board", [
    //   {
    //     board_usename: "小白",
    //     board_content:
    //       "這是測試2這是測試2這是測試2這是測試2這是測試2這是測試2",
    //     board_state: 1,
    //   }
    // ]);
    //----OK-------------------------------------------collect_product
    // await queryInterface.bulkInsert("collect_product", [
    //   {
    //     member_id: 4,
    //     product_id: 1,
    //   },
    //   {
    //     member_id: 4,
    //     product_id: 3,
    //   },
    //   {
    //     member_id: 4,
    //     product_id: 7,
    //   },
    // ]);
    //----OK---------------------------------------------note
    // await queryInterface.bulkInsert(
    //   "note",
    //   [
    //     {
    //       member_id: 4,
    //       note_name: "札記標題",
    //       note_content:
    //         "札記內容札記內容札記內容札記內容札記內容札記內容札記內容札記內容札記內容札記內容",
    //       favorite: 5,
    //       state: 1,
    //     },
    //   ],
    //   {}
    // );
    //----OK----------------------------------------------favorites_note
    // await queryInterface.bulkInsert("favorites_note", [
    //   {
    //     member_id: 4,
    //     note_id: 3,
    //   },
    //   {
    //     member_id: 6,
    //     note_id: 1,
    //   },
    // ]);
    //----OK----------------------------------------------member_like_products
    // await queryInterface.bulkInsert("member_like_products", [
    //   {
    //     member_id: 4,
    //     product_id: 2,
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
