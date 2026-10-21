
"use strict";

// ===== MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const menuIcon = menuToggle.querySelector("i");

function closeMenu() {
  navbar.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
  menuIcon.className = "fas fa-bars";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("show");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";
});

// Close the mobile menu when a link is clicked
navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when switching to desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth > 650) {
    closeMenu();
  }
});

// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = navbar.querySelectorAll("a");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== COPYRIGHT YEAR =====
document.getElementById("year").textContent =
  new Date().getFullYear();

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Check empty fields
  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in all fields.";
    return;
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formStatus.textContent =
      "Please enter a valid email address.";
    return;
  }

  // Frontend validation completed
  formStatus.textContent =
    "Your form is valid! Email sending is not configured yet.";
});
