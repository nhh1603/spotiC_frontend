import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux";

//pages
import AuthPage from "./pages/AuthPage";
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import SignUpPage from './pages/SignUpPage';

//functions

function App() {

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/auth" element={<AuthPage />} />

            <Route path="/signup" element={<SignUpPage />} />

            <Route path="/not-found" element={<NotFoundPage />} />

            <Route path="*" element={<Navigate to="/not-found" />} />
            
        </Routes>
    )
}

export default App;
