import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/user/apiCalls";
import { Fragment, useEffect } from 'react';

//pages
// import AuthPage from "./pages/AuthPage";
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ArtistPage from './pages/ArtistPage';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import SearchPage from './pages/SearchPage';
import PlayListPage from './pages/PlayListPage';

//components
// import PlayBarComponent from './components/PlayBarComponent';
import PlayBarComponent from './components/PlayBarComponent_new';
import SideBar from './components/Side_bar';

//functions

function App() {

    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector(state => state.auth);
    const { currentSong } = useSelector(state => state.audioPlayer);

    useEffect(() => {
        let token = null;
        const root = JSON.parse(window.localStorage.getItem("persist:root"));

        if (root) {
            const { auth } = root;
            const { user } = JSON.parse(auth);
            if (user) token = user.token;
        }

        if (user && token) {
            getUser(user._id, dispatch);
        }
    }, [dispatch, user]);

    return (
        <Fragment>
            {user &&
                location.pathname !== "/" &&
                location.pathname !== "/signin" &&
                location.pathname !== "/signup" &&
                location.pathname !== "/not-found" && (
                    <Fragment>
                        {currentSong && <PlayBarComponent />}
                        {/* <SideBar /> */}
                        {/* <PlayBarComponent /> */}
                    </Fragment>
                )}
        
            <Routes>
                <Route path="/" element={<LandingPage />} />

                {user && <Route path="/signin" element={<Navigate to="/home" />} />}
                {user && <Route path="/signup" element={<Navigate to="/home" />} />}

                <Route path="/signin" element={<SignInPage />} />

                <Route path="/signup" element={<SignUpPage />} />

                {/* <Route path="/play" element={<PlayBar />} /> */}

                <Route path="/home" element={<HomePage />} />

                <Route path="/playlist" element={<PlayListPage />} />

                <Route path="/search" element={<SearchPage />} />

                <Route path="/artist" element={<ArtistPage />} />

                <Route path="/album" element={<AlbumPage />} />

                <Route path="/not-found" element={<NotFoundPage />} />

                <Route path="*" element={<Navigate to="/not-found" />} />
                
            </Routes>
        </Fragment>
    )
}

export default App;
