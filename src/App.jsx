// src/App.js
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Contexto from "./components/SectionOne/SectionOne";
import SectionTwo from "./components/SectionTwo/SectionTwo";
import "./styles/App.css";
import UsoSuelo from "./components/SectionThree/UsoSuelo";
import PolicyLayout from "./components/PolicySection/PolicySection";
import EmisionesCarbono from "./components/EmisionesCarbono/EmisionesCarbono";

export default function App() {
  return (
    <div id ="myScrollContainer" className="h-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      <Navbar />
      <main className="snap-container">
        <section id="contexto" className="snap-start">
          <Contexto />
        </section>
        <section id="uso-suelo" className="snap-start">
          <UsoSuelo />
        </section>
        <section id="carbon-emmissions" className="snap-start">
          <EmisionesCarbono/>
        </section>
        <section id="futuro" className="snap-start">
          <PolicyLayout />
        </section>
      </main>
    </div>
  );
}