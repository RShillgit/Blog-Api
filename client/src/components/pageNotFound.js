import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const PageNotFound = (props) => {

    const route = useLocation();

    return (
        <div className="404-page">

            {props.navbar}

            <div className="non-navbar-container">
                <header>
                    <h1>Route {route.pathname} Not Found</h1>
                </header>
            </div>
            {props.footer}
        </div>
    )
}
export default PageNotFound;