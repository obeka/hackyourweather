import React, { useState } from 'react';
import './App.css';
import ForecastList from './components/ForecastList';
import SearchBox from './components/SearchBox';
import FiveDayForecast from './components/FiveDayForecast'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  //This is the array of storing the forecast data of the cities entered in the search box.
  const [forecastData, setForecastData] = useState([]);
 
  return (
    <div className="App">
      <h1>Weather App</h1>
      <Router>
        <Switch>
          <Route exact path='/'>
            <SearchBox forecastData={forecastData} setForecastData={setForecastData}/>
            {forecastData.length > 0 ? <ForecastList forecastData={forecastData} setForecastData={setForecastData}/> : <p className='first-line'>Please enter a city name to get the latest forecast.</p>} 
          </Route>
          <Route path='/:cityName' component={FiveDayForecast} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;