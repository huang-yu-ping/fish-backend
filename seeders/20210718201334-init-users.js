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

    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "虱目魚",
          description: "good fish",
          price: 500,
          catalog: 1,
          reserved: 10,
        },
        {
          name: "吳郭魚",
          description: "hi fish",
          price: 840,
          catalog: 1,
          reserved: 5,
        },
        {
          name: "火燒蝦",
          description: "fire",
          price: 890,
          catalog: 2,
          reserved: 6,
        },
        {
          name: "大扇貝",
          description: "big shell",
          price: 300,
          catalog: 3,
          reserved: 10,
        },
        {
          name: "章魚",
          description: "octopus",
          price: 250,
          catalog: 4,
          reserved: 7,
        },
        {
          name: "黃魚",
          price: 350,
          catalog: 1,
          reserved: 4,
        },
        {
          name: "草蝦",
          description: "yoyo",
          price: 56,
          catalog: 2,
          reserved: 13,
        },
        {
          name: "額子",
          description: "good fish",
          price: 780,
          catalog: 3,
          reserved: 10,
        },
        {
          name: "烏賊",
          description: "black",
          price: 89,
          catalog: 4,
          reserved: 15,
        },
        {
          name: "螃蟹",
          description: "jojo",
          price: 900,
          catalog: 3,
          reserved: 7,
        },
      ],
      {}
    );
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
