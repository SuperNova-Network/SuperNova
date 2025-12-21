import "../styles/styles.css";
import { initializeStarfield } from "../shared/stars";
import { initSettingsInteractions } from "../shared/settings";

const initHomePage = () => {
  initSettingsInteractions();

  document.querySelectorAll(".index__nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      document.querySelectorAll(".index__nav li").forEach((li) => {
        li.classList.remove("index__active");
      });
      link.parentElement.classList.add("index__active");
      document.querySelectorAll(".index__tab").forEach((tab) => {
        tab.classList.remove("active");
      });
      const target = document.getElementById(tabId);
      if (target) {
        target.classList.add("active");
      }
    });
  });

  const canvas = document.getElementById("canvas");
  initializeStarfield(canvas);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePage, { once: true });
} else {
  initHomePage();
}
