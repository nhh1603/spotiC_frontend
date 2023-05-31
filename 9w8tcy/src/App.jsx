import "./styles.css";
import "./home_icon.css";
import { useState } from "react";

function HomeSong({
  songImgUrl,
  songName,
  artistUrl,
  artistName
}: {
  songImgUrl: string;
  songName: string;
  artistUrl: string;
  artistName: string;
}) {
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
        <a className="home_song_artist_name" href={artistUrl}>
          {artistName}
        </a>
      </div>
    </div>
  );
}

function HomeArtist({
  artistImgUrl,
  artistUrl,
  artistGenre,
  artistName
}: {
  artistImgUrl: string;
  artistGenre: string;
  artistName: string;
  artistUrl: string;
}) {
  function clickedButton() {
    console.log("CLICKED ARTIST");
  }

  return (
    <div className="home_artist">
      <img
        className="home_artist_img"
        src={artistImgUrl}
        alt=""
        onClick={clickedButton}
      />
      <div>
        <a className="home_artist_name" href={artistUrl}>
          {artistName}
        </a>
        <br />
        <span className="home_artist_genre">{artistGenre}</span>
      </div>
    </div>
  );
}

const HomeIcon = () => {
  return (
    <div className="home-icon">
      <div className="roof"></div>
      <div className="body"></div>
    </div>
  );
};

{
  /*function HomeButton() {
  function clickedButton() {
    console.log("CLICKED HOME ICON");
  }

  return (
    <div className="sidebar_home_icon">
      <a href="">
        <HomeIcon />
        <div className="home_word">Home</div>
      </a>
    </div>
  );
  */
}

const topSongData = [
  {
    songImgUrl:
      "	https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    songName: "Ocean Eyes",
    artistUrl: "",
    artistName: "Billie Eilish"
  },
  {
    songImgUrl:
      " https://i.scdn.co/image/ab67616d00004851fc3ff54493fcc890bcaa036c",
    songName: "Unholy",
    artistUrl: "",
    artistName: "Sam Smith"
  },
  {
    songImgUrl:
      " https://i.scdn.co/image/ab67616d0000485134362676667a4322838ccc97",
    songName: "One Right Now",
    artistUrl: "",
    artistName: "Post Malone"
  },
  {
    songImgUrl:
      " https://i.scdn.co/image/ab67616d00004851fc3ff54493fcc890bcaa036c",
    songName: "Unholy",
    artistUrl: "",
    artistName: "Sam Smith"
  }
];

const topArtistData = [
  {
    artistImgUrl:
      "https://i.scdn.co/image/ab67616100005174e707b87e3f65997f6c09bfff",
    artistName: "Travis Scott",
    artistUrl: "",
    artistGenre: "Hip-Hop/Rap"
  },
  {
    artistImgUrl:
      " https://i.scdn.co/image/ab67616100005174d8b9980db67272cb4d2c3daf",
    artistName: "Billie Eilish",
    artistUrl: "",
    artistGenre: "Pop"
  },
  {
    artistImgUrl:
      "https://i.scdn.co/image/ab67616100005174597f9edd2cd1a892d4412b09",
    artistName: "Pop Smoke",
    artistUrl: "",
    artistGenre: "Hip-Hop/Rap"
  },
  {
    artistImgUrl:
      "https://i.scdn.co/image/ab6761610000517401b9b4ec2a05d0805428acfa",
    artistName: "The Weeknd",
    artistUrl: "",
    artistGenre: "R&B/Soul"
  },
  {
    artistImgUrl:
      "https://i.scdn.co/image/ab6761610000517430122c0d3ead72f96bb5ee93",
    artistName: "Lil Uzi Vert",
    artistUrl: "",
    artistGenre: "Hip-Hop/Rap"
  },
  {
    artistImgUrl:
      "https://i.scdn.co/image/ab676161000051746be070445b03e0b63147c2c1",
    artistName: "Post Malone",
    artistUrl: "",
    artistGenre: "Hip-Hop/Rap"
  }
];

export default function Home() {
  return (
    <>
      <div className="container">
        {/*<div className="sidebar">
          <HomeButton />
  </div>*/}

        <div>
          <h1 className="home_title">Top songs</h1>
          <div className="home_song_container">
            {topSongData.map((item, index) => (
              <HomeSong
                key={index}
                songImgUrl={item.songImgUrl}
                songName={item.songName}
                artistName={item.artistName}
                artistUrl={item.artistUrl}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h1 className="home_title">Top artists</h1>
        <div className="home_artist_container">
          {topArtistData.map((item, index) => (
            <HomeArtist
              key={index}
              artistImgUrl={item.artistImgUrl}
              artistName={item.artistName}
              artistGenre={item.artistGenre}
              artistUrl={item.artistUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
