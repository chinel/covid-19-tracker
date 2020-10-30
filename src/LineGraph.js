import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { buildChartData } from "./utils";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const LineGraph = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h1>I am a line graph</h1>
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: data,
            },
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;
