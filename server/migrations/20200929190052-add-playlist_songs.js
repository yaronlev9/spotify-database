'use strict';
const fs = require('fs').promises;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataListJson = await fs.readFile('./data.json');
    const dataList = JSON.parse(dataListJson);
    await queryInterface.sequelize.query(dataList[4].playlist_songs);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlist_songs');
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
  }
};
