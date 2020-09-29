'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Song, {
        foreignKey: 'ArtistID',
        as: 'songs',
      });
      this.hasMany(models.Album, {
        foreignKey: 'ArtistID',
        as: 'albums',
      });
    }
  };
  Artist.init({
    ArtistID: DataTypes.INTEGER,
    Artist_name: DataTypes.STRING,
    Cover_img: DataTypes.STRING,
    Upload_at: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};