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

export default function SearchArtists(props) {
  const [artists, setArtists] = useState([]);

  async function getData(){
      let items = await network.get(`/api/search/artists/${props.search}`).then((res) => res.data);
      if (items){
        setArtists(items);
      }
      else{
        setArtists([])
      }
  }

  useEffect( () => { getData()
    const ArtistInterval = setInterval(getData, 1800000);
    return () => clearInterval(ArtistInterval);
  }, [props.search]);

  const classes = useStyles();
  return (
    <div>
      {artists.length !== 0 &&<div className="songs" style={{color:"white"}}> 
      <div style={{textAlign:'left', margin:'15px'}}>Artists</div>
    {artists.map((item,i)=> 
      <div className="record" key={i}>
          <Link style={{color:'white'}} to={`/artist/${item._source.ArtistID}`}>
              <img alt={item._source.Artist_name} src={item._source.Cover_img} 
              width="20" height="20"></img>
              <span className="title">{i + 1}. {item._source.Artist_name}</span>
          </Link>
      </div>)}
      </div>}
    </div>
  );
}

