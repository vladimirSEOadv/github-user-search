import { useState, useEffect } from 'react'
import './App.css';
import MyInput from "./MyInput";
import User from "./User";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [githubData, setGithubData] = useState([]);

  const inputHandler = (e) => {
    setSearchQuery(e.target.value)
  }

  const fetchData = (searchQuery) => {
    return fetch(`https://api.github.com/users?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setGithubData(data));

  }

  useEffect(() => {
    fetchData(searchQuery)
    console.log('githubData >', githubData)
  },[searchQuery]);

  return (
    <div className="App">
        <div className="title">
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
                    <User user={user} key={user.login}></User>
                  </>
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default App
