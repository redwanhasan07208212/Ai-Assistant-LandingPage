(function () {
  var $ = function (i) {
    return document.getElementById(i);
  };
  var root = document.documentElement,
    tb = $("theme");
  function sync() {
    var d = root.getAttribute("data-theme") === "dark";
    tb.setAttribute("aria-pressed", d);
    tb.setAttribute(
      "aria-label",
      d ? "Switch to light mode" : "Switch to dark mode",
    );
  }
  tb.addEventListener("click", function () {
    var n = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", n);
    try {
      localStorage.setItem("theme", n);
    } catch (e) {}
    sync();
  });
  sync();
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
  function calc() {
    var m = +$("c-msgs").value || 0,
      t = +$("c-min").value || 0,
      s = +$("c-share").value || 0,
      r = +$("c-rate").value || 0;
    var h = (m * t * 30 * (s / 100)) / 60;
    $("c-share-out").textContent = s + "%";
    $("c-hours").textContent = h.toFixed(1);
    $("c-value").textContent = "৳" + Math.round(h * r).toLocaleString("en-US");
  }
  document.querySelectorAll("#calc input").forEach(function (i) {
    i.addEventListener("input", calc);
  });
  calc();
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
    $("q-score").textContent = n + " of " + boxes.length;
    $("q-msg").textContent = msg;
  }
  boxes.forEach(function (b) {
    b.addEventListener("change", quiz);
  });
  var mb = $("menu-btn"),
    mn = $("menu");
  function setMenu(o) {
    mn.classList.toggle("open", o);
    mb.setAttribute("aria-expanded", o);
    mb.setAttribute("aria-label", o ? "Close menu" : "Open menu");
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
  var cb = $("copy-btn");
  cb.addEventListener("click", function () {
    var txt = Array.prototype.map
      .call(document.querySelectorAll("#faq-list li"), function (li, i) {
        return i + 1 + ". " + li.textContent;
      })
      .join("\n");
    var ok = function () {
        cb.textContent = "Copied ✓";
      },
      bad = function () {
        cb.textContent = "Select the list and copy it";
      };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(ok, bad);
    } else {
      bad();
    }
    setTimeout(function () {
      cb.textContent = "Copy the list";
    }, 2500);
  });
  // Add real customer reviews here, like: {name:'Name', biz:'Business', text:'Their words'}
  var REVIEWS = [];
  var rg = $("reviews-grid");
  function mk(t, k, x) {
    var e = document.createElement(t);
    if (k) e.className = k;
    e.textContent = x;
    return e;
  }
  if (REVIEWS.length) {
    $("reviews-lead").textContent =
      "Real feedback from the businesses we work with.";
    REVIEWS.forEach(function (r) {
      var c = mk("div", "card");
      c.appendChild(mk("p", "quote", "“" + r.text + "”"));
      var w = mk("div", "who", r.name);
      w.appendChild(mk("small", "", r.biz));
      c.appendChild(w);
      rg.appendChild(c);
    });
  } else {
    var c0 = mk("div", "card");
    c0.appendChild(mk("h3", "t", "Be one of our first customers"));
    c0.appendChild(
      mk(
        "p",
        "",
        "Try JARVIS AI on your business and tell us honestly how it goes. Your feedback will appear here.",
      ),
    );
    rg.appendChild(c0);
  }
  $("fb").href =
    "https://wa.me/8801853940963?text=" +
    encodeURIComponent("Hi JARVIS AI, I’d like to share my feedback: ");
  $("lead").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = $("f-name").value.trim() || "a business owner",
      t = $("f-type").value,
      m = $("f-msg").value.trim();
    var text =
      "Hi JARVIS AI, I’m " +
      n +
      " (" +
      t +
      "). " +
      (m || "I’d like to learn more about your assistants.");
    window.open(
      "https://wa.me/8801853940963?text=" + encodeURIComponent(text),
      "_blank",
      "noopener",
    );
  });
})();
