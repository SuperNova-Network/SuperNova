// Lightweight button interaction logic tailored for test.html
document.addEventListener("DOMContentLoaded", () => {
  // Transport buttons
  document.querySelectorAll(".transport-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const transportType = btn.dataset.transport;
      document.querySelectorAll(".transport-option").forEach((b) => {
        b.classList.toggle("selected", b.dataset.transport === transportType);
      });
      sessionStorage.setItem("selectedTransport", transportType);
      localStorage.setItem("transport", transportType);
      if (typeof window.setTransport === "function") {
        window.setTransport(transportType);
      }
      // No popup on transport change
    });
  });

  // Proxy buttons
  document.querySelectorAll(".proxy-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const proxyType = btn.dataset.proxy;
      document.querySelectorAll(".proxy-option").forEach((b) => {
        b.classList.toggle("selected", b.dataset.proxy === proxyType);
      });
      localStorage.setItem("proxy-backend", proxyType);
      localStorage.setItem("proxyType", proxyType);
      // No popup on proxy type change
    });
  });

  // Cloak buttons
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

  // Panic Button
  const panicToggle = document.getElementById("panic-enabled");
  if (panicToggle) {
    panicToggle.addEventListener("change", (e) => {
      localStorage.setItem("panicEnabled", e.target.checked);
    });
    // Restore state
    panicToggle.checked = localStorage.getItem("panicEnabled") === "true";
  }

  // Panic Key
  const panicKeyDisplay = document.getElementById("panic-key-display");
  if (panicKeyDisplay) {
    let panicKey = localStorage.getItem("panicKey") || "Escape";
    panicKeyDisplay.textContent = panicKey;
    panicKeyDisplay.addEventListener("click", () => {
      panicKeyDisplay.textContent = "Press any key...";
      const keyListener = (e) => {
        e.preventDefault();
        panicKey = e.key;
        localStorage.setItem("panicKey", panicKey);
        panicKeyDisplay.textContent = panicKey;
        window.removeEventListener("keydown", keyListener, true);
      };
      window.addEventListener("keydown", keyListener, true);
    });
  }

  // Panic Button global handler
  if (localStorage.getItem("panicEnabled") === "true") {
    window.addEventListener("keydown", (e) => {
      // Don't trigger if typing in input, textarea, or contenteditable
      const active = document.activeElement;
      const isTyping = active && (
        active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable
      );
      if (isTyping) return;
      if ((localStorage.getItem("panicEnabled") === "true") && e.key === (localStorage.getItem("panicKey") || "Escape")) {
        const url = localStorage.getItem("redirectUrl") || "https://classroom.google.com";
        window.location.href = url;
      }
    });
  }

  // Redirect URL
  const redirectInput = document.getElementById("redirect-url");
  if (redirectInput) {
    redirectInput.value = localStorage.getItem("redirectUrl") || "https://classroom.google.com";
    const isValidUrl = (str) => { try { new URL(str); return true; } catch { return false; } };
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
          showToast("Redirect URL saved successfully!");
        } else {
          showToast("Please enter a valid URL (e.g., https://example.com)", true);
          redirectInput.style.borderColor = "red";
        }
      }
    });
  }

  // Auto Cloak
  const autoCloakToggle = document.querySelectorAll(".settings-section .section-header.with-toggle")[1]?.querySelector("input[type='checkbox']");
  if (autoCloakToggle) {
    autoCloakToggle.checked = localStorage.getItem("autoCloakEnabled") === "true";
    autoCloakToggle.addEventListener("change", (e) => {
      localStorage.setItem("autoCloakEnabled", e.target.checked);
    });
  }

  // Anti-Close
  const antiCloseToggle = document.querySelectorAll(".settings-section .section-header.with-toggle")[2]?.querySelector("input[type='checkbox']");
  if (antiCloseToggle) {
    antiCloseToggle.checked = localStorage.getItem("antiCloseEnabled") === "true";
    antiCloseToggle.addEventListener("change", (e) => {
      localStorage.setItem("antiCloseEnabled", e.target.checked);
      if (e.target.checked) {
        window.onbeforeunload = () => "Are you sure you want to leave?";
      } else {
        window.onbeforeunload = null;
      }
    });
    // Restore on load
    if (antiCloseToggle.checked) {
      window.onbeforeunload = () => "Are you sure you want to leave?";
    }
  }

  // Cloak Apply Button
  const applyCloakBtn = document.getElementById("apply-cloak");
  if (applyCloakBtn) {
    applyCloakBtn.addEventListener("click", applyCloaking);
  }

  // Proxy Type UI
  updateProxyTypeUI(localStorage.getItem("proxy-backend") || localStorage.getItem("proxyType") || "scramjet");
  // Transport Type UI
  updateTransportTypeUI(localStorage.getItem("transport") || sessionStorage.getItem("selectedTransport") || "bare");
  // Cloak Type UI
  updateCloakTypeUI(localStorage.getItem("cloakType") || "about");
  updateApplyCloakButton(localStorage.getItem("cloakType") || "about");

  // Data Management
  const exportBtn = document.querySelector(".export-button");
  const importBtn = document.querySelector(".import-button");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportAllData);
  }
  if (importBtn) {
    importBtn.addEventListener("click", importAllData);
  }

  // Tabs (Browsing History, Bookmarks)
  document.querySelectorAll(".settings-tab-link").forEach((tab, idx) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Tab functionality coming soon.");
    });
  });
});

// Utility functions for updating UI
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

function blank3() {
  let inFrame;
  try {
    inFrame = window !== top;
  } catch (e) {
    inFrame = true;
  }
  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Popups are disabled!");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");

      link.rel = "icon";
      link.href = "";
      iframe.src = location.href;
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";
      doc.body.appendChild(iframe);
      //location.replace("https://google.com")
    }
  }
}

function applyCloaking() {
  const cloakType = localStorage.getItem("cloakType") || "about";
  if (cloakType === "about" || cloakType === "blob") {
    blank3();
  }
  showToast("Cloaking applied: " + cloakType);
}

// Data Management: Export all data
function exportAllData() {
  const data = {
    localStorage: {...localStorage},
    sessionStorage: {...sessionStorage},
    cookies: document.cookie,
    // IndexedDB and more could be added here
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'supernova-backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Data exported successfully!");
}

// Data Management: Import all data
function importAllData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.localStorage) {
          for (const [k, v] of Object.entries(data.localStorage)) {
            localStorage.setItem(k, v);
          }
        }
        if (data.sessionStorage) {
          for (const [k, v] of Object.entries(data.sessionStorage)) {
            sessionStorage.setItem(k, v);
          }
        }
        if (data.cookies) {
          // Set cookies (simple, not secure, demo only)
          data.cookies.split(';').forEach(cookie => {
            document.cookie = cookie;
          });
        }
        showToast("Data imported! Reloading...");
        setTimeout(() => location.reload(), 1000);
      } catch (err) {
        showToast("Import failed: " + err, true);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// Toast notification helper
function showToast(msg, error) {
  if (typeof Toastify === "function") {
    Toastify({
      text: msg,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: error ? "#e74c3c" : "var(--primary-color)",
        borderRadius: "var(--border-radius)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
    }).showToast();
  } else {
    alert(msg);
  }
}