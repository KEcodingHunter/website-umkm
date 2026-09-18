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