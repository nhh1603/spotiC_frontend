import "../styles/artist_styles.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import SideBar from "../components/SideBarComponent"
import { FaPlay } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/audioPlayer/audioPlayer";
import useSound from "use-sound";
import Album from "../components/AlbumComponent"
import Song from "../components/SongComponent";


function ArtistHead({ artistBackgroundImgUrl, artistName, artistGenre }) {
  
  function clickedButton() {
    console.log("CLICKED ARTIST");
  }
  return (
    <div className="artist">
      <img
        className="artist_background_img"
        src={artistBackgroundImgUrl}
        alt=""
        onClick={clickedButton}
      />
      <div
        className="artist_info"
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
    
    <div className="artist-home-container">
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
              <Song song= {song} index={index+1} key={song._id}/>
            ))}
          </div>
        </div>

        <div>
          <h1 className="artist_title">Discography</h1>
          <div className="artist_album_container">
            {albums.map((album) => (
              <Album album={album} key={album._id}/>
            ))}
          </div>
        </div>
      </div>
    </div>

    
  );
}
