import React from 'react';
import { Routes, Route } from 'react-router-dom'
import TenziesApp from './components/TenziesApp.js'
import Leaderboards from './components/Leaderboards/Leaderboards.js'



function App() {
  return (
    <Routes>
      <Route path="/" element={<TenziesApp />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
    </Routes>
  )
}

export default App;
