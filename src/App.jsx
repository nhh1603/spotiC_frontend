import './App.css';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import AuthPage from "./pages/AuthPage";
import LandingPage from './pages/LandingPage';
// import Homepage from './pages/Homepage'

//functions
import { getTest } from './functions/test';

/*
function App() {

    const [data, setData] = useState("Hello World!");

    useEffect(() => {
        getTest()
            .then(data => setData(data.message))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    {data}
                </p>
            </header>
        </div>
    );
}
*/

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/auth" element={<AuthPage />} />
                
                {/* <Route path="/homepage" element={<Homepage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App;
