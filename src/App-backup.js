import React, {useState} from "react"
import "./styles.css";
import "./side_bar.css";
import axios from "axios"
import SearchBar from "./Search_bar";
import {useEffect} from "react"

function HomeSong({ songImgUrl, songName, artistUrl, artistName }) {
  function clickedButton() {
    console.log("CLICKED SONG");
  }
  return (
    <div className="home_song">
      <img
        className="home_song_img"
        src={songImgUrl}
        alt=""
        onClick={clickedButton}
      />
      <div className="home_song_info">
        <h4 className="home_song_name" onClick={clickedButton}>
          {songName.length > 11 ? songName.slice(0, 11) + "..." : songName}
        </h4>
        <a className="home_song_artist_name" href={artistUrl}>
          {artistName}
        </a>
      </div>
    </div>
  );
}

function HomeArtist({ artistImgUrl, artistGenre, artistName }) {
  function clickedButton() {
    console.log("CLICKED ARTIST");
  }

  return (
    <div className="home_artist">
      <img
        className="home_artist_img"
        src={artistImgUrl}
        alt=""
        onClick={clickedButton}
      />
      <div>
        <a className="home_artist_name" href="https://google.com">
          {artistName}
        </a>
        <br />
        <span className="home_artist_genre">{artistGenre}</span>
      </div>
    </div>
  );
}

const topSongData = [
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "Ocean Eyes",
    artistUrl: "",
    artistName: "Billie Eilish"
  },
  {
    songImgUrl:
      " https://i.scdn.co/image/ab67616d00004851fc3ff54493fcc890bcaa036c",
    songName: "Unholy",
    artistUrl: "",
    artistName: "Sam Smith"
  },
  {
    songImgUrl:
      " https://i.scdn.co/image/ab67616d0000485134362676667a4322838ccc97",
    songName: "One Right Now",
    artistUrl: "",
    artistName: "Post Malone"
  },
  {
    songImgUrl:
      " https://i.scdn.co/image/ab67616d00004851fc3ff54493fcc890bcaa036c",
    songName: "Unholy",
    artistUrl: "",
    artistName: "Sam Smith"
  }
];



const playlistData = [
  {
    playlistName: "My all time favorite",
    playlistUrl: ""
  },
  {
    playlistName: "A must for vacation ",
    playlistUrl: ""
  },
  {
    playlistName: "Driving mode ",
    playlistUrl: ""
  },
  {
    playlistName: "Study mode",
    playlistUrl: ""
  }
];


function SidebarPlaylist({ playlistName, playlistUrl }) {
  function clickedButton() {
    console.log("CLICKED PLAYLIST");
  }

  return (
    <div className="sidebar-playlist">
      <a
        className="sidebar-playlist-name"
        href={playlistUrl}
        onClick={clickedButton}
      >
        {playlistName}
      </a>
    </div>
  );
}

export default function Home() {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const [artists, setArtists] = useState([]);

   {/* useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl+'/artist'); 
          setArtists(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []); */}

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

  return (
    <div className="container">
      <div>
        <div className="menu-icon" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="sidebar">
          {sidebarOpen && (
            <div className="sidebar-open">
              <div className="sidebar-element">Home</div>
              <div className="sidebar-element">Create Playlist</div>
              <div className="sidebar-element">Liked Songs</div>
              <div className="playlist-line" />

              {playlistData.map((item, index) => (
                <SidebarPlaylist
                  key={index}
                  playlistName={item.playlistName}
                  playlistUrl={item.playlistUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="main-content">
        <SearchBar />
        <div>
          <h1 className="home_title">Top songs</h1>
          <div className="home_song_container">
            {topSongData.map((item, index) => (
              <HomeSong
                key={index}
                songImgUrl={item.songImgUrl}
                songName={item.songName}
                artistName={item.artistName}
                artistUrl={item.artistUrl}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="home_title">Top artists</h1>
          <div className="home_artist_container">
            {artists.map((artist) => (
              <HomeArtist
                key={artist._id}
                artistImgUrl={artist.artistImgUrl}
                artistName={artist.artistName}
                artistGenre={artist.artistGenre}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
