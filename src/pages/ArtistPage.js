import "../styles/artist_styles.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import SideBar from "../components/Side_bar"
import { FaPlay } from 'react-icons/fa';

function ArtistSong({ songImgUrl,index, songName, songHits, songLength }) {
  function clickedButton() {
    console.log("CLICKED SONG");
  }
  const [isHovered, setIsHovered] = useState(false);
  const formattedHits = parseInt(songHits).toLocaleString();
  return (
    <div 
      className="artist_song" 
      onClick={clickedButton} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <h5 class="non-bold" className="song_index">{index}</h5>
      {isHovered && (
          <div className="play-icon">
            
          <FaPlay/>
          </div>
        )}
      <img className="artist_song_img" src={songImgUrl} alt="" />
      <div className="artist_song_info">
        <div className="artist_song_name">
          <h4>{songName}</h4>
        </div>
        <div className="artist_song_hits">
          <h5 class="non-bold">{formattedHits}</h5>
        </div>
        <div className="artist_song_length">
          <h5 class="non-bold">{songLength}</h5>
        </div>
      </div>
    </div>
  );
}

function ArtistAlbum({ albumImgUrl,albumId, albumName, albumYear }) {
  function clickedButton() {
    console.log("CLICKED ALBUM");
  }

  return (
    <a href={"/album?albumId="+albumId}>
      <div className="artist_album" onClick={clickedButton}>
        <img className="artist_album_img" src={albumImgUrl} alt="" />
        <div className="artist_album_info">
          <span className="artist_album_name" >
            {albumName.length > 13 ? albumName.slice(0, 13) + "..." : albumName}
          </span>
          <br />
          <span className="artist_album_year">{albumYear}</span>
        </div>
      </div>
    </a>
  );
}


function ArtistHead({ artistBackgroundImgUrl, artistName, artistGenre }) {
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

  const calculateOpacity = () => {
    const maxOpacityScroll = 200; // Adjust this value to change when the image starts to fade
    const opacity = Math.max(1 - scrollPosition / maxOpacityScroll, 0);
    return opacity;
  };

  function clickedButton() {
    console.log("CLICKED ARTIST");
  }
  return (
    <div className="artist">
      <img
        className="artist_background_img"
        src={artistBackgroundImgUrl}
        alt=""
        style={{
          transform: `translateY(-${scrollPosition * 0.5}px)`,
          opacity: calculateOpacity()
        }}
        onClick={clickedButton}
      />
      <div
        className="artist_info"
        style={{
          transform: `translateY(-${scrollPosition * 0.5}px)`
        }}
      >
        <h1 className="artist_name" onClick={clickedButton}>
          {artistName}
        </h1>
        <h1 className="artist_genre">{artistGenre}</h1>
      </div>
    </div>
  );
}

export default function Artist() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("artistId");


  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/song/artist/' + queryValue);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/album/artist/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setAlbums(response.data.data);
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/artist/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setArtists(response.data.data);
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    
    <div className="home-container">
      <div>
        <SideBar />
      </div>
      <div className="album-main-content">
      <div>
        <div className="artist_container">
          {artists.map((artist) => (
              <ArtistHead
              key={artist._id}
              artistBackgroundImgUrl={artist.background}
              artistName={artist.name}
              artistGenre={artist.genre}
            />
            ))}
        </div>
      </div>

      <div>
        <h1 className="artist_title">Top songs</h1>

        <div className="artist_song_header">
          <div className="artist_song_header_item">
            <div className="artist_song_header_title">TITLE</div>
            <div className="artist_song_header_hits">PLAYS</div>
            <div className="artist_song_header_length">LENGTH</div>
          </div>
        </div>

        <div className="artist_song_container">
          {songs.map((song, index) => (
            <ArtistSong
              key={song._id}
              index={index+1}
              songImgUrl={song.cover}
              songName={song.name}
              songHits={song.listenTimes}
              songLength={song.duration}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="artist_title">Discography</h1>
        <div className="artist_album_container">
          {albums.map((album) => (
            <ArtistAlbum
              key={album._id}
              albumId={album._id.toString()}
              albumImgUrl={album.cover}
              albumName={album.name}
              albumYear={album.year}
            />
          ))}
        </div>
        </div>
      </div>
      </div>

    
  );
}
