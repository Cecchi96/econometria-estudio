window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-08"] = {
  id: 'clase-08',
  num: '08',
  eyebrow: 'Clase 08 · Autocorrelación',
  title: 'Autocorrelación: cuando el error de hoy arrastra el de ayer',
  lead: 'Con series de tiempo, los errores pueden parecerse entre períodos cercanos. MCO sigue siendo insesgado si las X son estrictamente exógenas, pero los errores estándar, los t y los F dejan de ser válidos. La salida tiene tres caminos: corregir la inferencia con HAC, corregir el modelo con MCG o cambiar la especificación.',
  question: '¿Cómo detectás autocorrelación, qué consecuencias tiene sobre MCO y cuándo conviene corregir los errores estándar en lugar de reestimar el modelo?',
  pills: ['30 diapositivas', 'TP 11', '2P 2024', '8 conceptos clave'],
  sections: [
    {
      id: 'c08-s01',
      number: '01',
      title: 'El problema: errores que se parecen a sí mismos',
      blocks: [
        {
          type: 'p',
          id: 'c08-s01-p01',
          html: 'Un modelo de accidentes mensuales deja residuos que no se comportan como sorteos independientes. Durante varios meses quedan por encima de la recta y después, durante varios meses, por debajo. Esa persistencia es la marca de la <span class="concept" data-concept="autocorrelacion" tabindex="0" role="button">autocorrelación</span>: el error de un período se parece al del período anterior. No es un problema de tamaño de los residuos, sino de su orden en el tiempo.'
        },
        {
          type: 'compare',
          left: {
            tag: 'Sin autocorrelación',
            title: 'Cada error es un sorteo nuevo',
            text: 'El error de este mes no aporta información sobre el del mes que viene. La covarianza entre errores de distintos períodos es cero.',
            eq: 'Corr(u<sub>t</sub>, u<sub>t−1</sub>) = 0'
          },
          right: {
            tag: 'AR(1)',
            title: 'El error recuerda',
            text: 'El error de este mes arrastra una parte del error del mes anterior. Esa persistencia se repite período tras período.',
            eq: 'u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub>'
          }
        },
        {
          type: 'formula',
          main: 'u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub> &nbsp;·&nbsp; |ρ| &lt; 1 &nbsp;·&nbsp; e<sub>t</sub> ~ iid(0, σ<sub>e</sub><sup>2</sup>)',
          legend: [
            { key: 'ρ', text: 'Coeficiente de autocorrelación de primer orden. Mide cuánto del error pasado queda en el error actual.' },
            { key: 'e<sub>t</sub>', text: 'Innovación o shock nuevo. No está correlacionado con el pasado.' },
            { key: '|ρ| &lt; 1', text: 'Condición de estacionariedad. Si ρ = 1, la serie tiene raíz unitaria y el tratamiento es otro.' }
          ]
        },
        {
          type: 'p',
          id: 'c08-s01-p02',
          html: 'En el <span class="concept" data-concept="ar1" tabindex="0" role="button">modelo AR(1)</span>, el valor de ρ cambia la historia. Con ρ = 0,3, un shock de este mes casi desaparece en dos o tres períodos. Con ρ = 0,9, todavía queda un 35% del shock después de diez períodos. El signo también importa: un ρ negativo produce un patrón de zigzag, con errores que alternan de signo. Y un ρ cercano a cero no descarta otras formas de dependencia, como la estacionalidad o la autocorrelación de orden mayor.'
        },
        {
          type: "interactive",
          kind: "ar1",
          label: "Laboratorio visual",
          title: "El error de hoy arrastra el de ayer",
          intro: "Movés ρ y ves la serie de residuos y el diagrama de dispersión contra su rezago. La recta ajustada tiene pendiente ρ.",
          hint: "Con ρ positivo hay persistencia y DW < 2; con ρ negativo hay alternancia y DW > 2; con ρ = 0, DW ≈ 2. La autocorrelación no sesga MCO si X es estrictamente exógena, pero invalida los e.e. habituales."
        },
        {
          type: 'cards',
          items: [
            { sym: 'ρ &gt; 0', title: 'Rachas', text: 'Errores positivos seguidos de positivos y negativos seguidos de negativos. Es el patrón más común en series económicas.' },
            { sym: 'ρ &lt; 0', title: 'Zigzag', text: 'Un error positivo tiende a ser seguido por uno negativo. La serie parece sobrecorregir cada período.' },
            { sym: 'ρ ≈ 0', title: 'Sin patrón lineal', text: 'No hay evidencia de AR(1). Puede haber estacionalidad, rezagos más largos o cambios de varianza.' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c08-check-01',
          question: '¿Un residuo grande es señal de autocorrelación?',
          intro: 'Separá magnitud de patrón temporal.',
          answer: 'No. Un residuo grande puede ser un shock puntual o un problema de escala; la autocorrelación se detecta por la relación entre residuos de períodos distintos, no por su tamaño. Podés tener residuos chicos pero muy persistentes, o residuos grandes y completamente independientes. La pregunta correcta es si el signo y la magnitud de un residuo se parecen a los del anterior.'
        }
      ]
    },
    {
      id: 'c08-s02',
      number: '02',
      title: 'Qué le pasa a MCO: insesgado, pero mal medido',
      blocks: [
        {
          type: 'p',
          id: 'c08-s02-p01',
          html: 'La buena noticia: con datos débilmente dependientes y X estrictamente exógenas, MCO sigue siendo insesgado aunque los errores estén autocorrelacionados. La mala: deja de ser eficiente y los errores estándar habituales dejan de ser válidos. Esa combinación es la <span class="concept" data-concept="consecuencias" tabindex="0" role="button">consecuencia central</span> de la clase: el coeficiente puede estar bien centrado y, aun así, el t que reportás no medir lo que creés.'
        },
        {
          type: 'assumptions',
          rows: [
            { title: 'Exogeneidad estricta', text: 'E(u<sub>t</sub> | X) = 0 para todo t. Con dependencia débil, MCO es insesgado y consistente aunque haya autocorrelación.' },
            { title: 'Exogeneidad contemporánea', text: 'E(u<sub>t</sub> | X<sub>t</sub>) = 0. Alcanza para consistencia, no para insesgadez en muestras finitas.' },
            { title: 'Dependencia débil', text: 'La correlación entre observaciones lejanas decae con la distancia. Permite aplicar leyes de grandes números y teoremas centrales del límite.' },
            { title: 'Gauss-Markov', text: 'Exige errores homocedásticos y no autocorrelacionados. Con autocorrelación, MCO deja de ser ELIO (el mejor estimador lineal insesgado).' }
          ]
        },
        {
          type: 'formula',
          main: 'var(β̂<sub>MCO</sub>) = σ̂<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup>',
          legend: [
            { key: 'Ω', text: 'Matriz de varianzas y covarianzas de los errores. Con autocorrelación tiene valores distintos de cero fuera de la diagonal.' },
            { key: 'Ω = I', text: 'Caso sin autocorrelación ni heterocedasticidad: la expresión se reduce a σ²(X′X)⁻¹.' },
            { key: 'Software', text: 'R calcula σ̂²(X′X)⁻¹, no la versión con Ω. Por eso los errores estándar quedan mal cuando Ω ≠ I.' }
          ]
        },
        {
          type: 'p',
          id: 'c08-s02-p02',
          html: 'Con autocorrelación positiva, la fórmula habitual subestima la varianza verdadera. El t se agranda artificialmente, el intervalo de confianza queda demasiado angosto y el F rechaza con más facilidad de la que debería. Con autocorrelación negativa pasa lo contrario: los errores estándar se inflan y los contrastes pierden potencia. En los dos casos, la inferencia deja de tener el nivel de significancia que dice tener.'
        },
        {
          type: 'formula',
          main: 'var(β̂<sub>1</sub>) = σ<sup>2</sup>/SCT<sub>x</sub> + (2σ<sup>2</sup>/SCT<sub>x</sub><sup>2</sup>) Σ<sub>t</sub>Σ<sub>j</sub> ρ<sup>j</sup>X<sub>t</sub>X<sub>t+j</sub>',
          legend: [
            { key: 'Primer término', text: 'Es la varianza que tendría el estimador si ρ = 0.' },
            { key: 'Segundo término', text: 'Recoge la autocorrelación. Si ρ ≠ 0 y X está autocorrelacionada, la varianza verdadera difiere de la habitual.' },
            { key: 'Lectura', text: 'La fórmula no se usa para calcular a mano: sirve para entender por qué el error estándar de la salida está sesgado.' }
          ]
        },
        {
          type: 'errorTable',
          rows: [
            { error: 'La autocorrelación sesga los coeficientes de MCO.', why: 'Con X estrictamente exógenas, el estimador sigue siendo insesgado; lo que cambia es su varianza.', fix: 'Separá sesgo del coeficiente de validez del error estándar.' },
            { error: 'Como MCO es insesgado, el t sigue siendo válido.', why: 'La insesgadez no corrige la varianza. El denominador del t está mal calculado.', fix: 'Usá HAC, MCG o la corrección que corresponda antes de mirar t y F.' },
            { error: 'El R² deja de tener sentido con autocorrelación.', why: 'El R² sigue siendo una medida descriptiva del ajuste muestral; lo inválido es la inferencia.', fix: 'No lo uses como prueba de significancia ni para comparar modelos con distinta Y.' },
            { error: 'Con autocorrelación negativa los t se inflan.', why: 'La dirección es la opuesta: la fórmula habitual sobreestima la varianza y los t quedan chicos.', fix: 'Mirá el signo de ρ antes de decir en qué dirección falla la inferencia.' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c08-check-02',
          question: 'Si MCO es insesgado, ¿por qué no podés usar el t habitual?',
          intro: 'Pensá qué mide el error estándar y qué supuesto lo sostiene.',
          answer: 'Porque la insesgadez describe el centro de la distribución del estimador, no su dispersión. El error estándar habitual supone Ω = I; con autocorrelación, la varianza verdadera es σ²(X′X)⁻¹X′ΩX(X′X)⁻¹ y el software no la calcula. El t es coeficiente dividido por un error estándar sesgado, así que su distribución ya no es la t que usás para el valor p. El coeficiente puede estar cerca del verdadero y el t puede estar muy lejos de cero.'
        }
      ]
    },
    {
      id: 'c08-s03',
      number: '03',
      title: 'Detección gráfica y prueba t de ρ',
      blocks: [
        {
          type: 'p',
          id: 'c08-s03-p01',
          html: 'Antes de cualquier contraste formal, mirá los residuos. El gráfico de residuos contra tiempo muestra rachas, ciclos o cambios de nivel. El gráfico de residuos en t contra residuos en t−1 muestra si la relación es lineal y de qué signo. En heterocedasticidad, en cambio, lo que se ve es un abanico: la dispersión cambia, pero no necesariamente el orden. Confundir las dos cosas lleva a corregir el problema equivocado.'
        },
        {
          type: 'cards',
          items: [
            { sym: 'Tiempo', title: 'Rachas', text: 'Varios residuos del mismo signo seguidos. Es la señal visual más directa de autocorrelación positiva.' },
            { sym: 't vs t−1', title: 'Nube inclinada', text: 'Si los puntos se alinean con pendiente positiva, ρ &gt; 0; con pendiente negativa, ρ &lt; 0.' },
            { sym: 'Abanico', title: 'Heterocedasticidad', text: 'La dispersión cambia con el tiempo o con X, pero no hay persistencia de signo. Es otro diagnóstico.' }
          ]
        },
        {
          type: 'formula',
          main: 'û<sub>t</sub> = ρ̂û<sub>t−1</sub> + error &nbsp;(sin constante) &nbsp;·&nbsp; t = ρ̂/ee(ρ̂) &nbsp;·&nbsp; H<sub>0</sub>: ρ = 0',
          legend: [
            { key: 'û<sub>t</sub>', text: 'Residuos de la regresión MCO original, no errores verdaderos.' },
            { key: 'Sin constante', text: 'La regresión auxiliar no lleva intercepto: se estima la persistencia pura del residuo.' },
            { key: 't', text: 'Contraste de significancia individual de ρ̂. En muestras grandes se distribuye aproximadamente t.' }
          ]
        },
        {
          type: 'p',
          id: 'c08-s03-p02',
          html: 'La prueba es asintótica y requiere exogeneidad estricta para que reemplazar errores por residuos no altere la distribución. Si hay heterocedasticidad, usá el t robusto. Si alguna X está correlacionada con u<sub>t−1</sub>, o si el modelo incluye la variable dependiente rezagada, la regresión auxiliar tiene que incluir las X: û<sub>t</sub> en función de X<sub>t</sub> y û<sub>t−1</sub>. Esa inclusión permite que los regresores estén correlacionados con el error pasado sin romper la validez del contraste.'
        },
        {
          type: 'errorTable',
          rows: [
            { error: 'La prueba t de ρ usa los errores verdaderos.', why: 'Los errores no se observan; se usan los residuos MCO y se apela a la propiedad asintótica.', fix: 'Aclará que es una prueba de muestra grande y que requiere exogeneidad estricta.' },
            { error: 'Con heterocedasticidad, el t habitual de ρ sirve igual.', why: 'La varianza del estimador auxiliar cambia y el t deja de tener la distribución correcta.', fix: 'Usá el t robusto a heterocedasticidad o un contraste tipo BG robusto.' },
            { error: 'Con Y rezagada alcanza con regresar û<sub>t</sub> en û<sub>t−1</sub>.', why: 'La Y rezagada está correlacionada con u<sub>t−1</sub> y contamina la estimación de ρ.', fix: 'Incluí las X en la regresión auxiliar, como hace Breusch-Godfrey.' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c08-check-03',
          question: '¿Por qué la prueba t de ρ usa residuos y no errores?',
          intro: 'Pensá qué se observa y qué se estima.',
          answer: 'Porque los errores verdaderos no se observan. Se reemplazan por los residuos MCO, que son una estimación consistente del error bajo exogeneidad estricta. En muestras grandes, el estadístico t calculado con residuos tiene la misma distribución aproximada que el calculado con errores; en muestras chicas esa aproximación puede ser pobre. Por eso la prueba se presenta como asintótica y no como exacta.'
        }
      ]
    },
    {
      id: 'c08-s04',
      number: '04',
      title: 'Durbin-Watson: el estadístico d',
      blocks: [
        {
          type: 'p',
          id: 'c08-s04-p01',
          html: 'Durbin y Watson propusieron el <span class="concept" data-concept="durbin-watson" tabindex="0" role="button">estadístico d</span>, que resume la persistencia de los residuos en un solo número. Es la prueba más conocida y la más mal usada. La idea es sencilla: si los residuos consecutivos se parecen, las diferencias entre ellos son chicas y el estadístico se aleja de 2. Si no se parecen, las diferencias son grandes y el estadístico se acerca a 2.'
        },
        {
          type: 'formula',
          main: 'd = Σ<sub>t=2</sub><sup>n</sup>(û<sub>t</sub> − û<sub>t−1</sub>)<sup>2</sup> / Σ<sub>t=1</sub><sup>n</sup>û<sub>t</sub><sup>2</sup> &nbsp;→&nbsp; d ≈ 2(1 − ρ̂) &nbsp;→&nbsp; ρ̂ ≈ 1 − d/2',
          legend: [
            { key: 'Rango', text: 'd toma valores entre 0 y 4 aproximadamente. d ≈ 2 corresponde a ρ ≈ 0.' },
            { key: 'd &lt; 2', text: 'Autocorrelación positiva. Cuanto más cerca de 0, más fuerte.' },
            { key: 'd &gt; 2', text: 'Autocorrelación negativa. Cuanto más cerca de 4, más fuerte.' }
          ]
        },
        {
          type: 'p',
          id: 'c08-s04-p02',
          html: 'La distribución exacta de d depende de la matriz X y está tabulada. Por eso se usan dos valores críticos, d<sub>L</sub> y d<sub>U</sub>: si d &lt; d<sub>L</sub>, se rechaza la ausencia de autocorrelación positiva; si d &gt; d<sub>U</sub>, no se rechaza; si cae entre ambos, el contraste es inconcluyente. Para autocorrelación negativa se hace el contraste con 4 − d. La zona de indecisión no es un defecto menor: con muestras chicas puede ser amplia.'
        },
        {
          type: 'assumptions',
          rows: [
            { title: 'Supuestos del MLC', text: 'Errores normales y homocedásticos. Sin normalidad, la distribución tabulada es solo aproximada.' },
            { title: 'Exogeneidad estricta', text: 'Las X no pueden estar correlacionadas con errores pasados ni futuros.' },
            { title: 'Sin Y rezagada', text: 'Si el modelo incluye la variable dependiente rezagada, d está sesgado hacia 2 y la prueba no sirve.' },
            { title: 'Solo AR(1)', text: 'Detecta autocorrelación de primer orden. Para AR(p) hace falta Breusch-Godfrey u otro contraste de orden superior.' }
          ]
        },
        {
          type: 'cards',
          items: [
            { sym: 'd &lt; d<sub>L</sub>', title: 'Rechazo', text: 'Hay evidencia de autocorrelación positiva. Se rechaza H₀: ρ = 0.' },
            { sym: 'd<sub>L</sub> ≤ d ≤ d<sub>U</sub>', title: 'Inconcluyente', text: 'La prueba no decide. No es lo mismo que aceptar H₀; hay que complementar con BG o con la prueba t de ρ.' },
            { sym: 'd &gt; d<sub>U</sub>', title: 'No rechazo', text: 'No hay evidencia suficiente de autocorrelación positiva. Puede haberla negativa o de orden mayor.' }
          ]
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'Tres límites que hay que decir en el parcial',
          html: 'DW no sirve con variable dependiente rezagada, no detecta autocorrelación de orden mayor y tiene una zona inconcluyente. Tampoco es una prueba de heterocedasticidad ni de correcta especificación. Si el modelo tiene Y<sub>t−1</sub> entre los regresores, usá Breusch-Godfrey; si sospechás AR(2) o estacionalidad, también.'
        },
        {
          type: 'miniCheck',
          id: 'c08-check-04',
          question: 'En el laboratorio, d = 1,4298. ¿Qué ρ implica y qué concluís?',
          intro: 'Usá la relación aproximada entre d y ρ.',
          answer: 'ρ̂ ≈ 1 − 1,4298/2 = 0,285. Es autocorrelación positiva moderada. El contraste de DW del laboratorio da p = 0,00083, así que se rechaza H₀: ρ = 0 al 5%: hay evidencia de autocorrelación positiva de primer orden. El valor 0,285 es una aproximación; el ρ estimado por Prais-Winsten es 0,2886, muy cerca.'
        }
      ]
    },
    {
      id: 'c08-s05',
      number: '05',
      title: 'Breusch-Godfrey y errores HAC',
      blocks: [
        {
          type: 'p',
          id: 'c08-s05-p01',
          html: 'La prueba de <span class="concept" data-concept="breusch-godfrey" tabindex="0" role="button">Breusch-Godfrey</span> generaliza el diagnóstico a autocorrelación de orden p. Se estima el modelo por MCO, se guardan los residuos y se corre una regresión auxiliar de û<sub>t</sub> sobre las X y los p rezagos de û. Si los rezagos son conjuntamente significativos, hay evidencia de autocorrelación. La versión LM resume esa idea con un estadístico chi-cuadrado.'
        },
        {
          type: 'formula',
          main: 'LM = (n − p)R̂<sub>u</sub><sup>2</sup> ~ χ<sub>p</sub><sup>2</sup>',
          legend: [
            { key: 'n − p', text: 'Se pierden p observaciones por los rezagos. Usar n en lugar de n − p infla el estadístico.' },
            { key: 'R̂<sub>u</sub><sup>2</sup>', text: 'R² de la regresión auxiliar de los residuos sobre X y sus p rezagos.' },
            { key: 'p', text: 'Orden de autocorrelación que se quiere contrastar. Con p = 1, el contraste es de primer orden.' }
          ]
        },
        {
          type: 'p',
          id: 'c08-s05-p02',
          html: 'BG tiene dos ventajas sobre DW: admite Y rezagada entre los regresores y permite contrastar órdenes mayores. También puede hacerse robusto a heterocedasticidad. La lógica es la misma que la prueba t de ρ, pero con p rezagos y un contraste conjunto. En R, bgtest(modelo, order = 1) devuelve el LM, los grados de libertad y el valor p. No rechazar no prueba que no haya autocorrelación: solo dice que los datos no aportan evidencia suficiente contra esa hipótesis.'
        },
        {
          type: 'p',
          id: 'c08-s05-p03',
          html: 'Si el objetivo es mantener el modelo estático y hacer inferencia, una alternativa es dejar los coeficientes MCO y corregir solo los errores estándar con <span class="concept" data-concept="hac" tabindex="0" role="button">errores HAC</span>, también llamados Newey-West. Son robustos a heterocedasticidad y autocorrelación de forma desconocida. MCO sigue siendo insesgado o consistente según el tipo de exogeneidad, pero no es eficiente: los errores corregidos son válidos, no los de menor varianza.'
        },
        {
          type: 'formula',
          main: 'Ω̂<sub>NW</sub> = Σ<sub>t</sub>û<sub>t</sub><sup>2</sup>x<sub>t</sub>x<sub>t</sub>′ + Σ<sub>l=1</sub><sup>L</sup>w<sub>l</sub>Σ<sub>t</sub>[(x<sub>t</sub>û<sub>t</sub>)(x<sub>t−l</sub>û<sub>t−l</sub>)′ + (x<sub>t−l</sub>û<sub>t−l</sub>)(x<sub>t</sub>û<sub>t</sub>)′]',
          legend: [
            { key: 'L', text: 'Rezago máximo (truncamiento). En el laboratorio se usa L = 4. La elección afecta el error estándar.' },
            { key: 'w<sub>l</sub>', text: 'Peso de Bartlett: w<sub>l</sub> = 1 − l/(L + 1). Da más peso a los rezagos cercanos.' },
            { key: 'Sándwich', text: 'La varianza del estimador se obtiene como (X′X)<sup>−1</sup>Ω̂<sub>NW</sub>(X′X)<sup>−1</sup>.' },
            { key: 'Requisitos', text: 'Muestras grandes y ρ no demasiado cercano a 1. Con series cortas o persistencia alta, HAC puede ser impreciso.' }
          ]
        },
        {
          type: 'compare',
          left: {
            tag: 'HAC',
            title: 'Corregir la inferencia',
            text: 'Se mantienen los coeficientes MCO y se reemplaza la matriz de varianzas. Los t y los intervalos cambian; la eficiencia no mejora.',
            eq: 'β̂ = β̂<sub>MCO</sub>, &nbsp; ee = ee<sub>NW</sub>'
          },
          right: {
            tag: 'MCG',
            title: 'Corregir el modelo',
            text: 'Se transforman las variables y se reestima. Los coeficientes cambian y, si el modelo AR(1) es correcto, se gana eficiencia.',
            eq: 'β̂ = β̂<sub>MCG</sub>, &nbsp; ee = ee<sub>MCG</sub>'
          }
        },
        {
          type: 'errorTable',
          rows: [
            { error: 'Los errores HAC vuelven eficiente a MCO.', why: 'Corrigen la varianza, no la falta de eficiencia. MCO sigue sin ser ELIO.', fix: 'Decí “inferencia válida”, no “estimador eficiente”.' },
            { error: 'HAC siempre es preferible a MCG.', why: 'HAC no usa la estructura AR(1); MCG es más eficiente si esa estructura es correcta.', fix: 'Elegí según el modelo, el tamaño muestral y la persistencia.' },
            { error: 'BG exige que no haya Y rezagada.', why: 'Al contrario: BG fue diseñado para admitir regresores rezagados.', fix: 'Usá BG cuando el modelo tenga dinámica; DW no sirve en ese caso.' },
            { error: 'DW detecta autocorrelación de cualquier orden.', why: 'DW está pensado para AR(1). Para AR(p) usá BG o un contraste conjunto.', fix: 'Mirá el orden de la autocorrelación antes de elegir la prueba.' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c08-check-05',
          question: 'Si aplicás Newey-West, ¿los coeficientes estimados cambian?',
          intro: 'Distinguí estimación de inferencia.',
          answer: 'No. Newey-West solo reemplaza la matriz de varianzas y covarianzas: los β̂ siguen siendo los de MCO. Cambian los errores estándar, los t, los valores p y los intervalos. La eficiencia del estimador no mejora; lo que mejora es la validez de la inferencia. En el laboratorio, el coeficiente de desem sigue en −0,01544 y su error estándar pasa de 0,00551 a 0,00552: casi no se mueve. El de ley_vel sí cambia más, de 0,02044 a 0,02445.'
        }
      ]
    },
    {
      id: 'c08-s06',
      number: '06',
      title: 'MCG, Cochrane-Orcutt y Prais-Winsten',
      blocks: [
        {
          type: 'p',
          id: 'c08-s06-p01',
          html: 'Si el problema es la autocorrelación del error y no solo su medición, se puede transformar el modelo para que los errores transformados no estén correlacionados. La idea es restar una fracción del valor pasado: si u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub>, restar ρ veces la ecuación de t−1 elimina la parte persistente. Es el mismo espíritu de las cuasi-diferencias que usás para eliminar una tendencia, pero con un coeficiente estimado.'
        },
        {
          type: 'formula',
          main: 'Y<sub>t</sub> − ρY<sub>t−1</sub> = (1 − ρ)β<sub>0</sub> + β<sub>1</sub>(X<sub>t</sub> − ρX<sub>t−1</sub>) + e<sub>t</sub>',
          legend: [
            { key: 'Ỹ<sub>t</sub>', text: 'Variable cuasi-diferenciada: Y<sub>t</sub> − ρY<sub>t−1</sub>.' },
            { key: 'X̃<sub>t</sub>', text: 'Regresor cuasi-diferenciado: X<sub>t</sub> − ρX<sub>t−1</sub>.' },
            { key: 'Intercepto', text: 'Ya no es β<sub>0</sub>, sino (1 − ρ)β<sub>0</sub>. Si se interpreta mal, se pierde la escala del modelo.' }
          ]
        },
        {
          type: 'p',
          id: 'c08-s06-p02',
          html: 'Si ρ es conocido, estimar por MCO la ecuación transformada es <span class="concept" data-concept="mcg" tabindex="0" role="button">MCG</span>: un caso de mínimos cuadrados generalizados. Los estimadores son insesgados, consistentes y asintóticamente más eficientes que MCO, y los t y F de la ecuación transformada son válidos asintóticamente (exactos si los errores son normales). Si ρ no se conoce, se estima con los residuos MCO y se aplica el mismo procedimiento: eso es MCGF, mínimos cuadrados generalizados factibles. MCGF es consistente, pero no insesgado en muestras finitas, porque ρ̂ tiene error de estimación. La transformación deja afuera la primera observación, porque Y<sub>t−1</sub> no existe para t = 1. Esa observación tiene var(u<sub>1</sub>) = σ<sub>e</sub><sup>2</sup>/(1 − ρ<sup>2</sup>), mayor que la de los errores transformados. Para usarla sin romper la homocedasticidad, se multiplica toda la ecuación de t = 1 por √(1 − ρ<sup>2</sup>). Así se obtiene un error con varianza σ<sub>e</sub><sup>2</sup> y se pueden usar las n observaciones. Ese es el aporte de <span class="concept" data-concept="prais-winsten" tabindex="0" role="button">Prais-Winsten</span>.'
        },
        {
          type: 'formula',
          main: 'β̂<sub>MCG</sub> = (X′Ω<sup>−1</sup>X)<sup>−1</sup>X′Ω<sup>−1</sup>Y &nbsp;·&nbsp; var(β̂<sub>MCG</sub>) = σ<sub>e</sub><sup>2</sup>(X′Ω<sup>−1</sup>X)<sup>−1</sup>',
          legend: [
            { key: 'Ω', text: 'Matriz de covarianzas AR(1): 1 en la diagonal y ρ<sup>|t−s|</sup> fuera de ella.' },
            { key: 'Ventaja', text: 'Aprovecha la estructura del error. Con ρ conocido, es el estimador de menor varianza entre los lineales insesgados.' },
            { key: 'Costo', text: 'Exige que el modelo AR(1) sea correcto y que las X sean estrictamente exógenas.' }
          ]
        },
        {
          type: 'formula',
          main: '√(1 − ρ<sup>2</sup>)Y<sub>1</sub> = √(1 − ρ<sup>2</sup>)β<sub>0</sub> + β<sub>1</sub>√(1 − ρ<sup>2</sup>)X<sub>1</sub> + √(1 − ρ<sup>2</sup>)u<sub>1</sub>',
          legend: [
            { key: 'Por qué', text: 'Var(√(1 − ρ²)u<sub>1</sub>) = (1 − ρ²)·σ<sub>e</sub>²/(1 − ρ²) = σ<sub>e</sub>².' },
            { key: 'Resultado', text: 'Todas las observaciones tienen la misma varianza y se puede estimar por MCO sobre los datos transformados.' },
            { key: 'Diferencia', text: 'Cochrane-Orcutt omite la primera observación; Prais-Winsten la incluye transformada.' }
          ]
        },
        {
          type: 'compare',
          left: {
            tag: 'Cochrane-Orcutt',
            title: 'Omite el primer dato',
            text: 'Itera ρ̂ con los residuos y estima con las n − 1 observaciones cuasi-diferenciadas. Simple, pero pierde información en muestras chicas.',
            eq: 't = 2, …, n'
          },
          right: {
            tag: 'Prais-Winsten',
            title: 'Usa el primer dato',
            text: 'Itera ρ̂ y transforma también la primera observación. Usa las n observaciones y suele ser preferible con series cortas.',
            eq: 't = 1, …, n'
          }
        },
        {
          type: 'p',
          id: 'c08-s06-p04',
          html: 'MCGF no es gratis. Para que sea consistente no alcanza con que X<sub>t</sub> no esté correlacionada con u<sub>t</sub>: también hace falta que u<sub>t</sub> no esté correlacionado con X<sub>t−1</sub> ni con X<sub>t+1</sub>. La condición es cov(X<sub>t−1</sub> + X<sub>t+1</sub>, u<sub>t</sub>) = 0. Si las estimaciones MCO y MCGF difieren mucho, sospechá que esa condición falla y quedate con MCO, que sigue siendo consistente bajo el supuesto más débil. Si son parecidas, MCGF gana en eficiencia y sus t y F son asintóticamente válidos.'
        },
        {
          type: 'miniCheck',
          id: 'c08-check-06',
          question: '¿MCGF es insesgado en muestras finitas?',
          intro: 'Pensá qué se estima además de los β.',
          answer: 'No. MCGF reemplaza ρ por ρ̂ y ese error de estimación se traslada al término de error de la ecuación transformada. El estimador es consistente cuando los datos son débilmente dependientes y las X son estrictamente exógenas, y es asintóticamente más eficiente que MCO si el AR(1) es correcto. Pero no es insesgado: la insesgadez exacta vale para MCG con ρ conocido, no para MCGF con ρ estimado.'
        }
      ]
    },
    {
      id: 'c08-s07',
      number: '07',
      title: 'Heterocedasticidad en series y mapa de decisión',
      blocks: [
        {
          type: 'p',
          id: 'c08-s07-p01',
          html: 'En series de tiempo, la autocorrelación y la heterocedasticidad pueden convivir. El problema es que los contrastes de heterocedasticidad suponen errores independientes: si hay autocorrelación, sus valores p no son confiables. Por eso el orden importa. Primero se contrasta la autocorrelación, con una prueba robusta a heterocedasticidad si se sospecha que existe; después se contrasta la heterocedasticidad. En series, la autocorrelación se considera el problema más grave, porque afecta más a los errores estándar y a la eficiencia.'
        },
        {
          type: 'cards',
          items: [
            { sym: 'Sin autocorrelación', title: 'Tratamiento habitual', text: 'Si no hay evidencia de autocorrelación, se aplica el mismo tratamiento que en corte transversal: contrastes y errores robustos de heterocedasticidad.' },
            { sym: 'Con autocorrelación', title: 'HAC', text: 'Con muestras grandes, errores robustos a heterocedasticidad y autocorrelación. Los coeficientes no cambian; la inferencia se corrige.' },
            { sym: 'Ambas', title: 'Modelo combinado', text: 'Se puede modelar la heterocedasticidad y corregir el error AR(1) con un procedimiento de MCP más cuasi-diferencias. Los MCGF resultantes son asintóticamente eficientes.' }
          ]
        },
        {
          type: 'map',
          steps: [
            { n: '1', title: 'Mirá la serie', text: 'Gráfico de Y contra tiempo y de residuos contra tiempo. Buscá tendencia, estacionalidad, quiebres y rachas.' },
            { n: '2', title: 'Diagnosticá el error', text: 'Residuos contra su rezago y prueba t de ρ. Si el modelo tiene Y rezagada, pasá directamente a BG.' },
            { n: '3', title: 'Elegí el contraste', text: 'DW solo si no hay Y rezagada, hay intercepto y se cumplen los supuestos del MLC. BG para órdenes mayores o modelos dinámicos.' },
            { n: '4', title: 'Decidí el objetivo', text: 'Si querés un modelo estático con inferencia válida, HAC o MCGF. Si querés dinámica completa, reformulá la especificación con rezagos.' },
            { n: '5', title: 'Compará MCO y MCGF', text: 'Si los coeficientes son parecidos, MCGF aporta eficiencia. Si son muy distintos, revisá la exogeneidad y preferí MCO.' },
            { n: '6', title: 'Reportá', text: 'Modelo, ρ̂, prueba usada, método de errores estándar, n y límites. La corrección cambia la inferencia; no convierte asociación en causalidad.' }
          ]
        },
        {
          type: 'errorTable',
          rows: [
            { error: 'Primero contrasto heterocedasticidad y después autocorrelación.', why: 'Los contrastes de heterocedasticidad suponen independencia; con autocorrelación, sus valores p no son válidos.', fix: 'Contrastá primero autocorrelación, con versión robusta si hace falta.' },
            { error: 'Con autocorrelación uso MCG aunque las X no sean estrictamente exógenas.', why: 'MCGF puede ser inconsistente si u<sub>t</sub> está correlacionado con X<sub>t−1</sub> o X<sub>t+1</sub>.', fix: 'Verificá la condición de exogeneidad; si dudás, MCO con HAC.' },
            { error: 'DW sirve aunque el modelo tenga Y rezagada.', why: 'La Y rezagada está correlacionada con el error pasado y el estadístico se sesga hacia 2.', fix: 'Usá Breusch-Godfrey.' },
            { error: 'Newey-West y MCGF son lo mismo.', why: 'HAC corrige solo los errores estándar; MCGF reestima el modelo con la estructura AR(1).', fix: 'Elegí según quieras corregir inferencia o ganar eficiencia.' }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Qué reportar cuando encontrás autocorrelación',
          html: 'No alcanza con decir “hay autocorrelación”. Reportá el estadístico y el valor p de la prueba, el ρ̂ estimado, el método de corrección y cómo cambian los coeficientes y los errores estándar. Si comparás MCO con MCGF, aclará que los R² no son comparables si la variable dependiente fue transformada. Y separá la lectura econométrica de la económica: la primera discute estimadores, errores e inferencia; la segunda, magnitudes, contexto y límites.'
        },
        {
          type: 'sourceStrip',
          chips: [
            { label: 'Clase 8', text: 'diap. 2–30' },
            { label: 'Wooldridge 4ed', text: 'Cap. 12, §12.1–12.5' },
            { label: 'TP 11', text: 'act. 1–2; ej. 1–2, 4, 7' },
            { label: '2P 2024', text: 'pregunta 4' }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c08-check-07',
          question: 'Si sospechás autocorrelación y heterocedasticidad a la vez, ¿qué contrastás primero?',
          intro: 'Pensá qué supuesto usan los contrastes de heterocedasticidad.',
          answer: 'Primero la autocorrelación. Los contrastes de heterocedasticidad, como Breusch-Pagan, suponen errores independientes; si hay autocorrelación, sus valores p no son confiables. Se puede usar una versión robusta a heterocedasticidad del contraste de autocorrelación. Si se detecta autocorrelación, el camino es HAC en muestras grandes o un procedimiento combinado de MCP y corrección AR(1). Después, si queda interés, se contrasta la heterocedasticidad con errores ya corregidos.'
        },
        {
          type: 'p',
          id: 'c08-s07-p02',
          html: 'La decisión de fondo no es estadística, es económica. Si el objetivo es estimar una relación contemporánea y hacer inferencia, un modelo estático con errores HAC o con MCGF puede ser suficiente. Si la dinámica importa —porque Y depende de su propio pasado o porque los efectos de X se distribuyen en el tiempo—, corregir el error no alcanza: hay que volver a especificar el modelo con rezagos. La autocorrelación puede ser un síntoma de dinámica omitida, no solo un problema de la matriz de covarianzas.'
        }
      ]
    }
  ],
  concepts: {
    autocorrelacion: {
      title: 'Autocorrelación',
      sub: 'Errores de períodos distintos que se mueven juntos.',
      esencia: `
        <div class="definition">Hay autocorrelación, o correlación serial, cuando los errores de un modelo de series de tiempo están correlacionados entre períodos: Cov(u<sub>t</sub>, u<sub>s</sub>) ≠ 0 para algún t ≠ s. El orden de las observaciones importa y no se pueden reordenar.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Es un patrón temporal, no un problema de tamaño de los residuos ni de dispersión cambiante.</li>
          <li>Puede ser positiva (rachas), negativa (zigzag) o de orden mayor (AR(2), estacional).</li>
          <li>En datos de corte transversal no tiene sentido: no hay un orden natural entre observaciones.</li>
        </ul>
        <div class="formula small">Cov(u<sub>t</sub>, u<sub>t−j</sub>) = γ<sub>j</sub> ≠ 0<span>Para al menos algún j ≠ 0</span></div>
        <div class="badge-row"><span class="badge always">Siempre: orden temporal y persistencia</span><span class="badge optional">Según el caso: positivo, negativo o de orden p</span></div>
      `,
      ejemplo: `
        <p>En una regresión mensual de accidentes, los residuos pueden quedar por encima de la recta durante varios meses de verano y por debajo durante varios meses de invierno. Eso no es un shock aislado: es un patrón que se repite. La autocorrelación describe esa persistencia y obliga a revisar los errores estándar.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Graficá los residuos contra el tiempo antes de cualquier prueba formal. Si ves rachas o ciclos, ya tenés una señal. La prueba formal te dice si la señal es lo bastante fuerte como para rechazar la ausencia de autocorrelación.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Confundirla con heterocedasticidad.</strong> La heterocedasticidad cambia la dispersión; la autocorrelación cambia la relación entre períodos.</li>
          <li><strong>Creer que siempre sesga los coeficientes.</strong> Con X estrictamente exógenas, MCO sigue siendo insesgado; lo inválido es la inferencia.</li>
          <li><strong>Mirar solo el tamaño de los residuos.</strong> Un residuo grande no prueba persistencia; hace falta ver la relación entre residuos consecutivos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué dos modelos con los mismos coeficientes pueden tener errores estándar distintos según cómo se ordenen los datos.</p></div>
      `,
      conexiones: `<p>La autocorrelación se modela habitualmente como AR(1) y se detecta con DW, BG o la prueba t de ρ. Sus consecuencias sobre MCO son el puente hacia HAC y MCG.</p>
        <div><button class="concept-chip" data-concept="ar1">AR(1) →</button><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button><button class="concept-chip" data-concept="durbin-watson">Durbin-Watson →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 3–6.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024, pregunta 4a: estructura de Ω con autocorrelación y sin heterocedasticidad.</p></div>
      `
    },
    ar1: {
      title: 'Modelo AR(1)',
      sub: 'El error de hoy depende del error de ayer.',
      esencia: `
        <div class="definition">u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub>, con |ρ| &lt; 1 y e<sub>t</sub> iid(0, σ<sub>e</sub><sup>2</sup>). Es el modelo de autocorrelación más usado: un solo parámetro resume la persistencia.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>ρ mide cuánto del error pasado queda en el error actual. Su signo decide si hay rachas o zigzag.</li>
          <li>|ρ| &lt; 1 garantiza estacionariedad y varianza finita. Si ρ = 1, hay raíz unitaria y el marco cambia.</li>
          <li>La correlación entre u<sub>t</sub> y u<sub>t−j</sub> decae geométricamente: ρ<sup>j</sup>.</li>
        </ul>
        <div class="formula small">Var(u<sub>t</sub>) = σ<sub>e</sub><sup>2</sup>/(1 − ρ<sup>2</sup>)<span>Corr(u<sub>t</sub>, u<sub>t−j</sub>) = ρ<sup>j</sup></span></div>
        <div class="badge-row"><span class="badge always">Siempre: persistencia y estacionariedad</span><span class="badge optional">Según el caso: ρ positivo, negativo o cercano a 1</span></div>
      `,
      ejemplo: `
        <p>Con ρ = 0,6, la correlación entre errores de dos períodos consecutivos es 0,6; a dos períodos, 0,36; a tres, 0,216. El shock inicial se disipa, pero deja huella. Con ρ = 0,9, la correlación a diez períodos todavía es 0,35: la serie tiene memoria larga.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>No confundas e<sub>t</sub> con u<sub>t</sub>. e<sub>t</sub> es el shock nuevo, no correlacionado con el pasado; u<sub>t</sub> es el error total, que arrastra la historia. La transformación MCG apunta a quedarse con e<sub>t</sub>.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que ρ = 1 es “autocorrelación perfecta”.</strong> Es una raíz unitaria: la serie no es estacionaria y las propiedades estándar de MCO no se aplican.</li>
          <li><strong>Confundir el error con su innovación.</strong> u<sub>t</sub> contiene la persistencia; e<sub>t</sub> es el componente nuevo.</li>
          <li><strong>Suponer que ρ tiene que ser positivo.</strong> Puede ser negativo y producir alternancia; el modelo sigue siendo AR(1).</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés calcular la correlación a dos períodos a partir de ρ ni explicar qué pasa cuando ρ se acerca a 1.</p></div>
      `,
      conexiones: `<p>El AR(1) es la estructura que justifica la prueba t de ρ, el estadístico DW y la transformación de MCG. También explica por qué la primera observación merece un tratamiento especial en Prais-Winsten.</p>
        <div><button class="concept-chip" data-concept="autocorrelacion">Autocorrelación →</button><button class="concept-chip" data-concept="mcg">MCG →</button><button class="concept-chip" data-concept="prais-winsten">Prais-Winsten →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 5–7 y 17–18.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.1 y §12.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 11, Ejercicio 1, incisos g–i.</p></div>
      `
    },
    consecuencias: {
      title: 'Consecuencias sobre MCO',
      sub: 'Insesgado no es lo mismo que eficiente ni que inferencia válida.',
      esencia: `
        <div class="definition">Con errores autocorrelacionados, MCO es insesgado si las X son estrictamente exógenas y consistente si son contemporáneamente exógenas. Pero deja de ser ELIO, la varianza habitual está mal calculada y los t y F dejan de ser válidos.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El coeficiente puede estar bien centrado y el error estándar estar mal: son dos propiedades distintas.</li>
          <li>Con autocorrelación positiva, la fórmula habitual subestima la varianza y los t se inflan.</li>
          <li>El R² sigue siendo descriptivo, pero no es una prueba de significancia ni corrige el problema.</li>
        </ul>
        <div class="formula small">var(β̂<sub>MCO</sub>) = σ<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup><span>Si Ω ≠ I, la fórmula habitual falla</span></div>
        <div class="badge-row"><span class="badge always">Siempre: varianza e inferencia</span><span class="badge optional">Según el caso: dirección del sesgo de los e.e.</span></div>
      `,
      ejemplo: `
        <p>En el laboratorio, MCO estima el coeficiente de desem en −0,01544 con un error estándar de 0,00551 y un t de −2,80. Prais-Winsten, que tiene en cuenta la autocorrelación, estima −0,01322 con un error estándar de 0,00706 y un t de −1,87. El coeficiente cambió poco; la evidencia estadística, bastante.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si encontrás autocorrelación, no reportes el t de MCO como si nada. Elegí HAC o MCGF, y aclará cuál usaste. La conclusión puede cambiar sin que el coeficiente se mueva.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“La autocorrelación sesga los coeficientes.”</strong> Con exogeneidad estricta, no. Sesga la varianza estimada y, con ella, los t.</li>
          <li><strong>“Como el coeficiente es significativo, el problema no importa.”</strong> La significancia puede ser un artefacto de errores estándar subestimados.</li>
          <li><strong>“El R² alto prueba que el modelo está bien.”</strong> El R² no dice nada sobre la estructura del error ni sobre la validez de la inferencia.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés separar “el coeficiente está cerca del verdadero” de “el t está bien calculado”.</p></div>
      `,
      conexiones: `<p>Las consecuencias explican por qué existen HAC y MCG. También conectan con la comparación entre MCO y MCGF: si los coeficientes difieren mucho, el problema ya no es solo la varianza.</p>
        <div><button class="concept-chip" data-concept="autocorrelacion">Autocorrelación →</button><button class="concept-chip" data-concept="hac">HAC →</button><button class="concept-chip" data-concept="mcg">MCG →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 3–5.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 11, Actividad 2a.</p></div>
      `
    },
    'durbin-watson': {
      title: 'Durbin-Watson',
      sub: 'Un número entre 0 y 4 para detectar AR(1).',
      esencia: `
        <div class="definition">El estadístico d compara las diferencias entre residuos consecutivos con la suma de los residuos al cuadrado: d = Σ(û<sub>t</sub> − û<sub>t−1</sub>)²/Σû<sub>t</sub>². Se relaciona con ρ mediante d ≈ 2(1 − ρ̂).</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>d ≈ 2: no hay evidencia de autocorrelación de primer orden. d &lt; 2: positiva. d &gt; 2: negativa.</li>
          <li>La distribución exacta depende de X y se tabula con d<sub>L</sub> y d<sub>U</sub>; la zona intermedia es inconcluyente.</li>
          <li>Exige supuestos del MLC, exogeneidad estricta, intercepto y ausencia de Y rezagada.</li>
        </ul>
        <div class="formula small">d ≈ 2(1 − ρ̂) &nbsp;·&nbsp; ρ̂ ≈ 1 − d/2<span>Solo AR(1); no sirve con Y<sub>t−1</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: d, ρ y zonas</span><span class="badge optional">Según el caso: d<sub>L</sub>, d<sub>U</sub> y contraste negativo</span></div>
      `,
      ejemplo: `
        <p>En TRAFICO, d = 1,4298. La relación aproximada implica ρ̂ ≈ 1 − 1,4298/2 = 0,285. El contraste de DW da p = 0,00083, así que se rechaza la ausencia de autocorrelación positiva. El ρ estimado por Prais-Winsten es 0,2886: la aproximación funciona bien.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si d cae en la zona inconcluyente, no escribas “no hay autocorrelación”. Escribí “DW no decide” y complementá con BG o con la prueba t de ρ. La ausencia de evidencia no es evidencia de ausencia.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que d = 1,43 implica ρ = −0,43.</strong> La relación es ρ̂ ≈ 1 − d/2; el signo y la escala se leen así, no restando d de 2 sin dividir.</li>
          <li><strong>Usar DW con Y rezagada.</strong> El estadístico se sesga hacia 2 y la prueba pierde validez. En ese caso va BG.</li>
          <li><strong>Creer que DW detecta cualquier autocorrelación.</strong> Está diseñado para AR(1); un AR(2) o un patrón estacional pueden pasar desapercibidos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar qué significa que d esté entre d<sub>L</sub> y d<sub>U</sub>, ni por qué la prueba no sirve con Y<sub>t−1</sub>.</p></div>
      `,
      conexiones: `<p>DW es la versión de un solo parámetro de la prueba t de ρ. BG lo generaliza a más rezagos y a modelos con Y rezagada. Los tres comparten la misma hipótesis nula de ausencia de autocorrelación.</p>
        <div><button class="concept-chip" data-concept="ar1">AR(1) →</button><button class="concept-chip" data-concept="breusch-godfrey">Breusch-Godfrey →</button><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 10–13.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 11, Actividad 1a y Ejercicio 1g.</p></div>
      `
    },
    'breusch-godfrey': {
      title: 'Breusch-Godfrey',
      sub: 'Autocorrelación de orden p, con o sin Y rezagada.',
      esencia: `
        <div class="definition">Contrasta H<sub>0</sub>: no hay autocorrelación de orden hasta p. Se estima el modelo por MCO, se corren los residuos sobre las X y sus p rezagos, y se contrasta la significancia conjunta de los rezagos con un F o con el LM = (n − p)R².</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Admite Y rezagada entre los regresores, a diferencia de DW.</li>
          <li>Permite contrastar AR(2), AR(4) o el orden que tenga sentido económico.</li>
          <li>La versión LM se distribuye χ<sup>2</sup><sub>p</sub> en muestras grandes; también hay versiones robustas.</li>
        </ul>
        <div class="formula small">LM = (n − p)R̂<sub>u</sub><sup>2</sup> ~ χ<sub>p</sub><sup>2</sup><span>Regresión auxiliar con X y p rezagos de û</span></div>
        <div class="badge-row"><span class="badge always">Siempre: orden p y regresión auxiliar</span><span class="badge optional">Según el caso: F o LM, versión robusta</span></div>
      `,
      ejemplo: `
        <p>En el laboratorio, bgtest(modelo, order = 1) da LM = 8,4742 con 1 grado de libertad y p = 0,0036. Se rechaza la ausencia de autocorrelación de primer orden al 5%. El resultado coincide con DW (p = 0,00083) y con el ρ̂ de Prais-Winsten (0,2886): tres pruebas, la misma conclusión.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si el modelo tiene Y<sub>t−1</sub>, reportá BG y no DW. Si sospechás estacionalidad, probá order = 12 en datos mensuales y mirá si el rechazo se concentra en ese orden.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar n en lugar de n − p.</strong> La regresión auxiliar pierde p observaciones; el estadístico se infla si no se corrige.</li>
          <li><strong>Olvidar las X en la regresión auxiliar.</strong> Con Y rezagada o regresores contemporáneamente exógenos, hay que incluirlas para que el contraste sea válido.</li>
          <li><strong>Interpretar el no rechazo como prueba de ausencia.</strong> BG no rechaza; eso no significa que la autocorrelación sea cero.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué BG sirve con Y rezagada y DW no, ni de dónde salen los grados de libertad p.</p></div>
      `,
      conexiones: `<p>BG generaliza la prueba t de ρ y reemplaza a DW cuando hay dinámica o se quiere contrastar un orden mayor. Su lógica de regresión auxiliar es la misma que la del contraste de heterocedasticidad, pero aplicada a los rezagos del residuo.</p>
        <div><button class="concept-chip" data-concept="durbin-watson">Durbin-Watson →</button><button class="concept-chip" data-concept="autocorrelacion">Autocorrelación →</button><button class="concept-chip" data-concept="hac">HAC →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 14.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 11, Ejercicio 7c.</p></div>
      `
    },
    hac: {
      title: 'Errores HAC / Newey-West',
      sub: 'Inferencia válida sin cambiar los coeficientes.',
      esencia: `
        <div class="definition">Los errores HAC son errores estándar robustos a heterocedasticidad y autocorrelación de forma desconocida. Se calculan con la matriz de Newey-West y dejan los coeficientes MCO intactos: corrigen la varianza, no la estimación.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>MCO sigue siendo insesgado o consistente, pero no eficiente. HAC no recupera la eficiencia.</li>
          <li>Cambian los errores estándar, los t, los valores p y los intervalos; los β̂ no.</li>
          <li>Requieren muestras grandes y que ρ no sea demasiado cercano a 1. El rezago máximo L es una decisión que se reporta.</li>
        </ul>
        <div class="formula small">Ω̂<sub>NW</sub> = Σû<sub>t</sub><sup>2</sup>x<sub>t</sub>x<sub>t</sub>′ + Σ<sub>l=1</sub><sup>L</sup>w<sub>l</sub>Σ[(x<sub>t</sub>û<sub>t</sub>)(x<sub>t−l</sub>û<sub>t−l</sub>)′ + …]<span>w<sub>l</sub> = 1 − l/(L + 1)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: e.e. robustos, coeficientes iguales</span><span class="badge optional">Según el caso: elección de L y tamaño muestral</span></div>
      `,
      ejemplo: `
        <p>En TRAFICO, Newey-West con L = 4 deja el coeficiente de desem en −0,01544 y cambia su error estándar de 0,00551 a 0,00552: casi nada. Para ley_vel, el error estándar pasa de 0,02044 a 0,02445 y el p de 0,0014 a 0,0072. La corrección puede ser grande o chica según la variable y la persistencia.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá el rezago usado: “errores Newey-West con L = 4”. Sin esa información, el lector no puede reproducir la inferencia. Y no compares el R² de MCO con el de MCGF como si fueran el mismo modelo.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“HAC vuelve eficiente a MCO.”</strong> Corrige la varianza; MCO sigue sin ser ELIO.</li>
          <li><strong>“HAC cambia los coeficientes.”</strong> No. Solo cambia la matriz de varianzas y covarianzas.</li>
          <li><strong>Elegir L sin justificarlo.</strong> Un L muy chico deja autocorrelación sin corregir; uno muy grande agrega ruido. Reportá el criterio.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué columnas de summary cambian y cuáles no cuando pasás de MCO a Newey-West.</p></div>
      `,
      conexiones: `<p>HAC es la salida rápida cuando el objetivo es inferencia y no eficiencia. MCG es la alternativa cuando el AR(1) es plausible y se quiere reestimar. La comparación entre ambas es una decisión de modelo, no solo de software.</p>
        <div><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button><button class="concept-chip" data-concept="mcg">MCG →</button><button class="concept-chip" data-concept="breusch-godfrey">Breusch-Godfrey →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 16 y 28–30.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.5.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024, pregunta 1a: errores robustos permiten inferencia, pero no eficiencia.</p></div>
      `
    },
    mcg: {
      title: 'MCG y MCGF',
      sub: 'Transformar el modelo para eliminar la autocorrelación.',
      esencia: `
        <div class="definition">MCG estima por MCO la ecuación cuasi-diferenciada Y<sub>t</sub> − ρY<sub>t−1</sub> = (1 − ρ)β<sub>0</sub> + β<sub>1</sub>(X<sub>t</sub> − ρX<sub>t−1</sub>) + e<sub>t</sub>. Si ρ es conocido, es GLS; si se estima, es MCGF.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La transformación elimina la autocorrelación AR(1) y deja errores con las propiedades de Gauss-Markov.</li>
          <li>El intercepto de la ecuación transformada es (1 − ρ)β<sub>0</sub>, no β<sub>0</sub>.</li>
          <li>Con ρ conocido, MCG es insesgado y eficiente. Con ρ estimado, MCGF es consistente pero no insesgado.</li>
          <li>Si la transformación omite la primera observación, el estimador no es del todo ELIO; Prais-Winsten la incorpora y recupera esa propiedad.</li>
        </ul>
        <div class="formula small">β̂<sub>MCG</sub> = (X′Ω<sup>−1</sup>X)<sup>−1</sup>X′Ω<sup>−1</sup>Y<span>Ω<sub>ts</sub> = ρ<sup>|t−s|</sup></span></div>
        <div class="badge-row"><span class="badge always">Siempre: cuasi-diferencias e intercepto</span><span class="badge optional">Según el caso: ρ conocido o estimado</span></div>
      `,
      ejemplo: `
        <p>Con ρ = 0,5, Y<sub>t</sub> = 10 e Y<sub>t−1</sub> = 8, la variable transformada es 10 − 0,5·8 = 6. El intercepto de la regresión transformada estima (1 − 0,5)β<sub>0</sub> = 0,5β<sub>0</sub>. Si se interpreta como β<sub>0</sub>, se subestima el nivel a la mitad.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>MCG no es “MCO con menos datos”: es una reestimación con variables transformadas. Los coeficientes pueden cambiar, y si el AR(1) es correcto, los errores estándar suelen ser más chicos que los de MCO mal calculados.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Interpretar el intercepto transformado como β<sub>0</sub>.</strong> Es (1 − ρ)β<sub>0</sub>; hay que dividir por (1 − ρ) para recuperar el original.</li>
          <li><strong>Decir que MCGF es insesgado.</strong> Es consistente; el error de estimar ρ introduce sesgo en muestras finitas.</li>
          <li><strong>Aplicar MCG con X no estrictamente exógenas.</strong> La consistencia exige que u<sub>t</sub> no esté correlacionado con X<sub>t−1</sub>, X<sub>t</sub> ni X<sub>t+1</sub>.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés escribir la ecuación transformada ni explicar por qué el intercepto cambia.</p></div>
      `,
      conexiones: `<p>MCG es la contraparte eficiente de HAC. Prais-Winsten y Cochrane-Orcutt son dos formas de implementar MCGF según cómo tratan la primera observación.</p>
        <div><button class="concept-chip" data-concept="ar1">AR(1) →</button><button class="concept-chip" data-concept="prais-winsten">Prais-Winsten →</button><button class="concept-chip" data-concept="hac">HAC →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 17–23.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.3.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024, pregunta 4b: transformación con u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub>.</p></div>
      `
    },
    'prais-winsten': {
      title: 'Prais-Winsten',
      sub: 'MCGF que no desperdicia la primera observación.',
      esencia: `
        <div class="definition">Prais-Winsten estima por MCGF el modelo AR(1) transformando también la primera observación por √(1 − ρ<sup>2</sup>). Cochrane-Orcutt aplica la misma idea, pero omite esa primera observación.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La primera observación tiene varianza σ<sub>e</sub><sup>2</sup>/(1 − ρ<sup>2</sup>); la transformación la iguala a las demás.</li>
          <li>Ambos métodos iteran ρ̂ hasta que converge; las propiedades asintóticas son las mismas que las de una sola iteración.</li>
          <li>En muestras chicas, Prais-Winsten usa más información y suele preferirse.</li>
          <li>Los errores estándar suelen ser más grandes que los de MCO porque tienen en cuenta la autocorrelación.</li>
        </ul>
        <div class="formula small">√(1 − ρ<sup>2</sup>)Y<sub>1</sub> = √(1 − ρ<sup>2</sup>)β<sub>0</sub> + β<sub>1</sub>√(1 − ρ<sup>2</sup>)X<sub>1</sub> + √(1 − ρ<sup>2</sup>)u<sub>1</sub><span>Var del error transformado = σ<sub>e</sub><sup>2</sup></span></div>
        <div class="badge-row"><span class="badge always">Siempre: primera observación y ρ̂ iterado</span><span class="badge optional">Según el caso: comparación con Cochrane-Orcutt</span></div>
      `,
      ejemplo: `
        <p>En el laboratorio, Prais-Winsten itera hasta ρ̂ = 0,2886 en cinco pasos. El coeficiente de desem pasa de −0,01544 (MCO) a −0,01322 y su p de 0,0062 a 0,0644: deja de ser significativo al 5%. El DW del modelo transformado es 1,995, cerca de 2: la autocorrelación residual quedó corregida.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El R² de Prais-Winsten (0,6412) no se compara con el de MCO (0,7174): la variable dependiente está transformada. Compará coeficientes, errores estándar y diagnóstico residual, no el R².</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que Prais-Winsten y Cochrane-Orcutt son idénticos.</strong> Difieren en el tratamiento de la primera observación; en muestras chicas eso importa.</li>
          <li><strong>Usar ρ = 0,289 como si fuera el verdadero.</strong> Es una estimación; MCGF es consistente, no insesgado.</li>
          <li><strong>Comparar el R² de PW con el de MCO.</strong> La Y transformada no es la misma; el R² no es comparable.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué la primera observación se multiplica por √(1 − ρ²) ni qué se gana con eso.</p></div>
      `,
      conexiones: `<p>Prais-Winsten es la implementación práctica de MCGF cuando se quiere usar toda la muestra. Se compara con Cochrane-Orcutt y con HAC: las tres corrigen la autocorrelación, pero de maneras distintas.</p>
        <div><button class="concept-chip" data-concept="mcg">MCG →</button><button class="concept-chip" data-concept="ar1">AR(1) →</button><button class="concept-chip" data-concept="consecuencias">Consecuencias →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 8, diap. 20–25.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 12, §12.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 11, Ejercicio 1i y Ejercicio 4d.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de autocorrelación',
    intro: 'La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto del TP 11. Las actividades fijan las definiciones y las consecuencias; los ejercicios permiten recorrer el diagnóstico, la comparación MCO–MCGF y la corrección de errores estándar con datos reales. El laboratorio usa TRAFICO, la base del Ejercicio 1.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-11',
    exercises: [
      { label: 'TP 11 · Act. 1', title: 'Dos afirmaciones para decidir', text: '¿El estadístico d de Durbin-Watson exige los supuestos del MLC? ¿Si hay autocorrelación, los t y F son siempre no significativos? Justificá cada respuesta, no solo pongas V o F.', tags: ['Conceptual', 'V/F'], href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-10' },
      { label: 'TP 11 · Act. 2', title: 'Consecuencias, gráficos y exogeneidad', text: 'Consecuencias sobre los estimadores MCO; pruebas gráficas y su diferencia con heterocedasticidad; dependencia débil; condiciones para que una variable sea estrictamente exógena.', tags: ['Conceptual', 'Exogeneidad'], href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-6' },
      { label: 'TP 11 · Ej. 1', title: 'TRAFICO: de la tendencia a Prais-Winsten', text: 'Fechas de la ley de cinturón y del límite de 65 mph; log(totacc) con tendencia y dummies mensuales; prcfat con finde, desem, ley_vel y ley_cint; diagnóstico AR(1) y estimación con ρ = 0,282, Cochrane-Orcutt y Prais-Winsten.', tags: ['Aplicar', 'Serie mensual'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-10' },
      { label: 'TP 11 · Ej. 2', title: 'Microsoft: tendencia, estacionalidad y rezagos', text: 'Series cuatrimestrales de ingresos, publicidad e I+D; tendencia cuadrática y dummies estacionales; diagnóstico AR(1); incorporación del gasto en I+D rezagado cuatro períodos y discusión de qué pasa con los estimadores y los residuos.', tags: ['Series', 'Dinámica'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-10' },
      { label: 'TP 11 · Ej. 4', title: 'Consumo e ingreso: las tres correcciones', text: 'Consumo e ingreso reales de EE.UU. 1959–2007 con tendencia; pruebas gráficas y formales de AR(1); Cochrane-Orcutt, Prais-Winsten y errores Newey-West en el mismo modelo. Es el ejercicio para comparar qué cambia en cada corrección.', tags: ['Aplicar', 'Comparar métodos'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-adaptado-del-ejercicio-5.15-de-baltagi-2008' },
      { label: 'TP 11 · Ej. 7', title: 'Inversión, PBI y estacionalidad', text: 'Modelo del TP 10 con log(inv), log(pib), tendencia y dummies trimestrales; residuos contra tiempo y contra su rezago; DW; Breusch-Godfrey; cuasi-diferencias con ρ = 0,845; Cochrane-Orcutt, Prais-Winsten y Newey-West.', tags: ['Integrador', 'Todos los métodos'], href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-7-4' }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 11 · Ej. 1',
      title: 'TRAFICO: MCO, DW, Breusch-Godfrey, Prais-Winsten y Newey-West',
      intro: 'Una sola salida permite recorrer las cuatro decisiones de la clase: estimar por MCO, diagnosticar el error, reestimar con MCGF y corregir solo los errores estándar con HAC. La comparación muestra que las tres correcciones no producen los mismos números ni responden la misma pregunta.',
      dataNote: 'TRAFICO.rda contiene 108 observaciones mensuales de California, 1981–1989. prcfat es el porcentaje de accidentes fatales (rango 0,70–1,22); desem, la tasa de desempleo; ley_vel y ley_cint son binarias; tiempo es la tendencia; feb–dic son dummies mensuales con enero como base. El modelo es una variante del inciso f) del TP 11: no incluye finde. Es una serie observacional y los coeficientes son asociaciones condicionales. DW y Breusch-Godfrey rechazan la ausencia de autocorrelación; Prais-Winsten estima ρ ≈ 0,289 y reduce la significancia de desem; Newey-West corrige los errores estándar sin cambiar los coeficientes. prais, lmtest y sandwich están instalados; orcutt no. prais_winsten exige index = "tiempo". El script supone que TRAFICO.rda está en el directorio de trabajo.',
      script: `load("TRAFICO.rda")
form <- prcfat ~ desem + ley_vel + ley_cint + tiempo +
        feb + mar + abr + may + jun + jul + ago + sep + oct + nov + dic
modelo <- lm(form, data = base)
summary(modelo)
confint(modelo)
suppressPackageStartupMessages(library(lmtest))
dwtest(modelo)
bgtest(modelo, order = 1)
suppressPackageStartupMessages(library(prais))
pw <- prais_winsten(form, data = base, index = "tiempo")
summary(pw)
suppressPackageStartupMessages(library(sandwich))
coeftest(modelo, vcov = NeweyWest(modelo, lag = 4, prewhite = FALSE))`,
      output: `Call:
lm(formula = form, data = base)

Residuals:
      Min        1Q    Median        3Q       Max 
-0.131953 -0.032885  0.001631  0.037313  0.131775 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1.0384718  0.0571893  18.159  < 2e-16 ***
desem       -0.0154371  0.0055134  -2.800 0.006229 ** 
ley_vel      0.0671633  0.0204439   3.285 0.001443 ** 
ley_cint    -0.0295828  0.0230930  -1.281 0.203403    
tiempo      -0.0022355  0.0004185  -5.341 6.64e-07 ***
feb         -0.0001812  0.0269749  -0.007 0.994655    
mar         -0.0002591  0.0270411  -0.010 0.992377    
abr          0.0577260  0.0272431   2.119 0.036791 *  
may          0.0714815  0.0274507   2.604 0.010743 *  
jun          0.1006207  0.0272277   3.696 0.000372 ***
jul          0.1764641  0.0270735   6.518 3.76e-09 ***
ago          0.1924576  0.0272551   7.061 3.06e-10 ***
sep          0.1594424  0.0274815   5.802 9.21e-08 ***
oct          0.1008793  0.0274783   3.671 0.000405 ***
nov          0.0133768  0.0274252   0.488 0.626883    
dic          0.0089053  0.0275565   0.323 0.747304    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.0572 on 92 degrees of freedom
Multiple R-squared:  0.7174,	Adjusted R-squared:  0.6713 
F-statistic: 15.57 on 15 and 92 DF,  p-value: < 2.2e-16

                   2.5 %       97.5 %
(Intercept)  0.924888991  1.152054690
desem       -0.026387208 -0.004486985
ley_vel      0.026559935  0.107766742
ley_cint    -0.075447443  0.016281874
tiempo      -0.003066793 -0.001404250
feb         -0.053755687  0.053393313
mar         -0.053964938  0.053446827
abr          0.003618908  0.111833147
may          0.016961991  0.126001074
jun          0.046544189  0.154697296
jul          0.122693892  0.230234377
ago          0.138326551  0.246588654
sep          0.104861627  0.214023082
oct          0.046304968  0.155453619
nov         -0.041092004  0.067845627
dic         -0.045824315  0.063634857

	Durbin-Watson test

data:  modelo
DW = 1.4298, p-value = 0.0008291
alternative hypothesis: true autocorrelation is greater than 0


	Breusch-Godfrey test for serial correlation of order up to 1

data:  modelo
LM test = 8.4742, df = 1, p-value = 0.003602

Iteration 0: rho = 0
Iteration 1: rho = 0.2816
Iteration 2: rho = 0.2883
Iteration 3: rho = 0.2886
Iteration 4: rho = 0.2886
Iteration 5: rho = 0.2886

Call:
prais_winsten(formula = form, data = base, index = "tiempo")

Residuals of the transformed model:
      Min        1Q    Median        3Q       Max 
-0.116252 -0.033691  0.003983  0.030987  0.117724 

AR(1) coefficient rho after 5 iterations: 0.2886

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1.0175533  0.0717264  14.187  < 2e-16 ***
desem       -0.0132169  0.0070618  -1.872 0.064440 .  
ley_vel      0.0643013  0.0266151   2.416 0.017669 *  
ley_cint    -0.0249690  0.0299197  -0.835 0.406144    
tiempo      -0.0021499  0.0005448  -3.946 0.000155 ***
feb         -0.0019567  0.0227708  -0.086 0.931710    
mar         -0.0015466  0.0259475  -0.060 0.952600    
abr          0.0570159  0.0270958   2.104 0.038086 *  
may          0.0716087  0.0276552   2.589 0.011178 *  
jun          0.1000349  0.0273476   3.658 0.000424 ***
jul          0.1745804  0.0270982   6.443 5.30e-09 ***
ago          0.1917439  0.0273893   7.001 4.06e-10 ***
sep          0.1592786  0.0277042   5.749 1.16e-07 ***
oct          0.1005615  0.0274967   3.657 0.000425 ***
nov          0.0126856  0.0266911   0.475 0.635719    
dic          0.0081963  0.0242676   0.338 0.736324    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.05488 on 92 degrees of freedom
Multiple R-squared:  0.6412,	Adjusted R-squared:  0.5827 
F-statistic: 10.96 on 15 and 92 DF,  p-value: 1.149e-14

Durbin-Watson statistic (original):  1.43 
Durbin-Watson statistic (transformed): 1.995 


t test of coefficients:

               Estimate  Std. Error t value  Pr(>|t|)    
(Intercept)  1.03847184  0.05458116 19.0262 < 2.2e-16 ***
desem       -0.01543710  0.00551953 -2.7968 0.0062842 ** 
ley_vel      0.06716334  0.02444830  2.7472 0.0072328 ** 
ley_cint    -0.02958278  0.03049031 -0.9702 0.3344730    
tiempo      -0.00223552  0.00051236 -4.3632 3.345e-05 ***
feb         -0.00018119  0.01519652 -0.0119 0.9905129    
mar         -0.00025906  0.02085227 -0.0124 0.9901147    
abr          0.05772603  0.02451950  2.3543 0.0206854 *  
may          0.07148153  0.02617226  2.7312 0.0075644 ** 
jun          0.10062074  0.02949297  3.4117 0.0009610 ***
jul          0.17646413  0.03223663  5.4740 3.784e-07 ***
ago          0.19245760  0.02327278  8.2696 9.872e-13 ***
sep          0.15944235  0.02703773  5.8970 6.067e-08 ***
oct          0.10087929  0.02825687  3.5701 0.0005697 ***
nov          0.01337681  0.02757426  0.4851 0.6287448    
dic          0.00890527  0.02613278  0.3408 0.7340536    
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1`,
      confint: `                   2.5 %       97.5 %
(Intercept)  0.924888991  1.152054690
desem       -0.026387208 -0.004486985
ley_vel      0.026559935  0.107766742
ley_cint    -0.075447443  0.016281874
tiempo      -0.003066793 -0.001404250
feb         -0.053755687  0.053393313
mar         -0.053964938  0.053446827
abr          0.003618908  0.111833147
may          0.016961991  0.126001074
jun          0.046544189  0.154697296
jul          0.122693892  0.230234377
ago          0.138326551  0.246588654
sep          0.104861627  0.214023082
oct          0.046304968  0.155453619
nov         -0.041092004  0.067845627
dic         -0.045824315  0.063634857`,
      readingTable: [
        { element: 'Estimate (desem)', meaning: 'Coeficiente MCO del desempleo.', how: '−0,0154: un punto porcentual más de desempleo se asocia con 0,0154 puntos menos de prcfat, ceteris paribus.' },
        { element: 'Std. Error (MCO)', meaning: 'Error estándar habitual.', how: '0,00551 para desem. Supone Ω = I; con autocorrelación, no es la varianza correcta.' },
        { element: 't value / p (MCO)', meaning: 'Significancia individual con el error estándar habitual.', how: '−2,80 y 0,0062 para desem. Es la evidencia que queda invalidada por la autocorrelación.' },
        { element: 'Residual standard error', meaning: 'Dispersión residual en unidades de prcfat.', how: '0,0572 puntos porcentuales. Mide ruido, no precisión de un coeficiente.' },
        { element: 'Multiple R-squared', meaning: 'Proporción de variación explicada por el modelo.', how: '0,7174. Es descriptivo; un R² alto no corrige la autocorrelación.' },
        { element: 'Durbin-Watson', meaning: 'Contraste de autocorrelación AR(1).', how: 'd = 1,4298, p = 0,00083. Se rechaza la ausencia de autocorrelación positiva.' },
        { element: 'Breusch-Godfrey', meaning: 'Contraste de autocorrelación de orden 1.', how: 'LM = 8,4742, df = 1, p = 0,0036. Confirma el diagnóstico de DW.' },
        { element: 'rho de Prais-Winsten', meaning: 'Persistencia estimada del error.', how: '0,2886 después de 5 iteraciones. Es el ρ̂ que usa la transformación MCGF.' },
        { element: 'Prais-Winsten (desem)', meaning: 'Coeficiente y error estándar con MCGF.', how: '−0,0132 con ee 0,00706; t = −1,87; p = 0,0644. Pierde significancia al 5%.' },
        { element: 'DW transformado', meaning: 'Autocorrelación residual después de PW.', how: '1,995, cerca de 2: no queda evidencia de AR(1) en el modelo transformado.' },
        { element: 'Newey-West (desem)', meaning: 'Coeficiente MCO con error estándar HAC.', how: '−0,01544 con ee 0,00552; t = −2,80; p = 0,0063. El coeficiente no cambia; el ee casi tampoco.' },
        { element: 'confint (desem)', meaning: 'Intervalo al 95% con errores MCO.', how: '[−0,0264; −0,0045]. Excluye cero, pero está calculado con un error estándar inválido si hay autocorrelación.' }
      ],
      econometric: `<p><strong>MCO.</strong> El modelo explica el 71,7% de la variación de prcfat. desem tiene coeficiente −0,01544 (ee 0,00551; t = −2,80; p = 0,0062), ley_vel 0,06716 (ee 0,02044; p = 0,0014) y ley_cint −0,02958 (ee 0,02309; p = 0,203). La tendencia es −0,002236 por mes (p = 6,6e-07) y las dummies de primavera y verano son positivas.</p>
        <p><strong>Diagnóstico.</strong> DW = 1,4298 con p = 0,00083 rechaza la ausencia de autocorrelación positiva de primer orden. Breusch-Godfrey con order = 1 da LM = 8,4742, df = 1 y p = 0,0036: la misma conclusión. El ρ̂ implícito en DW es 1 − 1,4298/2 ≈ 0,285; Prais-Winsten estima 0,2886. Hay evidencia consistente de persistencia en el error.</p>
        <p><strong>Prais-Winsten.</strong> La reestimación por MCGF da ρ̂ = 0,2886. desem baja a −0,01322 y su error estándar sube a 0,00706: t = −1,87 y p = 0,0644. La significancia al 5% desaparece. ley_vel sigue significativa (0,0643; p = 0,0177) y ley_cint no (p = 0,406). El DW del modelo transformado es 1,995: la autocorrelación residual quedó corregida. El R² de 0,6412 no se compara con el 0,7174 de MCO porque la Y está transformada.</p>
        <p><strong>Newey-West.</strong> Con L = 4, los coeficientes son exactamente los de MCO. Los errores estándar cambian: desem 0,00552 (p = 0,0063), ley_vel 0,02445 (p = 0,0072), ley_cint 0,03049 (p = 0,334). La conclusión sobre desem no cambia, pero la de ley_vel se debilita. HAC corrige la inferencia sin ganar eficiencia; PW reestima y gana eficiencia si el AR(1) es correcto.</p>`,
      economic: `<p>La variable dependiente es la proporción de accidentes fatales sobre el total. Un aumento de un punto porcentual en el desempleo se asocia con una caída de 0,0154 puntos porcentuales en esa proporción, manteniendo constante el resto. El signo es plausible: con más desempleo hay menos desplazamientos laborales y quizás menos exposición en horarios de alto riesgo, aunque la base no permite separar ese mecanismo de otros.</p>
        <p>La ley de velocidad de 65 mph se asocia con 0,0672 puntos porcentuales más de accidentes fatales, una magnitud no menor para una variable que se mueve entre 0,70 y 1,22. La ley de cinturón tiene signo negativo (−0,0296), consistente con una reducción de la gravedad, pero su intervalo incluye cero y no se puede afirmar que el efecto sea distinto de cero con estos datos y esta especificación.</p>
        <p>La estacionalidad es marcada: abril a octubre tienen coeficientes positivos y varios son grandes; julio y agosto son los meses de mayor proporción de fatalidad. La tendencia es negativa: −0,00224 puntos porcentuales por mes, aproximadamente −0,027 en un año. Es una tendencia condicional a las leyes y al desempleo, no una ley de la naturaleza.</p>
        <p>La lectura causal exige cautela. Las leyes no se sancionan al azar y pueden coincidir con campañas de seguridad, cambios en el parque automotor o en la composición del tránsito. El modelo es estático, no incluye finde y supone un AR(1) para el error. Los coeficientes describen asociaciones condicionales dentro de esta serie; no identifican el efecto causal de cada ley.</p>`,
      errors: [
        'Leer el t de MCO como si el error estándar fuera válido. DW y BG detectan autocorrelación; el t de MCO queda cuestionado.',
        'Decir que Prais-Winsten “confirma” que desem no importa. El coeficiente sigue siendo negativo y el p = 0,0644 está al borde del 5%; lo correcto es que pierde significancia al 5%, no que el efecto sea cero.',
        'Comparar el R² de Prais-Winsten (0,6412) con el de MCO (0,7174). La variable dependiente del modelo transformado no es la misma.',
        'Concluir que Newey-West y Prais-Winsten dan lo mismo porque ambos “corrigen la autocorrelación”. Uno cambia los coeficientes y el otro no; las conclusiones sobre desem difieren.',
        'Interpretar la tendencia como un efecto causal del tiempo. Recoge todo lo que cambia lentamente y no está en el modelo.',
        'Afirmar que la ley de cinturón reduce la fatalidad porque el coeficiente es negativo. El intervalo incluye cero y el diseño es observacional.'
      ],
      checklist: [
        'Reportá n, frecuencia, período y variable dependiente antes de cualquier contraste.',
        'Mostrá el gráfico de residuos contra tiempo y contra su rezago; no saltes directo al valor p.',
        'Informá DW con su p y aclaración de alternativa, y BG con orden, LM, df y p.',
        'Reportá ρ̂ y el método de estimación (Prais-Winsten, Cochrane-Orcutt o HAC) con el rezago usado.',
        'Compará coeficientes y errores estándar entre MCO, MCGF y HAC; no compares R² entre modelos con Y transformada.',
        'Cerrá con los límites causales y con la diferencia entre significancia estadística y magnitud económica.'
      ]
    },
    partials: [
      { label: '2P 2024', text: 'Con var(β̂)<sub>MCO</sub> = σ²(X′X)⁻¹X′ΩX(X′X)⁻¹, explicar qué estructura tiene Ω con autocorrelación y sin heterocedasticidad.' },
      { label: '2P 2024', text: 'Suponiendo u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub>, |ρ| &lt; 1, demostrar qué transformación de las variables permite obtener errores no autocorrelacionados.' },
      { label: '2P 2024', text: 'Si ρ es estimado, ¿qué método se aplica y qué propiedades tienen los estimadores? Condiciones que deben cumplirse.' }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a decidir qué corregir y a leer la salida con autocorrelación. Respondé antes de abrir la solución; si tu respuesta no distingue estimación de inferencia, volvé a la sección correspondiente.',
    questions: [
      { q: '¿Por qué la autocorrelación no sesga a MCO si las X son estrictamente exógenas, pero sí invalida los t?', a: 'Porque la insesgadez depende de que el error tenga media condicional cero, no de que esté incorrelacionado consigo mismo en el tiempo. Con X estrictamente exógenas, E(u<sub>t</sub>|X) = 0 y el estimador sigue centrado. La varianza, en cambio, depende de toda la matriz Ω: la fórmula σ²(X′X)⁻¹ solo es correcta si Ω = I. Al usar una varianza equivocada, el denominador del t está mal y el contraste deja de tener el nivel de significancia nominal.' },
      { q: '¿Cómo distinguís autocorrelación de heterocedasticidad en un gráfico de residuos?', a: 'La autocorrelación se ve como persistencia: rachas de residuos del mismo signo, ciclos o una nube inclinada en el gráfico de u<sub>t</sub> contra u<sub>t−1</sub>. La heterocedasticidad se ve como un cambio en la dispersión: un abanico que se abre o se cierra con el tiempo o con X, sin necesariamente mantener el signo. Las dos pueden coexistir, y por eso primero se contrasta la autocorrelación con una prueba robusta y después la heterocedasticidad.' },
      { q: '¿Por qué DW no sirve cuando el modelo incluye Y<sub>t−1</sub>?', a: 'Porque la Y rezagada está correlacionada con u<sub>t−1</sub> por construcción. Esa correlación cambia la distribución del estadístico y lo sesga hacia 2, es decir, hacia el no rechazo. El resultado no es interpretable como una prueba de ausencia de autocorrelación. En modelos dinámicos se usa Breusch-Godfrey, que incluye las X y los rezagos de los residuos en la regresión auxiliar.' },
      { q: 'Un DW de 1,43 con p = 0,00083, ¿qué te dice? ¿Qué ρ implica?', a: 'Que se rechaza la hipótesis nula de ausencia de autocorrelación positiva de primer orden al 5%. La relación aproximada es ρ̂ ≈ 1 − d/2 = 1 − 0,715 = 0,285, así que la persistencia estimada es moderada y positiva. No dice nada sobre autocorrelación de orden 2 ni sobre heterocedasticidad. El p es de una cola porque la alternativa de dwtest es autocorrelación mayor que cero.' },
      { q: 'En el laboratorio, BG da LM = 8,4742 con 1 grado de libertad y p = 0,0036. ¿Cómo lo interpretás y por qué se usa n − p?', a: 'Se rechaza la ausencia de autocorrelación de orden 1 al 5%. El estadístico es (n − p) veces el R² de la regresión auxiliar; se usa n − p porque la regresión con un rezago de los residuos pierde la primera observación. Si se usara n, el estadístico quedaría inflado y el p más chico de lo que corresponde. El resultado coincide con DW y con el ρ̂ de Prais-Winsten.' },
      { q: '¿Qué cambia y qué no cambia cuando pasás de MCO a Newey-West?', a: 'No cambian los coeficientes: siguen siendo los β̂ de MCO. Cambian los errores estándar, los t, los valores p y los intervalos, porque se reemplaza σ²(X′X)⁻¹ por una estimación robusta a heterocedasticidad y autocorrelación. Tampoco cambia la eficiencia: MCO sigue sin ser ELIO. En el laboratorio, desem pasa de ee 0,00551 a 0,00552, mientras que ley_vel pasa de 0,02044 a 0,02445.' },
      { q: 'Escribí la transformación MCG para un modelo simple con AR(1) e interpretá el intercepto.', a: 'Y<sub>t</sub> − ρY<sub>t−1</sub> = (1 − ρ)β<sub>0</sub> + β<sub>1</sub>(X<sub>t</sub> − ρX<sub>t−1</sub>) + e<sub>t</sub>. El error transformado es e<sub>t</sub>, que no está autocorrelacionado. El intercepto de la ecuación transformada estima (1 − ρ)β<sub>0</sub>, no β<sub>0</sub>; para recuperar el nivel original hay que dividir por (1 − ρ). Si se interpreta el intercepto transformado como β<sub>0</sub>, se subestima o sobreestima el nivel según el signo y la magnitud de ρ.' },
      { q: '¿Qué diferencia hay entre MCG y MCGF?', a: 'MCG usa ρ conocido y es un caso de mínimos cuadrados generalizados: con los supuestos de Gauss-Markov y el AR(1) correcto, es insesgado y eficiente. MCGF reemplaza ρ por ρ̂, estimado con los residuos MCO. Es consistente cuando los datos son débilmente dependientes y las X estrictamente exógenas, pero no es insesgado en muestras finitas, porque el error de estimar ρ entra en la ecuación transformada. Asintóticamente es más eficiente que MCO si el AR(1) es correcto.' },
      { q: '¿Cuál es la diferencia entre Cochrane-Orcutt y Prais-Winsten?', a: 'Los dos son MCGF iterativos para un AR(1). Cochrane-Orcutt omite la primera observación porque no tiene Y<sub>t−1</sub>; Prais-Winsten la incluye multiplicada por √(1 − ρ²), de modo que su error transformado tenga varianza σ<sub>e</sub>². En muestras grandes la diferencia es menor; en muestras chicas, Prais-Winsten usa más información y suele preferirse. Las propiedades asintóticas del estimador iterativo son las mismas que las de una sola iteración.' },
      { q: 'Si MCO y MCGF dan coeficientes muy distintos, ¿cuál preferís y por qué?', a: 'Prefiero MCO. MCO es consistente bajo el supuesto más débil, cov(X<sub>t</sub>, u<sub>t</sub>) = 0. MCGF exige además que u<sub>t</sub> no esté correlacionado con X<sub>t−1</sub> ni con X<sub>t+1</sub>. Si las estimaciones difieren mucho, es señal de que esa condición adicional puede fallar y MCGF sería inconsistente. Si las estimaciones son parecidas, MCGF es preferible por eficiencia y porque sus t y F son asintóticamente válidos.' },
      { q: 'Si hay autocorrelación y heterocedasticidad, ¿qué contrastás primero y cómo seguís?', a: 'Primero la autocorrelación, con una versión robusta a heterocedasticidad si se sospecha. Los contrastes de heterocedasticidad suponen errores independientes; con autocorrelación, sus valores p no son confiables. Si no hay autocorrelación, se aplica el tratamiento habitual de heterocedasticidad. Si hay autocorrelación, se usan errores HAC en muestras grandes o un procedimiento combinado de MCP y corrección AR(1). La autocorrelación se considera más grave por su impacto sobre los errores estándar y la eficiencia.' },
      { q: 'En el laboratorio, PW lleva el p de desem a 0,0644 pero Newey-West lo deja en 0,0063. ¿Contradicción?', a: 'No. Son dos correcciones distintas. Prais-Winsten reestima el modelo con la estructura AR(1): cambia el coeficiente (de −0,01544 a −0,01322), cambia su error estándar (0,00551 a 0,00706) y el p sube. Newey-West deja el coeficiente MCO y solo reemplaza el error estándar por uno robusto (0,00552): el t casi no se mueve. Las dos respuestas son válidas para preguntas distintas: una corrige el modelo, la otra corrige la inferencia sin reestimarlo.' }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: autocorrelación',
    intro: 'Empezá por las fórmulas, seguí con los drills y la sesión de 90 minutos, y cerrá con el plan de 7 días. La idea es tener una hoja de ruta para diagnosticar, corregir y reportar sin volver a leer todo desde cero.',
    formulas: [
      { title: 'AR(1)', eq: 'u<sub>t</sub> = ρu<sub>t−1</sub> + e<sub>t</sub>, &nbsp; |ρ| &lt; 1', note: 'e<sub>t</sub> es iid(0, σ<sub>e</sub>²). ρ mide la persistencia; el signo decide rachas o zigzag.' },
      { title: 'Varianza AR(1)', eq: 'Var(u<sub>t</sub>) = σ<sub>e</sub><sup>2</sup>/(1 − ρ<sup>2</sup>)', note: 'Finita si |ρ| &lt; 1. Si ρ = 1, hay raíz unitaria y el marco no aplica.' },
      { title: 'Autocorrelación de orden j', eq: 'Corr(u<sub>t</sub>, u<sub>t−j</sub>) = ρ<sup>j</sup>', note: 'Decae geométricamente. Con ρ = 0,9, a diez períodos todavía queda 0,35.' },
      { title: 'Varianza MCO con Ω', eq: 'var(β̂) = σ<sup>2</sup>(X′X)<sup>−1</sup>X′ΩX(X′X)<sup>−1</sup>', note: 'La fórmula habitual es el caso Ω = I. Si Ω ≠ I, los e.e. de la salida están mal.' },
      { title: 'Varianza AR(1) de β̂₁', eq: 'σ<sup>2</sup>/SCT<sub>x</sub> + (2σ<sup>2</sup>/SCT<sub>x</sub><sup>2</sup>)ΣΣρ<sup>j</sup>X<sub>t</sub>X<sub>t+j</sub>', note: 'El segundo término recoge la autocorrelación. No se calcula a mano: explica el sesgo del e.e.' },
      { title: 'Durbin-Watson', eq: 'd = Σ(û<sub>t</sub> − û<sub>t−1</sub>)<sup>2</sup>/Σû<sub>t</sub><sup>2</sup>', note: 'Rango 0–4. d ≈ 2: sin evidencia de AR(1); d &lt; 2: positiva; d &gt; 2: negativa.' },
      { title: 'Relación d–ρ', eq: 'd ≈ 2(1 − ρ̂) &nbsp;→&nbsp; ρ̂ ≈ 1 − d/2', note: 'Aproximación para muestras moderadas. En el laboratorio, d = 1,4298 implica ρ ≈ 0,285.' },
      { title: 'Breusch-Godfrey', eq: 'LM = (n − p)R̂<sub>u</sub><sup>2</sup> ~ χ<sub>p</sub><sup>2</sup>', note: 'Regresión auxiliar de û sobre X y p rezagos. Sirve con Y rezagada y órdenes mayores.' },
      { title: 'Newey-West', eq: 'Ω̂<sub>NW</sub> = Σû<sub>t</sub><sup>2</sup>x<sub>t</sub>x<sub>t</sub>′ + Σ<sub>l=1</sub><sup>L</sup>w<sub>l</sub>Σ[(x<sub>t</sub>û<sub>t</sub>)(x<sub>t−l</sub>û<sub>t−l</sub>)′ + …]', note: 'w<sub>l</sub> = 1 − l/(L + 1). Corrige e.e.; no cambia coeficientes ni eficiencia.' },
      { title: 'Cuasi-diferencia MCG', eq: 'Y<sub>t</sub> − ρY<sub>t−1</sub> = (1 − ρ)β<sub>0</sub> + β<sub>1</sub>(X<sub>t</sub> − ρX<sub>t−1</sub>) + e<sub>t</sub>', note: 'El intercepto transformado es (1 − ρ)β<sub>0</sub>. No lo interpretes como β<sub>0</sub>.' },
      { title: 'Estimador MCG', eq: 'β̂<sub>MCG</sub> = (X′Ω<sup>−1</sup>X)<sup>−1</sup>X′Ω<sup>−1</sup>Y', note: 'Con ρ conocido es insesgado y eficiente. Con ρ estimado es MCGF: consistente, no insesgado.' },
      { title: 'Primera observación PW', eq: '√(1 − ρ<sup>2</sup>)Y<sub>1</sub> = √(1 − ρ<sup>2</sup>)β<sub>0</sub> + β<sub>1</sub>√(1 − ρ<sup>2</sup>)X<sub>1</sub> + √(1 − ρ<sup>2</sup>)u<sub>1</sub>', note: 'Iguala la varianza de la primera observación. Cochrane-Orcutt, en cambio, la omite.' }
    ],
    drills: [
      { q: '¿Qué es la autocorrelación y por qué no tiene sentido en corte transversal?', a: 'Es la correlación entre errores de períodos distintos. En corte transversal no hay un orden temporal natural que defina “períodos”; por eso el concepto se aplica a series de tiempo.' },
      { q: 'Si ρ = 0,8, ¿cuánto vale la correlación entre u<sub>t</sub> y u<sub>t−2</sub>?', a: 'ρ² = 0,64. A tres períodos, 0,512; a cuatro, 0,4096.' },
      { q: '¿MCO es insesgado con autocorrelación?', a: 'Sí, si las X son estrictamente exógenas y los datos son débilmente dependientes. Con exogeneidad solo contemporánea es consistente, no insesgado. En ambos casos deja de ser eficiente.' },
      { q: 'Si DW = 1,2, ¿qué ρ aproximado implica?', a: 'ρ̂ ≈ 1 − 1,2/2 = 0,4. Es autocorrelación positiva moderada.' },
      { q: '¿Cuándo no sirve DW?', a: 'Con Y rezagada, con autocorrelación de orden mayor a 1, sin intercepto o cuando no se cumplen los supuestos del MLC (normalidad y homocedasticidad).' },
      { q: 'BG da LM = 8,47 con 1 grado de libertad. ¿Qué concluís?', a: 'Se rechaza la ausencia de autocorrelación de orden 1 al 5%, porque el valor crítico de χ²₁ al 95% es 3,84.' },
      { q: '¿Qué cambia Newey-West en una regresión?', a: 'Solo los errores estándar, los t, los p y los intervalos. Los coeficientes y el R² no cambian; la eficiencia tampoco mejora.' },
      { q: 'Con ρ = 0,5, Y<sub>t</sub> = 10 e Y<sub>t−1</sub> = 8, ¿cuál es la variable cuasi-diferenciada?', a: '10 − 0,5·8 = 6. El intercepto de esa ecuación estima 0,5β<sub>0</sub>.' },
      { q: '¿Cuál es el intercepto de la ecuación MCG transformada?', a: '(1 − ρ)β<sub>0</sub>. Para recuperar β<sub>0</sub> hay que dividir por (1 − ρ).' },
      { q: '¿Qué hace diferente a Prais-Winsten de Cochrane-Orcutt?', a: 'Prais-Winsten transforma la primera observación por √(1 − ρ²) y usa las n observaciones; Cochrane-Orcutt la omite y usa n − 1.' },
      { q: '¿Qué condición adicional exige MCGF para ser consistente?', a: 'Que u<sub>t</sub> no esté correlacionado con X<sub>t−1</sub> ni con X<sub>t+1</sub>: cov(X<sub>t−1</sub> + X<sub>t+1</sub>, u<sub>t</sub>) = 0, además de cov(X<sub>t</sub>, u<sub>t</sub>) = 0.' },
      { q: 'En el laboratorio, ¿por qué PW y Newey-West discrepan sobre desem?', a: 'Porque PW reestima el modelo con AR(1) y cambia coeficiente y error estándar; Newey-West deja el coeficiente MCO y solo corrige el error estándar. Son correcciones distintas para preguntas distintas.' }
    ],
    sourceGuide: [
      { stuck: 'No entiendo por qué MCO sigue siendo insesgado con autocorrelación', source: 'Clase 8, diap. 3; Wooldridge Cap. 12, §12.1; TP 11, Actividad 2a.' },
      { stuck: 'No distingo autocorrelación de heterocedasticidad', source: 'Clase 8, diap. 6 y 28–30; TP 11, Actividad 2b.' },
      { stuck: 'No sé leer el estadístico d ni las zonas d<sub>L</sub>–d<sub>U</sub>', source: 'Clase 8, diap. 10–13; Wooldridge Cap. 12, §12.2; TP 11, Actividad 1a.' },
      { stuck: 'DW me da inconcluyente y no sé qué hacer', source: 'Clase 8, diap. 12–14; pasá a Breusch-Godfrey o a la prueba t de ρ.' },
      { stuck: 'No sé cuándo usar Breusch-Godfrey', source: 'Clase 8, diap. 14; TP 11, Ejercicio 7c; sección 05 de esta clase.' },
      { stuck: 'No entiendo qué corrigen los errores HAC', source: 'Clase 8, diap. 16; TP 11, Ejercicio 7e; laboratorio de esta clase.' },
      { stuck: 'No me sale la transformación MCG', source: 'Clase 8, diap. 17–18; 2P 2024, pregunta 4b; sección 06 de esta clase.' },
      { stuck: 'No distingo MCG de MCGF', source: 'Clase 8, diap. 18–23; Wooldridge Cap. 12, §12.3; TP 11, Ejercicio 4c–d.' },
      { stuck: 'No sé cuándo usar Cochrane-Orcutt o Prais-Winsten', source: 'Clase 8, diap. 24–25; TP 11, Ejercicio 1i y Ejercicio 4d.' },
      { stuck: 'No sé qué hacer si hay heterocedasticidad y autocorrelación', source: 'Clase 8, diap. 28–30; Wooldridge Cap. 12, §12.5.' }
    ],
    session: [
      { time: '0–10', title: 'Pregunta guía', text: '¿Qué consecuencias tiene la autocorrelación sobre MCO y qué tres caminos existen para corregirla? Escribí una respuesta de tres líneas sin mirar.' },
      { time: '10–30', title: 'Propiedades y varianza', text: 'Explicá insesgadez, eficiencia e inferencia. Escribí la varianza con Ω y la fórmula habitual; identificá qué término falta. Fuente: sección 02.' },
      { time: '30–50', title: 'Detección', text: 'Resolvé TP 11, Actividad 1 y Actividad 2. Después interpretá DW y BG del laboratorio: estadístico, hipótesis, p y conclusión. Fuente: secciones 03–05.' },
      { time: '50–70', title: 'MCG y MCGF', text: 'Escribí la transformación, el intercepto y la primera observación de PW. Resolvé TP 11, Ejercicio 4c–d o Ejercicio 7d. Fuente: sección 06.' },
      { time: '70–85', title: 'Laboratorio y HAC', text: 'Reproducí la salida de TRAFICO. Compará MCO, PW y Newey-West en coeficientes y errores estándar. Explicá por qué el p de desem cambia tanto entre PW y HAC.' },
      { time: '85–90', title: 'Cierre', text: 'Anotá una prueba que sepas justificar en dos minutos y una corrección que todavía no puedas explicar sin mirar.' }
    ],
    kit: [
      { k: 'Kit 01', title: 'Una página de diagnóstico', text: 'AR(1), DW, BG y prueba t de ρ, con la hipótesis nula, el estadístico y cuándo falla cada uno.' },
      { k: 'Kit 02', title: 'Tabla de correcciones', text: 'HAC, MCG, MCGF, Cochrane-Orcutt y Prais-Winsten: qué cambia en coeficientes, errores estándar y eficiencia.' },
      { k: 'Kit 03', title: 'Seis tarjetas de práctica', text: 'Actividades 1–2 y Ejercicios 1, 2, 4 y 7 del TP 11, con el enlace profundo a cada uno.' },
      { k: 'Kit 04', title: 'Plan de 7 días', text: 'Una rutina corta para alternar teoría, diagnóstico, laboratorio y parcial sin volver a leer todo desde cero.' }
    ],
    plan: [
      { day: 'Día 1', title: 'Teoría y consecuencias', text: 'Leé las secciones 01 y 02. Explicá por qué MCO es insesgado pero no eficiente, y qué le pasa al t.' },
      { day: 'Día 2', title: 'Detección', text: 'Estudiá las secciones 03 y 04. Practicá la relación d–ρ y las zonas de DW. Resolvé TP 11, Actividad 1.' },
      { day: 'Día 3', title: 'BG y HAC', text: 'Estudiá la sección 05. Resolvé TP 11, Actividad 2 y Ejercicio 7c. Explicá qué columnas cambia Newey-West.' },
      { day: 'Día 4', title: 'MCG y MCGF', text: 'Estudiá la sección 06. Escribí la transformación y la primera observación de PW. Resolvé Ejercicio 4c–d.' },
      { day: 'Día 5', title: 'Laboratorio', text: 'Reproducí la salida de TRAFICO. Reportá DW, BG, ρ̂, coeficientes de MCO, PW y HAC, y compará.' },
      { day: 'Día 6', title: 'Práctica integradora', text: 'Resolvé TP 11, Ejercicio 1g–i o Ejercicio 7 completo. Redactá la conclusión económica con límites causales.' },
      { day: 'Día 7', title: 'Cierre', text: 'Volvé solo a lo que falló. Actualizá tu tabla de correcciones y tu página de diagnóstico.' }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para abrir cada ejercicio desde la práctica. Las citas de parciales se limitan a preguntas relacionadas con autocorrelación y corrección de errores.',
    items: [
      { type: 'Clase', typeClass: '', title: 'Clase 8 — Autocorrelación', text: 'Fuente principal de la explicación, el orden y los énfasis. Cubre consecuencias sobre MCO, detección gráfica, prueba t de ρ, DW, Breusch-Godfrey, HAC, MCG, Cochrane-Orcutt, Prais-Winsten y heterocedasticidad en series.', loc: '30 diapositivas · diap. 2–30' },
      { type: 'Libro', typeClass: 'book', title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.', text: 'Cap. 12: propiedades de MCO con errores serialmente correlacionados, contrastes de autocorrelación, corrección con regresores estrictamente exógenos y heterocedasticidad en series de tiempo.', loc: 'Cap. 12 · §12.1–12.5' },
      { type: 'Guía', typeClass: '', title: 'Guía de Trabajos Prácticos 2026 — TP 11', text: 'Actividades 1–2 para los conceptos; Ejercicios 1–2 para diagnóstico y corrección; 4 para comparar Cochrane-Orcutt, Prais-Winsten y Newey-West; 7 para el ejercicio integrador con ρ = 0,845.', loc: 'TP 11 · act. 1–2; ej. 1–2, 4, 7', href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-11' },
      { type: 'Parcial', typeClass: 'exam', title: '2P 2024', text: 'Estructura de Ω con autocorrelación y sin heterocedasticidad; transformación de cuasi-diferencias para eliminar la autocorrelación; propiedades del estimador cuando ρ es estimado.', loc: 'Solución orientativa · pregunta 4' }
    ]
  }
};
