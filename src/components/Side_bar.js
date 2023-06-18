import "../styles/side_bar.css";
import { FaHome, FaPlus, FaHeart, FaSignOutAlt, FaSearch } from 'react-icons/fa';

import React, { useEffect, useState } from "react";
import axios from "axios"

import * as actions from "../redux/auth/auth"
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

function SidebarPlaylist({ k, playlistName }) {
    const navigate = useNavigate();
    // console.log(k);
    function clickedButton(k) {
        // console.log(k)
        // console.log("CLICKED PLAYLIST");
        navigate('/playlist?playlistId=' + k);
    }

    return (
        <div className="sidebar-playlist">
            <span
                className="sidebar-playlist-name"
                onClick={() => clickedButton(k)}
            >
                {playlistName}
            </span>
        </div>
    );
}



const SideBar = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [playlists, setPlaylists] = useState([]);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(actions.logout());
        // window.location = "/";
    };  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl + '/playlist');
                if (Array.isArray(response.data.data)) {
                    // console.log(response.data.data);
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

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="menu-icon" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="sidebar">
                {sidebarOpen && (
                    <div className="sidebar-open">
                        <a href="/home" className="sidebar-element-href"><div className="sidebar-element"><FaHome />           Home</div></a>
                        <a href="/search" className="sidebar-element-href"><div className="sidebar-element"><FaSearch />            Search</div></a>
                        <a href="/home" className="sidebar-element-href"><div className="sidebar-element"><FaPlus />            Create Playlist</div></a>
                        <a href="/home" className="sidebar-element-href"><div className="sidebar-element"><FaHeart />            Liked Songs</div></a>
                        <a href="/" className="sidebar-element-href"><div className="sidebar-element" onClick={handleLogout}><FaSignOutAlt />            Log Out</div></a>
                        <div className="playlist-line" />

                        {playlists.map((playlist) => (
                            <SidebarPlaylist
                                k={playlist._id}
                                key={playlist._id}
                                playlistName={playlist.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SideBar;
