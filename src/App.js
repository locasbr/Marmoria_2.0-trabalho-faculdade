// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Notas from './pages/Notas';
import Clientes from './pages/Clientes';
import Marmores from './pages/Marmores';
import Movimentacoes from './pages/Movimentacoes';
import Orcamentos from './pages/Orcamentos';

function App() {
  return (
    <Router>
      <div className="container-fluid p-0">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/marmores" element={<Marmores />} />
          <Route path="/movimentacoes" element={<Movimentacoes />} />
          <Route path="/orcamentos" element={<Orcamentos />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;