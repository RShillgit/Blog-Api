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
        <h1>Blog Home Page</h1>
      </header>

      <div className='navigation'>
          <a href='/login'>
            <button>Admin Login</button>
          </a>
          <a href='/protected'>
            <button>Protected</button>
          </a>
      </div>

      <div className="home-content">
        <div className="home-individualBlog">
          <h3>BLOG TITLE 1</h3>
          <p>Lorem Ipsum BLAH BLAH BLAH</p>
          <p>Comments...</p>
        </div>

        <div className="home-individualBlog">
          <h3>BLOG TITLE 2</h3>
          <p>Lorem Ipsum BLAH BLAH BLAH</p>
          <p>Comments...</p>
        </div>

        <div className="home-individualBlog">
          <h3>BLOG TITLE 3</h3>
          <p>Lorem Ipsum BLAH BLAH BLAH</p>
          <p>Comments...</p>
        </div>
      </div>

    </div>
  );
}

export default App;
