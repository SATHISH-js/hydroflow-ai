/**
 * HYDROFLOW AI - Main Application Coordinator
 * Handles navigation routing, theme toggling, language integration,
 * dynamic pressure gauge animation, toast notifications, and droplet canvas.
 */

// Global navigation helper
function navigateToSection(sectionId) {
  document.querySelectorAll(".app-section").forEach(sec => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update nav link active states
  document.querySelectorAll(".nav-link-custom").forEach(link => {
    if (link.getAttribute("data-target") === sectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Toast notification helper
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toastEl = document.createElement("div");
  const bgClass = type === "danger" ? "bg-danger text-white" :
                  type === "success" ? "bg-success text-white" :
                  type === "warning" ? "bg-warning text-dark" : "bg-primary text-white";

  toastEl.className = `toast align-items-center ${bgClass} border-0 shadow`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center gap-2">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'x-circle' : 'info-circle'}-fill"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  container.appendChild(toastEl);

  if (typeof bootstrap !== "undefined") {
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  } else {
    setTimeout(() => toastEl.remove(), 3500);
  }
}

// Pressure Gauge controller
function updatePressureGauge(headLossValue = 2.45) {
  const needle = document.getElementById("gaugeNeedle");
  const readout = document.getElementById("gaugeReadout");
  if (!needle) return;

  // Map head loss (0m to 25m) to needle angle (-110 deg to +110 deg)
  const clampedLoss = Math.min(25, Math.max(0, headLossValue));
  const angle = -110 + (clampedLoss / 25) * 220;
  needle.style.transform = `rotate(${angle}deg)`;

  if (readout) {
    readout.textContent = clampedLoss.toFixed(2);
  }
}

// Lightweight Water Droplets Canvas Animation
function initWaterDropletsCanvas() {
  const canvas = document.getElementById("dropletsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const droplets = [];
  const dropletCount = Math.min(35, Math.floor(width / 30));

  for (let i = 0; i < dropletCount; i++) {
    droplets.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.35 + 0.15
    });
  }

  function renderDroplets() {
    ctx.clearRect(0, 0, width, height);

    // Get current cyan color depending on theme
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const fillBase = isLight ? "2, 132, 199" : "0, 240, 255";

    droplets.forEach(d => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${fillBase}, ${d.opacity})`;
      ctx.fill();

      d.y += d.speedY;
      if (d.y > height) {
        d.y = -5;
        d.x = Math.random() * width;
      }
    });

    requestAnimationFrame(renderDroplets);
  }

  renderDroplets();
}

// Theme handling
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hydroflow_theme", theme);

  // Update dropdown checkmark or label
  document.querySelectorAll("[data-theme-choice]").forEach(el => {
    if (el.getAttribute("data-theme-choice") === theme) {
      el.classList.add("active", "fw-bold");
      if (!el.querySelector(".bi-check2")) {
        const icon = document.createElement("i");
        icon.className = "bi bi-check2 ms-auto";
        el.appendChild(icon);
      }
    } else {
      el.classList.remove("active", "fw-bold");
      el.querySelector(".bi-check2")?.remove();
    }
  });
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Theme init
  const savedTheme = localStorage.getItem("hydroflow_theme") || "hydraulic-blue";
  setTheme(savedTheme);

  document.querySelectorAll("[data-theme-choice]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const theme = btn.getAttribute("data-theme-choice");
      setTheme(theme);
    });
  });

  // Language init
  const savedLang = localStorage.getItem("hydroflow_lang") || "en";
  setLanguage(savedLang);

  document.querySelectorAll("[data-lang-choice]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang-choice");
      setLanguage(lang);
    });
  });

  // Navigation handlers
  document.querySelectorAll(".nav-link-custom").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      if (target) {
        navigateToSection(target);
      }
    });
  });

  // Home explore buttons
  document.querySelectorAll("[data-navigate]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-navigate");
      if (target) {
        navigateToSection(target);
      }
    });
  });

  // AI Assistant trigger buttons
  document.querySelectorAll("[data-open-bot]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.hydroBot) {
        window.hydroBot.openWindow();
      }
    });
  });

  // Initialize Canvas animation
  initWaterDropletsCanvas();

  // Initial gauge demonstration
  updatePressureGauge(3.85);
});
