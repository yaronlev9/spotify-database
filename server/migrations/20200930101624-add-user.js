'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'john',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'roni',
      password: '456',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};