'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('artist', {
    ArtistID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Artist_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Cover_img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Upload_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('artist');
  }
};