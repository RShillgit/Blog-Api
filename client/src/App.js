import React, { useState, useEffect } from "react";
import './styles/App.css';

function App() {

  const [blogs, setBlogs] = useState("");
  const [allBlogs, setAllBlogs] = useState();

  // Get all blogs
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(
          data.map(blog => {
            const href = `/posts/${blog._id}`;
            return (
                <div className="home-individualBlog" key={blog._id} blogid={blog._id}>
                    <a href={href}>
                        <p>{blog.title}</p>
                        <p id="individualBlog-text">{blog.text}</p>
                        <p>{formatDate(blog.timestamp)}</p>
                    </a>
                </div>
            )
          }))
      });
  }, []);

  // Formats timestamp into MM/DD/YYYY
  const formatDate = (timestamp) => {

    const blogDate = new Date(timestamp);

    // Day
    let day = blogDate.getDate();

    // Month
    let month = blogDate.getMonth() + 1;

    // Year
    let year = blogDate.getFullYear();

    // 2 digit months and days
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = `0${month}`;
    }

    let formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

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
          <a href='/posts'>
            <button>Blogs</button>
          </a>
      </div>

      <div className="home-content">
        {allBlogs}
      </div>

    </div>
  );
}

export default App;
