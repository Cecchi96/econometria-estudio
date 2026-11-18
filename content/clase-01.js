window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-01"] = {
  id: "clase-01",
  num: "01",
  eyebrow: "Clase 01 · Fundamentos",
  title: "Regresión lineal simple",
  lead: "Antes de estimar, entendé qué pregunta responde el modelo, qué supone y qué no promete.",
  question: "¿Cómo describimos la relación entre dos variables sin confundir asociación con causalidad?",
  pills: ["43 diapositivas", "TP 2", "1P 2024–2026", "6 conceptos clave"],

  sections: [
    {
      id: "c01-s01",
      number: "01",
      title: "La idea central",
      blocks: [
        {
          type: "p",
          id: "c01-s01-p01",
          html: 'La regresión simple describe cómo cambia el <strong>valor esperado</strong> de una variable <span class="concept" data-concept="frp" tabindex="0" role="button">Y</span> cuando cambia otra variable X. No es una máquina de causalidad: es una forma de aproximar, con una recta, la relación promedio entre dos variables en una población.'
        },
        {
          type: "p",
          id: "c01-s01-p02",
          html: 'El modelo separa dos cosas: la parte que podemos explicar con X y todo lo demás, que queda en el <span class="concept" data-concept="error" tabindex="0" role="button">error</span>. Esa separación es la que permite estimar los parámetros y, más tarde, hacer inferencia.'
        },
        {
          type: "formula",
          main: "Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub> + u<sub>i</sub>",
          legend: [
            { key: "β₀", text: "Nivel de la recta. Puede no tener sentido económico." },
            { key: "β₁", text: "Cambio esperado en Y ante una unidad más de X." },
            { key: "u", text: "Factores no observados que también afectan a Y." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "β₀", title: "Intercepto", text: "Valor esperado de Y cuando X = 0, si ese valor tiene sentido." },
            { sym: "β₁", title: "Pendiente", text: "Cambio esperado en Y ante una unidad más de X, manteniendo constantes los demás factores." },
            { sym: "u", title: "Error", text: "Lo que el modelo no observa. Nunca desaparece por completo." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Cuidado con la palabra “efecto”",
          html: "En el modelo, β₁ es un cambio esperado <em>ceteris paribus</em>. Para interpretarlo como un efecto causal hacen falta supuestos adicionales y un diseño que los sostenga. La regresión, por sí sola, no los garantiza."
        }
      ]
    },
    {
      id: "c01-s02",
      number: "02",
      title: "De la población a la muestra",
      blocks: [
        {
          type: "p",
          id: "c01-s02-p01",
          html: 'La <span class="concept" data-concept="frp" tabindex="0" role="button">función de regresión poblacional (FRP)</span> es el objeto teórico que querríamos conocer: el valor esperado de Y para cada valor de X. Como no la observamos, usamos una muestra para estimar la <strong>función de regresión muestral (FRM)</strong>.'
        },
        {
          type: "compare",
          left: {
            tag: "Población",
            title: "FRP",
            text: "Es única y desconocida. Contiene los parámetros β₀ y β₁.",
            eq: "E(Y | X) = β₀ + β₁X"
          },
          right: {
            tag: "Muestra",
            title: "FRM",
            text: "Cambia de una muestra a otra. Contiene los estimadores β̂₀ y β̂₁.",
            eq: "Ŷ = β̂₀ + β̂₁X"
          }
        },
        {
          type: "p",
          id: "c01-s02-p02",
          html: 'La distinción entre <span class="concept" data-concept="error" tabindex="0" role="button">error y residuo</span> es la misma distinción, llevada a los objetos concretos: el error pertenece al modelo poblacional; el residuo se construye después de estimar, con la recta de la muestra.'
        },
        {
          type: "callout",
          variant: "teal",
          label: "Una señal de que lo entendiste",
          html: "Podés explicar por qué dos muestras distintas de la misma población producen dos rectas estimadas distintas, aunque la FRP sea una sola."
        }
      ]
    },
    {
      id: "c01-s03",
      number: "03",
      title: "MCO: la recta que mejor ajusta",
      blocks: [
        {
          type: "p",
          id: "c01-s03-p01",
          html: 'El método de <span class="concept" data-concept="mco" tabindex="0" role="button">mínimos cuadrados ordinarios (MCO)</span> elige los valores de β̂₀ y β̂₁ que minimizan la suma de los residuos al cuadrado. No busca “la recta verdadera”: busca la recta que mejor ajusta <em>esta</em> muestra según ese criterio.'
        },
        { type: "chart" },
        {
          type: "p",
          id: "c01-s03-p02",
          html: "La solución tiene una forma muy intuitiva: la pendiente estimada es la covarianza entre X e Y dividida por la varianza de X. Si X varía poco, la pendiente se estima con menos precisión."
        },
        {
          type: "formula",
          main: "β̂<sub>1</sub> = Cov(X, Y) / Var(X)",
          legend: [
            { key: "Numerador", text: "Cómo se mueven X e Y en la misma dirección." },
            { key: "Denominador", text: "Cuánta variación propia tiene X." },
            { key: "β̂₀", text: "Ȳ − β̂₁X̄. La recta pasa por las medias." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Error frecuente",
          html: "Creer que MCO minimiza la suma de los residuos sin elevarlos al cuadrado. Esa suma se anula por la condición de primer orden y no alcanza para identificar una recta. Lo que se minimiza es la suma de los <strong>cuadrados</strong>."
        }
      ]
    },
    {
      id: "c01-s04",
      number: "04",
      title: "Qué garantiza Gauss-Markov",
      blocks: [
        {
          type: "p",
          id: "c01-s04-p01",
          html: 'Los <span class="concept" data-concept="gm" tabindex="0" role="button">supuestos de Gauss-Markov</span> no son un ritual: cada uno habilita una propiedad distinta. Si falla uno, no “falla todo”, pero deja de valer la propiedad que dependía de él.'
        },
        {
          type: "assumptions",
          rows: [
            { title: "Linealidad en los parámetros", text: "Permite escribir el modelo y derivar MCO." },
            { title: "Muestra aleatoria", text: "Da la base para hablar de distribuciones muestrales." },
            { title: "E(u | X) = 0", text: "Sostiene el insesgamiento de MCO." },
            { title: "Variabilidad en X", text: "Permite estimar una pendiente; sin variación, no hay identificación." },
            { title: "Homocedasticidad", text: "Var(u | X) constante. Sostiene la eficiencia y los errores estándar usuales." }
          ]
        },
        {
          type: "p",
          id: "c01-s04-p02",
          html: 'Con estos supuestos, MCO es el mejor estimador lineal insesgado (ELIO). La normalidad de los errores <strong>no</strong> forma parte de Gauss-Markov: se agrega en el modelo lineal clásico para obtener distribuciones exactas t y F en muestras pequeñas.'
        },
        {
          type: "p",
          id: "c01-s04-p03",
          html: 'El <span class="concept" data-concept="r2" tabindex="0" role="button">R²</span> merece una advertencia aparte. Mide la proporción de la variación muestral de Y que el modelo explica linealmente. Es una medida de ajuste, no de causalidad ni de validez del modelo.'
        },
        {
          type: "callout",
          variant: "teal",
          label: "Para conectar",
          html: "Si la varianza del error cambia con X, MCO sigue siendo insesgado, pero deja de ser ELIO y los errores estándar habituales no son válidos. Eso es exactamente lo que vas a estudiar en la clase 6."
        },
        {
          type: "miniCheck",
          id: "c01-check-01",
          question: "Si β̂₁ = 0,8, ¿podés decir que un año más de educación causa $0,8 más de salario?",
          intro: "Antes de responder, separá tres cosas: qué estima el modelo, qué supone y qué haría falta para defender una interpretación causal.",
          answer: "<strong>No, no directamente.</strong> β̂₁ describe una asociación muestral condicional al modelo. Para interpretarlo causalmente necesitás supuestos adicionales —por ejemplo, exogeneidad y ausencia de variables omitidas relevantes— y un diseño que los sostenga. La clase 9 va a profundizar en qué ocurre cuando X está correlacionada con el error."
        }
      ]
    },
    {
      id: "c01-s05",
      number: "05",
      title: "Errores frecuentes y señales",
      blocks: [
        {
          type: "p",
          id: "c01-s05-p01",
          html: "Estos son los errores que más aparecen cuando se estudia la clase 1 por primera vez. No alcanza con reconocerlos: conviene poder explicar por qué ocurren y cómo se corrigen."
        },
        {
          type: "errorTable",
          rows: [
            {
              error: "Confundir error con residuo",
              why: "El error es poblacional y no se observa; el residuo se calcula con la muestra.",
              fix: "Preguntate siempre: ¿estoy hablando de u o de û?"
            },
            {
              error: "Creer que un R² alto valida el modelo",
              why: "El R² mide ajuste lineal, no causalidad ni cumplimiento de supuestos.",
              fix: "Mirá también los supuestos, los errores estándar y el diseño."
            },
            {
              error: "Decir que β̂ es insesgado porque “está cerca” del parámetro",
              why: "El insesgamiento es una propiedad de la distribución muestral, no de una estimación puntual.",
              fix: "Distinguí insesgamiento, precisión y consistencia."
            },
            {
              error: "Incluir la normalidad entre los supuestos de Gauss-Markov",
              why: "La normalidad se agrega en el modelo lineal clásico para inferencia exacta.",
              fix: "Separá Gauss-Markov de los supuestos adicionales del MLC."
            }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Señal de alerta",
          html: "Si no podés explicar qué propiedad se rompe cuando falla cada supuesto, todavía estás memorizando la lista en lugar de entender el modelo."
        }
      ]
    },
    {
      id: "c01-s06",
      number: "06",
      title: "Mapa de la clase",
      blocks: [
        {
          type: "p",
          id: "c01-s06-p01",
          html: "Una secuencia para avanzar sin perder de vista el conjunto. Cada paso deja un resultado verificable."
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Entender la pregunta", text: "Qué relación se quiere describir y por qué." },
            { n: "2", title: "Distinguir población y muestra", text: "FRP, FRM, error y residuo." },
            { n: "3", title: "Derivar y aplicar MCO", text: "Pendiente, intercepto y propiedades." },
            { n: "4", title: "Interpretar con límites", text: "Supuestos, R² y qué no promete el modelo." }
          ]
        },
        {
          type: "sourceStrip",
          chips: [
            { label: "Clase 1", text: "diap. 3–43" },
            { label: "Wooldridge 4ed", text: "§2.1–2.5, pp. 22–58" },
            { label: "TP 2", text: "ejercicios 1–7" },
            { label: "Parciales", text: "1P 2024–2026" }
          ]
        }
      ]
    }
  ],

  concepts: {
    error: {
      title: "Error y residuo",
      sub: "Dos objetos parecidos que no son lo mismo.",
      esencia: `
        <div class="definition">El error <em>u<sub>i</sub></em> es la diferencia entre Y y su valor esperado poblacional. El residuo <em>û<sub>i</sub></em> es la diferencia entre Y y el valor ajustado por la recta estimada.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El error pertenece al modelo poblacional; no se observa.</li>
          <li>El residuo se construye después de estimar, con la muestra.</li>
          <li>Los residuos cumplen Σû = 0 y ΣXû = 0 por construcción; los errores no tienen por qué cumplirlo.</li>
        </ul>
        <div class="formula small">u<sub>i</sub> = Y<sub>i</sub> − (β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub>)<span>poblacional</span><br>û<sub>i</sub> = Y<sub>i</sub> − Ŷ<sub>i</sub><span>muestral</span></div>
        <div class="badge-row"><span class="badge always">Siempre: definición y distinción</span><span class="badge optional">Según el concepto: derivación</span></div>
      `,
      ejemplo: `
        <p>Imaginá que el salario esperado de una persona con 12 años de educación es $100. Si observás $115, el error poblacional es $15. Pero la recta estimada con tu muestra puede predecir $108: el residuo es $7. Son números distintos porque uno usa la FRP y el otro la FRM.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando decís “el modelo se equivocó por $7”, estás hablando del residuo. El error poblacional nunca lo ves.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir “el residuo es el error que cometió el modelo”</strong> sin distinguir población y muestra.</li>
          <li><strong>Creer que Σû = 0 implica E(u) = 0.</strong> La primera es una propiedad algebraica de MCO; la segunda es un supuesto poblacional.</li>
          <li><strong>Pensar que los residuos son independientes de X.</strong> Por construcción están incorrelacionados con las X incluidas, no con cualquier variable.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué los residuos siempre suman cero, pero los errores no.</p></div>
      `,
      conexiones: `
        <p>Este concepto es la bisagra entre la FRP y MCO. También vuelve en la clase 3, cuando la inferencia necesita distinguir el error del residuo para construir estimadores de σ².</p>
        <div><button class="concept-chip" data-concept="frp">FRP y FRM →</button><button class="concept-chip" data-concept="mco">MCO →</button><button class="concept-chip" data-concept="insesgado">Insesgamiento →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 1, diap. 11, 16 y 20. La distinción se explicita al pasar del modelo teórico al estimado.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §2.1, pp. 22–26; §2.3, pp. 36–40.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024, V/F sobre residuos; 1P 2025, pregunta sobre residuos como variables aleatorias; 1P 2026, pregunta sobre modelo probabilístico.</p></div>
      `
    },
    frp: {
      title: "FRP y FRM",
      sub: "La función que querríamos conocer y la que efectivamente estimamos.",
      esencia: `
        <div class="definition">La FRP es <em>E(Y | X) = β₀ + β₁X</em>, la relación promedio poblacional. La FRM es <em>Ŷ = β̂₀ + β̂₁X</em>, la recta estimada con una muestra.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La FRP es única y desconocida; contiene parámetros.</li>
          <li>La FRM cambia de una muestra a otra; contiene estimadores.</li>
          <li>Ambas son lineales en los parámetros, no necesariamente en las variables.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: población vs muestra</span><span class="badge optional">Según el concepto: forma funcional</span></div>
      `,
      ejemplo: `
        <p>Si tomaras dos muestras aleatorias de la misma población y estimaras la relación entre salario y educación, obtendrías dos pendientes distintas. La FRP es una sola; las FRM son muchas.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando reportás β̂₁, reportás una FRM. La pregunta inferencial es qué tan lejos puede estar de la FRP.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir “la recta estimada es la verdadera FRP”.</strong> Es una estimación, no el objeto poblacional.</li>
          <li><strong>Confundir “lineal en parámetros” con “lineal en X”.</strong> Un modelo log-lineal puede ser lineal en parámetros.</li>
          <li><strong>Olvidar que la FRM tiene distribución muestral.</strong> Por eso importan el insesgamiento y la varianza.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué dos muestras producen dos rectas distintas.</p></div>
      `,
      conexiones: `
        <p>La FRP es el objeto que MCO intenta estimar. La distancia entre FRP y FRM es la que después estudia la inferencia.</p>
        <div><button class="concept-chip" data-concept="error">Error y residuo →</button><button class="concept-chip" data-concept="mco">MCO →</button><button class="concept-chip" data-concept="insesgado">Insesgamiento →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 1, diap. 6–8.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §2.1, pp. 22–26.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2026, pregunta sobre modelo probabilístico.</p></div>
      `
    },
    mco: {
      title: "Mínimos cuadrados ordinarios",
      sub: "El criterio que define la recta estimada.",
      esencia: `
        <div class="definition">MCO elige β̂₀ y β̂₁ para minimizar la suma de los residuos al cuadrado: <em>SCR(β₀, β₁) = Σ(Y<sub>i</sub> − β₀ − β₁X<sub>i</sub>)²</em>.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Se minimizan errores verticales al cuadrado, no la suma de residuos.</li>
          <li>Las condiciones de primer orden dan β̂₁ = Cov(X,Y)/Var(X) y β̂₀ = Ȳ − β̂₁X̄.</li>
          <li>MCO es un método de estimación; no exige normalidad de los errores.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: criterio y solución</span><span class="badge optional">Según el concepto: derivación matricial</span></div>
      `,
      ejemplo: `
        <p>Con los datos del TP 2, ejercicio 1, calculá β̂₁ y verificá que Σû = 0 y ΣXû = 0. Después cambiá la escala de Y y mirá qué pasa con la pendiente y los errores estándar.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si X varía poco, el denominador es pequeño y la pendiente se estima con menos precisión. Eso conecta con la varianza del estimador.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Minimizar Σû sin cuadrado.</strong> Esa suma se anula y no identifica una recta.</li>
          <li><strong>Creer que MCO exige errores normales.</strong> La normalidad se usa para inferencia, no para estimar.</li>
          <li><strong>Decir que MCO “encuentra la relación verdadera”.</strong> Encuentra la mejor aproximación lineal según el criterio.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés derivar β̂₁ ni explicar por qué se eleva al cuadrado.</p></div>
      `,
      conexiones: `
        <p>MCO es la base de casi todo el curso. En la clase 2 se extiende a regresión múltiple; en la 6 y la 8 se discuten sus límites cuando fallan los supuestos.</p>
        <div><button class="concept-chip" data-concept="error">Error y residuo →</button><button class="concept-chip" data-concept="insesgado">Insesgamiento →</button><button class="concept-chip" data-concept="gm">Gauss-Markov →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 1, diap. 9–15 y 20.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §2.2, pp. 27–35; §2.3, pp. 36–40.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 2, ejercicios 1–7.</p></div>
      `
    },
    insesgado: {
      title: "Insesgamiento",
      sub: "La distribución del estimador está centrada en el parámetro.",
      esencia: `
        <div class="definition">β̂ es insesgado si <em>E(β̂) = β</em>. No significa que cada estimación sea igual al parámetro; significa que, repetido el muestreo, el promedio de las estimaciones coincide con el parámetro.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es una propiedad de la distribución muestral, no de una estimación puntual.</li>
          <li>Depende de E(u | X) = 0. Si falla, MCO deja de ser insesgado.</li>
          <li>No requiere normalidad de los errores.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: definición</span><span class="badge optional">Según el concepto: demostración</span></div>
      `,
      ejemplo: `
        <p>Si tomaras mil muestras de tamaño n y calcularas mil β̂, el promedio de esos mil valores se acercaría a β. Pero una estimación individual puede estar lejos.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Insesgado no es lo mismo que preciso. Un estimador insesgado puede tener mucha varianza.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir “mi β̂ es insesgado, entonces está cerca de β”.</strong> Confunde insesgamiento con precisión.</li>
          <li><strong>Creer que hace falta normalidad.</strong> No: la normalidad no es un supuesto de Gauss-Markov.</li>
          <li><strong>Creer que todo estimador insesgado es consistente.</strong> No es cierto en general; son propiedades distintas.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir “insesgado” de “preciso” ni de “consistente”.</p></div>
      `,
      conexiones: `
        <p>El insesgamiento es la primera propiedad que se demuestra con Gauss-Markov. La clase 3 agrega la distribución y la inferencia; la clase 5, la evaluación de políticas.</p>
        <div><button class="concept-chip" data-concept="mco">MCO →</button><button class="concept-chip" data-concept="gm">Gauss-Markov →</button><button class="concept-chip" data-concept="r2">R² →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 1, diap. 29–35.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §2.5, pp. 46–53.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024, demostración de insesgamiento; 1P 2025, insesgamiento matricial; 1P 2026, ídem.</p></div>
      `
    },
    r2: {
      title: "R²",
      sub: "Una medida de ajuste, no una prueba de causalidad.",
      esencia: `
        <div class="definition">R² = SCE/SCT = 1 − SCR/SCT. Mide la proporción de la variación muestral de Y explicada linealmente por el modelo.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es una medida de ajuste muestral.</li>
          <li>No dice si el modelo es causalmente válido ni si los supuestos se cumplen.</li>
          <li>Nunca disminuye al agregar regresores; por eso se usa R² ajustado para comparar modelos.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: definición e interpretación</span><span class="badge optional">Según el concepto: R² ajustado</span></div>
      `,
      ejemplo: `
        <p>Un R² = 0,20 en un corte transversal puede ser razonable para un fenómeno social. Un R² = 0,90 en una serie de tiempo puede estar dominado por una tendencia común. El número, solo, no alcanza.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si agregás una variable irrelevante, R² sube o se mantiene; R² ajustado puede bajar. Esa es la pista de por qué no conviene elegir modelos solo por R².</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir “R² bajo = modelo inválido”.</strong> El ajuste es una cosa; la validez, otra.</li>
          <li><strong>Comparar R² entre modelos con distintas transformaciones de Y.</strong> No son comparables.</li>
          <li><strong>Interpretar R² como causalidad.</strong> Una tendencia común puede inflarlo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué R² sube al agregar una variable irrelevante.</p></div>
      `,
      conexiones: `
        <p>El R² vuelve en la clase 2 (R² ajustado), en la clase 4 (selección de modelos) y en la clase 7 (tendencia y regresión espuria).</p>
        <div><button class="concept-chip" data-concept="gm">Gauss-Markov →</button><button class="concept-chip" data-concept="mco">MCO →</button><button class="concept-chip" data-concept="insesgado">Insesgamiento →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 1, diap. 22–27; Clase 2 parte 1, diap. 16–17.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §2.3, pp. 36–40; §6.3, pp. 199–206.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024, F y R²; 1P 2026, contraste F basado en R².</p></div>
      `
    },
    gm: {
      title: "Supuestos de Gauss-Markov",
      sub: "Cinco condiciones, cinco propiedades. No son un paquete indivisible.",
      esencia: `
        <div class="definition">Linealidad en los parámetros; muestra aleatoria; E(u | X) = 0; variabilidad en X; homocedasticidad Var(u | X) = σ².</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Cada supuesto habilita una propiedad distinta.</li>
          <li>E(u | X) = 0 sostiene el insesgamiento.</li>
          <li>Homocedasticidad y muestra aleatoria sostienen la eficiencia y los errores estándar usuales.</li>
          <li>La normalidad no es un supuesto de Gauss-Markov.</li>
        </ul>
        <div class="badge-row"><span class="badge always">Siempre: lista y función de cada supuesto</span><span class="badge optional">Según el concepto: qué pasa si falla</span></div>
      `,
      ejemplo: `
        <p>Si la varianza del error crece con X, MCO sigue siendo insesgado, pero deja de ser ELIO y los errores estándar habituales no son válidos. Ese es el punto de partida de la clase 6.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando un supuesto falla, preguntate qué propiedad se rompe y qué alternativa hay. No alcanza con decir “el modelo está mal”.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Incluir normalidad entre los supuestos de Gauss-Markov.</strong> Es un supuesto adicional del modelo lineal clásico.</li>
          <li><strong>Creer que homocedasticidad es necesaria para el insesgamiento.</strong> No lo es.</li>
          <li><strong>Pensar que Gauss-Markov garantiza causalidad.</strong> Solo garantiza propiedades del estimador bajo el modelo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué propiedad se rompe si falla cada supuesto.</p></div>
      `,
      conexiones: `
        <p>Gauss-Markov es el puente entre la clase 1 y la clase 3. En la 6 se rompe la homocedasticidad; en la 7 y la 8, la independencia y la ausencia de correlación serial.</p>
        <div><button class="concept-chip" data-concept="insesgado">Insesgamiento →</button><button class="concept-chip" data-concept="mco">MCO →</button><button class="concept-chip" data-concept="r2">R² →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 1, diap. 28–35; Clase 3, diap. 5–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §2.5, pp. 46–58; §3.5, pp. 102–104.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2025, supuestos de Gauss-Markov y del MLC.</p></div>
      `
    }
  },

  practice: {
    eyebrow: "De la teoría a la guía",
    title: "Práctica de la clase",
    intro: "Los ejercicios de la cátedra están elegidos para poner a prueba una idea concreta. No hace falta resolver todo: empezá por el que expone la diferencia entre población y muestra. Los materiales originales no se incluyen en el sitio: usá tu copia de la guía.",
    exercises: [
      {
        label: "TP 2 · Ej. 1",
        title: "Propiedades algebraicas de MCO",
        text: "Verificá numéricamente que Σû = 0, que ΣXû = 0 y cómo se relacionan los residuos con los valores ajustados.",
        tags: ["Verificar", "Datos propios"],
      },
      {
        label: "TP 2 · Ej. 2",
        title: "Salario y educación",
        text: "Estimá la recta, interpretá la pendiente y discutí si el coeficiente estimado puede leerse como un efecto causal.",
        tags: ["Interpretar", "Estimación"],
      },
      {
        label: "TP 2 · Ej. 5",
        title: "ENGHO 2012",
        text: "Aplicá el modelo a una base real y mirá qué cambia cuando se agregan controles. Es el puente natural hacia la clase 2.",
        tags: ["Aplicar", "Base real"],
      }
    ],
    partials: [
      { label: "1P 2024", text: "V/F sobre residuos; demostración de insesgamiento y varianza simple." },
      { label: "1P 2025", text: "Condiciones de primer orden; residuos como variables aleatorias." },
      { label: "1P 2026", text: "FOC; β̂₁ y β̂₀; modelo probabilístico." }
    ]
  },

  assessment: {
    eyebrow: "Autoevaluación",
    title: "Preguntas de razonamiento",
    intro: "No son preguntas de memoria. Cada una intenta exponer si entendés la lógica del modelo o si solo recordás definiciones sueltas. Intentá responder antes de abrir la respuesta.",
    questions: [
      {
        q: "¿Por qué MCO minimiza la suma de cuadrados y no la suma de residuos?",
        a: "Porque la suma de residuos se anula por la condición de primer orden y no alcanza para identificar una recta. Al elevar al cuadrado, las desviaciones positivas y negativas no se cancelan y el criterio penaliza con más fuerza los residuos grandes."
      },
      {
        q: "Si Σû = 0, ¿podés concluir que el modelo está bien especificado?",
        a: "No. Σû = 0 es una propiedad algebraica de MCO en un modelo con constante. No dice nada sobre la validez de los supuestos, la forma funcional ni la existencia de variables omitidas."
      },
      {
        q: "¿Qué significa que β̂₁ sea insesgado? ¿Y qué no significa?",
        a: "Significa que E(β̂₁) = β₁: la distribución muestral del estimador está centrada en el parámetro. No significa que una estimación individual esté cerca del parámetro, ni que el estimador sea preciso o consistente."
      },
      {
        q: "¿Por qué el R² no prueba causalidad?",
        a: "Porque mide la proporción de variación muestral de Y explicada linealmente por el modelo. Dos variables pueden moverse juntas por una tercera variable omitida o por una tendencia común, sin que exista una relación causal."
      },
      {
        q: "¿Por qué la varianza de β̂₁ depende de la dispersión de X?",
        a: "Porque la pendiente se estima comparando cómo cambia Y con X. Si X varía poco, hay menos información para identificar ese cambio y la estimación es menos precisa. En la fórmula, la varianza de β̂₁ es σ² / Σ(Xᵢ − X̄)²."
      },
      {
        q: "¿Qué propiedad se rompe si E(u | X) ≠ 0? ¿Y si hay heterocedasticidad?",
        a: "Si E(u | X) ≠ 0, MCO deja de ser insesgado. Si hay heterocedasticidad, MCO sigue siendo insesgado, pero deja de ser ELIO y los errores estándar habituales no son válidos."
      },
      {
        q: "Un estudiante dice: “mi R² es 0,85, entonces el modelo es confiable”. ¿Qué le responderías?",
        a: "Que el R² mide ajuste, no validez. Un R² alto puede convivir con variables omitidas, endogeneidad, heterocedasticidad o una tendencia común. Hay que revisar los supuestos, los errores estándar y el diseño."
      },
      {
        q: "¿Por qué dos muestras de la misma población pueden dar pendientes distintas?",
        a: "Porque β̂₁ es una variable aleatoria: depende de la muestra seleccionada. Cada muestra produce una FRM distinta; la FRP es única. La distribución muestral describe esa variabilidad."
      },
      {
        q: "Si la educación está medida con error, ¿qué le pasa a β̂₁?",
        a: "Si el error de medida está en la variable explicativa y es clásico, el estimador MCO tiende a atenuarse hacia cero: es inconsistente. La clase 9 estudia este problema y la solución por variables instrumentales."
      },
      {
        q: "Diseñá un estudio para estimar el efecto causal de la educación sobre el salario. ¿Qué supuestos necesitarías y cuáles no podés testear?",
        a: "Necesitarías aislar la variación en educación que no está correlacionada con factores no observados que afectan el salario. Podrías usar un experimento, una política que cambie el acceso a la educación o una variable instrumental. El supuesto clave —exogeneidad del instrumento o ausencia de variables omitidas— normalmente no se puede testear por completo; solo se puede argumentar y testear parcialmente."
      }
    ]
  },

  review: {
    eyebrow: "Cierre y consolidación",
    title: "Una sesión de 90 minutos",
    intro: "La estructura sigue el método de estudio: comprender, conectar, practicar y cerrar con una señal clara de qué quedó y qué no.",
    session: [
      { time: "0–10", title: "Pregunta guía", text: "¿Qué relación quiero describir? ¿Qué parte de Y queda en el error? Escribí una respuesta de tres líneas." },
      { time: "10–30", title: "FRP, FRM y error/residuo", text: "Explicá la diferencia con un ejemplo de salario y educación. Si te trabás, volvé a la clase 1, diap. 6–8 y 11–16." },
      { time: "30–50", title: "Derivación de MCO", text: "Reconstruí β̂₁ = Cov(X,Y)/Var(X) y explicá por qué se minimiza la suma de cuadrados. Fuente: diap. 9–15." },
      { time: "50–70", title: "Práctica", text: "TP 2, ejercicios 1 y 2. Verificá las propiedades algebraicas e interpretá la pendiente." },
      { time: "70–85", title: "Preguntas de parcial", text: "1P 2026, preguntas sobre FOC y modelo probabilístico; 1P 2025, pregunta sobre residuos. Justificá cada respuesta sin mirar la solución." },
      { time: "85–90", title: "Cierre", text: "Anotá una idea que puedas enseñar en dos minutos y una que todavía no puedas explicar sin mirar." }
    ],
    kit: [
      { k: "Kit 01", title: "Una página de ideas clave", text: "FRP/FRM, error/residuo, MCO, insesgamiento, R² y G-M, con una frase por concepto." },
      { k: "Kit 02", title: "Tabla de errores", text: "Qué se confunde, por qué y cómo corregirlo. La sección 05 de esta clase es el punto de partida." },
      { k: "Kit 03", title: "Diez preguntas", text: "La pestaña de Autoevaluación, ordenada de menor a mayor dificultad." },
      { k: "Kit 04", title: "Plan de 7 días", text: "Una rutina corta para no volver a leer todo desde cero." }
    ],
    plan: [
      { day: "Día 1", title: "Teoría y mapa", text: "Leé la clase completa y explicá el mapa de los cuatro pasos sin mirar." },
      { day: "Día 2", title: "TP 2, ejercicios 1 y 2", text: "Verificá propiedades algebraicas e interpretá la pendiente." },
      { day: "Día 3", title: "Parciales", text: "Respondé las preguntas de 1P 2024–2026 relacionadas con la clase 1." },
      { day: "Día 4", title: "Errores frecuentes", text: "Releé la tabla de errores y explicá cada corrección con un ejemplo." },
      { day: "Día 5", title: "Repaso activo", text: "Cerrá los apuntes y escribí las fórmulas y supuestos de memoria." },
      { day: "Día 6", title: "Simulacro", text: "Resolvé una selección de preguntas en 45 minutos, sin mirar." },
      { day: "Día 7", title: "Cierre", text: "Volvé solo a lo que falló y actualizá tu kit de una página." }
    ]
  },

  sources: {
    eyebrow: "Trazabilidad",
    title: "Fuentes de esta clase",
    intro: "Primero la cátedra; el libro complementa y profundiza. Las páginas son las impresas en el libro; en el PDF de la 4.ª edición se suman 22. No se distribuyen los archivos originales: quedan solo las referencias bibliográficas.",
    items: [
      {
        type: "Clase",
        typeClass: "",
        title: "Clase 1 — Regresión simple",
        text: "Fuente principal de la explicación, el orden y los énfasis de la clase.",
        loc: "43 diapositivas · diap. 3–43",
      },
      {
        type: "Libro",
        typeClass: "book",
        title: "Wooldridge — Introducción a la Econometría, 4.ª ed.",
        text: "Cap. 2: modelo de regresión simple, MCO, propiedades, unidades de medida y varianza de los estimadores.",
        loc: "§2.1–2.5, pp. 22–58 · problemas pp. 61–64",
      },
      {
        type: "Guía",
        typeClass: "",
        title: "Guía de Trabajos Prácticos 2026 — TP 2",
        text: "Ejercicios 1–7. El TP 1 (matrices) es prerrequisito para la derivación matricial de la clase 2.",
        loc: "TP 2 · ejercicios 1–7",
      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2024, 1P 2025 y 1P 2026",
        text: "Preguntas de justificación sobre residuos, insesgamiento, varianza y modelo probabilístico.",
        loc: "Soluciones orientativas",
      },
      {
        type: "Método",
        typeClass: "method",
        title: "prompts de metodo de estudio.md",
        text: "Los cinco prompts que organizan la explicación desde cero, las preguntas de razonamiento, la sesión de 90 minutos y el kit de repaso.",
        loc: "Prompts 1–5",
      }
    ]
  }
};
