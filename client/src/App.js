import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './styles/App.css';

function App() {

  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState();
  const [loginLogoutButton, setLoginLogoutButton] = useState();
  const [createBlogButton, setCreateBlogButton] = useState();
  const adminButtons = useRef();

  // Get all blogs
  useEffect(() => {

    // Check if there is a token in local storage
    const token = localStorage.getItem("token");

    // If there is set admin functionality
    if (token) {
      setLoginLogoutButton(
        <button onClick={logout}>Logout</button>
      )
      setCreateBlogButton(
        <a href="/posts">
          <button>Create Blog</button>
        </a>
      )
      adminButtons.current = <div className="admin-buttons">
        <button onClick={editPost}>Edit</button>
        <button onClick={deletePost}>Delte</button>
      </div>
    }
    else setLoginLogoutButton(
      <a href='/login'>
        <button>Admin Login</button>
      </a>
    );

    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(
          data.map(blog => {
            const href = `/posts/${blog._id}`;
            return (
                <div className="home-individualBlog" key={blog._id} blogid={blog._id}>
                  {adminButtons.current}
                    <a href={href}>
                        <p>{blog.title}</p>
                        <p id="individualBlog-text">{blog.text}</p>
                        <p>{formatDate(blog.timestamp)}</p>
                        <p>{blog.comments.length} Comments</p>
                    </a>
                </div>
            )
          }))
      });
  }, []);

  // Formats timestamp into MM/DD/YYYY
  const formatDate = (timestamp) => {

    // TODO: Maybe send this function as props so there is less code reuse
    // TODO: Maybe add the hours and minutes to get the specific time of the comment

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

  // Removes token from local storage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    window.location.reload();
  }

  const deletePost = (e) => {

    const postId = e.target.parentElement.getAttribute('blogid');
    console.log(postId);

    fetch(`http://localhost:8000/posts/${postId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    })
    .then(window.location.reload())

  }

  const editPost = (e) => {
    const selectedPost = e.target.parentElement.parentElement;
    const postId = selectedPost.getAttribute('blogid');

    // Navigate to update route
    navigate(`/posts/${postId}/update`);
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>Blog Home Page</h1>
      </header>

      <div className='navigation'>
          {createBlogButton}
          <a href='/protected'>
            <button>Protected</button>
          </a>
          {loginLogoutButton}
      </div>

      <div className="home-content">
        {allBlogs}
      </div>

    </div>
  );
}

export default App;
