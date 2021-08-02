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
    await queryInterface.bulkInsert(
      "activity_info",
      [
        {
          activity_name: "海釣活動",
          place: "正濱漁港",
          schedule: "白帶魚、紅目鰱、鎖管",
          apply: "2021-08-09",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "正濱漁港",
          schedule: "白帶魚、紅目鰱、鎖管",
          apply: "2021-08-16",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "正濱漁港",
          schedule: "白帶魚、紅目鰱、鎖管",
          apply: "2021-08-23",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "龜吼漁港",
          schedule: "三點蟹、黑鯛、烏魚",
          apply: "2021-08-11",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "龜吼漁港",
          schedule: "三點蟹、黑鯛、烏魚",
          apply: "2021-08-18",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "龜吼漁港",
          schedule: "三點蟹、黑鯛、烏魚",
          apply: "2021-08-25",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "深澳漁港",
          schedule: "白帶魚、竹筴魚、鯖魚、鎖管",
          apply: "2021-08-10",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "深澳漁港",
          schedule: "白帶魚、竹筴魚、鯖魚、鎖管",
          apply: "2021-08-17",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海釣活動",
          place: "深澳漁港",
          schedule: "白帶魚、竹筴魚、鯖魚、鎖管",
          apply: "2021-08-24",
          cost_adult: 2000,
          cost_children: 1500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "浮淺活動",
          place: "龍洞",
          schedule: "SUP+跳水+浮潛三合一, 最好玩的夏日活動!",
          apply: "2021-08-20",
          cost_adult: 1500,
          cost_children: 1000,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "浮淺活動",
          place: "龍洞",
          schedule: "SUP+跳水+浮潛三合一, 最好玩的夏日活動!",
          apply: "2021-08-27",
          cost_adult: 1500,
          cost_children: 1000,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
        {
          activity_name: "海生館活動",
          place: "基隆",
          schedule: "台灣水域館、珊瑚王國館",
          apply: "2021-08-13",
          cost_adult: 1000,
          cost_children: 500,
          start_time: "2021-08-01",
          limit_num: 20,
          current_apply: 0,
        },
      ],
      {}
    );
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
    // await queryInterface.bulkInsert('products', [
    // {
    //   name: '虱目魚',
    //   description: 'good fish',
    //   price: 500,
    //   catalog: 1,
    //   reserved: 10,
    // }, {
    //   name: '吳郭魚',
    //   description: 'hi fish',
    //   price: 840,
    //   catalog: 1,
    //   reserved: 5,
    // }, {
    //   name: '火燒蝦',
    //   description: 'fire',
    //   price: 890,
    //   catalog: 2,
    //   reserved: 6,
    // }, {
    //   name: '大扇貝',
    //   description: 'big shell',
    //   price: 300,
    //   catalog: 3,
    //   reserved: 10,
    // }, {
    //   name: '章魚',
    //   description: 'octopus',
    //   price: 250,
    //   catalog: 4,
    //   reserved: 7,
    // }, {
    //   name: '黃魚',
    //   price: 350,
    //   catalog: 1,
    //   reserved: 4,
    // }, {
    //   name: '草蝦',
    //   description: 'yoyo',
    //   price: 56,
    //   catalog: 2,
    //   reserved: 13,
    // }, {
    //   name: '額子',
    //   description: 'good fish',
    //   price: 780,
    //   catalog: 3,
    //   reserved: 10,
    // }, {
    //   name: '烏賊',
    //   description: 'black',
    //   price: 89,
    //   catalog: 4,
    //   reserved: 15,
    // }, {
    //   name: '螃蟹',
    //   description: 'jojo',
    //   price: 900,
    //   catalog: 3,
    //   reserved: 7,
    // }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("activity_info", null, {});
  },
};
