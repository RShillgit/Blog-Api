import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './styles/App.css';
import editImg from './images/edit.png';
import deleteImg from './images/delete.png';
import commentImg from './images/comment.png';

function App(props) {

  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState();
  const adminButtons = useRef();

  // Get all blogs
  useEffect(() => {

    // Check if there is a token in local storage
    const token = localStorage.getItem("token");

    // If there is set admin functionality
    if (token) {
      adminButtons.current = <div className="admin-buttons">
        <img src={editImg} alt='Edit' onClick={editPost}></img>
        <img src={deleteImg} alt='Delete' onClick={deletePost}></img>
      </div>
    }

    fetch(`/`, { // ${props.serverURL}
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(
          data.map(blog => {
            const href = `/posts/${blog._id}`;
            return (
                <div className="home-individualBlog" key={blog._id} blogid={blog._id}>
                  {adminButtons.current}
                    <a href={href}>
                        <div className='individualBlog-title'>
                          <p>{blog.title}</p>
                        </div>
                        <p id="individualBlog-text">{blog.text}</p>
                        <div className='individualBlog-date'>
                          <p>{formatDate(blog.timestamp)}</p>
                        </div>
                        <p className="individualBlog-commentQuantity"><img src={commentImg} alt='Comments: '></img>{blog.comments.length}</p>                  
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

  const deletePost = (e) => {

    const postId = e.target.parentElement.parentElement.getAttribute('blogid');

    fetch(`/posts/${postId}`, { // ${props.serverURL}posts/${postId}
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      mode: 'cors'
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

      {props.navbar}

      <div className="non-navbar-container">

        <header>
          <h1>Blog My Life Away</h1>
          <p>A blogging website used to read and write loads of indecipherable garbage</p>
        </header>

        <div className="home-content">
          {allBlogs}
        </div>
      </div>
      {props.footer}
    </div>
  );
}

export default App;
