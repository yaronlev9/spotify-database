'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('playlist_songs', {
      Playlist_songsID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SongID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      PlaylistID: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlist_songs');
  }
};