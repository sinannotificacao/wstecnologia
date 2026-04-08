const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('topbar');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

(function () {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const startCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 36));

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = '+' + target;
        return;
      }
      el.textContent = '+' + current;
      requestAnimationFrame(tick);
    };

    tick();
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => counterObserver.observe(counter));
})();

(function () {
  if (!header) return;
  let lastScroll = window.pageYOffset || 0;

  function onScroll() {
    const current = window.pageYOffset || 0;

    if (current > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (current > lastScroll && current > 140) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScroll = current <= 0 ? 0 : current;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function () {
  const canvas = document.getElementById('particlesBg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const density = Math.max(22, Math.min(60, Math.floor((width * height) / 42000)));
    particles = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.5,
      a: Math.random() * 0.45 + 0.12
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(115, 216, 255, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt((dx * dx) + (dy * dy));

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(72, 163, 255, ${0.10 * (1 - dist / 110)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  draw();
})();
