import { useEffect, useState } from "react";

const Post = () => {

    const [blogs, setBlogs] = useState([]);

    // On mount fetch all blog posts
    useEffect(() => {
        fetch('http://localhost:8000/posts')
        .then((res) => res.json())
        .then((data) => setBlogs(data));
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
            <header><h1>BLOGS</h1></header>

            <div className='navigation'>
                <a href='/'>
                    <button>Home</button>
                </a>
            </div>

            <div className="posts-allBlogs">
                {blogs.map(blog => {
                    const href = `/posts/${blog._id}`;
                    return (
                        <div className="posts-individualBlog" key={blog._id} blogid={blog._id}>
                            <a href={href}>
                                <p>{blog.title}</p>
                                <p>{blog.text}</p>
                                <p>{formatDate(blog.timestamp)}</p>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Post;