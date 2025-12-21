export function initSettingsInteractions() {
  const initialize = () => {
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

    if (localStorage.getItem("panicEnabled") === "true") {
      window.addEventListener("keydown", (e) => {
        const active = document.activeElement;
        const isTyping =
          active &&
          (active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.isContentEditable);
        if (isTyping) return;
        if (
          localStorage.getItem("panicEnabled") === "true" &&
          e.key === (localStorage.getItem("panicKey") || "Escape")
        ) {
          const url =
            localStorage.getItem("redirectUrl") || "https://classroom.google.com";
          window.location.href = url;
        }
      });
    }

    // Redirect URL
    const redirectInput = document.getElementById("redirect-url");
    if (redirectInput) {
      redirectInput.value =
        localStorage.getItem("redirectUrl") || "https://classroom.google.com";
      const isValidUrl = (str) => {
        try {
          // eslint-disable-next-line no-new
          new URL(str);
          return true;
        } catch {
          return false;
        }
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
            showToast("Redirect URL saved successfully!");
          } else {
            showToast("Please enter a valid URL (e.g., https://example.com)", true);
            redirectInput.style.borderColor = "red";
          }
        }
      });
    }

    // Auto Cloak
    const autoCloakToggle = document
      .querySelectorAll(".settings-section .section-header.with-toggle")[1]
      ?.querySelector("input[type='checkbox']");
    if (autoCloakToggle) {
      autoCloakToggle.checked = localStorage.getItem("autoCloakEnabled") === "true";
      autoCloakToggle.addEventListener("change", (e) => {
        localStorage.setItem("autoCloakEnabled", e.target.checked);
      });
    }

    // Anti-Close
    const antiCloseToggle = document
      .querySelectorAll(".settings-section .section-header.with-toggle")[2]
      ?.querySelector("input[type='checkbox']");
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
      if (antiCloseToggle.checked) {
        window.onbeforeunload = () => "Are you sure you want to leave?";
      }
    }

    // Cloak Apply Button
    const applyCloakBtn = document.getElementById("apply-cloak");
    if (applyCloakBtn) {
      applyCloakBtn.addEventListener("click", applyCloaking);
    }

    updateProxyTypeUI(
      localStorage.getItem("proxy-backend") ||
        localStorage.getItem("proxyType") ||
        "scramjet",
    );
    updateTransportTypeUI(
      localStorage.getItem("transport") ||
        sessionStorage.getItem("selectedTransport") ||
        "bare",
    );
    updateCloakTypeUI(localStorage.getItem("cloakType") || "about");
    updateApplyCloakButton(localStorage.getItem("cloakType") || "about");

    const exportBtn = document.querySelector(".export-button");
    const importBtn = document.querySelector(".import-button");
    if (exportBtn) {
      exportBtn.addEventListener("click", exportAllData);
    }
    if (importBtn) {
      importBtn.addEventListener("click", importAllData);
    }

    document.querySelectorAll(".settings-tab-link").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Tab functionality coming soon.");
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
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
      // eslint-disable-next-line no-alert
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
    }
  }
}

function applyCloaking() {
  const cloakType = localStorage.getItem("cloakType") || "about";
  if (cloakType === "about" || cloakType === "blob") {
    blank3();
  }
  showToast(`Cloaking applied: ${cloakType}`);
}

function exportAllData() {
  const data = {
    localStorage: { ...localStorage },
    sessionStorage: { ...sessionStorage },
    cookies: document.cookie,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "supernova-backup.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Data exported successfully!");
}

function importAllData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const [file] = e.target.files || [];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.localStorage) {
          Object.entries(data.localStorage).forEach(([k, v]) => {
            localStorage.setItem(k, v);
          });
        }
        if (data.sessionStorage) {
          Object.entries(data.sessionStorage).forEach(([k, v]) => {
            sessionStorage.setItem(k, v);
          });
        }
        if (data.cookies) {
          data.cookies.split(";").forEach((cookie) => {
            document.cookie = cookie;
          });
        }
        showToast("Data imported! Reloading...");
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        showToast(`Import failed: ${err}`, true);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function showToast(msg, error) {
  if (typeof window.Toastify === "function") {
    window
      .Toastify({
        text: msg,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: error ? "#e74c3c" : "var(--primary-color)",
          borderRadius: "var(--border-radius)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      })
      .showToast();
  } else {
    // eslint-disable-next-line no-alert
    alert(msg);
  }
}
