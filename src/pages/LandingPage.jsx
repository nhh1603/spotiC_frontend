import React from 'react';
import '../styles/LandingPage.css'; // Import the CSS file for the component

function LandingPage () {
    return (
        <div className="animated-background">
            <div className="container">
                <h1>SpotiC</h1>
                <h2>Where you can listen to your favorite music, free and without ads</h2>
                <br /> <br /> 
                <span><a href="/auth"></a></span>
            </div>
        </div>
    );
};

export default LandingPage;