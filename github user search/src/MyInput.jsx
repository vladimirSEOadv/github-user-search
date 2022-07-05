import React from "react";

function MyInput (props){
    return(
        <>
            <input value={props.searchQuery} onChange={props.inputHandler} type="text" placeholder="Search for Users"/>
        </>
    )}

export default MyInput