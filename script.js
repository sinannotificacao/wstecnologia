const canvas = document.createElement('canvas');
document.getElementById('animation-canvas').appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(0);
const chars = '01';

function initDrops(){
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(0);
}

function draw(duration=5000){
    const start = Date.now();
    function step(){
        const elapsed = Date.now()-start;
        if(elapsed>duration) return;
        ctx.fillStyle='rgba(13,27,42,0.15)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#ffffff';
        for(let i=0;i<drops.length;i++){
            const text = chars.charAt(Math.floor(Math.random()*chars.length));
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
            drops[i]++;
        }
        requestAnimationFrame(step);
    }
    step();
}

// Chuva Matrix curta: início e depois 30s
draw(5000);
setTimeout(()=>{initDrops(); draw(5000);},30000);

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
});
