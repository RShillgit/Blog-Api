import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import blogApiDemo from '../images/blog-api-demo.mp4';

function Login(props) {

    const token = useRef();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Before mount check for token
    useLayoutEffect(() => {
        const idToken = localStorage.getItem("token");
        token.current = idToken;
    }, [])

    useEffect(() => {

        // If there is a token, redirect to home page
        if (token.current) {
            navigate('/');
        }

        // Else render login page
        else {
            const loginPage = document.querySelector('.login-page');
            loginPage.style.display = 'block';
        }

    }, [])

    // Username input change
    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    // Password input change
    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    // Login form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const login_information = {username, password};

        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login_information)
        })
        .then((res) => res.json())
        .then((data) => {

            // If the user info is correct
            if (data.token && data.expiresIn) {

                // Save token and expiration date in local storage
                const expires = moment().add(data.expiresIn);
                localStorage.setItem('token', data.token);
                localStorage.setItem('expires', JSON.stringify(expires.valueOf()));

                // Redirect to home page
                navigate('/');
            }

            // Else, render error message
            else {
                setMessage(
                    <div className="error-message">
                        <p>{data.error_message}</p>
                    </div>
                );
            }
        })
    }

    return (
        <div className="login-page">

            {props.navbar}

            <div className="non-navbar-container">
                <header>
                    <h1>Admin Login</h1>
                </header>
                
                <div className="login-form">
                    <form onSubmit={handleSubmit} id='admin-login-form'>
                        <label>
                            Username <input type='text' name="username" onChange={usernameChange} required={true}></input>
                        </label>
                        <label>
                            Password <input type='password' name="password" onChange={passwordChange} required={true}></input>
                        </label>

                    </form>
                    <div className="form-buttons">
                        <a href="/"><button>Cancel</button></a>
                        <button form="admin-login-form">Submit</button>
                    </div>
                    {message}
                    <div className="admin-demo">
                        <p className="admin-demo-text">
                            Only I, the creator, knows this login information. The admin can delete comments,
                            and create, edit, and delete blog posts. Watch the video below if you are interested.
                        </p>
                        <video autoPlay loop muted id='adminDemoVideo'>
                            <source src={blogApiDemo} type="video/mp4" />
                            <source src="movie.ogg" type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            {props.footer}
        </div>
    )
}

export default Login;