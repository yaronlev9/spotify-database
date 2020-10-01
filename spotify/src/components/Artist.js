import React from 'react';
import {Link} from 'react-router-dom';

function Artist(props) {
  const path = `/artist/${props.obj.ArtistID}`
  return (
        <div style={{color:'white'}} className="artist">
          <Link to={path}>
          <img alt={props.obj.Artist_name} style={{'borderRadius': '50%'}} src={props.obj.Cover_img} width="256" height="256"></img>
          </Link>
          <br/>
          {props.obj.Artist_name}
        </div>
  );
}

export default Artist;
