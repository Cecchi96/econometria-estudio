window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-10"] = {
  id: 'clase-10',
  num: '10',
  eyebrow: 'Clase 10 · MC2E',
  title: 'Mínimos cuadrados en dos etapas: cuando un instrumento no alcanza',
  lead: 'MC2E extiende la variable instrumental a la regresión múltiple: proyecta la variable endógena sobre todas las exógenas y usa esa proyección como instrumento. El coeficiente es fácil de obtener; el problema es la inferencia, la fuerza de los instrumentos y lo que se puede verificar.',
  question: '¿Cómo se estima una ecuación con varios regresores cuando uno es endógeno, y qué diagnósticos hay que pasar antes de confiar en el resultado?',
  pills: ['15 diapositivas', 'TP 12', '2P 2024', '8 conceptos clave'],

  sections: [
    {
      id: 'c10-s01',
      number: '01',
      title: 'Por qué MC2E: la endogeneidad no se arregla agregando variables',
      blocks: [
        { type: 'p', id: 'c10-s01-p01', html: 'La clase anterior dejó una idea incómoda: cuando una variable explicativa está correlacionada con el error, MCO deja de ser consistente. Con una sola variable explicativa, la solución era buscar una variable instrumental. En la regresión múltiple el problema es el mismo, pero hay más piezas en juego: la endógena convive con controles exógenos y el instrumento tiene que aportar variación limpia después de descontar esos controles. El método que resuelve ese caso se llama <span class="concept" data-concept="mc2e" tabindex="0" role="button">mínimos cuadrados en dos etapas</span>.' },
        { type: 'p', id: 'c10-s01-p02', html: 'Pensá en la ecuación de salario del TP 12. Querés estimar el efecto de la educación sobre el logaritmo del salario controlando por experiencia, raza, región y tipo de área. La educación está correlacionada con la habilidad, con la calidad de la escuela y con el entorno familiar: todo eso quedó en el error. Si estimás por MCO, el coeficiente de educación mezcla el efecto de la educación con el de la habilidad. El sesgo no desaparece por juntar más observaciones: es un problema de identificación, no de tamaño de muestra.' },
        {
          type: 'formula',
          main: 'Y<sub>1i</sub> = β<sub>0</sub> + β<sub>1</sub>Z<sub>1i</sub> + β<sub>2</sub>Y<sub>2i</sub> + u<sub>1i</sub>',
          legend: [
            { key: 'Y<sub>1</sub>', text: 'Variable dependiente. Puede ser endógena por construcción, como el logaritmo del salario.' },
            { key: 'Z<sub>1</sub>', text: 'Regresor exógeno incluido: experiencia, raza, región. No hace falta instrumentarlo.' },
            { key: 'Y<sub>2</sub>', text: 'Regresor endógeno: Cov(Y<sub>2</sub>, u<sub>1</sub>) ≠ 0. Es el coeficiente que interesa y el que MCO estima mal.' },
            { key: 'u<sub>1</sub>', text: 'Error estructural. Contiene la habilidad no observada y todo lo que no se controló.' }
          ]
        },
        { type: 'p', id: 'c10-s01-p03', html: 'Para instrumentar Y<sub>2</sub> no alcanza con una variable que parezca exógena. Cualquier combinación lineal de las Z exógenas es, en principio, un instrumento válido: si cada Z está incorrelacionada con u<sub>1</sub>, también lo está una suma ponderada. El problema es elegir la combinación que más información aporte sobre Y<sub>2</sub>. Esa combinación sale de la <span class="concept" data-concept="forma-reducida" tabindex="0" role="button">forma reducida</span>: regresar Y<sub>2</sub> sobre todas las exógenas, incluidas las que no aparecen en la ecuación estructural.' },
        {
          type: 'formula',
          main: 'Y<sub>2i</sub> = π<sub>0</sub> + π<sub>1</sub>Z<sub>1i</sub> + π<sub>2</sub>Z<sub>2i</sub> + π<sub>3</sub>Z<sub>3i</sub> + v<sub>2i</sub>',
          legend: [
            { key: 'π<sub>j</sub>', text: 'Efecto de cada exógena sobre Y<sub>2</sub>. La relevancia exige π<sub>j</sub> ≠ 0 para al menos un instrumento excluido.' },
            { key: 'Z<sub>2</sub>, Z<sub>3</sub>', text: 'Instrumentos excluidos: no están en la ecuación estructural. Son los que identifican el modelo.' },
            { key: 'v<sub>2</sub>', text: 'Parte de Y<sub>2</sub> no explicada por las exógenas. Si Y<sub>2</sub> es endógena, v<sub>2</sub> está correlacionado con u<sub>1</sub>.' },
            { key: 'Forma reducida', text: 'No es el modelo económico: es la proyección que permite construir el instrumento óptimo.' }
          ]
        },
        {
          type: 'cards',
          items: [
            { sym: 'Estructural', title: 'Lo que querés estimar', text: 'La ecuación con interpretación económica. Sus coeficientes responden la pregunta y no se tocan: la endogeneidad se corrige en la estimación, no reescribiendo el modelo.' },
            { sym: 'Reducida', title: 'Lo que estimás para instrumentar', text: 'La endógena en función de todas las exógenas. Sus coeficientes no se interpretan como efectos causales; sirven para predecir y construir los valores ajustados.' },
            { sym: 'Excluido', title: 'Lo que no entra en la estructural', text: 'El instrumento cambia la estimación, no la especificación. Si lo agregás como regresor, deja de ser instrumento y el coeficiente cambia de significado.' }
          ]
        },
        { type: 'callout', variant: 'ochre', label: 'El instrumento no se agrega a la ecuación', html: 'Un instrumento excluido no es un control. Si lo incluís como regresor en la ecuación estructural, el modelo responde otra pregunta y el coeficiente deja de identificar el efecto que buscabas. La exclusión es una decisión teórica: se defiende con el conocimiento del problema, no con un contraste. En el caso exactamente identificado, los datos no pueden decirte si el instrumento es válido.' },
        {
          type: 'miniCheck',
          id: 'c10-check-01',
          question: '¿Por qué no alcanza con agregar controles para eliminar la endogeneidad de EDUC?',
          intro: 'Pensá qué queda en el error después de sumar experiencia, región y tipo de área.',
          answer: 'Porque la endogeneidad no se define por cuánta variación explica el modelo, sino por la correlación entre el regresor y el error. Agregar controles absorbe parte de esa correlación, pero la habilidad, la calidad de la escuela y el entorno familiar siguen en u. Si queda algo correlacionado con EDUC, MCO sigue sesgado e inconsistente. Además, agregar variables endógenas como controles puede empeorar el problema. La solución es variación exógena: un instrumento excluido, no un control más.'
        }
      ]
    },
    {
      id: 'c10-s02',
      number: '02',
      title: 'Identificación: orden, rango e instrumentos excluidos',
      blocks: [
        { type: 'p', id: 'c10-s02-p01', html: 'Antes de correr ivreg hay una pregunta previa: ¿los datos alcanzan para identificar β<sub>2</sub>? Identificar no es estimar. Es poder distinguir el parámetro verdadero de otros valores que generarían la misma distribución de los datos. En un modelo con una variable endógena y varios instrumentos excluidos, la respuesta se controla con dos condiciones y con un supuesto que no se contrasta.' },
        {
          type: 'assumptions',
          rows: [
            { title: 'Orden', text: 'La cantidad de instrumentos excluidos m tiene que ser al menos la cantidad de regresores endógenos k. Con una sola endógena, necesitás al menos un instrumento que no esté en la ecuación estructural.' },
            { title: 'Rango', text: 'Los instrumentos excluidos tienen que mover a las endógenas de forma linealmente independiente. Si dos instrumentos miden lo mismo, no suman rango: la condición de orden se cumple y la de rango no.' },
            { title: 'Exclusión', text: 'Ningún instrumento pertenece a la ecuación estructural. Es una restricción teórica. En el caso exactamente identificado no se puede contrastar; con sobreidentificación se testea parcialmente.' },
            { title: 'Exogeneidad', text: 'Cada instrumento está incorrelacionado con el error estructural. Es el supuesto central y el más difícil de defender: ningún contraste lo prueba de forma definitiva.' },
            { title: 'Relevancia', text: 'En la forma reducida, los coeficientes de los instrumentos excluidos no son cero. Esto sí se contrasta, con un t individual o con el F conjunto de la primera etapa.' }
          ]
        },
        { type: 'p', id: 'c10-s02-p02', html: 'La condición de orden es necesaria, no suficiente. Contar instrumentos es fácil; verificar que aporten variación independiente es lo que decide si el modelo está identificado. Cuando m = k, el modelo está <span class="concept" data-concept="identificacion" tabindex="0" role="button">exactamente identificado</span>: hay tantos instrumentos como endógenas y ninguna restricción de sobreidentificación que contrastar. Cuando m &gt; k, hay q = m − k restricciones y el modelo está sobreidentificado.' },
        {
          type: 'compare',
          left: { tag: 'Exactamente identificado', title: 'm = k · q = 0', text: 'Hay un instrumento por cada endógena. El coeficiente queda determinado y no hay forma de testear la exogeneidad de los instrumentos con los datos: la validez se argumenta teóricamente.', eq: 'Sargan no aplica' },
          right: { tag: 'Sobreidentificado', title: 'm &gt; k · q = m − k', text: 'Sobran instrumentos. Se pueden contrastar las restricciones de sobreidentificación, con la advertencia de que el contraste tiene potencia limitada y no prueba la validez de todos.', eq: 'q restricciones contrastables' }
        },
        { type: 'callout', variant: 'ochre', label: 'Contar instrumentos no es identificar', html: 'Dos instrumentos que miden la misma realidad —por ejemplo, dos proxies de la misma habilidad— pueden cumplir la condición de orden y fallar la de rango. El software no siempre avisa: te devuelve un coeficiente inestable, con un error estándar enorme, o directamente un error de matriz singular. Antes de estimar, mirá la correlación entre instrumentos y los coeficientes de la primera etapa.' },
        {
          type: 'miniCheck',
          id: 'c10-check-02',
          question: 'Tenés dos variables endógenas y un solo instrumento excluido. ¿Podés estimar por MC2E?',
          intro: 'Aplicá la condición de orden antes de pensar en el software.',
          answer: 'No. La condición de orden exige m ≥ k: con k = 2 endógenas necesitás al menos dos instrumentos excluidos. Con uno solo, el sistema está subidentificado y no hay forma de separar los efectos de las dos endógenas. Agregar controles exógenos no resuelve el problema, porque ya están incluidos en la ecuación y no aportan restricciones nuevas. Necesitás al menos otro instrumento que cumpla exclusión y relevancia.'
        },
        {
          type: 'errorTable',
          rows: [
            { error: 'Contar los instrumentos y no mirar la relevancia.', why: 'La condición de orden es necesaria pero no suficiente: un instrumento puede estar excluido y no mover a la endógena.', fix: 'Mirá el t de cada instrumento en la primera etapa y el F conjunto antes de estimar.' },
            { error: 'Usar como instrumento una variable que ya está en la ecuación.', why: 'Si ya es regresor, no es una restricción de exclusión y no identifica nada nuevo.', fix: 'El instrumento tiene que estar fuera de la ecuación estructural y correlacionado con la endógena.' },
            { error: 'Creer que el rango se cumple porque hay dos instrumentos.', why: 'Dos instrumentos colineales entre sí no aportan dos direcciones de variación.', fix: 'Revisá la correlación entre instrumentos y la matriz de coeficientes de la primera etapa.' }
          ]
        }
      ]
    },
    {
      id: 'c10-s03',
      number: '03',
      title: 'Las dos etapas, y por qué no se hacen a mano',
      blocks: [
        { type: 'p', id: 'c10-s03-p01', html: 'MC2E se llama así porque se puede escribir como dos regresiones por MCO. La primera estima la forma reducida: Y<sub>2</sub> sobre todas las exógenas, incluidas las excluidas. La segunda usa los valores ajustados Ŷ<sub>2</sub> en lugar de Y<sub>2</sub> en la ecuación estructural. El coeficiente que sale es el estimador de variable instrumental. La coincidencia no es casual: MC2E es el estimador de VI cuando hay más de un instrumento.' },
        {
          type: 'map',
          steps: [
            { n: '1', title: 'Primera etapa', text: 'Regresá Y<sub>2</sub> sobre Z<sub>1</sub> y todos los instrumentos excluidos por MCO. Guardá los valores ajustados Ŷ<sub>2</sub> y los residuos v̂<sub>2</sub>.' },
            { n: '2', title: 'Segunda etapa', text: 'Regresá Y<sub>1</sub> sobre Z<sub>1</sub> y Ŷ<sub>2</sub> por MCO. El coeficiente que acompaña a Ŷ<sub>2</sub> es el de Y<sub>2</sub>.' },
            { n: '3', title: 'Coincidencia', text: 'Ese coeficiente es idéntico al de la fórmula matricial de VI. Podés replicarlo a mano y comprobar que da lo mismo.' },
            { n: '4', title: 'Corrección', text: 'No reportes los errores estándar de esa segunda etapa. El software los corrige porque Ŷ<sub>2</sub> es una variable estimada, no observada.' }
          ]
        },
        {
          type: 'formula',
          main: 'β̂<sub>MC2E</sub> = (X̂′X)<sup>−1</sup>X̂′Y<sub>1</sub> = (X′P<sub>Z</sub>X)<sup>−1</sup>X′P<sub>Z</sub>Y<sub>1</sub>',
          legend: [
            { key: 'Z', text: 'Matriz de instrumentos: las exógenas incluidas más las excluidas. n × m.' },
            { key: 'X', text: 'Matriz de regresores estructurales: Z<sub>1</sub> e Y<sub>2</sub>. n × k.' },
            { key: 'X̂', text: 'Proyección de X sobre Z. En la columna de la endógena lleva Ŷ<sub>2</sub>. P<sub>Z</sub> = Z(Z′Z)<sup>−1</sup>Z′.' },
            { key: 'Caso exacto', text: 'Si m = k, la expresión se reduce a (Z′X)<sup>−1</sup>Z′Y<sub>1</sub>, la fórmula del TP 12.' }
          ]
        },
        { type: 'p', id: 'c10-s03-p02', html: 'El coeficiente se replica a mano; el error estándar, no. En la segunda etapa manual, los residuos se calculan como Y<sub>1</sub> − Z<sub>1</sub>γ̂ − Ŷ<sub>2</sub>β̂. Esos residuos son más chicos que los de la ecuación estructural, porque Ŷ<sub>2</sub> está más cerca de Y<sub>1</sub> que Y<sub>2</sub>. Al usar esa suma de cuadrados, σ̂<sup>2</sup> queda subestimado y los t se inflan. Además, la segunda etapa trata a Ŷ<sub>2</sub> como si fuera un dato fijo: ignora que se estimó en la primera etapa.' },
        {
          type: 'formula',
          main: 'Var(β̂<sub>MC2E</sub>) = σ̂<sup>2</sup>(X′Z(Z′Z)<sup>−1</sup>Z′X)<sup>−1</sup>',
          legend: [
            { key: 'σ̂<sup>2</sup>', text: 'Varianza residual de la ecuación estructural, calculada con Y<sub>2</sub>, no con Ŷ<sub>2</sub>.' },
            { key: 'Z′Z', text: 'Matriz de productos cruzados de los instrumentos.' },
            { key: 'Sándwich', text: 'La expresión reconoce que X e Z no coinciden. Es la corrección que hace el software.' },
            { key: 'Consecuencia', text: 'Coeficientes iguales a la segunda etapa manual; errores estándar distintos y correctos.' }
          ]
        },
        { type: 'callout', variant: 'teal', label: 'Lo que hace el software', html: 'ivreg de AER estima el coeficiente con la fórmula matricial y calcula la varianza con la expresión anterior. summary(ivreg, diagnostics = TRUE) agrega los contrastes de instrumento débil, Wu-Hausman y Sargan. No hay que reconstruir nada a mano: alcanza con declarar bien la ecuación estructural y la lista de instrumentos. La única razón para hacer las dos etapas manualmente es entender qué hay adentro del estimador, no reportar el resultado.' },
        {
          type: 'errorTable',
          rows: [
            { error: 'Hacer la segunda etapa con lm() y reportar sus errores estándar.', why: 'Los residuos usan Ŷ<sub>2</sub>, la SCR queda chica y σ̂<sup>2</sup> subestima la varianza real.', fix: 'Usá ivreg o la fórmula matricial completa. Si hacés la segunda etapa a mano, no reportes sus t.' },
            { error: 'Leer el R² de la segunda etapa como ajuste del modelo estructural.', why: 'La segunda etapa reemplaza la endógena por una proyección; su R² no mide el ajuste de la ecuación original.', fix: 'Reportá el R² de IV con cautela y no lo uses para elegir entre MCO y MC2E.' },
            { error: 'Reemplazar Y<sub>2</sub> por Ŷ<sub>2</sub> en la base y estimar todo de nuevo.', why: 'Es la misma operación manual: el coeficiente coincide, pero la inferencia queda mal calculada.', fix: 'Dejá que el estimador de MC2E haga las dos etapas y la corrección de varianza en un solo paso.' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c10-check-03',
          question: 'Si la segunda etapa hecha a mano da el mismo coeficiente que ivreg, ¿por qué no puedo usar su t?',
          intro: 'Mirá qué residuos entran en σ̂² y qué se trata como si fuera fijo.',
          answer: 'Porque el t combina el coeficiente con un error estándar que depende de σ̂² y de la varianza del estimador. La segunda etapa manual calcula los residuos con Ŷ<sub>2</sub>, que es una proyección y no la variable observada: la SCR queda más chica y σ̂² se subestima. También ignora la incertidumbre de la primera etapa. El coeficiente es el mismo, pero el t sale artificialmente grande. Solo la varianza matricial completa reproduce lo que reporta el software.'
        }
      ]
    },
    {
      id: 'c10-s04',
      number: '04',
      title: 'Multicolinealidad y varianza: el precio de instrumentar',
      blocks: [
        { type: 'p', id: 'c10-s04-p01', html: 'MC2E es consistente, pero no es eficiente. La intuición es directa: Ŷ<sub>2</sub> es una proyección de Y<sub>2</sub> sobre las exógenas, así que tiene menos variación que Y<sub>2</sub>. Y como es una combinación de esas exógenas, suele estar más correlacionada con los controles que la propia Y<sub>2</sub>. Menos variación propia y más colinealidad con el resto: las dos cosas empujan la varianza del coeficiente hacia arriba.' },
        {
          type: 'formula',
          main: 'Var(β̂<sub>MC2E</sub>) = σ̂<sup>2</sup> / [SCT<sub>2</sub>(1 − R̂<sup>2</sup><sub>2</sub>)]',
          legend: [
            { key: 'SCT<sub>2</sub>', text: 'Suma de cuadrados total de Ŷ<sub>2</sub>: cuánta variación propia aporta el instrumento. Es menor que la de Y<sub>2</sub>.' },
            { key: 'R̂<sup>2</sup><sub>2</sub>', text: 'R<sup>2</sup> de regresar Ŷ<sub>2</sub> sobre las demás exógenas de la ecuación estructural. Mide la colinealidad que introduce la proyección.' },
            { key: 'Denominador', text: 'Si SCT<sub>2</sub> baja o R̂<sup>2</sup><sub>2</sub> sube, el denominador se achica y la varianza crece.' },
            { key: 'Ojo', text: 'No es el R<sup>2</sup> de la primera etapa. La primera etapa mide relevancia; esta R̂<sup>2</sup><sub>2</sub> mide colinealidad con los controles.' }
          ]
        },
        { type: 'p', id: 'c10-s04-p02', html: 'Bajo exogeneidad, MCO y MC2E son consistentes, pero MCO tiene la varianza mínima entre los estimadores lineales insesgados. MC2E cambia insesgamiento por consistencia frente a la endogeneidad, y paga con precisión. Ese intercambio puede convenir: un estimador consistente con intervalo ancho es preferible a un estimador preciso que converge a un número equivocado. Lo que no se puede es tener las dos cosas al mismo tiempo.' },
        {
          type: 'compare',
          left: { tag: 'MCO', title: 'Preciso, pero condicionado', text: 'Si E(u | X) = 0, es insesgado y de varianza mínima. Si hay endogeneidad, es sesgado e inconsistente y su precisión es un espejismo.', eq: 'Var(β̂<sub>MCO</sub>) = σ<sup>2</sup>(X′X)<sup>−1</sup>' },
          right: { tag: 'MC2E', title: 'Consistente, pero más variable', text: 'Si los instrumentos son válidos y relevantes, es consistente. Su varianza es mayor, y con instrumentos débiles puede ser mucho mayor.', eq: 'Var(β̂<sub>MC2E</sub>) = σ<sup>2</sup>(X′Z(Z′Z)<sup>−1</sup>Z′X)<sup>−1</sup>' }
        },
        {
          type: 'cards',
          items: [
            { sym: 'Varianza', title: 'El costo visible', text: 'El error estándar de MC2E es mayor que el de MCO. No es un error de cálculo: es la consecuencia de usar una variable proyectada en lugar de la observada.' },
            { sym: 'Colinealidad', title: 'El costo oculto', text: 'Ŷ<sub>2</sub> es una combinación de las exógenas, por lo que se parece más a los controles. Esa colinealidad infla la varianza del coeficiente.' },
            { sym: 'Eficiencia', title: 'El intercambio', text: 'MC2E no es BLUE. Es consistente bajo supuestos más débiles, pero pierde eficiencia frente a MCO cuando la endogeneidad no existe.' }
          ]
        },
        { type: 'callout', variant: 'ochre', label: 'La eficiencia perdida no se recupera con más observaciones', html: 'La varianza de MC2E es asintótica: más datos reducen el error estándar, pero no eliminan la diferencia con MCO. La pérdida de eficiencia es parte del método, no un problema de muestra chica. Si el instrumento es débil, la varianza puede crecer tanto que el intervalo de confianza incluya valores económicamente incompatibles entre sí.' },
        {
          type: 'miniCheck',
          id: 'c10-check-04',
          question: 'Dos estimadores son consistentes. ¿Por qué uno puede tener errores estándar mucho mayores?',
          intro: 'Pensá en la variación propia de la variable que se usa como regresor en cada caso.',
          answer: 'Porque la consistencia habla del centro de la distribución, no de su dispersión. MCO usa la variación observada de Y<sub>2</sub>; MC2E usa la variación de Ŷ<sub>2</sub>, que es menor porque es una proyección. Además, Ŷ<sub>2</sub> es una combinación de las exógenas y está más correlacionada con los controles. Menos variación propia y más colinealidad agrandan la varianza del coeficiente. Los dos estimadores convergen al mismo valor, pero uno lo hace con mucha más incertidumbre.'
        }
      ]
    },
    {
      id: 'c10-s05',
      number: '05',
      title: 'Hausman: ¿de verdad hace falta MC2E?',
      blocks: [
        { type: 'p', id: 'c10-s05-p01', html: 'MC2E cuesta eficiencia. Antes de pagar ese costo, conviene preguntarse si hace falta. El <span class="concept" data-concept="hausman" tabindex="0" role="button">contraste de Hausman</span> compara las estimaciones de MCO y MC2E. La lógica es simple: si la variable es exógena, los dos estimadores son consistentes y deberían parecerse; si es endógena, MCO está sesgado y MC2E no, así que la diferencia sistemática delata el problema.' },
        {
          type: 'formula',
          main: 'H = (β̂<sub>MC2E</sub> − β̂<sub>MCO</sub>)′[Var(β̂<sub>MC2E</sub>) − Var(β̂<sub>MCO</sub>)]<sup>−1</sup>(β̂<sub>MC2E</sub> − β̂<sub>MCO</sub>) ~ χ<sup>2</sup><sub>k</sub>',
          legend: [
            { key: 'H<sub>0</sub>', text: 'La variable es exógena: no hay correlación con el error estructural.' },
            { key: 'k', text: 'Cantidad de regresores sospechados de endogeneidad. Con uno solo, el contraste tiene 1 grado de libertad.' },
            { key: 'Diferencia', text: 'Bajo H<sub>0</sub>, los dos estimadores convergen al mismo parámetro y la diferencia tiende a cero.' },
            { key: 'Matriz', text: 'La diferencia de varianzas tiene que ser definida positiva. Si no lo es, el contraste puede ser inestable.' }
          ]
        },
        { type: 'p', id: 'c10-s05-p02', html: 'La versión de regresión aumentada es más fácil de leer y de robustecer. Se estima la forma reducida de Y<sub>2</sub>, se guardan los residuos v̂<sub>2</sub> y se agregan como regresor en la ecuación estructural. Si el coeficiente δ es distinto de cero, la parte de Y<sub>2</sub> que no explican las exógenas está correlacionada con el error: hay endogeneidad.' },
        {
          type: 'formula',
          main: 'Y<sub>1i</sub> = β<sub>0</sub> + β<sub>1</sub>Z<sub>1i</sub> + β<sub>2</sub>Y<sub>2i</sub> + δ v̂<sub>2i</sub> + u<sub>i</sub> &nbsp;·&nbsp; H<sub>0</sub>: δ = 0',
          legend: [
            { key: 'v̂<sub>2</sub>', text: 'Residuos de la primera etapa. Contienen la variación de Y<sub>2</sub> que no viene de las exógenas.' },
            { key: 'δ', text: 'Mide la correlación entre esa variación y el error estructural. Si δ ≠ 0, Y<sub>2</sub> es endógena.' },
            { key: 'Contraste', text: 'Un t sobre δ = 0. En muestras grandes puede usarse la versión robusta a heterocedasticidad.' },
            { key: 'Varias endógenas', text: 'Se agregan los residuos de cada primera etapa y se hace un contraste conjunto.' }
          ]
        },
        {
          type: 'map',
          steps: [
            { n: '1', title: 'Forma reducida', text: 'Regresá Y<sub>2</sub> sobre todas las exógenas y guardá los residuos v̂<sub>2</sub>.' },
            { n: '2', title: 'Regresión aumentada', text: 'Agregá v̂<sub>2</sub> a la ecuación estructural y estimá por MCO.' },
            { n: '3', title: 'Contraste', text: 'Hacé un t sobre δ = 0, preferentemente con errores robustos a heterocedasticidad.' },
            { n: '4', title: 'Decisión', text: 'Si rechazás, hay evidencia de endogeneidad y MC2E se justifica. Si no rechazás, MCO es más eficiente, con la advertencia de potencia.' }
          ]
        },
        { type: 'callout', variant: 'teal', label: 'No rechazar no es certificar exogeneidad', html: 'El contraste puede tener poca potencia, sobre todo con instrumentos débiles. Un p = 0,28 no prueba que EDUC sea exógena: dice que esta muestra no aporta evidencia suficiente contra esa hipótesis. Y si el instrumento es débil, el propio Hausman se vuelve poco confiable. La decisión no se toma solo con el p: se toma con el diseño, la teoría y la fuerza de los instrumentos.' },
        {
          type: 'miniCheck',
          id: 'c10-check-05',
          question: 'En el laboratorio, Wu-Hausman da p = 0,280 con un instrumento y p = 0,087 con dos. ¿Qué concluís?',
          intro: 'Mirá el nivel de significación, la potencia y la diferencia entre coeficientes.',
          answer: 'Que no se rechaza la exogeneidad al 5% en ninguno de los dos casos; con dos instrumentos hay evidencia marginal al 10%, pero no al 5%. Eso no prueba que EDUC sea exógena: el contraste tiene poca potencia, y con un F de primera etapa de 7,89 la evidencia es todavía más frágil. Además, los coeficientes cambian bastante entre MCO (0,0747), MC2E con un instrumento (0,1315) y MC2E con dos (0,1571). La conclusión honesta es que no hay evidencia suficiente para descartar la exogeneidad, no que esté demostrada.'
        },
        {
          type: 'errorTable',
          rows: [
            { error: 'Leer el rechazo de Hausman como prueba de que el instrumento es válido.', why: 'Hausman testea la exogeneidad del regresor, no la validez del instrumento. Un instrumento inválido también puede generar diferencias.', fix: 'Separá el argumento de exclusión y exogeneidad del instrumento del contraste de endogeneidad.' },
            { error: 'Usar Hausman con un instrumento débil y creer el p.', why: 'Con instrumentos débiles el contraste tiene poca potencia y su distribución puede apartarse de la teórica.', fix: 'Mirá primero el F de primera etapa. Si es bajo, no interpretes Hausman como conclusión.' },
            { error: 'Concluir que la variable es exógena porque no rechazaste.', why: 'No rechazar es ausencia de evidencia, no evidencia de ausencia. La potencia depende de n y del instrumento.', fix: 'Reportá el p, el tamaño de la diferencia y la potencia; no cambies de método de forma automática.' }
          ]
        }
      ]
    },
    {
      id: 'c10-s06',
      number: '06',
      title: 'Instrumentos débiles y restricciones de sobreidentificación',
      blocks: [
        { type: 'p', id: 'c10-s06-p01', html: 'Un instrumento puede fallar de dos maneras distintas, y las consecuencias no son iguales. Si es <span class="concept" data-concept="instrumento-debil" tabindex="0" role="button">débil</span>, está poco correlacionado con la endógena: el estimador pierde la distribución normal asintótica, la inferencia deja de ser válida y el sesgo se parece cada vez más al de MCO. Si es inválido, está correlacionado con el error: el estimador es inconsistente y ningún aumento de muestra lo arregla. La fuerza se diagnostica; la validez se argumenta.' },
        {
          type: 'formula',
          main: 'F = [(SCR<sub>r</sub> − SCR<sub>nr</sub>)/q] / [SCR<sub>nr</sub>/(n − k − 1)] &nbsp;·&nbsp; H<sub>0</sub>: los instrumentos excluidos no explican a Y<sub>2</sub>',
          legend: [
            { key: 'SCR<sub>r</sub>', text: 'Suma de cuadrados residual de la primera etapa restringida, sin los instrumentos excluidos.' },
            { key: 'SCR<sub>nr</sub>', text: 'Suma de cuadrados residual de la primera etapa completa, con todos los instrumentos.' },
            { key: 'q', text: 'Cantidad de instrumentos excluidos que se contrastan conjuntamente.' },
            { key: 'Regla práctica', text: 'Si F &gt; 10, no hay que preocuparse por instrumentos débiles. Es una señal de alarma, no una garantía.' }
          ]
        },
        { type: 'p', id: 'c10-s06-p02', html: 'El F de primera etapa mide cuánta información aportan los instrumentos sobre la endógena. Cuanto más información, mayor es su valor esperado. La regla de 10 es una convención: por debajo de ese umbral, el sesgo de MC2E puede ser una fracción importante del sesgo de MCO y los errores estándar convencionales quedan chicos. El F también depende de la cantidad de instrumentos: agregar uno irrelevante sube los grados de libertad del numerador y puede bajar el estadístico aunque el instrumento original siga siendo fuerte.' },
        { type: 'p', id: 'c10-s06-p03', html: 'La segunda amenaza es la validez. Con un solo instrumento y una sola endógena, el modelo está exactamente identificado y no hay forma de contrastar la exogeneidad. Con más instrumentos aparecen las <span class="concept" data-concept="sobreidentificacion" tabindex="0" role="button">restricciones de sobreidentificación</span>: q = m − k. La idea es preguntar si los instrumentos extra explican algo del error que el primero no explica. Si lo hacen, al menos uno es inválido.' },
        {
          type: 'formula',
          main: 'LM = n·R<sup>2</sup><sub>aux</sub> ~ χ<sup>2</sup><sub>q</sub> &nbsp;·&nbsp; q = m − k',
          legend: [
            { key: 'Paso 1', text: 'Estimá la ecuación estructural por MC2E y guardá los residuos û.' },
            { key: 'Paso 2', text: 'Regresá û sobre todas las exógenas —incluidas las excluidas— y obtené el R<sup>2</sup> auxiliar.' },
            { key: 'H<sub>0</sub>', text: 'Los instrumentos están incorrelacionados con el error estructural: todos son válidos.' },
            { key: 'Rechazo', text: 'Al menos uno de los instrumentos no es exógeno. No dice cuál.' }
          ]
        },
        { type: 'callout', variant: 'ochre', label: 'Más instrumentos no es más identificación', html: 'La eficiencia asintótica mejora con más instrumentos solo si son válidos y relevantes. Si el instrumento extra es débil, el F conjunto baja, el sesgo hacia MCO aumenta y la inferencia se vuelve frágil. El Sargan puede no rechazar y aun así no haber información suficiente para estimar con precisión. En el laboratorio, pasar de un instrumento a dos bajó el F de 13,26 a 7,89: la advertencia está en la primera etapa, no en el contraste de sobreidentificación.' },
        {
          type: 'errorTable',
          rows: [
            { error: 'F &gt; 10 resuelve todos los problemas.', why: 'El F solo habla de relevancia. La exogeneidad del instrumento es un supuesto aparte.', fix: 'Reportá el F y, por separado, argumentá la exclusión y la exogeneidad.' },
            { error: 'Sargan no rechaza, entonces los instrumentos son válidos.', why: 'El contraste tiene poca potencia y no detecta una invalidez común a todos los instrumentos.', fix: 'Leelo como ausencia de evidencia en contra, no como certificado de validez.' },
            { error: 'Agregar instrumentos siempre mejora la estimación.', why: 'Un instrumento débil diluye la primera etapa, baja el F conjunto y aumenta el sesgo hacia MCO.', fix: 'Compará el F con uno y con varios instrumentos antes de decidir.' },
            { error: 'Reportar el t de MC2E cuando el F de primera etapa es menor que 10.', why: 'Con instrumentos débiles la distribución asintótica normal no es una buena aproximación.', fix: 'Buscá instrumentos más fuertes o usá métodos de inferencia robustos a instrumentos débiles, y advertí el problema.' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c10-check-06',
          question: 'Tenés dos instrumentos, F de primera etapa = 7,89 y Sargan p = 0,264. ¿Qué reportás?',
          intro: 'Separá fuerza, validez e inferencia.',
          answer: 'Reportás que la primera etapa es débil: F = 7,89 está por debajo de la regla de 10, así que los errores estándar convencionales y los t de MC2E no son confiables. El Sargan no rechaza la sobreidentificación (p = 0,264), pero eso no compensa la debilidad: no prueba que los instrumentos sean válidos y tiene poca potencia. La conclusión correcta es que la estimación puntual es informativa, pero la inferencia es frágil. La salida honesta incluye el F, el Sargan y la advertencia.'
        }
      ]
    },
    {
      id: 'c10-s07',
      number: '07',
      title: 'Mapa de decisión: del problema al reporte',
      blocks: [
        { type: 'p', id: 'c10-s07-p01', html: 'El orden de los diagnósticos no es arbitrario. No tiene sentido testear Sargan si el modelo está exactamente identificado, ni interpretar un t si la primera etapa es débil. El mapa ordena la secuencia y deja claro qué decide cada paso: la teoría define los instrumentos, los datos verifican relevancia e identificación, y el reporte explicita los límites.' },
        {
          type: 'map',
          steps: [
            { n: '1', title: 'Pregunta y endogeneidad', text: '¿Qué coeficiente querés identificar? ¿Qué variable sospechás endógena y por qué? Escribí el argumento antes de buscar instrumentos.' },
            { n: '2', title: 'Instrumentos candidatos', text: 'Buscá variables excluidas de la ecuación, correlacionadas con la endógena y plausibles como exógenas. La exclusión se defiende con teoría.' },
            { n: '3', title: 'Identificación', text: 'Contá m y k, verificá orden y rango. Decidí si el modelo es exactamente identificado o sobreidentificado.' },
            { n: '4', title: 'Primera etapa', text: 'Estimá la forma reducida. Mirá el t de cada instrumento y el F conjunto. Si F &lt; 10, frená y advertí.' },
            { n: '5', title: 'Estimación y Hausman', text: 'Estimá por MC2E y contrastá endogeneidad con la regresión aumentada. Si no rechazás, MCO es más eficiente, con la advertencia de potencia.' },
            { n: '6', title: 'Sobreidentificación', text: 'Si q &gt; 0, hacé Sargan. Si rechaza, revisá la exclusión de los instrumentos extra. Si no rechaza, no declares validez probada.' },
            { n: '7', title: 'Reporte', text: 'Coeficiente, error estándar, intervalo, n, instrumentos usados, F de primera etapa, Hausman, Sargan y límites del diseño.' }
          ]
        },
        { type: 'p', id: 'c10-s07-p02', html: 'Tres escenarios típicos de parcial. Primero: un instrumento fuerte, F = 13,26, Hausman no rechaza. La respuesta correcta no es cambiar automáticamente a MCO: se reporta que no hay evidencia de endogeneidad, que MCO sería más eficiente y que la diferencia entre estimaciones es económicamente relevante. Segundo: un instrumento fuerte, Hausman rechaza. MC2E se justifica y se reporta con su intervalo. Tercero: F por debajo de 10. El coeficiente se puede comentar, pero la inferencia se presenta como frágil y se buscan instrumentos mejores.' },
        { type: 'callout', variant: 'teal', label: 'El mapa no reemplaza el argumento teórico', html: 'Ningún contraste prueba que un instrumento sea exógeno. La exclusión se defiende con conocimiento del problema: por qué la variable afecta a la endógena y por qué no debería afectar a Y por otra vía. Los tests detectan síntomas; la validez se argumenta. Un Sargan que no rechaza no convierte un instrumento discutible en uno válido.' },
        {
          type: 'sourceStrip',
          chips: [
            { label: 'Clase 10', text: 'diap. 1–15' },
            { label: 'Wooldridge 4ed', text: 'Cap. 15, §15.1–15.5' },
            { label: 'TP 12', text: 'ej. 3, 4, 6–9' },
            { label: 'Parcial', text: '2P 2024' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c10-check-07',
          question: '¿Por qué el Sargan va después de la primera etapa y no antes?',
          intro: 'Pensá qué necesita el contraste para tener sentido y qué pasa si el instrumento es débil.',
          answer: 'Porque el Sargan se calcula con los residuos de la ecuación estimada por MC2E. Si la primera etapa es débil, esos residuos y el estimador no son confiables, así que el contraste tampoco. Además, el Sargan solo existe si hay sobreidentificación: con un instrumento y una endógena, q = 0 y no hay nada que testear. La secuencia correcta es identificación, fuerza y después validez. Un Sargan con F bajo no rescata la estimación.'
        }
      ]
    }
  ],
  concepts: {
    mc2e: {
      title: 'MC2E',
      sub: 'Variable instrumental para la regresión múltiple.',
      esencia: `
        <div class="definition">Mínimos cuadrados en dos etapas estima una ecuación estructural con regresores endógenos usando, como instrumento de cada uno, su proyección sobre todas las variables exógenas. Es el estimador de VI cuando hay más instrumentos que variables endógenas.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La primera etapa proyecta la endógena sobre las exógenas incluidas y excluidas; la segunda usa los valores ajustados.</li>
          <li>El coeficiente se puede replicar a mano, pero el error estándar manual es incorrecto.</li>
          <li>Es consistente si los instrumentos son válidos y relevantes; no es eficiente frente a MCO.</li>
        </ul>
        <div class="formula small">β̂<sub>MC2E</sub> = (X̂′X)<sup>−1</sup>X̂′Y<sub>1</sub><span>Var = σ̂<sup>2</sup>(X′Z(Z′Z)<sup>−1</sup>Z′X)<sup>−1</sup></span></div>
        <div class="badge-row"><span class="badge always">Siempre: dos etapas y corrección de varianza</span><span class="badge optional">Según el concepto: uno o varios instrumentos</span></div>
      `,
      ejemplo: `
        <p>En Card, MCO estima el retorno de la educación en 0,0747. MC2E con CERCANIA4 lo lleva a 0,1315 y MC2E con CERCANIA4 y CERCANIA2, a 0,1571. Los tres números responden a la misma ecuación estructural, pero cambian el supuesto de identificación.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La primera etapa con un instrumento tiene F = 13,26; con dos, F = 7,89. El coeficiente sube, pero la identificación se debilita: más instrumentos no significa mejor estimación.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Reportar los errores estándar de la segunda etapa hecha con lm().</strong> El σ̂<sup>2</sup> queda subestimado porque los residuos usan Ŷ<sub>2</sub> y no Y<sub>2</sub>.</li>
          <li><strong>Creer que MC2E siempre es mejor que MCO.</strong> Si la variable es exógena, MC2E es consistente pero ineficiente.</li>
          <li><strong>Interpretar el R<sup>2</sup> de la segunda etapa como ajuste del modelo.</strong> La segunda etapa no es la ecuación estructural y su R<sup>2</sup> no es comparable con el de MCO.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el coeficiente coincide con la segunda etapa manual y el error estándar no.</p></div>
      `,
      conexiones: `<p>MC2E es la generalización de la variable instrumental y se apoya en la forma reducida. Su costo se entiende con la varianza y su necesidad se testea con Hausman.</p>
        <div><button class="concept-chip" data-concept="forma-reducida">Forma reducida →</button><button class="concept-chip" data-concept="primera-etapa">Primera etapa →</button><button class="concept-chip" data-concept="hausman">Hausman →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 3–6.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.1–15.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6 y 8e.</p></div>
      `
    },
    'forma-reducida': {
      title: 'Forma reducida',
      sub: 'La endógena explicada por todas las exógenas.',
      esencia: `
        <div class="definition">La forma reducida expresa cada variable endógena en función de todas las variables exógenas del sistema, incluidas las que no están en la ecuación estructural. Es la regresión auxiliar que produce el instrumento óptimo.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Sus coeficientes π<sub>j</sub> miden la relevancia de cada instrumento; no son efectos causales sobre Y<sub>1</sub>.</li>
          <li>Los valores ajustados Ŷ<sub>2</sub> son ortogonales a v̂<sub>2</sub> por construcción: son la parte de Y<sub>2</sub> explicada por las exógenas.</li>
          <li>Si Y<sub>2</sub> es endógena, v<sub>2</sub> está correlacionado con u<sub>1</sub>; por eso usar Y<sub>2</sub> directamente sesga y usar Ŷ<sub>2</sub> no.</li>
        </ul>
        <div class="formula small">Y<sub>2i</sub> = π<sub>0</sub> + π<sub>1</sub>Z<sub>1i</sub> + π<sub>2</sub>Z<sub>2i</sub> + π<sub>3</sub>Z<sub>3i</sub> + v<sub>2i</sub><span>Relevancia: π<sub>j</sub> ≠ 0 para algún instrumento excluido</span></div>
        <div class="badge-row"><span class="badge always">Siempre: regresión auxiliar, no modelo económico</span><span class="badge optional">Según el concepto: una o varias endógenas</span></div>
      `,
      ejemplo: `
        <p>En Card, la forma reducida de EDUC sobre los controles y los dos instrumentos da CERCANIA4 = 0,3206 (t = 3,65) y CERCANIA2 = 0,1230 (t = 1,59), con R<sup>2</sup> = 0,4776. El primer instrumento es relevante; el segundo, no tanto.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El F conjunto de los dos instrumentos es 7,89 con 2 y 2993 grados de libertad. La forma reducida muestra por qué: el segundo instrumento aporta poco y el contraste conjunto reparte la evidencia entre dos coeficientes.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Interpretar π<sub>j</sub> como el efecto causal de Z sobre Y<sub>1</sub>.</strong> La forma reducida es una proyección; su coeficiente mezcla todos los canales.</li>
          <li><strong>Incluir en la forma reducida solo las exógenas de la ecuación estructural.</strong> Hay que incluir también los instrumentos excluidos; si no, no hay identificación.</li>
          <li><strong>Confundir el R<sup>2</sup> de la forma reducida con la calidad del instrumento.</strong> Un R<sup>2</sup> alto ayuda, pero lo que importa es el F de los instrumentos excluidos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué variables entran en la primera etapa y por qué.</p></div>
      `,
      conexiones: `<p>La forma reducida alimenta la primera etapa y de ella sale el instrumento que usa MC2E. También es la base del contraste de Hausman en su versión aumentada.</p>
        <div><button class="concept-chip" data-concept="primera-etapa">Primera etapa →</button><button class="concept-chip" data-concept="mc2e">MC2E →</button><button class="concept-chip" data-concept="hausman">Hausman →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 4–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6a y 8f.</p></div>
      `
    },
    identificacion: {
      title: 'Identificación',
      sub: 'Orden, rango y el supuesto que no se testea.',
      esencia: `
        <div class="definition">Un modelo está identificado si los datos permiten distinguir el parámetro verdadero de otros valores. Con regresores endógenos hacen falta instrumentos excluidos: la condición de orden cuenta cuántos y la de rango exige que aporten variación independiente.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Orden: m ≥ k, donde m son los instrumentos excluidos y k las endógenas.</li>
          <li>Rango: los instrumentos deben mover a las endógenas en direcciones linealmente independientes.</li>
          <li>Exactamente identificado (m = k) no permite contrastar la validez; sobreidentificado (m &gt; k) deja q = m − k restricciones.</li>
        </ul>
        <div class="formula small">m ≥ k &nbsp;·&nbsp; rango(Π) = k &nbsp;·&nbsp; q = m − k<span>Π: coeficientes de los instrumentos excluidos en las formas reducidas</span></div>
        <div class="badge-row"><span class="badge always">Siempre: orden y rango</span><span class="badge optional">Según el concepto: exacto o sobreidentificado</span></div>
      `,
      ejemplo: `
        <p>Card tiene una endógena (EDUC) y un instrumento (CERCANIA4): exactamente identificado, q = 0, Sargan no aplica. Al agregar CERCANIA2, q = 1 y aparece un contraste de sobreidentificación con 1 grado de libertad.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si el modelo tuviera dos endógenas y un solo instrumento excluido, la condición de orden fallaría y no habría forma de estimar. Contar instrumentos es el primer control, no el único.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que la condición de orden alcanza.</strong> Dos instrumentos colineales pueden cumplir el conteo y fallar el rango.</li>
          <li><strong>Usar una variable incluida como instrumento.</strong> Si ya está en la ecuación, no aporta una restricción de exclusión.</li>
          <li><strong>Olvidar que la exclusión es teórica.</strong> En el caso exactamente identificado, ningún contraste puede validarla.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir cuántos instrumentos necesita un modelo con dos variables endógenas.</p></div>
      `,
      conexiones: `<p>La identificación es la puerta de entrada a MC2E: sin orden y rango, el estimador no existe. También determina si se puede hacer Sargan.</p>
        <div><button class="concept-chip" data-concept="sobreidentificacion">Sobreidentificación →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 5 y 14.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.1–15.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6c.</p></div>
      `
    },
    'primera-etapa': {
      title: 'Primera etapa',
      sub: 'La regresión que mide la fuerza de los instrumentos.',
      esencia: `
        <div class="definition">La primera etapa regresa la variable endógena sobre todas las exógenas —incluidas las excluidas— y produce los valores ajustados que usa MC2E. Su F conjunto contrasta si los instrumentos excluidos explican a la endógena.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es una regresión por MCO, no un paso decorativo: de ella depende la fuerza de la identificación.</li>
          <li>El F mide información conjunta; el t de cada instrumento, el aporte individual.</li>
          <li>Un F bajo anticipa sesgo hacia MCO y errores estándar poco confiables.</li>
        </ul>
        <div class="formula small">F = [(SCR<sub>r</sub> − SCR<sub>nr</sub>)/q] / [SCR<sub>nr</sub>/(n − k − 1)]<span>Regla práctica: F &gt; 10</span></div>
        <div class="badge-row"><span class="badge always">Siempre: reportar el F conjunto</span><span class="badge optional">Según el concepto: robusto a heterocedasticidad</span></div>
      `,
      ejemplo: `
        <p>En Card, la primera etapa con CERCANIA4 tiene F = 13,256, por encima de 10. Con CERCANIA4 y CERCANIA2, el F conjunto baja a 7,893: el segundo instrumento tiene t = 1,59 y no compensa los dos grados de libertad que consume.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El F de la primera etapa no es el F global de la regresión. Es el contraste conjunto de los coeficientes de los instrumentos excluidos. En R aparece como Weak instruments en summary(ivreg, diagnostics = TRUE).</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Mirar el R<sup>2</sup> de la primera etapa y no el F de los instrumentos.</strong> Un R<sup>2</sup> alto puede venir de los controles, no de los instrumentos.</li>
          <li><strong>Reportar el F global de la regresión.</strong> El F relevante contrasta solo los instrumentos excluidos.</li>
          <li><strong>Ignorar que el F cae al agregar instrumentos débiles.</strong> Más parámetros en el numerador pueden bajar el estadístico.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No sabés qué hipótesis nula tiene el F de primera etapa.</p></div>
      `,
      conexiones: `<p>La primera etapa es la forma reducida aplicada a la endógena. Su F decide si el instrumento es débil y condiciona la validez de Hausman y de los t de MC2E.</p>
        <div><button class="concept-chip" data-concept="forma-reducida">Forma reducida →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button><button class="concept-chip" data-concept="mc2e">MC2E →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 5–6 y 13.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.3 y §15.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6f y 8c.</p></div>
      `
    },
    hausman: {
      title: 'Contraste de Hausman',
      sub: '¿La diferencia entre MCO y MC2E es sistemática?',
      esencia: `
        <div class="definition">El contraste de Hausman de exogeneidad compara los estimadores de MCO y MC2E. Bajo H<sub>0</sub> la variable es exógena y ambos son consistentes; si la diferencia es estadísticamente significativa, hay evidencia de endogeneidad.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La versión clásica usa la diferencia de coeficientes y la diferencia de matrices de varianza-covarianza.</li>
          <li>La versión de regresión aumentada agrega los residuos de la primera etapa a la ecuación estructural y testea δ = 0.</li>
          <li>Con varias endógenas se hace un contraste conjunto sobre todos los residuos.</li>
        </ul>
        <div class="formula small">H = (β̂<sub>MC2E</sub> − β̂<sub>MCO</sub>)′[Var(β̂<sub>MC2E</sub>) − Var(β̂<sub>MCO</sub>)]<sup>−1</sup>(β̂<sub>MC2E</sub> − β̂<sub>MCO</sub>)<span>~ χ<sup>2</sup><sub>k</sub> bajo H<sub>0</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: H<sub>0</sub> exogeneidad</span><span class="badge optional">Según el concepto: versión aumentada o clásica</span></div>
      `,
      ejemplo: `
        <p>En Card, Wu-Hausman da 1,168 con p = 0,280 usando CERCANIA4, y 2,926 con p = 0,087 usando los dos instrumentos. No se rechaza al 5%: no hay evidencia suficiente de endogeneidad, aunque la diferencia entre 0,0747 y 0,1315 es económicamente grande.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El contraste no decide por sí solo. Con un F de primera etapa de 7,89, la potencia es baja y el p del Hausman no es una conclusión firme. Se reporta junto con la fuerza de los instrumentos.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer el rechazo como prueba de validez del instrumento.</strong> Hausman testea endogeneidad del regresor, no exogeneidad del instrumento.</li>
          <li><strong>Concluir exogeneidad porque no rechazaste.</strong> No rechazar es ausencia de evidencia, condicionada por la potencia.</li>
          <li><strong>Usarlo con instrumentos débiles.</strong> La distribución del estadístico puede apartarse de la teórica y el resultado no es confiable.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el contraste compara dos estimadores en lugar de testear directamente la correlación.</p></div>
      `,
      conexiones: `<p>Hausman conecta MCO con MC2E y depende de la primera etapa. Si no rechaza, la eficiencia de MCO vuelve a pesar en la decisión.</p>
        <div><button class="concept-chip" data-concept="mc2e">MC2E →</button><button class="concept-chip" data-concept="primera-etapa">Primera etapa →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 8–11.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6e, 7e y 8f.</p></div>
      `
    },
    'instrumento-debil': {
      title: 'Instrumento débil',
      sub: 'Poca relevancia, mala inferencia.',
      esencia: `
        <div class="definition">Un instrumento es débil cuando está poco correlacionado con la variable endógena. El estimador MC2E pierde la distribución normal asintótica, los errores estándar convencionales quedan chicos y el sesgo se aproxima al de MCO.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Se detecta con el F de primera etapa sobre los instrumentos excluidos. La regla práctica es F &gt; 10.</li>
          <li>No es lo mismo que un instrumento inválido: la debilidad es un problema de relevancia; la invalidez, de exogeneidad.</li>
          <li>Agregar instrumentos débiles puede bajar el F conjunto y empeorar la identificación.</li>
        </ul>
        <div class="formula small">H<sub>0</sub>: π<sub>2</sub> = π<sub>3</sub> = 0 en la primera etapa<span>Si F &lt; 10, la advertencia es seria</span></div>
        <div class="badge-row"><span class="badge always">Siempre: mirar el F antes de interpretar t</span><span class="badge optional">Según el concepto: umbral 10 o valores críticos</span></div>
      `,
      ejemplo: `
        <p>En Card, el F pasa de 13,256 con CERCANIA4 a 7,893 con CERCANIA4 y CERCANIA2. El segundo instrumento tiene t = 1,59 en la primera etapa: aporta poco y consume un grado de libertad. El coeficiente de EDUC sube a 0,1571, pero la inferencia es más frágil.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La regla de 10 es una convención, no una frontera exacta. Lo importante es reportar el F, advertir la debilidad y no presentar los t como si la distribución normal valiera.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que un instrumento es débil porque el coeficiente de MC2E no es significativo.</strong> La debilidad se mide en la primera etapa, no en la segunda.</li>
          <li><strong>Creer que un F de 10,1 garantiza buena inferencia.</strong> Es un umbral aproximado y depende del número de instrumentos y del contexto.</li>
          <li><strong>Agregar instrumentos para subir el F.</strong> Si son débiles, el F conjunto puede bajar y el sesgo aumentar.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir en qué etapa se detecta un instrumento débil ni qué consecuencia tiene.</p></div>
      `,
      conexiones: `<p>La debilidad condiciona la primera etapa, la validez de Hausman y la lectura de Sargan. Es la advertencia que ordena todo el reporte de MC2E.</p>
        <div><button class="concept-chip" data-concept="primera-etapa">Primera etapa →</button><button class="concept-chip" data-concept="hausman">Hausman →</button><button class="concept-chip" data-concept="sobreidentificacion">Sobreidentificación →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 12–13.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6f y 8c.</p></div>
      `
    },
    sobreidentificacion: {
      title: 'Sobreidentificación',
      sub: 'Cuando sobran instrumentos y se pueden contrastar.',
      esencia: `
        <div class="definition">Hay sobreidentificación cuando la cantidad de instrumentos excluidos supera la de regresores endógenos. Entonces quedan q = m − k restricciones que se pueden contrastar para evaluar si los instrumentos extra son exógenos.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Con un instrumento y una endógena, q = 0: el modelo es exactamente identificado y no hay contraste posible.</li>
          <li>Con dos instrumentos y una endógena, q = 1; con tres, q = 2.</li>
          <li>El contraste es necesario pero no suficiente: no prueba la validez de todos los instrumentos.</li>
        </ul>
        <div class="formula small">q = m − k<span>m: instrumentos excluidos · k: regresores endógenos</span></div>
        <div class="badge-row"><span class="badge always">Siempre: contar q antes de testear</span><span class="badge optional">Según el concepto: Sargan o J de Hansen</span></div>
      `,
      ejemplo: `
        <p>En Card, el modelo con CERCANIA4 está exactamente identificado: Sargan no aplica. Al agregar CERCANIA2, q = 1 y el Sargan da 1,248 con p = 0,264: no se rechaza que el instrumento extra sea exógeno.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>No rechazar no significa que CERCANIA2 sea válido: el contraste tiene poca potencia y, si los dos instrumentos comparten el mismo problema, no lo detecta. La validez se sigue argumentando con teoría.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Hacer Sargan con un solo instrumento.</strong> Con q = 0 no hay restricciones y el software devuelve NA.</li>
          <li><strong>Interpretar el rechazo como identificación del instrumento inválido.</strong> El contraste dice que al menos uno falla, no cuál.</li>
          <li><strong>Creer que más instrumentos siempre mejoran.</strong> La sobreidentificación no corrige la debilidad de la primera etapa.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés calcular cuántas restricciones hay con tres instrumentos y una endógena.</p></div>
      `,
      conexiones: `<p>La sobreidentificación habilita el contraste de Sargan y depende de la condición de orden. También interactúa con la fuerza: un modelo sobreidentificado con instrumentos débiles no es mejor que uno exacto con un instrumento fuerte.</p>
        <div><button class="concept-chip" data-concept="sargan">Sargan →</button><button class="concept-chip" data-concept="identificacion">Identificación →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 14–15.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6c y 6f.</p></div>
      `
    },
    sargan: {
      title: 'Contraste de Sargan',
      sub: '¿Los instrumentos extra están correlacionados con el error?',
      esencia: `
        <div class="definition">El contraste de Sargan evalúa las restricciones de sobreidentificación. Se estima la ecuación por MC2E, se regresan los residuos sobre todas las exógenas y se calcula LM = nR<sup>2</sup>, que se distribuye χ<sup>2</sup> con q = m − k grados de libertad.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>H<sub>0</sub>: los instrumentos están incorrelacionados con el error estructural.</li>
          <li>Rechazar indica que al menos uno de los instrumentos no es exógeno, pero no identifica cuál.</li>
          <li>No rechazar no prueba validez: el contraste tiene potencia limitada y no detecta una invalidez común.</li>
        </ul>
        <div class="formula small">LM = n·R<sup>2</sup><sub>aux</sub> ~ χ<sup>2</sup><sub>q</sub><span>Residuos de MC2E sobre todas las exógenas</span></div>
        <div class="badge-row"><span class="badge always">Siempre: q = m − k y H<sub>0</sub> de exogeneidad</span><span class="badge optional">Según el concepto: Sargan o J de Hansen</span></div>
      `,
      ejemplo: `
        <p>En Card, con dos instrumentos, Sargan = 1,248 con q = 1 y p = 0,264. No se rechaza la exogeneidad de CERCANIA2. Con un solo instrumento, el estadístico es NA porque no hay restricción que contrastar.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El Sargan se reporta después del F de primera etapa. Si el F es 7,89, el contraste de sobreidentificación no mejora la calidad de la estimación: solo dice que no se detectó un problema de validez con la potencia disponible.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer el Sargan como prueba de que todos los instrumentos son válidos.</strong> Solo detecta algunas formas de invalidez y tiene poca potencia.</li>
          <li><strong>Hacerlo con un modelo exactamente identificado.</strong> No hay grados de libertad y el resultado no existe.</li>
          <li><strong>Ignorar que un rechazo no dice cuál instrumento falla.</strong> Hay que revisar la exclusión de cada uno, empezando por los extra.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el Sargan no puede rescatar un instrumento débil.</p></div>
      `,
      conexiones: `<p>Sargan es el contraste de sobreidentificación y se apoya en los residuos de MC2E. Se complementa con la primera etapa y con el argumento teórico de exclusión.</p>
        <div><button class="concept-chip" data-concept="sobreidentificacion">Sobreidentificación →</button><button class="concept-chip" data-concept="mc2e">MC2E →</button><button class="concept-chip" data-concept="instrumento-debil">Instrumento débil →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 10, diap. 14–15.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 15, §15.5.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 12, Ej. 6f.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de MC2E',
    intro: 'Las seis tarjetas recorren el TP 12 de menor a mayor dificultad: primero la lógica de la variable instrumental, después la fórmula matricial, luego MC2E con uno y dos instrumentos, y al final los casos de Vinos y Card. El laboratorio de R usa Card.rda para comparar un instrumento con dos y leer los diagnósticos.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-12',
    exercises: [
      {
        label: 'TP 12 · Ej. 3',
        title: 'Variable instrumental: MCO, endogeneidad y educación de la madre',
        text: 'Estimá el modelo simple de salario y educación, argumentá por qué EDUC puede ser endógena y estimá por VI usando los años de educación de la madre. Calculá el error estándar, el intervalo y la significatividad. Es la base conceptual de toda la clase.',
        tags: ['Aplicar', 'VI'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-3-10'
      },
      {
        label: 'TP 12 · Ej. 4',
        title: 'VI en regresión múltiple: fórmula matricial y varianza',
        text: 'Repetí el ejercicio anterior con EXPER como control y usá las fórmulas β̂ = (Z′X)⁻¹Z′Y y σ̂²(X′Z(Z′Z)⁻¹Z′X)⁻¹. El objetivo es ver que el estimador y su varianza se escriben con matrices, no con atajos.',
        tags: ['Matricial', 'VI'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-9'
      },
      {
        label: 'TP 12 · Ej. 6',
        title: 'MC2E manual y con R: uno y dos instrumentos',
        text: 'Estimá las dos etapas a mano, compará con ivreg, agregá el segundo instrumento y realizá Hausman, el F de primera etapa y el contraste de sobreidentificación. Es el ejercicio que integra todos los diagnósticos de la clase.',
        tags: ['Integrar', 'MC2E'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-6-8'
      },
      {
        label: 'TP 12 · Ej. 7',
        title: 'Vinos: experiencia del gerente endógena y edad como instrumento',
        text: 'Estimá la función de producción, detectá heterocedasticidad, usá Exper como proxy de management y después instrumentala con age. Cerrá con el test de Hausman y la interpretación de β₃.',
        tags: ['Aplicar', 'Hausman'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-7-5'
      },
      {
        label: 'TP 12 · Ej. 8',
        title: 'Card: MC2E con CERCANIA4 y residuales de la forma reducida',
        text: 'Estimá el modelo de salario por MCO y por MC2E, verificá la relevancia de CERCANIA4, interpretá el coeficiente de EDUC y usá los residuos de la forma reducida para testear exogeneidad. Es el ejercicio que replica el laboratorio.',
        tags: ['Aplicar', 'Card'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-8-2'
      },
      {
        label: 'TP 12 · Ej. 9',
        title: 'Card2: ¿es válido nearc4? IQ como control de capacidad',
        text: 'Discutí si nearc4 puede estar correlacionado con la habilidad no observada y usá las puntuaciones de IQ para chequearlo, primero solas y después controlando por smsa66 y las dummies regionales. Es un ejercicio de argumento, no de fórmula.',
        tags: ['Razonar', 'Validez'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-9-ejercicio-15.3-de-wooldridge'
      }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 12 · Ej. 6 y 8',
      title: 'Card: MC2E con un instrumento y con dos',
      intro: 'La misma ecuación estructural se estima con CERCANIA4 y con CERCANIA4 más CERCANIA2. La comparación muestra que agregar un instrumento no siempre fortalece la identificación: el coeficiente de EDUC se mueve y el F de primera etapa cae por debajo de la regla de 10.',
      dataNote: 'Card.rda tiene 3010 observaciones y 23 variables. La variable dependiente es l_SALARIO; los regresores son EDUC, EXPER, EXPER2, RAZA, CAPITAL, SUR, las dummies regionales REG2 a REG9 y REG_SMSA. Los instrumentos son CERCANIA4 y CERCANIA2, binarias que indican haber crecido cerca de una universidad de cuatro años o de dos años. No hay datos faltantes en las variables usadas. El modelo con un solo instrumento está exactamente identificado: Sargan no aplica. El R² de ivreg no es comparable con el de MCO ni sirve para elegir entre ambos.',
      script: `suppressPackageStartupMessages(library(AER))
load("Card.rda")

mco <- lm(l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + SUR +
            REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA,
          data = base)

iv1 <- ivreg(l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + SUR +
               REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA |
               . - EDUC + CERCANIA4, data = base)
summary(iv1, diagnostics = TRUE)

iv2 <- ivreg(l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + SUR +
               REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA |
               . - EDUC + CERCANIA4 + CERCANIA2, data = base)
summary(iv2, diagnostics = TRUE)

coef(mco)["EDUC"]

primera2 <- lm(EDUC ~ EXPER + EXPER2 + RAZA + CAPITAL + SUR + REG2 + REG3 +
                 REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA +
                 CERCANIA4 + CERCANIA2, data = base)
summary(primera2)$r.squared
round(summary(primera2)$coefficients[c("CERCANIA4", "CERCANIA2"), c(1, 2, 4)], 4)
linearHypothesis(primera2, c("CERCANIA4 = 0", "CERCANIA2 = 0"))

confint(iv1)["EDUC", ]
confint(iv2)["EDUC", ]`,
      output: `Call:
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


Call:
ivreg(formula = l_SALARIO ~ EDUC + EXPER + EXPER2 + RAZA + CAPITAL + 
    SUR + REG2 + REG3 + REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + 
    REG_SMSA | . - EDUC + CERCANIA4 + CERCANIA2, data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-1.93841 -0.25068  0.01932  0.26519  1.46998 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  3.2367108  0.8849118   3.658 0.000259 ***
EDUC         0.1570594  0.0525782   2.987 0.002839 ** 
EXPER        0.1188149  0.0228061   5.210 2.02e-07 ***
EXPER2      -0.0023565  0.0003475  -6.781 1.43e-11 ***
RAZA        -0.1232778  0.0521500  -2.364 0.018147 *  
CAPITAL      0.1007530  0.0315193   3.197 0.001405 ** 
SUR         -0.1431945  0.0284448  -5.034 5.08e-07 ***
REG2         0.1027473  0.0392906   2.615 0.008966 ** 
REG3         0.1499316  0.0383918   3.905 9.62e-05 ***
REG4         0.0475676  0.0456013   1.043 0.296977    
REG5         0.1544801  0.0485628   3.181 0.001482 ** 
REG6         0.1729728  0.0534164   3.238 0.001216 ** 
REG7         0.1420356  0.0511219   2.778 0.005497 ** 
REG8        -0.0950611  0.0609801  -1.559 0.119129    
REG9         0.1029760  0.0434224   2.371 0.017779 *  
REG_SMSA     0.0150626  0.0223360   0.674 0.500132    

Diagnostic tests:
                  df1  df2 statistic  p-value    
Weak instruments    2 2993     7.893 0.000381 ***
Wu-Hausman          1 2993     2.926 0.087286 .  
Sargan              1   NA     1.248 0.263905    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.4053 on 2994 degrees of freedom
Multiple R-Squared: 0.1702,	Adjusted R-squared: 0.166 
Wald test: 47.07 on 15 and 2994 DF,  p-value: < 2.2e-16 

      EDUC 
0.07469326 
[1] 0.4775567
          Estimate Std. Error Pr(>|t|)
CERCANIA4   0.3206     0.0878   0.0003
CERCANIA2   0.1230     0.0774   0.1123

Linear hypothesis test:
CERCANIA4 = 0
CERCANIA2 = 0

Model 1: restricted model
Model 2: EDUC ~ EXPER + EXPER2 + RAZA + CAPITAL + SUR + REG2 + REG3 + 
    REG4 + REG5 + REG6 + REG7 + REG8 + REG9 + REG_SMSA + CERCANIA4 + 
    CERCANIA2

  Res.Df   RSS Df Sum of Sq      F    Pr(>F)    
1   2995 11324                                   
2   2993 11265  2    59.416 7.8931 0.0003811 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
     2.5 %     97.5 % 
0.02377701 0.23923064 
     2.5 %     97.5 % 
0.05400791 0.26011083`,
      confint: `     2.5 %     97.5 % 
0.02377701 0.23923064 
     2.5 %     97.5 % 
0.05400791 0.26011083`,
      readingTable: [
        { element: 'Estimate (EDUC, iv1)', meaning: 'Coeficiente de EDUC con un instrumento.', how: '0,1315: un año más de educación se asocia con 13,15% más de salario. Es una asociación condicional, no un efecto causal probado.' },
        { element: 'Estimate (EDUC, iv2)', meaning: 'Coeficiente de EDUC con dos instrumentos.', how: '0,1571: sube respecto de 0,1315. El cambio no es una mejora: depende de qué instrumento se use y de la fuerza de la primera etapa.' },
        { element: 'Std. Error', meaning: 'Error estándar del coeficiente.', how: '0,0550 con un instrumento y 0,0526 con dos. Es mucho mayor que el 0,0035 de MCO: la precisión es el costo de instrumentar.' },
        { element: 't value', meaning: 'Estimate dividido por su error estándar.', how: '2,39 y 2,99. Ambos rechazan β<sub>EDUC</sub> = 0 al 5%, pero con dos instrumentos el F de primera etapa es 7,89 y el t convencional pierde respaldo.' },
        { element: 'Weak instruments', meaning: 'F de la primera etapa.', how: '13,256 con CERCANIA4; 7,893 con CERCANIA4 y CERCANIA2. El segundo caso está por debajo de la regla de 10: la advertencia es seria.' },
        { element: 'Wu-Hausman', meaning: 'Contraste de endogeneidad.', how: '1,168 con p = 0,280; 2,926 con p = 0,087. No se rechaza al 5% en ninguno de los dos casos. No prueba que EDUC sea exógena.' },
        { element: 'Sargan', meaning: 'Contraste de sobreidentificación.', how: 'NA con un instrumento (q = 0); 1,248 con p = 0,264 con dos (q = 1). No se rechaza la exogeneidad del instrumento extra.' },
        { element: 'Residual standard error', meaning: 'Dispersión residual del modelo.', how: '0,3883 y 0,4053, mayores que el 0,3723 de MCO. MC2E deja más variación sin explicar porque usa la parte proyectada de EDUC.' },
        { element: 'Multiple R-Squared', meaning: 'Ajuste reportado por ivreg.', how: '0,2382 y 0,1702. No se compara con el 0,2998 de MCO ni se usa para elegir: el R² de IV no mide lo mismo.' },
        { element: 'coef(mco)["EDUC"]', meaning: 'Referencia de MCO.', how: '0,0747. Es el estimador sesgado si EDUC es endógena, y el eficiente si es exógena. La comparación con 0,1315 y 0,1571 es el centro de la clase.' },
        { element: 'CERCANIA4 / CERCANIA2', meaning: 'Coeficientes de la primera etapa.', how: '0,3206 con t = 3,65 y 0,1230 con t = 1,59. El primer instrumento es relevante; el segundo, débil. El R² de la primera etapa es 0,4776.' },
        { element: 'confint (EDUC)', meaning: 'Intervalos al 95%.', how: '[0,0238; 0,2392] con un instrumento y [0,0540; 0,2601] con dos. Son anchos: la información disponible no permite precisión.' }
      ],
      econometric: `<p><strong>Un instrumento:</strong> EDUC = 0,1315 con ee = 0,0550 y t = 2,39. El F de primera etapa es 13,256, por encima de 10: el instrumento es relevante. El modelo está exactamente identificado, así que Sargan no aplica. El contraste de Wu-Hausman da 1,168 con p = 0,280: no se rechaza la exogeneidad al 5%.</p>
        <p><strong>Dos instrumentos:</strong> EDUC = 0,1571 con ee = 0,0526 y t = 2,99. El F conjunto baja a 7,893, por debajo de 10. El Sargan da 1,248 con 1 grado de libertad y p = 0,264: no se rechaza que CERCANIA2 sea exógeno. El Wu-Hausman sube a 2,926 con p = 0,087, evidencia marginal al 10% pero no al 5%.</p>
        <p><strong>Primera etapa:</strong> CERCANIA4 tiene coeficiente 0,3206 con t = 3,65; CERCANIA2, 0,1230 con t = 1,59. El R² es 0,4776. El contraste conjunto de los dos instrumentos da F = 7,8931 con 2 y 2993 grados de libertad y p = 0,000381. La relevancia individual del segundo es débil y el F conjunto lo refleja.</p>
        <p><strong>Comparación con MCO:</strong> el coeficiente de EDUC pasa de 0,0747 a 0,1315 y a 0,1571. El R² de ivreg cae de 0,2382 a 0,1702, pero no es comparable con el 0,2998 de MCO. La diferencia entre estimaciones es grande en términos económicos, aunque los intervalos se superponen: la muestra no alcanza para distinguir con precisión.</p>`,
      economic: `<p>La educación se asocia positivamente con el salario. La magnitud estimada por MC2E duplica aproximadamente la de MCO: 13% o 16% por año adicional, contra 7,5%. Esa diferencia es consistente con un sesgo positivo de MCO por habilidad no observada, pero también con un instrumento que captura otra población o mide mal la educación.</p>
        <p>CERCANIA4 indica haber crecido cerca de una universidad de cuatro años. La interpretación económica es que el acceso geográfico a la educación superior reduce el costo de estudiar y aumenta los años de educación. Esa variación es distinta de la que usa MCO: el estimador de MC2E identifica el efecto para quienes cambian su educación por vivir cerca de una universidad, no para toda la población.</p>
        <p>Agregar CERCANIA2 no mejora la estimación. El instrumento de dos años tiene t = 1,59 en la primera etapa y el F conjunto cae a 7,89. En términos económicos, la estimación con dos instrumentos es más imprecisa y más vulnerable al sesgo de instrumentos débiles. Que el coeficiente suba no significa que sea más confiable.</p>
        <p>El diseño es observacional y la validez de CERCANIA4 sigue siendo discutible: crecer cerca de una universidad puede correlacionarse con características familiares o regionales que también afectan el salario. La base controla región y área metropolitana de 1966, pero no resuelve todas las vías alternativas. Las conclusiones son asociaciones condicionales con un diseño de identificación explícito, no efectos causales incuestionables.</p>`,
      errors: [
        'Decir que el coeficiente de 0,1571 es mejor porque es más grande. La magnitud no mide calidad; el F de primera etapa es menor y la inferencia es más frágil.',
        'Comparar el R² de ivreg con el de MCO. El R² de IV no mide la misma proporción de variación y no sirve para elegir entre modelos.',
        'Leer el p = 0,280 de Wu-Hausman como prueba de que EDUC es exógena. No rechazar es ausencia de evidencia suficiente, no una certificación.',
        'Interpretar el Sargan p = 0,264 como prueba de que CERCANIA2 es válido. El contraste tiene poca potencia y no detecta una invalidez común.',
        'Reportar el t = 2,99 de la estimación con dos instrumentos sin advertir que F = 7,89. Con instrumentos débiles, el t convencional no es confiable.',
        'Confundir el F global de la primera etapa (171) con el F de los instrumentos excluidos (7,893). El primero incluye los controles; el segundo es el que mide relevancia.'
      ],
      checklist: [
        'Escribí la ecuación estructural y la lista de instrumentos antes de estimar.',
        'Verificá identificación: m ≥ k, rango y, si corresponde, q = m − k.',
        'Estimá la primera etapa y reportá el F de los instrumentos excluidos, no el F global.',
        'Estimá por MC2E con ivreg y reportá coeficiente, error estándar e intervalo.',
        'Contrastá endogeneidad con Wu-Hausman o con la regresión aumentada, y interpretá la potencia.',
        'Si hay sobreidentificación, reportá Sargan con q y advertí sus límites.',
        'Separé asociación condicional de causalidad y explicitá el supuesto de exclusión.'
      ]
    },
    partials: [
      { label: '2P 2024', text: 'Explique en qué consiste la estimación por MC2E y escriba la expresión de la varianza del estimador, detallando sus componentes. La respuesta esperada incluye la forma reducida, los valores ajustados y la matriz de varianza-covarianza con instrumentos.' },
      { label: '2P 2024', text: 'Variable endógena y variable instrumental: escriba el modelo, detalle los supuestos que debe cumplir la VI para que los estimadores sean consistentes y explique qué cambia en la estimación. Es el antecedente directo de MC2E.' }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a decidir cuándo MC2E es necesario, cómo se lee cada diagnóstico y qué no se puede concluir. Respondé antes de abrir la solución.',
    questions: [
      { q: '¿Por qué MC2E se llama en dos etapas si el software lo estima en un solo paso?', a: 'Porque el estimador se puede escribir como dos regresiones por MCO: la forma reducida de la endógena sobre todas las exógenas y la ecuación estructural con los valores ajustados. El software hace esa operación de forma implícita y corrige la varianza, porque la segunda etapa manual trata a Ŷ como un dato observado. El nombre describe la construcción del estimador, no la cantidad de comandos.' },
      { q: '¿Qué diferencia hay entre la ecuación estructural y la forma reducida?', a: 'La estructural es el modelo económico que se quiere estimar: Y₁ en función de Z₁ y de la endógena Y₂. La reducida expresa Y₂ en función de todas las exógenas, incluidas las excluidas. Sus coeficientes no son efectos causales sobre Y₁: sirven para predecir Y₂ y construir el instrumento. Confundirlas lleva a interpretar una proyección como si fuera la relación de interés.' },
      { q: 'Un modelo tiene dos variables endógenas y dos instrumentos excluidos. ¿Está identificado?', a: 'Cumple la condición de orden, porque m = k = 2. Falta verificar la de rango: los dos instrumentos tienen que mover a las dos endógenas en direcciones linealmente independientes. Si son colineales o miden lo mismo, el modelo no está identificado aunque el conteo cierre. Además, la exclusión y la exogeneidad de ambos instrumentos siguen siendo supuestos teóricos.' },
      { q: '¿Por qué los errores estándar de la segunda etapa hecha a mano son incorrectos?', a: 'Porque los residuos se calculan con Ŷ₂ en lugar de Y₂. Al ser una proyección, Ŷ₂ está más cerca de Y₁ y la suma de cuadrados residual queda más chica; σ̂² se subestima y los t se inflan. Además, la segunda etapa trata a Ŷ₂ como fijo e ignora la incertidumbre de la primera. La varianza correcta es σ̂²(X′Z(Z′Z)⁻¹Z′X)⁻¹, que reconoce que X e Z son matrices distintas.' },
      { q: '¿Por qué la varianza de MC2E es mayor que la de MCO?', a: 'Porque MC2E usa Ŷ₂, que tiene menos variación propia que Y₂, y porque Ŷ₂ es una combinación de las exógenas y suele estar más correlacionado con los controles. En la fórmula Var = σ̂²/[SCT₂(1 − R̂²₂)], el denominador es más chico por los dos motivos. MCO aprovecha toda la variación observada de Y₂; MC2E solo la parte explicada por los instrumentos.' },
      { q: 'Hausman no rechaza. ¿Pasás a MCO sin más?', a: 'No de forma automática. No rechazar indica que la muestra no aporta evidencia suficiente de endogeneidad, y MCO sería más eficiente, pero el contraste puede tener poca potencia, sobre todo con instrumentos débiles. Hay que mirar la diferencia entre coeficientes, los intervalos, el F de primera etapa y el argumento teórico. Si la endogeneidad es plausible por teoría y el instrumento es fuerte, un p alto no la descarta.' },
      { q: '¿Qué mide el F de primera etapa y por qué la regla práctica es 10?', a: 'Mide si los instrumentos excluidos explican conjuntamente a la variable endógena, es decir, si son relevantes. La regla de 10 es una convención: por debajo de ese valor, el sesgo de MC2E puede ser una fracción importante del sesgo de MCO y la distribución normal asintótica deja de ser una buena aproximación. No es una frontera exacta ni dice nada sobre la validez del instrumento.' },
      { q: 'F de primera etapa = 6 y Sargan p = 0,4. ¿Qué reportás?', a: 'Reportás que la primera etapa es débil: F = 6 está por debajo de 10, así que los errores estándar y los t convencionales no son confiables. El Sargan no rechaza, pero no compensa la debilidad y además tiene poca potencia. La estimación puntual se puede comentar como aproximación, pero la inferencia se presenta como frágil. La prioridad es buscar un instrumento más fuerte, no celebrar el Sargan.' },
      { q: 'Dos instrumentos, Sargan rechaza. ¿Qué significa y qué no?', a: 'Significa que al menos uno de los instrumentos está correlacionado con el error estructural: la hipótesis de que todos son exógenos se rechaza. No dice cuál falla ni permite identificar el culpable. Tampoco prueba que el otro sea válido. La respuesta es revisar la exclusión de cada instrumento, empezando por el que tiene menos justificación teórica, y volver a estimar.' },
      { q: '¿Más instrumentos siempre mejoran la eficiencia de MC2E?', a: 'No. Mejoran la eficiencia asintótica solo si son válidos y relevantes. Un instrumento débil consume grados de libertad en la primera etapa, puede bajar el F conjunto y aumentar el sesgo hacia MCO. En el laboratorio, pasar de CERCANIA4 a CERCANIA4 más CERCANIA2 bajó el F de 13,26 a 7,89. La cantidad no reemplaza la calidad.' },
      { q: 'En el laboratorio, ¿por qué el F de primera etapa baja al agregar CERCANIA2?', a: 'Porque el F conjunto contrasta dos coeficientes en lugar de uno y CERCANIA2 aporta poco: su t es 1,59 y su coeficiente, 0,1230. Al repartir la evidencia entre dos instrumentos, uno fuerte y uno débil, el estadístico cae. El coeficiente de EDUC sube a 0,1571, pero la identificación es más frágil: el F es la advertencia, no un detalle.' }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: MC2E en una página',
    intro: 'Empezá por las fórmulas, seguí con los drills y la sesión de 90 minutos, y cerrá con el plan de 7 días. La idea es tener el mapa completo antes de volver a los ejercicios.',
    formulas: [
      { title: 'Ecuación estructural', eq: 'Y<sub>1i</sub> = β<sub>0</sub> + β<sub>1</sub>Z<sub>1i</sub> + β<sub>2</sub>Y<sub>2i</sub> + u<sub>1i</sub>', note: 'Y₂ es endógena: Cov(Y₂, u₁) ≠ 0. Z₁ son los controles exógenos.' },
      { title: 'Forma reducida', eq: 'Y<sub>2i</sub> = π<sub>0</sub> + π<sub>1</sub>Z<sub>1i</sub> + π<sub>2</sub>Z<sub>2i</sub> + π<sub>3</sub>Z<sub>3i</sub> + v<sub>2i</sub>', note: 'Regresión auxiliar. Relevancia: πⱼ ≠ 0 para los instrumentos excluidos.' },
      { title: 'Condición de orden', eq: 'm ≥ k', note: 'Instrumentos excluidos al menos igual a regresores endógenos.' },
      { title: 'Condición de rango', eq: 'rango(Π) = k', note: 'Π reúne los coeficientes de los instrumentos excluidos en las formas reducidas.' },
      { title: 'Estimador MC2E', eq: 'β̂<sub>MC2E</sub> = (X̂′X)<sup>−1</sup>X̂′Y<sub>1</sub>', note: 'Coincide con la segunda etapa manual; con m = k se reduce a (Z′X)⁻¹Z′Y₁. La diferencia con MCO está en la varianza.' },
      { title: 'Varianza MC2E', eq: 'Var(β̂<sub>MC2E</sub>) = σ̂<sup>2</sup>(X′Z(Z′Z)<sup>−1</sup>Z′X)<sup>−1</sup>', note: 'σ̂² se calcula con los residuos estructurales, no con Ŷ₂.' },
      { title: 'Varianza en forma simple', eq: 'Var(β̂<sub>MC2E</sub>) = σ̂<sup>2</sup>/[SCT<sub>2</sub>(1 − R̂<sup>2</sup><sub>2</sub>)]', note: 'SCT₂ es de Ŷ₂; R̂²₂ mide su colinealidad con las demás exógenas.' },
      { title: 'Hausman clásico', eq: 'H = (β̂<sub>MC2E</sub> − β̂<sub>MCO</sub>)′[Var(β̂<sub>MC2E</sub>) − Var(β̂<sub>MCO</sub>)]<sup>−1</sup>(β̂<sub>MC2E</sub> − β̂<sub>MCO</sub>)', note: 'Bajo H₀ de exogeneidad se distribuye χ² con k grados de libertad.' },
      { title: 'Hausman aumentado', eq: 'Y<sub>1i</sub> = β<sub>0</sub> + β<sub>1</sub>Z<sub>1i</sub> + β<sub>2</sub>Y<sub>2i</sub> + δv̂<sub>2i</sub> + u<sub>i</sub>', note: 'H₀: δ = 0. Un t sobre δ; con varias endógenas, un contraste conjunto.' },
      { title: 'F de primera etapa', eq: 'F = [(SCR<sub>r</sub> − SCR<sub>nr</sub>)/q] / [SCR<sub>nr</sub>/(n − k − 1)]', note: 'H₀: los instrumentos excluidos no explican a Y₂. Regla práctica: F &gt; 10.' },
      { title: 'Sargan', eq: 'LM = n·R<sup>2</sup><sub>aux</sub> ~ χ<sup>2</sup><sub>q</sub>, con q = m − k', note: 'Residuos de MC2E sobre todas las exógenas. H₀: instrumentos exógenos.' }
    ],
    drills: [
      { q: 'Escribí la ecuación estructural y la forma reducida de un modelo con una endógena.', a: 'Estructural: Y₁ = β₀ + β₁Z₁ + β₂Y₂ + u₁. Reducida: Y₂ = π₀ + π₁Z₁ + π₂Z₂ + π₃Z₃ + v₂. Z₂ y Z₃ son los instrumentos excluidos.' },
      { q: '¿Qué exige la condición de orden?', a: 'Que la cantidad de instrumentos excluidos sea al menos la cantidad de regresores endógenos: m ≥ k. Es necesaria, no suficiente.' },
      { q: '¿Qué agrega la condición de rango?', a: 'Que los instrumentos excluidos muevan a las endógenas de forma linealmente independiente. Dos instrumentos colineales no suman rango aunque el conteo cierre.' },
      { q: 'Escribí el estimador MC2E en forma matricial.', a: 'β̂ = (X̂′X)⁻¹X̂′Y₁, con X̂ = P_ZX la proyección de X sobre los instrumentos. Si hay un instrumento por cada endógena, la expresión se reduce a (Z′X)⁻¹Z′Y₁.' },
      { q: 'Escribí la varianza de MC2E.', a: 'Var(β̂) = σ̂²(X′Z(Z′Z)⁻¹Z′X)⁻¹. σ̂² sale de los residuos estructurales, con Y₂, no con Ŷ₂.' },
      { q: '¿Por qué la segunda etapa manual da el coeficiente correcto y el t incorrecto?', a: 'Porque los residuos se calculan con Ŷ₂ y la SCR queda chica: σ̂² se subestima y el t se infla. La varianza correcta incluye la corrección matricial.' },
      { q: '¿Por qué la varianza de MC2E es mayor que la de MCO?', a: 'Porque Ŷ₂ tiene menos variación que Y₂ y suele estar más correlacionado con los controles. El denominador SCT₂(1 − R̂²₂) es más chico.' },
      { q: 'Escribí la versión aumentada del contraste de Hausman.', a: 'Y₁ = β₀ + β₁Z₁ + β₂Y₂ + δv̂₂ + u, con v̂₂ los residuos de la forma reducida. Se testea H₀: δ = 0 con un t, preferentemente robusto.' },
      { q: '¿Qué mide el F de primera etapa y cuál es la regla práctica?', a: 'Mide si los instrumentos excluidos explican conjuntamente a la endógena. Regla: F &gt; 10 para no preocuparse por instrumentos débiles. Es una convención, no una garantía.' },
      { q: '¿Cómo se calcula el Sargan y cuántos grados de libertad tiene?', a: 'Se estima MC2E, se regresan los residuos sobre todas las exógenas y se calcula LM = nR², que se compara con χ² con q = m − k. H₀: los instrumentos son exógenos.' },
      { q: 'En el laboratorio, ¿cuánto vale el F con uno y con dos instrumentos?', a: '13,256 con CERCANIA4 y 7,893 con CERCANIA4 más CERCANIA2. El segundo está por debajo de 10: agregar un instrumento débil debilitó la primera etapa.' }
    ],
    sourceGuide: [
      { stuck: 'No entiendo por qué MCO falla con una variable endógena', source: 'Clase 10, diap. 3–4; Wooldridge Cap. 15, §15.1; TP 12, Ej. 8a.' },
      { stuck: 'No sé escribir la forma reducida ni qué variables entran', source: 'Clase 10, diap. 4–5; Wooldridge §15.2; TP 12, Ej. 6a.' },
      { stuck: 'No distingo identificación de estimación', source: 'Clase 10, diap. 5 y 14; Wooldridge §15.1–15.2; TP 12, Ej. 6c.' },
      { stuck: 'No sé cuántos instrumentos necesito', source: 'Clase 10, diap. 5 y 14; TP 12, Ej. 6c.' },
      { stuck: 'No entiendo por qué no hacer la segunda etapa a mano', source: 'Clase 10, diap. 6; Wooldridge §15.3; TP 12, Ej. 6a–b.' },
      { stuck: 'No entiendo la varianza ni la multicolinealidad de MC2E', source: 'Clase 10, diap. 7; Wooldridge §15.3; TP 12, Ej. 4.' },
      { stuck: 'No sé plantear el contraste de Hausman', source: 'Clase 10, diap. 8–11; TP 12, Ej. 6e y 7e.' },
      { stuck: 'No sé leer el F de primera etapa', source: 'Clase 10, diap. 12–13; TP 12, Ej. 6f y 8c.' },
      { stuck: 'No entiendo el Sargan ni la sobreidentificación', source: 'Clase 10, diap. 14–15; Wooldridge §15.5; TP 12, Ej. 6f.' }
    ],
    session: [
      { time: '0–10', title: 'Pregunta guía', text: '¿Cuándo hace falta MC2E y qué se puede verificar antes de confiar en él? Escribí una respuesta de tres líneas sin mirar los apuntes.' },
      { time: '10–25', title: 'Estructural y reducida', text: 'Escribí las dos ecuaciones, identificá endógenas, exógenas incluidas e instrumentos excluidos. Explicá por qué la reducida no es el modelo económico.' },
      { time: '25–40', title: 'Identificación y dos etapas', text: 'Aplicá orden y rango a un caso con dos endógenas. Después escribí el estimador matricial y explicá por qué el t manual no sirve.' },
      { time: '40–55', title: 'Varianza y Hausman', text: 'Escribí la varianza en forma simple y matricial. Resolvé el TP 12, Ej. 6e y explicá qué significa no rechazar.' },
      { time: '55–75', title: 'Instrumentos débiles y Sargan', text: 'Leé la salida del laboratorio: F de 13,26 y 7,89, Sargan de 1,248 con p = 0,264. Escribí qué reportarías en cada caso y qué no.' },
      { time: '75–90', title: 'Parciales y cierre', text: 'Respondé las dos preguntas de 2P 2024 sobre MC2E y variable instrumental. Cerrá con una idea que puedas explicar en dos minutos y una que todavía no puedas.' }
    ],
    kit: [
      { k: 'Kit 01', title: 'Una página de ideas clave', text: 'Estructural, reducida, identificación, dos etapas, varianza, Hausman, F y Sargan, con una frase por concepto.' },
      { k: 'Kit 02', title: 'Tabla de errores', text: 'Los errores de las secciones 02 a 06 y los del laboratorio, ordenados por tema y con la corrección al lado.' },
      { k: 'Kit 03', title: 'Once preguntas', text: 'La pestaña de Autoevaluación, de menor a mayor dificultad, para responder en voz alta.' },
      { k: 'Kit 04', title: 'Plan de 7 días', text: 'Una rutina corta para llegar al parcial con los diagnósticos automatizados.' }
    ],
    plan: [
      { day: 'Día 1', title: 'Teoría y mapa', text: 'Leé la clase completa y explicá el mapa de decisión sin mirar. Anotá qué paso todavía no podés justificar.' },
      { day: 'Día 2', title: 'Estructural y reducida', text: 'Escribí las dos ecuaciones para el caso Card y para el caso Vinos. Identificá instrumentos y controles en cada uno.' },
      { day: 'Día 3', title: 'Identificación y dos etapas', text: 'Resolvé el TP 12, Ej. 6a–c. Replicá la segunda etapa a mano y comprobá que el coeficiente coincide con ivreg.' },
      { day: 'Día 4', title: 'Varianza y Hausman', text: 'Escribí las dos fórmulas de varianza y resolvé el Ej. 6e. Explicá por qué no rechazar no prueba exogeneidad.' },
      { day: 'Día 5', title: 'Instrumentos débiles y Sargan', text: 'Replicá el laboratorio y resolvé el Ej. 6f. Compará el F con uno y con dos instrumentos.' },
      { day: 'Día 6', title: 'Parciales y simulacro', text: 'Respondé las preguntas de 2P 2024 en 40 minutos, sin mirar. Revisá después con la solución orientativa.' },
      { day: 'Día 7', title: 'Cierre', text: 'Volvé solo a lo que falló y actualizá tu kit de una página. Explicá MC2E a alguien en cinco minutos.' }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'La clase de cátedra fija el orden y los énfasis; el libro profundiza la derivación; la guía y el parcial muestran cómo se evalúa.',
    items: [
      { type: 'Clase', typeClass: '', title: 'Clase 10 — Estimación por MC2E', text: 'Fuente principal de la estructura, los contrastes y el nivel de profundidad. Cubre MC2E, multicolinealidad, Hausman, instrumentos débiles y sobreidentificación.', loc: '15 diapositivas · diap. 1–15' },
      { type: 'Libro', typeClass: 'book', title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.', text: 'Cap. 15: estimación por variable instrumental y MC2E, contraste de endogeneidad, instrumentos débiles y restricciones de sobreidentificación. Cap. 9: endogeneidad y variables proxy, como antecedente.', loc: 'Cap. 15 · §15.1–15.5; Cap. 9' },
      { type: 'Guía', typeClass: '', title: 'Guía de Trabajos Prácticos 2026 — TP 12', text: 'Endogeneidad y MC2E. Los ejercicios 3, 4 y 6 trabajan VI, MC2E manual y con R, Hausman y sobreidentificación; los ejercicios 7, 8 y 9 aplican a Vinos y Card.', loc: 'TP 12 · act. 1–2; ej. 3–9', href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-12' },
      { type: 'Parcial', typeClass: 'exam', title: '2P 2024', text: 'Pregunta sobre MC2E y expresión de la varianza del estimador, y pregunta sobre supuestos de la variable instrumental. Es el formato de respuesta esperado para esta clase.', loc: 'Solución orientativa · preguntas 5 y 6' }
    ]
  }
};
