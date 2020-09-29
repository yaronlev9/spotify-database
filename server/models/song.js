'use strict';
const {
  Model, INTEGER, DATEONLY
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, {
        foreignKey: 'ArtistID'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'AlbumID'
      });
    }
  };
  Song.init({
    SongID: DataTypes.INTEGER,
    Youtube_link: DataTypes.STRING,
    AlbumID: DataTypes.INTEGER,
    ArtistID: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    Length: DataTypes.INTEGER,
    Track_number: DataTypes.INTEGER,
    Lyrics: DataTypes.STRING,
    Created_at: DataTypes.DATEONLY,
    Upload_at: DataTypes.DATEONLY,


  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};