function toggleSection(sectionName) {
  const content = document.getElementById(sectionName + "-content");
  const icon = document.getElementById(sectionName + "-icon");

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    icon.textContent = "−";
  } else {
    content.classList.add("hidden");
    icon.textContent = "+";
  }
}

function toggleFilter(filterName) {
  const content = document.getElementById(filterName + "-content");
  const arrow = document.getElementById(filterName + "-arrow");

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    arrow.style.transform = "rotate(180deg)";
  } else {
    content.classList.add("hidden");
    arrow.style.transform = "rotate(0deg)";
  }
}

// Add click handlers for color swatches
document.addEventListener("DOMContentLoaded", function () {
  const colorContainer = document.getElementById("color-content");
  const colorSwatches = colorContainer
    ? colorContainer.querySelectorAll(".w-6.h-6")
    : document.querySelectorAll(".w-6.h-6");

  const selectedOutline = [
    "outline",
    "outline-2",
    "outline-gray-800",
    "outline-offset-2",
  ];

  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", function () {
      colorSwatches.forEach((s) => s.classList.remove(...selectedOutline));
      this.classList.add(...selectedOutline);
    });
  });

  const sizeButtons = document.querySelectorAll('button[class*="px-3 py-1"]');
  sizeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      sizeButtons.forEach((b) => {
        b.classList.remove("bg-gray-800", "text-white");
        b.classList.add("border-gray-300", "hover:bg-gray-100");
      });
      this.classList.add("bg-gray-800", "text-white");
      this.classList.remove("border-gray-300", "hover:bg-gray-100");
    });
  });
});

// Off-canvas Sidebar controls (mobile)
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const openBtn = document.getElementById("open-sidebar");
const closeBtn = document.getElementById("close-sidebar");

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  overlay.classList.remove("pointer-events-none");
  overlay.classList.add("opacity-100");
  openBtn?.setAttribute("aria-expanded", "true");
  // Lock scroll
  document.documentElement.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("pointer-events-none");
  overlay.classList.remove("opacity-100");
  openBtn?.setAttribute("aria-expanded", "false");
  document.documentElement.style.overflow = "";
}

openBtn?.addEventListener("click", openSidebar);
closeBtn?.addEventListener("click", closeSidebar);
overlay?.addEventListener("click", closeSidebar);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

// OPTIONAL: auto-close when switching to desktop then back to mobile
const mq = window.matchMedia("(min-width: 1024px)");
mq.addEventListener("change", (e) => {
  if (e.matches) {
    // desktop
    // ensure visible & overlay off
    sidebar.classList.remove("-translate-x-full");
    closeSidebar();
  } else {
    // back to mobile: keep hidden initially
    sidebar.classList.add("-translate-x-full");
  }
});
