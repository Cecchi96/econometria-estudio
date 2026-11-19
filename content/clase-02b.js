window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-02b"] = {
  id: "clase-02b",
  num: "02B",
  eyebrow: "Clase 02B · Regresión múltiple II",
  title: "Multicolinealidad y álgebra matricial",
  lead: "Cuando los regresores se mueven juntos, la información se reparte. Cuando la matriz no se puede invertir, no hay estimación.",
  question: "¿Qué se pierde cuando los regresores se mueven juntos?",
  pills: ["20 diapositivas", "TP 3 y TP 5", "1P 2024–2026", "6 conceptos clave"],

  sections: [
    {
      id: "c02b-s01",
      number: "01",
      title: "Multicolinealidad: qué es y qué no",
      blocks: [
        {
          type: "p",
          id: "c02b-s01-p01",
          html: 'La multicolinealidad es la relación lineal entre las variables explicativas. En su versión imperfecta es una cuestión de grado, no un supuesto que se cumpla o se viole; en su versión perfecta sí rompe la condición de rango completo y impide estimar. La pregunta relevante es cuánta información independiente tiene cada regresor.'
        },
        {
          type: "formula",
          main: "Var(β̂<sub>j</sub>) = σ<sup>2</sup> / [ SCT<sub>j</sub> (1 − R<sub>j</sub><sup>2</sup>) ] &nbsp;&nbsp;·&nbsp;&nbsp; FIV<sub>j</sub> = 1 / (1 − R<sub>j</sub><sup>2</sup>)",
          legend: [
            { key: "Rⱼ²", text: "Proporción de la variación de Xⱼ explicada por las demás X." },
            { key: "FIVⱼ", text: "Factor de inflación de varianza. FIV = 1 es ausencia de relación lineal." },
            { key: "Perfecta", text: "Si Rⱼ² = 1, X′X es singular y MCO no puede estimar." }
          ]
        },
        {
          type: "interactive",
          kind: "vif",
          label: "Laboratorio visual",
          title: "Cuánto cuesta la colinealidad",
          intro: "El FIV resume cuánto se infla la varianza de un coeficiente cuando su regresor se explica por los demás. Mové el R² de la regresión auxiliar y mirá qué pasa con el error estándar y con el ancho del intervalo, sin que el coeficiente se mueva.",
          hint: "La estimación puntual no cambia: lo que cambia es la precisión. Con FIV = 4 el error estándar se duplica; con FIV = 10 se multiplica por 3,16. La regla de FIV > 10 es una señal, no un test."
        },
        {
          type: "cards",
          items: [
            { sym: "≠ 1", title: "Imperfecta", text: "Los regresores están correlacionados, pero X′X sigue siendo invertible. No viola Gauss-Markov." },
            { sym: "= 1", title: "Perfecta", text: "Un regresor es combinación lineal exacta de otros. X′X no tiene inversa y no hay estimación MCO." },
            { sym: "FIV > 10", title: "Regla de pulgar", text: "Señal de multicolinealidad alta, no un test formal ni una orden de eliminar variables." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "No es lo mismo colinealidad que sesgo",
          html: "La multicolinealidad imperfecta no sesga los estimadores ni viola Gauss-Markov. Afecta la <strong>precisión</strong>: los errores estándar crecen y cuesta separar el efecto de cada variable. La colinealidad perfecta es otra cosa: directamente impide estimar."
        },
        {
          type: "p",
          id: "c02b-s01-p02",
          html: 'La multicolinealidad suele ser muestral: puede aparecer en una base concreta y desaparecer con otra muestra o con más observaciones. También puede ser estructural, cuando dos variables miden casi lo mismo por construcción. Distinguir esos casos ayuda a decidir qué hacer.'
        }
      ]
    },
    {
      id: "c02b-s02",
      number: "02",
      title: "Síntomas, consecuencias y diagnóstico",
      blocks: [
        {
          type: "p",
          id: "c02b-s02-p01",
          html: 'Los síntomas clásicos son combinaciones incómodas: contrastes t individuales no significativos junto con un contraste F global significativo, coeficientes con signos contrarios a la teoría y intervalos de confianza muy amplios. Ninguno de esos síntomas, por separado, prueba multicolinealidad.'
        },
        {
          type: "compare",
          left: {
            tag: "Lo que sí implica",
            title: "Menos precisión",
            text: "Los efectos parciales se estiman con más varianza. Los intervalos se amplían y los t bajan, aunque el ajuste global pueda ser alto.",
            eq: "FIV ↑ → Var(β̂ⱼ) ↑"
          },
          right: {
            tag: "Lo que no implica",
            title: "Sesgo ni invalidez",
            text: "No viola Gauss-Markov y no arruina la predicción. Tampoco obliga a eliminar una variable relevante.",
            eq: "E(β̂) = β sigue valiendo"
          }
        },
        {
          type: "errorTable",
          rows: [
            {
              error: "Eliminar una variable solo porque su t no es significativo",
              why: "La falta de significación puede deberse a multicolinealidad, no a ausencia de efecto.",
              fix: "Mirá el FIV, la teoría y el tamaño de muestra antes de decidir."
            },
            {
              error: "Decir que la multicolinealidad invalida el modelo",
              why: "Solo la colinealidad perfecta impide estimar; la imperfecta afecta la precisión.",
              fix: "Distinguí entre supuesto violado y pérdida de eficiencia."
            },
            {
              error: "Interpretar un signo “incorrecto” como prueba de colinealidad",
              why: "El signo puede cambiar por la correlación entre regresores, pero también por especificación o sesgo.",
              fix: "Revisá la matriz de correlaciones, los FIV y el modelo teórico."
            },
            {
              error: "Usar el FIV como test de hipótesis",
              why: "Es un diagnóstico descriptivo con reglas de pulgar, no un contraste con valor p.",
              fix: "Usalo como señal y complementalo con tolerancia e índices de condición."
            }
          ]
        },
        {
          type: "callout",
          variant: "teal",
          label: "Predicción vs interpretación",
          html: "Si el objetivo es predecir, la multicolinealidad imperfecta no es un problema grave: el modelo puede predecir bien aunque los coeficientes individuales sean imprecisos. Si el objetivo es interpretar efectos parciales, la precisión de cada coeficiente sí importa."
        }
      ]
    },
    {
      id: "c02b-s03",
      number: "03",
      title: "La regresión en forma matricial",
      blocks: [
        {
          type: "p",
          id: "c02b-s03-p01",
          html: 'Un modelo con n observaciones y k variables explicativas es un sistema de n ecuaciones. La notación matricial lo escribe en una sola línea y permite derivar los estimadores, el insesgamiento y la varianza con álgebra de matrices.'
        },
        {
          type: "formula",
          main: "Y = Xβ + u",
          legend: [
            { key: "Y", text: "Vector n × 1 de observaciones de la variable dependiente." },
            { key: "X", text: "Matriz n × (k + 1): una columna de unos y k columnas de regresores." },
            { key: "β y u", text: "Vector (k + 1) × 1 de parámetros y vector n × 1 de errores." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "n", title: "Filas", text: "Cada fila de X es una observación; cada fila de Y, su valor correspondiente." },
            { sym: "k + 1", title: "Columnas", text: "La primera columna de X es la constante; las otras k son los regresores." },
            { sym: "rango", title: "Rango completo", text: "X debe tener rango k + 1 para que X′X sea invertible." }
          ]
        },
        {
          type: "p",
          id: "c02b-s03-p02",
          html: 'Minimizar la suma de residuos al cuadrado, û′û = (Y − Xβ̂)′(Y − Xβ̂), conduce a las condiciones de primer orden <strong>X′Xβ̂ = X′Y</strong>. Si X′X es invertible, se despeja el vector de estimadores premultiplicando por su inversa.'
        },
        {
          type: "formula",
          main: "X′Xβ̂ = X′Y &nbsp;&nbsp;→&nbsp;&nbsp; β̂ = (X′X)<sup>−1</sup>X′Y",
          legend: [
            { key: "X′X", text: "Matriz simétrica de (k + 1) × (k + 1). Debe ser no singular." },
            { key: "X′Y", text: "Vector de (k + 1) × 1 con los productos cruzados entre X e Y." },
            { key: "β̂", text: "Vector de estimadores MCO: intercepto y k pendientes." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "La condición que no se puede saltear",
          html: "Si X′X es singular, no existe (X′X)<sup>−1</sup> y MCO no produce una solución única. Eso ocurre con colinealidad perfecta: una variable duplicada, una combinación lineal exacta o una ficticia que solo toma un valor en la muestra."
        }
      ]
    },
    {
      id: "c02b-s04",
      number: "04",
      title: "Un ejemplo numérico",
      blocks: [
        {
          type: "p",
          id: "c02b-s04-p01",
          html: 'La clase propone un ejemplo mínimo con cinco observaciones y una sola variable explicativa, además de la constante. Sirve para ver cómo se arman X′X y X′Y, y cómo se resuelve el sistema.'
        },
        {
          type: "formula",
          main: `X′X = <table class="matrix"><tr><td>5</td><td>70</td></tr><tr><td>70</td><td>1.100</td></tr></table> &nbsp;&nbsp; X′Y = <table class="matrix"><tr><td>60</td></tr><tr><td>900</td></tr></table>`,
          legend: [
            { key: "5", text: "Cantidad de observaciones: la constante aporta el 5 en la primera celda." },
            { key: "70", text: "Suma de los valores de X: 10 + 10 + 20 + 20 + 10." },
            { key: "1.100", text: "Suma de X al cuadrado: 100 + 100 + 400 + 400 + 100." }
          ]
        },
        {
          type: "p",
          id: "c02b-s04-p02",
          html: 'El determinante de X′X es 5 × 1.100 − 70² = 600. Ese número es distinto de cero, así que la matriz es invertible. La inversa se construye intercambiando la diagonal y cambiando el signo de los elementos fuera de ella, todo dividido por el determinante.'
        },
        {
          type: "formula",
          main: `(X′X)<sup>−1</sup> = (1/600) <table class="matrix"><tr><td>1.100</td><td>−70</td></tr><tr><td>−70</td><td>5</td></tr></table>`,
          legend: [
            { key: "1/600", text: "Inverso del determinante." },
            { key: "Diagonal", text: "Se intercambian los elementos de la diagonal principal." },
            { key: "Fuera", text: "Se cambia el signo de los elementos fuera de la diagonal." }
          ]
        },
        {
          type: "formula",
          main: `β̂ = (X′X)<sup>−1</sup>X′Y = <table class="matrix"><tr><td>5</td></tr><tr><td>0,5</td></tr></table>`,
          legend: [
            { key: "β̂₀ = 5", text: "Intercepto estimado." },
            { key: "β̂₁ = 0,5", text: "Pendiente estimada: una unidad más de X se asocia con 0,5 más de Y." },
            { key: "Verificación", text: "Con los datos del ejemplo, los residuos suman cero y son ortogonales a X." }
          ]
        },
        {
          type: "callout",
          variant: "teal",
          label: "El ejemplo no es decorativo",
          html: "Repetir este cálculo a mano una vez hace que la fórmula β̂ = (X′X)<sup>−1</sup>X′Y deje de ser un símbolo. El TP 3, ejercicio 1, pide exactamente esa mecánica con más datos y dos regresores."
        }
      ]
    },
    {
      id: "c02b-s05",
      number: "05",
      title: "Proyección, residuos y ortogonalidad",
      blocks: [
        {
          type: "p",
          id: "c02b-s05-p01",
          html: 'Los valores ajustados se obtienen proyectando Y sobre el espacio que generan las columnas de X. Esa operación se representa con la <span class="concept" data-concept="proyeccion" tabindex="0" role="button">matriz de proyección</span> P<sub>X</sub>. El residuo es la parte de Y que queda fuera de ese espacio.'
        },
        {
          type: "formula",
          main: "Ŷ = Xβ̂ = X(X′X)<sup>−1</sup>X′Y = P<sub>X</sub>Y &nbsp;&nbsp;·&nbsp;&nbsp; P<sub>X</sub> = X(X′X)<sup>−1</sup>X′",
          legend: [
            { key: "P<sub>X</sub>", text: "Matriz de proyección sobre el espacio de columnas de X." },
            { key: "û", text: "Y − Ŷ = (I − P<sub>X</sub>)Y. Residuo de la proyección." },
            { key: "Ortogonalidad", text: "X′û = 0: los residuos son ortogonales a todas las columnas de X." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "P′ = P", title: "Simétrica", text: "Proyectar dos veces sobre el mismo espacio no cambia el resultado." },
            { sym: "P² = P", title: "Idempotente", text: "Una vez proyectado, volver a proyectar deja el vector igual." },
            { sym: "P + M = I", title: "Descomposición", text: "Y = Ŷ + û: una parte explicada y otra ortogonal al espacio de X." }
          ]
        },
        {
          type: "p",
          id: "c02b-s05-p02",
          html: 'La ortogonalidad explica las propiedades algebraicas de los residuos: Σû = 0 y ΣXⱼû = 0, siempre que el modelo incluya constante. No son supuestos del modelo ni propiedades de los errores poblacionales: son consecuencias de la proyección MCO en la muestra.'
        },
        {
          type: "callout",
          variant: "teal",
          label: "Para conectar con el TP 3",
          html: "El ejercicio 2 del TP 3 pide verificar numéricamente esas igualdades. Si entendés la proyección, sabés de antemano que van a dar cero: no es un resultado empírico, es álgebra."
        },
        {
          type: "miniCheck",
          id: "c02b-check-01",
          question: "¿Por qué los residuos MCO son ortogonales a las variables explicativas incluidas, pero no necesariamente a una variable omitida?",
          intro: "Pensá qué espacio genera la matriz X y qué queda fuera de ese espacio.",
          answer: "Porque MCO elige β̂ de modo que X′û = 0: el residuo es ortogonal a las columnas incluidas en X. Una variable omitida no forma parte de ese espacio; nada garantiza que el residuo sea ortogonal a ella. De hecho, si estuviera correlacionada con X, podría generar sesgo por omisión."
        }
      ]
    },
    {
      id: "c02b-s06",
      number: "06",
      title: "Insesgamiento y varianza matricial",
      blocks: [
        {
          type: "p",
          id: "c02b-s06-p01",
          html: 'La expresión β̂ = (X′X)<sup>−1</sup>X′Y permite demostrar dos propiedades centrales. Primero se reemplaza Y por Xβ + u. Después se usa E(u | X) = 0 para el insesgamiento y Var(u | X) = σ²I para la varianza.'
        },
        {
          type: "formula",
          main: "β̂ = β + (X′X)<sup>−1</sup>X′u &nbsp;&nbsp;→&nbsp;&nbsp; E(β̂ | X) = β",
          legend: [
            { key: "β", text: "Vector de parámetros poblacionales." },
            { key: "(X′X)<sup>−1</sup>X′", text: "Matriz que transforma los errores en el error de estimación." },
            { key: "E(u | X) = 0", text: "El supuesto que hace desaparecer el segundo término en esperanza." }
          ]
        },
        {
          type: "formula",
          main: "Var(β̂ | X) = σ<sup>2</sup>(X′X)<sup>−1</sup>",
          legend: [
            { key: "σ²", text: "Varianza constante de los errores bajo homocedasticidad." },
            { key: "X′X", text: "Matriz de información: más variación en X, menor varianza." },
            { key: "σ̂²", text: "Estimador de σ²: SCR/(n − k − 1)." }
          ]
        },
        {
          type: "p",
          id: "c02b-s06-p02",
          html: 'La matriz Var(β̂) es de (k + 1) × (k + 1). En la diagonal principal están las varianzas de los estimadores; fuera de la diagonal, las covarianzas entre ellos. La raíz cuadrada de cada elemento de la diagonal es el error estándar del coeficiente correspondiente.'
        },
        {
          type: "formula",
          main: `Var(β̂) = σ̂<sup>2</sup>(X′X)<sup>−1</sup> = <table class="matrix"><tr><td>Var(β̂<sub>0</sub>)</td><td>Cov(β̂<sub>0</sub>,β̂<sub>1</sub>)</td><td>Cov(β̂<sub>0</sub>,β̂<sub>2</sub>)</td></tr><tr><td>Cov(β̂<sub>1</sub>,β̂<sub>0</sub>)</td><td>Var(β̂<sub>1</sub>)</td><td>Cov(β̂<sub>1</sub>,β̂<sub>2</sub>)</td></tr><tr><td>Cov(β̂<sub>2</sub>,β̂<sub>0</sub>)</td><td>Cov(β̂<sub>2</sub>,β̂<sub>1</sub>)</td><td>Var(β̂<sub>2</sub>)</td></tr></table>`,
          legend: [
            { key: "Diagonal", text: "Varianzas de los estimadores MCO." },
            { key: "Fuera", text: "Covarianzas entre estimadores. La matriz es simétrica." },
            { key: "ee(β̂ⱼ)", text: "Raíz cuadrada de la varianza; se usa para los contrastes t." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Cuando los errores no son esféricos",
          html: "Si Var(u | X) ≠ σ²I, la expresión σ²(X′X)<sup>−1</sup> deja de ser la varianza correcta. La versión general incorpora una matriz Ω: <strong>Var(β̂<sub>MCO</sub>) = σ̂²(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup></strong>. Eso es el puente hacia heterocedasticidad y autocorrelación (clases 6 y 8)."
        },
        {
          type: "miniCheck",
          id: "c02b-check-02",
          question: "En una matriz Var(β̂) de 4 × 4 para un modelo con tres variables explicativas, ¿qué representan los 16 elementos?",
          intro: "Contá cuántos parámetros hay y separá diagonal de fuera de diagonal.",
          answer: "Hay 4 parámetros (intercepto y tres pendientes). Los 4 elementos de la diagonal son las varianzas de cada estimador; los 12 restantes son covarianzas, simétricas de a pares: 6 covarianzas distintas. La raíz cuadrada de la diagonal da los errores estándar."
        }
      ]
    },
    {
      id: "c02b-s07",
      number: "07",
      title: "Errores frecuentes y mapa de la clase",
      blocks: [
        {
          type: "errorTable",
          rows: [
            {
              error: "Confundir multicolinealidad imperfecta con violación de Gauss-Markov",
              why: "La imperfecta solo infla la varianza; la perfecta impide estimar.",
              fix: "Separá el problema de precisión del problema de identificación."
            },
            {
              error: "Creer que X′X siempre se puede invertir",
              why: "Si hay colinealidad perfecta, X no tiene rango completo y X′X es singular.",
              fix: "Revisá duplicados, combinaciones lineales y ficticias sin variación."
            },
            {
              error: "Leer la matriz Var(β̂) como la var-cov de las X",
              why: "Es la matriz de varianzas y covarianzas de los estimadores, no de las variables.",
              fix: "Mirá la fórmula: σ̂²(X′X)<sup>−1</sup>."
            },
            {
              error: "Pensar que los residuos son ortogonales a cualquier variable",
              why: "La ortogonalidad es con las columnas incluidas en X, no con todo el universo.",
              fix: "Distinguí X incluidas de variables omitidas."
            }
          ]
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Diagnosticar", text: "Matriz de correlaciones, FIV, tolerancia e índices de condición." },
            { n: "2", title: "Escribir el modelo", text: "Y = Xβ + u; identificá dimensiones y la columna de unos." },
            { n: "3", title: "Estimar", text: "β̂ = (X′X)<sup>−1</sup>X′Y, si X′X es invertible." },
            { n: "4", title: "Evaluar", text: "Insesgamiento, Var(β̂) y errores estándar para inferencia." }
          ]
        },
        {
          type: "sourceStrip",
          chips: [
            { label: "Clase 2B", text: "diap. 3–20" },
            { label: "Wooldridge 4ed", text: "Cap. 3 · Apéndice E" },
            { label: "TP 3 y TP 5", text: "matrices y multicolinealidad" },
            { label: "Parciales", text: "1P 2024–2026" }
          ]
        }
      ]
    }
  ],

  concepts: {
    multicol: {
      title: "Multicolinealidad",
      sub: "Regresores que se mueven juntos y reparten la información.",
      esencia: `
        <div class="definition">Hay multicolinealidad cuando las variables explicativas están linealmente relacionadas. Es perfecta si un regresor es combinación lineal exacta de otros; es imperfecta si la relación es fuerte pero no exacta.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La imperfecta no viola Gauss-Markov: los estimadores siguen siendo insesgados.</li>
          <li>La perfecta hace que X′X sea singular y que MCO no pueda estimar.</li>
          <li>El problema práctico es la pérdida de precisión, no el sesgo.</li>
        </ul>
        <div class="formula small">FIV<sub>j</sub> = 1/(1 − R<sub>j</sub><sup>2</sup>)<span>R<sub>j</sub><sup>2</sup>: R² de X<sub>j</sub> sobre las demás X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: definición y consecuencias</span><span class="badge optional">Según el concepto: diagnóstico</span></div>
      `,
      ejemplo: `
        <p>En un modelo de consumo con ingreso y riqueza, ambos regresores suelen estar muy correlacionados. El modelo puede explicar bien el consumo, pero los coeficientes individuales tienen errores estándar grandes y pueden cambiar de signo al agregar o quitar observaciones.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si te interesa el efecto de una variable en particular, la multicolinealidad con las demás es un problema de precisión. Si te interesa predecir, puede no serlo.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que la multicolinealidad sesga los estimadores.</strong> La imperfecta no los sesga; la perfecta impide estimar.</li>
          <li><strong>Eliminar variables solo por FIV alto.</strong> Podés generar sesgo por omisión.</li>
          <li><strong>Confundir correlación entre X con correlación entre errores.</strong> Son problemas distintos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir entre pérdida de precisión y violación de un supuesto.</p></div>
      `,
      conexiones: `
        <p>La multicolinealidad se conecta con Frisch-Waugh (poca variación limpia) y con la varianza de los estimadores. En el TP 5 se trabaja con FIV, tolerancia e índices de condición.</p>
        <div><button class="concept-chip" data-concept="fiv">FIV →</button><button class="concept-chip" data-concept="varcov">Var(β̂) →</button><button class="concept-chip" data-concept="matricial">Regresión matricial →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 2, diap. 3–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 5, actividad 1 y ejercicios 1–4.</p></div>
      `
    },
    fiv: {
      title: "Factor de inflación de varianza",
      sub: "El número que resume cuánto se agranda la varianza por colinealidad.",
      esencia: `
        <div class="definition">FIV<sub>j</sub> = 1 / (1 − R<sub>j</sub><sup>2</sup>), donde R<sub>j</sub><sup>2</sup> es el R² de la regresión de X<sub>j</sub> sobre el resto de las variables explicativas.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>FIV = 1: no hay relación lineal con el resto.</li>
          <li>FIV alto: la varianza del estimador está inflada.</li>
          <li>FIV > 10 es una regla de pulgar, no un test formal.</li>
        </ul>
        <div class="formula small">Var(β̂<sub>j</sub>) = σ<sup>2</sup> / [SCT<sub>j</sub>(1 − R<sub>j</sub><sup>2</sup>)]<span>El FIV multiplica la varianza que habría sin colinealidad</span></div>
        <div class="badge-row"><span class="badge always">Siempre: fórmula</span><span class="badge optional">Según el concepto: umbrales y diagnóstico</span></div>
      `,
      ejemplo: `
        <p>Si R<sub>j</sub><sup>2</sup> = 0,95, el FIV es 20. La varianza del coeficiente es veinte veces mayor que si X<sub>j</sub> no estuviera relacionada con las demás variables. Eso no invalida el modelo, pero hace que el coeficiente sea muy impreciso.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Un FIV alto con una muestra grande puede ser tolerable. El mismo FIV con una muestra chica puede volver inútil la inferencia.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar 10 como ley universal.</strong> Es una convención, no una frontera estadística.</li>
          <li><strong>Mirar solo el FIV y no la teoría.</strong> Una variable relevante con FIV alto no debe eliminarse automáticamente.</li>
          <li><strong>Confundir FIV con tolerancia.</strong> La tolerancia es 1/FIV; son la misma información invertida.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar qué pasa con la varianza cuando R<sub>j</sub><sup>2</sup> se acerca a 1.</p></div>
      `,
      conexiones: `
        <p>El FIV vuelve en el TP 5 y en la clase 6, cuando se discute la precisión de los estimadores bajo distintos supuestos.</p>
        <div><button class="concept-chip" data-concept="multicol">Multicolinealidad →</button><button class="concept-chip" data-concept="varcov">Var(β̂) →</button><button class="concept-chip" data-concept="matricial">Regresión matricial →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 2, diap. 3–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 5, ejercicio 4.</p></div>
      `
    },
    matricial: {
      title: "Regresión matricial",
      sub: "Y = Xβ + u: una línea para n ecuaciones.",
      esencia: `
        <div class="definition">El modelo de regresión múltiple se escribe Y = Xβ + u, con Y y u de n × 1, X de n × (k + 1) y β de (k + 1) × 1. MCO minimiza û′û y obtiene β̂ = (X′X)<sup>−1</sup>X′Y.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La primera columna de X es la constante.</li>
          <li>X debe tener rango completo k + 1.</li>
          <li>Las condiciones de primer orden son X′Xβ̂ = X′Y.</li>
        </ul>
        <div class="formula small">Y = Xβ + u<span>β̂ = (X′X)<sup>−1</sup>X′Y</span></div>
        <div class="badge-row"><span class="badge always">Siempre: dimensiones y fórmula</span><span class="badge optional">Según el concepto: derivación</span></div>
      `,
      ejemplo: `
        <p>Con cinco observaciones y un regresor, X es 5 × 2: una columna de unos y otra con los valores de X. X′X es 2 × 2 y X′Y es 2 × 1. Resolver el sistema da el intercepto y la pendiente.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de calcular, verificá dimensiones. La mayoría de los errores en álgebra matricial se detectan ahí.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Olvidar la columna de unos.</strong> Sin ella, el modelo no tiene intercepto y las dimensiones no cierran.</li>
          <li><strong>Multiplicar en el orden incorrecto.</strong> X′X es (k+1)×(k+1); X′Y es (k+1)×1.</li>
          <li><strong>Invertir X en lugar de X′X.</strong> La inversa que aparece en la fórmula es la de X′X.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés escribir las dimensiones de Y, X, β y u.</p></div>
      `,
      conexiones: `
        <p>La notación matricial es la base de las demostraciones de insesgamiento y varianza. También se usa en la clase 10 para MC2E.</p>
        <div><button class="concept-chip" data-concept="proyeccion">Proyección →</button><button class="concept-chip" data-concept="varcov">Var(β̂) →</button><button class="concept-chip" data-concept="insesgado-m">Insesgamiento →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 2, diap. 6–18.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Apéndice E.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 3, ejercicio 1.</p></div>
      `
    },
    proyeccion: {
      title: "Matriz de proyección",
      sub: "La operación que separa lo explicado de lo residual.",
      esencia: `
        <div class="definition">P<sub>X</sub> = X(X′X)<sup>−1</sup>X′ proyecta Y sobre el espacio de columnas de X. Los valores ajustados son Ŷ = P<sub>X</sub>Y y los residuos son û = (I − P<sub>X</sub>)Y.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>P<sub>X</sub> es simétrica e idempotente.</li>
          <li>Y = Ŷ + û es una descomposición ortogonal.</li>
          <li>Los residuos son ortogonales a todas las columnas de X.</li>
        </ul>
        <div class="formula small">Ŷ = P<sub>X</sub>Y<span>û = Y − Ŷ = (I − P<sub>X</sub>)Y</span></div>
        <div class="badge-row"><span class="badge always">Siempre: interpretación geométrica</span><span class="badge optional">Según el concepto: propiedades algebraicas</span></div>
      `,
      ejemplo: `
        <p>Si el modelo tiene una constante, la proyección garantiza que el residuo medio sea cero. Si además tiene X₁, garantiza que el residuo sea ortogonal a X₁. Esas son las igualdades que se verifican en el TP 3, ejercicio 2.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La proyección es una forma de ver MCO: elegir el punto del espacio de X más cercano a Y en distancia euclídea.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que los residuos son ortogonales a cualquier variable.</strong> Solo lo son a las columnas incluidas en X.</li>
          <li><strong>Pensar que P<sub>X</sub> es la identidad.</strong> Solo lo sería si Y ya estuviera en el espacio de X.</li>
          <li><strong>Confundir P<sub>X</sub> con X.</strong> P<sub>X</sub> es n × n; X es n × (k+1).</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué Σû = 0 cuando hay constante.</p></div>
      `,
      conexiones: `
        <p>La proyección conecta la estimación con el álgebra lineal y explica las propiedades algebraicas de los residuos. Es la base de la descomposición de la varianza y del R².</p>
        <div><button class="concept-chip" data-concept="matricial">Regresión matricial →</button><button class="concept-chip" data-concept="varcov">Var(β̂) →</button><button class="concept-chip" data-concept="multicol">Multicolinealidad →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 2, diap. 12–15.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Apéndice E.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 3, ejercicio 2.</p></div>
      `
    },
    varcov: {
      title: "Matriz de varianzas-covarianzas",
      sub: "La precisión conjunta de los estimadores, en una matriz.",
      esencia: `
        <div class="definition">Bajo homocedasticidad, Var(β̂ | X) = σ²(X′X)<sup>−1</sup>. La versión estimada reemplaza σ² por σ̂² = SCR/(n − k − 1).</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es una matriz de (k + 1) × (k + 1).</li>
          <li>La diagonal contiene varianzas; fuera de la diagonal, covarianzas.</li>
          <li>La raíz cuadrada de la diagonal da los errores estándar.</li>
        </ul>
        <div class="formula small">Var(β̂) = σ̂<sup>2</sup>(X′X)<sup>−1</sup><span>ee(β̂<sub>j</sub>) = √Var(β̂<sub>j</sub>)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: estructura e interpretación</span><span class="badge optional">Según el concepto: errores no esféricos</span></div>
      `,
      ejemplo: `
        <p>En un modelo con tres variables explicativas hay cuatro parámetros. La matriz es 4 × 4: cuatro varianzas en la diagonal y doce covarianzas fuera, que por simetría se reducen a seis valores distintos.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando un software reporta la matriz de covarianzas, no está mostrando la de las X: está mostrando la de los estimadores.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Confundir la var-cov de β̂ con la de X.</strong> Son matrices distintas y de distinto tamaño.</li>
          <li><strong>Pensar que las covarianzas entre estimadores son cero.</strong> En general no lo son si los regresores están correlacionados.</li>
          <li><strong>Usar σ²(X′X)<sup>−1</sup> con errores heterocedásticos.</strong> La expresión correcta incorpora Ω.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué representa la raíz cuadrada de un elemento de la diagonal.</p></div>
      `,
      conexiones: `
        <p>La matriz var-cov es la base de los errores estándar y de la inferencia de la clase 3A. En la clase 6 se generaliza para errores no esféricos.</p>
        <div><button class="concept-chip" data-concept="matricial">Regresión matricial →</button><button class="concept-chip" data-concept="insesgado-m">Insesgamiento →</button><button class="concept-chip" data-concept="multicol">Multicolinealidad →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 2, diap. 19–20.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Apéndice E.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024, 1P 2025 y 1P 2026, preguntas sobre Var(β̂) matricial.</p></div>
      `
    },
    "insesgado-m": {
      title: "Insesgamiento matricial",
      sub: "E(β̂ | X) = β, demostrado con álgebra de matrices.",
      esencia: `
        <div class="definition">Partiendo de β̂ = (X′X)<sup>−1</sup>X′Y y reemplazando Y = Xβ + u, se obtiene β̂ = β + (X′X)<sup>−1</sup>X′u. Si E(u | X) = 0, entonces E(β̂ | X) = β.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El insesgamiento es una propiedad de la distribución muestral, no de una estimación puntual.</li>
          <li>Depende de E(u | X) = 0, no de la normalidad.</li>
          <li>La demostración usa linealidad de la esperanza y las propiedades de la inversa.</li>
        </ul>
        <div class="formula small">β̂ = β + (X′X)<sup>−1</sup>X′u<span>E(β̂ | X) = β + (X′X)<sup>−1</sup>X′E(u | X) = β</span></div>
        <div class="badge-row"><span class="badge always">Siempre: demostración</span><span class="badge optional">Según el concepto: interpretación</span></div>
      `,
      ejemplo: `
        <p>Si tomaras muchas muestras de tamaño n y calcularas β̂ en cada una, el promedio de esos vectores se acercaría a β. Una estimación individual puede estar lejos; el insesgamiento describe el centro de la distribución.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Insesgado no es lo mismo que preciso. Un estimador insesgado puede tener mucha varianza, sobre todo si hay multicolinealidad.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que hace falta normalidad.</strong> El insesgamiento no requiere errores normales.</li>
          <li><strong>Decir “mi β̂ está cerca de β, entonces es insesgado”.</strong> Confunde una estimación con la distribución muestral.</li>
          <li><strong>Olvidar el supuesto E(u | X) = 0.</strong> Sin él, el segundo término no desaparece.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés reproducir los pasos β̂ = β + (X′X)<sup>−1</sup>X′u y E(β̂ | X) = β.</p></div>
      `,
      conexiones: `
        <p>El insesgamiento matricial es la versión general de la demostración de la clase 1. La clase 3A usa este resultado para construir la inferencia.</p>
        <div><button class="concept-chip" data-concept="matricial">Regresión matricial →</button><button class="concept-chip" data-concept="varcov">Var(β̂) →</button><button class="concept-chip" data-concept="multicol">Multicolinealidad →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 2, diap. 17–18.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Apéndice E.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024, 1P 2025 y 1P 2026, demostración matricial de insesgamiento.</p></div>
      `
    }
  },

  practice: {
    eyebrow: "De la teoría a la guía",
    title: "Práctica de la clase",
    intro: "La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto. Empezá por la regresión matricial y después usá el TP 5 para diagnosticar multicolinealidad.",
    guideHref: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-3",
    exercises: [
      {
        label: "TP 3 · Ej. 1",
        title: "X′X, X′Y y coeficientes",
        text: "Calculá la regresión en forma matricial, interpretá los coeficientes y construí la matriz de varianzas y covarianzas de los estimadores.",
        tags: ["Calcular", "Matrices"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-2"
      },
      {
        label: "TP 3 · Ej. 2",
        title: "Ortogonalidad de los residuos",
        text: "Verificá que Σû = 0 y que ΣX₁û = ΣX₂û = 0. Explicá por qué se cumple por construcción.",
        tags: ["Verificar", "Proyección"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-2"
      },
      {
        label: "TP 3 · Ej. 4",
        title: "Reconstruir el modelo con matrices",
        text: "Con la información resumida de 60 observaciones, recuperá el modelo estimado y calculá el R² ajustado. Es un ejercicio de álgebra, no de software.",
        tags: ["Deducir", "R² ajustado"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-2"
      },
      {
        label: "TP 5 · Ej. 1",
        title: "Cuando no se puede estimar",
        text: "Detectá la colinealidad perfecta en los datos y explicá por qué X′X no es invertible. Después proponé una solución.",
        tags: ["Diagnosticar", "Colinealidad perfecta"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-4"
      },
      {
        label: "TP 5 · Ej. 2",
        title: "Consumo, ingreso y riqueza",
        text: "Estimá el modelo, calculá indicadores de multicolinealidad e interpretá los signos. Discutí qué pasaría con más observaciones.",
        tags: ["Aplicar", "FIV"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-4"
      },
      {
        label: "TP 5 · Ej. 4",
        title: "FIV en la ENGHO",
        text: "Volvé al modelo del TP 3 y calculá FIV e índices de condición. Es el puente entre la teoría y el diagnóstico con datos reales.",
        tags: ["Diagnosticar", "Base real"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-4"
      }
    ],
    rLab: {
      eyebrow: "Laboratorio de lectura",
      tag: "TP 5 · Ej. 2",
      title: "Cómo se lee una salida con multicolinealidad",
      intro: "La salida del TP 5, Ej. 2, es un caso de manual: R² y F muy altos, t individuales no significativos y un FIV enorme. Aprendé a leer las tres cosas juntas.",
      dataNote: "La salida usa los datos del TP 5, Ej. 2: consumo, ingreso y riqueza. La multicolinealidad es fuerte porque ingreso y riqueza se mueven casi perfectamente juntos en la muestra.",
      script: `consumo <- c(70, 65, 90, 95, 110, 115, 120, 140, 155, 150)
ingreso <- c(80, 100, 120, 140, 160, 180, 200, 220, 240, 260)
riqueza <- c(810, 1009, 1273, 1425, 1633, 1876, 2052, 2201, 2435, 2686)

datos <- data.frame(consumo, ingreso, riqueza)
modelo <- lm(consumo ~ ingreso + riqueza, data = datos)

summary(modelo)
library(car)
vif(modelo)`,
      output: `Call:
lm(formula = consumo ~ ingreso + riqueza, data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-11.1120  -4.4767   0.9206   4.1744   7.5844 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 24.77473    6.75250   3.669  0.00798 ** 
ingreso      0.94154    0.82290   1.144  0.29016    
riqueza     -0.04243    0.08066  -0.526  0.61509    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 6.808 on 7 degrees of freedom
Multiple R-squared:  0.9635,	Adjusted R-squared:  0.9531 
F-statistic: 92.4 on 2 and 7 DF,  p-value: 9.286e-06

> vif(modelo)
 ingreso  riqueza 
482.1275 482.1275`,
      confint: `                 2.5 %      97.5 %
(Intercept)  8.8076090 40.74185758
ingreso     -1.0043079  2.88738253
riqueza     -0.2331757  0.14830666`,
      readingTable: [
        { element: "Estimate", meaning: "Coeficiente estimado.", how: "Efecto parcial, condicionado a la otra variable incluida." },
        { element: "Std. Error", meaning: "Error estándar del estimador.", how: "Con multicolinealidad alta, se infla y el coeficiente se vuelve impreciso." },
        { element: "t value", meaning: "Estimate / Std. Error.", how: "Puede ser bajo aunque el efecto conjunto sea fuerte." },
        { element: "Pr(>|t|)", meaning: "p-valor individual.", how: "No rechazar H0 no significa que el efecto sea cero." },
        { element: "Multiple R-squared", meaning: "Ajuste global.", how: "Puede ser muy alto aunque ningún t individual sea significativo." },
        { element: "Adjusted R-squared", meaning: "Ajuste corregido por grados de libertad.", how: "Sigue siendo alto en este ejemplo." },
        { element: "F-statistic", meaning: "Contraste conjunto.", how: "Rechaza que todos los slopes sean cero; no prueba que cada uno lo sea." },
        { element: "vif()", meaning: "Factor de inflación de varianza.", how: "Valores muy por encima de 10 indican multicolinealidad alta." }
      ],
      econometric: `
        <p><strong>β̂<sub>ingreso</sub> = 0,94; p = 0,290.</strong> No se rechaza que su efecto parcial sea cero al 5%. El IC va de −1,00 a 2,89: es muy amplio y cambia de signo.</p>
        <p><strong>β̂<sub>riqueza</sub> = −0,042; p = 0,615.</strong> Tampoco es significativo. El signo negativo no debe interpretarse como una relación causal robusta.</p>
        <p><strong>F = 92,4; p = 9,29 × 10<sup>−6</sup>.</strong> En conjunto, ingreso y riqueza explican el consumo. Hay una diferencia llamativa entre la significancia conjunta y la individual.</p>
        <p><strong>R² = 0,9635; R² ajustado = 0,9531.</strong> El ajuste es muy alto, pero eso no vuelve precisos a los coeficientes individuales.</p>
        <p><strong>FIV = 482,13 para ambos regresores.</strong> Es la firma de la multicolinealidad: la información para separar los efectos está muy repartida.</p>
      `,
      economic: `
        <p>Consumo, ingreso y riqueza se mueven juntos. El modelo predice bien el consumo, pero no puede atribuir con precisión cuánto corresponde a cada regresor por separado. Decir “un peso más de ingreso aumenta el consumo en 0,94” es una lectura demasiado confiada con estos errores estándar.</p>
        <p>La multicolinealidad no invalida el modelo ni obliga a eliminar riqueza. Si la pregunta es el efecto del ingreso, hace falta más variación independiente, otra muestra o una estrategia de identificación. Si la pregunta es predecir, el modelo puede servir.</p>
      `,
      errors: [
        "Decir que ingreso y riqueza no afectan al consumo porque sus t no son significativos. La estimación es imprecisa, no prueba ausencia de efecto.",
        "Concluir que ambos coeficientes son distintos de cero porque el F es significativo. El F contrasta el conjunto, no cada coeficiente.",
        "Eliminar riqueza solo porque el FIV es 482. Esa decisión puede generar sesgo por omisión.",
        "Leer un R² de 0,96 como prueba de que el modelo está bien especificado o de que los efectos son causales.",
        "Confundir multicolinealidad imperfecta con violación de Gauss-Markov: MCO sigue siendo insesgado, pero pierde precisión."
      ],
      checklist: [
        "Reportá los coeficientes con sus errores estándar e intervalos.",
        "Compará la significancia individual (t) con la conjunta (F).",
        "Calculá el FIV y explicá qué significa un valor mayor que 10.",
        "No interpretes un coeficiente no significativo como efecto cero.",
        "Distinguí el objetivo de predicción del objetivo de interpretar efectos parciales.",
        "No elimines variables relevantes solo por multicolinealidad."
      ]
    },
    partials: [
      {
        label: "1P 2024",
        text: "Deducción matricial de la matriz de varianzas-covarianzas de los estimadores MCO.",

      },
      {
        label: "1P 2025",
        text: "Matriz de var-cov para un modelo con tres variables explicativas.",

      },
      {
        label: "1P 2026",
        text: "Insesgamiento y varianza partiendo de β̂ = (X′X)⁻¹X′Y.",

      }
    ]
  },

  assessment: {
    eyebrow: "Autoevaluación",
    title: "Preguntas de razonamiento",
    intro: "Las preguntas apuntan a distinguir colinealidad de sesgo, y a entender qué hace realmente la fórmula matricial. Respondé antes de abrir la solución.",
    questions: [
      {
        q: "¿Cuál es la diferencia entre multicolinealidad perfecta e imperfecta?",
        a: "La perfecta implica que un regresor es combinación lineal exacta de otros: X no tiene rango completo, X′X es singular y MCO no puede estimar. La imperfecta implica una relación fuerte pero no exacta: X′X es invertible, MCO estima, pero con menos precisión."
      },
      {
        q: "¿Por qué un FIV mayor que 10 es una señal y no una prueba?",
        a: "Porque es una regla de pulgar basada en Rⱼ². No tiene una distribución ni un valor p asociado, y su relevancia depende del tamaño de muestra, de la pregunta y de la teoría. Un FIV alto no implica eliminar la variable."
      },
      {
        q: "Escribí el modelo de regresión múltiple en forma matricial e indicá las dimensiones de cada objeto.",
        a: "Y = Xβ + u, con Y de n × 1, X de n × (k + 1), β de (k + 1) × 1 y u de n × 1. La primera columna de X es la constante; k es la cantidad de pendientes."
      },
      {
        q: "¿De dónde sale β̂ = (X′X)⁻¹X′Y?",
        a: "De minimizar û′û = (Y − Xβ̂)′(Y − Xβ̂). La condición de primer orden es X′Xβ̂ = X′Y. Si X′X es invertible, se premultiplica por su inversa y se obtiene β̂ = (X′X)⁻¹X′Y."
      },
      {
        q: "¿Qué es P<sub>X</sub> y por qué es idempotente?",
        a: "P<sub>X</sub> = X(X′X)⁻¹X′ es la matriz que proyecta Y sobre el espacio de columnas de X. Es idempotente porque proyectar sobre un espacio y volver a proyectar sobre el mismo espacio no cambia el resultado: P<sub>X</sub>² = P<sub>X</sub>."
      },
      {
        q: "¿Por qué los residuos MCO son ortogonales a X?",
        a: "Porque la condición de primer orden X′û = 0. Geométricamente, el residuo es la parte de Y que queda fuera del espacio de X; por construcción es perpendicular a ese espacio."
      },
      {
        q: "¿Qué representan la diagonal y los elementos fuera de la diagonal de Var(β̂)?",
        a: "La diagonal contiene las varianzas de los estimadores; fuera de la diagonal están las covarianzas entre pares de estimadores. La matriz es simétrica y su raíz cuadrada diagonal da los errores estándar."
      },
      {
        q: "¿Qué cambia en Var(β̂) si los errores son heterocedásticos?",
        a: "La expresión σ²(X′X)⁻¹ deja de ser correcta porque Var(u | X) no es σ²I. La varianza general es σ̂²(X′X)⁻¹X′ΩX(X′X)⁻¹, donde Ω describe la estructura de varianzas y covarianzas de los errores. Eso se estudia en la clase 6."
      }
    ]
  },

  review: {
    eyebrow: "Cierre y consolidación",
    title: "Kit de repaso y sesión de 90 minutos",
    intro: "Empezá por el formulario, seguí con el drill y la sesión, y cerrá con el plan de 7 días. La idea es repasar sin volver a leer todo desde cero.",
    formulas: [
      { title: "Modelo matricial", eq: "Y = Xβ + u", note: "Y y u son n × 1; X es n × (k + 1); β es (k + 1) × 1." },
      { title: "Condiciones de primer orden", eq: "X′Xβ̂ = X′Y", note: "Se obtienen al minimizar û′û = (Y − Xβ̂)′(Y − Xβ̂)." },
      { title: "Estimador MCO", eq: "β̂ = (X′X)<sup>−1</sup>X′Y", note: "Requiere que X′X sea invertible: X de rango completo k + 1." },
      { title: "Valores ajustados", eq: "Ŷ = Xβ̂ = P<sub>X</sub>Y", note: "P<sub>X</sub> proyecta Y sobre el espacio de columnas de X." },
      { title: "Matriz de proyección", eq: "P<sub>X</sub> = X(X′X)<sup>−1</sup>X′", note: "Es simétrica e idempotente. P<sub>X</sub> + M = I." },
      { title: "Residuos", eq: "û = Y − Ŷ = (I − P<sub>X</sub>)Y", note: "Si hay constante, Σû = 0. Además, X′û = 0." },
      { title: "Ortogonalidad", eq: "X′û = 0", note: "Los residuos son ortogonales a las columnas incluidas en X, no a cualquier variable." },
      { title: "Insesgamiento", eq: "E(β̂ | X) = β", note: "Sale de β̂ = β + (X′X)<sup>−1</sup>X′u y de E(u|X) = 0." },
      { title: "Varianza", eq: "Var(β̂ | X) = σ<sup>2</sup>(X′X)<sup>−1</sup>", note: "Bajo homocedasticidad. La diagonal contiene las varianzas de los estimadores." },
      { title: "Varianza estimada", eq: "Var(β̂) = σ̂<sup>2</sup>(X′X)<sup>−1</sup>", note: "σ̂<sup>2</sup> = SCR/(n − k − 1). La raíz de la diagonal da los errores estándar." },
      { title: "Errores no esféricos", eq: "Var(β̂<sub>MCO</sub>) = σ̂<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup>", note: "Es la versión general cuando Var(u|X) ≠ σ<sup>2</sup>I." },
      { title: "FIV", eq: "FIV<sub>j</sub> = 1/(1 − R<sub>j</sub><sup>2</sup>)", note: "La multicolinealidad imperfecta no viola Gauss-Markov; la perfecta impide estimar." }
    ],
    drills: [
      { q: "Escribí el modelo matricial e indicá las dimensiones.", a: "Y = Xβ + u; Y: n × 1; X: n × (k + 1); β: (k + 1) × 1; u: n × 1." },
      { q: "Escribí las condiciones de primer orden de MCO.", a: "X′Xβ̂ = X′Y. Si X′X es invertible, β̂ = (X′X)<sup>−1</sup>X′Y." },
      { q: "¿Qué condición debe cumplir X para que exista β̂?", a: "Rango completo k + 1, para que X′X sea no singular e invertible." },
      { q: "Definí P<sub>X</sub> y sus dos propiedades.", a: "P<sub>X</sub> = X(X′X)<sup>−1</sup>X′. Es simétrica (P′ = P) e idempotente (P² = P)." },
      { q: "¿Por qué X′û = 0?", a: "Porque la condición de primer orden es X′Xβ̂ = X′Y. Reordenando, X′(Y − Xβ̂) = X′û = 0." },
      { q: "Pasos para demostrar E(β̂|X) = β.", a: "β̂ = (X′X)<sup>−1</sup>X′(Xβ + u) = β + (X′X)<sup>−1</sup>X′u. Tomando esperanza condicional y usando E(u|X) = 0, queda β." },
      { q: "Escribí Var(β̂|X) y explicá su estructura.", a: "Var(β̂|X) = σ<sup>2</sup>(X′X)<sup>−1</sup>. La diagonal tiene varianzas; fuera de la diagonal, covarianzas entre estimadores." },
      { q: "Diferenciá multicolinealidad perfecta e imperfecta.", a: "Perfecta: un regresor es combinación lineal exacta de otros; X′X es singular y no hay estimación. Imperfecta: relación fuerte pero no exacta; hay estimación, con más varianza." }
    ],
    sourceGuide: [
      { stuck: "No entiendo qué es la multicolinealidad", source: "Clase 2B, diap. 3–5; TP 5, ejercicios 1–4." },
      { stuck: "No sé por qué X′X no se puede invertir", source: "Clase 2B, diap. 3 y 15; Wooldridge Apéndice E." },
      { stuck: "No puedo derivar β̂ = (X′X)⁻¹X′Y", source: "Clase 2B, diap. 9–11; Wooldridge Apéndice E." },
      { stuck: "No entiendo la matriz de proyección", source: "Clase 2B, diap. 12; Wooldridge Apéndice E." },
      { stuck: "No puedo demostrar el insesgamiento matricial", source: "Clase 2B, diap. 17–18; Wooldridge Apéndice E." },
      { stuck: "No entiendo la matriz de varianzas-covarianzas", source: "Clase 2B, diap. 19–20; Wooldridge Apéndice E." }
    ],
    session: [
      { time: "0–10", title: "Pregunta guía", text: "¿Qué se pierde cuando los regresores se mueven juntos? Escribí una respuesta de tres líneas." },
      { time: "10–30", title: "Multicolinealidad", text: "Explicá la diferencia entre perfecta e imperfecta y qué le pasa a X′X en cada caso. Fuente: clase 2B, diap. 3–5." },
      { time: "30–50", title: "Álgebra matricial", text: "Escribí Y = Xβ + u, las dimensiones y la fórmula β̂ = (X′X)⁻¹X′Y. Reconstruí el ejemplo numérico." },
      { time: "50–70", title: "Práctica", text: "TP 3, ejercicios 1 y 2. Verificá X′X, X′Y, β̂ y la ortogonalidad de los residuos." },
      { time: "70–85", title: "Preguntas de parcial", text: "1P 2024–2026: var-cov matricial e insesgamiento. Respondé sin mirar la solución." },
      { time: "85–90", title: "Cierre", text: "Anotá una idea que puedas enseñar en dos minutos y una que todavía no puedas explicar sin mirar." }
    ],
    kit: [
      { k: "Kit 01", title: "Una página de ideas clave", text: "Multicolinealidad, FIV, forma matricial, proyección, var-cov e insesgamiento, con una frase por concepto." },
      { k: "Kit 02", title: "Tabla de errores", text: "Qué se confunde, por qué y cómo corregirlo. La sección 07 es el punto de partida." },
      { k: "Kit 03", title: "Ocho preguntas", text: "La pestaña de Autoevaluación, ordenada de menor a mayor dificultad." },
      { k: "Kit 04", title: "Plan de 7 días", text: "Una rutina corta para no volver a leer todo desde cero." }
    ],
    plan: [
      { day: "Día 1", title: "Teoría y mapa", text: "Leé la clase completa y explicá el mapa de los cuatro pasos sin mirar." },
      { day: "Día 2", title: "TP 3, ejercicio 1", text: "Calculá X′X, X′Y, β̂ y la matriz de var-cov." },
      { day: "Día 3", title: "TP 3, ejercicio 2", text: "Verificá la ortogonalidad de los residuos y explicá por qué se cumple." },
      { day: "Día 4", title: "TP 5", text: "Diagnosticá multicolinealidad con FIV, tolerancia e índices de condición." },
      { day: "Día 5", title: "Parciales", text: "Respondé las preguntas de 1P 2024–2026 sobre matrices y multicolinealidad." },
      { day: "Día 6", title: "Simulacro", text: "Resolvé una selección de preguntas en 45 minutos, sin mirar." },
      { day: "Día 7", title: "Cierre", text: "Volvé solo a lo que falló y actualizá tu kit de una página." }
    ]
  },

  sources: {
    eyebrow: "Trazabilidad",
    title: "Fuentes de esta clase",
    intro: "Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para que puedas abrir cada ejercicio desde la práctica.",
    items: [
      {
        type: "Clase",
        typeClass: "",
        title: "Clase 2 — Regresión múltiple, parte 2",
        text: "Fuente principal de la explicación, el orden y los énfasis de esta clase.",
        loc: "20 diapositivas · diap. 3–20"
      },
      {
        type: "Libro",
        typeClass: "book",
        title: "Wooldridge — Introducción a la Econometría, 4.ª ed.",
        text: "Cap. 3 para multicolinealidad y Apéndice E para la regresión en forma matricial, insesgamiento y varianza.",
        loc: "Cap. 3 · Apéndice E"
      },
      {
        type: "Guía",
        typeClass: "",
        title: "Guía de Trabajos Prácticos 2026 — TP 3 y TP 5",
        text: "TP 3 para la regresión matricial y los residuos; TP 5 para multicolinealidad y FIV.",
        loc: "TP 3 · ejercicios 1–4; TP 5 · ejercicios 1–4",
        href: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-3"
      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2024",
        text: "Deducción matricial de la matriz de varianzas-covarianzas de los estimadores MCO.",
        loc: "Solución orientativa",

      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2025",
        text: "Matriz de var-cov para un modelo con tres variables explicativas.",
        loc: "Solución orientativa",

      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2026",
        text: "Insesgamiento y varianza partiendo de β̂ = (X′X)⁻¹X′Y.",
        loc: "Solución orientativa",

      }
    ]
  }
};
