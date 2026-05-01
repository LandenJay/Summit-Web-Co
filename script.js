const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const header = document.querySelector(".header");

/* MOBILE MENU */
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      nav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

/* HEADER SCROLL EFFECT */
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* REVEAL ON SCROLL */
const revealElements = document.querySelectorAll(
  ".card, .price-card, .project-card, .feature, .contact-form, .why-card, .testimonial-card, .faq-item, .addon"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

/* CLOSE MOBILE MENU ON RESIZE */
window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && menuBtn && nav) {
    menuBtn.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});