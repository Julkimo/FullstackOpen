import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Statistics = ( {good, neutral, bad} ) => {
  const all = good + neutral + bad
  const average = Math.round((good - bad) / (good + neutral + bad) * 100) / 100
  const positive = Math.round(good * 100 / (good + neutral + bad) * 10) / 10

  
  if ( (all) === 0 ) {
    return (
     <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </>
    )
  }
  else {
    return (
    <>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='All' value={all}/>
        <StatisticLine text='Average' value={average}/>
        <StatisticLine text='Positive' value={positive}/>
      </table>
    </>
    )
  }
  
}

const StatisticLine = ( {text, value} ) => {
  if(text === 'positive')
  {
    return (
      <>
        <tr>
          <th align='left'>{text}</th>
          <td>{value}%</td>
        </tr>
      </>
    )
  }
  else
  {
    return (
      <>
        <tr>
          <th align='left'>{text}</th>
          <td>{value}</td>
        </tr>
      </>
    )
  }
  
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
