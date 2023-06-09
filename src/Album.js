import "./album_styles.css";
import React, { useEffect, useState } from "react";

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

function MoreAlbum({ albumImgUrl, albumUrl, albumName, albumYear }) {
  function clickedButton() {
    console.log("CLICKED ALBUM");
  }

  return (
    <div className="album_other_album" onClick={clickedButton}>
      <img className="album_other_album_img" src={albumImgUrl} alt="" />
      <div className="album_other_album_info">
        <a className="album_other_album_name" href={albumUrl}>
          {albumName.length > 18 ? albumName.slice(0, 18) + "..." : albumName}
        </a>
        <br />
        <span className="album_other_album_year">{albumYear}</span>
      </div>
    </div>
  );
}

const albumSongData = [
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "Ocean Eyes",
    songHits: 1345543356,
    songLength: "3:25"
  },
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "watch",
    songHits: 12342235,
    songLength: "3:37"
  },
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "bellyache",
    songHits: 223469008,
    songLength: "4:05"
  },
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "hostage",
    songHits: 4322113453,
    songLength: "3:57"
  },
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "my boy",
    songHits: 964838294,
    songLength: "3:15"
  },
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "COPYCAT",
    songHits: 596843990000,
    songLength: "2:25"
  },
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "idontwannabeyouanymore",
    songHits: 33422285220,
    songLength: "2:15"
  }
];

const otherAlbumData = [
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "dont smile at me dont fucking",
    albumUrl: "",
    albumYear: "2019"
  },
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "Happier Than Ever",
    albumUrl: "",
    albumYear: "2020"
  },
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "Happier Than Ever",
    albumUrl: "",
    albumYear: "2020"
  },
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "Happier Than Ever",
    albumUrl: "",
    albumYear: "2020"
  },
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "Happier Than Ever",
    albumUrl: "",
    albumYear: "2020"
  },
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "Happier Than Ever",
    albumUrl: "",
    albumYear: "2020"
  },
  {
    albumImgUrl:
      " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    albumName: "Happier Than Ever",
    albumUrl: "",
    albumYear: "2020"
  }
];

const albumData = {
  albumImgUrl:
    " https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
  artistName: "Billie Eilish",
  albumName: "dont smile at me",
  albumYear: "2017",
  albumTotalSong: "9"
};

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
  return (
    <>
      <div>
        <div className="album_container">
          <AlbumHead
            albumImgUrl={albumData.albumImgUrl}
            albumName={albumData.albumName}
            artistName={albumData.artistName}
            albumYear={albumData.albumYear}
            albumTotalSong={albumData.albumTotalSong}
          />
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
          {albumSongData.map((item, index) => (
            <AlbumSong
              key={index}
              songName={item.songName}
              songHits={item.songHits}
              songLength={item.songLength}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="album_title">More Albums</h1>
        <div className="album_other_album_container">
          {otherAlbumData.map((item, index) => (
            <MoreAlbum
              key={index}
              albumImgUrl={item.albumImgUrl}
              albumName={item.albumName}
              albumYear={item.albumYear}
              albumUrl={item.albumUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
