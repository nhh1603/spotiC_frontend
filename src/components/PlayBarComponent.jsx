import "../styles/PlayBarComponent.css";
import { useEffect, useState } from "react";
import useSound from "use-sound";
// import song from "../assets/songs/Exile.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from "axios";

const Songtitle = "title"
const Songsubtitle = "subtitle blablablabal"
const musicCover = (
  <img
    className="playbar-musicCover"
    src="https://picsum.photos/200/200"
    alt="Album cover"
  />
);
// const song = "gs://spotic-8108d.appspot.com/Adele/Set Fire To The Rain - Adele.mp3"
let song;
await axios.get(process.env.REACT_APP_API_URL + "/song/6482c308b5a80e994767c58a")
    .then((response) => {
        console.log(response.data.data.song);
        song = response.data.data.song;
    })


// const song="https://firebasestorage.googleapis.com/v0/b/spotic-8108d.appspot.com/o/Songs%2FAdore%20You%20-%20Harry%20Styles.mp3?alt=media&token=040239c5-a4f7-4efe-874e-0b02dda6ec30"

const PlayBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();

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
    console.log("Previous song")
  };

  const nextSongButton = () => {
    console.log("Next song")
  };


  const likeButton = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
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
              <FaHeart style={{color: '#625e5e',fontSize: "1.8em",background:"none"}}/>
            </button>
          ) : (
            <button className="playbar-likeButtom" onClick={likeButton}>
              <FaRegHeart style={{color:'#625e5e',fontSize: "1.8em",background: "none"}}/>
            </button>
          )}
      </div>
      <div className="playbar-playButton-group">
        <button className="playbar-playButton"onClick={previousSongButton}>
          <IconContext.Provider value={{ size: "2.8em", color: "#27AE60" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playbar-playButton" onClick={playPauseButton}>
            <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playbar-playButton" onClick={playPauseButton}>
            <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playbar-playButton"onClick={nextSongButton}>
          <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>

      <div className="playbar-timeContainer">
        <div className="playbar-time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
            <input
              type="range"
              min="0"
              max={duration / 1000}
              defaultValue="0"
              value={seconds}
              className="playbar-timeline"
              onChange={(e) => {
                sound.seek(e.target.value);
              }}
            />
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlayBar;