document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const numero = document.getElementById('numero').value;

    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    let gradient;
    if (numero === "11") {
        gradient = ctx.createLinearGradient(0, 0, 500, 0);
        gradient.addColorStop(0, '#0052D4'); // Azul escuro
        gradient.addColorStop(1, '#65C7F7'); // Azul claro
    } else if (numero === "55") {
        gradient = ctx.createLinearGradient(0, 0, 500, 0);
        gradient.addColorStop(0, '#FFD700'); // Amarelo
        gradient.addColorStop(1, '#ff8c00'); // Laranja
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Adicionar textura ao fundo
    const texture = new Image();
    texture.src = 'https://www.transparenttextures.com/patterns/white-paper.png'; // URL da textura
    texture.onload = function() {
        ctx.drawImage(texture, 0, 0, canvas.width, canvas.height);
    };

    // Definir a fonte e cor do texto para o nome
    ctx.font = 'bold 60px Poppins'; // Tamanho da fonte do nome
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF'; // Branco
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;

    // Desenhar o nome com "é" próximo
    ctx.fillText(`${nome} é`, canvas.width / 2, canvas.height / 2 - 20); // Nome e "é" na mesma linha

    // Definir a fonte para o número
    ctx.font = 'bold 90px Poppins'; // Aumentar o tamanho da fonte do número
    ctx.fillText(numero, canvas.width / 2, canvas.height / 2 + 70); // Número na linha abaixo, mais baixo

    // Adicionar ícones
    const icon = new Image();
    icon.src = numero === "11" ? 'https://img.icons8.com/color/48/000000/vote.png' : 'https://img.icons8.com/color/48/000000/checkmark.png';
    icon.onload = function() {
        ctx.drawImage(icon, canvas.width / 2 - 80, canvas.height / 2 - 40, 50, 50); // Ícone à esquerda do nome
    };

    // Exibir o link para download
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'block'; // Mostrar o link de download
});