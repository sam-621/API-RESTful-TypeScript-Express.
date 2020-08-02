import React, {useState} from 'react';
import Axios from 'axios';
import '../assets/styles/register.css'
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import success from '../assets/img/success.svg';
import errorImage from '../assets/img/error.svg';

const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loadded, setLoadded] = useState(true);
    const [frontendErrorMessage, setFrontendErrorMessage] = useState('Please fill in the information below');
    const [frontendError, setFrontendError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    function reset() {
        setLoadded(false);
        setServerError('');
        document.getElementById('confirmPassword').style.border = '1px solid #C4C4C4';
        document.getElementById('password').style.border = '1px solid #C4C4C4';
        setFrontendError(false);
        setFrontendErrorMessage('Please fill in the information below')
    }

    async function handleSubmit(e) {
        e.preventDefault();
        reset();
        if(password !== confirmPassword) {
            document.getElementById('confirmPassword').style.border = '1px solid red';
            setLoadded(true);
            setFrontendError(true)
            setFrontendErrorMessage('Password does not match')
            return
        }

        if(password.length < 6) {
            document.getElementById('password').style.border = '1px solid red';
            setLoadded(true);
            setFrontendError(true)
            setFrontendErrorMessage('write at least 6 characters');
            return
        }
        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password
        }
        const APIresponse = await Axios.post('http://localhost:8000/explorespace/api/register', newUser);

        if(APIresponse.data.message === 'Wrong data schema') {
            document.getElementById('myModal').style.display = "block";
            setLoadded(true);
            setServerError(true);
            setServerErrorMessage('Wrong data schema')
            return
        }

        if(APIresponse.data.error) {
            document.getElementById('myModal').style.display = "block";
            setLoadded(true);
            setServerError(true);
            setServerErrorMessage('Internal server Error');
            return
        }
        // setTimeout(() => setLoadded(true), 1000);
        // setTimeout(() => {
        //     document.getElementById('myModal').style.display = "block";
        // }, 1000)
        setLoadded(true);
        document.getElementById('myModal').style.display = "block";
    }

    function hide() {
        document.getElementById('myModal').style.display = "none"
    }
    return(
        <>
            <Nav />
            <div className="Register">
                {!loadded ? <div className="loader-container"><div class="loader"></div></div> : <h1>Register</h1>}
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="closeModal-container">
                            <button className="closeModal" onClick={hide}>X</button>
                        </div>
                        {serverError ? 
                            <>
                                <img src={errorImage} width="150px" height="150px" alt=""/>
                                <p>{serverErrorMessage}</p>
                            </>
                            :
                            <>
                                <img src={success} width="150px" height="150px" alt=""/>
                                <p>You have created your account <strong className="success-register">successfuly</strong></p>
                            </>
                        }
                        <Link className="toLogin" to="/login">Go to log in</Link>
                    </div>
                </div>
                <p style={frontendError ? {color: 'red'} : null}>{frontendErrorMessage}</p>
            </div>
            <form className="Register-form" onSubmit={handleSubmit}>
                <input
                    required 
                    type="text" 
                    name="" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="First name"/>
                <input
                    required 
                    type="text" 
                    name="" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Last name"/>
                <input
                    required 
                    type="text" 
                    name="" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"/>
                <input
                    required 
                    type="text" 
                    name="" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"/>
                <input
                    required 
                    type="text" 
                    id="password"
                    name="" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"/>
                <input
                    required 
                    type="text" 
                    id="confirmPassword"
                    name="" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Re-enter password"/>
                <input type="submit" value="Create my account"/>
            </form>
        </>
    );
}

export default Register;