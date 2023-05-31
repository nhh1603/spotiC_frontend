import './App.css';
import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Auth from "./pages/Auth";

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
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
