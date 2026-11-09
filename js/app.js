"use strict";

const produkUmkm = [
  {
    nama: "Arabika Gayo",
    kategori: "Kopi",
    harga: 85000,
    stok: 12,
    unggulan: true,
    diskonPersen: 10,
  },
  {
    nama: "Robusta Temanggung",
    kategori: "Kopi",
    harga: 65000,
    stok: 4,
    unggulan: false,
    diskonPersen: 0,
  },
  {
    nama: "Paket Seduh Rumahan",
    kategori: "Bundling",
    harga: 125000,
    stok: 0,
    unggulan: true,
    diskonPersen: 15,
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Kopi",
    harga: 22000,
    stok: 8,
    unggulan: false,
    diskonPersen: 0,
  },
];

const produkGrid = document.querySelector("#produk-dinamis");
const produkStatus = document.querySelector("#produk-ringkasan");
const wadahUnggulan = document.querySelector("#produk-unggulan");
const tombolFilter = document.querySelectorAll("[data-filter]");
const tombolFilterStok = document.querySelectorAll("[data-filter-stok]");

const statusFilter = {
  kategori: "Semua",
  stok: "Semua",
};

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}

function hitungHargaPromo(produk) {
  if (produk && typeof produk.diskonPersen === "number" && produk.diskonPersen > 0) {
    const potongan = (produk.harga * produk.diskonPersen) / 100;
    return produk.harga - potongan;
  }
  return produk ? produk.harga : 0;
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk Kopi Pilihan";
    case "Bundling":
      return "Paket Hemat Seduh";
    case "Aksesoris":
      return "Perlengkapan Seduh";
    default:
      return "Produk UMKM";
  }
}

function buatElemenHarga(produk) {
  const harga = document.createElement("p");
  harga.classList.add("price");

  const hargaAkhir = hitungHargaPromo(produk);
  if (produk.diskonPersen && produk.diskonPersen > 0) {
    const promoSpan = document.createElement("span");
    promoSpan.classList.add("promo-price");
    promoSpan.textContent = formatRupiah(hargaAkhir);

    const asliSpan = document.createElement("span");
    asliSpan.classList.add("original-price");
    asliSpan.textContent = formatRupiah(produk.harga);

    const diskonSpan = document.createElement("span");
    diskonSpan.classList.add("discount-badge");
    diskonSpan.textContent = `Diskon ${produk.diskonPersen}%`;

    harga.append(promoSpan, asliSpan, diskonSpan);
  } else {
    harga.textContent = formatRupiah(produk.harga);
  }

  return harga;
}

// Membuat elemen kartu produk menggunakan DOM API tanpa innerHTML
function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card", "product-card");

  const status = statusStok(produk.stok);
  const badge = document.createElement("span");
  badge.classList.add("stock-badge");
  if (status.className) {
    badge.classList.add(status.className);
  }
  badge.textContent = status.label;

  const nama = document.createElement("h3");
  nama.textContent = produk.nama;

  const kategori = document.createElement("p");
  kategori.classList.add("category-text");
  kategori.textContent = `${produk.kategori} — ${labelKategori(produk.kategori)}`;

  const harga = buatElemenHarga(produk);

  const footer = document.createElement("div");
  footer.classList.add("card-footer");

  const infoStok = document.createElement("span");
  infoStok.classList.add("stock-count");
  infoStok.textContent = `Sisa stok: ${produk.stok}`;

  const infoAksi = document.createElement("span");
  infoAksi.classList.add("action-tag");
  infoAksi.textContent = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  footer.append(infoStok, infoAksi);

  const tombolSembunyikan = document.createElement("button");
  tombolSembunyikan.type = "button";
  tombolSembunyikan.classList.add("ghost-button");
  tombolSembunyikan.textContent = "Sembunyikan";
  tombolSembunyikan.addEventListener("click", () => {
    card.remove();
    if (produkStatus) {
      const sisaKartu = produkGrid ? produkGrid.querySelectorAll(".js-product-card").length : 0;
      produkStatus.textContent = `Kartu "${produk.nama}" disembunyikan sementara (${sisaKartu} kartu tampil di layar, total data tetap ${produkUmkm.length} produk).`;
    }
  });

  card.append(badge, nama, kategori, harga, footer, tombolSembunyikan);
  return card;
}

