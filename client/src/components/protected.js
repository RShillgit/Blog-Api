import { useEffect, useState } from "react";

const Protected = () => {

    const [response, setResponse] = useState("")

    // On mount, get the protected route and see if there is a token
    useEffect(() => {
        const idToken = localStorage.getItem("token");

        if (idToken) {
            
            const splitToken = idToken.split(' ');
            const stringToken = splitToken[1];
            console.log(stringToken);

            
        }

        fetch("http://localhost:8000/test")
        .then((res) => console.log(res));
        //.then((res) => res.json())
        //.then((data) => console.log(data));

    }, [])

    return (
        <div>
            {response}
        </div>
    )
}
export default Protected;