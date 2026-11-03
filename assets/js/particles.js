
/* =========================================
   INTERACTIVE GRID PARTICLE BACKGROUND
========================================= */

const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width = window.innerWidth;
let height = window.innerHeight;

const mouse = {
    x: null,
    y: null,
    radius: 150
};

const settings = {
    spacing: 35,
    particleSize: 1.5,
    returnSpeed: 0.06,
    mouseStrength: 45,
    color: "108, 99, 255"
};

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================
   1. CANVAS SIZE
========================================= */

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();
}


/* =========================================
   2. CREATE GRID PARTICLES
========================================= */

function createParticles() {

    particles = [];

    const columns = Math.ceil(width / settings.spacing);
    const rows = Math.ceil(height / settings.spacing);

    const offsetX = (width % settings.spacing) / 2;
    const offsetY = (height % settings.spacing) / 2;

    for (let row = 0; row <= rows; row++) {

        for (let column = 0; column <= columns; column++) {

            const x = offsetX + column * settings.spacing;
            const y = offsetY + row * settings.spacing;

            particles.push({

                originalX: x,
                originalY: y,

                x: x,
                y: y,

                vx: 0,
                vy: 0,

                size: settings.particleSize

            });

        }
    }
}


/* =========================================
   3. MOUSE MOVEMENT
========================================= */

window.addEventListener("mousemove", (event) => {

    if (reduceMotion) return;

    mouse.x = event.clientX;
    mouse.y = event.clientY;

});

window.addEventListener("mouseout", (event) => {

    if (!event.relatedTarget) {
        mouse.x = null;
        mouse.y = null;
    }

});

window.addEventListener("touchmove", (event) => {

    if (reduceMotion || event.touches.length === 0) return;

    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;

}, { passive: true });

window.addEventListener("touchend", () => {

    mouse.x = null;
    mouse.y = null;

});


/* =========================================
   4. UPDATE PARTICLE POSITIONS
========================================= */

function updateParticles() {

    particles.forEach((particle) => {

        if (mouse.x !== null && mouse.y !== null) {

            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius && distance > 0) {

                const force =
                    (mouse.radius - distance) / mouse.radius;

                const pushX = (dx / distance) * force *
                    settings.mouseStrength;

                const pushY = (dy / distance) * force *
                    settings.mouseStrength;

                particle.vx += pushX * 0.08;
                particle.vy += pushY * 0.08;

            }

        }

        // Smoothly return particles to their original positions

        particle.vx +=
            (particle.originalX - particle.x) *
            settings.returnSpeed;

        particle.vy +=
            (particle.originalY - particle.y) *
            settings.returnSpeed;

        // Apply friction

        particle.vx *= 0.82;
        particle.vy *= 0.82;

        particle.x += particle.vx;
        particle.y += particle.vy;

    });

}


/* =========================================
   5. DRAW PARTICLES AND GRID LINES
========================================= */

function drawParticles() {

    ctx.clearRect(0, 0, width, height);

    // Draw connections between nearby grid particles

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(108, 99, 255, 0.12)";

    const columns = Math.ceil(width / settings.spacing) + 1;

    for (let i = 0; i < particles.length; i++) {

        const particle = particles[i];

        // Connect to the particle on the right

        if ((i + 1) % columns !== 0 && particles[i + 1]) {

            const right = particles[i + 1];

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();

        }

        // Connect to the particle below

        if (particles[i + columns]) {

            const below = particles[i + columns];

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(below.x, below.y);
            ctx.stroke();

        }

    }

    // Draw individual particles

    particles.forEach((particle) => {

        let alpha = 0.45;

        if (mouse.x !== null && mouse.y !== null) {

            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                alpha = 0.9;
            }

        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(${settings.color}, ${alpha})`;

        ctx.fill();

    });

}


/* =========================================
   6. ANIMATION LOOP
========================================= */

function animateParticles() {

    updateParticles();
    drawParticles();

    requestAnimationFrame(animateParticles);

}


/* =========================================
   7. INITIALIZE BACKGROUND
========================================= */

if (canvas && ctx) {

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    if (reduceMotion) {
        drawParticles();
    } else {
        animateParticles();
    }

}
