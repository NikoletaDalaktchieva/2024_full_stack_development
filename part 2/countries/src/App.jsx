import { useState, useEffect } from "react";
import axios from "axios";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        const uniqueCountries = response.data.filter(
          (country, index, self) =>
            index ===
            self.findIndex(
              (c) =>
                c.name.common.toLowerCase() ===
                country.name.common.toLowerCase()
            )
        );
        setCountries(uniqueCountries);
      })
      .catch((e) => {
        console.log("fail");
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountriesList
          filteredCountries={filteredCountries}
          setSearchText={setSearchText}
        />
      )}
    </div>
  );
};

export default App;
