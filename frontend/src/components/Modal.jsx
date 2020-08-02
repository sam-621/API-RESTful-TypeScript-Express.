import React from 'react';
import { Link } from 'react-router-dom'
import '../assets/styles/modal.css'

const Modal = ({ hideModal, serverError, errorImage, serverErrorMessage, successImage, successMessage }) => {
    return(
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="closeModal-container">
                    <button className="closeModal" onClick={hideModal}>X</button>
                </div>
                {serverError ? 
                    <>
                        <img src={errorImage} width="150px" height="150px" alt=""/>
                        <p>{serverErrorMessage}</p>
                    </>
                    :
                    <>
                        <img src={successImage} width="150px" height="150px" alt=""/>
                        <p>{successMessage}</p>
                    </>
                }
                {serverError ? null : <Link className="toLogin" to="/login">Go to log in</Link>}
            </div>
        </div>
    );
}

export default Modal;