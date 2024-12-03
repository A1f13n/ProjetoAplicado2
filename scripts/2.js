const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 5500;

// Middleware
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sua_senha",
  database: "pousada",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err);
    return;
  }
  console.log("Conexão com banco de dados estabelecida.");
});

// Função para validar login
app.post("/validarLogin", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  const query = "SELECT senha FROM pessoa WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await compare(senha, results[0].senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    res.status(200).json({ message: "Login bem-sucedido." });
  });
});

// Função para cadastrar pessoa e hóspede
app.post("/insertHospedePessoa", async (req, res) => {
  const { nome, cpf, senha, data_nasc, telefone, email } = req.body;

  if (!nome || !cpf || !senha || !data_nasc || !telefone || !email) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }


  const insertPessoa = `
    INSERT INTO pessoa (nome, cpf, senha, data_nasc, telefone, email) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    insertPessoa,
    [nome, cpf, senha, data_nasc, telefone, email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir dados na tabela pessoa." });
      }

      const idPessoa = result.insertId;

      const insertHospede = `
        INSERT INTO hospede (id_pessoa, data_criacao_conta, ultimo_login) 
        VALUES (?, CURDATE(), CURDATE())`;

      db.query(insertHospede, [idPessoa], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao inserir dados na tabela hóspede." });
        }

        res.status(201).json({ message: "Hóspede cadastrado com sucesso." });
      });
    }
  );
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
