// The command palette.
//
// Home shows a short list of categories and commands. Opening a category scopes the
// palette to it: the search bar shows a chip, the results become that category's
// entries, and the preview becomes the category's page until an entry is chosen.
// Typing at home searches everything. Nothing changes on hover, only on click or keys.
(function () {
  "use strict";

  var SITE = window.SITE;
  var cats = {};
  var items = {};
  SITE.categories.forEach(function (c) { cats[c.id] = c; });
  SITE.items.forEach(function (it) { items[it.id] = it; });

  var $ = function (id) { return document.getElementById(id); };
  var palette = $("palette");
  var input = $("q");
  var list = $("list");
  var preview = $("preview");
  var foot = $("foot");
  var hintsEl = $("hints");
  var back = $("back");
  var position = $("position");
  var footNav = $("foot-nav");
  var prevBtn = $("prev");
  var nextBtn = $("next");
  var scopeChip = $("scope");
  var scopeName = $("scope-name");

  var phone = window.matchMedia("(max-width: 720px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // scope: category id or null (home). active: row key like "cat:work" or "item:nasa", or null.
  var state = { scope: null, query: "", active: "item:" + SITE.home[0], open: false };
  var rows = [];
  var footTimer = null;

  // ---------- icons ----------

  var ICONS = {
    user: '<circle cx="8" cy="5.5" r="2.5"/><path d="M3 13.5c.8-2.3 2.7-3.5 5-3.5s4.2 1.2 5 3.5"/>',
    build: '<path d="M8 1.8l5.5 3v6.4L8 14.2l-5.5-3V4.8z"/><path d="M2.5 4.8L8 7.8l5.5-3M8 7.8v6.4"/>',
    work: '<rect x="2" y="4.5" width="12" height="8.5" rx="1.5"/><path d="M5.5 4.5V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5M2 8.5h12"/>',
    research: '<path d="M6 2h4M6.5 2v4L3 13a1 1 0 0 0 .9 1.5h8.2A1 1 0 0 0 13 13L9.5 6V2M4.5 10h7"/>',
    award: '<circle cx="8" cy="6" r="4"/><path d="M5.6 9.2L4.5 14.5 8 12.8l3.5 1.7-1.1-5.3"/>',
    mail: '<rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 4.5L8 8.5l5.5-4"/>',
    moon: '<path d="M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5z"/>',
    link: '<path d="M6.5 9.5l3-3M7 4.5l1-1a2.5 2.5 0 0 1 3.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 0 1 4.5 9l1-1"/>',
    copy: '<rect x="5" y="5" width="8.5" height="8.5" rx="1.5"/><path d="M3 10.5V3.5a1 1 0 0 1 1-1h7"/>',
    file: '<path d="M4 1.8h5l3.5 3.5v8.2a.7.7 0 0 1-.7.7H4a.7.7 0 0 1-.7-.7V2.5a.7.7 0 0 1 .7-.7z"/><path d="M9 1.8v3.5h3.5M5.5 8.5h5M5.5 11h3.5"/>',
    chevron: '<path d="M6 4l4 4-4 4"/>'
  };

  function icon(name) {
    var span = document.createElement("span");
    span.className = "option-icon";
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.chevron) + "</svg>";
    return span;
  }

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

  function entriesOf(catId) {
    return SITE.items.filter(function (it) { return it.category === catId && !it.hidden; });
  }

  // Hidden items appear only when the whole query is one of their triggers.
  function secretHits(query) {
    var q = query.toLowerCase().trim().replace(/\s+/g, " ");
    return SITE.items.filter(function (it) { return it.hidden && (it.triggers || []).indexOf(q) !== -1; });
  }

  function iconFor(it) {
    return it.icon || (it.category && cats[it.category] ? cats[it.category].icon : "chevron");
  }

  function matches(words, text) {
    var hay = text.toLowerCase();
    return words.every(function (w) {
      var stem = w.length > 3 ? w.replace(/(es|s)$/, "") : w; // "papers" finds "paper"
      return hay.indexOf(w) !== -1 || hay.indexOf(stem) !== -1;
    });
  }

  function itemText(it) {
    var cat = it.category ? cats[it.category] : null;
    return [it.title, it.subtitle, it.meta, it.keywords, it.eyebrow, it.lede, cat && cat.title].join(" ");
  }

  function isDark() {
    var t = document.documentElement.dataset.theme;
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function parseKey(key) {
    if (!key) return null;
    var i = key.indexOf(":");
    var type = key.slice(0, i), id = key.slice(i + 1);
    var ref = type === "cat" ? cats[id] : items[id];
    return ref ? { type: type, id: id, ref: ref } : null;
  }

  // ---------- rows ----------

  function catRow(c) {
    return { key: "cat:" + c.id, icon: c.icon, title: c.title, sub: c.subtitle, meta: entriesOf(c.id).length + " ›" };
  }

  function itemRow(it, showCategory) {
    var meta = showCategory && it.category ? cats[it.category].title : (it.meta || "");
    return { key: "item:" + it.id, icon: iconFor(it), title: it.title, sub: it.subtitle || "", meta: meta };
  }

  function buildRows() {
    var words = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (state.scope) {
      var entries = entriesOf(state.scope);
      if (words.length) entries = entries.filter(function (it) { return matches(words, itemText(it)); });
      return entries.map(function (it) { return itemRow(it, false); });
    }
    if (!words.length) {
      return SITE.home.map(function (id) { return cats[id] ? catRow(cats[id]) : itemRow(items[id], false); });
    }
    var catHits = SITE.categories.filter(function (c) { return matches(words, [c.title, c.subtitle, c.description].join(" ")); }).map(catRow);
    var itemHits = SITE.items.filter(function (it) { return !it.hidden && matches(words, itemText(it)); }).map(function (it) { return itemRow(it, true); });
    var secrets = secretHits(state.query).map(function (it) { return itemRow(it, false); });
    return secrets.concat(catHits, itemHits);
  }

  function listLabel() {
    if (state.scope) return state.query.trim() ? "Results in " + cats[state.scope].title : cats[state.scope].title;
    return state.query.trim() ? "Results" : "Go to";
  }

  function renderList() {
    rows = buildRows();
    list.textContent = "";
    if (!rows.length) {
      list.appendChild(el("p", { class: "empty", text: "Nothing matches “" + state.query.trim() + "”." + (state.scope ? " Press Esc to search everything." : " Try “health”, “papers” or “email”.") }));
      input.removeAttribute("aria-activedescendant");
      return;
    }
    list.appendChild(el("p", { class: "group-label", text: listLabel(), "aria-hidden": "true" }));
    rows.forEach(function (r) {
      var safeId = "opt-" + r.key.replace(":", "-");
      list.appendChild(el("a", {
        class: "option", id: safeId, href: "#" + r.key.split(":")[1], role: "option",
        "aria-selected": String(r.key === state.active), "data-key": r.key, tabindex: "-1"
      }, [
        icon(r.icon),
        el("span", { class: "option-text" }, [
          el("span", { class: "option-title", text: r.title }),
          r.sub ? el("span", { class: "option-sub", text: r.sub }) : null
        ]),
        r.meta ? el("span", { class: "option-meta", text: r.meta }) : null,
        el("kbd", { class: "option-enter", text: "↵", "aria-hidden": "true" })
      ]));
    });
  }

  function markActive(scroll) {
    var opts = list.querySelectorAll(".option");
    for (var i = 0; i < opts.length; i++) {
      var on = opts[i].getAttribute("data-key") === state.active;
      opts[i].setAttribute("aria-selected", String(on));
      if (on && scroll) opts[i].scrollIntoView({ block: "nearest" });
    }
    var activeEl = state.active && $("opt-" + state.active.replace(":", "-"));
    if (activeEl) input.setAttribute("aria-activedescendant", activeEl.id);
    else input.removeAttribute("aria-activedescendant");
  }

  // ---------- preview ----------

  function renderItem(it) {
    if (it.image && it.image.src) preview.appendChild(el("img", { class: "pv-image", src: it.image.src, alt: it.image.alt || "", loading: "lazy" }));
    if (it.eyebrow) preview.appendChild(el("p", { class: "pv-eyebrow", text: it.eyebrow }));
    preview.appendChild(el("h2", { class: "pv-title" + (it.hidden ? " pv-gold" : ""), text: it.title }));
    if (it.lede) preview.appendChild(el("p", { class: "pv-lede", text: it.lede }));

    if (it.stats && it.stats.length) {
      preview.appendChild(el("div", { class: "pv-stats" }, it.stats.map(function (s) {
        return el("div", { class: "pv-stat" }, [el("div", { class: "pv-stat-value", text: s.value }), el("div", { class: "pv-stat-label", text: s.label })]);
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
    if (it.action === "copy-email") {
      var label = "Copy email";
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
  }

  function renderCategory(c) {
    var entries = entriesOf(c.id);
    preview.appendChild(el("p", { class: "pv-eyebrow", text: entries.length + (entries.length === 1 ? " entry" : " entries") }));
    preview.appendChild(el("h2", { class: "pv-title", text: c.title }));
    preview.appendChild(el("p", { class: "pv-lede", text: c.description }));
    preview.appendChild(el("div", { class: "pv-index" }, entries.map(function (it) {
      var row = el("button", { class: "pv-index-row", type: "button" }, [
        el("span", { class: "pv-index-text" }, [
          el("span", { class: "pv-index-title", text: it.title }),
          el("span", { class: "pv-index-lede", text: it.subtitle || it.lede || "" })
        ]),
        it.meta ? el("span", { class: "pv-index-meta", text: it.meta }) : null
      ]);
      row.addEventListener("click", function () {
        if (state.scope !== c.id) enterCategory(c.id, { silent: true });
        activate("item:" + it.id);
      });
      return row;
    })));
  }

  function renderPreview() {
    preview.textContent = "";
    var target = parseKey(state.active);
    if (!target && state.scope) target = { type: "cat", ref: cats[state.scope] };
    if (!target) target = { type: "item", ref: items[SITE.home[0]] };
    if (target.type === "cat") renderCategory(target.ref);
    else renderItem(target.ref);
    preview.scrollTop = 0;
    updatePhoneNav();
  }

  // ---------- footer ----------

  // At rest the bottom bar shows the Campanile coordinates; short messages
  // (like "copied") replace them for a moment.
  var localeEl = $("locale");

  function restingFoot() {
    foot.hidden = true;
    foot.textContent = "";
    localeEl.hidden = false;
  }

  function flash(text) {
    foot.textContent = text;
    foot.classList.add("is-good");
    foot.hidden = false;
    localeEl.hidden = true;
    clearTimeout(footTimer);
    footTimer = setTimeout(restingFoot, 2400);
  }

  function updateHints() {
    hintsEl.textContent = state.scope ? "↑↓ navigate · ↵ open · esc back" : "↑↓ navigate · ↵ open · type to search";
  }

  // ---------- navigation ----------

  function setHash(id) {
    try { history.replaceState(null, "", id ? "#" + id : location.pathname + location.search); } catch (e) {}
  }

  function select(key, opts) {
    opts = opts || {};
    state.active = key;
    markActive(!!opts.scroll);
    renderPreview();
    var t = parseKey(key);
    if (t && t.type === "item") setHash(t.id === SITE.home[0] && !state.scope ? null : t.id);
  }

  function renderAll() {
    scopeChip.hidden = !state.scope;
    if (state.scope) {
      scopeName.textContent = cats[state.scope].title;
      scopeChip.setAttribute("aria-label", "Leave " + cats[state.scope].title);
      input.placeholder = "Search " + cats[state.scope].title + "…";
    } else {
      input.placeholder = placeholders[phAt];
    }
    renderList();
    markActive(true);
    renderPreview();
    updateHints();
    restingFoot();
  }

  function enterCategory(id, opts) {
    opts = opts || {};
    state.scope = id;
    state.query = "";
    input.value = "";
    state.active = null;
    renderAll();
    list.scrollTop = 0;
    if (!opts.silent) setHash(id);
    if (!phone.matches) input.focus({ preventScroll: true });
  }

  function exitScope() {
    if (!state.scope) return;
    var was = state.scope;
    state.scope = null;
    state.query = "";
    input.value = "";
    state.active = "cat:" + was;
    setOpen(false);
    renderAll();
    setHash(null);
    if (!phone.matches) input.focus({ preventScroll: true });
  }

  // Click or Enter on a row.
  function activate(key, opts) {
    opts = opts || {};
    var t = parseKey(key);
    if (!t) return;
    if (t.type === "cat") { enterCategory(t.id); return; }
    if (t.ref.category && state.scope !== t.ref.category) {
      // Opening a search result from another category moves you into that category.
      enterCategory(t.ref.category, { silent: true });
    }
    select(key, { scroll: true });
    if (t.ref.action) { runAction(t.ref); return; }
    if (phone.matches) { setOpen(true); return; }
    // Arrow keys already show the preview, so Enter on an entry opens its main link.
    if (opts.fromKeyboard) {
      var link = (t.ref.links || []).filter(function (l) { return l.url; })[0];
      if (link) window.open(link.url, "_blank", "noopener");
    }
  }

  function move(step) {
    if (!rows.length) return;
    var keys = rows.map(function (r) { return r.key; });
    var at = keys.indexOf(state.active);
    var next = at === -1 ? (step > 0 ? 0 : keys.length - 1) : (at + step + keys.length) % keys.length;
    select(keys[next], { scroll: true });
  }

  // ---------- actions ----------

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
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
        function () { flash("Couldn't copy. Select the address instead."); }
      );
    }
  }

  // ---------- theme toggle (bottom bar icon) ----------

  var themeBtn = $("theme-toggle");

  function labelThemeButton() {
    var label = isDark() ? "Switch to light mode" : "Switch to dark mode";
    themeBtn.setAttribute("aria-label", label);
    themeBtn.title = label;
  }

  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    labelThemeButton();
  });

  // ---------- phone layout ----------

  function setOpen(open) {
    state.open = !!open && phone.matches;
    palette.classList.toggle("is-open", state.open);
    back.hidden = !state.open;
    position.hidden = !state.open;
    footNav.hidden = !state.open;
    if (state.open) {
      back.textContent = "‹ " + (state.scope ? cats[state.scope].title : "Back");
      updatePhoneNav();
      back.focus({ preventScroll: true });
      palette.scrollIntoView({ block: "start", behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
  }

  function itemKeys() {
    return rows.filter(function (r) { return r.key.indexOf("item:") === 0; }).map(function (r) { return r.key; });
  }

  function updatePhoneNav() {
    var keys = itemKeys();
    var at = keys.indexOf(state.active);
    position.textContent = at === -1 ? "" : (at + 1) + " / " + keys.length;
    var prev = at > 0 ? parseKey(keys[at - 1]) : null;
    var next = at !== -1 && at < keys.length - 1 ? parseKey(keys[at + 1]) : null;
    prevBtn.disabled = !prev;
    nextBtn.disabled = !next;
    prevBtn.querySelector("span").textContent = prev ? prev.ref.title : "";
    nextBtn.querySelector("span").textContent = next ? next.ref.title : "";
  }

  function phoneStep(step) {
    var keys = itemKeys();
    var at = keys.indexOf(state.active);
    var k = keys[at + step];
    if (k) select(k);
  }

  // ---------- search ----------

  function applyQuery() {
    state.query = input.value;
    rows = buildRows();
    // Like any palette, the top result is highlighted while you type.
    state.active = state.query.trim() && rows.length ? rows[0].key : (state.scope ? null : state.active);
    if (!state.query.trim() && !state.scope && !parseKey(state.active)) state.active = "item:" + SITE.home[0];
    renderList();
    markActive(false);
    renderPreview();
    restingFoot();
  }

  // Rotating hints in the empty search box, so visitors know they can type.
  var placeholders = ["Search… try “health”", "Search… try “papers”", "Search… try “email”", "Search… try “robotics”"];
  var phAt = 0;
  if (!reduceMotion.matches) {
    setInterval(function () {
      if (state.scope || input.value || document.activeElement === input) return;
      input.classList.add("ph-fade");
      setTimeout(function () {
        phAt = (phAt + 1) % placeholders.length;
        if (!state.scope) input.placeholder = placeholders[phAt];
        input.classList.remove("ph-fade");
      }, 200);
    }, 2800);
  }

  // ---------- events ----------

  input.addEventListener("input", applyQuery);

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (!state.active) { move(1); return; }
      activate(state.active, { fromKeyboard: true });
    }
    else if (e.key === "Escape") {
      e.preventDefault();
      if (input.value) { input.value = ""; applyQuery(); }
      else if (state.scope) exitScope();
      else input.blur();
    }
    else if (e.key === "Backspace" && !input.value && state.scope) { e.preventDefault(); exitScope(); }
  });

  list.addEventListener("click", function (e) {
    var opt = e.target.closest(".option");
    if (!opt) return;
    e.preventDefault();
    activate(opt.getAttribute("data-key"));
  });

  scopeChip.addEventListener("click", exitScope);
  back.addEventListener("click", function () { setOpen(false); markActive(true); });
  prevBtn.addEventListener("click", function () { phoneStep(-1); });
  nextBtn.addEventListener("click", function () { phoneStep(1); });

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
    } else if (e.key === "Escape" && !typing) {
      if (state.open) { setOpen(false); markActive(true); }
      else if (state.scope) exitScope();
    }
  });

  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (cats[id]) { enterCategory(id, { silent: true }); return true; }
    if (items[id]) {
      if (items[id].category) enterCategory(items[id].category, { silent: true });
      select("item:" + id, { scroll: true });
      if (phone.matches && id !== SITE.home[0]) setOpen(true);
      return true;
    }
    return false;
  }

  window.addEventListener("hashchange", openFromHash);
  if (phone.addEventListener) phone.addEventListener("change", function () { if (!phone.matches) setOpen(false); });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", labelThemeButton);

  // ---------- start ----------

  if (!/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) $("shortcut").textContent = "Ctrl K";
  input.placeholder = placeholders[0];
  labelThemeButton();
  renderAll();
  openFromHash();
})();
