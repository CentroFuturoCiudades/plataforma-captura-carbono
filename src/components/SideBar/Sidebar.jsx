import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Información Histórica</h2>
      <div>
        <h3>Captura de Carbono</h3>
        <p>2008: 0t</p>
        <p>2024: +0t</p>
      </div>
      <h2>Escenarios</h2>
      <div>
        <h3>Tendencial</h3>
        <p>Total Carbono: 0t</p>
      </div>
      <div>
        <h3>Controlado</h3>
        <p>Total Carbono: 0t</p>
      </div>
      <div>
        <h3>Acelerado</h3>
        <p>Total Carbono: 0t</p>
      </div>
    </div>
  );
}

export default Sidebar;
