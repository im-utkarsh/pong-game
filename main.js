// Need to use an update loop for every frame, which will calculate current position of elements in game

import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector(".ball"));
const playerPaddle = new Paddle(document.querySelector(".paddle.left"));
const computerPaddle = new Paddle(document.querySelector(".paddle.right"));
const playerScore = document.querySelector(".player-score");
const machineScore = document.querySelector(".machine-score");

let lastTime;
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime;
        // console.log(delta);
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y); // for machines paddle
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        );
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
        if (isLose()) handleLose();
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth)
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    else machineScore.textContent = parseInt(machineScore.textContent) + 1;
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);
