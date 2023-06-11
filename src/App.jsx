import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux";

//pages
import AuthPage from "./pages/AuthPage";
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ArtistPage from "./pages/ArtistPage";
import HomePage from "./pages/HomePage";
import AlbumPage from "./pages/AlbumPage";

//functions

function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/auth" element={<AuthPage />} />

            <Route path="/signin" element={<SignInPage />} />

            <Route path="/signup" element={<SignUpPage />} />

            <Route path="/not-found" element={<NotFoundPage />} />

            <Route path="*" element={<Navigate to="/not-found" />} />
            
            <Route path="/home" element={<HomePage />} />

            <Route path="/artist" element={<ArtistPage />} />

            <Route path="/album" element={<AlbumPage />} />
            
        </Routes>
    )
}

export default App;
