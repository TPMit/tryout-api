'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Promise.all([
    queryInterface.addColumn(
      'soals', // table name
      'isEssay', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
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