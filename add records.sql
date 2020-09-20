INSERT INTO Artist (ArtistID, Artist_name, Cover_img, Upload_at)
VALUES (1, 'AVICII', 'https://lh3.googleusercontent.com/TH3IXs5FL0GWk4BWPylXomZ_tUFV3sQQz8IaK1Hhw4sTTbFkCQlUXwAErsMvnoqjRxR5L1nXrsinYg=w120-h120-p-l90-rj', now()), 
(2, 'Foo Fighters', 'https://lh3.googleusercontent.com/uqFEa9Bdb8YkF1Ax-6aGisOyKgZIqI6IDinrPTZ72OLIvhT_w4BTJWWIeQTJF89xsUY3-HQCh3FuGE8=w120-h120-p-l90-rj', now()), 
(3, 'Adelle', 'https://lh3.googleusercontent.com/_jmfSvzxYiItQO0cv9Z8q1IKJgdlOsb6KTfXCOf793a0xbjNAXyyDTDUS13NzGOk0etp3BjRa9yiQQ=w120-h120-p-l90-rj', now()), 
(4, 'Ed Sheeran', 'https://lh3.googleusercontent.com/jFwYRjqC6yBJJH280DzFO91KvhIuQ_KqkyH9gn7d8J7CCHoAMlqJgIZ9fA7P7t1-4PgxxpOloM0c3iea=w120-h120-p-l90-rj', now());
SELECT * FROM spotify.artist;

INSERT INTO Album (AlbumID, ArtistID, Album_name, Cover_img, Created_at, Upload_at, Num_of_tracks)
VALUES (1, 1,'True','https://lh3.googleusercontent.com/-iRrVRSF_VREhQd2_g8oUUig20j-LnX0BVr9OLqaj5m4HxWP1MMOv7xcaj0KHKOMmEAQJuW0bv3-RaDu=w120-h120-l90-rj', '2013-01-22',now(), 2), 
(2, 1,'Tim','https://lh3.googleusercontent.com/skYcIJwF-RSpYpPhT4DENQ6FbSgrFeQ_r81xdPfwDjjpOBwUeH0tcM6XrnPttU8z9xeeQd1pgQL2iO-N=w120-h120-l90-rj', '2019-01-12',now(), 2),
(3, 2,'One by One','https://lh3.googleusercontent.com/dyiM05s0cA6XuxFTK-c2LDqClxdZK96MLO-x8DePcEAKn03yT59LKyXFV4ZvR3Bki0Ivz2dZCJnGeLmC-A=w120-h120-l90-rj','2002-08-17',now(), 2), 
(4, 2,'In Your Honor','https://lh3.googleusercontent.com/S44ZxLJB34vTMcL12zhAZfEgya1luLvXhnl7SXtjt3c7hkrpigU2GpTyRhH7ypQWqWqiPRyILRwVl1Pi=w120-h120-l90-rj','2005-06-13',now(), 2),
(5, 3,'19','https://lh3.googleusercontent.com/o1gjqqwUV6c4VXm5LPIuwDUJfdGGVXAisfIdq48ou1AONF3qAsMecGWqfRQ_UjTNw3OWgv3_b1bdomAh=w120-h120-l90-rj', '2008-04-17',now(), 2), 
(6, 3,'21','https://lh3.googleusercontent.com/KmkToLEaDNTJ7zK3hscSXDUg-d5a_miwaR7CPlg_9dRqPkJFPWT8qPJ4n33dXNsjR-xFzcgo3ymNndkT=w120-h120-l90-rj', '2011-09-12',now(), 2);
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

INSERT INTO Playlist (PlaylistID, Playlist_name, Cover_img, Created_at, Upload_at, Num_of_tracks)
VALUES (1, 'Chill','https://i.ytimg.com/vi/8gbImG50oIc/sddefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCghqEJQEGHgg6AJIWg&rs=AMzJL3mCdG3MawLQbrZQhJP2LAeEV_Y50g', now(),now(), 3),
(2, 'EDM','https://lh3.googleusercontent.com/njgQ-vj8DcTSaRYoJ2jJ1ZuATHS_xCxybsbnBAD1E7t7rPofTSkTtHlDcuOc4wuNWow3d3BVqiSvQo0=w120-h120-l90-rj', now(),now(), 4);
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

