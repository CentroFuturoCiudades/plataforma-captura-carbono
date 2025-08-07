// src/components/DeckGLMaps/CHoosingRegionMap.js
import React, { useState, useCallback, useEffect } from 'react';
import DeckGL from 'deck.gl';
import { Map } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers';
import { env } from 'echarts';

// Center the default view somewhere near Florencia, Caquetá.
const defaultViewState = {
  latitude: -2.952648633007442,
  longitude:  -61.85132275170264,
  zoom: 5,
  pitch: 0,
  bearing: 0,
};

export default function CHoosingRegionMap() {
  const [tooltip, setTooltip] = useState(null);

  const [geojsonData, setGeojsonData] = useState(null);

  function geojsonToIconData(geojson) {
    var points = geojson.features
      .filter(f => f.geometry.type === 'Point')  // only handle points
      .map(f => ({
        coordinates: f.geometry.coordinates,
        ...f.properties
      }));
  
    return points
  }

  useEffect(() => {
    fetch("/data/geojson/amazonas_ciudades.geojson")
      .then(response => response.json())
      .then(data => {
        const iconData = geojsonToIconData(data);
        
        setGeojsonData(iconData);
        
        // or do any additional logic here
      })
      .catch(err => console.error("Failed to load GeoJSON:", err));
  }, []);

  useEffect(() => {
    if (geojsonData) {
     
    }
  }, [geojsonData]);

  const scrollDownOneScreen = useCallback(() => {
    const container = document.getElementById("myScrollContainer");
    if (container) {
      container.scrollBy({
        top: window.innerHeight, // or any number
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  // Called if user clicks on a GeoJSON point
  const handleCityClick = useCallback((feature) => {
   
    scrollDownOneScreen();
  }, [scrollDownOneScreen]);

  // DeckGL onHover
  const handleHover = useCallback(({ x, y, object }) => {
    if (object && object.properties) {
      setTooltip({
        x,
        y
      });
    } else {
      setTooltip(null);
    }
  }, []);

  // DeckGL onClick
  const handleClick = useCallback((info) => {
    if (info.object) {
      // info.object is the GeoJSON Feature
      handleCityClick(info.object);
    }
  }, [handleCityClick]);

  // Create our GeoJsonLayer
  const citiesLayer = new IconLayer({
    id: 'icon-layer',
    data: geojsonData,
    pickable: true,
  
    // Path to your sprite sheet with a single icon
    iconAtlas: './assets/icon-atlas.png',
  
    // Coordinates and size of the single icon in the atlas
    iconMapping: {
      "marker": { x: 0, y: 0, width: 128, height: 128}
    },
  
    // Use the same icon name for all data points
    getIcon: () => 'marker',
  
    // Position from each data object
    getPosition: d => d.coordinates,
  
    // Icon size (pixel units by default)
    getSize: d => 50,

    onClick: handleClick,

  });

  return (
    <div className="relative w-full h-full">
      <DeckGL
        className="absolute inset-0"
        initialViewState={defaultViewState}
        controller={{
          dragPan: false,
    scrollZoom: false,
    dragRotate: false,
    doubleClickZoom: false,
    touchZoom: false,
    keyboard: false
        }
        }
        layers={[citiesLayer]}
        onHover={handleHover}
      >
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          attributionControl={false}
        />
      </DeckGL>

      {/* Tooltip in top layer */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            zIndex: 999,
            pointerEvents: 'none',
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            background: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <div>{tooltip.cityName}</div>
        </div>
      )}
    </div>
  );
}