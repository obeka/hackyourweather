import React, { useState } from 'react';
import './App.css';
import ForecastList from './components/ForecastList';
import SearchBox from './components/SearchBox';


function App() {
  //This is the array of storing the forecast datas of the cities entered in the search box.
  const [forecastDatas, setForecastDatas] = useState([]);
 
  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBox forecastDatas={forecastDatas} setForecastDatas={setForecastDatas} />
      {forecastDatas.length > 0 ? <ForecastList forecastData={forecastDatas}/> : <p className='first-line'>Please enter a city name to get the latest forecast.</p>}
    </div>
  );
}

export default App;