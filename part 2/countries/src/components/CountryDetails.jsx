const CountryDetails = ({ country }) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;

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
    </div>
  );
};

export default CountryDetails;
