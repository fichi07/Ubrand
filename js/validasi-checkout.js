const form =
  document.getElementById("shippingForm") ||
  document.getElementById("shippingForm ") ||
  document.querySelector('[id="shippingForm "]');

function showFieldError(inputEl, message) {
  const wrapper = inputEl.closest(".space-y-2") || inputEl.parentElement;
  const msgEl = wrapper?.querySelector(".error-message");
  if (msgEl) {
    msgEl.textContent = message;
    msgEl.classList.remove("hidden");
  }
  inputEl.classList.add("border-red-500");
}

function clearFieldError(inputEl) {
  const wrapper = inputEl.closest(".space-y-2") || inputEl.parentElement;
  const msgEl = wrapper?.querySelector(".error-message");
  if (msgEl) msgEl.classList.add("hidden");
  inputEl.classList.remove("border-red-500");
}

// Validasi dasar
function isNonEmpty(value) {
  return value.trim().length > 0;
}
function isValidEmail(value) {
  // regex simpel & cukup ketat untuk email umum
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
function isValidPhone(value) {
  // minimal 8 digit (boleh spasi/dash/plus/kurung)
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 8;
}
function isValidZip(value) {
  // minimal 3 karakter (bebas format internasional)
  return value.trim().length >= 3;
}

function validateShippingForm() {
  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    telephone: document.getElementById("telephone"),
    address: document.getElementById("address"),
    country: document.getElementById("country"),
    city: document.getElementById("city"),
    zipCode: document.getElementById("zipCode"),
  };

  Object.values(fields).forEach(clearFieldError);

  let firstInvalid = null;

  Object.entries(fields).forEach(([key, el]) => {
    if (!isNonEmpty(el.value)) {
      showFieldError(el, `${labelTextFor(key)} is required`);
      if (!firstInvalid) firstInvalid = el;
    }
  });

  if (isNonEmpty(fields.email.value) && !isValidEmail(fields.email.value)) {
    showFieldError(fields.email, "Please enter a valid email address");
    if (!firstInvalid) firstInvalid = fields.email;
  }
  if (
    isNonEmpty(fields.telephone.value) &&
    !isValidPhone(fields.telephone.value)
  ) {
    showFieldError(fields.telephone, "Please enter a valid phone number");
    if (!firstInvalid) firstInvalid = fields.telephone;
  }
  if (isNonEmpty(fields.zipCode.value) && !isValidZip(fields.zipCode.value)) {
    showFieldError(fields.zipCode, "Please enter a valid zip/postal code");
    if (!firstInvalid) firstInvalid = fields.zipCode;
  }

  if (firstInvalid) {
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid.focus();
    return false;
  }

  const shippingData = {
    firstName: fields.firstName.value.trim(),
    lastName: fields.lastName.value.trim(),
    email: fields.email.value.trim(),
    telephone: fields.telephone.value.trim(),
    address: fields.address.value.trim(),
    country: fields.country.value.trim(),
    city: fields.city.value.trim(),
    zipCode: fields.zipCode.value.trim(),
  };
  try {
    sessionStorage.setItem("shippingData", JSON.stringify(shippingData));
  } catch (_) {}

  return true;
}

function labelTextFor(key) {
  switch (key) {
    case "firstName":
      return "First name";
    case "lastName":
      return "Last name";
    case "email":
      return "E-mail";
    case "telephone":
      return "Phone number";
    case "address":
      return "Address";
    case "country":
      return "Country";
    case "city":
      return "City";
    case "zipCode":
      return "Zip code";
    default:
      return "This field";
  }
}

[
  "firstName",
  "lastName",
  "email",
  "telephone",
  "address",
  "country",
  "city",
  "zipCode",
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", () => clearFieldError(el));
    el.addEventListener("blur", () => {
      if (isNonEmpty(el.value)) clearFieldError(el);
    });
  }
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    proceedToCheckout();
  });
}

function proceedToPayment() {
  const ok = validateShippingForm();
  if (!ok) return;

  if (typeof showNotification === "function") {
    showNotification(
      "Shipping information saved. Redirecting to payment…",
      "success"
    );
    setTimeout(() => {
      window.location.href = "payment-secure.html";
    }, 800);
  } else {
    window.location.href = "payment-secure.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const creditInput = document.getElementById("credit-input");
  const cardNumberDisplay = document.getElementById("card-number-display");

  creditInput.addEventListener("input", function () {
    let rawValue = this.value.replace(/\D/g, ""); // hapus non-digit
    let formatted = rawValue.replace(/(.{4})/g, "$1 ").trim(); // format 4 digit

    // Isi placeholder kalau belum lengkap
    let placeholder = "#### #### #### ####".split("");
    for (let i = 0; i < formatted.length; i++) {
      placeholder[i] = formatted[i];
    }

    cardNumberDisplay.textContent = placeholder.join("");
  });
});
