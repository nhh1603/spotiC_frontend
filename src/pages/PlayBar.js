import "../styles/PlayBar.css";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import song from "./Exile.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import Slider from '@material-ui/core/Slider';
import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from 'react-icons/io';


const Songtitle = "title"
const Songsubtitle = "subtitle blablablabal"
const musicCover = (
  <img
    className="playbar-musicCover"
    src="https://picsum.photos/200/200"
    alt="Album cover"
  />
);

const PlayBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [mute, setMute] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();
  const [volume, setVolume] = useState(30);
  const [play, { pause, duration, sound }] = useSound(song);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [isPlaying, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek());
        const min = Math.floor(sound.seek() / 60);
        const sec = Math.floor(sound.seek() % 60);
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.volume(volume / 100);
    }
  }, [volume, sound]);

  const playPauseButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  const previousSongButton = () => {
    console.log("Previous song");
  };

  const nextSongButton = () => {
    console.log("Next song");
  };

  const likeButton = () => {
    setLiked(prevLiked => !prevLiked);
  };

  const setVolumeState = () => {
    setMute(!mute);
    if (mute) {
      setVolume(0);
    }
  };

  return (
    <div className="playbar-component">
      {musicCover}
      <div>
        <div className="playbar-title-container">
          <div className="playbar-title">
            {Songtitle.length > 13?
              <h3 className = "playbar-overflow"> {Songtitle}</h3> 
              :
              <h3 className="playbar-non-overflow"> {Songtitle}</h3>
            }
          </div>
          <div className="playbar-subtitle">
            {Songsubtitle.length > 13?
              <p className = "playbar-overflow"> {Songsubtitle}</p> 
              :
              <p className="playbar-non-overflow"> {Songsubtitle}</p>
            }
          {/* <p className="subTitle">Taylor Swift / Bon Iver</p> */}
          </div>
        </div>
      </div>
      <div>
        {!liked ? (
            <button className="playbar-likeButtom" onClick={likeButton}>
              <FaHeart style={{color: '#1db954',fontSize: "1.8em",background:"none"}}/>
            </button>
          ) : (
            <button className="playbar-likeButtom" onClick={likeButton}>
              <FaRegHeart style={{color:'#625e5e',fontSize: "1.8em",background: "none"}}/>
            </button>
          )}
      </div>
      <div className="playbar-playButton_group">
        <button className="playbar-playButton"onClick={previousSongButton}>
          <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playbar-playButton" onClick={playPauseButton}>
            <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playbar-playButton" onClick={playPauseButton}>
            <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playbar-playButton"onClick={nextSongButton}>
          <IconContext.Provider value={{ size: "2.7em", color: "#1db954" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>

      <div className="playbar-timeContainer">
        <div className="playbar-time">
          <>
            {currTime.min}:{currTime.sec}
          </>
            <input
              type="range"
              min="0"
              max={duration / 1000}
              defaultValue="30"
              value={seconds}
              className="playbar-timeline"
              color="secondary"
              onChange={(e) => {
                sound.seek(e.target.value);
              }}
            />
          <>
            {time.min}:{time.sec}
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
          onChange={(e) => {
            const newVolume = parseInt(e.target.value);
            setVolume(newVolume);
            if (newVolume === 0) {
              setMute(true);
            } else {
              setMute(false);
            }
          }}
        />
      </div>

    </div>
  );
}

export default PlayBar;
