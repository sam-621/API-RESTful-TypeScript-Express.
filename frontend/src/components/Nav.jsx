import React from 'react';
import '../assets/styles/nav.css'
import { Link } from 'react-router-dom';
import user from '../assets/img/user.svg';

const Nav = ({ isLogged }) => {
    return(
        <nav>
            <div>
                <Link to="/">
                    <h1 className="ProjectName">Explore<strong className="Space">Space</strong></h1>
                </Link>
            </div>
            <div className="Links">
                <Link to="/" className="Trips-link">
                    Trips
                </Link> 
                <Link to={isLogged ? '/take' : '/login'} className="Filled">
                    {isLogged ? 'Take a trips' : 'Log in'}
                </Link>
                {
                    isLogged ? 
                    <Link to>
                        <img src={user} alt="An user icon"/>
                    </Link>
                    :
                    null  
                }
            </div>
        </nav>
    )
}

export default Nav;

// return <Redirect to={
//     {
//       pathname: '/unauthorized',
//       state: {
//         from: props.location
//       }
//     }