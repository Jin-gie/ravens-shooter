export class UI {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    drawScore() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Score: ' + window.score, 50, 75);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Score: ' + window.score, 55, 80);
    }
    
    drawLife() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Life: ' + "+ ".repeat(window.maxLost - window.lost), 50, 130);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Life: ' + "+ ".repeat(window.maxLost - window.lost), 55, 135);
    }
    
    drawGameOver() {
        let gameOverBoard = document.createElement("div");
        gameOverBoard.setAttribute("id", "gameOverBoard");
        gameOverBoard.innerHTML = `
            <h2>Game Over</h2>
            <p id="score">Your score is: ${window.score}</p>
            <div id="restartButton">
                <button id="restartBtn">Restart</button>
            </div>
            <div id="scoreBoard">
                ${window.score}
            </div>
        `;
        document.querySelector("body").appendChild(gameOverBoard);

        const restartButton = document.getElementById("restartBtn");
        restartButton.onclick = () => { window.location.reload() };

    }
}

