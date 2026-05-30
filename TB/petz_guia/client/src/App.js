import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Proteção de rotas: só entra se estiver logado
function RotaProtegida({ children }) {
  const usuario = localStorage.getItem('usuarioPetz');
  return usuario ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RotaProtegida>
              <>
                <Navbar />
                <Dashboard />
              </>
            </RotaProtegida>
          }
        />
        <Route
          path="/usuarios"
          element={
            <RotaProtegida>
              <>
                <Navbar />
                <Usuarios />
              </>
            </RotaProtegida>
          }
        />
        {/* Redireciona qualquer rota desconhecida para login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
