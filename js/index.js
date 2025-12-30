// js/script.js

// --- IMPORTAÇÕES ---
// Aqui estamos "chamando" a configuração que criamos no outro arquivo (firebase-config.js)
// O "./" significa "nesta mesma pasta".
import { auth } from "./firebase-config.js";

// Aqui importamos a função de Login direto dos servidores do Google.
// É essa função que faz a mágica de verificar a senha.
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// --- PEGANDO ELEMENTOS DA TELA ---
// O javascript precisa saber quem são os campos lá no HTML para poder ler o que foi digitado.
const inputEmail = document.getElementById('email');   // Campo de E-mail
const inputSenha = document.getElementById('senha');   // Campo de Senha
const btnEntrar = document.querySelector('.btn-entrar'); // O Botão de entrar

// --- FUNÇÃO DE LOGIN ---
// O "async" avisa que essa função vai precisar esperar uma resposta da internet
async function fazerLogin() {
    
    // 1. Pega o texto que está escrito nos campos
    const email = inputEmail.value;
    const senha = inputSenha.value;

    // 2. Validação simples: Se estiver vazio, avisa e para tudo.
    if (!email || !senha) {
        alert("Por favor, preencha e-mail e senha.");
        return; // O return para a função aqui.
    }

    // 3. Perfumaria: Muda o botão para o usuário saber que está carregando
    const textoOriginal = btnEntrar.innerText;
    btnEntrar.innerText = "Entrando...";
    btnEntrar.disabled = true; // Desabilita o botão para não clicar 2x

    try {
        // --- AQUI É O MOMENTO DA VERDADE ---
        // O "await" diz: "Espere o Google responder antes de continuar".
        // Ele envia o email e senha para o Firebase verificar.
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        
        // Se chegou aqui, é porque a senha estava certa!
        console.log("Sucesso! Usuário logado:", userCredential.user.email);
        
        // Redireciona para a página do painel
        window.location.href = "painel.html";

    } catch (error) {
        // Se a senha estiver errada ou der erro, o código pula direto para cá (catch)
        console.error("Erro:", error.code, error.message);
        
        // Volta o botão ao normal
        btnEntrar.innerText = textoOriginal;
        btnEntrar.disabled = false;

        // Traduzindo os erros mais comuns do Google para Português
        if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            alert("E-mail ou senha incorretos.");
        } else if (error.code === "auth/too-many-requests") {
            alert("Muitas tentativas falhas. O Google bloqueou temporariamente por segurança. Aguarde uns minutos.");
        } else {
            alert("Erro ao entrar: " + error.message);
        }
    }
}

// --- EVENTOS ---
// Quando clicar no botão, roda a função fazerLogin
btnEntrar.addEventListener('click', fazerLogin);

// Quando apertar ENTER no campo de senha, também roda a função
inputSenha.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fazerLogin();
});
