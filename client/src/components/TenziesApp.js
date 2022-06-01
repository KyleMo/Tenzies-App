import React from 'react';
import Tenzies from './TenziesGame/TenziesGame.js'
import Die from './Die/Die.js'
import { Link } from 'react-router-dom'


function TenziesApp() {

  const [viewSetting, setViewSettings] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState(10)
  const [extreme, setExtreme] = React.useState(false)

  function handleClick(){
    setViewSettings(prev => !prev)
  }

  function handleChange(e){
    setExtreme(false)
    if(e.target.value === "30e"){
      setExtreme(true)
      setDifficulty(30)
    } else {
      setDifficulty(e.target.value)
    }
    setViewSettings(prev => !prev)
  }

  function Settings(){
    return(
      <div className="settings">
        <h2>Difficulty</h2>
        <div className="settings-difficulty">
          <button className="setting-diff-button" onClick={handleChange} value={10}>Easy</button>
          <button className="setting-diff-button" onClick={handleChange} value={20}>Medium</button>
          <button className="setting-diff-button" onClick={handleChange} value={30}>Hard</button>
          <button className="setting-diff-button" onClick={handleChange} value={"30e"}>Extreme</button>
        </div>
      </div>
    )
  }

  return(
    <div className={difficulty>29?"tenzies-app-2":"tenzies-app"}>
      <div className="settings-button" onClick={handleClick}>{viewSetting?<span className="settings-span"><span className="settings-gear">&#8592;</span>Back</span>:<span className="settings-span"><span className="settings-gear">&#9881;</span>Settings</span>}</div>
      {viewSetting?<Settings />:<Tenzies extreme={extreme} difficulty={difficulty}/>}
      <Link to="/leaderboards" className="leaderboards-link">Leaderboards</Link>
    </div>
  )
}

export default TenziesApp;
