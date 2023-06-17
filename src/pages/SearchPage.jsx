import { Fragment, useState } from "react";
import axiosInstance from "../redux/axiosInstance";
// import Song from "../../components/Song";
// import Playlist from "../../components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SideBar from "../components/SideBarComponent";
import SearchBar from "../components/SearchBarComponent";
import "../styles/SearchPage.css";

import Song from "../components/SongComponent";
import Album from "../components/AlbumComponent";
import Artist from "../components/ArtistComponent";

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({});

    const handleSearch = async ({ currentTarget: input }) => {
        setSearch(input.value);
        setResults({});
        try {
            const url = process.env.REACT_APP_API_URL + `/search/?search=${input.value}`;
            const { data } = await axiosInstance.get(url);
            setResults(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="search-container">
            <div>
                <SideBar />
            </div>

            <div className="main-content">
            <div className="search-input-container">
                
                <input
                    className="search-input"
                    type="search"
                    placeholder="What do you want to listen to ?"
                    onChange={handleSearch}
                    value={search}
                />
                <SearchIcon style={{"padding-left": "20px"}}/>
            </div>

            {Object.keys(results).length > 0 && (
                <div className="search-results-container">
                    {results.songs.length > 0 && (
                        <div className="search-results-section">
                            <h2 className="search-results-section-title">Songs</h2>
                            <div className="search-results-section-content">
                                {results.songs.map((song, index) => (
                                    <Song key={song._id} songImgUrl={song.cover} index={index+1} songName={song.name} songHits={song.listenTimes} songLength={song.duration} />
                                ))}
                                
                            </div>
                        </div>
                    )}

                    {results.albums.length > 0 && (
                        
                            <div>
                            <h2 className="search-results-section-title">Albums</h2>
                            <div className="artist_album_container">
                                {results.albums.map((album, index) => (
                                    <Album 
                                        albumImgUrl={album.cover} 
                                        index={index+1} 
                                        albumName={album.name} 
                                        albumId={album._id} 
                                        albumYear={album.year} 
                                        key={album._id}
                                    />
                                ))}    
                        </div>
                        </div>
                    )}

                    {results.artists.length > 0 && (
                        
                        <div>
                        <h2 className="search-results-section-title">Artists</h2>
                        <div className="artist_album_container">
                            {results.artists.map((artist, index) => (
                                <Artist 
                                    artistImgUrl={artist.cover} 
                                    index={index+1} 
                                    artistName={artist.name} 
                                    artistId={artist._id}
                                    artistGenre={artist.genre} 
                                    key={artist._id}

                                   
                                />
                            ))}    
                    </div>
                    </div>
                )}
                   
                </div>
            )}
            </div>
        </div>
    );
};

export default SearchPage;
