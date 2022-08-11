/** @type {HTMLCanvasElement} */
import { Raven } from "./src/Raven.js";
import { Explosion } from "./src/Explosion.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = '50px Impact'
let score = 0;
window.maxLost = 3;
window.lost = 0;

let timeToNextRaven = 0;
let ravenInterval = 1000;
let lasttime = 0;

let ravens = [];
let explosions = [];
let particles = [];

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}

function drawLife() {
    ctx.fillStyle = 'black';
    ctx.fillText('Life: ' + "+ ".repeat(window.maxLost - window.lost), 50, 130);
    ctx.fillStyle = 'white';
    ctx.fillText('Life: ' + "+ ".repeat(window.maxLost - window.lost), 55, 135);
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width/2, canvas.height/2);
}

window.addEventListener('click', (e) => {
    ravens.forEach(raven => {
        if (e.x > raven.x && e.x < raven.x + raven.width &&
            e.y > raven.y && e.y < raven.y + raven.width) {
            // collision between click and the raven
            raven.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(canvas, ctx, raven.x, raven.y, raven.width));
        }
    });
});

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lasttime;
    lasttime = timestamp;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven(canvas, ctx));
        timeToNextRaven = 0;
    }
    drawScore();
    drawLife();
    [...ravens, ...explosions].forEach(e => e.update(deltatime));
    [...ravens, ...explosions].forEach(e => e.draw());
    ravens =  ravens.filter(e => !e.markedForDeletion);
    explosions = explosions.filter(e => !e.markedForDeletion);

    if (!(window.lost >= window.maxLost)) requestAnimationFrame(animate);
    else drawGameOver();
}

animate(0);