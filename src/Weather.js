import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloudy,
  CloudRain,
  CloudSunRain,
  CloudMoonRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from "lucide-react";

export default function Weather() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState({
    date: null,
    day: null,
    month: null,
    hour: null,
    minute: null,
    ampm: null,
  });

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let apiKey = "36a020bd802233oee28f5e56a4tb2a2d";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response) {
    console.log("response", response);
    formatDate();
    if (response.data.status) {
      if (response.data.status === "not_found") {
        setError("City not found.");
        setIsLoading(false);
      }
    } else {
      setError("");
      setWeather({
        city: response.data.city,
        country: response.data.country,
        temperature: response.data.temperature.current,
        feelsLike: response.data.temperature.feels_like,
        description: response.data.condition.description,
        humidity: response.data.temperature.humidity,
        wind: response.data.wind.speed,
        icon: response.data.condition.icon,
      });
    }
    setIsLoading(false);
  }

  // the SheCodes API image URLs dont seem to work anymore.
  let weatherIcon = <></>;
  if (weather) {
    switch (weather.icon) {
      case "clear-sky-day":
        weatherIcon = <Sun />;
        break;
      case "clear-sky-night":
        weatherIcon = <Moon />;
        break;
      case "few-clouds-day":
        weatherIcon = <CloudSun />;
        break;
      case "few-clouds-night":
        weatherIcon = <CloudMoon />;
        break;
      case "scattered-clouds-day":
      case "broken-clouds-day":
        weatherIcon = <Cloudy />;
        break;
      case "scattered-clouds-night":
      case "broken-clouds-night":
        weatherIcon = <CloudMoon />;
        break;
      case "shower-rain-day":
      case "shower-rain-night":
        weatherIcon = <CloudRain />;
        break;
      case "rain-day":
        weatherIcon = <CloudSunRain />;
        break;
      case "rain-night":
        weatherIcon = <CloudMoonRain />;
        break;
      case "thunderstorm-day":
      case "thunderstorm-night":
        weatherIcon = <CloudLightning />;
        break;
      case "snow-day":
      case "snow-night":
        weatherIcon = <CloudSnow />;
        break;
      case "mist-day":
      case "mist-night":
        weatherIcon = <CloudFog />;
        break;
      default:
        weatherIcon = <></>;
    }
  }

  function formatDate() {
    const now = new Date();
    let currentDay = now.getDay();
    let currentDate = now.getDate();
    let currentMonth = now.getMonth();
    let currentHour = now.getHours();
    let currentMinutes = now.getMinutes();

    console.log(
      "day",
      currentDay,
      "date",
      currentDate,
      "month",
      currentMonth,
      "hour",
      currentHour,
      "minutes",
      currentMinutes
    );

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[currentDay];
    let date = currentDate;
    let month = months[currentMonth];

    let formattedMinutes =
      currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    let minute = formattedMinutes;

    let hour = "";
    let ampm = "";
    if (currentHour > 12) {
      let hours12 = currentHour % 12;
      console.log("hours 12", hours12);
      hour = hours12;
      ampm = "pm";
    } else if (currentHour === 12) {
      hour = currentHour;
      ampm = "pm";
    } else {
      currentHour = currentHour === 0 ? 12 : currentHour;
      hour = currentHour;
      ampm = "am";
    }
    setDate({ day, date, month, hour, minute, ampm });
  }

  let form = (
    <form onSubmit={onSubmit} className="searchForm">
      <input
        type="search"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchInput"
      />
      <input type="submit" value="Search 🔍" className="searchButton" />
    </form>
  );

  return (
    <div>
      {form}
      {isLoading ? (
        <div className="Weather">Loading weather... </div>
      ) : (
        <div>
          {weather && !error ? (
            <div className="Weather">
              <div className="day-and-time">
                <span>{date.day}</span> <span>{date.date}</span>{" "}
                <span>{date.month}</span>, <span>{date.hour}</span>:
                <span>{date.minute}</span>
                <span>{date.ampm}</span>
              </div>
              <div class="main-grid">
                <div>
                  <div className="city">{weather.city}</div>
                  <div className="country">{weather.country}</div>
                </div>
                <div>
                  <div class="current-weather">
                    <div className="weather-icon">{weatherIcon}</div>
                    <div className="temperature">
                      {Math.round(weather.temperature)}°C
                    </div>
                  </div>
                  <div class="current-status">
                    <span>{weather.description}</span>
                    <span>, feels like {Math.round(weather.feelsLike)}°C</span>
                  </div>
                </div>
              </div>

              <div>
                <span>💧 Humidity: {weather.humidity}%</span>{" "}
                <span>💨 Wind: {Math.round(weather.wind)}km/h</span>
              </div>
            </div>
          ) : (
            <div className="Weather">{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
