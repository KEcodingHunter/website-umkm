"use strict";

console.log("P10 JavaScript aktif");

/**
 * Data Master Produk UMKM Kopi Nusa
 * Menyimpan array of objects dengan struktur data konsisten
 */
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

// Menampilkan data awal katalog dalam bentuk tabel di console
console.table(produkUmkm);

/**
 * Function Contract: formatRupiah
 * Input: nilai (number)
 * Proses: Mengonversi angka menjadi string mata uang Rupiah standar IDR
 * Output: string (contoh: "Rp 85.000")
 * Efek Samping: Tidak ada
 */
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

/**
 * Function Contract: statusStok
 * Input: stok (number)
 * Proses: Mengevaluasi ketersediaan stok produk
 * Output: object { label: string, className: string }
 * Efek Samping: Tidak ada
 */
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}

/**
 * Function Contract: hitungHargaPromo (Pengayaan)
 * Input: produk (object)
 * Proses: Menghitung harga diskon jika properti opsional diskonPersen ada dan > 0
 * Output: number (harga akhir setelah diskon atau harga asli)
 * Efek Samping: Tidak ada (tidak mengubah properti objek asli)
 */
function hitungHargaPromo(produk) {
  if (produk && typeof produk.diskonPersen === "number" && produk.diskonPersen > 0) {
    const potongan = (produk.harga * produk.diskonPersen) / 100;
    return produk.harga - potongan;
  }
  return produk ? produk.harga : 0;
}

/**
 * Function Contract: labelKategori
 * Input: kategori (string)
 * Proses: Memetakan nama kategori ke deskripsi tampilan yang ramah
 * Output: string
 * Efek Samping: Tidak ada
 */
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk Kopi Pilihan";
    case "Bundling":
      return "Paket Hemat Seduh";
    default:
      return "Produk UMKM";
  }
}

/**
 * Function Contract: buatKartuProduk
 * Input: produk (object)
 * Proses: Merangkai data produk menjadi markup HTML kartu katalog
 * Output: string markup HTML
 * Efek Samping: Tidak ada
 */
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const kategori = labelKategori(produk.kategori);
  const hargaPromo = hitungHargaPromo(produk);
  const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

  let hargaHtml = `<p class="price">${formatRupiah(produk.harga)}</p>`;
  if (produk.diskonPersen && produk.diskonPersen > 0) {
    hargaHtml = `
      <p class="price">
        <span class="promo-price">${formatRupiah(hargaPromo)}</span>
        <span class="original-price">${formatRupiah(produk.harga)}</span>
        <span class="discount-badge">Diskon ${produk.diskonPersen}%</span>
      </p>
    `;
  }

  return `
    <article class="js-product-card">
      <span class="stock-badge ${status.className}">${status.label}</span>
      <h3>${produk.nama}</h3>
      <p class="category-text">${kategori}</p>
      ${hargaHtml}
      <div class="card-footer">
        <span class="stock-count">Sisa Stok: ${produk.stok}</span>
        <span class="action-tag">${labelAksi}</span>
      </div>
    </article>
  `;
}

/**
 * Function Contract: buatKartuUnggulan
 * Input: produk (object)
 * Proses: Merangkai template kartu highlight khusus untuk produk unggulan
 * Output: string markup HTML
 * Efek Samping: Tidak ada
 */
function buatKartuUnggulan(produk) {
  if (!produk) return "";
  const hargaPromo = hitungHargaPromo(produk);
  const status = statusStok(produk.stok);

  let hargaHtml = `<p class="price">${formatRupiah(produk.harga)}</p>`;
  if (produk.diskonPersen && produk.diskonPersen > 0) {
    hargaHtml = `
      <p class="price">
        <span class="promo-price">${formatRupiah(hargaPromo)}</span>
        <span class="original-price">${formatRupiah(produk.harga)}</span>
        <span class="discount-badge">Diskon ${produk.diskonPersen}%</span>
      </p>
    `;
  }

  return `
    <div class="featured-badge">⭐ Rekomendasi Pilihan Barista</div>
    <div class="featured-content">
      <h3>${produk.nama}</h3>
      <p class="category-text">${labelKategori(produk.kategori)} — Kualitas Terbaik Petungkriyono</p>
      ${hargaHtml}
      <p class="stock-info"><span class="stock-badge ${status.className}">${status.label}</span> (Stok saat ini: ${produk.stok})</p>
    </div>
  `;
}

/**
 * Function Contract: hitungRingkasanKategori (Challenge)
 * Input: daftarProduk (array of objects)
 * Proses: Menghitung frekuensi jumlah produk per kategori menggunakan forEach
 * Output: string rekapitulasi kategori (contoh: "Kopi: 3 produk, Bundling: 1 produk")
 * Efek Samping: Tidak ada
 */
function hitungRingkasanKategori(daftarProduk) {
  const rekap = {};
  daftarProduk.forEach((item) => {
    rekap[item.kategori] = (rekap[item.kategori] || 0) + 1;
  });
  return Object.entries(rekap)
    .map(([kategori, total]) => `${kategori}: ${total} produk`)
    .join(", ");
}

/**
 * Function Contract: renderProduk
 * Input: Tidak ada (membaca DOM dan variabel produkUmkm)
 * Proses: Menyaring produk via filter, mapping markup kartu via map,
 *         mencari unggulan via find, dan menghitung kategori via forEach
 * Output: void
 * Efek Samping: Memodifikasi konten innerHTML / textContent dari elemen DOM
 */
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const wadahUnggulan = document.querySelector("#produk-unggulan");

  // DOM Guard: Jika elemen target tidak ada di halaman saat ini, batalkan rendering dengan aman
  if (!grid || !ringkasan) {
    return;
  }

  console.log("=== [P10] Inisialisasi Render Katalog Produk ===");

  // 1. Array Method: filter (menyaring hanya produk yang masih memiliki stok)
  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  console.log(`[P10 filter] ${produkTersedia.length} produk tersedia dari total ${produkUmkm.length} data.`);

  // 2. Array Method: map (mengonversi array objek produk menjadi array markup HTML kartu, diakhiri join(""))
  const markup = produkTersedia.map(buatKartuProduk).join("");
  grid.innerHTML = markup;

  // 3. Array Method: find (mengambil produk unggulan pertama yang memiliki properti unggulan === true)
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  if (wadahUnggulan && produkUnggulan) {
    wadahUnggulan.innerHTML = buatKartuUnggulan(produkUnggulan);
    console.log("[P10 find] Produk unggulan ditemukan:", produkUnggulan.nama);
  }

  // 4. Loop / Array Method: forEach (menghitung rekapitulasi kategori & logging terarah)
  const ringkasanKategori = hitungRingkasanKategori(produkUmkm);
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data. (${ringkasanKategori})`;

  console.log("=== [P10 forEach] Inspeksi Item Produk ===");
  produkUmkm.forEach((produk) => {
    const status = statusStok(produk.stok);
    console.log(`- ${produk.nama} [${produk.kategori}]: Stok ${produk.stok} -> Status: ${status.label}`);
  });
}

// Inisialisasi pemanggilan fungsi utama setelah DOM siap
document.addEventListener("DOMContentLoaded", renderProduk);
