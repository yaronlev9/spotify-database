import React from 'react';
import {Link} from 'react-router-dom';

function Playlist(props) {
  const path = `/playlist/${props.obj.PlaylistID}`
  return (
        <div className="playlist" style={{color:'white'}}>
          <Link to={path}>
          <img alt={props.obj.Playlist_name} style={{'borderRadius': '4%'}} src={props.obj.Cover_img} width="256" height="256"></img>
          </Link>          <br/>
          {props.obj.Playlist_name}
        </div>
  );
}

export default Playlist;
