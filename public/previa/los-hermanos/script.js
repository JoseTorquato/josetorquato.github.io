const header = document.querySelector(".header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (header && toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (!event.matches) return;
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}
