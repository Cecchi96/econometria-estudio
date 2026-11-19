window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-05"] = {
  id: "clase-05",
  num: "05",
  eyebrow: "Clase 05 · Variables ficticias",
  title: "Variables ficticias: grupos, interacciones y tramos",
  lead: "Una dummy convierte una categoría en un coeficiente. Sirve para comparar grupos, cambiar pendientes, partir una regresión en tramos y evaluar políticas. El riesgo es leer una diferencia condicional como si fuera un efecto causal.",
  question: "¿Cómo entra una categoría en una regresión y qué se puede —y qué no se puede— concluir de su coeficiente?",
  pills: ["28 diapositivas", "TP 8", "1P/2P 2024–2025", "8 conceptos clave"],
  sections: [
    {
      id: 'c05-s01',
      number: '01',
      title: 'El problema: comparar grupos con una regresión',
      blocks: [
        { type: 'p', id: 'c05-s01-p01', html: 'Un hogar gasta en salud según su ingreso y su tamaño. Pero también importa si tiene obra social y en qué región vive. Ninguna de esas dos cosas es un número: son atributos. La pregunta de esta clase es cómo meterlas en una regresión sin inventar una escala que no existe.' },
        { type: 'p', id: 'c05-s01-p02', html: 'La tentación es comparar promedios. Se calcula el gasto medio de los hogares con obra social y el de los que no la tienen, y se resta. El problema es la composición: los hogares con obra social suelen tener más ingreso, menos integrantes o vivir en regiones distintas. La diferencia bruta mezcla el atributo con todo lo demás. Una regresión permite comparar grupos manteniendo constantes las otras variables, siempre que estén en el modelo.' },
        { type: 'compare', left: { tag: 'Diferencia bruta', title: 'Dos promedios', text: 'Resta de medias sin controlar nada. Es descriptiva y puede estar dominada por la composición de los grupos.', eq: 'Δ = Ȳ<sub>1</sub> − Ȳ<sub>0</sub>' }, right: { tag: 'Diferencia condicional', title: 'Mismo modelo, otras X', text: 'Compara grupos con el mismo ingreso, tamaño y región. Sigue siendo asociación, no causalidad.', eq: 'δ̂<sub>0</sub> en Y = β<sub>0</sub> + δ<sub>0</sub>D + β<sub>1</sub>X<sub>1</sub> + …' } },
        { type: 'cards', items: [
          { sym: 'Nivel', title: 'Desplazar el intercepto', text: 'D=1 suma δ₀ a la predicción. Dos grupos, dos alturas y una pendiente común.' },
          { sym: 'Pendiente', title: 'Cambiar el retorno', text: 'D interactúa con X: la pendiente de X difiere entre grupos. Las rectas dejan de ser paralelas.' },
          { sym: 'Tramo', title: 'Partir la función', text: 'D marca un quiebre en X*. La pendiente cambia a partir de ese punto, sin separar la muestra.' }
        ] },
        { type: 'callout', variant: 'ochre', label: 'El número es una etiqueta, no una magnitud', html: 'Codificar Mujer=1, Hombre=0 no convierte al sexo en una cantidad. El 0 y el 1 solo identifican pertenencia. Cualquier codificación binaria produce el mismo ajuste; lo que cambia es el signo y la referencia. Por eso una <span class="concept" data-concept="dummy" tabindex="0" role="button">variable ficticia</span> nunca se interpreta por su valor, sino por el coeficiente que la acompaña.' },
        { type: 'miniCheck', id: 'c05-check-01', question: 'Un investigador codifica Mujer=1 y Hombre=0. Otro hace lo contrario. ¿Cambia el ajuste del modelo?', intro: 'Separá lo que cambia de parametrización de lo que cambia de ajuste.', answer: 'No cambia el ajuste: los valores ajustados, los residuos, la SCR y el R<sup>2</sup> son los mismos. Cambia la categoría base y, con ella, el signo y el valor del intercepto y del coeficiente. En la primera codificación, el intercepto es el salario medio de los hombres y el coeficiente, la diferencia mujer−hombre. En la segunda, el intercepto es el de las mujeres y el coeficiente, la diferencia hombre−mujer. El t cambia de signo; el p no.' },
        { type: 'p', id: 'c05-s01-p03', html: 'La clase avanza en cuatro pasos. Primero, una sola dummy y su lectura como diferencia de <span class="concept" data-concept="esperanza-condicional" tabindex="0" role="button">esperanzas condicionales</span>. Segundo, varias categorías, la categoría base y la trampa de la dummy. Tercero, dummies que conviven con variables continuas: interceptos distintos, pendientes distintas y tramos. Cuarto, dummies con Y en logaritmos, evaluación de políticas y prueba de Chow. Al final, un mapa de decisión y un laboratorio con Profesores.rda.' }
      ]
    },
    {
      id: 'c05-s02',
      number: '02',
      title: 'Una variable ficticia: esperanzas, contraste de medias y base',
      blocks: [
        { type: 'p', id: 'c05-s02-p01', html: 'El modelo más simple posible: el salario depende del sexo. D<sub>i</sub> = 1 si la persona es mujer y 0 si es hombre. No hay más regresores. La dummy ocupa el lugar de una variable explicativa y el coeficiente mide cuánto se desplaza el salario medio de un grupo respecto del otro.' },
        { type: 'formula', main: 'Y<sub>i</sub> = β<sub>0</sub> + δ<sub>0</sub>D<sub>i</sub> + u<sub>i</sub>', legend: [
          { key: 'D', text: '1 si es mujer, 0 si es hombre. Hombre es la categoría base.' },
          { key: 'D = 0', text: 'Y = β₀ + u. El intercepto es la media del grupo base.' },
          { key: 'D = 1', text: 'Y = β₀ + δ₀ + u. La media del grupo es β₀ + δ₀.' },
          { key: 'δ₀', text: 'E(Y|D=1) − E(Y|D=0): la diferencia de medias entre grupos.' }
        ] },
        { type: 'p', id: 'c05-s02-p02', html: 'Con D=0, la ecuación se reduce a β<sub>0</sub> + u: el intercepto es la media del grupo base. Con D=1, se suma δ<sub>0</sub>: la media del otro grupo es β<sub>0</sub>+δ<sub>0</sub>. Entonces δ<sub>0</sub> = E(Y|D=1) − E(Y|D=0). En la base de Profesores, el salario medio de los hombres es 115.090,4 y el de las mujeres, 101.002,4; la diferencia es −14.088. El modelo con solo sexo reproduce exactamente esos dos números.' },
        { type: 'p', id: 'c05-s02-p03', html: 'Ese coeficiente es un contraste de medias. El t que lo acompaña contrasta H<sub>0</sub>: δ<sub>0</sub> = 0, es decir, que los dos grupos tienen la misma media poblacional. Bajo homocedasticidad, ese t es el mismo que el de una prueba t de diferencia de medias con varianzas iguales. Si las varianzas difieren, conviene Welch; el MCO con errores robustos se acerca a esa corrección.' },
        {
          type: "interactive",
          kind: "dummy-groups",
          label: "Laboratorio visual",
          title: "La brecha bruta no es la brecha condicional",
          intro: "Movés la brecha condicional y la diferencia de experiencia entre grupos. La primera comparación es la diferencia de medias; la segunda, la que controla por experiencia.",
          hint: "La diferencia bruta mezcla la brecha condicional con la composición. Al controlar por experiencia, queda el coeficiente de la dummy. Cambiar la base invierte el signo, no el tamaño."
        },
        { type: 'callout', variant: 'teal', label: 'La categoría base no es un detalle de software', html: 'R elige como referencia el primer nivel del factor, que suele ser el alfabéticamente primero: Hombre antes que Mujer, Ayudante antes que JTP y Prof, A antes que B. Eso no es una decisión económica. Si la pregunta es la brecha de las mujeres, el coeficiente de Mujer con base Hombre es el que querés; si la pregunta es cuánto ganan los hombres de más, la base Mujer da el mismo número con el signo opuesto. La <span class="concept" data-concept="categoria-base" tabindex="0" role="button">categoría base</span> se declara siempre.' },
        { type: 'formula', main: 'Base Hombre: β̂<sub>0</sub> = Ȳ<sub>H</sub>, δ̂<sub>0</sub> = Ȳ<sub>M</sub> − Ȳ<sub>H</sub><br>Base Mujer: β̂<sub>0</sub> = Ȳ<sub>M</sub>, δ̂<sub>0</sub> = Ȳ<sub>H</sub> − Ȳ<sub>M</sub>', legend: [
          { key: 'Ajuste', text: 'Valores ajustados, residuos, SCR y R² no cambian al cambiar la base.' },
          { key: 'Coeficientes', text: 'El intercepto y el coeficiente de la dummy cambian de valor y de signo.' },
          { key: 'Modelos múltiples', text: 'Con más regresores aditivos, los demás coeficientes y sus errores no cambian: solo se reparametriza el bloque de la categoría.' }
        ] },
        { type: 'errorTable', rows: [
          { error: 'δ̂ = −14.088 significa que las mujeres ganan 14.088 menos por ser mujeres.', why: 'Es una diferencia bruta de medias: no controla rango, universidad ni antigüedad, y no prueba discriminación.', fix: 'Leélo como brecha muestral y agregá los controles antes de sacar conclusiones.' },
          { error: 'El intercepto es el salario medio de toda la muestra.', why: 'Es la media del grupo base, el que tiene D=0.', fix: 'Escribí la esperanza condicional antes de interpretar.' },
          { error: 'Si δ̂ no es significativo, los grupos son iguales.', why: 'No rechazar no prueba igualdad; el intervalo puede contener diferencias relevantes.', fix: 'Reportá el intervalo y discutí la potencia.' },
          { error: 'La dummy mide el efecto causal del sexo.', why: 'El sexo no se asigna aleatoriamente y hay variables omitidas.', fix: 'Hablá de diferencia condicional y explicá el diseño que haría falta.' }
        ] },
        { type: 'miniCheck', id: 'c05-check-02', question: 'En el modelo con solo sexo, δ̂ = −14.088 y el R² = 0,019. ¿Cómo interpretás esos dos números juntos?', intro: 'Una cosa es la magnitud de la diferencia y otra, la capacidad explicativa del modelo.', answer: 'δ̂ es la diferencia entre el salario medio de las mujeres y el de los hombres: 14.088 unidades menos, o 12,2% del salario medio masculino. El R<sup>2</sup> de 0,019 dice que el sexo explica poco menos de 2% de la variación total de los salarios. La diferencia es estadísticamente significativa en la muestra, pero el modelo no explica por qué varían los salarios. Son dos dimensiones distintas: magnitud de la diferencia y ajuste del modelo.' }
      ]
    },
    {
      id: 'c05-s03',
      number: '03',
      title: 'Más de dos categorías: k−1 dummies, trampa y cambio de base',
      blocks: [
        { type: 'p', id: 'c05-s03-p01', html: 'El rango de un profesor tiene tres categorías: Ayudante, JTP y Profesor. No es una escala numérica: la distancia entre Ayudante y JTP no tiene por qué ser la misma que entre JTP y Profesor. Para permitir tres niveles distintos se necesitan tres interceptos. Con una constante en el modelo, eso se logra con k−1 = 2 dummies.' },
        { type: 'formula', main: 'Y<sub>i</sub> = β<sub>0</sub> + δ<sub>1</sub>D<sub>1i</sub> + δ<sub>2</sub>D<sub>2i</sub> + u<sub>i</sub>', legend: [
          { key: 'D₁', text: '1 si es JTP, 0 en caso contrario.' },
          { key: 'D₂', text: '1 si es Profesor, 0 en caso contrario.' },
          { key: 'Base', text: 'Ayudante: D₁ = D₂ = 0. Su media es β₀.' },
          { key: 'Esperanzas', text: 'E(Y|Ayudante)=β₀; E(Y|JTP)=β₀+δ₁; E(Y|Prof)=β₀+δ₂.' }
        ] },
        { type: 'p', id: 'c05-s03-p02', html: 'Cada coeficiente se lee contra la base, no contra el otro coeficiente. δ<sub>1</sub> es la diferencia entre JTP y Ayudante; δ<sub>2</sub>, entre Profesor y Ayudante. La diferencia entre Profesor y JTP es δ<sub>2</sub>−δ<sub>1</sub>, y su error estándar no es la resta de los errores estándar: hay que calcularla con la covarianza. En el modelo del laboratorio, un JTP gana 14.560 más que un Ayudante y un Profesor, 49.160 más, manteniendo lo demás constante. Si se toma Profesor como base, el intercepto pasa a ser el nivel de Profesor y los coeficientes de Ayudante y JTP se vuelven negativos; el ajuste no cambia. En R se hace con <code>factor(rango, levels = c("Prof", "JTP", "Ayudante"))</code> dentro del modelo o con <code>base$rango &lt;- relevel(base$rango, ref = "Prof")</code>.' },
        { type: 'callout', variant: 'ochre', label: 'La trampa de la dummy', html: 'Si además del intercepto se incluyen las tres dummies (Ayudante, JTP y Profesor), las tres suman 1 en cada fila, que es exactamente la columna del intercepto. Hay colinealidad perfecta y X′X no se puede invertir. R detecta el problema y elimina una categoría, o devuelve NA. La solución no es “sacar el intercepto” sin pensar: un modelo sin constante y con las k dummies es válido, pero cada coeficiente pasa a ser la media del grupo, no una diferencia, y el R<sup>2</sup> que reporta R es no centrado. Esa es la <span class="concept" data-concept="trampa-dummy" tabindex="0" role="button">trampa de la dummy</span>.' },
        { type: 'p', id: 'c05-s03-p03', html: 'No todas las dummies son categorías de la misma variable. Supongamos D<sub>1</sub> = 1 si trabaja en relación de dependencia y D<sub>2</sub> = 1 si trabaja en una empresa pequeña. El modelo Y = β<sub>0</sub> + δ<sub>1</sub>D<sub>1</sub> + δ<sub>2</sub>D<sub>2</sub> + u permite cuatro combinaciones, pero impone que el efecto de D<sub>1</sub> sea el mismo en empresas grandes y chicas: no hay interacción. Las cuatro esperanzas son β<sub>0</sub>, β<sub>0</sub>+δ<sub>1</sub>, β<sub>0</sub>+δ<sub>2</sub> y β<sub>0</sub>+δ<sub>1</sub>+δ<sub>2</sub>. Si se quisiera que el efecto de D<sub>1</sub> dependa de D<sub>2</sub>, habría que agregar D<sub>1</sub>·D<sub>2</sub>, que es el tema de la sección 5.' },
        { type: 'p', id: 'c05-s03-p04', html: 'Una variable ordinal no se trata como continua. Si el nivel educativo tiene cuatro categorías (secundario incompleto, secundario completo, superior incompleto y superior completo), usarla como 1, 2, 3, 4 impone que cada salto tiene el mismo efecto. Eso es el modelo de efecto parcial constante, y es contrastable: con tres dummies, H<sub>0</sub>: δ<sub>2</sub> = 2δ<sub>1</sub> y δ<sub>3</sub> = 3δ<sub>1</sub>. Son dos restricciones, q = 2, y se contrastan con un F que compara la SCR restringida con la del modelo con dummies. Si se rechaza, hay que quedarse con las dummies; si no se rechaza, la versión numérica es una simplificación aceptable.' },
        { type: 'errorTable', rows: [
          { error: 'Con tres categorías hay que poner tres dummies.', why: 'Con intercepto, la tercera es combinación lineal de las otras dos y de la constante.', fix: 'k−1 dummies con constante; k solo sin constante, y cambia la lectura.' },
          { error: 'δ₁ y δ₂ se comparan entre sí.', why: 'Ambos se comparan contra la categoría base.', fix: 'Para comparar JTP con Profesor, calculá δ₂−δ₁ y su error estándar con la covarianza.' },
          { error: 'Cambiar la base cambia el ajuste.', why: 'Solo cambia la parametrización; los valores ajustados y el R² son los mismos.', fix: 'Compará predicciones, no coeficientes con bases distintas.' },
          { error: 'El nivel educativo ordinal se puede usar como 1, 2, 3, 4.', why: 'Impone saltos iguales; el efecto parcial constante es una hipótesis contrastable.', fix: 'Contrastá δ₂=2δ₁ y δ₃=3δ₁, o usá dummies.' }
        ] },
        { type: 'miniCheck', id: 'c05-check-03', question: 'Tenés cuatro regiones y querés un modelo con intercepto. ¿Cuántas dummies incluís y qué pasa si ponés las cuatro?', intro: 'Contá la columna que suma uno.', answer: 'Tres. Con intercepto, la cuarta categoría queda como base y su efecto está en β<sub>0</sub>. Si ponés las cuatro, la suma de las dummies es 1 en cada fila, igual que la columna del intercepto: hay colinealidad perfecta y el modelo no se estima. R suele eliminar una y reportar NA. Si sacás el intercepto, podés incluir las cuatro, pero cada coeficiente es la media de su región, no una diferencia contra una base, y el R<sup>2</sup> deja de ser comparable.' }
      ]
    },
    {
      id: 'c05-s04',
      number: '04',
      title: 'Dummy y variable continua: interceptos y pendientes distintas',
      blocks: [
        { type: 'p', id: 'c05-s04-p01', html: 'Ahora el salario depende de los años de educación y del sexo, con D=1 para Mujer. Hay dos preguntas distintas. La primera: ¿la recta de las mujeres está desplazada respecto de la de los hombres, con la misma pendiente? La segunda: ¿el retorno de la educación difiere entre grupos? La primera se responde con una dummy sola; la segunda, con una <span class="concept" data-concept="interaccion" tabindex="0" role="button">interacción</span>. En la bibliografía, el primer caso se llama regresión concurrente; el segundo, regresión no similar.' },
        { type: 'compare', left: { tag: 'Rectas paralelas · concurrentes', title: 'Mismo retorno, distinto nivel', text: 'La dummy desplaza el intercepto. La brecha es la misma en todos los niveles de X.', eq: 'Y = β<sub>0</sub> + δ<sub>0</sub>D + β<sub>1</sub>X' }, right: { tag: 'Rectas no paralelas · no similares', title: 'Distinto nivel y distinto retorno', text: 'La interacción cambia la pendiente. La brecha depende del valor de X.', eq: 'Y = β<sub>0</sub> + δ<sub>0</sub>D + β<sub>1</sub>X + δ<sub>1</sub>D·X' } },
        { type: 'formula', main: 'Y<sub>i</sub> = β<sub>0</sub> + δ<sub>0</sub>D<sub>i</sub> + β<sub>1</sub>X<sub>i</sub> + δ<sub>1</sub>D<sub>i</sub>X<sub>i</sub> + u<sub>i</sub>', legend: [
          { key: 'D = 0 (Hombre)', text: 'E(Y|D=0,X) = β₀ + β₁X.' },
          { key: 'D = 1 (Mujer)', text: 'E(Y|D=1,X) = (β₀+δ₀) + (β₁+δ₁)X.' },
          { key: 'δ₀', text: 'Diferencia entre grupos cuando X = 0.' },
          { key: 'δ₁', text: 'Diferencia de pendientes: (β₁+δ₁) − β₁.' },
          { key: 'Brecha', text: 'En un X cualquiera: δ₀ + δ₁X.' }
        ] },
        { type: 'p', id: 'c05-s04-p02', html: 'El coeficiente δ<sub>0</sub> ya no es “la brecha”. Es la diferencia entre grupos cuando X = 0. Si X son años de educación o de antigüedad, X = 0 puede estar en el borde de la muestra o directamente fuera de ella. En el segundo caso, δ<sub>0</sub> es una extrapolación; en el primero, es una celda extrema que no representa al grupo típico. La brecha en un valor X es δ<sub>0</sub>+δ<sub>1</sub>X. La pendiente de las mujeres es β<sub>1</sub>+δ<sub>1</sub>; la de los hombres, β<sub>1</sub>. δ<sub>1</sub> mide cuánto cambia el retorno de X por pertenecer al grupo D=1.' },
        { type: 'callout', variant: 'teal', label: 'Los efectos principales se quedan, aunque no sean significativos', html: 'En un modelo con interacción, D y X son efectos principales. Si se elimina D cuando su t es bajo, se impone que la brecha en X = 0 es cero, algo que la teoría no justifica. Si se elimina X, se impone que la pendiente base es cero. La jerarquía no es una convención de estilo: cambiar el modelo cambia lo que se estima. Además, D y D·X están muy correlacionados, así que los errores estándar de ambos crecen. Es el precio de estimar dos rectas en lugar de una.' },
        { type: 'p', id: 'c05-s04-p03', html: 'Cuando la interacción es significativa, el modelo describe dos rectas. Cuando no lo es, no se concluye que las rectas son iguales: se concluye que no hay evidencia suficiente de pendientes distintas. La brecha de nivel puede seguir ahí. En el laboratorio, la interacción entre sexo y antigüedad tiene un t de 0,14: no hay evidencia de que la pendiente de antigüedad difiera por sexo. El coeficiente de Mujer en ese modelo, −5.497, es la brecha estimada a antigüedad cero, no la brecha promedio.' },
        { type: 'errorTable', rows: [
          { error: 'δ₀ es la brecha entre grupos.', why: 'Con interacción, la brecha es δ₀+δ₁X y depende de X.', fix: 'Elegí un X relevante y calculá la brecha ahí.' },
          { error: 'La interacción no significativa prueba que no hay diferencias.', why: 'Solo indica que no se detecta una diferencia de pendientes; el nivel puede diferir.', fix: 'Mirá el coeficiente de la dummy y su intervalo.' },
          { error: 'Se puede sacar la dummy si no es significativa.', why: 'La interacción depende de ella; sacarla cambia el significado de δ₁ e impone una restricción.', fix: 'Mantené los efectos principales.' },
          { error: 'Un δ₁ grande es un efecto grande.', why: 'δ₁ es un cambio de pendiente; su magnitud depende de las unidades de X.', fix: 'Traducilo a la diferencia de pendientes y evaluá en un rango de X.' }
        ] },
        { type: 'miniCheck', id: 'c05-check-04', question: 'En Y = β₀ + δ₀D + β₁X + δ₁D·X, δ̂₀ = −5.000, δ̂₁ = 200 y X se mide en años. ¿Cuál es la brecha en X=10? ¿Y en X=0?', intro: 'La brecha no es un coeficiente aislado.', answer: 'En X=10, la brecha es −5.000 + 200×10 = −3.000. En X=0 es −5.000. El coeficiente δ̂₀ solo coincide con la brecha cuando X=0; si ese valor no está en la muestra, es una extrapolación. La pendiente del grupo D=1 es β₁+200 y la del grupo D=0 es β₁; δ₁ mide la diferencia de pendientes, no la brecha.' }
      ]
    },
    {
      id: 'c05-s05',
      number: '05',
      title: 'Interacciones entre dummies y regresión por tramos',
      blocks: [
        { type: 'p', id: 'c05-s05-p01', html: '¿Ser profesional paga lo mismo para hombres que para mujeres? Ahora las dos variables explicativas son dummies: M=1 si es hombre, P=1 si es profesional. El modelo con los dos efectos principales y su producto permite cuatro medias y una pregunta nueva: si el premio por ser profesional difiere por sexo.' },
        { type: 'formula', main: 'Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>M<sub>i</sub> + β<sub>2</sub>P<sub>i</sub> + β<sub>3</sub>M<sub>i</sub>P<sub>i</sub> + u<sub>i</sub>', legend: [
          { key: 'M=0, P=0', text: 'E(Y) = β₀: mujer no profesional, la celda base.' },
          { key: 'M=1, P=0', text: 'E(Y) = β₀ + β₁.' },
          { key: 'M=0, P=1', text: 'E(Y) = β₀ + β₂.' },
          { key: 'M=1, P=1', text: 'E(Y) = β₀ + β₁ + β₂ + β₃.' },
          { key: 'β₃', text: 'Diferencia de diferencias: cuánto se aparta el premio profesional de los hombres del de las mujeres.' }
        ] },
        { type: 'p', id: 'c05-s05-p02', html: 'Cada efecto principal se lee en la categoría de la otra dummy igual a cero. β<sub>1</sub> es la diferencia hombre−mujer entre no profesionales. β<sub>2</sub> es la diferencia profesional−no profesional entre mujeres. β<sub>3</sub> es la interacción: (E[Y|M=1,P=1] − E[Y|M=0,P=1]) − (E[Y|M=1,P=0] − E[Y|M=0,P=0]). Si β<sub>3</sub>=0, el efecto de P no depende de M. Ejemplo ilustrativo, no una estimación: con medias 100 (mujer no profesional), 110 (hombre no profesional), 130 (mujer profesional) y 150 (hombre profesional), β<sub>1</sub>=10, β<sub>2</sub>=30 y β<sub>3</sub>=10. El título se asocia con +30 para las mujeres y +40 para los hombres; la diferencia de diferencias es 10. Sin interacción, el modelo impondría un premio común, un promedio ponderado de 30 y 40.' },
        { type: 'callout', variant: 'ochre', label: 'Efectos principales, no efectos generales', html: 'En un modelo con interacción, el coeficiente de M no es “el efecto de ser hombre” para toda la población: es el efecto entre quienes tienen P=0. Del mismo modo, el de P es el efecto entre quienes tienen M=0. Si se reporta un solo número como “la brecha”, hay que decir en qué celda se evalúa. Y, como en toda interacción, los efectos principales se estiman con menos precisión porque M, P y M·P están correlacionados.' },
        { type: 'p', id: 'c05-s05-p03', html: 'La misma lógica sirve para una función que cambia de pendiente en un punto. Una empresa paga comisiones por ventas y, por encima de X* = 5.500, la comisión marginal sube. El modelo no parte la muestra: introduce una dummy D=1 si X &gt; X* y deja que la pendiente cambie en ese punto. Es una regresión por tramos.' },
        { type: 'formula', main: 'Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub> + β<sub>2</sub>(X<sub>i</sub> − X<sup>*</sup>)D<sub>i</sub> + u<sub>i</sub>', legend: [
          { key: 'D = 0', text: 'E(Y|X,D=0) = β₀ + β₁X.' },
          { key: 'D = 1', text: 'E(Y|X,D=1) = (β₀ − β₂X*) + (β₁+β₂)X.' },
          { key: 'β₁', text: 'Pendiente antes de X*.' },
          { key: 'β₁+β₂', text: 'Pendiente después de X*. β₂ es el cambio de pendiente, no la pendiente nueva.' },
          { key: 'Continuidad', text: 'En X* las dos rectas valen β₀ + β₁X*. El modelo se une por construcción.' }
        ] },
        { type: 'p', id: 'c05-s05-p04', html: 'Con los diez pares del Ej. 7 del TP 8 (facturación de 1.000 a 10.000 y comisiones), la estimación da β̂<sub>1</sub> = 0,2791 (ee 0,0460) y β̂<sub>2</sub> = 0,0945 (ee 0,0826; t = 1,145; p = 0,290). La pendiente estimada pasa de 0,279 a 0,374 por peso facturado, pero con diez observaciones no se rechaza que sea la misma. El punto estimado sugiere el cambio que sospecha el gerente; la evidencia estadística no alcanza para afirmarlo. Un coeficiente con el signo esperado no reemplaza al contraste. Si se quisiera permitir un salto además del cambio de pendiente, se agrega δ<sub>0</sub>D y se contrasta δ<sub>0</sub>=0: esa es la diferencia entre un quiebre de pendiente y un quiebre con salto.' },
        { type: 'miniCheck', id: 'c05-check-05', question: 'En el modelo por tramos, ¿qué mide β₂ y qué habría que agregar para permitir un salto en X*?', intro: 'Distingüí pendiente nueva, cambio de pendiente y cambio de nivel.', answer: 'β<sub>2</sub> mide el cambio de pendiente: la pendiente pasa de β<sub>1</sub> a β<sub>1</sub>+β<sub>2</sub>. No es la pendiente del tramo alto ni el nivel de la comisión en X*. El modelo es continuo por construcción: en X* las dos rectas coinciden. Para permitir un salto se agrega δ<sub>0</sub>D, donde D=1 si X &gt; X*, y se contrasta H<sub>0</sub>: δ<sub>0</sub>=0. Si δ<sub>0</sub>≠0, hay un cambio de nivel además del cambio de pendiente.' }
      ]
    },
    {
      id: 'c05-s06',
      number: '06',
      title: 'Dummies cuando Y está en logaritmos',
      blocks: [
        { type: 'p', id: 'c05-s06-p01', html: 'Cuando Y está en logaritmos, el coeficiente de una <span class="concept" data-concept="log-dummy" tabindex="0" role="button">dummy en log</span> se lee como una diferencia porcentual. Es la misma idea de la clase 4 aplicada a un regresor binario: pasar de D=0 a D=1 cambia log Y en δ<sub>0</sub>, y un cambio en log Y multiplicado por 100 es, aproximadamente, un cambio porcentual.' },
        { type: 'formula', main: 'log Y<sub>i</sub> = β<sub>0</sub> + δ<sub>0</sub>D<sub>i</sub> + … + u<sub>i</sub><br>Δ% aproximado = 100·δ<sub>0</sub> &nbsp;·&nbsp; Δ% exacto = 100(e<sup>δ<sub>0</sub></sup> − 1)', legend: [
          { key: 'δ₀', text: 'Diferencia en log puntos entre el grupo D=1 y la base.' },
          { key: 'Aproximación', text: 'Buena si |δ₀| es chico, por ejemplo menor que 0,1.' },
          { key: 'Exacta', text: 'Siempre válida; obligatoria si el coeficiente es grande.' },
          { key: 'Signo', text: 'δ₀ negativo: el grupo D=1 tiene menor Y en términos porcentuales.' }
        ] },
        { type: 'p', id: 'c05-s06-p02', html: 'En el laboratorio, el modelo log(salario) con genero, rango, univ y antig estima δ̂ = −0,0455 para Mujer, con ee 0,0310, t = −1,467 y p = 0,143. La aproximación dice 4,55% menos; el cálculo exacto, 100(e<sup>−0,0455</sup>−1) = −4,45%. La diferencia es chica porque el coeficiente es chico. El intervalo del coeficiente, [−0,1065; 0,0155], traducido a porcentajes exactos, va de −10,1% a +1,6%: contiene el cero y llega a una brecha de dos dígitos. El coeficiente es una diferencia porcentual entre grupos, no una elasticidad: una elasticidad es el cambio porcentual de Y ante un cambio porcentual de X, y acá X es una dummy que pasa de 0 a 1. Y no es 0,0455%: si δ̂ = −0,0455, la caída es de 4,45% exactos.' },
        { type: 'cards', items: [
          { sym: '|δ| &lt; 0,1', title: 'Aproximación razonable', text: '100δ y 100(e^δ−1) difieren en menos de medio punto. Ejemplo: δ=−0,0455 → −4,55% y −4,45%.' },
          { sym: 'δ = 0,30', title: 'La brecha se agranda', text: '100δ = 30%, pero el exacto es 34,99%. Con coeficientes grandes, la aproximación subestima.' },
          { sym: 'δ = −0,50', title: 'Cuidado con el signo', text: '100δ = −50%; el exacto es −39,35%. La caída no es la mitad: es 39,35%.' }
        ] },
        { type: 'callout', variant: 'ochre', label: 'Si además querés predecir Y en niveles', html: 'La diferencia porcentual exacta se obtiene con 100(e<sup>δ̂</sup>−1). Pero exp(log Y) no es E(Y): la exponencial de una media no es la media de la exponencial. Para predecir el nivel de Y hay que corregir por la varianza residual, con el factor de retransformación. Esa corrección es un tema de predicción, no del coeficiente de la dummy, pero no la omitas si el objetivo es estimar un salario medio en pesos.' },
        { type: 'errorTable', rows: [
          { error: 'δ̂ = −0,0455 significa −0,0455%.', why: 'El coeficiente está en log puntos; para porcentaje se multiplica por 100.', fix: 'Decí −4,55% aproximado o −4,45% exacto.' },
          { error: 'El coeficiente es una elasticidad.', why: 'La dummy no varía porcentualmente: pasa de 0 a 1.', fix: 'Hablá de diferencia porcentual entre grupos.' },
          { error: 'Alcanza con la aproximación para cualquier coeficiente.', why: 'Para |δ| grande, 100δ se aleja del exacto.', fix: 'Usá 100(e^δ−1), sobre todo si |δ| &gt; 0,1.' },
          { error: 'El R² del modelo log se compara con el del modelo en niveles.', why: 'La Y es distinta: log(salario) frente a salario.', fix: 'Compará R² solo con la misma transformación; para elegir, mirá la pregunta y el diagnóstico.' }
        ] },
        { type: 'miniCheck', id: 'c05-check-06', question: 'Un modelo log Y da δ̂ = 0,25 para una dummy. ¿Cómo reportás la diferencia?', intro: 'Calculá la aproximación y el exacto.', answer: 'La aproximación es 25%; la exacta es 100(e<sup>0,25</sup>−1) = 28,40%. Con un coeficiente de ese tamaño conviene reportar el exacto y aclarar que es una diferencia porcentual entre el grupo D=1 y el grupo base, no una elasticidad. Si el signo fuera negativo, δ̂ = −0,25, la caída exacta sería −22,12%, no −25%.' },
        { type: 'p', id: 'c05-s06-p03', html: 'El modelo en niveles y el modelo en logaritmos no se comparan por R<sup>2</sup> ni por AIC: la variable dependiente es otra. En el laboratorio, el R<sup>2</sup> del modelo log es 0,5213 y el del modelo en niveles con los mismos regresores, 0,4478. Esa diferencia no dice que el logarítmico “explique más”: mide variación de log(salario), no de salario. Para elegir, la pregunta económica manda: si interesa una diferencia porcentual, el log es natural; si interesa un monto en unidades, el nivel.' }
      ]
    },
    {
      id: 'c05-s07',
      number: '07',
      title: 'Evaluación de políticas, Chow y mapa de decisión',
      blocks: [
        { type: 'p', id: 'c05-s07-p01', html: 'Un programa de capacitación, una beca, una obra social: la dummy de participación parece el caso más simple de la clase. Se estima Y = β<sub>0</sub> + δ<sub>0</sub>P + u y δ<sub>0</sub> es la diferencia media entre participantes y no participantes. El problema es que P no se asigna al azar. Los participantes eligen o cumplen condiciones, y esas razones suelen estar en el error. Es el problema de la <span class="concept" data-concept="evaluacion-politicas" tabindex="0" role="button">evaluación de políticas</span>.' },
        { type: 'p', id: 'c05-s07-p02', html: 'Si la participación depende de factores que también afectan Y y no están en el modelo, E(u|P=1) ≠ E(u|P=0). Entonces el estimador converge a δ<sub>0</sub> más esa diferencia de errores medios: plim δ̂<sub>0</sub> = δ<sub>0</sub> + [E(u|P=1) − E(u|P=0)]. El sesgo de selección no se arregla con más observaciones. Agregar variables observables que expliquen la participación puede reducirlo, si la selección opera por esas variables; si depende de no observables, hacen falta otros diseños: diferencias en diferencias, variables instrumentales o asignación aleatoria. Eso se desarrolla en las clases 9 y 10.' },
        { type: 'p', id: 'c05-s07-p03', html: 'La <span class="concept" data-concept="chow" tabindex="0" role="button">prueba de Chow</span> ataca otra pregunta: ¿dos grupos siguen la misma función de regresión? Es el contraste conjunto de que el intercepto y todas las pendientes son iguales. Se puede escribir como un modelo con una dummy y todas las interacciones con las X, y contrastar que todos los términos con D son cero. La versión clásica compara la SCR del modelo restringido con la suma de las SCR de dos regresiones separadas.' },
        { type: 'formula', main: 'F = [(SCR<sub>R</sub> − (SCR<sub>1</sub> + SCR<sub>2</sub>)) / (k+1)] / [(SCR<sub>1</sub> + SCR<sub>2</sub>) / (n − 2k − 2)] ~ F<sub>k+1, n−2k−2</sub>', legend: [
          { key: 'SCR_R', text: 'Modelo restringido: una sola función para los dos grupos, con k+1 parámetros.' },
          { key: 'SCR₁, SCR₂', text: 'Regresiones separadas, una por grupo. La SCR no restringida es su suma.' },
          { key: 'k', text: 'Cantidad de pendientes. Las restricciones son k+1: el intercepto y cada pendiente.' },
          { key: 'H₀', text: 'Misma función de regresión: δ₀ = δ₁ = … = δ<sub>k</sub> = 0.' }
        ] },
        { type: 'callout', variant: 'ochre', label: 'Qué requiere y qué no dice Chow', html: 'Es un contraste F, así que supone homocedasticidad e independencia; si las varianzas difieren, conviene una versión robusta. Su H<sub>0</sub> es muy fuerte: no permite ninguna diferencia, ni en el intercepto ni en una pendiente. Rechazar no dice cuál coeficiente cambió. Y no rechazar no prueba que las funciones sean iguales: con grupos chicos o muestras chicas, la potencia puede ser baja. En series de tiempo se usa para estabilidad entre períodos, por ejemplo convertibilidad y post-convertibilidad.' },
        { type: 'map', steps: [
          { n: '1', title: '¿Categórica o numérica?', text: 'Si la categoría no tiene distancia económica, dummy. Si es ordinal con muchos valores, evaluá dummies o la versión numérica con contraste.' },
          { n: '2', title: '¿Cuántas categorías?', text: 'k−1 dummies con intercepto. k solo si sacás la constante, y cambia la lectura.' },
          { n: '3', title: '¿Cuál es la base?', text: 'La más frecuente o la de referencia sustantiva. Declarala y no la cambies al comparar.' },
          { n: '4', title: '¿Solo nivel o también pendiente?', text: 'Dummy sola para interceptos distintos; dummy×X si la teoría dice que el retorno difiere.' },
          { n: '5', title: '¿Interactúa con otra dummy?', text: 'Celdas 2×2: los efectos principales son condicionales, la interacción es diferencia de diferencias.' },
          { n: '6', title: '¿Hay un quiebre en X*?', text: 'Tramos con (X−X*)D; agregá D si querés permitir un salto de nivel.' },
          { n: '7', title: '¿Y en log?', text: 'Diferencia porcentual; usá la fórmula exacta si el coeficiente es grande.' },
          { n: '8', title: '¿Es política o comparación de grupos?', text: 'Separá asociación de causalidad; Chow para estabilidad y cuidado con la selección.' }
        ] },
        { type: 'miniCheck', id: 'c05-check-07', question: 'Chow rechaza con F(4, 200) = 3,1. ¿Qué podés concluir?', intro: 'Separá la hipótesis conjunta de los contrastes individuales.', answer: 'Que hay evidencia de que las dos funciones de regresión no son iguales: al menos uno de los coeficientes —el intercepto o alguna pendiente— difiere entre grupos. No podés concluir cuál. Para eso hay que mirar los contrastes individuales del modelo con interacciones o repetir Chow restringiendo algunas pendientes. Tampoco podés concluir que la diferencia sea económicamente grande: el F depende de n y de la escala.' },
        { type: 'sourceStrip', chips: [
          { label: 'Clase 5', text: 'diap. 3–28' },
          { label: 'Wooldridge 4ed', text: 'Cap. 7, §7.1–7.6' },
          { label: 'TP 8', text: 'act. 1–2; ej. 1–8' },
          { label: 'Parciales', text: '1P 2024–2025; 2P 2024' }
        ] }
      ]
    },
    {
      id: 'c05-s08',
      number: '08',
      title: 'Profundización: lo que suele quedar en el aire',
      blocks: [
        { type: 'cards', items: [
          { sym: 'Y 0/1', title: 'Dummy al lado izquierdo', text: 'El modelo de probabilidad lineal estima una diferencia de probabilidades, no de pesos.' },
          { sym: 'F', title: 'El bloque, no el t suelto', text: 'Que una categoría importe se contrasta con q restricciones conjuntas.' },
          { sym: 'k₁×k₂', title: 'Interacciones completas', text: 'Con dos factores, el número de productos es (k₁−1)(k₂−1), no el producto de todas las dummies.' },
          { sym: 'Control', title: 'Confundir con mediar', text: 'Si la variable está en el camino entre el grupo y Y, controlarla cambia la pregunta.' }
        ] },
        { type: 'p', id: 'c05-s08-p02', html: 'La primera idea queda abierta desde la diapositiva 3: qué cambia si lo que se quiere modelar es si el hogar gasta o no en salud. Cuando Y es binaria, el mismo MCO se usa como <strong>modelo de probabilidad lineal</strong>. El coeficiente de la dummy deja de ser una diferencia de gasto y pasa a ser una diferencia de probabilidad. Si δ̂ = 0,08, el grupo D=1 tiene 8 puntos porcentuales más de probabilidad de gastar, siempre que el resto esté constante. Dos consecuencias prácticas: la varianza del error depende de las X, así que conviene reportar errores robustos; y la predicción lineal puede caer fuera de [0,1], sobre todo en los extremos. Eso no lo invalida como descripción, pero impide presentar probabilidades imposibles como si fueran válidas. Los modelos logit y probit resuelven el problema de forma no lineal y se ven en otro curso.' },
        { type: 'p', id: 'c05-s08-p03', html: 'Segundo punto. Con k categorías, la pregunta “¿la región importa?” no se responde mirando si cada δ es significativa por separado. Los t individuales dependen de la base y de la correlación entre dummies; un bloque puede explicar en conjunto y no tener ningún coeficiente significativo por separado. El contraste correcto es H<sub>0</sub>: δ<sub>1</sub> = … = δ<sub>k−1</sub> = 0, con un F de q = k−1 restricciones que compara la SCR del modelo sin el bloque con la del modelo completo. Es el mismo formato de Chow, aplicado a un solo factor. Y hay dos preguntas distintas: el F dice si el factor importa; para saber qué categoría difiere hay que mirar los contrastes individuales o las diferencias entre coeficientes con su error estándar.' },
        { type: 'formula', main: 'F = [(SCR<sub>R</sub> − SCR<sub>NR</sub>)/q] / [SCR<sub>NR</sub>/(n − p)] ~ F<sub>q, n−p</sub>', legend: [
          { key: 'q', text: 'Restricciones contrastadas: k−1 para un factor de k categorías.' },
          { key: 'SCR<sub>R</sub>', text: 'Modelo restringido, sin el bloque de dummies.' },
          { key: 'SCR<sub>NR</sub>', text: 'Modelo completo, con las k−1 dummies y el resto de los regresores.' },
          { key: 'p', text: 'Cantidad de parámetros del modelo no restringido, incluida la constante.' },
          { key: 'Lectura', text: 'Rechazar dice que el factor importa en conjunto; no dice qué categoría difiere.' }
        ] },
        { type: 'p', id: 'c05-s08-p04', html: 'Tercer punto, sobre interacciones. La clase trabaja el caso 2×2, donde hay un solo producto y cuatro celdas. Con dos factores de k<sub>1</sub> y k<sub>2</sub> niveles, el modelo saturado tiene k<sub>1</sub>·k<sub>2</sub> celdas y necesita (k<sub>1</sub>−1)(k<sub>2</sub>−1) interacciones, además de los efectos principales. Por ejemplo, rango con tres niveles y sexo con dos: seis medias y dos productos. Si se multiplican todas las dummies entre sí, se agregan términos redundantes y aparece colinealidad. La regla práctica es elegir qué comparaciones responden a la pregunta y contrastar ese bloque; no interactuar todo con todo. Además, cuando hay interacción, cada efecto principal se lee en el nivel base del otro factor, no como un efecto promedio.' },
        { type: 'callout', variant: 'ochre', label: 'Controlar no siempre es aclarar', html: 'Agregar rango y universidad reduce la brecha de 14.088 a 4.771. ¿Eso es bueno? Depende del diagrama causal. Si rango y universidad son factores que confunden —están asociados al sexo y también afectan el salario—, controlarlos acerca a una comparación válida. Si son canales por los que opera una desventaja —las mujeres acceden menos a las categorías altas—, controlarlos borra parte del fenómeno que se quiere medir. La misma dummy puede ser tratamiento en un modelo y control en otro. Antes de agregar una variable, preguntate si está antes o después de la categoría que estás comparando. La fórmula del sesgo por omisión de la clase 2 ayuda a ver cuánto se mueve el coeficiente, pero no decide qué se quiere estimar: eso lo decide la pregunta. En el parcial, esta discusión aparece cuando piden interpretar una brecha y justificar por qué se incluyó cada control.' },
        { type: 'miniCheck', id: 'c05-check-09', question: 'Un modelo de probabilidad lineal para la decisión de gastar en salud da δ̂ = 0,08 para tener obra social, con un intervalo de [0,02; 0,14]. ¿Cómo lo interpretás y qué advertís?', intro: 'Volvé a la primera idea: es una Y binaria, no un gasto en pesos.', answer: 'El coeficiente es una diferencia de probabilidades: los hogares con obra social tienen 8 puntos porcentuales más de probabilidad de gastar en salud, con un intervalo de 2 a 14 puntos. No es un 8% más de gasto ni un efecto causal, salvo que la obra social sea exógena, algo poco plausible. Además, el modelo lineal puede predecir probabilidades fuera de [0,1], y la varianza del error cambia con las X, así que conviene usar errores robustos. Para reportar probabilidades válidas o efectos marginales haría falta un modelo no lineal.' }
      ]
    }
  ],
  concepts: {
    dummy: {
      title: 'Variable ficticia',
      sub: 'Una categoría convertida en 0 y 1.',
      simple: `<p>Pensá en una planilla donde cada persona tiene una columna que dice “con obra social” o “sin obra social”. Para que la regresión la entienda, la convertís en 1 y 0. Es una etiqueta de pertenencia: no dice cuánto vale la persona, solo a qué grupo pertenece.</p><p>Cuando mirás el coeficiente, estás comparando el grupo del 1 contra el del 0. Por eso, antes de interpretarlo, necesitás saber cuál es el grupo del 0.</p>`,
      viz: "dummy-groups",
      vizIntro: "Movés la brecha condicional y la diferencia de experiencia entre grupos. Mirá cómo la diferencia bruta se separa de la que queda al comparar grupos con la misma X.",
      vizHint: "La brecha bruta mezcla el coeficiente de la dummy con la composición de los grupos. Cambiar la base invierte el signo, no el tamaño.",
      esencia: `
        <div class="definition">Una variable ficticia (dummy) es binaria: vale 1 si la observación pertenece a una categoría y 0 si no. No mide una cantidad; identifica pertenencia. Cuando entra sola, su coeficiente se interpreta como una diferencia respecto de la categoría base.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El 0 y el 1 son etiquetas. Cualquier codificación binaria produce el mismo ajuste; cambia la lectura, no el modelo.</li>
          <li>Con una dummy sola, el coeficiente es una diferencia de medias. Con más regresores, es una diferencia condicional.</li>
          <li>Una dummy puede desplazar el intercepto, cambiar una pendiente o interactuar con otra dummy.</li>
        </ul>
        <div class="formula small">D<sub>i</sub> ∈ {0, 1} &nbsp;·&nbsp; Y<sub>i</sub> = β<sub>0</sub> + δ<sub>0</sub>D<sub>i</sub> + u<sub>i</sub><span>δ<sub>0</sub> = E(Y|D=1) − E(Y|D=0)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: identificar la categoría base</span><span class="badge optional">Según el caso: nivel, pendiente o interacción</span></div>
      `,
      ejemplo: `
        <p>En Profesores.rda, D=1 para Mujer y D=0 para Hombre. El modelo con solo sexo estima un intercepto de 115.090,4 y un coeficiente de −14.088 para Mujer: esas son exactamente las dos medias muestrales. El coeficiente no dice “cuánto vale ser mujer”; dice cuánto se diferencia el salario medio de las mujeres del de los hombres en esta muestra.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de interpretar, preguntate qué categoría tiene D=0 y qué otras variables están en el modelo. Sin esas dos respuestas, el número no significa nada.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer el 0 como “nada” o “cero peso”.</strong> El 0 identifica la categoría base, no una ausencia de la característica.</li>
          <li><strong>Tratar el coeficiente como causal.</strong> Es una diferencia condicional; el diseño observacional no garantiza un efecto.</li>
          <li><strong>Usar una dummy para una variable ordinal con muchos valores.</strong> Se pierden grados de libertad y no se aprovecha el orden; evaluá la versión numérica con contraste.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir cuál es el grupo base ni qué comparación hace el coeficiente.</p></div>
      `,
      conexiones: `
        <p>La dummy es la unidad mínima de la clase. Se conecta con la categoría base —sin ella el coeficiente no tiene referencia— y con la esperanza condicional, que es la forma correcta de leerlo. Cuando interactúa con una continua, aparece la diferencia de pendientes.</p>
        <div><button class="concept-chip" data-concept="categoria-base">Categoría base →</button><button class="concept-chip" data-concept="esperanza-condicional">Esperanza condicional →</button><button class="concept-chip" data-concept="interaccion">Interacción →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 4–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 8, Act. 1 y Ej. 1.</p></div>
      `
    },
    'categoria-base': {
      title: 'Categoría base',
      sub: 'El grupo contra el que se comparan todos los demás.',
      simple: `<p>Si te pregunto cuánto más alto es Pedro, la respuesta necesita un punto de comparación: más alto que Juan, que el promedio, que el curso. La categoría base es ese punto: el grupo que queda en cero y contra el que se miden los demás.</p><p>Si cambiás de referencia, los números cambian, pero las distancias entre los grupos siguen siendo las mismas. Es como mover el cero de una regla: cambia el número que leés, no la distancia entre dos marcas.</p>`,
      esencia: `
        <div class="definition">La categoría base es la que tiene todas las dummies iguales a cero. En el modelo sin otros regresores, su media es el intercepto; con más variables, el intercepto es la celda base evaluada en X = 0. Todos los coeficientes de las dummies se leen como diferencias respecto de ella.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La decide el analista; si no la fija, R toma el primer nivel del factor.</li>
          <li>Se cambia con <code>relevel()</code> o reordenando los niveles con <code>factor()</code>.</li>
          <li>Cambiarla no cambia el ajuste: en un modelo aditivo, cambian el intercepto y los coeficientes de esa categoría; los demás regresores conservan su coeficiente y su error estándar.</li>
        </ul>
        <div class="formula small">E(Y|base) = β<sub>0</sub> &nbsp;·&nbsp; δ<sub>j</sub> = E(Y|categoría j) − E(Y|base)<span>La base tiene todas las D = 0</span></div>
        <div class="badge-row"><span class="badge always">Siempre: declarar la base</span><span class="badge optional">Según el caso: base frecuente o base sustantiva</span></div>
      `,
      ejemplo: `
        <p>En el modelo de salario, con base Hombre el intercepto es 115.090,4 y el coeficiente de Mujer, −14.088. Con base Mujer, el intercepto es 101.002,4 y el coeficiente de Hombre, +14.088. Los valores ajustados son los mismos; la frase cambia de sujeto.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Elegí la base que hace más legible la pregunta: la categoría más frecuente, la que es política o económicamente relevante, o la que el examen pide comparar. Y escribila en el texto.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que la base “desaparece” del modelo.</strong> Su nivel está en el intercepto y su efecto sigue estimado.</li>
          <li><strong>Olvidar declararla.</strong> Un coeficiente sin base es un número sin comparación.</li>
          <li><strong>Comparar coeficientes de modelos con bases distintas.</strong> El mismo efecto puede aparecer con signo opuesto.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>Decís que “cambió el efecto” cuando solo cambiaste la categoría de referencia.</p></div>
      `,
      conexiones: `
        <p>La base es la contracara de la dummy y la clave para evitar la trampa: si hay k categorías y una constante, una tiene que quedar afuera. También ordena la lectura de las esperanzas condicionales.</p>
        <div><button class="concept-chip" data-concept="dummy">Variable ficticia →</button><button class="concept-chip" data-concept="trampa-dummy">Trampa de la dummy →</button><button class="concept-chip" data-concept="esperanza-condicional">Esperanza condicional →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 6–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 8, Act. 2 y Ej. 1e.</p></div>
      `
    },
    'trampa-dummy': {
      title: 'Trampa de la dummy',
      sub: 'Incluir todas las categorías y la constante a la vez.',
      simple: `<p>Imaginá que querés ubicar a alguien diciendo “está en el norte, en el sur y en el centro” al mismo tiempo. Si cada persona pertenece a una sola categoría, con decir cuál es alcanza: las otras dos etiquetas no agregan nada.</p><p>Agregar la tercera dummy además de la constante no suma información: repite la misma columna y el modelo no puede resolver el sistema. Por eso con tres categorías van dos dummies y una base.</p>`,
      esencia: `
        <div class="definition">Si se incluye una constante y una dummy por cada una de las k categorías, las dummies suman 1 en cada fila, igual que la columna del intercepto. Hay colinealidad perfecta y el modelo no se puede estimar por MCO.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Con constante van k−1 dummies; la categoría omitida es la base.</li>
          <li>R detecta la colinealidad y elimina una variable o devuelve NA; no es un problema de datos.</li>
          <li>El modelo sin constante y con las k dummies es válido, pero cada coeficiente es la media de su grupo y el R<sup>2</sup> es no centrado.</li>
        </ul>
        <div class="formula small">D<sub>1</sub> + D<sub>2</sub> + … + D<sub>k</sub> = 1<span>La suma replica la columna de unos del intercepto</span></div>
        <div class="badge-row"><span class="badge always">Siempre: k−1 con constante</span><span class="badge optional">Según el caso: k sin constante</span></div>
      `,
      ejemplo: `
        <p>Con rango y tres categorías, el modelo correcto tiene dos dummies y una constante. Si se agregan Ayudante, JTP y Profesor, las tres suman 1 en cada fila. R estima el modelo eliminando una o reporta NA en la tercera. El ajuste no mejora: la información era la misma.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si ves un NA en una dummy categórica, revisá si incluiste todas las categorías con constante. No lo arregles borrando filas ni cambiando la base al azar.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Poner k dummies y constante “para no perder información”.</strong> Es exactamente la colinealidad perfecta.</li>
          <li><strong>Sacar la constante sin advertir el cambio de lectura.</strong> Los coeficientes pasan a ser medias de grupo, no diferencias.</li>
          <li><strong>Confundir la trampa con cualquier par de dummies.</strong> Dos variables binarias independientes, como dependencia y tamaño de empresa, no suman 1 entre sí.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué la tercera dummy es redundante y no solo “menos precisa”.</p></div>
      `,
      conexiones: `
        <p>La trampa es el precio de olvidar la categoría base. Entenderla también aclara qué hace R cuando reordena factores y por qué el modelo sin constante se lee distinto.</p>
        <div><button class="concept-chip" data-concept="dummy">Variable ficticia →</button><button class="concept-chip" data-concept="categoria-base">Categoría base →</button><button class="concept-chip" data-concept="esperanza-condicional">Esperanza condicional →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 6.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 8, Act. 1b y Ej. 1d.</p></div>
      `
    },
    'esperanza-condicional': {
      title: 'Esperanza condicional',
      sub: 'La media de Y en cada celda del modelo.',
      simple: `<p>Imaginá que separás a los profesores en dos grupos y calculás el salario medio de cada uno. Esos dos promedios son las esperanzas condicionales: el promedio de Y dentro de cada celda, no el promedio general.</p><p>La regresión con dummies no hace otra cosa que poner esos promedios en una ecuación. Si no podés nombrar la celda de cada coeficiente, todavía no entendiste la salida.</p>`,
      viz: "dummy-groups",
      vizIntro: "Cada recta del gráfico es una esperanza condicional: la media de Y para un grupo, dado X. Cambiá la brecha y la composición y mirá las dos alturas.",
      vizHint: "El intercepto y el coeficiente de la dummy son las piezas que arman esas dos medias. No hay una media general escondida: hay una por celda.",
      esencia: `
        <div class="definition">E(Y|D=d) es el valor esperado de Y en la subpoblación que tiene D=d. Con una o varias dummies y sin otras variables, el modelo es un conjunto de medias condicionales: una por celda. Los coeficientes son diferencias entre esas medias.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El intercepto es la media del grupo base, no la media global.</li>
          <li>Cada coeficiente de una dummy es una resta de esperanzas condicionales.</li>
          <li>Con interacciones, la diferencia entre grupos depende de X: la esperanza condicional es una recta por grupo, no un único número.</li>
          <li>La igualdad entre el coeficiente y la diferencia de medias requiere E(u|D)=0.</li>
        </ul>
        <div class="formula small">E(Y|D=0) = β<sub>0</sub> &nbsp;·&nbsp; E(Y|D=1) = β<sub>0</sub> + δ<sub>0</sub><span>δ<sub>0</sub> = E(Y|D=1) − E(Y|D=0)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: escribir las celdas</span><span class="badge optional">Según el caso: una dummy, varias o interacción</span></div>
      `,
      ejemplo: `
        <p>En Profesores, E(salario|Hombre) = 115.090,4 y E(salario|Mujer) = 101.002,4. La diferencia es −14.088. Si se agrega rango, universidad y antigüedad, la esperanza condicional pasa a estar condicionada también a esas variables, y la diferencia se reduce a −4.771.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Escribí las esperanzas antes de mirar el output. Si no podés nombrar la celda de cada coeficiente, la interpretación va a ser incorrecta aunque el signo parezca razonable.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer el intercepto como la media de toda la muestra.</strong> Es la media de la celda base.</li>
          <li><strong>Confundir la media condicional con un contrafactual.</strong> E(Y|D=1) describe a quienes tienen D=1, no lo que les pasaría si tuvieran D=0.</li>
          <li><strong>Ignorar E(u|D)=0.</strong> Sin ese supuesto, el coeficiente es una diferencia descriptiva, no una esperanza condicional poblacional.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>Hablás de “el efecto de D” cuando solo tenés una diferencia entre dos medias.</p></div>
      `,
      conexiones: `
        <p>Las esperanzas condicionales son el puente entre el álgebra y la interpretación. Ordenan la lectura de la dummy, de la interacción y del sesgo de selección: en los tres casos la pregunta es qué media se compara con cuál.</p>
        <div><button class="concept-chip" data-concept="dummy">Variable ficticia →</button><button class="concept-chip" data-concept="interaccion">Interacción →</button><button class="concept-chip" data-concept="evaluacion-politicas">Evaluación de políticas →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 5–8.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 8, Act. 2 y Ej. 2b.</p></div>
      `
    },
    interaccion: {
      title: 'Interacción',
      sub: 'El efecto de una variable depende del valor de otra.',
      simple: `<p>Pensá en el precio del estacionamiento: quizás sube con cada hora, pero sube más rápido los fines de semana. La interacción es eso: el efecto de una cosa cambia según el contexto.</p><p>En vez de una sola pendiente para todos, el modelo te deja dibujar una pendiente distinta para cada grupo. La brecha entre grupos deja de ser un número fijo y pasa a depender de dónde estés parado.</p>`,
      viz: "interaction",
      vizIntro: "Movés la brecha base y la diferencia de pendientes. La recta de un grupo gira y la brecha deja de ser constante.",
      vizHint: "Con interacción, δ₀ es la brecha en X=0 y la brecha en otro X se calcula como δ₀+δ₁X. Las rectas solo son paralelas cuando δ₁=0.",
      esencia: `
        <div class="definition">Una interacción es el producto de dos regresores. Permite que el efecto de una variable cambie con el nivel de la otra: la pendiente de X difiere entre grupos, o el premio de una dummy difiere entre categorías.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Con D×X, δ<sub>0</sub> es la diferencia entre grupos en X=0 y δ<sub>1</sub> es la diferencia de pendientes. La brecha en un X cualquiera es δ<sub>0</sub>+δ<sub>1</sub>X.</li>
          <li>Con M×P, β<sub>3</sub> es una diferencia de diferencias: cuánto cambia el efecto de P según M.</li>
          <li>Los efectos principales se incluyen siempre, sean significativos o no. D y D·X están correlacionados y los errores estándar crecen.</li>
        </ul>
        <div class="formula small">Y = β<sub>0</sub> + δ<sub>0</sub>D + β<sub>1</sub>X + δ<sub>1</sub>D·X + u<span>∂Y/∂X = β<sub>1</sub> + δ<sub>1</sub>D &nbsp;·&nbsp; brecha = δ<sub>0</sub> + δ<sub>1</sub>X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: efectos principales</span><span class="badge optional">Según el caso: D×X o D×D</span></div>
      `,
      ejemplo: `
        <p>En el laboratorio, el modelo de salario en niveles con genero × antigüedad estima una interacción de 60,84 (ee 433,42; p = 0,888). Las pendientes son −90,2 para los hombres y −29,4 para las mujeres, pero la diferencia no es significativa. El coeficiente de Mujer, −5.497, es la brecha a antigüedad cero, no la brecha promedio.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si la interacción no es significativa, no concluyas que los grupos son iguales: concluí que no hay evidencia de pendientes distintas. La diferencia de nivel puede seguir estimada y su intervalo puede ser informativo.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Eliminar el efecto principal porque su t es bajo.</strong> La interacción cambia de significado y se impone una restricción no testeada.</li>
          <li><strong>Leer δ₀ como la brecha general.</strong> Solo es la brecha en X=0, que puede ser una extrapolación.</li>
          <li><strong>Confundir “interacción no significativa” con “grupos iguales”.</strong> Son hipótesis distintas: pendiente frente a nivel.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés calcular la brecha en un X concreto ni decir qué pendiente corresponde a cada grupo.</p></div>
      `,
      conexiones: `
        <p>La interacción es la herramienta que distingue rectas paralelas de rectas no paralelas. También es la forma de escribir Chow como un modelo único: todos los términos con D son interacciones o desplazamientos.</p>
        <div><button class="concept-chip" data-concept="dummy">Variable ficticia →</button><button class="concept-chip" data-concept="esperanza-condicional">Esperanza condicional →</button><button class="concept-chip" data-concept="chow">Prueba de Chow →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 15–20.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.3–7.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 8, Ej. 3 y Ej. 5.</p></div>
      `
    },
    'log-dummy': {
      title: 'Dummy en logaritmos',
      sub: 'Diferencia porcentual, no elasticidad.',
      simple: `<p>Si el salario está en logaritmos, el coeficiente de una dummy se parece a decir “gana 5% menos”, no “gana 5 pesos menos”. Es una comparación porcentual entre dos grupos.</p><p>La trampa es leerlo como elasticidad, cuando la dummy solo salta de 0 a 1. Y si el número es grande, la aproximación se queda corta: ahí conviene hacer la cuenta exacta.</p>`,
      esencia: `
        <div class="definition">En un modelo con log Y, el coeficiente de una dummy mide la diferencia en log Y entre el grupo D=1 y la base. Multiplicado por 100 es una diferencia porcentual aproximada; el valor exacto es 100(e<sup>δ</sup>−1).</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>No es una elasticidad: la dummy pasa de 0 a 1, no cambia porcentualmente.</li>
          <li>La aproximación 100δ es buena para coeficientes chicos; para coeficientes grandes hay que usar la exponencial.</li>
          <li>El R<sup>2</sup> y el AIC del modelo log no se comparan con los del modelo en niveles: la Y es otra.</li>
        </ul>
        <div class="formula small">log Y = β<sub>0</sub> + δ<sub>0</sub>D + … + u<span>Δ% ≈ 100δ<sub>0</sub> &nbsp;·&nbsp; Δ% exacto = 100(e<sup>δ<sub>0</sub></sup> − 1)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: aclarar que es porcentaje</span><span class="badge optional">Según el caso: aproximación o fórmula exacta</span></div>
      `,
      ejemplo: `
        <p>En Profesores, el modelo log(salario) estima −0,0455 para Mujer. La aproximación es −4,55%; el exacto, −4,45%. El intervalo del coeficiente, [−0,1065; 0,0155], equivale a una diferencia porcentual entre −10,1% y +1,6%: no se rechaza la igualdad, pero el intervalo admite una brecha relevante.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si el coeficiente es 0,30, no escribas “30% más”: el exacto es 34,99%. La diferencia importa cuando el efecto es grande o cuando el texto se usa para una política.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer −0,0455 como −0,0455%.</strong> Falta multiplicar por 100: es −4,55% aproximado.</li>
          <li><strong>Llamarlo elasticidad.</strong> La elasticidad requiere una X continua y un cambio porcentual de X.</li>
          <li><strong>Usar la aproximación con coeficientes grandes.</strong> Para δ = 0,30, 30% subestima el 34,99% exacto.</li>
          <li><strong>Comparar el ajuste con el modelo en niveles.</strong> La transformación de Y cambia la escala del R<sup>2</sup>.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés pasar de −0,0455 a −4,45% sin mirar la fórmula exacta.</p></div>
      `,
      conexiones: `
        <p>La dummy en log combina la lectura de la clase 4 con la comparación de grupos de esta clase. Se conecta con la esperanza condicional —la diferencia es entre medias de log Y— y con la interacción, porque un coeficiente porcentual también puede diferir por grupo.</p>
        <div><button class="concept-chip" data-concept="dummy">Variable ficticia →</button><button class="concept-chip" data-concept="esperanza-condicional">Esperanza condicional →</button><button class="concept-chip" data-concept="interaccion">Interacción →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 14.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 8, Ej. 1 y Ej. 8.</p></div>
      `
    },
    chow: {
      title: 'Prueba de Chow',
      sub: '¿Los dos grupos tienen la misma función de regresión?',
      simple: `<p>¿La relación entre salario y educación es la misma para casados y solteros? Chow es un control de calidad de esa idea: compara la regresión hecha con todos juntos contra una regresión separada para cada grupo.</p><p>Si las dos versiones ajustan muy distinto, hay evidencia de que la función no es la misma. Lo que no te dice es cuál de las diferencias —el nivel o alguna pendiente— es la responsable.</p>`,
      viz: "chow",
      vizIntro: "Cambiá la diferencia de intercepto y de pendiente entre los dos grupos. La recta gris es la función única que impone la hipótesis nula.",
      vizHint: "Chow mide cuánto pierde el ajuste al imponer una sola recta. Un F grande indica que alguna diferencia existe; no dice si está en el nivel o en la pendiente.",
      esencia: `
        <div class="definition">La prueba de Chow contrasta H<sub>0</sub>: misma función de regresión para dos grupos. Es un F de k+1 restricciones —el intercepto y las k pendientes— que compara la SCR del modelo restringido con la suma de las SCR de dos regresiones separadas.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es equivalente a estimar un modelo con una dummy y todas las interacciones, y contrastar que todos los términos con D son cero.</li>
          <li>Requiere homocedasticidad e independencia; si las varianzas difieren, hace falta una versión robusta.</li>
          <li>Rechazar no identifica qué coeficiente cambió. No rechazar no prueba igualdad: la potencia depende de n y del tamaño de los grupos.</li>
        </ul>
        <div class="formula small">F = [(SCR<sub>R</sub> − (SCR<sub>1</sub>+SCR<sub>2</sub>))/(k+1)] / [(SCR<sub>1</sub>+SCR<sub>2</sub>)/(n−2k−2)]<span>F<sub>k+1, n−2k−2</sub> bajo H<sub>0</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: H₀ conjunta y homocedasticidad</span><span class="badge optional">Según el caso: grupos o períodos</span></div>
      `,
      ejemplo: `
        <p>El Ej. 8 del TP 8 compara la función de salario de casados y solteros con WAGE2. El modelo A impone una sola función; los modelos B y C estiman una por grupo. Chow contrasta si las cuatro pendientes y el intercepto son iguales. La limitación es que la H<sub>0</sub> no permite ninguna diferencia: si solo cambia el intercepto, el test rechaza pero no lo dice.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si el grupo es chico, el F puede no rechazar por falta de potencia. Reportá el tamaño de cada grupo, los grados de libertad y, si es posible, los contrastes individuales.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar Chow con heterocedasticidad.</strong> La distribución F nominal deja de ser válida; conviene una versión robusta.</li>
          <li><strong>Concluir cuál coeficiente difiere tras un rechazo.</strong> Chow solo dice que la función no es la misma.</li>
          <li><strong>Leer un no rechazo como prueba de igualdad.</strong> Es falta de evidencia, no evidencia de ausencia.</li>
          <li><strong>Aplicarlo con grupos muy chicos.</strong> La potencia puede ser mínima y el F inestable.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés escribir la H<sub>0</sub> ni explicar por qué son k+1 restricciones.</p></div>
      `,
      conexiones: `
        <p>Chow es el caso extremo de la interacción: la dummy entra sola y multiplicando a todas las X. También se conecta con la evaluación de políticas, porque comparar dos grupos o dos períodos es la misma pregunta estructural.</p>
        <div><button class="concept-chip" data-concept="interaccion">Interacción →</button><button class="concept-chip" data-concept="dummy">Variable ficticia →</button><button class="concept-chip" data-concept="evaluacion-politicas">Evaluación de políticas →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 25–28.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.5.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2025: H<sub>0</sub> de igual función de regresión y grados de libertad.</p></div>
      `
    },
    'evaluacion-politicas': {
      title: 'Evaluación de políticas',
      sub: 'La dummy de participación y el problema de la selección.',
      simple: `<p>Si comparás las notas de quienes fueron al taller con las de quienes no fueron, no sabés si la diferencia es el taller o las ganas que ya tenían. La dummy de participación marca quién estuvo, pero no borra esas diferencias previas.</p><p>Para hablar de efecto hace falta un diseño que separe el programa de la selección. Más datos no arreglan ese problema: lo repiten con más precisión.</p>`,
      esencia: `
        <div class="definition">En una evaluación de política, la dummy indica participación en el programa. Su coeficiente es la diferencia media entre participantes y no participantes. Solo se interpreta como efecto causal si la participación no está correlacionada con los factores no observados que afectan Y.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Los grupos de tratamiento y control no se asignan al azar: los individuos eligen participar o cumplen condiciones.</li>
          <li>Si E(u|P=1) ≠ E(u|P=0), el estimador es sesgado e inconsistente; más observaciones no lo corrigen.</li>
          <li>Controlar por observables reduce el sesgo si la selección es en observables. Si no, hacen falta diferencias en diferencias, variables instrumentales o un experimento.</li>
        </ul>
        <div class="formula small">plim δ̂<sub>0</sub> = δ<sub>0</sub> + [E(u|P=1) − E(u|P=0)]<span>El segundo término es el sesgo de selección</span></div>
        <div class="badge-row"><span class="badge always">Siempre: preguntar cómo se asignó P</span><span class="badge optional">Según el caso: observables, panel, VI o experimento</span></div>
      `,
      ejemplo: `
        <p>El 1P 2024 plantea un taller de consultas los sábados para mejorar las notas del parcial. Quienes asisten pueden ser estudiantes más motivados o con más tiempo, y esas variables no están en el modelo. Un coeficiente positivo puede reflejar el taller o la selección. Sin un diseño que separe ambas cosas, no se puede afirmar que el taller funcionó.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Preguntá siempre: ¿quién decide participar? ¿Qué saben los participantes que no saben los controles? ¿Hay una regla de elegibilidad que pueda usarse como instrumento?</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Llamar “efecto del programa” al coeficiente de participación.</strong> Es una diferencia condicional, no un efecto causal.</li>
          <li><strong>Creer que agregar controles siempre resuelve la selección.</strong> Solo funciona si la selección es en observables.</li>
          <li><strong>Comparar participantes y controles sin mirar su composición.</strong> La diferencia bruta mezcla programa y características previas.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué haría falta para interpretar el coeficiente como causal.</p></div>
      `,
      conexiones: `
        <p>La evaluación de políticas es la aplicación más exigente de las esperanzas condicionales: la pregunta no es qué media difiere, sino qué habría pasado con los participantes si no hubieran participado. Chow compara funciones; la selección pregunta por el contrafactual.</p>
        <div><button class="concept-chip" data-concept="esperanza-condicional">Esperanza condicional →</button><button class="concept-chip" data-concept="chow">Prueba de Chow →</button><button class="concept-chip" data-concept="dummy">Variable ficticia →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 5, diap. 23–24.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 7, §7.6.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024: taller de consultas y autoselección.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de variables ficticias',
    intro: 'El laboratorio retoma los ejercicios 1 a 3 del TP 8 con Profesores.rda. Las tarjetas cubren la actividad conceptual y los ejercicios que no están en el laboratorio: el 6, con regiones y provincia, y el 8, con Chow. El Ej. 7 se trabaja en la sección de tramos y conviene tenerlo leído antes de resolver la guía.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-8',
    exercises: [
      { label: 'TP 8 · Act. 1', title: 'Verdadero o falso: el alcance de las ficticias', text: 'Cuatro afirmaciones sobre variables ficticias: si solo las explicativas pueden serlo, si k categorías exigen k dummies, quién elige la base y si una ficticia puede representar una variable cuantitativa categorizada. Es el filtro conceptual antes de estimar.', tags: ['Conceptual', 'V/F'], href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-7' },
      { label: 'TP 8 · Act. 2', title: 'Esperanzas condicionales y categoría base', text: 'Explicá qué significa cada esperanza condicional en un modelo con ficticias y por qué la categoría base puede cambiarse sin cambiar el ajuste. La respuesta tiene que distinguir parametrización de modelo.', tags: ['Conceptual', 'Base'], href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-3' },
      { label: 'TP 8 · Ej. 1', title: 'Profesores: medias, modelo simple y cambio de base', text: 'Compará el salario medio por sexo, estimá el modelo con una sola ficticia, contrastá su significatividad, probá el modelo sin constante con ambas categorías y repetí con base Mujer. Es el laboratorio de la clase.', tags: ['Aplicar', 'Profesores'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-7' },
      { label: 'TP 8 · Ej. 2', title: 'Rango: tres categorías y esperanzas condicionales', text: 'Estimá el modelo con dos ficticias para Ayudante, JTP y Profesor, interpretá cada coeficiente contra la base y calculá las tres esperanzas. Después agregá una segunda variable cualitativa y escribí las combinaciones.', tags: ['Aplicar', 'k−1'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-7' },
      { label: 'TP 8 · Ej. 6', title: 'ENGHO 2012: región, provincia y sexo del jefe', text: 'Estimá el gasto total en función del ingreso, los miembros y la región; contrastá la región con drop1, reemplazala por provincia, compará con AIC y agregá el sexo del jefe. Cierra con una esperanza condicional concreta.', tags: ['Aplicar', 'AIC'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-6-5' },
      { label: 'TP 8 · Ej. 8', title: 'WAGE2: Chow y el modelo con married', text: 'Usá los ANOVA de los tres modelos para el contraste de Chow, discutí su limitación y reformulá la hipótesis con la binaria married y todas sus interacciones. Es el puente entre Chow y el modelo con ficticias.', tags: ['Razonar', 'Chow'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-8-1' }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 8 · Ej. 1–3',
      title: 'Profesores: brecha bruta, brecha condicional y log-dummy',
      intro: 'Una sola base permite recorrer la clase entera: comparar medias por sexo, estimar el modelo con controles, comparar con la versión sin constante, agregar una interacción y pasar a logaritmos. La pregunta es siempre la misma: qué diferencia queda después de comparar grupos comparables.',
      dataNote: 'Profesores.rda del TP 8: 397 profesores universitarios, sin datos faltantes. Variables: salario (en las unidades monetarias de la base), genero (Hombre/Mujer), rango (Ayudante/JTP/Prof), univ (A/B) y antig (años). R toma como referencia Hombre, Ayudante y A; por eso los coeficientes se leen contra esas categorías. Es una base observacional: el género, el rango y la universidad no se asignan al azar, así que las diferencias condicionales no son efectos causales.',
      script: `load("Profesores.rda")

tapply(base$salario, base$genero, mean)
table(base$genero, base$rango)

solo_sexo <- lm(salario ~ genero, data = base)
summary(solo_sexo)

modelo <- lm(salario ~ genero + rango + univ + antig, data = base)
summary(modelo)
confint(modelo)

modelo_int <- lm(salario ~ genero * antig + rango + univ, data = base)
summary(modelo_int)

modelo_log <- lm(log(salario) ~ genero + rango + univ + antig, data = base)
summary(modelo_log)
confint(modelo_log)
100 * (exp(coef(modelo_log)["generoMujer"]) - 1)

sin_constante <- lm(salario ~ 0 + genero, data = base)
summary(sin_constante)`,
      output: `  Hombre    Mujer 
115090.4 101002.4 
        
         Ayudante JTP Prof
  Hombre       56  54  248
  Mujer        11  10   18

Call:
lm(formula = salario ~ genero, data = base)

Residuals:
   Min     1Q Median     3Q    Max 
-57290 -23502  -6828  19710 116455 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)   115090       1587  72.503  < 2e-16 ***
generoMujer   -14088       5065  -2.782  0.00567 ** 
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 30030 on 395 degrees of freedom
Multiple R-squared:  0.01921,	Adjusted R-squared:  0.01673 
F-statistic: 7.738 on 1 and 395 DF,  p-value: 0.005667


Call:
lm(formula = salario ~ genero + rango + univ + antig, data = base)

Residuals:
   Min     1Q Median     3Q    Max 
-64202 -14255  -1533  10571  99163 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 73122.92    3245.27  22.532  < 2e-16 ***
generoMujer -4771.25    3878.00  -1.230 0.219311    
rangoJTP    14560.40    4098.32   3.553 0.000428 ***
rangoProf   49159.64    3834.49  12.820  < 2e-16 ***
univB       13473.38    2315.50   5.819 1.24e-08 ***
antig         -88.78     111.64  -0.795 0.426958    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 22650 on 391 degrees of freedom
Multiple R-squared:  0.4478,	Adjusted R-squared:  0.4407 
F-statistic: 63.41 on 5 and 391 DF,  p-value: < 2.2e-16

                  2.5 %     97.5 %
(Intercept)  66742.5527 79503.2783
generoMujer -12395.5978  2853.1020
rangoJTP      6502.8930 22617.9089
rangoProf    41620.8482 56698.4259
univB         8920.9942 18025.7639
antig         -308.2669   130.7083

Call:
lm(formula = salario ~ genero * antig + rango + univ, data = base)

Residuals:
   Min     1Q Median     3Q    Max 
-64141 -14219  -1491  10684  99213 

Coefficients:
                  Estimate Std. Error t value Pr(>|t|)    
(Intercept)       73228.91    3335.93  21.952  < 2e-16 ***
generoMujer       -5496.74    6464.52  -0.850 0.395683    
antig               -90.24     112.26  -0.804 0.421985    
rangoJTP          14484.08    4139.34   3.499 0.000521 ***
rangoProf         49072.60    3889.05  12.618  < 2e-16 ***
univB             13459.60    2320.48   5.800 1.37e-08 ***
generoMujer:antig    60.84     433.42   0.140 0.888441    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 22680 on 390 degrees of freedom
Multiple R-squared:  0.4478,	Adjusted R-squared:  0.4393 
F-statistic: 52.71 on 6 and 390 DF,  p-value: < 2.2e-16


Call:
lm(formula = log(salario) ~ genero + rango + univ + antig, data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.66007 -0.11143 -0.00792  0.09586  0.59675 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept) 11.2243809  0.0259552 432.453  < 2e-16 ***
generoMujer -0.0455074  0.0310157  -1.467    0.143    
rangoJTP     0.1639460  0.0327777   5.002 8.60e-07 ***
rangoProf    0.4746234  0.0306676  15.476  < 2e-16 ***
univB        0.1260652  0.0185190   6.807 3.75e-11 ***
antig       -0.0014547  0.0008929  -1.629    0.104    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.1812 on 391 degrees of freedom
Multiple R-squared:  0.5213,	Adjusted R-squared:  0.5152 
F-statistic: 85.15 on 5 and 391 DF,  p-value: < 2.2e-16

                   2.5 %       97.5 %
(Intercept) 11.173351813 1.127541e+01
generoMujer -0.106485749 1.547090e-02
rangoJTP     0.099503380 2.283887e-01
rangoProf    0.414329417 5.349175e-01
univB        0.089655948 1.624744e-01
antig       -0.003210169 3.006834e-04
generoMujer 
  -4.448749 

Call:
lm(formula = salario ~ 0 + genero, data = base)

Residuals:
   Min     1Q Median     3Q    Max 
-57290 -23502  -6828  19710 116455 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
generoHombre   115090       1587    72.5   <2e-16 ***
generoMujer    101002       4809    21.0   <2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 30030 on 395 degrees of freedom
Multiple R-squared:  0.9352,	Adjusted R-squared:  0.9348 
F-statistic:  2849 on 2 and 395 DF,  p-value: < 2.2e-16`,
      confint: `                  2.5 %     97.5 %
(Intercept)  66742.5527 79503.2783
generoMujer -12395.5978  2853.1020
rangoJTP      6502.8930 22617.9089
rangoProf    41620.8482 56698.4259
univB         8920.9942 18025.7639
antig         -308.2669   130.7083`,
      readingTable: [
        { element: 'tapply(salario, genero, mean)', meaning: 'Salario medio por sexo.', how: '115.090,4 para hombres y 101.002,4 para mujeres. La diferencia bruta es 14.088, un 12,2% del salario medio masculino.' },
        { element: '(Intercept), solo_sexo', meaning: 'Media del grupo base.', how: '115.090: coincide con la media de los hombres porque Hombre es la categoría de referencia.' },
        { element: 'generoMujer, solo_sexo', meaning: 'Brecha bruta.', how: '−14.088; t = −2,782; p = 0,0057. Es la diferencia de medias sin controlar nada. El R² de 0,0192 dice que el sexo explica 1,9% de la variación: significativo no es lo mismo que relevante.' },
        { element: 'table(genero, rango)', meaning: 'Composición por rango.', how: 'Mujeres: 11 ayudantes, 10 JTP y 18 profesoras (28%, 26% y 46%). Hombres: 56, 54 y 248 (16%, 15% y 69%). Las mujeres están sobrerrepresentadas en las categorías bajas.' },
        { element: '(Intercept), modelo', meaning: 'Celda base del modelo completo.', how: '73.123: hombre, ayudante, universidad A y antigüedad cero. Es una celda del modelo, no un profesor típico.' },
        { element: 'generoMujer, modelo', meaning: 'Brecha condicional.', how: '−4.771 con ee 3.878, t = −1,230 y p = 0,219. El IC [−12.396; 2.853] incluye el cero.' },
        { element: 'rangoJTP / rangoProf', meaning: 'Premio por rango.', how: '+14.560 y +49.160 contra Ayudante, ambos significativos. La diferencia Prof−JTP es 34.599 y requiere su propio error estándar.' },
        { element: 'univB', meaning: 'Diferencia entre universidades.', how: '+13.473 a favor de B contra A, con p &lt; 0,001.' },
        { element: 'antig', meaning: 'Pendiente de antigüedad.', how: '−88,8 por año, p = 0,427. Negativa y no significativa; no se interpreta como “la antigüedad reduce el salario”.' },
        { element: 'generoMujer:antig', meaning: 'Diferencia de pendientes.', how: '60,84 con ee 433,42 y p = 0,888. Las pendientes son −90,2 para hombres y −29,4 para mujeres; no hay evidencia de que difieran. En ese modelo, el coeficiente de Mujer es la brecha a antigüedad cero.' },
        { element: 'generoMujer, log(salario)', meaning: 'Diferencia porcentual.', how: '−0,0455: −4,55% aproximado y −4,45% exacto. p = 0,143; el IC del coeficiente [−0,1065; 0,0155] equivale a −10,1% a +1,6%.' },
        { element: 'sin_constante', meaning: 'Medias de grupo.', how: '115.090 y 101.002, cada una con su ee. El R² de 0,9352 es no centrado y no se compara con el 0,0192 del modelo con constante.' }
      ],
      econometric: `<p><strong>Modelo con solo sexo.</strong> El intercepto es la media de los hombres, 115.090,4, y el coeficiente de Mujer es −14.088 con ee 5.065, t = −2,782 y p = 0,0057. Es un contraste de medias: no hay controles, así que la diferencia mezcla sexo y composición. El R<sup>2</sup> de 0,0192 indica que el sexo explica 1,9% de la variación del salario.</p>
        <p><strong>Modelo con controles.</strong> Al agregar rango, universidad y antigüedad, la brecha pasa a −4.771 con ee 3.878, t = −1,230 y p = 0,219. El intervalo al 95%, [−12.396; 2.853], incluye el cero. El rango es el regresor con mayor efecto: JTP +14.560 y Profesor +49.160 contra Ayudante, ambos con p &lt; 0,001. Universidad B suma 13.473 y la antigüedad no es significativa (−88,8; p = 0,427).</p>
        <p><strong>Interacción.</strong> El modelo con genero × antigüedad estima 60,84 para la interacción, con ee 433,42 y p = 0,888. Las pendientes son −90,2 para hombres y −29,4 para mujeres: el signo positivo de la interacción es el que pediría el Ej. 3 —la brecha se achica con la antigüedad—, pero no es significativo y ambas pendientes son casi planas. El coeficiente de Mujer, −5.497, es la brecha a antigüedad cero, no la brecha promedio.</p>
        <p><strong>Log-dummy.</strong> En log(salario), el coeficiente de Mujer es −0,0455 con ee 0,0310 y p = 0,143. La diferencia porcentual aproximada es −4,55%; la exacta, −4,45%. El R<sup>2</sup> de 0,5213 no se compara con el 0,4478 del modelo en niveles: la variable dependiente es otra. Es el mismo problema de comparación de la clase 4, aplicado a una dummy.</p>
        <p><strong>Modelo sin constante.</strong> Con <code>salario ~ 0 + genero</code>, los coeficientes son las medias de cada grupo: 115.090 y 101.002, con ee 1.587 y 4.809. El R<sup>2</sup> de 0,9352 es no centrado: R no mide la variación respecto de la media y el número no es comparable con el 0,0192 del modelo con constante.</p>`,
      economic: `<p>La brecha bruta es de 14.088, un 12,2% del salario medio masculino. Al comparar profesores del mismo rango, universidad y antigüedad, la diferencia cae a 4.771, un 4,1%, y deja de ser significativa. La mayor parte de la brecha bruta es composición: las mujeres están sobrerrepresentadas en Ayudante y JTP, y los hombres en Profesor.</p>
        <p>El rango es el regresor más importante. Un Profesor gana 49.160 más que un Ayudante, casi dos tercios del salario base, y la universidad B paga 13.473 más que la A. La antigüedad dentro del rango no muestra un premio adicional: una vez que se distingue la categoría, los años adicionales no tienen una asociación significativa con el salario en esta muestra. Es plausible que la antigüedad ya esté capturada por el rango.</p>
        <p>No rechazar la igualdad no prueba que no haya brecha. El intervalo de la brecha condicional va de −12.396 a +2.853: la estimación es compatible con una desventaja de hasta 12.396 y con una ventaja de 2.853. En una discusión de política o en una presentación judicial, esa ambigüedad importa tanto como el signo del coeficiente.</p>
        <p>La lectura causal requiere un diseño. El rango y la universidad pueden ser canales por los que opera una desventaja previa; controlarlos puede esconder parte del fenómeno. La base no permite separar discriminación de elecciones, productividad no observada o segregación por área. La conclusión honesta es descriptiva: diferencia bruta, diferencia condicional y un intervalo.</p>`,
      errors: [
        'Decir que la brecha bruta de 14.088 es discriminación. Es una diferencia de medias sin controles y con composición distinta por rango.',
        'Leer −4.771 como una brecha “pequeña” sin mirar el intervalo [−12.396; 2.853]. La estimación es compatible con una desventaja relevante.',
        'Comparar el R² de 0,5213 del modelo log con el 0,4478 del modelo en niveles. La Y es distinta y los R² no son comparables.',
        'Interpretar −0,0455 como −0,0455% o como una elasticidad. Es una diferencia porcentual entre grupos: −4,55% aproximado, −4,45% exacto.',
        'Decir que la interacción no significativa prueba que no hay brecha de género. La interacción prueba pendientes; la brecha de nivel está en el coeficiente de la dummy.',
        'Leer −5.497 como la brecha promedio en el modelo con interacción. Es la brecha a antigüedad cero, y la antigüedad cero es una celda extrema.',
        'Comparar el R² de 0,9352 del modelo sin constante con el 0,0192 del modelo con constante. El primero es no centrado: mide otra cosa.'
      ],
      checklist: [
        'Fijá la variable dependiente, su unidad y si está en logaritmos antes de leer cualquier coeficiente.',
        'Listá las categorías y la base de cada factor con levels(). Escribila en el texto.',
        'Escribí las esperanzas condicionales de cada celda antes de interpretar los coeficientes.',
        'Reportá coeficiente, error estándar, t, p e intervalo; no solo el signo.',
        'Separá la brecha bruta de la condicional y explicá qué controles entraron y por qué.',
        'En log, usá la fórmula exacta y aclará que es una diferencia porcentual, no una elasticidad.',
        'No afirmes causalidad: la base es observacional y la selección de rango y universidad no es aleatoria.'
      ]
    },
    partials: [
      { label: '1P 2025', text: 'Modelo con dos variables continuas y una ficticia para dos grupos: escribí la hipótesis nula de igual función de regresión y los grados de libertad del estadístico. Es Chow formulado desde el modelo con interacciones.' },
      { label: '1P 2024', text: 'Taller de consultas los sábados y notas del parcial: por qué un coeficiente positivo no prueba que el taller mejore el desempeño. Es el problema de autoselección de la sección 7.' },
      { label: '2P 2024', text: 'Eliminación de estacionalidad con dos ficticias y contraste conjunto de que sus coeficientes son cero. Es la misma lógica de k−1 dummies y F conjunto, aplicada a series de tiempo.' }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Doce preguntas para comprobar si podés usar las ficticias, no solo definirlas. Respondé en tres a seis líneas y corregí el error frecuente que aparece en cada respuesta.',
    questions: [
      { q: '¿Por qué comparar el salario medio de hombres y mujeres no alcanza para hablar de discriminación?', a: 'Porque la diferencia bruta mezcla el sexo con la composición: rango, universidad, antigüedad, área y experiencia. En la base, las mujeres están sobrerrepresentadas en Ayudante y JTP. Al controlar por rango, universidad y antigüedad, la brecha pasa de 14.088 a 4.771 y deja de ser significativa. Aun así, controlar observables no prueba causalidad: puede haber omisiones y la selección de rango puede ser endógena.' },
      { q: 'Con tres categorías y una constante, ¿por qué se usan dos dummies y no tres?', a: 'Porque las tres dummies suman 1 en cada fila, igual que la columna del intercepto: hay colinealidad perfecta. Con dos, la tercera categoría queda como base y su nivel está en β₀. Si se saca la constante, se pueden usar las tres, pero cada coeficiente es la media de su grupo, no una diferencia, y el R² de R es no centrado.' },
      { q: 'Cambiás la base de Hombre a Mujer. ¿Qué cambia y qué no?', a: 'Cambian el intercepto y los coeficientes de las dummies de esa categoría; en un modelo aditivo, los demás regresores conservan su coeficiente y su error estándar. No cambian los valores ajustados, los residuos, la SCR, el R² ni el F global. La comparación entre grupos es la misma, expresada al revés.' },
      { q: 'En un modelo con D, X y D·X, ¿qué mide δ₀ y cuándo no es la brecha?', a: 'δ₀ es la diferencia entre grupos cuando X=0. La brecha en un X cualquiera es δ₀+δ₁X. Si X=0 está fuera del rango observado, δ₀ es una extrapolación y no se interpreta como “la” brecha. En el laboratorio, δ₀ es la brecha a antigüedad cero, no la brecha promedio.' },
      { q: 'La interacción entre sexo y antigüedad no es significativa. ¿Podés concluir que no hay brecha?', a: 'No. La interacción prueba si las pendientes difieren; la brecha de nivel está en el coeficiente de la dummy. En el laboratorio, la interacción tiene p=0,888, pero el coeficiente de Mujer es −5.497 con un intervalo muy amplio. No rechazar una diferencia de pendientes no es lo mismo que probar igualdad de niveles.' },
      { q: '¿Por qué el coeficiente de una dummy en un modelo log Y no es una elasticidad?', a: 'Porque la dummy no varía porcentualmente: pasa de 0 a 1. El coeficiente mide la diferencia en log Y entre grupos; multiplicado por 100 es una diferencia porcentual aproximada. La elasticidad es un cambio porcentual de Y ante un cambio porcentual de X, y requiere una X continua en logaritmos.' },
      { q: 'δ̂=0,30 en log Y. ¿Cómo lo reportás?', a: 'La aproximación es 30%; la exacta, 100(e^0,30−1)=34,99%. Con coeficientes grandes conviene reportar el exacto y aclarar que es una diferencia porcentual entre el grupo D=1 y la base. Si se reporta 30% sin aclarar, se subestima la diferencia en casi cinco puntos.' },
      { q: 'En la regresión por tramos, ¿qué mide β₂ y cómo se prueba si hay un salto en X*?', a: 'β₂ es el cambio de pendiente: la pendiente pasa de β₁ a β₁+β₂. El modelo es continuo en X* por construcción. Para permitir un salto se agrega δ₀D, con D=1 si X>X*, y se contrasta H₀: δ₀=0. Si se rechaza, hay cambio de nivel además del cambio de pendiente.' },
      { q: 'Un programa de capacitación muestra un coeficiente positivo y significativo. ¿Es evidencia de que funcionó?', a: 'No necesariamente. Si la participación es voluntaria, quienes se capacitan pueden tener más motivación o habilidad, y esas variables quedan en el error. Eso genera sesgo de selección: el coeficiente mezcla el efecto del programa con las diferencias previas. Se necesita un diseño que separe ambas cosas: asignación aleatoria, diferencias en diferencias o variables instrumentales.' },
      { q: 'Aplicás Chow y no rechazás. ¿Podés afirmar que los dos grupos tienen la misma función de regresión?', a: 'No. No rechazar solo indica que los datos no aportan evidencia suficiente contra la igualdad; no prueba que sea verdadera. La potencia depende de n, del tamaño de los grupos y de la magnitud de las diferencias. Con muestras chicas, un F no significativo puede convivir con diferencias relevantes. Reportá el tamaño de cada grupo, los grados de libertad y, si es posible, los contrastes individuales.' },
      { q: '¿Qué supuesto adicional necesita Chow respecto de un t de diferencia de medias?', a: 'Chow es un F y supone homocedasticidad: bajo H₀, la varianza de los errores de los dos grupos debe ser la misma. También supone independencia entre observaciones. Si las varianzas difieren, la distribución F nominal no es la correcta y conviene una versión robusta o un contraste de Wald con covarianza robusta.' },
      { q: '¿Por qué el R² del modelo sin constante no se compara con el del modelo con constante?', a: 'Porque R calcula el R² del modelo sin constante sin centrar la Y: la suma total no se mide respecto de la media. Ese R² puede ser muy alto y no es comparable con el R² habitual. En el laboratorio, el modelo sin constante da 0,9352 y el modelo con constante, 0,0192; la diferencia es de definición, no de ajuste.' }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso y sesión de 90 minutos',
    intro: 'Doce fórmulas, doce drills y una sesión corta para llegar al parcial con las ideas ordenadas. Si una fórmula no se puede explicar con una esperanza condicional, todavía no está aprendida.',
    formulas: [
      { title: 'Diferencia de medias', eq: 'δ<sub>0</sub> = E(Y|D=1) − E(Y|D=0)', note: 'Vale como esperanza condicional si E(u|D)=0. Si no, es una diferencia descriptiva.', more: "<p>Es la resta de dos medias poblacionales, una por grupo. El signo depende de qué grupo se pone en D=1: si cambiás la codificación, el número cambia de signo y el tamaño queda igual.</p><ul><li><b>Cuándo se usa:</b> como punto de partida descriptivo y para verificar que el modelo con una sola dummy reproduce las medias muestrales.</li><li><b>Error típico:</b> llamarla “efecto” de la categoría. Sin aleatorización, es una diferencia de grupos, no un efecto.</li><li><b>Conexión:</b> el sesgo por composición que la separa de la diferencia condicional se estudia con la fórmula de omisión de variable de la clase 2.</li></ul>" },
      { title: 'Modelo con una dummy', eq: 'Y = β<sub>0</sub> + δ<sub>0</sub>D + u', note: 'β₀ es la media del grupo base; β₀+δ₀, la del grupo D=1.', more: "<p>La dummy solo mueve la altura de la recta: hay dos interceptos y ninguna pendiente porque no hay X continua. El intercepto pertenece al grupo que tiene D=0; el otro grupo se obtiene sumando δ₀.</p><ul><li><b>Cuándo se usa:</b> para contrastar medias y para presentar la lógica mínima de una ficticia.</li><li><b>Error típico:</b> suponer que β₀ es la media de toda la muestra. Es la media del grupo base.</li><li><b>Conexión:</b> al agregar controles, el mismo δ₀ deja de ser una diferencia de medias y pasa a ser una diferencia condicional.</li></ul>" },
      { title: 'k categorías', eq: 'Y = β<sub>0</sub> + δ<sub>1</sub>D<sub>1</sub> + … + δ<sub>k−1</sub>D<sub>k−1</sub> + u', note: 'k−1 dummies con intercepto. Ordinal: H₀ δ₂=2δ₁, δ₃=3δ₁, q=2.', more: "<p>Cada δ compara su categoría con la base, no con la categoría anterior. Por eso dos coeficientes pueden ser positivos y la diferencia entre esas dos categorías seguir siendo cero o negativa.</p><ul><li><b>Cuándo se usa:</b> con variables nominales de pocas categorías, como región, rango o sector.</li><li><b>Error típico:</b> restar los errores estándar para comparar dos coeficientes. La diferencia tiene su propio error, que depende de la covarianza.</li><li><b>Conexión:</b> el contraste conjunto de que todas las δ son cero es un F con q=k−1, el mismo formato que usa Chow.</li></ul>" },
      { title: 'Trampa de la dummy', eq: 'D<sub>1</sub> + D<sub>2</sub> + … + D<sub>k</sub> = 1', note: 'Colinealidad perfecta con el intercepto. R elimina una categoría o devuelve NA.', more: "<p>La suma de las k dummies da exactamente la columna de unos del intercepto. No es que falte información: es que está duplicada, y la matriz X′X pierde rango.</p><ul><li><b>Cuándo se usa:</b> para diagnosticar un NA o una categoría eliminada en la salida de R.</li><li><b>Error típico:</b> sacar la constante para “arreglarlo” sin avisar que los coeficientes pasan a ser medias de grupo y el R² deja de estar centrado.</li><li><b>Conexión:</b> es el caso extremo de la colinealidad perfecta de la clase 2B; con colinealidad imperfecta el problema es la precisión, no la identificación.</li></ul>" },
      { title: 'Rectas paralelas', eq: 'Y = β<sub>0</sub> + δ<sub>0</sub>D + β<sub>1</sub>X + u', note: 'δ₀ es la brecha en cualquier X. Una pendiente común.', more: "<p>La dummy desplaza la recta sin torcerla. δ₀ es la misma diferencia en todo X, así que no hace falta elegir un punto para informar la brecha.</p><ul><li><b>Cuándo se usa:</b> cuando la teoría dice que el retorno de X es común y solo cambia el nivel entre grupos.</li><li><b>Error típico:</b> agregar la interacción y seguir leyendo δ₀ como la brecha general. Con interacción, δ₀ es solo la brecha en X=0.</li><li><b>Conexión:</b> es el modelo restringido que se compara con el de pendientes distintas mediante un F de una restricción.</li></ul>" },
      { title: 'Interacción', eq: 'Y = β<sub>0</sub> + δ<sub>0</sub>D + β<sub>1</sub>X + δ<sub>1</sub>D·X + u', note: 'Brecha = δ₀+δ₁X; δ₁ = diferencia de pendientes.', more: "<p>El producto permite que la pendiente de X dependa del grupo. La brecha deja de ser un número fijo: es una función lineal de X y puede cambiar de signo dentro del rango observado.</p><ul><li><b>Cuándo se usa:</b> cuando la pregunta es si el retorno o el premio de X difiere entre grupos.</li><li><b>Error típico:</b> interpretar δ₁ como la brecha. δ₁ es un cambio de pendiente y está en unidades de Y por unidad de X.</li><li><b>Conexión:</b> los efectos principales se mantienen por jerarquía; sacarlos impone restricciones que el modelo no contrastó.</li></ul>" },
      { title: 'Dummy × dummy', eq: 'Y = β<sub>0</sub> + β<sub>1</sub>M + β<sub>2</sub>P + β<sub>3</sub>M·P + u', note: 'β₃ es una diferencia de diferencias; los efectos principales son condicionales.', more: "<p>Con dos binarias hay cuatro celdas y cuatro parámetros: el modelo es saturado. β₃ es la diferencia de diferencias y mide cuánto se aparta el premio de P entre los dos valores de M.</p><ul><li><b>Cuándo se usa:</b> para comparar el efecto de una categoría en dos grupos, por ejemplo el premio profesional por sexo.</li><li><b>Error típico:</b> leer β₁ como “el efecto de M” para toda la población; vale solo cuando P=0.</li><li><b>Conexión:</b> con más categorías, la cantidad de interacciones crece y hay que elegir cuáles tienen sentido; no se multiplican todas las dummies entre sí.</li></ul>" },
      { title: 'Regresión por tramos', eq: 'Y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>(X−X*)D + u', note: 'Pendientes β₁ y β₁+β₂; el modelo es continuo en X*.', more: "<p>El término (X−X*)D hace que la pendiente cambie justo en X* sin romper la continuidad. β₂ es el cambio de pendiente, no la pendiente del tramo alto.</p><ul><li><b>Cuándo se usa:</b> cuando una regla económica cambia a partir de un umbral, como comisiones, tarifas o impuestos.</li><li><b>Error típico:</b> interpretar β₁+β₂ como si fuera el nivel de Y en X*. Es una pendiente.</li><li><b>Conexión:</b> si además hay salto, se agrega δ₀D; el contraste δ₀=0 es el test de continuidad.</li></ul>" },
      { title: 'Tramos con salto', eq: 'Y = β<sub>0</sub> + β<sub>1</sub>X + δ<sub>0</sub>D + β<sub>2</sub>(X−X*)D + u', note: 'H₀: δ₀=0 prueba continuidad en X*.', more: "<p>Agregar δ₀D permite que la función salte en X*. El modelo deja de ser continuo por construcción y la discontinuidad se estima como un parámetro.</p><ul><li><b>Cuándo se usa:</b> cuando el umbral cambia el nivel además de la pendiente, por ejemplo un bono fijo al superar una meta.</li><li><b>Error típico:</b> contrastar δ₀ con un t y concluir que no hay salto cuando el intervalo es amplio.</li><li><b>Conexión:</b> el test conjunto δ₀=0 y β₂=0 equivale a comparar dos rectas completas, como en Chow.</li></ul>" },
      { title: 'Log-dummy', eq: '100δ<sub>0</sub> ≈ Δ% &nbsp;·&nbsp; 100(e<sup>δ<sub>0</sub></sup>−1) = Δ% exacto', note: 'Es una diferencia porcentual entre grupos, no una elasticidad.', more: "<p>El coeficiente está en log puntos. Multiplicar por 100 da una aproximación; la exponencial da el cambio porcentual exacto, que siempre es menor en valor absoluto cuando δ es negativo y mayor cuando es positivo.</p><ul><li><b>Cuándo se usa:</b> cuando Y está en logaritmos y el regresor es binario.</li><li><b>Error típico:</b> escribir “0,05%” en lugar de “5%” o llamarlo elasticidad.</li><li><b>Conexión:</b> para predecir Y en niveles hace falta el factor de retransformación; el coeficiente no alcanza.</li></ul>" },
      { title: 'Prueba de Chow', eq: 'F = [(SCR<sub>R</sub>−(SCR<sub>1</sub>+SCR<sub>2</sub>))/(k+1)] / [(SCR<sub>1</sub>+SCR<sub>2</sub>)/(n−2k−2)]', note: 'H₀: misma función de regresión. Requiere homocedasticidad.', more: "<p>Compara el ajuste de una sola función con el de dos funciones separadas. El numerador mide cuánto empeora la SCR al imponer la igualdad; el denominador, el ruido que queda en el modelo libre.</p><ul><li><b>Cuándo se usa:</b> para estabilidad entre períodos o para comparar dos poblaciones con la misma especificación.</li><li><b>Error típico:</b> rechazar y afirmar cuál coeficiente cambió. El F es conjunto y no identifica la fuente.</li><li><b>Conexión:</b> equivale al F de exclusión conjunta de D y todas las D·X; también exige homocedasticidad.</li></ul>" },
      { title: 'Sesgo de selección', eq: 'plim δ̂<sub>0</sub> = δ<sub>0</sub> + [E(u|P=1) − E(u|P=0)]', note: 'Si la participación depende del error, el coeficiente no es causal.', more: "<p>El término entre corchetes es la diferencia de errores medios entre participantes y controles. Si quienes participan tienen, en promedio, características no observadas que suben Y, ese término es positivo y el coeficiente exagera el efecto.</p><ul><li><b>Cuándo se usa:</b> para diagnosticar evaluaciones de programas con participación voluntaria o por elegibilidad.</li><li><b>Error típico:</b> creer que más controles observables eliminan el sesgo; solo actúan sobre la parte observada.</li><li><b>Conexión:</b> es la misma lógica de la variable omitida de la clase 2, aplicada a una dummy de tratamiento.</li></ul>" }
    ],
    drills: [
      { q: 'D=1 mujer, δ̂=−14.088. ¿Cómo lo leés?', a: 'Las mujeres ganan 14.088 menos que los hombres en la muestra; 12,2% del salario medio masculino. Es una diferencia bruta, sin controles.' },
      { q: '¿Por qué el intercepto es la media del grupo base?', a: 'Porque con D=0 el modelo queda Y=β₀+u, y E(u|D=0)=0. La media condicional es β₀.' },
      { q: 'Cinco regiones, con constante. ¿Cuántas dummies?', a: 'Cuatro. La quinta es la categoría base.' },
      { q: '¿Qué pasa si ponés las cinco con constante?', a: 'Colinealidad perfecta: las dummies suman 1. R elimina una o devuelve NA.' },
      { q: 'Cambiás la base. ¿Cambia el R²?', a: 'No. Cambia la parametrización, no el ajuste.' },
      { q: 'Y = β₀+δ₀D+β₁X+u. ¿Cómo son las rectas?', a: 'Paralelas: mismo β₁, distinto intercepto. La brecha es δ₀ en todo X.' },
      { q: 'Agregás D·X. ¿Qué mide δ₁?', a: 'La diferencia de pendientes entre grupos: (β₁+δ₁)−β₁.' },
      { q: 'La interacción no es significativa. ¿Saco la dummy?', a: 'No. La dummy mide la diferencia de nivel; la interacción, la de pendiente. Los efectos principales se mantienen.' },
      { q: 'En tramos, ¿β₂ es la pendiente nueva?', a: 'No: es el cambio de pendiente. La nueva es β₁+β₂.' },
      { q: 'log Y, δ̂=0,20. ¿Aproximado y exacto?', a: '20% y 22,14%.' },
      { q: 'Chow: H₀ y grados de libertad.', a: 'Misma función de regresión; q=k+1 en el numerador y n−2k−2 en el denominador.' },
      { q: 'Programa con δ̂>0 y significativo. ¿Es causal?', a: 'Solo si la participación no está correlacionada con el error. Si es voluntaria, hay selección.' }
    ],
    sourceGuide: [
      { stuck: 'No sé qué es una dummy ni cómo codificarla', source: 'Clase 5, diap. 4–7; Wooldridge §7.1.' },
      { stuck: 'No me salen las esperanzas condicionales', source: 'Clase 5, diap. 5–8; TP 8, Act. 2.' },
      { stuck: 'No entiendo por qué hay una categoría base', source: 'Clase 5, diap. 6–7; TP 8, Ej. 1e.' },
      { stuck: 'Me aparece un NA o un coeficiente faltante', source: 'Clase 5, diap. 6; trampa de la dummy.' },
      { stuck: 'Tengo tres o más categorías', source: 'Clase 5, diap. 7–9; TP 8, Ej. 2.' },
      { stuck: 'No sé interpretar la interacción', source: 'Clase 5, diap. 15–20; Wooldridge §7.3.' },
      { stuck: 'Necesito una regresión por tramos', source: 'Clase 5, diap. 21–22; TP 8, Ej. 7.' },
      { stuck: 'Y está en logaritmos', source: 'Clase 5, diap. 14; fórmula exacta 100(e^δ−1).' },
      { stuck: 'Tengo que hacer Chow', source: 'Clase 5, diap. 25–28; 1P 2025.' },
      { stuck: 'Estoy evaluando una política', source: 'Clase 5, diap. 23–24; 1P 2024.' }
    ],
    session: [
      { time: '0–15', title: 'Diagnóstico', text: 'Tres preguntas: qué es una dummy, cuántas van con k categorías y qué es la base. Anotá las dudas sin resolver.' },
      { time: '15–35', title: 'Una dummy y esperanzas', text: 'Escribí E(Y|D=0) y E(Y|D=1) para el modelo de salario. Leé el output del modelo simple y probá el cambio de base.' },
      { time: '35–55', title: 'k categorías y trampa', text: 'Resolvé el Ej. 2 con rango. Verificá qué pasa al agregar la tercera dummy. Cambiá la base y compará.' },
      { time: '55–75', title: 'Continua e interacción', text: 'Pasá de rectas paralelas a no paralelas. Interpretá δ₀, δ₁ y la brecha en un X concreto. Mirá el Ej. 3.' },
      { time: '75–85', title: 'Tramos, log y Chow', text: 'Leé las fórmulas, resolvé un tramo y una diferencia porcentual exacta. Enunciá la H₀ de Chow.' },
      { time: '85–90', title: 'Cierre', text: 'Repetí el mapa de decisión y anotá los tres errores que más te costaron.' }
    ],
    kit: [
      { k: 'Fórmula', title: 'Las cuatro que no pueden fallar', text: 'Una dummy, k−1, interacción y Chow. Si podés escribir las esperanzas condicionales, podés interpretar cualquier salida.' },
      { k: 'Tabla', title: 'Base, coeficiente, brecha, intervalo', text: 'Cuatro columnas para no confundir nivel con pendiente ni significancia con magnitud.' },
      { k: 'Errores', title: 'Los cuatro clásicos', text: 'Trampa, base olvidada, interacción leída como efecto general y log leído como elasticidad.' },
      { k: 'Laboratorio', title: 'Profesores.rda', text: 'Corré el script, cambiá la base y agregá la interacción. La salida real vale más que la fórmula memorizada.' }
    ],
    plan: [
      { day: 'Día 1', title: 'Una dummy', text: 'Modelo simple, esperanzas y t de medias. Ej. 1a–c.' },
      { day: 'Día 2', title: 'Base y trampa', text: 'Cambiá la base, sacá el intercepto y provocá la trampa. Ej. 1d–e.' },
      { day: 'Día 3', title: 'k categorías', text: 'Ej. 2 completo; ordinal y restricciones δ₂=2δ₁, δ₃=3δ₁.' },
      { day: 'Día 4', title: 'Continua', text: 'Rectas paralelas y no paralelas. Interpretá δ₀ y δ₁ en X=0 y en X=10.' },
      { day: 'Día 5', title: 'Dummies y tramos', text: 'Ej. 7; agregá el salto y contrastá δ₀=0.' },
      { day: 'Día 6', title: 'Log y políticas', text: 'Diferencia porcentual exacta; 1P 2024 y sesgo de selección.' },
      { day: 'Día 7', title: 'Chow y repaso', text: 'Ej. 8; F, grados de libertad y límites. Repetí los drills y el mapa.' }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'La clase sigue las 28 diapositivas de Variables ficticias y el capítulo 7 de Wooldridge. La guía aporta la práctica; los parciales, las preguntas donde la lógica de dummies y contrastes conjuntos ya apareció.',
    items: [
      { type: 'Clase', typeClass: '', title: 'Clase 5 — Variables ficticias', text: 'Esperanzas condicionales, categoría base, k−1 dummies, trampa, interacciones, tramos, log-dummy, evaluación de políticas y Chow.', loc: '28 diapositivas · diap. 3–28' },
      { type: 'Libro', typeClass: 'book', title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.', text: 'Análisis de regresión múltiple con información cualitativa: variables ficticias, interacciones, diferencias entre grupos y evaluación de políticas.', loc: 'Cap. 7, §7.1–7.6' },
      { type: 'Guía', typeClass: '', title: 'Guía de Trabajos Prácticos 2026 — TP 8', text: 'Actividades 1 y 2; ejercicios 1 a 8 con Profesores, ENGHO, tramos y WAGE2.', loc: 'TP 8 · act. 1–2; ej. 1–8', href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-8' },
      { type: 'Parcial', typeClass: 'exam', title: '1P 2025', text: 'Modelo con dos continuas y una ficticia para dos grupos: H₀ de igual función de regresión y grados de libertad del estadístico. Es Chow escrito desde las interacciones.', loc: 'Solución orientativa · pregunta de Chow' },
      { type: 'Parcial', typeClass: 'exam', title: '1P 2024', text: 'Taller de consultas los sábados y notas del parcial: por qué un coeficiente positivo no prueba un efecto. Es autoselección, con referencia a la clase 5.', loc: 'Solución orientativa · pregunta de autoselección' },
      { type: 'Parcial', typeClass: 'exam', title: '2P 2024', text: 'Estacionalidad con dos variables ficticias y contraste conjunto de que sus coeficientes son cero. Es la misma lógica de k−1 dummies y F conjunto, aplicada a series.', loc: 'Solución orientativa · pregunta 2' }
    ]
  }
};
