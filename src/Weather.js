import React, { useState } from "react";
import axios from "axios";
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

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let apiKey = "36a020bd802233oee28f5e56a4tb2a2d";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response) {
    console.log("response", response);
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

  let form = (
    <form onSubmit={onSubmit}>
      <input
        type="search"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input type="submit" value="Search 🔍" />
    </form>
  );

  return (
    <div>
      {form}
      {isLoading ? (
        <div>Loading weather... </div>
      ) : (
        <div>
          {weather && !error ? (
            <div>
              <h2>
                {weather.city}, {weather.country}
              </h2>
              <ul>
                <li>Temperature: {Math.round(weather.temperature)}°C</li>
                <li>Description: {weather.description}</li>
                <li>Humidity: {weather.humidity}%</li>
                <li>Wind: {Math.round(weather.wind)}km/h</li>
                <li>{weatherIcon}</li>
              </ul>
            </div>
          ) : (
            <div>{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
