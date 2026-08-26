(function () {
    "use strict";

    function initReveal() {
        const els = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            els.forEach(el => el.classList.add("in"));
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        els.forEach(el => obs.observe(el));
    }

    function initCounters() {
        const els = document.querySelectorAll(".counter");
        if (!("IntersectionObserver" in window)) {
            els.forEach(el => { el.textContent = el.dataset.target; });
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const target = parseInt(el.dataset.target, 10) || 0;
                const dur = 1600, start = performance.now();
                function tick(now) {
                    const p = Math.min((now - start) / dur, 1);
                    el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
                    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
                }
                requestAnimationFrame(tick);
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        els.forEach(el => obs.observe(el));
    }

    function initVideo() {
        const video = document.getElementById("introVideo");
        const btn = document.getElementById("videoPlay");
        if (!video) return;

        const cfg = window.GSLC_CONFIG;
        const source = video.querySelector("source");
        if (cfg && cfg.INTRO_VIDEO) {
            if (source) source.src = cfg.INTRO_VIDEO;
            else {
                const s = document.createElement("source");
                s.src = cfg.INTRO_VIDEO; s.type = "video/mp4";
                video.appendChild(s);
            }
            video.load();
        }

        const updateBtn = () => {
            if (btn) btn.classList.toggle("show", video.paused);
        };

        const playWithSound = () => {
            video.muted = false;
            const p = video.play();
            if (p) p.then(updateBtn).catch(updateBtn);
        };

        const tryAutoplay = () => {
            video.muted = true;
            const p = video.play();
            if (p) p.then(updateBtn).catch(updateBtn);
        };

        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                playWithSound();
            });
        }

        video.addEventListener("click", () => {
            if (video.paused) {
                video.muted = false;
                const p = video.play();
                if (p) p.then(updateBtn).catch(updateBtn);
            }
        });
        video.addEventListener("play", updateBtn);
        video.addEventListener("pause", updateBtn);
        video.addEventListener("ended", updateBtn);

        const kickstart = () => {
            if (video.paused) tryAutoplay();
            window.removeEventListener("pointerdown", kickstart);
            window.removeEventListener("keydown", kickstart);
        };
        window.addEventListener("pointerdown", kickstart);
        window.addEventListener("keydown", kickstart);

        video.addEventListener("canplay", () => {
            tryAutoplay();
            updateBtn();
        });
        video.addEventListener("playing", updateBtn);
    }

    document.addEventListener("DOMContentLoaded", () => {
        initReveal();
        initCounters();
        initVideo();
    });
})();
