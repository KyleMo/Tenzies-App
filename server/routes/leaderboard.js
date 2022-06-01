import express from 'express'
import { addMatchToLeaderboard, getLeaderboardData } from '../controllers/leaderboardControls.js'
const router = express.Router();

router.route("/add").post(addMatchToLeaderboard)
router.route("/get").get(getLeaderboardData)

export default router;
