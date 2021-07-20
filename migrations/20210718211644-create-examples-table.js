'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("activity_order", "order_state", {
        type: Sequelize.INTEGER(1),
        after: "remit",
      }),
    ]);
  },
​
  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("activity_order", "order_state")]);
  },
};
