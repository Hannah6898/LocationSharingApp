import React, { useRef, useEffect } from "react";
import "./Map.css";

function Map(props) {
  const mapRef = useRef();

  const { center, zoom } = props;

  //This useEffect will run after the JSX has been rendered. 
  //Therefore after the useRef connection has been establihed in to the JSX so the code knows where in the JSX to render the map
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}
export default Map;
