'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.changeColumn(
      'tryoutDetails', // table name
      'nilai', // new field name
      {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue:false,
      },
    ),
  ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
