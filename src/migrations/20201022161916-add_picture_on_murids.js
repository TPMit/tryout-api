'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return Promise.all([
      queryInterface.addColumn(
        'murids', // table name
        'picture', // new field name
        {
          type: Sequelize.BLOB,
          allowNull: true,
        },
      ),
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
