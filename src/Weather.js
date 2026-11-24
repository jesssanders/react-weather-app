import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  function onSubmit(event) {
    console.log("City", city);
    // on submit of the search form, prevent default, show loading text, get info from weather API, run setWeatherFromAPIResponse function.
    event.preventDefault();
    runSearch();
  }

  function runSearch() {
    setIsLoading(true);
    let apiKey = "36a020bd802233oee28f5e56a4tb2a2d";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(setWeatherFromAPIResponse);
  }

  function setWeatherFromAPIResponse(response) {
    // Sets weather state based on response from API. If API response is city not found, then show that instead.
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
        feelsLike: response.data.temperature.feels_like,
        description: response.data.condition.description,
        humidity: response.data.temperature.humidity,
        wind: response.data.wind.speed,
        icon: response.data.condition.icon,
      });
    }
    setIsLoading(false);
  }

  // runs search on the first load of the page
  useEffect(() => {
    runSearch();
  }, []);

  return (
    <div>
      {/* Always show form */}
      <form onSubmit={onSubmit} className="searchForm">
        <input
          type="search"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="searchInput"
          autoFocus="on"
        />
        <input type="submit" value="Search 🔍" className="searchButton" />
      </form>
      {/* If form is loading, show loading text */}
      {isLoading ? (
        <div className="weather">Loading weather... </div>
      ) : (
        // If form is not loading, weather is set, and error is NOT set, then display weather
        <div>
          {weather && !error ? (
            <div className="weather">
              <WeatherInfo data={weather} />
            </div>
          ) : (
            // otherwise, display the error
            <div className="weather">{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
