import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, CardContent, FormControl, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./utils";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
  }, []);

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
      const sortedData = sortData(countriesResponse);
      setTableData(sortedData);
    };

    getCountriesData();
    //console.log("Country info here", countryInfo);
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
        setCountryInfo(data);
        // console.log("country info", countryInfo); this will not work any side effect should be done inside useffect
      });
    // console.log("country info", countryInfo);
  };

  console.log("country info", countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        {/** HEADER */}
        <div className="app__header">
          <h1>Covid 19 tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              native
              className="app__headerFilter"
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <option value="worldwide">Worldwide</option>
              {countries.map((country) => (
                <option key={country.id} value={country.value}>
                  {country.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* INFO BOXES*/}
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/** MAP */}
        <Map />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            {/* TABLE*/}
            <Table countries={tableData} />
            <h3>Worldwide new cases</h3>
            {/** GRAPH */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
