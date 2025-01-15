// src/components/PolicyLayout/PolicyLayout.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { Switch, FormControlLabel } from "@mui/material";
import { viewState, tiffFiles, zTranslations } from "../../config/rasterConfig";
import GenericDeckGLMapFirst from "../DeckGLMaps/GenericDeckGLMapFirst";

// Example area chart config (same as before)
const areaChartOptions = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    textStyle: { color: "#fff" },
    backgroundColor: "rgba(50,50,50,0.7)",
  },
  xAxis: {
    type: "category",
    data: ["2000", "2005", "2010", "2015", "2020"],
    axisLine: { lineStyle: { color: "#aaa" } },
    axisLabel: { color: "#eee" },
    name: "Tiempo",
    nameLocation: "middle",
    nameTextStyle: { color: "#eee", padding: 10 },
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: true, lineStyle: { color: "rgba(255,255,255,0.2)" } },
    axisLabel: { color: "#eee" },
    name: "Contribución de carbono",
    nameLocation: "middle",
    nameTextStyle: { color: "#eee", fontSize: 12 },
    nameRotate: 90,
    nameGap: 50,
  },
  grid: {
    left: "10%",
    right: "5%",
    top: "5%",
    bottom: "15%",
  },
  series: [
    {
      name: "Carbono",
      data: [100, 140, 180, 220, 260],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        color: "#ffffff",
        width: 2,
      },
      itemStyle: {
        color: "#ff4444",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255, 255, 255, 0.5)" },
            { offset: 1, color: "rgba(255, 255, 255, 0)" },
          ],
        },
      },
    },
  ],
};

const gaugeChartOptions = {
    // Hide the default tooltip or show it if you want
    tooltip: { show: false },
    backgroundColor: 'transparent',
    series: [
      {
        name: "Carbon Gauge",
        type: "gauge",
        // If you want a "donut" style, set start/end angles
        // so the arc goes around. For a 3/4 circle, etc.
        startAngle: 90,
        endAngle: -270,
  
        // Controls size of the gauge
        radius: "100%",
        center: ["50%", "50%"],
  
        // Turn on "progress" to show a fill arc
        progress: {
          show: true,
          roundCap: true,    // makes the arc cap rounded
          width: 12          // thickness of the gauge arc
        },
       
  
        // Hide ticks and splits
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
  
        // Hide the pointer/needle to make it a ring
        pointer: { show: false },
  
        // The data array determines the gauge's current value
        data: [
          {
            value: 0,  // e.g. 10% ... adjust as needed
            name: ""
          }
        ],
  
        // The text in the center
        detail: {
            // Display “{value}%”
            formatter: '{value}%',
            fontSize: 18,
            fontWeight: 'bold',
  
            // The text color itself
            color: '#000',
  
            // White circle behind the text
            backgroundColor: '#fff',
            borderRadius: 100,     // make it a circle
            width: 60,
            height: 60,
            lineHeight: 60,       // center the text vertically
            offsetCenter: [0, 0], // (x, y) position relative to gauge center
          },
          axisLine: {
            lineStyle: {
                width:30,
              // The gauge has segments of color if you like:
              // color is an array of [ [percentage, color], [percentage, color], ... ]
              // or just one segment if you prefer
              
              width: 12
            }
          },
      }
    ]
  };

