import React from 'react'
import './stopwatch.css'

const Stopwatch = ({time}) => {

  return (
    <h2 className="stopwatch">
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
    </h2>
  )
}

export default Stopwatch;
