function gerarImagem() {
    const nome = document.getElementById("nome").value.trim();
    const numero = document.getElementById("numero").value;

    if (nome === '') {
        alert('Por favor, digite seu nome.');
        return;
    }

    // Definindo as cores de fundo com gradiente dependendo do número
    let gradiente;
    if (numero === '11') {
        gradiente = 'linear-gradient(to bottom, #4a8ef9, #007bff)';
    } else {
        gradiente = 'linear-gradient(to bottom, #ffcc00, #ffaa00)';
    }

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <div class="circulo" style="background: ${gradiente}">
            <h2>${nome} é</h2>
            <p>${numero}</p>
        </div>
    `;

    // Mostrando o resultado e os botões
    resultadoDiv.classList.remove("invisivel");
    document.getElementById("gerar").style.display = 'none'; // Oculta o botão de gerar após clicar
    document.getElementById("compartilhar").style.display = 'block'; // Mostra o botão de compartilhar
    document.getElementById("baixar").style.display = 'block'; // Mostra o botão de baixar
}

function compartilhar() {
    const nome = document.getElementById("nome").value.trim();
    const numero = document.getElementById("numero").value;
    const link = `http://exemplo.com/voto?nome=${encodeURIComponent(nome)}&numero=${encodeURIComponent(numero)}`;

    if (navigator.share) {
        navigator.share({
            title: 'Mostre seu apoio 55 ou 11?',
            text: `${nome} é ${numero}`,
            url: link
        })
        .then(() => console.log('Compartilhado com sucesso'))
        .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
        alert('Compartilhamento não suportado neste navegador.');
    }
}