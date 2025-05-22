// src/components/SectionOne/SectionOne.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactECharts from "echarts-for-react";
import GenericDeckGLMapFirst from "../DeckGLMaps/GenericDeckGLMapFirst";
import { viewState, tiffFiles, zTranslations } from "../../config/rasterConfig";
import "./SectionOne.css";

export default function SectionOne() {
  const mapContainerClass = "map-container";
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

  // Reference the entire section to detect when it’s in view
  const sectionRef = useRef(null);

  // useInView returns true when the element is sufficiently in the viewport
  const isInView = useInView(sectionRef, {
    amount: 0.5, // how much of the element should be in view to trigger
    once: false,  // whether it should only animate once
  });

    return (
    <motion.div
      ref={sectionRef}
      className="w-full snap-start grid grid-cols-2 gap-6 bg-white"
      style={{ aspectRatio: "16/9" }}
      // We can animate this entire container
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Left Column - Text Content */}
      <div className="flex flex-col justify-center px-10">
        <motion.h1
          className="text-6xl font-bold text-[#324130]"
          // Each sub-element can have its own animation
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Florencia
        </motion.h1>

        <motion.h2
          className="text-4xl text-[#92843B] mt-2"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Caquetá
        </motion.h2>

        <motion.p
          className="text-justify text-lg leading-relaxed"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
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
        </motion.p>
      </div>

      {/* Right Column - Map and Charts */}
      <div className="flex flex-col justify-center items-center gap-4 px-10">
        <motion.div
          className={`${mapContainerClass} w-full rounded-lg shadow-lg`}
          style={{ aspectRatio: "16/9" }}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <GenericDeckGLMapFirst
            viewState={viewState}
            tiffFiles={tiffFiles}
            zTranslations={zTranslations}
          />
        </motion.div>

        <motion.div
          className="flex justify-between w-full gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-1/2" style={{ aspectRatio: "16/9" }}>
            <ReactECharts option={chartOptions1} className="w-full h-full" />
          </div>
          <div className="w-1/2" style={{ aspectRatio: "16/9" }}>
            <ReactECharts option={chartOptions2} className="w-full h-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}