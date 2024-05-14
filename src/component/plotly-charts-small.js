import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PlotlyCharts = ({ parameter, predParam, parameterName, filterOption, className }) => {
  const [actualData, setActualData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const [actual, prediction] = await Promise.all([
        fetchActualData(),
        fetchPredictionData()
      ]);
      setActualData(actual);
      setPredictionData(prediction);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchActualData = async () => {
    try {
      const response = await fetch("https://air-quality.mchaexpress.com/sensor_data_date.php");
      const responseData = await response.json();
      return responseData.map(entry => ({
        x: entry.created_at,
        y: parseFloat(entry[parameter]),
        prediction: false
      }));
    } catch (error) {
      console.error("Error fetching actual data:", error);
      return [];
    }
  };
  
  const fetchPredictionData = async () => {
    try {
      const response = await fetch(
        `https://air-quality.mchaexpress.com/sensor_data_predictions.php?param=${predParam}`
      );
      const predictionData = await response.json();
      return predictionData.map(prediction => ({
        x: prediction.predicted_date,
        y: parseFloat(prediction.predicted_value),
        upperBound: parseFloat(prediction.upper_bound),
        lowerBound: parseFloat(prediction.lower_bound),
        prediction: true
      }));
    } catch (error) {
      console.error("Error fetching prediction data:", error);
      return [];
    }
  };    

  const actualPlotData = {
    x: actualData.map(item => item.x),
    y: actualData.map(item => item.y),
    type: "scatter",
    mode: "lines+markers",
    marker: {
      size: 4,
      color: '#53bbe0',
    },
    name: 'Actual Data',
  };

  const predictionPlotData = [
    {
      x: predictionData.map(item => item.x),
      y: predictionData.map(item => item.y),
      type: "scatter",
      mode: "lines+markers",
      line: {
        color: '#ff9900',
        dash: 'line',
      },
      name: 'Prediction',
    },
    {
      x: predictionData.map(item => item.x),
      y: predictionData.map(item => item.upperBound),
      type: "scatter",
      mode: "lines",
      line: {
        color: '#ff0000',
        dash: 'line',
      },
      name: 'Upper Bound',
      fill: "tonexty",
      fillcolor: "rgba(255, 0, 0, 0.2)",
    },
    {
      x: predictionData.map(item => item.x),
      y: predictionData.map(item => item.lowerBound),
      type: "scatter",
      mode: "lines",
      line: {
        color: '#00ff00',
        dash: 'line',
      },
      fill: "tonexty",
      fillcolor: "rgba(0, 255, 0, 0.1)",
      name: 'Lower Bound',
    },
  ];

  const layout = {
    title: parameterName,
    xaxis: {
      title: "Date",
    },
    yaxis: { title: "Value" },
    width: 430,
    height: 400,
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
      <Plot data={[actualPlotData, ...predictionPlotData]} layout={layout} />
    </div>
  );
};

export default PlotlyCharts;
