window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-06"] = {
  id: "clase-06",
  num: "06",
  eyebrow: "Clase 06 · Heterocedasticidad",
  title: "Heterocedasticidad: cuando la varianza no es constante",
  lead: "La heterocedasticidad no sesga los coeficientes MCO, pero rompe los errores estándar, los t y los F. La salida no es reestimar a ciegas: diagnosticar, corregir la inferencia y, si conviene, ganar eficiencia con ponderaciones.",
  question: "¿Qué cambia y qué no cuando la varianza de los errores depende de X, y cómo se corrige la inferencia?",
  pills: [
    "30 diapositivas",
    "TP 9",
    "2P 2024",
    "8 conceptos clave",
  ],
  sections: [
    {
      id: "c06-s01",
      number: "01",
      title: "El problema: la varianza que cambia con X",
      blocks: [
        {
          type: "p",
          id: "c06-s01-p01",
          html: "Un supuesto de Gauss-Markov dice que la varianza de los errores, condicional a las X, es la misma para todas las observaciones. En un corte transversal de salarios, eso equivaldría a sostener que la parte no observada del salario tiene la misma dispersión para alguien con primaria que para alguien con posgrado. La intuición sugiere lo contrario: a mayores niveles de educación o de ingreso, las oportunidades y las habilidades no observadas se dispersan más. Cuando esa dispersión cambia con X, hay <span class=\"concept\" data-concept=\"hetero\" tabindex=\"0\" role=\"button\">heterocedasticidad</span>.",
        },
        {
          type: "p",
          id: "c06-s01-p02",
          html: "Formalmente, homocedasticidad significa Var(u<sub>i</sub> | X) = σ<sup>2</sup> para todo i. Heterocedasticidad significa Var(u<sub>i</sub> | X) = σ<sub>i</sub><sup>2</sup>, con σ<sub>i</sub><sup>2</sup> distinta entre observaciones. No es un problema de errores grandes o chicos: es un problema de que la escala de la dispersión depende de X. Tampoco es lo mismo que un residuo atípico. Un residuo grande puede convivir con homocedasticidad; lo que importa es el patrón de la dispersión, no un punto aislado.",
        },
        {
          type: "compare",
          left: { tag: "Homocedasticidad", title: "Una sola varianza", text: "La dispersión de u alrededor de la recta es la misma en todo el rango de X. Es el supuesto que permite la fórmula habitual de la varianza de MCO.", eq: "Var(u<sub>i</sub> | X) = σ<sup>2</sup>" },
          right: { tag: "Heterocedasticidad", title: "Una varianza por observación", text: "La dispersión cambia con X. En un gráfico de residuos contra valores ajustados suele verse un embudo: más ancho a la derecha o a la izquierda.", eq: "Var(u<sub>i</sub> | X) = σ<sub>i</sub><sup>2</sup>" },
        },
        {
          type: "cards",
          items: [
            { sym: "Ahorro", title: "Ingreso", text: "Los hogares de ingresos altos tienen más margen para ahorrar o desahorrar. La varianza del ahorro no observado crece con el ingreso." },
            { sym: "Salario", title: "Educación", text: "La dispersión salarial suele aumentar con los años de instrucción. Hay más heterogeneidad entre los trabajadores más calificados." },
            { sym: "Gasto", title: "Tamaño del hogar", text: "El gasto total de hogares grandes tiene más variabilidad: hay más decisiones y más fuentes de error que se suman." },
          ],
        },
        {
          type: "callout",
          variant: "ochre",
          label: "La heterocedasticidad no es un error de tipeo",
          html: "Puede ser una característica genuina de la población: la varianza condicional depende de X y el modelo lineal sigue siendo una descripción válida de la media. También puede ser una señal de que falta una variable, de que la forma funcional está mal elegida o de que hay observaciones con mucha influencia. El diagnóstico de heterocedasticidad no reemplaza el diagnóstico de especificación: lo complementa.",
        },
        {
          type: "miniCheck",
          id: "c06-check-01",
          question: "¿Que haya heterocedasticidad implica que el modelo está mal especificado?",
          intro: "Separá el supuesto sobre la varianza del supuesto sobre la media.",
          answer: "No necesariamente. La heterocedasticidad describe cómo cambia la dispersión de u con X; no dice que E(Y | X) esté mal modelada. El modelo puede ser correcto para la media y tener errores con varianza no constante. Ahora bien, si la heterocedasticidad aparece junto con un patrón sistemático en los residuos, puede ser un síntoma de una variable omitida o de una forma funcional incorrecta. Por eso conviene mirar el gráfico y no solo el p del contraste.",
        },
      ],
    },
    {
      id: "c06-s02",
      number: "02",
      title: "Consecuencias: MCO sigue insesgado, la inferencia no",
      blocks: [
        {
          type: "p",
          id: "c06-s02-p01",
          html: "La consecuencia más repetida y peor entendida es que MCO deja de ser insesgado. Falso. La fórmula β̂ = (X′X)<sup>−1</sup>X′Y no usa la matriz de varianzas de los errores. Si E(u | X) = 0, el estimador sigue siendo insesgado y consistente aunque la varianza cambie con X. Lo que se rompe es la estimación de la precisión: los errores estándar habituales suponen σ<sup>2</sup> constante y dejan de ser válidos. Esa es la primera pieza para entender las <span class=\"concept\" data-concept=\"consecuencias\" tabindex=\"0\" role=\"button\">consecuencias de la heterocedasticidad</span>.",
        },
        {
          type: "formula",
          main: "Var(β̂<sub>MCO</sub>) = σ<sup>2</sup>(X′X)<sup>−1</sup> &nbsp;→&nbsp; σ<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup>",
          legend: [
            { key: "Ω = I", text: "Caso homocedástico: la expresión se reduce a σ²(X′X)⁻¹, la fórmula habitual." },
            { key: "Ω diagonal", text: "Heterocedasticidad sin autocorrelación: la diagonal tiene las varianzas relativas de cada error." },
            { key: "Software", text: "Reporta los errores estándar con la primera expresión, no con la segunda. Por eso quedan mal." },
          ],
        },
        {
          type: "p",
          id: "c06-s02-p02",
          html: "El error estándar es el denominador del t y la base del intervalo de confianza. Si está mal estimado, el t deja de tener distribución t, el F deja de tener distribución F y los valores p dejan de ser confiables. El error estándar puede quedar por debajo o por encima del verdadero: hay casos en que MCO sobreestima la precisión y casos en que la subestima. Por eso no alcanza con decir que “los errores estándar son sesgados”; hay que decir que la inferencia usual no es válida y que la dirección del error depende de la forma de la heterocedasticidad.",
        },
        {
          type: "assumptions",
          rows: [
            { title: "Insesgamiento", text: "Se mantiene si E(u | X) = 0. La heterocedasticidad por sí sola no introduce sesgo en β̂." },
            { title: "Consistencia", text: "Se mantiene bajo exogeneidad y condiciones de regularidad. El estimador converge al parámetro poblacional." },
            { title: "Bondad de ajuste", text: "El R² sigue siendo la proporción de variación muestral explicada. Su lectura descriptiva no cambia, aunque el F usual no sea válido." },
            { title: "Eficiencia", text: "MCO deja de ser ELIO: hay estimadores lineales e insesgados con menor varianza si se conoce la forma de la heterocedasticidad." },
            { title: "Inferencia", text: "Errores estándar, t, F, intervalos y valores p calculados con la fórmula homocedástica no son válidos." },
          ],
        },
        {
          type: "errorTable",
          rows: [
            { error: "La heterocedasticidad sesga los coeficientes MCO.", why: "El sesgo depende de E(u | X), no de la varianza. MCO sigue insesgado y consistente bajo exogeneidad.", fix: "Separá el problema de la media del problema de la varianza. El sesgo se discute en la clase 9." },
            { error: "Los errores estándar robustos siempre son más grandes.", why: "La corrección depende de los residuos al cuadrado y puede aumentar o reducir el error estándar.", fix: "Compará el error estándar y el t, no supongas la dirección del cambio." },
            { error: "Si el R² es alto, la heterocedasticidad no importa.", why: "El R² mide ajuste de la media; no dice nada sobre la validez de los errores estándar.", fix: "Mirá el gráfico de residuos y hacé el contraste formal aunque el R² sea alto." },
            { error: "Usar errores robustos garantiza eficiencia.", why: "HC corrige la varianza estimada, pero no cambia los coeficientes ni los vuelve más precisos.", fix: "Si buscás eficiencia, modelá la varianza y estimá por MCG o MCGF." },
          ],
        },
        {
          type: "miniCheck",
          id: "c06-check-02",
          question: "Si MCO sigue siendo insesgado, ¿por qué la heterocedasticidad es un problema serio?",
          intro: "Pensá qué se usa para contrastar hipótesis y construir intervalos.",
          answer: "Porque la inferencia depende del error estándar. Con heterocedasticidad, el error estándar habitual está mal estimado, el t no se distribuye como t y el F no se distribuye como F. Un coeficiente puede ser insesgado y, al mismo tiempo, tener un valor p equivocado. Además, MCO deja de ser eficiente: otro estimador insesgado puede tener menor varianza. El problema no es el centro de la distribución del estimador, sino su dispersión y la validez de los contrastes.",
        },
      ],
    },
    {
      id: "c06-s03",
      number: "03",
      title: "Errores estándar robustos: la corrección de White",
      blocks: [
        {
          type: "p",
          id: "c06-s03-p01",
          html: "Si no se conoce la forma de la heterocedasticidad, igual se puede estimar la varianza de β̂ con los residuos al cuadrado. White (1980) mostró que, bajo condiciones generales, la varianza se aproxima con una suma ponderada de û<sub>i</sub><sup>2</sup>. Esos son los <span class=\"concept\" data-concept=\"errores-robustos\" tabindex=\"0\" role=\"button\">errores estándar robustos</span> a la heterocedasticidad, también llamados errores de White. No requieren especificar h(X): se estiman directamente de los datos.",
        },
        {
          type: "formula",
          main: "Var(β̂<sub>1</sub>) = Σ(X<sub>i</sub> − X̄)<sup>2</sup>σ<sub>i</sub><sup>2</sup> / SCT<sub>X</sub><sup>2</sup> &nbsp;→&nbsp; Σ(X<sub>i</sub> − X̄)<sup>2</sup>û<sub>i</sub><sup>2</sup> / SCT<sub>X</sub><sup>2</sup>",
          legend: [
            { key: "Regresión simple", text: "Cada error al cuadrado se pondera por la distancia de X a su media. No se cancela el denominador." },
            { key: "Múltiple", text: "Var(β̂ⱼ) = Σr̂ⱼᵢ²ûᵢ² / (Σr̂ⱼᵢ²)², con r̂ⱼ los residuos de regresar Xⱼ en las demás X." },
            { key: "Práctica", text: "La raíz cuadrada es el error estándar robusto. En R se obtiene con vcovHC y coeftest." },
          ],
        },
        {
          type: "p",
          id: "c06-s03-p02",
          html: "El estadístico <span class=\"concept\" data-concept=\"prueba-t-robusta\" tabindex=\"0\" role=\"button\">t robusto</span> reemplaza el error estándar MCO por el robusto: t<sub>rob</sub> = β̂<sub>j</sub> / ee<sub>rob</sub>(β̂<sub>j</sub>). Los coeficientes no cambian; solo cambia la estimación de su precisión. En muestras grandes, t<sub>rob</sub> se aproxima a una normal estándar y los contrastes son válidos aunque la forma de la heterocedasticidad sea desconocida. En muestras chicas la aproximación puede ser pobre, sobre todo si hay muchos regresores o observaciones influyentes. La corrección de White no es una varita mágica: es una aproximación asintótica.",
        },
        {
          type: "cards",
          items: [
            { sym: "HC0", title: "White original", text: "Usa los residuos al cuadrado sin corrección por grados de libertad. Es la base de las demás variantes." },
            { sym: "HC1", title: "Corrección por gl", text: "Ajusta HC0 por el número de parámetros. Es la opción habitual en aplicaciones con datos de corte transversal." },
            { sym: "HC2 y HC3", title: "Residuos ajustados", text: "Ponderan por la influencia de cada observación. HC3 es más conservador y se usa cuando hay puntos de palanca." },
          ],
        },
        {
          type: "callout",
          variant: "teal",
          label: "¿Por qué no se usan siempre?",
          html: "Si se cumple la homocedasticidad y los errores son normales, el t habitual tiene distribución t exacta para cualquier n. El t robusto solo es válido asintóticamente. Con muestras chicas, su distribución puede alejarse de la t y complicar la inferencia. Por eso, en aplicaciones con datos de corte transversal y muestras grandes, se opta por reportar errores robustos; con muestras chicas y evidencia de homocedasticidad, el error estándar usual puede ser preferible. La elección se justifica, no se automatiza.",
        },
        {
          type: "miniCheck",
          id: "c06-check-03",
          question: "En el laboratorio, el error estándar robusto de exper es menor que el MCO. ¿Eso invalida la corrección?",
          intro: "Recordá qué estima cada error estándar y qué dirección puede tomar la corrección.",
          answer: "No. El error estándar robusto estima la varianza bajo heterocedasticidad y no tiene por qué ser mayor que el MCO. En el modelo en niveles, el ee de exper pasa de 0,01206 a 0,01056: el t sube de 1,853 a 2,117. Eso significa que, con la corrección, la evidencia contra β<sub>exper</sub> = 0 es más fuerte, no más débil. La dirección del cambio depende de la covarianza entre los residuos al cuadrado y los regresores; no hay una regla universal.",
        },
      ],
    },
    {
      id: "c06-s04",
      number: "04",
      title: "Detección: gráficos, Breusch-Pagan y White",
      blocks: [
        {
          type: "p",
          id: "c06-s04-p01",
          html: "El primer diagnóstico es visual. Bajo homocedasticidad, el gráfico de residuos contra valores ajustados no debería mostrar un patrón de dispersión: la nube tiene que ser aproximadamente de ancho constante. Si la dispersión crece o decrece con ŷ, aparece un embudo y hay sospecha de heterocedasticidad. Lo mismo vale para el gráfico de residuos contra cada X. El gráfico no prueba nada, pero orienta el contraste formal y ayuda a detectar no linealidades y atípicos.",
        },
        {
          type: "p",
          id: "c06-s04-p02",
          html: "La prueba de <span class=\"concept\" data-concept=\"breusch-pagan\" tabindex=\"0\" role=\"button\">Breusch-Pagan</span> formaliza la idea de que u<sup>2</sup> se relaciona con las X. Se estima el modelo por MCO, se guardan los residuos, se eleva al cuadrado y se regresan en las variables explicativas. Si las X explican poco de u<sup>2</sup>, no hay evidencia de heterocedasticidad. Si explican mucho, se rechaza la homocedasticidad. El contraste es asintótico y no exige normalidad de los errores. La prueba de <span class=\"concept\" data-concept=\"white\" tabindex=\"0\" role=\"button\">White</span>, que se presenta más abajo, generaliza esta idea con cuadrados y productos cruzados.",
        },
        {
          type: "formula",
          main: "û<sub>i</sub><sup>2</sup> = δ<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + δ<sub>k</sub>X<sub>ki</sub> + v<sub>i</sub> &nbsp;·&nbsp; H<sub>0</sub>: δ<sub>1</sub> = … = δ<sub>k</sub> = 0 &nbsp;·&nbsp; LM = nR<sup>2</sup> ≈ χ<sup>2</sup><sub>k</sub>",
          legend: [
            { key: "Auxiliar", text: "La variable dependiente es û², no u². Los residuos MCO son los únicos observables." },
            { key: "H<sub>0</sub>", text: "Homocedasticidad: ninguna X explica el valor esperado de u²." },
            { key: "F o LM", text: "El F de significación conjunta y el LM = nR² son asintóticamente equivalentes. R usa la versión studentizada." },
          ],
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Estimar por MCO", text: "Corré el modelo original y guardá los residuos û." },
            { n: "2", title: "Construir la auxiliar", text: "Regresá û² en las X (o en un subconjunto si sospechás de algunas)." },
            { n: "3", title: "Calcular el estadístico", text: "LM = nR² de la auxiliar, con k grados de libertad; o el F de significación conjunta." },
            { n: "4", title: "Decidir", text: "Si p &lt; α, rechazá homocedasticidad. Si no, no hay evidencia suficiente para rechazarla." },
          ],
        },
        {
          type: "formula",
          main: "û<sub>i</sub><sup>2</sup> = δ<sub>0</sub> + δ<sub>1</sub>ŷ<sub>i</sub> + δ<sub>2</sub>ŷ<sub>i</sub><sup>2</sup> + v<sub>i</sub> &nbsp;·&nbsp; H<sub>0</sub>: δ<sub>1</sub> = δ<sub>2</sub> = 0",
          legend: [
            { key: "White completo", text: "Incluye todas las X, sus cuadrados y los productos cruzados. Consume muchos grados de libertad." },
            { key: "Versión parsimoniosa", text: "Usa ŷ y ŷ². Es la que suele verse como “prueba de White” en aplicaciones con muchas X." },
            { key: "Cautela", text: "Si E(Y | X) está mal especificada, White puede rechazar aunque los errores sean homocedásticos." },
          ],
        },
        {
          type: "errorTable",
          rows: [
            { error: "BP rechaza, entonces la varianza es exactamente lineal en X.", why: "El rechazo indica que u² se relaciona con las X de alguna forma; no identifica la forma ni la magnitud.", fix: "Usá el rechazo para corregir la inferencia, no para escribir una función de varianza sin más." },
            { error: "BP no rechaza, entonces hay homocedasticidad probada.", why: "No rechazar solo dice que los datos no aportan evidencia suficiente contra H₀.", fix: "Reportá el p y mirá el gráfico; la ausencia de evidencia no es evidencia de ausencia." },
            { error: "White siempre es mejor que BP porque usa más términos.", why: "Más términos implican más grados de libertad y menor potencia en muestras chicas; además confunde heterocedasticidad con mala forma funcional.", fix: "Elegí el contraste según la sospecha y el tamaño de la muestra; reportá cuál usaste." },
            { error: "Un p muy chico implica heterocedasticidad muy fuerte.", why: "El p mide evidencia contra H₀, no tamaño del efecto. Con n grande, desviaciones pequeñas dan p chicos.", fix: "Mirá la magnitud de los errores estándar y la diferencia entre MCO y robustos." },
          ],
        },
        {
          type: "miniCheck",
          id: "c06-check-04",
          question: "Una prueba de Breusch-Pagan da p = 0,20 con n = 80. ¿Podés concluir que la varianza es constante?",
          intro: "Distinguí no rechazar de aceptar.",
          answer: "No. Con p = 0,20 no se rechaza la hipótesis nula de homocedasticidad al 5%, pero eso no prueba que sea verdadera. Puede haber heterocedasticidad moderada y la muestra chica no tener potencia para detectarla. La conclusión correcta es que los datos no aportan evidencia suficiente contra la homocedasticidad. Conviene mirar el gráfico de residuos y, si el tema importa, reportar errores robustos como chequeo de sensibilidad.",
        },
      ],
    },
    {
      id: "c06-s05",
      number: "05",
      title: "Mínimos cuadrados ponderados: usar la varianza conocida",
      blocks: [
        {
          type: "p",
          id: "c06-s05-p01",
          html: "Si se conoce la forma de la heterocedasticidad, se puede hacer algo mejor que corregir los errores estándar: transformar el modelo para que los errores vuelvan a ser homocedásticos. Ese es el principio de los <span class=\"concept\" data-concept=\"mcp\" tabindex=\"0\" role=\"button\">mínimos cuadrados ponderados</span> (MCP), un caso particular de mínimos cuadrados generalizados (MCG). La idea es dar menos peso a las observaciones con mayor varianza y más peso a las que tienen menor varianza.",
        },
        {
          type: "formula",
          main: "Var(u<sub>i</sub> | X) = σ<sup>2</sup>h<sub>i</sub> &nbsp;→&nbsp; Y<sub>i</sub>/√h<sub>i</sub> = β<sub>0</sub>(1/√h<sub>i</sub>) + β<sub>1</sub>(X<sub>1i</sub>/√h<sub>i</sub>) + … + u<sub>i</sub>/√h<sub>i</sub>",
          legend: [
            { key: "h<sub>i</sub>", text: "Función de X que determina la varianza, conocida salvo por la constante σ²." },
            { key: "Transformación", text: "Al dividir por √hᵢ, la varianza del error transformado es σ²hᵢ/hᵢ = σ²." },
            { key: "Ponderación", text: "Equivale a minimizar Σûᵢ²/hᵢ: cada observación pesa 1/hᵢ." },
          ],
        },
        {
          type: "p",
          id: "c06-s05-p02",
          html: "Los casos típicos se leen como reglas de transformación. Si la varianza es proporcional a X, se divide toda la ecuación por √X. Si es proporcional a X<sup>2</sup>, se divide por X. Si es proporcional a 1/X, se multiplica por √X. En todos los casos, la ecuación transformada se estima por MCO y los coeficientes se interpretan volviendo a la ecuación original. Los t y F de la regresión transformada son válidos si h está bien especificada.",
        },
        {
          type: "compare",
          left: { tag: "MCO", title: "Todos pesan igual", text: "Cada observación aporta lo mismo a la suma de cuadrados, sin importar su varianza. Es insesgado, pero puede ser muy impreciso si hay observaciones con varianza enorme.", eq: "min Σ(Y<sub>i</sub> − β<sub>0</sub> − β<sub>1</sub>X<sub>i</sub>)<sup>2</sup>" },
          right: { tag: "MCP", title: "Pesa por precisión", text: "Las observaciones con menor varianza reciben más peso. Si h está bien especificada, el estimador es más eficiente que MCO.", eq: "min Σ(Y<sub>i</sub> − β<sub>0</sub> − β<sub>1</sub>X<sub>i</sub>)<sup>2</sup>/h<sub>i</sub>" },
        },
        {
          type: "cards",
          items: [
            { sym: "MCG", title: "El marco general", text: "Mínimos cuadrados generalizados usan la matriz Ω completa. Con heterocedasticidad pura, Ω es diagonal." },
            { sym: "MCP", title: "El caso diagonal", text: "Cuando Ω = diag(σ²hᵢ), MCG se reduce a mínimos cuadrados ponderados." },
            { sym: "Requisito", title: "Conocer h", text: "La ganancia de eficiencia exige que la forma de la varianza sea correcta. Si no, se pierde la garantía." },
          ],
        },
        {
          type: "miniCheck",
          id: "c06-check-05",
          question: "Si Var(u<sub>i</sub> | X) = σ<sup>2</sup>X<sub>i</sub>, ¿por qué se divide la ecuación por √X<sub>i</sub> y no por X<sub>i</sub>?",
          intro: "Calculá la varianza del error transformado en cada caso.",
          answer: "Porque la transformación tiene que dejar la varianza constante. Si se divide por √X<sub>i</sub>, el error transformado es u<sub>i</sub>/√X<sub>i</sub> y su varianza es σ²X<sub>i</sub>/X<sub>i</sub> = σ². Si se dividiera por X<sub>i</sub>, la varianza sería σ²X<sub>i</sub>/X<sub>i</sub>² = σ²/X<sub>i</sub>, que sigue dependiendo de X. La regla general es dividir por la raíz cuadrada de la función de varianza.",
        },
      ],
    },
    {
      id: "c06-s06",
      number: "06",
      title: "MCGF: cuando la varianza hay que estimarla",
      blocks: [
        {
          type: "p",
          id: "c06-s06-p01",
          html: "En la práctica casi nunca se conoce h(X). Lo que se hace es estimarla con los datos y usar esa estimación para ponderar. Ese es el método de <span class=\"concept\" data-concept=\"mcgf\" tabindex=\"0\" role=\"button\">mínimos cuadrados generalizados factibles</span> (MCGF). “Factible” significa que los ponderadores se calculan en una primera etapa, en lugar de suponerlos conocidos.",
        },
        {
          type: "formula",
          main: "Var(u<sub>i</sub> | X) = σ<sup>2</sup>exp(δ<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + δ<sub>k</sub>X<sub>ki</sub>) &nbsp;·&nbsp; log(û<sub>i</sub><sup>2</sup>) = α<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + e<sub>i</sub> &nbsp;·&nbsp; ĥ<sub>i</sub> = exp(ĝ<sub>i</sub>)",
          legend: [
            { key: "Exponencial", text: "Garantiza que la varianza estimada sea positiva, algo que una forma lineal no asegura." },
            { key: "Primera etapa", text: "Se regresa el logaritmo de los residuos al cuadrado en las X y se guardan los valores ajustados ĝᵢ." },
            { key: "Segunda etapa", text: "Se estima por MCP con ponderadores 1/ĥᵢ. Es un estimador en dos pasos." },
          ],
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "MCO inicial", text: "Estimá el modelo original y guardá los residuos ûᵢ." },
            { n: "2", title: "Ecuación auxiliar", text: "Calculá gᵢ = log(ûᵢ²) y regresalo en las X. Guardá los ajustados ĝᵢ." },
            { n: "3", title: "Ponderadores", text: "Construí ĥᵢ = exp(ĝᵢ) y usá pesos 1/ĥᵢ. Verificá que sean positivos y finitos." },
            { n: "4", title: "MCP", text: "Estimá la ecuación original con esos pesos. Los coeficientes se leen en la escala original." },
            { n: "5", title: "Inferencia", text: "Si h está bien especificada, usá los errores estándar de la regresión ponderada. Si no, usá errores robustos sobre la estimación MCP." },
          ],
        },
        {
          type: "p",
          id: "c06-s06-p02",
          html: "Las propiedades cambian respecto de MCP con h conocida. Como los ponderadores se estiman con los mismos datos, el estimador MCGF no es insesgado en muestras finitas. Sí es consistente y, si la función de varianza está correctamente especificada, es asintóticamente más eficiente que MCO. La matriz de varianza-covarianza se estima con la misma lógica: Var(β̂<sub>MCGF</sub>) ≈ σ̂<sup>2</sup>(X′Ω̂<sup>−1</sup>X)<sup>−1</sup>. Esa expresión solo es válida si el modelo de varianza es el correcto.",
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Varianza mal especificada",
          html: "Si h está mal especificada pero E(u | X) = 0, MCO sigue siendo insesgado y consistente; lo que falla es su eficiencia. Los estimadores MCP también siguen siendo consistentes en general, pero sus errores estándar y contrastes usuales dejan de ser válidos. La salida es calcular errores robustos sobre la estimación MCP. Con heterocedasticidad fuerte, estimar por MCP con una varianza aproximada suele ser mejor que ignorar el problema y usar MCO, aunque la ganancia no está garantizada.",
        },
        {
          type: "errorTable",
          rows: [
            { error: "MCGF es insesgado porque es una versión mejorada de MCO.", why: "Los ponderadores se estiman con los mismos datos y introducen sesgo de muestra finita.", fix: "Decí consistente y asintóticamente eficiente; no insesgado." },
            { error: "Si la varianza está mal especificada, todo el modelo MCGF es inválido.", why: "Los coeficientes pueden seguir siendo consistentes; lo inválido es la inferencia usual.", fix: "Reportá errores robustos sobre la estimación MCP y aclará el supuesto de varianza." },
            { error: "Tomar log(û²) cuando û = 0 es inocuo.", why: "log(0) no está definido y la observación se pierde o distorsiona la primera etapa.", fix: "Revisá los ceros, documentá cómo los trataste y no los reemplaces sin justificar." },
            { error: "Comparar los coeficientes MCP y MCO como si uno fuera causal y el otro no.", why: "Los dos estiman la misma ecuación; las diferencias son de ponderación y error muestral.", fix: "Compará magnitudes y errores estándar, y discutí si otra violación de Gauss-Markov explica las diferencias." },
          ],
        },
        {
          type: "miniCheck",
          id: "c06-check-06",
          question: "¿Por qué MCGF no es insesgado si es un estimador de mínimos cuadrados?",
          intro: "Pensá de dónde salen los ponderadores.",
          answer: "Porque los ponderadores no son constantes conocidas: se estiman con los mismos datos, a partir de los residuos de una primera etapa. El estimador resultante es una función no lineal de los residuos y su esperanza no coincide exactamente con β en muestras finitas. Es consistente: cuando n crece, los ponderadores convergen a los verdaderos y el estimador converge a β. Además, si la varianza está bien modelada, es asintóticamente más eficiente que MCO.",
        },
      ],
    },
    {
      id: "c06-s07",
      number: "07",
      title: "Mapa de decisión: qué hacer con la heterocedasticidad",
      blocks: [
        {
          type: "p",
          id: "c06-s07-p01",
          html: "La heterocedasticidad no se resuelve con una receta única. Hay tres decisiones encadenadas: si existe, cómo corregir la inferencia y si vale la pena buscar eficiencia. El mapa siguiente ordena el proceso para un corte transversal. No es un algoritmo automático: cada paso tiene un supuesto y una lectura económica.",
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Estimar y mirar", text: "Corré MCO, graficá residuos contra valores ajustados y contra las X. Buscá embudos, cambios de dispersión y atípicos." },
            { n: "2", title: "Contrastar", text: "Hacé Breusch-Pagan y, si sospechás no linealidades o muchas X, White. Reportá el estadístico, los grados de libertad y el p." },
            { n: "3", title: "Corregir la inferencia", text: "Si rechazás, reportá errores robustos HC1 y t robustos. Los coeficientes no cambian; cambian los errores estándar y los p." },
            { n: "4", title: "Buscar eficiencia", text: "Si podés modelar la varianza, estimá MCP o MCGF. La ganancia existe si h está bien especificada; si no, usá MCP con errores robustos." },
            { n: "5", title: "Comparar y explicar", text: "Compará MCO, robusto y MCP. Diferencias grandes o cambios de signo pueden indicar otra violación de Gauss-Markov, no solo heterocedasticidad." },
            { n: "6", title: "Reportar", text: "Aclará n, variables, forma de la varianza, contraste usado, tipo de error estándar y límites causales. No ocultes el diagnóstico." },
          ],
        },
        {
          type: "compare",
          left: { tag: "Solo inferencia", title: "MCO + HC1", text: "Es la opción robusta y simple. No necesita modelar la varianza. Ideal cuando el objetivo es contrastar y la muestra es grande.", eq: "β̂<sub>MCO</sub> · ee<sub>HC1</sub>" },
          right: { tag: "Inferencia y eficiencia", title: "MCP o MCGF", text: "Aprovecha la forma de la varianza para ponderar. Requiere un supuesto adicional y un diagnóstico de la especificación de h.", eq: "β̂<sub>MCP</sub> · ee<sub>rob</sub> si h es dudosa" },
        },
        {
          type: "errorTable",
          rows: [
            { error: "Si BP rechaza, hay que reestimar por MCGF sí o sí.", why: "La corrección mínima es la inferencia robusta. MCGF busca eficiencia y depende de un supuesto sobre h.", fix: "Empezá por HC1; pasá a MCGF si el objetivo y los datos lo justifican." },
            { error: "Si BP no rechaza, no hace falta reportar errores robustos.", why: "No rechazar no prueba homocedasticidad; con n chico la prueba tiene poca potencia.", fix: "Reportá el diagnóstico y usá robustos como chequeo de sensibilidad en muestras grandes." },
            { error: "MCO y MCP deberían dar exactamente lo mismo.", why: "Son estimadores distintos; difieren por el error muestral y por la ponderación.", fix: "Compará con cuidado. Un cambio de signo en un coeficiente significativo merece revisar especificación y endogeneidad." },
            { error: "La heterocedasticidad explica cualquier diferencia entre MCO y MCP.", why: "Otras violaciones, como endogeneidad o variables omitidas, también cambian los coeficientes.", fix: "No atribuyas a la varianza lo que puede ser un problema de identificación." },
          ],
        },
        {
          type: "sourceStrip",
          chips: [
            { label: "Clase 6", text: "diap. 3–30" },
            { label: "Wooldridge 4ed", text: "Cap. 8" },
            { label: "TP 9", text: "act. 1–2; ej. 1–6" },
            { label: "Parcial", text: "2P 2024" },
          ],
        },
        {
          type: "miniCheck",
          id: "c06-check-07",
          question: "Tenés n = 800, un corte transversal y BP con p = 0,001. ¿Cuál es el primer paso y cuál no es obligatorio?",
          intro: "Separá corregir la inferencia de buscar eficiencia.",
          answer: "El primer paso es reportar errores estándar robustos HC1 y t robustos: hay evidencia de heterocedasticidad y la inferencia usual no es válida. No es obligatorio reestimar por MCGF. Eso se hace si se quiere ganar eficiencia y se puede justificar una función de varianza; si h es dudosa, MCGF con errores robustos. La decisión depende del objetivo, no solo del p del contraste.",
        },
      ],
    },
  ],
  concepts: {
    hetero: {
      title: "Heterocedasticidad",
      sub: "La varianza del error cambia con X.",
      esencia: `<div class="definition">Hay heterocedasticidad cuando Var(u<sub>i</sub> | X) = σ<sub>i</sub><sup>2</sup> no es constante. La homocedasticidad es el caso particular σ<sub>i</sub><sup>2</sup> = σ<sup>2</sup> para todo i.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>Es un supuesto sobre la dispersión de u, no sobre su media. E(u | X) = 0 puede seguir valiendo.</li>
  <li>No sesga a MCO por sí sola; lo que rompe es la estimación de la varianza de β̂.</li>
  <li>Aparece cuando la escala de las variables, la heterogeneidad no observada o la agregación hacen que la dispersión dependa de X.</li>
</ul>
<div class="formula small">Var(u<sub>i</sub> | X) = σ<sup>2</sup>h<sub>i</sub><span>h<sub>i</sub> = 1: homocedasticidad; h<sub>i</sub> variable: heterocedasticidad</span></div>
<div class="badge-row"><span class="badge always">Siempre: varianza condicional, no error individual</span><span class="badge optional">Según el caso: lineal, cuadrática o exponencial</span></div>`,
      ejemplo: `<p>En una encuesta de hogares, el ahorro medio puede crecer con el ingreso, pero la dispersión del ahorro también: hay hogares ricos que ahorran mucho y otros que desahorran. La varianza del ahorro no observado aumenta con el ingreso. Eso es heterocedasticidad, aunque el ahorro medio sea una función lineal del ingreso.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Graficá los residuos contra los valores ajustados. Si la nube se abre en forma de embudo, hay una sospecha que el contraste formal puede confirmar.</p></div>`,
      errores: `<ul>
  <li><strong>Confundir heterocedasticidad con errores grandes.</strong> Lo relevante es que la varianza cambia con X, no el tamaño de un residuo aislado.</li>
  <li><strong>Decir que MCO queda sesgado.</strong> El sesgo depende de la exogeneidad, no de la varianza condicional.</li>
  <li><strong>Mirar solo el p del contraste.</strong> El diagnóstico incluye gráficos, tamaño de la muestra y relevancia de la corrección.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué un modelo puede tener coeficientes insesgados y errores estándar inválidos al mismo tiempo.</p></div>`,
      conexiones: `<p>La heterocedasticidad conecta el supuesto de Gauss-Markov con la inferencia y con los métodos de ponderación. Su consecuencia inmediata se estudia en la ficha de consecuencias; su detección, en Breusch-Pagan y White.</p>
        <div><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button><button class="concept-chip" data-concept="breusch-pagan">Breusch-Pagan →</button><button class="concept-chip" data-concept="mcp">MCP →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 3–4.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.1.</p></div>
<div class="source-mini"><span class="source-type guía">Guía</span><p>TP 9, Actividades 1 y 2.</p></div>`,
    },
    consecuencias: {
      title: "Consecuencias de la heterocedasticidad",
      sub: "Coeficientes insesgados, inferencia rota, eficiencia perdida.",
      esencia: `<div class="definition">Bajo heterocedasticidad, MCO sigue siendo insesgado y consistente si E(u | X) = 0, pero sus errores estándar habituales son sesgados; los t y F no tienen las distribuciones que se usan para contrastar, y MCO deja de ser ELIO.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>La fórmula σ²(X′X)⁻¹ supone Ω = I. Con heterocedasticidad, la varianza verdadera es σ²(X′X)⁻¹X′ΩX(X′X)⁻¹.</li>
  <li>El software reporta la primera expresión; por eso los errores estándar, los intervalos y los p quedan mal.</li>
  <li>La pérdida de eficiencia es frente a estimadores que usan la forma de la varianza, no frente a cualquier estimador.</li>
</ul>
<div class="formula small">Var(β̂) = σ<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup><span>Ω = I reduce a la fórmula habitual</span></div>
<div class="badge-row"><span class="badge always">Siempre: separar sesgo de inferencia</span><span class="badge optional">Según el caso: dirección del sesgo del ee</span></div>`,
      ejemplo: `<p>Dos muestras generan el mismo β̂, pero una tiene errores con varianza constante y la otra con varianza creciente. En la segunda, el t calculado con el error estándar MCO puede ser 1,5 y el robusto 2,4. El coeficiente es idéntico; la conclusión sobre su significancia cambia por completo.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Nunca reportes un t sin decir qué error estándar usaste. “t = 2,1” no significa nada si no se aclara si es MCO, HC1 o MCP.</p></div>`,
      errores: `<ul>
  <li><strong>Afirmar que MCO es sesgado.</strong> La heterocedasticidad no viola E(u | X) = 0; el sesgo viene de otra parte.</li>
  <li><strong>Creer que el error estándar siempre aumenta.</strong> La corrección puede reducirlo, como muestra el laboratorio con exper.</li>
  <li><strong>Decir que el R² deja de ser válido.</strong> Sigue siendo una medida descriptiva del ajuste; lo inválido es el F usual y la inferencia.</li>
  <li><strong>Pensar que usar robustos recupera eficiencia.</strong> Solo corrige la varianza estimada; los coeficientes siguen siendo los de MCO.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué propiedad se mantiene, cuál se pierde y por qué.</p></div>`,
      conexiones: `<p>Las consecuencias explican por qué existen los errores robustos y por qué la prueba t robusta es la corrección mínima. También justifican buscar eficiencia con MCP o MCGF.</p>
        <div><button class="concept-chip" data-concept="hetero">Heterocedasticidad →</button><button class="concept-chip" data-concept="errores-robustos">Errores robustos →</button><button class="concept-chip" data-concept="prueba-t-robusta">Prueba t robusta →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 5–7.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.1–8.2.</p></div>
<div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024: MCO con errores robustos permite inferencia, pero no devuelve eficiencia.</p></div>`,
    },
    "errores-robustos": {
      title: "Errores estándar robustos",
      sub: "La varianza de β̂ estimada con residuos al cuadrado.",
      esencia: `<div class="definition">Los errores estándar robustos a la heterocedasticidad (White, HC) estiman Var(β̂) sin suponer una forma particular de h(X). Reemplazan σ² por combinaciones de los residuos MCO al cuadrado.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>No cambian los coeficientes: solo cambian los errores estándar, los t, los p y los intervalos.</li>
  <li>Son válidos asintóticamente bajo heterocedasticidad de forma desconocida.</li>
  <li>HC0 es la versión básica; HC1 corrige por grados de libertad; HC2 y HC3 corrigen por influencia.</li>
</ul>
<div class="formula small">Var(β̂<sub>j</sub>) = Σr̂<sub>ij</sub><sup>2</sup>û<sub>i</sub><sup>2</sup> / (Σr̂<sub>ij</sub><sup>2</sup>)<sup>2</sup><span>r̂<sub>ij</sub>: residuos de regresar X<sub>j</sub> en las demás X</span></div>
<div class="badge-row"><span class="badge always">Siempre: no cambian β̂</span><span class="badge optional">Según el caso: HC0, HC1, HC2 o HC3</span></div>`,
      ejemplo: `<p>En el laboratorio, el modelo en niveles tiene ee(exper) = 0,01206 con MCO y 0,01056 con HC1. El coeficiente es el mismo, 0,02234. El t pasa de 1,853 a 2,117 y el p de 0,0645 a 0,0348. La evidencia contra β<sub>exper</sub> = 0 se fortalece, no se debilita.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá “ee robusto HC1” entre paréntesis y aclará el tipo. Un lector tiene que poder reproducir la elección.</p></div>`,
      errores: `<ul>
  <li><strong>Decir que los errores robustos corrigen los coeficientes.</strong> Solo corrigen la estimación de la varianza.</li>
  <li><strong>Suponer que siempre son mayores.</strong> Pueden ser menores, como en el caso de exper.</li>
  <li><strong>Usarlos en muestras muy chicas sin advertirlo.</strong> La aproximación asintótica puede ser pobre.</li>
  <li><strong>Creer que resuelven endogeneidad u omisión de variables.</strong> No tocan el problema de identificación.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué un t robusto puede ser mayor que el t MCO.</p></div>`,
      conexiones: `<p>Los errores robustos son la corrección mínima frente a la heterocedasticidad. Se calculan con la misma lógica que la prueba t robusta y se comparan con MCP cuando se busca eficiencia.</p>
        <div><button class="concept-chip" data-concept="prueba-t-robusta">Prueba t robusta →</button><button class="concept-chip" data-concept="white">White →</button><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 8–11.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.2.</p></div>
<div class="source-mini"><span class="source-type guía">Guía</span><p>TP 9, Ejercicio 1, incisos e y f.</p></div>`,
    },
    "breusch-pagan": {
      title: "Breusch-Pagan",
      sub: "Contrastar si u² se relaciona linealmente con las X.",
      esencia: `<div class="definition">La prueba de Breusch-Pagan contrasta H<sub>0</sub>: homocedasticidad contra la alternativa de que la varianza del error depende linealmente de las X. Se estima û² en las X y se contrasta la significación conjunta de las pendientes.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>La auxiliar usa û², no u²: los errores no se observan.</li>
  <li>El estadístico LM = nR² de la auxiliar se distribuye aproximadamente χ² con tantos grados de libertad como restricciones.</li>
  <li>También se puede usar el F de significación conjunta; es asintóticamente equivalente.</li>
</ul>
<div class="formula small">û<sub>i</sub><sup>2</sup> = δ<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + δ<sub>k</sub>X<sub>ki</sub> + v<sub>i</sub><span>H<sub>0</sub>: δ<sub>1</sub> = … = δ<sub>k</sub> = 0</span></div>
<div class="badge-row"><span class="badge always">Siempre: H₀ es homocedasticidad</span><span class="badge optional">Según el caso: todas las X o un subconjunto</span></div>`,
      ejemplo: `<p>En WAGE1, la auxiliar de û² sobre educ, exper y tenure da BP = 43,096 con 3 grados de libertad y p = 2,349e-09. Se rechaza la homocedasticidad. El test no dice si la varianza crece con educ, con exper o con tenure; solo dice que alguna combinación lineal de las tres explica u².</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Si sospechás de una variable en particular, corré la auxiliar solo con ella. Es una modificación válida del BP y a veces más informativa.</p></div>`,
      errores: `<ul>
  <li><strong>Leer el rechazo como una forma funcional exacta.</strong> El test detecta relación, no la especifica.</li>
  <li><strong>Concluir homocedasticidad cuando no rechaza.</strong> No rechazar no prueba H₀.</li>
  <li><strong>Olvidar que el p depende de n.</strong> Con muestras grandes, diferencias pequeñas pueden dar p chicos.</li>
  <li><strong>Usar el R² de la auxiliar como medida de magnitud.</strong> Es un insumo del estadístico, no un tamaño de efecto.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés escribir la ecuación auxiliar ni la hipótesis nula.</p></div>`,
      conexiones: `<p>Breusch-Pagan es el contraste lineal básico. White lo generaliza a formas no lineales. Si rechazás, la corrección inmediata son los errores robustos.</p>
        <div><button class="concept-chip" data-concept="white">White →</button><button class="concept-chip" data-concept="hetero">Heterocedasticidad →</button><button class="concept-chip" data-concept="errores-robustos">Errores robustos →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 14–16.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.3.</p></div>
<div class="source-mini"><span class="source-type guía">Guía</span><p>TP 9, Ejercicio 1, inciso d.</p></div>`,
    },
    white: {
      title: "Prueba de White",
      sub: "Heterocedasticidad no lineal y productos cruzados.",
      esencia: `<div class="definition">La prueba de White contrasta homocedasticidad permitiendo que u² dependa de las X, de sus cuadrados y de sus productos cruzados. Es más general que Breusch-Pagan y también puede aplicarse con los valores ajustados y su cuadrado.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>La versión completa incluye X, X² y X<sub>j</sub>X<sub>l</sub>; consume muchos grados de libertad.</li>
  <li>La versión con ŷ y ŷ² es más parsimoniosa y detecta no linealidades en la media condicional.</li>
  <li>Un rechazo puede deberse a heterocedasticidad o a una forma funcional mal especificada.</li>
</ul>
<div class="formula small">û<sub>i</sub><sup>2</sup> = δ<sub>0</sub> + δ<sub>1</sub>ŷ<sub>i</sub> + δ<sub>2</sub>ŷ<sub>i</sub><sup>2</sup> + v<sub>i</sub><span>H<sub>0</sub>: δ<sub>1</sub> = δ<sub>2</sub> = 0; LM = nR² ≈ χ²<sub>2</sub></span></div>
<div class="badge-row"><span class="badge always">Siempre: más general que BP</span><span class="badge optional">Según el caso: versión completa o con ŷ</span></div>`,
      ejemplo: `<p>En el Ejercicio 6 del TP 9, la prueba de White sobre el modelo de GPA universitario permite detectar si la varianza depende de hsGPA, ACT, skipped y PC de una forma que Breusch-Pagan lineal no captaría. Si se rechaza, se estima por MCP y se comparan los errores estándar con los robustos.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Con muchas X, la versión completa puede quedarse sin grados de libertad. Usá la versión con ŷ y ŷ² o limitá los productos cruzados.</p></div>`,
      errores: `<ul>
  <li><strong>Creer que White siempre es la mejor opción.</strong> Más términos implican menos potencia y más sensibilidad a la forma funcional.</li>
  <li><strong>Atribuir el rechazo solo a la varianza.</strong> Una media mal especificada también puede generar el patrón.</li>
  <li><strong>Usar la versión completa con n chico.</strong> Los grados de libertad se agotan y el contraste pierde sentido.</li>
  <li><strong>Confundir la prueba de White con los errores estándar de White.</strong> El contraste diagnostica; los errores corrigen la inferencia.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir la prueba de heterocedasticidad de los errores estándar robustos.</p></div>`,
      conexiones: `<p>White generaliza a Breusch-Pagan y se complementa con el diagnóstico gráfico. Sus errores estándar asociados son los HC, que se usan aunque no se haya corrido la prueba.</p>
        <div><button class="concept-chip" data-concept="breusch-pagan">Breusch-Pagan →</button><button class="concept-chip" data-concept="errores-robustos">Errores robustos →</button><button class="concept-chip" data-concept="hetero">Heterocedasticidad →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 17–18.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.3.</p></div>
<div class="source-mini"><span class="source-type guía">Guía</span><p>TP 9, Ejercicio 6, inciso b.</p></div>`,
    },
    mcp: {
      title: "Mínimos cuadrados ponderados",
      sub: "GLS cuando la varianza es diagonal y conocida.",
      esencia: `<div class="definition">Si Var(u<sub>i</sub> | X) = σ²h<sub>i</sub> y h<sub>i</sub> se conoce salvo por σ², se divide la ecuación por √h<sub>i</sub> y se estima por MCO. Ese estimador es de mínimos cuadrados ponderados: minimiza Σû<sub>i</sub><sup>2</sup>/h<sub>i</sub>.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>La transformación vuelve homocedástico el error: Var(u<sub>i</sub>/√h<sub>i</sub>) = σ².</li>
  <li>Cada observación pesa 1/h<sub>i</sub>: menos peso a las observaciones con mayor varianza.</li>
  <li>Los coeficientes se interpretan en la ecuación original; no se leen en la escala transformada.</li>
</ul>
<div class="formula small">Y<sub>i</sub>/√h<sub>i</sub> = β<sub>0</sub>/√h<sub>i</sub> + β<sub>1</sub>X<sub>1i</sub>/√h<sub>i</sub> + … + u<sub>i</sub>/√h<sub>i</sub><span>Pesos: 1/h<sub>i</sub></span></div>
<div class="badge-row"><span class="badge always">Siempre: h conocida salvo σ²</span><span class="badge optional">Según el caso: h = X, X² o 1/X</span></div>`,
      ejemplo: `<p>Si en una función de ahorro la varianza es proporcional al ingreso, h<sub>i</sub> = ingreso<sub>i</sub> y se divide toda la ecuación por la raíz del ingreso. Los hogares con ingreso alto, que tienen más varianza, reciben menos peso. El coeficiente estimado sigue siendo el efecto del ingreso sobre el ahorro en la ecuación original.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>En R, <code>lm(y ~ x, data = base, weights = 1/h)</code> estima MCP. Verificá que los pesos sean positivos y que la función de varianza tenga sentido económico.</p></div>`,
      errores: `<ul>
  <li><strong>Decir que MCP siempre es insesgado.</strong> Con h conocida lo es; con ponderadores estimados (MCGF) solo es consistente.</li>
  <li><strong>Interpretar los coeficientes en la escala transformada.</strong> Se leen en la ecuación original.</li>
  <li><strong>Pensar que MCP siempre gana.</strong> Si h está mal especificada, puede ser menos eficiente que MCO y sus errores estándar usuales no son válidos.</li>
  <li><strong>Olvidar que los t y F de la regresión ponderada dependen de h.</strong> La validez no es automática.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué se divide por √h y no por h.</p></div>`,
      conexiones: `<p>MCP es el caso diagonal de MCG y la base de MCGF. Se compara con los errores robustos: MCP busca eficiencia; HC solo corrige la inferencia.</p>
        <div><button class="concept-chip" data-concept="mcgf">MCGF →</button><button class="concept-chip" data-concept="hetero">Heterocedasticidad →</button><button class="concept-chip" data-concept="errores-robustos">Errores robustos →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 19–24.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.4.</p></div>
<div class="source-mini"><span class="source-type guía">Guía</span><p>TP 9, Ejercicio 2, incisos g a i.</p></div>`,
    },
    mcgf: {
      title: "MCGF",
      sub: "Mínimos cuadrados generalizados factibles.",
      esencia: `<div class="definition">MCGF estima la función de varianza en una primera etapa y usa los ponderadores estimados en una segunda. Es la versión practicable de MCP cuando h(X) no se conoce.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>Se modela Var(u<sub>i</sub> | X) = σ²exp(δ<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + δ<sub>k</sub>X<sub>ki</sub>) para asegurar positividad.</li>
  <li>Se regresa log(û<sub>i</sub><sup>2</sup>) en las X, se guarda ĝ<sub>i</sub> y se construye ĥ<sub>i</sub> = exp(ĝ<sub>i</sub>).</li>
  <li>El estimador es consistente y asintóticamente más eficiente que MCO si la varianza está bien especificada; no es insesgado en muestras finitas.</li>
</ul>
<div class="formula small">log(û<sub>i</sub><sup>2</sup>) = α<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + e<sub>i</sub> &nbsp;→&nbsp; ĥ<sub>i</sub> = exp(ĝ<sub>i</sub>)<span>Pesos: 1/ĥ<sub>i</sub></span></div>
<div class="badge-row"><span class="badge always">Siempre: dos etapas</span><span class="badge optional">Según el caso: errores robustos si h es dudosa</span></div>`,
      ejemplo: `<p>En el Ejercicio 4 del TP 9, se estima el modelo de salario por MCO, se calcula g = log(û²), se regresa en educ, exper y tenure, y se exponencian los ajustados para obtener ĥ. Después se estima el modelo original con pesos 1/ĥ. La comparación con MCO y con HC1 muestra si la ganancia de eficiencia compensa el supuesto adicional.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Si la función de varianza es dudosa, reportá MCGF con errores robustos. La doble corrección es más honesta que presentar errores estándar de MCP como si h fuera verdadera.</p></div>`,
      errores: `<ul>
  <li><strong>Decir que MCGF es insesgado.</strong> Es consistente; el sesgo de muestra finita viene de estimar los pesos.</li>
  <li><strong>Usar los errores estándar usuales con h mal especificada.</strong> Son inválidos; hay que usar robustos.</li>
  <li><strong>Ignorar los û² = 0.</strong> log(0) no está definido y puede romper la primera etapa.</li>
  <li><strong>Presentar MCGF como la única solución.</strong> La corrección mínima es HC1; MCGF es una apuesta por eficiencia.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés enumerar los pasos ni decir qué propiedad se gana y cuál no.</p></div>`,
      conexiones: `<p>MCGF es MCP con h estimada. Se conecta con la ficha de MCP por la transformación y con la de errores robustos por la corrección cuando la varianza está mal especificada.</p>
        <div><button class="concept-chip" data-concept="mcp">MCP →</button><button class="concept-chip" data-concept="errores-robustos">Errores robustos →</button><button class="concept-chip" data-concept="hetero">Heterocedasticidad →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 25–30.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.4.</p></div>
<div class="source-mini"><span class="source-type guía">Guía</span><p>TP 9, Ejercicio 4, incisos d y e.</p></div>`,
    },
    "prueba-t-robusta": {
      title: "Prueba t robusta",
      sub: "El t con el error estándar corregido.",
      esencia: `<div class="definition">El estadístico t robusto a la heterocedasticidad es t<sub>rob</sub> = β̂<sub>j</sub> / ee<sub>rob</sub>(β̂<sub>j</sub>). Usa el mismo coeficiente que el t habitual, pero el error estándar estimado sin imponer varianza constante.</div>
<div class="mini-label">Qué tenés que entender</div>
<ul>
  <li>Permite contrastar H<sub>0</sub>: β<sub>j</sub> = 0 sin suponer homocedasticidad.</li>
  <li>Es válido asintóticamente; en muestras chicas puede alejarse de la distribución t exacta.</li>
  <li>No corrige sesgos por variables omitidas, endogeneidad ni mala forma funcional.</li>
</ul>
<div class="formula small">t<sub>rob</sub> = β̂<sub>j</sub> / ee<sub>rob</sub>(β̂<sub>j</sub>)<span>ee<sub>rob</sub>: raíz de la varianza HC</span></div>
<div class="badge-row"><span class="badge always">Siempre: mismo β̂, otro denominador</span><span class="badge optional">Según el caso: t o normal asintótica</span></div>`,
      ejemplo: `<p>En WAGE1, el t de exper en niveles pasa de 1,853 (p = 0,0645) con MCO a 2,117 (p = 0,0348) con HC1. Al 5%, la conclusión cambia: antes no se rechazaba y después sí. El coeficiente es el mismo; la diferencia está en el error estándar. Es el ejemplo más claro de por qué hay que decir qué inferencia se usó.</p>
<div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá coeficiente, ee robusto, t robusto y p. Si el t cruza el valor crítico, explicá qué error estándar usaste y por qué.</p></div>`,
      errores: `<ul>
  <li><strong>Creer que el t robusto siempre es más grande.</strong> Depende de la covarianza entre û² y los regresores.</li>
  <li><strong>Tratarlo como exacto en muestras chicas.</strong> La justificación es asintótica.</li>
  <li><strong>Pensar que corrige la endogeneidad.</strong> Solo corrige la varianza; el sesgo del coeficiente sigue.</li>
  <li><strong>Comparar t robustos entre modelos con distintas Y.</strong> La escala y la transformación cambian la lectura.</li>
</ul>
<div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar cómo un mismo coeficiente puede ser no significativo con MCO y significativo con HC1.</p></div>`,
      conexiones: `<p>La prueba t robusta es la aplicación directa de los errores robustos. Se apoya en las consecuencias de la heterocedasticidad y se compara con la inferencia de MCP.</p>
        <div><button class="concept-chip" data-concept="errores-robustos">Errores robustos →</button><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button><button class="concept-chip" data-concept="hetero">Heterocedasticidad →</button></div>`,
      fuentes: `<div class="source-mini"><span class="source-type">Clase</span><p>Clase 6, diap. 12.</p></div>
<div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 8, §8.2.</p></div>
<div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024: los errores robustos permiten inferencia, pero no eficiencia.</p></div>`,
    },
  },
  practice: {
    eyebrow: "De la teoría a la guía",
    title: "Práctica de heterocedasticidad",
    intro: "La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto del TP 9. Las actividades fijan las definiciones y las consecuencias; los ejercicios con engho2012 recorren el ciclo completo, desde el gráfico hasta MCGF con errores robustos. El laboratorio usa WAGE1, la base del Ejercicio 4.",
    guideHref: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-9",
    exercises: [
      {
        label: "TP 9 · Act. 1",
        title: "Dos afirmaciones para decidir",
        text: "Verdadero o falso: los estimadores MCO son sesgados ante heterocedasticidad; los estimadores MCO son consistentes ante heterocedasticidad. Justificá cada respuesta con el supuesto que se viola y el que se mantiene.",
        tags: [
          "Conceptual",
          "V/F",
        ],
        href: "guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-8",
      },
      {
        label: "TP 9 · Act. 2",
        title: "Consecuencias y patrón gráfico",
        text: "Enumerá las consecuencias de la heterocedasticidad, describí el patrón que debe mostrar el gráfico de residuos contra el valor predicho y proponé ejemplos de relaciones donde sospeches que aparece.",
        tags: [
          "Conceptual",
          "Diagnóstico",
        ],
        href: "guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-4",
      },
      {
        label: "TP 9 · Ej. 1",
        title: "Gasto, ingreso y Breusch-Pagan",
        text: "Con engho2012, estimá el gasto total en función del ingreso, los miembros del hogar y la región. Graficá residuos contra ajustados, aplicá bptest y compará MCO con errores robustos. Explicá cuál error estándar es válido y cuál no.",
        tags: [
          "Breusch-Pagan",
          "HC1",
        ],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-8",
      },
      {
        label: "TP 9 · Ej. 2",
        title: "MCGF paso a paso",
        text: "Construí ĝ = log(û²) y ĥ = exp(ĝ), estimá por MCGF y compará con MCO robusto. Después repetí MCGF con errores robustos para cubrir una posible mala especificación de la varianza.",
        tags: [
          "MCGF",
          "Errores robustos",
        ],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-8",
      },
      {
        label: "TP 9 · Ej. 4",
        title: "Salario, educación y experiencia",
        text: "Con WAGE1, estimá wage en función de educ, exper y tenure. Evaluá la heterocedasticidad, repetí el modelo con log(wage) y aplicá MCGF con la formulación exponencial de la varianza. Discutí insesgamiento, consistencia y eficiencia.",
        tags: [
          "WAGE1",
          "Laboratorio",
        ],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-8",
      },
      {
        label: "TP 9 · Ej. 6",
        title: "White, MCP y errores robustos",
        text: "Con GPA1, estimá colGPA en función de hsGPA, ACT, skipped y PC. Aplicá la prueba de White, estimá por MCP con pesos 1/ĥ y compará los errores estándar con los robustos. Es el ejercicio que combina las tres correcciones.",
        tags: [
          "White",
          "MCP",
        ],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-6-6",
      },
    ],
    rLab: {
      eyebrow: "Laboratorio de lectura",
      tag: "TP 9 · Ej. 4",
      title: "Salario, educación y heterocedasticidad: de MCO a HC1",
      intro: "La base WAGE1 permite ver el ciclo completo con una pregunta económica clara: cómo se relacionan educación, experiencia y antigüedad con el salario por hora. El contraste de Breusch-Pagan rechaza la homocedasticidad en niveles y en logaritmos. La comparación entre MCO y HC1 muestra que la corrección cambia la significancia de exper en niveles, sin mover los coeficientes.",
      dataNote: "WAGE1.rda contiene n = 526 trabajadores en un corte transversal. Las variables son wage (salario por hora), educ (años de instrucción), exper (años de experiencia) y tenure (años de antigüedad en el empleo actual). La base no trae lwage: el modelo en logaritmos se construye con log(wage). La muestra es observacional; los coeficientes describen asociaciones condicionales, no efectos causales. El script supone que el archivo está en el directorio de trabajo. MCO sigue siendo insesgado bajo E(u | X) = 0; HC1 corrige los errores estándar, no los coeficientes.",
      script: `load("WAGE1.rda")
modelo <- lm(wage ~ educ + exper + tenure, data = base)
summary(modelo)
confint(modelo)
suppressPackageStartupMessages(library(lmtest))
bptest(modelo)
suppressPackageStartupMessages(library(sandwich))
coeftest(modelo, vcov = vcovHC(modelo, type = "HC1"))
modelo_log <- lm(log(wage) ~ educ + exper + tenure, data = base)
summary(modelo_log)
confint(modelo_log)
bptest(modelo_log)
coeftest(modelo_log, vcov = vcovHC(modelo_log, type = "HC1"))`,
      output: `Call:
lm(formula = wage ~ educ + exper + tenure, data = base)

Residuals:
    Min      1Q  Median      3Q     Max 
-7.6068 -1.7747 -0.6279  1.1969 14.6536 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) -2.87273    0.72896  -3.941 9.22e-05 ***
educ         0.59897    0.05128  11.679  < 2e-16 ***
exper        0.02234    0.01206   1.853   0.0645 .  
tenure       0.16927    0.02164   7.820 2.93e-14 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 3.084 on 522 degrees of freedom
Multiple R-squared:  0.3064,	Adjusted R-squared:  0.3024 
F-statistic: 76.87 on 3 and 522 DF,  p-value: < 2.2e-16

	studentized Breusch-Pagan test

data:  modelo
BP = 43.096, df = 3, p-value = 2.349e-09


t test of coefficients:

             Estimate Std. Error t value  Pr(>|t|)    
(Intercept) -2.872735   0.807415 -3.5579 0.0004078 ***
educ         0.598965   0.061014  9.8169 < 2.2e-16 ***
exper        0.022340   0.010555  2.1165 0.0347731 *  
tenure       0.169269   0.029278  5.7814 1.277e-08 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1


Call:
lm(formula = log(wage) ~ educ + exper + tenure, data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-2.05802 -0.29645 -0.03265  0.28788  1.42809 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 0.284360   0.104190   2.729  0.00656 ** 
educ        0.092029   0.007330  12.555  < 2e-16 ***
exper       0.004121   0.001723   2.391  0.01714 *  
tenure      0.022067   0.003094   7.133 3.29e-12 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.4409 on 522 degrees of freedom
Multiple R-squared:  0.316,	Adjusted R-squared:  0.3121 
F-statistic: 80.39 on 3 and 522 DF,  p-value: < 2.2e-16

	studentized Breusch-Pagan test

data:  modelo_log
BP = 10.761, df = 3, p-value = 0.01309


t test of coefficients:

             Estimate Std. Error t value  Pr(>|t|)    
(Intercept) 0.2843596  0.1117069  2.5456   0.01120 *  
educ        0.0920290  0.0079212 11.6181 < 2.2e-16 ***
exper       0.0041211  0.0017459  2.3605   0.01862 *  
tenure      0.0220672  0.0037820  5.8348 9.461e-09 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1`,
      confint: `# modelo en niveles (ee MCO)
                   2.5 %      97.5 %
(Intercept) -4.304798982 -1.44067066
educ         0.498217563  0.69971257
exper       -0.001346387  0.04602543
tenure       0.126747410  0.21178989

# modelo en log(wage) (ee MCO)
                   2.5 %     97.5 %
(Intercept) 0.0796755842 0.48904353
educ        0.0776292137 0.10642876
exper       0.0007356983 0.00750652
tenure      0.0159896850 0.02814475`,
      readingTable: [
        { element: "Estimate (niveles)", meaning: "Coeficiente estimado en el modelo de wage.", how: "educ = 0,599: un año más de instrucción se asocia con 0,599 dólares por hora; exper = 0,022; tenure = 0,169." },
        { element: "Std. Error (niveles)", meaning: "Error estándar MCO, calculado bajo homocedasticidad.", how: "educ 0,0513; exper 0,0121; tenure 0,0216. Son los que dejan de ser válidos si hay heterocedasticidad." },
        { element: "t value (niveles)", meaning: "Coeficiente dividido por su error estándar MCO.", how: "educ 11,68; exper 1,85; tenure 7,82. El de exper no alcanza el 5% con esta inferencia." },
        { element: "Pr(>|t|) (niveles)", meaning: "Valor p bilateral con el error estándar MCO.", how: "exper = 0,0645. Se compara con α, pero solo es válido si el error estándar lo es." },
        { element: "Residual standard error", meaning: "Desvío estándar residual en unidades de wage.", how: "3,084 dólares por hora con 522 grados de libertad. Es una medida de dispersión promedio, no de heterocedasticidad." },
        { element: "Multiple R-squared", meaning: "Proporción de variación de wage explicada por las tres variables.", how: "0,3064 en niveles y 0,3160 en log(wage). No son comparables: cambió la variable dependiente." },
        { element: "F-statistic", meaning: "Contraste conjunto de que las tres pendientes son cero.", how: "F(3, 522) = 76,87, p < 0,001 en niveles. Supone homocedasticidad; con heterocedasticidad hay que usar una versión robusta." },
        { element: "Breusch-Pagan (niveles)", meaning: "Contraste de homocedasticidad en la ecuación de wage.", how: "BP = 43,096, df = 3, p = 2,349e-09. Se rechaza la homocedasticidad." },
        { element: "HC1 (niveles)", meaning: "Errores estándar robustos del mismo modelo.", how: "educ 0,0610 (t 9,82); exper 0,01056 (t 2,12); tenure 0,02928 (t 5,78). El coeficiente de exper no cambia; su t sí." },
        { element: "confint (niveles)", meaning: "Intervalos al 95% con errores estándar MCO.", how: "El de exper es [−0,00135; 0,04603] y contiene cero. Con HC1 el error estándar es menor y el intervalo robusto dejaría de contener cero." },
        { element: "Modelo log(wage)", meaning: "Coeficientes en semi-elasticidades.", how: "educ 0,0920: 9,2% más de salario por año; exper 0,00412: 0,41%; tenure 0,02207: 2,21%." },
        { element: "BP y HC1 en log(wage)", meaning: "Diagnóstico y corrección en la versión logarítmica.", how: "BP = 10,761, df = 3, p = 0,01309: se rechaza al 5%, no al 1%. HC1: educ t 11,62; exper t 2,36; tenure t 5,83." },
      ],
      econometric: `<p><strong>Modelo en niveles.</strong> β̂<sub>educ</sub> = 0,599 (ee 0,0513; t 11,68), β̂<sub>exper</sub> = 0,0223 (ee 0,0121; t 1,85) y β̂<sub>tenure</sub> = 0,169 (ee 0,0216; t 7,82). El R<sup>2</sup> es 0,3064 y el F(3, 522) = 76,87 (p &lt; 0,001). Con la inferencia MCO, educ y tenure son significativas al 1%; exper no alcanza el 5% (p = 0,0645).</p>
        <p><strong>Diagnóstico.</strong> Breusch-Pagan da BP = 43,096 con 3 grados de libertad y p = 2,349e-09. Se rechaza la homocedasticidad. El test no dice qué variable genera el patrón ni si la varianza crece o decrece; solo aporta evidencia de que u<sup>2</sup> se relaciona con las X. La lectura gráfica de residuos contra ajustados es el complemento natural.</p>
        <p><strong>Corrección HC1.</strong> Los coeficientes no se mueven. Los errores estándar robustos son 0,0610 para educ (t 9,82), 0,01056 para exper (t 2,12; p 0,0348) y 0,02928 para tenure (t 5,78). El cambio importante es exper: pasa de no significativo al 5% a significativo. El error estándar robusto es menor que el MCO en este caso, así que la evidencia se fortalece. No hay una regla que diga que HC1 siempre agranda el error estándar.</p>
        <p><strong>Modelo en log(wage).</strong> β̂<sub>educ</sub> = 0,0920 (t 12,56), β̂<sub>exper</sub> = 0,00412 (t 2,39) y β̂<sub>tenure</sub> = 0,0221 (t 7,13). BP = 10,761 con 3 grados de libertad y p = 0,01309: se rechaza al 5%, pero no al 1%. La evidencia de heterocedasticidad es más débil que en el modelo en niveles, aunque no desaparece. Con HC1, educ t = 11,62, exper t = 2,36 (p 0,0186) y tenure t = 5,83: las conclusiones de significancia se mantienen, pero los errores estándar cambian.</p>
        <p><strong>Comparación.</strong> El R<sup>2</sup> de 0,3064 en niveles y el de 0,3160 en logaritmos no son comparables: la variable dependiente es distinta. Tampoco se comparan directamente los coeficientes: 0,599 dólares por año de educación no es lo mismo que 9,2% por año. La elección entre niveles y logaritmos depende de la pregunta y de la forma de la heterocedasticidad, no del R<sup>2</sup>.</p>`,
      economic: `<p>La ecuación en niveles dice que un año adicional de educación se asocia con 0,599 dólares más por hora, manteniendo experiencia y antigüedad constantes. La versión logarítmica lo expresa como un cambio porcentual: 9,2% más de salario por año, aproximadamente; el valor exacto es 100[exp(0,092029) − 1] = 9,64%. La diferencia entre ambas lecturas no es un error: son modelos con supuestos distintos sobre cómo la educación se relaciona con el salario.</p>
        <p>La experiencia suma 0,022 dólares por hora por año en niveles, unos 2,2 centavos, y 0,41% en logaritmos. La antigüedad en el empleo actual suma 0,169 dólares por hora por año, bastante más que la experiencia general. Esa diferencia es plausible: la antigüedad específica captura capital humano y relaciones laborales que no se transfieren fácilmente a otro empleo. La media de tenure es 5,1 años y la de exper, 17,0; el efecto por año no se lee igual en ambos recorridos.</p>
        <p>La heterocedasticidad es esperable en salarios. La dispersión de los factores no observados que afectan el salario —habilidad, negociación, condiciones del empleador, oportunidades— tiende a crecer con la educación y con la experiencia. Que BP rechace no es un defecto del modelo: es una característica de la población. Lo que corresponde es corregir la inferencia y, si se busca eficiencia, modelar la varianza.</p>
        <p>La lectura causal exige cautela. La base es observacional y no controla habilidad no observada, calidad de la educación ni selección al empleo. Los coeficientes describen asociaciones condicionales en esta muestra de 526 trabajadores. La clase 9 retoma el problema de endogeneidad; la heterocedasticidad, por sí sola, no lo resuelve ni lo agrava. Tampoco conviene tomar una decisión de política porque un t cruce 0,05: el cambio de significancia de exper en niveles es un recordatorio de que la inferencia depende del supuesto sobre la varianza.</p>`,
      errors: [
        "Decir que la heterocedasticidad sesga los coeficientes MCO. En el laboratorio, β̂ es idéntico con MCO y con HC1; lo que cambia es el error estándar.",
        "Creer que HC1 siempre aumenta los errores estándar. En el modelo en niveles, el ee de exper baja de 0,01206 a 0,01056 y el t sube.",
        "Comparar el R² de 0,3064 con el de 0,3160 como si midieran lo mismo. La Y cambió de wage a log(wage).",
        "Leer el t robusto como una prueba exacta en muestras chicas. La justificación de HC1 es asintótica; con n = 526 es razonable, pero no es exacta.",
        "Afirmar que el modelo en log(wage) elimina la heterocedasticidad porque BP baja. BP sigue rechazando al 5% (p = 0,01309); solo se reduce la evidencia.",
        "Interpretar el coeficiente de educ como el efecto causal de un año más de educación. Es una asociación condicional, sin control de habilidad ni de calidad educativa.",
        "Usar el intervalo de confianza MCO para exper y concluir que el efecto es cero. El intervalo contiene cero, pero con HC1 el error estándar es menor y el intervalo robusto podría dejar de contenerlo.",
      ],
      checklist: [
        "Reportá n, las unidades de wage, educ, exper y tenure, y aclará que es un corte transversal.",
        "Estimá el modelo en niveles y graficá residuos contra valores ajustados antes de mirar el p de BP.",
        "Aplicá bptest y reportá el estadístico, los grados de libertad y el p. Aclará que R usa la versión studentizada.",
        "Compará coeficiente, ee MCO, ee HC1, t y p para cada variable. No supongas que el ee robusto es mayor.",
        "Repetí el ejercicio con log(wage), reportá BP y HC1, y explicá por qué el R² no es comparable con el de niveles.",
        "Cerrá con los límites causales y con la diferencia entre corregir la inferencia y buscar eficiencia.",
      ],
    },
    partials: [
      { label: "2P 2024", text: "Verdadero o falso: “La estimación MCO con errores robustos permite hacer inferencia, pero los estimadores dejan de ser eficientes”. Justificar con la diferencia entre corregir la varianza y recuperar eficiencia." },
      { label: "2P 2024", text: "A partir de Var(β̂)<sub>MCO</sub> = σ̂²(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup>, explicar qué estructura tiene Ω con heterocedasticidad y ausencia de autocorrelación." },
      { label: "2P 2024", text: "Si Var(u<sub>i</sub> | X) = σ²h<sub>i</sub>, demostrar qué transformación permite obtener errores homocedásticos y explicar cómo se estima ĥ<sub>i</sub> en la práctica." },
    ],
  },
  assessment: {
    eyebrow: "Autoevaluación",
    title: "Preguntas de razonamiento",
    intro: "Las preguntas apuntan a separar sesgo de inferencia, diagnóstico de corrección y corrección de eficiencia. Respondé antes de abrir la solución; si tu respuesta no distingue estos planos, volvé a la sección correspondiente.",
    questions: [
      {
        q: "¿La heterocedasticidad sesga los estimadores MCO? Justificá con la fórmula del estimador.",
        a: "No. β̂ = (X′X)⁻¹X′Y no depende de la matriz de varianzas de los errores. Si E(u | X) = 0, el estimador sigue siendo insesgado y consistente. La heterocedasticidad afecta Var(β̂), no su esperanza. El sesgo aparecería si u estuviera correlacionado con X, que es un problema de exogeneidad, no de varianza.",
      },
      {
        q: "¿Por qué los t y F habituales dejan de ser válidos si los coeficientes son insesgados?",
        a: "Porque el t es β̂ dividido por un error estándar estimado. La fórmula habitual del error estándar supone σ² constante; con heterocedasticidad, esa fórmula no estima la varianza correcta. Entonces el cociente no se distribuye como t y el F no se distribuye como F. El centro del estimador está bien; la escala de la inferencia está mal.",
      },
      {
        q: "¿Qué corrige exactamente HC1 y qué no corrige?",
        a: "HC1 corrige la estimación de la varianza de β̂ usando los residuos al cuadrado. No cambia los coeficientes, no recupera eficiencia y no corrige endogeneidad, variables omitidas ni mala forma funcional. Tampoco garantiza que el error estándar sea mayor: puede ser menor, como ocurre con exper en el laboratorio.",
      },
      {
        q: "Si los errores robustos son válidos en más casos, ¿por qué no se usan siempre?",
        a: "Porque su justificación es asintótica. Si hay homocedasticidad y normalidad, el t habitual es exacto para cualquier n; el t robusto solo aproxima. En muestras chicas, con muchos regresores o puntos de palanca, la aproximación puede ser pobre. En cortes transversales grandes se prefiere HC1; en muestras chicas hay que justificar la elección y mirar la sensibilidad.",
      },
      {
        q: "Escribí la ecuación auxiliar de Breusch-Pagan y la hipótesis nula.",
        a: "Se estima ûᵢ² = δ₀ + δ₁X₁ᵢ + … + δₖXₖᵢ + vᵢ. La hipótesis nula es H₀: δ₁ = … = δₖ = 0, que equivale a homocedasticidad bajo la forma lineal supuesta. El estadístico LM = nR² de esta auxiliar se distribuye aproximadamente χ² con k grados de libertad. También se puede usar el F de significación conjunta.",
      },
      {
        q: "BP da p = 0,20. ¿Podés afirmar que la varianza es constante?",
        a: "No. No rechazar H₀ solo indica que los datos no aportan evidencia suficiente contra la homocedasticidad. Puede haber heterocedasticidad moderada y la muestra no tener potencia para detectarla. La conclusión correcta es reportar el p, mirar el gráfico y, si el tema es central, usar errores robustos como chequeo de sensibilidad.",
      },
      {
        q: "¿Qué agrega la prueba de White respecto de Breusch-Pagan y cuál es su costo?",
        a: "White permite que u² dependa de las X, de sus cuadrados y de productos cruzados, así que detecta formas no lineales que BP lineal no capta. El costo es que consume muchos grados de libertad y puede confundir heterocedasticidad con una forma funcional mal especificada. Por eso a veces se usa la versión con ŷ y ŷ².",
      },
      {
        q: "Si Var(uᵢ | X) = σ²Xᵢ, ¿cómo se transforma el modelo y por qué?",
        a: "Se divide toda la ecuación por √Xᵢ. El error transformado es uᵢ/√Xᵢ y su varianza es σ²Xᵢ/Xᵢ = σ². La ecuación transformada tiene errores homocedásticos, así que se estima por MCO y se obtiene el estimador de mínimos cuadrados ponderados. Los coeficientes se interpretan en la ecuación original.",
      },
      {
        q: "¿MCGF es insesgado? ¿Es consistente? ¿Es eficiente?",
        a: "No es insesgado en muestras finitas, porque los ponderadores se estiman con los mismos datos. Es consistente: cuando n crece, los ponderadores convergen y β̂ converge a β. Es asintóticamente más eficiente que MCO si la función de varianza está correctamente especificada. Si h está mal especificada, la eficiencia se pierde y los errores estándar usuales dejan de ser válidos.",
      },
      {
        q: "Si la varianza está mal especificada, ¿qué pasa con MCO y qué con MCP?",
        a: "MCO sigue siendo insesgado y consistente si E(u | X) = 0, pero es ineficiente. MCP también puede seguir siendo consistente, pero sus errores estándar y contrastes usuales son inválidos. La solución es calcular errores robustos sobre la estimación MCP. Con heterocedasticidad fuerte, MCP con una varianza aproximada puede ser mejor que MCO, aunque no hay garantía universal.",
      },
      {
        q: "En el laboratorio, el t de exper pasa de 1,85 a 2,12 con HC1. ¿Cómo se explica y qué reportarías?",
        a: "El coeficiente no cambió: 0,02234. Lo que cambió es el error estándar, que bajó de 0,01206 a 0,01056. El t robusto es mayor y el p pasa de 0,0645 a 0,0348. Reportaría ambos, aclararía que la inferencia válida bajo heterocedasticidad es la de HC1 y evitaría decir que el efecto “apareció”: la evidencia contra β = 0 es más fuerte con la corrección.",
      },
      {
        q: "Tenés n = 800, BP con p = 0,001 y querés estimar el efecto de una política. ¿Qué camino seguís?",
        a: "Primero reportaría MCO con errores robustos HC1 y t robustos, porque hay evidencia de heterocedasticidad y la muestra es grande. Si el objetivo es eficiencia y puedo justificar una función de varianza, estimaría MCGF y compararía. Si la función de varianza es dudosa, MCGF con errores robustos. En todos los casos, separaría la asociación condicional de la interpretación causal.",
      },
    ],
  },
  review: {
    eyebrow: "Cierre y consolidación",
    title: "Kit de repaso: heterocedasticidad",
    intro: "Empezá por las fórmulas, seguí con los drills y la sesión de 90 minutos, y cerrá con el plan de 7 días. La idea es tener una hoja de ruta para diagnosticar, corregir la inferencia y decidir si vale la pena buscar eficiencia.",
    formulas: [
      { title: "Varianza condicional", eq: "Var(u<sub>i</sub> | X) = σ<sub>i</sub><sup>2</sup>", note: "Homocedasticidad: σᵢ² = σ² para todo i. Heterocedasticidad: cambia con X." },
      { title: "Varianza MCO con heterocedasticidad", eq: "Var(β̂) = σ<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup>", note: "Ω es diagonal con las varianzas relativas si no hay autocorrelación." },
      { title: "Varianza MCO con homocedasticidad", eq: "Var(β̂) = σ<sup>2</sup>(X′X)<sup>−1</sup>", note: "Es la fórmula que usa el software. Solo vale si Ω = I." },
      { title: "Error estándar robusto simple", eq: "Var(β̂<sub>1</sub>) = Σ(X<sub>i</sub> − X̄)<sup>2</sup>û<sub>i</sub><sup>2</sup> / SCT<sub>X</sub><sup>2</sup>", note: "White (1980). Reemplaza σᵢ² por ûᵢ². No requiere especificar h." },
      { title: "Error estándar robusto múltiple", eq: "Var(β̂<sub>j</sub>) = Σr̂<sub>ij</sub><sup>2</sup>û<sub>i</sub><sup>2</sup> / (Σr̂<sub>ij</sub><sup>2</sup>)<sup>2</sup>", note: "r̂ᵢⱼ son los residuos de regresar Xⱼ en las demás X." },
      { title: "t robusto", eq: "t<sub>rob</sub> = β̂<sub>j</sub> / ee<sub>rob</sub>(β̂<sub>j</sub>)", note: "Mismo coeficiente, otro denominador. Válido asintóticamente." },
      { title: "Breusch-Pagan", eq: "û<sub>i</sub><sup>2</sup> = δ<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + δ<sub>k</sub>X<sub>ki</sub> + v<sub>i</sub>", note: "H₀: δ₁ = … = δₖ = 0. LM = nR² ≈ χ²ₖ." },
      { title: "White", eq: "û<sub>i</sub><sup>2</sup> = δ<sub>0</sub> + δ<sub>1</sub>ŷ<sub>i</sub> + δ<sub>2</sub>ŷ<sub>i</sub><sup>2</sup> + v<sub>i</sub>", note: "Versión parsimoniosa. La completa usa X, X² y productos cruzados." },
      { title: "Transformación WLS", eq: "Y<sub>i</sub>/√h<sub>i</sub> = β<sub>0</sub>/√h<sub>i</sub> + β<sub>1</sub>X<sub>1i</sub>/√h<sub>i</sub> + … + u<sub>i</sub>/√h<sub>i</sub>", note: "Con Var(uᵢ | X) = σ²hᵢ, el error transformado tiene varianza σ²." },
      { title: "Objetivo WLS", eq: "min Σ(Y<sub>i</sub> − β<sub>0</sub> − β<sub>1</sub>X<sub>1i</sub> − …)<sup>2</sup>/h<sub>i</sub>", note: "Cada observación pesa 1/hᵢ. Menos peso a mayor varianza." },
      { title: "Modelo de varianza MCGF", eq: "Var(u<sub>i</sub> | X) = σ<sup>2</sup>exp(δ<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + δ<sub>k</sub>X<sub>ki</sub>)", note: "La exponencial garantiza varianzas positivas. Se estima con log(û²)." },
      { title: "Ponderador MCGF", eq: "log(û<sub>i</sub><sup>2</sup>) = α<sub>0</sub> + δ<sub>1</sub>X<sub>1i</sub> + … + e<sub>i</sub> &nbsp;→&nbsp; ĥ<sub>i</sub> = exp(ĝ<sub>i</sub>)", note: "Pesos 1/ĥᵢ. Si h es dudosa, usá errores robustos sobre la estimación MCP." },
    ],
    drills: [
      { q: "Definí heterocedasticidad en una frase.", a: "La varianza condicional del error, Var(uᵢ | X), no es constante: cambia con X entre observaciones." },
      { q: "¿La heterocedasticidad sesga a MCO?", a: "No. Bajo E(u | X) = 0, MCO sigue siendo insesgado y consistente. Lo que se rompe es la estimación de la varianza y la inferencia." },
      { q: "¿Qué pasa con t y F bajo heterocedasticidad?", a: "No tienen las distribuciones t y F habituales, porque el error estándar estimado es incorrecto. Los p y los intervalos dejan de ser válidos." },
      { q: "¿Qué cambia HC1?", a: "Solo el error estándar y, con él, el t, el p y el intervalo. Los coeficientes no cambian." },
      { q: "¿HC1 siempre aumenta el error estándar?", a: "No. En el laboratorio, el ee de exper baja de 0,01206 a 0,01056 y el t sube de 1,85 a 2,12." },
      { q: "¿Por qué no usar siempre HC1?", a: "Porque es asintótico. Con muestras chicas y homocedasticidad más normalidad, el t usual es exacto y puede ser preferible." },
      { q: "Escribí H₀ y la auxiliar de Breusch-Pagan.", a: "û² = δ₀ + δ₁X₁ + … + δₖXₖ + v; H₀: δ₁ = … = δₖ = 0. LM = nR² ≈ χ²ₖ." },
      { q: "¿Qué agrega White?", a: "Cuadrados y productos cruzados de las X, o ŷ y ŷ². Detecta formas no lineales, pero puede confundir heterocedasticidad con mala forma funcional." },
      { q: "Si Var(uᵢ | X) = σ²Xᵢ², ¿por qué se divide por Xᵢ?", a: "Porque el error transformado uᵢ/Xᵢ tiene varianza σ²Xᵢ²/Xᵢ² = σ². La regla es dividir por la raíz de hᵢ." },
      { q: "¿Cómo se estima MCGF en dos etapas?", a: "MCO inicial, residuos, log(û²) en X, ajustados ĝ, ĥ = exp(ĝ), y MCP con pesos 1/ĥ." },
      { q: "¿MCGF es insesgado?", a: "No en muestras finitas: los pesos se estiman. Es consistente y asintóticamente eficiente si h está bien especificada." },
      { q: "¿Qué hacer si la varianza está mal especificada?", a: "MCO sigue siendo insesgado y consistente; MCP puede seguir siéndolo, pero sus errores usuales no son válidos. Usá errores robustos sobre MCP." },
    ],
    sourceGuide: [
      { stuck: "No entiendo por qué MCO sigue siendo insesgado", source: "Clase 6, diap. 5–7; Wooldridge Cap. 8, §8.1; sección 02 de esta clase." },
      { stuck: "No sé qué error estándar reportar", source: "Clase 6, diap. 8–12; Wooldridge Cap. 8, §8.2; TP 9, Ejercicio 1, incisos e y f." },
      { stuck: "No puedo leer el gráfico de residuos", source: "Clase 6, diap. 13; sección 04 de esta clase; TP 9, Actividad 2b." },
      { stuck: "No sé plantear Breusch-Pagan", source: "Clase 6, diap. 14–16; Wooldridge Cap. 8, §8.3; TP 9, Ejercicio 1d." },
      { stuck: "Confundo Breusch-Pagan con White", source: "Clase 6, diap. 17–18; sección 04 de esta clase; TP 9, Ejercicio 6b." },
      { stuck: "No entiendo la transformación de MCP", source: "Clase 6, diap. 19–24; Wooldridge Cap. 8, §8.4; sección 05 de esta clase." },
      { stuck: "No me salen los pasos de MCGF", source: "Clase 6, diap. 25–28; TP 9, Ejercicio 2g y Ejercicio 4d; sección 06 de esta clase." },
      { stuck: "No sé qué pasa si la varianza está mal especificada", source: "Clase 6, diap. 29–30; Wooldridge Cap. 8, §8.4; sección 06 de esta clase." },
      { stuck: "No sé qué hacer con el resultado del contraste", source: "Clase 6, diap. 5–30; sección 07 de esta clase; 2P 2024." },
    ],
    session: [
      { time: "0–10", title: "Pregunta guía", text: "¿Qué cambia y qué no cuando la varianza de los errores depende de X? Escribí una respuesta de tres líneas sin mirar." },
      { time: "10–30", title: "Consecuencias", text: "Explicá por qué MCO sigue insesgado y por qué el t y el F se rompen. Escribí la fórmula de Var(β̂) con Ω y reducila al caso homocedástico. Fuente: sección 02." },
      { time: "30–50", title: "Diagnóstico", text: "Mirá un gráfico de residuos contra ajustados y describí el patrón. Planteá BP y White, y resolvé el TP 9, Actividad 2 y Ejercicio 1. Fuente: sección 04." },
      { time: "50–70", title: "Corrección robusta", text: "Reproducí el laboratorio de WAGE1. Leé coeficientes, ee MCO, BP y HC1. Explicá el cambio de t de exper. Fuente: secciones 03 y laboratorio." },
      { time: "70–85", title: "MCP y MCGF", text: "Escribí la transformación por √h y los pasos de MCGF. Resolvé el TP 9, Ejercicio 2 y discutí la varianza mal especificada. Fuente: secciones 05 y 06." },
      { time: "85–90", title: "Cierre", text: "Anotá una situación en la que reportarías HC1 y otra en la que buscarías eficiencia con MCGF. Justificá la diferencia en dos minutos." },
    ],
    kit: [
      { k: "Kit 01", title: "Tres fórmulas", text: "Var(β̂) con Ω, error estándar robusto y transformación por √h. Son el núcleo de la clase." },
      { k: "Kit 02", title: "Tabla de decisión", text: "Diagnóstico, inferencia robusta y eficiencia. La sección 07 ordena qué hacer en cada caso." },
      { k: "Kit 03", title: "Seis tarjetas de práctica", text: "Actividades 1 y 2 y Ejercicios 1, 2, 4 y 6 del TP 9, con enlace profundo a cada uno." },
      { k: "Kit 04", title: "Plan de 7 días", text: "Una rutina corta para alternar teoría, ejercicios y laboratorio sin volver a leer todo desde cero." },
    ],
    plan: [
      { day: "Día 1", title: "Teoría y mapa", text: "Leé las secciones 01 y 07. Explicá el mapa de decisión de seis pasos sin mirar." },
      { day: "Día 2", title: "Consecuencias", text: "Estudiá la sección 02. Escribí la fórmula de Var(β̂) con Ω y explicá por qué MCO sigue insesgado." },
      { day: "Día 3", title: "TP 9, Actividades 1 y 2", text: "Respondé las V/F y las preguntas sobre consecuencias y patrón gráfico. Verificá que podés distinguir heterocedasticidad de error grande." },
      { day: "Día 4", title: "Diagnóstico formal", text: "Estudiá Breusch-Pagan y White. Resolvé el Ejercicio 1 de engho2012 y el Ejercicio 6b de GPA1." },
      { day: "Día 5", title: "Laboratorio WAGE1", text: "Reproducí la salida. Reportá MCO, BP, HC1 y el modelo log(wage). Explicá el cambio de significancia de exper." },
      { day: "Día 6", title: "MCP y MCGF", text: "Resolvé el Ejercicio 2 y el Ejercicio 4d. Escribí los pasos de MCGF y las propiedades de los estimadores." },
      { day: "Día 7", title: "Cierre", text: "Volvé solo a lo que falló. Actualizá tu tabla de decisión y resolvé las preguntas de 2P 2024 sobre errores robustos y Ω." },
    ],
  },
  sources: {
    eyebrow: "Trazabilidad",
    title: "Fuentes de esta clase",
    intro: "Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para abrir cada ejercicio desde la práctica. Las citas de parciales se limitan a preguntas relacionadas con heterocedasticidad.",
    items: [
      { type: "Clase", typeClass: "", title: "Clase 6 — Heterocedasticidad", text: "Fuente principal de la explicación, el orden y los énfasis. Cubre el problema, las consecuencias, los errores robustos, los contrastes, MCP y MCGF, y la varianza mal especificada.", loc: "30 diapositivas · diap. 3–30" },
      { type: "Libro", typeClass: "book", title: "Wooldridge — Introducción a la Econometría, 4.ª ed.", text: "Cap. 8: heterocedasticidad, consecuencias para MCO, errores estándar robustos, contrastes de Breusch-Pagan y White, mínimos cuadrados ponderados y MCGF.", loc: "Cap. 8 · §8.1–8.4" },
      { type: "Guía", typeClass: "", title: "Guía de Trabajos Prácticos 2026 — TP 9", text: "Actividades 1–2 para conceptos y consecuencias; Ejercicios 1–2 para engho2012, Breusch-Pagan, errores robustos y MCGF; Ejercicio 4 para WAGE1; Ejercicio 6 para White y MCP.", loc: "TP 9 · act. 1–2; ej. 1–6", href: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-9" },
      { type: "Parcial", typeClass: "exam", title: "2P 2024", text: "Errores robustos: permiten inferencia pero no eficiencia; estructura de Ω con heterocedasticidad y ausencia de autocorrelación; transformación para obtener errores homocedásticos y estimación de ĥ.", loc: "Solución orientativa" },
    ],
  },
};
