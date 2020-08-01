import React from 'react';
import '../assets/styles/register.css'
import Nav from '../components/Nav';

const Register = () => {
    // if(!isLoaded) {
    //     return <h1>Loading..</h1>
    // }
    return(
        <>
            <Nav />
            <div className="Register">
                <h1>Register</h1>
                <p>Please fill in the information below</p>
            </div>
            <form className="Register-form">
                <input type="text" name="" placeholder="First name"/>
                <input type="text" name="" placeholder="Last name"/>
                <input type="text" name="" placeholder="Email"/>
                <input type="text" name="" placeholder="Username"/>
                <input type="text" name="" placeholder="Password"/>
                <input type="text" name="" placeholder="Re-enter password"/>
                <input type="submit" value="Create my account"/>
            </form>
        </>
    );
}

export default Register;