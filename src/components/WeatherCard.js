import React from 'react';

const WeatherCard = ({ city, onRemove, onSpeak }) => {
    return (
        <li className="city" role="region" aria-label={`Weather card for ${city.name}`}>
            <button
                className="delete-btn"
                onClick={() => onRemove(city.id)}
                aria-label={`Remove ${city.name}`}
            >
                ×
            </button>

            <div className="city-header">
                <button className="speak-btn" onClick={() => onSpeak(city)}>🔊</button>
                <h2 className="city-name">
                    <span>{city.name}</span>
                    <sup>{city.sys.country}</sup>
                </h2>
            </div>

            <div className="city-temp">
                {Math.round(city.main.temp)}<sup>°C</sup>
            </div>

            <figure>
                <img
                    className="city-icon"
                    src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                    alt={city.weather[0].description}
                />
                <figcaption>{city.weather[0].description}</figcaption>
            </figure>
        </li>
    );
};

export default WeatherCard;