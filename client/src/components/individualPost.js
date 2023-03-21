import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const IndividualPost = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [blogInfo, setBlogInfo] = useState();
    const [commenterName, setCommenterName] = useState("");
    const [commenterComment, setCommenterComment] = useState("");

    // Get the selected blog on render and 
    useEffect(() => {

        fetch(`http://localhost:8000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setBlogInfo(
                <div className="individualBlog">
                    <p>{data.title}</p>
                    <p>{data.text}</p>
                    <p>{formatDate(data.timestamp)}</p>
                    <div className="individualBlog-allComments"> 
                        {data.comments.map(comment => {
                            return (
                                <div className="individualBlog-individualComment" key={comment._id}> 
                                    <p>{comment.name}</p>
                                    <p>{comment.text}</p>
                                    <p>{formatDate(comment.timestamp)}</p>
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

    return (
        <div>
            <header><h1>Individual Post</h1></header>
            <div className="navigation">
                <a href="/">
                    <button>Home</button>
                </a>
            </div>
            {blogInfo}
            <form className="post-comment-form" onSubmit={formSubmit}>
                <h4>Leave A Comment</h4>
                <label>
                    Name 
                    <input onChange={commenterNameChange} type='text' name="name"/>
                </label>
                <label>
                    Comment 
                    <textarea onChange={commenterCommentChange} name="comment"/>
                </label>
                <button>Post Comment</button>
            </form>
        </div>
    )
}
export default IndividualPost