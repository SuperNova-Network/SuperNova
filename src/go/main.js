import "../styles/styles.css";
import { initSettingsInteractions } from "../shared/settings";

initSettingsInteractions();

const initGoPage = () => {
  const iframe = document.getElementById("frame");
  const overlay = document.getElementById("loading-overlay");
  if (!iframe || !overlay) return;

  const showOverlay = () => {
    overlay.classList.remove("hidden");
    overlay.style.opacity = "1";
  };

  const hideOverlay = () => {
    overlay.classList.add("hidden");
    overlay.style.opacity = "0";
  };

  const loadJsDelivrIntoFrame = (url) => {
    showOverlay();
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error loading jsdelivr content:", error);
        iframe.src = "/new";
      });
  };

  const resolveStartUrl = (url) => {
    if (!url) return "/new";
    if (url.includes("jsdelivr")) return url;
    if (url.startsWith("/uv") || url.startsWith("/scramjet")) return url;
    if (url.startsWith("http")) {
      return localStorage.getItem("proxy-backend") === "ultraviolet"
        ? window.encodeAny(url)
        : window.sjEncodeAndGo(url);
    }
    return `/cdn/${url}/`;
  };

  showOverlay();

  const lpUrl = sessionStorage.getItem("lpurl");
  if (lpUrl) {
    if (lpUrl.includes("jsdelivr")) {
      loadJsDelivrIntoFrame(lpUrl);
    } else {
      iframe.src = resolveStartUrl(lpUrl);
    }
  } else {
    iframe.src = "/new";
  }

  iframe.addEventListener("load", () => {
    setTimeout(hideOverlay, 100);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGoPage, { once: true });
} else {
  initGoPage();
}
