const { Router } = require('express');
const { Playlist } = require('../models');

const router = Router();
router.get('/top_playlists', async (req, res) => {
    const playlists = await Playlist.sequelize.query(`SELECT a.PlaylistID, a.Playlist_name, a.Cover_img, a.Created_at, a.Upload_at, 
    a.Num_of_tracks, GROUP_CONCAT(c.Title SEPARATOR ', ') as Songs
    FROM spotify.playlist a
    INNER JOIN spotify.playlist_songs b 
    INNER JOIN spotify.song c 
    WHERE a.PlaylistID = b.PlaylistID AND b.SongID = c.SongID
    GROUP BY a.Playlist_name
    ORDER BY a.PlaylistID LIMIT 20;`, {
        type: Playlist.sequelize.QueryTypes.SELECT
    });
    return res.json(playlists);
});

router.get('/playlist/:id', async (req, res) => {
    const playlist = await Playlist.sequelize.query(`SELECT a.PlaylistID, a.Playlist_name, a.Cover_img, a.Created_at, a.Upload_at, 
    a.Num_of_tracks, GROUP_CONCAT(c.Title SEPARATOR ', ') as Songs
    FROM spotify.playlist a
    INNER JOIN spotify.playlist_songs b 
    INNER JOIN spotify.song c 
    WHERE a.PlaylistID = b.PlaylistID AND b.SongID = c.SongID AND a.PlaylistID = ${req.params.id};`, {
        type: Playlist.sequelize.QueryTypes.SELECT 
    });
    return res.json(playlist);
  });

router.post('/playlist', async (req, res) => {
    await Playlist.sequelize.query(`SET @ID = (SELECT MAX(PlaylistID) FROM playlist);`);
    const newPlaylist = await Playlist.sequelize.query(`INSERT INTO playlist (PlaylistID, Playlist_name, Cover_img, Created_at, Upload_at, Num_of_tracks)
    VALUES (@ID + 1, '${req.body.PlaylistName}', ${req.body.CoverImg ? `'${req.body.CoverImg}'`: null}, 
    ${req.body.CreatedAt ? `'${req.body.CreatedAt}'` : null}, now(), 0);`, {
    });
  return res.json(newPlaylist);
});

router.put('/playlist/:id', async (req, res) =>{
    const playlist = await Playlist.sequelize.query(`UPDATE playlist SET Playlist_name = :name, Cover_img = :img, Created_at = :created WHERE PlaylistID = :id;`,{
        replacements: {id: req.params.id, img: req.body.CoverImg, name: req.body.PlaylistName, created: req.body.CreatedAt},
      });
      return res.json(playlist);
});

router.delete('/playlist/:id', async (req, res) =>{
    await Playlist.sequelize.query(`DELETE FROM playlist_songs WHERE PlaylistId = ${req.params.id};`);
    const deletedPlaylist = await Playlist.sequelize.query(`DELETE FROM playlist WHERE PlaylistId = ${req.params.id};`);
    return res.json(deletedPlaylist);
});

module.exports = router;