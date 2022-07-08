import { useEffect, useRef, useState } from "react";
import "./App.css";
import Chart from "./components/Chart/Chart";

export interface ICharts {
  name: string;
  time: number;
  percentageWidth?: number;
  startPercentageWidth?: number;
  endPercentageWidth?: number;
}

function App() {
  const charts: ICharts[] = [
    { name: "LandingPage", time: 7.4 },
    { name: "Configurator", time: 0.2 },
    { name: "Check-out", time: 7.0 },
    { name: "Deal", time: 3.8 },
  ];

  const buttonRandomValue = useRef<HTMLButtonElement | null>(null);
  const buttonShuffle = useRef<HTMLButtonElement | null>(null);

  const [chartsList, setChartsList] = useState<ICharts[]>(charts);

  useEffect(() => {
    recalculateCharts(charts);
  }, []);

  const calcPercentage = (time: number, fullTime: number) => {
    return (time / fullTime) * 100;
  };

  const calcSumTime = (arr: ICharts[]) => {
    const newSumTime = arr.reduce(
      (accumulator: number, currentValue: ICharts) => {
        return toFixNumber(accumulator + currentValue.time);
      },
      0
    );
    return newSumTime;
  };

  const recalculateCharts = (arrList = chartsList) => {
    const newChartsList: ICharts[] = [];

    const newSumTime = calcSumTime(arrList);

    arrList.forEach((item, index) => {
      const startPercentageWidth =
        (!!index &&
          (newChartsList?.[index - 1]?.startPercentageWidth || 0) +
            (newChartsList?.[index - 1]?.percentageWidth || 0)) ||
        0;
      const percentageWidth = toFixNumber(
        calcPercentage(item.time, newSumTime)
      );

      const obj = {
        ...item,
        startPercentageWidth,
        percentageWidth,
      };
      newChartsList.push(obj);
    });
    setChartsList([...newChartsList]);
  };

  const shuffleChart = () => {
    const newChartList = chartsList.sort(() => Math.random() - 0.5);
    recalculateCharts(newChartList);
  };

  const setRandomValue = () => {
    const newChartList = chartsList.map((item) => {
      const time = toFixNumber(Math.random() * 10);
      return { ...item, time };
    });
    recalculateCharts(newChartList);
  };

  const toFixNumber = (num: number, toFixedVal: number = 1) =>
    +num.toFixed(toFixedVal);

  useEffect(() => {
    setInterval(() => {
      buttonRandomValue?.current?.click();
      setTimeout(() => buttonShuffle?.current?.click(), 15000);
    }, 30000);
  }, []);

  return (
    <div className="app">
      <div className="app-title title">Spend Time (Seconds)</div>
      {chartsList.map((item, index) => {
        return (
          <Chart
            key={index}
            time={item.time}
            name={item.name}
            percentageWidth={item.percentageWidth}
            startPercentageWidth={item.startPercentageWidth}
          />
        );
      })}
      <button className="app-btn" onClick={shuffleChart} ref={buttonShuffle}>
        Shuffle
      </button>
      <button
        className="app-btn"
        onClick={setRandomValue}
        ref={buttonRandomValue}
      >
        Random value
      </button>
    </div>
  );
}

export default App;
