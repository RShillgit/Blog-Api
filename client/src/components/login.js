import React, { useState, useEffect } from "react";

function Login() {

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
            setMessage(
                <div >
                    <p>{data.token}</p>
                    <p>{data.expiresIn}</p>
                    <p>{data.error_message}</p>
                </div>
            );
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username <input type='text' name="username" onChange={usernameChange}></input>
                </label>
                <label>
                    Password <input type='password' name="password" onChange={passwordChange}></input>
                </label>
                <button>Submit</button>
            </form>

            {message}

        </div>
    )
}

export default Login;