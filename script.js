
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));


// FINAL MENU CONTROL
let lastScroll = 0;
const header = document.getElementById("topbar");

window.addEventListener("scroll", () => {
  let current = window.pageYOffset;

  if (current > lastScroll && current > 80){
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScroll = current;
});


// FINAL PLUS PARTICLES
(function () {
  const canvas = document.getElementById("particlesBg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let particles = [];
  const countBase = 34;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.max(18, Math.floor((w * h) / 45000));
    particles = Array.from({ length: Math.min(56, Math.max(countBase, count)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.7 + 0.6,
      a: Math.random() * 0.55 + 0.2
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(120, 208, 255, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(110, 180, 255, ${0.11 * (1 - d / 110)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  step();
})();

// FINAL PLUS safer menu behavior
(function () {
  const header = document.getElementById("topbar");
  if (!header) return;
  let last = window.pageYOffset || 0;

  window.addEventListener("scroll", () => {
    const current = window.pageYOffset || 0;

    if (current > last && current > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    last = current <= 0 ? 0 : current;
  }, { passive: true });
})();


// COUNTER ANIMATION
(function () {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const runCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

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

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => counterObserver.observe(counter));
})();


// ===== AJUSTE SEGURO DO MENU =====
(function () {
  const header = document.getElementById("topbar") || document.querySelector(".topbar");
  if (!header) return;

  let lastScroll = window.pageYOffset || 0;

  function onScroll() {
    const current = window.pageYOffset || 0;

    if (current > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (current > lastScroll && current > 160) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    lastScroll = current <= 0 ? 0 : current;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
