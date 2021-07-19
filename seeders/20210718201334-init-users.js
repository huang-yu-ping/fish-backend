'use strict';

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
    await queryInterface.bulkInsert('activity_info', [{
      activity_name: "活動名稱-海釣",
      place:"正濱漁港",
      schedule: "have fun",
      apply:"1993-05-22",
      cost_adult: 2000,
      cost_children: 1500,
      start_time:"1993-09-22",
      limit_num: 20,
      current_apply: 0}], {});
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('members', null, {});
  }
};
