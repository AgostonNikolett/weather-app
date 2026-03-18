import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./api";

const WeatherApp = () => {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [msg, setMsg] = useState("");
    const [accessibleMode, setAccessibleMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (!query) {
            setMsg("Please enter a city name.");
            return;
        }

        try {
            const data = await fetchWeatherData(query);

            if (!data) {
                setMsg("City not found.");
                return;
            }

            if (cities.some((item) => item.id === data.id)) {
                setMsg("You already searched for this city.");
                setQuery("");
                return;
            }

            setCities([data, ...cities]);
            setQuery("");
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setMsg("An error occurred while fetching weather data. Please try again later.");
        }
    };

    const removeCity = (id, name) => {
        setCities(cities.filter((c) => c.id !== id));
    };

    const speakWeather = (cityData) => {
        if (!cityData) return;

        const text = `${cityData.name}, ${cityData.sys.country}.
            Temperature ${Math.round(cityData.main.temp)} degrees Celsius.
            Condition: ${cityData.weather[0].description}.`;

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
    };

    const startVoiceInput = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition API is not supported by your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;
            setQuery(voiceText);
        };
    };

    return (
        <div className={accessibleMode ? "accessible-mode" : ""}>

            {/* Accessibility toggle */}
            <button
                className="accessibility-toggle"
                onClick={() => setAccessibleMode(!accessibleMode)}
                aria-pressed={accessibleMode}
                aria-label="Toggle accessible mode"
            >
                {accessibleMode ? "Disable Accessibility" : "Enable Accessibility"}
            </button>

            <section className="top-banner">
                <div className="container">
                    <h1 className="heading" aria-label="Weather Application heading">
                        Weather App
                    </h1>

                    <form onSubmit={handleSubmit} aria-label="Search city form">
                        <input
                            type="text"
                            placeholder="Search for a city"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="City name input field"
                            aria-describedby="form-message"
                        />

                        <button
                            type="submit"
                            aria-label="Submit city search"
                        >
                            SUBMIT
                        </button>

                        <button
                            type="button"
                            className="voice-btn"
                            onClick={startVoiceInput}
                            aria-label="Start voice input search"
                        >
                            🎤
                        </button>

                        <span
                            id="form-message"
                            className="msg"
                            aria-live="polite"
                        >
                            {msg}
                        </span>
                    </form>
                </div>
            </section>

            <section className="ajax-section" aria-label="Searched cities list section">
                <div className="container">
                    <ul className="cities" role="list">
                        {cities.map((city) => (
                            <li
                                className="city"
                                key={city.id}
                                role="region"
                                aria-label={`Weather card for ${city.name}`}
                            >
                                {/* Delete button */}
                                <button
                                    className="delete-btn"
                                    onClick={() => removeCity(city.id, city.name)}
                                    aria-label={`Remove ${city.name} from list`}
                                >
                                    ×
                                </button>

                                <div className="city-header">
                                    <button
                                        className="speak-btn"
                                        onClick={() => speakWeather(city)}
                                        aria-label={`Read weather information aloud for ${city.name}`}
                                    >
                                        🔊
                                    </button>

                                    <h2
                                        className="city-name"
                                        aria-label={`City: ${city.name}, Country: ${city.sys.country}`}
                                    >
                                        <span>{city.name}</span>
                                        <sup>{city.sys.country}</sup>
                                    </h2>
                                </div>

                                <div
                                    className="city-temp"
                                    aria-label={`Temperature: ${Math.round(city.main.temp)} degrees Celsius`}
                                >
                                    {Math.round(city.main.temp)}
                                    <sup aria-hidden="true">°C</sup>
                                </div>

                                <img
                                    className="city-icon"
                                    src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                    alt={city.weather[0].description}
                                />

                                <figcaption aria-label={`Weather condition: ${city.weather[0].description}`}>
                                    {city.weather[0].description}
                                </figcaption>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default WeatherApp;
