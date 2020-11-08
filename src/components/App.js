import React from "react";
import SearchBox from "./SearchBox";
import Weather from "./Weather";
import "../styles/App.css";

function App() {
  return (
    <div className='jumbotron App'>
      <SearchBox />
      <Weather />
    </div>
  );
}

export default App;
