import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import Alert from './Alert';
import { v4 as uuidv4 } from 'uuid';

export default function SearchBox({setForecastData, forecastData}) {
    const [cityName, setCityName] = useState('');
    const [isLoading, setLoading] = useState(false); //loading effect
    const [hasError, setError] = useState({status : false});

    const handleCityName = e => setCityName(e.target.value); 

    const handleSubmit = e => {
        e.preventDefault();
        const duplicateSearch = forecastData.some(singleCity => singleCity.response.name.toLowerCase() === cityName.toLowerCase()); // prevent user enter the same city entered before
        if(!duplicateSearch) {
            getCity(cityName);
        } else {
                setError({status: true, text: { message :'Duplicate search, please check your terms'}, type: 'duplicate'}); //Client side - Duplicate entry error
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError({status: false})
        }, 3000);
        return () => clearTimeout(timer)
    }, [hasError.status])

    const getCity = async (cityName) => {
        setLoading(true);
        setError({status: false})
        try {
            const rawResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
            const response = await rawResponse.json();
            if(response.cod === 200) {
                const forecast = { response, id: uuidv4()};
                setForecastData([...forecastData, forecast]);
                setCityName('')
            } else {
                //Client side errors - Improper city name
                setError({status: true, text: response, type: 'client'})
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
                    required className={hasError.type === 'client' ? 'input-danger' : hasError.type ==='duplicate' ? 'input-duplicate' : ''}/>
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
