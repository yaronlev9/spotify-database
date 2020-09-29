'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('song', {
      SongID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Youtube_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      AlbumID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ArtistID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Length: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Track_number: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      Lyrics: {
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
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('song');
  }
};