export default function PolicyLayout() {
    const sectionRef = useRef(null);
    
      // useInView returns true when the element is sufficiently in the viewport
      const isInView = useInView(sectionRef, {
        amount: 0.5, // how much of the element should be in view to trigger
        once: false,  // whether it should only animate once
      });

  return (
    // Similar container approach (min-h, max-h, snap-start, gradient bg)
    <div ref={sectionRef} className="min-h-screen max-h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white">
      
      {/* Top Title / Heading Section */}
      <div className="px-6 py-4">
        <motion.h2 
         initial={{ opacity: 0, y: 20 }}
         animate={isInView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 1 }}
        className="text-4xl font-bold mb-0 mt-10">POLÍTICAS</motion.h2>
        <motion.p 
         initial={{ opacity: 0, y: 20 }}
         animate={isInView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 1 }}
        className="text-xl mb-4 font-light text-[#FFCC00] tracking-wide">
          Cobertura de suelo
        </motion.p>
      </div>

      {/* Main grid, 2 columns, similar to SectionTwo's approach */}
      <div className="grid grid-cols-2 mt-3 mx-3 gap-2 p-6">

        {/* LEFT COLUMN */}
        <div className="flex flex-col pr-4">
          {/* Area Chart Container */}
          <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1 }}
          className="bg-black bg-opacity-50 p-4 rounded-md shadow mb-6">
            <ReactECharts
              option={areaChartOptions}
              style={{ height: "300px", width: "100%" }}
            />
          </motion.div>

          {/* Toggle Switches */}
          <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1 }}
          className="bg-black bg-opacity-50 p-4 rounded-md shadow mb-6">
      <div className="flex flex-col gap-3">
        {/* 1) "Control de crecimiento urbano" */}
        <FormControlLabel
          control={<Switch color="default" />} // or "primary"/"secondary"
          label={
            <span className="text-white">
              Control de <span className="text-red-400">crecimiento urbano</span>
            </span>
          }
        />

        {/* 2) "Conservación de áreas naturales protegidas" */}
        <FormControlLabel
          control={<Switch color="default" />}
          label={
            <span className="text-white">
              Conservación de <span className="text-red-400">áreas naturales protegidas</span>
            </span>
          }
        />

        {/* 3) "Regeneración de entornos naturales" */}
        <FormControlLabel
          control={<Switch color="default" />}
          label={
            <span className="text-white">
              Regeneración de <span className="text-red-400">entornos naturales</span>
            </span>
          }
        />
      </div>
    </motion.div>

          {/* Carbon Data / "Años" Section */}
          <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1 }}
          className="bg-black bg-opacity-50 p-4 rounded-md shadow">
            <h3 className="text-2xl font-bold mb-3">AÑOS</h3>
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <p className="uppercase text-sm">Año</p>
                <div className="text-3xl font-extrabold">2008</div>
              </div>
              <div className="text-center">
                <p className="uppercase text-sm">Año</p>
                <div className="text-3xl font-extrabold">2024</div>
              </div>
              <div className="text-center">
                <p className="uppercase text-sm">Año</p>
                <div className="text-3xl font-extrabold">2040</div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="text-center">
                <p className="uppercase text-sm">Carbono total</p>
                <div className="text-2xl font-extrabold">0t</div>
              </div>
              <div className="text-center">
                <p className="uppercase text-sm">Carbono adicional</p>
                <div className="text-2xl font-extrabold">+0t</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-end">
          {/* Map container (like in SectionTwo) */}
          <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1 }}
          className="relative w-full h-[400px] bg-black bg-opacity-40 rounded-md shadow mb-4">
            {/* 
              Insert your actual map (DeckGL or otherwise) here.
              For now, a placeholder text:
            */}
            
              <div>
              <GenericDeckGLMapFirst
            viewState={viewState}
            tiffFiles={tiffFiles}
            zTranslations={zTranslations}
          />
              </div>
    
          </motion.div>

          {/* Additional info container or radial gauge, etc. */}
          <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 1 }}
          className="relative bg-black bg-opacity-50 p-4 rounded-md shadow w-full h-[35vh] flex items-center justify-center">
      {/* 
        1) Outer conic gradient ring:
           - Fills the entire container (absolute inset-0).
           - "conic-gradient" transitions from #324130 to #92843B around the circle.
      */}
      <div
        className="absolute w-[27.5%] h-[70%] rounded-full"
        style={{
          background: "conic-gradient(#324130 0%, #92843B 100%)",
        }}
      />

      {/*
        2) Inner white circle:
           - Slightly smaller (80% of container).
           - Creates the ring effect by covering the center portion of the conic gradient.
      */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: "19%",
          height: "50%",
        }}
      />

      {/*
        3) The text in the center:
           - Shown "on top" (relative with z-index above the circles).
           - For example, "65%" or "00%".
      */}
      <span className="relative text-4xl font-bold text-[#324130]">0%</span>
    </motion.div>
        </div>
      </div>
    </div>
  );
}

// <div className="relative w-full h-[400px] bg-black bg-opacity-40 rounded-md shadow mb-4">