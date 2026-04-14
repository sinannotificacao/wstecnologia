const canvas = document.createElement('canvas');
document.getElementById('animation-canvas').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numParticles = 100;

for(let i=0;i<numParticles;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*2,
        vy: (Math.random()-0.5)*2,
        size: Math.random()*3+1.5
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    // Fundo com leve glow
    ctx.fillStyle = 'rgba(13,27,42,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<particles.length;i++){
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if(p.x<0 || p.x>canvas.width) p.vx*=-1;
        if(p.y<0 || p.y>canvas.height) p.vy*=-1;

        // Partículas com brilho
        let grad = ctx.createRadialGradient(p.x,p.y,p.size/2,p.x,p.y,p.size*2);
        grad.addColorStop(0,'#00aaff');
        grad.addColorStop(0.5,'#00ffea');
        grad.addColorStop(1,'transparent');
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    // Conectar partículas próximas com curvas e glow
    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist<150){
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,170,255,'+(1-dist/150)+')';
                ctx.lineWidth = 1.2*(1-dist/150);
                let midX = (particles[i].x + particles[j].x)/2 + Math.sin(Date.now()/500 + i)*10;
                let midY = (particles[i].y + particles[j].y)/2 + Math.cos(Date.now()/500 + j)*10;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.quadraticCurveTo(midX, midY, particles[j].x, particles[j].y);
                ctx.shadowColor = '#00aaff';
                ctx.shadowBlur = 6;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
