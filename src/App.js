import React from 'react';
import Die from './components/Die.js'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

/**
 * Challenge: Allow the user to play a new game when the
 * button is clicked and they've already won
 */

function App() {

  const [tenzies, setTenzies] = React.useState(false)
  const [diceArr, setDiceArr] = React.useState(allNewDice())

  React.useEffect(() => {

    const allHeld = diceArr.every((dice) => dice.isHeld)
    const allSameVal = diceArr.every((dice) => dice.value === diceArr[0].value)

    if (allHeld && allSameVal){
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
    while (i < 10){
      diceArray.push(generateNewDie());
      i++;
    }
    return diceArray;
  }

  function rollDice() {
    if (!tenzies){
      setDiceArr(diceArr => diceArr.map(dice => {
        return dice.isHeld ? dice : generateNewDie()
      }));
    }

    else {
      setTenzies(false);
      setDiceArr(allNewDice())
    }

  }

  function setTrue(id){
    setDiceArr(prevArr => prevArr.map(dice => {
      return id === dice.id ? ({...dice, isHeld: !dice.isHeld}) : dice
      }))
  }

  const dies = diceArr.map((dice,index) => <Die key={dice.id} isHeld={dice.isHeld} eventHandle={() => setTrue(dice.id)} value={dice.value} />)

  return (
    <main className="main-app">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {dies}
      </div>
      <button onClick={rollDice} className="roll-die-btn">{tenzies?"New Game":"Roll"}</button>
    </main>
  );
}

export default App;
