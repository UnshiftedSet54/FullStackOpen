import './App.css';
import { useState } from 'react'
import Buttons from './components/buttons/Buttons'
import Statistics from './components/statistics/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(prev => prev + 1)
  }

  const handleNeutral = () => {
    setNeutral(prev => prev + 1)
  }

  const handleBad = () => {
    setBad(prev => prev + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
