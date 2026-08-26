(function () {
    "use strict";
    const cfg = window.GSLC_CONFIG;
    const root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        const moon = document.getElementById("iconMoon");
        const sun = document.getElementById("iconSun");
        if (moon) moon.style.display = theme === "light" ? "none" : "block";
        if (sun) sun.style.display = theme === "light" ? "block" : "none";
        try { localStorage.setItem(cfg.THEME_KEY, theme); } catch (e) { }
    }

    function init() {
        let saved = null;
        try { saved = localStorage.getItem(cfg.THEME_KEY); } catch (e) { }
        applyTheme(saved || cfg.DEFAULT_THEME);

        document.addEventListener("click", function (e) {
            const btn = e.target.closest("#themeToggle");
            if (!btn) return;
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
        });
    }

    init();
})();
