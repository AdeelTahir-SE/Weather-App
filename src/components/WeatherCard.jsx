import { Link } from "react-router-dom";
import rain from "../assets/rain.gif"; // Adjust the path if necessary
import sun from "../assets/sun.gif"
import snow from "../assets/snow.gif"
import cloud from "../assets/cloud.gif"
function bgtype(type) {
  const weatherType = type.toLowerCase();
  if (weatherType.includes("rain")) {
    return rain;
  } else if (weatherType.includes("clear")) {
    return sun;
  } else if (
    weatherType.includes("cloud") ||
    weatherType.includes("overcast")
  ) {
    return cloud;
  } else if (weatherType.includes("snow")) {
    return snow;
  } else {
    return rain; // Fallback to rain or any default video
  }
}
export default function WeatherCard({
  weatherImage,
  weatherTitle,
  temperature,
  weatherDescription,
  icon,
  visibility,
  date,
  feelsLike,
  dewPoint,
  windSpeed,
  windGust,
  pressure,
  cloudCover,
  solarRadiation,
  uvIndex,
  moonPhase,
  sunrise,
  sunset,
  address
}) {
  return (
    <Link to={`/weather/${weatherTitle}`}>
      <div className="p-3 h-auto max-w-3xl flex flex-row justify-around items-center m-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-600 cursor-pointer rounded-lg shadow-lg">
        <div className="flex flex-col justify-between items-center ">
          <h1 className="text-3xl font-sans font-bold">{weatherTitle}</h1>
          <p className="text-sm p-1">{weatherDescription}</p>
          <p className="mt-2 text-sm ">{date}</p>
        </div>
        <div className="flex flex-col items-center justify-around p-4 text-white">
          <div className="flex flex-row items-center justify-around p-1 text-white">
            <h3 className="text-lg p-1 ml-1 text-stone-950">Temperature: {temperature}°F</h3>
            <h3 className="text-sm p-1">Feels Like: {feelsLike}°F</h3>
          </div>

          <div className="flex flex-row items-center justify-around p-1 text-white">
            <h3 className="text-sm p-1">Dew Point: {dewPoint}°F</h3>
            <h3 className="text-sm p-1">Visibility: {visibility} mi</h3>
          </div>

          <div className="flex flex-row items-center justify-around p-1 text-white">
            <h3 className="text-sm p-1">Wind Speed: {windSpeed} mph</h3>
            <h3 className="text-sm p-1">Wind Gust: {windGust} mph</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around p-4 text-white">
          <div className="flex flex-row items-center justify-around p-1 text-white">
            <h3 className="text-sm p-1">Pressure: {pressure} hPa</h3>
            <h3 className="text-sm p-1">Cloud Cover: {cloudCover}%</h3>
          </div>

          <div className="flex flex-row items-center justify-around p-1 text-white">
            <h3 className="text-sm p-1">Solar Radiation: {solarRadiation} W/m²</h3>
            <h3 className="text-sm p-1">UV Index: {uvIndex}</h3>
          </div>

          <div className="flex flex-row items-center justify-around p-1 text-white">
            <h3 className="text-sm p-1">Moon Phase: {moonPhase}</h3>
            <h3 className="text-sm p-1">Sunrise: {sunrise}</h3>
            <h3 className="text-sm p-1">Sunset: {sunset}</h3>
            <h3 className="text-sm p-1">Address: {address}</h3>
          </div>

        </div>

        <img src={bgtype(weatherDescription)} alt=""  className="w-32 h-24 object-cover p-2 "  />

      </div>
    </Link>
  );
}
