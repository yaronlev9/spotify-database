import React, { useState, useEffect } from 'react';
import network from '../services/network';
import {useHistory} from 'react-router-dom';
import '../App.css';

export default (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory();
  useEffect( () => {   props.toLog(false);
  }, []);

  const onSubmit = async () => {
    const response = await network.post('api/login', {
      username,
      password
    });
    if (response.data && response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      props.toLog(true);
      history.push(`/home`);

    } else {
      console.log(response.response.data.errorMessage)
      setError(response.response.data.errorMessage)
    }
  }
  return(
    <div className="login">
      <div><input className="username" value={username} onChange={({ target: { value } }) => setUsername(value)} placeholder="Username"/></div>
      <div><input className="password" value={password} onChange={({ target: { value } }) => setPassword(value)} placeholder='Password'/></div>
      <button className="submit" onClick={onSubmit}>Login</button>
      {error ? <div>*{error}</div> : null}
    </div>
  )
}