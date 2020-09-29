'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSongs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    this.belongsTo(models.PlaylistSongs, {
        foreignKey: 'Playlist_songsID',
        });
    this.hasMany(models.Song, {
        foreignKey: 'SongID',
        });
    }
  };
  PlaylistSongs.init({
    Playlist_songsID: DataTypes.INTEGER,
    SongID: DataTypes.INTEGER,
    PlaylistID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlaylistSongs',
  });
  return PlaylistSongs;
};