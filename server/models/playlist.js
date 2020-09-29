'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.hasOne(models.PlaylistSongs, {
        foreignKey: 'Playlist_songsID',
        });
    }
  };
  Playlist.init({
    PlaylistID: DataTypes.INTEGER,
    Playlist_name: DataTypes.STRING,
    Cover_img: DataTypes.STRING,
    Created_at: DataTypes.DATEONLY,
    Upload_at: DataTypes.DATEONLY,
    Num_of_tracks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};