import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      const countriesFetched = await fetch(
        "https://disease.sh/v3/covid-19/countries"
      );
      const countriesResponse = await countriesFetched.json();
      const countriesInfo = countriesResponse.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));

      setCountries(countriesInfo);
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryChange = event.target.value;
    setCountry(countryChange);
  };
  return (
    <div className="app">
      {/** HEADER */}
      <div className="app__header">
        <h1>Covid 19 tracker</h1>
        <FormControl className="app_dropdown">
          <Select
            className=""
            variant="outlined"
            value={country}
            onChange={onCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* INFO BOXES*/}
      <div className="app__stats">
      <InfoBox title="Coronavirus Cases" cases={1200} total={4000} />
      <InfoBox title="Recovered" cases={120} total={3000} />
      <InfoBox title="Deaths" cases={2000} total={2000} />
      </div>
      {/** MAP */}
      {/* TABLE*/}
      {/** GRAPH */}
    </div>
  );
}

export default App;
