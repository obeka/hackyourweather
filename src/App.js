import React from 'react';
import './App.css';
import forecastData from './city-weather.json'
import ForecastList from './components/ForecastList'

function App() {

  return (
    <div className="App">
     <ForecastList forecastData={forecastData}/>
    </div>
  );
}

export default App;
