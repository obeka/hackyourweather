import React, { useState,useEffect } from 'react';
import { useHistory, useParams }  from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './FiveDayForecast.css'

function FiveDayForecast() {
    const {cityName} = useParams();
    const history= useHistory();
    const [fiveDaysData, setFiveDaysData] = useState([]);
    useEffect(() => {
        const fetchFiveDaysAPI = async() => {
            try {
                const rawResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`);
                const response = await rawResponse.json(); 
                //console.log(response.list);
                const modifiedData = response.list.map(item => (
                    {
                        date: new Date(item.dt_txt).toLocaleString(),
                        temp: item.main.temp,
                    }
                ));
                setFiveDaysData(modifiedData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFiveDaysAPI();
    }, [])

    const renderLineChart = (
        <LineChart width={1000} height={400} data={fiveDaysData} style={{margin: '50px auto'}}>
            <Line type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8"/>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
);

    return (
        <div>
            <h2>{cityName} - 5 Days Forecast</h2>
            {renderLineChart}
            <button className='btn btn-primary mb-3 back-btn' onClick={() => history.goBack()}>Go Back</button>
        </div>
    )
}

export default FiveDayForecast
