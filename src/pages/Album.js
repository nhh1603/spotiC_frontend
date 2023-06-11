import "../styles/album_styles.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./Search_bar";
import "../styles/side_bar.css";
import { useLocation } from "react-router-dom";
import axios from "axios"

function AlbumSong({ songName, songHits, songLength }) {
  function clickedButton() {
    console.log("CLICKED SONG");
  }
  return (
    <div className="album_song" onClick={clickedButton}>
      <div className="album_song_info">
        <div className="album_song_name">
          <h4>{songName}</h4>
        </div>
        <div className="album_song_hits">
          <h6>{songHits}</h6>
        </div>
        <div className="album_song_length">
          <h6>{songLength}</h6>
        </div>
      </div>
    </div>
  );
}

function MoreAlbum({ albumImgUrl, albumId, albumName, albumYear }) {
  function clickedButton() {
    console.log("CLICKED ALBUM");
  }

  return (
    <a href={"/album?albumId="+albumId}>
    <div className="album_other_album" onClick={clickedButton}>
      <img className="album_other_album_img" src={albumImgUrl} alt="" />
      <div className="album_other_album_info">
        <span className="album_other_album_name" >
          {albumName.length > 13 ? albumName.slice(0, 13) + "..." : albumName}
        </span>
        <br />
        <span className="album_other_album_year">{albumYear}</span>
      </div>
    </div>
    </a>
  );
}





function AlbumHead({
  albumImgUrl,
  artistName,
  albumName,
  albumYear,
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
          <h1 className="artist_name" onClick={clickedButton}>
            {artistName} • {albumYear} • {albumTotalSong} songs
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function Album() {
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
    <>
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
          {songs.map((song) => (
            <AlbumSong
              key={song._id}
              songName={song.name}
              songHits={song.listenTimes}
              songLength={song.duration}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="album_title">More Albums</h1>
        <div className="album_other_album_container">
          {otherAlbums.map((otherAlbum) => (
            <MoreAlbum
              key={otherAlbum._id}
              albumId={otherAlbum._id}
              albumImgUrl={otherAlbum.cover}
              albumName={otherAlbum.name}
              albumYear={otherAlbum.year}
            />
          ))}
        </div>
      </div>
    </>
  );
}
