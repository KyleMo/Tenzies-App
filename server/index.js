import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import leaderboard from './routes/leaderboard.js';
import {} from 'dotenv/config'
import connectDB from './config/db.js';


const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB()

const app = express()
app.use(express.json())

app.use('/api/leaderboard',leaderboard)

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
