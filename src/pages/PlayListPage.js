import "../styles/PlayListPage.css";
import React, { useEffect, useState } from "react";
// import SearchBar from "../components/Search_bar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/Side_bar";
import { FaPlay } from 'react-icons/fa';


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
    <h5  className="non-bold playlist_song_index">{index}</h5>
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
          <h5 className="non-bold">{artistName}</h5>
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
  // userName,
  playListName,
  // playlistTotalSong
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(playListName)
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
             {/* {playlistTotalSong} songs */}
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
  const playlistId = queryValue;

  const [songs, setSongs] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(apiUrl + '/playlist?playlistId=' + queryValue);
  //       console.log(queryValue)
  //       console.log(response.data.data)
  //       let idlist = response.data.data.find(dict => dict._id === queryValue);
  //       // if (Array.isArray(response.data.data)) {
  //       //   setSongs(response.data.data);
  //       //   console.log(response.data.data);
  //       if (Array.isArray(idlist.songs)) {
  //         // let axiosSongsArray = idlist.songs.map(songId => await axios.get(apiUrl + '/song/' + songId))
  //         // setSongs(axiosSongsArray);
  //         // console.log(axiosSongsArray);
  //         let promises1 = idlist.songs.map(songId => axios.get(apiUrl + '/song/' + songId))
  //         let axiosSongsArray1 = await Promise.all(promises1);
  //         setSongs(axiosSongsArray1.map(res => res.data)); // Assuming each axios.get returns a song data in `res.data`
  //         console.log(axiosSongsArray1);
  //       } else {
  //         console.error('Invalid response data:', response.data.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/song/playlist/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setSongs(response.data.data);
          // console.log(response.data.data);
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [queryValue]); 

  const [playlists, setPlayLists] = useState([]);
  // const [playlistArtistId, setPlayListArtistId] = useState(""); //?

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/playlist/' + queryValue);
        if (Array.isArray(response.data.data)) {
          setPlayLists(response.data.data);
          console.log(response.data.data)
          // console.info('playlistArtistId:',response.data.data[0].artistId)
          // setPlayListArtistId(response.data.data[0]?.artistId || ""); //?
        } else {
          console.error('Invalid response data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [queryValue]); 

  const [otherPlayLists, setOtherPlayLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/playlist/' + playlistId + '/other', {
          params: {
            exceptPlaylistId: queryValue
          }
        });
        console.info('url:',apiUrl + '/playlist/' + playlistId + '/other', {
          params: {
            exceptPlaylistId: queryValue
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
  }, []); 



  return (
    <div className="home-container">
      <div>
        <SideBar />
      </div>

      <div className="playlist-main-content">
        <div>
          <div className="playlist_container">
            {playlists.map((playlist) => (
              <PlayListHead
                key={playlist._id}
                playListImgUrl={playlist.img}
                playListName={playlist.name}
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
            {otherPlayLists.map((otherPlaylists) => (
              <MorePlayList
                key={otherPlaylists._id}
                playListId={otherPlaylists._id}
                playListImgUrl={otherPlaylists.img}
                playListName={otherPlaylists.name}

              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
