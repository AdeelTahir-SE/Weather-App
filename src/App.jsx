import WeatherCard from "./components/WeatherCard.jsx";
import { useEffect, useState } from "react";
import rain from "./assets/rain.mp4";
import cloud from "./assets/cloud.mp4";
import snow from "./assets/snow.mp4";
import clear from "./assets/clear.mp4";

function bgtype(type) {
  const weatherType = type.toLowerCase();
  if (weatherType.includes("rain")) {
    return rain;
  } else if (weatherType.includes("clear")) {
    return clear;
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

function App() {
  const [weekData, setWeekData] = useState([]);
  const [paramsdetails, setparamsdetails] = useState({ city: "", date: "" });
  const [fetchdata, setfetchdata] = useState(true);
  const [background, setbackground] = useState(rain);
  const [error, seterror] = useState();
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    async function fetchData() {
      setWeekData([]);
      try {
        const WeekDataResponse = await fetch(
          `http://localhost:3000/api/weekdata/${paramsdetails.city || "Faisalabad"}`,
          { signal: controller.signal }
        );
        const WeekDataResponseParsed = await WeekDataResponse.json();
        setWeekData(WeekDataResponseParsed);
        setloader(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          // Retry fetching data after abort
        } else {
          console.error(error);
          seterror(error.message || "An unexpected error occurred.");
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }

    if (fetchdata) {
      fetchData().then(() => setfetchdata(false));
    }

    return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts
  }, [fetchdata, paramsdetails.city, paramsdetails.date]);

  useEffect(() => {
    if (weekData.length > 0) {
      const newBackground = bgtype(weekData[0].conditions);
      setbackground(newBackground);
    }
  }, [weekData]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setfetchdata(true);
      setloader(true);
    }
  };

  return (
    <div className="relative flex flex-col justify-around items-center min-h-screen">
      <video
        autoPlay
        key={background}
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={background} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>

      <div className="relative z-10 flex flex-col items-center text-center rounded-lg bg-slate-800 bg-opacity-80 text-white mt-6 my-3 w-4/5 min-h-56 h-1/2">
        <h1 className="text-3xl font-sans font-bold">Weather Forecast</h1>
        <p className="p-5">
          WeatherApp is a sleek and intuitive weather application designed to
          keep you informed about the weather conditions at a glance. Whether
          you're planning your day or preparing for the week ahead, WeatherApp
          delivers accurate and up-to-date weather information tailored to your
          needs.
        </p>

        <div className="text-black flex flex-col bg-slate-800 p-6 w-4/5  m-auto">
          <input
            className="p-4 mb-4 bg-slate-400 rounded-lg placeholder:text-white placeholder:text-center hover:bg-slate-500 cursor-pointer"
            type="text"
            placeholder="cityname"
            value={paramsdetails.city}
            onChange={(e) =>
              setparamsdetails((prevDetails) => ({
                ...prevDetails,
                city: e.target.value,
              }))
            }
            onKeyDown={handleKeyDown}
            disabled={loader}
          />
          <input
            className="p-4 bg-slate-400 rounded-lg placeholder:text-white placeholder:text-center hover:bg-slate-500 cursor-pointer"
            type="text"
            placeholder="date (YYYY-MM-DD)"
            value={paramsdetails.date}
            onChange={(e) =>
              setparamsdetails((prevDetails) => ({
                ...prevDetails,
                date: e.target.value,
              }))
            }
            disabled={loader}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {loader && (
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
          <div
            className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-blue-800 animate-bounce [animation-delay:-.5s]"
          ></div>
        </div>
      )}

      <div className="relative z-10 bg-opacity-45 h-auto bg-slate-500 flex flex-wrap lg:flex-wrap  flex-col items-center w-full justify-center mt-7">
        {error && (
          <p className="text-center bg-red-600 text-white p-2 rounded">{error}</p>
        )}

        {weekData &&
          weekData.map((v) => (
            <div key={v.datetimeEpoch} className="sm:w-5/6 md:w-5/6 lg:w-5/6  p-2">
              <WeatherCard
                weatherDescription={v.description}
                weatherTitle={v.conditions}
                temperature={v.temp}
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
                address={v.address}
                city={paramsdetails.city || "Faisalabad"}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
