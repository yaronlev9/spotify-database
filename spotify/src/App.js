import React, {useState, useEffect} from 'react';
import Home from './components/Home';
import Playlist from './components/playlist_page';
import Album from './components/album_page';
import Artist from './components/artist_page';
import Song from './components/song_page';
import Login from './components/login_page';
import {useLocation, useHistory, Switch, Route, NavLink} from 'react-router-dom';
import './App.css';
import mixpanel from './AnalyticsManager'
import AppBar from './components/App_bar'
import SearchPage from './components/search_page'
import SearchSongs from './components/search_songs'
import SearchAlbums from './components/search_albums'
import SearchArtists from './components/search_artists'
import SearchPlaylists from './components/search_playlists'

const searchPages = ['/albums','/songs','/artists','/playlists'];
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState();
  const [search, setSearch] = useState('');

  const location = useLocation()
  const history = useHistory() 
  function refresh(){
    window.scrollTo(0, 0);
  }

  function toSearch(value){
    if (value === ''){
      setSearch(value);
      history.push("/home");
      return;
    }
    else if (searchPages.includes(location.pathname)){
      setSearch(value);
      return;
    }
    setSearch(value);
    history.push("/search");
  }
  function setLogin(value, userName){
    setIsLogged(value);
    setUserName(userName);
  }

  function removeToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogged(false);
    mixpanel.track("logged out", {"user": userName}); 
    setUserName();

  }

  const check = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token !== null && user !== null) {
      setIsLogged(true);
      setUserName(user);
      return true;
    }
    return false;
  }

  useEffect( () => {
    mixpanel.track("entered app");
    check()
  });
  
  useEffect(() => {
    return history.listen((location) => { 
      if (location.pathname === '/home'){
        mixpanel.track("entered home page", {"user": userName}); 

      }
       mixpanel.track("changed url", {"url": location.pathname}); 
    }) 
 },[history]) 

  return (
    <div className="App">
        <AppBar isLogged = {isLogged} refresh = {refresh} removeToken = {removeToken} onChange={(e) => toSearch(e)}/>
        <Switch>
        <Route exact path="/"><h1 style={{color:'white', 'marginTop': '20%'}}>Welcome to Spotify!!!</h1></Route>
        <Route exact path="/login"
          render={(props) =>(
            <Login toLog={setLogin}/>
          )}
        />
        {isLogged && <Route exact path="/search"
          render={(props) =>(
            <SearchPage search={search}/>
          )}
        />}
        {isLogged && <Route exact path="/songs"
          render={(props) =>(
            <SearchSongs search={search}/>
          )}
        />}
        {isLogged && <Route exact path="/albums"
          render={(props) =>(
            <SearchAlbums search={search}/>
          )}
        />}
        {isLogged && <Route exact path="/artists"
          render={(props) =>(
            <SearchArtists search={search}/>
          )}
        />}
        {isLogged && <Route exact path="/playlists"
          render={(props) =>(
            <SearchPlaylists search={search}/>
          )}
        />}
        {isLogged && <Route exact path="/home" 
          render={(props) =>(
            <Home/>
          )}
        />}
        {isLogged && <Route exact path="/playlist/:id" 
            render={(props) =>(
              <Playlist match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {isLogged && <Route exact path="/album/:id" 
            render={(props) =>(
              <Album match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {isLogged && <Route exact path="/artist/:id" 
            render={(props) =>(
              <Artist match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {isLogged && <Route exact path="/song/:id?" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history} user={userName}/>
            )}
          />}
        {isLogged && <Route exact path="/song/:id" 
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

export default App;
