const CountriesList = ({ filteredCountries, setSearchText }) => {
  const showInfo = (countryName) => {
    setSearchText(countryName);
  };

  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => showInfo(country.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
