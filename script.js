
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
