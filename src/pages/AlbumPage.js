import "../styles/album_styles.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import SideBar from "../components/SideBarComponent"
import { FaPlay } from 'react-icons/fa';
import Album from "../components/AlbumComponent";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/audioPlayer/audioPlayer";

function AlbumSong({ song, index }) {

  const songName=song.name
  const songHits=song.listenTimes
  const songLength=song.duration
  const songURL=song.song

  const { currentSong } = useSelector((state) => state.audioPlayer);
  const dispatch = useDispatch();

  function clickedButton() {
      console.log("CLICKED SONG");
      dispatch(setCurrentSong({ ...currentSong, song: song, action: "play", trackProgress: 0 }));
  }

  const [isHovered, setIsHovered] = useState(false);
  const formattedHits = parseInt(songHits).toLocaleString();
  return (
    <div 
      className="album_song" 
      onClick={clickedButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
    <h5  class="non-bold" className="album_song_index">{index}</h5>
    {isHovered && (
          <div className="play-icon">
            
          <FaPlay/>
          </div>
        )}
      <div className="album_song_info">
        <div className="album_song_name">
          <h4>{songName}</h4>
        </div>
        <div className="album_song_hits">
          <h5 class="non-bold">{formattedHits}</h5>
        </div>
        <div className="album_song_length">
          <h5 class="non-bold">{songLength}</h5>
        </div>
      </div>
    </div>
  );
}







function AlbumHead({
  albumImgUrl,
  artistName,
  albumName,
  albumYear,
  artistId,
  albumTotalSong
}) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function clickedButton() {
    console.log("CLICKED ARTIST");
  }
  return (
    <div
      className="album"
      style={{
        transform: `translateY(-${scrollPosition * 0.5}px)`
      }}
    >
      <img className="album_img" src={albumImgUrl} alt="" />
      <div className="album_info">
        <span className="album_name">{albumName}</span>
        <div>
          <h1 className="album_artist_name_year_song">
            <a className="album_artist_name" href={"/artist?artistId="+artistId}> {artistName}</a> • {albumYear} • {albumTotalSong} songs
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function AlbumPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("albumId");


  

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/song/album/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setSongs(response.data.data);
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const [albums, setAlbums] = useState([]);
  const [albumArtistId, setAlbumArtistId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/album/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setAlbums(response.data.data);
          console.info('albumArtistId:',response.data.data[0].artistId)
          setAlbumArtistId(response.data.data[0]?.artistId || "");
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const [otherAlbums, setOtherAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/album/artist/' + albumArtistId + '/other', {
          params: {
            exceptAlbumId: queryValue
          }
        });
        console.info('url:',apiUrl + '/album/artist/' + albumArtistId + '/other', {
          params: {
            exceptAlbumId: queryValue
          }
        })
        if (Array.isArray(response.data.data)) {
          setOtherAlbums(response.data.data);
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [albumArtistId]); 



  


  return (


      <div className="album-home-container">
      <div>
        <SideBar />
      </div>

<div className="album-main-content">
      <div>
        <div className="album_container">
          {albums.map((album) => (
            <AlbumHead
              key={album._id}
              albumImgUrl={album.cover}
              albumName={album.name}
              artistName={album.artistName}
              albumYear={album.year}
              albumTotalSong={album.totalSongs}
              artistId={album.artistId}
            />
          ))}
        </div>

      </div> 
      <div>
        <div className="album_song_header">
          <div className="album_song_header_item">
            <div className="album_song_header_title">TITLE</div>
            <div className="album_song_header_hits">PLAYS</div>
            <div className="album_song_header_length">LENGTH</div>
          </div>
        </div>

        <div className="album_song_container">
          {songs.map((song, index) => (
            <AlbumSong key={song._id} index={index+1} song={song}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="album_title">More Albums</h1>
        <div className="album_other_album_container">
          {otherAlbums.map((otherAlbum) => (
            <Album album={otherAlbum} key={otherAlbum._id}/>
          ))}
        </div>
      </div>
      </div>
      </div>

  );
}
