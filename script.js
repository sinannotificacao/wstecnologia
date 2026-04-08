
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


// --- MENU INTELIGENTE ---
let lastScroll = 0;
const header = document.getElementById("topbar");

window.addEventListener("scroll", () => {
  let current = window.pageYOffset;

  if (current > lastScroll && current > 80){
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  if(current > 50){
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = current;
});


// --- MENU INTELIGENTE REFINADO ---
let lastScrollRefined = 0;
const refinedHeader = document.getElementById("topbar");

window.addEventListener("scroll", () => {
  if (!refinedHeader) return;
  const current = window.pageYOffset;

  if (current > lastScrollRefined && current > 120) {
    refinedHeader.classList.add("hide");
  } else {
    refinedHeader.classList.remove("hide");
  }

  if (current > 40) {
    refinedHeader.classList.add("scrolled");
  } else {
    refinedHeader.classList.remove("scrolled");
  }

  lastScrollRefined = current;
}, { passive: true });
