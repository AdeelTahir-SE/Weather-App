import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import rain from "../assets/rain.mp4"; // Adjust the path if necessary
import sun from "../assets/clear.mp4";
import snow from "../assets/snow.mp4";
import cloud from "../assets/cloud.mp4";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

// Reuse bgtype function for determining background image
function bgtype(type) {
  const weatherType = type.toLowerCase();
  if (weatherType.includes("rain")) {
    return rain;
  } else if (weatherType.includes("clear")) {
    return sun;
  } else if (weatherType.includes("snow")) {
    return snow;
  } else if (weatherType.includes("cloud")) {
    return cloud;
  } else {
    return rain;
  }
}

export default function WeatherDetails() {
  const { city, date } = useParams(); // Get the weather title from the URL params
  const [weatherData, setWeatherData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Fetching detailed weather data
    const fetchDayData = async () => {
      const dayData = await fetch(`http://localhost:3000/api/alldataofday/${city}/${date}`);
      const parsedResponse = await dayData.json();
      setWeatherData(parsedResponse);
    };
    fetchDayData();
  }, [city, date]);

  if (!weatherData) {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-800 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center p-6 bg-cover bg-center h-auto min-h-screen">
      <video
        autoPlay
        key={bgtype(weatherData.conditions)}
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bgtype(weatherData.conditions)} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col justify-center items-center p-6 bg-gray-900 text-white w-full sm:w-1/3">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{city}</h1>
            <p className="text-lg sm:text-xl mb-2">{weatherData.datetime}</p>
            <p className="text-sm sm:text-lg">{weatherData.conditions}</p>
          </div>
          <div className="p-6 w-full sm:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-sm sm:text-lg">Temperature: {weatherData.temp}°F</p>
              <p className="text-sm sm:text-lg">Max Temperature: {weatherData.tempmax}°F</p>
              <p className="text-sm sm:text-lg">Min Temperature: {weatherData.tempmin}°F</p>
              <p className="text-sm sm:text-lg">Feels Like: {weatherData.feelslike}°F</p>
              <p className="text-sm sm:text-lg">Dew Point: {weatherData.dew}°F</p>
              <p className="text-sm sm:text-lg">Humidity: {weatherData.humidity}%</p>
              <p className="text-sm sm:text-lg">Precipitation: {weatherData.precip} in</p>
              <p className="text-sm sm:text-lg">Wind Speed: {weatherData.windspeed} mph</p>
              <p className="text-sm sm:text-lg">Wind Gust: {weatherData.windgust} mph</p>
              <p className="text-sm sm:text-lg">Pressure: {weatherData.pressure} hPa</p>
              <p className="text-sm sm:text-lg">Cloud Cover: {weatherData.cloudcover}%</p>
              <p className="text-sm sm:text-lg">Visibility: {weatherData.visibility} mi</p>
              <p className="text-sm sm:text-lg">Solar Radiation: {weatherData.solarradiation} W/m²</p>
              <p className="text-sm sm:text-lg">UV Index: {weatherData.uvindex}</p>
              <p className="text-sm sm:text-lg">Sunrise: {weatherData.sunrise}</p>
              <p className="text-sm sm:text-lg">Sunset: {weatherData.sunset}</p>
              <p className="text-sm sm:text-lg">Moon Phase: {weatherData.moonphase}</p>
              {weatherData.stations && (
                <p className="text-sm sm:text-lg">Stations: {weatherData.stations.join(", ")}</p>
              )}
              <p className="text-sm sm:text-lg">Source: {weatherData.source}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-600 underline flex items-center justify-center w-full"
              >
                {showMore ? (
                  <>
                    Show Less
                    <ChevronUpIcon className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Show More
                    <ChevronDownIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
              {showMore && (
                <div className="mt-4 max-h-80 overflow-y-auto">
                  {weatherData.hours.map((hour, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-lg mb-2">
                      <p className="text-sm sm:text-md">Hour: {hour.datetime}</p>
                      <p className="text-sm sm:text-md">Temp: {hour.temp}°F</p>
                      <p className="text-sm sm:text-md">Conditions: {hour.conditions}</p>
                      <p className="text-sm sm:text-md">Humidity: {hour.humidity}%</p>
                      <p className="text-sm sm:text-md">Precipitation: {hour.precip} in</p>
                      <p className="text-sm sm:text-md">Wind Speed: {hour.windspeed} mph</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
