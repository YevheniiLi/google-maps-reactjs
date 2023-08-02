import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React from "react";
import s from "./Map.module.css";
import { defaultTheme } from "./Theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};


export const MODES = {
  MOVE: 0,
  SET_MARKER: 1
}

const Map = ({ center, mode, markers, onMarkerAdd}) => {
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onClick = React.useCallback((loc) => {
    if (mode === MODES.SET_MARKER) {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      console.log({lat, lng})
      onMarkerAdd({lat, lng})
    }
  },[mode,onMarkerAdd])

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        options={defaultOptions}
      >
        <MarkerF position={center} icon={{url: '/current-pos.svg', scaledSize: new window.google.maps.Size(40, 40)}}/>
        {markers.map((marker, index) => {
          const { lat, lng } = marker;
          return <MarkerF key={index} position={{ lat, lng }} />;
        })}
      </GoogleMap>
    </div>
  );
};

export { Map };