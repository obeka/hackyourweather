import React from 'react';
import './ForecastCard.css';

export default function ForecastCard({singleData}) {
    //Getting datas which we will use to display from a singleData object.
    const {name, weather :[{main, description}], coord : {lon, lat}, main : {temp_min, temp_max}, sys : {country} ,id } = singleData;

    return (
        <div className='card-container' key={id}>
            <h2>{name}, {country}</h2>
            <div className="description">
                <h3>{main}</h3>
                <p>{description}</p>
            </div>
            
            <p><span>min. temp</span> <span>: {(temp_min - 273.15).toFixed(2)} &#x2103;</span></p>
            <p><span>max. temp</span> <span>: {(temp_max - 273.15).toFixed(2)} &#x2103;</span></p>
            <p><span>location</span> <span>: {lat}, {lon}</span></p>
        </div>
    )
}
