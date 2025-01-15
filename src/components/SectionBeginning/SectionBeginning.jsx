// src/components/SectionBeginning/SectionBeginning.js
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChoosingRegionMap from "../DeckGLMaps/ChoosingRegionMap";

import "./SectionBeginning.css"; // optional if you want specific styles
export default function SectionBeginning() {
  const sectionRef = useRef(null);
  
    // useInView returns true when the element is sufficiently in the viewport
  const isInView = useInView(sectionRef, {
    amount: 0.5, // how much of the element should be in view to trigger
    once: false,  // whether it should only animate once
  });
  return (
    <motion.div 
    ref={sectionRef}
    initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    
    className="min-h-screen w-full flex flex-col bg-white snap-start">
      {/** 
       * Hero/Map Section 
       */}
      <div className="relative w-full h-[100vh]">
        {/* Map behind everything */}
        <ChoosingRegionMap />

        {/* Another overlay in bottom-right, if you want the "Selecciona..." text */}
        <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-8 bg-white/80 rounded-lg shadow-lg p-4 max-w-sm">
          <h2 className="text-2xl font-semibold text-[#324130] mb-2">
            Selecciona...
          </h2>
          <p className="text-[#324130]">
            El país de tu interés, descubre sus ciudades dentro de La Amazonía
            y lo que está pasando en ellas.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}