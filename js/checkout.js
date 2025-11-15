const coupons = {
  SAVE10: { discount: 10, type: "percentage" },
  WELCOME20: { discount: 20, type: "fixed" },
  FREESHIP: { discount: 10, type: "shipping" },
};

let currentDiscount = 0;
let originalSubtotal = 159.98;
let originalShipping = 10;

function applyCoupon() {
  const couponInput = document.getElementById("coupon-input");
  const couponCode = couponInput.value.trim().toUpperCase();

  if (!couponCode) {
    showNotification("Please enter a coupon code", "error");
    return;
  }

  if (coupons[couponCode]) {
    const coupon = coupons[couponCode];
    let discount = 0;
    let newShipping = originalShipping;

    if (coupon.type === "percentage") {
      discount = (originalSubtotal * coupon.discount) / 100;
    } else if (coupon.type === "fixed") {
      discount = coupon.discount;
    } else if (coupon.type === "shipping") {
      newShipping = 0;
      discount = originalShipping;
    }

    currentDiscount = discount;
    updateSummary(newShipping);
    showNotification(`Coupon "${couponCode}" applied successfully!`, "success");
    couponInput.value = "";
  } else {
    showNotification("Invalid coupon code", "error");
  }
}

function applyCreditCard() {
  const cardNumberInput = document.getElementById("credit-input");
  const cardNumber = cardNumberInput.value.replace(/\s+/g, "");

  if (!creditCode) {
    showNotification("Please enter your credit card number", "error");
    return;
  }
  if (!/^\d{13,19}$/.test(cardNumber)) {
    showNotification("Invalid credit card number format", "error");
    return;
  }
  if (!isValidCardNumber(cardNumber)) {
    showNotification("Invalid credit card number", "error");
    return;
  }
  showNotification("Credit Card number is valid!", "success");
  cardNumberInput.value = "";
}

function isValidCardNumber(number) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function proceedToCheckout() {
  showNotification("Redirecting to checkout...", "success");
  setTimeout(() => {
    window.location.href = "checkout.html";
  }, 1000);
}
function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transform transition-all duration-300 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Allow Enter key to apply coupon
document
  .getElementById("coupon-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      applyCoupon();
    }
  });
