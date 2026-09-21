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