
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


// ULTRA_THIN_SCROLL
let wsLastScroll = 0;
const wsHeader = document.getElementById("topbar");
window.addEventListener("scroll", () => {
  if (!wsHeader) return;
  const current = window.pageYOffset || 0;

  if (current > wsLastScroll && current > 90) {
    wsHeader.classList.add("hide");
  } else {
    wsHeader.classList.remove("hide");
  }

  if (current > 24) {
    wsHeader.classList.add("scrolled");
  } else {
    wsHeader.classList.remove("scrolled");
  }

  wsLastScroll = current <= 0 ? 0 : current;
}, { passive: true });
