import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = (props) => {

    const navigate = useNavigate();
    const token = useRef();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const postId = useParams();

    // Before mount check for token
    useLayoutEffect(() => {
        const idToken = localStorage.getItem("token");
        token.current = idToken;
    }, [])

    useEffect(() => {

        // If there is a token, get the post information to fill the inputs
        if (token.current) {
            fetch(`https://blog-api-production-2e51.up.railway.app/posts/${postId.id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title);
                setContent(data.text);
            })

            // Display page content
            const updatePostPage = document.querySelector('.updatePost-page');
            updatePostPage.style.display = 'block';
        }

        // If not, navigate back to home
        else {
            navigate('/');
        }
    }, [])

    // Title input change
    const titleChange = (e) => {
        setTitle(e.target.value)
    }

    // Content input change
    const contentChange = (e) => {   
        setContent(e.target.value)
    }

    // Updates post information
    const updateFormSubmit = (e) => {
        e.preventDefault();

        const newBlogInfo = {title, content};

        // POST request to create the new blog
        fetch(`https://blog-api-production-2e51.up.railway.app/posts/${postId.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBlogInfo)
        })
        // Then navigate back to home
        .then(navigate('/'));
    }

    return (
        <div className="updatePost-page">
            
            {props.navbar}

            <div className="non-navbar-container">
                <header><h1>Edit Post</h1></header>
                <form onSubmit={updateFormSubmit} id="update-post-form">
                    <label>
                        Title:
                        <input type='text' name="title" value={title} onChange={titleChange} required={true}></input>
                    </label>
                    <label>
                        Content:
                        <textarea type='text' name="content" value={content} onChange={contentChange} rows='5' cols='50' required={true} />
                    </label>
                </form>
                <div className="form-buttons">
                    <a href="/">
                        <button>Cancel</button>
                    </a>
                    <button form="update-post-form">Submit</button>
                </div>
            </div>
            {props.footer}
        </div>
    )
}
export default UpdatePost;