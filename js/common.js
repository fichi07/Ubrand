document.addEventListener("DOMContentLoaded", function () {
  const btndropdown = document.getElementById("btn-dropdown");
  const dropdownmenu = document.getElementById("dropdown-menu");

  btndropdown.addEventListener("click", function () {
    dropdownmenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function (event) {
    if (
      !btndropdown.contains(event.target) &&
      !dropdownmenu.contains(event.target)
    ) {
      dropdownmenu.classList.add("hidden");
    }
  });

  const shaynakitAccordions = document.querySelectorAll(".shaynakit-accordion");

  shaynakitAccordions.forEach(function (shaynakitAccordion) {
    const btnAccordion = shaynakitAccordion.querySelector(".btn-accordion");
    const accordionContent =
      shaynakitAccordion.querySelector(".accordion-content");

    btnAccordion.addEventListener("click", function (event) {
      event.preventDefault();
      accordionContent.classList.toggle("hidden");
    });
  });
});

/* Best Seller & New Items */
function initProductSection(sectionSelector) {
  const root = document.querySelector(sectionSelector);
  if (!root) return;

  // Elemen dalam section ini saja
  const tabs = root.querySelectorAll("button[data-tab]");
  const productContainers = root.querySelectorAll("[data-products]");
  const leftArrow = root.querySelector(".carousel-arrow-left");
  const rightArrow = root.querySelector(".carousel-arrow-right");
  const productsGrid = () => {
    const active = root.querySelector("[data-products]:not(.hidden)");
    return active ? active.querySelector(".products-grid") : null;
  };

  // ---- Tabs ----
  function switchTabLocal(tabName) {
    // Active/inactive class rules
    tabs.forEach((tab) => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add("text-[#707070]", "border-b-2", "border-[#707070]");
        tab.classList.remove("tab-button", "text-[#707070]"); // aktif: tanpa tab-button
      } else {
        tab.classList.remove("border-b-2", "border-gray-900");
        tab.classList.add("text-[#707070]", "tab-button"); // non-aktif: pakai tab-button
      }
    });

    // Show/hide containers
    productContainers.forEach((c) => {
      if (c.dataset.products === tabName) c.classList.remove("hidden");
      else c.classList.add("hidden");
    });

    resetCarouselLocal(); // jaga-jaga kalau section ini pakai carousel
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTabLocal(tab.dataset.tab));
  });

  // ---- Carousel (opsional; aman jika tidak ada panah/slider) ----
  let currentSlide = 0;

  const slidesToShowByWidth = () => {
    const w = window.innerWidth;
    if (w < 768) return 1; // mobile
    if (w < 1024) return 2; // tablet
    return 4; // desktop
  };

  function updateArrowStatesLocal(current, max) {
    if (!leftArrow || !rightArrow) return;
    leftArrow.disabled = current === 0;
    rightArrow.disabled = current === max;

    leftArrow.classList.toggle("opacity-50", leftArrow.disabled);
    leftArrow.classList.toggle("cursor-not-allowed", leftArrow.disabled);
    rightArrow.classList.toggle("opacity-50", rightArrow.disabled);
    rightArrow.classList.toggle("cursor-not-allowed", rightArrow.disabled);
  }

  function resetCarouselLocal() {
    currentSlide = 0;
    const grid = productsGrid();
    if (!grid) return;

    grid.style.transform = "translateX(0%)";

    const activeContainer = root.querySelector("[data-products]:not(.hidden)");
    if (!activeContainer) return;

    const total = activeContainer.querySelectorAll(".product-card").length;
    const show = slidesToShowByWidth();
    const max = Math.max(0, total - show);
    updateArrowStatesLocal(0, max);
  }

  function moveCarouselLocal(direction) {
    const activeContainer = root.querySelector("[data-products]:not(.hidden)");
    if (!activeContainer) return;

    const grid = productsGrid();
    if (!grid) return;

    const total = activeContainer.querySelectorAll(".product-card").length;
    const show = slidesToShowByWidth();
    const max = Math.max(0, total - show);

    if (direction === "next") currentSlide = Math.min(currentSlide + 1, max);
    else currentSlide = Math.max(currentSlide - 1, 0);

    const translateX = -(currentSlide * (100 / show));
    grid.style.transform = `translateX(${translateX}%)`;
    updateArrowStatesLocal(currentSlide, max);
  }

  if (leftArrow) {
    leftArrow.addEventListener("click", () => moveCarouselLocal("prev"));
  }
  if (rightArrow) {
    rightArrow.addEventListener("click", () => moveCarouselLocal("next"));
  }

  // Resize handler khusus section ini
  const onResize = () => resetCarouselLocal();
  window.addEventListener("resize", onResize);

  // Init pertama kali
  resetCarouselLocal();
}

// Jalankan untuk setiap section yang ada
document.addEventListener("DOMContentLoaded", () => {
  initProductSection("#best-seller-section");
  initProductSection("#new-items-section"); // panggil kalau kamu punya section lain
});

/* heart button */
document.querySelectorAll(".heartButton").forEach((btn) => {
  btn.addEventListener("click", () => {
    const heartIcon = btn.querySelector(".heartIcon");
    if (heartIcon.getAttribute("fill") === "none") {
      heartIcon.setAttribute("fill", "black");
    } else {
      heartIcon.setAttribute("fill", "none");
    }
  });
});

/* sortt By */
const sortSelect = document.getElementById("productSort");
const scope = sortSelect.closest("section") || document;
const grid = scope.querySelector(".grid");

function getName(card) {
  return (card.querySelector("h3")?.textContent || "").trim().toLowerCase();
}

function getPrice(card) {
  // Ambil teks harga "$ 34.95" -> 34.95
  const raw = (card.querySelector(".text-xl.font-bold")?.textContent || "")
    .replace(/[^\d.,]/g, "") // sisakan angka, koma, titik
    .replace(",", "."); // dukung "34,95"
  const n = parseFloat(raw);
  return isNaN(n) ? 0 : n;
}

function applySort() {
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll(".product-card"));
  const v = sortSelect.value;

  cards.sort((a, b) => {
    if (v === "name-asc") return getName(a).localeCompare(getName(b));
    if (v === "name-desc") return getName(b).localeCompare(getName(a));
    if (v === "price-asc") return getPrice(a) - getPrice(b);
    if (v === "price-desc") return getPrice(b) - getPrice(a);
    return 0;
  });

  // re-append sesuai urutan baru
  cards.forEach((c) => grid.appendChild(c));
}

// jalan saat user ganti pilihan & initial apply
sortSelect.addEventListener("change", applySort);
document.addEventListener("DOMContentLoaded", applySort);
