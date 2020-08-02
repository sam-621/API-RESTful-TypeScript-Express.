import React, {useState} from 'react';
import Axios from 'axios';
import '../assets/styles/register.css'
import Nav from '../components/Nav';
import success from '../assets/img/success.svg';
import errorImage from '../assets/img/error.svg';
import Modal from '../components/Modal';

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
    const [successMessage, setSuccessMessage] = useState('');

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

        setLoadded(true);
        setSuccessMessage(APIresponse.data.message);
        document.getElementById('myModal').style.display = "block";
    }

    function hideModal() {
        document.getElementById('myModal').style.display = "none"
    }
    return(
        <>
            <Nav />
            <div className="Register">
                {!loadded ? <div className="loader-container"><div className="loader"></div></div> : <h1>Register</h1>}
                <Modal
                    hideModal={hideModal}
                    errorImage={errorImage}
                    serverError={serverError}
                    serverErrorMessage={serverErrorMessage}
                    successImage={success}
                    successMessage={successMessage}
                />

                <p style={frontendError ? {color: 'red'} : null}>{frontendErrorMessage}</p>
            </div>
            <form className="Register-form" onSubmit={handleSubmit}>
                <input
                    required 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="First name"/>
                <input
                    required 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Last name"/>
                <input
                    required 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"/>
                <input
                    required 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"/>
                <input
                    required 
                    type="password" 
                    id="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"/>
                <input
                    required 
                    type="password" 
                    id="confirmPassword"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Re-enter password"/>
                <input type="submit" value="Create my account"/>
            </form>
        </>
    );
}

export default Register;