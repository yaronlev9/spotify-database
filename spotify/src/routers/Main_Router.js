import React from 'react';
import Playlist from '../pages/playlist_page';
import Album from '../pages/album_page';
import Artist from '../pages/artist_page';
import Song from '../pages/song_page';
import Login from '../pages/login_page';
import {Switch, Route} from 'react-router-dom';
import SearchPage from '../pages/search_page'
import SearchSongs from '../components/search_songs'
import SearchAlbums from '../components/search_albums'
import SearchArtists from '../components/search_artists'
import SearchPlaylists from '../components/search_playlists'
import Home from '../components/Home';

function MainRouter(props) {
    const toLog = props.setLogin
    const userName = props.userName
    const search = props.search

  return (
        <div>
          <Switch>
        <Route exact path="/"><h1 style={{color:'white', 'marginTop': '20%'}}>Welcome to Spotify!!!</h1></Route>
        <Route exact path="/login"
          render={(props) =>(
            <Login toLog={toLog}/>
          )}
        />
        {props.isLogged && <Route exact path="/search"
          render={(props) =>(
            <SearchPage search={search}/>
          )}
        />}
        {props.isLogged && <Route exact path="/songs"
          render={(props) =>(
            <SearchSongs search={search}/>
          )}
        />}
        {props.isLogged && <Route exact path="/albums"
          render={(props) =>(
            <SearchAlbums search={search}/>
          )}
        />}
        {props.isLogged && <Route exact path="/artists"
          render={(props) =>(
            <SearchArtists search={search}/>
          )}
        />}
        {props.isLogged && <Route exact path="/playlists"
          render={(props) =>(
            <SearchPlaylists search={search}/>
          )}
        />}
        {props.isLogged && <Route exact path="/home" 
          render={(props) =>(
            <Home/>
          )}
        />}
        {props.isLogged && <Route exact path="/playlist/:id" 
            render={(props) =>(
              <Playlist match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {props.isLogged && <Route exact path="/album/:id" 
            render={(props) =>(
              <Album match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {props.isLogged && <Route exact path="/artist/:id" 
            render={(props) =>(
              <Artist match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {props.isLogged && <Route exact path="/song/:id?" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {props.isLogged && <Route exact path="/song/:id" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        <Route>
              <h1 style={{marginTop:"20%"}}>
                ERROR 404, Page Not Found!
              </h1>
          </Route>
        </Switch>
        </div>
  );
}

export default MainRouter;
