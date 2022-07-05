import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Chart from "./Chart";
import { ICharts } from "../../App";

test("Render chart name && time", () => {
  const charts: ICharts[] = [
    { name: "LandingPage", time: 7.4 },
    { name: "Configurator", time: 0.2 },
    { name: "Check-out", time: 7.0 },
    { name: "Deal", time: 3.8 },
  ];

  charts.forEach((item) => {
    const { time, name } = item;
    render(<Chart time={time} name={name} />);

    const isName = screen.getByText(name);
    const isTime = screen.getByText(time);

    expect(isName).toBeInTheDocument();
    expect(isTime).toBeInTheDocument();
  });
});
