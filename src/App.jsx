import './App.css';
import { useState, useEffect } from 'react';

//functions
import { getTest } from './functions/test';


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

export default App;
