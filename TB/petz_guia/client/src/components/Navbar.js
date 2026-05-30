import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioPetz') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('usuarioPetz');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(235,167,104,0.3)',
      }}
    >
      <div className="container">
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold" to="/" style={{ color: 'rgb(235,167,104)', fontSize: '1.5rem' }}>
          🐾 Petz Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navPetz"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navPetz">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">Usuários</Link>
            </li>
          </ul>

          <span className="navbar-text me-3" style={{ color: 'gray', fontSize: '0.9rem' }}>
            Olá, <strong>{usuario.nome || 'Usuário'}</strong>
          </span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
