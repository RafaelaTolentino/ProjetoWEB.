import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: '#e8973c' }}>
          🐾 Gatiel Pets
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <Link className="nav-link" to="/">Início</Link>
          <Link className="nav-link" to="/usuarios">Usuários</Link>
          <Link className="nav-link" to="/pets">Pets</Link>
          <Link className="nav-link" to="/adocoes">Adoções</Link>
          <Link className="nav-link" to="/relatorio">Relatório</Link>
          <span className="text-muted small">Olá, {usuario?.nome}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Sair</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
