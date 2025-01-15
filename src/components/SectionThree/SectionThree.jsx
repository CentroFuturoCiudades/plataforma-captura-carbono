// src/components/SectionTwo/SectionTwo.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { viewState, tiffFilesOne, zTranslationsOne } from "../../config/rasterConfig";
import GenericDeckGLMap from "../DeckGLMaps/GenericDeckGLMap";
import "./SectionThree.css";

export default function SectionThree() {
  const mapContainerClass = "map-container";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
      amount: 0.5, // how much of the element should be in view to trigger
      once: false,  // whether it should only animate once
    });
  // Helper to create chart configs
  const createChartOption = (title, data) => ({
    title: {
      text: title,
      bottom: 0,
      left: "center",
      textStyle: { fontSize: 10 },
    },
    tooltip: {},
    xAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
    yAxis: { type: "value" },
    series: [{ data, type: "bar" }],
  });

  return (
    <div ref={sectionRef} className="min-h-screen max-h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white">
          <div className="grid grid-cols-2 mb-0 mx-3 gap-2 p-6">
            {/* Left Column */}
            <div className="flex flex-col">
              {/* Historical Information */}
              <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="text-4xl font-bold mb-4 mt-10">INFORMACIÓN HISTÓRICA</motion.h2>
              <motion.p 
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="text-lg mb-6 font-light text-[#FFCC00]">
                Captura de carbono
              </motion.p>
              <div className="flex justify-between mb-6">
                <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="bg-black bg-opacity-50 p-4 rounded-md shadow h-[120px] w-[45%] flex flex-col items-center justify-center">
                  <h3 className="text-lg font-bold">2008</h3>
                  <p className="text-3xl font-extrabold">0t</p>
                </motion.div>
                <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="bg-black bg-opacity-50 p-4 rounded-md shadow h-[120px] w-[45%] flex flex-col items-center justify-center">
                  <h3 className="text-lg font-bold">2024</h3>
                  <p className="text-3xl font-extrabold">+0t</p>
                </motion.div>
              </div>
    
              {/* Scenario Section */}
              <motion.h2 
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="text-4xl font-bold mt-6">ESCENARIOS</motion.h2>
              <div className="mt-4 space-y-2">
                {/* Tendencial */}
                <motion.p 
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="text-lg mb-6 font-light text-[#FFCC00]">
                Tendencial
              </motion.p>
              <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="flex items-center gap-4">
                  <div className="h-[120px] w-[35%] bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col items-center justify-center">
                  <p className="text-lg">Total carbono</p>
                  <p className="text-2xl font-bold">0t</p>
                  </div>
                  <ReactECharts
                    option={createChartOption("Carbono que se dejaría de capturar", [15, 30, 45, 50, 35])}
                    className="w-[35%] max-h-[150px] border rounded-md shadow-md"
                  />
                </motion.div>
                {/* Controlado */}
                <motion.p 
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="text-lg mb-6 font-light text-[#FFCC00]">
                Controlado
              </motion.p>
              <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="flex items-center gap-4">
                  <div className="h-[120px] w-[35%] bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col items-center justify-center">
                    <p className="text-lg">Total carbono</p>
                    <p className="text-2xl font-bold">0t</p>
                  </div>
                  <ReactECharts
                    option={createChartOption("Carbono que se dejaría de capturar", [15, 30, 45, 50, 35])}
                    className="w-[35%] max-h-[150px] border rounded-md shadow-md"
                  />
                </motion.div>
                
                {/* Acelerado */}
                <motion.p 
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1 }}
                className="text-lg mb-6 font-light text-[#FFCC00]">
                Acelerado
              </motion.p>
              <motion.div 
              
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="flex items-center gap-4">
                  <div className="h-[120px] w-[35%] bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col items-center justify-center">
                    <p className="text-lg">Total carbono</p>
                    <p className="text-2xl font-bold">0t</p>
                  </div>
                  <ReactECharts
                    option={createChartOption("Carbono que se dejaría de capturar", [15, 30, 45, 50, 35])}
                    className="w-[35%] max-h-[150px] border rounded-md shadow-md"
                  />
                </motion.div>
              </div>
            </div>
    
            {/* Right Column - Map */}
            <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className={`${mapContainerClass} w-full h-svh  ml-[4.25%]`}>
          <GenericDeckGLMap
                       viewState={viewState}
                       tiffFiles={tiffFilesOne}
                       zTranslations={zTranslationsOne}
                    />
  
        </motion.div>
      </div>
    </div>
  );
}