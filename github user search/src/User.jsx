import React, {useEffect, useState} from "react";

function User (props) {
    const [reposCount, setReposCount] = useState(0)
    const reposUrl = props.user.repos_url;

    const fetchReposUrl = (repos_url) => {
        return fetch(`${repos_url}`)
            .then((response) => response.json())
            .then((data) => setReposCount(data.length));
    }

    useEffect(() => {
        fetchReposUrl(reposUrl);
    },[])

    return(
        <div style={{display:"flex", flexDirection:"row", marginLeft: "10px", alignItems: "center", border: "1px solid black"}}>
            <img src={props.user.avatar_url} alt="" width='80px'/>
            <p style={{paddingLeft: "50px"}}> {props.user.login}</p>
            <p style={{width: "100%",textAlign: "right", paddingRight: "10px"}}>Repos:{reposCount}</p>
        </div>
    )
}

export default User