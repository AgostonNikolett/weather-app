import React from 'react';

const Forecast = ({ forecastData }) => {
    return (
        <div className="forecast-container">
            {forecastData.map((item, index) => {
                const date = new Date(item.dt * 1000).toLocaleDateString('ro-RO', { weekday: 'short' });
                return (
                    <div key={index} className="forecast-item">
                        <p className="forecast-date">{date}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description}
                        />
                        <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Forecast;