import { Fragment, useState } from "react";
import axiosInstance from "../redux/axiosInstance";
// import Song from "../../components/Song";
// import Playlist from "../../components/Playlist";
import { IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import SideBar from "../components/Side_bar";
import SearchBar from "../components/Search_bar";
import "../styles/SearchPage.css";

import Song from "../components/SongComponent";

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
            <div className="search-input-container">
                <SearchIcon />
                <input
                    className="search-input"
                    type="search"
                    placeholder="What do you want to listen to ?"
                    onChange={handleSearch}
                    value={search}
                />
            </div>

            {Object.keys(results).length > 0 && (
                <div className="search-results-container">
                    {results.songs.length > 0 && (
                        <div className="search-results-section">
                            <h2 className="search-results-section-title">Songs</h2>
                            <div className="search-results-section-content">
                                {results.songs.map((song, index) => (
                                    <Song songImgUrl={song.cover} index={index+1} songName={song.name} songHits={song.listenTimes} songLength={song.duration} />
                                ))}
                            </div>
                        </div>
                    )}
                    {/* {results.artists.length > 0 && ( */}
                </div>
            )}
        </div>
    );
};

export default SearchPage;