import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    // Login simulado — sem backend
    if (email === 'admin@gatiel.com' && senha === '1234') {
      login({ id: 1, nome: 'Admin', email });
      navigate('/');
    } else {
      setErro('E-mail ou senha incorretos.');
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: 400 }}>

        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🐾</div>
          <h3 className="fw-bold" style={{ color: '#e8973c' }}>Gatiel Pets</h3>
        </div>

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input type="email" className="form-control"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control"
              value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: '#e8973c' }}>
            Entrar
          </button>
        </form>

        <p className="text-center text-muted small mt-3">
          
        </p>
      </div>
    </div>
  );
}

export default Login;
