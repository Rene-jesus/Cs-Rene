const state = {

    view: 
    {squares: document.querySelectorAll('.square'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    }, 

    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
};

function playSound() {
    let audio = new Audio('./src/audios/hit.m4a');
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu Resultado foi: " + state.values.result);       
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    const randomIndex = Math.floor(Math.random() * 9);
    const randomSquare = state.view.squares[randomIndex];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);    
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; 
                playSound();
            }
        })
    });
}


function initialize() {
    moveEnemy();
    addListenerHitBox();
}
initialize();