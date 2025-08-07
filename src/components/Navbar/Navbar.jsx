import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-[#324130] via-[#324130] to-[#92843B] text-white sticky top-0 z-50 px-4 py-2">
      <div className="flex items-center">
        {/* Replace with your logo */}
        <img src="./bid.png" alt="Logo" className="h-10 ml-4" />
      </div>
      <ul className="flex space-x-6 mr-4">
        
        <li>
          <a
            href="#contexto"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Contexto
          </a>
        </li>
        <li>
          <a
            href="#uso-suelo"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Uso de Suelo
          </a>
        </li>
        <li>
          <a
            href="#carbon-emmissions"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Emisiones de Carbono
          </a>
        </li>
        <li>
          <a
            href="#futuro"
            className="text-white text-lg font-bold hover:text-gray-300"
          >
            Políticas y Futuro
          </a>
        </li>
      </ul>
    </nav>
  );
}
