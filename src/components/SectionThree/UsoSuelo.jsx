// src/components/SectionThree/SectionThree.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { viewState, tiffFilesOne, zTranslationsOne } from "../../config/rasterConfig";
import GenericDeckGLMap from "../DeckGLMaps/GenericDeckGLMap";
import { MaskedStackedArea, MyChord } from "../charts/charts";
import "./SectionThree.css";
import { ImportExport } from "@mui/icons-material";

export default function UsoSuelo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: false });


  return (
    <section
      ref={sectionRef}
      className="h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white"
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        {/* ─── LEFT COLUMN: AREA + CHORD ─────────────────────────────────────────── */}
        <div className="flex flex-col h-full p-6" style={{ marginTop: "5vh" }}>
         
                <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-2xl font-bold mb-4"
                >
                Uso de Suelo (Área por Año)
                </motion.h2>
              
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 bg-black bg-opacity-30 rounded-md mb-8 p-4"
                  style={{ height: "35%", maxHeight: "35%" }}
                >
                  <MaskedStackedArea />
                </motion.div>

                {/* Chord Diagram */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl font-bold mb-4"
            
          >
            Flujo entre Clases de Uso
          </motion.h2>
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex-1 bg-black bg-opacity-30 rounded-md p-4"
                style={{ height: "35%", maxHeight: "35%" }}
            >
              <div >
                <MyChord />
          
              </div>
            </motion.div>
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
            className="w-full h-[80%] rounded-lg shadow-lg overflow-hidden"
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