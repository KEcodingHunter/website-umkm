const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    preview.textContent = [
      `Nama: ${data.get("nama")}`,
      `Email: ${data.get("email")}`,
      `Paket: ${data.get("paket")}`,
      `Topik: ${data.get("topik")}`,
      `Pesan: ${data.get("pesan")}`,
    ].join("\n");

    // Efek animasi highlight pada kotak preview
    preview.classList.remove("highlight-update");
    // Trigger reflow untuk me-restart animasi
    void preview.offsetWidth;
    preview.classList.add("highlight-update");

    // Notifikasi Toast jika fungsi showToast tersedia
    if (typeof showToast === "function") {
      showToast(
        "Formulir Berhasil Dikirim!",
        `Halo ${data.get("nama") || "Pelanggan"}, data Anda telah berhasil dicatat pada pratinjau.`,
        "✉️",
        4500
      );
    }

    // Scroll halus ke pratinjau di layar kecil/mobile agar pengguna langsung melihat hasil
    if (window.innerWidth < 768) {
      preview.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}