# Brief de contenido — clases 4 a 10

Este documento es la especificación de trabajo para producir las clases que faltan.
La fuente de verdad del formato es `assets/app.js`; la referencia de calidad y tono
son `content/clase-03a.js` y `content/clase-03b.js`.

## Regla de oro: un archivo por sesión

- Cada sesión escribe **un solo archivo** `content/clase-0X.js` (o `clase-0Xa.js` /
  `clase-0Xb.js` si la clase se parte).
- La sesión **no** edita `content/indice.js`, `index.html`, `assets/*`, `guia/*`,
  `README.md`, `HANDOFF.md` ni archivos de otras clases.
- La integración (índice, scripts, versión de caché, pruebas) la hace el coordinador.
- No ejecutar `git`, `vercel` ni comandos que modifiquen el repositorio.
- No copiar texto de los PDFs: se sintetiza, se explica y se cita la fuente.
- No incluir PDFs, imágenes del libro ni soluciones de parciales en el repo.

## Estado de partida

- Clases 1, 2A, 2B, 3A y 3B están completas.
- Clases 4 a 10 están pendientes.
- La clase 3 se partió en 3A (inferencia sobre un parámetro) y 3B (restricciones,
  F y propiedades asintóticas). Por el mismo criterio, la clase 4 se parte en:
  - **4A:** especificación I — escala, coeficientes beta, formas funcionales,
    logaritmos y cuadráticas (diapositivas 3–19).
  - **4B:** especificación II y predicción — selección de modelos, RESET, sesgos
    de especificación y predicción promedio/individual (diapositivas 20–34).
- Clases 5 a 10: un archivo por clase, salvo que el contenido exceda ~1.000 líneas.

## Fuentes

Texto extraído de los PDFs (para lectura, no para copiar):

- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 4 Eco I - Especificación del modelo y predicción.txt`
- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 5 Eco I - Variables ficticias.txt`
- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 6 Eco I - Heterocedasticidad.txt`
- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 7 Eco I - Regresión con series de tiempo.txt`
- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 8 Eco I - Autocorrelación.txt`
- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 9 Eco I - Endogeneidad.txt`
- `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Clase 10 Eco I - Estimación por MC2E.txt`
- Parciales: `C:\Users\sdcec\AppData\Local\Temp\opencode\fuentes-txt\Solución*.txt`

Guía de TP (HTML completo, legible):

- `guia/Guía-TP-Eco-I-2026.html`

Anclas profundas: el patrón es `#trabajo-práctico-nº-N`, `#actividad-nº-1-(N-1)`
y `#ejercicio-nº-K-(N-1)`. Por ejemplo, TP 6 → `#actividad-nº-1-5`,
`#ejercicio-nº-1-5`; TP 7 → `#actividad-nº-1-6`, `#ejercicio-nº-1-6`.
Verificar siempre el ancla exacta en el HTML antes de usarla.

Referencia de formato y tono:

- `content/clase-03a.js` y `content/clase-03b.js` (partes autocontenidas).
- `content/clase-01.js` (bloques `chart`, solo clase 1; no reutilizar).

## Estructura del archivo

```js
window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-04a"] = {
  id: "clase-04a",
  num: "04A",
  eyebrow: "Clase 04A · Especificación I",
  title: "…",
  lead: "…",
  question: "…",
  pills: ["17 diapositivas", "TP 6", "1P/2P 2024–2026", "7 conceptos clave"],

  sections: [ /* 6 a 8 secciones */ ],
  concepts: { /* 6 a 9 conceptos */ },
  practice: { /* … */ },
  assessment: { /* 10 a 13 preguntas */ },
  review: { /* … */ },
  sources: { /* 4 a 6 fuentes */ }
};
```

## Secciones y bloques

Cada sección:

```js
{
  id: "c04a-s01",
  number: "01",
  title: "…",
  blocks: [ /* 5 a 9 bloques */ ]
}
```

Tipos de bloque disponibles y sus campos:

