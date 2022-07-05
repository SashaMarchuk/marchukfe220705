import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { ICharts } from "./App";

test("renders text: Spend Time (Seconds)", () => {
  render(<App />);
  const linkElement = screen.getByText("Spend Time (Seconds)");
  expect(linkElement).toBeInTheDocument();
});

test("renders text: LandingPage", () => {
  render(<App />);
  const linkElement = screen.getByText("LandingPage");
  expect(linkElement).toBeInTheDocument();
});

test("renders text: Configurator", () => {
  render(<App />);
  const linkElement = screen.getByText("Configurator");
  expect(linkElement).toBeInTheDocument();
});

test("renders text: Check-out", () => {
  render(<App />);
  const linkElement = screen.getByText("Check-out");
  expect(linkElement).toBeInTheDocument();
});

test("renders text: Deal", () => {
  render(<App />);
  const linkElement = screen.getByText("Deal");
  expect(linkElement).toBeInTheDocument();
});

test("renders button shuffle", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Shuffle" });
  expect(button).toBeInTheDocument();
});

test("renders button random", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Random value" });
  expect(button).toBeInTheDocument();
});

test("click shuffle", () => {
  render(<App />);
  fireEvent.click(screen.getByText("Shuffle"));

  const charts: ICharts[] = [
    { name: "LandingPage", time: 7.4 },
    { name: "Configurator", time: 0.2 },
    { name: "Check-out", time: 7.0 },
    { name: "Deal", time: 3.8 },
  ];

  charts.forEach((item) => {
    const { name, time } = item;

    const textNameElement = screen.getByText(name);
    const textTimeElement = screen.getByText(time);

    expect(textNameElement).toBeInTheDocument();
    expect(textTimeElement).toBeInTheDocument();
  });
});

test("click random", () => {
  render(<App />);
  fireEvent.click(screen.getByText("Random value"));

  const charts: ICharts[] = [
    { name: "LandingPage", time: 7.4 },
    { name: "Configurator", time: 0.2 },
    { name: "Check-out", time: 7.0 },
    { name: "Deal", time: 3.8 },
  ];

  charts.forEach((item) => {
    const { name, time } = item;

    const textNameElement = screen.getByText(name);
    const textTimeElement = screen.queryByText(time);

    expect(textNameElement).toBeInTheDocument();
    expect(textTimeElement).toBeNull();
  });
});
