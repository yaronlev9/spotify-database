import React from 'react';
import {Link} from 'react-router-dom';

function Album(props) {
  const path = `/album/${props.obj.AlbumID}`
  return (
        <div className="album" style={{color:'white'}}>
          <Link to={path}>
          <img style={{'borderRadius': '4%'}} src={props.obj.Cover_img} width="256" height="256"></img>
          </Link>
          <br/>
          {props.obj.Album_name}
        </div>
  );
}

export default Album;
