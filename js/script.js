"use strict";

const promoButton = document.querySelector("#promoButton");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    promoButton.textContent = "Promo: Beli 2 gratis tester!";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".btn-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      if (!card) return;

      const isCollapsed = card.classList.contains("collapsed");

      if (isCollapsed) {
        const container = card.closest(".product-grid") || document;
        container.querySelectorAll(".product-card").forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.add("collapsed");
            const otherBtn = otherCard.querySelector(".btn-toggle");
            if (otherBtn) {
              otherBtn.setAttribute("aria-expanded", "false");
            }
          }
        });

        card.classList.remove("collapsed");
        button.setAttribute("aria-expanded", "true");
      } else {
        card.classList.add("collapsed");
        button.setAttribute("aria-expanded", "false");
      }
    });
  });
});
