import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import rain from "../assets/rain.gif"; // Adjust the path if necessary
import sun from "../assets/sun.gif";
import snow from "../assets/snow.gif";

// Reuse bgtype function for determining background image
function bgtype(type) {
  const weatherType = type.toLowerCase();
  if (weatherType.includes("rain")) {
    return rain;
  } else if (weatherType.includes("clear")) {
    return sun;
  } else if (weatherType.includes("snow")) {
    return snow;
  } else {
    return rain; // Fallback to rain or any default image/video
  }
}

export default function WeatherDetails() {
  const { weatherTitle } = useParams(); // Get the weather title from the URL params
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Simulating fetching detailed weather data for this weather type
    // Replace this with your actual API call
    const fetchWeatherData = async () => {
      const data = {
        temperature: 75,
        weatherDescription: "Clear sky",
        visibility: 10,
        date: "2024-09-01",
        feelsLike: 77,
        dewPoint: 65,
        windSpeed: 5,
        windGust: 10,
        pressure: 1012,
        cloudCover: 5,
        solarRadiation: 600,
        uvIndex: 8,
        moonPhase: "Waxing Gibbous",
        sunrise: "6:30 AM",
        sunset: "7:45 PM",
        address: "New York, NY",
      };
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [weatherTitle]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center p-6 bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bgtype(weatherData.weatherDescription)})` }}
    >
      <h1 className="text-5xl font-bold text-white mb-4">{weatherTitle}</h1>
      <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-lg max-w-lg">
        <p className="text-lg mb-2">Temperature: {weatherData.temperature}°F</p>
        <p className="text-lg mb-2">Feels Like: {weatherData.feelsLike}°F</p>
        <p className="text-lg mb-2">Dew Point: {weatherData.dewPoint}°F</p>
        <p className="text-lg mb-2">Visibility: {weatherData.visibility} mi</p>
        <p className="text-lg mb-2">Wind Speed: {weatherData.windSpeed} mph</p>
        <p className="text-lg mb-2">Wind Gust: {weatherData.windGust} mph</p>
        <p className="text-lg mb-2">Pressure: {weatherData.pressure} hPa</p>
        <p className="text-lg mb-2">Cloud Cover: {weatherData.cloudCover}%</p>
        <p className="text-lg mb-2">Solar Radiation: {weatherData.solarRadiation} W/m²</p>
        <p className="text-lg mb-2">UV Index: {weatherData.uvIndex}</p>
        <p className="text-lg mb-2">Moon Phase: {weatherData.moonPhase}</p>
        <p className="text-lg mb-2">Sunrise: {weatherData.sunrise}</p>
        <p className="text-lg mb-2">Sunset: {weatherData.sunset}</p>
        <p className="text-lg mb-2">Address: {weatherData.address}</p>
        <p className="text-lg mt-4">Date: {weatherData.date}</p>
      </div>
    </div>
  );
}
