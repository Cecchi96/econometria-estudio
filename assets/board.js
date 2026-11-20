/*
 * board.js — modo pizarrón.
 *
 * Dibuja a mano sobre la columna de Teoría con una capa vectorial que sigue
 * el rectángulo visible de la lectura. Cuando el modo está apagado la capa
 * queda visible pero con pointer-events:none, así los laboratorios y los
 * enlaces vuelven a responder normalmente.
 */
(() => {
  "use strict";

  const PREFIX = "eco-board-v1";
  const HINT_KEY = "eco-board-hint-v1";
  const MAX_UNDO = 50;
  const WIDTHS = {
    pen: [1.8, 2.8, 4.2],
    highlight: [12, 18, 26],
    eraser: [14, 26, 40]
  };

  const PALETTES = {
    pen: [
      { key: "ink", label: "Tinta", light: "#21403b", dark: "#e9f2ed", swatch: "#21403b", swatchDark: "#e9f2ed" },
      { key: "red", label: "Rojo", light: "#b2433a", dark: "#f08a76", swatch: "#b2433a", swatchDark: "#f08a76" },
      { key: "ochre", label: "Ocre", light: "#a9741c", dark: "#e0a75c", swatch: "#a9741c", swatchDark: "#e0a75c" },
      { key: "blue", label: "Azul", light: "#2a6a94", dark: "#8fc7e8", swatch: "#2a6a94", swatchDark: "#8fc7e8" }
    ],
    highlight: [
      { key: "yellow", label: "Amarillo", light: "#f4d98d", dark: "#f4d98d", swatch: "#f4d98d", swatchDark: "#f4d98d" },
      { key: "green", label: "Verde", light: "#bfe0cf", dark: "#bfe0cf", swatch: "#bfe0cf", swatchDark: "#bfe0cf" },
      { key: "sky", label: "Celeste", light: "#c9e3f2", dark: "#c9e3f2", swatch: "#c9e3f2", swatchDark: "#c9e3f2" },
      { key: "rose", label: "Rosa", light: "#f3cdd6", dark: "#f3cdd6", swatch: "#f3cdd6", swatchDark: "#f3cdd6" }
    ]
  };

  const ICONS = {
    pen: '<path d="M4 20.5 8.6 19 19 8.6a2.1 2.1 0 0 0-3-3L5.6 16 4 20.5Z"/><path d="m14.5 5.5 4 4"/>',
    highlight: '<path d="m5 15 7-7 3 3-7 7H5v-3Z"/><path d="m12 5 2-2 4 4-2 2"/><path d="M4 21h16"/>',
    eraser: '<path d="m4 16 9-9a2.1 2.1 0 0 1 3 0l3 3a2.1 2.1 0 0 1 0 3l-7 7H8l-4-4Z"/><path d="M9 21h11"/>',
    hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v7"/><path d="M17 13v-2.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-2a7 7 0 0 1-5.6-2.8L3.4 14.6a1.7 1.7 0 0 1 2.7-2L8 15"/>',
    finger: '<path d="M9 11V7a2 2 0 0 1 4 0v4"/><path d="M13 11V5a2 2 0 0 1 4 0v6"/><path d="M17 12v-1a2 2 0 0 1 4 0v5a6 6 0 0 1-6 6h-2a7 7 0 0 1-5.6-2.8L5.4 16.6a1.7 1.7 0 0 1 2.7-2L10 17"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h9a7 7 0 0 1 0 14h-3"/>',
    redo: '<path d="m15 14 5-5-5-5"/><path d="M20 9h-9a7 7 0 0 0 0 14h3"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>'
  };

  const $ = (selector, el = document) => el.querySelector(selector);
  const $$ = (selector, el = document) => [...el.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";
  const isTouchDevice = () => Boolean(
    (navigator.maxTouchPoints || 0) > 0 ||
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
  );

  const state = {
    active: false,
    classId: null,
    reading: null,
    layer: null,
    canvas: null,
    ctx: null,
    toolbar: null,
    geom: null,
    resizeObserver: null,
    geometryRaf: 0,
    tool: "pen",
    colors: { pen: "ink", highlight: "yellow" },
    widths: { pen: 1, highlight: 1, eraser: 1 },
    fingerDraw: false,
    strokes: [],
    undoStack: [],
    redoStack: [],
    docW: 0,
    docH: 0,
    dpr: 1,
    drawing: null,
    panning: null,
    touchIds: new Set(),
    touchPoints: new Map(),
    penActive: false,
    saveTimer: null,
    quotaWarned: false,
    hintSeen: false
  };

  const boundsCache = new WeakMap();

  // ---------- utilidades ----------

  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  }

  function toast(message, actionLabel, action) {
    if (window.EcoApp && typeof window.EcoApp.toast === "function") {
      window.EcoApp.toast(message, actionLabel, action);
      return;
    }
    const el = document.getElementById("toast");
    if (!el) return;
    el.innerHTML = `<span>${message.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]))}</span>`;
    el.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => el.classList.remove("show"), 4200);
  }

  function colorValue(key) {
    for (const palette of [PALETTES.pen, PALETTES.highlight]) {
      const item = palette.find(entry => entry.key === key);
      if (item) return isDark() ? item.dark : item.light;
    }
    return isDark() ? "#e9f2ed" : "#21403b";
  }

  function currentWidth(tool) {
    const list = WIDTHS[tool] || WIDTHS.pen;
    return list[clamp(state.widths[tool] ?? 1, 0, list.length - 1)];
  }

  function currentColor() {
    if (state.tool === "eraser") return "ink";
    return state.colors[state.tool] || "ink";
  }

  // ---------- almacenamiento local ----------

  function storageKey() {
    return `${PREFIX}:${state.classId}:teoria`;
  }

  function normalizeStroke(stroke) {
    return {
      t: ["pen", "hl", "er"].includes(stroke.t) ? stroke.t : "pen",
      c: typeof stroke.c === "string" ? stroke.c : "ink",
      s: Number(stroke.s) || 2.8,
      p: stroke.p.map(point => [Number(point[0]), Number(point[1])])
    };
  }

  function isValidStroke(stroke) {
    return Boolean(
      stroke &&
      Array.isArray(stroke.p) &&
      stroke.p.length &&
      stroke.p.every(point => Array.isArray(point) && Number.isFinite(Number(point[0])) && Number.isFinite(Number(point[1])))
    );
  }

  function loadDoc() {
    state.strokes = [];
    state.undoStack = [];
    state.redoStack = [];
    state.docW = 0;
    state.docH = 0;
    if (!state.classId) return;
    try {
      const raw = localStorage.getItem(storageKey());
      if (!raw) return;
      const doc = JSON.parse(raw);
      if (!doc || !Array.isArray(doc.strokes)) return;
      state.strokes = doc.strokes.filter(isValidStroke).map(normalizeStroke);
      state.docW = Number(doc.w) || 0;
      state.docH = Number(doc.h) || 0;
    } catch (error) {
      console.warn("[pizarrón] no se pudieron leer las marcas.", error);
    }
  }

  function saveNow() {
    if (!state.classId) return;
    try {
      localStorage.setItem(storageKey(), JSON.stringify({
        v: 1,
        w: state.docW,
        h: state.docH,
        strokes: state.strokes,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      if (!state.quotaWarned) {
        state.quotaWarned = true;
        toast("No se pudieron guardar las marcas: el almacenamiento está lleno.");
      }
      console.warn("[pizarrón] no se pudieron guardar las marcas.", error);
    }
  }

  function saveSoon() {
    if (!state.classId) return;
    if (state.saveTimer) clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      state.saveTimer = null;
      saveNow();
    }, 350);
  }

  function flushSave() {
    if (state.saveTimer) {
      clearTimeout(state.saveTimer);
      state.saveTimer = null;
    }
    saveNow();
  }

  // ---------- geometría ----------

  function scheduleGeometry() {
    if (state.geometryRaf) return;
    state.geometryRaf = requestAnimationFrame(() => {
      state.geometryRaf = 0;
      syncGeometry();
    });
  }

  function syncGeometry(force = false) {
    const reading = state.reading;
    const layer = state.layer;
    const canvas = state.canvas;
    if (!reading || !layer || !canvas || !reading.isConnected) return;

    const rect = reading.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      layer.style.display = "none";
      state.geom = null;
      return;
    }

    const topbar = $(".topbar");
    const topbarHeight = topbar ? topbar.getBoundingClientRect().height : 0;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const left = Math.max(0, rect.left);
    const right = Math.min(viewW, rect.right);
    const top = Math.max(topbarHeight, rect.top, 0);
    const bottom = Math.min(viewH, rect.bottom);
    const width = right - left;
    const height = bottom - top;

    if (width < 1 || height < 1) {
      layer.style.display = "none";
      state.geom = null;
      return;
    }

    layer.style.display = "block";
    layer.style.left = `${left}px`;
    layer.style.top = `${top}px`;
    layer.style.width = `${width}px`;
    layer.style.height = `${height}px`;

    const docW = Math.round(rect.width);
    const docH = Math.round(reading.scrollHeight || rect.height);

    if (state.docW > 0 && docW > 0 && Math.abs(docW - state.docW) > 1) {
      const scaleX = docW / state.docW;
      eachStroke(stroke => {
        stroke.p = stroke.p.map(([x, y]) => [x * scaleX, y]);
        stroke.s = Math.max(1, stroke.s * scaleX);
        boundsCache.delete(stroke);
      });
      if (state.strokes.length) saveSoon();
    }

    state.docW = docW;
    state.docH = docH;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelW = Math.max(1, Math.round(width * dpr));
    const pixelH = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    state.dpr = dpr;
    state.geom = {
      layerLeft: left,
      layerTop: top,
      width,
      height,
      readingLeft: rect.left,
      readingTop: rect.top
    };

    redraw();
  }

  function observeSize(reading) {
    if (state.resizeObserver) state.resizeObserver.disconnect();
    if (!window.ResizeObserver) return;
    state.resizeObserver = new ResizeObserver(scheduleGeometry);
    state.resizeObserver.observe(reading);
  }

  // ---------- dibujo vectorial ----------

  function eachStroke(fn) {
    const seen = new Set();
    const walk = list => {
      list.forEach(stroke => {
        if (seen.has(stroke)) return;
        seen.add(stroke);
        fn(stroke);
      });
    };
    walk(state.strokes);
    state.undoStack.forEach(walk);
    state.redoStack.forEach(walk);
  }

  function boundsOf(stroke) {
    const cached = boundsCache.get(stroke);
    if (cached) return cached;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    stroke.p.forEach(([x, y]) => {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    });
    const pad = stroke.s / 2 + 2;
    const bounds = { x0: x0 - pad, y0: y0 - pad, x1: x1 + pad, y1: y1 + pad };
    boundsCache.set(stroke, bounds);
    return bounds;
  }

  function applyStrokeStyle(ctx, stroke) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (stroke.t === "er") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.fillStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      const color = colorValue(stroke.c);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = stroke.t === "hl" ? (isDark() ? 0.28 : 0.48) : 1;
    }
    ctx.lineWidth = stroke.s;
  }

  function drawStroke(ctx, stroke) {
    const points = stroke.p;
    if (!points.length) return;
    ctx.save();
    applyStrokeStyle(ctx, stroke);
    if (points.length === 1) {
      ctx.beginPath();
      ctx.arc(points[0][0], points[0][1], Math.max(0.6, stroke.s / 2), 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let index = 1; index < points.length - 1; index++) {
        const next = points[index + 1];
        const midX = (points[index][0] + next[0]) / 2;
        const midY = (points[index][1] + next[1]) / 2;
        ctx.quadraticCurveTo(points[index][0], points[index][1], midX, midY);
      }
      const last = points[points.length - 1];
      ctx.lineTo(last[0], last[1]);
      ctx.stroke();
    }
    ctx.restore();
  }

  function redraw() {
    const ctx = state.ctx;
    const geom = state.geom;
    if (!ctx || !geom) return;

    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.clearRect(0, 0, geom.width, geom.height);
    if (!state.strokes.length) return;

    const offsetX = geom.readingLeft - geom.layerLeft;
    const offsetY = geom.readingTop - geom.layerTop;
    const visibleX0 = -offsetX;
    const visibleY0 = -offsetY;
    const visibleX1 = visibleX0 + geom.width;
    const visibleY1 = visibleY0 + geom.height;

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, geom.width, geom.height);
    ctx.clip();
    ctx.translate(offsetX, offsetY);

    for (const stroke of state.strokes) {
      const bounds = boundsOf(stroke);
      if (bounds.x1 < visibleX0 || bounds.x0 > visibleX1 || bounds.y1 < visibleY0 || bounds.y0 > visibleY1) continue;
      drawStroke(ctx, stroke);
    }

    ctx.restore();
  }

  function withDocSpace(fn) {
    const ctx = state.ctx;
    const geom = state.geom;
    if (!ctx || !geom) return;
    const offsetX = geom.readingLeft - geom.layerLeft;
    const offsetY = geom.readingTop - geom.layerTop;
    ctx.save();
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.beginPath();
    ctx.rect(0, 0, geom.width, geom.height);
    ctx.clip();
    ctx.translate(offsetX, offsetY);
    fn(ctx);
    ctx.restore();
  }

  function drawLiveSegment(stroke, from, to) {
    withDocSpace(ctx => {
      ctx.save();
      applyStrokeStyle(ctx, stroke);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.restore();
    });
  }

  function drawDot(stroke, point) {
    withDocSpace(ctx => {
      ctx.save();
      applyStrokeStyle(ctx, stroke);
      ctx.beginPath();
      ctx.arc(point.x, point.y, Math.max(0.6, stroke.s / 2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ---------- punteros ----------

  function pointFromEvent(event) {
    const geom = state.geom;
    if (!geom) return { x: 0, y: 0 };
    return {
      x: clamp(event.clientX - geom.readingLeft, 0, state.docW || geom.width),
      y: clamp(event.clientY - geom.readingTop, 0, state.docH || geom.height)
    };
  }

  function bindCanvas() {
    const canvas = state.canvas;
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("contextmenu", event => {
      if (state.active) event.preventDefault();
    });
    canvas.addEventListener("dragstart", event => event.preventDefault());
  }

  function onPointerDown(event) {
    if (!state.active) return;
    if (state.tool === "hand") return;

    const isPen = event.pointerType === "pen";
    const isTouch = event.pointerType === "touch";

    if (isTouch) {
      if (state.penActive) return;
      if (!state.fingerDraw) return;
      state.touchIds.add(event.pointerId);
      state.touchPoints.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (state.touchIds.size >= 2) {
        cancelStroke();
        startPan();
        return;
      }
    }

    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (state.drawing) return;

    event.preventDefault();
    event.stopPropagation();

    if (isPen) {
      state.penActive = true;
      state.layer.classList.add("pen-down");
    }

    const point = pointFromEvent(event);
    const stroke = {
      t: state.tool === "highlight" ? "hl" : state.tool === "eraser" ? "er" : "pen",
      c: currentColor(),
      s: currentWidth(state.tool),
      p: [[point.x, point.y]]
    };

    state.strokes.push(stroke);
    state.drawing = {
      id: event.pointerId,
      stroke,
      last: point,
      snapshot: state.strokes.slice(0, -1)
    };

    try {
      state.canvas.setPointerCapture(event.pointerId);
    } catch (error) {}

    drawDot(stroke, point);
  }

  function onPointerMove(event) {
    if (!state.active) return;

    if (state.panning) {
      updatePan(event);
      return;
    }

    const drawing = state.drawing;
    if (!drawing || event.pointerId !== drawing.id) return;

    event.preventDefault();
    event.stopPropagation();

    const events = typeof event.getCoalescedEvents === "function"
      ? event.getCoalescedEvents()
      : [];
    const batch = events.length ? events : [event];

    for (const item of batch) {
      const point = pointFromEvent(item);
      const last = drawing.last;
      if (Math.hypot(point.x - last.x, point.y - last.y) < 0.5) continue;
      drawing.stroke.p.push([point.x, point.y]);
      boundsCache.delete(drawing.stroke);
      drawLiveSegment(drawing.stroke, last, point);
      drawing.last = point;
    }
  }

  function onPointerUp(event) {
    if (state.panning) {
      endPan(event);
    }

    const drawing = state.drawing;
    if (drawing && event.pointerId === drawing.id) {
      event.preventDefault();
      event.stopPropagation();
      finishStroke();
    }

    if (event.pointerType === "touch") {
      state.touchIds.delete(event.pointerId);
      state.touchPoints.delete(event.pointerId);
      if (state.panning && state.touchIds.size < 2) endPan(event);
    }
  }

  function onPointerCancel(event) {
    if (event.pointerType === "touch") {
      state.touchIds.delete(event.pointerId);
      state.touchPoints.delete(event.pointerId);
    }
    if (state.panning) {
      endPan(event);
      return;
    }
    if (state.drawing && event.pointerId === state.drawing.id) {
      cancelStroke();
    }
  }

  function finishStroke() {
    const drawing = state.drawing;
    if (!drawing) return;
    state.drawing = null;

    if (drawing.stroke.p.length) {
      state.undoStack.push(drawing.snapshot);
      if (state.undoStack.length > MAX_UNDO) state.undoStack.shift();
      state.redoStack = [];
      boundsCache.delete(drawing.stroke);
      saveSoon();
    }

    releaseStrokePointer(drawing.id);
    redraw();
    updateToolbar();
  }

  function cancelStroke() {
    const drawing = state.drawing;
    if (!drawing) return;
    state.drawing = null;
    const index = state.strokes.lastIndexOf(drawing.stroke);
    if (index >= 0) state.strokes.splice(index, 1);
    releaseStrokePointer(drawing.id);
    redraw();
  }

  function releaseStrokePointer(pointerId) {
    state.penActive = false;
    if (state.layer) state.layer.classList.remove("pen-down");
    try {
      if (state.canvas && state.canvas.hasPointerCapture(pointerId)) {
        state.canvas.releasePointerCapture(pointerId);
      }
    } catch (error) {}
  }

  function touchCentroid() {
    const points = [...state.touchPoints.values()];
    if (!points.length) return null;
    return {
      x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
      y: points.reduce((sum, point) => sum + point.y, 0) / points.length
    };
  }

  function startPan() {
    const centroid = touchCentroid();
    if (!centroid) return;
    state.panning = { lastX: centroid.x, lastY: centroid.y };
  }

  function updatePan(event) {
    const point = state.touchPoints.get(event.pointerId);
    if (!point) return;
    point.x = event.clientX;
    point.y = event.clientY;
    const centroid = touchCentroid();
    if (!centroid) return;
    const dx = centroid.x - state.panning.lastX;
    const dy = centroid.y - state.panning.lastY;
    state.panning.lastX = centroid.x;
    state.panning.lastY = centroid.y;
    if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
      window.scrollBy(-dx, -dy);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function endPan(event) {
    state.panning = null;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // ---------- barra de herramientas ----------

  function buildToolbar() {
    if (state.toolbar) return;
    const bar = document.createElement("div");
    bar.className = "board-bar";
    bar.id = "boardBar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Herramientas del modo pizarrón");
    bar.hidden = true;
    bar.innerHTML = `
      <button class="board-tool" data-tool="pen" type="button" aria-pressed="true" title="Lápiz" aria-label="Lápiz">${icon("pen")}</button>
      <button class="board-tool" data-tool="highlight" type="button" aria-pressed="false" title="Resaltador" aria-label="Resaltador">${icon("highlight")}</button>
      <button class="board-tool" data-tool="eraser" type="button" aria-pressed="false" title="Borrador" aria-label="Borrador">${icon("eraser")}</button>
      <button class="board-tool" data-tool="hand" type="button" aria-pressed="false" title="Mover y tocar" aria-label="Mover y tocar">${icon("hand")}</button>
      <span class="board-sep" aria-hidden="true"></span>
      <div class="board-colors" data-board-colors role="group" aria-label="Color del trazo"></div>
      <div class="board-widths" data-board-widths role="group" aria-label="Grosor del trazo">
        ${[0, 1, 2].map(index => `
          <button class="board-width" data-width="${index}" type="button"
            aria-label="${["Trazo fino", "Trazo medio", "Trazo grueso"][index]}"
            title="${["Trazo fino", "Trazo medio", "Trazo grueso"][index]}">
            <span></span>
          </button>
        `).join("")}
      </div>
      <span class="board-sep" aria-hidden="true"></span>
      <button class="board-act" data-action="undo" type="button" title="Deshacer (Ctrl+Z)" aria-label="Deshacer" disabled>${icon("undo")}</button>
      <button class="board-act" data-action="redo" type="button" title="Rehacer (Ctrl+Y)" aria-label="Rehacer" disabled>${icon("redo")}</button>
      <button class="board-act" data-action="clear" type="button" title="Borrar todas las marcas" aria-label="Borrar todas las marcas" disabled>${icon("trash")}</button>
      <button class="board-act board-finger" data-action="finger" type="button" title="Dibujar con el dedo (dos dedos para desplazar)" aria-label="Dibujar con el dedo" aria-pressed="false" hidden>${icon("finger")}<span>Dedo</span></button>
      <button class="board-exit" data-action="exit" type="button" title="Salir del pizarrón" aria-label="Salir del pizarrón">${icon("close")}<span>Salir</span></button>
    `;
    document.body.appendChild(bar);
    state.toolbar = bar;
    const finger = $('[data-action="finger"]', bar);
    if (finger) finger.hidden = !isTouchDevice();
    bar.addEventListener("click", onToolbarClick);
    updateToolbar();
  }

  function onToolbarClick(event) {
    const toolButton = event.target.closest("[data-tool]");
    if (toolButton) {
      setTool(toolButton.dataset.tool);
      return;
    }

    const colorButton = event.target.closest("[data-color]");
    if (colorButton) {
      state.colors[state.tool] = colorButton.dataset.color;
      updateToolbar();
      return;
    }

    const widthButton = event.target.closest("[data-width]");
    if (widthButton) {
      state.widths[state.tool] = Number(widthButton.dataset.width);
      updateToolbar();
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === "undo") undo();
    if (action === "redo") redo();
    if (action === "clear") clearAll();
    if (action === "finger") setFingerDraw(!state.fingerDraw);
    if (action === "exit") exit();
  }

  function renderColors() {
    const bar = state.toolbar;
    if (!bar) return;
    const wrap = $("[data-board-colors]", bar);
    if (!wrap) return;
    const palette = state.tool === "highlight" ? PALETTES.highlight : PALETTES.pen;
    const selected = state.colors[state.tool];
    wrap.innerHTML = palette.map(item => `
      <button class="board-swatch ${item.key === selected ? "active" : ""}" data-color="${item.key}" type="button"
        style="--swatch:${isDark() ? item.swatchDark : item.swatch}"
        title="${item.label}" aria-label="${item.label}" aria-pressed="${item.key === selected}"></button>
    `).join("");
  }

  function updateToolbar() {
    const bar = state.toolbar;
    if (!bar) return;

    $$(".board-tool", bar).forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.tool === state.tool));
    });

    const showColors = state.tool === "pen" || state.tool === "highlight";
    const showWidths = state.tool !== "hand";
    const colors = $("[data-board-colors]", bar);
    const widths = $("[data-board-widths]", bar);
    if (colors) colors.hidden = !showColors;
    if (widths) {
      widths.hidden = !showWidths;
      $$("[data-width]", widths).forEach(button => {
        button.setAttribute("aria-pressed", String(Number(button.dataset.width) === state.widths[state.tool]));
      });
    }
    if (showColors) renderColors();

    const undoButton = $('[data-action="undo"]', bar);
    const redoButton = $('[data-action="redo"]', bar);
    const clearButton = $('[data-action="clear"]', bar);
    const fingerButton = $('[data-action="finger"]', bar);
    if (undoButton) undoButton.disabled = !state.undoStack.length;
    if (redoButton) redoButton.disabled = !state.redoStack.length;
    if (clearButton) clearButton.disabled = !state.strokes.length;
    if (fingerButton) fingerButton.setAttribute("aria-pressed", String(state.fingerDraw));
  }

  function setTool(tool) {
    if (!["pen", "highlight", "eraser", "hand"].includes(tool)) return;
    if (state.drawing) finishStroke();
    state.tool = tool;
    syncToolClasses();
    updateToolbar();
  }

  function setFingerDraw(enabled) {
    if (state.drawing) finishStroke();
    state.fingerDraw = enabled;
    syncToolClasses();
    updateToolbar();
    toast(enabled
      ? "Dedo activado: un dedo dibuja, dos dedos desplazan."
      : "Dedo desactivado: el dedo vuelve a desplazar la clase.");
  }

  function syncToolClasses() {
    if (!state.layer) return;
    state.layer.dataset.tool = state.tool;
    state.layer.classList.toggle("is-active", state.active);
    state.layer.classList.toggle("is-hand", state.tool === "hand");
    state.layer.classList.toggle("draw-touch", state.fingerDraw);
    state.layer.classList.toggle("pen-down", state.penActive);
  }

  function undo() {
    if (state.drawing) finishStroke();
    if (!state.undoStack.length) return;
    state.redoStack.push(state.strokes.slice());
    state.strokes = state.undoStack.pop();
    redraw();
    updateToolbar();
    saveSoon();
  }

  function redo() {
    if (state.drawing) finishStroke();
    if (!state.redoStack.length) return;
    state.undoStack.push(state.strokes.slice());
    state.strokes = state.redoStack.pop();
    redraw();
    updateToolbar();
    saveSoon();
  }

  function clearAll() {
    if (state.drawing) finishStroke();
    if (!state.strokes.length) return;
    state.undoStack.push(state.strokes.slice());
    if (state.undoStack.length > MAX_UNDO) state.undoStack.shift();
    state.redoStack = [];
    state.strokes = [];
    redraw();
    updateToolbar();
    saveSoon();
    toast("Pizarrón borrado.", "Deshacer", undo);
  }

  // ---------- capa y ciclo de vida ----------

  function ensureLayer() {
    if (!state.classId) return false;
    const reading = document.getElementById("reading");
    if (!reading || !reading.isConnected) return false;

    if (!state.layer) {
      const layer = document.createElement("div");
      layer.className = "board-layer";
      layer.id = "boardLayer";
      layer.setAttribute("aria-hidden", "true");
      const canvas = document.createElement("canvas");
      canvas.className = "board-canvas";
      canvas.setAttribute("aria-label", "Anotaciones a mano del modo pizarrón");
      layer.appendChild(canvas);
      document.body.appendChild(layer);
      state.layer = layer;
      state.canvas = canvas;
      state.ctx = canvas.getContext("2d");
      bindCanvas();
    }

    state.reading = reading;
    observeSize(reading);
    syncToolClasses();
    syncGeometry(true);
    return true;
  }

  function unmountLayer() {
    if (state.resizeObserver) {
      state.resizeObserver.disconnect();
      state.resizeObserver = null;
    }
    if (state.layer) state.layer.style.display = "none";
    state.reading = null;
    state.geom = null;
    state.drawing = null;
    state.panning = null;
    state.penActive = false;
    state.touchIds.clear();
    state.touchPoints.clear();
  }

  function onClassRender(classId) {
    if (state.drawing) finishStroke();
    if (state.panning) state.panning = null;
    state.touchIds.clear();
    state.touchPoints.clear();
    if (state.classId) flushSave();
    state.classId = classId || null;
    state.undoStack = [];
    state.redoStack = [];

    if (!state.classId) {
      unmountLayer();
      if (state.active) exit({ silent: true });
      return;
    }

    loadDoc();
    if (!ensureLayer()) {
      if (state.active) exit({ silent: true });
      return;
    }
    updateToolbar();
    if (state.active) syncGeometry(true);
  }

  function onTabChange(tabId) {
    if (tabId === "teoria") {
      if (state.classId) {
        ensureLayer();
        syncGeometry(true);
      }
      return;
    }
    if (state.layer) state.layer.style.display = "none";
    state.geom = null;
    if (state.active) exit({ silent: true });
  }

  function updateButton() {
    const button = document.getElementById("boardBtn");
    if (!button) return;
    button.setAttribute("aria-pressed", String(state.active));
    button.title = state.active ? "Salir del modo pizarrón" : "Modo pizarrón (Teoría)";
    const label = $(".board-btn-label", button);
    if (label) label.textContent = state.active ? "Salir" : "Pizarrón";
  }

  function hideOtherUi() {
    $$(".selection-toolbar.show").forEach(el => el.classList.remove("show"));
    const popover = document.getElementById("commentPopover");
    if (popover) popover.classList.remove("show");
    const hint = document.getElementById("hint");
    if (hint) hint.style.display = "none";
    const selection = window.getSelection && window.getSelection();
    if (selection && selection.removeAllRanges) selection.removeAllRanges();
  }

  function enter() {
    if (!state.classId && window.EcoApp && typeof window.EcoApp.getClassId === "function") {
      state.classId = window.EcoApp.getClassId();
    }
    if (!state.classId) {
      toast("Abrí una clase para usar el pizarrón.");
      return;
    }
    if (window.EcoApp && typeof window.EcoApp.getTab === "function" && window.EcoApp.getTab() !== "teoria") {
      window.EcoApp.switchTab("teoria");
    }
    if (!ensureLayer()) {
      toast("No se encontró la teoría de esta clase.");
      return;
    }

    buildToolbar();
    state.active = true;
    document.body.classList.add("board-mode");
    if (state.toolbar) state.toolbar.hidden = false;
    state.layer.classList.add("is-active");
    syncToolClasses();
    updateButton();
    updateToolbar();
    syncGeometry(true);
    hideOtherUi();

    if (!state.hintSeen) {
      state.hintSeen = true;
      try { localStorage.setItem(HINT_KEY, "1"); } catch (error) {}
      toast(isTouchDevice()
        ? "Lápiz para dibujar · un dedo desplaza · «Dedo» dibuja sin lápiz."
        : "Dibujá con el mouse o el lápiz · Esc o Salir para volver.");
    }
  }

  function exit(options = {}) {
    if (!state.active) return;
    if (state.drawing) finishStroke();
    if (state.panning) state.panning = null;
    flushSave();
    state.active = false;
    state.penActive = false;
    state.touchIds.clear();
    state.touchPoints.clear();
    document.body.classList.remove("board-mode");
    if (state.layer) {
      state.layer.classList.remove("is-active", "pen-down");
    }
    if (state.toolbar) state.toolbar.hidden = true;
    updateButton();
    if (!options.silent) toast("Saliste del pizarrón. Ya podés usar los labs.");
  }

  function toggle() {
    if (state.active) exit();
    else enter();
  }

  function onKeydown(event) {
    if (!state.active) return;
    if (document.body.classList.contains("search-open")) return;
    const drawer = document.getElementById("drawer");
    if (drawer && drawer.classList.contains("open")) return;

    const key = event.key.toLowerCase();
    const meta = event.ctrlKey || event.metaKey;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      exit();
      return;
    }
    if (meta && key === "z") {
      event.preventDefault();
      event.stopPropagation();
      if (event.shiftKey) redo();
      else undo();
      return;
    }
    if (meta && key === "y") {
      event.preventDefault();
      event.stopPropagation();
      redo();
      return;
    }
    if (meta || event.altKey) return;

    if (key === "p" || key === "1") setTool("pen");
    if (key === "h" || key === "2") setTool("highlight");
    if (key === "e" || key === "3") setTool("eraser");
    if (key === "m" || key === "4") setTool("hand");
  }

  function init() {
    try { state.hintSeen = localStorage.getItem(HINT_KEY) === "1"; } catch (error) {}

    const button = document.getElementById("boardBtn");
    if (button) button.addEventListener("click", toggle);

    buildToolbar();
    updateButton();

    document.addEventListener("keydown", onKeydown, true);
    window.addEventListener("scroll", scheduleGeometry, { passive: true });
    window.addEventListener("resize", scheduleGeometry);
    window.addEventListener("orientationchange", scheduleGeometry);
    window.addEventListener("load", scheduleGeometry);
    window.addEventListener("pagehide", flushSave);
    window.addEventListener("blur", () => {
      if (state.drawing) cancelStroke();
      state.panning = null;
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushSave();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleGeometry).catch(() => {});
    }

    if (window.MutationObserver) {
      new MutationObserver(() => {
        updateToolbar();
        redraw();
      }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      new MutationObserver(scheduleGeometry).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }

    const topbar = $(".topbar");
    if (topbar && window.ResizeObserver) {
      new ResizeObserver(scheduleGeometry).observe(topbar);
    }

    scheduleGeometry();
  }

  window.BoardMode = {
    enter,
    exit: () => exit(),
    toggle,
    onClassRender,
    onTabChange,
    isActive: () => state.active
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
