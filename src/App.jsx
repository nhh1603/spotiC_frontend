import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import ArtistPage from "./pages/Artist";
import HomePage from "./pages/Home";
import AlbumPage from "./pages/Album";

//functions
import { getTest } from './functions/test';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/artist" element={<ArtistPage />} />

                <Route path="/album" element={<AlbumPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;
