import express from 'express'
import TenzieMatch from '../models/tenzieMatch.js'

const addMatchToLeaderboard = async(req, res) => {
  const {username, signDifficulty, extreme, time} = req.body;
  let difficulty = "Easy";
  // signDifficulty gets passed fine and is type number

  if(signDifficulty == 30 && extreme){
    difficulty = "Extreme"
  } else if(signDifficulty == 30){
    difficulty = "Hard"
  } else if (signDifficulty == 20){
    difficulty = "Medium"
  }

  const tenzieMatch = await TenzieMatch.create({
    username,
    difficulty,
    time
  })

  if (tenzieMatch) {
    res.status(201).json({
      __id: tenzieMatch._id,
      username: tenzieMatch.username,
      difficulty: difficulty,
      time: tenzieMatch.time
    })

  } else {
    res.status(400)
    throw new Error("Error occured")
  }
}

const getLeaderboardData = async(req, res) => {

  const requestParam = req.query.difficulty

  const leaderboardData = await TenzieMatch
    .find({difficulty: requestParam})
    .sort({"time": 1})
  res.json(leaderboardData.slice(0,11))

}

export { addMatchToLeaderboard, getLeaderboardData };
