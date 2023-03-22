import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import blogImg from '../images/blog.png';
import homeImg from '../images/home.png';

const Navigation = () => {

    const route = useLocation();

    const token = useRef();
    const [homeButton, setHomeButton] = useState();
    const [createBlogButton, setCreateBlogButton] = useState();
    const [loginLogoutButton, setLoginLogoutButton] = useState();


    // Before mount check for token
    useLayoutEffect(() => {
        const idToken = localStorage.getItem("token");
        token.current = idToken;
    }, [])

    // On mount
    useEffect(() => {

        // If route is NOT '/' add a home button
        if (route.pathname !== '/') {
            setHomeButton(
                <a href='/'>
                    <img src={homeImg} alt='Home'></img>
                </a>
            )
        }

        // If the admin is logged in, set admin nav buttons
        if (token.current) {
            setLoginLogoutButton(
                <button onClick={logout}>Logout</button>
            )

            // If route is NOT '/posts' add a create blog button
            if (route.pathname !== '/posts') {
                setCreateBlogButton(
                    <a href='/posts'>
                        <button>Create Blog</button>
                    </a>
                )
            }

        }

        // Else, set normal nav buttons
        else if (route.pathname !== '/login') {
            setLoginLogoutButton(
                <a href='/login'>
                  <button>Admin Login</button>
                </a>
            );
        } 
    }, [])

    // Scrolls to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Removes token from local storage
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
        window.location.reload();
    }

    return (
        <div className='navbar'>
            <div className='navbar-buttons'>
                <button onClick={scrollToTop} id='blogBtn'>
                    <img src={blogImg} alt='Blog' onClick={scrollToTop} id='blogBtnImg'></img>
                </button>

                <div className='navbar-buttons-right'>
                    {homeButton}
                    {createBlogButton}
                    {loginLogoutButton}
                </div>
            </div>
        </div>
    )

}
export default Navigation;