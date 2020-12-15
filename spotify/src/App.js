import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import mixpanel from './AnalyticsManager'
import AppBar from './components/App_bar'
import MainRouter from './routers/Main_Router.js'
import './App.css';

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
        <MainRouter userName = {userName} setLogin = {setLogin} search = {search} isLogged = {isLogged} history = {history} location = {location}/>
    </div>
  );
}

export default App;
