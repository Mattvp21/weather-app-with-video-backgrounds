import React from 'react';


function WeatherData({weatherData, open}) {
    return (
        <div className='weather-data' style={{visibility: open ? 'visible' : 'hidden'}}>
        
            <h1 className='weather-data__heading'>Weather Data for {weatherData.name}</h1>
           
            <div className='content'>
                <div className='content-group'>
                    <div className='content-group__data'>
                        <h2>TEMP</h2>
                        <p>{weatherData.main.temp}</p>
                    </div>
                    <div className='content-group__data'>
                        <h2>FEELS LIKE</h2>
                        <p>{weatherData.main.feels_like}</p>
                    </div>
                    <div className='content-group__data'>
                        <h2>SKY</h2>
                        <p>{weatherData.weather[0].description}</p>
                    </div>
                </div>
                <div className='content-group'>
                <div className='content-group__data'>
                        <h2>MIN</h2>
                        <p>{weatherData.main.temp_min}</p>
                    </div>
                    <div className='content-group__data'>
                        <h2>MAX</h2>
                        <p>{weatherData.main.temp_max}</p>
                    </div>
                    <div className='content-group__data'>
                        <h2>HUMDITY</h2>
                        <p>{weatherData.main.humidity}%</p>
                    </div>
                </div>
                <div className='content-group'>
                <div className='content-group__data'>
                        <h2>WIND SPEED</h2>
                        <p>{weatherData.wind.speed}MPH</p>
                    </div>
                    <div className='content-group__data'>
                        <h2>GUST</h2>
                        <p>{weatherData.wind.gust}MPH</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default WeatherData;