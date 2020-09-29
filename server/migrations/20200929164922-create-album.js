'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('album', {
      AlbumID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ArtistID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Album_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Cover_img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Upload_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Num_of_tracks: {
          allowNull: false,
          type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('album');
  }
};