'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return Promise.all([
      queryInterface.addColumn(
        'sekolahs', // table name
        'kkm', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'sekolahs',
        'id_jenjang',
        {
          type: Sequelize.INTEGER,
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
