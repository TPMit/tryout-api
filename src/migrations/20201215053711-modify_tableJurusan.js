'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return Promise.all([
      queryInterface.addColumn(
        'jurusans', // table name
        'icon', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
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
