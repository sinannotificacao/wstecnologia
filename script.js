
let lastScroll = 0;
const header = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
  const current = window.scrollY || 0;

  if (current > lastScroll && current > 150) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  if (current > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = current <= 0 ? 0 : current;
}, { passive: true });