- `p`: `{ type: "p", id: "c04a-s01-p01", html: "…" }`
- `formula`: `{ type: "formula", main: "…", legend: [{ key, text }] }`
- `cards`: `{ type: "cards", items: [{ sym, title, text }] }` (2–4 ítems)
- `callout`: `{ type: "callout", variant: "ochre" | "teal", label, html }`
- `compare`: `{ type: "compare", left: { tag, title, text, eq }, right: { … } }`
- `assumptions`: `{ type: "assumptions", rows: [{ title, text }] }`
- `miniCheck`: `{ type: "miniCheck", id: "c04a-check-01", question, intro, answer }`
- `errorTable`: `{ type: "errorTable", rows: [{ error, why, fix }] }`
- `map`: `{ type: "map", steps: [{ n, title, text }] }`
- `sourceStrip`: `{ type: "sourceStrip", chips: [{ label, text }] }`
- `interactive`: `{ type: "interactive", kind, label, title, intro, hint }`. Visualización dinámica con controles y lectura guiada. `kind` debe ser una de las claves registradas en `assets/viz.js`; `label` es opcional.
- `chart`: solo clase 1; **no usar** en clases nuevas.

Reglas:

- IDs únicos y con el prefijo de la clase: `c04a-s01-p01`, `c04a-check-01`.
- Al menos un `miniCheck` por sección teórica importante.
- Usar `<span class="concept" data-concept="clave" tabindex="0" role="button">…</span>`
  para enlazar a las fichas de concepto.
- Los `data-concept` deben existir en `concepts` de la misma clase.
- HTML válido dentro de los strings; cuidar `<sub>`, `<sup>` y entidades.
- No usar `backticks` dentro de los strings HTML (rompen el template literal).

## Visualizaciones interactivas

Las clases 1 a 4 usan el bloque `interactive` para explicar un mecanismo con
controles. El motor vive en `assets/viz.js` y los estilos en `assets/viz.css`.
La sesión de contenido solo declara el bloque; no edita esos archivos.

Kinds disponibles:

| `kind` | Qué muestra | Clase donde se usa |
| --- | --- | --- |
| `ols-scr` | Curva SCR(β₁) y mínimo de MCO | 01 |
| `ovb` | Sesgo por omisión como β₂·δ₁ | 02A |
| `vif` | FIV, error estándar y ancho del intervalo | 02B |
| `t-dist` | Densidad t, colas del valor p y decisión | 03A |
| `f-dist` | Densidad F, cola derecha y F crítico | 03B |
| `forms` | Niveles, log-log, log-lin, lin-log y cuadrática | 04A |
| `quadratic` | Parábola y efecto marginal en dos escalas | 04A |
| `prediction` | Bandas promedio e individual | 04B |

Reglas para usarlo:

- Un bloque por idea; no reemplaza al `miniCheck` ni al laboratorio de R.
- `intro` explica qué mover y qué mirar; `hint` cierra la interpretación.
- Las visualizaciones son ilustrativas: no inventar salidas de R ni presentar
  los datos dibujados como estimaciones de una base real.
- Si hace falta un `kind` nuevo, lo implementa el coordinador en `assets/viz.js`
  y `assets/viz.css`; la sesión de contenido no los modifica.

## Fichas de concepto

Además de los campos de abajo, cada ficha puede incluir:

- `simple`: explicación en lenguaje cotidiano, sin fórmulas, de 2 a 4 oraciones.
- `viz`, `vizIntro`, `vizHint`: visualización interactiva dentro de la ficha. `viz`
  debe ser una clave registrada en `assets/viz.js`.

Cada ficha:

```js
clave: {
  title: "…",
  sub: "…",
  esencia: `
    <div class="definition">…</div>
    <div class="mini-label">Qué tenés que entender</div>
    <ul><li>…</li></ul>
    <div class="formula small">…<span>…</span></div>
    <div class="badge-row">…</div>
  `,
  ejemplo: `
    <p>…</p>
    <div class="mini-card"><span class="mini-label">En la práctica</span><p>…</p></div>
  `,
  errores: `
    <ul><li><strong>…</strong> …</li></ul>
    <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>…</p></div>
  `,
  conexiones: `
    <p>…</p>
    <div><button class="concept-chip" data-concept="otra">… →</button></div>
  `,
  fuentes: `
    <div class="source-mini"><span class="source-type">Clase</span><p>…</p></div>
    <div class="source-mini"><span class="source-type book">Libro</span><p>…</p></div>
    <div class="source-mini"><span class="source-type exam">Parcial</span><p>…</p></div>
  `
}
```

Cada ficha debe tener 3 errores típicos como mínimo y una señal de no comprensión.
Las conexiones deben apuntar a conceptos de la misma clase.

## Práctica

