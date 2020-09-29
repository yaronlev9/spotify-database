const { Router } = require('express');
const { Artist } = require('../models');

const router = Router();

router.get('/top_artists', async (req, res) => {
    const artists = await Artist.sequelize.query('SELECT * FROM artist ORDER BY ArtistID LIMIT 20', {
        type: Artist.sequelize.QueryTypes.SELECT
    });
    return res.json(artists);
});

router.get('/artist/:id', async (req, res) => {
    const artist = await Artist.sequelize.query(`SELECT * FROM artist WHERE ArtistID = ${req.params.id}`, {
      type: Artist.sequelize.QueryTypes.SELECT 
  });
    return res.json(artist);
  });

  
router.post('/artist', async (req, res) => {
    await Artist.sequelize.query(`SET @ID = (SELECT MAX(ArtistID) FROM artist);`);
    const newArtist = await Artist.sequelize.query(`INSERT INTO artist (ArtistID, Artist_name, Cover_img, Upload_at)
    VALUES (@ID + 1, '${req.body.ArtistName}', ${req.body.CoverImg ? `'${req.body.CoverImg}'`: null}, now());`, {
    });
  return res.json(newArtist);
});

router.put('/artist/:id', async (req, res) =>{
    const artist = await Artist.sequelize.query(`UPDATE artist SET Artist_name = :name, Cover_img = :img WHERE ArtistID = :id;`,{
        replacements: {id: req.params.id, img: req.body.CoverImg, name: req.body.ArtistName},
      });
      return res.json(artist);
});

router.delete('/artist/:id', async (req, res) =>{
    const artist = await Artist.sequelize.query(`DELETE FROM artist WHERE ArtistId = ${req.params.id};`);
    const updatePlaylist = await Artist.sequelize.query(`UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`);
    return res.json(artist);
});

module.exports = router;