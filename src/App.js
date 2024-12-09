import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import GenericDeckGLMap from './GenericDeckGLMap';
import { Matrix4 } from 'math.gl';
import './App.css';
import ReactECharts from 'echarts-for-react';
import GenericDeckGLMapFirst from './GenericDeckGLMapFirst';

const viewState = {
  latitude: 1.6176412478782285,
  longitude: -75.60984999141394,
  zoom: 9,
  pitch: 10,
  bearing: 0,
};

// Data for TIFF files and transformations
const tiffFilesOne = ['/raster_prueba_james/esri_raster_florencia.tif', '/raster_prueba_james/GLC_FCS30D_raster_florencia.tif', '/raster_prueba_james/world_cover_raster_florencia.tif'];
const zTranslationsOne = [new Matrix4().translate([0, 0, 40000]), new Matrix4().translate([0, 0, 24000]), new Matrix4().translate([0, 0, 8000])];

const tiffFiles = ['/raster_prueba_james/GLC_FCS30D_raster_florencia.tif'];
const zTranslations = [ new Matrix4().translate([0, 0, 0])];

const tiffFilesTwo = ['/path_to_other_raster_file_1.tif', '/path_to_other_raster_file_2.tif'];
const zTranslationsTwo = [new Matrix4().translate([0, 0, 30000]), new Matrix4().translate([0, 0, 15000])];

const tiffFilesThree = ['/path_to_another_raster_file_1.tif'];
const zTranslationsThree = [new Matrix4().translate([0, 0, 20000]), new Matrix4().translate([0, 0, 15000])];

export default function App() {

  const mapContainerClass = `map-container`;

  return (
    <div className="h-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      <Navbar />
      <main className="snap-container">
        <SectionOne mapContainerClass={mapContainerClass} />
        <SectionTwo mapContainerClass={mapContainerClass} />
      </main>
    </div>
  );
}

