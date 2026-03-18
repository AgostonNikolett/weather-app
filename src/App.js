import React, { useState } from "react";
import { fetchWeatherData } from "./api";
import "./App.css";

const App = () => {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        if (!query.trim()) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const data = await fetchWeatherData(query);

            if (cities.some((city) => city.id === data.id)) {
                setError("You already searched for this city.");
                setQuery("");
                return;
            }

            setCities((prevCities) => [data, ...prevCities]);
            setQuery("");
        } catch (error) {
            setError(error.message === "city not found" ? "City not found." : "An error occurred. Please try again later.");
        }
    };

    const removeCity = (id) => {
        setCities(cities.filter((city) => city.id !== id));
    };

    return (
        <div className="app-container">
            <header className="top-banner">
                <div className="container">
                    <h1 className="heading">Weather App</h1>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Caută un oraș..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">CAUTĂ</button>
                        {error && <span className="error-msg">{error}</span>}
                    </form>
                </div>
            </header>

            <section className="ajax-section">
                <div className="container">
                    <ul className="cities">
                        {cities.map((city) => (
                            <li key={city.id} className="city-card">
                                <button className="delete-btn" onClick={() => removeCity(city.id)}>×</button>
                                <h2 className="city-name">
                                    <span>{city.name}</span>
                                    <sup>{city.sys.country}</sup>
                                </h2>
                                <div className="city-temp">{Math.round(city.main.temp)}°C</div>
                                <figure>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                        alt={city.weather[0].description}
                                    />
                                    <figcaption>{city.weather[0].description}</figcaption>
                                </figure>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default App;