//canvas 1
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas 2
const canvasbg = document.getElementById("canvas");
const ctxbg = canvasbg.getContext('2d');
canvasbg.width = window.innerWidth;
canvasbg.height = window.innerHeight;

let Bubbles = [];
let bgBubbles = [];

function addBubble() {
    Bubbles.push(new Bubble('rgba(235,72,54, 0.1)', 0.2, 1))
}

function addBgBubble() {
    bgBubbles.push(new Bubble('rgb(255, 194, 194)', 0.7, 1))
}

class Bubble {
    constructor(color, ySpeed, direction) {
        this.maxR = 100;
        this.shrink = false;
        this.radius = 2;
        this.life = true;
        this.x = (Math.random()*window.innerWidth);
        if (direction === 1) {
            this.y =  (Math.random()*window.innerHeight);
            this.vy = ((Math.random()*0.0005) + 0.0005) + ySpeed*(Math.random()-0.5);
        }
        this.vr = 0;
        this.vrIncr = Math.random()/1000;
        this.vx = ((Math.random()*0.0005) + 0.0005) + ySpeed*(Math.random()-0.5);
        this.color = color
    }
    update() {
        this.vy += 0.00001;
        this.vr += this.vrIncr;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1) {
            if (!this.shrink){
                this.radius += this.vr;
            } else {
                this.radius -= this.vr;
            }
        
            if (this.radius >= this.maxR){
                this.shrink = true;
            }
        }

        if (this.radius <= 1) {
            this.life = false;
        }
    }
    draw(currentCanvas) {
        currentCanvas.beginPath();
        currentCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        currentCanvas.fillStyle = this.color;
        currentCanvas.fill();
    }
}

function handleBubbles() {
    for (let i = Bubbles.length - 1; i >= 0; i--) {
        Bubbles[i].update();
        if (!Bubbles[i].life){
            Bubbles.splice(i, 1);
        }
    }

    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].update();
        if (!bgBubbles[i].life){
            bgBubbles.splice(i, 1);
        }
    }

    if (Bubbles.length < (window.innerWidth / 4)) {
        addBubble();
    }

    if (bgBubbles.length < (window.innerWidth / 8)) {
        addBgBubble();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxbg.clearRect(0, 0, canvasbg.width, canvasbg.height);

    handleBubbles();

    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].draw(ctxbg);
    }
    for (let i = Bubbles.length - 1; i >= 0; i--) {
        Bubbles[i].draw(ctx);
    }

    requestAnimationFrame(animate);
}

window.addEventListener('load', animate);
window.addEventListener('resize', function(){
    canvasbg.width = window.innerWidth;
    canvasbg.height = window.innerHeight;
})

setInterval(() => {
    console.log(bgBubbles.length);
}, 1000);