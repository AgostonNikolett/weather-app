import axios from "axios";

const API_KEY = "819586e9540167f4481149219cf836d2";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
