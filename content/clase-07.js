window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-07"] = {
  id: 'clase-07',
  num: '07',
  eyebrow: 'Clase 07 · Series de tiempo',
  title: 'Series de tiempo: tendencia, estacionalidad y dinámica',
  lead: 'Una serie de tiempo es una sola realización de un proceso estocástico. Para estimar hay que suponer estabilidad, modelar la tendencia y la estacionalidad, revisar la estabilidad de los coeficientes y, si la respuesta es dinámica, trabajar con rezagos.',
  question: '¿Qué cambia cuando los datos tienen orden temporal y no se puede volver a muestrear la misma historia?',
  pills: ['32 diapositivas', 'TP 10', '2P 2024', '8 conceptos clave'],
  sections: [
    { id: 'c07-s01', number: '01', title: 'El problema: una sola historia, no una población de historias', blocks: [
        { type: 'p', id: 'c07-s01-p01',
          html: 'Un analista mira la serie mensual de importaciones de una industria. Quiere saber si la demanda externa explica el volumen y cuánto creció la serie en la última década. En un corte transversal, la aleatoriedad viene de sacar otra muestra de la misma población. Acá no hay otra población: hay una sola historia observada. Esa diferencia cambia el modo de pensar el error, la muestra y la inferencia.' },
        { type: 'p', id: 'c07-s01-p02',
          html: 'Los datos de series de tiempo llegan con un orden que no se puede alterar. La observación de marzo de 2020 no es intercambiable con la de marzo de 2019: el orden es información. Cada Y<sub>t</sub> es una variable aleatoria distinta y el conjunto {Y<sub>1</sub>, …, Y<sub>n</sub>} es un <span class="concept" data-concept="proceso-estocastico" tabindex="0" role="button">proceso estocástico</span>. Lo que observás es una <em>realización</em>: una trayectoria entre muchas posibles.' },
        { type: 'cards', items: [
          { sym: 'Proceso', title: 'La regla que genera la serie', text: 'Sucesión de variables aleatorias indexadas en el tiempo. Tiene una distribución conjunta para cada vector de períodos.' },
          { sym: 'Realización', title: 'La trayectoria observada', text: 'Los n valores que tenés en la planilla. Es una sola de las historias que el proceso podría haber generado.' },
          { sym: 'Población', title: 'El conjunto de historias posibles', text: 'Todas las realizaciones que podrían haberse dado si las condiciones del pasado hubieran sido distintas.' },
        ] },
        { type: 'formula', main: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + u<sub>t</sub> &nbsp;·&nbsp; t = 1, 2, …, n',
          legend: [{ key: 't', text: 'Índice temporal. Hay una ecuación por período y el orden no se reordena.' }, { key: 'n', text: 'Tamaño muestral: cantidad de períodos observados, no cantidad de personas o empresas.' }, { key: 'u<sub>t</sub>', text: 'Todos los factores no observables de ese período. Puede estar correlacionado con el de otro período.' }] },
        { type: 'callout', variant: 'ochre', label: 'La población no son las unidades relevadas',
          html: 'En series de tiempo, la población es el conjunto de trayectorias que el proceso podría haber generado. Por eso el tamaño muestral es n, el número de períodos. Decir que una serie es un dato poblacional porque hay una sola empresa o un solo país es un error: los valores siguen siendo aleatorios, lo que no hay es un mecanismo de selección muestral.' },
        { type: 'miniCheck', id: 'c07-check-01',
          question: '¿Por qué no se puede repetir el muestreo para obtener otra serie?',
          intro: 'Pensá qué haría falta para tener una segunda realización de la misma historia.',
          answer: 'Porque el tiempo pasa una sola vez. Para repetir el muestreo habría que volver al pasado, cambiar las condiciones iniciales y los shocks, y dejar correr el proceso de nuevo. Eso no se observa. La población es contrafáctica: el conjunto de series que podrían haberse dado. La inferencia reemplaza esas repeticiones ausentes con supuestos de estabilidad y dependencia débil, no con un muestreo que no existe.' },
        { type: 'p', id: 'c07-s01-p03',
          html: 'La frase “las series de tiempo son datos poblacionales” es falsa. Los datos son aleatorios; lo que no existe es el muestreo de unidades. La aleatoriedad proviene de los shocks del proceso, no de haber elegido unas unidades y no otras. Confundir las dos cosas lleva a pensar que el error estándar mide variabilidad entre individuos cuando en realidad mide variabilidad entre historias posibles.' },
        { type: 'p', id: 'c07-s01-p04',
          html: 'La consecuencia práctica es doble. Primero, la dependencia entre observaciones es parte del modelo, no un problema de recolección. Segundo, para estimar hace falta suponer que el proceso es estable en algún sentido: si las reglas cambian en cada período, un único β no puede resumir la relación. Esa estabilidad se llama <span class="concept" data-concept="estacionariedad" tabindex="0" role="button">estacionariedad</span> y es el tema de la próxima sección.' },
    ] },
    { id: 'c07-s02', number: '02', title: 'Estacionariedad, dependencia débil y paseo aleatorio', blocks: [
        { type: 'p', id: 'c07-s02-p01',
          html: 'La pregunta es qué tiene que permanecer constante para que un único modelo tenga sentido. Si la media de la serie sube con el tiempo, si la varianza cambia con el nivel o si la covarianza entre dos meses depende de la fecha y no solo de la distancia, el proceso no es estable. La estacionariedad es la propiedad que permite tratar a la serie como un objeto con reglas permanentes.' },
        { type: 'formula', main: 'E(Y<sub>t</sub>) = μ &nbsp;·&nbsp; Var(Y<sub>t</sub>) = σ<sup>2</sup> &nbsp;·&nbsp; Cov(Y<sub>t</sub>, Y<sub>t+j</sub>) = γ<sub>j</sub>',
          legend: [{ key: 'μ', text: 'Media constante: no depende de t. No exige que la serie sea plana, sino que no tenga una deriva sistemática.' }, { key: 'σ<sup>2</sup>', text: 'Varianza finita y constante. Si cambia con el tiempo, la serie es heterocedástica.' }, { key: 'γ<sub>j</sub>', text: 'Covarianza entre dos períodos separados por j. Depende de la distancia, no de la fecha.' }] },
        { type: 'cards', items: [
          { sym: 'Media', title: 'Sin tendencia', text: 'Si E(Y_t) cambia con t, la serie tiene tendencia. Un promedio de toda la muestra no representa a ningún período.' },
          { sym: 'Varianza', title: 'Sin heterocedasticidad', text: 'Si la dispersión crece con el nivel o con el tiempo, la varianza no es constante y los errores estándar usuales fallan.' },
          { sym: 'Covarianza', title: 'Solo distancia', text: 'La asociación entre dos observaciones depende de cuántos períodos las separan, no de si son de 1990 o de 2010.' },
        ] },
        { type: 'compare',
          left: { tag: 'Ruido blanco', title: 'Estacionario y sin memoria', text: 'Media cero, varianza constante y covarianza cero entre períodos distintos. Es el ladrillo con el que se construyen modelos más ricos.', eq: 'u<sub>t</sub> ~ (0, σ<sup>2</sup>), Cov(u<sub>t</sub>, u<sub>s</sub>) = 0' },
          right: { tag: 'Paseo aleatorio', title: 'No estacionario y persistente', text: 'Cada shock se acumula. La varianza crece con t y la serie no vuelve a un nivel de referencia. La primera diferencia es ruido blanco.', eq: 'Y<sub>t</sub> = Y<sub>t−1</sub> + e<sub>t</sub>' } },
        { type: 'p', id: 'c07-s02-p02',
          html: 'Estacionariedad débil no exige normalidad ni independencia. Exige que media, varianza y covarianzas no dependan del calendario. Una serie puede ser estacionaria y tener autocorrelación fuerte; lo que no puede es cambiar de nivel o de dispersión de forma sistemática. La <span class="concept" data-concept="dependencia-debil" tabindex="0" role="button">dependencia débil</span> agrega que la covarianza se apaga cuando j crece, y lo hace lo bastante rápido para que un promedio de n observaciones converja. Esa condición reemplaza al muestreo independiente y sostiene la ley de los grandes números y el teorema central del límite en series.' },
        { type: 'p', id: 'c07-s02-p03',
          html: 'Conviene distinguir dos fuentes de no estacionariedad. Una serie puede fluctuar alrededor de una recta: es estacionaria en tendencia y se arregla incluyendo t o extrayendo la tendencia. O puede ser un paseo aleatorio: cada shock se acumula y la serie no vuelve a un nivel de referencia. El tratamiento no es el mismo. Esta clase no hace contrastes de raíz unitaria; lo importante es no aplicar la receta de la tendencia a una serie que se comporta como paseo aleatorio.' },
        { type: 'callout', variant: 'ochre', label: 'Matiz sobre “no se puede estimar por MCO”',
          html: 'La diapositiva es enfática. La lectura precisa: MCO siempre devuelve números, pero si el proceso no es estable los supuestos no se sostienen, los errores estándar no son válidos y dos series con tendencia pueden aparecer relacionadas sin estarlo. Hay que transformar o modelar la no estacionariedad antes de creer en la inferencia. La regresión no falla por el software: falla porque la pregunta y el supuesto no coinciden.' },
        { type: 'miniCheck', id: 'c07-check-02',
          question: '¿Un paseo aleatorio es estacionario? ¿Qué pasa si lo diferenciás?',
          intro: 'Mirá la varianza y la covarianza, no solo el gráfico.',
          answer: 'No. Su media puede ser constante si arranca en un valor fijo, pero la varianza es tσ<sup>2</sup> y crece con el tiempo; además, la covarianza depende de la fecha. La primera diferencia ΔY<sub>t</sub> = e<sub>t</sub> es estacionaria si los e<sub>t</sub> son ruido blanco. Diferenciar no es lo mismo que quitar una tendencia determinística: en el paseo aleatorio el shock se acumula y no vuelve; en una serie con tendencia determinística, la serie oscila alrededor de la recta.' },
    ] },
    { id: 'c07-s03', number: '03', title: 'Gauss-Markov con reloj: exogeneidad estricta y errores', blocks: [
        { type: 'p', id: 'c07-s03-p01',
          html: 'En corte transversal, los supuestos se escriben sobre la muestra: linealidad, media condicional nula, no colinealidad, homocedasticidad. En series hay que escribirlos sobre el proceso y sobre todos los períodos. La buena noticia es que la fórmula de la varianza y el teorema de Gauss-Markov no cambian. La mala es que los supuestos tienen más filo: ahora involucran el pasado y el futuro de X.' },
        { type: 'assumptions', rows: [
          { title: 'Linealidad en los parámetros', text: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t1</sub> + … + β<sub>k</sub>X<sub>tk</sub> + u<sub>t</sub>. El proceso sigue un modelo lineal en los β; las X pueden ser logs, dummies o rezagos.' },
          { title: 'Media condicional nula', text: 'E(u<sub>t</sub> | X) = 0 para todo t. Ninguna X de ningún período predice el error de t.' },
          { title: 'No colinealidad perfecta', text: 'Las X no son combinación lineal exacta entre sí. Con series, la tendencia y los rezagos pueden acercarse peligrosamente a la colinealidad.' },
          { title: 'Homocedasticidad', text: 'Var(u<sub>t</sub> | X) = σ<sup>2</sup>. La dispersión del error no depende de las X ni del tiempo.' },
          { title: 'Ausencia de correlación serial', text: 'Corr(u<sub>t</sub>, u<sub>s</sub> | X) = 0 para t ≠ s. Los errores de distintos períodos no están correlacionados.' },
        ] },
        { type: 'formula', main: 'Bajo 1–3: E(β̂ | X) = β &nbsp;·&nbsp; Bajo 1–5: Var(β̂ | X) = σ<sup>2</sup>(X′X)<sup>−1</sup>',
          legend: [{ key: 'Insesgadez', text: 'Necesita linealidad, media condicional nula y no colinealidad. No necesita homocedasticidad ni ausencia de autocorrelación.' }, { key: 'Eficiencia', text: 'Con homocedasticidad y errores incorrelacionados, MCO es el mejor estimador lineal insesgado.' }, { key: 'Inferencia', text: 'Con normalidad de los errores, t y F tienen las distribuciones usuales. Sin ella, se apela a la asintótica.' }] },
        { type: 'compare',
          left: { tag: 'Contemporánea', title: 'E(u_t | X_t) = 0', text: 'Alcanza para que X<sub>t</sub> no esté correlacionada con el error del mismo período. Permite que el error de hoy esté correlacionado con X del pasado o del futuro.', eq: 'E(u<sub>t</sub> | X<sub>t</sub>) = 0' },
          right: { tag: 'Estricta', title: 'E(u_t | X_1, …, X_n) = 0', text: 'El error de cualquier período está incorrelacionado con todas las X: pasadas, presentes y futuras. Es la que garantiza insesgadez de MCO en muestras finitas con series.', eq: 'E(u<sub>t</sub> | X<sub>1</sub>, …, X<sub>n</sub>) = 0' } },
        { type: 'p', id: 'c07-s03-p02',
          html: 'La <span class="concept" data-concept="exogeneidad-estricta" tabindex="0" role="button">exogeneidad estricta</span> se rompe cuando X reacciona al pasado de Y. Una regla de política monetaria que sube la tasa porque la inflación del mes anterior fue alta hace que la tasa de hoy esté correlacionada con el error de ayer. También se rompe con factores omitidos persistentes y con errores de medida. El supuesto no se testea con un t: se argumenta con el diseño institucional y con el conocimiento del proceso.' },
        { type: 'errorTable', rows: [
          { error: 'Con autocorrelación, MCO es sesgado.', why: 'La autocorrelación no viola la exogeneidad por sí sola: afecta la eficiencia y los errores estándar. El sesgo aparece si X está correlacionada con u.', fix: 'Separá insesgadez (exogeneidad) de eficiencia (Gauss-Markov completo).' },
          { error: 'E(u_t | X_t) = 0 ya es exogeneidad estricta.', why: 'Solo cubre el mismo período; deja abierta la correlación con X pasadas o futuras.', fix: 'Escribí la condición sobre todas las X y preguntate si X reacciona al pasado de Y.' },
          { error: 'Homocedasticidad y ausencia de correlación serial son lo mismo.', why: 'Una es la varianza constante; la otra, la covarianza cero entre períodos distintos.', fix: 'Son dos supuestos distintos, con contrastes y correcciones distintas.' },
          { error: 'Si el R² es alto, los supuestos se cumplen.', why: 'El ajuste muestral no dice nada sobre exogeneidad ni sobre la estructura del error.', fix: 'Diagnosticá residuos y discutí el diseño antes de mirar el R².' },
        ] },
        { type: 'miniCheck', id: 'c07-check-03',
          question: 'Una empresa fija su precio mirando las ventas del mes anterior. Si el precio es regresor, ¿se viola la exogeneidad estricta?',
          intro: 'Seguí el camino del error de ayer hasta el regresor de hoy.',
          answer: 'Sí. Si P<sub>t</sub> depende de Y<sub>t−1</sub>, y Y<sub>t−1</sub> contiene u<sub>t−1</sub>, entonces P<sub>t</sub> está correlacionada con el error pasado. La exogeneidad contemporánea podría seguir valiendo si u<sub>t</sub> no está correlacionado con P<sub>t</sub>, pero la estricta falla. La consecuencia es que MCO puede ser sesgado e inconsistente en modelos dinámicos; hace falta otro diseño, rezagos instrumentales o variables instrumentales.' },
    ] },
    { id: 'c07-s04', number: '04', title: 'Tendencia, regresión espuria y eliminación', blocks: [
        { type: 'p', id: 'c07-s04-p01',
          html: 'Dos series que crecen juntas durante veinte años producen una regresión con R² cercano a uno y t enormes. El analista concluye que una explica a la otra. Si las dos solo crecen porque la población y el ingreso crecen, la conclusión es falsa. Ese fenómeno se llama <span class="concept" data-concept="tendencia" tabindex="0" role="button">regresión espuria</span>: hay correlación muestral sin una relación estable detrás.' },
        { type: 'p', id: 'c07-s04-p02',
          html: 'Una tendencia determinística es una función del tiempo alrededor de la cual la serie fluctúa. Puede ser lineal, exponencial o cuadrática. Lineal: la serie sube o baja una cantidad constante por período. Exponencial: crece a una tasa porcentual aproximadamente constante, y por eso se modela en logaritmos. Cuadrática: el crecimiento se acelera o se desacelera, y hace falta un término t<sup>2</sup>.' },
        { type: 'formula', main: 'Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + u<sub>t</sub><br>log Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + u<sub>t</sub> &nbsp;→&nbsp; Δ%Y ≈ 100·α<sub>1</sub><br>Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + α<sub>2</sub>t<sup>2</sup> + u<sub>t</sub>',
          legend: [{ key: 'Lineal', text: 'α<sub>1</sub> es el cambio absoluto por período, en unidades de Y.' }, { key: 'Exponencial', text: 'α<sub>1</sub> es una tasa de crecimiento. Si α<sub>1</sub> = 0,02, la serie crece aproximadamente 2% por período.' }, { key: 'Cuadrática', text: 'α<sub>2</sub> capta aceleración. El efecto marginal del tiempo es α<sub>1</sub> + 2α<sub>2</sub>t y cambia con t.' }] },
        { type: 'compare',
          left: { tag: 'Incluir t', title: 'La tendencia como regresor', text: 'La tendencia entra en el modelo y β<sub>1</sub> se estima condicionando en t. Es la forma habitual de controlar una tendencia determinística.', eq: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + β<sub>3</sub>t + u<sub>t</sub>' },
          right: { tag: 'Extraer', title: 'Regresar y quedarse con residuos', text: 'Se regresan Y y X por separado sobre t; los residuos son las variables sin tendencia. El β<sub>1</sub> que se obtiene es el mismo; cambia el R².', eq: 'Y<sub>t</sub>* = β<sub>1</sub>X<sub>t</sub>* + e<sub>t</sub>' } },
        { type: 'p', id: 'c07-s04-p03',
          html: 'Los dos métodos dan el mismo β̂<sub>1</sub> por el teorema de Frisch-Waugh. Cambian el R², los grados de libertad y la interpretación. El R² del modelo con t no es comparable con el de la regresión en residuos: en el segundo, la variable dependiente ya no es Y sino su parte no explicada por el tiempo. Si comparás R² entre esos modelos, estás comparando objetos distintos. Y si la serie es un paseo aleatorio, agregar t no la vuelve estacionaria: hay que diferenciar.' },
        { type: 'callout', variant: 'teal', label: 'Números índice y logaritmos',
          html: 'Muchas series macro son números índice: IPC, IPM, EMI. Sus magnitudes absolutas no son informativas; en logaritmos, un cambio de 0,01 en el logaritmo es aproximadamente 1%. Por eso se usan en log y el coeficiente de la tendencia se lee como tasa. Cambiar el año base solo desplaza el intercepto: las pendientes y las elasticidades no cambian.' },
        { type: 'errorTable', rows: [
          { error: 'R² = 0,98 y t = 15: hay relación.', why: 'Dos series con tendencia pueden correlacionarse sin relación causal. El t no tiene la distribución usual cuando las series no son estacionarias.', fix: 'Graficá, incluí t o diferenciá; mirá si la relación sobrevive y si los residuos se comportan.' },
          { error: 'Extraer la tendencia cambia el coeficiente de X.', why: 'Frisch-Waugh garantiza el mismo β<sub>1</sub> si el modelo es el mismo.', fix: 'Compará coeficientes, no R²; el R² de la regresión en residuos no es comparable.' },
          { error: 'La tendencia siempre es lineal.', why: 'Puede ser exponencial o cuadrática; una recta deja estructura en el error.', fix: 'Probá log Y y t<sup>2</sup>; contrastá la significancia de cada término.' },
          { error: 'Con t en el modelo ya está todo controlado.', why: 'Quedan estacionalidad, quiebres y autocorrelación.', fix: 'Sumá dummies estacionales, Chow y diagnósticos de residuos.' },
        ] },
        { type: 'miniCheck', id: 'c07-check-04',
          question: 'Dos series independientes, ambas con tendencia, dan β̂ = 2,3 y t = 8. ¿Qué concluís?',
          intro: 'Preguntate qué pasa si le sacás la tendencia a las dos.',
          answer: 'No podés concluir que exista una relación. Es el caso típico de regresión espuria: la tendencia común genera correlación y t inflados. La prueba es mirar qué pasa al incluir t o al estimar con las series sin tendencia. Si el coeficiente se vuelve pequeño y no significativo, la relación era un artefacto del tiempo. Si sobrevive, todavía hay que discutir exogeneidad y dinámica.' },
    ] },
    { id: 'c07-s05', number: '05', title: 'Estacionalidad: dummies mensuales y trimestrales', blocks: [
        { type: 'p', id: 'c07-s05-p01',
          html: 'Las ventas de una cadena caen cada enero y suben cada diciembre. Si el modelo omite el mes, el error de enero es sistemáticamente negativo y el de diciembre, positivo. Los residuos quedan correlacionados entre sí aunque no haya ninguna dinámica económica: la <span class="concept" data-concept="estacionalidad" tabindex="0" role="button">estacionalidad</span> se disfraza de autocorrelación y de errores estándar mal calculados.' },
        { type: 'formula', main: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + δ<sub>2</sub>M<sub>2t</sub> + … + δ<sub>12</sub>M<sub>12t</sub> + u<sub>t</sub>',
          legend: [{ key: 'M<sub>mt</sub>', text: 'Dummy que vale 1 si t cae en el mes m y 0 si no. Con enero como base se incluyen 11, de febrero a diciembre.' }, { key: 'δ<sub>m</sub>', text: 'Diferencia de nivel respecto de enero, manteniendo X constante. No es el nivel absoluto del mes m.' }, { key: 'β<sub>0</sub>', text: 'Nivel esperado de enero cuando X = 0. Si X no puede ser cero, el intercepto no tiene lectura económica directa.' }] },
        { type: 'cards', items: [
          { sym: 'Mensual', title: '11 dummies', text: 'Con enero como base. El contraste conjunto tiene 11 restricciones y 11 grados de libertad en el numerador.' },
          { sym: 'Trimestral', title: '3 dummies', text: 'Con el primer trimestre como base. Se usan cuando la frecuencia es trimestral; no mezcles dummies mensuales con datos trimestrales.' },
          { sym: 'Evento', title: 'No es estacionalidad', text: 'Una dummy de evento marca un período histórico, no un patrón que se repite cada año. Se interpreta distinto.' },
        ] },
        { type: 'p', id: 'c07-s05-p02',
          html: 'La interpretación de δ<sub>m</sub> es la diferencia de nivel respecto de la categoría base, manteniendo X constante. Si enero es la base, el intercepto es el nivel esperado de enero y δ<sub>m</sub> dice cuánto más o menos se espera en el mes m. No se incluyen las 12 dummies con intercepto: sería colinealidad perfecta. Si querés los 12 niveles, estimá sin intercepto y cambiá la lectura. El contraste relevante es conjunto: que ningún mes sea significativo al 5% no prueba que no haya estacionalidad.' },
        {
          type: "interactive",
          kind: "trend-season",
          label: "Laboratorio visual",
          title: "Tendencia y estacionalidad: dos componentes",
          intro: "Cambiá la pendiente y la amplitud estacional. La serie observada se separa en una tendencia lineal y un ciclo que se repite cada 12 meses.",
          hint: "La tendencia explica el nivel de largo plazo; la estacionalidad, el patrón dentro del año. Si omitís la estacionalidad, el residuo conserva ese ciclo y aparece autocorrelación."
        },
        { type: 'compare',
          left: { tag: 'En el modelo', title: 'Dummies junto con X', text: 'β<sub>1</sub> se estima condicionando en el mes y los efectos estacionales se reportan. Es la forma directa de controlar sin perder información.', eq: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + Σδ<sub>m</sub>M<sub>mt</sub> + u<sub>t</sub>' },
          right: { tag: 'Por residuos', title: 'Desestacionalizar primero', text: 'Se regresa cada variable sobre constante y dummies, y se modelan los residuos. El β<sub>1</sub> es el mismo, pero se pierde la lectura de los efectos estacionales y el R² no es comparable.', eq: 'Y<sub>t</sub>* = β<sub>1</sub>X<sub>t</sub>* + e<sub>t</sub>' } },
        { type: 'errorTable', rows: [
          { error: 'Pongo las 12 dummies y una constante.', why: 'Trampa de las dummies: las 12 suman 1 en cada período, igual que el intercepto. Hay colinealidad perfecta.', fix: 'Omití una categoría base o eliminá el intercepto, pero no las dos cosas a la vez.' },
          { error: 'El coeficiente de enero es cero, entonces enero no tiene efecto.', why: 'Enero es la base: su efecto está en el intercepto.', fix: 'Leé δ<sub>m</sub> como diferencia contra enero y aclará cuál es la base.' },
          { error: 'Ningún mes es significativo al 5%, no hay estacionalidad.', why: 'El contraste relevante es conjunto: 11 restricciones, no 11 t individuales.', fix: 'Hacé un F conjunto antes de concluir. La estacionalidad puede estar repartida.' },
          { error: 'La tendencia captura la estacionalidad.', why: 'Son patrones distintos: la tendencia es de largo plazo; la estacionalidad se repite dentro del año.', fix: 'Modelá las dos cosas por separado y contrastá cada una.' },
        ] },
        { type: 'miniCheck', id: 'c07-check-05',
          question: 'Con datos mensuales, ¿cuántas dummies incluís con intercepto y cómo contrastás la estacionalidad?',
          intro: 'Pensá en la trampa de las dummies y en el tipo de contraste.',
          answer: 'Con intercepto se incluyen 11 dummies y se omite una categoría base, por ejemplo enero. La estacionalidad se contrasta con un F conjunto de que los 11 coeficientes sean cero, no con los t individuales. Si la frecuencia es trimestral, son 3 dummies con el primer trimestre como base. Incluir las 12 con intercepto genera colinealidad perfecta y el software elimina una sin avisar.' },
    ] },
    { id: 'c07-s06', number: '06', title: 'Cambio estructural: la prueba de Chow', blocks: [
        { type: 'p', id: 'c07-s06-p01',
          html: 'La relación entre inversión y producto no tiene por qué ser la misma antes y después de una crisis, de un cambio de régimen o de una reforma. Si los coeficientes cambian, un único β promedio no describe ninguno de los dos períodos y las predicciones fallan. La prueba de <span class="concept" data-concept="chow" tabindex="0" role="button">Chow</span> contrasta esa estabilidad.' },
        { type: 'p', id: 'c07-s06-p02',
          html: 'La idea es comparar dos modelos. El restringido impone los mismos coeficientes en toda la muestra. El no restringido estima un juego de coeficientes para cada subperíodo y suma las SCR. Si la restricción es cierta, la pérdida de ajuste es chica; si los coeficientes cambian, la SCR restringida crece mucho. El estadístico es un F de restricciones múltiples, con la misma lógica que un F de exclusión.' },
        { type: 'formula', main: 'F = [(SCR<sub>R</sub> − (SCR<sub>1</sub> + SCR<sub>2</sub>))/p] / [(SCR<sub>1</sub> + SCR<sub>2</sub>)/(n − 2p)] ~ F<sub>p, n−2p</sub>',
          legend: [{ key: 'SCR<sub>R</sub>', text: 'Suma de cuadrados residual del modelo con un solo juego de coeficientes para toda la muestra.' }, { key: 'SCR<sub>1</sub>, SCR<sub>2</sub>', text: 'Sumas de cuadrados residual de las dos submuestras estimadas por separado.' }, { key: 'p', text: 'Cantidad de parámetros del modelo, incluido el intercepto. En el laboratorio, p = 19; los grados de libertad del denominador son n − 2p = 131 − 38 = 93.' }] },
        { type: 'assumptions', rows: [
          { title: 'Submuestras independientes', text: 'Los dos períodos no comparten errores y el corte es exógeno. Si el quiebre se elige mirando los datos, el p habitual no es válido.' },
          { title: 'Homocedasticidad', text: 'La versión clásica supone la misma varianza en los dos períodos. Si no se cumple, usá una versión robusta o un contraste de Wald.' },
          { title: 'Tamaño suficiente', text: 'Cada subperíodo necesita grados de libertad para estimar p parámetros. Con muestras chicas, el contraste tiene poca potencia.' },
          { title: 'Fecha de quiebre conocida', text: 'Chow requiere fijar el punto. Si lo elegís después de ver los datos, el p no está corregido por esa búsqueda.' },
        ] },
        { type: 'p', id: 'c07-s06-p03',
          html: 'Chow también se escribe con dummies e interacciones: Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + γ<sub>0</sub>D<sub>t</sub> + γ<sub>1</sub>(D<sub>t</sub>X<sub>t</sub>) + u<sub>t</sub>, con D<sub>t</sub> = 1 en el segundo período. Con una sola X, el F conjunto de γ<sub>0</sub> = γ<sub>1</sub> = 0 es el mismo contraste. La ventaja de esta forma es que se estima un solo modelo y se lee la magnitud del cambio; la desventaja es que hay que elegir bien la base y las interacciones.' },
        { type: 'errorTable', rows: [
          { error: 'Chow prueba que hubo cambio.', why: 'La hipótesis nula es estabilidad. El contraste busca evidencia contra ella, no a favor.', fix: 'No rechazar no prueba estabilidad: reportá el p, la potencia y las magnitudes.' },
          { error: 'Se puede usar con heterocedasticidad sin cambios.', why: 'El F clásico supone igual varianza en las dos submuestras.', fix: 'Usá una versión robusta o un Wald; o modelá la heterocedasticidad.' },
          { error: 'Elijo el punto de quiebre donde el p es más chico.', why: 'Eso invalida el p: es data snooping.', fix: 'Fijá la fecha por historia institucional o usá un contraste de quiebre desconocido.' },
          { error: 'Chow es solo para series de tiempo.', why: 'También se aplica a dos grupos en corte transversal, por ejemplo dos regiones.', fix: 'Es el mismo F de restricciones de igualdad entre dos poblaciones.' },
        ] },
        { type: 'miniCheck', id: 'c07-check-06',
          question: 'Un Chow con p = 0,99, ¿prueba que los coeficientes son iguales?',
          intro: 'Distinguí no rechazar de aceptar.',
          answer: 'No. Dice que los datos no aportan evidencia suficiente contra la estabilidad, no que la estabilidad sea verdadera. Puede haber poca potencia, submuestras chicas o coeficientes que cambian poco. La conclusión correcta es “no se rechaza la hipótesis de estabilidad al 5%”, y conviene acompañarla con las magnitudes y los intervalos de los coeficientes en cada subperíodo. No rechazar no es lo mismo que probar.' },
    ] },
    { id: 'c07-s07', number: '07', title: 'Rezagos distribuidos, Koyck y mapa de decisión', blocks: [
        { type: 'p', id: 'c07-s07-p01',
          html: 'Una suba de la tasa de interés no cambia la inversión el mismo mes: las empresas ajustan proyectos con demora. Una suba del ingreso no cambia todo el consumo de inmediato: los hábitos se actualizan con el tiempo. Los <span class="concept" data-concept="rezagos-distribuidos" tabindex="0" role="button">rezagos distribuidos</span> modelan esa respuesta escalonada. Las causas pueden ser psicológicas (hábitos), tecnológicas (ajuste de capital) o institucionales (contratos).' },
        { type: 'formula', main: 'Y<sub>t</sub> = α<sub>0</sub> + β<sub>0</sub>X<sub>t</sub> + β<sub>1</sub>X<sub>t−1</sub> + … + β<sub>q</sub>X<sub>t−q</sub> + u<sub>t</sub> &nbsp;·&nbsp; θ = β<sub>0</sub> + β<sub>1</sub> + … + β<sub>q</sub>',
          legend: [{ key: 'β<sub>0</sub>', text: 'Multiplicador de impacto: cambio inmediato de Y ante una unidad más de X.' }, { key: 'β<sub>j</sub>', text: 'Efecto en t + j. Al graficar β<sub>j</sub> contra j se obtiene la distribución de rezagos.' }, { key: 'θ', text: 'Multiplicador de largo plazo: cambio acumulado ante un aumento permanente de una unidad en X. Si hay logs, es una elasticidad de largo plazo.' }] },
        { type: 'p', id: 'c07-s07-p02',
          html: 'β<sub>0</sub> es el multiplicador de impacto y la suma es el de largo plazo. La reparametrización permite obtener θ con su error estándar directamente de la salida: se escribe Y<sub>t</sub> = α<sub>0</sub> + θX<sub>t</sub> + β<sub>1</sub>(X<sub>t−1</sub> − X<sub>t</sub>) + … + β<sub>q</sub>(X<sub>t−q</sub> − X<sub>t</sub>) + u<sub>t</sub>. El coeficiente de X<sub>t</sub> es θ y su ee ya incorpora las covarianzas entre los β. Sin la reparametrización, hay que calcular la suma y su varianza a mano. El problema práctico es la colinealidad entre rezagos: los β<sub>j</sub> individuales pueden ser imprecisos aunque la suma esté bien estimada. Por eso se reporta el multiplicador de largo plazo y se contrasta la hipótesis conjunta.' },
        { type: 'formula', main: 'Y<sub>t</sub> = α<sub>0</sub> + θ<sub>0</sub>X<sub>t</sub> + β<sub>1</sub>(X<sub>t−1</sub> − X<sub>t</sub>) + … + β<sub>q</sub>(X<sub>t−q</sub> − X<sub>t</sub>) + u<sub>t</sub>',
          legend: [{ key: 'θ<sub>0</sub>', text: 'Es la suma de los β. Su estimación puntual y su ee salen directo de la regresión reparametrizada.' }, { key: 'Contraste', text: 'H<sub>0</sub>: θ<sub>0</sub> = 0 se prueba con un t; un valor distinto de cero se prueba con (θ̂<sub>0</sub> − valor)/ee.' }, { key: 'Lectura', text: 'Los coeficientes de los términos en diferencias conservan la interpretación de los β<sub>j</sub> individuales.' }] },
        { type: 'p', id: 'c07-s07-p03',
          html: 'El modelo de Koyck impone una distribución geométrica: β<sub>j</sub> = β<sub>0</sub>ρ<sup>j</sup>, con 0 &lt; ρ &lt; 1. Cada rezago pesa menos que el anterior y el efecto se apaga. La suma infinita es β<sub>0</sub>/(1 − ρ). La transformación multiplica la ecuación rezagada por ρ y se la resta a la original; queda Y<sub>t</sub> = α + β<sub>0</sub>X<sub>t</sub> + ρY<sub>t−1</sub> + v<sub>t</sub>, con v<sub>t</sub> = u<sub>t</sub> − ρu<sub>t−1</sub>. Pasa de infinitos parámetros a tres: α, β<sub>0</sub> y ρ.' },
        { type: 'callout', variant: 'ochre', label: 'Koyck resuelve un problema y crea otro',
          html: 'La transformación elimina los infinitos rezagos, pero Y<sub>t−1</sub> queda correlacionada con v<sub>t</sub> porque v<sub>t</sub> contiene u<sub>t−1</sub>. MCO es inconsistente. Se necesita un instrumento para Y<sub>t−1</sub> o un supuesto especial, como errores AR(1). Es el puente hacia la clase 9: la endogeneidad no desaparece por reescribir la ecuación.' },
        { type: 'map', steps: [
          { n: '1', title: 'Frecuencia y unidad', text: '¿Mensual, trimestral o anual? ¿Niveles, logs o números índice? La frecuencia define qué dummies estacionales tienen sentido.' },
          { n: '2', title: 'Tendencia', text: 'Graficá. Contrastá el término lineal y el cuadrático. Si la serie se comporta como paseo aleatorio, diferenciá en lugar de agregar una recta.' },
          { n: '3', title: 'Estacionalidad', text: 'Dummies mensuales o trimestrales con una base, y contraste F conjunto. No alcanza con mirar los t individuales.' },
          { n: '4', title: 'Quiebre', text: '¿Hay un cambio de régimen con fecha conocida? Chow o dummies interactuadas. Si la fecha no se conoce, no uses el p de Chow sin corrección.' },
          { n: '5', title: 'Dinámica', text: '¿La relación es contemporánea o con rezagos? RD finito, multiplicador de largo plazo, Koyck. Reportá impacto y largo plazo.' },
          { n: '6', title: 'Supuestos y reporte', text: 'Exogeneidad estricta, homocedasticidad y ausencia de autocorrelación. Reportá n, transformación, tendencia, estacionalidad y límites causales.' },
        ] },
        { type: 'miniCheck', id: 'c07-check-07',
          question: 'En un RD con β̂<sub>0</sub> = 0,4, β̂<sub>1</sub> = 0,3 y β̂<sub>2</sub> = 0,1, ¿cuál es el efecto inmediato y el de largo plazo?',
          intro: 'Sumá, pero distinguí el primer período del acumulado.',
          answer: 'El efecto inmediato es 0,4. El de largo plazo es 0,4 + 0,3 + 0,1 = 0,8. Si X sube una unidad y se queda ahí, Y sube 0,4 en t, 0,3 más en t+1 y 0,1 más en t+2; a partir de ahí el nivel acumulado es 0,8. Decir que el efecto es 0,4 “para siempre” confunde el multiplicador de impacto con el de largo plazo.' },
    ] },
  ],
  concepts: {
    'proceso-estocastico': {
      title: 'Proceso estocástico',
      sub: 'Una sucesión de variables aleatorias indexadas en el tiempo.',
      esencia: `
        <div class="definition">Un proceso estocástico es una familia {Y<sub>t</sub> : t ∈ T} de variables aleatorias ordenadas por el tiempo. La serie que observás es una sola realización de ese proceso.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El índice t no es una etiqueta: el orden importa y no se puede alterar.</li>
          <li>No hay remuestreo: no se puede volver atrás y generar otra historia con los mismos shocks.</li>
          <li>La población relevante es el conjunto de todas las realizaciones posibles, no un conjunto de individuos.</li>
        </ul>
        <div class="formula small">{Y<sub>t</sub>}<sub>t=1</sub><sup>n</sup> &nbsp;→&nbsp; {y<sub>1</sub>, y<sub>2</sub>, …, y<sub>n</sub>}<span>Una realización de n períodos</span></div>
        <div class="badge-row"><span class="badge always">Siempre: orden temporal y una sola trayectoria</span><span class="badge optional">Según el caso: tendencia, estacionalidad o paseo aleatorio</span></div>
      `,
      ejemplo: `
        <p>El PBI trimestral de Argentina entre 1993 y 2008 es una realización de un proceso. Si la política económica hubiera sido otra, los shocks hubieran sido otros y la trayectoria observada también. No se puede repetir el experimento para obtener una segunda serie.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando decís “la serie tiene 120 observaciones”, estás diciendo que el proceso se observó 120 períodos. No son 120 unidades independientes: son 120 momentos de una misma historia.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que las series son datos poblacionales porque hay un solo país o una sola empresa.</strong> Los valores siguen siendo aleatorios; lo que falta es el muestreo de unidades.</li>
          <li><strong>Reordenar las observaciones para “balancear” la muestra.</strong> El orden temporal es información; reordenar destruye la dependencia y la interpretación.</li>
          <li><strong>Tratar las n observaciones como independientes.</strong> La covarianza entre períodos es parte del proceso y afecta los errores estándar.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar de dónde viene la aleatoriedad si no hay muestreo de personas ni de empresas.</p></div>
      `,
      conexiones: `<p>El proceso estocástico es el punto de partida para hablar de estacionariedad y de dependencia débil. Sin esa noción, los supuestos de Gauss-Markov en series quedan sin sujeto.</p>
        <div><button class="concept-chip" data-concept="estacionariedad">Estacionariedad →</button><button class="concept-chip" data-concept="dependencia-debil">Dependencia débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 3–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 10, §10.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024: V/F sobre series de tiempo como datos poblacionales.</p></div>
      `
    },
    estacionariedad: {
      title: 'Estacionariedad',
      sub: 'Las reglas probabilísticas no cambian con el calendario.',
      esencia: `
        <div class="definition">Una serie es débilmente estacionaria si E(Y<sub>t</sub>) = μ, Var(Y<sub>t</sub>) = σ<sup>2</sup> y Cov(Y<sub>t</sub>, Y<sub>t+j</sub>) = γ<sub>j</sub> para todo t. Media y varianza finitas y constantes; covarianza que depende solo de la distancia j.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>No exige normalidad ni independencia: exige que los momentos no dependan de t.</li>
          <li>Si la media cambia con t, hay tendencia; si la varianza cambia, hay heterocedasticidad.</li>
          <li>Sin estabilidad no hay un único modelo que valga para toda la muestra.</li>
        </ul>
        <div class="formula small">E(Y<sub>t</sub>) = μ &nbsp;·&nbsp; Var(Y<sub>t</sub>) = σ<sup>2</sup> &nbsp;·&nbsp; Cov(Y<sub>t</sub>, Y<sub>t+j</sub>) = γ<sub>j</sub><span>Estacionariedad débil</span></div>
        <div class="badge-row"><span class="badge always">Siempre: media, varianza y covarianza</span><span class="badge optional">Según el caso: tendencia determinística o raíz unitaria</span></div>
      `,
      ejemplo: `
        <p>Un ruido blanco con media cero y varianza constante es estacionario. Un paseo aleatorio no: su varianza es tσ<sup>2</sup> y crece con el tiempo. Una serie que fluctúa alrededor de una recta es estacionaria en tendencia; una que se va acumulando, no.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de estimar, graficá la serie y mirá si el nivel medio y la dispersión cambian. Si cambian, la primera decisión es cómo modelar esa no estacionariedad, no qué regresor agregar.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Confundir estacionariedad con ausencia de autocorrelación.</strong> Una serie puede ser estacionaria y tener memoria fuerte.</li>
          <li><strong>Decir que una serie con tendencia es estacionaria porque “oscila”.</strong> La media cambia con t; la tendencia hay que modelarla o extraerla.</li>
          <li><strong>Agregar t a un paseo aleatorio y creer que se arregló.</strong> El shock se acumula; el tratamiento es diferenciar, no una recta.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir cuál de los tres momentos falla en un paseo aleatorio.</p></div>
      `,
      conexiones: `<p>La estacionariedad es la condición que hace posible estimar un único modelo. Se conecta con la dependencia débil, que agrega la velocidad con la que se apaga la memoria, y con la tendencia, que es la forma más común de romperla.</p>
        <div><button class="concept-chip" data-concept="dependencia-debil">Dependencia débil →</button><button class="concept-chip" data-concept="tendencia">Tendencia →</button><button class="concept-chip" data-concept="proceso-estocastico">Proceso estocástico →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 6–9.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 11, §11.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 10, Actividad 2b.</p></div>
      `
    },
    'dependencia-debil': {
      title: 'Dependencia débil',
      sub: 'La memoria se apaga cuando los períodos se alejan.',
      esencia: `
        <div class="definition">Una serie es débilmente dependiente si Y<sub>t</sub> e Y<sub>t+j</sub> son casi independientes a medida que j crece: la covarianza γ<sub>j</sub> tiende a cero lo bastante rápido. Es la condición que permite promediar y aplicar la asintótica habitual en series.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Estacionariedad dice que las reglas no cambian; dependencia débil dice que el pasado lejano pesa poco.</li>
          <li>Sin dependencia débil, un promedio de n observaciones puede no converger: la ley de los grandes números no aplica.</li>
          <li>Es una condición sobre la covarianza, no sobre la media ni sobre la distribución completa.</li>
        </ul>
        <div class="formula small">Cov(Y<sub>t</sub>, Y<sub>t+j</sub>) = γ<sub>j</sub> &nbsp;→&nbsp; 0 &nbsp;cuando&nbsp; j → ∞<span>La memoria se apaga</span></div>
        <div class="badge-row"><span class="badge always">Siempre: covarianza que decae</span><span class="badge optional">Según el caso: AR(1) con |ρ| &lt; 1</span></div>
      `,
      ejemplo: `
        <p>Un AR(1) con |ρ| &lt; 1 es estacionario y débilmente dependiente: γ<sub>j</sub> = σ<sup>2</sup>ρ<sup>j</sup>/(1 − ρ<sup>2</sup>) decae geométricamente. Un paseo aleatorio no lo es: la covarianza entre Y<sub>t</sub> e Y<sub>t+j</sub> es tσ<sup>2</sup> y no se apaga con la distancia.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La dependencia débil es lo que permite usar errores estándar asintóticos y contrastes t y F habituales. Si la serie es muy persistente, esos errores subestiman la incertidumbre.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que dependencia débil es lo mismo que independencia.</strong> Es una versión más débil: la correlación se apaga, no desaparece de golpe.</li>
          <li><strong>Suponerla sin mirar la persistencia.</strong> Una serie con raíz unitaria no es débilmente dependiente.</li>
          <li><strong>Usar la asintótica habitual con n chico y mucha persistencia.</strong> La aproximación puede ser muy mala.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué un paseo aleatorio no cumple la condición aunque tenga media constante.</p></div>
      `,
      conexiones: `<p>La dependencia débil completa a la estacionariedad: una serie puede ser estable pero tener memoria larga. Juntas son la base de la inferencia en series y de los supuestos de Gauss-Markov con datos ordenados.</p>
        <div><button class="concept-chip" data-concept="estacionariedad">Estacionariedad →</button><button class="concept-chip" data-concept="proceso-estocastico">Proceso estocástico →</button><button class="concept-chip" data-concept="rezagos-distribuidos">Rezagos distribuidos →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 9–10.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 11, §11.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 10, Actividad 2.</p></div>
      `
    },
    'exogeneidad-estricta': {
      title: 'Exogeneidad estricta',
      sub: 'El error no está correlacionado con ninguna X, pasada, presente ni futura.',
      esencia: `
        <div class="definition">Las X son estrictamente exógenas si E(u<sub>t</sub> | X<sub>1</sub>, …, X<sub>n</sub>) = 0 para todo t. La exogeneidad contemporánea solo pide E(u<sub>t</sub> | X<sub>t</sub>) = 0.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La estricta implica la contemporánea, pero no al revés.</li>
          <li>Se rompe si X reacciona al pasado de Y, si hay factores omitidos persistentes o si hay errores de medida.</li>
          <li>Es la condición que sostiene la insesgadez de MCO en muestras finitas con series.</li>
        </ul>
        <div class="formula small">E(u<sub>t</sub> | X<sub>1</sub>, …, X<sub>n</sub>) = 0<span>Para todo t: pasado, presente y futuro de X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: condición sobre todos los períodos</span><span class="badge optional">Según el caso: feedback, omisión o medición</span></div>
      `,
      ejemplo: `
        <p>Si el banco central fija la tasa de interés mirando la inflación del mes anterior, la tasa de hoy está correlacionada con el error de ayer. La exogeneidad contemporánea puede valer, pero la estricta no. Un modelo dinámico con la tasa como regresor y la inflación como Y queda inconsistente si se estima por MCO.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La exogeneidad estricta no se testea con un t. Se argumenta con el proceso de decisión: quién fija X, con qué información y con qué rezago. Es una hipótesis de diseño, no un resultado de la salida.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que E(u_t | X_t) = 0 es exogeneidad estricta.</strong> Es solo contemporánea; no cubre X pasadas ni futuras.</li>
          <li><strong>Creer que la autocorrelación de los errores implica sesgo.</strong> Afecta eficiencia y errores estándar; el sesgo depende de la correlación entre X y u.</li>
          <li><strong>Suponerla porque el modelo es “macro”.</strong> Precisamente en macro es donde las reglas de política reaccionan al pasado.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés dar un ejemplo concreto de feedback entre Y y X.</p></div>
      `,
      conexiones: `<p>La exogeneidad estricta es el supuesto más frágil de Gauss-Markov en series. Se conecta con los rezagos distribuidos, porque incluir Y<sub>t−1</sub> como regresor suele violarla, y con la estacionariedad, porque sin estabilidad ni siquiera se puede definir el parámetro que se quiere estimar.</p>
        <div><button class="concept-chip" data-concept="rezagos-distribuidos">Rezagos distribuidos →</button><button class="concept-chip" data-concept="estacionariedad">Estacionariedad →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 11–14.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 10, §10.1; Cap. 11, §11.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024: series de tiempo como realizaciones y eliminación de tendencia.</p></div>
      `
    },
    tendencia: {
      title: 'Tendencia',
      sub: 'El nivel de la serie cambia sistemáticamente con el tiempo.',
      esencia: `
        <div class="definition">Una serie tiene tendencia determinística si su media es una función del tiempo. Puede ser lineal (α<sub>1</sub>t), exponencial (log Y = α<sub>0</sub> + α<sub>1</sub>t) o cuadrática (α<sub>1</sub>t + α<sub>2</sub>t<sup>2</sup>). Ignorarla puede producir regresión espuria.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Agregar t o extraer la tendencia por residuos da el mismo β<sub>1</sub>; cambia el R².</li>
          <li>La tendencia exponencial se estima en logs y α<sub>1</sub> se lee como tasa de crecimiento.</li>
          <li>Una tendencia cuadrática permite aceleración, pero no capta un quiebre.</li>
        </ul>
        <div class="formula small">Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + u<sub>t</sub><span>Lineal; log Y para tasa; + α<sub>2</sub>t<sup>2</sup> para curvatura</span></div>
        <div class="badge-row"><span class="badge always">Siempre: graficar y contrastar</span><span class="badge optional">Según el caso: lineal, exponencial o cuadrática</span></div>
      `,
      ejemplo: `
        <p>Ejemplo ilustrativo: el consumo de cerveza y la cantidad de jubilados pueden crecer juntos durante veinte años. La regresión da R² = 0,97 y t enormes. Si se incluye t, el coeficiente de una sobre la otra se derrumba: la asociación era la tendencia común, no una relación estable.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Graficá siempre. Un R² alto con residuos que se van alejando de cero es una señal de tendencia omitida. El contraste de significancia de t es el primer diagnóstico formal.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer un R² alto como prueba de relación.</strong> Dos series con tendencia se correlacionan aunque sean independientes.</li>
          <li><strong>Creer que extraer la tendencia cambia el coeficiente de X.</strong> Por Frisch-Waugh, el β<sub>1</sub> es el mismo; el R² no.</li>
          <li><strong>Usar solo una tendencia lineal.</strong> Si el crecimiento es porcentual, el log es la forma natural; si se acelera, hace falta t<sup>2</sup>.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué dos series sin relación pueden dar t = 15.</p></div>
      `,
      conexiones: `<p>La tendencia es la forma más común de no estacionariedad en media. Se conecta con la estacionalidad, que es otro patrón sistemático pero intraanual, y con Chow, porque un quiebre también cambia el nivel o la pendiente.</p>
        <div><button class="concept-chip" data-concept="estacionalidad">Estacionalidad →</button><button class="concept-chip" data-concept="chow">Chow →</button><button class="concept-chip" data-concept="estacionariedad">Estacionariedad →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 18–21.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 10, §10.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 10, Ejercicio 1a–e y Ejercicio 2.</p></div>
      `
    },
    estacionalidad: {
      title: 'Estacionalidad',
      sub: 'El valor esperado cambia según el mes o el trimestre.',
      esencia: `
        <div class="definition">Una serie con frecuencia mensual o trimestral es estacional si su nivel esperado depende de la estación del año. Se modela con dummies de mes o trimestre y una categoría base, y se contrasta con un F conjunto.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Con datos mensuales y constante se incluyen 11 dummies, no 12.</li>
          <li>δ<sub>m</sub> es la diferencia respecto de la base, no el nivel absoluto del mes.</li>
          <li>El contraste correcto es conjunto: 11 restricciones, no 11 t individuales.</li>
        </ul>
        <div class="formula small">Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + Σ<sub>m=2</sub><sup>12</sup> δ<sub>m</sub>M<sub>mt</sub> + u<sub>t</sub><span>Enero como base</span></div>
        <div class="badge-row"><span class="badge always">Siempre: base y contraste conjunto</span><span class="badge optional">Según el caso: mensual, trimestral o evento</span></div>
      `,
      ejemplo: `
        <p>En el laboratorio, el contraste conjunto de las 11 dummies mensuales da F(11, 112) = 0,851 con p = 0,59. Ningún mes es significativo al 5%; abril es el único que llega al 10%. La conclusión es que no hay evidencia de estacionalidad en las importaciones de cloruro de bario, no que “abril sea el único mes distinto”.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá el F conjunto y el p. Si el F no rechaza, no interpretes los t individuales como si fueran hallazgos: con 11 contrastes, alguno puede dar p &lt; 0,10 por azar.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Incluir las 12 dummies con intercepto.</strong> Colinealidad perfecta; el software elimina una y la lectura se vuelve confusa.</li>
          <li><strong>Leer el coeficiente de la base como cero.</strong> La base está en el intercepto.</li>
          <li><strong>Concluir con los t individuales.</strong> La estacionalidad puede estar repartida entre varios meses; hace falta el F conjunto.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No sabés cuántas dummies incluir ni cuál es la base.</p></div>
      `,
      conexiones: `<p>La estacionalidad es un patrón sistemático distinto de la tendencia: se repite cada año. Se conecta con Chow, porque un cambio de régimen puede alterar el patrón estacional, y con la tendencia, porque ambas deben modelarse por separado.</p>
        <div><button class="concept-chip" data-concept="tendencia">Tendencia →</button><button class="concept-chip" data-concept="chow">Chow →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 22.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 10, §10.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 10, Ejercicio 1b y Ejercicio 3c.</p></div>
      `
    },
    chow: {
      title: 'Prueba de Chow',
      sub: '¿Los coeficientes son los mismos en dos períodos?',
      esencia: `
        <div class="definition">La prueba de Chow contrasta la estabilidad de todos los coeficientes entre dos submuestras. Compara la SCR del modelo restringido (un solo juego de coeficientes) con la suma de las SCR de los dos modelos estimados por separado.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>H<sub>0</sub>: los coeficientes son iguales en los dos períodos. H<sub>1</sub>: al menos uno cambia.</li>
          <li>Es un F de restricciones múltiples, equivalente a un F conjunto de dummies e interacciones.</li>
          <li>Requiere fecha de quiebre conocida y, en la versión clásica, homocedasticidad.</li>
        </ul>
        <div class="formula small">F = [(SCR<sub>R</sub> − (SCR<sub>1</sub> + SCR<sub>2</sub>))/p] / [(SCR<sub>1</sub> + SCR<sub>2</sub>)/(n − 2p)]<span>~ F<sub>p, n−2p</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: H<sub>0</sub> de estabilidad y p de quiebre</span><span class="badge optional">Según el caso: corte transversal o serie</span></div>
      `,
      ejemplo: `
        <p>En el laboratorio, el Chow en t = 100 da F(19, 93) = 0,355 con p = 0,994. No se rechaza la estabilidad. Con 19 restricciones y 93 grados de libertad, el resultado es compatible con coeficientes iguales, pero también con cambios pequeños que el test no tiene potencia para detectar.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá F, los dos grados de libertad y el p. Aclará que no rechazar no prueba estabilidad. Si el quiebre es el centro de la pregunta, complementá con las magnitudes estimadas en cada subperíodo.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que Chow “prueba” que no hubo cambio.</strong> Solo no rechaza la hipótesis nula de estabilidad.</li>
          <li><strong>Aplicar el F clásico con heterocedasticidad.</strong> La versión clásica supone igual varianza; usá una versión robusta.</li>
          <li><strong>Elegir el punto de quiebre mirando el p más chico.</strong> Eso invalida la inferencia; la fecha debe ser exógena o el contraste debe corregirse.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés escribir H<sub>0</sub> ni decir cuántos grados de libertad tiene el numerador.</p></div>
      `,
      conexiones: `<p>Chow es el contraste de estabilidad que complementa el análisis de tendencia y estacionalidad: un quiebre puede cambiar el nivel, la pendiente o el patrón estacional. También se conecta con la exogeneidad estricta, porque un cambio de régimen suele venir acompañado de cambios en la forma en que X reacciona a Y.</p>
        <div><button class="concept-chip" data-concept="tendencia">Tendencia →</button><button class="concept-chip" data-concept="estacionalidad">Estacionalidad →</button><button class="concept-chip" data-concept="exogeneidad-estricta">Exogeneidad estricta →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 15–16.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 10; el contraste se arma como un F conjunto de dummies e interacciones.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 10, Actividades 3–4 y Ejercicio 3d.</p></div>
      `
    },
    'rezagos-distribuidos': {
      title: 'Rezagos distribuidos',
      sub: 'La respuesta de Y a X no es instantánea.',
      esencia: `
        <div class="definition">Un modelo de rezagos distribuidos finitos incluye X<sub>t</sub>, X<sub>t−1</sub>, …, X<sub>t−q</sub>. β<sub>0</sub> es el multiplicador de impacto y la suma de los β<sub>j</sub> es el multiplicador de largo plazo.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El multiplicador de impacto es el cambio inmediato; el de largo plazo, el acumulado ante un aumento permanente.</li>
          <li>La reparametrización permite estimar la suma con su error estándar directamente.</li>
          <li>Los rezagos suelen estar muy correlacionados: los β<sub>j</sub> individuales son imprecisos aunque la suma esté bien estimada.</li>
        </ul>
        <div class="formula small">Y<sub>t</sub> = α<sub>0</sub> + β<sub>0</sub>X<sub>t</sub> + … + β<sub>q</sub>X<sub>t−q</sub> + u<sub>t</sub><span>θ = Σβ<sub>j</sub>: multiplicador de largo plazo</span></div>
        <div class="badge-row"><span class="badge always">Siempre: impacto y largo plazo</span><span class="badge optional">Según el caso: finito o Koyck geométrico</span></div>
      `,
      ejemplo: `
        <p>Ejemplo ilustrativo: si β<sub>0</sub> = 0,4, β<sub>1</sub> = 0,3 y β<sub>2</sub> = 0,1, una suba permanente de una unidad en X eleva Y en 0,4 el primer período, 0,3 más el siguiente y 0,1 más el otro. El efecto acumulado es 0,8. El impacto es 0,4; el largo plazo, 0,8.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá la distribución de rezagos, el multiplicador de impacto y el de largo plazo. Si los t individuales no son significativos pero el F conjunto sí, no concluyas que no hay efecto: la colinealidad entre rezagos infla los errores estándar individuales.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Interpretar β<sub>0</sub> como el efecto total.</strong> Es solo el impacto; el acumulado es la suma.</li>
          <li><strong>Concluir que no hay efecto porque ningún β<sub>j</sub> es significativo.</strong> Mirá el contraste conjunto y el multiplicador de largo plazo.</li>
          <li><strong>Estimar Koyck por MCO sin discutir la endogeneidad de Y<sub>t−1</sub>.</strong> v<sub>t</sub> contiene u<sub>t−1</sub>; MCO es inconsistente salvo casos especiales.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir el efecto del primer período del efecto acumulado.</p></div>
      `,
      conexiones: `<p>Los rezagos distribuidos introducen dinámica y, con ella, problemas de exogeneidad. Koyck es el caso infinito con ponderación geométrica. Se conecta con la dependencia débil, porque la memoria de la serie es lo que hace que los rezagos importen.</p>
        <div><button class="concept-chip" data-concept="exogeneidad-estricta">Exogeneidad estricta →</button><button class="concept-chip" data-concept="dependencia-debil">Dependencia débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 7, diap. 23–32.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 10, §10.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 10, Ejercicio 3: dummies de evento y dinámica de la respuesta.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de series de tiempo',
    intro: 'La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto del TP 10. Las actividades fijan los conceptos; los ejercicios 1, 2 y 6 recorren tendencia, estacionalidad, tendencia cuadrática y primeras diferencias. El laboratorio usa barium, el mismo ejercicio 3 del TP, para leer una salida real con tendencia, dummies mensuales y Chow.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-10',
    exercises: [
      {
        label: 'TP 10 · Act. 1',
        title: 'Tres afirmaciones sobre tendencia y estacionalidad',
        text: 'Decidí si la variable tiempo corrige la tendencia solo de Y, si también capta estacionalidad y si la única tendencia posible es la lineal. Justificá cada respuesta con el modelo y con un contraejemplo.',
        tags: ['Conceptual', 'V/F'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-9'
      },
      {
        label: 'TP 10 · Act. 2',
        title: 'Regresión espuria y estacionariedad',
        text: 'Definí regresión espuria, explicá qué significa que una serie sea estacionaria y por qué hay que eliminar tendencia y estacionalidad antes de estimar. Conectá cada respuesta con el supuesto de Gauss-Markov que se rompe.',
        tags: ['Conceptual', 'Estacionariedad'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-5'
      },
      {
        label: 'TP 10 · Act. 3 y 4',
        title: 'Chow: supuestos, H0 y estabilidad',
        text: 'Resolvé el V/F sobre errores heterocedásticos y sobre el uso de Chow en corte transversal. Después formulá H0 para ambos diseños y discutí si los coeficientes de un modelo macro argentino 1990–2019 pueden ser estables.',
        tags: ['Chow', 'H0'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-3'
      },
      {
        label: 'TP 10 · Ej. 1',
        title: 'Inversión y PBI trimestral, 1993–2008',
        text: 'Analizá gráficamente tendencia y estacionalidad; contrastá dummies trimestrales y tendencia; desestacionalizá y estimá en logs; compará con el método de residuos y calculá esperanzas condicionales para el primer y el último trimestre.',
        tags: ['Tendencia', 'Estacionalidad', 'Logs'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-9'
      },
      {
        label: 'TP 10 · Ej. 2',
        title: 'Consumo, ingreso y población',
        text: 'Estimá el consumo de no durables con y sin tiempo, extraé la tendencia lineal de todas las variables y repetí con una tendencia cuadrática. Compará coeficientes y discutí si tiene sentido incluir t cuando solo las X tienen tendencia.',
        tags: ['Tendencia lineal', 'Cuadrática'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-9'
      },
      {
        label: 'TP 10 · Ej. 6',
        title: 'Salarios, precios y primeras diferencias',
        text: 'Transformá wages y price en series de tiempo, graficá niveles y diferencias, estimá la regresión en diferencias y aplicá Chow en t = 150. Interpretá qué representa cada transformación y qué cambia en la estabilidad.',
        tags: ['Diferencias', 'Chow'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-6-7'
      }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 10 · Ej. 3',
      title: 'Importaciones de cloruro de bario: tendencia, estacionalidad y Chow',
      intro: 'La base barium permite estimar la ecuación del ejercicio 10.2 de Wooldridge con una tendencia lineal, tres dummies de evento y once dummies mensuales. La salida muestra un patrón incómodo y muy útil: la tendencia es el único regresor significativo al 5%, la estacionalidad conjunta no se rechaza y el Chow no detecta un quiebre en t = 100.',
      dataNote: 'barium.rda contiene n = 131 observaciones mensuales. chnimp es el volumen de importación de cloruro de bario de China; chempi, un índice de producción química; gas, el volumen de producción de combustible; rtwex, un índice del tipo de cambio. befile6, affile6 y afdec6 son dummies de evento (seis meses antes de la demanda, seis meses después y seis meses después del fallo). time es el índice temporal 1…131 y feb…dec son dummies mensuales, con enero como base. La muestra es observacional: los coeficientes son asociaciones condicionales, no efectos causales. El script supone que el archivo está en el directorio de trabajo. La tendencia es significativa (t = 3,149; p = 0,0021), la estacionalidad conjunta no se rechaza (F(11, 112) = 0,851; p ≈ 0,59) y el Chow en t = 100 no rechaza la estabilidad (F(19, 93) = 0,355; p ≈ 0,99).',
      script: `load("barium.rda")

modelo <- lm(log(chnimp) ~ log(chempi) + log(gas) + log(rtwex) +
               befile6 + affile6 + afdec6 + time +
               feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec,
             data = base)
summary(modelo)

suppressPackageStartupMessages(library(car))
# Ej. 3c: estacionalidad conjunta
linearHypothesis(modelo, c("feb = 0", "mar = 0", "apr = 0", "may = 0",
                           "jun = 0", "jul = 0", "aug = 0", "sep = 0",
                           "oct = 0", "nov = 0", "dec = 0"))

# Ej. 3b: significatividad conjunta de todo, salvo la tendencia
linearHypothesis(modelo, c("log(chempi) = 0", "log(gas) = 0", "log(rtwex) = 0",
                           "befile6 = 0", "affile6 = 0", "afdec6 = 0"))

# Ej. 3d: Chow en t = 100
form <- log(chnimp) ~ log(chempi) + log(gas) + log(rtwex) +
        befile6 + affile6 + afdec6 + time +
        feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec
m1 <- lm(form, data = base, subset = time <= 100)
m2 <- lm(form, data = base, subset = time > 100)
rss <- sum(resid(modelo)^2)
rss_split <- sum(resid(m1)^2) + sum(resid(m2)^2)
q <- length(coef(modelo)); df2 <- nrow(base) - 2 * q
F <- ((rss - rss_split) / q) / (rss_split / df2)
c(F = F, p = pf(F, q, df2, lower.tail = FALSE))`,
      output: `Call:
lm(formula = log(chnimp) ~ log(chempi) + log(gas) + log(rtwex) + 
    befile6 + affile6 + afdec6 + time + feb + mar + apr + may + 
    jun + jul + aug + sep + oct + nov + dec, data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-1.86369 -0.36268  0.02337  0.37210  1.09596 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)   
(Intercept) 28.425832  31.566465   0.901   0.3698   
log(chempi) -0.444672   1.270653  -0.350   0.7270   
log(gas)    -0.869786   1.352121  -0.643   0.5214   
log(rtwex)  -0.204631   0.529252  -0.387   0.6998   
befile6      0.164720   0.256923   0.641   0.5228   
affile6      0.153386   0.271859   0.564   0.5737   
afdec6      -0.293737   0.299432  -0.981   0.3287   
time         0.012328   0.003915   3.149   0.0021 **
feb         -0.359743   0.293222  -1.227   0.2224   
mar          0.062701   0.254601   0.246   0.8059   
apr         -0.442353   0.258399  -1.712   0.0897 . 
may          0.033655   0.259410   0.130   0.8970   
jun         -0.199871   0.259179  -0.771   0.4422   
jul          0.013925   0.268472   0.052   0.9587   
aug         -0.124524   0.267841  -0.465   0.6429   
sep         -0.074777   0.258309  -0.289   0.7727   
oct          0.080103   0.257008   0.312   0.7559   
nov         -0.260083   0.253016  -1.028   0.3062   
dec          0.100037   0.262029   0.382   0.7034   
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.5787 on 112 degrees of freedom
Multiple R-squared:  0.4108,	Adjusted R-squared:  0.3161 
F-statistic: 4.338 on 18 and 112 DF,  p-value: 6.085e-07


Linear hypothesis test:
feb = 0
mar = 0
apr = 0
may = 0
jun = 0
jul = 0
aug = 0
sep = 0
oct = 0
nov = 0
dec = 0

Model 1: restricted model
Model 2: log(chnimp) ~ log(chempi) + log(gas) + log(rtwex) + befile6 + 
    affile6 + afdec6 + time + feb + mar + apr + may + jun + jul + 
    aug + sep + oct + nov + dec

  Res.Df    RSS Df Sum of Sq     F Pr(>F)
1    123 40.639                           
2    112 37.505 11    3.1347 0.851   0.59

Linear hypothesis test:
log(chempi) = 0
log(gas) = 0
log(rtwex) = 0
befile6 = 0
affile6 = 0
afdec6 = 0

Model 1: restricted model
Model 2: log(chnimp) ~ log(chempi) + log(gas) + log(rtwex) + befile6 + 
    affile6 + afdec6 + time + feb + mar + apr + may + jun + jul + 
    aug + sep + oct + nov + dec

  Res.Df    RSS Df Sum of Sq     F Pr(>F)
1    118 38.580                           
2    112 37.505  6    1.0753 0.5352 0.7805
        F         p 
0.3549164 0.9937097`,
      confint: `                    2.5 %      97.5 %
(Intercept) -34.119072659 90.97073726
log(chempi)  -2.962307616  2.07296400
log(gas)     -3.548841049  1.80926972
log(rtwex)   -1.253276111  0.84401492
befile6      -0.344341226  0.67378058
affile6      -0.385267157  0.69203976
afdec6       -0.887022071  0.29954832
time          0.004571168  0.02008527
feb          -0.940725022  0.22123985
mar          -0.441758745  0.56716143
apr          -0.954337642  0.06963229
may          -0.480332367  0.54764201
jun          -0.713401190  0.31366007
jul          -0.518017519  0.54586824
aug          -0.655217174  0.40616920
sep          -0.586584290  0.43702975
oct          -0.429126702  0.58933188
nov          -0.761401829  0.24123566
dec          -0.419141201  0.61921450`,
      readingTable: [
        {
          element: 'Estimate',
          meaning: 'Coeficiente estimado en el modelo de log(chnimp).',
          how: 'En los regresores en log es una elasticidad; en time es una semi-elasticidad; en las dummies es una diferencia de log.'
        },
        {
          element: 'Std. Error',
          meaning: 'Error estándar del coeficiente.',
          how: 'Mide la precisión. Con 19 parámetros y 131 observaciones, los errores son grandes: la mayoría de los intervalos incluye el cero.'
        },
        {
          element: 't value y Pr(>|t|)',
          meaning: 'Cociente coeficiente/ee y valor p bilateral.',
          how: 'Solo time es significativo al 5%. No confundir significancia individual con significancia conjunta.'
        },
        {
          element: 'time',
          meaning: 'Tendencia lineal mensual.',
          how: '0,012328: 1,23% más por mes en promedio. El intervalo al 95% va de 0,46% a 2,01% mensual.'
        },
        {
          element: 'feb … dec',
          meaning: 'Dummies mensuales, enero base.',
          how: 'Cada coeficiente es la diferencia de log(chnimp) respecto de enero. Ninguno es significativo al 5%; abril es el único al 10%.'
        },
        {
          element: 'befile6, affile6, afdec6',
          meaning: 'Dummies de evento de la demanda antidumping.',
          how: 'Coeficientes pequeños e imprecisos. No hay evidencia de un efecto claro en esta especificación.'
        },
        {
          element: 'Residual standard error',
          meaning: 'Desvío estándar de los residuos en logaritmos.',
          how: '0,5787 en logaritmos: un factor de exp(0,5787) ≈ 1,78, es decir, una dispersión multiplicativa cercana a ±78% en chnimp.'
        },
        {
          element: 'Multiple R-squared y Adjusted',
          meaning: 'Proporción de variación de log(chnimp) explicada.',
          how: '0,4108 y 0,3161. El ajuste es moderado y no prueba que el modelo sea causalmente correcto.'
        },
        {
          element: 'F-statistic',
          meaning: 'Contraste conjunto de que las 18 pendientes son cero.',
          how: 'F(18, 112) = 4,338, p = 6,085e-07: al menos un regresor aporta, sobre todo la tendencia.'
        },
        {
          element: 'linearHypothesis estacionalidad',
          meaning: 'F conjunto de las 11 dummies mensuales.',
          how: 'F(11, 112) = 0,851, p = 0,59: no se rechaza ausencia de estacionalidad.'
        },
        {
          element: 'linearHypothesis sin tendencia',
          meaning: 'F conjunto de los tres logs y las tres dummies de evento.',
          how: 'F(6, 112) = 0,535, p = 0,78: no aportan, condicionado en tendencia y meses.'
        },
        {
          element: 'Chow en t = 100',
          meaning: 'Contraste de estabilidad de los 19 coeficientes.',
          how: 'F(19, 93) = 0,355, p = 0,994: no se rechaza estabilidad. Ojo con la potencia.'
        }
      ],
      econometric: `<p><strong>El modelo.</strong> Se estima log(chnimp) sobre tres regresores en log, tres dummies de evento, una tendencia y once dummies mensuales. Son 19 parámetros y 112 grados de libertad. El R<sup>2</sup> es 0,4108 y el R<sup>2</sup> ajustado, 0,3161. El error residual es 0,5787 en logaritmos: el modelo deja una dispersión considerable.</p>
        <p><strong>La tendencia.</strong> El coeficiente de time es 0,012328 con ee 0,003915, t = 3,149 y p = 0,0021. Es el único regresor significativo al 5%. La lectura es 1,23% más por mes en promedio, con intervalo [0,46%; 2,01%]. Anualizado, equivale a un crecimiento cercano al 15,9%: exp(12 × 0,012328) − 1 ≈ 0,159.</p>
        <p><strong>Estacionalidad.</strong> El contraste conjunto de las once dummies mensuales da F(11, 112) = 0,851, p = 0,59. No se rechaza que los efectos mensuales sean conjuntamente cero. El único coeficiente con p &lt; 0,10 es abril (−0,442, p = 0,0897), pero con once contrastes ese resultado individual no alcanza para afirmar un patrón estacional.</p>
        <p><strong>Variables sin tendencia.</strong> El F conjunto de los tres logs y las tres dummies de evento da F(6, 112) = 0,5352, p = 0,7805. Condicionado en la tendencia y en los meses, ese bloque no aporta. Los coeficientes individuales de log(chempi), log(gas) y log(rtwex) son negativos pero muy imprecisos: sus intervalos incluyen valores positivos y negativos grandes. No se leen como efectos causales.</p>
        <p><strong>Chow.</strong> El contraste en t = 100 compara 19 restricciones. F(19, 93) = 0,3549, p = 0,9937. No se rechaza la estabilidad de los coeficientes. La conclusión honesta es que los datos no aportan evidencia suficiente contra un solo régimen; no que los coeficientes sean idénticos. Con 19 restricciones y 93 grados de libertad, la potencia puede ser baja.</p>`,
      economic: `<p>La serie es el volumen de importación de cloruro de bario de China, un insumo industrial. chempi controla la demanda general de la industria química; gas, la producción de combustible; rtwex, el tipo de cambio. Las tres variables deberían mover la demanda de importaciones, pero en esta muestra, una vez que se controla por tendencia y meses, no queda evidencia clara de que lo hagan.</p>
        <p>La tendencia de 1,23% mensual describe el crecimiento de largo plazo del mercado, no un efecto causal del paso del tiempo. Puede reflejar crecimiento de la industria, cambios en la demanda internacional o una tendencia tecnológica no observada. El modelo no distingue entre esas explicaciones.</p>
        <p>Las dummies de evento buscan captar el efecto de la demanda antidumping: los seis meses previos, los seis posteriores y los seis meses después del fallo. Los coeficientes son pequeños y no significativos. Eso no prueba que la política no haya tenido efecto: puede haber heterogeneidad, anticipación o falta de potencia con 131 meses.</p>
        <p>La estacionalidad no aparece en los datos. La conclusión práctica es que, para esta serie, el ajuste por mes no mejora la explicación y que el crecimiento se describe mejor con una tendencia. Cualquier afirmación causal requiere un diseño más rico que una regresión observacional con dummies.</p>`,
      errors: [
        'Leer 0,012328 como 0,012% mensual. En un modelo semilogarítmico, el coeficiente se multiplica por 100: es 1,23% por mes.',
        'Decir que no hay estacionalidad porque ningún mes es significativo al 5%. El contraste correcto es el F conjunto de las once dummies.',
        'Interpretar los coeficientes negativos de log(chempi), log(gas) o log(rtwex) como efectos causales. Son imprecisos y están condicionados a la tendencia y a los meses.',
        'Concluir que el modelo es bueno por el R² de 0,41 o malo porque el error residual es 0,58. El ajuste se interpreta con la pregunta y con la dispersión de la serie.',
        'Decir que el Chow con p = 0,994 prueba que no hubo cambio estructural. No rechazar no es probar; la potencia del contraste importa.',
        'Comparar el R² de este modelo con el de una regresión en niveles o con el de un modelo sin tendencia. La variable dependiente y el conjunto de regresores cambian.'
      ],
      checklist: [
        'Graficá la serie y describí tendencia y estacionalidad antes de estimar.',
        'Reportá n, frecuencia, unidad de chnimp y la transformación logarítmica.',
        'Interpretá time como cambio porcentual por mes y, si hace falta, anualizá con exp(12b) − 1.',
        'Contrastá la estacionalidad con un F conjunto de las once dummies, no con los t individuales.',
        'Hacé el Chow con fecha exógena, reportá F, los dos grados de libertad y el p; aclará H0.',
        'Separá significancia estadística, magnitud económica y límites causales del diseño observacional.'
      ]
    },
    partials: [
      {
        label: '2P 2024',
        text: 'V/F: “Las observaciones de series de tiempo se consideran datos poblacionales”. Justificá con la noción de proceso estocástico y de realización: son variables aleatorias, pero su aleatoriedad no viene del muestreo de unidades.'
      },
      {
        label: '2P 2024',
        text: 'Escribí las ecuaciones de eliminación de tendencia por los dos métodos, con dos variables explicativas, y la hipótesis a contrastar con su distribución. Repetí para estacionalidad con datos cuatrimestrales: dos dummies y un F conjunto.'
      }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a decidir qué hacer con una serie antes de estimar y a leer contrastes conjuntos. Respondé antes de abrir la solución; si tu respuesta no distingue estimación de interpretación, volvé a la sección correspondiente.',
    questions: [
      {
        q: '¿Por qué una serie de tiempo es una sola realización y qué papel cumple la población?',
        a: 'Porque el tiempo no se repite: se observa una trayectoria del proceso, no varias. La población es el conjunto de trayectorias que podrían haberse dado si las condiciones y los shocks hubieran sido distintos. Esa población es contrafáctica, no un conjunto de individuos. La inferencia reemplaza las repeticiones ausentes con supuestos de estacionariedad y dependencia débil.'
      },
      {
        q: '¿Qué se rompe si reordenás las observaciones de una serie?',
        a: 'Se destruye la dependencia temporal, que es parte del objeto de estudio. Los rezagos, las diferencias y la autocorrelación dejan de tener sentido; el orden es información. Además, un modelo con tendencia o estacionalidad requiere que t y las dummies estén alineados con el calendario. Reordenar no es un cambio inocente de formato.'
      },
      {
        q: '¿Cuál es la diferencia entre estacionariedad y dependencia débil?',
        a: 'La estacionariedad dice que media, varianza y covarianzas no dependen del calendario. La dependencia débil dice que la covarianza entre dos períodos se apaga cuando la distancia crece. Una serie puede ser estacionaria y muy persistente; si la persistencia no decae, los promedios no convergen y la asintótica habitual falla. Las dos condiciones se necesitan para estimar e inferir con comodidad.'
      },
      {
        q: '¿Un paseo aleatorio es estacionario? ¿Qué logra la primera diferencia?',
        a: 'No: su varianza es tσ<sup>2</sup> y la covarianza depende de la fecha. La primera diferencia ΔY<sub>t</sub> = e<sub>t</sub> es estacionaria si los e<sub>t</sub> son ruido blanco. Eso no significa que diferenciar sea siempre la solución: si la serie es estacionaria en tendencia, conviene modelar la tendencia; diferenciar una serie con tendencia determinística puede introducir una autocorrelación artificial.'
      },
      {
        q: '¿Qué supuestos de Gauss-Markov fallan con autocorrelación y qué propiedades de MCO se pierden?',
        a: 'Falla la ausencia de correlación serial. MCO sigue siendo insesgado si se mantiene la exogeneidad estricta, pero deja de ser eficiente y los errores estándar usuales son incorrectos. Por eso los t y los F no son válidos. La solución no es cambiar de estimador necesariamente: se pueden usar errores robustos a autocorrelación o un estimador eficiente como Prais-Winsten, que se ve en la clase 8.'
      },
      {
        q: '¿Qué diferencia hay entre exogeneidad contemporánea y estricta?',
        a: 'La contemporánea solo pide que el error de t esté incorrelacionado con las X de t. La estricta pide que esté incorrelacionado con todas las X, pasadas, presentes y futuras. La estricta implica la contemporánea. Se viola la estricta cuando X reacciona al pasado de Y, por ejemplo con una regla de política que mira la inflación anterior.'
      },
      {
        q: '¿Por qué una tendencia común puede producir una regresión espuria?',
        a: 'Porque dos series que crecen con el tiempo se correlacionan aunque no tengan ninguna relación causal. El modelo omite t, el error queda con tendencia y el coeficiente de X recoge esa variación común. El R² y los t se inflan. La solución es incluir la tendencia, extraerla por residuos o diferenciar, y verificar si la relación sobrevive.'
      },
      {
        q: '¿Por qué el R² del modelo con tendencia no es comparable con el de la regresión en residuos?',
        a: 'Porque la variable dependiente es distinta. En el primer modelo se explica Y; en el segundo, la parte de Y no explicada por t. Por Frisch-Waugh, el coeficiente de X es el mismo, pero el R² mide proporciones de variación de objetos diferentes. Comparar esos R² es comparar dos modelos con distinta Y, algo que ya viste en la clase 4.'
      },
      {
        q: 'Con datos mensuales, ¿cómo modelás la estacionalidad y cómo la contrastás?',
        a: 'Con una constante y once dummies mensuales, omitiendo una categoría base, por ejemplo enero. Cada coeficiente es la diferencia respecto de enero. El contraste correcto es un F conjunto de que las once sean cero. Si usás doce dummies con constante, hay colinealidad perfecta. Con datos trimestrales, son tres dummies y la base es el primer trimestre.'
      },
      {
        q: '¿Qué contrasta Chow y qué significa un p = 0,99?',
        a: 'Chow contrasta H<sub>0</sub>: los coeficientes son iguales en los dos períodos, contra la alternativa de que al menos uno cambia. Compara la SCR restringida con la suma de las SCR de las dos submuestras. Un p = 0,99 dice que los datos no aportan evidencia contra la estabilidad; no prueba que los coeficientes sean iguales. Puede haber poca potencia o cambios pequeños.'
      },
      {
        q: 'En un RD, ¿qué es el multiplicador de impacto y qué es el de largo plazo?',
        a: 'El de impacto es β<sub>0</sub>: el cambio de Y en el mismo período del aumento de X. El de largo plazo es la suma de todos los β<sub>j</sub>: el cambio acumulado ante un aumento permanente de una unidad. Si las variables están en logs, la suma es una elasticidad de largo plazo. No son intercambiables: confundirlos sobreestima o subestima la respuesta.'
      },
      {
        q: '¿Por qué la transformación de Koyck obliga a discutir endogeneidad?',
        a: 'Porque deja Y<sub>t−1</sub> como regresor y el error v<sub>t</sub> = u<sub>t</sub> − ρu<sub>t−1</sub> contiene u<sub>t−1</sub>, que afecta a Y<sub>t−1</sub>. Entonces el regresor está correlacionado con el error y MCO es inconsistente. Se necesita un instrumento para Y<sub>t−1</sub> o un supuesto especial, como errores AR(1). Es el mismo problema de endogeneidad de la clase 9, con otra ropa.'
      }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: series de tiempo',
    intro: 'Empezá por las fórmulas, seguí con los drills y la sesión de 90 minutos, y cerrá con el plan de 7 días. La idea es tener una hoja de ruta para decidir qué hacer con una serie antes de estimar y cómo leer los contrastes conjuntos.',
    formulas: [
      {
        title: 'Estacionariedad débil',
        eq: 'E(Y<sub>t</sub>) = μ &nbsp;·&nbsp; Var(Y<sub>t</sub>) = σ<sup>2</sup> &nbsp;·&nbsp; Cov(Y<sub>t</sub>, Y<sub>t+j</sub>) = γ<sub>j</sub>',
        note: 'Media y varianza finitas y constantes; covarianza que depende solo de la distancia j.'
      },
      {
        title: 'Paseo aleatorio',
        eq: 'Y<sub>t</sub> = Y<sub>t−1</sub> + e<sub>t</sub> &nbsp;→&nbsp; Var(Y<sub>t</sub>) = tσ<sup>2</sup>',
        note: 'No estacionario. La primera diferencia es ruido blanco si e<sub>t</sub> lo es.'
      },
      {
        title: 'Tendencia lineal',
        eq: 'Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + u<sub>t</sub>',
        note: 'α<sub>1</sub> es el cambio absoluto por período. Contrastar α<sub>1</sub> = 0 con un t.'
      },
      {
        title: 'Tendencia exponencial',
        eq: 'log Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + u<sub>t</sub>',
        note: '100α<sub>1</sub> es aproximadamente la tasa de crecimiento porcentual por período.'
      },
      {
        title: 'Tendencia cuadrática',
        eq: 'Y<sub>t</sub> = α<sub>0</sub> + α<sub>1</sub>t + α<sub>2</sub>t<sup>2</sup> + u<sub>t</sub>',
        note: 'α<sub>2</sub> capta aceleración. El efecto marginal del tiempo es α<sub>1</sub> + 2α<sub>2</sub>t.'
      },
      {
        title: 'Eliminación de tendencia',
        eq: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + β<sub>3</sub>t + u<sub>t</sub> &nbsp;vs.&nbsp; Y<sub>t</sub>* = β<sub>1</sub>X<sub>t</sub>* + e<sub>t</sub>',
        note: 'Mismo β<sub>1</sub> por Frisch-Waugh; el R² no es comparable.'
      },
      {
        title: 'Estacionalidad mensual',
        eq: 'Y<sub>t</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>t</sub> + Σ<sub>m=2</sub><sup>12</sup> δ<sub>m</sub>M<sub>mt</sub> + u<sub>t</sub>',
        note: 'Once dummies con enero base. δ<sub>m</sub> es la diferencia respecto de enero.'
      },
      {
        title: 'Contraste de estacionalidad',
        eq: 'H<sub>0</sub>: δ<sub>2</sub> = … = δ<sub>12</sub> = 0',
        note: 'F conjunto con 11 restricciones. No alcanza con mirar los t individuales.'
      },
      {
        title: 'Prueba de Chow',
        eq: 'F = [(SCR<sub>R</sub> − (SCR<sub>1</sub> + SCR<sub>2</sub>))/p] / [(SCR<sub>1</sub> + SCR<sub>2</sub>)/(n − 2p)]',
        note: 'H<sub>0</sub>: coeficientes iguales en los dos períodos. F<sub>p, n−2p</sub>.'
      },
      {
        title: 'Rezagos distribuidos',
        eq: 'Y<sub>t</sub> = α<sub>0</sub> + β<sub>0</sub>X<sub>t</sub> + … + β<sub>q</sub>X<sub>t−q</sub> + u<sub>t</sub>',
        note: 'β<sub>0</sub> es el impacto; θ = Σβ<sub>j</sub> es el multiplicador de largo plazo.'
      },
      {
        title: 'Reparametrización del RD',
        eq: 'Y<sub>t</sub> = α<sub>0</sub> + θX<sub>t</sub> + β<sub>1</sub>(X<sub>t−1</sub> − X<sub>t</sub>) + … + u<sub>t</sub>',
        note: 'El coeficiente de X<sub>t</sub> es θ, con su error estándar directamente.'
      },
      {
        title: 'Koyck',
        eq: 'β<sub>j</sub> = β<sub>0</sub>ρ<sup>j</sup> &nbsp;→&nbsp; θ = β<sub>0</sub>/(1 − ρ)',
        note: 'Y<sub>t</sub> = α + β<sub>0</sub>X<sub>t</sub> + ρY<sub>t−1</sub> + v<sub>t</sub>. Y<sub>t−1</sub> es endógena.'
      }
    ],
    drills: [
      {
        q: '¿Qué es una realización de un proceso estocástico?',
        a: 'La trayectoria observada de n períodos. Es una sola de las historias posibles; la población es el conjunto de todas.'
      },
      {
        q: 'Enunciá las tres condiciones de estacionariedad débil.',
        a: 'E(Y<sub>t</sub>) = μ, Var(Y<sub>t</sub>) = σ<sup>2</sup> y Cov(Y<sub>t</sub>, Y<sub>t+j</sub>) = γ<sub>j</sub>, todas independientes de t.'
      },
      {
        q: '¿Cuál es la varianza de un paseo aleatorio en t?',
        a: 'tσ<sup>2</sup>, si los shocks tienen varianza σ<sup>2</sup> y son incorrelacionados. Crece con el tiempo: no es estacionario.'
      },
      {
        q: '¿Qué diferencia hay entre ruido blanco y paseo aleatorio?',
        a: 'El ruido blanco es estacionario y sin memoria; el paseo aleatorio acumula shocks y no vuelve a un nivel de referencia. La primera diferencia del paseo es ruido blanco.'
      },
      {
        q: 'Si log Y<sub>t</sub> = 0,03t + u<sub>t</sub>, ¿cómo leés la tendencia?',
        a: 'La serie crece aproximadamente 3% por período. El cambio exacto en un período es 100[exp(0,03) − 1] = 3,05%.'
      },
      {
        q: '¿Qué dos señales típicas sugiere una regresión espuria?',
        a: 'R² muy alto con series que comparten tendencia y residuos persistentes; el coeficiente puede desaparecer al incluir t o diferenciar.'
      },
      {
        q: '¿Los dos métodos de eliminación de tendencia dan el mismo β<sub>1</sub>?',
        a: 'Sí, por Frisch-Waugh, si el modelo es el mismo. Cambia el R² porque la Y es distinta.'
      },
      {
        q: 'Con datos mensuales, ¿cuántas dummies estacionales y cuál es la base?',
        a: 'Once dummies con constante; una categoría se omite y es la base. Si enero es la base, el intercepto es el nivel de enero.'
      },
      {
        q: '¿Cómo se contrasta la estacionalidad conjunta?',
        a: 'Con un F de que los once coeficientes mensuales sean cero. Los t individuales no alcanzan.'
      },
      {
        q: 'En un Chow con p = 19 parámetros y n = 131, ¿qué grados de libertad tiene el F?',
        a: 'F(19, 131 − 38) = F(19, 93). El numerador son las 19 restricciones; el denominador, los grados de libertad de las dos submuestras.'
      },
      {
        q: 'Con β<sub>0</sub> = 0,5, β<sub>1</sub> = 0,3 y β<sub>2</sub> = 0,2, ¿impacto y largo plazo?',
        a: 'Impacto 0,5; largo plazo 0,5 + 0,3 + 0,2 = 1,0.'
      },
      {
        q: 'En Koyck con β<sub>0</sub> = 0,5 y ρ = 0,8, ¿cuál es el multiplicador de largo plazo?',
        a: '0,5/(1 − 0,8) = 2,5. Cada shock se acumula con ponderaciones decrecientes.'
      }
    ],
    sourceGuide: [
      {
        stuck: 'No entiendo de dónde sale la aleatoriedad si no hay muestreo',
        source: 'Clase 7, diap. 3–5; Wooldridge Cap. 10, §10.1; 2P 2024.'
      },
      {
        stuck: 'No distingo estacionariedad de dependencia débil',
        source: 'Clase 7, diap. 6–10; Wooldridge Cap. 11, §11.1; sección 02 de esta clase.'
      },
      {
        stuck: 'No sé qué le pasa a la varianza de un paseo aleatorio',
        source: 'Clase 7, diap. 8–9; Wooldridge Cap. 11, §11.2; sección 02.'
      },
      {
        stuck: 'No entiendo exogeneidad contemporánea y estricta',
        source: 'Clase 7, diap. 11–14; Wooldridge Cap. 10, §10.1; sección 03.'
      },
      {
        stuck: 'No sé por qué una tendencia común genera una regresión espuria',
        source: 'Clase 7, diap. 18–21; Wooldridge Cap. 10, §10.3; TP 10, Actividad 2 y Ejercicio 1.'
      },
      {
        stuck: 'No sé cuántas dummies mensuales incluir',
        source: 'Clase 7, diap. 22; Wooldridge Cap. 10, §10.4; TP 10, Ejercicio 1b y Ejercicio 3c.'
      },
      {
        stuck: 'No puedo escribir la H0 ni los grados de libertad de Chow',
        source: 'Clase 7, diap. 15–16; TP 10, Actividades 3–4 y Ejercicio 3d.'
      },
      {
        stuck: 'No distingo multiplicador de impacto de multiplicador de largo plazo',
        source: 'Clase 7, diap. 23–27; Wooldridge Cap. 10, §10.2; sección 07.'
      },
      {
        stuck: 'No entiendo por qué Koyck requiere variables instrumentales',
        source: 'Clase 7, diap. 28–32; sección 07; clase 9 (endogeneidad).'
      }
    ],
    session: [
      {
        time: '0–10',
        title: 'Pregunta guía',
        text: '¿Qué cambia cuando los datos tienen orden temporal? Escribí una respuesta de tres líneas sin mirar y comparala con la sección 01.'
      },
      {
        time: '10–30',
        title: 'Proceso y estacionariedad',
        text: 'Explicá realización, población y las tres condiciones de estacionariedad. Hacé el mini-check del paseo aleatorio y calculá su varianza en t = 10. Fuente: secciones 01 y 02.'
      },
      {
        time: '30–50',
        title: 'Gauss-Markov y tendencia',
        text: 'Escribí los cinco supuestos y distinguí exogeneidad contemporánea de estricta. Después resolvé el TP 10, Actividad 2 y el Ejercicio 1a–c. Fuente: secciones 03 y 04.'
      },
      {
        time: '50–70',
        title: 'Estacionalidad y Chow',
        text: 'Resolvé el TP 10, Actividades 3–4 y el Ejercicio 1b. Escribí la H0 de Chow y comprobá los grados de libertad. Fuente: secciones 05 y 06.'
      },
      {
        time: '70–85',
        title: 'Laboratorio barium',
        text: 'Reproducí el laboratorio. Leé la tendencia, el F de estacionalidad y el Chow. Explicá por qué time es el único coeficiente significativo al 5%. Fuente: práctica y Ejercicio 3.'
      },
      {
        time: '85–90',
        title: 'Cierre',
        text: 'Anotá una decisión del mapa que sepas justificar en dos minutos y una que todavía no puedas explicar sin mirar.'
      }
    ],
    kit: [
      {
        k: 'Kit 01',
        title: 'Tres momentos',
        text: 'Una tarjeta con media, varianza y covarianza; al lado, el ejemplo de ruido blanco y el de paseo aleatorio.'
      },
      {
        k: 'Kit 02',
        title: 'Tendencia y estacionalidad',
        text: 'Las tres formas de tendencia, las dummies mensuales y trimestrales, y el contraste conjunto de cada una.'
      },
      {
        k: 'Kit 03',
        title: 'Chow y RD',
        text: 'La fórmula de Chow con H0 y grados de libertad; impacto, largo plazo y Koyck con su problema de endogeneidad.'
      },
      {
        k: 'Kit 04',
        title: 'Plan de 7 días',
        text: 'Una rutina corta para alternar teoría, TP y parcial sin volver a leer todo desde cero.'
      }
    ],
    plan: [
      {
        day: 'Día 1',
        title: 'Proceso y estacionariedad',
        text: 'Leé las secciones 01 y 02. Explicá realización, población y las tres condiciones de estacionariedad sin mirar.'
      },
      {
        day: 'Día 2',
        title: 'Gauss-Markov en series',
        text: 'Estudiá la sección 03. Escribí los cinco supuestos y un ejemplo de feedback que rompa la exogeneidad estricta.'
      },
      {
        day: 'Día 3',
        title: 'TP 10, Actividades 1–2',
        text: 'Respondé las actividades conceptuales. Justificá cada V/F con el supuesto o la definición que corresponda.'
      },
      {
        day: 'Día 4',
        title: 'Tendencia y estacionalidad',
        text: 'Leé las secciones 04 y 05. Resolvé el Ejercicio 1a–c y el Ejercicio 2. Contrastá tendencia y dummies por separado.'
      },
      {
        day: 'Día 5',
        title: 'Chow y práctica',
        text: 'Estudiá la sección 06. Resolvé las Actividades 3–4 y el Ejercicio 6d. Reportá F, grados de libertad y p.'
      },
      {
        day: 'Día 6',
        title: 'Laboratorio y RD',
        text: 'Reproducí barium y leé la salida. Después estudiá la sección 07 y calculá un multiplicador de largo plazo a mano.'
      },
      {
        day: 'Día 7',
        title: 'Cierre',
        text: 'Volvé solo a lo que falló. Actualizá el mapa de decisión y resolvé las preguntas de autoevaluación que no pudiste contestar.'
      }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para abrir cada ejercicio desde la práctica. Las citas de parciales se limitan a preguntas relacionadas con series de tiempo.',
    items: [
      {
        type: 'Clase',
        typeClass: '',
        title: 'Clase 7 — Regresión con datos de series de tiempo',
        text: 'Fuente principal de la explicación, el orden y los énfasis. Cubre proceso estocástico, estacionariedad, supuestos de Gauss-Markov, tendencia, estacionalidad, Chow y rezagos distribuidos.',
        loc: '32 diapositivas · diap. 2–32'
      },
      {
        type: 'Libro',
        typeClass: 'book',
        title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.',
        text: 'Cap. 10: naturaleza de las series, modelos estáticos y de rezagos distribuidos, tendencia y estacionalidad. Cap. 11: estacionariedad, dependencia débil y paseos aleatorios.',
        loc: 'Caps. 10–11'
      },
      {
        type: 'Guía',
        typeClass: '',
        title: 'Guía de Trabajos Prácticos 2026 — TP 10',
        text: 'Actividades 1–4 para los conceptos; Ejercicios 1 y 2 para tendencia y estacionalidad; Ejercicio 3 para barium, dummies y Chow; Ejercicio 6 para primeras diferencias.',
        loc: 'TP 10 · act. 1–4; ej. 1–3, 6',
        href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-10'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '2P 2024',
        text: 'Series de tiempo como realizaciones de un proceso estocástico; eliminación de tendencia por los dos métodos; estacionalidad con datos cuatrimestrales y contraste conjunto.',
        loc: 'Solución orientativa'
      }
    ]
  }
};
