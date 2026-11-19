window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-09"] = {
  id: "clase-09",
  num: "09",
  eyebrow: "Clase 09 · Endogeneidad y VI",
  title: "Endogeneidad y variables instrumentales",
  lead: "Cuando X se mueve con el error, MCO deja de ser consistente: el sesgo no desaparece con más datos. La clase ordena las causas, muestra cuándo una proxy alcanza, cómo se atenúa un coeficiente por error de medida y qué exige un instrumento para rescatar el efecto causal.",
  question: "¿Cuándo podés confiar en MCO y cuándo necesitás una proxy o un instrumento?",
  pills: ["30 diapositivas", "TP 12", "2P 2024", "8 conceptos clave"],
  sections: [
    {
      id: 'c09-s01',
      number: '01',
      title: 'El problema: cuando el regresor se mueve con el error',
      blocks: [
        { type: 'p', id: 'c09-s01-p01', html: 'Dos economistas estiman el retorno de la educación con la misma encuesta. El primero incluye una medida de capacidad; el segundo no la tiene y la deja en el error. Los dos reportan un coeficiente de EDUC, pero solo uno estima algo parecido a un efecto ceteris paribus. La diferencia no está en el programa ni en el tamaño de la muestra: está en si EDUC se mueve con el error.' },
        { type: 'p', id: 'c09-s01-p02', html: 'Hay <span class="concept" data-concept="endogeneidad" tabindex="0" role="button">endogeneidad</span> cuando una variable explicativa está correlacionada con el término de error: Cov(X,u) ≠ 0. MCO sigue siendo lineal y calculable, pero pierde la garantía de consistencia y, en general, también la de insesgamiento. El sesgo no se diluye al aumentar n: se congela en un número distinto de β. Por eso la endogeneidad es el error de especificación más grave: no se arregla juntando más observaciones.' },
        { type: 'compare', left: { tag: 'Exogeneidad', title: 'Cov(X,u) = 0', text: 'MCO es insesgado bajo los supuestos habituales y consistente. Los t, los F y los intervalos tienen la distribución correcta en muestras grandes.', eq: 'Cov(X,u) = 0' }, right: { tag: 'Endogeneidad', title: 'Cov(X,u) ≠ 0', text: 'MCO es, en general, sesgado e inconsistente. El sesgo no se reduce con n y la inferencia asintótica deja de ser válida.', eq: 'plim β̂<sub>1</sub> ≠ β<sub>1</sub>' } },
        { type: 'formula', main: 'plim β̂<sub>1</sub> = β<sub>1</sub> + Corr(X,u) · σ<sub>u</sub>/σ<sub>x</sub>', legend: [
          { key: 'Corr(X,u)', text: 'Correlación entre el regresor y el error. Si es distinta de cero, el segundo término no desaparece.' },
          { key: 'σ<sub>u</sub>/σ<sub>x</sub>', text: 'Escala del sesgo: cuánto ruido hay en relación con la variación de X.' },
          { key: 'n', text: 'No aparece en la fórmula. Por eso el sesgo no se va con la muestra.' }
        ] },
        { type: 'cards', items: [
          { sym: 'Insesgamiento', title: 'El centro se corre', text: 'En general, E(β̂) ≠ β. El estimador cae, en promedio, en otro lado.' },
          { sym: 'Consistencia', title: 'El límite no es β', text: 'Más datos reducen la varianza, no el centro del sesgo. El plim queda lejos del parámetro.' },
          { sym: 'Inferencia', title: 't y F engañosos', text: 'Los contrastes se construyen alrededor de un estimador inconsistente. La cobertura prometida no se cumple.' }
        ] },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Qué se rompe y qué no',
          html: 'La endogeneidad no impide calcular MCO ni invalida la aritmética de los residuos. Lo que rompe es la interpretación: el coeficiente deja de estimar el efecto ceteris paribus y los contrastes dejan de tener la distribución prometida. El R² sigue siendo descriptivo; la causalidad, no.'
        },
        { type: 'errorTable', rows: [
          { error: 'Un R² alto prueba que no hay endogeneidad.', why: 'El R² mide ajuste, no la correlación entre X y u. Un modelo puede ajustar mucho y estar sesgado.', fix: 'Preguntá qué quedó en el error y con qué se mueve.' },
          { error: 'Con una muestra grande, el sesgo desaparece.', why: 'La inconsistencia es un límite de probabilidad distinto de β. n reduce la varianza, no el sesgo.', fix: 'Distinguí error de muestreo de sesgo sistemático.' },
          { error: 'La endogeneidad solo cambia el intercepto.', why: 'Afecta a los coeficientes de las variables endógenas y, por el sesgo de omisión, también a los demás.', fix: 'Revisá cada regresor y el signo esperado del sesgo.' },
          { error: 'Si el t es significativo, el coeficiente es causal.', why: 'La significancia es estadística; la validez causal depende de la exogeneidad.', fix: 'Separá evidencia estadística de identificación.' }
        ] },
        { type: 'miniCheck', id: 'c09-check-01', question: 'Un modelo tiene R² = 0,82 y todos los t son significativos. ¿Alcanza para descartar endogeneidad?', intro: 'Pensá qué mide el R² y qué tendría que pasar con el error.', answer: 'No. El R² mide cuánto de la variación de Y explica el modelo, no si X está correlacionada con u. Un R² alto puede convivir con una variable omitida importante: si esa variable se mueve con X, el coeficiente de X recoge su efecto y queda sesgado. La significancia tampoco lo resuelve: un estimador inconsistente puede tener t grandes si hay muchas observaciones.' }
      ]
    },
    {
      id: 'c09-s02',
      number: '02',
      title: 'Las causas: cuatro puertas y una quinta',
      blocks: [
        { type: 'p', id: 'c09-s02-p01', html: 'La endogeneidad no aparece por una sola razón. En la práctica se llega a ella por cuatro puertas: heterogeneidad inobservable, variables omitidas, simultaneidad y errores de medida. A veces las puertas se superponen: la capacidad que falta en una ecuación de salarios es, a la vez, una variable omitida y una fuente de heterogeneidad entre personas. Lo importante no es etiquetar el caso, sino identificar qué hay en el error y con qué regresor se mueve.' },
        { type: 'cards', items: [
          { sym: 'Heterogeneidad', title: 'Inobservable', text: 'Individuos con la misma X difieren en características que no se observan y que afectan a Y. Esa diferencia queda en u.' },
          { sym: 'Omisión', title: 'Variable relevante ausente', text: 'Una variable que explica a Y no está en el modelo y está correlacionada con X. Es el sesgo por omisión de siempre.' },
          { sym: 'Simultaneidad', title: 'Y y X se determinan juntas', text: 'Precio y cantidad en un mercado, salario y participación laboral. X reacciona a Y dentro del mismo sistema.' },
          { sym: 'Medición', title: 'X observada con error', text: 'La variable registrada no es la del modelo. Si el error se correlaciona con la variable observada, MCO se sesga.' }
        ] },
        { type: 'p', id: 'c09-s02-p02', html: 'Hay una quinta puerta que la literatura de evaluación de programas pone en primer plano: la autoselección. El individuo elige el valor de X a partir de factores que el analista no observa. Quien decide capacitarse, migrar o participar del mercado laboral puede hacerlo por motivación, información o expectativas que también afectan el resultado. X deja de ser una variable asignada y pasa a ser una decisión endógena.' },
        { type: 'p', id: 'c09-s02-p03', html: 'Los ejemplos ayudan a fijar el mecanismo. En salarios, la capacidad no observada eleva el salario y está correlacionada con EDUC. En un mercado, la cantidad y el precio se determinan simultáneamente: una regresión de cantidad sobre precio no estima una demanda. En fertilizantes, el consumo registrado tiene error y el productor decide cuánto usar según la calidad del suelo. En capacitación, quienes se anotan suelen ser los más motivados. En los cuatro casos, MCO mezcla el efecto de X con el de algo que quedó en u.' },
        {
          type: 'p',
          id: 'c09-s02-p04',
          html: 'Una rutina para reconocer la causa: escribí la ecuación teórica, listá qué variables relevantes no están y preguntá con cuáles de las incluidas se mueven. Si la variable omitida es la capacidad y EDUC la recoge, el problema es heterogeneidad u omisión. Si Y y X se determinan en la misma ecuación, simultaneidad. Si la variable está medida con error, medición. Si X es una elección del agente, autoselección. La etiqueta importa menos que el canal.'
        },
        { type: 'errorTable', rows: [
          { error: 'Heterogeneidad inobservable es lo mismo que heterocedasticidad.', why: 'La heterocedasticidad es varianza desigual del error; la heterogeneidad inobservable es una característica omitida correlacionada con X.', fix: 'Mirá si el problema es el nivel del error o su relación con X.' },
          { error: 'Omitir una variable siempre sesga.', why: 'Solo sesga si la variable omitida afecta a Y y está correlacionada con X después de controlar lo incluido.', fix: 'Verificá las dos condiciones, no una sola.' },
          { error: 'La simultaneidad solo existe en series de tiempo.', why: 'También aparece en cortes transversales: precio y cantidad, salario y participación, gasto y delito.', fix: 'Preguntá si X y Y se determinan en el mismo sistema.' },
          { error: 'Un error de medida siempre sesga.', why: 'En Y, si es clásico e incorrelacionado con X, no sesga las pendientes; en X, el caso de errores clásicos en las variables sí.', fix: 'Distinguí dónde está el error y cómo se correlaciona.' }
        ] },
        { type: 'callout', variant: 'ochre', label: 'Endogeneidad no es multicolinealidad', html: 'La multicolinealidad es correlación entre regresores. Infla los errores estándar y hace imprecisos los coeficientes, pero no los sesga. La endogeneidad es correlación entre un regresor y el error. Sesga el coeficiente y no se arregla agregando variables que no capturan la variable omitida ni cambiando de muestra. Son problemas distintos y piden respuestas distintas.' },
        { type: 'miniCheck', id: 'c09-check-02', question: '¿La multicolinealidad entre dos X es una forma de endogeneidad?', intro: 'Separá correlación entre regresores de correlación con el error.', answer: 'No. La multicolinealidad es correlación entre X<sub>1</sub> y X<sub>2</sub>: los coeficientes se estiman con poca precisión, pero siguen siendo insesgados si el error es exógeno. La endogeneidad es Cov(X,u) ≠ 0: el coeficiente está sesgado y es inconsistente. Puede haber multicolinealidad sin endogeneidad y endogeneidad sin multicolinealidad. Lo único que comparten es que ambas complican la lectura de los coeficientes.' }
      ]
    },
    {
      id: 'c09-s03',
      number: '03',
      title: 'Variables proxy: reemplazar lo que no se ve',
      blocks: [
        { type: 'p', id: 'c09-s03-p01', html: 'Volvé al modelo de salarios con capacidad. La ecuación teórica es log SAL = β<sub>0</sub> + β<sub>1</sub>EDUC + β<sub>2</sub>EXPER + β<sub>3</sub>CAPACIDAD + u, pero CAPACIDAD no se observa. Una <span class="concept" data-concept="proxy" tabindex="0" role="button">variable proxy</span> es una variable observable que se usa en su lugar: el IQ, una prueba de aptitud, los años de educación del padre. La proxy no es la capacidad; es una medida correlacionada con ella.' },
        { type: 'formula', main: 'log SAL<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>EDUC<sub>i</sub> + β<sub>2</sub>EXPER<sub>i</sub> + β<sub>3</sub>CAPACIDAD<sub>i</sub> + u<sub>i</sub><br>CAPACIDAD<sub>i</sub> = δ<sub>0</sub> + δ<sub>3</sub>IQ<sub>i</sub> + v<sub>3i</sub>', legend: [
          { key: 'CAPACIDAD', text: 'Variable no observable que se quiere controlar.' },
          { key: 'IQ', text: 'Proxy observada. Debe estar correlacionada con CAPACIDAD: δ<sub>3</sub> ≠ 0.' },
          { key: 'v<sub>3</sub>', text: 'Error de la proxy. No debe estar correlacionado con las X ni con la capacidad.' }
        ] },
        { type: 'p', id: 'c09-s03-p02', html: 'Para que la sustitución funcione hacen falta estas condiciones. Primero, la proxy tiene que estar correlacionada con la variable no observable. Segundo, el error del modelo no puede estar correlacionado con la proxy ni con las demás X. Tercero, una vez que controlás la proxy, la variable omitida no debe depender de las otras explicativas: E(CAPACIDAD | EDUC, EXPER, IQ) = E(CAPACIDAD | IQ). Si esta última condición falla, la proxy no limpia el canal que contamina a EDUC.' },
        { type: 'formula', main: 'Y = (β<sub>0</sub> + β<sub>3</sub>δ<sub>0</sub>) + β<sub>1</sub>X<sub>1</sub> + β<sub>2</sub>X<sub>2</sub> + (β<sub>3</sub>δ<sub>3</sub>)X<sub>3</sub> + (u + β<sub>3</sub>v<sub>3</sub>)', legend: [
          { key: 'α<sub>0</sub>', text: 'Nuevo intercepto: β<sub>0</sub> + β<sub>3</sub>δ<sub>0</sub>. No es el intercepto estructural.' },
          { key: 'α<sub>3</sub>', text: 'Coeficiente de la proxy: β<sub>3</sub>δ<sub>3</sub>. No es el efecto de la capacidad.' },
          { key: 'Error', text: 'u + β<sub>3</sub>v<sub>3</sub>. Tiene media cero y, bajo los supuestos, está incorrelacionado con las X.' }
        ] },
        { type: 'assumptions', rows: [
          { title: 'Proxy correlacionada', text: 'δ<sub>3</sub> ≠ 0. Si la proxy no se mueve con la variable omitida, no aporta nada y el sesgo sigue.' },
          { title: 'u incorrelacionado', text: 'u no se mueve con X<sub>1</sub>, X<sub>2</sub>, la variable omitida ni la proxy.' },
          { title: 'v<sub>3</sub> incorrelacionado', text: 'El error de la proxy no se mueve con las X ni con la variable no observable.' },
          { title: 'Media condicional', text: 'E(X<sub>3</sub>* | X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub>) = E(X<sub>3</sub>* | X<sub>3</sub>). La proxy resume la parte relevante de la variable omitida.' },
          { title: 'Si falla la media condicional', text: 'Si X<sub>3</sub>* también depende de X<sub>1</sub> o X<sub>2</sub>, los coeficientes de X<sub>1</sub> y X<sub>2</sub> se contaminan y todos los estimadores son inconsistentes.' }
        ] },
        { type: 'p', id: 'c09-s03-p03', html: 'La proxy imperfecta no elimina el problema por arte de magia. Si la capacidad también se correlaciona con EDUC después de controlar IQ, el coeficiente de EDUC sigue sesgado. Una proxy reduce el sesgo, no lo garantiza. Tampoco es un método de estimación distinto: se sustituye la variable y se estima por MCO. Y una proxy binaria, como IQ alto o bajo, es válida: pierde información y su coeficiente cambia de escala, pero el procedimiento sigue en pie. La variable dependiente rezagada es otro control posible cuando no hay proxy; con errores autocorrelacionados, en cambio, puede volverse endógena. El TP 12, Ej. 2, usa la tasa de delito de 2003 para controlar factores urbanos no observables: es un rezago de Y en un corte transversal, no un panel largo.' },
        {
          type: "interactive",
          kind: "proxy-bias",
          label: "Laboratorio visual",
          title: "Una proxy mejora, pero no hace magia",
          intro: "Aumentá el efecto de la habilidad y la calidad de la proxy. Compará el coeficiente verdadero, MCO sin proxy y MCO con proxy.",
          hint: "La proxy absorbe parte de la variable omitida; el sesgo baja si está correlacionada con ella. No la reemplaza: una proxy ruidosa deja sesgo y una proxy correlacionada con el error puede introducir otro."
        },
        { type: 'errorTable', rows: [
          { error: 'El coeficiente de IQ estima β<sub>3</sub>.', why: 'Estima β<sub>3</sub>δ<sub>3</sub>: el efecto de la capacidad multiplicado por la relación entre IQ y capacidad.', fix: 'No interpretes el coeficiente de la proxy como el efecto estructural de la variable omitida.' },
          { error: 'Cualquier variable correlacionada con la variable omitida sirve.', why: 'También tiene que ser incorrelacionada con u y no depender de las otras X.', fix: 'Verificá las dos condiciones, no solo la correlación.' },
          { error: 'La proxy vuelve insesgado todo el modelo.', why: 'β<sub>0</sub> y α<sub>3</sub> no son insesgados; β<sub>1</sub> y β<sub>2</sub> son consistentes bajo los supuestos.', fix: 'Separá qué coeficiente te interesa y cuál es estructural.' },
          { error: 'Una proxy binaria no se puede usar.', why: 'Sí se puede; pierde información y δ<sub>3</sub> cambia, pero el procedimiento es válido.', fix: 'No confundas proxy con variable continua.' }
        ] },
        { type: 'miniCheck', id: 'c09-check-03', question: '¿El coeficiente de IQ es el efecto causal de la capacidad sobre el salario?', intro: 'Mirá qué coeficiente acompaña a la proxy en la ecuación sustituida.', answer: 'No. El coeficiente de IQ estima β<sub>3</sub>δ<sub>3</sub>, no β<sub>3</sub>. δ<sub>3</sub> es la pendiente de la relación entre capacidad e IQ y no tiene por qué ser uno: depende de las escalas y de la calidad de la proxy. Lo que se vuelve consistente, bajo los supuestos, es el coeficiente de EDUC y el de EXPER, que son los de interés. El coeficiente de la proxy es un parámetro auxiliar y no se interpreta como el efecto estructural de la capacidad.' }
      ]
    },
    {
      id: 'c09-s04',
      number: '04',
      title: 'Errores de medida: la variable observada no es la variable',
      blocks: [
        { type: 'p', id: 'c09-s04-p01', html: 'El ingreso autodeclarado, el consumo de fertilizante, las horas de estudio, la tasa de delito: casi ninguna variable económica se mide sin error. El <span class="concept" data-concept="error-medida" tabindex="0" role="button">error de medida</span> aparece cuando la variable que entra a la regresión no es la variable del modelo. No es lo mismo que un residuo: el residuo es lo que no explica el modelo; el error de medida es una diferencia entre lo que se observa y lo que se quiere medir.' },
        { type: 'compare', left: { tag: 'Error en Y', title: 'Y = Y* + e<sub>0</sub>', text: 'Si e<sub>0</sub> es clásico e incorrelacionado con X, MCO sigue insesgado; solo aumenta la varianza. La inferencia t y F es válida bajo homocedasticidad.', eq: 'Y = β<sub>0</sub> + β<sub>1</sub>X + (u + e<sub>0</sub>)' }, right: { tag: 'Error en X', title: 'X = X* + e<sub>1</sub>', text: 'Bajo errores clásicos en las variables, Cov(X,e<sub>1</sub>) ≠ 0 y MCO se sesga hacia cero. Es el caso grave y el que motiva la VI.', eq: 'plim β̂<sub>1</sub> = β<sub>1</sub> · σ<sup>2</sup><sub>X*</sub>/(σ<sup>2</sup><sub>X*</sub> + σ<sup>2</sup><sub>e</sub>)' } },
        { type: 'formula', main: 'Y<sub>i</sub> = Y<sub>i</sub><sup>*</sup> + e<sub>0i</sub> &nbsp;→&nbsp; Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> + β<sub>2</sub>X<sub>2i</sub> + (u<sub>i</sub> + e<sub>0i</sub>)', legend: [
          { key: 'e<sub>0</sub>', text: 'Error de medición de Y. Se supone media cero y, en el caso clásico, incorrelacionado con las X y con u.' },
          { key: 'Varianza', text: 'Var(u + e<sub>0</sub>) = σ<sup>2</sup><sub>u</sub> + σ<sup>2</sup><sub>0</sub>. El error de medida agrega ruido.' },
          { key: 'Si E(e<sub>0</sub>) ≠ 0', text: 'El intercepto se sesga. Si e<sub>0</sub> se correlaciona con X, también se sesgan las pendientes.' }
        ] },
        { type: 'p', id: 'c09-s04-p02', html: 'Con error clásico en Y, MCO conserva el insesgamiento y la consistencia, pero pierde precisión: los errores estándar son más grandes porque la varianza del error compuesto es σ<sup>2</sup><sub>u</sub> + σ<sup>2</sup><sub>0</sub>. Las pruebas t y F siguen siendo válidas si se mantiene la homocedasticidad. La solución ideal es medir mejor; cuando no se puede, el problema es de eficiencia, no de sesgo. Distinto es el caso en que el error de medida se correlaciona con X: ahí MCO se sesga y la inferencia deja de ser confiable.' },
        { type: 'formula', main: 'Y = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub><sup>*</sup> + u = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + (u − β<sub>1</sub>e<sub>1</sub>)<br>plim β̂<sub>1</sub> = β<sub>1</sub> · σ<sup>2</sup><sub>X*</sub>/(σ<sup>2</sup><sub>X*</sub> + σ<sup>2</sup><sub>e</sub>)', legend: [
          { key: 'ECV', text: 'Errores clásicos en las variables: Cov(X*, e<sub>1</sub>) = 0. Entonces Cov(X<sub>1</sub>, e<sub>1</sub>) = σ<sup>2</sup><sub>e</sub>.' },
          { key: 'Atenuación', text: 'El factor que multiplica a β<sub>1</sub> está entre 0 y 1. El coeficiente se acerca a cero.' },
          { key: 'Fiabilidad', text: 'σ<sup>2</sup><sub>X*</sub>/σ<sup>2</sup><sub>X</sub>. Si es 0,8, se estima el 80% del coeficiente verdadero.' }
        ] },
        { type: 'p', id: 'c09-s04-p03', html: 'La atenuación tiene una dirección clara: si β<sub>1</sub> es positivo, MCO lo subestima; si es negativo, lo sobreestima en valor absoluto, es decir, lo acerca a cero. Cuanto mayor es la varianza del error respecto de la varianza verdadera, más fuerte es la atenuación. Si la varianza de la variable no observable es grande frente a la observada, la inconsistencia es pequeña. Con varias X medidas con error bajo ECV, el error en una sola variable contamina todos los estimadores: no se salva el resto del modelo. El caso opuesto, en el que el error se correlaciona con la variable verdadera pero no con la observada, deja a MCO consistente pero con mayor varianza.' },
        { type: 'errorTable', rows: [
          { error: 'Un error de medida en Y siempre sesga.', why: 'Si es clásico e incorrelacionado con X, no sesga las pendientes; infla la varianza y reduce la precisión.', fix: 'Distinguí error en Y de error en X antes de concluir.' },
          { error: 'El error de medida en X sobreestima el coeficiente.', why: 'Bajo ECV lo atenúa: se acerca a cero. Si β<sub>1</sub> es negativo, se vuelve menos negativo.', fix: 'Mirá el signo y el factor de fiabilidad.' },
          { error: 'La atenuación desaparece con más datos.', why: 'Es inconsistencia: el plim es distinto de β<sub>1</sub>. Más n reduce la varianza, no el sesgo.', fix: 'Corregí el diseño, mejorá la medición o usá VI.' },
          { error: 'Si hay varias X con error, solo se sesga la que está mal medida.', why: 'Bajo ECV, el error en una sola variable contamina todos los estimadores del modelo.', fix: 'Revisá el modelo completo y no solo el coeficiente que te interesa.' }
        ] },
        { type: 'miniCheck', id: 'c09-check-04', question: 'Si β<sub>1</sub> = 0,2 y la fiabilidad de X es 0,6, ¿qué coeficiente esperás estimar por MCO?', intro: 'Aplicá el factor de atenuación: varianza verdadera sobre varianza observada.', answer: 'Esperás 0,2 × 0,6 = 0,12. La fiabilidad indica que el 60% de la varianza observada es varianza verdadera; el 40% restante es error de medida. El coeficiente se atenúa en la misma proporción. Si β<sub>1</sub> fuera −0,2, el valor esperado sería −0,12: también se acerca a cero. La atenuación no cambia el signo, pero reduce la magnitud.' }
      ]
    },
    {
      id: 'c09-s05',
      number: '05',
      title: 'Variables instrumentales: buscar variación exógena',
      blocks: [
        { type: 'p', id: 'c09-s05-p01', html: 'Si no hay proxy, queda otra salida: buscar una variable que mueva a X pero que no esté contaminada por u. Esa es la lógica de una <span class="concept" data-concept="vi" tabindex="0" role="button">variable instrumental</span>. En el modelo de salarios, CERCANIA4 —haber crecido cerca de una universidad con carreras de cuatro años— se usa como instrumento de EDUC. La idea es que la cercanía cambia la probabilidad de estudiar, pero no debería afectar el salario por sí sola, salvo a través de la educación.' },
        { type: 'assumptions', rows: [
          { title: 'Relevancia', text: 'Cov(Z,X) ≠ 0. La primera etapa tiene que mostrar que Z predice X. Sin esto, Z no sirve como instrumento.' },
          { title: 'Exogeneidad', text: 'Cov(Z,u) = 0. Z no puede compartir los factores omitidos que afectan a Y ni entrar por un canal distinto de X.' },
          { title: 'Exclusión', text: 'Z solo afecta a Y a través de X. Es la versión sustantiva de la exogeneidad y no se testea con una correlación.' },
          { title: 'Una VI por endógena', text: 'Cada X endógena necesita al menos un instrumento. Con más instrumentos que endógenas, el modelo está sobreidentificado y se estima por MC2E.' }
        ] },
        { type: 'formula', main: 'β̂<sub>1</sub><sup>VI</sup> = Cov(Z,Y)/Cov(Z,X) = Σ(Z<sub>i</sub>−Z̄)(Y<sub>i</sub>−Ȳ) / Σ(Z<sub>i</sub>−Z̄)(X<sub>i</sub>−X̄)<br>β̂<sup>VI</sup> = (Z′X)<sup>−1</sup>Z′Y &nbsp;·&nbsp; β̂<sub>0</sub><sup>VI</sup> = Ȳ − β̂<sub>1</sub><sup>VI</sup>X̄', legend: [
          { key: 'Simple', text: 'El estimador usa la covarianza de Z con Y y con X. Si Z es binario, equivale a la razón de diferencias de medias.' },
          { key: 'Matricial', text: 'Z es la matriz de instrumentos, con las X exógenas y los instrumentos excluidos; X es la matriz de regresores.' },
          { key: 'Intercepto', text: 'Se recupera con las medias, igual que en MCO.' }
        ] },
        { type: 'p', id: 'c09-s05-p02', html: 'En una regresión múltiple, las variables exógenas se instrumentan a sí mismas: entran en Z con su propio valor. La matriz Z contiene todas las X exógenas más los instrumentos excluidos. Si hay una sola X endógena y un solo instrumento, el modelo está exactamente identificado. Si hay más instrumentos que endógenas, está sobreidentificado y conviene MC2E, que combina la información de todos. El estimador VI es consistente si se cumplen relevancia y exogeneidad, pero nunca es insesgado cuando X y u están correlacionados: en muestras chicas puede tener un sesgo considerable. Por eso se prefiere con muestras grandes.' },
        { type: 'formula', main: 'Var(β̂<sup>VI</sup>) = σ̂<sup>2</sup>/(SCT<sub>x</sub> · R<sup>2</sup><sub>x,z</sub>) = Var(β̂<sup>MCO</sup>)/R<sup>2</sup><sub>x,z</sub>', legend: [
          { key: 'R<sup>2</sup><sub>x,z</sub>', text: 'Proporción de la variación de X explicada por Z en la primera etapa. Es siempre menor que 1.' },
          { key: 'Eficiencia', text: 'Al dividir por un número menor que 1, la varianza VI es mayor. VI es consistente pero menos eficiente que MCO.' },
          { key: 'Supuesto', text: 'Homocedasticidad condicionada a Z: E(u<sup>2</sup>|Z) = σ<sup>2</sup>.' }
        ] },
        { type: 'errorTable', rows: [
          { error: 'VI siempre es mejor que MCO.', why: 'Si X es exógena, MCO es consistente y más eficiente; VI pierde precisión sin ganar nada.', fix: 'Usá VI cuando hay endogeneidad y un instrumento creíble.' },
          { error: 'El estimador VI es insesgado.', why: 'Es consistente, pero en muestras finitas tiene sesgo; puede ser grande si el instrumento es débil.', fix: 'Hablá de consistencia, no de insesgamiento.' },
          { error: 'El R² de la VI se compara con el de MCO.', why: 'El R² de la VI no tiene una interpretación natural ni sirve para contrastar restricciones múltiples.', fix: 'Compará coeficientes, errores e identificación, no R².' },
          { error: 'Un instrumento válido se elige con una correlación alta y listo.', why: 'La exogeneidad es un argumento económico, no una correlación muestral. La relevancia sola no alcanza.', fix: 'Justificá el canal de exclusión y discutí los canales alternativos.' }
        ] },
        { type: 'callout', variant: 'ochre', label: 'La VI no inventa variación', html: 'Si Z mueve a X solo un poco, la VI usa poca variación y la precisión se derrumba. La calidad del instrumento no se mide solo con la correlación: también se argumenta con teoría, instituciones y evidencia sobre los canales. Un instrumento relevante pero relacionado con el error puede ser peor que MCO.' },
        { type: 'miniCheck', id: 'c09-check-05', question: '¿Por qué la VI puede ser consistente y aun así tener un error estándar enorme?', intro: 'Mirá el denominador de la varianza del estimador.', answer: 'Porque la varianza del estimador VI se divide por R<sup>2</sup><sub>x,z</sub>, la proporción de variación de X que explica el instrumento. Si Z se mueve poco con X, ese R<sup>2</sup> es cercano a cero y la varianza se dispara. La consistencia es una propiedad asintótica: el estimador converge a β, pero a un ritmo muy lento y con mucha dispersión. Por eso un instrumento débil puede ser consistente en teoría y poco informativo en la práctica.' }
      ]
    },
    {
      id: 'c09-s06',
      number: '06',
      title: 'Instrumentos débiles y sesgo asintótico',
      blocks: [
        { type: 'p', id: 'c09-s06-p01', html: 'Un <span class="concept" data-concept="instrumento-debil" tabindex="0" role="button">instrumento débil</span> es el que se mueve poco con X. No es un detalle de precisión: la varianza explota, el sesgo de muestra finita se acerca al de MCO y cualquier falla pequeña de exogeneidad se amplifica. El <span class="concept" data-concept="sesgo-asintotico" tabindex="0" role="button">sesgo asintótico</span> permite comparar los dos estimadores sin depender del tamaño de la muestra.' },
        { type: 'formula', main: 'plim β̂<sub>1</sub><sup>VI</sup> = β<sub>1</sub> + [Corr(Z,u)/Corr(Z,X)] · σ<sub>u</sub>/σ<sub>x</sub><br>plim β̂<sub>1</sub><sup>MCO</sup> = β<sub>1</sub> + Corr(X,u) · σ<sub>u</sub>/σ<sub>x</sub>', legend: [
          { key: 'Cociente', text: 'Si Corr(Z,u) = 0, el plim VI es β<sub>1</sub> aunque el instrumento sea débil. La consistencia se mantiene.' },
          { key: 'Denominador', text: 'Si Corr(Z,X) es pequeño, cualquier Corr(Z,u) distinta de cero se amplifica. Ahí está el peligro.' },
          { key: 'Comparación', text: 'Los signos de los sesgos pueden diferir. No alcanza con mirar cuál estimador es más grande.' }
        ] },
        { type: 'p', id: 'c09-s06-p02', html: 'La lectura es incómoda. Con exogeneidad exacta, un instrumento débil sigue siendo consistente, pero la aproximación asintótica es mala: en muestras finitas el estimador se sesga hacia MCO y su intervalo es enorme. Con exogeneidad imperfecta, el cociente Corr(Z,u)/Corr(Z,X) puede volverse gigante. Un instrumento que explica el 1% de la variación de X y está correlacionado 0,02 con u produce un sesgo asintótico del doble del de MCO si Corr(X,u) = 0,10. La relevancia no es un adorno: es lo que impide que el error se amplifique.' },
        { type: 'compare', left: { tag: 'VI preferible', title: 'Menor sesgo asintótico', text: 'Si el cociente entre la correlación del instrumento con el error y su correlación con X es menor que la correlación de X con u, VI tiene menos sesgo asintótico.', eq: '|Corr(Z,u)|/|Corr(Z,X)| &lt; |Corr(X,u)|' }, right: { tag: 'MCO preferible', title: 'Muestra chica o instrumento débil', text: 'Si el instrumento explica poco o no hay argumento de exclusión, MCO puede tener menos sesgo asintótico y mucha más precisión.', eq: 'Corr(Z,X) ≈ 0 · F primera etapa bajo' } },
        { type: 'formula', main: 'Var(β̂<sup>VI</sup>) ≈ σ<sup>2</sup>/(SCT<sub>x</sub> · R<sup>2</sup><sub>x,z</sub>) &nbsp;→&nbsp; R<sup>2</sup><sub>x,z</sub> → 0 ⇒ Var → ∞', legend: [
          { key: 'Primera etapa', text: 'Se contrasta H<sub>0</sub>: π<sub>1</sub> = 0 en X = π<sub>0</sub> + π<sub>1</sub>Z + v. El F de la primera etapa mide la fuerza.' },
          { key: 'Regla de bolsillo', text: 'F > 10 se usa como umbral para descartar un instrumento débil. Es una convención, no una prueba de validez.' },
          { key: 'Inferencia', text: 'Con instrumentos débiles conviene usar contrastes robustos a instrumentos débiles, como Anderson-Rubin. Se ven en la clase 10.' }
        ] },
        { type: 'p', id: 'c09-s06-p03', html: 'El diagnóstico mínimo es la primera etapa: coeficiente del instrumento, t, F y R<sup>2</sup>. En el laboratorio de esta clase, CERCANIA4 tiene un coeficiente de 0,3199 años de educación, t = 3,641 y un F de 13,256. Supera el umbral de 10, así que no es un instrumento débil por la regla habitual. Pero 13 no es un número enorme: el intervalo de confianza de la VI para EDUC va de 0,0238 a 0,2392, mucho más ancho que el de MCO. La relevancia alcanza para estimar, no para prometer precisión.' },
        { type: 'errorTable', rows: [
          { error: 'Un instrumento débil solo afecta el error estándar.', why: 'También sesga en muestra finita hacia MCO y amplifica cualquier falla de exogeneidad.', fix: 'Mirá F, R<sup>2</sup><sub>x,z</sub>, tamaño de muestra y sensibilidad.' },
          { error: 'F > 10 garantiza un instrumento fuerte.', why: 'Es una regla de bolsillo. Con muchos instrumentos, el F de primera etapa puede ser alto y el sesgo de 2SLS seguir siendo grande.', fix: 'Reportá el F de la primera etapa y no lo trates como certificado.' },
          { error: 'Si el instrumento es débil, se arregla agregando controles.', why: 'Los controles no aumentan la variación exógena de Z; pueden reducirla.', fix: 'Buscá otro instrumento o cambiá de estrategia.' },
          { error: 'El sesgo asintótico de VI siempre es menor que el de MCO.', why: 'Depende del cociente Corr(Z,u)/Corr(Z,X). Si Z es débil y algo endógeno, puede ser mayor.', fix: 'Compará los dos plim, no los t.' }
        ] },
        { type: 'miniCheck', id: 'c09-check-06', question: 'Corr(Z,X) = 0,05, Corr(Z,u) = 0,01 y Corr(X,u) = 0,10. ¿Qué estimador tiene menor sesgo asintótico?', intro: 'Calculá el cociente del sesgo de VI y comparalo con el de MCO.', answer: 'El cociente de VI es 0,01/0,05 = 0,20, mayor que 0,10. Entonces el sesgo asintótico de VI es el doble del de MCO en unidades de σ<sub>u</sub>/σ<sub>x</sub>. Aunque el instrumento parezca apenas contaminado, su debilidad amplifica el error. MCO tendría menos sesgo asintótico y mucha más precisión. Solo si Corr(Z,u) fuera exactamente cero la VI sería consistente; con un instrumento tan débil, esa garantía teórica no alcanza para preferirla.' }
      ]
    },
    {
      id: 'c09-s07',
      number: '07',
      title: 'Mapa de decisión: proxy, VI o MCO',
      blocks: [
        { type: 'p', id: 'c09-s07-p01', html: 'El mapa no empieza por el método, empieza por el problema. ¿Qué variable es endógena y qué historia tiene el error? Si no podés nombrar la variable omitida y decir con qué se mueve, no hay método que resuelva la identificación. La elección entre proxy, VI y MCO es una consecuencia de esa respuesta, no una preferencia de programa.' },
        { type: 'map', steps: [
          { n: '1', title: 'Diagnóstico', text: '¿Cuál es la X endógena y cuál es la historia del error? Sin una historia, no hay método.' },
          { n: '2', title: 'Proxy disponible', text: '¿Hay una variable observable correlacionada con la variable omitida y que cumpla la media condicional?' },
          { n: '3', title: 'Proxy válida', text: 'Si la proxy también se correlaciona con las otras X, no rescata β<sub>1</sub>. Buscá otra o pasá a VI.' },
          { n: '4', title: 'Instrumento', text: '¿Hay una Z que mueva X y solo afecte a Y por X? Relevancia y exogeneidad, en ese orden.' },
          { n: '5', title: 'Fuerza', text: 'Primera etapa F, R<sup>2</sup><sub>x,z</sub> y tamaño de muestra. Si es débil, el precio es precisión y sesgo.' },
          { n: '6', title: 'Reporte', text: 'Coeficiente, error estándar, intervalo, diagnóstico de primera etapa y límites causales. Compará MCO, proxy y VI.' }
        ] },
        {
          type: 'p',
          id: 'c09-s07-p02',
          html: 'Tres escenarios típicos de examen. Primero: hay una proxy correlacionada con la variable omitida y no con las otras X; se estima por MCO con la proxy y se aclara que su coeficiente no es estructural. Segundo: no hay proxy, pero hay un instrumento relevante y defendible; se estima por VI y se reporta la primera etapa. Tercero: no hay ni proxy ni instrumento creíble; MCO con una advertencia explícita es más honesto que una VI decorativa.'
        },
        { type: 'compare', left: { tag: 'Proxy', title: 'Controlar lo inobservable', text: 'Se sustituye la variable omitida por una observable y se estima por MCO. β<sub>1</sub> y β<sub>2</sub> pueden ser consistentes; el coeficiente de la proxy no es estructural.', eq: 'Y = α<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + β<sub>2</sub>X<sub>2</sub> + α<sub>3</sub>X<sub>3</sub> + e' }, right: { tag: 'VI', title: 'Reemplazar la variación contaminada', text: 'Se usa Z para aislar la parte de X incorrelacionada con u. Consistente si Z es relevante y exógeno; menos eficiente que MCO.', eq: 'β̂<sup>VI</sup> = Cov(Z,Y)/Cov(Z,X)' } },
        { type: 'p', id: 'c09-s07-p03', html: '¿Cuándo se queda MCO? Cuando hay buenas razones para creer que Cov(X,u) = 0. En ese caso MCO es insesgado, consistente y más eficiente que VI. También se queda cuando la proxy es válida: se incorpora y se estima por MCO. Si el error de medida está en X y hay un instrumento creíble, la VI es la opción. Si el instrumento es débil o la exclusión no se sostiene, MCO puede ser el menor de los males, pero hay que reportar el sesgo probable y no vender causalidad.' },
        { type: 'callout', variant: 'teal', label: 'Dos preguntas antes de elegir', html: 'Primero: ¿qué querés estimar, el efecto de X o predecir Y? Para predecir, la endogeneidad no es el único criterio y la precisión importa. Segundo: ¿podés defender la exogeneidad de Z o la media condicional de la proxy? Si la respuesta es no, el resultado es una asociación condicional, no un efecto causal. El método no crea identificación; solo la usa.' },
        { type: 'sourceStrip', chips: [
          { label: 'Clase 9', text: 'diap. 3–30' },
          { label: 'Wooldridge', text: 'Cap. 9 y 15' },
          { label: 'TP 12', text: 'act. 1–2; ej. 1–8' },
          { label: 'Parcial', text: '2P 2024' }
        ] },
        { type: 'miniCheck', id: 'c09-check-07', question: 'Tenés una proxy de capacidad que también está correlacionada con EDUC. ¿La usás para estimar el retorno de EDUC?', intro: 'Revisá la condición de media condicional, no solo la correlación con la variable omitida.', answer: 'No, al menos no esperando consistencia. Si la capacidad depende de EDUC además de la proxy, E(CAPACIDAD | EDUC, EXPER, IQ) ≠ E(CAPACIDAD | IQ). Al sustituir, el término de capacidad que queda en el error sigue correlacionado con EDUC y el coeficiente de EDUC se contamina. La proxy solo funciona si resume la parte de la variable omitida que se relaciona con las X. Si no, hay que buscar otra proxy o un instrumento para EDUC.' }
      ]
    },
    {
      id: 'c09-s08',
      number: '08',
      title: 'Profundización: lo que suele quedar en el aire',
      blocks: [
        { type: 'p', id: 'c09-s08-p01', html: 'Quedan tres piezas que la clase usa pero no desarrolla: cómo funciona MC2E por dentro, a quién le atribuye el efecto una VI y qué prueban realmente Wu-Hausman y Sargan. Las tres aparecen en el parcial y vuelven en la clase 10. Sin ellas, la VI parece una receta que se aplica o no se aplica, en lugar de una estrategia con un alcance preciso.' },
        { type: 'cards', items: [
          { sym: 'MC2E', title: 'Dos etapas, un estimador', text: 'La primera etapa predice X con Z. La segunda usa esa predicción en lugar de X. Con un solo instrumento, el resultado es idéntico al de la fórmula de VI.' },
          { sym: 'LATE', title: 'Un efecto para los que cambian', text: 'La VI identifica el efecto en quienes modifican X por el instrumento, no en toda la población. Ese grupo puede tener retornos distintos del promedio.' },
          { sym: 'Tests', title: 'Lo que no prueban', text: 'Wu-Hausman compara MCO y VI; Sargan revisa instrumentos extra. Ninguno demuestra que la exclusión sea cierta.' }
        ] },
        { type: 'formula', main: 'Primera etapa: X<sub>i</sub> = π<sub>0</sub> + π<sub>1</sub>Z<sub>i</sub> + v<sub>i</sub> &nbsp;→&nbsp; X̂<sub>i</sub> = π̂<sub>0</sub> + π̂<sub>1</sub>Z<sub>i</sub><br>Segunda etapa: Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X̂<sub>i</sub> + e<sub>i</sub>', legend: [
          { key: 'X̂', text: 'Parte de X explicada por Z. Reemplaza a X en la segunda etapa; no sirve para predecir Y fuera de muestra.' },
          { key: 'Error estándar', text: 'El de la segunda etapa no sirve tal cual: hay que corregirlo porque X̂ es un estimado. R lo hace con ivreg.' },
          { key: 'Instrumentos', text: 'Con más instrumentos que endógenas, MC2E combina todos y el modelo queda sobreidentificado.' }
        ] },
        { type: 'p', id: 'c09-s08-p02', html: 'MC2E no es una suma de dos regresiones cualquiera. La primera etapa limpia de X la parte que se mueve con Z; la segunda usa esa parte limpia. Si hay un solo instrumento, el estimador coincide exactamente con Cov(Z,Y)/Cov(Z,X). Si hay varios, MC2E arma un promedio ponderado de las estimaciones que daría cada instrumento, con más peso para el que mejor predice X. Eso explica dos cosas. Primero, agregar instrumentos cambia la estimación aunque todos sean válidos. Segundo, un instrumento flojo recibe poco peso, pero también aporta ruido y sesgo de muestra finita. La regla práctica es reportar la primera etapa del modelo completo y no evaluar la fuerza con una regresión bivariada.' },
        { type: 'p', id: 'c09-s08-p03', html: 'Hay una pregunta que la clase deja abierta: ¿el efecto que estima la VI es el mismo para todos? No. Con efectos heterogéneos, la VI identifica el efecto promedio de quienes cambian de X cuando cambia Z, y solo si el instrumento mueve a X en una dirección para todos. Ese grupo se llama de cumplidores. Quienes estudiarían igual sin vivir cerca de la universidad, o quienes no estudiarían aunque vivieran cerca, no aportan a la identificación. Por eso el 0,1315 de Card no tiene que coincidir con el retorno promedio de la población, y tampoco tiene que ser el 0,0747 corregido. Es otro parámetro. Si el instrumento afecta a personas con retornos altos, el coeficiente de VI puede superar al de MCO sin que ninguno esté mal calculado.' },
        { type: 'callout', variant: 'ochre', label: 'Qué prueban Wu-Hausman y Sargan', html: 'Wu-Hausman contrasta si MCO y VI difieren lo suficiente como para sospechar endogeneidad. No rechazar no prueba que X sea exógena: puede faltar potencia, sobre todo con un instrumento moderado como CERCANIA4. Sargan solo se calcula cuando hay más instrumentos que endógenas y contrasta si los instrumentos extra se comportan como exógenos. Necesita que al menos uno sea válido, así que no certifica el modelo. Los dos son filtros, no pruebas de causalidad.' },
        { type: 'miniCheck', id: 'c09-check-09', question: 'Un compañero dice: “La VI dio 0,13 y MCO 0,07, así que el efecto verdadero es el doble”. ¿Qué le respondés?', intro: 'Separá el parámetro que estima cada método del valor puntual de una muestra.', answer: 'Que está mezclando tres cosas. Primero, los dos coeficientes estiman parámetros distintos: MCO apunta al efecto promedio bajo exogeneidad; la VI, al efecto de quienes cambian de educación por la cercanía a la universidad. Segundo, la VI tiene un intervalo muy ancho: [0,0238; 0,2392] cubre valores compatibles con un retorno bajo y con uno alto. Tercero, la diferencia puede venir de sesgo de MCO, de atenuación por error de medida, de retornos heterogéneos o de una violación de la exclusión. Sin argumentos sobre el canal y sin precisión, no podés afirmar que el verdadero efecto sea 0,13.' }
      ]
    }
  ],
  concepts: {
    endogeneidad: {
      title: 'Endogeneidad',
      sub: 'X se mueve con el error: MCO deja de ser consistente.',
      simple: `<p>Pensá en un entrenador que quiere saber si el entrenamiento mejora el rendimiento, pero los que más entrenan son también los más motivados. La motivación no la ves y queda en el error. Si además se mueve con el entrenamiento, el coeficiente mezcla las dos cosas y no podés atribuirle todo al entrenamiento.</p><p>Juntar más jugadores no arregla eso: el problema está en qué se está comparando.</p>`,
      viz: "ovb",
      vizIntro: "Movés el efecto de la variable omitida y su relación con X. Mirá cómo se separa la pendiente de la regresión que omite X2 de la que la incluye.",
      vizHint: "El sesgo es el producto entre el efecto de la omitida sobre Y y su relación con X. Si cualquiera de los dos es cero, omitir la variable no genera sesgo.",
      esencia: `
        <div class="definition">Hay endogeneidad cuando Cov(X,u) ≠ 0. El regresor está correlacionado con factores no observados que afectan a Y y que quedaron en el error. MCO sigue siendo calculable, pero el estimador es, en general, sesgado e inconsistente.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El sesgo no se diluye con n: el plim es β + Corr(X,u)·σ<sub>u</sub>/σ<sub>x</sub>.</li>
          <li>Las causas típicas son heterogeneidad inobservable, omisión, simultaneidad, errores de medida y autoselección.</li>
          <li>No es multicolinealidad: la correlación relevante es con el error, no entre regresores.</li>
          <li>También puede aparecer con una variable dependiente rezagada y errores autocorrelacionados: el rezago de Y queda correlacionado con el error.</li>
        </ul>
        <div class="formula small">plim β̂<sub>1</sub> = β<sub>1</sub> + Corr(X,u) · σ<sub>u</sub>/σ<sub>x</sub><span>Si Corr(X,u) ≠ 0, el límite no es β<sub>1</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: Cov(X,u) ≠ 0</span><span class="badge optional">Según el caso: omitida, simultaneidad, medición o selección</span></div>
      `,
      ejemplo: `
        <p>Si las personas con más educación también tienen más capacidad no observada, EDUC recoge parte del efecto de la capacidad. El coeficiente de MCO no es el retorno ceteris paribus: mezcla educación y habilidad.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Preguntá qué quedó en u y con qué se mueve. Si la respuesta es X, hay endogeneidad, por más alto que sea el R².</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que un R² alto la descarta.</strong> El ajuste no dice nada sobre la correlación entre X y u.</li>
          <li><strong>Creer que con n grande desaparece.</strong> La inconsistencia es un límite de probabilidad distinto de β.</li>
          <li><strong>Confundirla con multicolinealidad.</strong> La multicolinealidad infla la varianza; la endogeneidad sesga el coeficiente.</li>
          <li><strong>Creer que más controles la resuelven.</strong> Si los controles no capturan la variable omitida ni su canal, el sesgo sigue.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el sesgo no se reduce al aumentar la muestra.</p></div>
      `,
      conexiones: `<p>La endogeneidad es el problema que justifican las proxies, la VI y el estudio de los errores de medida. Cada solución ataca una causa distinta y exige supuestos distintos.</p>
        <div><button class="concept-chip" data-concept="proxy">Proxy →</button><button class="concept-chip" data-concept="error-medida">Error de medida →</button><button class="concept-chip" data-concept="vi">Variables instrumentales →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 3–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 9, §9.2; Cap. 15, §15.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024, pregunta 5: variable contenida en el error y VI.</p></div>
      `
    },
    proxy: {
      title: 'Variable proxy',
      sub: 'Una medida observable de lo que no se puede medir.',
      simple: `<p>Si querés controlar la capacidad pero no la podés medir, buscás algo que la represente, como un test de aptitud. No es la capacidad: es una foto borrosa de ella. Alcanza si esa foto está lo bastante asociada con la capacidad y no trae otras diferencias por la ventana.</p><p>Pensá en usar el promedio de notas del secundario como señal de esfuerzo: sirve, aunque no sea el esfuerzo.</p>`,
      viz: "proxy-bias",
      vizIntro: "Movés cuánto pesa la habilidad en el salario y cuán buena es la proxy. Mirá cómo se acercan o se alejan las tres barras.",
      vizHint: "Una proxy mejor reduce el sesgo, pero no lo elimina si queda habilidad en el error. Con una proxy perfecta, el coeficiente coincide con el verdadero.",
      esencia: `
        <div class="definition">Una proxy es una variable observable que se usa en lugar de una variable no observable, correlacionada con ella. Se sustituye en el modelo y se estima por MCO. No es un método de estimación distinto.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La proxy debe estar correlacionada con la variable omitida: δ<sub>3</sub> ≠ 0.</li>
          <li>u y el error de la proxy no deben estar correlacionados con las X.</li>
          <li>Debe cumplirse E(X*|X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub>) = E(X*|X<sub>3</sub>). Si no, todos los estimadores se contaminan.</li>
          <li>Una proxy medida con error también se atenúa: la sustitución no elimina el problema de medición.</li>
        </ul>
        <div class="formula small">Y = α<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + β<sub>2</sub>X<sub>2</sub> + α<sub>3</sub>X<sub>3</sub> + (u + β<sub>3</sub>v<sub>3</sub>)<span>α<sub>3</sub> = β<sub>3</sub>δ<sub>3</sub>: no es el efecto estructural</span></div>
        <div class="badge-row"><span class="badge always">Siempre: proxy correlacionada con la variable omitida</span><span class="badge optional">Según el caso: continua o binaria</span></div>
      `,
      ejemplo: `
        <p>IQ como proxy de capacidad en una ecuación de salarios. El coeficiente de EDUC puede volverse consistente, pero el coeficiente de IQ estima β<sub>3</sub>δ<sub>3</sub>, no el efecto de la capacidad. Una proxy binaria de IQ alto también sirve, aunque capta menos variación.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá qué coeficientes son estructurales y cuáles son auxiliares. No interpretes el coeficiente de la proxy como si fuera la variable omitida.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que la proxy elimina todo el sesgo.</strong> Solo funciona si cumple la media condicional y las demás X no contaminan.</li>
          <li><strong>Leer α<sub>3</sub> como β<sub>3</sub>.</strong> Es β<sub>3</sub>δ<sub>3</sub>; la escala depende de la relación entre proxy y omitida.</li>
          <li><strong>Descartar una proxy binaria.</strong> Es válida; pierde precisión, no consistencia.</li>
          <li><strong>Usar una proxy que es consecuencia de Y.</strong> Eso crea simultaneidad y puede empeorar el sesgo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué coeficientes son consistentes y cuál no es estructural.</p></div>
      `,
      conexiones: `<p>La proxy es una solución por sustitución para la endogeneidad por variable omitida. Si no alcanza, la VI reemplaza la variación contaminada. El error de medida en X es otro caso donde la proxy puede ayudar si es una medida alternativa.</p>
        <div><button class="concept-chip" data-concept="endogeneidad">Endogeneidad →</button><button class="concept-chip" data-concept="error-medida">Error de medida →</button><button class="concept-chip" data-concept="vi">Variables instrumentales →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 6–11.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 9, §9.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Act. 1–2 y Ej. 1.</p></div>
      `
    },
    'error-medida': {
      title: 'Error de medida',
      sub: 'La variable observada no es la variable del modelo.',
      simple: `<p>Imaginá que anotás cuánto gastás por semana de memoria. A veces te olvidás de una compra y a veces la exagerás. Ese ruido es el error de medida.</p><p>Si el ruido está en lo que querés explicar, el ajuste pierde precisión pero no se tuerce. Si está en la variable que explica, el coeficiente se acerca a cero y te hace creer que el efecto es más chico de lo que es.</p>`,
      esencia: `
        <div class="definition">Hay error de medida cuando la variable registrada difiere de la variable relevante. En Y, un error clásico agrega ruido pero no sesga las pendientes. En X, bajo errores clásicos en las variables, MCO se atenúa hacia cero.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Error en Y: MCO insesgado si e<sub>0</sub> es incorrelacionado con X; varianza mayor; t y F válidos.</li>
          <li>Error en X: Cov(X,e<sub>1</sub>) ≠ 0; el coeficiente se acerca a cero.</li>
          <li>Con varias X medidas con error, el problema contamina todos los estimadores.</li>
          <li>La dirección del sesgo en X depende de la covarianza entre el error y la variable observada; el caso ECV es el más estudiado.</li>
        </ul>
        <div class="formula small">plim β̂<sub>1</sub> = β<sub>1</sub> · σ<sup>2</sup><sub>X*</sub>/(σ<sup>2</sup><sub>X*</sub> + σ<sup>2</sup><sub>e</sub>)<span>Factor de atenuación entre 0 y 1</span></div>
        <div class="badge-row"><span class="badge always">Siempre: distinguir Y de X</span><span class="badge optional">Según el caso: ECV o error correlacionado</span></div>
      `,
      ejemplo: `
        <p>Si el ingreso se autodeclara con ruido, la pendiente del gasto sobre ingreso se atenúa. Si el error está en el gasto y es independiente del ingreso, las pendientes no se sesgan, pero los errores estándar crecen. El fertilizante comprado como instrumento del fertilizante usado es el ejemplo del TP 12, Ej. 5.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Preguntá dónde está el error y si es clásico. La respuesta cambia el diagnóstico y la solución: mejorar la medición, usar una proxy o buscar un instrumento.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que todo error de medida sesga.</strong> En Y, el error clásico no sesga las pendientes; solo reduce la precisión.</li>
          <li><strong>Decir que la atenuación siempre subestima.</strong> Acerca el coeficiente a cero; si es negativo, lo vuelve menos negativo.</li>
          <li><strong>Creer que más datos corrigen la atenuación.</strong> Es un problema de inconsistencia, no de tamaño muestral.</li>
          <li><strong>Confundir error de medida con error de especificación.</strong> Son fuentes distintas y piden diagnósticos distintos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés predecir si el coeficiente se sesga hacia arriba, hacia abajo o solo pierde precisión.</p></div>
      `,
      conexiones: `<p>El error de medida en X es una causa de endogeneidad y una justificación clásica de la VI. Una medida alternativa de la variable mal medida puede funcionar como instrumento. La proxy es otra respuesta cuando lo que falta es una variable, no una medición.</p>
        <div><button class="concept-chip" data-concept="endogeneidad">Endogeneidad →</button><button class="concept-chip" data-concept="proxy">Proxy →</button><button class="concept-chip" data-concept="vi">Variables instrumentales →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 12–19.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 9, §9.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 5.</p></div>
      `
    },
    vi: {
      title: 'Variables instrumentales',
      sub: 'Una fuente de variación de X que no está contaminada por u.',
      simple: `<p>Buscás una variable que mueva la educación sin mover el salario por otro camino. Es como usar la distancia al trabajo para estudiar el efecto de ir en auto: la distancia cambia el modo de viaje, pero no debería cambiar el sueldo por sí sola.</p><p>Si esa variable mueve poco a X, la estimación se vuelve muy imprecisa. Y si mueve a Y por otra puerta, la corrección se rompe.</p>`,
      viz: "weak-iv",
      vizIntro: "Cambiá la fuerza del segundo instrumento y el grado de endogeneidad. Compará MCO con las dos versiones de MC2E.",
      vizHint: "Más fuerza en la primera etapa acerca la VI al parámetro y reduce la dispersión. Con instrumentos flojos, la VI puede quedar tan lejos como MCO.",
      esencia: `
        <div class="definition">Una variable instrumental Z es una variable observable que se usa para estimar el efecto de una X endógena. Debe cumplir relevancia —Cov(Z,X) ≠ 0— y exogeneidad —Cov(Z,u) = 0—. El estimador VI es consistente bajo esos supuestos, pero no insesgado y menos eficiente que MCO.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La VI no reemplaza a X en el modelo teórico: usa Z para aislar la parte de X que no se mueve con u.</li>
          <li>En regresión múltiple, las X exógenas se instrumentan a sí mismas; cada endógena necesita un instrumento.</li>
          <li>La varianza se infla por 1/R<sup>2</sup><sub>x,z</sub>. La precisión depende de la fuerza de la primera etapa.</li>
          <li>La VI no exige que Z sea causalmente importante: exige que sea relevante y que pueda excluirse del error.</li>
        </ul>
        <div class="formula small">β̂<sup>VI</sup> = (Z′X)<sup>−1</sup>Z′Y<span>β̂<sub>1</sub><sup>VI</sup> = Cov(Z,Y)/Cov(Z,X) en el caso simple</span></div>
        <div class="badge-row"><span class="badge always">Siempre: relevancia y exogeneidad</span><span class="badge optional">Según el caso: un instrumento o varios</span></div>
      `,
      ejemplo: `
        <p>Card usa CERCANIA4, haber crecido cerca de una universidad de cuatro años, como instrumento de EDUC. La cercanía predice años de educación y se argumenta que no afecta el salario por sí sola. En el laboratorio, MCO da 0,0747 y VI da 0,1315: la VI es menos precisa y su intervalo es mucho más ancho.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Un instrumento se defiende con teoría y conocimiento institucional, no con una correlación alta. La relevancia se testea; la exogeneidad se argumenta.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que VI siempre mejora a MCO.</strong> Si X es exógena, MCO es más eficiente y no hay nada que corregir.</li>
          <li><strong>Decir que VI es insesgado.</strong> Es consistente; en muestras finitas puede tener sesgo, sobre todo con instrumentos débiles.</li>
          <li><strong>Comparar R² de MCO y VI.</strong> El R² de la VI no tiene interpretación natural ni sirve para contrastes de restricciones.</li>
          <li><strong>Elegir el instrumento después de ver qué coeficiente conviene.</strong> Eso es minería de datos y rompe la inferencia.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué un estimador consistente puede tener un intervalo enorme.</p></div>
      `,
      conexiones: `<p>La VI es la alternativa cuando no hay proxy y la endogeneidad viene de una variable omitida o de un error de medida en X. Su credibilidad depende de la relevancia y de la exogeneidad, y su precisión, de la fuerza de la primera etapa.</p>
        <div><button class="concept-chip" data-concept="relevancia">Relevancia →</button><button class="concept-chip" data-concept="exogeneidad-instrumento">Exogeneidad del instrumento →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 20–27.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.1–15.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 3, 4 y 8.</p></div>
      `
    },
    relevancia: {
      title: 'Relevancia',
      sub: 'El instrumento tiene que mover a X.',
      simple: `<p>Un instrumento es relevante si de verdad mueve a la variable que querés explicar. Si usás la cercanía a una universidad como instrumento de educación, primero tenés que mostrar que quienes crecieron cerca estudian más.</p><p>Si no la mueve, el instrumento no aporta información: es como una llave que no entra en la cerradura. Se comprueba con la primera etapa, no con una intuición.</p>`,
      esencia: `
        <div class="definition">Un instrumento es relevante si Cov(Z,X) ≠ 0. En la práctica se contrasta con la primera etapa X = π<sub>0</sub> + π<sub>1</sub>Z + v, testeando H<sub>0</sub>: π<sub>1</sub> = 0. El F de esa etapa mide la fuerza del instrumento.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La relevancia se puede testear; la exogeneidad, no, al menos no con un solo instrumento.</li>
          <li>Un F bajo indica instrumento débil: varianza grande y sesgo de muestra finita hacia MCO.</li>
          <li>F > 10 es una regla de bolsillo, no una garantía de validez.</li>
          <li>La relevancia se juzga en la primera etapa del modelo completo, no en una regresión bivariada de X sobre Z.</li>
        </ul>
        <div class="formula small">X<sub>i</sub> = π<sub>0</sub> + π<sub>1</sub>Z<sub>i</sub> + v<sub>i</sub><span>H<sub>0</sub>: π<sub>1</sub> = 0 · F de la primera etapa</span></div>
        <div class="badge-row"><span class="badge always">Siempre: Cov(Z,X) ≠ 0</span><span class="badge optional">Según el caso: F > 10 como referencia</span></div>
      `,
      ejemplo: `
        <p>En Card, la primera etapa de EDUC sobre CERCANIA4 da un coeficiente de 0,3199 años, t = 3,641 y F = 13,256. El instrumento es relevante y supera el umbral de 10. No es una relación enorme: explica una parte modesta de la variación de EDUC, y eso se refleja en la amplitud del intervalo de la VI.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá siempre el coeficiente de la primera etapa, su t y el F. Un instrumento relevante pero apenas fuerte puede dar una estimación consistente y poco informativa.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que la relevancia no se puede testear.</strong> Es al revés: la relevancia se testea con la primera etapa; la exogeneidad es el supuesto no testeable.</li>
          <li><strong>Mirar el F global de la primera etapa.</strong> Ese F contrasta todos los regresores; el diagnóstico de instrumento débil es el F del instrumento excluido.</li>
          <li><strong>Creer que F > 10 resuelve todo.</strong> La fuerza no dice nada sobre la exclusión.</li>
          <li><strong>No reportar la primera etapa.</strong> Sin coeficiente, t y F, el lector no puede juzgar si el instrumento es fuerte.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir el F global de la primera etapa del F del instrumento excluido.</p></div>
      `,
      conexiones: `<p>La relevancia es la mitad testeable de la condición de instrumento. La otra mitad es la exogeneidad. Juntas determinan si la VI es creíble; la fuerza determina si además es precisa.</p>
        <div><button class="concept-chip" data-concept="vi">Variables instrumentales →</button><button class="concept-chip" data-concept="exogeneidad-instrumento">Exogeneidad del instrumento →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 23–24 y 28.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.2 y §15.7.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Act. 1e y Ej. 8c.</p></div>
      `
    },
    'exogeneidad-instrumento': {
      title: 'Exogeneidad del instrumento',
      sub: 'Z no puede compartir el error ni afectar a Y por otro canal.',
      simple: `<p>Que el instrumento sea exógeno significa que solo toca a Y a través de X. Volviendo a la cercanía a la universidad: si además de fomentar el estudio mejora las escuelas de la zona, también está moviendo el salario por otro lado.</p><p>Ese segundo camino contamina la estimación y no se detecta con una regresión. Se defiende con un argumento sobre cómo funciona el mundo, no con un test.</p>`,
      esencia: `
        <div class="definition">Un instrumento es exógeno si Cov(Z,u) = 0. En términos sustantivos, Z no debe afectar a Y por un canal distinto de X ni estar correlacionado con la variable omitida. Es la restricción de exclusión.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>No se testea con la primera etapa: la primera etapa solo habla de relevancia.</li>
          <li>Con un solo instrumento, el modelo está exactamente identificado y no hay test de sobreidentificación.</li>
          <li>Con instrumentos extra, el test de Sargan puede detectar algunos incumplimientos, pero no todos.</li>
          <li>La exclusión es una afirmación sobre canales de efecto, no sobre correlaciones simples entre Z e Y.</li>
        </ul>
        <div class="formula small">Cov(Z,u) = 0<span>Restricción de exclusión: Z solo afecta a Y a través de X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: argumento económico</span><span class="badge optional">Según el caso: Sargan si hay sobreidentificación</span></div>
      `,
      ejemplo: `
        <p>CERCANIA4 puede estar correlacionada con la calidad del sistema escolar local, el ingreso familiar o el mercado laboral de la zona. Si esos factores afectan el salario y no están controlados, la exclusión falla. Los controles regionales y REG_SMSA reducen el problema, pero no lo eliminan por completo.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Escribí la historia completa: por qué Z mueve X y por qué no debería mover Y de otra forma. Si esa historia no se sostiene, la VI no identifica nada.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que la exogeneidad se testea con la primera etapa.</strong> La primera etapa testea relevancia; la exogeneidad es un supuesto de identificación.</li>
          <li><strong>Creer que Sargan prueba la exogeneidad de todos los instrumentos.</strong> Solo testea los instrumentos extra y requiere sobreidentificación.</li>
          <li><strong>Pensar que una correlación muestral cero prueba exogeneidad.</strong> La correlación poblacional es el supuesto; la muestral es una estimación ruidosa.</li>
          <li><strong>Elegir el instrumento por conveniencia de datos.</strong> La exclusión se argumenta antes de mirar la base, no después.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué un instrumento relevante puede arruinar la estimación si entra por un canal alternativo.</p></div>
      `,
      conexiones: `<p>La exogeneidad es la condición que no se puede comprobar con una regresión. Su fracaso se amplifica cuando el instrumento es débil. Por eso la relevancia y la exclusión se discuten juntas.</p>
        <div><button class="concept-chip" data-concept="vi">Variables instrumentales →</button><button class="concept-chip" data-concept="relevancia">Relevancia →</button><button class="concept-chip" data-concept="sesgo-asintotico">Sesgo asintótico →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 22–23 y 28–29.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.1 y §15.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Act. 1e y Ej. 8d.</p></div>
      `
    },
    'instrumento-debil': {
      title: 'Instrumento débil',
      sub: 'Poca correlación con X, mucha varianza y sesgo amplificado.',
      simple: `<p>Un instrumento débil mueve muy poco a X, como una palanca demasiado corta. La estimación sale, pero con un margen de error enorme.</p><p>Peor todavía, si el instrumento tiene aunque sea un poquito de contaminación, esa falla se multiplica por su debilidad. Por eso un F bajo en la primera etapa es una señal de alerta, no un detalle técnico.</p>`,
      viz: "weak-iv",
      vizIntro: "Bajá la fuerza del instrumento y mirá qué pasa con la estimación y con la primera etapa.",
      vizHint: "La debilidad no solo ensancha el intervalo: también acerca el estimador al sesgo de MCO cuando X es endógena. El F de la primera etapa es la señal de alarma.",
      esencia: `
        <div class="definition">Un instrumento es débil cuando Corr(Z,X) es cercana a cero. La primera etapa explica poco de X, la varianza del estimador VI se infla y el sesgo de muestra finita se acerca al de MCO.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La varianza de VI se divide por R<sup>2</sup><sub>x,z</sub>: si el instrumento explica poco, el error estándar explota.</li>
          <li>Con exogeneidad imperfecta, el sesgo asintótico se amplifica por el denominador pequeño.</li>
          <li>F > 10 es una referencia; no certifica que el instrumento sea fuerte en todos los contextos.</li>
          <li>La debilidad se agrava en muestras chicas y cuando muchos controles absorben la variación de Z.</li>
        </ul>
        <div class="formula small">Var(β̂<sup>VI</sup>) = Var(β̂<sup>MCO</sup>)/R<sup>2</sup><sub>x,z</sub><span>R<sup>2</sup><sub>x,z</sub> → 0 ⇒ Var → ∞</span></div>
        <div class="badge-row"><span class="badge always">Siempre: mirar la primera etapa</span><span class="badge optional">Según el caso: F, R<sup>2</sup><sub>x,z</sub> y n</span></div>
      `,
      ejemplo: `
        <p>Un instrumento que explica el 1% de la variación de X tiene un R<sup>2</sup><sub>x,z</sub> = 0,01: la varianza de VI es 100 veces la de MCO. Si además está correlacionado 0,02 con u y 0,10 con X, el cociente de sesgo es 0,20, el doble del sesgo de MCO con Corr(X,u) = 0,10.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Un F de 13 como el de Card no es una luz verde para cualquier conclusión: es un instrumento usable, pero el intervalo sigue siendo ancho. Reportá la fuerza y la precisión, no solo el coeficiente.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que un instrumento débil solo reduce la precisión.</strong> También sesga en muestra finita y amplifica la endogeneidad residual.</li>
          <li><strong>Usar el F global de la regresión de primera etapa.</strong> El diagnóstico es el F del instrumento excluido, no el de todos los regresores.</li>
          <li><strong>Pensar que agregar controles fortalece el instrumento.</strong> Los controles pueden absorber la variación de Z y empeorar la primera etapa.</li>
          <li><strong>Interpretar un coeficiente VI con IC enorme como si fuera preciso.</strong> La precisión es parte del resultado.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el mismo instrumento puede ser consistente en teoría y poco informativo en la práctica.</p></div>
      `,
      conexiones: `<p>La debilidad de un instrumento es el reverso de la relevancia. Se agrava cuando la exogeneidad falla y se mide con el sesgo asintótico. Es la razón por la que la VI no siempre es la mejor opción.</p>
        <div><button class="concept-chip" data-concept="relevancia">Relevancia →</button><button class="concept-chip" data-concept="sesgo-asintotico">Sesgo asintótico →</button><button class="concept-chip" data-concept="vi">Variables instrumentales →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 27–29.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.7.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 8c y 8e.</p></div>
      `
    },
    'sesgo-asintotico': {
      title: 'Sesgo asintótico',
      sub: 'Comparar los plim de VI y MCO, no los t.',
      simple: `<p>Imaginá que comparás dos balanzas, ninguna perfecta. El sesgo asintótico te dice cuál se equivoca menos en el límite, no cuál da un número más lindo en tu muestra.</p><p>Si el instrumento es débil y está algo contaminado, puede equivocarse más que MCO. La comparación se hace con las correlaciones poblacionales, no con los t de la salida.</p>`,
      esencia: `
        <div class="definition">El sesgo asintótico es la diferencia entre el límite de probabilidad del estimador y el parámetro. Comparar los plim de VI y MCO permite decidir cuál se acerca más a β cuando ninguno es insesgado.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>plim VI = β + [Corr(Z,u)/Corr(Z,X)]·σ<sub>u</sub>/σ<sub>x</sub>.</li>
          <li>plim MCO = β + Corr(X,u)·σ<sub>u</sub>/σ<sub>x</sub>.</li>
          <li>VI se prefiere si |Corr(Z,u)|/|Corr(Z,X)| &lt; |Corr(X,u)|. Si el instrumento es débil y algo endógeno, puede ser peor.</li>
          <li>El criterio compara sesgos, no significancias: un t grande no corrige un plim lejano.</li>
        </ul>
        <div class="formula small">|Corr(Z,u)|/|Corr(Z,X)| &lt; |Corr(X,u)|<span>Criterio del sesgo asintótico</span></div>
        <div class="badge-row"><span class="badge always">Siempre: comparar los dos plim</span><span class="badge optional">Según el caso: dirección y magnitud del sesgo</span></div>
      `,
      ejemplo: `
        <p>Si Corr(Z,u) = 0,02, Corr(Z,X) = 0,10 y Corr(X,u) = 0,15, el cociente de VI es 0,20 y el de MCO, 0,15. VI tiene más sesgo asintótico, aunque su instrumento parezca apenas contaminado. La debilidad amplifica el error.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>No alcanza con decir que VI corrige endogeneidad. Hay que preguntar cuánto se mueve Z con X y cuán creíble es que no se mueva con u. El cociente resume esa disyuntiva.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que VI siempre tiene menos sesgo asintótico.</strong> Depende del cociente; un instrumento débil puede empeorarlo.</li>
          <li><strong>Comparar magnitudes de coeficientes en vez de plim.</strong> Los coeficientes muestrales mezclan sesgo y ruido.</li>
          <li><strong>Ignorar la dirección del sesgo.</strong> Los sesgos de VI y MCO pueden tener signos distintos; el valor puntual no dice cuál está más cerca.</li>
          <li><strong>Usar el valor puntual del coeficiente como prueba de menor sesgo.</strong> El plim depende de correlaciones poblacionales que no se observan.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés calcular el cociente de sesgo ni decir en qué caso MCO sería preferible.</p></div>
      `,
      conexiones: `<p>El sesgo asintótico conecta la fuerza del instrumento con la credibilidad de la exclusión. Es el criterio que evita decir “VI siempre” o “MCO siempre” sin mirar el caso.</p>
        <div><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button><button class="concept-chip" data-concept="exogeneidad-instrumento">Exogeneidad del instrumento →</button><button class="concept-chip" data-concept="endogeneidad">Endogeneidad →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 9, diap. 28–29.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.7.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024, pregunta 5: supuestos de la VI y consistencia.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de endogeneidad y VI',
    intro: 'La guía está integrada al sitio: cada tarjeta abre el ejercicio indicado del TP 12. Las dos actividades ordenan los conceptos; los ejercicios aplican proxy, VI y errores de medida con bases distintas. El laboratorio usa Card, el mismo ejercicio del Ej. 8.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-12',
    exercises: [
      { label: 'TP 12 · Act. 1', title: 'Cinco afirmaciones para poner a prueba', text: 'Proxy binaria, variable dependiente rezagada, proxy como método de estimación, error de medida en Y y testeabilidad de exogeneidad y relevancia. La actividad está diseñada para corregir confusiones que vuelven en el parcial.', tags: ['Conceptual', 'V/F'], href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-11' },
      { label: 'TP 12 · Act. 2', title: 'Causas, consecuencias y requisitos', text: 'Enumerá las causas de endogeneidad, explicá qué propiedades de MCO se rompen, definí una proxy, escribí sus requisitos y contá el método de MC2E. Es el mapa conceptual completo de la clase.', tags: ['Conceptual', 'Sintetizar'], href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-7' },
      { label: 'TP 12 · Ej. 1', title: 'WAGE2: educación, experiencia y capacidad', text: 'Estimá el modelo de log salario con educ, exper y south; discutí el sesgo por capacidad, proponé IQ como proxy y compará los coeficientes. Es el ejercicio introductorio de proxy.', tags: ['Aplicar', 'Proxy'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-ejemplo-9.3-de-wooldridge' },
      { label: 'TP 12 · Ej. 2', title: 'DELITOS: desempleo, gasto en seguridad y rezago', text: 'Estimá log(DELITO) con DESEMP y log(GASTOSEG), incorporá log(DELITO_03) para controlar factores urbanos no observables, compará los modelos y contrastá que el coeficiente del rezago sea 1. Es el caso de variable dependiente rezagada.', tags: ['Aplicar', 'Rezago'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-11' },
      { label: 'TP 12 · Ej. 3–4', title: 'Variable instrumental: educación de la madre', text: 'Estimá MCO de log SALARIO sobre EDUC, argumentá la endogeneidad y reestimá por VI usando los años de educación de la madre. Reportá error estándar, significancia e intervalo. El Ej. 4 repite el análisis con EXPER y la fórmula matricial.', tags: ['Aplicar', 'VI'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-3-10' },
      { label: 'TP 12 · Ej. 5', title: 'Tomates: fertilizante medido con error', text: 'Estimá por MCO, verificá la relevancia del fertilizante comprado como instrumento del usado, reestimá por VI y compará. Después discutí qué pasaría si el error de medida estuviera en las toneladas cosechadas.', tags: ['Aplicar', 'Error de medida'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-5-8' },
      { label: 'TP 12 · Ej. 8', title: 'Card: retorno de la educación con CERCANIA4', text: 'Estimá MCO, discutí la endogeneidad de EDUC, verificá la relevancia de CERCANIA4, argumentá la exogeneidad, estimá por MC2E y compará intervalos. Es la base del laboratorio de esta clase.', tags: ['Aplicar', 'Card'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-8-2' }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 12 · Ej. 8',
      title: 'Card: MCO vs VI con CERCANIA4 como instrumento',
      intro: 'La base Card permite comparar dos estimaciones del retorno de la educación con la misma muestra y la misma ecuación. MCO usa toda la variación de EDUC; VI usa solo la parte que predice CERCANIA4. La comparación muestra la disyuntiva central de la clase: la VI puede corregir sesgo, pero pierde precisión.',
      dataNote: 'Card.rda contiene n = 3010 hombres en 1976. La variable dependiente es l_SALARIO (log del salario). Los regresores son EDUC, EXPER, EXPER2, RAZA (binaria), CAPITAL (binaria), SUR (binaria), las variables ficticias regionales REG2–REG9 (REG1 es la categoría base), REG_SMSA y el instrumento CERCANIA4 (binaria: creció cerca de una universidad con carreras de cuatro años). La base también trae CERCANIA2, EDAD, EDUC_PAD y EDUC_MAD, que no se usan en este laboratorio. Es un corte transversal observacional: los coeficientes son asociaciones condicionales y la validez causal depende del supuesto de exclusión de CERCANIA4. El script supone que Card.rda está en el directorio de trabajo y se corrió con R 4.5.2 y AER.',
      script: `suppressPackageStartupMessages(library(AER))
load("Card.rda")

ols <- lm(l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + SUR +
            REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA,
          data = base)
summary(ols)

iv <- ivreg(l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + SUR +
              REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA |
              . - EDUC + CERCANIA4, data = base)
summary(iv, diagnostics = TRUE)

cat("\\nIC 95% MCO para EDUC:\\n")
print(confint(ols)["EDUC", ])
cat("\\nIC 95% VI para EDUC:\\n")
print(confint(iv)["EDUC", ])

primera <- lm(EDUC ~ EXPER + EXPER2 + RAZA + CAPITAL + SUR + REG2 + REG3 +
                REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA + CERCANIA4,
              data = base)
cat("\\nPrimera etapa: coeficiente de CERCANIA4\\n")
print(summary(primera)$coefficients["CERCANIA4", ])
cat("\\nPrimera etapa: R2\\n")
print(summary(primera)$r.squared)`,
      output: `Call:
lm(formula = l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + 
    SUR + REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + 
    REG_SMSA, data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-1.62326 -0.22141  0.02001  0.23932  1.33340 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  4.6208067  0.0742327  62.248  < 2e-16 ***
EDUC         0.0746933  0.0034983  21.351  < 2e-16 ***
EXPER        0.0848320  0.0066242  12.806  < 2e-16 ***
EXPER2      -0.0022870  0.0003166  -7.223 6.41e-13 ***
RAZA        -0.1990123  0.0182483 -10.906  < 2e-16 ***
CAPITAL      0.1363845  0.0201005   6.785 1.39e-11 ***
SUR         -0.1479550  0.0259799  -5.695 1.35e-08 ***
REG2         0.0963672  0.0358979   2.684  0.00730 ** 
REG3         0.1445400  0.0351244   4.115 3.97e-05 ***
REG4         0.0550756  0.0416573   1.322  0.18623    
REG5         0.1280248  0.0418395   3.060  0.00223 ** 
REG6         0.1405174  0.0452469   3.106  0.00192 ** 
REG7         0.1179810  0.0448025   2.633  0.00850 ** 
REG8        -0.0564361  0.0512579  -1.101  0.27098    
REG9         0.1185698  0.0388301   3.054  0.00228 ** 
REG_SMSA     0.0262417  0.0194477   1.349  0.17733    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.3723 on 2994 degrees of freedom
Multiple R-squared:  0.2998,	Adjusted R-squared:  0.2963 
F-statistic: 85.48 on 15 and 2994 DF,  p-value: < 2.2e-16


Call:
ivreg(formula = l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + 
    SUR + REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + 
    REG_SMSA | . - EDUC + CERCANIA4, data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-1.83164 -0.24075  0.02429  0.25208  1.42760 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  3.6661511  0.9248295   3.964 7.54e-05 ***
EDUC         0.1315038  0.0549637   2.393  0.01679 *  
EXPER        0.1082711  0.0236586   4.576 4.92e-06 ***
EXPER2      -0.0023349  0.0003335  -7.001 3.12e-12 ***
RAZA        -0.1467758  0.0538999  -2.723  0.00650 ** 
CAPITAL      0.1118083  0.0316620   3.531  0.00042 ***
SUR         -0.1446715  0.0272846  -5.302 1.23e-07 ***
REG2         0.1007678  0.0376857   2.674  0.00754 ** 
REG3         0.1482588  0.0368141   4.027 5.78e-05 ***
REG4         0.0498971  0.0437398   1.141  0.25406    
REG5         0.1462719  0.0470639   3.108  0.00190 ** 
REG6         0.1629029  0.0519096   3.138  0.00172 ** 
REG7         0.1345722  0.0494023   2.724  0.00649 ** 
REG8        -0.0830770  0.0593314  -1.400  0.16155    
REG9         0.1078142  0.0418137   2.578  0.00997 ** 
REG_SMSA     0.0185311  0.0216086   0.858  0.39119    

Diagnostic tests:
                  df1  df2 statistic  p-value    
Weak instruments    1 2994    13.256 0.000276 ***
Wu-Hausman          1 2993     1.168 0.279973    
Sargan              0   NA        NA       NA    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.3883 on 2994 degrees of freedom
Multiple R-Squared: 0.2382,	Adjusted R-squared: 0.2343 
Wald test: 51.01 on 15 and 2994 DF,  p-value: < 2.2e-16 


IC 95% MCO para EDUC:
     2.5 %     97.5 % 
0.06783385 0.08155266 

IC 95% VI para EDUC:
     2.5 %     97.5 % 
0.02377701 0.23923064 

Primera etapa: coeficiente de CERCANIA4
    Estimate   Std. Error      t value     Pr(>|t|) 
0.3198989401 0.0878638178 3.6408495342 0.0002763401 

Primera etapa: R2
[1] 0.4771162`,
      confint: `IC 95% MCO para EDUC:
     2.5 %     97.5 % 
0.06783385 0.08155266 

IC 95% VI para EDUC:
     2.5 %     97.5 % 
0.02377701 0.23923064`,
      readingTable: [
        { element: 'Estimate (MCO, EDUC)', meaning: 'Coeficiente de EDUC en la ecuación de log salario por MCO.', how: '0,0747: un año más de educación se asocia con 7,47% más de salario en la aproximación log-lin. El cambio exacto es 7,76%.' },
        { element: 'Std. Error (MCO, EDUC)', meaning: 'Precisión del coeficiente MCO.', how: '0,00350; t = 21,35. Es el denominador del intervalo y refleja la gran cantidad de variación de EDUC.' },
        { element: 'Estimate (VI, EDUC)', meaning: 'Coeficiente de EDUC instrumentando con CERCANIA4.', how: '0,1315: 13,15% más de salario; exacto, 14,05%. Es 76% mayor que el coeficiente MCO.' },
        { element: 'Std. Error (VI, EDUC)', meaning: 'Precisión del coeficiente VI.', how: '0,0550, casi 16 veces el error estándar de MCO. La VI compra consistencia con una pérdida fuerte de precisión.' },
        { element: 'Weak instruments', meaning: 'Contraste de relevancia de la primera etapa.', how: 'F(1, 2994) = 13,256, p = 0,000276. Supera el umbral de 10, pero no es un instrumento enorme.' },
        { element: 'Wu-Hausman', meaning: 'Contraste de exogeneidad de EDUC.', how: 'F(1, 2993) = 1,168, p = 0,280. No se rechaza la exogeneidad; no prueba que EDUC sea exógena.' },
        { element: 'Sargan', meaning: 'Contraste de sobreidentificación.', how: 'df1 = 0, NA: el modelo está exactamente identificado. No hay instrumentos extra que testear.' },
        { element: 'CERCANIA4 (primera etapa)', meaning: 'Coeficiente de la primera etapa de EDUC.', how: '0,3199 años más de educación si creció cerca de una universidad de cuatro años; t = 3,641, p = 0,000276.' },
        { element: 'Multiple R-squared', meaning: 'Ajuste de MCO y de VI.', how: '0,2998 en MCO y 0,2382 en VI. No se comparan como bondad: el R² de la VI no tiene interpretación natural.' },
        { element: 'Residual standard error', meaning: 'Dispersión residual de cada estimación.', how: '0,3723 en MCO y 0,3883 en VI. La VI deja residuos algo más dispersos.' },
        { element: 'confint() para EDUC', meaning: 'Intervalos al 95% para el coeficiente de EDUC.', how: 'MCO [0,0678; 0,0816]; VI [0,0238; 0,2392]. El de VI es mucho más ancho y cubre valores económicamente distintos.' },
        { element: 'n y grados de libertad', meaning: 'Tamaño de muestra y df.', how: 'n = 3010; 2994 grados de libertad. La muestra es grande, pero la precisión de la VI sigue siendo limitada.' }
      ],
      econometric: `<p><strong>Dos estimaciones, misma ecuación.</strong> MCO estima un retorno de 0,0747 por año de educación, con error estándar 0,00350 y t = 21,35. VI estima 0,1315, con error estándar 0,0550 y t = 2,39. La diferencia es 0,0568 y el coeficiente VI es 76% mayor. Los dos son positivos y significativos al 5%, pero el intervalo de VI es mucho más ancho.</p>
        <p><strong>Primera etapa.</strong> CERCANIA4 tiene un coeficiente de 0,3199 años de educación, error estándar 0,0879, t = 3,641 y p = 0,000276. El F del instrumento excluido es 13,256: supera la regla de 10, así que no es débil por esa convención. La primera etapa tiene R<sup>2</sup> = 0,4771; el instrumento explica una parte de EDUC, no toda.</p>
        <p><strong>Diagnósticos.</strong> Wu-Hausman da F = 1,168 con p = 0,280: no se rechaza la exogeneidad de EDUC. Eso no prueba que EDUC sea exógena; solo dice que la diferencia entre MCO y VI no es estadísticamente significativa con esta muestra y este instrumento. Sargan no se calcula porque el modelo está exactamente identificado: hay un instrumento para una endógena.</p>
        <p><strong>Precisión.</strong> El error estándar de VI es 15,7 veces el de MCO y el intervalo de EDUC pasa de [0,0678; 0,0816] a [0,0238; 0,2392]. La VI es consistente bajo los supuestos, pero menos eficiente. El precio de corregir la endogeneidad es una pérdida grande de precisión.</p>
        <p><strong>Qué no dice la salida.</strong> El R² de VI, 0,2382, no se interpreta como bondad de ajuste ni se compara con el 0,2998 de MCO. El modelo explica una parte modesta de la variación del log salario; hay mucha heterogeneidad no observada. La salida no prueba causalidad ni identifica un efecto único para toda la población.</p>`,
      economic: `<p><strong>Magnitud.</strong> Un año más de educación se asocia con un salario entre 6,8% y 8,2% más alto según MCO en la aproximación log-lin (7,0% a 8,5% exactos), y entre 2,4% y 23,9% según VI (2,4% a 27,0% exactos). La estimación puntual de VI es casi el doble, pero su intervalo es tan amplio que no permite distinguir un retorno bajo de uno muy alto.</p>
        <p><strong>Por qué VI es mayor que MCO.</strong> La historia simple de la capacidad omitida sugiere que MCO sobreestima el retorno, porque los más capaces estudian más y ganan más. Acá ocurre lo contrario. Eso puede reflejar atenuación por error de medida en EDUC, retornos heterogéneos —la VI estima un efecto para quienes cambian de educación por la cercanía a la universidad— o un canal de CERCANIA4 que afecta el salario y no pasa por EDUC. No conviene contar la diferencia como “sesgo corregido” sin más.</p>
        <p><strong>Qué mide CERCANIA4.</strong> Es una variable binaria que compara personas que crecieron cerca de una universidad con carreras de cuatro años con las que no. La VI usa la parte de EDUC que predice esa cercanía. Es variación geográfica, no un experimento: las familias que se instalan cerca de una universidad pueden diferir en ingreso, educación parental o calidad escolar.</p>
        <p><strong>Exogeneidad.</strong> La exclusión exige que CERCANIA4 no afecte el salario por otro canal. Si la cercanía a la universidad mejora la calidad del secundario local, el mercado laboral o las redes familiares, y esos factores no están completamente controlados, la VI se sesga. Los controles regionales y REG_SMSA ayudan, pero no garantizan la exclusión.</p>
        <p><strong>Conclusión.</strong> La evidencia es compatible con un retorno positivo de la educación, pero no permite afirmar un efecto causal único ni descartar sesgos. La VI es una estrategia de robustez, no una prueba definitiva. No extrapoles el 0,1315 a otras poblaciones ni a cambios de política educativa.</p>`,
      errors: [
        'Decir que la VI prueba causalidad. La VI es consistente solo si CERCANIA4 es relevante y exógeno, y la exogeneidad no se testea con un solo instrumento.',
        'Leer el 0,1315 como el retorno verdadero y el 0,0747 como el sesgado. La VI tiene su propio sesgo de muestra finita y un intervalo muy amplio.',
        'Ignorar que el IC de VI es [0,0238; 0,2392]. Es tan ancho que no permite hablar de una magnitud precisa.',
        'Concluir que Wu-Hausman p = 0,28 prueba que EDUC es exógena. No rechazar no es aceptar; además el test tiene poca potencia con un instrumento moderado.',
        'Comparar el R² de MCO con el de VI. El R² de la VI no tiene interpretación natural y no mide bondad de ajuste.',
        'Olvidar que Sargan aparece NA porque el modelo está exactamente identificado. No es un test que haya pasado: no se puede calcular.'
      ],
      checklist: [
        'Declará n, variable dependiente, transformación logarítmica y unidad de EDUC.',
        'Reportá MCO y VI con coeficiente, error estándar, t, p e intervalo al 95%.',
        'Mostrá la primera etapa: coeficiente de CERCANIA4, t, F del instrumento y R².',
        'Interpretá Wu-Hausman como un test de diferencia, no como una prueba de exogeneidad.',
        'Explicá por qué Sargan no se calcula en un modelo exactamente identificado.',
        'Cerrá con la comparación de magnitudes y precisión, y con los límites causales de un diseño observacional.'
      ]
    },
    partials: [
      { label: '2P 2024', text: 'Variable contenida en el error y uso de una proxy: escribí el modelo sustituido y demostrá qué estimadores son consistentes si E(X<sub>3</sub>*|X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub>) = δ<sub>0</sub> + δ<sub>2</sub>X<sub>2</sub> + δ<sub>3</sub>X<sub>3</sub>, con δ<sub>1</sub> = 0.' },
      { label: '2P 2024', text: 'Variable endógena y VI: escribí el modelo si se usa un instrumento para X<sub>1</sub>, detallá los supuestos que debe cumplir y explicá por qué la estimación por VI es consistente pero no insesgada.' },
      { label: '2P 2024', text: 'MC2E: explicá en qué consiste, escribí la expresión de la varianza del estimador y detallá sus componentes. Es la puerta de entrada a la clase 10.' }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a decidir entre MCO, proxy y VI, y a leer los diagnósticos sin convertirlos en pruebas de causalidad. Respondé antes de abrir la solución; si tu respuesta no distingue identificación de precisión, volvé a la sección correspondiente.',
    questions: [
      { q: '¿Por qué la endogeneidad es más grave que la heterocedasticidad o la autocorrelación?', a: 'Porque la heterocedasticidad y la autocorrelación afectan la varianza y la eficiencia, pero MCO sigue siendo insesgado y consistente bajo exogeneidad. La endogeneidad rompe la exogeneidad: el estimador es, en general, sesgado e inconsistente, y el sesgo no desaparece con n. Los t y F se construyen alrededor de un estimador que converge a otro parámetro.' },
      { q: '¿Cuál es la diferencia entre heterogeneidad inobservable y variable omitida?', a: 'Son dos nombres del mismo mecanismo visto desde ángulos distintos. La heterogeneidad inobservable es la característica individual que no se mide; la variable omitida es esa característica ausente del modelo. El problema aparece cuando la característica afecta a Y y está correlacionada con X. Si no afecta a Y o no se mueve con X, no hay sesgo.' },
      { q: 'Un modelo tiene R² = 0,85 y todos los coeficientes son significativos. ¿Podés descartar endogeneidad?', a: 'No. El R² mide ajuste y la significancia mide precisión relativa a cero; ninguna de las dos dice si X está correlacionada con u. Un modelo puede ajustar muy bien y estar sesgado por una variable omitida relevante. Para descartar endogeneidad hace falta un argumento de identificación, no un estadístico de ajuste.' },
      { q: '¿Qué requisitos debe cumplir una proxy y qué coeficientes quedan consistentes?', a: 'La proxy debe estar correlacionada con la variable no observable, no debe estar correlacionada con el error del modelo y debe cumplir E(X*|X<sub>1</sub>, X<sub>2</sub>, X<sub>3</sub>) = E(X*|X<sub>3</sub>). Bajo esos supuestos, los coeficientes de las X incluidas son consistentes; el intercepto y el coeficiente de la proxy no son estructurales. El coeficiente de la proxy estima β<sub>3</sub>δ<sub>3</sub>.' },
      { q: '¿Qué pasa si la proxy también está correlacionada con las otras X?', a: 'Si la variable omitida depende de X<sub>1</sub> o X<sub>2</sub> además de la proxy, la media condicional falla. Al sustituir, el error compuesto queda correlacionado con esas X y todos los estimadores son inconsistentes. La proxy deja de ser una buena solución: hay que buscar otra proxy o un instrumento.' },
      { q: '¿Por qué un error de medida en Y no sesga las pendientes y uno en X sí?', a: 'En Y, el error clásico se suma al residuo y, si es independiente de X, no se correlaciona con los regresores: MCO sigue insesgado, pero la varianza aumenta. En X, el error clásico implica Cov(X,e<sub>1</sub>) = σ²<sub>e</sub> ≠ 0, y el error compuesto u − β<sub>1</sub>e<sub>1</sub> queda correlacionado con X. Eso sesga el coeficiente hacia cero: es la atenuación.' },
      { q: 'Si β<sub>1</sub> = 0,4 y la fiabilidad de X es 0,7, ¿qué coeficiente esperás?', a: 'Esperás 0,4 × 0,7 = 0,28. La fiabilidad es la proporción de la varianza observada que es varianza verdadera. El 30% restante es error de medida, y el coeficiente se atenúa en esa proporción. Si β<sub>1</sub> fuera negativo, el valor esperado sería −0,28: también más cerca de cero.' },
      { q: '¿Qué condiciones debe cumplir un instrumento y cuáles se pueden testear?', a: 'Debe ser relevante, Cov(Z,X) ≠ 0, y exógeno, Cov(Z,u) = 0. La relevancia se testea con la primera etapa: H<sub>0</sub>: π<sub>1</sub> = 0 y el F del instrumento. La exogeneidad no se testea con un solo instrumento; es un supuesto de exclusión que se argumenta con teoría e instituciones. Con instrumentos extra, el test de Sargan puede detectar algunas violaciones, pero no todas.' },
      { q: '¿Por qué el estimador VI es consistente pero no insesgado?', a: 'Porque en muestras grandes converge a β si Z es relevante y exógeno, pero en muestras finitas la distribución del cociente de covarianzas no está centrada en β. Cuando X y u están correlacionados, el sesgo de muestra finita puede ser sustancial, sobre todo si el instrumento es débil. Por eso se prefiere con muestras grandes y se reporta la fuerza de la primera etapa.' },
      { q: '¿Por qué un instrumento débil es peligroso aunque Corr(Z,u) sea pequeño?', a: 'Porque el sesgo asintótico de VI depende de Corr(Z,u)/Corr(Z,X). Si el denominador es cercano a cero, un numerador pequeño se amplifica. Además, la varianza se divide por R²<sub>x,z</sub> y explota. El instrumento puede ser consistente en teoría y tener un intervalo enorme y un sesgo de muestra finita cercano al de MCO.' },
      { q: 'En Card, MCO da 0,0747 y VI da 0,1315, con Wu-Hausman p = 0,28. ¿Qué podés concluir?', a: 'Que la asociación es positiva en ambos métodos, que la VI es mucho menos precisa y que no hay evidencia estadística suficiente para rechazar la exogeneidad de EDUC. No podés concluir que el retorno causal sea 0,1315 ni que MCO esté sesgado. La diferencia es compatible con sesgo, con error de medida, con retornos heterogéneos o con una violación de la exclusión. La VI es una estimación de robustez, no una prueba definitiva.' },
      { q: 'Tenés una variable omitida, una proxy candidata y un instrumento candidato. ¿Cómo decidís?', a: 'Primero verificá si la proxy cumple la media condicional y no se correlaciona con las otras X; si lo hace, podés estimar por MCO con la proxy y ganar precisión. Si no, evaluá el instrumento: relevancia con la primera etapa y un argumento creíble de exclusión. Si el instrumento es fuerte y exógeno, VI; si es débil o la exclusión no se sostiene, MCO con una advertencia explícita sobre el sesgo. No hay una respuesta universal: depende de qué coeficiente querés identificar y de qué supuestos podés defender.' }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: endogeneidad y VI',
    intro: 'Empezá por las fórmulas y seguí con los drills. La sesión de 90 minutos ordena la teoría y el laboratorio; el plan de 7 días reparte la práctica. La idea es llegar al parcial pudiendo justificar por qué elegís MCO, proxy o VI, y qué supuesto estás comprando en cada caso.',
    formulas: [
      { title: 'Sesgo de MCO con endogeneidad', eq: 'plim β̂<sub>1</sub> = β<sub>1</sub> + Corr(X,u)·σ<sub>u</sub>/σ<sub>x</sub>', note: 'Si Corr(X,u) ≠ 0, el estimador converge a otro parámetro. n no corrige el sesgo.', more: "<p>El plim descompone el coeficiente en el parámetro más un término de sesgo. Ese término tiene dos partes: la correlación entre X y u, que decide el signo, y el cociente de desvíos, que decide la escala.</p><ul><li><b>Cuándo se usa:</b> para explicar por qué más datos no corrigen la endogeneidad.</li><li><b>Error típico:</b> leer Corr(X,u) como la correlación muestral entre X y los residuos, que es cero por construcción.</li><li><b>Conexión:</b> es la referencia contra la que se compara el plim de VI en la sección 06.</li></ul>" },
      { title: 'Modelo con proxy', eq: 'Y = α<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + β<sub>2</sub>X<sub>2</sub> + α<sub>3</sub>X<sub>3</sub> + (u + β<sub>3</sub>v<sub>3</sub>)', note: 'α<sub>0</sub> = β<sub>0</sub> + β<sub>3</sub>δ<sub>0</sub>; α<sub>3</sub> = β<sub>3</sub>δ<sub>3</sub>. β<sub>1</sub> y β<sub>2</sub> son consistentes bajo los supuestos.', more: "<p>La ecuación sustituida muestra qué queda cuando reemplazás la variable no observable por la proxy: un intercepto distinto, un coeficiente para la proxy y un error compuesto por dos términos.</p><ul><li><b>Cuándo se usa:</b> para derivar qué coeficientes son consistentes y cuáles no.</li><li><b>Error típico:</b> interpretar el coeficiente de la proxy como si midiera el efecto de la variable omitida.</li><li><b>Conexión:</b> si la proxy cumple la media condicional, β1 y β2 se recuperan; el resto es auxiliar.</li></ul>" },
      { title: 'Coeficiente de la proxy', eq: 'α<sub>3</sub> = β<sub>3</sub>δ<sub>3</sub>', note: 'No es el efecto estructural de la variable omitida. Es el efecto multiplicado por la relación entre la proxy y la variable omitida.', more: "<p>El coeficiente de la proxy es un producto: el efecto de la variable omitida sobre Y multiplicado por la pendiente que relaciona la proxy con esa variable omitida. Cambia si cambiás la escala de la proxy.</p><ul><li><b>Cuándo se usa:</b> para reportar sin confundir parámetros estructurales con auxiliares.</li><li><b>Error típico:</b> decir que un coeficiente grande de IQ prueba que la capacidad importa mucho.</li><li><b>Conexión:</b> la misma lógica de escala aparece en el error de medida y en la atenuación.</li></ul>" },
      { title: 'Error de medida en Y', eq: 'Y = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + β<sub>2</sub>X<sub>2</sub> + (u + e<sub>0</sub>)', note: 'Si e<sub>0</sub> es clásico e incorrelacionado con X, MCO sigue insesgado; la varianza aumenta.', more: "<p>Cuando Y se mide con error, ese error se suma al residuo. El modelo estimado tiene un error más ruidoso, pero la pendiente no cambia si el error es clásico y no se mueve con X.</p><ul><li><b>Cuándo se usa:</b> para decidir si vale la pena corregir la medición o solo reportar intervalos más anchos.</li><li><b>Error típico:</b> suponer que todo error de medida sesga el coeficiente hacia cero.</li><li><b>Conexión:</b> el contraste con el error en X está en la fórmula siguiente y en el TP 12, Ej. 5.</li></ul>" },
      { title: 'Error de medida en X', eq: 'Y = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + (u − β<sub>1</sub>e<sub>1</sub>)', note: 'Bajo ECV, el error compuesto se correlaciona con X<sub>1</sub> y MCO se sesga.', more: "<p>Con la variable explicativa medida con error, el residuo compuesto incluye menos β1 veces ese error. La covarianza entre X observada y el nuevo residuo deja de ser cero, y ahí aparece el sesgo.</p><ul><li><b>Cuándo se usa:</b> para diagnosticar por qué un coeficiente sale más chico de lo esperado.</li><li><b>Error típico:</b> olvidar el signo: el sesgo va hacia cero, no siempre hacia abajo.</li><li><b>Conexión:</b> es la causa de endogeneidad que justifica instrumentar con una medida alternativa.</li></ul>" },
      { title: 'Atenuación', eq: 'plim β̂<sub>1</sub> = β<sub>1</sub>·σ<sup>2</sup><sub>X*</sub>/(σ<sup>2</sup><sub>X*</sub> + σ<sup>2</sup><sub>e</sub>)', note: 'El factor está entre 0 y 1. El coeficiente se acerca a cero; positivo se subestima, negativo se sobreestima en valor absoluto.', more: "<p>El plim queda multiplicado por un factor entre cero y uno: la proporción de la varianza observada que es varianza verdadera. Si la variable está mal medida, el coeficiente se acerca a cero en la misma proporción.</p><ul><li><b>Cuándo se usa:</b> para calcular cuánto se subestima un efecto con una fiabilidad conocida.</li><li><b>Error típico:</b> creer que la atenuación desaparece con una muestra más grande.</li><li><b>Conexión:</b> anticipa por qué la VI puede dar un coeficiente mayor que MCO sin que haya un error de cálculo.</li></ul>" },
      { title: 'Primera etapa', eq: 'X<sub>i</sub> = π<sub>0</sub> + π<sub>1</sub>Z<sub>i</sub> + v<sub>i</sub>', note: 'H<sub>0</sub>: π<sub>1</sub> = 0. El F del instrumento excluido mide la relevancia.', more: "<p>La primera etapa es una regresión de la variable endógena sobre el instrumento y los controles. Su coeficiente mide cuánto mueve Z a X; su F contrasta si ese movimiento es distinguible de cero.</p><ul><li><b>Cuándo se usa:</b> siempre que reportás VI, para mostrar que el instrumento es relevante.</li><li><b>Error típico:</b> mirar el F global de la regresión en lugar del F del instrumento excluido.</li><li><b>Conexión:</b> el R2 de esta etapa entra en la varianza del estimador VI.</li></ul>" },
      { title: 'VI en regresión simple', eq: 'β̂<sub>1</sub><sup>VI</sup> = Cov(Z,Y)/Cov(Z,X)', note: 'También β̂<sub>0</sub> = Ȳ − β̂<sub>1</sub>X̄. Si Z es binario, es la razón de diferencias de medias.', more: "<p>El estimador es un cociente de covarianzas: cuánto se mueve Y con Z, dividido por cuánto se mueve X con Z. La idea es usar solo la parte de X que Z puede explicar.</p><ul><li><b>Cuándo se usa:</b> para calcular a mano con un instrumento binario y para entender la intuición del método.</li><li><b>Error típico:</b> interpretarlo como una regresión de Y sobre Z; el denominador corrige la escala.</li><li><b>Conexión:</b> con un instrumento binario equivale a la razón de diferencias de medias.</li></ul>" },
      { title: 'VI matricial', eq: 'β̂<sup>VI</sup> = (Z′X)<sup>−1</sup>Z′Y', note: 'Z incluye las X exógenas y los instrumentos excluidos. La varianza usa X′Z(Z′Z)<sup>−1</sup>Z′X.', more: "<p>La fórmula matricial generaliza el cociente de covarianzas a varias variables. Z contiene las columnas exógenas y los instrumentos excluidos; X, los regresores del modelo estructural.</p><ul><li><b>Cuándo se usa:</b> en regresión múltiple y en MC2E con más de un instrumento.</li><li><b>Error típico:</b> olvidar que las X exógenas se instrumentan a sí mismas y deben estar en Z.</li><li><b>Conexión:</b> con una sola endógena y un solo instrumento, coincide con la fórmula simple.</li></ul>" },
      { title: 'Varianza del estimador VI', eq: 'Var(β̂<sup>VI</sup>) = σ̂<sup>2</sup>/(SCT<sub>x</sub>·R<sup>2</sup><sub>x,z</sub>)', note: 'Es la varianza de MCO dividida por R<sup>2</sup><sub>x,z</sub>. Si el instrumento es débil, la varianza explota.', more: "<p>La varianza de VI es la de MCO dividida por el R2 de la primera etapa. Como ese R2 es menor que uno, la varianza siempre es mayor: la consistencia se paga con precisión.</p><ul><li><b>Cuándo se usa:</b> para explicar por qué el intervalo de VI es más ancho y por qué importa la fuerza del instrumento.</li><li><b>Error típico:</b> comparar errores estándar sin mirar la primera etapa y concluir que la VI está mal estimada.</li><li><b>Conexión:</b> si el R2 tiende a cero, la varianza explota: es el instrumento débil de la sección 06.</li></ul>" },
      { title: 'plim del estimador VI', eq: 'plim β̂<sup>VI</sup> = β + [Corr(Z,u)/Corr(Z,X)]·σ<sub>u</sub>/σ<sub>x</sub>', note: 'Con Corr(Z,u) = 0 es consistente. Con Corr(Z,u) ≠ 0, un denominador pequeño amplifica el sesgo.', more: "<p>El plim de VI tiene la misma estructura que el de MCO, pero el numerador es la correlación del instrumento con el error y el denominador, su correlación con X. Si el denominador es chico, cualquier contaminación se amplifica.</p><ul><li><b>Cuándo se usa:</b> para comparar VI y MCO cuando ninguno es insesgado.</li><li><b>Error típico:</b> creer que un Corr(Z,u) pequeño garantiza poco sesgo sin mirar Corr(Z,X).</li><li><b>Conexión:</b> es la base del criterio de sesgo asintótico de la fórmula siguiente.</li></ul>" },
      { title: 'Criterio del sesgo asintótico', eq: '|Corr(Z,u)|/|Corr(Z,X)| &lt; |Corr(X,u)|', note: 'Si se cumple, VI tiene menos sesgo asintótico que MCO. Si no, MCO puede ser preferible.', more: "<p>El criterio compara dos cocientes: la contaminación del instrumento relativa a su fuerza contra la endogeneidad de X. Si el primero es menor, VI se acerca más a β en el límite.</p><ul><li><b>Cuándo se usa:</b> para justificar la elección entre VI y MCO en un caso concreto.</li><li><b>Error típico:</b> aplicar el criterio con correlaciones muestrales y tratarlo como un test formal.</li><li><b>Conexión:</b> cierra la clase y anticipa los contrastes robustos a instrumentos débiles de la clase 10.</li></ul>" }
    ],
    drills: [
      { q: 'Definí endogeneidad en una frase y escribí su consecuencia sobre MCO.', a: 'Cov(X,u) ≠ 0. MCO es sesgado e inconsistente; el plim es β + Corr(X,u)σ<sub>u</sub>/σ<sub>x</sub>, distinto de β.' },
      { q: 'Nombrá las causas de endogeneidad y un ejemplo de cada una.', a: 'Heterogeneidad inobservable (capacidad en salarios), variable omitida (calidad escolar), simultaneidad (precio y cantidad), error de medida en X (fertilizante usado) y autoselección (capacitación).' },
      { q: '¿Qué propiedades de MCO se rompen con endogeneidad y cuáles no?', a: 'Se rompen el insesgamiento y la consistencia; la inferencia asintótica deja de ser válida. MCO sigue siendo calculable y lineal, y el R² sigue siendo una medida descriptiva de ajuste, pero no identifica el parámetro estructural.' },
      { q: '¿Qué dos condiciones debe cumplir una proxy?', a: 'Estar correlacionada con la variable no observable y no estar correlacionada con el error. Además, debe cumplir la media condicional: la variable omitida no debe depender de las otras X una vez controlada la proxy.' },
      { q: '¿Qué estima el coeficiente de la proxy?', a: 'α<sub>3</sub> = β<sub>3</sub>δ<sub>3</sub>. No es β<sub>3</sub>; está escalado por la relación entre la proxy y la variable omitida.' },
      { q: 'Error de medida en Y: ¿cuándo sesga y cuándo solo infla la varianza?', a: 'Si e<sub>0</sub> es clásico, tiene media cero y es incorrelacionado con X y u, no sesga las pendientes; solo aumenta la varianza. Si E(e<sub>0</sub>) ≠ 0 sesga el intercepto; si se correlaciona con X, sesga las pendientes.' },
      { q: 'Error de medida en X: escribí el plim y explicá la atenuación.', a: 'plim β̂<sub>1</sub> = β<sub>1</sub>·σ²<sub>X*</sub>/(σ²<sub>X*</sub>+σ²<sub>e</sub>). El factor está entre 0 y 1, así que el coeficiente se acerca a cero. Si es positivo, se subestima; si es negativo, se sobreestima en valor absoluto.' },
      { q: 'β<sub>1</sub> = 0,5 y fiabilidad 0,8. ¿Qué coeficiente esperás?', a: '0,5 × 0,8 = 0,4. El 20% de la varianza observada es error de medida; el coeficiente se atenúa en esa proporción.' },
      { q: '¿Qué condiciones debe cumplir Z para ser un instrumento válido?', a: 'Relevancia: Cov(Z,X) ≠ 0. Exogeneidad: Cov(Z,u) = 0, que incluye la exclusión: Z solo afecta a Y a través de X. La primera se testea; la segunda se argumenta.' },
      { q: 'El F de la primera etapa es 4. ¿Qué concluís?', a: 'Es un instrumento débil por la regla de 10. La VI tendrá mucha varianza y sesgo de muestra finita hacia MCO; conviene buscar otro instrumento o usar MCO con una advertencia explícita.' },
      { q: 'Corr(Z,X) = 0,1, Corr(Z,u) = 0,02 y Corr(X,u) = 0,15. ¿Qué estimador tiene menor sesgo asintótico?', a: 'El cociente de VI es 0,02/0,1 = 0,2, mayor que 0,15. MCO tiene menos sesgo asintótico. Solo si Corr(Z,u) fuera exactamente cero la VI sería consistente; con estos valores, la debilidad del instrumento amplifica el error.' },
      { q: 'En Card, MCO 0,0747, VI 0,1315 y Wu-Hausman p = 0,28. ¿Qué podés afirmar?', a: 'Que la asociación es positiva, que la VI es mucho menos precisa y que no se rechaza la exogeneidad de EDUC. No podés afirmar que el retorno causal sea 0,1315 ni que MCO esté sesgado. La diferencia es compatible con sesgo, error de medida, heterogeneidad de retornos o violación de la exclusión.' }
    ],
    sourceGuide: [
      { stuck: 'No entiendo por qué la endogeneidad rompe MCO', source: 'Clase 9, diap. 3–5; Wooldridge Cap. 15, §15.1.' },
      { stuck: 'Confundo heterogeneidad inobservable con heterocedasticidad', source: 'Clase 9, diap. 4; Clase 6 para heterocedasticidad; Wooldridge Cap. 9, §9.2.' },
      { stuck: 'No sé derivar la sustitución de la proxy', source: 'Clase 9, diap. 7–9; Wooldridge Cap. 9, §9.2; TP 12, Act. 2 y Ej. 1.' },
      { stuck: 'No sé qué coeficiente es consistente con una proxy', source: 'Clase 9, diap. 9–10; TP 12, Act. 2d; 2P 2024, pregunta 5.' },
      { stuck: 'Confundo error de medida en Y con error en X', source: 'Clase 9, diap. 12–17; Wooldridge Cap. 9, §9.4.' },
      { stuck: 'No entiendo la atenuación', source: 'Clase 9, diap. 18–19; TP 12, Ej. 5.' },
      { stuck: 'No sé qué hace una VI', source: 'Clase 9, diap. 20–25; Wooldridge Cap. 15, §15.1–15.2; TP 12, Ej. 3–4.' },
      { stuck: 'Confundo relevancia con exogeneidad', source: 'Clase 9, diap. 23–24; TP 12, Act. 1e y Ej. 8c–d.' },
      { stuck: 'No entiendo instrumento débil ni sesgo asintótico', source: 'Clase 9, diap. 28–29; Wooldridge Cap. 15, §15.7.' },
      { stuck: 'No sé leer la salida de Card', source: 'Laboratorio de esta clase; TP 12, Ej. 8; Clase 9, diap. 25–30.' }
    ],
    session: [
      { time: '0–10', title: 'Pregunta guía', text: '¿Cuándo podés confiar en MCO y cuándo necesitás una proxy o un instrumento? Escribí una respuesta de tres líneas antes de mirar los apuntes.' },
      { time: '10–25', title: 'Endogeneidad y causas', text: 'Definí Cov(X,u) ≠ 0, escribí el plim de MCO y distinguí las cuatro puertas y la autoselección. Revisá los ejemplos de capacidad, precio-cantidad, fertilizante y capacitación.' },
      { time: '25–40', title: 'Proxy', text: 'Derivá la sustitución, escribí α<sub>3</sub> = β<sub>3</sub>δ<sub>3</sub> y explicá la media condicional. Resolvé TP 12, Act. 2 y Ej. 1.' },
      { time: '40–55', title: 'Errores de medida', text: 'Separá error en Y de error en X, escribí la atenuación y calculá un ejemplo con fiabilidad 0,7. Revisá TP 12, Ej. 5.' },
      { time: '55–75', title: 'Variables instrumentales', text: 'Escribí relevancia, exogeneidad y las fórmulas simple y matricial. Interpretá la primera etapa y la varianza. Revisá TP 12, Ej. 3–4.' },
      { time: '75–90', title: 'Instrumento débil y Card', text: 'Compará los plim, aplicá el criterio de sesgo asintótico y leé la salida de Card: 0,0747 vs 0,1315, F = 13,26, Wu-Hausman p = 0,28. Cerrá con una idea que puedas explicar en dos minutos y una que todavía no.' }
    ],
    kit: [
      { k: 'Kit 01', title: 'Una página de ideas clave', text: 'Endogeneidad, causas, proxy, error de medida, VI, relevancia, exogeneidad y sesgo asintótico, con una frase por concepto.' },
      { k: 'Kit 02', title: 'Tabla de errores', text: 'Qué se confunde, por qué y cómo corregirlo. Usá las secciones 01–07 y los errores del laboratorio como punto de partida.' },
      { k: 'Kit 03', title: 'Doce drills', text: 'Los drills de este kit, ordenados de menor a mayor dificultad. Si fallás uno, volvé a la fórmula o al ejercicio asociado.' },
      { k: 'Kit 04', title: 'Plan de 7 días', text: 'Una rutina corta para repartir teoría, ejercicios y laboratorio sin volver a leer todo desde cero.' }
    ],
    plan: [
      { day: 'Día 1', title: 'Teoría y mapa', text: 'Leé la clase 09 completa y explicá el mapa de decisión sin mirar. Escribí qué método elegirías en cada una de las causas.' },
      { day: 'Día 2', title: 'Endogeneidad y causas', text: 'Repasá las secciones 01–02, escribí el plim de MCO y resolvé TP 12, Act. 1 y Act. 2.' },
      { day: 'Día 3', title: 'Proxy', text: 'Derivá la sustitución y resolvé TP 12, Ej. 1. Explicá por qué el coeficiente de IQ no es el efecto de la capacidad.' },
      { day: 'Día 4', title: 'Errores de medida', text: 'Resolvé TP 12, Ej. 5 y calculá dos ejemplos de atenuación con fiabilidades distintas. Distinguí error en Y de error en X.' },
      { day: 'Día 5', title: 'Variables instrumentales', text: 'Resolvé TP 12, Ej. 3 y 4. Escribí las fórmulas simple y matricial, y la varianza. Verificá la relevancia del instrumento.' },
      { day: 'Día 6', title: 'Instrumento débil y laboratorio', text: 'Repasá la sección 06, corré el laboratorio de Card y leé los diagnósticos. Explicá por qué la VI es menos precisa.' },
      { day: 'Día 7', title: 'Cierre', text: 'Respondé la autoevaluación y actualizá tu kit de una página. Volvé solo a lo que falló.' }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para que puedas abrir cada ejercicio desde la práctica. El parcial muestra cómo se formula el problema en una evaluación.',
    items: [
      { type: 'Clase', typeClass: '', title: 'Clase 9 — Endogeneidad, proxy, errores de medida y VI', text: 'Fuente principal de la explicación, el orden y los énfasis. Cubre endogeneidad, proxy, variable dependiente rezagada, errores de medida, VI y sesgo por instrumento débil.', loc: '30 diapositivas · diap. 1–30' },
      { type: 'Libro', typeClass: 'book', title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.', text: 'Cap. 9: proxies, variable dependiente rezagada y errores de medida. Cap. 15: motivación de la VI, estimador, MC2E, contraste de endogeneidad, sobreidentificación e instrumentos débiles.', loc: 'Cap. 9 · §9.2–9.4; Cap. 15 · §15.1–15.3 y §15.7' },
      { type: 'Guía', typeClass: '', title: 'Guía de Trabajos Prácticos 2026 — TP 12', text: 'Actividades 1 y 2, y ejercicios 1 a 9: proxy, VI, MC2E, Hausman, Sargan y el caso Card. El laboratorio retoma el Ej. 8.', loc: 'TP 12 · act. 1–2; ej. 1–9', href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-12' },
      { type: 'Parcial', typeClass: 'exam', title: '2P 2024', text: 'Pregunta 5: modelo con variable contenida en el error, uso de proxy y de VI, supuestos y consistencia. Pregunta 6: MC2E y varianza del estimador.', loc: 'Solución orientativa · preguntas 5–6' }
    ]
  }
};
