
let lastScroll = 0;
const header = document.getElementById("topbar");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});
