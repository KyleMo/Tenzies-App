import React from 'react';
import Tenzies from './components/Tenzies.js'
import Die from './components/Die.js'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Stopwatch from './components/Stopwatch.js'


function App() {

  const [viewSetting, setViewSettings] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState(10)
  const [extreme, setExtreme] = React.useState(false)

  function handleClick(){
    setViewSettings(prev => !prev)
  }

  function handleChange(e){
    setDifficulty(e.target.value)
    if(e.target.value === "30"){
      setExtreme(true)
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
          <button className="setting-diff-button" onClick={handleChange} value={"30"}>Extreme</button>
        </div>
      </div>
    )
  }

  return(
    <div className={difficulty>29?"app-2":"app"}>
      <div className="settings-button" onClick={handleClick}>{viewSetting?<span className="settings-span"><span className="settings-gear">&#8592;</span>Back</span>:<span className="settings-span"><span className="settings-gear">&#9881;</span>Settings</span>}</div>
      {viewSetting?<Settings />:<Tenzies extreme={extreme} difficulty={difficulty}/>}
    </div>
  )
}

export default App;
