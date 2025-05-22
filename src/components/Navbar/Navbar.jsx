import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-[#324130] via-[#324130] to-[#92843B] text-white sticky top-0 z-50 px-4 py-2">
      <div className="flex items-center">
        {/* Replace with your logo */}
        <img src="./bid.png" alt="Logo" className="h-10 ml-4" />
      </div>
      <ul className="flex space-x-6 mr-4">
        {/* <li>
          <a
            href="#inicio"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Inicio
          </a>
        </li> */}
        <li>
          <a
            href="#ciudades"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Ciudades
          </a>
        </li>
        <li>
          <a
            href="#escenarios"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Escenarios
          </a>
        </li>
        <li>
          <a
            href="#cobertura"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Cobertura
          </a>
        </li>
        <li>
          <a
            href="#futuro"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Acerca de
          </a>
        </li>
      </ul>
    </nav>
  );
}
