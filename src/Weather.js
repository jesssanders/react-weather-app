import React, { useState } from "react";
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
    setError("");
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
        setError("City not found. Try searching for a different city.");
        setIsLoading(false);
      }
      if (response.data.status === 400) {
        setError("Bad request. Try searching for a different city.");
        setIsLoading(false);
      }
    } else {
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

  return (
    <div>
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
      {/* if form is loading, show loading screen */}
      {isLoading && <div className="weather">Loading...</div>}
      {/* if form has set weather, and is not loading, and doesnt have an error, show weather */}
      {weather && !isLoading && !error && (
        <div className="weather">
          <WeatherInfo data={weather} />
        </div>
      )}
      {/* if form has an error, show error */}
      {error && <div className="weather">{error}</div>}
      {/* if weather not set, and form is not loading, run search (on first load) */}
      {!weather && !isLoading && runSearch()}
    </div>
  );
}
