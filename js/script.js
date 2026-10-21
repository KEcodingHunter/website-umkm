// Daftar heading pada halaman untuk kebutuhan log inspeksi struktur
const headings = [...document.querySelectorAll("h1, h2, h3")];
console.log("Daftar heading pada halaman:");
headings.forEach((heading) => {
  console.log(heading.tagName, "-", heading.textContent.trim());
});

// Inspeksi tabel harga pada halaman produk
const tableRows = document.querySelectorAll("tbody tr");
const tableCaption = document.querySelector("caption");
if (tableRows.length > 0) {
  console.log("Jumlah produk pada tabel: " + tableRows.length);
  console.log("Caption tabel: " + (tableCaption ? tableCaption.textContent.trim() : "Tidak ada caption"));
}

function getOrCreateToastContainer() {
  let container = document.querySelector("#toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }
  return container;
}

function showToast(title, message, icon = "☕", duration = 4500) {
  const container = getOrCreateToastContainer();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");

  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icon}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <p class="toast-message">${message}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Tutup notifikasi">&times;</button>
  `;

  const closeBtn = toast.querySelector(".toast-close");
  const dismissToast = () => {
    if (toast.classList.contains("toast-hiding")) return;
    toast.classList.add("toast-hiding");
    toast.addEventListener(
      "animationend",
      () => {
        toast.remove();
      },
      { once: true }
    );
  };

  closeBtn.addEventListener("click", dismissToast);

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(dismissToast, duration);
  }
}

function spawnPromoParticles(targetButton) {
  const rect = targetButton.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const icons = ["☕", "✨", "🎉", "🔥", "⭐"];

  const particleCount = 12;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "particle-burst";
    particle.textContent = icons[Math.floor(Math.random() * icons.length)];

    // Acak arah lemparan partikel
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const distance = 50 + Math.random() * 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 30; // cenderung ke atas
    const tr = (Math.random() - 0.5) * 90;

    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    particle.style.setProperty("--tr", `${tr}deg`);

    document.body.appendChild(particle);

    particle.addEventListener(
      "animationend",
      () => {
        particle.remove();
      },
      { once: true }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const navToggle = document.querySelector("#navToggle");
  const nav = document.querySelector("#primaryNav") || document.querySelector(".nav");
  const navOverlay = document.querySelector("#navOverlay");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  function closeMobileNav() {
    if (!navToggle || !nav) return;
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu navigasi");
    nav.classList.remove("is-open");
    if (navOverlay) navOverlay.classList.remove("is-active");
    document.body.classList.remove("nav-open");
  }

  function openMobileNav() {
    if (!navToggle || !nav) return;
    navToggle.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Tutup menu navigasi");
    nav.classList.add("is-open");
    if (navOverlay) navOverlay.classList.add("is-active");
    document.body.classList.add("nav-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener("click", closeMobileNav);
    }

    // Menutup menu otomatis jika link diklik
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 672) {
          closeMobileNav();
        }
      });
    });

    // Menutup menu dengan tombol Escape di keyboard
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMobileNav();
        navToggle.focus();
      }
    });

    // Otomatis menutup menu mobile jika resolusi diperlebar ke desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 672 && nav.classList.contains("is-open")) {
        closeMobileNav();
      }
    });
  }

  const siteHeader = document.querySelector(".site-header");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeaderOnScroll() {
    if (!siteHeader) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateHeaderOnScroll();

  const promoButton = document.querySelector("#promoButton");
  if (promoButton) {
    promoButton.addEventListener("click", () => {
      // Pertahankan perilaku asli
      promoButton.textContent = "Promo: Beli 2 gratis tester!";
      console.log("Promo Kopi Nusa berhasil ditampilkan.");

      // Efek animasi partikel & feedback visual
      spawnPromoParticles(promoButton);

      // Notifikasi Toast
      showToast(
        "Promo Spesial Berhasil Diaktifkan!",
        "Beli 2 gratis tester! Nikmati juga diskon 20% pembelian pertama dengan kode: <strong>KOPINUSA20</strong>",
        "🎉",
        5000
      );
    });
  }

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

  const revealElements = document.querySelectorAll(
    ".hero, .featured-section, .product-card, .media-card, figure, section, form, .table-container"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el, index) => {
      el.classList.add("reveal-on-scroll");
      // Menambahkan stagger delay lembut untuk kartu-kartu yang berjejer
      if (el.classList.contains("product-card") || el.classList.contains("media-card")) {
        const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
        el.style.transitionDelay = `${(siblingIndex % 3) * 0.1}s`;
      }
      revealObserver.observe(el);
    });
  } else {
    // Fallback untuk browser yang sangat lama
    revealElements.forEach((el) => el.classList.add("is-revealed"));
  }

  let backToTopBtn = document.querySelector("#backToTop");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.type = "button";
    backToTopBtn.setAttribute("aria-label", "Kembali ke atas");
    backToTopBtn.setAttribute("title", "Kembali ke atas");
    backToTopBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  let lightbox = document.querySelector("#lightboxModal");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "lightboxModal";
    lightbox.className = "lightbox-modal";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Tinjauan Gambar Penuh");
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button type="button" class="lightbox-close" aria-label="Tutup pratinjau gambar">&times;</button>
        <img class="lightbox-img" src="" alt="" />
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Foto Kopi Nusa";
    lightboxCaption.textContent = caption || alt || "";
    lightbox.classList.add("is-active");
    document.body.classList.add("nav-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    document.body.classList.remove("nav-open");
    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-active")) {
      closeLightbox();
    }
  });

  // Sambungkan semua gambar interaktif ke lightbox
  const interactiveImages = document.querySelectorAll(
    ".gallery-grid img, .media-card img, .card-image-box img, .profile-image, .hero-image"
  );

  interactiveImages.forEach((img) => {
    img.setAttribute("title", "Klik untuk memperbesar gambar");
    img.addEventListener("click", () => {
      const figure = img.closest("figure");
      const figcaption = figure ? figure.querySelector("figcaption") : null;
      const captionText = figcaption ? figcaption.textContent.trim() : img.getAttribute("alt");
      openLightbox(img.currentSrc || img.src, img.alt, captionText);
    });
  });
});
