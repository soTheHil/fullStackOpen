import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = ((good - bad) / all) * 100
  const positive = good/all * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        handleClick={() => setGood(good +1)}
        text = "Good"
      />
      <Button 
        handleClick={() => setNeutral(neutral +1)}
        text = "Neutral"
      />
      <Button 
        handleClick={() => setBad(bad +1)}
        text = "Bad"
      />

      <Statistics {...{good, neutral, bad, all, positive, average}}/>

     
    </div>
  )
}

const StatisticLine = ({text, value}) => <p>{text}: {value}</p>

const Statistics = ({good, neutral, bad, all, positive, average}) => {
  if (all === 0) return (<p>No feedback given</p>)

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <p>All: {all}</p>
      <p>Average: {average} %</p>
      <p>Positive: {positive} %</p>
    </>
  )
}

const Button = ({handleClick, text}) => 
  <button onClick={handleClick}>{text}</button>

export default App