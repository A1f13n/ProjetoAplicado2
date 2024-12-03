import { insertHospedePessoa, validarLogin } from "./back-end.js";



// Verifica o estado de login
function checarEstadoLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    // const userId = localStorage.getItem('userId');

    if (isLoggedIn === 'true') {
        document.getElementById('loginButton').classList.add('d-none');
        document.getElementById('profileDropdown').classList.remove('d-none');
    } else {
        document.getElementById('loginButton').classList.remove('d-none');
        document.getElementById('profileDropdown').classList.add('d-none');
    }
}

// Executa a função checkLoginState ao carregar qualquer página
window.addEventListener('load', checarEstadoLogin);

// Evento de login - quando o formulário de login for submetido
module.exports = function login() {
    // document.getElementById('loginForm').addEventListener('submit', function(e) {
    alert(" ");
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim()

    alert("1");
    // Validação simples - Verifica se os campos não estão vazios
    if (email && password) {
      alert("if");
        // Salva o estado de login no localStorage
        try {
            alert("3");
            const logon = validarLogin(email, password);
        
            if (logon.length === 0) {
                throw new Error("Login inválido");
            } 

        } catch (error) {
            console.log(error);
        }
        

        localStorage.setItem('isLoggedIn', 'true');
        return true;
        // Redireciona para a página de acomodações
        // window.location.href = "./telaAcomodacoes.html";
    } else {
        alert("Por favor, preencha os campos de login.");
    }
};



// Logout
module.exports = function logout() {
    document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    // Redireciona o usuário para a página inicial de login
    window.location.href = "./index.html";
});
}

module.exports = function cadastro() {
    // Pegue os valores do formulário de cadastro
    const nome = document.getElementById('Nome').value.trim();
    const sobrenome = document.getElementById('Sobrenome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('Celular').value.trim();
    const data_nasc = document.getElementById('data_nasc').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const password = document.getElementById('inputPassword4').value.trim();

    try {
        const insert = insertHospedePessoa([nome + " " + sobrenome, cpf, password, data_nasc, telefone, email]);
        
    } catch (error) {
        console.log(error);
    }

    validarLogin(email, password);


    



}
checarEstadoLogin();


