import { Link } from "react-router-dom";
import rain from "../assets/rain.gif"; // Adjust the path if necessary
import sun from "../assets/sun.gif";
import snow from "../assets/snow.gif";
import cloud from "../assets/cloud.gif";
function bgtype(type) {
  const weatherType = type.toLowerCase();
  if (weatherType.includes("rain")) {
    return rain;
  } else if (weatherType.toLowerCase().includes("clear")) {
    return sun;
  } else if (
    weatherType.toLowerCase().includes("cloud") ||
    weatherType.toLowerCase().includes("overcast")
  ) {
    return cloud;
  } else if (weatherType.toLowerCase().includes("snow")) {
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
  address,
  city,
}) {
  return (
    <Link to={`/weather/${city}/${date}`}>

      <div className="transition-transform transform hover:scale-105 hover:shadow-xl p-4  h-auto flex flex-col sm:flex sm:flex-row justify-between items-center m-2 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-600 cursor-pointer rounded-lg shadow-lg 
              lg:flex-row lg:justify-around lg:p-3 lg:min-w-3xl lg:max-w-none lg:h-auto min-w-full w-ful max-w-64">
<div className="flex flex-col justify-between items-center ">
          <h1 className="text-3xl font-sans font-bold">{weatherTitle}</h1>
          <p className="text-sm p-1   ">{weatherDescription}</p>
          <p className="mt-2 text-sm ">{date}</p>
        </div>
        <div className="flex flex-col items-start p-2 text-white space-y-1">
          <div className="flex flex-col space-y-1">
            <h3 className="text-sm">Temperature: {temperature}°F</h3>
            <h3 className="text-sm">Feels Like: {feelsLike}°F</h3>
          </div>

          <div className="flex flex-col space-y-1">
            <h3 className="text-sm">Dew Point: {dewPoint}°F</h3>
            <h3 className="text-sm">Visibility: {visibility} mi</h3>
          </div>

          <div className="flex flex-col space-y-1">
            <h3 className="text-sm">Wind Speed: {windSpeed} mph</h3>
            <h3 className="text-sm">Wind Gust: {windGust} mph</h3>
          </div>
        </div>

        <div className="flex flex-col items-start p-2 text-white space-y-1">
          <div className="flex flex-col space-y-1">
            <h3 className="text-sm">Pressure: {pressure} hPa</h3>
            <h3 className="text-sm">Cloud Cover: {cloudCover}%</h3>
          </div>

          <div className="flex flex-col space-y-1">
            <h3 className="text-sm">Solar Radiation: {solarRadiation} W/m²</h3>
            <h3 className="text-sm">UV Index: {uvIndex}</h3>
          </div>

          <div className="flex flex-col space-y-1">
            <h3 className="text-sm">Moon Phase: {moonPhase}</h3>
            <h3 className="text-sm">Sunrise: {sunrise}</h3>
            <h3 className="text-sm">Sunset: {sunset}</h3>
            <h3 className="text-sm">Address: {address}</h3>
          </div>
          </div>

        <img
          src={bgtype(weatherTitle)}
          alt=""
          className="w-32 h-24 object-cover p-2 "
        />
      </div>
    </Link>
  );
}
