// src/components/SectionThree/SectionThree.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { viewState, tiffFilesOne, zTranslationsOne } from "../../config/rasterConfig";
import GenericDeckGLMap from "../DeckGLMaps/GenericDeckGLMap";
import "./SectionThree.css";

export default function SectionThree() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: false });

  const createChartOption = (title, data) => ({
    title: { text: title, bottom: 0, left: "center", textStyle: { fontSize: 10 } },
    tooltip: {},
    xAxis: { type: "category", data: ["A", "B", "C", "D", "E"] },
    yAxis: { type: "value" },
    series: [{ data, type: "bar" }],
  });

  const scenarios = ["Tendencial", "Controlado", "Acelerado"];

  return (
    <section
      ref={sectionRef}
      className="h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white"
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div
          className="flex flex-col h-full p-6"
          style={{ marginTop: "5vh" }}
        >
          {/* HEADER */}
          <div className="flex-none space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold"
            >
              INFORMACIÓN HISTÓRICA
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg font-light text-[#FFCC00]"
            >
              Captura de carbono
            </motion.p>
          </div>

          {/* YEAR CARDS */}
          <div className="flex-none flex gap-4 my-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex-1 h-28 bg-black bg-opacity-50 rounded-md shadow flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-bold">2008</h3>
              <p className="text-3xl font-extrabold">0t</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex-1 h-28 bg-black bg-opacity-50 rounded-md shadow flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-bold">2024</h3>
              <p className="text-3xl font-extrabold">+0t</p>
            </motion.div>
          </div>

          {/* SCENARIOS TITLE */}
          <div className="flex-none">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl font-bold"
            >
              ESCENARIOS
            </motion.h2>
          </div>

          {/* SCENARIOS GRID */}
          <div className="flex-1 grid grid-rows-3 gap-4">
            {scenarios.map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 + i * 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 h-[33.33%] gap-4"
              >
                {/* Scenario Card */}
                <div
                  className="bg-black bg-opacity-50 rounded-md shadow p-4 flex items-center justify-center"
                  style={{ height: "fit-content", marginTop: "1rem" }}
                >
                  <div className="text-center">
                    <p className="text-lg">Total carbono</p>
                    <p className="text-2xl font-bold">0t</p>
                  </div>
                </div>

                {/* Scenario Chart */}
                <div>
                  <ReactECharts
                    option={createChartOption(
                      "Carbono que se dejaría de capturar",
                      [15, 30, 45, 50, 35]
                    )}
                    className="w-full border rounded-md shadow-md"
                    style={{
                      height: "fit-content",
                      minHeight: "100px",
                      marginTop: "1rem",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: MAP */}
        <div className="flex-none p-6">
          <motion.div
          style={{
              marginTop: "5vh",
              
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="w-full h-[95%] rounded-lg shadow-lg overflow-hidden"
          >
            <GenericDeckGLMap
              viewState={viewState}
              tiffFiles={tiffFilesOne}
              zTranslations={zTranslationsOne}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}