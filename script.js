let ponto = 0;
let jogoEmAndamento = true;

const score = document.querySelector('.score');
const fim = document.querySelector('.fim');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');

const jump = () => {
    if (jogoEmAndamento) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const reiniciarJogo = () => {
    window.location.reload(true)
}
const loop = setInterval(() => {
    if (jogoEmAndamento) {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudPosition = cloud.offsetLeft;

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './imagens/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '40px';

            cloud.style.animation = 'none';
            cloud.style.left = `${cloudPosition}px`;

            fim.style.display = 'block';
            jogoEmAndamento = false; // Definir jogoEmAndamento como falso antes de resetar a pontuação
            score.innerHTML = `Score: ${ponto}`;
            ponto = 0;
        } else {
            ponto++;
            score.innerHTML = `Score: ${ponto}`;
        }
    }
}, 10);

//comandos para pular
document.addEventListener('click', jump);
document.addEventListener('keydown', jump);

//botão reiniciar
reiniciarBtn.addEventListener('click', reiniciarJogo);
