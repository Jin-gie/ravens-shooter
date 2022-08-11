export class Raven {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "./assets/raven.png";
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * .5 + .3;
        this.width = this.spriteHeight * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = this.canvas.width;
        this.y = Math.random() * (this.canvas.height - this.height);
        this.directionX = Math.random() * 4 + 2;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;

        this.randomColors = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
        this.color = 'rbg(' + this.randomColors[0] + "," + this.randomColors[1] + "," + this.randomColors[2] + ")";
    }

    update(deltatime) {
        if (this.y < 0 || this.y > this.canvas.height - this.height)
            this.directionY = this.directionY * -1;
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width) window.lost++;
    }

    draw() {
        this.ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);
    }
}