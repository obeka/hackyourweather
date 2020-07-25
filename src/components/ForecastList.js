import React from 'react';
import ForecastCard from './ForecastCard';
import './ForecastList.css';

export default function ForecastList({forecastData, setForecastData}) {

    return (
        <div className='container'>
            {forecastData.map(singleCity => <ForecastCard key={singleCity.id} setForecastData={setForecastData}  singleCity={singleCity} forecastData={forecastData}/>).reverse()} {/* with reverse method, user can see the last entry */}  
        </div>
    )
}
