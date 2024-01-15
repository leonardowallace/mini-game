let ponto = 0;
let jogoEmAndamento = false;


const reiniciarBtn = document.getElementById('reiniciarBtn');
const iniciarBtn = document.getElementById('iniciarBtn');
const score = document.querySelector('.score');
const fim = document.querySelector('.fim');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');

audioStart = new Audio('./sound/audio_theme.mp3')
audioGameOver = new Audio('./sound/audio_gameover.mp3')



const iniciarJogo= () =>{
    jogoEmAndamento = true;
    pipe.classList.add('pipe-animation')

    // audio
  audioStart.play()
}

const reiniciarJogo = () => {
    jogoEmAndamento = false;
    ponto = 0;
    score.innerHTML = `SCORE: ${ponto}`
    //reset cano
    pipe.style.left = ''
    pipe.style.right = '-80'

    //reset mario
    mario.src='./imagens/mario.gif'
    mario.style.width = '150px'
    mario.style.bottom = '0'
    mario.style.margin = ''

    fim.style.display= 'none'

    //reset musica
    audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;
}

const jump = () => {
    if (jogoEmAndamento) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const loop = setInterval(() => {
    if (jogoEmAndamento) {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if(ponto > 2500){
          pipe.classList.remove('pipe-animation')
          pipe.classList.add('medium')
        } 

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.classList.remove('pipe-animation')
            pipe.classList.remove('medium')
            pipe.style.left = `${pipePosition}px`;

            mario.classList.remove('jump')
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './imagens/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '40px';

            //musica
            function stopAudioStart() {
                audioStart.pause()
              }
              stopAudioStart()
              
              audioGameOver.play()
              
              function stopAudio() {
                audioGameOver.pause()
              }
              setTimeout(stopAudio, 7000)

            fim.style.display = 'flex';
            jogoEmAndamento = false; // Definir jogoEmAndamento como falso antes de resetar a pontuação
            score.innerHTML = `SCORE: ${ponto}`;
        } else {
            ponto++;
            score.innerHTML = `SCORE: ${ponto}`;
        }
    }
}, 10);


//comandos para pular
document.addEventListener('keypress', e => {
    const tecla = e.key
    if (tecla === ' ') {
      jump()
    }
  })

  document.addEventListener('touchstart', e => {
    if (e.touches.length) {
      jump() 
    }
  })

//botão reiniciar
reiniciarBtn.addEventListener('click', reiniciarJogo);

iniciarBtn.addEventListener('click', iniciarJogo);