import React from 'react';
import {Link} from 'react-router-dom';

function Song(props) {
  const path = `/song/${props.obj.SongID}`
  const imgSource = `https://img.youtube.com/vi/${props.obj.Youtube_link.split('?')[1].split('&')[0].split('=')[1]}/0.jpg`
  return (
        <div className="song" style={{color:'white'}}>
          <Link to={path}>
          <img style={{'borderRadius': '4%'}} src={imgSource}

            width="256" height="256"></img>
          </Link>
          <br/>
          {props.obj.Title}
        </div>
  );
}

export default Song;
