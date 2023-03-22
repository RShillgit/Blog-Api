import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import blogImg from '../images/blog.png';

const Navigation = () => {

    const token = useRef();
    const [loginLogoutButton, setLoginLogoutButton] = useState();


    // Before mount check for token
    useLayoutEffect(() => {
        const idToken = localStorage.getItem("token");
        token.current = idToken;
    }, [])

    // On mount
    useEffect(() => {

        // TODO: If route != '/' add a home button
        // TODO: If route != '/posts' and admin is logged in, add a create blog button

        // If the admin is logged in, set admin nav buttons
        if (token.current) {
            setLoginLogoutButton(
                <button onClick={logout}>Logout</button>
            )
        }

        // Else, set normal nav buttons
        else setLoginLogoutButton(
            <a href='/login'>
              <button>Admin Login</button>
            </a>
        );
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
                    {loginLogoutButton}
                </div>
            </div>
        </div>
    )

}
export default Navigation;