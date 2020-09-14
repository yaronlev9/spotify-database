CREATE TABLE Artist (
    ArtistID int NOT NULL,
    Artist_name VARCHAR (50) NOT NULL,
    Cover_img VARCHAR(255),
    Upload_at DATETIME NOT NULL,
    PRIMARY KEY (ArtistID)
);

CREATE TABLE Album (
    AlbumID int NOT NULL,
    ArtistID int NOT NULL,
    Album_name VARCHAR (50) NOT NULL,
    Cover_img VARCHAR(255),
    Created_at DATETIME,
    Upload_at DATETIME NOT NULL,
    Num_of_tracks int NOT NULL,
    PRIMARY KEY (AlbumID),
    FOREIGN KEY (ArtistID) REFERENCES Artist(ArtistID)
    ON DELETE CASCADE
);

CREATE TABLE Song (
    SongID int NOT NULL,
    Youtube_link VARCHAR(255) NOT NULL,
    AlbumID int,
    ArtistID int NOT NULL,
    Title VARCHAR(50) NOT NULL,
    Length int NOT NULL,
    Track_number int DEFAULT 0,
    Lyrics VARCHAR(255),
    Created_at DATETIME,
    Upload_at DATETIME NOT NULL,
    PRIMARY KEY (SongID),
    FOREIGN KEY (ArtistID) REFERENCES Artist(ArtistID) 
    ON DELETE CASCADE,
    FOREIGN KEY (AlbumID) REFERENCES Album(AlbumID)
    ON DELETE CASCADE
);

CREATE TABLE User (
    UserID int NOT NULL,
    User_name VARCHAR(50) NOT NULL,
    User_email VARCHAR(50),
    Created_at DATETIME NOT NULL,
    Upload_at DATETIME NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Is_admin BOOLEAN NOT NULL,
    Remember_token BOOLEAN NOT NULL,
    Preferences JSON,
    PRIMARY KEY (UserID)
);

CREATE TABLE Playlist (
    PlaylistID int NOT NULL,
    Playlist_name VARCHAR(50) NOT NULL,
    Cover_img VARCHAR(255),
    Created_at DATETIME,
    Upload_at DATETIME NOT NULL,
    Num_of_tracks int NOT NULL,
    PRIMARY KEY (PlaylistID)
);

CREATE TABLE Playlist_songs (
    Playlist_songsID int NOT NULL,
    SongID int NOT NULL,
	PlaylistID int NOT NULL,
    PRIMARY KEY (Playlist_songsID),
    FOREIGN KEY (SongID) REFERENCES Song(SongID)
    ON DELETE CASCADE,
    FOREIGN KEY (PlaylistID) REFERENCES Playlist(PlaylistID)
    ON DELETE CASCADE
);

CREATE TABLE Interaction (
    InteractionID int NOT NULL,
    UserID int NOT NULL,
    SongID int NOT NULL,
	Is_liked BOOLEAN NOT NULL,
    Play_count int NOT NULL,
    Created_at DATETIME NOT NULL,
    PRIMARY KEY (InteractionID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
    ON DELETE CASCADE,
    FOREIGN KEY (SongID) REFERENCES Song(SongID)
    ON DELETE CASCADE
);





