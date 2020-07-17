import React, { useState, useEffect } from 'react';
import './SearchBox.css'

export default function SearchBox({setForecastDatas, forecastDatas, setError}) {
    const [cityName, setCityName] = useState('');
    const [isLoading, setLoading] = useState(false); //loading effect
    const [countSearch, setCountSearch] = useState(0); //for useEffect

    const handleCityName = e => setCityName(e.target.value); 

    const handleSubmit = e => {
        e.preventDefault();
        const duplicateSearch = forecastDatas.some(singleData => singleData.name.toLowerCase() === cityName.toLowerCase()); // prevent user enter the same city entered before
        if(!duplicateSearch) {
            setCountSearch(countSearch + 1);
        } else {
                setError({status: true, text: { message :'Duplicate search, please check your terms'}, type: 'duplicate'}); //Client side - Duplicate entry error
        }
    }

    useEffect(() => {
        if(countSearch !== 0) {
            getCity(cityName);  
            setCityName('');
        }
    }, [countSearch])

    const getCity = async (cityName) => {
        setLoading(true);
        setError({status: false})
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d8ec6deb36ba75a65cc1bd04f63a3163`);
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
                {/* Loading effect from outer source */}
                <div className="loading">
                    {isLoading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
                </div>
            </form>
        </>
    )
}
