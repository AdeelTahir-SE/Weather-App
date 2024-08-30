

export default function WeatherCard({
  weatherImage, // Corrected typo from `weatherIamge`
  weatherTitle,
  temperature, // Corrected typo from `temperaure`
  weatherDescription, // Corrected typo from `weatherDescreption`
  icon,
  visibility, // Corrected typo from `visiblity`
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
  sunset
}) {
  return (
    <div className="p-3 h-auto w-max hover:">
      <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-200 via-blue-500 to-blue-600 cursor-pointer rounded-lg shadow-lg">
        <div className="flex flex-row items-center justify-around p-4 text-white">
          <h1 className="text-3xl font-sans font-bold">{weatherTitle}</h1>
          <p className="text-sm p-1">{weatherDescription}</p>
          <h3 className="text-lg p-1">Temperature: {temperature}°F</h3>
          <h3 className="text-sm p-1">Feels Like: {feelsLike}°F</h3>
          <h3 className="text-sm p-1">Dew Point: {dewPoint}°F</h3>
          <h3 className="text-sm p-1">Visibility: {visibility} mi</h3>
          <h3 className="text-sm p-1">Wind Speed: {windSpeed} mph</h3>
          <h3 className="text-sm p-1">Wind Gust: {windGust} mph</h3>
          <h3 className="text-sm p-1">Pressure: {pressure} hPa</h3>
          <h3 className="text-sm p-1">Cloud Cover: {cloudCover}%</h3>
          <h3 className="text-sm p-1">Solar Radiation: {solarRadiation} W/m²</h3>
          <h3 className="text-sm p-1">UV Index: {uvIndex}</h3>
          <h3 className="text-sm p-1">Moon Phase: {moonPhase}</h3>
          <h3 className="text-sm p-1">Sunrise: {sunrise}</h3>
          <h3 className="text-sm p-1">Sunset: {sunset}</h3>
          <p className="mt-2 text-sm text-gray-200">{date}</p>
        </div>
        <img src={weatherImage} alt="Weather Icon" className="w-16 h-16 mb-2" />
      </div>
    </div>
  );
}
