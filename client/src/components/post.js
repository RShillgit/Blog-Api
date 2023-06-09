import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = (props) => {

    const navigate = useNavigate();
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const token = useRef();

    // Before mount check for token
    useLayoutEffect(() => {
        const idToken = localStorage.getItem("token");
        token.current = idToken;
    }, [])

    // On mount fetch all blog posts
    useEffect(() => {

        // If there is a token, add it to the auth header of the get request
        if (token.current) {
            
            fetch(`${props.serverURL}posts`, {
                method: 'GET',
                headers: {Authorization: token.current},
                mode: 'cors'
            })
            // If the status is good, render the page content
            .then((res) => {
                if (res.status === 200) {
                    const pageContent = document.querySelector('.createBlog-page');
                    pageContent.style.display = 'block';
                }
            }) 
        }

        // Else navigate back to home
        else {
            navigate('/')
        }

    }, [])

    // Title input change
    const blogTitleChange = (e) => {
        setBlogTitle(e.target.value);
    }

    // Content input change
    const blogContentChange = (e) => {
        setBlogContent(e.target.value);
    }

    const formSubmit = (e) => {
        e.preventDefault();

        const blogPostInfo = {blogTitle, blogContent};

        // POST request to create the new blog
        fetch(`${props.serverURL}posts`, { // 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            mode:'cors',
            body: JSON.stringify(blogPostInfo)
        })
        // Then navigate back to home
        .then(navigate('/'));
    }

    return (
        <div className="createBlog-page">

            {props.navbar}
           
           <div className="non-navbar-container">
            <header><h1>Create Blog Post</h1></header>
                
                <form onSubmit={formSubmit} id='create-blog-form'>
                    <label>
                        Title: <input type="text" name="title" onChange={blogTitleChange} required={true}></input>
                    </label>
                    <label>
                        Content: <textarea type="text" name="content" rows='5' cols='50' onChange={blogContentChange} required={true} />
                    </label>
                </form>
                <div className="form-buttons">
                    <a href="/"><button>Cancel</button></a>
                    <button form="create-blog-form">Create</button>
                </div>
           </div>   
           {props.footer}     
        </div>
    )
}
export default Post;