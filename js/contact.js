
(function () {
    "use strict";
    const cfg = window.GSLC_CONFIG;

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("contactForm");
        if (!form) return;

        const status = document.getElementById("formStatus");

        function setField(input, ok) {
            const f = input.closest(".field");
            if (f) f.classList.toggle("invalid", !ok);
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();
            const phone = form.phone.value.trim();
            const service = form.service ? form.service.value : "";

            const nameOk = name.length >= 2;
            const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
            const msgOk = message.length >= 10;

            setField(form.name, nameOk);
            setField(form.email, emailOk);
            setField(form.message, msgOk);

            if (!nameOk || !emailOk || !msgOk) {
                status.className = "form-status err";
                status.textContent = "Please fill in the required fields correctly.";
                return;
            }

            const btn = form.querySelector("button[type=submit]");
            const btnText = btn.textContent;
            btn.disabled = true;
            btn.textContent = "Sending…";

            const inquiry = { name, email, phone, service, message, received_at: new Date().toISOString() };

            try {

                if (cfg.USE_SUPABASE && cfg.SUPABASE_URL) {
                    const res = await fetch(`${cfg.SUPABASE_URL}/rest/v1/${cfg.SUPABASE_TABLE}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": cfg.SUPABASE_ANON_KEY,
                            "Authorization": "Bearer " + cfg.SUPABASE_ANON_KEY,
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify(inquiry)
                    });
                    if (!res.ok) throw new Error("supabase");

                    status.className = "form-status ok";
                    status.textContent = "Thank you! Your inquiry has been received. A partner will respond shortly.";
                    form.reset();
                } else {

                    const subject = encodeURIComponent(cfg.CONTACT_SUBJECT);
                    const body = encodeURIComponent(
                        `New inquiry received from the ${cfg.BRAND} website:

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Service: ${service || "-"}

Message:
${message}

--
Sent ${new Date().toLocaleString()}
`);
                    window.location.href = `mailto:${cfg.EMAIL}?subject=${subject}&body=${body}`;

                    status.className = "form-status ok";
                    status.textContent = "Your email app has opened to send your inquiry to " + cfg.EMAIL;
                    form.reset();
                }
            } catch (err) {
                status.className = "form-status err";
                status.textContent = "Something went wrong. Please email us directly at " + cfg.EMAIL;
            } finally {
                btn.disabled = false;
                btn.textContent = btnText;
            }
        });
    });
})();
