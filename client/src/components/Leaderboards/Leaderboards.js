import React from 'react'
import './leaderboard.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Leaderboards = () => {

  //api call for easy, medium, hard, and extreme games difficulties
  const [matchDiffFilter, setMatchDiffFilter] = React.useState('Easy')
  const [error, setError] = React.useState(null)
  const [savedTimes, setSavedTimes] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchData(){
      try {
        const response = await axios.get(`/api/leaderboard/get?difficulty=${matchDiffFilter}`)
        setSavedTimes(response.data)
      } catch (e) {
        setError(e.response.data.message)
      }
    }
    fetchData()

  }, [matchDiffFilter])

  //Event functions
  const goBack = () => {
    navigate('/');
  }

  const handleChange = (e) => {
    setMatchDiffFilter(e.target.value)
  }

  const tableData = savedTimes
    .map((match,index) => {
    return (
      <tr className="table-row" key={match.id}>
        <td>{index+1}</td>
        <td>{match.username}</td>
        <td>{match.difficulty}</td>
        <td>
          <span>{("0" + Math.floor((match.time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((match.time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((match.time / 10) % 100)).slice(-2)}</span>
        </td>
      </tr>
    )
  })

  return (
    <div className="leaderboards">
      <div onClick={goBack} className="back">&#8592; Back</div>
      <h1>Leaderboards</h1>
      <div className="leaderboard-filter">
        <select onChange={handleChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Extreme">Extreme</option>
        </select>
      </div>
      <div className="table-container">
        <table className="best-game-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>

    </div>
  )
}

export default Leaderboards;
