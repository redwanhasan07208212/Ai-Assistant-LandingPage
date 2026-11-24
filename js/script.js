(function () {
  var $ = function (i) {
    return document.getElementById(i);
  };
  var D = window.I18N || {};
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = "en";
  try {
    lang =
      localStorage.getItem("lang") ||
      ((navigator.language || "").slice(0, 2) === "bn" ? "bn" : "en");
  } catch (e) {}
  function t(s) {
    return lang === "bn" && D[s] ? D[s] : s;
  }
  function nf(n, o) {
    return Number(n).toLocaleString(lang === "bn" ? "bn-BD" : "en-US", o);
  }

  /* ---------- Theme ---------- */
  var tb = $("theme");
  function syncTheme() {
    var d = root.getAttribute("data-theme") === "dark";
    tb.setAttribute("aria-pressed", d);
    tb.setAttribute(
      "aria-label",
      t(d ? "Switch to light mode" : "Switch to dark mode"),
    );
  }
  tb.addEventListener("click", function () {
    var n = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", n);
    try {
      localStorage.setItem("theme", n);
    } catch (e) {}
    syncTheme();
  });

  /* ---------- Mobile menu ---------- */
  var mb = $("menu-btn"),
    mn = $("menu");
  function setMenu(o) {
    mn.classList.toggle("open", o);
    mb.setAttribute("aria-expanded", o);
    mb.setAttribute("aria-label", t(o ? "Close menu" : "Open menu"));
  }
  mb.addEventListener("click", function () {
    setMenu(!mn.classList.contains("open"));
  });
  mn.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  document.addEventListener("click", function (e) {
    if (mn.classList.contains("open") && !e.target.closest("header"))
      setMenu(false);
  });
  window
    .matchMedia("(min-width:981px)")
    .addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });

  /* ---------- Demo tabs ---------- */
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (x) {
        x.setAttribute("aria-selected", x === b);
      });
      ["shop", "clinic", "food"].forEach(function (k) {
        $("p-" + k).hidden = k !== b.dataset.t;
      });
    });
  });

  /* ---------- Time calculator ---------- */
  function calc() {
    var m = +$("c-msgs").value || 0,
      n = +$("c-min").value || 0,
      s = +$("c-share").value || 0,
      r = +$("c-rate").value || 0;
    var h = (m * n * 30 * (s / 100)) / 60;
    $("c-share-out").textContent = nf(s) + "%";
    $("c-hours").textContent = nf(h, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    $("c-value").textContent = "৳" + nf(Math.round(h * r));
  }
  document.querySelectorAll("#calc input").forEach(function (i) {
    i.addEventListener("input", calc);
  });

  /* ---------- Readiness checklist ---------- */
  var boxes = Array.prototype.slice.call(
    document.querySelectorAll("#quiz input"),
  );
  function quiz() {
    var n = boxes.filter(function (b) {
        return b.checked;
      }).length,
      msg;
    if (n === 0) msg = "Tick a box to see what it means.";
    else if (n <= 2)
      msg =
        "Early days. Start with one simple task, like answering your top 10 questions.";
    else if (n <= 4)
      msg = "Good fit. An assistant could save you real time on repeat work.";
    else
      msg =
        "Great fit. You’re a strong candidate for chat and order automation.";
    $("q-score").textContent =
      lang === "bn"
        ? nf(boxes.length) + "টির মধ্যে " + nf(n) + "টি"
        : n + " of " + boxes.length;
    $("q-msg").textContent = t(msg);
  }
  boxes.forEach(function (b) {
    b.addEventListener("change", quiz);
  });

  /* ---------- Copy FAQ template ---------- */
  var cb = $("copy-btn"),
    cbTimer;
  cb.addEventListener("click", function () {
    var txt = Array.prototype.map
      .call(document.querySelectorAll("#faq-list li"), function (li, i) {
        return nf(i + 1) + ". " + li.textContent;
      })
      .join("\n");
    var ok = function () {
        cb.textContent = t("Copied ✓");
      },
      bad = function () {
        cb.textContent = t("Select the list and copy it");
      };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(ok, bad);
    } else {
      bad();
    }
    clearTimeout(cbTimer);
    cbTimer = setTimeout(function () {
      cb.textContent = t("Copy the list");
    }, 2500);
  });

  /* ---------- Reviews ---------- */
  // Add real customer reviews here, like: {name:'Name', biz:'Business', text:'Their words'}
  var REVIEWS = [];
  function mk(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    e.textContent = txt;
    return e;
  }
  function renderReviews() {
    var rg = $("reviews-grid");
    rg.innerHTML = "";
    if (REVIEWS.length) {
      $("reviews-lead").textContent = t(
        "Real feedback from the businesses we work with.",
      );
      REVIEWS.forEach(function (r) {
        var c = mk("div", "card");
        c.appendChild(mk("p", "quote", "“" + r.text + "”"));
        var w = mk("div", "who", r.name);
        w.appendChild(mk("small", "", r.biz));
        c.appendChild(w);
        rg.appendChild(c);
      });
    } else {
      $("reviews-lead").textContent = t(
        "We’re just getting started, and every early customer shapes what we build.",
      );
      var c0 = mk("div", "card");
      c0.appendChild(mk("h3", "t", t("Be one of our first customers")));
      c0.appendChild(
        mk(
          "p",
          "",
          t(
            "Try JARVIS AI on your business and tell us honestly how it goes. Your feedback will appear here.",
          ),
        ),
      );
      rg.appendChild(c0);
    }
    $("fb").href =
      "https://wa.me/8801853940963?text=" +
      encodeURIComponent(t("Hi JARVIS AI, I’d like to share my feedback: "));
  }

  /* ---------- WhatsApp contact form ---------- */
  $("lead").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = $("f-name").value.trim() || t("a business owner"),
      ty = $("f-type").value,
      m = $("f-msg").value.trim();
    var text =
      t("Hi JARVIS AI, I’m ") +
      n +
      " (" +
      ty +
      ")" +
      (lang === "bn" ? "। " : ". ") +
      (m || t("I’d like to learn more about your assistants."));
    window.open(
      "https://wa.me/8801853940963?text=" + encodeURIComponent(text),
      "_blank",
      "noopener",
    );
  });

  /* ---------- Language (English / Bangla) ---------- */
  var orig = new WeakMap(),
    lb = $("lang-btn"),
    TT = document.title,
    md = document.querySelector('meta[name="description"]'),
    MD = md ? md.getAttribute("content") : "";
  function walk() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (
          !p ||
          /^(SCRIPT|STYLE)$/.test(p.tagName) ||
          p.closest("[data-i18n-skip]")
        )
          return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    var n;
    while ((n = w.nextNode())) {
      if (!orig.has(n)) orig.set(n, n.nodeValue);
      var o = orig.get(n),
        m = o.match(/^(\s*)([\s\S]*?)(\s*)$/),
        key = m[2].replace(/\s+/g, " ");
      n.nodeValue = lang === "bn" && D[key] ? m[1] + D[key] + m[3] : o;
    }
  }
  function labels() {
    document.querySelectorAll("[aria-label]").forEach(function (e) {
      if (e.closest("[data-i18n-skip]")) return;
      if (!e.hasAttribute("data-en-label"))
        e.setAttribute("data-en-label", e.getAttribute("aria-label"));
      var o = e.getAttribute("data-en-label");
      e.setAttribute("aria-label", lang === "bn" && D[o] ? D[o] : o);
    });
  }
  function applyLang() {
    root.lang = lang;
    walk();
    labels();
    document.title = t(TT);
    if (md) md.setAttribute("content", t(MD));
    $("lang-label").textContent = lang === "bn" ? "EN" : "বাং";
    lb.setAttribute(
      "aria-label",
      lang === "bn" ? "ইংরেজিতে দেখুন" : "Switch to Bangla",
    );
    cb.textContent = t("Copy the list");
    syncTheme();
    setMenu(mn.classList.contains("open"));
    calc();
    quiz();
    renderReviews();
  }
  lb.addEventListener("click", function () {
    lang = lang === "bn" ? "en" : "bn";
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
    applyLang();
  });
  applyLang();

  /* ---------- Scroll extras: progress bar, back to top, active nav link ---------- */
  var bar = $("progress"),
    tt = $("totop"),
    ticking = false;
  var spy = ["services", "why", "tools", "pricing", "reviews", "faq"].map(
    function (id) {
      return {
        el: $(id),
        a: document.querySelector('.links a[href="#' + id + '"]'),
      };
    },
  );
  function onScroll() {
    ticking = false;
    var y = window.pageYOffset,
      h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(y / h, 1) : 0) + ")";
    tt.classList.toggle("show", y > 700);
    var cur = null;
    spy.forEach(function (s) {
      if (s.el && s.el.getBoundingClientRect().top <= 140) cur = s;
    });
    spy.forEach(function (s) {
      if (s.a) s.a.classList.toggle("active", s === cur);
    });
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", onScroll);
  tt.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(
        "main section .wrap > :not(.grid):not(.plans):not(.tools),.grid > *,.plans > *,.tools > *",
      )
      .forEach(function (el) {
        if (el.closest("#reviews-grid")) return;
        el.classList.add("reveal");
        el.style.transitionDelay =
          Math.min(
            Array.prototype.indexOf.call(el.parentNode.children, el),
            5,
          ) *
            70 +
          "ms";
        io.observe(el);
      });
  }
})();
