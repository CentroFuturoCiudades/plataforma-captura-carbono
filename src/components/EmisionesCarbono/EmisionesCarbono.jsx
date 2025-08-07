import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CarbonStackedLineChart,
  TransitionsEmissionsChart,
  SettlementDestinationEmissionsChart,
  Emissions_Lost_Forest
} from "../charts/charts";
import "./SectionThree.css";

export default function EmisionesCarbono() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: false });

  // helper for staggering
  const animateProps = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay }
  });

  return (
    <section
      ref={sectionRef}
      className="h-screen snap-start bg-gradient-to-b from-[#324130] to-[#92843B] text-white"
    >
      <div className="h-full p-6" style={{ marginTop: "20vh" }}>
        {/* <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6"
        >
          EMISIONES DE CARBONO
        </motion.h2>
 */}
        {/* Two-column layout */}
        <div className="flex flex-1 gap-8" style={{ marginTop: "5vh" }}>
          {/* LEFT column: two line charts */}
          <div className="flex flex-col flex-1 gap-8" >
            {/* Urbanization emission line */}
            <motion.div {...animateProps(0.2)}>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl font-semibold mb-2"
              >
                Emisiones al Urbanizar
              </motion.h3>
              <div className="bg-black bg-opacity-30 rounded-md p-4" style={{ height: "35vh", maxHeight: "35vh" }}>
                <SettlementDestinationEmissionsChart />
              </div>
            </motion.div>

            {/* Forest-loss emission line */}
            <motion.div {...animateProps(0.6)}>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-2xl font-semibold mb-2"
              >
                Emisiones por clase de destino de uso del suelo
              </motion.h3>
              <div className="bg-black bg-opacity-30 rounded-md p-4" style={{ height: "35vh", maxHeight: "35vh" }}>
                <TransitionsEmissionsChart />
              </div>
            </motion.div>
          </div>
          {/* New RIGHT column: emissions stacked bar chart */}

          <div className="flex flex-col flex-1 gap-8" >
            {/* Línea de emisiones por urbanización */}
            <motion.div {...animateProps(1.0)}>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-2xl font-semibold mb-2"
              >
                Evolución de emisiones de CO₂
              </motion.h3>
              <div className="bg-black bg-opacity-30 rounded-md p-4" style={{ height: "35vh", maxHeight: "35vh" }}>
                <CarbonStackedLineChart />
              </div>
            </motion.div>

            <motion.div {...animateProps(1.0)}></motion.div>
            <motion.div {...animateProps(1.0)}>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-2xl font-semibold mb-2"
              >
                Emisiones causadas por la pérdida de superficie forestal
              </motion.h3>
              <div className="bg-black bg-opacity-30 rounded-md p-4" style={{ height: "35vh", maxHeight: "35vh" }}>
                <Emissions_Lost_Forest />
              </div>
            </motion.div>
          </div>
          

          {/* Old RIGHT column: stacked bar chart */}

          
          {/* <div className="flex flex-col flex-1 gap-8">
            <motion.div {...animateProps(1.0)}>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-2xl font-semibold mb-2"
              >
                Evolución de emisiones de CO₂
              </motion.h3>
              <div className="bg-black bg-opacity-30 rounded-md p-4" style={{ minHeight: "70vh" }}>
                <CarbonStackedLineChart />
              </div>
            </motion.div>
          </div> */}
        </div>
      </div>
    </section>
  );
}