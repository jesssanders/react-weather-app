import Weather from "./Weather";
import "./App.css";

export default function App() {
  return (
    <div className="Container">
      <h1>Weather App</h1>
      <Weather />
      <footer
        style={{ fontSize: "12px", fontStyle: "italic", marginTop: "20px" }}
      >
        This project is on{" "}
        <a href="https://github.com/jesssanders/react-weather-app">GitHub</a>,
        hosted by{" "}
        <a href="https://jsanders-react-weather-app.netlify.app/">Netlify</a>,
        and coded by <a href="https://github.com/jesssanders">Jess Sanders</a>.
      </footer>
    </div>
  );
}