```js
practice: {
  eyebrow: "De la teoría a la guía",
  title: "Práctica de la clase",
  intro: "…",
  guideHref: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-6",
  exercises: [
    {
      label: "TP 6 · Act. 1",
      title: "…",
      text: "…",
      tags: ["Conceptual", "V/F"],
      href: "guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-5"
    }
  ],
  rLab: { /* ver abajo */ },
  partials: [
    { label: "2P 2024", text: "…" }
  ]
}
```

- 4 a 7 tarjetas de ejercicio, con enlaces profundos verificados.
- `partials`: 2 a 4 preguntas de parcial relacionadas (solo texto, sin enlaces).
- No inventar números de ejercicio: verificar en la guía.

## Laboratorio de R

```js
rLab: {
  eyebrow: "Laboratorio de lectura",
  tag: "TP 6 · Ej. 7",
  title: "…",
  intro: "…",
  dataNote: "…",           // base, n, variables, limitaciones
  script: `…`,             // R ejecutable tal como se muestra
  output: `…`,             // salida real de R, no inventada
  confint: `…`,            // salida real de confint()
  readingTable: [          // 8 a 12 filas
    { element: "Estimate", meaning: "…", how: "…" }
  ],
  econometric: `…`,        // 3 a 6 párrafos con <p>
  economic: `…`,           // 3 a 6 párrafos con <p>
  errors: ["…"],           // 5 a 7 errores de lectura
  checklist: ["…"]         // 5 a 7 pasos para el parcial
}
```

Requisitos:

- Un solo dataset y una pregunta econométrica coherente.
- El script debe ser ejecutable con `load("archivo.rda")` y el objeto que trae la base.
- La salida debe pegarse de una corrida real. No inventar coeficientes, t, p, R²,
  AIC, F ni intervalos.
- Si se comparan modelos con distinta transformación de Y, aclarar que AIC/R² no
  son comparables directamente.
- Separar interpretación econométrica (coeficientes, contraste, ajuste) de
  interpretación económica (magnitud, contexto, límites).
- No afirmar causalidad si el diseño es observacional.

R disponible en esta máquina:

```powershell
& "C:\Program Files\R\R-4.5.2\bin\Rscript.exe" "ruta\al\script.R"
```

Bases:

- `C:\Users\sdcec\OneDrive\Documentos\Lic Economia\Econometria\practica 6\TP6\Bases TP6\*.rda`
- `C:\Users\sdcec\OneDrive\Documentos\Lic Economia\Econometria\practica 7\*.rda`