function buatEmptyState(kategori, stokFilter = "Semua") {
  const pesan = document.createElement("p");
  pesan.classList.add("empty-state");

  if (stokFilter !== "Semua" && kategori !== "Semua") {
    pesan.textContent = `Belum ada produk pada kategori ${kategori} dengan status stok "${stokFilter}".`;
  } else if (stokFilter !== "Semua") {
    pesan.textContent = `Belum ada produk dengan status stok "${stokFilter}".`;
  } else {
    pesan.textContent = `Belum ada produk pada kategori ${kategori}.`;
  }

  return pesan;
}

function renderUnggulan() {
  if (!wadahUnggulan) {
    return;
  }

  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  if (!produkUnggulan) {
    return;
  }

  wadahUnggulan.replaceChildren();

  const label = document.createElement("div");
  label.classList.add("featured-badge");
  label.textContent = "Rekomendasi Pilihan Barista";

  const konten = document.createElement("div");
  konten.classList.add("featured-content");

  const judul = document.createElement("h3");
  judul.textContent = produkUnggulan.nama;

  const deskripsi = document.createElement("p");
  deskripsi.classList.add("category-text");
  deskripsi.textContent = `${labelKategori(produkUnggulan.kategori)} — Kualitas Terbaik Petungkriyono`;

  const harga = buatElemenHarga(produkUnggulan);

  const infoStok = document.createElement("p");
  infoStok.classList.add("stock-info");

  const status = statusStok(produkUnggulan.stok);
  const badgeStok = document.createElement("span");
  badgeStok.classList.add("stock-badge");
  if (status.className) {
    badgeStok.classList.add(status.className);
  }
  badgeStok.textContent = status.label;

  const teksStok = document.createTextNode(` (Stok saat ini: ${produkUnggulan.stok})`);
  infoStok.append(badgeStok, teksStok);

  konten.append(judul, deskripsi, harga, infoStok);
  wadahUnggulan.append(label, konten);
}

// Merender daftar produk sesuai filter kategori dan stok yang aktif
function renderProduk(kategoriAktif = statusFilter.kategori, stokAktif = statusFilter.stok) {
  if (!produkGrid || !produkStatus) {
    return;
  }

  const produkTampil = produkUmkm.filter((produk) => {
    const cocokKategori = kategoriAktif === "Semua" || produk.kategori === kategoriAktif;
    const cocokStok = stokAktif === "Semua" || statusStok(produk.stok).label === stokAktif;
    return cocokKategori && cocokStok;
  });

  produkGrid.replaceChildren();

  const labelKategoriAktif = kategoriAktif === "Semua" ? "Semua kategori" : `Kategori ${kategoriAktif}`;
  const infoStokAktif = stokAktif === "Semua" ? "" : ` (Stok: ${stokAktif})`;

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif, stokAktif));
    produkStatus.textContent = `${labelKategoriAktif}${infoStokAktif} menampilkan 0 produk dari ${produkUmkm.length} total produk.`;
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${labelKategoriAktif}${infoStokAktif} menampilkan ${produkTampil.length} produk dari ${produkUmkm.length} total produk.`;
}

function pasangEventFilter() {
  if (!produkGrid || !produkStatus) {
    return;
  }

  tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
      const tombolAktif = event.currentTarget;
      statusFilter.kategori = tombolAktif.dataset.filter || "Semua";

      tombolFilter.forEach((item) => item.classList.remove("is-active"));
      tombolAktif.classList.add("is-active");

      renderProduk(statusFilter.kategori, statusFilter.stok);
    });
  });

  tombolFilterStok.forEach((tombol) => {
    tombol.addEventListener("click", (event) => {
      const tombolAktif = event.currentTarget;
      statusFilter.stok = tombolAktif.dataset.filterStok || "Semua";

      tombolFilterStok.forEach((item) => item.classList.remove("is-active"));
      tombolAktif.classList.add("is-active");

      renderProduk(statusFilter.kategori, statusFilter.stok);
    });
  });
}

renderUnggulan();
pasangEventFilter();
renderProduk();
