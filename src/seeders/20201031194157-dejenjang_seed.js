'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('jenjangs', [
      {
        jenjang: 'SD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        jenjang: 'SMP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        jenjang: 'SMA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        jenjang: 'SMK',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        jenjang: 'SMBPTN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        jenjang: 'PONDOK',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
