import Navbar from './navbar'
import React, {useState, useEffect} from 'react'
import QualityScoreAnalysis from '../component/quality-score-analysis'
import QualityCategoryAnalysis from '../component/quality-category-analysis'
import AllParameters from '../component/all-parameters'

// Svg
import sampleSvg from '../assets/svg/sample.svg'
import oxygenSvg from '../assets/svg/oxygen.svg'
import temperatureSvg from '../assets/svg/temperature.svg'
import hydrogenSvg from '../assets/svg/hydrogen.svg'
import solidsSvg from '../assets/svg/solids.svg'

function Home(){

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://air-quality.mchaexpress.com/sensor_data_ordered.php');
      const jsonData = await response.json();
      const latestData = jsonData[0];
      setData([latestData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getAirQualityCategory(AQI) {
    if (AQI <= 50) {
      return 'Good';
    } else if (AQI <= 100) {
      return 'Moderate';
    } else if (AQI <= 150) {
      return 'Unhealthy for Sensitive Groups';
    } else if (AQI <= 200) {
      return 'Unhealthy';
    } else if (AQI <= 300) {
      return 'Very Unhealthy';
    } else {
      return 'Hazardous';
    }
  }

  return(
    <>
      {/* Navigation bar */}
      <Navbar/>

      {/* Main Content */}
      <div className='home-page'>
        <div className='home-flex'>
          <div className='hf-right'>
            <div className='hf-analysis-grid'>
              {data.map((item, index) => (
                <QualityCategoryAnalysis
                  key={index}
                  ParameterName="Quality"
                  ParameterData={getAirQualityCategory(item.AQI)}
                  Logo={sampleSvg}
                />
              ))}
              {data.map((item, index) => (
                <>
                  <QualityScoreAnalysis
                    parameterData={item.temperature}
                    parameterName="Temperature (°C)"
                    Logo={temperatureSvg}
                  />
                  <QualityScoreAnalysis
                    parameterData={item.pressure}
                    parameterName="Pressure (hPa)"
                    Logo={hydrogenSvg}
                  />
                  <QualityScoreAnalysis
                    parameterData={item.humidity}
                    parameterName="Humidity (°C)"
                    Logo={oxygenSvg}
                  />
                  <QualityScoreAnalysis
                    parameterData={item.gas}
                    parameterName="Gas (°C)"
                    Logo={solidsSvg}
                  />
                  <QualityScoreAnalysis
                    parameterData={item.altitude}
                    parameterName="Altitude"
                    Logo={solidsSvg}
                  />
                  <QualityScoreAnalysis
                    parameterData={item.PM2_5}
                    parameterName="Particular Matter (μg/m3)"
                    Logo={solidsSvg}
                  />
                  <QualityScoreAnalysis
                    parameterData={item.NC2_5}
                    parameterName="Number Concentration"
                    Logo={solidsSvg}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
        
        {/* Parameters */}
        <AllParameters/>
      </div>
    </>
  );
}

export default Home;