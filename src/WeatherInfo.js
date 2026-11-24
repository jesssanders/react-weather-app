import React from "react";
import { FormattedDate, FormattedTime } from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";

export default function WeatherInfo(props) {
  const today = new Date();
  return (
    <div>
      <div className="locationTimeHeader">
        <span>
          <div className="cityLocation">{props.data.city}</div>
          <div className="countryLocation">{props.data.country}</div>
        </span>
        <span>
          <FormattedDate date={today} />
          <FormattedTime date={today} />
        </span>
      </div>
      <hr style={{ margin: "10px" }} />

      <div className="forecastContainer">
        <div className="currentTempContainer">
          <div className="tempAndIcon">
            <div className="weather-icon">
              <WeatherIcon code={props.data.icon} size={50} />
            </div>
            <div className="temperature">
              {Math.round(props.data.temperature)}°
              <span className="unit">C</span>
            </div>
          </div>
          <div className="weatherDescription">{props.data.description}</div>
        </div>
        <div className="weatherDetailContainer">
          <div className="weatherDetailContent">
            <span className="weatherDetailLabel">💨 Wind:</span>
            <span className="weatherDetailValue">{props.data.wind}km/h</span>
          </div>
          <div className="weatherDetailContent">
            <span className="weatherDetailLabel">💧 Humidity:</span>
            <span className="weatherDetailValue">{props.data.humidity}%</span>
          </div>
          <div className="weatherDetailContent">
            <span className="weatherDetailLabel">🌡️ Feels Like:</span>
            <span className="weatherDetailValue">
              {Math.round(props.data.feelsLike)}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
