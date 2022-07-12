import React, { useState, useEffect } from 'react';
import './App.css';
import MyInput from "./MyInput";
import User from "./User";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [githubData, setGithubData] = useState([]);
  const gitTokenEnv = import.meta.env.VITE_APP_TOKEN;

  const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Authorization: gitTokenEnv
    }
  });

  async function getUser(searchQuery) {
    try {
      const response = await axiosInstance.get(`search/users?q=${searchQuery}`);
      const data = response.data.items;
      console.log("axiosInstance response data >", data);
      setGithubData(data)
    } catch (error) {
      console.error(error);
    }
  }

  const inputHandler = (e) => {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    getUser(searchQuery);
    console.log('githubData >', githubData);
  },[searchQuery]);


  return (
    <div className="App">
        <div className="app-title">
          First Screen
        </div>
        <div className="main_wrapper">
          <div className="header-wrapper">
            <div className="subtitle">
              GitHub Searcher
            </div>
            <MyInput searchQuery={searchQuery} inputHandler={inputHandler} />
          </div>
          <div style={{marginTop: "15px"}} className="content-wrapper">
            {githubData.map( (user) => {
              return(
                  <>
                    <User user={user} key={user.login} axiosInstance={axiosInstance}/>
                  </>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default App
