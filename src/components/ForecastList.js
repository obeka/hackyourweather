import React from 'react';
import ForecastCard from './ForecastCard';
import './ForecastList.css'

export default function ForecastList({forecastData}) {
    
    return (
        <div className='container'>
            {forecastData.map((singleData,index) => <ForecastCard key={index}  singleData={singleData}/>).reverse()} {/* with reverse method, user can see the last entry */} 
        </div>
    )
}
