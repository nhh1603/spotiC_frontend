import React, {useState} from "react"
import "../styles/home_styles.css";
import SideBar from "../components/SideBarComponent"
import axios from "axios"
import {useEffect} from "react"
import { FaPlayCircle } from 'react-icons/fa';
import Artist from "../components/ArtistComponent"

import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/audioPlayer/audioPlayer";



function HomeSong({ song }) {
  const songImgUrl=song.cover
  const songName=song.name
  const artistName=song.artistName
  const artistId=song.artistId
  const songURL= song.song 

  const { currentSong } = useSelector((state) => state.audioPlayer);
    const dispatch = useDispatch();

    function clickedButton() {
        console.log("CLICKED SONG");
        dispatch(setCurrentSong({ song: songURL, action: "play" }));
    }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="home_song"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} 
      >
      <img
        className="home_song_img"
        src={songImgUrl}
        alt=""
        onClick={clickedButton}
      />
      <div className="home_song_info_container">
        <div className="home_song_info">
          <h4 className="home_song_name" onClick={clickedButton}>
            {songName.length > 11 ? songName.slice(0, 11) + "..." : songName}
          </h4>
          <a className="home_song_artist_name" href={"/artist?artistId="+artistId} >
            {artistName}
          </a>
        </div>

        {isHovered && (
          <div className="play-icon" onClick={clickedButton}>
            
          <FaPlayCircle/>
          </div>
        )}

      </div>
    </div>
  );
}





export default function Home() {

  const apiUrl = process.env.REACT_APP_API_URL;
  

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/artist');
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

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/song');
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

  const [playlists, setPlaylists] = useState([]);


  return (
    <div className="home-container">
      <div>
        <SideBar />
      </div>
      <div className="main-content">
        <div>
          <h1 className="home_title">Top songs</h1>
          <div className="home_song_container">
            {songs.map((song) => (
              <HomeSong key={song._id} song={song} />
            ))}
          </div>
        </div>

        <div>
          <h1 className="home_title">Top artists</h1>
          <div className="home_artist_container">
            {artists.map((artist) => (
              <Artist
                key={artist._id}
                artistId={artist._id.toString()}
                artistImgUrl={artist.cover}
                artistName={artist.name}
                artistGenre={artist.genre}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
