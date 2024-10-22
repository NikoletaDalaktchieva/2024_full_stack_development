import axios from "axios";
import { useState, useEffect } from "react";

const CountryDetails = ({ country }) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const [weather, setWeather] = useState(null);
  console.log();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.tld[0]}&APPID=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(weather);
      })
      .catch((e) => {
        console.log("fail");
      });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="100"
      />

      {weather == null ? (
        <p>No weatehr</p>
      ) : (
        <div>
          <h2>Weather in Helsinki</h2>
          <p>temperature {weather.main.temp} celcius</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
