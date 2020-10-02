import React, {useState, useEffect} from 'react';
import Home from './components/Home';
import Playlist from './components/playlist_page';
import Album from './components/album_page';
import Artist from './components/artist_page';
import Song from './components/song_page';
import Login from './components/login_page';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import './App.css';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  function refresh(){
    window.scrollTo(0, 0);
  }

  function setLogin(value){
    setIsLogged(value);
  }

  function removeToken(){
    localStorage.removeItem('token');
    setIsLogged(false);
  }

  const check = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setIsLogged(true);
      return true;
    }
    return false;
  }

  useEffect( () => {check()});
  

  return (
    <div className="App">
      <BrowserRouter>
      <div className="NavBar" style={{backgroundColor: 'black', color:'green'}}><NavLink to="/" style={{color: 'green', 'textDecoration': 'none'}}><span style={{fontSize:"20"}}>SPOTIFY</span></NavLink>
        {
        isLogged && <NavLink className= "homeBar" to="/home" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}} onClick={refresh}>HOME</NavLink>
        }
        {
        isLogged && <NavLink className= "loginBar" to="/" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}} onClick={removeToken}>Logout</NavLink>
        }
        {
        !isLogged && <NavLink className= "loginBar" to="/login" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}}>Login</NavLink>
        }
        </div>
        <Switch>
        <Route exact path="/"><h1 style={{color:'white', 'marginTop': '20%'}}>Welcome to Spotify!!!</h1></Route>
        <Route exact path="/login"
          render={(props) =>(
            <Login toLog={setLogin}/>
          )}
        />
        {isLogged && <Route exact path="/home" 
          render={(props) =>(
            <Home/>
          )}
        />}
        {isLogged && <Route exact path="/playlist/:id" 
            render={(props) =>(
              <Playlist match={props.match} location={props.location} history={props.history}/>
            )}
          />}
        {isLogged && <Route exact path="/album/:id" 
            render={(props) =>(
              <Album match={props.match} location={props.location} history={props.history}/>
            )}
          />}
        {isLogged && <Route exact path="/artist/:id" 
            render={(props) =>(
              <Artist match={props.match} location={props.location} history={props.history}/>
            )}
          />}
        {isLogged && <Route exact path="/song/:id?" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history}/>
            )}
          />}
        {isLogged && <Route exact path="/song/:id" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history}/>
            )}
          />}
        <Route>
              <h1 style={{marginTop:"20%"}}>
                ERROR 404, Page Not Found!
              </h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
