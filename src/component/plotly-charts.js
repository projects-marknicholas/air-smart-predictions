import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PlotlyCharts = ({ parameter, predParam, parameterName, filterOption, className }) => {
  const [data, setData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchPredictionData();
    const intervalId = setInterval(() => {
      fetchData();
      fetchPredictionData();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://air-quality.mchaexpress.com/sensor_data.php"
      );
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPredictionData = async () => {
    try {
      const response = await fetch(
        `https://air-quality.mchaexpress.com/sensor_data_predictions.php?param=${predParam}`
      );
      const predictionData = await response.json();
      const formattedPredictionData = predictionData.map(prediction => ({
        x: prediction.predicted_date,
        y: parseFloat(prediction.predicted_value),
        upperBound: parseFloat(prediction.upper_bound),
        lowerBound: parseFloat(prediction.lower_bound)
      }));
      setPredictionData(formattedPredictionData);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    }
  };

  // Function to group data by the selected filter option (Day, Week, Month, Year)
  const groupDataByFilterOption = () => {
    const groupedData = {};
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    data.forEach(entry => {
      const date = new Date(entry.created_at); // Use created_at instead of datetime
      let key;
      switch (filterOption) {
        case "Day":
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          break;
        case "Week":
          const firstDayOfWeek = new Date(date);
          firstDayOfWeek.setDate(date.getDate() - date.getDay());
          key = `${firstDayOfWeek.getFullYear()}-${firstDayOfWeek.getMonth() + 1}-${firstDayOfWeek.getDate()}`;
          break;
        case "Month":
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case "Year":
          key = `${date.getFullYear()}`;
          break;
        case "Hour":
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`;
          break;
        default:
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(parseFloat(entry[parameter]));
    });
    return groupedData;
  };

  const groupedData = groupDataByFilterOption();

  const xData = Object.keys(groupedData);
  const yData = xData.map(date => {
    const values = groupedData[date];
    // For simplicity, taking the average value for each date
    return values.reduce((acc, curr) => acc + curr, 0) / values.length;
  });

  const predictionXData = predictionData.map(prediction => prediction.x);
  const predictionYData = predictionData.map(prediction => prediction.y);
  const predictionUpperBound = predictionData.map(prediction => prediction.upperBound);
  const predictionLowerBound = predictionData.map(prediction => prediction.lowerBound);

  const plotData = [
    {
      x: xData,
      y: yData,
      type: "scatter",
      mode: "lines+markers",
      marker: {
        size: 4,
        color: '#53bbe0',
      },
      name: 'Actual',
    },
    {
      x: predictionXData,
      y: predictionYData,
      type: "scatter",
      mode: "lines",
      line: {
        color: '#ff9900',
        dash: 'line',
      },
      name: 'Prediction',
    },
    {
      x: predictionXData,
      y: predictionUpperBound,
      type: "scatter",
      mode: "lines",
      line: {
        color: '#ff0000',
        dash: 'line',
      },
      fill: "tonexty",
      fillcolor: "rgba(128, 0, 0, 0.2)",
      name: 'Upper Bound',
    },
    {
      x: predictionXData,
      y: predictionLowerBound,
      type: "scatter",
      mode: "lines",
      line: {
        color: '#00ff00',
        dash: 'line',
      },
      fill: "tonexty",
      fillcolor: "rgba(128, 0, 0, 0.2)",
      name: 'Lower Bound',
    },
  ];

  const layout = {
    title: parameterName,
    xaxis: {
      title: "Date",
    },
    yaxis: { title: "Value" },
    width: 1140,
    height: 500,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4,
    },
  };

  return (
    <div className={className} style={{ width: '100%', textAlign: 'center' }}>
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default PlotlyCharts;
