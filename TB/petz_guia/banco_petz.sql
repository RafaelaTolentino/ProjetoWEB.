CREATE DATABASE IF NOT EXISTS petzdb;
USE petzdb;

-- Tabela de usuários (inclui o usuário admin para login)
CREATE TABLE IF NOT EXISTS usuarios (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  nome     VARCHAR(100) NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  senha    VARCHAR(100) NOT NULL,
  telefone VARCHAR(20)
);

-- Usuário padrão para testar o login
INSERT INTO usuarios (nome, email, senha, telefone)
VALUES ('Admin Petz', 'admin@petz.com', '1234', '(11) 99999-0000');

-- Mais usuários de exemplo
INSERT INTO usuarios (nome, email, senha, telefone) VALUES
('Maria Silva',  'maria@email.com',  'senha123', '(11) 91111-2222'),
('João Souza',   'joao@email.com',   'senha456', '(21) 93333-4444');
