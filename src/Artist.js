import "./artist_styles.css";
import React, { useEffect, useState } from "react";

function ArtistSong({ songImgUrl, songName, songHits, songLength }) {
  function clickedButton() {
    console.log("CLICKED SONG");
  }
  return (
    <div className="artist_song" onClick={clickedButton}>
      <img className="artist_song_img" src={songImgUrl} alt="" />
      <div className="artist_song_info">
        <div className="artist_song_name">
          <h4>{songName}</h4>
        </div>
        <div className="artist_song_hits">
          <h6>{songHits}</h6>
        </div>
        <div className="artist_song_length">
          <h6>{songLength}</h6>
        </div>
      </div>
    </div>
  );
}

function ArtistAlbum({ albumImgUrl, albumUrl, albumName, albumYear }) {
  function clickedButton() {
    console.log("CLICKED ALBUM");
  }

  return (
    <div className="artist_album" onClick={clickedButton}>
      <img className="artist_album_img" src={albumImgUrl} alt="" />
      <div className="artist_album_info">
        <a className="artist_album_name" href={albumUrl}>
          {albumName.length > 18 ? albumName.slice(0, 18) + "..." : albumName}
        </a>
        <br />
        <span className="artist_album_year">{albumYear}</span>
      </div>
    </div>
  );
}

const artistSongData = [
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

const artistAlbumData = [
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

const artistData = {
  artistBackgroundImgUrl:
    " https://i.scdn.co/image/ab676186000010169dfab1cdba3d588674fd8bcd",
  artistName: "Billie Eilish",
  artistGenre: "Pop"
};

function ArtistHead({ artistBackgroundImgUrl, artistName, artistGenre }) {
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

  const calculateOpacity = () => {
    const maxOpacityScroll = 200; // Adjust this value to change when the image starts to fade
    const opacity = Math.max(1 - scrollPosition / maxOpacityScroll, 0);
    return opacity;
  };

  function clickedButton() {
    console.log("CLICKED ARTIST");
  }
  return (
    <div className="artist">
      <img
        className="artist_background_img"
        src={artistBackgroundImgUrl}
        alt=""
        style={{
          transform: `translateY(-${scrollPosition * 0.5}px)`,
          opacity: calculateOpacity()
        }}
        onClick={clickedButton}
      />
      <div
        className="artist_info"
        style={{
          transform: `translateY(-${scrollPosition * 0.5}px)`
        }}
      >
        <h1 className="artist_name" onClick={clickedButton}>
          {artistName}
        </h1>
        <h1 className="artist_genre">{artistGenre}</h1>
      </div>
    </div>
  );
}

export default function Artist() {
  return (
    <>
      <div>
        <div className="artist_container">
          <ArtistHead
            artistBackgroundImgUrl={artistData.artistBackgroundImgUrl}
            artistName={artistData.artistName}
            artistGenre={artistData.artistGenre}
          />
        </div>
      </div>

      <div>
        <h1 className="artist_title">Top songs</h1>

        <div className="artist_song_header">
          <div className="artist_song_header_item">
            <div className="artist_song_header_title">TITLE</div>
            <div className="artist_song_header_hits">PLAYS</div>
            <div className="artist_song_header_length">LENGTH</div>
          </div>
        </div>

        <div className="artist_song_container">
          {artistSongData.map((item, index) => (
            <ArtistSong
              key={index}
              songImgUrl={item.songImgUrl}
              songName={item.songName}
              songHits={item.songHits}
              songLength={item.songLength}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="artist_title">Discography</h1>
        <div className="artist_album_container">
          {artistAlbumData.map((item, index) => (
            <ArtistAlbum
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
