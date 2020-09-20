import React from 'react';
import Home from './components/Home';
import Playlist from './components/playlist_page';
import Album from './components/album_page';
import Artist from './components/artist_page';
import Song from './components/song_page';

import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import './App.css';

function App() {

function refresh(){
  window.scrollTo(0, 0);
}

  return (
    <div className="App">
      <BrowserRouter>
      <div className="NavBar" style={{backgroundColor: 'black', color:'green'}}><NavLink to="/" style={{color: 'green', 'textDecoration': 'none'}}><span>SPOTIFY</span></NavLink>
        <NavLink className= "homeBar" to="/home" style={{color: 'grey', 'textDecoration': 'none'}} activeStyle={{color: 'white'}} onClick={refresh}>HOME</NavLink>
      </div>
        <Switch>
        <Route exact path="/"><h1 style={{color:'white', 'marginTop': '20%'}}>Welcome User!!!</h1></Route>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/playlist/:id" 
            render={(props) =>(
              <Playlist match={props.match} location={props.location} history={props.history} />
            )}
          />
        <Route exact path="/album/:id" 
            render={(props) =>(
              <Album match={props.match} location={props.location} history={props.history} />
            )}
          />
        <Route exact path="/artist/:id" 
            render={(props) =>(
              <Artist match={props.match} location={props.location} history={props.history} />
            )}
          />
        <Route exact path="/song/:id?" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history} />
            )}
          />
        <Route exact path="/song/:id" 
            render={(props) =>(
              <Song match={props.match} location={props.location} history={props.history} />
            )}
          />
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
