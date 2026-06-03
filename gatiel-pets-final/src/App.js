import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RotaProtegida from './components/RotaProtegida';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Pets from './pages/Pets';
import Adocoes from './pages/Adocoes';
import Relatorio from './pages/Relatorio';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaginaProtegida({ children }) {
  return (
    <RotaProtegida>
      <Navbar />
      <div className="container mt-4">{children}</div>
    </RotaProtegida>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/"          element={<PaginaProtegida><Dashboard /></PaginaProtegida>} />
          <Route path="/usuarios"  element={<PaginaProtegida><Usuarios /></PaginaProtegida>} />
          <Route path="/pets"      element={<PaginaProtegida><Pets /></PaginaProtegida>} />
          <Route path="/adocoes"   element={<PaginaProtegida><Adocoes /></PaginaProtegida>} />
          <Route path="/relatorio" element={<PaginaProtegida><Relatorio /></PaginaProtegida>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
