import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState(["USA", "CHINA", "INDIA"]);

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
  return (
    <div className="app">
      {/** HEADER */}
      <div className="app__header">
        <h1>Covid 19 tracker</h1>
        <FormControl className="app_dropdown">
          <Select className="" variant="outlined">
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/**Title + Dropdown */}
      {/* INFO BOXES*/}
      {/**Info Box 1 */}
      {/**Info Box 2 */}
      {/**Info Box 3s */}
      {/** MAP */}
      {/* TABLE*/}
      {/** GRAPH */}
    </div>
  );
}

export default App;
