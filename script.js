// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDk4lCsZDXfF0UP_fnQy5iA-3xxYjiRImY",
    authDomain: "pesquisasrc-24e40.firebaseapp.com",
    projectId: "pesquisasrc-24e40",
    storageBucket: "pesquisasrc-24e40.appspot.com",
    messagingSenderId: "196731563547",
    appId: "1:196731563547:web:2688a5c806f625714592be",
    measurementId: "G-LQSGZMTF8Y"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let candidatoEscolhido = null;

// Carregar candidatos
window.onload = async () => {
    const candidatosRef = db.collection('candidatos');
    const snapshot = await candidatosRef.get();
    
    snapshot.forEach(doc => {
        const candidato = doc.data();
        document.getElementById('candidatos').innerHTML += `
            <div class="candidato">
                <span>${candidato.nome}</span>
                <input type="radio" name="candidato" value="${candidato.nome}">
            </div>
        `;
    });
}

// Função de votação
function votar() {
    const radios = document.getElementsByName('candidato');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            candidatoEscolhido = radios[i].value;
            break;
        }
    }

    if (candidatoEscolhido) {
        db.collection('votos').add({
            candidato: candidatoEscolhido
        })
        .then(() => {
            document.getElementById('resultado').innerHTML = `Você votou em: ${candidatoEscolhido}`;
            document.getElementById('resultado').classList.remove('invisivel');
        })
        .catch((error) => {
            console.error("Erro ao registrar o voto: ", error);
        });
    } else {
        alert("Por favor, selecione um candidato.");
    }
}