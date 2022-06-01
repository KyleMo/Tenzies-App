import React from 'react';
import Die from '../Die/Die.js'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Stopwatch from '../Stopwatch/Stopwatch.js'
import './tenzies-game.css'
import axios from 'axios'


const TenziesGame = ({extreme, difficulty}) => {

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [tenzies, setTenzies] = React.useState(false)
  const [diceArr, setDiceArr] = React.useState(allNewDice())
  const [clockRunning, setClockRunning] = React.useState(false)
  const [time, setTime] = React.useState(0);
  const [viewSettings, setViewSettings] = React.useState(false)
  const interval = React.useRef(null)
  const [fastestTime, setFastestTime] = React.useState(Infinity)
  const [confetti, setConfetti] = React.useState(false)
  const [username, setUsername] = React.useState("")
  const [dataSubmit, setDataSubmit] = React.useState(false)
  let width = 600;
  let height = 600;

//

  React.useEffect(() => {
    if(extreme && clockRunning){
       interval.current = setInterval(()=>{
        setDiceArr(diceArr => diceArr.map(dice => {
          return dice.isHeld ? dice : generateNewDie()
        }));
      },1500)
    }
    return () => {
      clearInterval(interval.current);
    };
  },[extreme, clockRunning])

  React.useEffect(() => {
    let interval;
    if(clockRunning){
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      },10)
    }
    return () => clearInterval(interval)
  },[clockRunning])

  React.useEffect(() => {

    const allHeld = diceArr.every((dice) => dice.isHeld)
    const allSameVal = diceArr.every((dice) => dice.value === diceArr[0].value)

    if (allHeld && allSameVal){
      clearInterval(interval.current);
      setClockRunning(false)
      setTenzies(true)
      if(time < fastestTime){
        setFastestTime(time)
        setConfetti(true)
      }
    }

  },[diceArr])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }
        setLoading(true)
        await axios.post('/api/leaderboard/add', {
          username: username,
          signDifficulty: difficulty,
          extreme: extreme,
          time: fastestTime }
        , config)
        setLoading(false)
        setDataSubmit(true)

      } catch (e) {
        setLoading(false)
        setError(e)
      }

  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }


  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6)+1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const diceArray = []
    let i = 0;
    while (i < difficulty){
      diceArray.push(generateNewDie());
      i++;
    }
    return diceArray;
  }

  const rollDice = () => {
    setClockRunning(true)
    setDiceArr(diceArr => diceArr.map(dice => {
      return dice.isHeld ? dice : generateNewDie()
    }));
  }

  const startNewGame = () => {
    setConfetti(false)
    setTime(0)
    setTenzies(false);
    setDataSubmit(false)
    setDiceArr(allNewDice())
  }

  const setTrue = (id) => {
    setClockRunning(true)
    setDiceArr(prevArr => prevArr.map(dice => {
      return id === dice.id ? ({...dice, isHeld: !dice.isHeld}) : dice
      }))
  }

  const dies = diceArr.map((dice,index) => <Die key={dice.id} isHeld={dice.isHeld} eventHandle={() => setTrue(dice.id)} value={dice.value} />)

  return (
    <main className="main-game">
      {confetti && <Confetti width={width} height={height}/>}
      <h1 className="title">Tenzies</h1>
      {fastestTime === Infinity && <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
      <Stopwatch time={time}/>
      {fastestTime !== Infinity && <div className="fastestTime">{fastestTime !== Infinity && <Stopwatch time={fastestTime} />}</div>}
      {(!dataSubmit && fastestTime !== Infinity) &&
        <span>
          <input onChange={handleChange} value={username} maxlength="10" className="submit" type="text" placeholder="Enter username"></input>
          <button onClick={handleSubmit} type="submit">Add to leaderboard</button>
        </span>
      }
      {dataSubmit && <h2>Time successfully submitted!</h2>}
      <div className={difficulty>29?"die-container-2":"die-container"}>
        {dies}
      </div>
      <button onClick={tenzies?startNewGame:rollDice} className="roll-die-btn">{tenzies?"New Game":"Roll"}</button>
    </main>
  );
}

export default TenziesGame;
