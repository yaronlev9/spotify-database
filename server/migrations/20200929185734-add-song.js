'use strict';
const fs = require('fs').promises;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataListJson = await fs.readFile('./data.json');
    const dataList = JSON.parse(dataListJson);
    await queryInterface.sequelize.query(dataList[2].song);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('song');
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
  }
};
