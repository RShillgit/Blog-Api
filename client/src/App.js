import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  const [message, setMessage] = useState("");


  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
