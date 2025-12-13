// Lightweight button interaction logic tailored for test.html
document.addEventListener("DOMContentLoaded", () => {
  // Transport buttons: toggle selected class using data-transport
  document.querySelectorAll(".transport-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const transportType = btn.dataset.transport;
      document.querySelectorAll(".transport-option").forEach((b) => {
        b.classList.toggle("selected", b.dataset.transport === transportType);
      });
      // Persist selection and apply transport (like settings.js)
      sessionStorage.setItem("selectedTransport", transportType);
      localStorage.setItem("transport", transportType);
      if (typeof window.setTransport === "function") {
        window.setTransport(transportType);
      }
      if (typeof Toastify === "function") {
        Toastify({
          text: `Proxy transport changed to ${transportType}`,
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "var(--primary-color)",
            borderRadius: "var(--border-radius)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }).showToast();
      }
    });
  });

  // Proxy buttons: ignore proxy storage/logic; just toggle selection
  document.querySelectorAll(".proxy-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const proxyType = btn.dataset.proxy;
      document.querySelectorAll(".proxy-option").forEach((b) => {
        b.classList.toggle("selected", b.dataset.proxy === proxyType);
      });
      // Persist selection and show notification (like settings.js)
      localStorage.setItem("proxy-backend", proxyType);
      localStorage.setItem("proxyType", proxyType);
      if (typeof Toastify === "function") {
        Toastify({
          text: `Proxy backend set to ${proxyType}`,
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "var(--primary-color)",
            borderRadius: "var(--border-radius)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }).showToast();
      }
    });
  });

  // Cloak buttons: toggle selection and update apply button text
  document.querySelectorAll(".cloak-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cloakType = btn.dataset.cloak;
      document.querySelectorAll(".cloak-option").forEach((b) => {
        b.classList.toggle("selected", b.dataset.cloak === cloakType);
      });
      updateApplyCloakButton(cloakType);
      localStorage.setItem("cloakType", cloakType);
    });
  });

  // Initialize UI from stored values to match test.html
  initializeSettings();
});

// Initialize settings for test.html
function initializeSettings() {
  const panicEnabled = localStorage.getItem("panicEnabled") === "true";
  const redirectUrl = localStorage.getItem("redirectUrl") || "https://classroom.google.com";
  // Prefer localStorage for transport, fallback to sessionStorage, then default
  const transportType = localStorage.getItem("transport") || sessionStorage.getItem("selectedTransport") || "bare";
  const proxyType = localStorage.getItem("proxy-backend") || localStorage.getItem("proxyType") || "scramjet";
  const cloakType = localStorage.getItem("cloakType") || "about";

  const panicToggle = document.getElementById("panic-enabled");
  if (panicToggle) panicToggle.checked = panicEnabled;

  const redirectInput = document.getElementById("redirect-url");
  if (redirectInput) redirectInput.value = redirectUrl;

  updateTransportTypeUI(transportType);
  // Apply transport on init if handler exists
  if (typeof window.setTransport === "function") {
    window.setTransport(transportType);
  }
  updateProxyTypeUI(proxyType);
  updateCloakTypeUI(cloakType);
  updateApplyCloakButton(cloakType);

  addEventListeners();
}

function addEventListeners() {
  const panicToggle = document.getElementById("panic-enabled");
  if (panicToggle) {
    panicToggle.addEventListener("change", (e) => {
      localStorage.setItem("panicEnabled", e.target.checked);
    });
  }

  const redirectInput = document.getElementById("redirect-url");
  if (redirectInput) {
    const isValidUrl = (str) => {
      try { new URL(str); return true; } catch { return false; }
    };
    redirectInput.addEventListener("blur", (e) => {
      const url = e.target.value.trim();
      if (!isValidUrl(url)) {
        redirectInput.style.borderColor = "red";
      } else {
        localStorage.setItem("redirectUrl", url);
        redirectInput.style.borderColor = "";
      }
    });
    redirectInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const url = e.target.value.trim();
        if (isValidUrl(url)) {
          localStorage.setItem("redirectUrl", url);
          redirectInput.style.borderColor = "";
          alert("Redirect URL saved successfully!");
        } else {
          alert("Please enter a valid URL (e.g., https://example.com)");
          redirectInput.style.borderColor = "red";
        }
      }
    });
  }

  const applyCloakBtn = document.getElementById("apply-cloak");
  if (applyCloakBtn) {
    applyCloakBtn.addEventListener("click", applyCloaking);
  }
}

function updateTransportTypeUI(transportType) {
  document.querySelectorAll(".transport-option").forEach((b) => {
    b.classList.toggle("selected", b.dataset.transport === transportType);
  });
}

function updateProxyTypeUI(proxyType) {
  document.querySelectorAll(".proxy-option").forEach((b) => {
    b.classList.toggle("selected", b.dataset.proxy === proxyType);
  });
}

function updateCloakTypeUI(cloakType) {
  document.querySelectorAll(".cloak-option").forEach((b) => {
    b.classList.toggle("selected", b.dataset.cloak === cloakType);
  });
}

function updateApplyCloakButton(cloakType) {
  const button = document.getElementById("apply-cloak");
  if (!button) return;
  if (cloakType === "blob") {
    button.textContent = "Apply Blob Cloak";
  } else if (cloakType === "about") {
    button.textContent = "Apply About Blank";
  } else {
    button.textContent = "Apply Cloak";
  }
}

function applyCloaking() {
  const cloakType = localStorage.getItem("cloakType") || "about";
  console.log("Applying cloak type:", cloakType);
  alert("Cloaking applied: " + cloakType);
}
