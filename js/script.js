const promoButton = document.querySelector("#promoButton");

if (promoButton) {
  promoButton.addEventListener("click", () => {
    promoButton.textContent = "Promo: Beli 2 gratis tester!";
    console.log("Promo Kopi Nusa berhasil ditampilkan.");
  });
}

const headings = [...document.querySelectorAll("h1, h2, h3")];

console.log("Daftar heading pada halaman:");
headings.forEach((heading) => {
  console.log(heading.tagName, "-", heading.textContent);
});

const tableRows = document.querySelectorAll("tbody tr");
const tableCaption = document.querySelector("caption");

if (tableRows.length > 0) {
  console.log("Jumlah produk pada tabel: " + tableRows.length);
  console.log("Caption tabel: " + (tableCaption ? tableCaption.textContent : "Tidak ada caption"));
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".btn-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      if (!card) return;

      const isCollapsed = card.classList.contains("collapsed");

      if (isCollapsed) {
        // Ketika salah satu dibuka (memanjang), kartu lainnya tetap tertutup (ditutup)
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

        // Buka kartu yang diklik
        card.classList.remove("collapsed");
        button.setAttribute("aria-expanded", "true");
      } else {
        // Jika sudah terbuka dan diklik kembali, tutup kartu ini
        card.classList.add("collapsed");
        button.setAttribute("aria-expanded", "false");
      }
    });
  });
});