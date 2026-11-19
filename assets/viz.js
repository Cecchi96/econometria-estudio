(() => {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const fmt = (value, digits = 2) => Number.isFinite(value)
    ? value.toLocaleString("es-AR", { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : "—";
  const fmt0 = value => fmt(value, 0);
  const fmtPct = (value, digits = 1) => `${fmt(value * 100, digits)}%`;
  const fmtSigned = (value, digits = 2) => {
    if (!Number.isFinite(value)) return "—";
    if (Math.abs(value) < 0.005) return fmt(0, digits);
    return `${value < 0 ? "−" : "+"}${fmt(Math.abs(value), digits)}`;
  };
  const fmtSignedPct = (value, digits = 1) => {
    if (!Number.isFinite(value)) return "—";
    if (Math.abs(value) < 0.0005) return fmtPct(0, digits);
    return `${value < 0 ? "−" : "+"}${fmtPct(Math.abs(value), digits)}`;
  };

  function make(tag, attrs = {}, text) {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== null && value !== undefined) node.setAttribute(key, value);
    });
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function linePath(points) {
    return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  }

  function areaPath(points, baseline) {
    if (!points.length) return "";
    const first = points[0];
    const last = points[points.length - 1];
    return `${linePath(points)} L${last.x.toFixed(2)},${baseline.toFixed(2)} L${first.x.toFixed(2)},${baseline.toFixed(2)} Z`;
  }

  function frame(options) {
    const {
      w = 560, h = 280, l = 48, r = 18, t = 16, b = 34,
      xd, yd, xt = [], yt = [], xfmt = v => fmt0(v), yfmt = v => fmt0(v),
      aria = "Gráfico interactivo"
    } = options;
    const svg = make("svg", { viewBox: `0 0 ${w} ${h}`, class: "viz-svg", role: "img", "aria-label": aria });
    const sx = value => l + ((value - xd[0]) / (xd[1] - xd[0])) * (w - l - r);
    const sy = value => h - b - ((value - yd[0]) / (yd[1] - yd[0])) * (h - t - b);
    const bottom = h - b;

    xt.forEach(value => {
      const x = sx(value);
      svg.appendChild(make("line", { x1: x, y1: t, x2: x, y2: bottom, class: "viz-grid" }));
      svg.appendChild(make("text", { x, y: bottom + 14, class: "viz-tick", "text-anchor": "middle" }, xfmt(value)));
    });
    yt.forEach(value => {
      const y = sy(value);
      svg.appendChild(make("line", { x1: l, y1: y, x2: w - r, y2: y, class: "viz-grid" }));
      svg.appendChild(make("text", { x: l - 7, y: y + 3, class: "viz-tick", "text-anchor": "end" }, yfmt(value)));
    });
    svg.appendChild(make("line", { x1: l, y1: bottom, x2: w - r, y2: bottom, class: "viz-axis" }));
    svg.appendChild(make("line", { x1: l, y1: t, x2: l, y2: bottom, class: "viz-axis" }));

    return { svg, sx, sy, bottom, l, r, t, w, h, xd, yd };
  }

  function addAxisLabels(chart, xText, yText) {
    chart.svg.appendChild(make("text", { x: chart.w - chart.r, y: chart.h - 4, class: "viz-axis-title", "text-anchor": "end" }, xText));
    if (yText) {
      chart.svg.appendChild(make("text", { x: chart.l, y: chart.t - 5, class: "viz-axis-title" }, yText));
    }
  }

  function metric(label, value, status) {
    return `<span class="viz-metric${status ? " " + status : ""}">${label} <b>${value}</b></span>`;
  }

  function setActive(container, attr, value) {
    container.querySelectorAll(`[${attr}]`).forEach(button => {
      button.classList.toggle("active", button.getAttribute(attr) === value);
      if (button.tagName === "BUTTON") button.setAttribute("aria-pressed", button.getAttribute(attr) === value ? "true" : "false");
    });
  }

  // ---------- Statistical helpers ----------

  const LANCZOS = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
  ];

  function logGamma(x) {
    let y = x;
    const tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
    let series = 1.000000000190015;
    for (let index = 0; index < 6; index += 1) series += LANCZOS[index] / (y += 1);
    return -tmp + Math.log((2.5066282746310005 * series) / x);
  }

  function logBeta(a, b) {
    return logGamma(a) + logGamma(b) - logGamma(a + b);
  }

  function betaContinuedFraction(a, b, x) {
    const maxIterations = 200;
    const epsilon = 3e-12;
    const tiny = 1e-300;
    const qab = a + b;
    const qap = a + 1;
    const qam = a - 1;
    let c = 1;
    let d = 1 - (qab * x) / qap;
    if (Math.abs(d) < tiny) d = tiny;
    d = 1 / d;
    let h = d;
    for (let m = 1; m <= maxIterations; m += 1) {
      const m2 = 2 * m;
      let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < tiny) d = tiny;
      c = 1 + aa / c;
      if (Math.abs(c) < tiny) c = tiny;
      d = 1 / d;
      h *= d * c;
      aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < tiny) d = tiny;
      c = 1 + aa / c;
      if (Math.abs(c) < tiny) c = tiny;
      d = 1 / d;
      const delta = d * c;
      h *= delta;
      if (Math.abs(delta - 1) < epsilon) break;
    }
    return h;
  }

  function incompleteBeta(a, b, x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    const factor = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    if (x < (a + 1) / (a + b + 2)) return (factor * betaContinuedFraction(a, b, x)) / a;
    return 1 - (factor * betaContinuedFraction(b, a, 1 - x)) / b;
  }

  function tCDF(t, df) {
    const x = df / (df + t * t);
    const probability = 0.5 * incompleteBeta(df / 2, 0.5, x);
    return t > 0 ? 1 - probability : probability;
  }

  function tPDF(t, df) {
    const constant = logGamma((df + 1) / 2) - logGamma(df / 2) - 0.5 * Math.log(df * Math.PI);
    return Math.exp(constant - ((df + 1) / 2) * Math.log(1 + (t * t) / df));
  }

  function tQuantile(probability, df) {
    let low = -40;
    let high = 40;
    for (let index = 0; index < 160; index += 1) {
      const mid = (low + high) / 2;
      if (tCDF(mid, df) < probability) low = mid;
      else high = mid;
    }
    return (low + high) / 2;
  }

  function fPDF(x, d1, d2) {
    if (x <= 0) return 0;
    const logValue = (d1 / 2) * Math.log(d1 / d2)
      + (d1 / 2 - 1) * Math.log(x)
      - ((d1 + d2) / 2) * Math.log(1 + (d1 * x) / d2)
      - logBeta(d1 / 2, d2 / 2);
    return Math.exp(logValue);
  }

  function fCDF(x, d1, d2) {
    if (x <= 0) return 0;
    return incompleteBeta(d1 / 2, d2 / 2, (d1 * x) / (d1 * x + d2));
  }

  function niceCeil(value) {
    const steps = [0.2, 0.3, 0.5, 0.8, 1, 1.5, 2, 3, 4, 5];
    return steps.find(step => step >= value) || Math.ceil(value);
  }

  function niceTicks(min, max, count = 5) {
    if (!(max > min)) return [min];
    const rawStep = (max - min) / Math.max(1, count - 1);
    const power = 10 ** Math.floor(Math.log10(rawStep));
    const normalized = rawStep / power;
    const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10;
    const step = factor * power;
    const ticks = [];
    for (let value = Math.ceil(min / step) * step; value <= max + step * 1e-9; value += step) {
      ticks.push(Number(value.toFixed(10)));
    }
    return ticks;
  }

  // ---------- Clase 1: curva de la SCR ----------

  function mountScr(body) {
    const DATA = [
      { x: 1.0, y: 1.9 }, { x: 1.7, y: 3.1 }, { x: 2.2, y: 2.4 },
      { x: 2.9, y: 3.8 }, { x: 3.5, y: 3.2 }, { x: 4.2, y: 4.9 },
      { x: 4.8, y: 4.3 }, { x: 5.5, y: 5.8 }, { x: 6.1, y: 5.1 },
      { x: 6.8, y: 6.4 }
    ];
    const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
    const meanX = mean(DATA.map(point => point.x));
    const meanY = mean(DATA.map(point => point.y));
    const sxx = DATA.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0);
    const sxy = DATA.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0);
    const sct = DATA.reduce((sum, point) => sum + (point.y - meanY) ** 2, 0);
    const b0 = meanY - (sxy / sxx) * meanX;
    const olsB1 = sxy / sxx;
    const domain = [-0.6, 2.6];
    const scrAt = b1 => DATA.reduce((sum, point) => sum + (point.y - (b0 + b1 * point.x)) ** 2, 0);
    const r2At = b1 => 1 - scrAt(b1) / sct;
    const maxScr = Math.max(scrAt(domain[0]), scrAt(domain[1]));

    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <label class="range-control">
          <span>Pendiente β₁ <output data-output="b1">—</output></span>
          <input type="range" min="-0.5" max="2.5" step="0.01" value="${olsB1.toFixed(2)}" aria-label="Pendiente de la recta">
        </label>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-legend">
        <span><i class="viz-swatch"></i> Curva SCR(β₁)</span>
        <span><i class="viz-swatch ochre"></i> Pendiente elegida</span>
        <span><i class="viz-swatch hollow"></i> Mínimo MCO</span>
      </div>
    `;

    const stage = body.querySelector(".viz-stage");
    const input = body.querySelector('input[type="range"]');
    const output = body.querySelector('[data-output="b1"]');
    const metrics = body.querySelector(".viz-metrics");

    function draw() {
      const b1 = Number(input.value);
      const chart = frame({
        w: 560, h: 260, l: 52, r: 18, t: 16, b: 34,
        xd: domain,
        yd: [0, maxScr * 1.06],
        xt: [0, 0.5, 1, 1.5, 2, 2.5],
        yt: niceTicks(0, maxScr * 1.06, 5),
        yfmt: value => fmt0(value),
        aria: "Curva de la suma de cuadrados residual en función de la pendiente"
      });

      const curve = [];
      for (let index = 0; index <= 160; index += 1) {
        const value = domain[0] + (index / 160) * (domain[1] - domain[0]);
        curve.push({ x: chart.sx(value), y: chart.sy(scrAt(value)) });
      }
      chart.svg.appendChild(make("path", { d: linePath(curve), class: "viz-line" }));

      chart.svg.appendChild(make("circle", {
        cx: chart.sx(olsB1), cy: chart.sy(scrAt(olsB1)), r: 4.5, class: "viz-dot-hollow"
      }));

      const currentScr = scrAt(b1);
      chart.svg.appendChild(make("line", {
        x1: chart.sx(b1), y1: chart.bottom, x2: chart.sx(b1), y2: chart.sy(currentScr), class: "viz-guide"
      }));
      chart.svg.appendChild(make("circle", {
        cx: chart.sx(b1), cy: chart.sy(currentScr), r: 5.2, class: "viz-dot-ochre"
      }));

      const nearOls = Math.abs(b1 - olsB1) < 0.015;
      if (nearOls) {
        chart.svg.appendChild(make("text", {
          x: chart.sx(olsB1) + 8, y: chart.sy(scrAt(olsB1)) - 9, class: "viz-text"
        }, "mínimo MCO"));
      }
      addAxisLabels(chart, "β₁", "SCR");
      stage.replaceChildren(chart.svg);

      output.textContent = fmt(b1);
      metrics.innerHTML = [
        metric("β̂₁ de MCO", fmt(olsB1)),
        metric("SCR", fmt(currentScr)),
        metric("R²", fmtPct(r2At(b1))),
        metric("Estado", nearOls ? "en el mínimo" : "fuera del mínimo", nearOls ? "is-good" : "is-warn")
      ].join("");
    }

    input.addEventListener("input", draw);
    draw();
  }

  // ---------- Clase 2A: sesgo por omisión ----------

  function mountOvb(body) {
    const TRUE_BETA = 1;
    const state = { gamma: 0.8, delta: 0.5 };

    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <label class="range-control">
          <span>Efecto de X₂ sobre Y (β₂) <output data-output="gamma">—</output></span>
          <input type="range" data-param="gamma" min="-2" max="2" step="0.1" value="0.8" aria-label="Efecto de la variable omitida sobre Y">
        </label>
        <label class="range-control">
          <span>Relación X₂–X₁ (δ₁) <output data-output="delta">—</output></span>
          <input type="range" data-param="delta" min="-1.5" max="1.5" step="0.1" value="0.5" aria-label="Relación entre la variable omitida y X uno">
        </label>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
    `;

    const stage = body.querySelector(".viz-stage");
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");
    const gammaInput = body.querySelector('[data-param="gamma"]');
    const deltaInput = body.querySelector('[data-param="delta"]');
    const gammaOutput = body.querySelector('[data-output="gamma"]');
    const deltaOutput = body.querySelector('[data-output="delta"]');

    function draw() {
      state.gamma = Number(gammaInput.value);
      state.delta = Number(deltaInput.value);
      const simple = TRUE_BETA + state.gamma * state.delta;
      const bias = simple - TRUE_BETA;
      const chart = frame({
        w: 560, h: 210, l: 152, r: 24, t: 18, b: 32,
        xd: [-2.5, 4.5],
        yd: [0, 1],
        xt: [-2, -1, 0, 1, 2, 3, 4],
        yt: [],
        aria: "Comparación entre la pendiente verdadera, la de la regresión simple y la de la regresión múltiple"
      });

      const rows = [
        { label: "β₁ verdadero", value: TRUE_BETA, y: 44, swatch: "hollow" },
        { label: "Simple (omite X₂)", value: simple, y: 104, swatch: "ochre" },
        { label: "Múltiple (incluye X₂)", value: TRUE_BETA, y: 164, swatch: "teal" }
      ];

      chart.svg.appendChild(make("line", {
        x1: chart.sx(0), y1: 20, x2: chart.sx(0), y2: chart.bottom - 6, class: "viz-zero"
      }));

      rows.forEach(row => {
        chart.svg.appendChild(make("text", {
          x: 8, y: row.y + 4, class: "viz-text"
        }, row.label));
        chart.svg.appendChild(make("line", {
          x1: chart.sx(0), y1: row.y, x2: chart.sx(row.value), y2: row.y,
          class: row.swatch === "ochre" ? "viz-line-2" : "viz-line"
        }));
        chart.svg.appendChild(make("circle", {
          cx: chart.sx(row.value), cy: row.y, r: 5.6,
          class: row.swatch === "teal" ? "viz-dot" : (row.swatch === "ochre" ? "viz-dot-ochre" : "viz-dot-hollow")
        }));
        chart.svg.appendChild(make("text", {
          x: chart.sx(row.value) + (row.value < 0 ? -10 : 10),
          y: row.y - 9,
          class: "viz-value",
          "text-anchor": row.value < 0 ? "end" : "start"
        }, fmt(row.value)));
      });

      const biasText = Math.abs(bias) < 0.005
        ? "sin sesgo: simple = múltiple"
        : `sesgo = β₂·δ₁ = ${fmtSigned(bias)}`;
      chart.svg.appendChild(make("text", {
        x: chart.w - chart.r, y: 28, class: Math.abs(bias) < 0.005 ? "viz-text-muted" : "viz-text",
        "text-anchor": "end"
      }, biasText));
      addAxisLabels(chart, "pendiente estimada", "");
      stage.replaceChildren(chart.svg);

      gammaOutput.textContent = fmtSigned(state.gamma, 1);
      deltaOutput.textContent = fmtSigned(state.delta, 1);
      metrics.innerHTML = [
        metric("β simple", fmt(simple)),
        metric("β múltiple", fmt(TRUE_BETA)),
        metric("sesgo", fmtSigned(bias)),
        metric("Dirección", Math.abs(bias) < 0.005 ? "sin sesgo" : (bias > 0 ? "hacia arriba" : "hacia abajo"), Math.abs(bias) < 0.005 ? "is-good" : "is-warn")
      ].join("");

      if (Math.abs(bias) < 0.005) {
        readout.innerHTML = "Con <b>β₂ = 0</b> o <b>δ₁ = 0</b> no hay sesgo por omisión: la regresión simple y la múltiple coinciden en valor esperado. La variable omitida no aporta, o no está correlacionada con X₁.";
      } else {
        const signos = state.gamma * state.delta > 0 ? "mismo signo" : "signos opuestos";
        readout.innerHTML = `El producto <b>β₂·δ₁ = ${fmtSigned(bias)}</b> tiene ${signos}. La regresión simple se aleja de la múltiple en esa magnitud: ${bias > 0 ? "sobreestima" : "subestima"} el efecto de X₁. La múltiple es la referencia porque incluye la variable relevante.`;
      }
    }

    gammaInput.addEventListener("input", draw);
    deltaInput.addEventListener("input", draw);
    draw();
  }

  // ---------- Clase 2B: FIV y precisión ----------

  function mountVif(body) {
    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <label class="range-control">
          <span>R²ⱼ de la regresión auxiliar <output data-output="r2">—</output></span>
          <input type="range" min="0" max="0.98" step="0.01" value="0.80" aria-label="Proporción de la variación de X j explicada por las demás variables">
        </label>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
    `;

    const stage = body.querySelector(".viz-stage");
    const input = body.querySelector('input[type="range"]');
    const output = body.querySelector('[data-output="r2"]');
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");

    function draw() {
      const r2 = Number(input.value);
      const vif = 1 / (1 - r2);
      const multiplier = Math.sqrt(vif);
      const top = frame({
        w: 560, h: 200, l: 46, r: 18, t: 16, b: 32,
        xd: [0, 1],
        yd: [0, 50],
        xt: [0, 0.2, 0.4, 0.6, 0.8, 1],
        yt: [0, 10, 20, 30, 40, 50],
        xfmt: value => fmtPct(value, 0),
        yfmt: value => fmt0(value),
        aria: "Curva del factor de inflación de la varianza en función del R cuadrado auxiliar"
      });

      [5, 10].forEach(threshold => {
        top.svg.appendChild(make("line", {
          x1: top.l, y1: top.sy(threshold), x2: top.w - top.r, y2: top.sy(threshold), class: "viz-guide"
        }));
        top.svg.appendChild(make("text", {
          x: top.l + 6, y: top.sy(threshold) - 5, class: "viz-text-muted"
        }, `FIV = ${threshold}`));
      });

      const curve = [];
      for (let index = 0; index <= 160; index += 1) {
        const value = (index / 160) * 0.98;
        curve.push({ x: top.sx(value), y: top.sy(Math.min(50, 1 / (1 - value))) });
      }
      top.svg.appendChild(make("path", { d: linePath(curve), class: "viz-line" }));
      top.svg.appendChild(make("circle", {
        cx: top.sx(r2), cy: top.sy(Math.min(50, vif)), r: 5.4, class: "viz-dot-ochre"
      }));
      top.svg.appendChild(make("line", {
        x1: top.sx(r2), y1: top.bottom, x2: top.sx(r2), y2: top.sy(Math.min(50, vif)), class: "viz-guide-ochre"
      }));
      addAxisLabels(top, "R²ⱼ", "FIV");

      const bars = make("svg", { viewBox: "0 0 560 128", class: "viz-svg", role: "img", "aria-label": "Comparación del ancho de los intervalos de confianza con y sin colinealidad" });
      const center = 338;
      const baseHalf = 52;
      const currentHalf = Math.min(206, baseHalf * multiplier);
      const rows = [
        { y: 34, half: baseHalf, klass: "viz-line", label: "Sin relación lineal (FIV = 1)" },
        { y: 86, half: currentHalf, klass: "viz-line-2", label: `Con R²ⱼ = ${fmtPct(r2, 0)} (FIV = ${fmt(vif, 1)})` }
      ];
      rows.forEach((row, index) => {
        bars.appendChild(make("line", {
          x1: center - row.half, y1: row.y, x2: center + row.half, y2: row.y,
          class: row.klass, "stroke-width": 6, "stroke-linecap": "round"
        }));
        bars.appendChild(make("line", { x1: center - row.half, y1: row.y - 8, x2: center - row.half, y2: row.y + 8, class: row.klass }));
        bars.appendChild(make("line", { x1: center + row.half, y1: row.y - 8, x2: center + row.half, y2: row.y + 8, class: row.klass }));
        bars.appendChild(make("circle", { cx: center, cy: row.y, r: 4, class: index === 0 ? "viz-dot" : "viz-dot-ochre" }));
        bars.appendChild(make("text", { x: 8, y: row.y + 3, class: "viz-text" }, row.label));
        bars.appendChild(make("text", {
          x: Math.min(552, center + row.half + 8), y: row.y + 3,
          class: "viz-text-muted", "text-anchor": row.half > 180 ? "end" : "start"
        }, index === 0 ? "×1,00" : `×${fmt(multiplier)}`));
      });
      bars.appendChild(make("text", { x: center, y: 122, class: "viz-tick", "text-anchor": "middle" }, "misma estimación puntual, distinto ancho del intervalo"));

      stage.replaceChildren(top.svg, bars);
      output.textContent = fmtPct(r2, 0);
      metrics.innerHTML = [
        metric("FIV", fmt(vif, 1)),
        metric("ee ×", fmt(multiplier)),
        metric("ancho del IC ×", fmt(multiplier)),
        metric("Diagnóstico", vif > 10 ? "señal alta" : (vif > 5 ? "señal moderada" : "baja"), vif > 10 ? "is-warn" : "is-good")
      ].join("");

      if (vif > 10) {
        readout.innerHTML = `Con <b>FIV = ${fmt(vif, 1)}</b>, cada error estándar se multiplica por <b>${fmt(multiplier)}</b> y el intervalo se ensancha en la misma proporción. La estimación sigue siendo insesgada, pero cuesta mucho más separar el efecto de este regresor del resto.`;
      } else if (vif > 5) {
        readout.innerHTML = `Con <b>FIV = ${fmt(vif, 1)}</b> el error estándar ya es <b>${fmt(multiplier)}</b> veces el de un regresor ortogonal. Es una señal para mirar la teoría y el tamaño de muestra, no una orden automática de eliminar la variable.`;
      } else {
        readout.innerHTML = `Con <b>FIV = ${fmt(vif, 1)}</b> la pérdida de precisión es moderada: el error estándar se multiplica por <b>${fmt(multiplier)}</b>. La multicolinealidad imperfecta no sesga; solo hace más ancho el intervalo.`;
      }
    }

    input.addEventListener("input", draw);
    draw();
  }

  // ---------- Clase 3A: distribución t, valor p y decisión ----------

  function mountTDist(body) {
    const state = { df: 28, t: 2.1, alpha: 0.05 };

    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <label class="range-control">
          <span>Grados de libertad <output data-output="df">—</output></span>
          <input type="range" data-param="df" min="3" max="200" step="1" value="28" aria-label="Grados de libertad">
        </label>
        <label class="range-control">
          <span>t observado <output data-output="t">—</output></span>
          <input type="range" data-param="t" min="-4" max="4" step="0.05" value="2.1" aria-label="Estadístico t observado">
        </label>
        <div class="viz-seg" data-alpha-group role="group" aria-label="Nivel de significación">
          <button type="button" data-alpha="0.10">α = 10%</button>
          <button type="button" data-alpha="0.05" class="active">α = 5%</button>
          <button type="button" data-alpha="0.01">α = 1%</button>
        </div>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
    `;

    const stage = body.querySelector(".viz-stage");
    const dfInput = body.querySelector('[data-param="df"]');
    const tInput = body.querySelector('[data-param="t"]');
    const dfOutput = body.querySelector('[data-output="df"]');
    const tOutput = body.querySelector('[data-output="t"]');
    const alphaGroup = body.querySelector("[data-alpha-group]");
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");

    alphaGroup.addEventListener("click", event => {
      const button = event.target.closest("[data-alpha]");
      if (!button) return;
      state.alpha = Number(button.dataset.alpha);
      setActive(alphaGroup, "data-alpha", button.dataset.alpha);
      draw();
    });

    function draw() {
      state.df = Number(dfInput.value);
      state.t = Number(tInput.value);
      const observed = Math.abs(state.t);
      const critical = tQuantile(1 - state.alpha / 2, state.df);
      const pValue = 2 * (1 - tCDF(observed, state.df));
      const chart = frame({
        w: 560, h: 260, l: 18, r: 18, t: 16, b: 30,
        xd: [-4.2, 4.2],
        yd: [0, 0.42],
        xt: [-4, -2, 0, 2, 4],
        yt: [0, 0.1, 0.2, 0.3, 0.4],
        yfmt: value => fmt(value, 1),
        aria: "Densidad t de Student con colas sombreadas según el estadístico observado"
      });

      const normal = [];
      const density = [];
      for (let index = 0; index <= 220; index += 1) {
        const x = -4.2 + (index / 220) * 8.4;
        normal.push({ x: chart.sx(x), y: chart.sy(Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)) });
        density.push({ x: chart.sx(x), y: chart.sy(tPDF(x, state.df)) });
      }
      chart.svg.appendChild(make("path", { d: linePath(normal), class: "viz-line-ghost" }));

      const tailPoints = (from, to) => {
        const points = [];
        const count = 80;
        for (let index = 0; index <= count; index += 1) {
          const x = from + (index / count) * (to - from);
          points.push({ x: chart.sx(x), y: chart.sy(tPDF(x, state.df)) });
        }
        return points;
      };
      if (observed < 4.15) {
        chart.svg.appendChild(make("path", {
          d: areaPath(tailPoints(-4.2, -observed), chart.sy(0)), class: "viz-tail"
        }));
        chart.svg.appendChild(make("path", {
          d: areaPath(tailPoints(observed, 4.2), chart.sy(0)), class: "viz-tail"
        }));
      }

      chart.svg.appendChild(make("path", { d: linePath(density), class: "viz-line" }));

      [-critical, critical].forEach(value => {
        if (value > -4.2 && value < 4.2) {
          chart.svg.appendChild(make("line", {
            x1: chart.sx(value), y1: chart.bottom, x2: chart.sx(value), y2: chart.t + 4, class: "viz-guide"
          }));
        }
      });
      if (Math.abs(state.t) < 4.2) {
        const anchorEnd = state.t < -3.2 || state.t > 3.2 || state.t < 0;
        chart.svg.appendChild(make("line", {
          x1: chart.sx(state.t), y1: chart.bottom, x2: chart.sx(state.t), y2: chart.t + 10, class: "viz-guide-ochre", "stroke-width": 1.6
        }));
        chart.svg.appendChild(make("text", {
          x: chart.sx(state.t) + (anchorEnd ? -6 : 6), y: chart.t + 10,
          class: "viz-text", "text-anchor": anchorEnd ? "end" : "start"
        }, `t = ${fmt(state.t)}`));
      }
      addAxisLabels(chart, "t", "densidad");
      stage.replaceChildren(chart.svg);

      dfOutput.textContent = fmt0(state.df);
      tOutput.textContent = fmt(state.t);
      metrics.innerHTML = [
        metric("t observado", fmt(state.t)),
        metric("gl", fmt0(state.df)),
        metric("t crítico", `±${fmt(critical)}`),
        metric("valor p", pValue < 0.0001 ? "< 0,0001" : fmt(pValue, 4)),
        metric("Decisión", pValue < state.alpha ? "se rechaza H₀" : "no se rechaza H₀", pValue < state.alpha ? "is-warn" : "is-good")
      ].join("");

      readout.innerHTML = pValue < state.alpha
        ? `El área sombreada es <b>${fmt(pValue, 4)}</b>, menor que α = ${fmtPct(state.alpha, 0)}. El t observado cae fuera de la zona central: hay evidencia suficiente para rechazar H₀ al nivel elegido.`
        : `El área sombreada es <b>${fmt(pValue, 4)}</b>, mayor o igual que α = ${fmtPct(state.alpha, 0)}. El t observado no está lo suficientemente lejos: no se rechaza H₀. No es lo mismo que afirmar que H₀ es verdadera.`;
    }

    dfInput.addEventListener("input", draw);
    tInput.addEventListener("input", draw);
    setActive(alphaGroup, "data-alpha", String(state.alpha));
    draw();
  }

  // ---------- Clase 3B: distribución F ----------

  function mountFDist(body) {
    const state = { q: 2, df: 60, f: 3.2 };

    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <div class="viz-seg" data-q-group role="group" aria-label="Número de restricciones">
          <button type="button" data-q="1">q = 1</button>
          <button type="button" data-q="2" class="active">q = 2</button>
          <button type="button" data-q="3">q = 3</button>
          <button type="button" data-q="4">q = 4</button>
        </div>
        <label class="range-control">
          <span>Grados de libertad del denominador <output data-output="df">—</output></span>
          <input type="range" data-param="df" min="5" max="200" step="1" value="60" aria-label="Grados de libertad del denominador">
        </label>
        <label class="range-control">
          <span>F observado <output data-output="f">—</output></span>
          <input type="range" data-param="f" min="0" max="10" step="0.1" value="3.2" aria-label="Estadístico F observado">
        </label>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
    `;

    const stage = body.querySelector(".viz-stage");
    const dfInput = body.querySelector('[data-param="df"]');
    const fInput = body.querySelector('[data-param="f"]');
    const dfOutput = body.querySelector('[data-output="df"]');
    const fOutput = body.querySelector('[data-output="f"]');
    const qGroup = body.querySelector("[data-q-group]");
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");

    qGroup.addEventListener("click", event => {
      const button = event.target.closest("[data-q]");
      if (!button) return;
      state.q = Number(button.dataset.q);
      setActive(qGroup, "data-q", button.dataset.q);
      draw();
    });

    function draw() {
      state.df = Number(dfInput.value);
      state.f = Number(fInput.value);
      const critical = (() => {
        let low = 0;
        let high = 40;
        for (let index = 0; index < 140; index += 1) {
          const mid = (low + high) / 2;
          if (fCDF(mid, state.q, state.df) < 0.95) low = mid;
          else high = mid;
        }
        return (low + high) / 2;
      })();
      const pValue = 1 - fCDF(state.f, state.q, state.df);
      const maxDensity = Math.max(
        fPDF(0.35, state.q, state.df),
        fPDF(1, state.q, state.df),
        fPDF(2, state.q, state.df),
        fPDF(3, state.q, state.df)
      );
      const yMax = niceCeil(maxDensity * 1.15);
      const chart = frame({
        w: 560, h: 250, l: 22, r: 18, t: 16, b: 32,
        xd: [0, 10],
        yd: [0, yMax],
        xt: [0, 2, 4, 6, 8, 10],
        yt: niceTicks(0, yMax, 5),
        yfmt: value => fmt(value, 1),
        aria: "Densidad F con la cola derecha sombreada según el estadístico observado"
      });

      const density = [];
      for (let index = 1; index <= 240; index += 1) {
        const x = (index / 240) * 10;
        density.push({ x: chart.sx(x), y: chart.sy(fPDF(x, state.q, state.df)) });
      }

      const tail = [];
      const tailStart = Math.min(10, Math.max(0.0001, state.f));
      for (let index = 0; index <= 120; index += 1) {
        const x = tailStart + (index / 120) * (10 - tailStart);
        tail.push({ x: chart.sx(x), y: chart.sy(fPDF(x, state.q, state.df)) });
      }
      if (state.f < 10) {
        chart.svg.appendChild(make("path", { d: areaPath(tail, chart.sy(0)), class: "viz-tail" }));
      }
      chart.svg.appendChild(make("path", { d: linePath(density), class: "viz-line" }));

      if (critical < 10) {
        const anchorEnd = critical > 7;
        chart.svg.appendChild(make("line", {
          x1: chart.sx(critical), y1: chart.bottom, x2: chart.sx(critical), y2: chart.t + 4, class: "viz-guide"
        }));
        chart.svg.appendChild(make("text", {
          x: chart.sx(critical) + (anchorEnd ? -5 : 5), y: chart.t + 10,
          class: "viz-text-muted", "text-anchor": anchorEnd ? "end" : "start"
        }, `F crítico = ${fmt(critical)}`));
      }
      if (state.f < 10) {
        chart.svg.appendChild(make("line", {
          x1: chart.sx(state.f), y1: chart.bottom, x2: chart.sx(state.f), y2: chart.t + 10, class: "viz-guide-ochre", "stroke-width": 1.6
        }));
      }
      addAxisLabels(chart, "F", "densidad");
      stage.replaceChildren(chart.svg);

      dfOutput.textContent = fmt0(state.df);
      fOutput.textContent = fmt(state.f, 1);
      const deltaR2 = (critical * state.q * 0.6) / state.df;
      metrics.innerHTML = [
        metric("q", fmt0(state.q)),
        metric("gl denominador", fmt0(state.df)),
        metric("F crítico (5%)", fmt(critical)),
        metric("valor p", pValue < 0.0001 ? "< 0,0001" : fmt(pValue, 4)),
        metric("Decisión", pValue < 0.05 ? "se rechaza H₀" : "no se rechaza H₀", pValue < 0.05 ? "is-warn" : "is-good")
      ].join("");

      readout.innerHTML = pValue < 0.05
        ? `El F observado deja <b>${fmt(pValue, 4)}</b> de probabilidad en la cola derecha. Se rechaza H₀ al 5%: el grupo de restricciones aporta en conjunto. Ojo: eso no dice cuál de las restricciones falla.`
        : `El F observado deja <b>${fmt(pValue, 4)}</b> de probabilidad en la cola derecha. No se rechaza H₀ al 5%. Con q = ${state.q} y ${fmt0(state.df)} grados de libertad, un R² no restringido de 0,40 necesitaría sumar al menos <b>${fmt(deltaR2, 3)}</b> al imponer las restricciones para rechazar.`;
    }

    dfInput.addEventListener("input", draw);
    fInput.addEventListener("input", draw);
    setActive(qGroup, "data-q", String(state.q));
    draw();
  }

  // ---------- Clase 4A: familia de formas funcionales ----------

  const FORMS = {
    lin: {
      label: "Niveles",
      b1: { min: -2, max: 6, step: 0.1, value: 3, label: "Pendiente β₁" },
      fn: (x, b1) => 100 + b1 * (x - 10),
      slope: (x, b1) => b1,
      equation: (b1) => `Ŷ = 100 ${b1 >= 0 ? "+" : "−"} ${fmt(Math.abs(b1), 1)}·(X − 10)`,
      interpretation: (b1) => `Cada unidad adicional de X se asocia con <b>${fmtSigned(b1, 1)}</b> unidades de Y, en todo el rango. El efecto marginal no depende de X.`
    },
    loglog: {
      label: "log-log",
      b1: { min: 0.1, max: 1.6, step: 0.05, value: 0.7, label: "Elasticidad β₁" },
      fn: (x, b1) => 100 * Math.pow(x / 10, b1),
      slope: (x, b1) => (b1 * 100 * Math.pow(x / 10, b1)) / x,
      equation: (b1) => `Ŷ = 100·(X / 10)<sup>${fmt(b1, 2)}</sup>`,
      interpretation: (b1) => `La elasticidad es constante: 1% más de X se asocia con <b>${fmt(b1, 2)}%</b> más de Y, en cualquier punto del rango.`
    },
    loglin: {
      label: "log-lin",
      b1: { min: -0.06, max: 0.06, step: 0.005, value: 0.03, label: "Semi-elasticidad β₁" },
      fn: (x, b1) => 100 * Math.exp(b1 * (x - 10)),
      slope: (x, b1) => 100 * b1 * Math.exp(b1 * (x - 10)),
      equation: (b1) => `Ŷ = 100·exp(${b1 < 0 ? "−" : ""}${fmt(Math.abs(b1), 3)}·(X − 10))`,
      interpretation: (b1) => `Una unidad más de X se asocia con <b>${fmtSignedPct(b1, 1)}</b> de Y en la aproximación; el cambio exacto es ${fmtSignedPct(Math.exp(b1) - 1, 2)}.`
    },
    linlog: {
      label: "lin-log",
      b1: { min: -20, max: 60, step: 2, value: 30, label: "Coeficiente β₁" },
      fn: (x, b1) => 100 + b1 * Math.log(x / 10),
      slope: (x, b1) => b1 / x,
      equation: (b1) => `Ŷ = 100 ${b1 >= 0 ? "+" : "−"} ${fmt(Math.abs(b1), 0)}·ln(X / 10)`,
      interpretation: (b1) => `Un 1% más de X se asocia con <b>${fmtSigned(b1 / 100, 2)}</b> unidades de Y. El efecto en unidades es cada vez más chico a medida que X crece.`
    },
    quad: {
      label: "Cuadrática",
      b1: { min: -2, max: 6, step: 0.1, value: 4, label: "Coeficiente lineal β₁" },
      b2: { min: -0.2, max: 0.2, step: 0.01, value: -0.1, label: "Curvatura β₂" },
      fn: (x, b1, b2) => 100 + b1 * (x - 10) + b2 * (x - 10) ** 2,
      slope: (x, b1, b2) => b1 + 2 * b2 * (x - 10),
      equation: (b1, b2) => `Ŷ = 100 ${b1 >= 0 ? "+" : "−"} ${fmt(Math.abs(b1), 1)}·(X − 10) ${b2 >= 0 ? "+" : "−"} ${fmt(Math.abs(b2), 2)}·(X − 10)<sup>2</sup>`,
      interpretation: (b1, b2) => `El efecto marginal es <b>${fmt(b1, 1)} + 2·(${fmt(b2, 2)})·(X − 10)</b>: cambia con X y se anula en el vértice. No es constante.`
    }
  };

  function mountForms(body) {
    const state = { form: "lin", b1: 3, b2: -0.1, x0: 20 };

    body.innerHTML = `
      <div class="viz-seg" data-form-group role="group" aria-label="Forma funcional">
        ${Object.entries(FORMS).map(([key, form]) => `<button type="button" data-form="${key}" class="${key === "lin" ? "active" : ""}">${form.label}</button>`).join("")}
      </div>
      <div class="viz-eq"></div>
      <div class="viz-stage"></div>
      <div class="viz-controls"></div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
      <div class="viz-legend">
        <span><i class="viz-swatch"></i> Curva estimada</span>
        <span><i class="viz-swatch ochre"></i> Tangente en X₀</span>
      </div>
    `;

    const formGroup = body.querySelector("[data-form-group]");
    const stage = body.querySelector(".viz-stage");
    const controls = body.querySelector(".viz-controls");
    const equation = body.querySelector(".viz-eq");
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");

    function currentForm() {
      return FORMS[state.form];
    }

    function buildControls() {
      const form = currentForm();
      const b1 = form.b1;
      const b2 = form.b2;
      controls.innerHTML = `
        <label class="range-control">
          <span>${b1.label} <output data-output="b1">—</output></span>
          <input type="range" data-param="b1" min="${b1.min}" max="${b1.max}" step="${b1.step}" value="${state.b1}" aria-label="${b1.label}">
        </label>
        ${b2 ? `
          <label class="range-control">
            <span>${b2.label} <output data-output="b2">—</output></span>
            <input type="range" data-param="b2" min="${b2.min}" max="${b2.max}" step="${b2.step}" value="${state.b2}" aria-label="${b2.label}">
          </label>
        ` : ""}
        <label class="range-control">
          <span>Punto de evaluación X₀ <output data-output="x0">—</output></span>
          <input type="range" data-param="x0" min="6" max="49" step="1" value="${state.x0}" aria-label="Punto de evaluación X cero">
        </label>
      `;
      controls.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
          state[input.dataset.param] = Number(input.value);
          draw();
        });
      });
    }

    formGroup.addEventListener("click", event => {
      const button = event.target.closest("[data-form]");
      if (!button || button.dataset.form === state.form) return;
      state.form = button.dataset.form;
      state.b1 = FORMS[state.form].b1.value;
      state.b2 = FORMS[state.form].b2 ? FORMS[state.form].b2.value : 0;
      setActive(formGroup, "data-form", state.form);
      buildControls();
      draw();
    });

    function draw() {
      const form = currentForm();
      const { b1, b2, x0 } = state;
      const yAt = x => form.fn(x, b1, b2);
      const slopeAt = x => form.slope(x, b1, b2);
      const y0 = yAt(x0);
      const slope = slopeAt(x0);
      const elasticity = y0 > 0 ? (slope * x0) / y0 : NaN;
      const xs = [];
      const ys = [];
      for (let index = 0; index <= 180; index += 1) {
        const x = 5 + (index / 180) * 45;
        xs.push(x);
        ys.push(yAt(x));
      }
      const rawMin = Math.min(...ys);
      const rawMax = Math.max(...ys);
      const yMin = Math.min(0, rawMin);
      const span = Math.max(1, rawMax - yMin);
      const yMax = yMin + span * 1.08;
      const chart = frame({
        w: 560, h: 300, l: 52, r: 18, t: 18, b: 36,
        xd: [5, 50],
        yd: [yMin, yMax],
        xt: [5, 10, 20, 30, 40, 50],
        yt: niceTicks(yMin, yMin + span * 1.08, 5),
        yfmt: value => fmt0(value),
        aria: "Curva de la forma funcional elegida con tangente en el punto de evaluación"
      });

      const curve = xs.map((x, index) => ({ x: chart.sx(x), y: chart.sy(ys[index]) }));
      chart.svg.appendChild(make("path", { d: linePath(curve), class: "viz-line" }));

      const xa = Math.max(5, x0 - 7);
      const xb = Math.min(50, x0 + 7);
      chart.svg.appendChild(make("line", {
        x1: chart.sx(xa), y1: chart.sy(y0 + slope * (xa - x0)),
        x2: chart.sx(xb), y2: chart.sy(y0 + slope * (xb - x0)),
        class: "viz-line-tangent"
      }));
      chart.svg.appendChild(make("line", {
        x1: chart.sx(x0), y1: chart.bottom, x2: chart.sx(x0), y2: chart.sy(y0), class: "viz-guide"
      }));
      chart.svg.appendChild(make("circle", { cx: chart.sx(x0), cy: chart.sy(y0), r: 5.4, class: "viz-dot-ochre" }));
      chart.svg.appendChild(make("text", {
        x: chart.sx(x0) + (x0 > 40 ? -8 : 8), y: chart.sy(y0) - 10,
        class: "viz-value", "text-anchor": x0 > 40 ? "end" : "start"
      }, `Ŷ = ${fmt0(y0)}`));

      if (state.form === "quad" && Math.abs(b2) > 0.0001) {
        const vertex = 10 - b1 / (2 * b2);
        if (vertex >= 5 && vertex <= 50) {
          chart.svg.appendChild(make("circle", {
            cx: chart.sx(vertex), cy: chart.sy(yAt(vertex)), r: 4.5, class: "viz-dot-hollow"
          }));
          chart.svg.appendChild(make("text", {
            x: chart.sx(vertex), y: chart.sy(yAt(vertex)) - 9, class: "viz-text-muted", "text-anchor": "middle"
          }, `X* = ${fmt(vertex, 1)}`));
        }
      }
      addAxisLabels(chart, "X", "Y");
      stage.replaceChildren(chart.svg);

      equation.innerHTML = form.equation(b1, b2);
      const outputs = controls.querySelectorAll("output");
      outputs.forEach(output => {
        const param = output.closest("label").querySelector("input").dataset.param;
        if (param === "x0") output.textContent = fmt0(x0);
        else if (param === "b2") output.textContent = fmt(b2, 2);
        else output.textContent = fmt(b1, state.form === "loglin" ? 3 : 2);
      });

      metrics.innerHTML = [
        metric("Y en X₀", fmt(y0)),
        metric("Efecto marginal", fmtSigned(slope)),
        metric("Elasticidad en X₀", Number.isFinite(elasticity) ? fmt(elasticity) : "—")
      ].join("");
      readout.innerHTML = form.interpretation(b1, b2);
    }

    buildControls();
    setActive(formGroup, "data-form", state.form);
    draw();
  }

  // ---------- Clase 4A: cuadrática y efecto marginal ----------

  function mountQuadratic(body) {
    const state = { b1: 10, b2: -0.5, x0: 4 };

    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <label class="range-control">
          <span>Coeficiente lineal β₁ <output data-output="b1">—</output></span>
          <input type="range" data-param="b1" min="-5" max="15" step="0.5" value="10" aria-label="Coeficiente lineal">
        </label>
        <label class="range-control">
          <span>Curvatura β₂ <output data-output="b2">—</output></span>
          <input type="range" data-param="b2" min="-1" max="1" step="0.05" value="-0.5" aria-label="Coeficiente cuadrático">
        </label>
        <label class="range-control">
          <span>Punto de evaluación X₀ <output data-output="x0">—</output></span>
          <input type="range" data-param="x0" min="0" max="20" step="0.5" value="4" aria-label="Punto de evaluación X cero">
        </label>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
      <div class="viz-legend">
        <span><i class="viz-swatch"></i> Ŷ = 50 + β₁X + β₂X²</span>
        <span><i class="viz-swatch ochre"></i> Efecto marginal β₁ + 2β₂X</span>
      </div>
    `;

    const stage = body.querySelector(".viz-stage");
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");
    const inputs = body.querySelectorAll("input[type='range']");
    const outputs = {
      b1: body.querySelector('[data-output="b1"]'),
      b2: body.querySelector('[data-output="b2"]'),
      x0: body.querySelector('[data-output="x0"]')
    };

    function draw() {
      const { b1, b2, x0 } = state;
      const base = 50;
      const yAt = x => base + b1 * x + b2 * x * x;
      const slopeAt = x => b1 + 2 * b2 * x;
      const ys = Array.from({ length: 161 }, (_, index) => yAt((index / 160) * 20));
      const yMin = Math.min(0, ...ys);
      const yMax = Math.max(...ys);
      const span = Math.max(1, yMax - yMin);
      const topChart = frame({
        w: 560, h: 210, l: 50, r: 18, t: 16, b: 30,
        xd: [0, 20],
        yd: [yMin, yMin + span * 1.1],
        xt: [0, 5, 10, 15, 20],
        yt: niceTicks(yMin, yMin + span * 1.1, 5),
        yfmt: value => fmt0(value),
        aria: "Parábola estimada y punto de evaluación"
      });
      const curve = [];
      for (let index = 0; index <= 160; index += 1) {
        const x = (index / 160) * 20;
        curve.push({ x: topChart.sx(x), y: topChart.sy(yAt(x)) });
      }
      topChart.svg.appendChild(make("path", { d: linePath(curve), class: "viz-line" }));
      topChart.svg.appendChild(make("line", {
        x1: topChart.sx(x0), y1: topChart.bottom, x2: topChart.sx(x0), y2: topChart.sy(yAt(x0)), class: "viz-guide"
      }));
      topChart.svg.appendChild(make("circle", { cx: topChart.sx(x0), cy: topChart.sy(yAt(x0)), r: 5.2, class: "viz-dot-ochre" }));
      const vertex = Math.abs(b2) > 0.0001 ? -b1 / (2 * b2) : NaN;
      if (Number.isFinite(vertex) && vertex >= 0 && vertex <= 20) {
        const vertexY = topChart.sy(yAt(vertex));
        topChart.svg.appendChild(make("circle", { cx: topChart.sx(vertex), cy: vertexY, r: 4.5, class: "viz-dot-hollow" }));
        topChart.svg.appendChild(make("text", {
          x: clamp(topChart.sx(vertex), topChart.l + 28, topChart.w - topChart.r - 28),
          y: b2 < 0 ? vertexY + 16 : vertexY - 9,
          class: "viz-text", "text-anchor": "middle"
        }, `X* = ${fmt(vertex, 1)}`));
      }
      addAxisLabels(topChart, "X", "Y");

      const slopes = Array.from({ length: 161 }, (_, index) => slopeAt((index / 160) * 20));
      const mMin = Math.min(0, ...slopes);
      const mMax = Math.max(0, ...slopes);
      const mSpan = Math.max(1, mMax - mMin);
      const bottomChart = frame({
        w: 560, h: 170, l: 50, r: 18, t: 16, b: 30,
        xd: [0, 20],
        yd: [mMin - mSpan * 0.08, mMax + mSpan * 0.08],
        xt: [0, 5, 10, 15, 20],
        yt: niceTicks(mMin - mSpan * 0.08, mMax + mSpan * 0.08, 4),
        yfmt: value => fmt0(value),
        aria: "Efecto marginal de X en cada nivel de X"
      });
      const marginal = [];
      for (let index = 0; index <= 160; index += 1) {
        const x = (index / 160) * 20;
        marginal.push({ x: bottomChart.sx(x), y: bottomChart.sy(slopeAt(x)) });
      }
      bottomChart.svg.appendChild(make("line", { x1: bottomChart.l, y1: bottomChart.sy(0), x2: bottomChart.w - bottomChart.r, y2: bottomChart.sy(0), class: "viz-zero" }));
      bottomChart.svg.appendChild(make("path", { d: linePath(marginal), class: "viz-line-2" }));
      bottomChart.svg.appendChild(make("line", {
        x1: bottomChart.sx(x0), y1: bottomChart.bottom, x2: bottomChart.sx(x0), y2: bottomChart.sy(slopeAt(x0)), class: "viz-guide"
      }));
      bottomChart.svg.appendChild(make("circle", { cx: bottomChart.sx(x0), cy: bottomChart.sy(slopeAt(x0)), r: 5, class: "viz-dot-ochre" }));
      addAxisLabels(bottomChart, "X", "efecto marginal");

      stage.replaceChildren(topChart.svg, bottomChart.svg);
      outputs.b1.textContent = fmtSigned(b1, 1);
      outputs.b2.textContent = fmtSigned(b2, 2);
      outputs.x0.textContent = fmt(x0, 1);

      const effect = slopeAt(x0);
      const shape = Math.abs(b2) < 0.0001 ? "lineal" : (b2 < 0 ? "máximo" : "mínimo");
      metrics.innerHTML = [
        metric("Efecto en X₀", fmtSigned(effect)),
        metric("Vértice X*", Number.isFinite(vertex) ? fmt(vertex, 2) : "—"),
        metric("Forma", shape)
      ].join("");

      const vertexText = Number.isFinite(vertex)
        ? `El vértice está en <b>X* = −β₁/(2β₂) = ${fmt(vertex, 2)}</b>. `
        : "Con β₂ = 0 no hay curvatura: el modelo vuelve a ser lineal. ";
      const rangeText = Number.isFinite(vertex) && (vertex < 0 || vertex > 20)
        ? "Ese punto de giro cae fuera del rango dibujado: interpretarlo sería extrapolar. "
        : "";
      readout.innerHTML = `${vertexText}En X₀ = ${fmt(x0, 1)} el efecto marginal es <b>${fmtSigned(effect)}</b>. ${effect > 0 ? "La función todavía crece en ese punto." : (effect < 0 ? "La función ya decrece en ese punto." : "La función está en su punto de giro.")} ${rangeText}β₁ por sí solo es la pendiente en X = 0.`;
    }

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        state[input.dataset.param] = Number(input.value);
        draw();
      });
    });
    draw();
  }

  // ---------- Clase 4B: intervalos de predicción ----------

  function mountPrediction(body) {
    const DATA = Array.from({ length: 28 }, (_, index) => {
      const x = 2 + index * 0.6;
      const y = 40 + 3 * x + 4.5 * Math.sin(index * 1.3) + 2 * Math.cos(index * 0.7);
      return { x, y };
    });
    const n = DATA.length;
    const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
    const meanX = mean(DATA.map(point => point.x));
    const meanY = mean(DATA.map(point => point.y));
    const sxx = DATA.reduce((sum, point) => sum + (point.x - meanX) ** 2, 0);
    const sxy = DATA.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0);
    const b1 = sxy / sxx;
    const b0 = meanY - b1 * meanX;
    const residuals = DATA.map(point => point.y - (b0 + b1 * point.x));
    const sigma = Math.sqrt(residuals.reduce((sum, value) => sum + value * value, 0) / (n - 2));
    const state = { x0: 15, conf: 0.95, showMean: true, showIndividual: true };

    body.innerHTML = `
      <div class="viz-stage"></div>
      <div class="viz-controls">
        <label class="range-control">
          <span>Punto de predicción X₀ <output data-output="x0">—</output></span>
          <input type="range" data-param="x0" min="1" max="20" step="0.25" value="15" aria-label="Punto de predicción X cero">
        </label>
        <div class="viz-seg" data-conf-group role="group" aria-label="Nivel de confianza">
          <button type="button" data-conf="0.80">80%</button>
          <button type="button" data-conf="0.90">90%</button>
          <button type="button" data-conf="0.95" class="active">95%</button>
        </div>
        <div class="viz-checks">
          <label class="check-control"><input type="checkbox" data-show="mean" checked> Banda promedio</label>
          <label class="check-control"><input type="checkbox" data-show="individual" checked> Banda individual</label>
        </div>
      </div>
      <div class="viz-metrics" aria-live="polite"></div>
      <div class="viz-readout"></div>
      <div class="viz-legend">
        <span><i class="viz-swatch"></i> Media condicional</span>
        <span><i class="viz-swatch ochre"></i> Nueva observación</span>
      </div>
    `;

    const stage = body.querySelector(".viz-stage");
    const metrics = body.querySelector(".viz-metrics");
    const readout = body.querySelector(".viz-readout");
    const x0Input = body.querySelector('[data-param="x0"]');
    const x0Output = body.querySelector('[data-output="x0"]');
    const confGroup = body.querySelector("[data-conf-group]");
    const checks = body.querySelectorAll("[data-show]");

    confGroup.addEventListener("click", event => {
      const button = event.target.closest("[data-conf]");
      if (!button) return;
      state.conf = Number(button.dataset.conf);
      setActive(confGroup, "data-conf", button.dataset.conf);
      draw();
    });
    checks.forEach(check => {
      check.addEventListener("change", () => {
        state[check.dataset.show === "mean" ? "showMean" : "showIndividual"] = check.checked;
        draw();
      });
    });
    x0Input.addEventListener("input", () => {
      state.x0 = Number(x0Input.value);
      draw();
    });

    setActive(confGroup, "data-conf", String(state.conf));

    function draw() {
      const { x0, conf } = state;
      const tCritical = tQuantile(1 - (1 - conf) / 2, n - 2);
      const yhat = x => b0 + b1 * x;
      const seMean = x => sigma * Math.sqrt(1 / n + (x - meanX) ** 2 / sxx);
      const seIndividual = x => sigma * Math.sqrt(1 + 1 / n + (x - meanX) ** 2 / sxx);
      const lowerMean = x => yhat(x) - tCritical * seMean(x);
      const upperMean = x => yhat(x) + tCritical * seMean(x);
      const lowerIndividual = x => yhat(x) - tCritical * seIndividual(x);
      const upperIndividual = x => yhat(x) + tCritical * seIndividual(x);

      const edgeX = [1, 20];
      const allY = [
        ...DATA.map(point => point.y),
        ...edgeX.map(lowerIndividual),
        ...edgeX.map(upperIndividual)
      ];
      const yMin = Math.min(...allY);
      const yMax = Math.max(...allY);
      const span = Math.max(1, yMax - yMin);
      const chart = frame({
        w: 560, h: 330, l: 52, r: 18, t: 18, b: 34,
        xd: [1, 20],
        yd: [yMin - span * 0.04, yMax + span * 0.04],
        xt: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        yt: niceTicks(yMin - span * 0.04, yMax + span * 0.04, 5),
        yfmt: value => fmt0(value),
        aria: "Recta estimada con banda de confianza para la media y banda de predicción individual"
      });

      const grid = [];
      for (let index = 0; index <= 160; index += 1) grid.push(1 + (index / 160) * 19);

      if (state.showIndividual) {
        const upper = grid.map(x => ({ x: chart.sx(x), y: chart.sy(upperIndividual(x)) }));
        const lower = grid.map(x => ({ x: chart.sx(x), y: chart.sy(lowerIndividual(x)) })).reverse();
        chart.svg.appendChild(make("path", {
          d: `${linePath(upper)} L${lower[0].x.toFixed(2)},${lower[0].y.toFixed(2)} ${lower.slice(1).map(point => `L${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ")} Z`,
          class: "viz-area-ochre"
        }));
      }
      if (state.showMean) {
        const upper = grid.map(x => ({ x: chart.sx(x), y: chart.sy(upperMean(x)) }));
        const lower = grid.map(x => ({ x: chart.sx(x), y: chart.sy(lowerMean(x)) })).reverse();
        chart.svg.appendChild(make("path", {
          d: `${linePath(upper)} L${lower[0].x.toFixed(2)},${lower[0].y.toFixed(2)} ${lower.slice(1).map(point => `L${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ")} Z`,
          class: "viz-area"
        }));
      }

      chart.svg.appendChild(make("line", {
        x1: chart.sx(1), y1: chart.sy(yhat(1)), x2: chart.sx(20), y2: chart.sy(yhat(20)), class: "viz-line"
      }));
      DATA.forEach(point => {
        chart.svg.appendChild(make("circle", {
          cx: chart.sx(point.x), cy: chart.sy(point.y), r: 3.6, class: "viz-dot"
        }));
      });

      chart.svg.appendChild(make("line", {
        x1: chart.sx(x0), y1: chart.top, x2: chart.sx(x0), y2: chart.bottom, class: "viz-guide"
      }));
      const xPixels = chart.sx(x0);
      const drawInterval = (low, high, klass, offset) => {
        chart.svg.appendChild(make("line", {
          x1: xPixels + offset, y1: chart.sy(low), x2: xPixels + offset, y2: chart.sy(high),
          class: klass, "stroke-width": 5, "stroke-linecap": "round"
        }));
        [low, high].forEach(value => {
          chart.svg.appendChild(make("line", {
            x1: xPixels + offset - 6, y1: chart.sy(value), x2: xPixels + offset + 6, y2: chart.sy(value),
            class: klass, "stroke-width": 2
          }));
        });
      };
      if (state.showIndividual) drawInterval(lowerIndividual(x0), upperIndividual(x0), "viz-line-2", 5);
      if (state.showMean) drawInterval(lowerMean(x0), upperMean(x0), "viz-line", -5);
      chart.svg.appendChild(make("circle", { cx: xPixels, cy: chart.sy(yhat(x0)), r: 5.2, class: "viz-dot-ochre" }));
      addAxisLabels(chart, "X", "Y");
      stage.replaceChildren(chart.svg);

      x0Output.textContent = fmt(x0, 2);
      const meanLow = lowerMean(x0);
      const meanHigh = upperMean(x0);
      const indLow = lowerIndividual(x0);
      const indHigh = upperIndividual(x0);
      const ratio = (indHigh - indLow) / (meanHigh - meanLow);
      metrics.innerHTML = [
        metric("Ŷ₀", fmt(yhat(x0))),
        metric("IC media", `[${fmt(meanLow)}, ${fmt(meanHigh)}]`),
        metric("IC individual", `[${fmt(indLow)}, ${fmt(indHigh)}]`),
        metric("ancho individual / promedio", `×${fmt(ratio, 1)}`)
      ].join("");

      readout.innerHTML = `Con ${fmtPct(conf, 0)} de confianza, la media de la subpoblación con X = ${fmt(x0, 2)} se predice entre <b>${fmt(meanLow)}</b> y <b>${fmt(meanHigh)}</b>; una unidad concreta, entre <b>${fmt(indLow)}</b> y <b>${fmt(indHigh)}</b>. El intervalo individual es <b>${fmt(ratio, 1)} veces</b> más ancho. La diferencia no desaparece al aumentar n: siempre queda la varianza del error de la nueva observación.${x0 < 2 || x0 > 18.2 ? " <b>Estás fuera del rango observado de X:</b> la fórmula se puede evaluar, pero la predicción es una extrapolación." : ""}`;
    }

    draw();
  }

  window.ECO_VIZ = {
    mounts: {
      "ols-scr": mountScr,
      "ovb": mountOvb,
      "vif": mountVif,
      "t-dist": mountTDist,
      "f-dist": mountFDist,
      "forms": mountForms,
      "quadratic": mountQuadratic,
      "prediction": mountPrediction
    }
  };
})();
