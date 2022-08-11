export class UI {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    drawMenu() {
        let startMenu = document.createElement("div");
        startMenu.setAttribute("id", "startMenu");
        startMenu.innerHTML = `
            <div id="form">
                <input type="text" id="pseudo" name="pseudo" value="${localStorage.pseudo ? localStorage.pseudo : ""}" placeholder="Nickname"> 
                <input type="submit" value="Play" id="startBtn" />
            </div>
        `;
        document.querySelector("body").appendChild(startMenu);
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
        // update scoreboard
        const d = new Date();
        const value = {
            nickname: localStorage.getItem("pseudo"),
            score: window.score,
            date: d.getTime(),
        }

        let scores = JSON.parse(localStorage.getItem("scores"));
        if (!scores) scores = []; 
        scores[scores.length] = value
        
        localStorage.setItem("scores", JSON.stringify(scores));

        // show board
        let gameOverBoard = document.createElement("div");
        gameOverBoard.setAttribute("id", "gameOverBoard");
        gameOverBoard.innerHTML = `
            <h2>Game Over</h2>
            <p id="score">Your score is: ${window.score}</p>
            <div id="restartButton">
                <button id="restartBtn">Restart</button>
            </div>
            <div id="scoreBoard">
            </div>
        `;
        document.querySelector("body").appendChild(gameOverBoard);

        for (let i = 0; i < scores.length; i++) {
            const e = scores[i];
            const de = new Date(e.date);
            const eDate = de.getDate() + "/" + (de.getMonth()+1) + "/" + de.getFullYear() + " " + de.getHours() + ":" + de.getMinutes();
            const line = document.createElement("div");
            line.setAttribute("class", "boardLine");
            line.innerHTML = `
                <p>${eDate}</p>
                <p>${e.nickname}</p>
                <p>${e.score}</p>
            `;
            document.getElementById("scoreBoard").prepend(line);
        }

        const restartButton = document.getElementById("restartBtn");
        restartButton.onclick = () => {window.location.reload()};
    }
}

