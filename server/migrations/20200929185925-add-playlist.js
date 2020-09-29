'use strict';
const fs = require('fs').promises;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataListJson = await fs.readFile('./data.json');
    const dataList = JSON.parse(dataListJson);
    await queryInterface.sequelize.query(dataList[3].playlist);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('playlist');
    await queryInterface.createTable('playlist', {
      PlaylistID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Playlist_name: {
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
  }
};
