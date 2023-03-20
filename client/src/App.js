import React, { useState, useEffect } from "react";
import './styles/App.css';

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
        <h1>{message}</h1>
      </header>

      <div className='navigation'>
          <a href='/login'>
            <button>Login</button>
          </a>
          <a href='/protected'>
            <button>Protected</button>
          </a>
      </div>
    </div>
  );
}

export default App;
