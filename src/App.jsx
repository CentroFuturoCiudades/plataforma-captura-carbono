// src/App.js
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import SectionOne from "./components/SectionOne/SectionOne";
import SectionTwo from "./components/SectionTwo/SectionTwo";
import "./styles/App.css";
import SectionThree from "./components/SectionThree/SectionThree";
import SectionBeginning from "./components/SectionBeginning/SectionBeginning";
import PolicyLayout from "./components/PolicySection/PolicySection";

export default function App() {
  return (
    <div id ="myScrollContainer" className="h-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      <Navbar />
      <main className="snap-container">
        <section id="inicio" className="snap-start">
          <SectionBeginning />
        </section>
        <section id="ciudad" className="snap-start">
          <SectionOne />
        </section>
        <section id="escenarios" className="snap-start">
          <SectionTwo />
        </section>
        <section id="cobertura" className="snap-start">
          <SectionThree />
        </section>
        <section id="futuro" className="snap-start">
          <PolicyLayout />
        </section>
      </main>
    </div>
  );
}