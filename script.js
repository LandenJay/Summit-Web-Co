const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const header = document.querySelector(".header");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const revealElements = document.querySelectorAll(
  ".card, .project-card, .price-card, .feature, .process-grid div, .contact-text, .contact-form, .why-card, .testimonial-card, .faq-item, .addon"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  formMessage.textContent = "Sending message...";
  formMessage.className = "form-message sending";

  const formData = {
    name: form.querySelector('input[placeholder="Your Name"]').value,
    email: form.querySelector('input[placeholder="Email Address"]').value,
    business: form.querySelector('input[placeholder="Business Name"]').value,
    service: form.querySelector("select").value,
    message: form.querySelector("textarea").value
  };

  try {
    const response = await fetch("https://YOUR-BACKEND-URL.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    formMessage.textContent = "Message sent successfully! I’ll get back to you soon.";
    formMessage.className = "form-message success";
    form.reset();

  } catch (error) {
    formMessage.textContent = "Something went wrong. Please try again.";
    formMessage.className = "form-message error";
  }
});