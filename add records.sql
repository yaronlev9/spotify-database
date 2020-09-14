INSERT INTO Artist (ArtistID, Artist_name, Upload_at)
VALUES (1, 'AVICII', now()), (2, 'Foo Fighters', now()), (3, 'Adelle', now()), (4, 'Ed Sheeran', now());
SELECT * FROM spotify.artist;

INSERT INTO Album (AlbumID, ArtistID, Album_name, Created_at, Upload_at, Num_of_tracks)
VALUES (1, 1,'True','2013-01-22',now(), 2), (2, 1,'Tim','2019-01-12',now(), 2),
(3, 2,'One by One','2002-08-17',now(), 2), (4, 2,'In Your Honor','2005-06-13',now(), 2),
(5, 3,'19','2008-04-17',now(), 2), (6, 3,'21','2011-09-12',now(), 2);
SELECT * FROM spotify.album;

INSERT INTO Song (SongID, Youtube_link, AlbumID, ArtistID, Title, Length, Track_number, Created_at, Upload_at)
VALUES (1, 'https://www.youtube.com/watch?v=K9fISloOznc&list=PLLFaXG8eSf2_nJ2QuMEsJOd3HimspKPV6',1,1,'Wake me up',247,0,'2013-01-22',now()),
(2, 'https://www.youtube.com/watch?v=ALFBgVcU0i8&list=PLLFaXG8eSf2_nJ2QuMEsJOd3HimspKPV6&index=2',1,1,'You make me',233,1,'2013-01-22',now()),
(3, 'https://www.youtube.com/watch?v=i5L9gHsqSQk',2,1,'Peace of Mind',180,0,'2019-01-12',now()),
(4, 'https://www.youtube.com/watch?v=i5L9gHsqSQk',2,1,'Heaven',277,1,'2019-01-12',now()),
(5, 'https://www.youtube.com/watch?v=xQ04WbgI9rg',3,2,'All My Life',263,0,'2002-08-17',now()),
(6, 'https://www.youtube.com/watch?v=ySlZdASmGCM',3,2,'Low',268,1,'2002-08-17',now()),
(7, 'https://www.youtube.com/watch?v=OtRcYMV1DU8',4,2,'In Your Honor',230,0,'2005-06-13',now()),
(8, 'https://www.youtube.com/watch?v=fTaOlBWcl48',4,2,'No Way Back',197,1,'2005-06-13',now()),
(9, 'https://www.youtube.com/watch?v=3zXASsQcdUY',5,3,'Daydreamer',221,0,'2008-04-17',now()),
(10, 'https://www.youtube.com/watch?v=ZLLN2kXtikc',5,3,'Best for Last',259,1,'2008-04-17',now()),
(11, 'https://www.youtube.com/watch?v=rYEDA3JcQqw',6,3,'Rolling in the Deep',229,0,'2011-09-12',now()),
(12, 'https://www.youtube.com/watch?v=0-uo-kAE5OQ',6,3,'Rumour Has It',223,1,'2011-09-12',now());
SELECT * FROM spotify.song;

INSERT INTO Playlist (PlaylistID, Playlist_name, Created_at, Upload_at, Num_of_tracks)
VALUES (1, 'Chill',now(),now(), 3),
(2, 'EDM',now(),now(), 4);
SELECT * FROM spotify.playlist;

INSERT INTO Playlist_songs (Playlist_songsID, SongID, PlaylistID)
VALUES (1, 4 , 1),
(2, 10 , 1),
(3, 11 , 1),
(4, 1 , 2),
(5, 2 , 2),
(6, 3 , 2),
(7, 4 , 2);
SELECT * FROM spotify.playlist_songs;

