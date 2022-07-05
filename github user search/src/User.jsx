import React, {useEffect, useState} from "react";

function User (props) {
    const [reposCount, setReposCount] = useState(0);
    const {axiosInstance} = props;

    async function fetchReposCount(userName) {
        try {
            const response = await axiosInstance.get(`users/${userName}`);
            const data = response.data;
            console.log("axiosInstance data >", response);
            setReposCount(data.public_repos);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchReposCount(props.user.login);
    },[])

    return(
        <div style={{display:"flex", flexDirection:"row", margin: "0 10px 2px 10px", alignItems: "center", border: "1px solid black"}}>
            <img src={props.user.avatar_url} alt="" width='80px'/>
            <div style={{paddingLeft: "10%"}}>{props.user.login}</div>
            <p style={{width: "100%",textAlign: "right", paddingRight: "10px"}}>Repos: {reposCount}</p>
        </div>
    )
}

export default User