(() => {
  "use strict";

  const $ = (selector, el = document) => el.querySelector(selector);
  const $$ = (selector, el = document) => [...el.querySelectorAll(selector)];
  const closestEl = (target, selector) => {
    const el = target instanceof Element ? target : (target && target.parentElement);
    return el ? el.closest(selector) : null;
  };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
  const truncate = (value, size) => {
    if (value.length <= size) return value;
    const cut = value.slice(0, size);
    const space = cut.lastIndexOf(" ");
    return `${(space > size * 0.7 ? cut.slice(0, space) : cut).trimEnd()}…`;
  };
  const formatNumber = (value) => value.toLocaleString("es-AR");

  const CLASSES = window.CLASE_INDICE || [];
  const CONTENTS = window.CLASE_CONTENIDOS || {};
  const TAB_LABELS = {
    teoria: "Teoría",
    conceptos: "Conceptos",
    practica: "Práctica",
    autoevaluacion: "Autoevaluación",
    repaso: "Repaso",
    fuentes: "Fuentes"
  };
  const FILTER_LABELS = {
    all: "Todo",
    concepts: "Conceptos",
    mentions: "Menciones",
    notes: "Mis notas"
  };

  const STOPWORDS = new Set([
    "a", "al", "algo", "como", "con", "cual", "cuando", "de", "del", "el", "en",
    "es", "esa", "ese", "eso", "esta", "este", "esto", "fue", "ha", "la", "las",
    "le", "lo", "los", "mas", "más", "o", "para", "pero", "por", "que", "qué",
    "se", "sin", "sobre", "son", "su", "sus", "un", "una", "uno", "unos", "unas",
    "y", "ya"
  ]);

  const SYMBOLS = {
    "β": "beta", "Β": "beta",
    "α": "alfa", "Α": "alfa",
    "σ": "sigma", "Σ": "suma",
    "μ": "mu", "ε": "epsilon",
    "λ": "lambda", "ρ": "rho",
    "θ": "theta", "π": "pi",
    "²": "2", "³": "3", "√": "raiz",
    "≤": "<=", "≥": ">=", "≠": "!=", "≈": "~",
    "—": "-", "–": "-",
    "“": "\"", "”": "\"", "‘": "'", "’": "'"
  };

  const SUGGESTIONS = [
    "MCO", "R²", "insesgamiento", "multicolinealidad", "heterocedasticidad",
    "endogeneidad", "variables instrumentales", "MC2E", "series de tiempo",
    "autocorrelación", "variables ficticias", "predicción"
  ];

  const state = {
    open: false,
    query: "",
    filter: "all",
    index: null,
    notes: [],
    notesReady: false,
    results: [],
    activeIndex: -1,
    expanded: new Set(),
    editor: null,
    lastFocus: null
  };

  const els = {};

  // ---------- Texto y búsqueda ----------

  function foldInfo(value) {
    const original = String(value ?? "");
    let text = "";
    const map = [];
    let index = 0;
    for (const char of original) {
      let folded = SYMBOLS[char];
      if (folded === undefined) {
        folded = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }
      for (const piece of folded) {
        text += piece;
        map.push(index);
      }
      index += char.length;
    }
    return { text, map };
  }

  function fold(value) {
    return foldInfo(value).text;
  }

  function queryTokens(qFold) {
    const all = qFold.split(/\s+/).filter(Boolean);
    const meaningful = all.filter(token => token.length > 1 && !STOPWORDS.has(token));
    return [...new Set(meaningful.length ? meaningful : all)];
  }

  const scratch = document.createElement("div");
  function htmlToText(html) {
    scratch.innerHTML = String(html ?? "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|li|div|h[1-6]|tr|td|th|section|article|ul|ol|blockquote|figcaption)>/gi, " ");
    return normalize(scratch.textContent);
  }

  function scoreText(searchText, qFold, tokens) {
    if (!searchText || !qFold) return 0;
    const phrase = searchText.indexOf(qFold);
    for (const token of tokens) {
      if (searchText.indexOf(token) < 0) return 0;
    }
    return phrase >= 0 ? 120 : 35;
  }

  function highlightText(text, qFold, tokens) {
    if (!text) return "";
    const info = foldInfo(text);
    if (!info.text) return esc(text);
    const needles = [...new Set([qFold, ...tokens].filter(Boolean))]
      .sort((a, b) => b.length - a.length);
    const ranges = [];
    needles.forEach(needle => {
      if (!needle) return;
      let from = 0;
      while (from <= info.text.length - needle.length) {
        const at = info.text.indexOf(needle, from);
        if (at < 0) break;
        const start = info.map[at];
        const end = info.map[Math.min(info.map.length - 1, at + needle.length - 1)] + 1;
        if (end > start) ranges.push([start, end]);
        from = at + Math.max(1, needle.length);
      }
    });
    if (!ranges.length) return esc(text);
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];
    ranges.forEach(range => {
      const last = merged[merged.length - 1];
      if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
      else merged.push([...range]);
    });
    let html = "";
    let cursor = 0;
    merged.forEach(([start, end]) => {
      if (start < cursor) return;
      html += esc(text.slice(cursor, start));
      html += `<mark>${esc(text.slice(start, end))}</mark>`;
      cursor = end;
    });
    html += esc(text.slice(cursor));
    return html;
  }

  function makeSnippet(text, qFold, tokens, context = 105) {
    const full = normalize(text);
    if (!full) return "";
    const info = foldInfo(full);
    let at = info.text.indexOf(qFold);
    let matchLength = qFold.length;
    if (at < 0) {
      let best = -1;
      tokens.forEach(token => {
        const found = info.text.indexOf(token);
        if (found >= 0 && (best < 0 || found < best)) {
          best = found;
          matchLength = token.length;
        }
      });
      at = best;
    }
    const start = at >= 0 && info.map.length ? info.map[at] : 0;
    const endIndex = at >= 0 && info.map.length
      ? info.map[Math.min(info.map.length - 1, at + Math.max(1, matchLength) - 1)] + 1
      : 0;
    let from = Math.max(0, start - 70);
    let to = Math.min(full.length, endIndex + context);
    if (from > 0) {
      const space = full.lastIndexOf(" ", from);
      if (space >= 0 && space > from - 40) from = space + 1;
    }
    if (to < full.length) {
      const space = full.indexOf(" ", to);
      if (space >= 0 && space < to + 40) to = space;
    }
    const snippet = full.slice(from, to);
    return `${from > 0 ? "…" : ""}${highlightText(snippet, qFold, tokens)}${to < full.length ? "…" : ""}`;
  }

  // ---------- Índice de contenido ----------

  function buildIndex() {
    const concepts = [];
    const mentions = [];
    let order = 0;

    function addMention(meta, tab, options) {
      const text = normalize(options.text);
      if (!text || text.length < 3) return;
      mentions.push({
        kind: "mention",
        tab,
        classId: meta.id,
        classNum: meta.num,
        classTitle: meta.classTitle,
        classOrder: meta.classOrder,
        anchor: options.anchor || "",
        place: options.place || TAB_LABELS[tab] || tab,
        label: options.kind || "Mención",
        text,
        match: normalize(options.match) || text,
        search: fold(text),
        order: order++
      });
    }

    CLASSES.forEach((item, classIndex) => {
      const content = CONTENTS[item.id];
      if (!content) return;
      const meta = {
        id: item.id,
        num: content.num || item.num,
        classTitle: content.title || item.title,
        classOrder: classIndex
      };

      // Fichas de concepto.
      Object.entries(content.concepts || {}).forEach(([key, concept]) => {
        const title = normalize(concept.title);
        const sub = normalize(concept.sub);
        const simple = htmlToText(concept.simple);
        const esencia = htmlToText(concept.esencia);
        const ejemplo = htmlToText(concept.ejemplo);
        const errores = htmlToText(concept.errores);
        const conexiones = htmlToText(concept.conexiones);
        const fuentes = htmlToText(concept.fuentes);
        const keyWords = key.replace(/-/g, " ");
        const search = fold([
          title, sub, keyWords, simple, esencia, ejemplo, errores, conexiones, fuentes,
          concept.vizIntro || "", concept.vizHint || ""
        ].join(" "));
        concepts.push({
          kind: "concept",
          classId: content.id,
          classNum: meta.num,
          classTitle: meta.classTitle,
          classOrder: classIndex,
          key,
          title,
          sub,
          titleFold: fold(title),
          keyFold: fold(key),
          subFold: fold(sub),
          preview: truncate(simple || esencia || ejemplo || errores, 280),
          search
        });
      });

      // Teoría.
      (content.sections || []).forEach(section => {
        const place = `Teoría · ${section.number} ${section.title}`;
        addMention(meta, "teoria", {
          anchor: section.id,
          place,
          kind: "Sección",
          text: section.title
        });
        (section.blocks || []).forEach(block => {
          const base = { anchor: section.id, place };
          switch (block.type) {
            case "p":
              addMention(meta, "teoria", {
                ...base,
                anchor: block.id || section.id,
                kind: "Párrafo",
                text: htmlToText(block.html)
              });
              break;
            case "formula":
              addMention(meta, "teoria", {
                ...base,
                kind: "Fórmula",
                match: htmlToText(block.main),
                text: [
                  htmlToText(block.main),
                  ...(block.legend || []).map(item => `${htmlToText(item.key)}: ${htmlToText(item.text)}`)
                ].join(" ")
              });
              break;
            case "cards":
              (block.items || []).forEach(item => addMention(meta, "teoria", {
                ...base,
                kind: "Tarjeta",
                match: item.text,
                text: `${item.title}. ${item.text}`
              }));
              break;
            case "callout":
              addMention(meta, "teoria", {
                ...base,
                kind: "Aviso",
                match: htmlToText(block.html),
                text: `${block.label}. ${htmlToText(block.html)}`
              });
              break;
            case "compare":
              [block.left, block.right].filter(Boolean).forEach(side => addMention(meta, "teoria", {
                ...base,
                kind: "Comparación",
                match: side.text,
                text: `${side.tag}. ${side.title}. ${side.text} ${htmlToText(side.eq)}`
              }));
              break;
            case "assumptions":
              (block.rows || []).forEach(row => addMention(meta, "teoria", {
                ...base,
                kind: "Supuesto",
                match: row.text,
                text: `${row.title}. ${row.text}`
              }));
              break;
            case "miniCheck":
              addMention(meta, "teoria", {
                ...base,
                kind: "Mini-check",
                match: block.question,
                text: `${block.question} ${block.intro} ${htmlToText(block.answer)}`
              });
              break;
            case "errorTable":
              (block.rows || []).forEach(row => addMention(meta, "teoria", {
                ...base,
                kind: "Error típico",
                match: row.error,
                text: `${row.error}. ${row.why} ${row.fix}`
              }));
              break;
            case "map":
              (block.steps || []).forEach(step => addMention(meta, "teoria", {
                ...base,
                kind: "Paso",
                match: step.text,
                text: `${step.title}. ${step.text}`
              }));
              break;
            case "sourceStrip":
              (block.chips || []).forEach(chip => addMention(meta, "teoria", {
                ...base,
                kind: "Fuente",
                match: chip.text,
                text: `${chip.label} ${chip.text}`
              }));
              break;
            case "interactive":
              addMention(meta, "teoria", {
                ...base,
                kind: "Visualización",
                match: block.intro,
                text: `${block.title}. ${block.intro} ${block.hint || ""}`
              });
              break;
            case "chart":
              addMention(meta, "teoria", {
                ...base,
                kind: "Gráfico",
                text: "Gráfico interactivo de MCO: recta de regresión, residuos, SCR y R²."
              });
              break;
            default:
              break;
          }
        });
      });

      // Práctica.
      const practice = content.practice;
      if (practice) {
        addMention(meta, "practica", {
          anchor: "panel-practica",
          place: `Práctica · ${practice.title || "Práctica"}`,
          kind: "Introducción",
          text: practice.intro
        });
        (practice.exercises || []).forEach((exercise, index) => {
          addMention(meta, "practica", {
            anchor: `ex-${content.id}-${index + 1}`,
            place: `Práctica · Ejercicio ${index + 1}`,
            kind: exercise.label || "Ejercicio",
            match: exercise.text,
            text: `${exercise.title}. ${exercise.text} ${(exercise.tags || []).join(" ")}`
          });
        });
        (practice.partials || []).forEach(partial => {
          addMention(meta, "practica", {
            anchor: "panel-practica",
            place: "Práctica · Parciales",
            kind: partial.label || "Parcial",
            match: partial.text,
            text: partial.text
          });
        });
        const lab = practice.rLab;
        if (lab) {
          addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Laboratorio de R",
            kind: lab.tag || "Laboratorio",
            match: lab.intro,
            text: `${lab.title}. ${lab.intro} ${lab.dataNote}`
          });
          (lab.readingTable || []).forEach(row => addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Cómo leer la salida de R",
            kind: row.element || "Salida de R",
            match: row.how,
            text: `${row.element}. ${row.meaning} ${row.how}`
          }));
          addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Interpretación",
            kind: "Lectura econométrica",
            match: htmlToText(lab.econometric),
            text: htmlToText(lab.econometric)
          });
          addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Interpretación",
            kind: "Lectura económica",
            match: htmlToText(lab.economic),
            text: htmlToText(lab.economic)
          });
          (lab.errors || []).forEach(error => addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Errores al leer la salida",
            kind: "Error",
            match: error,
            text: error
          }));
          (lab.checklist || []).forEach(item => addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Checklist",
            kind: "Checklist",
            match: item,
            text: item
          }));
          addMention(meta, "practica", {
            anchor: "r-lab",
            place: "Práctica · Salida de consola",
            kind: "R",
            match: normalize(lab.confint || lab.output || "").slice(0, 120),
            text: `${lab.output || ""} ${lab.confint || ""}`
          });
        }
      }

      // Autoevaluación.
      const assessment = content.assessment;
      if (assessment) {
        (assessment.questions || []).forEach((question, index) => {
          addMention(meta, "autoevaluacion", {
            anchor: `qa-${content.id}-${index + 1}`,
            place: `Autoevaluación · Pregunta ${index + 1}`,
            kind: "Pregunta y respuesta",
            match: question.q,
            text: `${question.q} ${question.a}`
          });
        });
      }

      // Repaso.
      const review = content.review;
      if (review) {
        addMention(meta, "repaso", {
          anchor: "panel-repaso",
          place: `Repaso · ${review.title || "Kit de repaso"}`,
          kind: "Introducción",
          text: review.intro
        });
        (review.formulas || []).forEach((formula, index) => {
          addMention(meta, "repaso", {
            anchor: `formula-card-${content.id}-${index + 1}`,
            place: `Repaso · Fórmula ${index + 1}`,
            kind: formula.title || "Fórmula",
            match: formula.note || htmlToText(formula.eq),
            text: `${formula.title}. ${htmlToText(formula.eq)} ${formula.note || ""} ${htmlToText(formula.more)}`
          });
        });
        (review.drills || []).forEach(drill => {
          addMention(meta, "repaso", {
            anchor: "panel-repaso",
            place: "Repaso · Drill de fórmulas",
            kind: "Drill",
            match: drill.q,
            text: `${drill.q} ${drill.a}`
          });
        });
        (review.sourceGuide || []).forEach(item => addMention(meta, "repaso", {
          anchor: "panel-repaso",
          place: "Repaso · Si te trabás",
          kind: "Guía",
          match: item.source,
          text: `${item.stuck} ${item.source}`
        }));
        (review.session || []).forEach(item => addMention(meta, "repaso", {
          anchor: "panel-repaso",
          place: `Repaso · Sesión de 90 minutos`,
          kind: item.time || "Sesión",
          match: item.text,
          text: `${item.title}. ${item.text}`
        }));
        (review.kit || []).forEach(item => addMention(meta, "repaso", {
          anchor: "panel-repaso",
          place: "Repaso · Kit",
          kind: item.title || "Kit",
          match: item.text,
          text: `${item.title}. ${item.text}`
        }));
        (review.plan || []).forEach(item => addMention(meta, "repaso", {
          anchor: "panel-repaso",
          place: "Repaso · Plan de 7 días",
          kind: item.day || "Plan",
          match: item.text,
          text: `${item.title}. ${item.text}`
        }));
      }

      // Fuentes.
      const sources = content.sources;
      if (sources) {
        (sources.items || []).forEach((source, index) => {
          addMention(meta, "fuentes", {
            anchor: `source-${content.id}-${index + 1}`,
            place: `Fuentes · ${source.type || "Fuente"}`,
            kind: source.title || "Fuente",
            match: source.text,
            text: `${source.title}. ${source.text} ${source.loc}`
          });
        });
      }
    });

    state.index = { concepts, mentions };
  }

  // ---------- Búsqueda ----------

  function scoreConcept(concept, qFold, tokens) {
    let score = 0;
    let strong = false;
    if (concept.titleFold === qFold) { score += 700; strong = true; }
    else if (concept.titleFold.startsWith(qFold)) { score += 420; strong = true; }
    else if (concept.titleFold.includes(qFold)) { score += 280; strong = true; }
    if (concept.keyFold === qFold) { score += 380; strong = true; }
    else if (concept.keyFold.includes(qFold)) { score += 140; strong = true; }
    if (concept.subFold.includes(qFold)) score += 60;
    const body = scoreText(concept.search, qFold, tokens);
    if (!score && !body) return { score: 0, strong: false };
    return { score: score + body, strong };
  }

  function noteSearchText(note) {
    return fold(`${note.term} ${note.note}`);
  }

  function runSearch() {
    if (!state.index) buildIndex();
    const query = normalize(state.query);
    if (!query) {
      state.results = [];
      return { query: "", qFold: "", tokens: [], concepts: [], mentions: [], notes: [] };
    }
    const qFold = fold(query);
    const tokens = queryTokens(qFold);
    const scoredConcepts = state.index.concepts
      .map(concept => {
        const scored = scoreConcept(concept, qFold, tokens);
        return { ...concept, score: scored.score, strong: scored.strong };
      })
      .filter(concept => concept.score > 0)
      .sort((a, b) => b.score - a.score || a.classOrder - b.classOrder);
    const strongConcepts = scoredConcepts.filter(concept => concept.strong);
    const concepts = (strongConcepts.length ? strongConcepts : scoredConcepts).slice(0, 16);
    const mentions = state.index.mentions
      .map(mention => ({ ...mention, score: scoreText(mention.search, qFold, tokens) }))
      .filter(mention => mention.score > 0)
      .sort((a, b) => b.score - a.score || a.classOrder - b.classOrder || a.order - b.order);
    const notes = state.notes
      .filter(note => noteSearchText(note).includes(qFold) || tokens.every(token => noteSearchText(note).includes(token)))
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    return { query, qFold, tokens, concepts, mentions, notes };
  }

  // ---------- UI ----------

  function buildModal() {
    const root = document.createElement("div");
    root.className = "search-modal";
    root.id = "searchModal";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
      <div class="search-scrim" data-search-close></div>
      <section class="search-panel" role="dialog" aria-modal="true" aria-labelledby="searchTitle">
        <header class="search-head">
          <span class="search-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <circle cx="11" cy="11" r="6.5"></circle>
              <path d="m16 16 4.5 4.5"></path>
            </svg>
          </span>
          <h2 class="search-sr" id="searchTitle">Buscar en el cuaderno</h2>
          <input class="search-input" id="searchInput" type="search" autocomplete="off" spellcheck="false" placeholder="Buscá un concepto, una palabra o una fórmula…" aria-label="Buscar en el cuaderno">
          <kbd class="search-esc">Esc</kbd>
          <button class="search-close" data-search-close type="button" aria-label="Cerrar buscador">×</button>
        </header>
        <div class="search-filters" role="group" aria-label="Filtrar resultados">
          <button class="search-filter active" data-search-filter="all" type="button">Todo</button>
          <button class="search-filter" data-search-filter="concepts" type="button">Conceptos</button>
          <button class="search-filter" data-search-filter="mentions" type="button">Menciones</button>
          <button class="search-filter" data-search-filter="notes" type="button">Mis notas</button>
        </div>
        <div class="search-body" id="searchBody"></div>
        <footer class="search-foot">
          <span class="search-keys"><kbd>↑</kbd><kbd>↓</kbd> mover <kbd>Enter</kbd> abrir</span>
          <span class="search-store" id="searchStore"></span>
        </footer>
      </section>
    `;
    document.body.appendChild(root);

    els.modal = $("#searchModal", document);
    els.input = $("#searchInput", root);
    els.body = $("#searchBody", root);
    els.store = $("#searchStore", root);
    els.filters = $$(".search-filter", root);
  }

  function updateShortcutLabel() {
    const mac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || "");
    $$("[data-search-key]").forEach(el => { el.textContent = mac ? "⌘K" : "Ctrl K"; });
  }

  function open() {
    if (state.open) {
      els.input.focus();
      els.input.select();
      return;
    }
    state.open = true;
    state.lastFocus = document.activeElement;
    if (window.ECO_APP && typeof window.ECO_APP.dismissSelection === "function") {
      window.ECO_APP.dismissSelection();
    }
    if (window.ECO_APP && typeof window.ECO_APP.closeDrawer === "function") {
      window.ECO_APP.closeDrawer();
    }
    document.body.classList.add("search-open");
    els.modal.classList.add("open");
    els.modal.setAttribute("aria-hidden", "false");
    render();
    requestAnimationFrame(() => {
      els.input.focus();
      els.input.select();
    });
  }

  function close(options = {}) {
    if (!state.open) return;
    state.open = false;
    state.query = "";
    state.filter = "all";
    state.activeIndex = -1;
    state.editor = null;
    state.expanded.clear();
    els.input.value = "";
    els.modal.classList.remove("open");
    els.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-open");
    if (options.restoreFocus !== false && state.lastFocus && document.contains(state.lastFocus)) {
      try { state.lastFocus.focus({ preventScroll: true }); } catch (error) {}
    }
    state.lastFocus = null;
  }

  function storeLabel() {
    if (!state.notesReady) return "Cargando tus notas…";
    if (window.TermStore && window.TermStore.getMode() === "supabase") {
      return "Tus notas se guardan en tu cuenta";
    }
    return "Tus notas se guardan en este dispositivo";
  }

  function updateStoreLabel() {
    if (els.store) els.store.textContent = storeLabel();
  }

  function renderFilters(result) {
    els.filters.forEach(button => {
      const id = button.dataset.searchFilter;
      button.classList.toggle("active", state.filter === id);
      let count = "";
      if (result && result.query) {
        if (id === "concepts") count = result.concepts.length;
        if (id === "mentions") count = result.mentions.length;
        if (id === "notes") count = result.notes.length;
      }
      button.innerHTML = `${FILTER_LABELS[id] || id}${count !== "" ? ` <span>${formatNumber(count)}</span>` : ""}`;
    });
  }

  function setFilter(filter) {
    if (!["all", "concepts", "mentions", "notes"].includes(filter)) return;
    state.filter = filter;
    state.activeIndex = -1;
    render();
  }

  function pushResult(item) {
    state.results.push(item);
    return state.results.length - 1;
  }

  function conceptCard(concept, compact = false) {
    const resultIndex = pushResult({ type: "concept", concept });
    return `
      <article class="search-concept${compact ? " compact" : ""}" data-result="${resultIndex}" role="button" tabindex="0">
        <div class="search-item-meta">
          <span class="search-chip">Clase ${esc(concept.classNum)}</span>
          <span>${esc(concept.classTitle)}</span>
        </div>
        <h3>${esc(concept.title)}</h3>
        ${concept.sub ? `<p class="search-concept-sub">${esc(concept.sub)}</p>` : ""}
        ${!compact && concept.preview ? `<p class="search-concept-preview">${esc(concept.preview)}</p>` : ""}
        <span class="search-open-hint">${compact ? "Abrir ficha" : "Abrir ficha completa"} <span aria-hidden="true">→</span></span>
      </article>
    `;
  }

  function mentionRow(mention) {
    const resultIndex = pushResult({ type: "mention", mention });
    const result = runSearchCache;
    const snippet = makeSnippet(mention.text, result.qFold, result.tokens, 115);
    return `
      <article class="search-mention" data-result="${resultIndex}" role="button" tabindex="0">
        <span class="search-mention-top">
          <span class="search-mention-place">${esc(mention.place)}</span>
          <span class="search-mention-kind">${esc(mention.label)}</span>
        </span>
        <span class="search-mention-text">${snippet}</span>
      </article>
    `;
  }

  let runSearchCache = { qFold: "", tokens: [], concepts: [], mentions: [], notes: [], query: "" };

  function groupMentions(mentions) {
    const groups = new Map();
    mentions.forEach(mention => {
      if (!groups.has(mention.classId)) {
        groups.set(mention.classId, {
          classId: mention.classId,
          classNum: mention.classNum,
          classTitle: mention.classTitle,
          items: []
        });
      }
      groups.get(mention.classId).items.push(mention);
    });
    return [...groups.values()];
  }

  function renderMentionGroups(mentions) {
    if (!mentions.length) return "";
    return groupMentions(mentions).map(group => {
      const expanded = state.expanded.has(group.classId);
      const visible = expanded ? group.items : group.items.slice(0, 3);
      const hidden = group.items.length - visible.length;
      return `
        <section class="search-group">
          <div class="search-group-head">
            <span class="search-group-num">${esc(group.classNum)}</span>
            <span class="search-group-title">${esc(group.classTitle)}</span>
            <span class="search-group-count">${formatNumber(group.items.length)}</span>
          </div>
          <div class="search-mention-list">${visible.map(mentionRow).join("")}</div>
          ${hidden > 0 || expanded ? `
            <button class="search-more" data-expand-class="${esc(group.classId)}" type="button">
              ${expanded ? "Ver menos" : `Ver ${formatNumber(hidden)} más en esta clase`}
            </button>
          ` : ""}
        </section>
      `;
    }).join("");
  }

  function noteCard(note) {
    const editing = state.editor && state.editor.type === "note" && state.editor.id === note.id;
    return `
      <article class="search-note" data-note-id="${esc(note.id)}">
        <div class="search-note-head">
          <b>${esc(note.term)}</b>
          <span>${esc(formatDate(note.updatedAt))}</span>
        </div>
        ${editing
          ? `<textarea class="search-note-textarea" data-note-editor="${esc(note.id)}">${esc(note.note)}</textarea>
             <div class="search-note-actions">
               <button class="search-btn primary" data-note-action="save" type="button">Guardar</button>
               <button class="search-btn" data-note-action="cancel" type="button">Cancelar</button>
             </div>`
          : `<p>${esc(note.note)}</p>
             <div class="search-note-actions">
               <button class="search-btn" data-note-action="search" data-note-term="${esc(note.term)}" type="button">Buscar término</button>
               <button class="search-btn" data-note-action="edit" data-note-id="${esc(note.id)}" type="button">Editar</button>
               <button class="search-btn danger" data-note-action="delete" data-note-id="${esc(note.id)}" type="button">Eliminar</button>
             </div>`}
      </article>
    `;
  }

  function renderTermNote(query, qFold, note) {
    const editing = state.editor && state.editor.type === "term";
    if (editing) {
      return `
        <div class="search-term-note editing">
          <span class="search-term-label">Tu nota sobre «${esc(query)}»</span>
          <textarea class="search-note-textarea" data-note-editor="term">${esc(note ? note.note : "")}</textarea>
          <div class="search-note-actions">
            <button class="search-btn primary" data-note-action="save" type="button">Guardar nota</button>
            <button class="search-btn" data-note-action="cancel" type="button">Cancelar</button>
          </div>
        </div>
      `;
    }
    if (note) {
      return `
        <div class="search-term-note">
          <span class="search-term-label">Tu nota sobre «${esc(query)}»</span>
          <p>${esc(note.note)}</p>
          <div class="search-note-actions">
            <button class="search-btn" data-note-action="edit-term" type="button">Editar</button>
            <button class="search-btn danger" data-note-action="delete-term" type="button">Eliminar</button>
          </div>
        </div>
      `;
    }
    return `
      <button class="search-term-add" data-note-action="add-term" type="button">
        <span aria-hidden="true">+</span> Agregar una nota sobre «${esc(query)}»
      </button>
    `;
  }

  function renderWelcome() {
    const conceptCount = state.index ? state.index.concepts.length : 0;
    const mentionCount = state.index ? state.index.mentions.length : 0;
    const recent = [...state.notes]
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
      .slice(0, 4);
    return `
      <div class="search-welcome">
        <p class="search-welcome-title">Buscá en todo el cuaderno</p>
        <p class="search-welcome-text">Si el concepto ya tiene una ficha, la vas a ver primero. Si no, vas a encontrar todos los lugares donde se menciona. También podés dejar tu propia nota sobre cualquier término.</p>
        <div class="search-stats">
          <span><b>${formatNumber(CLASSES.length)}</b> clases</span>
          <span><b>${formatNumber(conceptCount)}</b> fichas de concepto</span>
          <span><b>${formatNumber(mentionCount)}</b> menciones</span>
        </div>
        <span class="search-term-label">Probá con</span>
        <div class="search-chips">
          ${SUGGESTIONS.map(term => `<button class="search-chip-btn" data-suggest="${esc(term)}" type="button">${esc(term)}</button>`).join("")}
        </div>
        <div class="search-welcome-actions">
          <button class="search-btn" data-browse-concepts="true" type="button">Ver todos los conceptos</button>
          <button class="search-btn" data-search-filter="notes" type="button">Ver mis notas</button>
        </div>
        <p class="search-shortcut"><kbd data-search-key>Ctrl K</kbd> abre el buscador en cualquier momento.</p>
      </div>
      ${recent.length ? `
        <section class="search-section">
          <div class="search-section-head"><span>Tus notas recientes</span><span>${formatNumber(state.notes.length)}</span></div>
          <div class="search-note-list">${recent.map(note => noteCard(note)).join("")}</div>
        </section>
      ` : ""}
    `;
  }

  function renderBrowseConcepts() {
    const groups = new Map();
    (state.index ? state.index.concepts : []).forEach(concept => {
      if (!groups.has(concept.classId)) {
        groups.set(concept.classId, {
          classNum: concept.classNum,
          classTitle: concept.classTitle,
          items: []
        });
      }
      groups.get(concept.classId).items.push(concept);
    });
    return `
      <div class="search-browse-head">
        <div>
          <span class="search-term-label">Todas las fichas</span>
          <p>${formatNumber(state.index ? state.index.concepts.length : 0)} conceptos con explicación disponibles en las ${formatNumber(CLASSES.length)} clases.</p>
        </div>
        <button class="search-btn" data-search-all="true" type="button">Volver al inicio</button>
      </div>
      ${[...groups.values()].map(group => `
        <section class="search-group">
          <div class="search-group-head">
            <span class="search-group-num">${esc(group.classNum)}</span>
            <span class="search-group-title">${esc(group.classTitle)}</span>
            <span class="search-group-count">${formatNumber(group.items.length)}</span>
          </div>
          <div class="search-concept-list">
            ${group.items.map(concept => conceptCard(concept, true)).join("")}
          </div>
        </section>
      `).join("")}
    `;
  }

  function renderNotesEmpty() {
    return `
      <div class="search-empty">
        <b>Todavía no tenés notas</b>
        <p>Buscá un término y usá “Agregar una nota” para guardar tu propia explicación, un ejemplo o una duda.</p>
      </div>
    `;
  }

  function renderEmptyResults(query) {
    return `
      <div class="search-empty">
        <b>No encontramos «${esc(query)}»</b>
        <p>Probá con otra palabra, con una variante más corta o revisá la ortografía.</p>
        <p>Si el término es tuyo, podés dejar una nota para volver a encontrarlo después.</p>
      </div>
    `;
  }

  function applyBody(html, keepScroll, previousScroll) {
    els.body.innerHTML = html;
    els.body.scrollTop = keepScroll ? previousScroll : 0;
    updateShortcutLabel();
    bindEditorFocus();
  }

  function render(options = {}) {
    if (!state.index) buildIndex();
    const keepScroll = Boolean(options.keepScroll);
    const previousScroll = els.body ? els.body.scrollTop : 0;
    state.results = [];
    state.activeIndex = -1;
    const result = runSearch();
    runSearchCache = result;
    renderFilters(result);
    updateStoreLabel();

    const query = result.query;
    const notes = state.notesReady
      ? state.notes.filter(note => {
          if (!query) return false;
          const key = window.TermStore ? window.TermStore.termKey(note.term) : fold(note.term);
          return key === result.qFold;
        })
      : [];
    const termNote = notes[0] || null;
    const otherNotes = result.notes.filter(note => !termNote || note.id !== termNote.id);

    if (state.filter === "concepts" && !query) {
      applyBody(renderBrowseConcepts(), keepScroll, previousScroll);
      return;
    }
    if (state.filter === "notes" && !query) {
      const all = [...state.notes].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
      applyBody(all.length
        ? `<div class="search-browse-head">
             <div><span class="search-term-label">Mis notas</span><p>${formatNumber(all.length)} ${all.length === 1 ? "nota guardada" : "notas guardadas"}.</p></div>
             <button class="search-btn" data-search-all="true" type="button">Volver al inicio</button>
           </div>
           <div class="search-note-list">${all.map(note => noteCard(note)).join("")}</div>`
        : renderNotesEmpty(), keepScroll, previousScroll);
      return;
    }
    if (!query) {
      applyBody(renderWelcome(), keepScroll, previousScroll);
      return;
    }

    const showConcepts = state.filter === "all" || state.filter === "concepts";
    const showMentions = state.filter === "all" || state.filter === "mentions";
    const showNotes = state.filter === "all" || state.filter === "notes";
    const hasResults = (showConcepts && result.concepts.length)
      || (showMentions && result.mentions.length)
      || (showNotes && otherNotes.length);

    let html = renderTermNote(query, result.qFold, termNote);

    if (showConcepts && result.concepts.length) {
      html += `
        <section class="search-section">
          <div class="search-section-head">
            <span>${result.concepts.length === 1 ? "Explicación disponible" : "Conceptos con explicación"}</span>
            <span>${formatNumber(result.concepts.length)}</span>
          </div>
          <div class="search-concept-list">${result.concepts.map(concept => conceptCard(concept)).join("")}</div>
        </section>
      `;
    }

    if (showMentions && result.mentions.length) {
      html += `
        <section class="search-section">
          <div class="search-section-head">
            <span>${result.mentions.length === 1 ? "Mención en el material" : "Menciones en el material"}</span>
            <span>${formatNumber(result.mentions.length)}</span>
          </div>
          ${renderMentionGroups(result.mentions)}
        </section>
      `;
    }

    if (showNotes && otherNotes.length) {
      html += `
        <section class="search-section">
          <div class="search-section-head"><span>Tus notas</span><span>${formatNumber(otherNotes.length)}</span></div>
          <div class="search-note-list">${otherNotes.map(note => noteCard(note)).join("")}</div>
        </section>
      `;
    }

    if (!hasResults && state.filter !== "notes") {
      html += renderEmptyResults(query);
    }
    if (!hasResults && state.filter === "notes" && !termNote) {
      html += renderNotesEmpty();
    }

    applyBody(html, keepScroll, previousScroll);
  }

  function bindEditorFocus() {
    if (!state.editor) return;
    const textarea = $(".search-note-textarea", els.body);
    if (!textarea) return;
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    });
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
  }

  // ---------- Acciones ----------

  function activateResult(index) {
    const item = state.results[index];
    if (!item) return;
    if (item.type === "concept") {
      close({ restoreFocus: false });
      if (window.ECO_APP && typeof window.ECO_APP.openConceptAt === "function") {
        window.ECO_APP.openConceptAt(item.concept.classId, item.concept.key);
      }
      return;
    }
    if (item.type === "mention") {
      const query = state.query;
      close({ restoreFocus: false });
      if (window.ECO_APP && typeof window.ECO_APP.goToSearchHit === "function") {
        window.ECO_APP.goToSearchHit({
          classId: item.mention.classId,
          tab: item.mention.tab,
          anchor: item.mention.anchor,
          match: item.mention.match || item.mention.text.slice(0, 90),
          query
        });
      }
    }
  }

  function moveActive(delta) {
    const items = $$(".search-body [data-result]", els.modal);
    if (!items.length) return;
    if (state.activeIndex < 0) state.activeIndex = delta > 0 ? 0 : items.length - 1;
    else state.activeIndex = Math.max(0, Math.min(items.length - 1, state.activeIndex + delta));
    items.forEach((item, index) => item.classList.toggle("active", index === state.activeIndex));
    items[state.activeIndex].scrollIntoView({ block: "nearest" });
  }

  function isTypingTarget(target) {
    if (!target) return false;
    const tag = target.tagName;
    return tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT" || target.isContentEditable;
  }

  async function saveEditor() {
    const textarea = $(".search-note-textarea", els.body);
    if (!textarea) return;
    const text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }
    const editor = state.editor;
    if (!editor) return;
    let note;
    if (editor.type === "term") {
      const term = normalize(state.query);
      const key = window.TermStore ? window.TermStore.termKey(term) : fold(term);
      const existing = state.notes.find(item => (item.termKey || fold(item.term)) === key);
      note = {
        id: existing ? existing.id : (window.TermStore ? window.TermStore.newId() : `t-${Date.now()}`),
        term,
        termKey: key,
        note: text,
        createdAt: existing ? existing.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else {
      const existing = state.notes.find(item => item.id === editor.id);
      if (!existing) return;
      note = { ...existing, note: text, updatedAt: new Date().toISOString() };
    }
    if (window.TermStore) await window.TermStore.put(note);
    const index = state.notes.findIndex(item => item.id === note.id);
    if (index >= 0) state.notes[index] = note;
    else state.notes.unshift(note);
    state.editor = null;
    render({ keepScroll: true });
    if (window.ECO_APP && typeof window.ECO_APP.toast === "function") {
      window.ECO_APP.toast("Nota guardada.");
    }
  }

  async function deleteNote(id) {
    const note = state.notes.find(item => item.id === id);
    if (!note) return;
    if (!window.confirm(`¿Eliminar tu nota sobre «${note.term}»?`)) return;
    if (window.TermStore) await window.TermStore.remove(id);
    state.notes = state.notes.filter(item => item.id !== id);
    state.editor = null;
    render({ keepScroll: true });
    if (window.ECO_APP && typeof window.ECO_APP.toast === "function") {
      window.ECO_APP.toast("Nota eliminada.");
    }
  }

  function searchFor(term) {
    state.query = normalize(term);
    state.filter = "all";
    state.activeIndex = -1;
    state.editor = null;
    state.expanded.clear();
    els.input.value = state.query;
    render();
    els.input.focus();
  }

  // ---------- Eventos ----------

  function bindEvents() {
    document.addEventListener("click", event => {
      const trigger = closestEl(event.target, "[data-open-search]");
      if (trigger) {
        event.preventDefault();
        open();
      }
    });

    document.addEventListener("keydown", event => {
      const key = String(event.key || "").toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        if (state.open) close();
        else open();
        return;
      }
      if (!state.open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        if (state.editor) {
          state.editor = null;
          render({ keepScroll: true });
        } else {
          close();
        }
        return;
      }
      if (isTypingTarget(event.target) && event.target.tagName === "TEXTAREA") return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        moveActive(1);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        moveActive(-1);
        return;
      }
      if (event.key === "Enter" && event.target === els.input) {
        event.preventDefault();
        event.stopPropagation();
        if (state.activeIndex < 0) state.activeIndex = 0;
        const items = $$(".search-body [data-result]", els.modal);
        if (items.length) {
          items.forEach((item, index) => item.classList.toggle("active", index === state.activeIndex));
          activateResult(state.activeIndex);
        }
      }
    }, true);

    els.input.addEventListener("input", () => {
      state.query = els.input.value;
      state.editor = null;
      state.activeIndex = -1;
      state.expanded.clear();
      render();
    });

    els.modal.addEventListener("click", event => {
      if (closestEl(event.target, "[data-search-close]")) {
        close();
        return;
      }
      const filter = closestEl(event.target, "[data-search-filter]");
      if (filter) {
        setFilter(filter.dataset.searchFilter);
        return;
      }
      const suggest = closestEl(event.target, "[data-suggest]");
      if (suggest) {
        searchFor(suggest.dataset.suggest);
        return;
      }
      if (closestEl(event.target, "[data-browse-concepts]")) {
        setFilter("concepts");
        return;
      }
      if (closestEl(event.target, "[data-search-all]")) {
        state.filter = "all";
        render();
        return;
      }
      const expand = closestEl(event.target, "[data-expand-class]");
      if (expand) {
        const id = expand.dataset.expandClass;
        if (state.expanded.has(id)) state.expanded.delete(id);
        else state.expanded.add(id);
        render({ keepScroll: true });
        return;
      }
      const noteAction = closestEl(event.target, "[data-note-action]");
      if (noteAction) {
        const action = noteAction.dataset.noteAction;
        if (action === "search") {
          searchFor(noteAction.dataset.noteTerm || "");
          return;
        }
        if (action === "add-term" || action === "edit-term") {
          state.editor = { type: "term" };
          render({ keepScroll: true });
          return;
        }
        if (action === "edit") {
          state.editor = { type: "note", id: noteAction.dataset.noteId };
          render({ keepScroll: true });
          return;
        }
        if (action === "cancel") {
          state.editor = null;
          render({ keepScroll: true });
          return;
        }
        if (action === "save") {
          saveEditor();
          return;
        }
        if (action === "delete") {
          deleteNote(noteAction.dataset.noteId);
          return;
        }
        if (action === "delete-term") {
          const key = window.TermStore ? window.TermStore.termKey(state.query) : fold(state.query);
          const note = state.notes.find(item => (item.termKey || fold(item.term)) === key);
          if (note) deleteNote(note.id);
          return;
        }
        return;
      }
      const result = closestEl(event.target, "[data-result]");
      if (result) {
        activateResult(Number(result.dataset.result));
      }
    });

    els.modal.addEventListener("keydown", event => {
      const result = closestEl(event.target, "[data-result]");
      if (result && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        activateResult(Number(result.dataset.result));
        return;
      }
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey) && event.target.matches(".search-note-textarea")) {
        event.preventDefault();
        saveEditor();
      }
    });
  }

  async function loadNotes() {
    if (!window.TermStore) {
      state.notesReady = true;
      return;
    }
    try {
      state.notes = await window.TermStore.getAll();
    } catch (error) {
      state.notes = [];
    }
    state.notesReady = true;
    state.notes.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    updateStoreLabel();
    if (state.open && !state.editor) render({ keepScroll: true });
  }

  function init() {
    buildModal();
    bindEvents();
    updateShortcutLabel();
    loadNotes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
