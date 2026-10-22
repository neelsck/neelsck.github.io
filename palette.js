// The command palette: search, click and keyboard navigation, previews, actions,
// per-item links (#id), the theme switch, and the phone layout.
(function () {
  "use strict";

  var SITE = window.SITE;
  var items = SITE.items;
  var byId = {};
  items.forEach(function (it) { byId[it.id] = it; });

  var $ = function (id) { return document.getElementById(id); };
  var palette = $("palette");
  var input = $("q");
  var list = $("list");
  var preview = $("preview");
  var foot = $("foot");
  var back = $("back");
  var position = $("position");
  var footNav = $("foot-nav");
  var prevBtn = $("prev");
  var nextBtn = $("next");

  var phone = window.matchMedia("(max-width: 720px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var state = { query: "", id: items[0].id, open: false };
  var visible = items.slice();
  var footTimer = null;

  // ---------- helpers ----------

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "class") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function haystack(it) {
    return [it.title, it.hint, it.keywords, it.group, it.eyebrow, it.lede].join(" ").toLowerCase();
  }

  function filter(query) {
    var words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return items.slice();
    return items.filter(function (it) {
      var hay = haystack(it);
      return words.every(function (w) {
        // Match plurals too: "papers" finds "paper".
        var stem = w.length > 3 ? w.replace(/(es|s)$/, "") : w;
        return hay.indexOf(w) !== -1 || hay.indexOf(stem) !== -1;
      });
    });
  }

  function isDark() {
    var t = document.documentElement.dataset.theme;
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function showFoot(text, good) {
    foot.textContent = text;
    foot.classList.toggle("is-good", !!good);
  }

  function restingFoot() {
    var n = visible.length;
    showFoot(n + (n === 1 ? " item" : " items") + " · updated " + SITE.updated, false);
  }

  function flash(text) {
    showFoot(text, true);
    clearTimeout(footTimer);
    footTimer = setTimeout(restingFoot, 2400);
  }

  // ---------- list ----------

  function renderList() {
    list.textContent = "";
    if (!visible.length) {
      list.appendChild(el("p", { class: "empty", text: "Nothing matches “" + state.query.trim() + "”. Try “health”, “papers” or “email”." }));
      input.removeAttribute("aria-activedescendant");
      return;
    }
    SITE.groups.forEach(function (group) {
      var inGroup = visible.filter(function (it) { return it.group === group; });
      if (!inGroup.length) return;
      list.appendChild(el("p", { class: "group-label", text: group, "aria-hidden": "true" }));
      inGroup.forEach(function (it) {
        list.appendChild(el("a", {
          class: "option",
          id: "opt-" + it.id,
          href: "#" + it.id,
          role: "option",
          "aria-selected": String(it.id === state.id),
          "data-id": it.id,
          tabindex: "-1"
        }, [
          el("span", { class: "option-title", text: it.title }),
          el("span", { class: "option-hint", text: it.hint || "" })
        ]));
      });
    });
  }

  function markSelected(scroll) {
    var opts = list.querySelectorAll(".option");
    for (var i = 0; i < opts.length; i++) {
      var on = opts[i].getAttribute("data-id") === state.id;
      opts[i].setAttribute("aria-selected", String(on));
      if (on && scroll) opts[i].scrollIntoView({ block: "nearest" });
    }
    if (byId[state.id]) input.setAttribute("aria-activedescendant", "opt-" + state.id);
  }

  // ---------- preview ----------

  function renderPreview() {
    var it = byId[state.id];
    preview.textContent = "";
    if (!it) return;

    if (it.image && it.image.src) {
      preview.appendChild(el("img", { class: "pv-image", src: it.image.src, alt: it.image.alt || "", loading: "lazy" }));
    }
    if (it.eyebrow) preview.appendChild(el("p", { class: "pv-eyebrow", text: it.eyebrow }));
    preview.appendChild(el("h2", { class: "pv-title", text: it.title }));
    if (it.lede) preview.appendChild(el("p", { class: "pv-lede", text: it.lede }));

    if (it.stats && it.stats.length) {
      preview.appendChild(el("div", { class: "pv-stats" }, it.stats.map(function (s) {
        return el("div", { class: "pv-stat" }, [
          el("div", { class: "pv-stat-value", text: s.value }),
          el("div", { class: "pv-stat-label", text: s.label })
        ]);
      })));
    }

    if (it.body && it.body.length) {
      preview.appendChild(el("div", { class: "pv-body" }, it.body.map(function (p) { return el("p", { text: p }); })));
    }

    if (it.facts && it.facts.length) {
      preview.appendChild(el("dl", { class: "pv-facts" }, it.facts.map(function (f) {
        return el("div", { class: "pv-fact" }, [el("dt", { text: f.label }), el("dd", { text: f.value })]);
      })));
    }

    if (it.action) {
      var label = it.action === "copy-email" ? "Copy email" : (isDark() ? "Use light mode" : "Use dark mode");
      var btn = el("button", { class: "pv-action", type: "button" }, [document.createTextNode(label + " "), el("kbd", { text: "↵" })]);
      btn.addEventListener("click", function () { runAction(it); });
      preview.appendChild(btn);
    }

    var links = (it.links || []).filter(function (l) { return l.url; });
    if (links.length) {
      preview.appendChild(el("div", { class: "pv-links" }, links.map(function (l) {
        return el("a", { class: "pv-link", href: l.url, target: "_blank", rel: "noopener", text: l.label + " ↗" });
      })));
    }

    preview.scrollTop = 0;
    updatePhoneNav();
  }

  // ---------- selection ----------

  function select(id, opts) {
    opts = opts || {};
    if (!byId[id]) return;
    if (id === state.id && !opts.force) { if (opts.scroll) markSelected(true); return; }
    state.id = id;
    markSelected(!!opts.scroll);
    renderPreview();
    if (!opts.keepHash) {
      try { history.replaceState(null, "", id === items[0].id ? location.pathname + location.search : "#" + id); } catch (e) {}
    }
  }

  function move(step) {
    if (!visible.length) return;
    var ids = visible.map(function (it) { return it.id; });
    var at = ids.indexOf(state.id);
    var next = at === -1 ? 0 : (at + step + ids.length) % ids.length;
    select(ids[next], { scroll: true });
  }

  function openPrimary() {
    var it = byId[state.id];
    if (!it) return;
    if (phone.matches && !state.open) { setOpen(true); return; }
    if (it.action) { runAction(it); return; }
    var link = (it.links || []).filter(function (l) { return l.url; })[0];
    if (link) window.open(link.url, "_blank", "noopener");
  }

  // ---------- actions ----------

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = el("textarea", { readonly: "", "aria-hidden": "true" });
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  function runAction(it) {
    if (it.action === "copy-email") {
      copyText(SITE.email).then(
        function () { flash("✓ copied " + SITE.email); },
        function () { flash("Couldn't copy. Select the address above instead."); }
      );
    } else if (it.action === "theme") {
      var next = isDark() ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      renderPreview();
      flash("✓ " + next + " mode");
    }
  }

  // ---------- phone layout ----------

  function setOpen(open) {
    state.open = open && phone.matches;
    palette.classList.toggle("is-open", state.open);
    back.hidden = !state.open;
    position.hidden = !state.open;
    footNav.hidden = !state.open;
    if (state.open) {
      updatePhoneNav();
      back.focus({ preventScroll: true });
      palette.scrollIntoView({ block: "start", behavior: reduceMotion.matches ? "auto" : "smooth" });
    } else {
      markSelected(true);
    }
  }

  function updatePhoneNav() {
    var ids = visible.map(function (it) { return it.id; });
    var at = ids.indexOf(state.id);
    position.textContent = at === -1 ? "" : (at + 1) + " / " + ids.length;
    var prev = at > 0 ? byId[ids[at - 1]] : null;
    var next = at !== -1 && at < ids.length - 1 ? byId[ids[at + 1]] : null;
    prevBtn.disabled = !prev;
    nextBtn.disabled = !next;
    prevBtn.querySelector("span").textContent = prev ? prev.title : "";
    nextBtn.querySelector("span").textContent = next ? next.title : "";
  }

  // ---------- search ----------

  function applyQuery() {
    state.query = input.value;
    visible = filter(state.query);
    if (visible.length && !visible.some(function (it) { return it.id === state.id; })) {
      state.id = visible[0].id;
      renderPreview();
    }
    renderList();
    markSelected(false);
    restingFoot();
  }

  // Rotating hints in the empty search box, so visitors know they can type.
  var hints = ["Search… try “health”", "Search… try “papers”", "Search… try “email”", "Search… try “robotics”"];
  var hintAt = 0;
  input.placeholder = hints[0];
  if (!reduceMotion.matches) {
    setInterval(function () {
      if (input.value || document.activeElement === input) return;
      input.classList.add("ph-fade");
      setTimeout(function () {
        hintAt = (hintAt + 1) % hints.length;
        input.placeholder = hints[hintAt];
        input.classList.remove("ph-fade");
      }, 200);
    }, 2800);
  }

  // ---------- events ----------

  input.addEventListener("input", applyQuery);

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") { e.preventDefault(); openPrimary(); }
    else if (e.key === "Escape") {
      if (input.value) { input.value = ""; applyQuery(); }
      else input.blur();
    }
  });

  list.addEventListener("click", function (e) {
    var opt = e.target.closest(".option");
    if (!opt) return;
    e.preventDefault();
    select(opt.getAttribute("data-id"));
    if (phone.matches) setOpen(true);
  });

  back.addEventListener("click", function () { setOpen(false); });
  prevBtn.addEventListener("click", function () { move(-1); });
  nextBtn.addEventListener("click", function () { move(1); });

  document.addEventListener("keydown", function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (state.open) setOpen(false);
      input.focus();
      input.select();
    } else if (e.key === "/" && !typing) {
      e.preventDefault();
      input.focus();
    } else if (e.key === "Escape" && state.open) {
      setOpen(false);
    } else if (!typing && !state.open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      move(e.key === "ArrowDown" ? 1 : -1);
    }
  });

  window.addEventListener("hashchange", function () {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId[id]) { select(id, { scroll: true, keepHash: true }); if (phone.matches) setOpen(true); }
  });

  phone.addEventListener && phone.addEventListener("change", function () { if (!phone.matches) setOpen(false); });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (byId[state.id] && byId[state.id].action === "theme") renderPreview();
  });

  // ---------- start ----------

  if (!/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) $("shortcut").textContent = "Ctrl K";

  var startId = decodeURIComponent(location.hash.slice(1));
  if (byId[startId]) state.id = startId;
  renderList();
  markSelected(true);
  renderPreview();
  restingFoot();
  if (byId[startId] && phone.matches && startId !== items[0].id) setOpen(true);
})();
