'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return Promise.all([
      queryInterface.changeColumn(
        'soals',
        'jawaban',
        {
          type: Sequelize.STRING(5000),
          allowNull: true,
        },
      ),
      queryInterface.changeColumn(
        'soals',
        'imgPembahasan',
        {
          type: Sequelize.STRING(5000),
          allowNull: true,
        },
      ),
    ]);
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
