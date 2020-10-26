import React from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";

function App() {
  return (
    <div className="app">
      {/** HEADER */}
      <div className="app__header">
        <h1>Covid 19 tracker</h1>
        <FormControl className="app_dropdown">
          <Select className="" variant="outlined">
            <MenuItem value="">Worldwide</MenuItem>
            <MenuItem value="">Country 1</MenuItem>
            <MenuItem value="">Country 2</MenuItem>
            <MenuItem value="">Country 3</MenuItem>
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
