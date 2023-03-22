import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const PageNotFound = () => {

    const route = useLocation();

    useLayoutEffect(() => {
        console.log(route)
    }, [])

    return (
        <div className="404-page">
            <header>
                <h1>Route {route.pathname} Not Found</h1>
            </header>
        </div>
    )
}
export default PageNotFound;