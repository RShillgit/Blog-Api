import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

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
        <div className="Login">

            <header>
                <h1>Login Page</h1>
            </header>
            
            <div className="login-form">
                <form onSubmit={handleSubmit} id='admin-login-form'>
                    <label>
                        Username <input type='text' name="username" onChange={usernameChange}></input>
                    </label>
                    <label>
                        Password <input type='password' name="password" onChange={passwordChange}></input>
                    </label>

                </form>
                <div className="form-buttons">
                    <a href="/"><button>Cancel</button></a>
                    <button form="admin-login-form">Submit</button>
                </div>
            </div>

            {message}

        </div>
    )
}

export default Login;