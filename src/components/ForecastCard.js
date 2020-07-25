import React from 'react';
import './ForecastCard.css';

export default function ForecastCard({singleCity, forecastData, setForecastData}) {
    //Getting datas which we will use to display from a singleData object.
    const {name, weather :[{main, description}], coord : {lon, lat}, main : {temp_min, temp_max}, sys : {country}} = singleCity.response;
    const id = singleCity.id;

    const handleDelete = e => {
        console.log(e.target.id);
        const filteredArr = forecastData.filter(singleCity=> singleCity.id !== e.target.id);
        setForecastData(filteredArr);
    }

    return (
        <div className='card-container'>
            <div className='header'>
                <h2>{name}, {country}</h2>
                <i id={id} onClick={handleDelete} className="far fa-times-circle delete-icon"></i>
            </div>
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
