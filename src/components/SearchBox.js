import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import './SearchBox.css';

export default function SearchBox({setForecastDatas, forecastDatas}) {
    const [cityName, setCityName] = useState('');
    const [isLoading, setLoading] = useState(false); //loading effect
    const [hasError, setError] = useState({status : false});

    const handleCityName = e => setCityName(e.target.value); 

    const handleSubmit = e => {
        e.preventDefault();
        const duplicateSearch = forecastDatas.some(singleData => singleData.name.toLowerCase() === cityName.toLowerCase()); // prevent user enter the same city entered before
        if(!duplicateSearch) {
            getCity(cityName);
        } else {
            setError({status: true, text: { message :'Duplicate search, please check your terms'}, type: 'duplicate'}); //Client side - Duplicate entry error
        }
    }

    useEffect(() => {
       
        const timer = setTimeout(() => {
            setError({status : false})
        }, 3000);
        return () => clearTimeout(timer);

    },[hasError.status] )

    const getCity = async (cityName) => {
        setLoading(true);
        setError({status: false})
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`);
            const forecast = await response.json();
            if(forecast.cod === 200) {
                setForecastDatas([...forecastDatas, forecast]);
            } else {
                //Client side errors - Improper city name
                setError({status: true, text: forecast, type: 'client'})
            }
            setLoading(false);
        } catch (error) {
            //Server side errors
            setError({status: true, text: error, type: 'server'});
            setLoading(false);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={cityName} onChange={handleCityName} placeholder='Enter a city name...'
                    required />
                <button type='submit'>Get Weather</button>
                {hasError.status && <Alert hasError={hasError} />}
                {/* Loading effect from outer source */}
                <div className="loading">
                    {isLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
                </div>
            </form>
        </>
    )
}
