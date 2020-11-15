const { Router } = require('express');
const { Album } = require('../models');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    cloud: {
      id: 'name:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyQxMzc2NDlhODM5NTk0ZTczOGRiN2JkZThjODNkZTVkNyRmNGIwNDNjMGM1NGE0ZDM0ODgxY2MyMDE3ZTg5ZTE1Zg==',
    },
    auth: {
      username: 'elastic',
      password: 'O0yKjai98EckDgHCuC8hxYmK'
    }
  });

const router = Router();
router.get('/top_albums', async (req, res) => {
    const albums = await Album.sequelize.query('SELECT * FROM album ORDER BY AlbumID LIMIT 20', {
        type: Album.sequelize.QueryTypes.SELECT
    });
    return res.json(albums);
});

router.get('/album/:id', async (req, res) => {
    const album = await Album.sequelize.query(`SELECT * FROM album WHERE AlbumID = ${req.params.id}`, {
        type: Album.sequelize.QueryTypes.SELECT 
    });
    return res.json(album);
  });

router.get('/artist-albums/:id', async (req, res) =>{
    const albums = await Album.sequelize.query(`SELECT * FROM album WHERE ArtistID = ${req.params.id};`, {
        type: Album.sequelize.QueryTypes.SELECT 
    });
    return res.json(albums);
});

router.post('/album', async (req, res) => {
    client.index({
        index: 'albums',
        body: {ArtistID: req.body.ArtistId,
            Album_name: req.body.AlbumName,
            Cover_img: req.body.CoverImg,
            Created_at: req.body.CreatedAt,
            Upload_at: new Date(),
            Num_of_tracks: 0
        },
      });
    await Album.sequelize.query(`SET @ID = (SELECT MAX(AlbumID) FROM album);`);
    const newAlbum = await Album.sequelize.query(`INSERT INTO album (AlbumID, ArtistID, Album_name, Cover_img, Upload_at, Num_of_tracks)
    VALUES (@ID + 1, ${req.body.ArtistId}, '${req.body.AlbumName}', ${req.body.CoverImg ? `'${req.body.CoverImg}'`: null}, 
    ${req.body.CreatedAt ? `'${req.body.CreatedAt}'` : null}, now(), 0);`, {
    });
  return res.json(newAlbum);
});

router.put('/album/:id', async (req, res) =>{
    client.update({
        index: "albums",
        refresh: true,
        id: req.params.id,
        body: {Album_name: req.body.AlbumName,
            Cover_img: req.body.CoverImg,
            Created_at: req.body.CreatedAt,
        },
    }, function (err, resp) {
        if (err) {	
            console.log(err);
        }
    })
    const album = await Album.sequelize.query(`UPDATE album SET Album_name = :name, Cover_img = :img, Created_at = :created WHERE AlbumID = :id;`,{
        replacements: {id: req.params.id, img: req.body.CoverImg, name: req.body.AlbumName, created: req.body.CreatedAt},
      });
      return res.json(album);
});

router.delete('/album/:id', async (req, res) =>{
    const album = await Album.sequelize.query(`DELETE FROM album WHERE AlbumId = ${req.params.id};`);
    const updatePlaylist = await Album.sequelize.query(`UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`);
    return res.json(album);
});

module.exports = router;