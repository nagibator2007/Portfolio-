import React, {
  useEffect,
  useState,
  useCallback,
  Profiler,
} from "react";
import { fetchBestEmployeesData, fetchData, IData } from "../../api.ts";
import { BestEmployees } from "../BestEmployees/BestEmployees.tsx";
import { Team } from "../Team/Team.tsx";
import "./styles.css";

const App = () => {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState<IData | null>(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const { profit = [], team = [] } = data || {};

  /* Вычисляет доход на количество месяцев (примем, что список profit каждый месяц одинаков) */
  const calculateProfitSum = useCallback(
    (month: number) => month * profit.reduce((acc, i) => acc + i, 0),
    [profit]
  );

  const date = useCallback(() => `${month}/${year}`, [month, year]);

  const getApi = useCallback(
    (year: number) => fetchBestEmployeesData(year),
    []
  );

  /* Увеличивает месяц */
  const onIncMonth = useCallback(() => {
    setMonth((count) => (count === 12 ? 1 : count + 1));
  }, []);

  /* Уменьшает год до 2018го */
  const onDecYear = useCallback(() => {
    setYear((count) => (count === 2018 ? 2018 : count - 1));
  }, []);


  return (
    <Profiler id="App" onRender={() => {}}>
      <div>
        <h1>App</h1>
        <div className="buttons">
          <button onClick={onIncMonth}>month is {month}</button>
          <button onClick={onDecYear}>year is {year}</button>
        </div>
        <div className="block">
          <p>Date is: {date()}</p>
          <p>Profit sum is: {calculateProfitSum(month)} $</p>
        </div>
        <BestEmployees getApi={getApi} year={year} />
        <Team team={team} />
      </div>
    </Profiler>
  );
};

export default App;