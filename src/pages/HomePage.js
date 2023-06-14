import React, { useState } from "react"
import "../styles/styles.css";
import "../styles/side_bar.css";
import axios from "axios"
import SearchBar from "./Search_bar";
import { useEffect } from "react"

function HomeSong({ songImgUrl, artistId, songName, artistName }) {
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
                <a className="home_song_artist_name" href={"/artist?artistId=" + artistId} >
                    {artistName}
                </a>
            </div>
        </div>
    );
}

function HomeArtist({ artistId, artistImgUrl, artistGenre, artistName }) {
    function clickedButton() {
        console.log("CLICKED ARTIST");
    }

    return (
        <a href={"/artist?artistId=" + artistId}>
            <div className="home_artist">
                <img
                    className="home_artist_img"
                    src={artistImgUrl}
                    alt=""
                    onClick={clickedButton}
                />
                <div>
                    <span className="home_artist_name">
                        {artistName}
                    </span>
                    <br />
                    <span className="home_artist_genre">{artistGenre}</span>
                </div>
            </div>
        </a>
    );
}


function SidebarPlaylist({ playlistName }) {
    function clickedButton() {
        console.log("CLICKED PLAYLIST");
    }

    return (
        <div className="sidebar-playlist">
            <span
                className="sidebar-playlist-name"
                onClick={clickedButton}
            >
                {playlistName}
            </span>
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl + '/playlist');
                if (Array.isArray(response.data.data)) {
                    setPlaylists(response.data.data);
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

                            {playlists.map((playlist) => (
                                <SidebarPlaylist
                                    key={playlist._id}
                                    playlistName={playlist.name}
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
                        {songs.map((song) => (
                            <HomeSong
                                key={song._id}
                                songImgUrl={song.cover}
                                songName={song.name}
                                artistName={song.artistName}
                                artistId={song.artistId}
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
