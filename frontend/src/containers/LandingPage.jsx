import React from 'react';
import '../assets/styles/landingPage.css'
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
        <>
            <Nav/>
            <header className="LandingPage">
                <h1>Explore space by hot air balloons</h1>
                <hr/>
                <p>
                    Fly and explore the spaceot only five centuries, but also the leap into electronic typesetting, 
                    remaining essentially unchanged. It was popularised in th 
                </p>
                <Link to="/logIn" className="Landing-btn">
                    Start to explore
                </Link>
            </header>
        </>
    )
}

export default LandingPage;