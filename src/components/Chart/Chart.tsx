import { FC } from "react";
import { ICharts } from "../../App";
import "./Chart.css";

const Chart: FC<ICharts> = ({
  name,
  time,
  startPercentageWidth,
  percentageWidth,
}) => (
  <div className="chart">
    <div className="chart__title">
      <span>{name}</span>
    </div>
    <div className="chart__container">
      <div
        className="container--marked"
        style={{
          width: `${percentageWidth}%`,
          marginLeft: `${startPercentageWidth}%`,
        }}
      >
        <div className="container--value">{time}</div>
      </div>
    </div>
  </div>
);

export default Chart;
