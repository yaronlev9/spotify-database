const { Router } = require('express');
const { Song } = require('../models');

const router = Router();
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

router.get('/top_songs', async (req, res) => {
    const songs = await Song.sequelize.query('SELECT * FROM song ORDER BY SongID LIMIT 20;', {
        type: Song.sequelize.QueryTypes.SELECT
    });
    return res.json(songs);
});

router.get('/song/:id', async (req, res) => {
    const song = await Song.sequelize.query(`SELECT a.SongID, a.Youtube_link, b.Album_name, c.Artist_name, a.Title, a.Length, a.Lyrics FROM song a
    INNER JOIN Album b
    INNER JOIN Artist c
    WHERE a.SongID = ${req.params.id} AND b.AlbumID = a.AlbumID AND c.ArtistID = a.ArtistID;`, {
        type: Song.sequelize.QueryTypes.SELECT 
    });
    return res.json(song);
  });

router.get('/playlist_songs/:id', async (req, res) =>{
    const songs = await Song.sequelize.query(`SELECT  DISTINCT a.SongID, a.Youtube_link, a.AlbumID, d.Artist_name, a.Title, a.Length, a.Created_at FROM song a
    INNER JOIN playlist_songs b
    INNER JOIN Artist d
    WHERE a.SongID = b.SongID AND b.PlaylistID = ${req.params.id} AND a.ArtistID = d.ArtistID;`, {
        type: Song.sequelize.QueryTypes.SELECT
    });
    return res.json(songs);
});

router.get('/album_songs/:id', async (req, res) =>{
    const songs = await Song.sequelize.query(`SELECT  DISTINCT a.SongID, a.Youtube_link, a.AlbumID, d.Artist_name, a.Title, a.Length, a.Created_at FROM song a
    INNER JOIN Artist d 
    WHERE AlbumID = ${req.params.id} AND a.ArtistID = d.ArtistID;`, {
        type: Song.sequelize.QueryTypes.SELECT
    });
    return res.json(songs);
});

router.get('/best_artist_songs/:id', async (req, res) =>{
    const songs = await Song.sequelize.query(`SELECT * FROM song
    WHERE ArtistID = ${req.params.id}
    LIMIT 5;`, {
        type: Song.sequelize.QueryTypes.SELECT
    });
    return res.json(songs);
});

router.post('/song', async (req, res) => {
    client.index({
        index: 'songs',
        body: {Youtube_link: req.body.YoutubeLink,
            AlbumID: req.body.AlbumId, 
            ArtistID: req.body.ArtistId,
            Title: req.body.Title,
            Length: req.body.Length,
            Lyrics: req.body.Lyrics,
            Created_at: req.body.CreatedAt,
            Upload_at: new Date(),
        },
      });
    await Song.sequelize.query(`SET @ID = (SELECT MAX(SongID) FROM song);`);
    const newSong = await Song.sequelize.query(`INSERT INTO song (SongID, Youtube_link, AlbumID, ArtistID, Title, Length, Lyrics, Created_at, Upload_at)
    VALUES (@ID + 1, '${req.body.YoutubeLink}', ${req.body.AlbumId ? req.body.AlbumId : 0}, ${req.body.ArtistId}, 
    '${req.body.Title}', ${req.body.Length}, '${req.body.Lyrics}', ${req.body.CreatedAt ? `'${req.body.CreatedAt}'` : null}, now());`);
    await Song.sequelize.query(`UPDATE playlist a SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`);
    await Song.sequelize.query(`UPDATE album a SET a.Num_of_tracks = (SELECT COUNT(*) FROM song WHERE a.AlbumID = AlbumID);`);
    await Song.sequelize.query(`SET @album = (SELECT AlbumID FROM song WHERE SongID = @ID + 1);`);
    await Song.sequelize.query(`SET @i := -1;`);
    await Song.sequelize.query(`UPDATE song a SET a.Track_number = (@i := @i + 1) WHERE AlbumID = @album;`);
  return res.json(newSong);
});

router.put('/song/:id', async (req, res) =>{
    client.update({
        index: "songs",
        refresh: true,
        id: req.params.id,
        body: {Youtube_link: req.body.YoutubeLink,
            Title: req.body.Title,
            Length: req.body.Length,
            Lyrics: req.body.Lyrics,
            Created_at: req.body.CreatedAt,
        },
    }, function (err, resp) {
        if (err) {	
            console.log(err);
        }
    })
    const song = await Song.sequelize.query(`UPDATE song SET Youtube_link = :link, Title = :title, Length = :length, Lyrics = :lyrics, Created_at = :created WHERE SongID = :id;`,{
        replacements: {id: req.params.id, link: req.body.YoutubeLink, title: req.body.Title, created: req.body.CreatedAt, length: req.body.Length, lyrics: req.body.Lyrics},
    });
      return res.json(song);
});

router.delete('/song/:id', async (req, res) =>{
    const deletedSong = await Song.sequelize.query(`DELETE FROM song WHERE SongId = ${req.params.id};`);
    await Song.sequelize.query(`UPDATE playlist a SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`);
    await Song.sequelize.query(`UPDATE album a SET a.Num_of_tracks = (SELECT COUNT(*) FROM song WHERE a.AlbumID = AlbumID);`);
    await Song.sequelize.query(`SET @album = (SELECT AlbumID FROM song WHERE SongID = ${req.params.id});`);
    await Song.sequelize.query(`SET @i := -1;`);
    await Song.sequelize.query(`UPDATE song a SET a.Track_number = (@i := @i + 1) WHERE AlbumID = @album;`);
    return res.json(deletedSong);
});

module.exports = router;