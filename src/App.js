import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, CardContent, FormControl, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./utils";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);

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
    console.log("Country info here", countryInfo);
  }, [countryInfo]);

  const onCountryChange = (event) => {
    const countryChange = event.target.value;
    console.log("country change", countryChange);
    setCountry(countryChange);
    //Get country covid 19 info
    const url =
      countryChange === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryChange}`;

    fetch(url)
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
        <Map zoom={mapZoom} center={mapCenter} />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            {/* TABLE*/}
            <Table countries={tableData} />
            <h3>Worldwide new cases</h3>
            {/** GRAPH */}
            <LineGraph casesType="cases" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
