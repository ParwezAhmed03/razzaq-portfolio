/* ===== Mohammed Abdul Razzaq Siddiqui – Portfolio scripts ===== */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Navbar: scrolled state, active link, back-to-top ---------- */
  const nav = document.getElementById("mainNav");
  const toTop = document.getElementById("toTop");
  const sections = document.querySelectorAll("section[id], header[id]");
  const links = document.querySelectorAll("#mainNav .nav-link");

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    toTop.classList.toggle("show", y > 500);

    let current = "home";
    sections.forEach(function (s) {
      if (y >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Close the mobile menu after clicking a link
  const menu = document.getElementById("navMenu");
  links.forEach(function (l) {
    l.addEventListener("click", function () {
      if (menu.classList.contains("show"))
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  /* ---------- Typing effect ---------- */
  const roles = [
    "Civil Engineer",
    "Site Supervisor",
    "AutoCAD Drafter",
    "Sustainable Infrastructure Enthusiast",
  ];
  const typedEl = document.getElementById("typed");
  let r = 0,
    c = 0,
    deleting = false;

  function type() {
    const word = roles[r];
    typedEl.textContent = word.substring(0, c);
    if (!deleting && c < word.length) {
      c++;
      setTimeout(type, 90);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1500);
    } else if (c > 0) {
      c--;
      setTimeout(type, 45);
    } else {
      deleting = false;
      r = (r + 1) % roles.length;
      setTimeout(type, 300);
    }
  }
  type();

  /* ---------- Scroll reveal + counters + progress bars ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = !Number.isInteger(target);
    const steps = 30;
    const increment = target / steps;
    let value = 0;
    const timer = setInterval(function () {
      value += increment;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
    }, 60);
  }

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        el.querySelectorAll("[data-count]").forEach(animateCount);
        el.querySelectorAll(".progress-bar").forEach(function (b) {
          b.style.width = b.dataset.width + "%";
        });
        io.unobserve(el);
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    io.observe(el);
  });

  /* ---------- Gallery: use real images if present, open lightbox ---------- */
  const lightbox = new bootstrap.Modal(document.getElementById("lightbox"));
  const lbTitle = document.getElementById("lightboxTitle");
  const lbBody = document.getElementById("lightboxBody");

  document.querySelectorAll(".g-item").forEach(function (item) {
    const src = item.dataset.img;
    const probe = new Image();
    probe.onload = function () {
      item.style.backgroundImage = 'url("' + src + '")';
      item.classList.add("has-img");
      item.dataset.loaded = "true";
    };
    probe.src = src;

    item.addEventListener("click", function () {
      lbTitle.textContent = item.dataset.title;
      lbBody.innerHTML = "";
      if (item.dataset.loaded) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = item.dataset.title;
        lbBody.appendChild(img);
      } else {
        const ph = document.createElement("div");
        ph.className =
          "ph " +
          Array.from(item.classList).find(function (k) {
            return /^g\d$/.test(k);
          });
        ph.innerHTML = item.querySelector("i").outerHTML;
        lbBody.appendChild(ph);
      }
      lightbox.show();
    });
  });

  /* ---------- Enquiry form ---------- */
  const form = document.getElementById("enquiryForm");
  const message = document.getElementById("message");
  const counter = document.getElementById("charCount");
  const submitBtn = document.getElementById("submitBtn");
  const alertBox = document.getElementById("formAlert");

  message.addEventListener("input", function () {
    counter.textContent = message.value.length;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alertBox.classList.add("d-none");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelectorAll(":invalid").forEach(function (f) {
        f.classList.add("is-invalid");
      });
      const firstBad = form.querySelector(":invalid");
      if (firstBad) firstBad.focus();
      return;
    }

    // Simulated send (front-end only). See README to connect a real backend / Formspree.
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-label").classList.add("d-none");
    submitBtn.querySelector(".spinner-border").classList.remove("d-none");

    const name = document.getElementById("name").value.trim();
    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.querySelector(".btn-label").classList.remove("d-none");
      submitBtn.querySelector(".spinner-border").classList.add("d-none");
      alertBox.textContent =
        "Thank you, " +
        name +
        "! Your message has been sent. I will get back to you soon.";
      alertBox.classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
      form.querySelectorAll(".is-invalid").forEach(function (f) {
        f.classList.remove("is-invalid");
      });
      counter.textContent = "0";
    }, 1200);
  });

  // Clear the invalid state as the user fixes a field
  form.querySelectorAll("input, select, textarea").forEach(function (f) {
    f.addEventListener("input", function () {
      f.classList.toggle("is-invalid", !f.checkValidity());
    });
  });
})();
