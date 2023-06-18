import React, { useEffect, useState } from "react";
function Artist({artistId, artistImgUrl, artistGenre, artistName }) {
  function clickedButton() {
    console.log("CLICKED ARTIST");
  }

  return (
  <a href={"/artist?artistId="+artistId}>
    <div className="home_artist">
      <img
        className="home_artist_img"
        src={artistImgUrl}
        alt=""
        onClick={clickedButton}
      />
      <div>
        <span className="home_artist_name"> 
          {artistName}
        </span>
        <br />
        <span className="home_artist_genre">{artistGenre}</span>
      </div>
    </div>
  </a>
  );
}

export default Artist;