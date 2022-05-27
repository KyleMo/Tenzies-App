import React from 'react';
import Die from './Die.js'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Stopwatch from './Stopwatch.js'


function Tenzies({extreme, difficulty}) {

  const [tenzies, setTenzies] = React.useState(false)
  const [diceArr, setDiceArr] = React.useState(allNewDice())
  const [clockRunning, setClockRunning] = React.useState(false)
  const [time, setTime] = React.useState(0);
  const [viewSettings, setViewSettings] = React.useState(false)
  let width = 600;
  let height = 600;


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
      setClockRunning(false)
      setTenzies(true)
    }

  },[diceArr])

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

  function rollDice() {
    setClockRunning(true)
    setDiceArr(diceArr => diceArr.map(dice => {
      return dice.isHeld ? dice : generateNewDie()
    }));
  }

  function startNewGame(){
    setTime(0)
    setTenzies(false);
    setDiceArr(allNewDice())
  }

  function setTrue(id){
    setClockRunning(true)
    setDiceArr(prevArr => prevArr.map(dice => {
      return id === dice.id ? ({...dice, isHeld: !dice.isHeld}) : dice
      }))
  }

  const dies = diceArr.map((dice,index) => <Die key={dice.id} isHeld={dice.isHeld} eventHandle={() => setTrue(dice.id)} value={dice.value} />)

  return (
    <main className="main-game">
      {tenzies && <Confetti width={width} height={height}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <Stopwatch time={time}/>
      <div className={difficulty>29?"die-container-2":"die-container"}>
        {dies}
      </div>
      <button onClick={tenzies?startNewGame:rollDice} className="roll-die-btn">{tenzies?"New Game":"Roll"}</button>
    </main>
  );
}

export default Tenzies;
