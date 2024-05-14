import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BigPlotlyCharts from './plotly-charts'
import PlotlyCharts from './plotly-charts-small'

function AllParameters() {
  const [selectedAnalysis, setSelectedAnalysis] = useState('All');
  const [filterOption, setFilterOption] = useState('Hour');

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const handleAnalysisChange = (e) => {
    setSelectedAnalysis(e.target.value);
  };

  const handleViewClick = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const getParameter = (selectedAnalysis) => {
    switch (selectedAnalysis) {
      case 'Air Quality Index':
        return { parameter: 'AQI', predParam: 'aqi' };
      case 'Temperature':
        return { parameter: 'temperature', predParam: 'temp' };
      case 'Pressure':
        return { parameter: 'pressure', predParam: 'pressure' };
      case 'Humidity':
        return { parameter: 'humidity', predParam: 'humid' };
      case 'Gas':
        return { parameter: 'gas', predParam: 'gas' };
        case 'Altitude':
          return { parameter: 'altitude', predParam: 'altitude' };
      case 'Particular Matter':
        return { parameter: 'PM2_5', predParam: 'pm' };
      case 'Number Concentration':
        return { parameter: 'NC2_5', predParam: 'nc' };
      default:
        return { parameter: '', predParam: '' };
    }
  };  

  const { parameter, predParam } = getParameter(selectedAnalysis);

  return (
    <div className='analysis-header'>
      <div className='flex-header'>
        {/* Dropdown for selecting time range */}
        <div className='header-inputs'>
          <span>Filter by: </span>
          <select onChange={handleFilterChange} value={filterOption}>
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>

        {/* Dropdown for selecting analysis type */}
        <div className='header-inputs'>
          <select onChange={handleAnalysisChange} value={selectedAnalysis}>
            <option value="All">All</option>
            <option value="Air Quality Index">Air Quality Index</option>
            <option value="Temperature">Temperature</option>
            <option value="Pressure">Pressure</option>
            <option value="Humidity">Humidity</option>
            <option value="Gas">Gas</option>
            <option value="Altitude">Altitude</option>
            <option value="Particular Matter">Paticular Matter</option>
            <option value="Number Concentration">Number Concentration</option>
          </select>
        </div>
      </div>

      {/* Conditional rendering based on selected analysis type */}
      {selectedAnalysis !== 'All' ? (
        <div className='whole-data-analyze'>
          <p>
            {selectedAnalysis} filtered by <span>{filterOption}</span>
          </p>
          <div className='graph'>
            <BigPlotlyCharts
              parameter={parameter}
              predParam={predParam}
              parameterName={selectedAnalysis}
              filterOption={filterOption}
              className="plot-chart"
            />
          </div>
        </div>
      ) : (
        <div className='data-analysis'>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Air Quality Index</h1>
                <Link onClick={() => handleViewClick('Air Quality Index')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="AQI"
                    predParam="aqi"
                    parameterName = "Air Quality Index"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Temperature</h1>
                <Link onClick={() => handleViewClick('Temperature')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="temperature"
                    predParam="temp"
                    parameterName = "Temperature"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Pressure</h1>
                <Link onClick={() => handleViewClick('Pressure')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="pressure"
                    predParam="pressure"
                    parameterName = "Pressure"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Humidity</h1>
                <Link onClick={() => handleViewClick('Humidity')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="humidity"
                    predParam="humid"
                    parameterName = "Humidity"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Gas</h1>
                <Link onClick={() => handleViewClick('Gas')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="gas"
                    predParam="gas"
                    parameterName = "Gas"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Altitude</h1>
                <Link onClick={() => handleViewClick('Altitude')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="altitude"
                    predParam="altitude"
                    parameterName = "Altitude"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Particular Matter</h1>
                <Link onClick={() => handleViewClick('Particular Matter')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="PM2_5"
                    predParam="pm"
                    parameterName = "Particular Matter"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='analysis-item'>
            <div className='custom-analysis'>
              <div className='home-map-flex'>
                <h1>Number Concentration</h1>
                <Link onClick={() => handleViewClick('Number Concentration')}>View →</Link>
              </div>
              <div className='graph'>
                <div className='plotly-chart'>
                  <PlotlyCharts 
                    parameter="NC2_5"
                    predParam="nc"
                    parameterName = "Number Concentration"
                    filterOption={filterOption} 
                    className="plot-chart" 
                  />
                </div>
              </div>
            </div>
          </div>
          {/* analysis items end */}
        </div>
      )}
    </div>
  );
};

export default AllParameters;
