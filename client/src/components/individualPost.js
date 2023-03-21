import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const IndividualPost = () => {

    const {id} = useParams();
    const [blogInfo, setBlogInfo] = useState();

    // Get the selected blog
    useEffect(() => {

        fetch(`http://localhost:8000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setBlogInfo(
                <div className="individualBlog">
                    <p>{data.title}</p>
                    <p>{data.text}</p>
                    <p>{formatDate(data.timestamp)}</p>
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

    return (
        <div>
            <header><h1>Individual Post</h1></header>
            <div className="navigation">
                <a href="/">
                    <button>Home</button>
                </a>
            </div>
            {blogInfo}
            <h3>Here is where each comment will go</h3>
        </div>
    )
}
export default IndividualPost