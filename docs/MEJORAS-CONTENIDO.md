# Mejoras de contenido — brief de ejecución

Este documento describe las mejoras que se agregan a cada archivo
`content/clase-*.js` sin tocar la aplicación ni otras clases.

## 1. Explicación simple por concepto

Cada ficha dentro de `concepts` puede tener un campo nuevo:

```js
simple: `<p>...</p><p>...</p>`,
```

Reglas:

- Va inmediatamente después de `sub`.
- Explica la idea en lenguaje cotidiano, sin fórmulas y sin tecnicismos innecesarios.
- 2 a 4 oraciones cortas, en español rioplatense con voseo.
- No repite la definición de `esencia`: traduce la idea con una imagen, una situación
  concreta o una pregunta que el estudiante pueda responder solo.
- No promete causalidad donde el concepto no la garantiza.
- Si el concepto ya tiene `simple`, no lo reemplaces: completá o corregí solo si es
  claramente insuficiente.
- Usá HTML simple: `<p>`, `<strong>`, `<em>`. No uses listas largas.

## 2. Visualización por concepto

Cada ficha puede tener:

```js
viz: "clave-de-visualizacion",
vizIntro: "Qué mirar y qué mover, en una o dos oraciones.",
vizHint: "La lectura que debe quedar después de usar la visualización.",
```

Reglas:

- Agregá `viz` solo cuando la visualización ayude de verdad a entender el concepto.
  No hace falta en todos: apuntá a 3 a 6 conceptos por clase.
- No repitas la misma visualización más de dos veces en una clase si cambia el
  significado del concepto.
- `vizIntro` y `vizHint` son obligatorios si agregás `viz`.
- No inventes claves nuevas. Las disponibles son:

```text
ols-scr, ovb, vif, t-dist, f-dist, forms, quadratic, prediction,
dummy-groups, hetero-fan, trend-season, ar1, proxy-bias, weak-iv,
frp-frm, sampling-bias, r2-parts, partial-effect, frisch-waugh,
power, interaction, aic-bic, chow, wls, distributed-lag
```

## 3. Más información en cada fórmula del repaso

Cada elemento de `review.formulas` puede tener:

```js
more: `<p>Qué dice la fórmula y por qué tiene esa forma.</p><ul><li><b>Cuándo se usa:</b> ...</li><li><b>Error típico:</b> ...</li><li><b>Conexión:</b> ...</li></ul>`,
```

Reglas:

- Va después de `note`.
- Extensión: 50 a 100 palabras.
- Debe agregar información, no repetir `note` con otras palabras.
- Incluí, cuando corresponda, qué símbolo manda, cuándo no se puede usar, el error
  más frecuente y la conexión con otro concepto o clase.
- HTML permitido: `<p>`, `<ul>`, `<li>`, `<b>`, `<em>`, `<sub>`, `<sup>`.

## 4. Nueva sección de profundización

Al final de `sections`, antes de `concepts:`, agregar una sección nueva:

```js
{
  id: "cXX-sNN",
  number: "NN",
  title: "Profundización: lo que suele quedar en el aire",
  blocks: [ /* 5 a 7 bloques */ ]
}
```

Reglas:

- `id` y `number` siguen la numeración existente de la clase.
- Detectá 3 o 4 ideas importantes que en la clase están ausentes o explicadas
  demasiado rápido. No repitas lo que ya está bien desarrollado.
- Bloques permitidos: `p`, `cards`, `formula`, `callout`, `assumptions`, `map`,
  `miniCheck`, `sourceStrip`. No uses `chart` ni `interactive` en esta sección.
- Al menos un `miniCheck` con `id` único.
- Extensión orientativa: 600 a 900 palabras.
- La sección debe poder leerse sola y dejar claro qué concepto completa y por qué
  importa para el parcial.
- Español rioplatense, voseo, frases cortas. Sin emojis ni signos de exclamación.
- No copies texto de los PDFs: sintetizá y explicá.

## 5. Restricciones de edición

- Un solo archivo por agente: el `content/clase-*.js` asignado.
- No editar `assets/*`, `content/indice.js`, `index.html`, `README.md`, `HANDOFF.md`
  ni archivos de otras clases.
- Conservar todo el contenido existente, los IDs y el formato.
- Cuidado con los template literals: no usar backticks dentro de los strings HTML.
- Verificar con `node --check content/clase-XX.js`.
- Reportar: campos `simple` agregados, `viz` asignadas, fórmulas con `more` y
  cantidad de bloques de la sección nueva.

## 6. Mapa sugerido de visualizaciones

| Clase | Visualizaciones que mejor encajan |
| --- | --- |
| 01 | `frp-frm`, `ols-scr`, `sampling-bias`, `r2-parts` |
| 02A | `partial-effect`, `frisch-waugh`, `ovb`, `vif`, `r2-parts` |
| 02B | `vif`, `sampling-bias`, `partial-effect` |
| 03A | `t-dist`, `power`, `sampling-bias` |
| 03B | `f-dist`, `t-dist`, `sampling-bias` |
| 04A | `forms`, `quadratic`, `partial-effect` |
| 04B | `prediction`, `aic-bic`, `forms`, `ovb` |
| 05 | `dummy-groups`, `interaction`, `chow` |
| 06 | `hetero-fan`, `wls`, `sampling-bias` |
| 07 | `trend-season`, `distributed-lag`, `chow` |
| 08 | `ar1`, `trend-season`, `sampling-bias` |
| 09 | `proxy-bias`, `weak-iv`, `ovb` |
| 10 | `weak-iv`, `ovb`, `sampling-bias` |

Usar criterio: si la visualización no aclara el concepto, es mejor no asignarla.
