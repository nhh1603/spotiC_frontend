import "../styles/PlayListPage.css";
import React, { useEffect, useState } from "react";
// import SearchBar from "../components/Search_bar";
import { useLocation } from "react-router-dom";
import axios from "axios"
import SideBar from "../components/SideBarComponent";
import { FaPlay } from 'react-icons/fa';

// userName={playlists.userName}: mod backend here to limit acces per user
// playlistTotalSong={album.totalSongs}: count songs per playlist

function PlayListSong({ index, songName, artistName, songLength }) {
  function clickedButton() {
    console.log("CLICKED SONG");
  }
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="playlist_song" 
      onClick={clickedButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
    <h5  class="non-bold" className="playlist_song_index">{index}</h5>
    {isHovered && (
          <div className="play-icon">
            
          <FaPlay/>
          </div>
        )}
      <div className="playlist_song_info">
        <div className="playlist_song_name">
          <h4>{songName}</h4>
        </div>
        <div className="playlist_artist_name">
          <h5 class="non-bold">{artistName}</h5>
        </div>
        <div className="playlist_song_length">
          <h5 class="non-bold">{songLength}</h5>
        </div>
      </div>
    </div>
  );
}


function MorePlayList({ playListImgUrl, playListId, playListName }) {
  function clickedButton() {
    console.log("CLICKED ALBUM");
  }

  return (
    <a href={"/playlist?playlistId="+playListId}>
    <div className="playlist_other_playlist" onClick={clickedButton}>
      <img className="playlist_other_playlist_img" src={playListImgUrl} alt="" />
      <div className="playlist_other_playlist_info">
        <span className="playlist_other_playlist_name" >
          {playListName.length > 13 ? playListName.slice(0, 13) + "..." : playListName}
        </span>
      </div>
    </div>
    </a>
  );
}


function PlayListHead({
  playListImgUrl,
  userName,
  playListName,
  playlistTotalSong
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
      className="playlist"
      style={{
        transform: `translateY(-${scrollPosition * 0.5}px)`
      }}
    >
      <img className="playlist_img" src={playListImgUrl} alt="" />
      <div className="playlist_info">
        <span className="playlist_name">{playListName}</span>
        <div>
          <h1 className="playlist_artist_name" onClick={clickedButton}>
            {userName} • {playlistTotalSong} songs
          </h1>
        </div>
      </div>
    </div>
  );
}


export default function PlayListPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("playlistId");

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/song/playlist/' + queryValue);
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

  const [playlists, setPlayLists] = useState([]);
  const [playlistArtistId, setPlayListArtistId] = useState(""); //?

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/playlist/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setPlayLists(response.data.data);
          console.info('playlistArtistId:',response.data.data[0].artistId)
          setPlayListArtistId(response.data.data[0]?.artistId || ""); //?
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const [otherPlayLists, setOtherPlayLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/playlist/artist/' + playlistArtistId + '/other', {
          params: {
            exceptAlbumId: queryValue
          }
        });
        console.info('url:',apiUrl + '/playlist/artist/' + playlistArtistId + '/other', {
          params: {
            exceptAlbumId: queryValue
          }
        })
        if (Array.isArray(response.data.data)) {
          setOtherPlayLists(response.data.data);
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [playlistArtistId]); 

  return (
    <div className="home-container">
      <div>
        <SideBar />
      </div>

      <div className="playlist-main-content">
        <div>
          <div className="playlist_container">
            {playlists.map((album) => (
              <PlayListHead
                key={playlists._id}
                playListImgUrl={playlists.cover}
                playListName={playlists.name}

                userName={playlists.userName}
    
                playlistTotalSong={42}
              />
            ))}
          </div>
        </div> 

        <div>
          <div className="playlist_song_header">
            <div className="playlist_song_header_item">
              <div className="playlist_song_header_title">TITLE</div>
              <div className="playlist_song_header_artist">ARTIST</div>
              <div className="playlist_song_header_length">LENGTH</div>
            </div>
          </div>

          <div className="playlist_song_container">
            {songs.map((song, index) => (
              <PlayListSong
                key={song._id}
                index={index+1}
                songName={song.name}
                artistName={song.artistName}
                songLength={song.duration}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="playlist_title">More Albums</h1>
          <div className="playlist_other_playlist_container">
            {otherPlayLists.map((otherAlbum) => (
              <MorePlayList
                key={otherAlbum._id}
                playListId={otherAlbum._id}
                playListImgUrl={otherAlbum.cover}
                playListName={otherAlbum.name}

              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
