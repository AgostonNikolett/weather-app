import React, { useState } from "react";
import { fetchWeatherData } from "./api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
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
                return;
            }

            setCities( [data, ...cities]);
            setQuery("");
        } catch (error) {
            setError(error.message === "city not found" ? "City not found." : "An error occurred. Please try again later.");
        }
    };

    const removeCity = (id) => {
        setCities(cities.filter((city) => city.id !== id));
    };

    const speakWeather = (city) => {
        const text = `${city.name}, ${Math.round(city.main.temp)} degrees, ${city.weather[0].description}`;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    };

    return (
        <div className="app-wrapper">
            <section className="top-banner">
                <div className="container">
                    <h1 className="heading">Weather App</h1>
                    <SearchBar
                        query={query}
                        setQuery={setQuery}
                        onSearch={handleSearch}
                    />
                    <ErrorMessage message={error} />
                </div>
            </section>

            <section className="ajax-section">
                <div className="container">
                    <ul className="cities">
                        {cities.map((city) => (
                            <WeatherCard
                                key={city.id}
                                city={city}
                                onRemove={removeCity}
                                onSpeak={speakWeather}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default App;