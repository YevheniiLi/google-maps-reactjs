import { Map } from "./components/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import s from "./App.module.css";
import { Autocomplete } from "./components/Autocomplete";
import React from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ["places"];

const App = () => {
  const [center, setCenter] = React.useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = React.useCallback((coordinates) => {
    setCenter(coordinates);
  }, [],);

  return (
    <div>
      <div className={s.addressSearchContainer}>
      <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      <button className={s.modeToggle}>Set markers</button>

      </div>
      {isLoaded ? <Map center={center} /> : <h2>Loading</h2>}
    </div>
  );
};

export default App;
