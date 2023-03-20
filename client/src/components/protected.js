import { useEffect, useState } from "react";

const Protected = () => {

    const [response, setResponse] = useState("")

    // On mount, get the protected route and see if there is a token
    useEffect(() => {

        const idToken = localStorage.getItem("token");

        // If there is a token, add it to the auth header of the get request
        if (idToken) {
            
            fetch("http://localhost:8000/test", {
                method: 'GET',
                headers: {Authorization: idToken}
            })
            .then((res) => res.json())
            .then((data) => setResponse(data));
        }

        // Else render not authorized information
        else {
            setResponse(
                <div>
                    <h1>You are not authorized</h1>
                </div>
            )
        }

    }, [])

    return (
        <div>
            {response}
        </div>
    )
}
export default Protected;