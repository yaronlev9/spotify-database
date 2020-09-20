require('dotenv').config()
const PASS = process.env.PASSWORD;
const express = require('express');
var mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: "localhost",
    user: "yaron",
    password: PASS,
    database: "spotify",
    multipleStatements: true
  });

mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/top_songs', (req, res) => {
    mysqlCon.query('SELECT * FROM song ORDER BY SongID LIMIT 20;', (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/top_artists', (req, res) => {
    mysqlCon.query('SELECT * FROM artist ORDER BY ArtistID LIMIT 20;', (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/top_albums', (req, res) => {
    mysqlCon.query('SELECT * FROM album ORDER BY AlbumID LIMIT 20;', (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/top_playlists', (req, res) => {
    mysqlCon.query(`SELECT a.PlaylistID, a.Playlist_name, a.Cover_img, a.Created_at, a.Upload_at, a.Num_of_tracks, GROUP_CONCAT(c.Title SEPARATOR ', ') as Songs
    FROM spotify.playlist a
    INNER JOIN spotify.playlist_songs b 
    INNER JOIN spotify.song c 
    WHERE a.PlaylistID = b.PlaylistID AND b.SongID = c.SongID
    GROUP BY a.Playlist_name
    ORDER BY a.PlaylistID LIMIT 20;`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/song/:id', async (req, res) =>{
    mysqlCon.query(`SELECT a.SongID, a.Youtube_link, b.Album_name, c.Artist_name, a.Title, a.Length, a.Lyrics FROM song a
    INNER JOIN Album b
    INNER JOIN Artist c
    WHERE a.SongID = ? AND b.AlbumID = a.AlbumID AND c.ArtistID = a.ArtistID;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/album/:id', async (req, res) =>{
    mysqlCon.query('SELECT * FROM album WHERE AlbumID = ?',[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/artist/:id', async (req, res) =>{
    mysqlCon.query('SELECT * FROM artist WHERE ArtistID = ?',[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/playlist/:id', async (req, res) =>{
    mysqlCon.query(`SELECT a.PlaylistID, a.Playlist_name, a.Cover_img, a.Created_at, a.Upload_at, a.Num_of_tracks, GROUP_CONCAT(c.Title SEPARATOR ', ') as Songs
    FROM spotify.playlist a
    INNER JOIN spotify.playlist_songs b 
    INNER JOIN spotify.song c 
    WHERE a.PlaylistID = b.PlaylistID AND b.SongID = c.SongID AND a.PlaylistID = ?;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/playlist_songs/:id', async (req, res) =>{
    mysqlCon.query(`SELECT  DISTINCT a.SongID, a.Youtube_link, a.AlbumID, d.Artist_name, a.Title, a.Length, a.Created_at FROM song a
    INNER JOIN playlist_songs b
    INNER JOIN Artist d
    WHERE a.SongID = b.SongID AND b.PlaylistID = ? AND a.ArtistID = d.ArtistID;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/album_songs/:id', async (req, res) =>{
    mysqlCon.query(`SELECT  DISTINCT a.SongID, a.Youtube_link, a.AlbumID, d.Artist_name, a.Title, a.Length, a.Created_at FROM song a
    INNER JOIN Artist d 
    WHERE AlbumID = ? AND a.ArtistID = d.ArtistID;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/best_artist_songs/:id', async (req, res) =>{
    mysqlCon.query(`SELECT * FROM song
    WHERE ArtistID = ?
    LIMIT 5;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.get('/artist-albums/:id', async (req, res) =>{
    mysqlCon.query(`SELECT * FROM album
    WHERE ArtistID = ?;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.post('/song', async (req, res) =>{
    mysqlCon.query(`SET @ID = (SELECT MAX(SongID) FROM song);
    INSERT INTO song (SongID, Youtube_link, AlbumID, ArtistID, Title, Length, Lyrics, Created_at, Upload_at)
    VALUES (@ID + 1, '${req.body.Youtube_link}', ${req.body.AlbumID ? req.body.AlbumID : 0}, ${req.body.ArtistID}, 
    '${req.body.Title}', ${req.body.Length}, '${req.body.Lyrics}', ${req.body.Created_at ? `'${req.body.Created_at}'` : null}, now());
    UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);
    UPDATE album a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM song WHERE a.AlbumID = AlbumID);
    SET @album = (SELECT AlbumID FROM song WHERE SongID = @ID + 1);
    SET @i := -1;
    UPDATE song a
    SET a.Track_number = (@i := @i + 1)
    WHERE AlbumID = @album;`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.post('/artist', async (req, res) =>{
    mysqlCon.query(`SET @ID = (SELECT MAX(ArtistID) FROM artist);
    INSERT INTO artist (ArtistID, Artist_name, Cover_img, Upload_at)
    VALUES (@ID + 1, '${req.body.Name}', ${req.body.Cover_img ? `'${req.body.Cover_img}'`: null}, now());`, (error, results, fields) => {
        if (error) {
            res.send(err.message);
            throw error;
        };
        res.send(results);
      });
});

app.post('/album', async (req, res) =>{
    mysqlCon.query(`SET @ID = (SELECT MAX(AlbumID) FROM album);
    INSERT INTO album (AlbumID, ArtistID, Album_name, Cover_img, Created_at, Upload_at, Num_of_tracks)
    VALUES (@ID + 1, ${req.body.ArtistID}, '${req.body.Name}', ${req.body.Cover_img ? `'${req.body.Cover_img}'`: null}, 
    ${req.body.Created_at ? `'${req.body.Created_at}'` : null}, now(), 0);`, 
    (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.post('/playlist', async (req, res) =>{
    mysqlCon.query(`SET @ID = (SELECT MAX(PlaylistID) FROM playlist);
    INSERT INTO playlist (PlaylistID, Playlist_name, Cover_img, Created_at, Upload_at, Num_of_tracks)
    VALUES (@ID + 1, '${req.body.Name}', ${req.body.Cover_img ? `'${req.body.Cover_img}'`: null}, 
    ${req.body.Created_at ? `'${req.body.Created_at}'` : null}, now(), 0);`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.post('/playlist/:id', async (req, res) =>{
    mysqlCon.query(`SET @ID = (SELECT MAX(Playlist_songsID) FROM playlist_songs);
    INSERT INTO playlist_songs (Playlist_songsID, SongID, PlaylistID)
    VALUES (@ID + 1, ${req.body.SongID}, ${req.params.id});
    UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.put('/song/:id', async (req, res) =>{
    mysqlCon.query(`UPDATE song SET Youtube_link = ?, Title = ?, Length = ?, Lyrics = ?, Created_at = ? WHERE SongID = ?;`,
    [req.body.Youtube_link, req.body.Title, req.body.Length, req.body.Lyrics, req.body.Created_at, req.params.id], 
    (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.put('/artist/:id', async (req, res) =>{
    mysqlCon.query(`UPDATE artist SET Artist_name = ?, Cover_img = ? WHERE ArtistID = ?;`,
    [req.body.Artist_name, req.body.Cover_img, req.params.id], 
    (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.put('/album/:id', async (req, res) =>{
    mysqlCon.query(`UPDATE album SET Album_name = ?, Cover_img = ?, Created_at = ? WHERE AlbumID = ?;`,
    [req.body.Album_name, req.body.Cover_img, req.body.Created_at, req.params.id], 
    (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.put('/playlist/:id', async (req, res) =>{
    mysqlCon.query(`UPDATE playlist SET Playlist_name = ?, Cover_img = ?, Created_at = ? WHERE PlaylistID = ?;`,
    [req.body.Playlist_name, req.body.Cover_img, req.body.Created_at, req.params.id], 
    (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.delete('/playlist/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM playlist_songs WHERE PlaylistId = ${req.params.id};
    DELETE FROM playlist WHERE PlaylistId = ${req.params.id};`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.delete('/album/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM album WHERE AlbumId = ?;
    UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(err.message);
            throw error;
        };
        res.send(results);
      });
});

app.delete('/artist/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM artist WHERE ArtistId = ?;
    UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});

app.delete('/song/:id', async (req, res) =>{
    mysqlCon.query(`DELETE FROM song WHERE SongId = ?;
    UPDATE playlist a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM playlist_songs WHERE a.PlaylistID = PlaylistID);
    UPDATE album a
    SET a.Num_of_tracks = (SELECT COUNT(*) FROM song WHERE a.AlbumID = AlbumID);
    SET @album = (SELECT AlbumID FROM song WHERE SongID = ${req.params.id});
    SET @i := -1;
    UPDATE song a
    SET a.Track_number = (@i := @i + 1)
    WHERE AlbumID = @album;`,[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
      });
});


const port = process.env.PORT;
console.log(`listening to port ${port}`)
app.listen(port);
