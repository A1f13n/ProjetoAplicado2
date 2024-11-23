import mysql from 'mysql2'
//npm install mysql2
// após instalar, rode "node init -y" e adicione no arquivo package.json -> [ "type": "module", ]
import dotenv from 'dotenv'
//npm install dotenv
dotenv.config() 

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//CRUD PESSOA
export async function insert_pessoa(nome, cpf, login, senha, data_nasc, telefone, email) {
    // VALIDACAO AQUI
    const [rows] = await pool.query('INSERT INTO pessoa(nome, cpf, login, senha, data_nasc, telefone, email VALUES(?, ?, ?, ?, ?, ?, ?);')
    [nome, cpf, login, senha, data_nasc, telefone, email]
    return rows
}

export async function select_pessoa(id) {
    const [rows] = await pool.query("SELECT * FROM pessoa where id = ?;", [id])
    return rows
}

export async function update_pessoa(coluna, informacao, id) {
    // VALIDACAO AQUI
    const [rows] = await pool.query("UPDATE pessoa SET ? = ? WHERE id = ?;", 
        [coluna, informacao, id])
    return rows
}

export async function delete_pessoa(id) {
    // VALIDACAO AQUI || precisa? VERIFICAR CASO RETORNE ERRO AO NAO ACHAR O ID
    const [rows] = await pool.query("DELETE FROM pessoa WHERE id = ?;", [id])
    return rows
}

//CRUD FUNCIONARIO
export async function insert_funcionario(id_pessoa, cargo, salario, data_admissao) {
    //VALIDACAO AQUI \\ como vai funcionar na lógica o insert de funcionario e hospedes??
    const [rows] = await pool.query("INSERT INTO funcionario(id_pessoa, cargo, salario, data_admissao) VALUES (?, ?, ?, ?);", [id_pessoa, cargo, salario, data_admissao])    
    return rows
}

export async function select_funcionario(id) {
    const [rows] = await pool.query("SELECT * FROM funcionario WHERE id = ?;", [id])
    return rows
}

export async function update_pessoa(coluna, informacao, id) {
    //VALIDACAO AQUI
    const [rows] = await pool.query("UPDATE funcionario SET ? = ? WHERE id - ?;", [coluna, informacao, id])
    return rows
}

export async function delete_pessoa(id) {
    const [rows] = await pool.query("DELETE FROM funcionario WHERE id = ?;")
    return rows
}

//CRUD HOSPEDE
export async function insert_hospede(id_pessoa, data_criacao_conta, ultimo_login) {
    //VALIDACAO AQUI || default pro ultimo login ao criar a conta é o data_criacao_conta
    const [rows] = await pool.query("INSERT INTO hospede(id_pessoa, data_criacao_conta, ultimo_login) VALUES (")
    return rows
}

export async function select_hospede(id) {
    const [rows] = await pool.query("SELECT * FROM hospede WHERE id = ?", [id]) 
    return rows
}

export async function update_hospede(coluna, informacao, id) {
    const [rows] = await pool.query("UPDATE hospede SET ? = ? WHERE id = ?", [coluna, informacao, id])
    return rows
}

export async function delete_hospede(id) {
    const [rows] = await pool.query("DELETE FROM hospede WHERE id - ?", [id])
    return rows
}

//CRUD ACOMODACAO

export async function insert_acomodacao(nome, capacidade, numero_camas, descricaco_comodidades, valor_diaria, disponibilidade) {
    // VALIDACAO AQUI
    const [rows] = await pool.query("INSERT INTO acomodacao(nome, capacidade, numero_camas, descricao_acomodidades, valor_diario, disponibilidade", [nome, capacidade, numero_camas, descricao_acomodidades, valor_diaria, disponibilidade])
    return rows
}
