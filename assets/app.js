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
  const truncate = (value, size) => value.length > size ? value.slice(0, size).trimEnd() + "…" : value;
  const pad = (value) => String(value).padStart(2, "0");

  const CLASSES = window.CLASE_INDICE || [];
  const CONTENTS = window.CLASE_CONTENIDOS || {};
  const TAB_LABELS = {
    teoria: "Teoría",
    conceptos: "Conceptos clave",
    practica: "Práctica",
    autoevaluacion: "Autoevaluación",
    repaso: "Repaso",
    fuentes: "Fuentes"
  };

  const state = {
    content: null,
    activeTab: "teoria",
    drawerMode: null,
    conceptKey: null,
    conceptTab: "esencia",
    annotations: [],
    annotationFilter: "all",
    focusAnnotation: null,
    editingId: null,
    pendingRange: null,
    pendingBlock: null,
    commentRange: null,
    commentBlock: null,
    storeMode: "indexeddb"
  };

  const els = {
    app: $("#app"),
    classNav: $("#classNav"),
    mobileClassbar: $("#mobileClassbar"),
    crumbClass: $("#crumbClass"),
    crumbTab: $("#crumbTab"),
    courseCount: $("#courseCount"),
    courseProgress: $("#courseProgress"),
    courseStatus: $("#courseStatus"),
    annotCount: $("#annotCount"),
    annotationsBtn: $("#annotationsBtn"),
    themeBtn: $("#themeBtn"),
    focusBtn: $("#focusBtn"),
    userBtn: $("#userBtn"),
    drawer: $("#drawer"),
    drawerHead: $("#drawerHead"),
    drawerBody: $("#drawerBody"),
    scrim: $("#scrim"),
    toolbar: $("#selectionToolbar"),
    popover: $("#commentPopover"),
    popQuote: $("#popQuote"),
    popTextarea: $("#popTextarea"),
    popCancel: $("#popCancel"),
    popSave: $("#popSave"),
    toast: $("#toast"),
    hint: $("#hint"),
    closeHint: $("#closeHint")
  };

  // ---------- Boot ----------

  function init() {
    renderNavigation();
    initTheme();
    bindEvents();
    initUser();
    route();
  }

  function initTheme() {
    if (!els.themeBtn) return;
    setTheme(document.documentElement.getAttribute("data-theme") || "light");
    els.themeBtn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      try { localStorage.setItem("eco-theme", next); } catch (error) {}
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (!els.themeBtn) return;
    els.themeBtn.textContent = theme === "dark" ? "☀" : "☾";
    els.themeBtn.setAttribute("aria-label", theme === "dark" ? "Cambiar a modo día" : "Cambiar a modo noche");
    els.themeBtn.title = theme === "dark" ? "Modo día" : "Modo noche";
  }

  async function initUser() {
    if (!els.userBtn || !window.fukuro || !window.fukuro.ready) return;
    try {
      const user = await window.fukuro.ready;
      const email = (user && user.email) || "";
      const initials = email.split("@")[0].slice(0, 2).toUpperCase() || "YO";
      els.userBtn.textContent = initials;
      els.userBtn.title = `${email} · Cerrar sesión`;
      els.userBtn.addEventListener("click", () => {
        if (window.confirm("¿Cerrar sesión?")) window.fukuro.signOut();
      });
    } catch (error) {
      // storage.js ya muestra el error de conexión.
    }
  }

  function renderNavigation() {
    const sidebar = CLASSES.map(item => `
      <a href="#${item.id}" data-class-id="${item.id}" class="${item.available ? "" : "soon"}" title="${item.available ? item.title : "Próximamente"}">
        <span class="num">${item.num}</span>
        <span>${item.title}</span>
      </a>
    `).join("");
    if (els.classNav) els.classNav.innerHTML = sidebar;
    if (els.mobileClassbar) {
      els.mobileClassbar.innerHTML = CLASSES.map(item => `
        <a href="#${item.id}" data-class-id="${item.id}" class="${item.available ? "" : "soon"}">
          ${item.num} · ${item.title}
        </a>
      `).join("");
    }
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    const meta = CLASSES.find(item => item.id === hash) || CLASSES[0];
    if (!meta) return;
    const content = CONTENTS[meta.id];
    const index = CLASSES.findIndex(item => item.id === meta.id);
    setActiveNav(meta.id);
    if (els.courseCount) els.courseCount.textContent = `${index + 1} / ${CLASSES.length}`;
    if (els.courseProgress) els.courseProgress.style.width = `${((index + 1) / CLASSES.length) * 100}%`;
    if (els.courseStatus) els.courseStatus.textContent = `Clase ${meta.num} ${content ? "en curso" : "próximamente"}`;
    window.scrollTo(0, 0);
    if (content) renderClass(content);
    else renderPlaceholder(meta);
  }

  function setActiveNav(id) {
    $$("[data-class-id]").forEach(link => {
      link.classList.toggle("active", link.dataset.classId === id);
    });
  }

  // ---------- Class shell ----------

  function renderClass(content) {
    state.content = content;
    state.activeTab = "teoria";
    state.annotations = [];
    state.annotationFilter = "all";
    state.focusAnnotation = null;
    state.editingId = null;
    closeDrawer();
    els.annotationsBtn.hidden = false;
    els.crumbClass.textContent = `Clase ${content.num}`;
    els.crumbTab.textContent = TAB_LABELS.teoria;
    els.app.innerHTML = `
      ${renderHero(content)}
      ${renderTabs()}
      <section class="tab-panel active" id="panel-teoria">
        <div class="reading" id="reading">${renderReading(content)}</div>
      </section>
      <section class="tab-panel" id="panel-conceptos">${renderConcepts(content)}</section>
      <section class="tab-panel" id="panel-practica">${renderPractice(content)}</section>
      <section class="tab-panel" id="panel-autoevaluacion">${renderAssessment(content)}</section>
      <section class="tab-panel" id="panel-repaso">${renderReview(content)}</section>
      <section class="tab-panel" id="panel-fuentes">${renderSources(content)}</section>
      ${renderFooter(content)}
    `;
    updateAnnotationCount();
    initChart();
    loadAnnotations(content.id);
  }

  function renderPlaceholder(meta) {
    state.content = null;
    state.annotations = [];
    closeDrawer();
    if (els.hint) els.hint.style.display = "none";
    els.annotationsBtn.hidden = true;
    els.crumbClass.textContent = `Clase ${meta.num}`;
    els.crumbTab.textContent = "En construcción";
    els.app.innerHTML = `
      <section class="placeholder">
        <div class="eyebrow">Clase ${meta.num} · Próximamente</div>
        <h1>${meta.title}</h1>
        <p>Esta clase todavía no está desarrollada. La plantilla, la navegación y las anotaciones ya están listas; el contenido se carga en la próxima etapa.</p>
        <a class="open-btn" href="#clase-01">Volver a la clase 1</a>
      </section>
    `;
  }

  function renderHero(content) {
    return `
      <section class="hero">
        <div>
          <div class="eyebrow">${content.eyebrow}</div>
          <h1>${content.title}</h1>
          <p class="lead">${content.lead}</p>
          <div class="hero-meta">
            ${content.pills.map((pill, index) => `<span class="pill ${index === 0 ? "teal" : ""}">${pill}</span>`).join("")}
          </div>
        </div>
        <aside class="question-card">
          <span class="mini-label">La pregunta de esta clase</span>
          <p>${content.question}</p>
        </aside>
      </section>
    `;
  }

  function renderTabs() {
    return `
      <nav class="tabs" aria-label="Secciones de la clase">
        ${Object.entries(TAB_LABELS).map(([id, label], index) => `
          <button class="tab ${index === 0 ? "active" : ""}" data-tab="${id}" type="button">${label}</button>
        `).join("")}
      </nav>
    `;
  }

  function renderReading(content) {
    return content.sections.map(section => `
      <section class="lesson-section" id="${section.id}">
        <div class="section-head"><span class="section-num">${section.number}</span><h2>${section.title}</h2></div>
        ${section.blocks.map(renderBlock).join("")}
      </section>
    `).join("");
  }

  function renderBlock(block) {
    switch (block.type) {
      case "p":
        return `<p data-block-id="${block.id}">${block.html}</p>`;
      case "formula":
        return `
          <div class="formula-display">
            <div class="formula-main">${block.main}</div>
            <div class="formula-legend">
              ${block.legend.map(item => `<div><span class="legend-key">${item.key}</span><span>${item.text}</span></div>`).join("")}
            </div>
          </div>
        `;
      case "cards":
        return `
          <div class="interpret-grid">
            ${block.items.map(item => `
              <div class="interpret">
                <span class="sym">${item.sym}</span>
                <b>${item.title}</b>
                <p>${item.text}</p>
              </div>
            `).join("")}
          </div>
        `;
      case "callout":
        return `
          <div class="callout ${block.variant === "teal" ? "teal" : ""}">
            <span class="mini-label">${block.label}</span>
            <p>${block.html}</p>
          </div>
        `;
      case "compare":
        return `
          <div class="compare-grid">
            <div class="compare-card">
              <span class="tag">${block.left.tag}</span>
              <h3>${block.left.title}</h3>
              <p>${block.left.text}</p>
              <div class="eq">${block.left.eq}</div>
            </div>
            <div class="compare-card muted">
              <span class="tag">${block.right.tag}</span>
              <h3>${block.right.title}</h3>
              <p>${block.right.text}</p>
              <div class="eq">${block.right.eq}</div>
            </div>
          </div>
        `;
      case "chart":
        return chartLabHTML();
      case "assumptions":
        return `
          <div class="assumption-table">
            ${block.rows.map(row => `
              <div class="assumption-row">
                <b>${row.title}</b>
                <span>${row.text}</span>
              </div>
            `).join("")}
          </div>
        `;
      case "miniCheck":
        return `
          <div class="mini-check">
            <span class="mini-label">Mini-check</span>
            <h3>${block.question}</h3>
            <p>${block.intro}</p>
            <button class="check-btn" data-check="${block.id}" type="button">Mostrar respuesta</button>
            <div class="check-answer" id="${block.id}-answer"><p>${block.answer}</p></div>
          </div>
        `;
      case "errorTable":
        return `
          <div class="error-table">
            <div class="error-row error-head"><span>Error típico</span><span>Por qué ocurre</span><span>Cómo corregirlo</span></div>
            ${block.rows.map(row => `
              <div class="error-row">
                <b>${row.error}</b>
                <span>${row.why}</span>
                <span>${row.fix}</span>
              </div>
            `).join("")}
          </div>
        `;
      case "map":
        return `
          <div class="class-map">
            ${block.steps.map(step => `
              <div class="map-step">
                <span class="n">${step.n}</span>
                <b>${step.title}</b>
                <span>${step.text}</span>
              </div>
            `).join("")}
          </div>
        `;
      case "sourceStrip":
        return `
          <div class="source-strip">
            ${block.chips.map(chip => `
              <span class="source-chip"><span class="dot"></span><b>${chip.label}</b> ${chip.text}</span>
            `).join("")}
          </div>
        `;
      default:
        return "";
    }
  }

  function chartLabHTML() {
    return `
      <div class="chart-lab">
        <div class="chart-stage">
          <div class="chart-topline">
            <div class="chart-metrics" aria-live="polite">
              <span>β₀ <b id="readB0">—</b></span>
              <span>β₁ <b id="readB1">—</b></span>
              <span>SCR <b id="readSCR">—</b></span>
              <span>R² <b id="readR2">—</b></span>
            </div>
            <span class="chart-status" id="chartStatus">Ajuste MCO</span>
          </div>
          <svg id="olsChart" class="scatter" viewBox="0 0 560 310" role="img" aria-label="Diagrama de dispersión interactivo: una recta de regresión y las distancias verticales de los puntos a la recta">
            <defs>
              <clipPath id="plotClip"><rect x="64" y="38" width="456" height="222"/></clipPath>
            </defs>
            <line class="axis-line" x1="64" y1="260" x2="520" y2="260" stroke-width="1.2"/>
            <line class="axis-line" x1="64" y1="260" x2="64" y2="38" stroke-width="1.2"/>
            <text class="axis-label" x="516" y="278" font-size="11" font-family="system-ui">X</text>
            <text class="axis-label" x="48" y="44" font-size="11" font-family="system-ui">Y</text>
            <g id="residualLayer" clip-path="url(#plotClip)"></g>
            <line id="fitLine" class="fit-line" clip-path="url(#plotClip)" x1="64" y1="260" x2="520" y2="38"/>
            <g id="pointLayer"></g>
          </svg>
        </div>
        <div class="chart-controls">
          <label class="range-control">
            <span>Intercepto β₀ <output id="outB0" for="slopeB0">—</output></span>
            <input type="range" id="slopeB0" min="-2" max="6" step="0.01" aria-label="Intercepto beta cero">
          </label>
          <label class="range-control">
            <span>Pendiente β₁ <output id="outB1" for="slopeB1">—</output></span>
            <input type="range" id="slopeB1" min="-0.5" max="2.5" step="0.01" aria-label="Pendiente beta uno">
          </label>
          <div class="chart-actions">
            <label class="check-control"><input type="checkbox" id="showResiduals" checked> Residuos</label>
            <button class="reset-chart" id="resetChart" type="button">Volver a MCO</button>
          </div>
        </div>
        <p class="chart-hint"><b>Movés la recta, no los datos.</b> MCO es la recta que minimiza la SCR; cuando te alejás del ajuste, la SCR sube y el R² baja. Si la recta ajusta peor que la media, el R² puede volverse negativo. La línea punteada es el residuo de cada observación.</p>
      </div>
    `;
  }

  function renderConcepts(content) {
    const entries = Object.entries(content.concepts);
    return `
      <div class="panel-intro">
        <div class="eyebrow">Mapa de conceptos</div>
        <h2>Los conceptos que sostienen la clase</h2>
        <p>Cada tarjeta abre una barra lateral con la definición mínima, un ejemplo, los errores típicos, conexiones y las fuentes exactas. La idea es consultar sin perder el lugar de lectura.</p>
      </div>
      <div class="concept-grid">
        ${entries.map(([key, concept], index) => `
          <button class="concept-card" data-concept="${key}" type="button">
            <span class="card-num">${pad(index + 1)}</span>
            <h3>${concept.title}</h3>
            <p>${concept.sub}</p>
            <span class="card-source">Clase 1 · ficha de concepto</span>
          </button>
        `).join("")}
      </div>
    `;
  }

  function renderPractice(content) {
    const practice = content.practice;
    return `
      <div class="panel-intro">
        <div class="eyebrow">${practice.eyebrow}</div>
        <h2>${practice.title}</h2>
        <p>${practice.intro}</p>
      </div>
      <div class="exercise-list">
        ${practice.exercises.map(exercise => `
          <article class="exercise-card">
            <div class="ex-label">${exercise.label.replace(" · ", "<br>")}</div>
            <div>
              <h3>${exercise.title}</h3>
              <p>${exercise.text}</p>
              <div class="tag-row">${exercise.tags.map(tag => `<span class="tag teal">${tag}</span>`).join("")}</div>
            </div>
            ${exercise.href
              ? `<a class="open-btn" href="${exercise.href}" target="_blank" rel="noopener">Abrir en la guía</a>`
              : `<span class="open-btn muted">Guía externa</span>`}
          </article>
        `).join("")}
      </div>
      <div class="practice-partials">
        <div class="mini-label">Preguntas de parcial relacionadas</div>
        <div class="partial-grid">
          ${practice.partials.map(partial => `
            <article class="partial-card">
              <span class="tag">${partial.label}</span>
              <p>${partial.text}</p>
              ${partial.href
                ? `<a class="text-btn" href="${partial.href}" target="_blank" rel="noopener">Ver solución →</a>`
                : `<span class="partial-note">Solución en tu copia</span>`}
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderAssessment(content) {
    const assessment = content.assessment;
    return `
      <div class="panel-intro">
        <div class="eyebrow">${assessment.eyebrow}</div>
        <h2>${assessment.title}</h2>
        <p>${assessment.intro}</p>
        <button class="reset-chart" id="toggleAllQA" type="button">Mostrar todas</button>
      </div>
      <div class="qa-list">
        ${assessment.questions.map((item, index) => `
          <details class="qa-card">
            <summary><span class="qa-num">${pad(index + 1)}</span><span>${item.q}</span></summary>
            <div class="qa-answer">${item.a}</div>
          </details>
        `).join("")}
      </div>
    `;
  }

  function renderReview(content) {
    const review = content.review;
    return `
      <div class="panel-intro">
        <div class="eyebrow">${review.eyebrow}</div>
        <h2>${review.title}</h2>
        <p>${review.intro}</p>
      </div>
      <div class="session">
        ${review.session.map(item => `
          <div class="session-block">
            <span class="time">${item.time}</span>
            <div><h3>${item.title}</h3><p>${item.text}</p></div>
          </div>
        `).join("")}
      </div>
      <div class="kit-grid">
        ${review.kit.map(item => `
          <div class="kit-card">
            <span class="k">${item.k}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        `).join("")}
      </div>
      <div class="review-plan">
        <div class="mini-label">Plan de repaso de 7 días</div>
        <div class="plan-grid">
          ${review.plan.map(item => `
            <div class="plan-day">
              <span class="day">${item.day}</span>
              <b>${item.title}</b>
              <p>${item.text}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderSources(content) {
    const sources = content.sources;
    return `
      <div class="panel-intro">
        <div class="eyebrow">${sources.eyebrow}</div>
        <h2>${sources.title}</h2>
        <p>${sources.intro}</p>
      </div>
      <div class="source-list">
        ${sources.items.map(item => `
          <article class="source-card">
            <span class="source-type ${item.typeClass || ""}">${item.type}</span>
            <div>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              <div class="loc">${item.loc}</div>
              ${item.href ? `<a class="source-link" href="${item.href}" target="_blank" rel="noopener">Abrir fuente →</a>` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderFooter(content) {
    return `
      <footer class="app-footer">
        Clase ${content.num} · Material de estudio basado en las fuentes de la cátedra · Las anotaciones se guardan en tu cuenta.
      </footer>
    `;
  }

  // ---------- Tabs ----------

  function switchTab(tabId) {
    if (!TAB_LABELS[tabId]) return;
    state.activeTab = tabId;
    $$(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.tab === tabId));
    $$(".tab-panel").forEach(panel => panel.classList.toggle("active", panel.id === `panel-${tabId}`));
    els.crumbTab.textContent = TAB_LABELS[tabId];
    hideToolbar();
    els.popover.classList.remove("show");
    state.commentRange = null;
    state.commentBlock = null;
    const panel = document.querySelector(".tab-panel.active");
    if (panel) {
      const tabsHeight = $(".tabs")?.offsetHeight || 50;
      const topbarHeight = $(".topbar")?.offsetHeight || 60;
      const offset = tabsHeight + topbarHeight + 8;
      const top = panel.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  function toggleCheck(button) {
    const answer = document.getElementById(`${button.dataset.check}-answer`);
    if (!answer) return;
    const open = answer.classList.toggle("show");
    button.textContent = open ? "Ocultar respuesta" : "Mostrar respuesta";
  }

  function toggleAllQA() {
    const cards = $$(".qa-card");
    if (!cards.length) return;
    const anyClosed = cards.some(card => !card.open);
    cards.forEach(card => { card.open = anyClosed; });
    const button = $("#toggleAllQA");
    if (button) button.textContent = anyClosed ? "Ocultar todas" : "Mostrar todas";
  }

  // ---------- Chart lab ----------

  function initChart() {
    const chart = $("#olsChart");
    if (!chart) return;

    const DATA = [
      { x: 1.0, y: 1.9 }, { x: 1.7, y: 3.1 }, { x: 2.2, y: 2.4 },
      { x: 2.9, y: 3.8 }, { x: 3.5, y: 3.2 }, { x: 4.2, y: 4.9 },
      { x: 4.8, y: 4.3 }, { x: 5.5, y: 5.8 }, { x: 6.1, y: 5.1 },
      { x: 6.8, y: 6.4 }
    ];
    const plot = { left: 64, right: 520, top: 38, bottom: 260 };
    const xMin = 0, xMax = 8, yMin = 0, yMax = 8;
    const sx = x => plot.left + ((x - xMin) / (xMax - xMin)) * (plot.right - plot.left);
    const sy = y => plot.bottom - ((y - yMin) / (yMax - yMin)) * (plot.bottom - plot.top);
    const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const meanX = mean(DATA.map(d => d.x));
    const meanY = mean(DATA.map(d => d.y));
    const sxx = DATA.reduce((s, d) => s + (d.x - meanX) ** 2, 0);
    const sxy = DATA.reduce((s, d) => s + (d.x - meanX) * (d.y - meanY), 0);
    const sct = DATA.reduce((s, d) => s + (d.y - meanY) ** 2, 0);
    const rawB1 = sxy / sxx;
    const rawB0 = meanY - rawB1 * meanX;
    const ols = { b0: Math.round(rawB0 * 100) / 100, b1: Math.round(rawB1 * 100) / 100 };
    const scrAt = (b0, b1) => DATA.reduce((s, d) => s + (d.y - (b0 + b1 * d.x)) ** 2, 0);
    const r2At = (b0, b1) => 1 - scrAt(b0, b1) / sct;
    const fmt = n => n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const pct = n => (n * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 }) + "%";

    const b0Input = $("#slopeB0");
    const b1Input = $("#slopeB1");
    const b0Out = $("#outB0");
    const b1Out = $("#outB1");
    const readB0 = $("#readB0");
    const readB1 = $("#readB1");
    const readSCR = $("#readSCR");
    const readR2 = $("#readR2");
    const status = $("#chartStatus");
    const pointLayer = $("#pointLayer");
    const residualLayer = $("#residualLayer");
    const fitLine = $("#fitLine");
    if (!b0Input || !b1Input || !fitLine) return;

    DATA.forEach(d => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", sx(d.x));
      circle.setAttribute("cy", sy(d.y));
      circle.setAttribute("r", "5.4");
      circle.setAttribute("class", "pt");
      pointLayer.appendChild(circle);
    });

    function render() {
      const b0 = parseFloat(b0Input.value);
      const b1 = parseFloat(b1Input.value);
      const scr = scrAt(b0, b1);
      const r2 = r2At(b0, b1);
      b0Out.textContent = fmt(b0);
      b1Out.textContent = fmt(b1);
      readB0.textContent = fmt(b0);
      readB1.textContent = fmt(b1);
      readSCR.textContent = fmt(scr);
      readR2.textContent = pct(r2);

      fitLine.setAttribute("x1", sx(xMin));
      fitLine.setAttribute("y1", sy(b0 + b1 * xMin));
      fitLine.setAttribute("x2", sx(xMax));
      fitLine.setAttribute("y2", sy(b0 + b1 * xMax));

      residualLayer.innerHTML = "";
      if ($("#showResiduals").checked) {
        DATA.forEach(d => {
          const yhat = b0 + b1 * d.x;
          if (yhat < yMin || yhat > yMax) return;
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", sx(d.x));
          line.setAttribute("x2", sx(d.x));
          line.setAttribute("y1", sy(d.y));
          line.setAttribute("y2", sy(yhat));
          line.setAttribute("class", "resid-line");
          residualLayer.appendChild(line);
        });
      }

      const isOLS = Math.abs(b0 - ols.b0) < 0.015 && Math.abs(b1 - ols.b1) < 0.015;
      status.textContent = isOLS ? "Ajuste MCO" : "Recta manual";
      status.classList.toggle("manual", !isOLS);
    }

    function resetToOLS() {
      b0Input.value = ols.b0.toFixed(2);
      b1Input.value = ols.b1.toFixed(2);
      render();
    }

    b0Input.addEventListener("input", render);
    b1Input.addEventListener("input", render);
    $("#showResiduals").addEventListener("change", render);
    $("#resetChart").addEventListener("click", resetToOLS);
    resetToOLS();
  }

  // ---------- Annotations ----------

  function updateAnnotationCount() {
    if (els.annotCount) els.annotCount.textContent = state.annotations.length;
  }

  async function loadAnnotations(classId) {
    try {
      state.annotations = await window.AnnotationStore.getAll(classId);
    } catch (error) {
      state.annotations = [];
    }
    if (!state.content || state.content.id !== classId) return;
    state.annotations.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    state.storeMode = window.AnnotationStore.getMode();
    applyAllAnnotations();
    updateAnnotationCount();
    if (state.drawerMode === "annotations") renderAnnotations();
  }

  function applyAllAnnotations() {
    state.annotations.forEach(annotation => {
      annotation._orphan = false;
      if (!state.content) return;
      const block = els.app.querySelector(`[data-block-id="${annotation.blockId}"]`);
      if (!block) { annotation._orphan = true; return; }
      const mark = applyAnnotation(annotation, block);
      if (!mark) annotation._orphan = true;
    });
  }

  function applyAnnotation(annotation, block) {
    if (document.querySelector(`mark[data-annotation-id="${annotation.id}"]`)) return true;
    let range = rangeFromOffsets(block, annotation.start, annotation.end);
    if (!range || normalize(range.toString()) !== normalize(annotation.quote)) {
      const index = block.textContent.indexOf(annotation.quote);
      if (index >= 0) range = rangeFromOffsets(block, index, index + annotation.quote.length);
      else range = null;
    }
    if (!range) return null;
    return wrapRange(block, range, annotation);
  }

  function wrapRange(block, range, annotation) {
    const mark = document.createElement("mark");
    mark.className = `annot ${annotation.color === "green" ? "hl-green" : "hl-yellow"}`;
    mark.dataset.annotationId = annotation.id;
    mark.tabIndex = 0;
    mark.title = "Abrir anotación";
    try {
      mark.appendChild(range.extractContents());
      range.insertNode(mark);
    } catch (error) {
      return null;
    }
    mark.addEventListener("click", event => {
      event.stopPropagation();
      openAnnotation(annotation.id);
    });
    mark.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        openAnnotation(annotation.id);
      }
    });
    return mark;
  }

  function getOffsets(block, range) {
    const pre = document.createRange();
    pre.selectNodeContents(block);
    pre.setEnd(range.startContainer, range.startOffset);
    const start = pre.toString().length;
    return { start, end: start + range.toString().length };
  }

  function rangeFromOffsets(block, start, end) {
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
    let position = 0;
    let startNode = null, startOffset = 0, endNode = null, endOffset = 0;
    let node;
    while ((node = walker.nextNode())) {
      const length = node.textContent.length;
      if (!startNode && start <= position + length) {
        startNode = node;
        startOffset = Math.max(0, start - position);
      }
      if (!endNode && end <= position + length) {
        endNode = node;
        endOffset = Math.max(0, end - position);
        break;
      }
      position += length;
    }
    if (!startNode || !endNode) return null;
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    return range;
  }

  function createAnnotation(range, block, note) {
    if (!range || !block) return null;
    const quote = normalize(range.toString());
    if (!quote) { showToast("No hay texto seleccionado."); return null; }
    const offsets = getOffsets(block, range);
    const id = (crypto.randomUUID && crypto.randomUUID()) || `a-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const annotation = {
      id,
      classId: state.content.id,
      blockId: block.dataset.blockId,
      start: offsets.start,
      end: offsets.end,
      quote,
      note: note || "",
      color: note ? "green" : "yellow",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const mark = wrapRange(block, range, annotation);
    if (!mark) { showToast("No se pudo marcar ese fragmento. Probá con una frase dentro de un mismo párrafo."); return null; }
    state.annotations.unshift(annotation);
    updateAnnotationCount();
    window.AnnotationStore.put(annotation).then(() => {
      state.storeMode = window.AnnotationStore.getMode();
    });
    return annotation;
  }

  function openAnnotation(id) {
    state.focusAnnotation = id;
    state.editingId = null;
    openDrawer("annotations");
  }

  function goToAnnotation(id) {
    if (state.activeTab !== "teoria") switchTab("teoria");
    closeDrawer();
    setTimeout(() => {
      const mark = document.querySelector(`mark[data-annotation-id="${id}"]`);
      if (!mark) { showToast("No se encontró el fragmento en el texto."); return; }
      mark.scrollIntoView({ behavior: "smooth", block: "center" });
      mark.classList.remove("flash");
      void mark.offsetWidth;
      mark.classList.add("flash");
      setTimeout(() => mark.classList.remove("flash"), 1900);
    }, 240);
  }

  function deleteAnnotation(id) {
    const annotation = state.annotations.find(item => item.id === id);
    if (!annotation) return;
    if (!window.confirm("¿Eliminar esta anotación?")) return;
    const mark = document.querySelector(`mark[data-annotation-id="${id}"]`);
    if (mark) {
      const parent = mark.parentNode;
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
      parent.removeChild(mark);
      parent.normalize();
    }
    state.annotations = state.annotations.filter(item => item.id !== id);
    state.focusAnnotation = null;
    state.editingId = null;
    window.AnnotationStore.remove(id).then(() => {
      state.storeMode = window.AnnotationStore.getMode();
    });
    updateAnnotationCount();
    renderAnnotations();
    showToast("Anotación eliminada.");
  }

  // ---------- Drawer ----------

  function openDrawer(mode, key) {
    state.drawerMode = mode;
    if (mode === "concept" && key) {
      state.conceptKey = key;
      state.conceptTab = "esencia";
    }
    renderDrawer();
    els.drawer.classList.add("open");
    els.scrim.classList.add("show");
    els.annotationsBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const close = $(".drawer-close", els.drawer);
      if (close) close.focus({ preventScroll: true });
    }, 40);
  }

  function closeDrawer() {
    if (!els.drawer) return;
    els.drawer.classList.remove("open");
    els.scrim.classList.remove("show");
    if (els.annotationsBtn) els.annotationsBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    state.drawerMode = null;
    state.focusAnnotation = null;
    state.editingId = null;
  }

  function renderDrawer() {
    if (state.drawerMode === "concept") renderConcept();
    if (state.drawerMode === "annotations") renderAnnotations();
  }

  function renderConcept() {
    const concept = state.content && state.content.concepts[state.conceptKey];
    if (!concept) return;
    const tabs = [
      ["esencia", "Esencia"], ["ejemplo", "Ejemplo"], ["errores", "Errores"],
      ["conexiones", "Conexiones"], ["fuentes", "Fuentes"]
    ];
    els.drawerHead.innerHTML = `
      <div class="eyebrow">Concepto clave</div>
      <h2>${concept.title}</h2>
      <p class="drawer-sub">${concept.sub}</p>
      <button class="drawer-close" data-action="close" aria-label="Cerrar panel" type="button">×</button>
    `;
    els.drawerBody.innerHTML = `
      <div class="drawer-tabs" role="tablist" aria-label="Información del concepto">
        ${tabs.map(([id, label]) => `
          <button class="drawer-tab ${state.conceptTab === id ? "active" : ""}" data-ctab="${id}" role="tab" aria-selected="${state.conceptTab === id}" type="button">${label}</button>
        `).join("")}
      </div>
      <div id="conceptContent">${concept[state.conceptTab] || ""}</div>
      <div class="drawer-footer">
        <div><span class="mini-label">Cómo leer esta barra</span><p>Lo marcado como “siempre” es el mínimo para entender el concepto. Lo “opcional” se despliega según lo que necesites.</p></div>
        <button class="text-btn" data-action="close" type="button">Volver a la lectura →</button>
      </div>
    `;
  }

  function renderAnnotations() {
    if (!els.drawerBody) return;
    const comments = state.annotations.filter(item => item.note && item.note.trim());
    const highlights = state.annotations.filter(item => !item.note || !item.note.trim());
    let list = state.annotations;
    if (state.annotationFilter === "comments") list = comments;
    if (state.annotationFilter === "highlights") list = highlights;

    els.drawerHead.innerHTML = `
      <div class="eyebrow">Tus marcas</div>
      <h2>Anotaciones</h2>
      <p class="drawer-sub">${state.annotations.length} en esta clase · ${storeStatus()}</p>
      <button class="drawer-close" data-action="close" aria-label="Cerrar panel" type="button">×</button>
    `;

    const items = list.map(annotation => {
      const editing = state.editingId === annotation.id;
      const selected = state.focusAnnotation === annotation.id;
      return `
        <article class="annot-item ${selected ? "selected" : ""}" data-annot-id="${annotation.id}">
          <div class="annot-quote"><span class="dot ${annotation.color}"></span><span>“${esc(truncate(annotation.quote, 170))}”</span></div>
          ${annotation._orphan ? '<span class="orphan-badge">Fragmento no encontrado</span>' : ""}
          ${editing
            ? `<textarea class="annot-edit" data-edit-input="${annotation.id}">${esc(annotation.note)}</textarea>
               <div class="annot-actions"><button class="text-btn" data-action="save-edit" data-id="${annotation.id}" type="button">Guardar</button><button class="text-btn" data-action="cancel-edit" data-id="${annotation.id}" type="button">Cancelar</button></div>`
            : `${annotation.note ? `<p class="annot-note">${esc(annotation.note)}</p>` : `<p class="annot-empty">Subrayado sin comentario</p>`}
               <div class="annot-meta">${formatDate(annotation.createdAt)} · Clase ${state.content ? state.content.num : ""}</div>
               <div class="annot-actions">
                 <button class="text-btn" data-action="go" data-id="${annotation.id}" type="button">Ir al fragmento</button>
                 <button class="text-btn" data-action="edit" data-id="${annotation.id}" type="button">Editar</button>
                 <button class="text-btn danger" data-action="delete" data-id="${annotation.id}" type="button">Eliminar</button>
               </div>`
          }
        </article>
      `;
    }).join("");

    els.drawerBody.innerHTML = `
      <div class="filter-row">
        <button class="filter ${state.annotationFilter === "all" ? "active" : ""}" data-filter="all" type="button">Todas (${state.annotations.length})</button>
        <button class="filter ${state.annotationFilter === "comments" ? "active" : ""}" data-filter="comments" type="button">Con comentario (${comments.length})</button>
        <button class="filter ${state.annotationFilter === "highlights" ? "active" : ""}" data-filter="highlights" type="button">Subrayados (${highlights.length})</button>
      </div>
      <div class="annot-list">
        ${items || `<div class="empty-annot">No hay anotaciones en este filtro.<br>Seleccioná un fragmento de la teoría para crear una.</div>`}
      </div>
      <div class="demo-note">${storeStatus(true)}</div>
      <div class="drawer-footer">
        <div><span class="mini-label">Para crear una</span><p>Cerrá este panel, seleccioná una frase de la teoría y elegí “Comentar”.</p></div>
        <button class="text-btn" data-action="close" type="button">Volver a la teoría →</button>
      </div>
    `;

    if (state.focusAnnotation) {
      const selected = els.drawerBody.querySelector(`[data-annot-id="${state.focusAnnotation}"]`);
      if (selected) selected.scrollIntoView({ block: "nearest" });
    }
    if (state.editingId) {
      const input = els.drawerBody.querySelector(`[data-edit-input="${state.editingId}"]`);
      if (input) setTimeout(() => input.focus(), 30);
    }
  }

  function storeStatus(long = false) {
    if (state.storeMode === "supabase") {
      return long ? "Tus anotaciones se guardan en tu cuenta de Supabase." : "guardado en tu cuenta";
    }
    if (state.storeMode === "supabase-error") {
      return long ? "No se pudo conectar con Supabase: se guardan localmente en este dispositivo." : "sin conexión: guardado local";
    }
    if (state.storeMode === "indexeddb") {
      return long ? "Tus anotaciones se guardan en este dispositivo (IndexedDB)." : "guardado local";
    }
    if (state.storeMode === "localstorage") {
      return long ? "Tus anotaciones se guardan en este navegador (localStorage)." : "guardado en el navegador";
    }
    return long ? "Solo en esta sesión: el navegador no permitió guardar las anotaciones." : "solo en esta sesión";
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Ahora";
    return date.toLocaleString("es-AR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  // ---------- Selection / annotations UI ----------

  function selectionTouchesMark(range) {
    const startEl = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
    const endEl = range.endContainer.nodeType === 3 ? range.endContainer.parentElement : range.endContainer;
    if ((startEl && startEl.closest("mark.annot")) || (endEl && endEl.closest("mark.annot"))) return true;
    return Boolean(range.cloneContents().querySelector("mark.annot"));
  }

  function showToolbar(rect) {
    els.toolbar.classList.add("show");
    const width = els.toolbar.offsetWidth || 190;
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(12, Math.min(window.innerWidth - width - 12, left));
    let top = rect.top - 46;
    if (top < 12) top = rect.bottom + 10;
    els.toolbar.style.left = `${left}px`;
    els.toolbar.style.top = `${top}px`;
  }

  function hideToolbar() {
    els.toolbar.classList.remove("show");
    state.pendingRange = null;
    state.pendingBlock = null;
  }

  function positionPopover(rect) {
    els.popover.classList.add("show");
    const width = els.popover.offsetWidth || 340;
    const height = els.popover.offsetHeight || 220;
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(12, Math.min(window.innerWidth - width - 12, left));
    let top = rect.bottom + 12;
    if (top + height > window.innerHeight - 12) top = Math.max(12, rect.top - height - 12);
    els.popover.style.left = `${left}px`;
    els.popover.style.top = `${top}px`;
  }

  // ---------- Events ----------

  function bindEvents() {
    if (els.app) {
      els.app.addEventListener("click", event => {
        const tab = closestEl(event.target, ".tab");
        if (tab) { switchTab(tab.dataset.tab); return; }
        const check = closestEl(event.target, "[data-check]");
        if (check) { toggleCheck(check); return; }
        if (closestEl(event.target, "#toggleAllQA")) { toggleAllQA(); }
      });
    }

    document.addEventListener("click", event => {
      const concept = closestEl(event.target, "[data-concept]");
      if (concept) {
        event.preventDefault();
        if (state.content && state.content.concepts[concept.dataset.concept]) {
          openDrawer("concept", concept.dataset.concept);
        }
      }
    });

    document.addEventListener("keydown", event => {
      const concept = closestEl(event.target, "[data-concept]");
      if (concept && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        if (state.content && state.content.concepts[concept.dataset.concept]) {
          openDrawer("concept", concept.dataset.concept);
        }
      }
    });

    if (els.drawerBody) {
      els.drawerBody.addEventListener("click", event => {
        const tab = closestEl(event.target, "[data-ctab]");
        if (tab) { state.conceptTab = tab.dataset.ctab; renderConcept(); return; }
        const filter = closestEl(event.target, "[data-filter]");
        if (filter) { state.annotationFilter = filter.dataset.filter; renderAnnotations(); return; }
        const actionEl = closestEl(event.target, "[data-action]");
        if (!actionEl) return;
        const action = actionEl.dataset.action;
        const id = actionEl.dataset.id;
        if (action === "close") { closeDrawer(); return; }
        if (action === "go") { goToAnnotation(id); return; }
        if (action === "edit") { state.editingId = id; state.focusAnnotation = id; renderAnnotations(); return; }
        if (action === "cancel-edit") { state.editingId = null; renderAnnotations(); return; }
        if (action === "delete") { deleteAnnotation(id); return; }
        if (action === "save-edit") {
          const input = els.drawerBody.querySelector(`[data-edit-input="${id}"]`);
          const annotation = state.annotations.find(item => item.id === id);
          if (annotation && input) {
            annotation.note = input.value.trim();
            annotation.updatedAt = new Date().toISOString();
            window.AnnotationStore.put(annotation).then(() => {
              state.storeMode = window.AnnotationStore.getMode();
            });
          }
          state.editingId = null;
          renderAnnotations();
          showToast("Comentario actualizado.");
        }
      });
    }

    if (els.drawerHead) {
      els.drawerHead.addEventListener("click", event => {
        if (closestEl(event.target, "[data-action='close']")) closeDrawer();
      });
    }

    if (els.annotationsBtn) {
      els.annotationsBtn.addEventListener("click", () => {
        if (els.drawer.classList.contains("open") && state.drawerMode === "annotations") closeDrawer();
        else openDrawer("annotations");
      });
    }

    if (els.focusBtn) {
      els.focusBtn.addEventListener("click", () => {
        const active = document.body.classList.toggle("focus-mode");
        els.focusBtn.textContent = active ? "Salir de enfoque" : "Modo enfoque";
        showToast(active ? "Modo enfoque activado." : "Modo enfoque desactivado.");
      });
    }

    $$(".side-tool").forEach(button => {
      button.addEventListener("click", () => {
        const tool = button.dataset.tool;
        if (tool === "guia") {
          window.open("../fuentes/ejericios/Guía-TP-Eco-I-2026.html", "_blank", "noopener");
          return;
        }
        if (tool === "parciales") {
          if (state.content) switchTab("practica");
          else showToast("Abrí una clase para ver la práctica.");
          return;
        }
        if (tool === "fuentes") {
          if (state.content) switchTab("fuentes");
          else showToast("Abrí una clase para ver las fuentes.");
        }
      });
    });

    if (els.scrim) els.scrim.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (els.popover.classList.contains("show")) {
        els.popover.classList.remove("show");
        state.commentRange = null;
        state.commentBlock = null;
      } else if (els.drawer.classList.contains("open")) {
        closeDrawer();
      } else {
        hideToolbar();
      }
    });

    document.addEventListener("mouseup", event => {
      if (closestEl(event.target, ".selection-toolbar, .comment-popover, .drawer, .side, .topbar, .tabs, .hero")) return;
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !selection.rangeCount) { hideToolbar(); return; }
        const range = selection.getRangeAt(0);
        const reading = $("#reading");
        if (!reading || !reading.contains(range.commonAncestorContainer)) { hideToolbar(); return; }
        const startEl = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
        const endEl = range.endContainer.nodeType === 3 ? range.endContainer.parentElement : range.endContainer;
        const startBlock = startEl && startEl.closest("[data-block-id]");
        const endBlock = endEl && endEl.closest("[data-block-id]");
        if (!startBlock || startBlock !== endBlock) { hideToolbar(); return; }
        const text = selection.toString().trim();
        if (text.length < 3) { hideToolbar(); return; }
        if (selectionTouchesMark(range)) {
          hideToolbar();
          showToast("Ese fragmento ya tiene una anotación.");
          return;
        }
        state.pendingRange = range.cloneRange();
        state.pendingBlock = startBlock;
        showToolbar(range.getBoundingClientRect());
      }, 10);
    });

    if (els.toolbar) {
      els.toolbar.addEventListener("mousedown", event => event.preventDefault());
      els.toolbar.addEventListener("click", event => {
        const button = closestEl(event.target, "button");
        if (!button) return;
        if (button.dataset.action === "highlight") {
          if (!state.pendingRange || !state.pendingBlock) return;
          createAnnotation(state.pendingRange, state.pendingBlock, "");
          hideToolbar();
          window.getSelection()?.removeAllRanges();
          showToast("Fragmento subrayado.", "Ver anotaciones", () => openDrawer("annotations"));
        }
        if (button.dataset.action === "comment") {
          if (!state.pendingRange || !state.pendingBlock) return;
          state.commentRange = state.pendingRange.cloneRange();
          state.commentBlock = state.pendingBlock;
          els.popQuote.textContent = `“${truncate(normalize(state.commentRange.toString()), 150)}”`;
          els.popTextarea.value = "";
          els.toolbar.classList.remove("show");
          positionPopover(state.commentRange.getBoundingClientRect());
          setTimeout(() => els.popTextarea.focus({ preventScroll: true }), 40);
        }
      });
    }

    if (els.popCancel) {
      els.popCancel.addEventListener("click", () => {
        els.popover.classList.remove("show");
        state.commentRange = null;
        state.commentBlock = null;
        window.getSelection()?.removeAllRanges();
      });
    }

    if (els.popSave) {
      els.popSave.addEventListener("click", () => {
        const note = els.popTextarea.value.trim();
        if (!note) { els.popTextarea.focus(); return; }
        if (!state.commentRange || !state.commentBlock) return;
        createAnnotation(state.commentRange, state.commentBlock, note);
        els.popover.classList.remove("show");
        state.commentRange = null;
        state.commentBlock = null;
        window.getSelection()?.removeAllRanges();
        showToast("Comentario guardado.", "Ver anotaciones", () => openDrawer("annotations"));
      });
    }

    document.addEventListener("mousedown", event => {
      if (!closestEl(event.target, ".selection-toolbar") && !closestEl(event.target, ".comment-popover")) {
        hideToolbar();
        if (els.popover.classList.contains("show") && !closestEl(event.target, ".drawer")) {
          els.popover.classList.remove("show");
          state.commentRange = null;
          state.commentBlock = null;
        }
      }
    });

    if (els.closeHint) {
      els.closeHint.addEventListener("click", () => { els.hint.style.display = "none"; });
    }
    setTimeout(() => {
      if (els.hint && els.hint.style.display !== "none") els.hint.style.display = "none";
    }, 12000);

    window.addEventListener("hashchange", route);
  }

  // ---------- Toast ----------

  function showToast(message, actionLabel, action) {
    if (!els.toast) return;
    els.toast.innerHTML = `<span>${esc(message)}</span>${actionLabel ? `<button type="button">${esc(actionLabel)}</button>` : ""}`;
    if (actionLabel && action) {
      els.toast.querySelector("button").addEventListener("click", () => {
        hideToast();
        action();
      });
    }
    els.toast.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(hideToast, 4200);
  }

  function hideToast() {
    if (!els.toast) return;
    els.toast.classList.remove("show");
    clearTimeout(showToast._timer);
  }

  // ---------- Start ----------

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
