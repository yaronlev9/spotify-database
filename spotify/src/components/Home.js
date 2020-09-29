import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Home.css';
import Artist from './Artist';
import Album from './Album';
import Playlist from './Playlist';
import Song from './Song';
import axios from 'axios';

function Home() {
    const [artistList, setArtistList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);
    const [songList, setSongList] = useState([]);
    const types = [['artists', Artist, setArtistList], ['albums', Album, setAlbumList], ['playlists', Playlist, setPlaylistList], ['songs', Song, setSongList]] ;
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    async function getAll(){
        for (let type of types){
            const items = await axios.get(`/api/${type[0]}/top_${type[0]}`).then((res) => res.data);
            const allItems = [];
            items.forEach((item) => {
                const Component = type[1];
                allItems.push(<Component obj={item}/>);
            });
            type[2](allItems);
        }
    }
    useEffect( () => { getAll()}, [])

  


  return (
    <div>
    <h2>Artists</h2>
      <Carousel responsive={responsive}
      containerClass="carousel-container" className="carousel">
        {artistList.map((item,i)=> <div key={i}>{item}</div>)}
      </Carousel>
    <h2>Albums</h2>
      <Carousel responsive={responsive}
      containerClass="carousel-container" className="carousel">
        {albumList.map((item,i)=> <div key={i}>{item}</div>)}
      </Carousel>
    <h2>Playlists</h2>
      <Carousel responsive={responsive}
      containerClass="carousel-container" className="carousel">
        {playlistList.map((item,i)=> <div key={i}>{item}</div>)}
      </Carousel>
    <h2>Songs</h2> 
      <Carousel responsive={responsive}
        containerClass="carousel-container" className="carousel">
        {songList.map((item,i)=> <div key={i}>{item}</div>)}
      </Carousel>
    </div>
  );
}

export default Home;