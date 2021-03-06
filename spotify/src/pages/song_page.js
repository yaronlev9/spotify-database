import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useLocation, useParams, useHistory} from 'react-router-dom';
import network from '../services/network';
import '../App.css';
import Player from '../components/player';
import mixpanel from '../AnalyticsManager'

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function Song_page(props) {
    const [origin, setOrigin] = useState();
    const [originName, setOriginName] = useState();
    const [originID, setOriginID] = useState();
    const [SongID, setSongID] = useState();
    const [image, setImage] = useState('data:image/jpeg;base64,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');
    const [allSongs, setAllSongs] = useState([]);
    const [ArtistName, setArtistName] = useState();
    const [AlbumName, setAlbumName] = useState();
    const [YoutubeLink, setYoutubeLink] = useState();
    const [Title, setTitle] = useState();
    const [Length, setLength] = useState();
    const location = useLocation();
    const params = useParams();
    const history = useHistory();

    const qParams = new URLSearchParams(location.search);
    let playlist = qParams.get('playlist');
    let artist = qParams.get('artist');
    let album = qParams.get('album');
    async function getSong(){
        const play = await network.get(`/api/songs/song/${params.id}`).then((res) => res.data);
        setSongID(play[0].SongID);
        setArtistName(play[0].Artist_name);
        setAlbumName(play[0].Album_name);
        setTitle(play[0].Title);
        setLength(str_pad_left(Math.floor(play[0].Length/60),'0',2)+':'+str_pad_left(play[0].Length - (Math.floor(play[0].Length/60)) * 60,'0',2));
        setYoutubeLink(play[0].Youtube_link.split('?')[1].split('&')[0].split('=')[1]);
        if (playlist !== null){
            const img = await network.get(`/api/playlists/playlist/${playlist}`).then((res) => res.data);
            setOriginName(`playlist: ${img[0].Playlist_name}`);
            setImage(img[0].Cover_img);
            const songs = await network.get(`/api/songs/playlist_songs/${playlist}`).then((res) => res.data);
            setAllSongs(songs);
            setOrigin('playlist');
            setOriginID(playlist);
            return;
        }
        if (artist !== null){
            const img = await network.get(`/api/artists/artist/${artist}`).then((res) => res.data);
            setImage(img[0].Cover_img);
            const songs = await network.get(`/api/songs/best_artist_songs/${artist}`).then((res) => res.data);
            setAllSongs(songs);
            setOrigin('artist');
            setOriginID(artist);
            return;
        }
        if (album !== null){
            const img = await network.get(`/api/albums/album/${album}`).then((res) => res.data);
            setImage(img[0].Cover_img);
            const songs = await network.get(`/api/songs/album_songs/${album}`).then((res) => res.data);
            setAllSongs(songs);
            setOrigin('album');
            setOriginID(album);
            return;
        }
    }  
    function next(){
        for (let index = 0; index < allSongs.length - 1; index++){
            if (allSongs[index].SongID === SongID){
                history.push(`/song/${allSongs[index + 1].SongID}?${origin}=${originID}`);
                break;
            }
        }
    }

    function  runMixpanel(){
        mixpanel.track("played song", {"song name": Title, "user": props.user}); 
    }

    useEffect( () => { getSong()
        const SongInterval = setInterval(getSong, 1800000);
        return () => clearInterval(SongInterval);
      }, [location]);
    
    return (
            <div>
                <div className="page" style={{color:'white'}}>
                <img style={{'borderRadius': '4%'}} src={image} width="300px" height="300px" alt={Title}></img>
                <div style={{fontSize:"20px"}}>{originName}</div>
                    <span className="info">
                        <div style ={{fontSize:"24px", position:"relative", left:"5%"}}>{Title}</div>
                        <div style ={{fontSize:"18px", position:"relative", left:"5%"}}>Artist: {ArtistName}</div>
                        <div style ={{width:"20%", fontSize:"18px", position:"relative", left:"5%"}}>Album: {AlbumName}</div>
                        <div style ={{fontSize:"18px", position:"relative", left:"5%"}}>Duration: {Length}</div>
                    </span>
                <div className="player">
                <Player videoId={YoutubeLink} next={next} mixpanel={runMixpanel}/>
                </div>
                </div>
                <div className="songs">
                    {allSongs.map((item,i)=> 
                    <div className="record" key={i}>
                        <Link style={{color:'white'}} to={`/song/${item.SongID}?${origin}=${originID}`}>
                            <img alt={item.Title} src='data:image/jpeg;base64,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' 
                            width="20" height="20"></img>
                            <span className="title">{i + 1}. {item.Title}</span>
                            <span className="name">{item.Artist_name}</span>
                            <span className="length">{str_pad_left(Math.floor(item.Length/60),'0',2)+':'+str_pad_left(item.Length - (Math.floor(item.Length/60)) * 60,'0',2)}</span>
                        </Link>
                    </div>)}
                </div>
            </div>
    );
}

export default Song_page;
