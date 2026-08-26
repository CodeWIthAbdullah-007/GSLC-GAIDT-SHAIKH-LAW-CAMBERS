(function () {
    "use strict";
    const cfg = window.GSLC_CONFIG;

    const CURRENT = (location.pathname.split("/").pop() || "index.html");
    const isActive = (href) =>
        (href === "index.html" && CURRENT === "index.html") ||
        (CURRENT === "" && href === "index.html") ||
        (CURRENT === href);

    const NAV = [
        { href: "index.html", label: "Home" },
        { href: "about.html", label: "About" },
        { href: "practice.html", label: "Practice Areas" },
        { href: "partners.html", label: "Partners" },
        { href: "testimonials.html", label: "Testimonials" },
        { href: "contact.html", label: "Contact" }
    ];

    function icon(kind) {
        const set = {
            moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
            sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>'
        };
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + set[kind] + "</svg>";
    }

    const headerHTML = `
  <header id="header">
    <div class="container nav">
      <a href="index.html" class="brand">
        <img class="logo" src="${cfg.LOGO}" alt="${cfg.BRAND} Logo" />
        <span class="brand-name"><b>${cfg.BRAND}</b><span>${cfg.BRAND_SUB}</span></span>
      </a>

      <nav class="nav-links" id="navLinks" aria-label="Main">
        ${NAV.map(n => `<a href="${n.href}" class="${isActive(n.href) ? "active" : ""}">${n.label}</a>`).join("")}
      </nav>

      <div class="nav-cta">
        <button class="theme-toggle" id="themeToggle" title="Toggle dark / light mode" aria-label="Toggle theme">
          <span id="iconMoon">${icon("moon")}</span>
          <span id="iconSun" style="display:none">${icon("sun")}</span>
        </button>
        <a href="contact.html" class="btn btn-gold">Book Consultation</a>
        <button class="hamburger" id="hamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-menu" id="mobileMenu">
    ${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}
  </div>`;

    const footerHTML = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <img class="logo" src="${cfg.LOGO}" alt="${cfg.BRAND} Logo" style="height:38px"/>
            <span class="brand-name"><b>${cfg.BRAND}</b><span>${cfg.BRAND_SUB}</span></span>
          </a>
          <p>A full-service law chamber delivering strategic, ethical and results-driven legal counsel to individuals and enterprises.</p>
          <div class="social">
            <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1 .3-2 2-2h2V2h-3c-2.5 0-4 1.5-4 4V10H7v4h3v8z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5H3V21h3.5zM4.8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 12.5c0-3-1.5-5-4-5a3.4 3.4 0 0 0-3 1.6V8.5H10.5V21H14v-6.5c0-1.5.8-2.5 2-2.5s2 1 2 2.5V21H21z"/></svg></a>
            <a href="#" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.9 7.9L23 22h-6.3l-5-6.5L6 22H2.9l7.4-8.5L2 2h6.4l4.5 6z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          </div>
        </div>

        <div>
          <h5>Quick Links</h5>
          <div class="footer-links">
            ${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}
          </div>
        </div>

        <div>
          <h5>Practice Areas</h5>
          <div class="footer-links">
            <a href="practice.html">Corporate Law</a>
            <a href="practice.html">Civil Litigation</a>
            <a href="practice.html">Criminal Defence</a>
            <a href="practice.html">Property Law</a>
            <a href="practice.html">Family Law</a>
          </div>
        </div>

        <div>
          <h5>Contact</h5>
          <div class="footer-contact">
            <span>${cfg.ADDRESS_LINE2}</span>
            <a href="${cfg.PHONE_HREF}">${cfg.PHONE}</a>
            <a href="mailto:${cfg.EMAIL}">${cfg.EMAIL}</a>
            <span>${cfg.HOURS}</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© <span id="year"></span> ${cfg.BRAND} — ${cfg.BRAND_SUB}. All rights reserved.</span>
        <span>Made with <span class="heart">&hearts;</span> for justice.</span>
      </div>
    </div>
  </footer>`;

    function mount() {
        const headZone = document.querySelector("header-zone");
        const footZone = document.querySelector("footer-zone");
        if (headZone) headZone.insertAdjacentHTML("afterend", headerHTML);
        if (footZone) footZone.insertAdjacentHTML("afterend", footerHTML);

        const link = document.querySelector('link[rel="icon"]') || document.createElement("link");
        link.rel = "icon"; link.href = cfg.FAVICON;
        if (!document.querySelector('link[rel="icon"]')) document.head.appendChild(link);

        const y = document.getElementById("year");
        if (y) y.textContent = new Date().getFullYear();

        const header = document.getElementById("header");
        function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 40); }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const hamburger = document.getElementById("hamburger");
        const menu = document.getElementById("mobileMenu");
        if (hamburger && menu) {
            hamburger.addEventListener("click", () => menu.classList.toggle("open"));
            menu.querySelectorAll("a").forEach(a =>
                a.addEventListener("click", () => menu.classList.remove("open")));
        }
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
    else mount();
})();
