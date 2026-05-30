import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem('usuarioPetz') || '{}');

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2>Bem-vindo, {usuario.nome}! 🐾</h2>
        <p className="text-muted">Painel de administração do sistema Petz</p>
      </div>

      <div className="row justify-content-center g-4">
        <div className="col-md-4">
          <div className="card card-petz text-center p-4 h-100">
            <div style={{ fontSize: '3rem' }}>👤</div>
            <h5 className="mt-2">Usuários</h5>
            <p className="text-muted">Gerencie os usuários do sistema</p>
            <Link to="/usuarios" className="btn btn-petz mt-auto">
              Acessar
            </Link>
          </div>
        </div>
        {/* Aqui você vai adicionar os cards de Pets e Adoções (CRUD 2 e 3) */}
        <div className="col-md-4">
          <div className="card card-petz text-center p-4 h-100" style={{ opacity: 0.6 }}>
            <div style={{ fontSize: '3rem' }}>🐶</div>
            <h5 className="mt-2">Pets</h5>
            <p className="text-muted">Em breve — CRUD 2</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-petz text-center p-4 h-100" style={{ opacity: 0.6 }}>
            <div style={{ fontSize: '3rem' }}>📋</div>
            <h5 className="mt-2">Adoções</h5>
            <p className="text-muted">Em breve — CRUD 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
