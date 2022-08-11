/** @type {HTMLCanvasElement} */
import { Raven } from "./src/Raven.js";
import { Explosion } from "./src/Explosion.js";
import { UI } from "./src/ui.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ui = new UI(canvas, ctx);

ctx.font = '50px Impact'
window.score = 0;
window.maxLost = 3;
window.lost = 0;

let timeToNextRaven = 0;
let ravenInterval = 1000;
let lasttime = 0;

let ravens = [];
let explosions = [];

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
    ui.drawScore();
    ui.drawLife();
    [...ravens, ...explosions].forEach(e => e.update(deltatime));
    [...ravens, ...explosions].forEach(e => e.draw());
    ravens =  ravens.filter(e => !e.markedForDeletion);
    explosions = explosions.filter(e => !e.markedForDeletion);

    if (!(window.lost >= window.maxLost)) requestAnimationFrame(animate);
    else ui.drawGameOver();
}

// addEventListener("resize", () => { window.location.reload(); });

function startGame() {
    ui.drawMenu();
    const startBtn = document.getElementById("startBtn");
    startBtn.onclick = (e) => {
        let pseudoV = document.getElementById("pseudo").value;
        if (pseudoV.length > 0) {
            document.getElementById("startMenu").remove();
            localStorage.setItem("pseudo", pseudoV);
            animate(0)
        }
    }
} 

startGame();
