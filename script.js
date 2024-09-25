function gerarVoto() {
    const partido = document.getElementById('partido').value;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o gradiente de fundo
    let gradiente;
    if (partido === '11') {
        gradiente = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradiente.addColorStop(0, '#004080'); // Azul escuro
        gradiente.addColorStop(1, '#0066cc'); // Azul mais claro
    } else if (partido === '55') {
        // Para o partido 55, um fundo sólido
        ctx.fillStyle = '#ffcc00'; // Laranja/amarelo
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Preenche o gradiente de fundo
    if (partido === '11') {
        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Desenha o círculo
    const raio = 100;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, raio, 0, Math.PI * 2);
    ctx.fillStyle = 'transparent'; // Círculo transparente para o gradiente
    ctx.fill();
    ctx.strokeStyle = '#ffffff'; // Contorno do círculo
    ctx.lineWidth = 5;
    ctx.stroke();

    // Adiciona o texto "Votarei"
    ctx.font = 'bold 20px Poppins'; // Fonte atualizada
    ctx.fillStyle = partido === '11' ? '#ffffff' : '#000000'; // Cor do texto
    ctx.textAlign = 'center';
    ctx.fillText('Votarei', canvas.width / 2, canvas.height / 2 - 10);

    // Adiciona o número do partido
    ctx.font = 'bold 40px Poppins'; // Fonte atualizada
    ctx.fillText(partido, canvas.width / 2, canvas.height / 2 + 30);
}

function baixarImagem() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'voto.png';
    link.href = canvas.toDataURL();
    link.click();
}
function compartilhar() {
    const canvas = document.getElementById('canvas');
    const link = canvas.toDataURL(); // Captura a imagem do canvas

    // Verifica se a API de compartilhamento é suportada
    if (navigator.share) {
        navigator.share({
            title: 'Mostre seu apoio 55 ou 11?',
            text: 'Crie seu voto personalizado!',
            url: window.location.href, // URL do site
            files: [new File([link], 'voto.png', { type: 'image/png' })]
        }).then(() => {
            console.log('Compartilhado com sucesso!');
        }).catch((error) => {
            console.log('Erro ao compartilhar:', error);
        });
    } else {
        // Para navegadores que não suportam a API de compartilhamento
        alert("Compartilhamento não suportado nesse navegador.");
    }
}