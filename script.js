const canvas = document.createElement('canvas');
document.getElementById('animation-canvas').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configurações das colunas de dados
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(0);
const chars = '01';

// Partículas leves
let particles = [];
const numParticles = 50;
for(let i=0;i<numParticles;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*1.2,
        vy: (Math.random()-0.5)*1.2,
        size: Math.random()*2+1
    });
}

function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(0);
}

function draw() {
    ctx.fillStyle = 'rgba(13,27,42,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Matrix branca
    ctx.fillStyle = '#ffffff';
    for(let i=0;i<drops.length;i++){
        const text = chars.charAt(Math.floor(Math.random()*chars.length));
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){
            drops[i] = 0;
        }
        drops[i]++;
    }

    // Partículas leves conectadas
    for(let i=0;i<particles.length;i++){
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if(p.x<0 || p.x>canvas.width) p.vx*=-1;
        if(p.y<0 || p.y>canvas.height) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle='rgba(0,170,255,0.6)';
        ctx.fill();
    }

    // Conectar partículas próximas
    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist<120){
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,170,255,'+(1-dist/120)*0.4+')';
                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();
setInterval(initDrops, 60000);

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
});
