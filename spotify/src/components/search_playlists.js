import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import network from '../services/network';
import {Link} from 'react-router-dom';

function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function SearchPlaylists(props) {
  const [playlists, setPlaylists] = useState([]);

  async function getData(){
      let items = await network.get(`/api/search/playlists/${props.search}`).then((res) => res.data);
      if (items){
        setPlaylists(items);
      }
      else{
        setPlaylists([])
      }
  }

  useEffect( () => { getData()
    const ArtistInterval = setInterval(getData, 1800000);
    return () => clearInterval(ArtistInterval);
  }, [props.search]);

  const classes = useStyles();
  return (
    <div>
      {playlists.length !== 0 &&<div className="songs" style={{color:"white"}}> 
      <div style={{textAlign:'left', margin:'15px'}}>Playlists</div>
    {playlists.map((item,i)=> 
      <div className="record" key={i}>
          <Link style={{color:'white'}} to={`/playlist/${item._source.PlaylistID}`}>
              <img alt={item._source.Playlist_name} src={item._source.Cover_img}
              width="20" height="20"></img>
              <span className="title">{i + 1}. {item._source.Playlist_name}</span>
              <span className="name">created at: {item._source.Created_at.split(' ')[0]}</span>
              <span className="length">num of tracks: {item._source.Num_of_tracks}</span>
          </Link>
      </div>)}
      </div>}
    </div>
  );
}