function SectionOne({ mapContainerClass }) {
  const chartOptions1 = {
    title: {
      text: "Crecimiento Poblacional",
      bottom: 0,
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      type: "value",
    },
    series: [{ data: [300, 400, 350, 500, 450], type: "line" }],
  };

  const chartOptions2 = {
    title: {
      text: "Superficie Urbanizada",
      bottom: 0,
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      type: "value",
    },
    series: [{ data: [300, 400, 350, 500, 450], type: "line" }],
  };

  return (
    <div className="min-h-screen max-h-screen snap-start grid grid-cols-2 gap-6 bg-white">
      {/* Left Column - Text Content */}
      <div className="flex flex-col justify-center px-10">
        <h1 className="text-6xl font-bold text-[#324130]">Florencia</h1>
        <h2 className="text-4xl text-[#92843B] mt-2">Caquetá</h2>
        <p className="text-justify text-lg leading-relaxed">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
  sapien pulvinar, aliquet magna eu, egestas risus. Praesent a libero ac enim
  sollicitudin consectetur id eget risus. Aliquam porta eu eros non dignissim.
  Nam laoreet pulvinar est accumsan posuere. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit. Fusce sed eros gravida, lacinia orci eu, cursus
  dui. Aenean efficitur quis ante ullamcorper gravida. Donec faucibus felis
  orci, ut consectetur leo condimentum quis. Ut ac odio cursus, condimentum
  nulla id, porttitor diam. Cras congue euismod maximus. In ac ligula fermentum
  leo tristique ultrices. Sed auctor fringilla suscipit. Integer rutrum risus a
  quam varius, nec feugiat turpis sollicitudin. Etiam enim sapien, varius et
  tempor eget, lobortis ut dolor. Sed tincidunt nisi odio, ut tempor neque
  feugiat vel. Pellentesque habitant morbi tristique senectus et netus et
  malesuada fames ac turpis egestas. Duis luctus consequat condimentum. Sed in
  accumsan lacus. Ut et ipsum vitae velit maximus ultrices. Etiam sed molestie
  sem. Vestibulum malesuada convallis libero eget ultricies. Sed in lorem
  aliquet, sollicitudin neque feugiat, tristique nisi. Mauris blandit lorem
  tincidunt finibus blandit. Etiam sagittis congue nunc, ut congue mi elementum
  eu. Proin consequat urna sem, sit amet lacinia neque ullamcorper et.
</p>

      </div>

      {/* Right Column - Map and Charts */}
      <div className="flex flex-col justify-center items-center gap-4 px-10">
        <div className={`${mapContainerClass} w-full h-2/4 rounded-lg shadow-lg`}>
          <GenericDeckGLMapFirst
            viewState={viewState}
            tiffFiles={tiffFiles}
            zTranslations={zTranslations}
          />
        </div>
        <div className="flex justify-between w-full gap-4">
          <ReactECharts
            option={chartOptions1}
            className="w-1/2 h-[300px]"
          />
          <ReactECharts
            option={chartOptions2}
            className="w-1/2 h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}


function SectionTwo({ mapContainerClass }) {
  const createChartOption = (title, data) => ({
    title: {
      text: title,
      bottom: 0,
      left: "center",
      textStyle: { fontSize: 10 },
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      type: "value",
    },
    series: [{ data: data, type: "bar" }],
  });

  return (
    <div className="min-h-screen max-h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white">
      <div className="grid grid-cols-2 mt-3 mb-0 mx-3 gap-2 p-6">
        {/* Left Column */}
        <div className="flex flex-col">
          {/* Historical Information */}
          <h2 className="text-4xl font-bold mb-4 mt-10">INFORMACIÓN HISTÓRICA</h2>
          <p className="text-xl mb-6 font-light text-[#FFCC00]">
            Captura de carbono
          </p>
          <div className="flex justify-between mb-6">
            <div className="bg-black bg-opacity-50 p-4 rounded-md shadow h-[120px] w-[45%] flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold">2008</h3>
              <p className="text-3xl font-extrabold">0t</p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-md shadow h-[120px] w-[45%] flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold">2024</h3>
              <p className="text-3xl font-extrabold">+0t</p>
            </div>
          </div>

          {/* Scenario Section */}
          <h2 className="text-4xl font-bold mt-6">ESCENARIOS</h2>
          <div className="mt-4 space-y-2">
            {/* Tendencial */}
            <p className="text-xl mb-6 font-light text-[#FFCC00]">
            Tendencial
          </p>
          <div className="flex items-center gap-4">
              <div className="h-[120px] w-[35%] bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col items-center justify-center">
              <p className="text-lg">Total carbono</p>
              <p className="text-2xl font-bold">0t</p>
              </div>
              <ReactECharts
                option={createChartOption("Carbono que se dejaría de capturar", [15, 30, 45, 50, 35])}
                className="w-[35%] max-h-[150px] border rounded-md shadow-md"
              />
            </div>
            {/* Controlado */}
            <p className="text-xl mb-6 font-light text-[#FFCC00]">
            Controlado
          </p>
          <div className="flex items-center gap-4">
              <div className="h-[120px] w-[35%] bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col items-center justify-center">
                <p className="text-lg">Total carbono</p>
                <p className="text-2xl font-bold">0t</p>
              </div>
              <ReactECharts
                option={createChartOption("Carbono que se dejaría de capturar", [15, 30, 45, 50, 35])}
                className="w-[35%] max-h-[150px] border rounded-md shadow-md"
              />
            </div>
            
            {/* Acelerado */}
            <p className="text-xl mb-6 font-light text-[#FFCC00]">
            Acelerado
          </p>
          <div className="flex items-center gap-4">
              <div className="h-[120px] w-[35%] bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col items-center justify-center">
                <p className="text-lg">Total carbono</p>
                <p className="text-2xl font-bold">0t</p>
              </div>
              <ReactECharts
                option={createChartOption("Carbono que se dejaría de capturar", [15, 30, 45, 50, 35])}
                className="w-[35%] max-h-[150px] border rounded-md shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Map */}
        <div className={`${mapContainerClass} w-full h-svh mt-[-3%] ml-[4.25%]`}>
          <GenericDeckGLMap
             viewState={viewState}
             tiffFiles={tiffFilesOne}
             zTranslations={zTranslationsOne}
          />
  
        </div>
      </div>
    </div>
  );
}

