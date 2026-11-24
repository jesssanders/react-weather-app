import Weather from "./Weather";
import "./App.css";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="App">
      <div className="Container">
        <Weather defaultCity="Canberra" />
        <Footer />
      </div>
    </div>
  );
}
