'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/
let countdownInterval;
let countdownElement = document.getElementById('countdown');
let rocketImage = document.getElementById('rocket');
let buttonImage = document.getElementById('firing-button');
let starContainer = document.querySelector('main');
let cancelButton = document.getElementById('cancel-button');
let resetButton = document.getElementById('reset-button');
let isPaused = false;
let remainingTime = 10;
let currentCountdown = 10;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/
function disableButton() {
    buttonImage.classList.add('disabled');
    buttonImage.removeEventListener('click', startCountdown);
}

function launchRocket() {
    rocketImage.classList.add('tookOff');
}

function reset() {
    clearInterval(countdownInterval);
    countdownElement.textContent = 10;
    rocketImage.src = 'images/rocket1.png';
    buttonImage.src = 'images/firing-button.png';
    buttonImage.classList.remove('disabled');
    rocketImage.classList.remove('tookOff');
    buttonImage.addEventListener('click', startCountdown);
    isPaused = false;
    remainingTime = 10;
    currentCountdown = 10;
}

function startCountdown() {
    rocketImage.src = 'images/rocket2.gif';

    if (!isPaused) {
        remainingTime = currentCountdown;
    }

    disableButton();

    countdownInterval = setInterval(function() {
        remainingTime--;
        currentCountdown = remainingTime;
        countdownElement.textContent = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            launchRocket();
            rocketImage.src = 'images/rocket3.gif';
            buttonImage.src = 'images/cancel-button.png';
        }
    }, 1000);
}

function createRandomStar() {
    let star = document.createElement('div');
    star.classList.add('star');

    let sizes = ['tiny', 'normal', 'big'];
    let randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    star.classList.add(randomSize);

    let maxX = window.innerWidth + 10;
    let maxY = window.innerWidth + 10;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    star.style.left = `${randomX}px`;
    star.style.bottom = `${randomY}px`;

    console.log(star);

    starContainer.appendChild(star);
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(countdownInterval);
    } else {
        startCountdown();
    }
}

/***********************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/***********************************************************************************/
for (let i = 0; i < 150; i++) {
    createRandomStar();
}

buttonImage.addEventListener('click', startCountdown);
cancelButton.addEventListener('click', togglePause);
resetButton.addEventListener('click', reset);
