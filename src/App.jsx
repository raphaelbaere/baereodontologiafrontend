/* eslint-disable require-jsdoc */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Pacientes from './pages/Pacientes/Pacientes';
import Ficha from './pages/Ficha/Ficha';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/pacientes/:id" element={<Ficha />} />
    </Routes>
  );
}

export default App;
