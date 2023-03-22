import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import deleteImg from '../images/delete.png';

const IndividualPost = (props) => {

    const {id} = useParams();
    const [blogInfo, setBlogInfo] = useState();
    const [commenterName, setCommenterName] = useState("");
    const [commenterComment, setCommenterComment] = useState("");
    const deleteCommentButton = useRef();

    // Get the selected blog on render 
    useEffect(() => {

        // If the user is logged in, render delete post and comment buttons
        const token = localStorage.getItem("token");
        if (token) {
            deleteCommentButton.current = <div className="deleteCommentBtn-div">
                <img src={deleteImg} alt='Delete' onClick={deleteComment}></img>
            </div>
        }

        fetch(`http://localhost:8000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setBlogInfo(
                <div className="individualBlog">
                    <div className="individualBlog-info">
                        <div className="individualBlog-title">
                            <p>{data.title}</p>
                        </div>
                        <p>{data.text}</p>
                        <div className="individualBlog-date">
                            <p>{formatDate(data.timestamp)}</p>
                        </div>
                    </div>
                    <div className="individualBlog-allComments"> 
                        <h4 id="commentsTitle">Comments</h4>
                        {data.comments.map(comment => {
                            return (
                                <div className="individualBlog-individualComment" key={comment._id} dataid={comment._id}> 
                                    {deleteCommentButton.current}
                                    <p>{comment.text}</p>
                                    <p>- {comment.name}</p>
                                    <div className="individualBlog-date">
                                        <p>{formatDate(comment.timestamp)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        });

    }, [])

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

    // Name input change
    const commenterNameChange = (e) => {
        setCommenterName(e.target.value);
    }

    // Comment input change
    const commenterCommentChange = (e) => {
        setCommenterComment(e.target.value);
    }

    // Form submit
    const formSubmit = (e) => {
        e.preventDefault();
        const commentInfo = {
            parent_post: id,
            name: commenterName,
            text: commenterComment,
            timestamp: Date.now(),
        }

        // Post request to localhost:3000/posts/:id
        fetch(`http://localhost:8000/posts/${id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentInfo)
        })
        .then((res) => res.json())
        .then(window.location.reload());
    }

    // Delete Comment
    const deleteComment = (e) => {
        const commentId = e.target.parentElement.parentElement.getAttribute('dataid');

        fetch(`http://localhost:8000/posts/${id}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
        .then(window.location.reload())
        
    }

    return (
        <div className="individualPost-page">

            {props.navbar}

            <div className="non-navbar-container">
                {blogInfo}
                <form className="post-comment-form" onSubmit={formSubmit}>
                    <h4>Leave A Comment</h4>
                    <label>
                        Name 
                        <input onChange={commenterNameChange} type='text' name="name"/>
                    </label>
                    <label>
                        Comment 
                        <textarea onChange={commenterCommentChange} rows='5' cols='30' name="comment"/>
                    </label>
                    <button>Post Comment</button>
                </form>
            </div>
            {props.footer}
        </div>
    )
}
export default IndividualPost