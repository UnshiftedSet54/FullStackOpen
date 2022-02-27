import Statistic from "./Statistic/Statistic"

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (!good && !neutral && !bad) return <p>no feedback given</p>

  return(
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="all" value={good + neutral + bad}/>
          <Statistic text="average" value={average.toFixed(1) || 0}/>
          <Statistic text="positive" value={`${positive.toFixed(1) || 0}%`}/>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics