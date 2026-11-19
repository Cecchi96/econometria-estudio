window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-02a"] = {
  id: "clase-02a",
  num: "02A",
  eyebrow: "Clase 02A · Regresión múltiple I",
  title: "Regresión múltiple: efectos parciales",
  lead: "Agregar regresores no es sumar variables: cambia la pregunta, la interpretación y la precisión de lo que estimás.",
  question: "¿Qué significa estimar el efecto de X₁ “manteniendo constante” X₂?",
  pills: ["19 diapositivas", "TP 3 · ej. 1–6", "1P 2025–2026", "6 conceptos clave"],

  sections: [
    {
      id: "c02a-s01",
      number: "01",
      title: "Del modelo simple al múltiple",
      blocks: [
        {
          type: "p",
          id: "c02a-s01-p01",
          html: 'En la regresión simple, todo lo que no es X queda dentro del <span class="concept" data-concept="parcial" tabindex="0" role="button">error</span>. La regresión múltiple hace explícitos algunos de esos factores: los saca del error y los incorpora a la parte de la ecuación que sí observamos. Ese movimiento es el que permite hablar de efectos parciales.'
        },
        {
          type: "formula",
          main: "Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> + β<sub>2</sub>X<sub>2i</sub> + … + β<sub>k</sub>X<sub>ki</sub> + u<sub>i</sub>",
          legend: [
            { key: "k", text: "Cantidad de variables explicativas, sin contar el intercepto." },
            { key: "β<sub>j</sub>", text: "Efecto parcial esperado de Xⱼ, manteniendo el resto constante." },
            { key: "u", text: "Todo lo que sigue fuera del modelo, incluidos los factores omitidos." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "k + 1", title: "Parámetros", text: "Se estiman un intercepto y k pendientes; por eso hay k + 1 condiciones de primer orden." },
            { sym: "X", title: "Matriz de datos", text: "Cada columna es una variable explicativa; la primera suele ser una columna de unos." },
            { sym: "u", title: "Error", text: "No desaparece: se reduce su contenido, pero nunca se observa." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Más variables no significan más causalidad",
          html: "Incluir X₂ mueve a X₂ fuera del error, pero no vuelve exógenas a todas las variables. La interpretación causal sigue dependiendo de supuestos que el modelo, por sí solo, no garantiza."
        },
        {
          type: "p",
          id: "c02a-s01-p02",
          html: 'La regresión múltiple también habilita formas funcionales más flexibles: logaritmos, cuadráticos, interacciones y variables ficticias. En todos esos casos el modelo puede seguir siendo <strong>lineal en los parámetros</strong>, aunque no sea lineal en las variables.'
        }
      ]
    },
    {
      id: "c02a-s02",
      number: "02",
      title: "Efectos parciales y ceteris paribus",
      blocks: [
        {
          type: "p",
          id: "c02a-s02-p01",
          html: 'En el modelo lineal, el efecto de X₁ sobre el valor esperado de Y no depende del nivel de X₁ ni de las demás variables. Es una pendiente constante: si X₁ sube una unidad y todo lo demás queda igual, Ŷ cambia en β̂₁ unidades.'
        },
        {
          type: "formula",
          main: "ΔŶ<sub>i</sub> = β̂<sub>1</sub>ΔX<sub>1i</sub> + β̂<sub>2</sub>ΔX<sub>2i</sub> &nbsp;→&nbsp; ΔŶ<sub>i</sub> / ΔX<sub>1i</sub> = β̂<sub>1</sub> &nbsp;si&nbsp; ΔX<sub>2i</sub> = 0",
          legend: [
            { key: "β̂₁", text: "Cambio esperado en Y ante una unidad más de X₁." },
            { key: "ΔX₂ = 0", text: "La condición que hace que la comparación sea ceteris paribus." },
            { key: "Linealidad", text: "El efecto marginal no cambia con el nivel de las X." }
          ]
        },
        {
          type: "compare",
          left: {
            tag: "Lo que se mantiene constante",
            title: "Las X incluidas",
            text: "El coeficiente compara observaciones con los mismos valores de los regresores que están en el modelo.",
            eq: "X₂, X₃, …, Xₖ fijos"
          },
          right: {
            tag: "Lo que no",
            title: "Todo el resto",
            text: "Los factores omitidos siguen moviéndose. Decir “todo lo demás constante” es una afirmación del modelo, no una garantía de los datos.",
            eq: "u no necesariamente fijo"
          }
        },
        {
          type: "callout",
          variant: "teal",
          label: "La frase que conviene precisar",
          html: "“Manteniendo todo lo demás constante” significa, en rigor, <strong>manteniendo constantes las variables incluidas en el modelo</strong>. No significa que hayas controlado por todas las variables del universo."
        },
        {
          type: "miniCheck",
          id: "c02a-check-01",
          question: "Si β̂₁ = 0,5 y β̂₂ = −0,2, ¿cuánto cambia Ŷ cuando X₁ sube 2 unidades y X₂ baja 1?",
          intro: "Aplicá la expresión de cambios lineales antes de mirar la respuesta.",
          answer: "ΔŶ = 0,5 × 2 + (−0,2) × (−1) = 1 + 0,2 = <strong>1,2 unidades</strong>. La suba de X₁ aporta 1 y la caída de X₂ aporta 0,2 porque su coeficiente es negativo."
        }
      ]
    },
    {
      id: "c02a-s03",
      number: "03",
      title: "Frisch-Waugh: aislar la variación",
      blocks: [
        {
          type: "p",
          id: "c02a-s03-p01",
          html: 'El coeficiente de una regresión múltiple tiene una interpretación muy concreta: es la pendiente que se obtendría si primero se limpiara a X₁ de la influencia de las demás X y después se regresara Y sobre esa parte limpia. Ese procedimiento se conoce como <span class="concept" data-concept="frisch" tabindex="0" role="button">teorema de Frisch-Waugh</span>.'
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Regresá X₁", text: "Regresá X₁ sobre X₂, …, Xₖ y quedate con los residuos r̂ᵢ₁." },
            { n: "2", title: "Leé el residuo", text: "r̂ᵢ₁ es la parte de X₁ que no se explica por las otras X." },
            { n: "3", title: "Regresá Y", text: "Regresá Y sobre r̂ᵢ₁, sin las demás variables." },
            { n: "4", title: "Interpretá", text: "La pendiente de esa segunda regresión es β̂₁ del modelo múltiple." }
          ]
        },
        {
          type: "formula",
          main: "β̂<sub>1</sub> = Σ r̂<sub>i1</sub> Y<sub>i</sub> / Σ r̂<sub>i1</sub><sup>2</sup>",
          legend: [
            { key: "r̂ᵢ₁", text: "Residuo de regresar X₁ sobre las restantes variables explicativas." },
            { key: "Numerador", text: "Covarianza entre la parte limpia de X₁ y Y." },
            { key: "Denominador", text: "Variación de esa parte limpia." }
          ]
        },
        {
          type: "p",
          id: "c02a-s03-p02",
          html: 'El procedimiento funciona porque los residuos de la primera etapa contienen solo la variación de X₁ que no está correlacionada con las otras X. Al regresar Y sobre ellos, se mide el efecto de esa variación aislada. Es la maquinaria algebraica que está detrás de la expresión “controlar por”.'
        },
        {
          type: "callout",
          variant: "teal",
          label: "Para conectar",
          html: "Frisch-Waugh aparece en el 1P 2026 como pregunta teórica. Si podés explicar el procedimiento en dos etapas, entendiste por qué el coeficiente múltiple no es una simple suma de efectos."
        }
      ]
    },
    {
      id: "c02a-s04",
      number: "04",
      title: "Simple vs múltiple: el sesgo por omisión",
      blocks: [
        {
          type: "p",
          id: "c02a-s04-p01",
          html: 'Los coeficientes de la regresión simple y de la múltiple pueden parecerse o ser muy distintos. La relación entre ambos se escribe con dos ingredientes: el efecto de la variable omitida sobre Y y la relación entre esa variable omitida y X₁.'
        },
        {
          type: "formula",
          main: "β̃<sub>1,RS</sub> = β̂<sub>1,RM</sub> + δ̃<sub>1</sub> β̂<sub>2,RM</sub>",
          legend: [
            { key: "β̃₁,RS", text: "Pendiente de la regresión simple de Y sobre X₁." },
            { key: "β̂₁,RM", text: "Pendiente de X₁ en la regresión múltiple que incluye X₂." },
            { key: "δ̃₁", text: "Pendiente de la regresión auxiliar de X₂ sobre X₁." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "β₂ = 0", title: "X₂ no afecta a Y", text: "En la muestra no hay efecto de X₂ sobre Y; entonces simple y múltiple coinciden." },
            { sym: "δ₁ = 0", title: "X₁ y X₂ no se mueven juntas", text: "Si son ortogonales, incluir X₂ no cambia la pendiente estimada de X₁." },
            { sym: "Ambos ≠ 0", title: "Hay sesgo por omisión", text: "La diferencia entre estimadores tiene el signo del producto δ₁β₂ y su magnitud." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Omitir no siempre sesga hacia cero",
          html: "El signo del sesgo es el signo del producto <strong>δ̃₁β̂₂</strong>: positivo si los dos términos tienen el mismo signo, negativo si tienen signos opuestos. No hay una regla universal de “subestima” o “sobreestima”: importan la magnitud y el signo del coeficiente múltiple."
        },
        {
          type: "interactive",
          kind: "ovb",
          label: "Laboratorio visual",
          title: "Sesgo por omisión en vivo",
          intro: "Fijamos una relación verdadera con β₁ = 1 y una variable omitida X₂. Mové el efecto de X₂ sobre Y (β₂) y su relación con X₁ (δ₁): el gráfico muestra qué estimaría en promedio la regresión simple y qué estimaría la múltiple.",
          hint: "El sesgo es el producto β₂·δ₁. Si cualquiera de los dos es cero, simple y múltiple coinciden. Si tienen el mismo signo, la simple exagera el efecto; si tienen signos opuestos, lo atenúa o lo invierte."
        },
        {
          type: "p",
          id: "c02a-s04-p02",
          html: 'Cuando las variables explicativas son ortogonales, los coeficientes de la regresión múltiple coinciden con los de las regresiones simples, incluido el intercepto. Es un caso especial: en datos económicos, los regresores suelen estar correlacionados en alguna medida.'
        },
        {
          type: "miniCheck",
          id: "c02a-check-02",
          question: "Una variable omitida tiene un efecto positivo sobre Y y está positivamente correlacionada con X₁. ¿Qué relación esperás entre la pendiente simple y la múltiple?",
          intro: "Pensá en los dos ingredientes de la fórmula y en el signo de su producto.",
          answer: "Si β₂ &gt; 0 y δ₁ &gt; 0, el producto es positivo. Entonces la pendiente simple tiende a ser <strong>mayor</strong> que la múltiple: la regresión simple le atribuye a X₁ parte del efecto de la variable omitida."
        }
      ]
    },
    {
      id: "c02a-s05",
      number: "05",
      title: "Varianza, FIV y multicolinealidad",
      blocks: [
        {
          type: "p",
          id: "c02a-s05-p01",
          html: 'La varianza de un estimador MCO depende de tres cosas: la dispersión del error, la variación propia de Xⱼ y la relación lineal de Xⱼ con las demás variables explicativas. La última es la que conecta la precisión con la <span class="concept" data-concept="fiv" tabindex="0" role="button">multicolinealidad</span>.'
        },
        {
          type: "formula",
          main: "Var(β̂<sub>j</sub>) = σ<sup>2</sup> / [ SCT<sub>j</sub> (1 − R<sub>j</sub><sup>2</sup>) ] &nbsp;&nbsp;·&nbsp;&nbsp; FIV<sub>j</sub> = 1 / (1 − R<sub>j</sub><sup>2</sup>)",
          legend: [
            { key: "σ²", text: "Varianza del error. Más ruido, más varianza del estimador." },
            { key: "SCTⱼ", text: "Variación muestral de Xⱼ. Más variación, más información y menos varianza." },
            { key: "Rⱼ²", text: "Qué tan bien se explica Xⱼ con el resto de las X. Más relación, más FIV." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "σ²", title: "Ruido", text: "Es una característica de la población; se puede reducir incluyendo variables relevantes, si están disponibles." },
            { sym: "SCTⱼ", title: "Información", text: "Aumenta con el tamaño de muestra y con la dispersión de Xⱼ." },
            { sym: "FIV", title: "Inflación", text: "Un FIV alto indica que la varianza del estimador está inflada por la relación entre regresores." }
          ]
        },
        {
          type: "p",
          id: "c02a-s05-p02",
          html: 'Si la multicolinealidad es <strong>perfecta</strong>, los regresores son linealmente dependientes y X′X no tiene inversa. En ese caso MCO no puede estimar los parámetros. Si es <strong>imperfecta</strong>, no se viola ningún supuesto de Gauss-Markov: los estimadores siguen siendo insesgados, pero se estiman con menos precisión.'
        },
        {
          type: "callout",
          variant: "ochre",
          label: "FIV alto no es una prueba de fracaso",
          html: "Un FIV mayor que 10 es una señal de alerta, no un test formal ni una instrucción automática para eliminar una variable. La decisión depende de la pregunta, de la teoría y de si la variable es relevante para el modelo."
        },
        {
          type: "miniCheck",
          id: "c02a-check-03",
          question: "Si R₁² = 0,9 en la regresión de X₁ sobre el resto, ¿cuál es el FIV de X₁? ¿Qué implica?",
          intro: "Usá la definición de FIV y pensá qué le pasa al denominador de la varianza.",
          answer: "FIV₁ = 1 / (1 − 0,9) = <strong>10</strong>. La varianza del estimador de β₁ es diez veces mayor que si X₁ no estuviera relacionada linealmente con el resto. Es una señal de multicolinealidad alta, aunque no viola Gauss-Markov."
        }
      ]
    },
    {
      id: "c02a-s06",
      number: "06",
      title: "R² ajustado y Gauss-Markov",
      blocks: [
        {
          type: "p",
          id: "c02a-s06-p01",
          html: 'El R² nunca disminuye cuando se agregan regresores: es una medida monótona creciente. Por eso no sirve para comparar modelos con distinta cantidad de variables. El <span class="concept" data-concept="r2adj" tabindex="0" role="button">R² ajustado</span> corrige por grados de libertad y penaliza la inclusión de regresores que no aportan.'
        },
        {
          type: "formula",
          main: "R̄<sup>2</sup> = 1 − [ SCR / (n − k − 1) ] / [ SCT / (n − 1) ] = 1 − (1 − R<sup>2</sup>) · (n − 1) / (n − k − 1)",
          legend: [
            { key: "SCR", text: "Suma de residuos al cuadrado." },
            { key: "n − k − 1", text: "Grados de libertad del modelo, con k pendientes y un intercepto." },
            { key: "R̄²", text: "Puede bajar al agregar una variable irrelevante; por eso se usa para comparar." }
          ]
        },
        {
          type: "p",
          id: "c02a-s06-p02",
          html: 'Los supuestos de Gauss-Markov se extienden a la regresión múltiple: linealidad en los parámetros, muestra aleatoria, media condicionada nula, ausencia de colinealidad perfecta y homocedasticidad. Bajo esos supuestos, MCO es <span class="concept" data-concept="elio" tabindex="0" role="button">ELIO</span>: el mejor estimador lineal e insesgado.'
        },
        {
          type: "assumptions",
          rows: [
            { title: "Linealidad en los parámetros", text: "Permite escribir el modelo y derivar MCO con k + 1 parámetros." },
            { title: "Muestra aleatoria", text: "Da la base para hablar de distribuciones muestrales." },
            { title: "E(u | X₁, …, Xₖ) = 0", text: "Sostiene el insesgamiento de MCO." },
            { title: "No hay colinealidad perfecta", text: "X′X es invertible y los coeficientes se pueden estimar." },
            { title: "Homocedasticidad", text: "Var(u | X) constante. Sostiene la eficiencia y los errores estándar usuales." }
          ]
        },
        {
          type: "callout",
          variant: "teal",
          label: "Qué no promete Gauss-Markov",
          html: "El teorema garantiza propiedades dentro de una clase de estimadores, bajo un modelo. No garantiza que las variables sean exógenas en el mundo, que no haya variables omitidas ni que el coeficiente tenga una interpretación causal."
        }
      ]
    },
    {
      id: "c02a-s07",
      number: "07",
      title: "Errores frecuentes y mapa de la clase",
      blocks: [
        {
          type: "errorTable",
          rows: [
            {
              error: "Creer que agregar variables vuelve causal al modelo",
              why: "La causalidad depende de supuestos y diseño, no de la cantidad de controles.",
              fix: "Preguntate qué factores quedan en u y por qué podrían estar correlacionados con X."
            },
            {
              error: "Interpretar β̂₁ como el efecto total de X₁",
              why: "En un modelo múltiple, β̂₁ es un efecto parcial: mantiene fijas las demás X incluidas.",
              fix: "Aclará siempre qué variables se mantienen constantes y cuáles no."
            },
            {
              error: "Decir que una variable omitida siempre sesga hacia cero",
              why: "El signo del sesgo depende de δ̃₁β̂₂, no de una regla única.",
              fix: "Analizá por separado el efecto de la omitida sobre Y y su relación con X₁."
            },
            {
              error: "Eliminar una variable solo porque su FIV es alto",
              why: "La multicolinealidad imperfecta no viola Gauss-Markov y la variable puede ser relevante.",
              fix: "Evaluá la pregunta, la teoría y la precisión; no apliques reglas automáticas."
            }
          ]
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Formular", text: "¿Qué efecto parcial querés estimar y qué variables deben quedar fijas?" },
            { n: "2", title: "Entender el coeficiente", text: "Derivada, cambio ceteris paribus y relación con la regresión simple." },
            { n: "3", title: "Aislar la variación", text: "Frisch-Waugh: limpiar Xⱼ y regresar Y sobre su parte limpia." },
            { n: "4", title: "Evaluar precisión", text: "Varianza, FIV, R² ajustado y límites de Gauss-Markov." }
          ]
        },
        {
          type: "sourceStrip",
          chips: [
            { label: "Clase 2A", text: "diap. 3–19" },
            { label: "Wooldridge 4ed", text: "Cap. 3 · §3.1–3.5" },
            { label: "TP 3", text: "actividad 1 · ejercicios 1–6" },
            { label: "Parciales", text: "1P 2025–2026" }
          ]
        }
      ]
    }
  ],

  concepts: {
    parcial: {
      title: "Efecto parcial y ceteris paribus",
      sub: "Lo que cambia en Y cuando una X se mueve y las demás quedan fijas.",
      esencia: `
        <div class="definition">En un modelo lineal múltiple, β<sub>j</sub> es el cambio esperado en Y ante una unidad más de X<sub>j</sub>, manteniendo constantes las demás variables explicativas incluidas.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es una derivada parcial: <em>∂E(Y | X) / ∂X<sub>j</sub> = β<sub>j</sub></em>.</li>
          <li>La linealidad hace que el efecto no dependa del nivel de las X.</li>
          <li>“Ceteris paribus” se refiere a las X incluidas, no a todos los factores omitidos.</li>
        </ul>
        <div class="formula small">ΔŶ = β̂<sub>1</sub>ΔX<sub>1</sub> + β̂<sub>2</sub>ΔX<sub>2</sub><span>con ΔX<sub>2</sub> = 0, ΔŶ = β̂<sub>1</sub>ΔX<sub>1</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: interpretación y límites</span><span class="badge optional">Según el concepto: formas funcionales</span></div>
      `,
      ejemplo: `
        <p>Si β̂₁ = 0,5 en un modelo de salario sobre educación y experiencia, decís que un año más de educación se asocia con $0,5 más de salario por hora, para personas con la misma experiencia. No estás comparando personas con distinta experiencia.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando leas un coeficiente, preguntate: ¿qué variables quedaron fijas en esta comparación? La respuesta está en el modelo, no en la frase “todo lo demás constante”.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Interpretar β̂<sub>j</sub> como el efecto total de X<sub>j</sub>.</strong> Es un efecto parcial, condicionado a las demás X incluidas.</li>
          <li><strong>Creer que el modelo controla por variables que no incluyó.</strong> Lo omitido sigue en u.</li>
          <li><strong>Olvidar que la interpretación cambia con transformaciones.</strong> En un modelo log-lineal, β̂ se lee como cambio porcentual, no en unidades.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué variables se mantienen constantes al interpretar un coeficiente.</p></div>
      `,
      conexiones: `
        <p>El efecto parcial es la razón de ser de la regresión múltiple. Se conecta con Frisch-Waugh (cómo se aísla la variación) y con el sesgo por omisión (qué pasa cuando esa variable no se incluye).</p>
        <div><button class="concept-chip" data-concept="frisch">Frisch-Waugh →</button><button class="concept-chip" data-concept="omision">Sesgo por omisión →</button><button class="concept-chip" data-concept="elio">Gauss-Markov →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 1, diap. 3–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.1–3.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 3, actividad 1 y ejercicios 3 y 5.</p></div>
      `
    },
    frisch: {
      title: "Frisch-Waugh",
      sub: "Regresar Y sobre la parte de X₁ que no se explica por las demás X.",
      esencia: `
        <div class="definition">El coeficiente β̂<sub>1</sub> de una regresión múltiple se obtiene regresando X<sub>1</sub> sobre las demás variables explicativas, tomando sus residuos r̂<sub>i1</sub>, y regresando Y sobre esos residuos.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Los residuos de la primera etapa son la variación de X₁ limpia de la influencia lineal de las otras X.</li>
          <li>La segunda regresión usa solo esa variación limpia; por eso el coeficiente es un efecto parcial.</li>
          <li>El intercepto de la segunda regresión no es el intercepto del modelo múltiple.</li>
        </ul>
        <div class="formula small">β̂<sub>1</sub> = Σ r̂<sub>i1</sub>Y<sub>i</sub> / Σ r̂<sub>i1</sub><sup>2</sup><span>r̂<sub>i1</sub>: residuos de X<sub>1</sub> sobre X<sub>2</sub>, …, X<sub>k</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: las dos etapas</span><span class="badge optional">Según el concepto: demostración algebraica</span></div>
      `,
      ejemplo: `
        <p>Querés estimar el efecto de la educación sobre el salario controlando por experiencia. Primero regresás educación sobre experiencia y te quedás con la parte de educación que no se explica por experiencia. Después regresás salario sobre esa parte. Esa pendiente es la misma que la de la regresión múltiple.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si X₁ y X₂ no están correlacionadas, la primera etapa no cambia X₁: los residuos son casi X₁ en desvíos y el coeficiente coincide con el de la regresión simple.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Pensar que la segunda regresión es “el modelo verdadero”.</strong> Es un artificio algebraico para interpretar el coeficiente múltiple.</li>
          <li><strong>Olvidar incluir la constante en la primera etapa.</strong> Sin constante, los residuos no están en desvíos y la equivalencia se rompe.</li>
          <li><strong>Confundir los residuos de X₁ con los residuos del modelo de Y.</strong> Son objetos distintos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué la primera etapa “limpia” la variable explicativa.</p></div>
      `,
      conexiones: `
        <p>Frisch-Waugh es la explicación algebraica del efecto parcial. También aparece en la discusión de multicolinealidad: si X₁ se explica muy bien con las demás, queda poca variación limpia y la estimación es menos precisa.</p>
        <div><button class="concept-chip" data-concept="parcial">Efecto parcial →</button><button class="concept-chip" data-concept="fiv">FIV →</button><button class="concept-chip" data-concept="omision">Sesgo por omisión →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 1, diap. 6–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.2 y ecuación 3.22.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2026, pregunta sobre la expresión β̂₁ = Σr̂ᵢ₁Yᵢ / Σr̂ᵢ₁².</p></div>
      `
    },
    omision: {
      title: "Sesgo por variable omitida",
      sub: "La diferencia entre el coeficiente simple y el múltiple tiene una fórmula.",
      esencia: `
        <div class="definition">Si el modelo verdadero incluye X₂ pero se estima una regresión simple sin ella, <em>β̃<sub>1,RS</sub> = β̂<sub>1,RM</sub> + δ̃<sub>1</sub>β̂<sub>2,RM</sub></em>. El segundo término es el sesgo por omisión.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El sesgo depende del efecto de la omitida sobre Y (β₂) y de su relación con X₁ (δ₁).</li>
          <li>Si alguno de los dos es cero, no hay diferencia entre simple y múltiple.</li>
          <li>El signo del sesgo es el signo del producto, no una regla fija.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: fórmula e interpretación</span><span class="badge optional">Según el concepto: casos especiales</span></div>
      `,
      ejemplo: `
        <p>Si las personas con más educación también tienen más experiencia y la experiencia aumenta el salario, omitir experiencia hace que la educación “absorba” parte de ese efecto. La pendiente simple de educación queda sesgada hacia arriba.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de interpretar un cambio de coeficiente al agregar controles, preguntate en qué dirección se mueven la omitida y X₁.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir “omitir una variable siempre sesga hacia cero”.</strong> El sesgo puede atenuar, amplificar o incluso invertir el signo; no siempre va hacia cero.</li>
          <li><strong>Creer que agregar cualquier control mejora la estimación.</strong> Un control irrelevante puede aumentar la varianza sin reducir el sesgo.</li>
          <li><strong>Comparar coeficientes de modelos con distintas muestras o transformaciones.</strong> La fórmula supone el mismo modelo y la misma muestra.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir en qué dirección se mueve el coeficiente al omitir una variable.</p></div>
      `,
      conexiones: `
        <p>Este concepto es la bisagra entre la clase 1 y la 2: explica por qué la regresión simple puede diferir de la múltiple. En la clase 9 se vuelve a discutir qué pasa cuando la omitida está correlacionada con X y no se puede incluir.</p>
        <div><button class="concept-chip" data-concept="parcial">Efecto parcial →</button><button class="concept-chip" data-concept="frisch">Frisch-Waugh →</button><button class="concept-chip" data-concept="fiv">FIV →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 1, diap. 8.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.2 y §3.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 3, ejercicio 3, inciso c.</p></div>
      `
    },
    fiv: {
      title: "FIV y multicolinealidad",
      sub: "Cuánto se infla la varianza cuando los regresores se mueven juntos.",
      esencia: `
        <div class="definition">El factor de inflación de varianza es <em>FIV<sub>j</sub> = 1 / (1 − R<sub>j</sub><sup>2</sup>)</em>, donde R<sub>j</sub><sup>2</sup> es el R² de regresar X<sub>j</sub> sobre las demás variables explicativas.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Mide cuánto se agranda la varianza del estimador por la relación lineal entre regresores.</li>
          <li>FIV = 1 cuando X<sub>j</sub> no está correlacionada con el resto; crece cuando R<sub>j</sub><sup>2</sup> se acerca a 1.</li>
          <li>Multicolinealidad imperfecta no viola Gauss-Markov; la perfecta impide estimar por MCO.</li>
        </ul>
        <div class="formula small">Var(β̂<sub>j</sub>) = σ<sup>2</sup> / [SCT<sub>j</sub>(1 − R<sub>j</sub><sup>2</sup>)]<span>FIV<sub>j</sub> = 1 / (1 − R<sub>j</sub><sup>2</sup>)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: fórmula e interpretación</span><span class="badge optional">Según el concepto: diagnóstico</span></div>
      `,
      ejemplo: `
        <p>En un modelo de consumo sobre ingreso y riqueza, ambos regresores suelen moverse juntos. La estimación puede tener coeficientes con errores estándar grandes y signos poco intuitivos, aunque el modelo siga siendo válido y el ajuste global sea alto.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Un FIV alto no te dice cuál variable eliminar. Te dice que la información para separar sus efectos es limitada.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Tratar el FIV como un test de hipótesis.</strong> Es un diagnóstico descriptivo, con reglas de pulgar.</li>
          <li><strong>Eliminar una variable solo por FIV alto.</strong> Puede generar sesgo por omisión si la variable es relevante.</li>
          <li><strong>Confundir multicolinealidad con heterocedasticidad.</strong> La primera afecta la precisión; la segunda, la validez de los errores estándar usuales.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué la varianza del estimador depende de R<sub>j</sub><sup>2</sup>.</p></div>
      `,
      conexiones: `
        <p>La multicolinealidad se estudia en detalle en la clase 2B y en el TP 5. También se conecta con la clase 6: la heterocedasticidad afecta la eficiencia y los errores estándar por un canal distinto.</p>
        <div><button class="concept-chip" data-concept="frisch">Frisch-Waugh →</button><button class="concept-chip" data-concept="r2adj">R² ajustado →</button><button class="concept-chip" data-concept="elio">Gauss-Markov →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 1, diap. 11–15; clase 2, parte 2, diap. 3–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.4 y §3.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 5, actividad 1 y ejercicios 1–4.</p></div>
      `
    },
    r2adj: {
      title: "R² ajustado",
      sub: "Una medida de ajuste que penaliza agregar regresores.",
      esencia: `
        <div class="definition">R̄² = 1 − [SCR/(n − k − 1)] / [SCT/(n − 1)]. Corrige el R² por los grados de libertad y puede disminuir cuando se agrega una variable que aporta poco.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El R² nunca baja al agregar regresores; el ajustado puede bajar.</li>
          <li>Sirve para comparar modelos con la misma variable dependiente y la misma forma funcional.</li>
          <li>No es una prueba de validez ni de causalidad: sigue siendo una medida de ajuste muestral.</li>
        </ul>
        <div class="formula small">R̄² = 1 − (1 − R²)(n − 1)/(n − k − 1)<span>n: observaciones; k: cantidad de pendientes</span></div>
        <div class="badge-row"><span class="badge always">Siempre: definición y comparación</span><span class="badge optional">Según el concepto: selección de modelos</span></div>
      `,
      ejemplo: `
        <p>Si agregás una variable que no aporta a explicar Y, el R² sube apenas, pero el R² ajustado puede bajar porque se pierde un grado de libertad. Esa es la señal de que el regresor adicional no se paga solo.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>No compares R² entre modelos con Y en niveles y Y en logaritmos: son escalas distintas y el número no es comparable.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Elegir el modelo solo por R² ajustado.</strong> Es una medida de ajuste, no de especificación correcta.</li>
          <li><strong>Comparar R² ajustado entre transformaciones distintas de Y.</strong> No son comparables.</li>
          <li><strong>Creer que un R² ajustado alto implica ausencia de sesgo.</strong> El ajuste y la identificación son problemas distintos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el R² ajustado puede bajar al agregar una variable.</p></div>
      `,
      conexiones: `
        <p>El R² ajustado se usa para comparar modelos anidados o no anidados con la misma Y. En la clase 3B se conecta con los contrastes F; en la clase 4, con la selección de modelos.</p>
        <div><button class="concept-chip" data-concept="fiv">FIV →</button><button class="concept-chip" data-concept="elio">Gauss-Markov →</button><button class="concept-chip" data-concept="parcial">Efecto parcial →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 1, diap. 16–17.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.4 y §6.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 3, ejercicio 4, inciso b.</p></div>
      `
    },
    elio: {
      title: "Gauss-Markov en regresión múltiple",
      sub: "Cinco supuestos y una propiedad: MCO es ELIO.",
      esencia: `
        <div class="definition">Bajo linealidad en parámetros, muestra aleatoria, E(u | X) = 0, ausencia de colinealidad perfecta y homocedasticidad, MCO es el mejor estimador lineal e insesgado.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>“Lineal” se refiere a linealidad en los parámetros y en Y, no a linealidad en las X.</li>
          <li>E(u | X) = 0 sostiene el insesgamiento; la homocedasticidad sostiene la eficiencia.</li>
          <li>La normalidad no es un supuesto de Gauss-Markov; se agrega para inferencia exacta en muestras pequeñas.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: lista y propiedad</span><span class="badge optional">Según el concepto: qué pasa si falla</span></div>
      `,
      ejemplo: `
        <p>Si la varianza del error cambia con las X, MCO sigue siendo insesgado, pero deja de ser ELIO y los errores estándar habituales no son válidos. Ese es el punto de partida de la clase 6.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando un supuesto falla, preguntate qué propiedad se rompe. No alcanza con decir “el modelo está mal”.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Incluir la normalidad entre los supuestos de Gauss-Markov.</strong> Es un supuesto adicional del modelo lineal clásico.</li>
          <li><strong>Creer que homocedasticidad es necesaria para el insesgamiento.</strong> No lo es.</li>
          <li><strong>Pensar que Gauss-Markov garantiza causalidad.</strong> Solo garantiza propiedades del estimador bajo el modelo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué propiedad se rompe si falla cada supuesto.</p></div>
      `,
      conexiones: `
        <p>Gauss-Markov conecta la clase 1 con la 3 y con la 6. En la clase 2B se reescribe en notación matricial para demostrar insesgamiento y varianza.</p>
        <div><button class="concept-chip" data-concept="fiv">FIV →</button><button class="concept-chip" data-concept="r2adj">R² ajustado →</button><button class="concept-chip" data-concept="omision">Sesgo por omisión →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 2, parte 1, diap. 10 y 18–19.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §3.5.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2025, supuestos de Gauss-Markov.</p></div>
      `
    }
  },

  practice: {
    eyebrow: "De la teoría a la guía",
    title: "Práctica de la clase",
    intro: "La guía de trabajos prácticos ya está integrada al sitio: cada tarjeta abre el ejercicio exacto. Empezá por la actividad conceptual y después pasá a los ejercicios con datos.",
    guideHref: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-3",
    exercises: [
      {
        label: "TP 3 · Actividad 1",
        title: "¿Cuándo coinciden simple y múltiple?",
        text: "Explicá en qué casos la regresión simple de Y sobre X₁ produce la misma pendiente que la múltiple con X₂. Es la pregunta que ordena toda la clase.",
        tags: ["Razonar", "Sin datos"],
        href: "guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-2"
      },
      {
        label: "TP 3 · Ej. 1",
        title: "Regresión matricial con datos",
        text: "Calculá X′X, X′Y y los coeficientes por MCO. Después proponé qué podrían representar Y, X₁ y X₂ en un problema económico.",
        tags: ["Calcular", "Matrices"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-2"
      },
      {
        label: "TP 3 · Ej. 2",
        title: "Residuos ortogonales a las X",
        text: "Verificá numéricamente que Σû = 0 y que ΣX₁û = ΣX₂û = 0. Explicá por qué esas igualdades son algebraicas y no un supuesto.",
        tags: ["Verificar", "Residuos"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-2"
      },
      {
        label: "TP 3 · Ej. 3",
        title: "wage1: interpretación y relación entre estimadores",
        text: "Estimá salario en función de educación y experiencia. Interpretá los coeficientes y verificá la relación β̃₁ = β̂₁ + β̂₂δ̂₁.",
        tags: ["Interpretar", "Base real"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-3-2"
      },
      {
        label: "TP 3 · Ej. 6",
        title: "ENGHO: comparar simple y múltiple",
        text: "Estimá el modelo de gasto con ingreso y cantidad de miembros. Compará con la regresión simple y volvé a estimar con variables en desvíos.",
        tags: ["Aplicar", "Comparar modelos"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-6-2"
      }
    ],
    rLab: {
      eyebrow: "Laboratorio de lectura",
      tag: "TP 3 · Ej. 1",
      title: "Cómo se lee una salida de regresión múltiple",
      intro: "La salida de lm() con dos regresores muestra lo que el álgebra anticipa: coeficientes parciales, errores estándar, t, p, R² y F. La lectura económica es una convención didáctica.",
      dataNote: "La salida usa los datos del TP 3, Ej. 1. Para la lectura económica suponemos Y = ventas mensuales (miles de pesos), X1 = gasto en publicidad (miles) y X2 = precio relativo. El ejercicio no fija esas variables: la convención sirve para practicar la interpretación.",
      script: `Y <- c(64, 71, 53, 67, 55, 58, 77, 57, 56, 51, 76, 68, 70, 63, 62, 60)
X1 <- c(8, 11, 6, 11, 8, 7, 10, 9, 10, 7, 12, 9, 10, 9, 9, 8)
X2 <- c(4, 9, 2, 1, 9, 7, 4, 7, 2, 8, 3, 4, 2, 9, 1, 8)

datos <- data.frame(Y, X1, X2)
modelo <- lm(Y ~ X1 + X2, data = datos)

summary(modelo)
confint(modelo)`,
      output: `Call:
lm(formula = Y ~ X1 + X2, data = datos)

Residuals:
     Min       1Q   Median       3Q      Max 
-11.1500  -3.7750   0.9000   2.7375  10.1500 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept) 30.45000    8.95840   3.399  0.00475 **
X1           3.70000    0.88132   4.198  0.00104 **
X2          -0.15000    0.47109  -0.318  0.75523   
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 5.371 on 13 degrees of freedom
Multiple R-squared:  0.6044,	Adjusted R-squared:  0.5435 
F-statistic: 9.93 on 2 and 13 DF,  p-value: 0.002412`,
      confint: `                 2.5 %     97.5 %
(Intercept) 11.0965532 49.8034468
X1           1.7960167  5.6039833
X2          -1.1677218  0.8677218`,
      readingTable: [
        { element: "Call", meaning: "Fórmula estimada y base de datos.", how: "Verificá que Y, X1 y X2 sean las variables correctas." },
        { element: "Residuals", meaning: "Resumen de cinco números de los residuos.", how: "No son coeficientes: mirá simetría y valores extremos." },
        { element: "Estimate", meaning: "Coeficiente estimado.", how: "Es un efecto parcial: mantiene fija la otra X incluida." },
        { element: "Std. Error", meaning: "Error estándar del estimador.", how: "Mide precisión: más chico, estimación más precisa." },
        { element: "t value", meaning: "Estimate / Std. Error.", how: "Bajo H0: βj = 0, se compara con t de n − k − 1 gl." },
        { element: "Pr(>|t|)", meaning: "p-valor del contraste individual.", how: "No es la probabilidad de que H0 sea cierta." },
        { element: "Residual standard error", meaning: "σ̂ en unidades de Y.", how: "Dispersión de Y alrededor del plano estimado." },
        { element: "Multiple R-squared", meaning: "Proporción de variación muestral de Y explicada.", how: "Ajuste, no causalidad." },
        { element: "Adjusted R-squared", meaning: "R² corregido por grados de libertad.", how: "Útil para comparar modelos con la misma Y." },
        { element: "F-statistic", meaning: "Contraste de significancia global.", how: "H0: todos los slopes incluidos son cero." }
      ],
      econometric: `
        <p><strong>β̂₁ = 3,70.</strong> Es positivo y significativo al 1% (t = 4,20; p = 0,00104). El IC del 95% va de 1,80 a 5,60 y no incluye el cero.</p>
        <p><strong>β̂₂ = −0,15.</strong> No es significativamente distinto de cero (t = −0,32; p = 0,755). El IC incluye valores positivos y negativos: con esta muestra no se puede separar un efecto parcial de X2.</p>
        <p><strong>β̂₀ = 30,45.</strong> Es significativo (p = 0,00475), pero interpretarlo como “Y cuando X1 = X2 = 0” exige que ese punto tenga sentido económico.</p>
        <p><strong>R² = 0,604; R² ajustado = 0,544.</strong> El modelo explica el 60,4% de la variación muestral de Y. El ajustado penaliza los dos regresores.</p>
        <p><strong>F = 9,93; p = 0,0024.</strong> Se rechaza que todos los slopes sean conjuntamente cero. Eso no implica que cada coeficiente individual sea significativo.</p>
      `,
      economic: `
        <p>Si Y son ventas, X1 publicidad y X2 precio, una unidad más de publicidad se asocia con <strong>3,7 mil pesos más de ventas</strong>, manteniendo el precio constante. El signo es el esperado y la estimación es precisa.</p>
        <p>El coeficiente del precio es negativo pero muy impreciso: no hay evidencia suficiente para afirmar que el precio afecta las ventas en esta muestra. No es lo mismo que decir que no tiene efecto. La lectura causal sigue requiriendo discutir variables omitidas y diseño.</p>
      `,
      errors: [
        "Decir que β̂₁ es el efecto total de X1. Es un efecto parcial: mantiene constante X2.",
        "Concluir que X2 no afecta a Y porque p = 0,755. La estimación es imprecisa; no prueba ausencia de efecto.",
        "Leer el intercepto como las ventas con publicidad y precio cero sin verificar si ese punto está en el rango de los datos.",
        "Comparar este R² con el de una regresión simple de otra variable dependiente o con otra transformación de Y."
      ],
      checklist: [
        "Escribí la fórmula estimada con números.",
        "Interpretá cada pendiente como efecto parcial, aclarando qué se mantiene constante.",
        "Reportá error estándar, t, p-valor e intervalo de confianza.",
        "Distinguí significancia individual (t) de significancia conjunta (F).",
        "Interpretá R² y R² ajustado sin confundirlos con causalidad.",
        "Revisá si el intercepto tiene sentido económico."
      ]
    },
    partials: [
      {
        label: "1P 2025",
        text: "Supuestos de Gauss-Markov y su papel en el teorema.",

      },
      {
        label: "1P 2026",
        text: "Interpretación de la expresión β̂₁ = Σr̂ᵢ₁Yᵢ / Σr̂ᵢ₁².",

      },
    ]
  },

  assessment: {
    eyebrow: "Autoevaluación",
    title: "Preguntas de razonamiento",
    intro: "Cada pregunta intenta exponer si entendés la lógica de la regresión múltiple o si solo recordás definiciones. Respondé antes de abrir la solución.",
    questions: [
      {
        q: "¿Qué cambia en el término de error cuando pasás de una regresión simple a una múltiple?",
        a: "El error de la regresión múltiple ya no contiene a las variables que se incluyeron como regresores. Sigue conteniendo todos los factores no observados y omitidos. Por eso el error es más “chico” en contenido, pero no se observa ni desaparece."
      },
      {
        q: "¿Qué significa exactamente “manteniendo todo lo demás constante” en un coeficiente múltiple?",
        a: "Significa mantener constantes las variables explicativas incluidas en el modelo. No significa que se hayan controlado todos los factores del mundo. La interpretación es condicional al conjunto de regresores que efectivamente están en la ecuación."
      },
      {
        q: "Explicá Frisch-Waugh en dos etapas y decí qué representa el residuo de la primera etapa.",
        a: "Primero se regresa X₁ sobre las demás X y se obtienen sus residuos. Esos residuos son la parte de X₁ que no está correlacionada linealmente con las otras variables explicativas. Después se regresa Y sobre esos residuos; la pendiente resultante es β̂₁ del modelo múltiple."
      },
      {
        q: "¿Cuándo coinciden los coeficientes de la regresión simple y de la múltiple?",
        a: "Cuando β₂ = 0 en la muestra (la variable omitida no afecta a Y) o cuando δ₁ = 0 (X₁ y X₂ no están correlacionadas linealmente). Si los regresores son ortogonales, coinciden todos los coeficientes, incluido el intercepto."
      },
      {
        q: "¿Omitir una variable relevante siempre sesga el coeficiente hacia cero?",
        a: "No. El sesgo es δ₁β₂ y su signo es el signo de ese producto. Puede atenuar el coeficiente, amplificarlo o incluso invertir su signo; la regla “siempre hacia cero” solo vale en casos particulares."
      },
      {
        q: "¿Qué le pasa a la varianza de β̂₁ si X₁ está muy correlacionada con X₂? ¿Se viola Gauss-Markov?",
        a: "La varianza aumenta porque R₁² es alto y el FIV = 1/(1 − R₁²) es mayor. No se viola Gauss-Markov si la correlación no es perfecta: MCO sigue siendo insesgado, pero menos preciso. Si la correlación es perfecta, X′X no es invertible y no se puede estimar."
      },
      {
        q: "¿Por qué el R² ajustado es más útil que el R² para comparar modelos?",
        a: "Porque el R² nunca baja al agregar regresores, aunque sean irrelevantes. El R² ajustado corrige por grados de libertad y puede bajar cuando la variable adicional no aporta lo suficiente. Aun así, no es una prueba de validez ni de causalidad."
      },
      {
        q: "Un estudiante dice: “Incluí veinte controles, así que mi coeficiente es causal”. ¿Qué le responderías?",
        a: "Que la cantidad de controles no garantiza exogeneidad. Todavía pueden quedar variables omitidas, error de medida, simultaneidad o selección. La interpretación causal requiere un diseño y supuestos que no se resuelven solo agregando regresores."
      }
    ]
  },

  review: {
    eyebrow: "Cierre y consolidación",
    title: "Kit de repaso y sesión de 90 minutos",
    intro: "Empezá por el formulario, seguí con el drill y la sesión, y cerrá con el plan de 7 días. La idea es repasar sin volver a leer todo desde cero.",
    formulas: [
      { title: "Modelo múltiple", eq: "Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> + … + β<sub>k</sub>X<sub>ki</sub> + u<sub>i</sub>", note: "k pendientes y un intercepto. La linealidad es en los parámetros, no necesariamente en las variables." },
      { title: "Efecto parcial", eq: "∂E(Y | X) / ∂X<sub>j</sub> = β<sub>j</sub>", note: "Cambio esperado en Y ante una unidad más de X<sub>j</sub>, manteniendo fijas las demás X incluidas." },
      { title: "Cambio lineal", eq: "ΔŶ<sub>i</sub> = β̂<sub>1</sub>ΔX<sub>1i</sub> + … + β̂<sub>k</sub>ΔX<sub>ki</sub>", note: "Con ΔX<sub>2</sub> = … = ΔX<sub>k</sub> = 0, ΔŶ = β̂<sub>1</sub>ΔX<sub>1</sub>." },
      { title: "Frisch-Waugh", eq: "β̂<sub>1</sub> = Σ r̂<sub>i1</sub>Y<sub>i</sub> / Σ r̂<sub>i1</sub><sup>2</sup>", note: "r̂<sub>i1</sub> son los residuos de regresar X<sub>1</sub> sobre las demás variables explicativas." },
      { title: "Simple vs múltiple", eq: "β̃<sub>1,RS</sub> = β̂<sub>1,RM</sub> + δ̃<sub>1</sub>β̂<sub>2,RM</sub>", note: "El segundo término es el sesgo por omisión. Depende de δ<sub>1</sub> y β<sub>2</sub>." },
      { title: "Coincidencia", eq: "β̃<sub>1,RS</sub> = β̂<sub>1,RM</sub> si β<sub>2</sub> = 0 o δ<sub>1</sub> = 0", note: "Si los regresores son ortogonales, coinciden todos los coeficientes." },
      { title: "Varianza del estimador", eq: "Var(β̂<sub>j</sub>) = σ<sup>2</sup> / [SCT<sub>j</sub>(1 − R<sub>j</sub><sup>2</sup>)]", note: "Más ruido o más colinealidad aumentan la varianza; más variación de X<sub>j</sub> la reduce." },
      { title: "FIV", eq: "FIV<sub>j</sub> = 1 / (1 − R<sub>j</sub><sup>2</sup>)", note: "R<sub>j</sub><sup>2</sup> es el R² de X<sub>j</sub> sobre las demás X. FIV > 10 es una regla de pulgar." },
      { title: "Varianza estimada", eq: "σ̂<sup>2</sup> = SCR / (n − k − 1)", note: "Pierde k + 1 grados de libertad: intercepto y k pendientes." },
      { title: "R² ajustado", eq: "R̄<sup>2</sup> = 1 − (1 − R<sup>2</sup>)(n − 1)/(n − k − 1)", note: "Puede bajar al agregar una variable irrelevante. Sirve para comparar modelos con la misma Y." },
      { title: "Gauss-Markov", eq: "GM 1–5 ⇒ MCO es ELIO", note: "Linealidad, muestra aleatoria, E(u|X) = 0, no colinealidad perfecta y homocedasticidad." }
    ],
    drills: [
      { q: "Escribí el modelo de regresión múltiple y explicá qué es cada término.", a: "Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> + … + β<sub>k</sub>X<sub>ki</sub> + u<sub>i</sub>. β<sub>0</sub> es el intercepto; β<sub>j</sub>, el efecto parcial de X<sub>j</sub>; u, el error no observable." },
      { q: "Interpretá β̂<sub>j</sub> en una frase.", a: "Es el cambio esperado en Y ante una unidad más de X<sub>j</sub>, manteniendo constantes las demás variables explicativas incluidas en el modelo." },
      { q: "Explicá Frisch-Waugh en dos etapas.", a: "Primero regresá X<sub>1</sub> sobre las demás X y obtené r̂<sub>1</sub>. Después regresá Y sobre r̂<sub>1</sub>: esa pendiente es β̂<sub>1</sub> del modelo múltiple." },
      { q: "Escribí la relación entre el estimador simple y el múltiple.", a: "β̃<sub>1,RS</sub> = β̂<sub>1,RM</sub> + δ̃<sub>1</sub>β̂<sub>2,RM</sub>, donde δ̃<sub>1</sub> es la pendiente de X<sub>2</sub> sobre X<sub>1</sub>." },
      { q: "¿Cuándo coinciden la regresión simple y la múltiple?", a: "Cuando β<sub>2</sub> = 0 en la muestra o cuando δ<sub>1</sub> = 0. Si los regresores son ortogonales, coinciden todos los coeficientes." },
      { q: "Escribí Var(β̂<sub>j</sub>) y el FIV.", a: "Var(β̂<sub>j</sub>) = σ<sup>2</sup>/[SCT<sub>j</sub>(1 − R<sub>j</sub><sup>2</sup>)]; FIV<sub>j</sub> = 1/(1 − R<sub>j</sub><sup>2</sup>)." },
      { q: "¿Por qué el R² ajustado puede bajar al agregar una variable?", a: "Porque la corrección por grados de libertad penaliza la pérdida de un grado de libertad. Si la variable aporta poco, el ajuste no compensa." },
      { q: "Enunciá los cinco supuestos de Gauss-Markov en regresión múltiple.", a: "Linealidad en parámetros; muestra aleatoria; E(u|X) = 0; ausencia de colinealidad perfecta; homocedasticidad Var(u|X) = σ<sup>2</sup>." }
    ],
    sourceGuide: [
      { stuck: "No entiendo qué se mantiene constante", source: "Clase 2A, diap. 5–7; Wooldridge §3.2." },
      { stuck: "No puedo explicar Frisch-Waugh", source: "Clase 2A, diap. 6–7; Wooldridge §3.2." },
      { stuck: "No sé cuándo coinciden simple y múltiple", source: "Clase 2A, diap. 8; Wooldridge §3.2." },
      { stuck: "No entiendo la varianza ni el FIV", source: "Clase 2A, diap. 11–15; Wooldridge §3.5." },
      { stuck: "No sé cuándo usar el R² ajustado", source: "Clase 2A, diap. 16–17; Wooldridge §3.4 y §6.3." },
      { stuck: "No puedo enunciar Gauss-Markov", source: "Clase 2A, diap. 10 y 18–19; Wooldridge §3.5." }
    ],
    session: [
      { time: "0–10", title: "Pregunta guía", text: "¿Qué efecto parcial quiero estimar y qué variables deben quedar fijas? Escribí una respuesta de tres líneas." },
      { time: "10–30", title: "Efecto parcial y Frisch-Waugh", text: "Explicá las dos etapas con un ejemplo de salario, educación y experiencia. Fuente: clase 2A, diap. 3–7." },
      { time: "30–50", title: "Simple vs múltiple", text: "Escribí la fórmula β̃₁ = β̂₁ + δ̂₁β̂₂ y analizá tres casos: β₂ = 0, δ₁ = 0 y ambos distintos de cero." },
      { time: "50–70", title: "Práctica", text: "TP 3, ejercicios 1 y 2. Verificá X′X, X′Y, los coeficientes y la ortogonalidad de los residuos." },
      { time: "70–85", title: "Preguntas de parcial", text: "1P 2025, Gauss-Markov; 1P 2026, Frisch-Waugh. Respondé sin mirar la solución." },
      { time: "85–90", title: "Cierre", text: "Anotá una idea que puedas enseñar en dos minutos y una que todavía no puedas explicar sin mirar." }
    ],
    kit: [
      { k: "Kit 01", title: "Una página de ideas clave", text: "Efecto parcial, Frisch-Waugh, sesgo por omisión, FIV y R² ajustado, con una frase por concepto." },
      { k: "Kit 02", title: "Tabla de errores", text: "Qué se confunde, por qué y cómo corregirlo. La sección 07 es el punto de partida." },
      { k: "Kit 03", title: "Ocho preguntas", text: "La pestaña de Autoevaluación, ordenada de menor a mayor dificultad." },
      { k: "Kit 04", title: "Plan de 7 días", text: "Una rutina corta para no volver a leer todo desde cero." }
    ],
    plan: [
      { day: "Día 1", title: "Teoría y mapa", text: "Leé la clase completa y explicá el mapa de los cuatro pasos sin mirar." },
      { day: "Día 2", title: "TP 3, actividad 1 y ejercicio 1", text: "Respondé la actividad conceptual y calculá la regresión matricial." },
      { day: "Día 3", title: "TP 3, ejercicios 2 y 3", text: "Verificá residuos e interpretá los coeficientes de wage1." },
      { day: "Día 4", title: "Parciales", text: "Respondé las preguntas de 1P 2025–2026 relacionadas con la clase 2A." },
      { day: "Día 5", title: "Errores frecuentes", text: "Releé la tabla de errores y explicá cada corrección con un ejemplo." },
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
        title: "Clase 2 — Regresión múltiple, parte 1",
        text: "Fuente principal de la explicación, el orden y los énfasis de esta clase.",
        loc: "19 diapositivas · diap. 3–19"
      },
      {
        type: "Libro",
        typeClass: "book",
        title: "Wooldridge — Introducción a la Econometría, 4.ª ed.",
        text: "Cap. 3: motivación, mecánica e interpretación de MCO, bondad de ajuste, varianza de los estimadores y Gauss-Markov.",
        loc: "Cap. 3 · §3.1–3.5; Cap. 6 · §6.3"
      },
      {
        type: "Guía",
        typeClass: "",
        title: "Guía de Trabajos Prácticos 2026 — TP 3",
        text: "Actividad 1 y ejercicios 1–6. El TP 5 se usa como ampliación para multicolinealidad.",
        loc: "TP 3 · ejercicios 1–6",
        href: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-3"
      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2025",
        text: "Supuestos de Gauss-Markov y su papel en el teorema.",
        loc: "Solución orientativa",

      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2026",
        text: "Interpretación de la expresión β̂₁ = Σr̂ᵢ₁Yᵢ / Σr̂ᵢ₁².",
        loc: "Solución orientativa",

      }
    ]
  }
};
