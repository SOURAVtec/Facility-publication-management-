// Inject Font Awesome if not present
(function () {
  if (!document.getElementById("fa-cdn")) {
    var fa = document.createElement("link");
    fa.id = "fa-cdn";
    fa.rel = "stylesheet";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    document.head.appendChild(fa);
  }
})();

(function () {
  if (window.__themeToggleSwitchInjected) return;
  window.__themeToggleSwitchInjected = true;

  // Create switch
  const wrapper = document.createElement("div");
  wrapper.className = "theme-toggle-switch";
  wrapper.innerHTML = `
    <div class="switch" tabindex="0" aria-label="Toggle light and dark mode" role="button">
      <span class="icon moon"><i class="fas fa-moon"></i></span>
      <span class="icon sun"><i class="fas fa-sun"></i></span>
      <span class="ball"></span>
    </div>
  `;
  document.body.appendChild(wrapper);

  const switchEl = wrapper.querySelector(".switch");
  const ball = wrapper.querySelector(".ball");

  // Set initial state
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let dark = savedTheme === "dark" || (!savedTheme && prefersDark);
  document.body.classList.toggle("dark", dark);

  // Toggle logic
  function toggleTheme() {
    dark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  }
  switchEl.addEventListener("click", toggleTheme);
  switchEl.addEventListener("keydown", function (e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Inject switch CSS if not present
  if (!document.querySelector('link[href*="theme-toggle-fab.css"]')) {
    var fabcss = document.createElement("link");
    fabcss.rel = "stylesheet";
    fabcss.href = "assets/css/theme-toggle-fab.css";
    document.head.appendChild(fabcss);
  }
})();

button.setAttribute('aria-label', 'Toggle light/dark theme');
button.setAttribute('role', 'switch');
button.setAttribute('tabindex', '0');
button.title = "Toggle Theme";