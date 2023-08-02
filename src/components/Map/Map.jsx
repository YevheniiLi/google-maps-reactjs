import {GoogleMap} from '@react-google-maps/api';
import React from 'react';
import s from './Map.module.css'
import {defaultTheme} from './Theme';

const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const defaultOptions ={
    panControl: true,
    zoomControl : true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    styles: defaultTheme
  }
  

const Map = ({center}) => {

    const mapRef = React.useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {
   mapRef.current = map;
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, [])

 
    return <div className={s.container}>
   <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        <></>
      </GoogleMap>
    </div>
}

export {Map}