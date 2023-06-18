import React, { useEffect, useState } from "react";

function Album({ albumImgUrl,albumId, albumName, albumYear }) {
  function clickedButton() {
    console.log("CLICKED ALBUM");
  }

  return (
    <a href={"/album?albumId="+albumId}>
      <div className="artist_album" onClick={clickedButton}>
        <img className="artist_album_img" src={albumImgUrl} alt="" />
        <div className="artist_album_info">
          <span className="artist_album_name" >
            {albumName.length > 13 ? albumName.slice(0, 13) + "..." : albumName}
          </span>
          <br />
          <span className="artist_album_year">{albumYear}</span>
        </div>
      </div>
    </a>
  );
}

export default Album;
