import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Statistics = (props) => {
    const { good, neutral, bad } = props;
    const total = () => good + neutral + bad;

    if (total() == 0)
      return (
        <div>
          <p>No feedback given</p>
        </div>
      );

    const average = () => (good - bad) / total();
    const positive = () => 100 * (good / total());

    return (
      <div style={{ textAlign: "left" }}>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total()} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={positive() + " %"} />
        </table>
      </div>
    );
  };

  const StatisticLine = (props) => {
    const { text, value } = props;

    return (
      <thead>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </thead>
    );
  };
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
