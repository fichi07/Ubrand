// Image gallery functionality
function changeMainImage(thumbnail, newSrc) {
  const mainImage = document.getElementById("main-image");
  const loadingOverlay = document.getElementById("loading-overlay");

  const oldSrc = mainImage.src;

  loadingOverlay.style.opacity = "1";

  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("thumbnail-active");
  });

  thumbnail.classList.add("thumbnail-active");

  const thumbImg = thumbnail.querySelector("img");

  setTimeout(() => {
    mainImage.style.opacity = "0.5";
    setTimeout(() => {
      mainImage.src = thumbImg.src;
      thumbImg.src = oldSrc;
      mainImage.style.opacity = "1";
      loadingOverlay.style.opacity = "0";
    }, 200);
  }, 100);
}

// Size selection functionality
function selectSize(button) {
  // Remove active class from all size buttons
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.classList.remove("size-btn-active");
    btn.classList.add("border-[#DBE5F1]", "text-black-primary");
    btn.classList.remove("border-black-primary", "text-white");
  });

  // Add active class to selected button
  button.classList.add("size-btn-active");
  button.classList.remove("border-[#DBE5F1]", "text-black-primary");
  button.classList.add("border-black-primary", "text-white");

  // Update helper text
  const sizeHelper = document.getElementById("size-helper");
  sizeHelper.textContent = `Size ${button.dataset.size} selected`;
  sizeHelper.classList.add("text-green-600");

  // Add selection animation
  button.style.transform = "scale(1.1)";
  setTimeout(() => {
    button.style.transform = "scale(1.05)";
  }, 150);
}
// Color selection functionality

document.addEventListener("DOMContentLoaded", function () {
  // ==== COLOR SWATCHES ====
  // (opsional) kasih id="color-options" pada wrapper agar lebih scoped
  const colorScope = document.getElementById("color-options") || document;

  const colorSwatches = colorScope.querySelectorAll(
    ".color-swatch, .bg-black, .bg-white, .bg-red-500, .bg-blue-500, .bg-green-500"
  );

  colorSwatches.forEach((swatch) => {
    // aksesibilitas ringan
    swatch.setAttribute("role", "button");
    swatch.setAttribute("tabindex", "0");

    const selectSwatch = () => {
      colorSwatches.forEach((s) => {
        s.classList.remove("ring-2", "ring-gray-800", "scale-105");
        s.setAttribute("aria-pressed", "false");
      });
      swatch.classList.add("ring-2", "ring-gray-800", "scale-105");
      swatch.setAttribute("aria-pressed", "true");

      // helper text (opsional)
      const colorHelper = document.getElementById("color-helper");
      if (colorHelper) {
        const label =
          swatch.dataset.color ||
          swatch.getAttribute("aria-label") ||
          swatch.title ||
          swatch.className.match(/bg-([a-z0-9-]+)/)?.[1] ||
          "selected";
        colorHelper.textContent = `Color ${label} selected`;
        colorHelper.classList.add("text-green-600");
      }
    };

    swatch.addEventListener("click", selectSwatch);
    swatch.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectSwatch();
      }
    });
  });

  // ==== SIZE BUTTONS ====
  // sinkron dengan fungsi selectSize(button) yang kamu punya
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectSize(button);
    });
  });
});

// Quantity controls
function increaseQuantity() {
  const quantityInput = document.getElementById("quantity");
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;

  // Add bounce animation
  quantityInput.style.transform = "scale(1.1)";
  setTimeout(() => {
    quantityInput.style.transform = "scale(1)";
  }, 150);
}

function decreaseQuantity() {
  const quantityInput = document.getElementById("quantity");
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;

    // Add bounce animation
    quantityInput.style.transform = "scale(1.1)";
    setTimeout(() => {
      quantityInput.style.transform = "scale(1)";
    }, 150);
  }
}

// Share functionality
function shareProduct() {
  if (navigator.share) {
    navigator.share({
      title: "Long straight fit jeans in white",
      text: "Check out these amazing jeans!",
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      showNotification("Link copied to clipboard!");
    });
  }
}

// Notification helper
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-scaleIn";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
