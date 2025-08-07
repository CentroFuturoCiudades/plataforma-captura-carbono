import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import { Map } from 'react-map-gl';
import { BitmapLayer } from '@deck.gl/layers';
import { Matrix4 } from 'math.gl';
import { load } from '@loaders.gl/core';
import { GeoTIFFLoader } from '@loaders.gl/geotiff';
import { COORDINATE_SYSTEM } from '@deck.gl/core';
import { env } from 'echarts';

const defaultViewState = {
  latitude: 1.6176412478782285,
  longitude: -75.60984999141394,
  zoom: 20,
  pitch: 120,
  bearing: 0,
};

function GenericDeckGLMapFirst({ viewState = defaultViewState, tiffFiles, zTranslations }) {
  const [layers, setLayers] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const createBitmapLayers = async () => {
      const loadedTiffs = await Promise.all(
        tiffFiles.map(file => load(file, GeoTIFFLoader))
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
          bounds: [-75.73013440795755, 1.5033306279740193, -75.48956557487034, 1.7319518677824375],
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

  const handleHover = ({ x, y, coordinate }) => {
    if (coordinate) {
      const [longitude, latitude] = coordinate;
      setTooltip({ x, y, longitude, latitude });
    } else {
      setTooltip(null);
    }
  };

  return (
    <div className="relative h-full w-full">
    <DeckGL initialViewState={{
   latitude: 1.61000000,  // Adjust this value to move further south
   longitude: -75.6075, // Adjust this value to shift east/west as needed
  zoom: 12,
  pitch: 0,
  bearing: 0,
}} controller={
          false
        } layers={layers}
        onHover={handleHover}
        >
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        className="w-full"
        attributionControl={false}
      />
    </DeckGL>
    </div>
  );
}

export default GenericDeckGLMapFirst;
