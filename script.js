const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => 1);

const phrase = 'ALEXANDER PROGRAMADOR!!!!!!';
const subphrases = [
    'A', 'AL', 'ALE', 'ALEX', 'ALEXA', 'ALEXAN', 'ALEXAND', 'ALEXANDE', 'ALEXANDER',
    'ALEXANDER P', 'ALEXANDER PR', 'ALEXANDER PRO', 'ALEXANDER PROG', 'ALEXANDER PROGR',
    'ALEXANDER PROGRA', 'ALEXANDER PROGRAM', 'ALEXANDER PROGRAMA', 'ALEXANDER PROGRAMAD',
    'ALEXANDER PROGRAMADOR', 'ALEXANDER PROGRAMADOR!'
];
let subphraseIndex = 0;
const phraseDuration = 30 * 1000; // 30 segundos
const interval = phraseDuration / subphrases.length;

const centerText = document.getElementById('centerText');

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 255, 0, 0.75)'; // Make the letters more transparent
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

function updatePhrase() {
    if (subphraseIndex < subphrases.length) {
        centerText.textContent = subphrases[subphraseIndex];
        subphraseIndex++;
    } else {
        centerText.textContent = subphrases[subphrases.length - 1]; // Mantener la última frase en pantalla
    }
}

function animate() {
    drawMatrix();
    requestAnimationFrame(animate);
}

setInterval(updatePhrase, interval);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