Para escribir el script sin problemas de acentos, usar un archivo `.R` en
`C:\Users\sdcec\AppData\Local\Temp\opencode\` y ejecutarlo con `Rscript`.

## Autoevaluación

```js
assessment: {
  eyebrow: "Autoevaluación",
  title: "Preguntas de razonamiento",
  intro: "…",
  questions: [{ q: "…", a: "…" }]
}
```

- 10 a 13 preguntas.
- Preguntan razonamiento, no definiciones memorizadas.
- La respuesta debe poder escribirse en 3–6 líneas y corregir un error frecuente.

## Kit de repaso

```js
review: {
  eyebrow: "Cierre y consolidación",
  title: "Kit de repaso y sesión de 90 minutos",
  intro: "…",
  formulas: [{ title, eq, note, more }],    // 10 a 13; more es opcional y se despliega
  drills: [{ q, a }],                      // 10 a 12
  sourceGuide: [{ stuck, source }],        // 8 a 10
  session: [{ time, title, text }],        // 6, de 0–10 a 85–90
  kit: [{ k, title, text }],               // 4
  plan: [{ day, title, text }]             // 7
}
```

## Fuentes

```js
sources: {
  eyebrow: "Trazabilidad",
  title: "Fuentes de esta clase",
  intro: "…",
  items: [
    {
      type: "Clase",
      typeClass: "",
      title: "Clase 4 — Especificación del modelo y predicción",
      text: "…",
      loc: "34 diapositivas · diap. 3–19"
    },
    {
      type: "Libro",
      typeClass: "book",
      title: "Wooldridge — Introducción a la Econometría, 4.ª ed.",
      text: "Cap. 6 …",
      loc: "Cap. 6"
    },
    {
      type: "Guía",
      typeClass: "",
      title: "Guía de Trabajos Prácticos 2026 — TP 6",
      text: "…",
      loc: "TP 6 · act. 1; ej. 1–8",
      href: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-6"
    },
    {
      type: "Parcial",
      typeClass: "exam",
      title: "2P 2024",
      text: "…",
      loc: "Solución orientativa"
    }
  ]
}
```

- 4 a 6 fuentes: clase, libro, guía y parciales.
- Citar diapositivas y capítulos concretos; no inventar páginas.

## Tono y estilo

- Español rioplatense, voseo: “entendé”, “mirá”, “fijate”, “pensá”.
- Explicar la intuición antes de la fórmula.
- Cada sección abre con un problema o pregunta, no con un diccionario.
- Frases cortas; una idea por párrafo.
- Números concretos y ejemplos; si son ilustrativos, decirlo.
- Sin emojis, sin signos de exclamación, sin grandilocuencia.
- Preferir “estimación” a “estimate”, “error estándar” a “standard error”.
- Mantener los términos técnicos en español y, si hace falta, el original entre
  paréntesis.
- No prometer causalidad donde solo hay asociación condicional.

## Checklist de cierre

Antes de entregar, verificar:

1. `node --check content/clase-0X.js` pasa sin errores.
2. El archivo define `window.CLASE_CONTENIDOS["clase-0X"]` y todos los campos
   obligatorios.
3. Todos los `data-concept` de la teoría existen en `concepts`.
4. Todos los `href` de la guía existen y abren la pestaña correcta.
5. Los IDs de bloque y mini-check son únicos.
6. La salida de R fue ejecutada y copiada textualmente.
7. Las fórmulas y los signos son correctos (`β`, `σ`, `ŷ`, `−`, `≈`, `→`).
8. No hay texto copiado de los PDFs ni material con derechos.
9. El archivo no toca otras clases ni archivos compartidos.
10. Reportar: ruta, cantidad de líneas, claves de conceptos, secciones, y
    cualquier decisión que se haya apartado de este brief.

## Reparto sugerido

- Clase 4A: especificación I (diaps. 3–19). Lab: Cobb-Douglas con
  `PRODUCCION1.rda` (TP 6, Ej. 7), elasticidades y rendimientos a escala.
- Clase 4B: especificación II y predicción (diaps. 20–34). Lab: ENGEL
  (TP 6, Ej. 5) con formas funcionales, AIC, RESET y predicción promedio vs
  individual a `income = 1500`.
- Clase 5: variables ficticias (TP 8). Lab: `Profesores.rda` (TP 8, Ej. 1–3):
  medias por sexo, modelo con sexo, rango, universidad y antigüedad, categoría
  base e interacción sexo × antigüedad. Salida real de R.
- Clase 6: heterocedasticidad (TP 9). Lab: `WAGE1.rda` (TP 9, Ej. 4):
  `wage ~ educ + exper + tenure`, Breusch-Pagan, errores robustos HC1 y
  comparación con `log(wage)`. Salida real de R.
- Clase 7: series de tiempo (TP 10). Lab: `barium.rda` (TP 10, Ej. 3):
  `log(chnimp)` con tendencia, dummies de evento y dummies mensuales; contraste
  conjunto de estacionalidad y Chow en `t = 100`. Base R + `car`; no usar
  `dynlm` ni `strucchange` (no están instalados).
- Clase 8: autocorrelación (TP 11). Lab: `TRAFICO.rda` (TP 11, Ej. 1):
  `prcfat` con tendencia y dummies mensuales; Durbin-Watson, Breusch-Godfrey,
  Prais-Winsten (`prais_winsten(..., index = "tiempo")`) y Newey-West.
  `prais`, `lmtest` y `sandwich` están instalados; `orcutt` no.
- Clase 9: endogeneidad y VI (TP 12, primera parte). Lab: `Card.rda` (TP 12,
  Ej. 8): MCO vs VI con `CERCANIA4` como instrumento de `EDUC`; `ivreg` de
  `AER` (instalado), comparación de coeficientes y diagnóstico de instrumento
  débil. Salida real de R.
- Clase 10: MC2E (TP 12, segunda parte). Lab: `Card.rda` (TP 12, Ej. 6 y 8):
  MC2E con `CERCANIA4` y `CERCANIA2`; comparar uno y dos instrumentos;
  `summary(..., diagnostics = TRUE)` para instrumento débil, Wu-Hausman y
  Sargan. Salida real de R.
