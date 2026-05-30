import React, { useState, useEffect } from 'react';
import Axios from 'axios';

// ─── Formulário de Cadastro ────────────────────────────────────────────────────
function FormularioUsuario({ aoSalvar }) {
  const [values, setValues] = useState({ nome: '', email: '', senha: '', telefone: '' });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');
    // Validação básica
    if (!values.nome || !values.email || !values.senha) {
      setErro('Nome, e-mail e senha são obrigatórios.');
      return;
    }
    Axios.post('http://localhost:3001/usuarios', values)
      .then(() => {
        setValues({ nome: '', email: '', senha: '', telefone: '' });
        aoSalvar(); // Recarrega a lista
      })
      .catch(() => setErro('Erro ao cadastrar usuário.'));
  };

  return (
    <div className="card card-petz p-4 mb-4">
      <h3 className="mb-3">➕ Cadastrar Usuário</h3>
      {erro && <div className="alert alert-danger py-2">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nome *</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              value={values.nome}
              onChange={handleChange}
              placeholder="Nome completo"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">E-mail *</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={values.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Senha *</label>
            <input
              type="password"
              name="senha"
              className="form-control"
              value={values.senha}
              onChange={handleChange}
              placeholder="Senha de acesso"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Telefone</label>
            <input
              type="text"
              name="telefone"
              className="form-control"
              value={values.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-0000"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-petz mt-3">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

// ─── Linha de Usuário (com edição inline) ─────────────────────────────────────
function LinhaUsuario({ usuario, aoAtualizar, aoExcluir }) {
  const [editando, setEditando] = useState(false);
  const [editData, setEditData] = useState({
    nome: usuario.nome,
    email: usuario.email,
    telefone: usuario.telefone || '',
  });

  const handleSalvar = () => {
    Axios.put(`http://localhost:3001/usuarios/${usuario.id}`, editData)
      .then(() => {
        setEditando(false);
        aoAtualizar();
      })
      .catch(() => alert('Erro ao atualizar usuário.'));
  };

  return (
    <tr>
      {editando ? (
        <>
          <td>{usuario.id}</td>
          <td>
            <input
              className="form-control form-control-sm"
              value={editData.nome}
              onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
            />
          </td>
          <td>
            <input
              className="form-control form-control-sm"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </td>
          <td>
            <input
              className="form-control form-control-sm"
              value={editData.telefone}
              onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
            />
          </td>
          <td>
            <button className="btn btn-success btn-sm me-1" onClick={handleSalvar}>
              ✅ Salvar
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{usuario.id}</td>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td>{usuario.telefone || '—'}</td>
          <td>
            <button className="btn btn-primary btn-sm me-1" onClick={() => setEditando(true)}>
              ✏️ Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => aoExcluir(usuario.id)}>
              🗑️ Excluir
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

// ─── Página Principal de Usuários ─────────────────────────────────────────────
function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = () => {
    Axios.get('http://localhost:3001/usuarios')
      .then((res) => setUsuarios(res.data))
      .catch(() => alert('Erro ao carregar usuários.'));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleExcluir = (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    Axios.delete(`http://localhost:3001/usuarios/${id}`)
      .then(() => carregarUsuarios())
      .catch(() => alert('Erro ao excluir usuário.'));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">👤 Gerenciar Usuários</h2>

      {/* Formulário de cadastro */}
      <FormularioUsuario aoSalvar={carregarUsuarios} />

      {/* Tabela de listagem */}
      <div className="card card-petz p-4">
        <h3 className="mb-3">📋 Lista de Usuários</h3>
        {usuarios.length === 0 ? (
          <p className="text-muted">Nenhum usuário cadastrado ainda.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead style={{ backgroundColor: 'rgb(235,167,104)', color: '#fff' }}>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <LinhaUsuario
                    key={u.id}
                    usuario={u}
                    aoAtualizar={carregarUsuarios}
                    aoExcluir={handleExcluir}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usuarios;
