import React, { useEffect, useState } from "react";
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/audioPlayer/audioPlayer";


function Song({ song, songImgUrl, index, songName, songHits, songLength }) {
    const { currentSong } = useSelector((state) => state.audioPlayer);
    const dispatch = useDispatch();

    function clickedButton() {
        console.log("CLICKED SONG");
        // if (currentSOng && currentSong.action === "play")
        dispatch(setCurrentSong({ song: song, action: "play" }));
    }
    const [isHovered, setIsHovered] = useState(false);
    const formattedHits = parseInt(songHits).toLocaleString();
    return (
        <div
            className="artist_song"
            onClick={clickedButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <h5 class="non-bold" className="song_index">{index}</h5>
            {isHovered && (
                <div className="play-icon">

                    <FaPlay />
                </div>
            )}
            <img className="artist_song_img" src={songImgUrl} alt="" />
            <div className="artist_song_info">
                <div className="artist_song_name">
                    <h4>{songName}</h4>
                </div>
                <div className="artist_song_hits">
                    <h5 className="non-bold">{formattedHits}</h5>
                </div>
                <div className="artist_song_length">
                    <h5 className="non-bold">{songLength}</h5>
                </div>
            </div>
        </div>
    );
}

export default Song;