// src/components/PolicyLayout/PolicyLayout.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { Switch, FormControlLabel } from "@mui/material";
import { viewState, tiffFiles, zTranslations } from "../../config/rasterConfig";
import GenericDeckGLMapFirst from "../DeckGLMaps/GenericDeckGLMapFirst";

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
  grid: { left: "10%", right: "5%", top: "5%", bottom: "15%" },
  series: [
    {
      name: "Carbono",
      data: [100, 140, 180, 220, 260],
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: { color: "#fff", width: 2 },
      itemStyle: { color: "#ff4444" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,255,255,0.5)" },
            { offset: 1, color: "rgba(255,255,255,0)" },
          ],
        },
      },
    },
  ],
};

export default function PolicyLayout() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: false });

  return (
    <section
      ref={sectionRef}
      className="h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white"
    >
      {/* Header */}
      <div className="px-6 py-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mt-10"
        >
          POLÍTICAS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-xl font-light text-[#FFCC00] tracking-wide"
        >
          Cobertura de suelo
        </motion.p>
      </div>

      {/* Main content */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* LEFT COLUMN */}
        <div className="flex flex-col h-full gap-6">
          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="flex-none bg-black bg-opacity-50 p-4 rounded-md shadow"
          >
            <ReactECharts
              option={areaChartOptions}
              style={{ width: "100%", height: "250px" }}
            />
          </motion.div>

          {/* Feature toggles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="flex-none bg-black bg-opacity-50 p-4 rounded-md shadow"
            style={{ height: "fit-content" }}
          >
            <div className="flex flex-col gap-3">
              <FormControlLabel
                control={<Switch color="default" />}
                label={
                  <span className="text-white">
                    Control de <span className="text-red-400">crecimiento urbano</span>
                  </span>
                }
              />
              <FormControlLabel
                control={<Switch color="default" />}
                label={
                  <span className="text-white">
                    Conservación de <span className="text-red-400">áreas naturales protegidas</span>
                  </span>
                }
              />
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

          {/* Years & Carbono fill */}
         {/*  <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="flex-1 bg-black bg-opacity-50 p-4 rounded-md shadow flex flex-col justify-between"
          >
            <h3 className="text-2xl font-bold mb-4">AÑOS</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {["2008", "2024", "2040"].map((year) => (
                <div key={year} className="text-center">
                  <p className="uppercase text-sm">{year}</p>
                  <div className="text-3xl font-extrabold">{year}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="uppercase text-sm">Carbono total</p>
                <div className="text-2xl font-extrabold">0t</div>
              </div>
              <div className="text-center">
                <p className="uppercase text-sm">Carbono adicional</p>
                <div className="text-2xl font-extrabold">+0t</div>
              </div>
            </div>
          </motion.div> */}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col h-[85%] gap-6">
          {/* Map (≈ 2/3 height) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            style={{ marginBottom: "5vh" }}
            className="flex-[2] bg-black bg-opacity-50 rounded-md shadow overflow-hidden"
          >
            <GenericDeckGLMapFirst
              viewState={viewState}
              tiffFiles={tiffFiles}
              zTranslations={zTranslations}
            />
          </motion.div>

          {/* Gauge chart (≈ 1/3 height) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            style={{ marginBottom: "5vh" }}
            className="flex-[1] bg-black bg-opacity-50 rounded-md shadow flex items-center justify-center"
          >
            <ReactECharts
              option={{
                series: [
                  {
                    type: "gauge",
                    startAngle: 210,
                    endAngle: -30,
                    min: 0,
                    max: 100,
                    progress: {
                      show: true,
                      width: 18,
                      itemStyle: {
                        color: "#92843B"
                      }
                    },
                    axisLine: {
                      lineStyle: {
                        width: 18,
                        color: [
                          [1, "#324130"]
                        ]
                      }
                    },
                    pointer: {
                      show: true,
                      length: "70%",
                      width: 6
                    },
                    axisTick: {
                      show: false
                    },
                    splitLine: {
                      show: false
                    },
                    axisLabel: {
                      show: false
                    },
                    detail: {
                      valueAnimation: true,
                      fontSize: 36,
                      color: "#fff",
                      offsetCenter: [0, "60%"],
                      formatter: "{value}%"
                    },
                    data: [
                      {
                        value: 0,
                        name: "Progreso"
                      }
                    ],
                    title: {
                      show: false
                    }
                  }
                ]
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}