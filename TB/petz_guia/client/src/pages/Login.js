import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErro('');

    // Validação de campos obrigatórios
    if (!email || !senha) {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    setCarregando(true);
    Axios.post('http://localhost:3001/login', { email, senha })
      .then((res) => {
        // Salva o usuário logado no localStorage (controle de sessão)
        localStorage.setItem('usuarioPetz', JSON.stringify(res.data.usuario));
        navigate('/');
      })
      .catch((err) => {
        setErro(err.response?.data?.error || 'Erro ao fazer login.');
      })
      .finally(() => setCarregando(false));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: '#fdf8f3' }}
    >
      <div className="card card-petz p-4" style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h1 style={{ fontSize: '3rem' }}>🐾</h1>
          <h2 className="fw-bold" style={{ color: 'rgb(235,167,104)' }}>Petz Admin</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Faça login para continuar</p>
        </div>

        {/* Alerta de erro */}
        {erro && <div className="alert alert-danger py-2">{erro}</div>}

        {/* Formulário */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@petz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-petz w-100"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-muted mt-3" style={{ fontSize: '0.8rem' }}>
          Teste: admin@petz.com / 1234
        </p>
      </div>
    </div>
  );
}

export default Login;
