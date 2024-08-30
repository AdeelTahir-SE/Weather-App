import WeatherCard from "./components/WeatherCard.jsx";
import Weatherdetails from "./pages/Weatherdetails.jsx";
import { useEffect, useState } from "react";

function App() {
  const [weekData, setWeekData] = useState([]);
  const [dayData, setDayData] = useState({});
  const [paramsdetails, setparamsdetails] = useState({ city: "", date: "" }); // Initialize as an object
  const [fetchdata, setfetchdata] = useState(false);

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    async function fetchData() {
      const WeekDataResponse = await fetch(
        `http://localhost:3000/api/weekdata/${paramsdetails.city}`
      );
      const WeekDataResponseParsed = await WeekDataResponse.json();
      setWeekData(WeekDataResponseParsed);
      
      const DayDataResponse = await fetch(
        `http://localhost:3000/api/alldataofday/${paramsdetails.city}/${paramsdetails.date || getFormattedDate()}`
      );
      const DayDataParsed = await DayDataResponse.json();
      setDayData(DayDataParsed);
    }
    
    if (fetchdata) {
      fetchData();
      setfetchdata(false);
    }
  }, [fetchdata, paramsdetails]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setfetchdata(true); // Trigger data fetch when Enter is pressed
      console.log(paramsdetails);
    }
  };

  return (
    <div className="flex flex-col justify-around items-center">
      <div className="flex flex-col items-center text-center rounded-lg bg-slate-800 text-white mt-6 my-3 w-4/5 relative">
        <h1 className="text-3xl font-sans font-bold">Weather Forecast</h1>
        <p className="p-5">
          WeatherApp is a sleek and intuitive weather application designed to
          keep you informed about the weather conditions at a glance. Whether
          you're planning your day or preparing for the week ahead, WeatherApp
          delivers accurate and up-to-date weather information tailored to
          your needs.
        </p>

        <div className="details text-black flex flex-col">
          <input
            className="absolute p-4 left-1/2 top-16 -translate-x-1/2 -translate-y-1/2 bg-slate-400"
            type="text"
            placeholder="cityname"
            value={paramsdetails.city}
            onChange={(e) => setparamsdetails(prevDetails => ({ ...prevDetails, city: e.target.value }))}
            onKeyDown={handleKeyDown}
          />
          <input
            className="absolute p-4 left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 bg-slate-400"
            type="text"
            placeholder="date (YYYY-MM-DD)"
            value={paramsdetails.date}
            onChange={(e) => setparamsdetails(prevDetails => ({ ...prevDetails, date: e.target.value }))}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="bg-slate-400 flex flex-col items-center w-11/12 justify-around mt-7">
        {weekData && weekData.map((v) => (
          <WeatherCard
            key={v.datetimeEpoch}
            weatherImage={v.icon} // Assuming icon is used as image
            weatherDescription={v.description}
            weatherTitle={v.conditions}
            temperature={v.temp}
            icon={v.icon}
            visibility={v.visibility}
            date={v.datetime}
            humidity={v.humidity}
            feelsLike={v.feelslike}
            dewPoint={v.dew}
            windSpeed={v.windspeed}
            windGust={v.windgust}
            pressure={v.pressure}
            cloudCover={v.cloudcover}
            solarRadiation={v.solarradiation}
            uvIndex={v.uvindex}
            moonPhase={v.moonphase}
            sunrise={v.sunrise}
            sunset={v.sunset}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
