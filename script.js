const canvas = document.createElement('canvas');
document.getElementById('animation-canvas').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configurações das colunas de dados
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(0);

// Letras ou números para efeito "matrix"
const chars = '01';
ctx.font = fontSize + "px monospace";

// Função para inicializar/reiniciar a chuva
function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(0);
}

// Função principal de animação
function draw() {
    // Fundo semi-transparente para efeito de rastro
    ctx.fillStyle = 'rgba(13,27,42,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000'; // caracteres em preto
    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Resetar aleatoriamente a coluna
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    requestAnimationFrame(draw);
}

// Inicia a animação imediatamente
draw();

// Reinicia a chuva a cada 1 minuto
setInterval(initDrops, 60000);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
});
