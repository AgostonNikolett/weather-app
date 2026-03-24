const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch weather data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};

export const fetchForecastData = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch weather data");
        }

        const data = await response.json();
        const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        return dailyData;
    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};