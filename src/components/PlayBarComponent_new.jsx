import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSong, setAudioRef } from "../redux/audioPlayer/audioPlayer";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
} from 'react-icons/io';
import "../styles/PlayBarComponent.css";

const AudioPlayer = () => {
    const [trackProgress, setTrackProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const { currentSong } = useSelector((state) => state.audioPlayer);
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [mute, setMute] = useState(false);
    // const [volume, setVolume] = useState(30);

    const audioRef = useRef();
    const intervalRef = useRef();

    // const [audioRef, setAudioRef] = useState(null);

    let Songtitle = "titleInitial";
    let Songsubtitle = "artist";
    let musicCover = (
        <img
            className="playbar-musicCover"
            src="https://picsum.photos/200/200"
            alt="Album cover"
        />
    );
    let volume = 30;
    // let trackProgress = 0;
    if (currentSong.song !== null) {
        Songtitle = currentSong.song.name;
        Songsubtitle = currentSong.song.artistName;
        musicCover = (
            <img
                className="playbar-musicCover"
                src={currentSong.song.cover}
                alt="Album cover"
            />
        );
        // setVolume(currentSong.volume);
        volume = currentSong.volume;
        // trackProgress = currentSong.trackProgress;
        // setTrackProgress(currentSong.trackProgress);
    }


    const startTimer = () => {
        clearInterval(intervalRef.current);
        // dispatch(setAudioRef(audioRef));

        intervalRef.current = setInterval(() => {
            if (audioRef && audioRef.current.ended) {
                dispatch(setCurrentSong({ ...currentSong, action: "pause"}));
            } else if (audioRef) {
                setTrackProgress(audioRef.current.currentTime);
                // trackProgress = audioRef.current.currentTime;
                // dispatch(setCurrentSong({ ...currentSong, trackProgress: trackProgress }));
                audioRef.current.duration && setDuration(audioRef.current.duration);
            } else {
                setTrackProgress(0);
                // trackProgress = 0;
                // dispatch(setCurrentSong({ ...currentSong, trackProgress: trackProgress }));
            }
        }, [1000]);
    };

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

    useEffect(() => {
        if (currentSong.song !== null && audioRef !== null) {
            if (currentSong.action === "play") {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentSong]);

    useEffect(() => {
        currentSong.action === "play" && startTimer();
    });

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
        // trackProgress = audioRef.current.currentTime;
        // dispatch(setCurrentSong({ ...currentSong, trackProgress: trackProgress }));
    };

    const handleActions = () => {
        currentSong.action === "play"
            ? dispatch(setCurrentSong({ ...currentSong, action: "pause" }))
            : dispatch(setCurrentSong({ ...currentSong, action: "play" }));
    };

    const previousSongButton = () => {
        console.log("Previous song");
    };

    const nextSongButton = () => {
        console.log("Next song");
        console.log(intervalRef);
    };

    const likeButton = () => {
        setLiked(prevLiked => !prevLiked);
    };

    const handleChangeVolume = (e) => {
        const newVolume = parseInt(e.target.value);
        // setVolume(newVolume);
        dispatch(setCurrentSong({ ...currentSong, volume: newVolume }));
        audioRef.current.volume = newVolume / 100;
        if (newVolume === 0) {
            setMute(true);
        } else {
            setMute(false);
        }
    }

    const handleAudioRef = (ref) => {
        dispatch(setAudioRef(ref));
    };

    return (
        <div className="playbar-component">
            {musicCover}
            {/* <img
                className="playbar-musicCover"
                src={SongCover}
                alt="Album cover"
            /> */}
            <div>
                <div className="playbar-title-container">
                    <div className="playbar-title">
                        {Songtitle.length > 13 ?
                            <h3 className="playbar-overflow"> {Songtitle}</h3>
                            :
                            <h3 className="playbar-non-overflow"> {Songtitle}</h3>
                        }
                    </div>
                    <div className="playbar-subtitle">
                        {Songsubtitle.length > 13 ?
                            <p className="playbar-overflow"> {Songsubtitle}</p>
                            :
                            <p className="playbar-non-overflow"> {Songsubtitle}</p>
                        }
                    </div>
                </div>
            </div>
            <div>
                {!liked ? (
                    <button className="playbar-likeButtom" onClick={likeButton}>
                        <FaHeart style={{ color: '#1db954', fontSize: "1.8em", background: "none" }} />
                    </button>
                ) : (
                    <button className="playbar-likeButtom" onClick={likeButton}>
                        <FaRegHeart style={{ color: '#625e5e', fontSize: "1.8em", background: "none" }} />
                    </button>
                )}
            </div>
            <div className="playbar-playButton_group">
                <button className="playbar-playButton" onClick={previousSongButton}>
                    <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {currentSong.action === "pause" ? (
                    // <button className="playbar-playButton" onClick={playPauseButton}>
                    <button className="playbar-playButton" onClick={handleActions}>
                        <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    // <button className="playbar-playButton" onClick={playPauseButton}>
                    <button className="playbar-playButton" onClick={handleActions}>
                        <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}
                <button className="playbar-playButton" onClick={nextSongButton}>
                    <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>

            <div className="playbar-timeContainer">
                <div className="playbar-time">
                    <>
                        {/* {currTime.min}:{currTime.sec} */}
                        <p>{Math.floor(trackProgress / 60)}:{Math.floor(trackProgress % 60)}</p>
                    </>
                    <input
                        type="range"
                        value={trackProgress}
                        step="1"
                        min="0"
                        onChange={(e) => onScrub(e.target.value)}
                        max={duration ? duration : 0}
                        className="playbar-timeline"
                        defaultValue="30"
                        color="secondary"

                    />
                    <audio src={currentSong.song.song} ref={audioRef} ></audio>
                    {/* <audio src={currentSong.song.song} ref={handleAudioRef} ></audio> */}
                    <>
                        <p>{Math.floor(duration / 60)}:{Math.floor(duration % 60)}</p>
                    </>
                </div>
            </div>
            <div className="playBar-volume-group">
                {!mute ? (
                    <div className="playBar-setVolume">
                        <IoMdVolumeHigh style={{ color: '#1db954', fontSize: '1.5em', background: 'none' }} />
                    </div>
                ) : (
                    <div className="playBar-setVolume">
                        <IoMdVolumeOff style={{ color: '#1db954', fontSize: '1.5em', background: 'none' }} />
                    </div>
                )}
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="30"
                    className="playBar-volumeSlider"
                    value={mute ? 0 : volume}
                    onChange={handleChangeVolume}
                />
            </div>

        </div>
    );
};

export default AudioPlayer;