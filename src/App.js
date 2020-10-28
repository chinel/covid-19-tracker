import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      const countriesFetched = await fetch(
        "https://disease.sh/v3/covid-19/countries"
      );
      const countriesResponse = await countriesFetched.json();
      const countriesInfo = countriesResponse.map((country) => {
        return {
          name: country.country,
          value: country.countryInfo.iso2,
          id: country.country,
        };
      });

      setCountries(countriesInfo);
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryChange = event.target.value;
    setCountry(countryChange);
    //Get country covid 19 info
    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountryInfo(data);
        console.log("country info", countryInfo);
      });
    console.log("country info", countryInfo);
  };
  return (
    <div className="app">
      <div className="app__left">
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
                <MenuItem key={country.id} value={country.value}>
                  {country.name}
                </MenuItem>
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
        <Map />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            {/* TABLE*/}
            <h3>Worldwide new cases</h3>
            {/** GRAPH */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
