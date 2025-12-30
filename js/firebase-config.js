// Arquivo: js/firebase-config.js

// Importa as ferramentas do Firebase (App, Banco de Dados e Autenticação)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Suas credenciais (NUNCA mude isso aqui, senão para de funcionar)
const firebaseConfig = {
  apiKey: "AIzaSyDKOHSsWGynhsTgwJMmuAO0UUKbPAKcO3U",
  authDomain: "controlepagamentos-7a5ab.firebaseapp.com",
  projectId: "controlepagamentos-7a5ab",
  storageBucket: "controlepagamentos-7a5ab.firebasestorage.app",
  messagingSenderId: "76744388996",
  appId: "1:76744388996:web:3d5296c240cab746d26dd1"
};

// 1. Inicializa o App
const app = initializeApp(firebaseConfig);

// 2. Inicializa o Banco de Dados (Firestore) e exporta
const db = getFirestore(app);

// 3. Inicializa a Autenticação e exporta
const auth = getAuth(app);

// Exporta as variáveis para podermos usar no script.js e painel.html
export { db, auth };