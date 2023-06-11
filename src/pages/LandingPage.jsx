import React from 'react';
import '../styles/LandingPage.css'; // Import the CSS file for the component

function LandingPage () {
    return (
        <div className="animated-background">
            <div className="landing-container">
                <h1 id="landing-h1">SpotiC</h1>
                <h2 id="landing-h2">Where you can listen to your favorite music, free and without ads</h2>
                <br /> <br /> 
                <span><a href="/signin"></a></span>
            </div>
        </div>
    );
};

export default LandingPage;