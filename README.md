# Weather App 🌦️

A modern web application for checking real-time weather conditions, built with **React**. Users can search for cities, view a 5-day forecast, and interact with the app using voice commands.

## 🛠️ Tech Stack
* **React** (User Interface & Logic)
* **OpenWeatherMap API** (Real-time weather data)
* **CSS3** (Responsive design & dynamic backgrounds)
* **Web Speech API** (Text-to-Speech & Voice Recognition features)
* **LocalStorage** (Data persistence across sessions)

## 📖 Features
* **City Search**: Displays temperature, country code, weather conditions, and high-resolution icons.
* **5-Day Forecast**: Visualizes temperature trends for the upcoming days (filtered for 12:00 PM intervals).
* **Dynamic Backgrounds**: The app's background color automatically shifts based on the weather condition of the first city in your list.
* **Accessibility Options**:
    * Dedicated **Accessibility Mode** toggle.
    * **Text-to-Speech**: The app can read weather data aloud.
    * **Voice Input**: Search for cities using voice commands (🎤).
* **Persistence**: Your searched cities remain saved even after refreshing the page.

## 🧠 Key Learnings & Refactoring
During the development of this project, I focused on:
* **Component-Based Architecture**: Breaking down the code into logical units such as `SearchBar`, `WeatherCard`, `Forecast`, and `ErrorMessage`.
* **Error Handling**: Managing cases where a city is not found or network issues occur.
* **Security**: Moving the API key to environment variables (`.env`) to protect sensitive data.
* **Clean Code**: Removing redundant files and organizing global styles within `index.css`.

## 🏁 How to Run Locally
1. Clone the repository: git clone https://github.com/AgostonNikolett/weather-app.git
2. Install dependencies: npm install
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key: `REACT_APP_WEATHER_API_KEY=YOUR_API_KEY`
4. Start the app: npm start