'use strict';
const fs = require('fs').promises;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataListJson = await fs.readFile('./data.json');
    const dataList = JSON.parse(dataListJson);
    await queryInterface.sequelize.query(dataList[0].artist);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('artist');
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
  }
};
