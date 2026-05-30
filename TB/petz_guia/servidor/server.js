const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "",
  user: "",
  port: 2222,
  password: "",           // ← coloque sua senha do MySQL aqui se tiver
  database: "petzdb",
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ─── LOGIN ────────────────────────────────────────────────────────────────────
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const SQL = "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?";
  db.query(SQL, [email, senha], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });
    if (result.length === 0) return res.status(401).json({ error: "Email ou senha incorretos" });
    res.json({ message: "Login realizado com sucesso", usuario: result[0] });
  });
});

// ─── CRUD USUÁRIOS ────────────────────────────────────────────────────────────

// Listar todos os usuários
app.get("/usuarios", (req, res) => {
  const SQL = "SELECT id, nome, email, telefone FROM usuarios";
  db.query(SQL, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao listar usuários" });
    res.json(result);
  });
});

// Cadastrar novo usuário
app.post("/usuarios", (req, res) => {
  const { nome, email, senha, telefone } = req.body;
  const SQL = "INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)";
  db.query(SQL, [nome, email, senha, telefone], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    res.json({ message: "Usuário cadastrado com sucesso", id: result.insertId });
  });
});

// Editar usuário
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  const SQL = "UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?";
  db.query(SQL, [nome, email, telefone, id], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao editar usuário" });
    res.json({ message: "Usuário atualizado com sucesso" });
  });
});

// Excluir usuário
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE FROM usuarios WHERE id = ?";
  db.query(SQL, [id], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir usuário" });
    res.json({ message: "Usuário excluído com sucesso" });
  });
});

app.listen(3001, () => {
  console.log("✅ Servidor rodando na porta 3001");
});
