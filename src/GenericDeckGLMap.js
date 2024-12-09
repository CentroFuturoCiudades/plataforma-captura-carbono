import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import { Map } from 'react-map-gl';
import { BitmapLayer } from '@deck.gl/layers';
import { Matrix4 } from 'math.gl';
import { load } from '@loaders.gl/core';
import { GeoTIFFLoader } from '@loaders.gl/geotiff';
import { COORDINATE_SYSTEM } from '@deck.gl/core';
import TimelineSlider from './TimelineSlider';
import "./App.css"
const mapboxAccessToken = "pk.eyJ1IjoiamVkbiIsImEiOiJjbTMwaWIzdnAwbjh3MnRwd2NncDY4YWxvIn0.V61M6zdOrvJDW864Ff_lqQ"

const defaultViewState = {
  latitude: 1.8225, // Adjusted values for isometric display
  longitude: -75.50,
  zoom: 9.5,
  pitch: 85,
  bearing: 0,
};

function GenericDeckGLMap({ viewState = defaultViewState, tiffFiles, zTranslations }) {
  const [layers, setLayers] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const createBitmapLayers = async () => {
      const loadedTiffs = await Promise.all(
        tiffFiles.map((file) => load(file, GeoTIFFLoader))
      );

      const createBitmap = async (tiff) => {
        const { width, height, data } = tiff;
        const numChannels = data.length / (width * height);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(width, height);
        const imgDataArray = imgData.data;

        for (let i = 0; i < width * height; i++) {
          const pixelOffset = i * numChannels;

          if (numChannels === 1) {
            const value = data[pixelOffset];
            imgDataArray[i * 4] = value;
            imgDataArray[i * 4 + 1] = value;
            imgDataArray[i * 4 + 2] = value;
            imgDataArray[i * 4 + 3] = 255;
          } else if (numChannels === 3) {
            imgDataArray[i * 4] = data[pixelOffset];
            imgDataArray[i * 4 + 1] = data[pixelOffset + 1];
            imgDataArray[i * 4 + 2] = data[pixelOffset + 2];
            imgDataArray[i * 4 + 3] = 255;
          } else if (numChannels === 4) {
            imgDataArray[i * 4] = data[pixelOffset];
            imgDataArray[i * 4 + 1] = data[pixelOffset + 1];
            imgDataArray[i * 4 + 2] = data[pixelOffset + 2];
            imgDataArray[i * 4 + 3] = data[pixelOffset + 3];
          }
        }

        ctx.putImageData(imgData, 0, 0);
        return await createImageBitmap(canvas);
      };

      const bitmaps = await Promise.all(loadedTiffs.map(createBitmap));

      const bitmapLayers = bitmaps.map((bitmap, index) => {
        return new BitmapLayer({
          id: `bitmap-layer-${index}`,
          bounds: [-75.73, 1.50, -75.48, 1.73],
          image: bitmap,
          opacity: 1,
          coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
          modelMatrix: zTranslations ? zTranslations[index] : new Matrix4(),
        });
      });

      setLayers(bitmapLayers);
    };

    createBitmapLayers();
  }, [tiffFiles, zTranslations]);

  return (
    <div className="relative h-full w-full bg-[#F8F8F8] border border-gray-300 rounded-lg">
      <DeckGL
        initialViewState={{
          latitude: 2.0225, // Adjusted values for isometric display
          longitude: -75.50,
          zoom: 9.5,
          pitch: 90,
          bearing: 0,
        }}
        controller={true}
        layers={layers}
        style={{ borderRadius: '8px' }}
      >
        <Map
          mapboxAccessToken={mapboxAccessToken}
          mapStyle="mapbox://styles/mapbox/light-v10" // Lighter style to match the design
          className="w-full h-full"
          attributionControl={false}
        />
      </DeckGL>

      {/* Overlayed Text */}
      <div className="absolute top-20 right-10">
        <h1 className="text-7xl font-bold text-[#817740]">Cobertura de suelo</h1>
        <p className="text-2xl text-[#817740] mt-2 bg-gray-100 bg-opacity-60 p-3 rounded-lg shadow-lg">
          ¿Cuánto carbono se dejará de capturar si seguimos creciendo?
        </p>
        <p className="text-2xl text-[#817740] mt-[80px] ml-[60%] w-[250px] bg-gray-100 bg-opacity-80 p-3 rounded-lg shadow-lg">
        Imágenes	en	isométrico con elevación topográfica.
        </p>
        <p className="text-2xl text-[#817740] mt-[80px] ml-[60%] w-[250px] bg-gray-100 bg-opacity-80 p-3 rounded-lg shadow-lg">
        Crecimiento	área urbanizada
        </p>
        <p className="text-2xl text-[#817740] mt-[80px] ml-[60%] w-[250px] bg-gray-100 bg-opacity-80 p-3 rounded-lg shadow-lg">
          Usos de suelo
        </p>
      </div>

      {/* Timeline */}
     <TimelineSlider/>
    </div>
  );
}

export default GenericDeckGLMap;
