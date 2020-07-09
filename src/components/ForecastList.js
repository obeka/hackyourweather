import React from 'react';
import ForecastCard from './ForecastCard';
import './ForecastList.css'

export default function ForecastList({forecastData}) {
    
    return (
        <div className='container'>
            {forecastData.map(singleData => <ForecastCard  singleData={singleData}/>)}   
        </div>
    )
}
