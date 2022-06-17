'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('users', [
      { 
        email: 'admin@mail.com',
        password: bcrypt.hashSync('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
