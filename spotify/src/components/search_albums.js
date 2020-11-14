import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

export default function SearchAlbums(props) {
  const [albums, setAlbums] = useState([]);


  async function getData(){
      let items = await network.get(`/api/search/albums/${props.search}`).then((res) => res.data);
      if (items){
        setAlbums(items);
      }
      else{
        setAlbums([])
      }
  }

  useEffect( () => { getData()
    const ArtistInterval = setInterval(getData, 1800000);
    return () => clearInterval(ArtistInterval);
  }, [props.search]);

  const classes = useStyles();
  return (
    <div>
      {albums.length !== 0 &&<div className="songs" style={{color:"white"}}> 
    <div style={{textAlign:'left', margin:'15px'}}>Albums</div>
    {albums.map((item,i)=> 
      <div className="record" key={i}>
          <Link style={{color:'white'}} to={`/album/${item._source.AlbumID}`}>
              <img alt={item._source.Album_name} src={item._source.Cover_img}
              width="20" height="20"></img>
              <span className="title">{i + 1}. {item._source.Album_name}</span>
              <span className="name">created at: {item._source.Created_at.split(' ')[0]}</span>
              <span className="length">num of tracks: {item._source.Num_of_tracks}</span>
          </Link>
      </div>)}
      </div>}
    </div>
  );
}

