const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

let particlesArray = [];

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.6 + 0.3;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height + 10) {
            this.reset();
        }

        if (this.x > canvas.width || this.x < 0) {
            this.x = Math.random() * canvas.width;
        }
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 130; i++) { // slightly more for richer look
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
});
