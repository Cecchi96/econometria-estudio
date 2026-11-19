window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-03"] = {
  id: "clase-03",
  num: "03",
  eyebrow: "Clase 03 · Inferencia",
  title: "Inferencia: t, F y lo que la muestra permite decir",
  lead: "Una estimación siempre viene con error. La inferencia decide cuánto de ese error es compatible con una hipótesis y cuánto la contradice.",
  question: "¿Cuándo una estimación es evidencia suficiente para hablar de la población?",
  pills: ["45 diapositivas", "TP 4", "1P 2024–2026", "9 conceptos clave"],

  sections: [
    {
      id: "c03-s01",
      number: "01",
      title: "El problema: estimar no es inferir",
      blocks: [
        {
          type: "p",
          id: "c03-s01-p01",
          html: 'La clase 1 y la clase 2 terminaron con estimaciones: una recta, un vector de coeficientes, una matriz de varianzas y covarianzas. Todo eso describe lo que ocurrió en una muestra de tamaño n. La inferencia empieza cuando la pregunta deja de ser qué pasó en esos datos y pasa a ser qué puede decirse de la población que los generó.'
        },
        {
          type: "p",
          id: "c03-s01-p02",
          html: 'El ejemplo que usa la clase es un modelo de salario en función de los años de educación y de experiencia. Con una muestra se obtiene una pendiente; con otra, la pendiente cambia. La pregunta relevante no es si el número es exactamente cero en la muestra —casi nunca lo es— sino si está lo suficientemente lejos de cero, en relación con su error estándar, como para sostener que el parámetro poblacional no es cero.'
        },
        {
          type: "compare",
          left: {
            tag: "Estimar",
            title: "Describir la muestra",
            text: "β̂ es una estadística muestral: cambia si cambia la muestra. Su valor concreto no es el parámetro poblacional.",
            eq: "β̂ = (X′X)<sup>−1</sup>X′Y"
          },
          right: {
            tag: "Inferir",
            title: "Hablar de la población",
            text: "β es fijo y desconocido. La inferencia usa β̂, su error estándar y una distribución de probabilidad para decidir.",
            eq: "β̂  →  β"
          }
        },
        {
          type: "cards",
          items: [
            { sym: "1", title: "Distribución muestral", text: "No alcanza con la esperanza y la varianza: hace falta la forma completa de la distribución de β̂." },
            { sym: "2", title: "Supuesto distribucional", text: "El MLC agrega normalidad de los errores. Sin ella, t y F son exactos solo si n es grande." },
            { sym: "3", title: "Estadístico de prueba", text: "t o F resumen la distancia entre los datos y la hipótesis nula, en unidades de error estándar." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "La dirección de la inferencia",
          html: "La hipótesis se escribe sobre parámetros poblacionales —por ejemplo, H<sub>0</sub>: β<sub>1</sub> = 0—, pero el estadístico se calcula con datos muestrales. Nunca se pasa de “no rechazo” a “β = 0”: se pasa de una muestra a una decisión sobre la población, con una probabilidad de error."
        },
        {
          type: "miniCheck",
          id: "c03-check-01",
          question: "¿Por qué no alcanza con conocer E(β̂) y Var(β̂) para hacer inferencia?",
          intro: "Pensá qué información hace falta para construir un valor p o un intervalo.",
          answer: "Porque la esperanza y la varianza son solo los dos primeros momentos. Para calcular probabilidades, valores críticos y valores p se necesita la forma completa de la distribución muestral. Gauss-Markov garantiza insesgamiento y eficiencia, pero no una forma funcional. El MLC agrega la normalidad; en muestras grandes, el teorema central del límite da una aproximación."
        }
      ]
    },
    {
      id: "c03-s02",
      number: "02",
      title: "El modelo lineal clásico",
      blocks: [
        {
          type: "p",
          id: "c03-s02-p01",
          html: 'Los supuestos de Gauss-Markov alcanzan para demostrar que MCO es insesgado y, entre los estimadores lineales insesgados, de varianza mínima. No alcanzan para saber qué forma tiene la distribución de β̂. Dos estimadores pueden tener la misma media y la misma varianza y distribuciones muy distintas; los valores p y los intervalos dependen de esa forma.'
        },
        {
          type: "p",
          id: "c03-s02-p02",
          html: 'El <span class="concept" data-concept="mlc" tabindex="0" role="button">modelo lineal clásico</span> (MLC) suma un supuesto sobre la distribución de los errores: u es independiente de las X y se distribuye normal con media cero y varianza constante. Condicional a X, Y también es normal, con media β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub> y varianza σ<sup>2</sup>.'
        },
        {
          type: "formula",
          main: "u | X ~ N(0, σ<sup>2</sup>) &nbsp;&nbsp;→&nbsp;&nbsp; Y | X ~ N(β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub>, σ<sup>2</sup>)",
          legend: [
            { key: "u | X", text: "El error condicional a las variables explicativas." },
            { key: "Y | X", text: "La variable dependiente condicional a X hereda la normalidad del error." },
            { key: "MLC", text: "Gauss-Markov más normalidad. Es el supuesto que permite inferencia exacta en muestras chicas." }
          ]
        },
        {
          type: "assumptions",
          rows: [
            { title: "Linealidad en los parámetros", text: "Y se escribe como combinación lineal de los β. El MLC no cambia la forma funcional." },
            { title: "Muestra aleatoria", text: "Las observaciones son independientes y provienen de la misma población." },
            { title: "E(u | X) = 0", text: "Exogeneidad: los factores omitidos no están sistemáticamente relacionados con las X incluidas." },
            { title: "Rango completo", text: "No hay colinealidad perfecta: X′X es invertible." },
            { title: "Homocedasticidad", text: "Var(u | X) = σ<sup>2</sup>. Es la varianza que aparece en los errores estándar." },
            { title: "Normalidad e independencia", text: "u | X ~ N(0, σ<sup>2</sup>): la distribución del error no depende de X. Es el supuesto adicional del MLC para inferencia exacta." }
          ]
        },
        {
          type: "p",
          id: "c03-s02-p03",
          html: '¿De dónde sale la normalidad? De un argumento de teorema central del límite: si u es la suma de muchos factores no observados, pequeños e independientes, su distribución se aproxima a la normal. El argumento puede fallar si los factores no son aditivos, si tienen distribuciones muy distintas o si unos pocos dominan. Por eso la normalidad es una cuestión empírica y su importancia depende del tamaño de muestra.'
        },
        {
          type: "callout",
          variant: "teal",
          label: "Normalidad no es sinónimo de Gauss-Markov",
          html: "Suponer errores normales no corrige endogeneidad, variables omitidas ni heterocedasticidad. Solo agrega una distribución conocida para los estimadores. En muestras grandes, el TCL puede reemplazarla; en muestras chicas, es la que permite usar t y F exactas."
        },
        {
          type: "miniCheck",
          id: "c03-check-02",
          question: "¿Qué se gana y qué no se gana al agregar normalidad a los supuestos de Gauss-Markov?",
          intro: "Separá lo que depende de la distribución de lo que depende de la exogeneidad y de la varianza.",
          answer: "Se gana la distribución muestral normal de β̂ y, con ella, estadísticos t y F con distribuciones exactas en muestras finitas. No se gana insesgamiento —eso ya venía de Gauss-Markov—, no se corrige la endogeneidad ni las variables omitidas, y no se vuelve innecesaria la homocedasticidad. La normalidad es un supuesto sobre la forma de la distribución, no sobre la identificación del parámetro."
        }
      ]
    },
    {
      id: "c03-s03",
      number: "03",
      title: "El estadístico t",
      blocks: [
        {
          type: "p",
          id: "c03-s03-p01",
          html: 'Bajo el MLC, condicional a X, cada β̂<sub>j</sub> tiene distribución normal con media β<sub>j</sub> y varianza Var(β̂<sub>j</sub>). Si σ<sup>2</sup> fuera conocida, se podría estandarizar y usar una normal estándar. En la práctica σ<sup>2</sup> es desconocida y se reemplaza por σ̂<sup>2</sup>; al hacerlo, la distribución cambia: aparece una <span class="concept" data-concept="t" tabindex="0" role="button">t</span> con n − k − 1 grados de libertad.'
        },
        {
          type: "formula",
          main: "z<sub>j</sub> = (β̂<sub>j</sub> − β<sub>j</sub>) / √Var(β̂<sub>j</sub>) ~ N(0,1) &nbsp;&nbsp;→&nbsp;&nbsp; t<sub>j</sub> = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>) ~ t<sub>n−k−1</sub>",
          legend: [
            { key: "z", text: "Estadístico teórico si σ² fuera conocida." },
            { key: "t", text: "Estadístico usable: reemplaza el desvío poblacional por el error estándar estimado." },
            { key: "a", text: "Valor del parámetro bajo la hipótesis nula. Lo habitual es a = 0." }
          ]
        },
        {
          type: "p",
          id: "c03-s03-p02",
          html: 'El estadístico t es una distancia estandarizada: el numerador mide cuánto se aleja la estimación del valor propuesto por H<sub>0</sub>; el denominador mide la precisión con la que se estimó. Un t de 2 significa “dos errores estándar lejos de H<sub>0</sub>”, no “dos unidades de Y”.'
        },
        {
          type: "cards",
          items: [
            { sym: "Numerador", title: "Distancia", text: "β̂ⱼ − a. Si H₀ es βⱼ = a, mide el error de estimación respecto de ese valor." },
            { sym: "Denominador", title: "Precisión", text: "ee(β̂ⱼ). Cuanto más grande, más ancho es el intervalo y menos evidencia aporta la misma distancia." },
            { sym: "gl", title: "n − k − 1", text: "Se pierden k + 1 grados de libertad por estimar el intercepto y las k pendientes." }
          ]
        },
        {
          type: "p",
          id: "c03-s03-p03",
          html: 'La distribución t tiene colas más gruesas que la normal y depende de los grados de libertad. Con pocos grados de libertad, el valor crítico para un 5% bilateral es bastante mayor que 1,96; a medida que n crece, la t se acerca a la normal estándar. Esa convergencia es la que permite usar t en muestras grandes sin normalidad exacta.'
        },
        {
          type: "callout",
          variant: "ochre",
          label: "El error estándar es la unidad",
          html: "No se compara el coeficiente con cero en unidades de la variable dependiente. Se compara con su error estándar. Por eso dos coeficientes del mismo tamaño pueden tener t muy distintos si uno está estimado con mucha más precisión que el otro."
        },
        {
          type: "miniCheck",
          id: "c03-check-03",
          question: "¿Por qué los grados de libertad son n − k − 1 y no n?",
          intro: "Contá cuántos parámetros se estiman antes de estimar σ².",
          answer: "Porque se estiman k + 1 parámetros: el intercepto y k pendientes. La varianza residual se calcula con los residuos, que ya usaron esos parámetros; por eso la suma de cuadrados residual tiene n − k − 1 grados de libertad. En regresión simple, k = 1 y quedan n − 2."
        }
      ]
    },
    {
      id: "c03-s04",
      number: "04",
      title: "Contraste individual, valor p y decisiones",
      blocks: [
        {
          type: "p",
          id: "c03-s04-p01",
          html: 'El contraste individual más frecuente es H<sub>0</sub>: β<sub>j</sub> = 0 frente a H<sub>1</sub>: β<sub>j</sub> ≠ 0. La estimación puntual casi nunca será exactamente cero, sea cierta o no H<sub>0</sub>; la pregunta es si está lo suficientemente lejos como para que el error muestral no explique la diferencia. También puede contrastarse cualquier valor: H<sub>0</sub>: β<sub>j</sub> = a.'
        },
        {
          type: "formula",
          main: "t = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; se rechaza H<sub>0</sub> si |t| > t<sub>α/2, n−k−1</sub>",
          legend: [
            { key: "Bilateral", text: "H<sub>1</sub>: β<sub>j</sub> ≠ a. Se reparte α en las dos colas." },
            { key: "Unilateral", text: "H<sub>1</sub>: β<sub>j</sub> > a o β<sub>j</sub> < a. Se concentra α en una cola." },
            { key: "Regla", text: "El valor crítico depende del nivel α y de los grados de libertad." }
          ]
        },
        {
          type: "p",
          id: "c03-s04-p02",
          html: 'La hipótesis alternativa puede ser bilateral (β<sub>j</sub> ≠ 0) o unilateral (β<sub>j</sub> > 0 o β<sub>j</sub> < 0). La bilateral es la opción por defecto cuando la teoría no fija el signo; la unilateral se justifica antes de mirar los datos y concentra el 5% en una sola cola. Elegir la cola después de ver el signo infla el error tipo I.'
        },
        {
          type: "p",
          id: "c03-s04-p03",
          html: 'El <span class="concept" data-concept="valor-p" tabindex="0" role="button">valor p</span> es la probabilidad de obtener un estadístico al menos tan extremo como el observado si H<sub>0</sub> fuera verdadera. Es una medida de evidencia en contra de H<sub>0</sub>, no la probabilidad de que H<sub>0</sub> sea verdadera. Se rechaza H<sub>0</sub> si p < α; cuanto menor sea p, más fuerte es la evidencia, pero eso no dice nada por sí solo sobre la importancia económica del efecto.'
        },
        {
          type: "formula",
          main: "p = P(|T| ≥ |t<sub>obs</sub>| | H<sub>0</sub>)",
          legend: [
            { key: "T", text: "Variable aleatoria con la distribución del estadístico bajo H₀." },
            { key: "t<sub>obs</sub>", text: "Valor calculado con la muestra." },
            { key: "α", text: "Nivel de significación elegido antes de calcular el estadístico." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "α", title: "Nivel de significación", text: "Se elige antes de mirar los datos. Es la probabilidad de error tipo I que se está dispuesto a tolerar." },
            { sym: "p", title: "Valor p", text: "Se calcula con los datos. Es el nivel de significación más pequeño al que se rechazaría H₀." },
            { sym: "Decisión", title: "Rechazar o no rechazar", text: "Si p < α, se rechaza H₀. Si p ≥ α, no se rechaza; no se “acepta”." }
          ]
        },
        {
          type: "errorTable",
          rows: [
            {
              error: "“p = 0,03 significa que hay 3% de probabilidad de que H₀ sea verdadera”",
              why: "El valor p es P(datos al menos tan extremos | H₀), no P(H₀ | datos).",
              fix: "Leelo como evidencia: si H₀ fuera cierta, 3% de las muestras darían un estadístico así."
            },
            {
              error: "“No rechacé H₀, entonces H₀ es verdadera”",
              why: "No rechazar puede deberse a un efecto pequeño, poca potencia o un error estándar grande.",
              fix: "Decí “no hay evidencia suficiente para rechazar” y mirá el intervalo y la potencia."
            },
            {
              error: "“Un t grande implica un efecto económico grande”",
              why: "t = coeficiente / error estándar. Con n grande, un efecto minúsculo puede tener t grande.",
              fix: "Interpretá la magnitud del coeficiente y su intervalo, no solo el p."
            },
            {
              error: "“Como el t es significativo, el efecto es causal”",
              why: "La significancia estadística no resuelve variables omitidas, endogeneidad ni diseño.",
              fix: "Separá la inferencia estadística de la identificación causal."
            }
          ]
        },
        {
          type: "callout",
          variant: "teal",
          label: "Se rechaza o no se rechaza",
          html: "La lógica es asimétrica: se rechaza H<sub>0</sub> cuando la evidencia es suficientemente fuerte en contra; si no, se dice que no hay evidencia suficiente para rechazarla. No se “acepta” H<sub>0</sub>, porque un intervalo amplio puede ser compatible con muchos valores, incluido el nulo."
        },
        {
          type: "miniCheck",
          id: "c03-check-04",
          question: "Un coeficiente es estadísticamente significativo al 5% pero su magnitud es diminuta. ¿Cómo pueden convivir las dos cosas?",
          intro: "Pensá qué pasa con el error estándar cuando la muestra crece.",
          answer: "La significancia depende de la relación entre el coeficiente y su error estándar. Con una muestra grande, el error estándar se reduce y un efecto pequeño puede estimarse con mucha precisión: el t resulta grande aunque la magnitud sea económicamente menor. La significancia no mide importancia práctica; para eso hay que mirar el tamaño del coeficiente, sus unidades y el intervalo de confianza."
        }
      ]
    },
    {
      id: "c03-s05",
      number: "05",
      title: "Errores de tipo I y II, potencia",
      blocks: [
        {
          type: "p",
          id: "c03-s05-p01",
          html: 'Contrastar no es adivinar sin error. Hay dos formas de equivocarse: rechazar H<sub>0</sub> cuando es verdadera —error tipo I— y no rechazarla cuando es falsa —error tipo II—. El nivel de significación α controla la primera; la <span class="concept" data-concept="potencia" tabindex="0" role="button">potencia</span> 1 − β mide la capacidad de detectar un efecto real.'
        },
        {
          type: "assumptions",
          rows: [
            { title: "H₀ verdadera · Se rechaza", text: "Error tipo I. Su probabilidad es α, el nivel de significación elegido." },
            { title: "H₀ verdadera · No se rechaza", text: "Decisión correcta. Su probabilidad es 1 − α, el nivel de confianza." },
            { title: "H₀ falsa · Se rechaza", text: "Decisión correcta. Su probabilidad es la potencia, 1 − β." },
            { title: "H₀ falsa · No se rechaza", text: "Error tipo II. Su probabilidad es β." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "α", title: "Error tipo I", text: "Rechazar un efecto nulo. Es el precio de exigir evidencia fuerte." },
            { sym: "β", title: "Error tipo II", text: "No detectar un efecto que existe. Aumenta si la muestra es chica o el efecto es débil." },
            { sym: "1 − β", title: "Potencia", text: "Probabilidad de detectar el efecto. No es 1 − α: depende del efecto, de n y del ruido." }
          ]
        },
        {
          type: "p",
          id: "c03-s05-p02",
          html: 'La potencia crece con el tamaño del efecto, con n y con la precisión; disminuye con σ y con niveles de α más exigentes. Bajar α de 0,05 a 0,01 reduce el error tipo I, pero también la potencia para un n fijo. La única forma de mejorar ambas cosas a la vez es aumentar la información: más observaciones, mejor diseño o menos ruido.'
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Bajar α no es gratis",
          html: "Un contraste más exigente reduce la probabilidad de falsos positivos, pero vuelve más probable no detectar efectos reales. Si un estudio no rechaza H<sub>0</sub>, antes de concluir que no hay efecto hay que preguntarse cuál era su potencia."
        },
        {
          type: "miniCheck",
          id: "c03-check-05",
          question: "Si no rechazás H₀, ¿podés concluir que β = 0?",
          intro: "Pensá en la diferencia entre “no hay evidencia” y “hay evidencia de ausencia”.",
          answer: "No. No rechazar significa que los datos no aportan evidencia suficiente contra H₀. Puede haber un efecto real que el contraste no logró detectar por poca potencia, por un error estándar grande o por un n chico. El intervalo de confianza muestra qué valores siguen siendo compatibles con los datos; si es amplio, la conclusión honesta es que no se pudo precisar el efecto."
        }
      ]
    },
    {
      id: "c03-s06",
      number: "06",
      title: "Intervalos de confianza",
      blocks: [
        {
          type: "p",
          id: "c03-s06-p01",
          html: 'Un <span class="concept" data-concept="ic" tabindex="0" role="button">intervalo de confianza</span> combina la estimación puntual con el error estándar y un valor crítico. Al 95%, se construye con el percentil 97,5 de la t correspondiente. El intervalo es una variable aleatoria: cambia con la muestra, aunque el parámetro sea fijo.'
        },
        {
          type: "formula",
          main: "β̂<sub>j</sub> ± t<sub>α/2, n−k−1</sub> · ee(β̂<sub>j</sub>)",
          legend: [
            { key: "Centro", text: "β̂<sub>j</sub>, la estimación puntual." },
            { key: "Margen", text: "t<sub>α/2</sub> · ee. La mitad de la amplitud del intervalo." },
            { key: "Nivel", text: "1 − α. Un nivel mayor exige un valor crítico mayor y produce un intervalo más ancho." }
          ]
        },
        {
          type: "p",
          id: "c03-s06-p02",
          html: 'La interpretación correcta es de muestreo repetido: si se construyeran muchos intervalos del mismo modo, aproximadamente el 95% contendría al parámetro. No es correcto decir “hay 95% de probabilidad de que β esté en este intervalo concreto”: en la visión frecuentista, β es fijo y el intervalo es lo aleatorio.'
        },
        {
          type: "cards",
          items: [
            { sym: "Centro", title: "β̂ⱼ", text: "La estimación puntual. Si el estimador es insesgado, el intervalo se centra en el valor esperado." },
            { sym: "Margen", title: "t · ee", text: "La mitad de la amplitud. Depende del nivel de confianza, de los grados de libertad y de la precisión." },
            { sym: "Nivel", title: "1 − α", text: "95% es una convención. Un nivel mayor produce un intervalo más ancho y menos conclusiones tajantes." }
          ]
        },
        {
          type: "callout",
          variant: "teal",
          label: "IC y contraste, dos caras",
          html: "En un contraste bilateral al 5%, H<sub>0</sub>: β<sub>j</sub> = a se rechaza si y solo si a queda fuera del intervalo de confianza al 95%. El intervalo muestra, además, qué magnitudes son compatibles con los datos; el valor p solo responde sí o no a un valor de H<sub>0</sub>."
        },
        {
          type: "miniCheck",
          id: "c03-check-06",
          question: "El IC 95% de β₁ es [−0,2; 0,8]. ¿Qué concluís sobre H₀: β₁ = 0?",
          intro: "Fijate si el valor nulo está dentro del intervalo.",
          answer: "No se rechaza H₀ al 5%: 0 está dentro del intervalo. Eso no prueba que β₁ sea cero; el intervalo es amplio y es compatible con efectos negativos moderados y positivos moderados. La conclusión correcta es que los datos no permiten distinguir el efecto de cero con ese nivel de confianza."
        }
      ]
    },
    {
      id: "c03-s07",
      number: "07",
      title: "Combinaciones lineales de parámetros",
      blocks: [
        {
          type: "p",
          id: "c03-s07-p01",
          html: 'No todas las hipótesis son sobre un coeficiente aislado. La teoría puede afirmar que dos variables tienen el mismo efecto (β<sub>1</sub> = β<sub>2</sub>), que la suma de dos efectos es uno (β<sub>1</sub> + β<sub>2</sub> = 1) o que el efecto de una es el doble de otra. En esos casos hay una <span class="concept" data-concept="combinacion" tabindex="0" role="button">combinación lineal</span> de parámetros y el estadístico t se aplica a la combinación.'
        },
        {
          type: "formula",
          main: "θ = β<sub>1</sub> − β<sub>2</sub> &nbsp;&nbsp;·&nbsp;&nbsp; Var(θ̂) = Var(β̂<sub>1</sub>) + Var(β̂<sub>2</sub>) − 2 Cov(β̂<sub>1</sub>, β̂<sub>2</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; t = θ̂ / ee(θ̂)",
          legend: [
            { key: "θ", text: "La combinación que se quiere contrastar. Para H₀: β₁ = β₂, θ = β₁ − β₂ y H₀: θ = 0." },
            { key: "Var(θ̂)", text: "No es la suma de varianzas: la covarianza entre estimadores cambia el resultado." },
            { key: "t", text: "Se distribuye t con n − k − 1 grados de libertad bajo el MLC y H₀." }
          ]
        },
        {
          type: "p",
          id: "c03-s07-p02",
          html: 'El error estándar de la diferencia no es la suma de los errores estándar. Los estimadores suelen estar correlacionados porque comparten la misma muestra y los mismos regresores; si la covarianza es positiva, la varianza de la diferencia se reduce; si es negativa, aumenta. Ignorarla cambia el estadístico y la conclusión.'
        },
        {
          type: "p",
          id: "c03-s07-p03",
          html: 'Una forma práctica de obtener el contraste es reparametrizar el modelo. Si se define θ = β<sub>1</sub> − β<sub>2</sub> y se reemplaza β<sub>1</sub> = θ + β<sub>2</sub>, el coeficiente que acompaña a X<sub>1</sub> pasa a ser θ. El software reporta directamente su estimación, su error estándar y su t. Es el mismo contraste, escrito de otra manera.'
        },
        {
          type: "formula",
          main: "Y = β<sub>0</sub> + θX<sub>1</sub> + β<sub>2</sub>(X<sub>1</sub> + X<sub>2</sub>) + β<sub>3</sub>X<sub>3</sub> + u",
          legend: [
            { key: "θ", text: "Coeficiente de X₁ en el modelo reparametrizado: estima β₁ − β₂." },
            { key: "X₁ + X₂", text: "La suma se incluye como un solo regresor; su coeficiente estima β₂." },
            { key: "Ventaja", text: "El t sobre θ contrasta H₀: β₁ = β₂ sin calcular covarianzas a mano." }
          ]
        },
        {
          type: "callout",
          variant: "ochre",
          label: "No compares intervalos a ojo",
          html: "Que dos intervalos individuales se solapen no implica que la diferencia no sea significativa, y que no se solapen no implica lo contrario. El contraste correcto usa la varianza de la diferencia y la covarianza entre los estimadores."
        },
        {
          type: "miniCheck",
          id: "c03-check-07",
          question: "¿Por qué no alcanza con mirar los t individuales para concluir si β₁ = β₂?",
          intro: "Pensá qué información falta cuando se comparan dos coeficientes estimados con la misma muestra.",
          answer: "Porque dos coeficientes pueden ser individualmente significativos y, aun así, no ser estadísticamente distintos entre sí. La comparación requiere el error estándar de la diferencia, que depende de las varianzas de ambos estimadores y de su covarianza. Mirar los t por separado no responde la pregunta de igualdad."
        }
      ]
    },
    {
      id: "c03-s08",
      number: "08",
      title: "Restricciones múltiples y estadístico F",
      blocks: [
        {
          type: "p",
          id: "c03-s08-p01",
          html: 'Muchas hipótesis involucran varias restricciones a la vez. En un modelo con cuatro variables, H<sub>0</sub>: β<sub>1</sub> = β<sub>2</sub> = 0 afirma que dos regresores no tienen efecto conjunto; H<sub>0</sub>: β<sub>1</sub> = β<sub>2</sub> = β<sub>3</sub> = 0, que tres quedan excluidos. No es equivalente a hacer tres contrastes t por separado: el <span class="concept" data-concept="f" tabindex="0" role="button">F</span> evalúa el aporte conjunto del grupo.'
        },
        {
          type: "formula",
          main: "F = [ (SCR<sub>R</sub> − SCR<sub>NR</sub>) / q ] / [ SCR<sub>NR</sub> / (n − k − 1) ] ~ F<sub>q, n−k−1</sub>",
          legend: [
            { key: "SCR<sub>R</sub>", text: "Suma de cuadrados residual del modelo restringido, que impone H₀." },
            { key: "SCR<sub>NR</sub>", text: "Suma de cuadrados residual del modelo no restringido, con todas las variables." },
            { key: "q", text: "Número de restricciones: la diferencia de grados de libertad entre ambos modelos." }
          ]
        },
        {
          type: "p",
          id: "c03-s08-p02",
          html: 'El modelo restringido impone H<sub>0</sub>; el no restringido incluye todas las variables. La SCR del restringido nunca puede ser menor que la del no restringido: al imponer restricciones se pierde ajuste. El F mide si esa pérdida es demasiado grande para atribuirla solo al azar. Los grados de libertad del denominador son los del modelo no restringido.'
        },
        {
          type: "formula",
          main: "F = [ (R<sup>2</sup><sub>NR</sub> − R<sup>2</sup><sub>R</sub>) / q ] / [ (1 − R<sup>2</sup><sub>NR</sub>) / (n − k − 1) ]",
          legend: [
            { key: "R²<sub>NR</sub>", text: "Coeficiente de determinación del modelo no restringido." },
            { key: "R²<sub>R</sub>", text: "Coeficiente del modelo restringido." },
            { key: "Condición", text: "Misma variable dependiente y mismo n en los dos modelos." }
          ]
        },
        {
          type: "p",
          id: "c03-s08-p03",
          html: 'El F que reporta la salida de una regresión es un caso especial: contrasta H<sub>0</sub>: β<sub>1</sub> = … = β<sub>k</sub> = 0, o sea, que ninguna pendiente aporta. Como el modelo restringido es solo el intercepto y su R² es cero, queda F = [R²/k] / [(1 − R²)/(n − k − 1)]. Rechazar no significa que todas las variables sean significativas: significa que al menos una lo es.'
        },
        {
          type: "cards",
          items: [
            { sym: "q", title: "Restricciones", text: "Cantidad de igualdades impuestas bajo H₀. Es la diferencia de grados de libertad entre los modelos." },
            { sym: "n − k − 1", title: "Denominador", text: "Grados de libertad del modelo no restringido, el que contiene todas las variables." },
            { sym: "F ≥ 0", title: "Siempre positivo", text: "La SCR restringida es mayor o igual que la no restringida; el cociente no puede ser negativo." }
          ]
        },
        {
          type: "callout",
          variant: "teal",
          label: "F significativo, t no significativos",
          html: "Es una combinación posible, sobre todo con regresores muy correlacionados. El F detecta que el grupo aporta en conjunto; los t individuales no logran separar qué variable aporta. No es una contradicción: son preguntas distintas."
        },
        {
          type: "miniCheck",
          id: "c03-check-08",
          question: "En un modelo con cuatro variables explicativas se contrasta H₀: β₃ = β₄ = 0. ¿Cuántas restricciones hay y cuántos grados de libertad tiene el denominador?",
          intro: "Contá las igualdades impuestas y los parámetros del modelo no restringido.",
          answer: "Hay q = 2 restricciones: β₃ = 0 y β₄ = 0. El modelo no restringido tiene k = 4 pendientes y n − 4 − 1 = n − 5 grados de libertad. El estadístico se distribuye F₂,ₙ₋₅."
        }
      ]
    },
    {
      id: "c03-s09",
      number: "09",
      title: "El multiplicador de Lagrange",
      blocks: [
        {
          type: "p",
          id: "c03-s09-p01",
          html: 'El <span class="concept" data-concept="lm" tabindex="0" role="button">multiplicador de Lagrange</span> (LM) es otra forma de contrastar restricciones de exclusión. La idea es indirecta: se estima el modelo restringido, se guardan sus residuos y se pregunta si esos residuos están correlacionados con las variables que se excluyeron. Si las variables omitidas importan, deberían explicar parte de lo que quedó en el residuo.'
        },
        {
          type: "formula",
          main: "ũ = residuos del modelo restringido &nbsp;→&nbsp; regresión auxiliar: ũ sobre X<sub>1</sub>, …, X<sub>k</sub> &nbsp;→&nbsp; LM = n R<sup>2</sup><sub>ũ</sub> ~ χ<sup>2</sup><sub>q</sub>",
          legend: [
            { key: "ũ", text: "Residuos del modelo que impone H₀, sin las variables excluidas." },
            { key: "R²<sub>ũ</sub>", text: "R² de la regresión auxiliar de los residuos sobre todas las X, incluidas las excluidas." },
            { key: "q", text: "Número de restricciones de exclusión. Son los grados de libertad de la chi-cuadrado." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "1", title: "Modelo restringido", text: "Se estima imponiendo H₀ y se guardan los residuos. No hace falta estimar el no restringido para calcular el estadístico." },
            { sym: "2", title: "Regresión auxiliar", text: "Se regresan los residuos sobre todas las X, incluidas las excluidas. Si no hay relación, el R² será bajo." },
            { sym: "3", title: "Decisión", text: "LM se compara con una chi-cuadrado con q grados de libertad. Valores grandes llevan a rechazar H₀." }
          ]
        },
        {
          type: "p",
          id: "c03-s09-p02",
          html: 'El LM es un contraste asintótico: no requiere normalidad exacta, pero sí muestras grandes y los supuestos de Gauss-Markov. Asintóticamente, F y LM tienen la misma probabilidad de error tipo I y suelen dar conclusiones parecidas. Con muestras chicas, el F es preferible porque tiene una distribución exacta bajo normalidad.'
        },
        {
          type: "callout",
          variant: "ochre",
          label: "La misma muestra en las dos regresiones",
          html: "El modelo restringido y la regresión auxiliar deben usar exactamente las mismas observaciones. Si al agregar variables se pierden casos por datos faltantes, el n cambia y el estadístico deja de ser comparable. Es el mismo cuidado que exige el F con modelos anidados."
        },
        {
          type: "miniCheck",
          id: "c03-check-09",
          question: "Si los residuos del modelo restringido no están correlacionados con las variables excluidas, ¿qué esperás del LM?",
          intro: "Pensá en el R² de la regresión auxiliar.",
          answer: "Un R² auxiliar cercano a cero y, por lo tanto, un LM cercano a cero. No habría evidencia de que las variables excluidas aporten para explicar lo que quedó en el residuo, y no se rechazaría H₀ de que sus coeficientes son conjuntamente cero."
        }
      ]
    },
    {
      id: "c03-s10",
      number: "10",
      title: "Normalidad asintótica y TCL",
      blocks: [
        {
          type: "p",
          id: "c03-s10-p01",
          html: 'La normalidad exacta de los errores es un supuesto fuerte. Si los errores no son normales, β̂ no tiene distribución normal exacta y los estadísticos t y F no siguen exactamente t y F. Sin embargo, cuando n crece, el teorema central del límite entra en juego: los estimadores son combinaciones lineales de errores y su distribución se aproxima a la normal.'
        },
        {
          type: "formula",
          main: "t<sub>n−k−1</sub> → N(0,1) cuando n → ∞ &nbsp;&nbsp;·&nbsp;&nbsp; ee(β̂<sub>j</sub>) se reduce a una tasa ≈ 1/√n",
          legend: [
            { key: "TCL", text: "La suma estandarizada de variables aleatorias independientes tiende a la normal." },
            { key: "Error estándar asintótico", text: "Es el ee calculado sin suponer normalidad exacta; se usa en muestras grandes." },
            { key: "Calidad", text: "La aproximación depende de n y de los grados de libertad; no es igual con 20 que con 2.000 observaciones." }
          ]
        },
        {
          type: "cards",
          items: [
            { sym: "TCL", title: "Teorema central del límite", text: "La suma estandarizada de variables aleatorias independientes tiende a la normal cuando n crece." },
            { sym: "LGN", title: "Ley de los grandes números", text: "Los momentos muestrales convergen en probabilidad a los poblacionales. Es la base de la consistencia." },
            { sym: "1/√n", title: "Velocidad", text: "Los errores estándar se reducen con la raíz del tamaño muestral. Cuadruplicar n reduce el ee a la mitad." }
          ]
        },
        {
          type: "p",
          id: "c03-s10-p02",
          html: 'En muestras grandes, los contrastes t y F son válidos asintóticamente aunque los errores no sean normales. Los errores estándar se llaman asintóticos y la aproximación mejora con n y con los grados de libertad. Pero hay un límite importante: la homocedasticidad sigue siendo necesaria para los errores estándar usuales. Con heterocedasticidad, t y F pueden ser inválidos por más grande que sea la muestra.'
        },
        {
          type: "callout",
          variant: "teal",
          label: "Muestras grandes no arreglan todo",
          html: "El TCL reemplaza la normalidad, no la exogeneidad. Si hay variables omitidas o endogeneidad, el estimador sigue siendo sesgado e inconsistente aunque n sea enorme. La normalidad asintótica mejora la forma de la distribución, no la identificación del parámetro."
        },
        {
          type: "miniCheck",
          id: "c03-check-10",
          question: "¿Por qué en una muestra grande podés usar t aunque los errores no sean normales?",
          intro: "Relacioná la distribución de β̂ con el teorema central del límite.",
          answer: "Porque el TCL garantiza que β̂ sea aproximadamente normal en muestras grandes, aunque los errores no sean normales. Entonces el estadístico t converge a una normal estándar y los valores críticos de la t son una aproximación razonable. La aproximación es asintótica y depende de n y de los grados de libertad. Además, se mantienen los supuestos de Gauss-Markov, en particular la homocedasticidad."
        }
      ]
    },
    {
      id: "c03-s11",
      number: "11",
      title: "Consistencia y sesgo asintótico",
      blocks: [
        {
          type: "p",
          id: "c03-s11-p01",
          html: 'La <span class="concept" data-concept="consistencia" tabindex="0" role="button">consistencia</span> es la propiedad mínima de un estimador: a medida que el tamaño de muestra crece, su distribución se concentra en el parámetro. El límite en probabilidad, o plim, es el valor al que converge. Bajo los supuestos de Gauss-Markov, MCO es consistente; si falla la exogeneidad, no lo es.'
        },
        {
          type: "formula",
          main: "plim β̂<sub>1</sub> = β<sub>1</sub> + Cov(X<sub>1</sub>, u) / Var(X<sub>1</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; sesgo asintótico = plim β̂<sub>1</sub> − β<sub>1</sub>",
          legend: [
            { key: "Cov = 0", text: "Si X₁ no está correlacionada con el error, el segundo término desaparece y el estimador es consistente." },
            { key: "Cov ≠ 0", text: "El sesgo no se diluye con más observaciones: se vuelve un sesgo asintótico." },
            { key: "Modelo múltiple", text: "La fórmula exacta es más compleja, pero la idea es la misma: importa la relación entre Xⱼ y u, descontadas las demás X." }
          ]
        },
        {
          type: "p",
          id: "c03-s11-p02",
          html: 'Si Cov(X<sub>1</sub>, u) = 0, el estimador converge al parámetro. Si no, el signo del sesgo depende del signo de la covarianza. En un modelo de salario, si la habilidad no observada está en u y la educación está correlacionada positivamente con ella, MCO sobreestima el efecto de la educación. Agregar más observaciones no corrige ese problema: lo hace más evidente.'
        },
        {
          type: "cards",
          items: [
            { sym: "plim", title: "Límite en probabilidad", text: "El valor al que converge el estimador cuando n → ∞. No es el promedio de una muestra finita." },
            { sym: "Consistencia", title: "plim β̂ = β", text: "La distribución se colapsa en el parámetro. Es una propiedad asintótica, no de una estimación concreta." },
            { sym: "Sesgo asintótico", title: "plim β̂ − β", text: "Lo que queda cuando la muestra crece. Si es distinto de cero, más datos no corrigen el problema." }
          ]
        },
        {
          type: "p",
          id: "c03-s11-p03",
          html: 'Insesgamiento y consistencia no son lo mismo. Un estimador puede ser insesgado y no consistente si su varianza no se reduce; otro puede ser sesgado en muestras finitas pero consistente si el sesgo desaparece con n. MCO bajo Gauss-Markov es insesgado y consistente. La distinción importa porque muchas propiedades deseables se definen en muestras grandes, mientras que la inferencia se hace con una muestra fija.'
        },
        {
          type: "callout",
          variant: "ochre",
          label: "Una muestra no demuestra consistencia",
          html: "Que β̂ esté lejos de β en tu muestra no prueba que el estimador sea inconsistente: puede ser variabilidad muestral. La consistencia se estudia como un experimento teórico con n → ∞. Lo que sí se puede diagnosticar en la muestra es si hay motivos para sospechar Cov(X, u) ≠ 0."
        },
        {
          type: "miniCheck",
          id: "c03-check-11",
          question: "Un investigador dice: “mi estimación cambió al agregar observaciones, entonces el estimador es inconsistente”. ¿Qué le respondés?",
          intro: "Distinguí variabilidad muestral de sesgo asintótico.",
          answer: "Que la comparación de dos muestras no prueba inconsistencia. Un cambio puede ser variabilidad muestral normal: β̂ es una variable aleatoria y distintas muestras dan valores distintos. La consistencia es una propiedad del límite cuando n → ∞. Si sospecha endogeneidad, el argumento debe basarse en la relación entre X y u, no en el cambio de una estimación."
        }
      ]
    },
    {
      id: "c03-s12",
      number: "12",
      title: "Errores frecuentes y mapa de la clase",
      blocks: [
        {
          type: "errorTable",
          rows: [
            {
              error: "Confundir el nivel de significación α con el valor p",
              why: "α se elige antes y fija la regla; p se calcula con los datos y mide la evidencia.",
              fix: "Decí “rechazo al 5%” y reportá el p por separado, sin tratarlos como sinónimos."
            },
            {
              error: "Decir que se “acepta” H₀",
              why: "La ausencia de evidencia no es evidencia de ausencia; el intervalo puede ser amplio.",
              fix: "Usá “no se rechaza” y agregá el intervalo de confianza y la potencia cuando importe."
            },
            {
              error: "Tratar la normalidad como un supuesto de Gauss-Markov",
              why: "G-M no impone una distribución; la normalidad es el supuesto adicional del MLC.",
              fix: "Separá insesgamiento y eficiencia de la distribución exacta de t y F."
            },
            {
              error: "Contrastar β₁ = β₂ comparando los t individuales",
              why: "La igualdad requiere el error estándar de la diferencia y la covarianza entre estimadores.",
              fix: "Reparametrizá el modelo o usá una combinación lineal de parámetros."
            },
            {
              error: "Interpretar un F significativo como que todas las variables son significativas",
              why: "El F contrasta el conjunto: rechaza que todas sean cero, no que cada una lo sea.",
              fix: "Mirá el F junto con los t y los intervalos de cada coeficiente."
            },
            {
              error: "Creer que una muestra grande corrige endogeneidad",
              why: "La consistencia requiere Cov(X, u) = 0; el TCL no arregla la identificación.",
              fix: "Revisá el diseño, las variables omitidas y los instrumentos antes de confiar en el n."
            }
          ]
        },
        {
          type: "map",
          steps: [
            { n: "1", title: "Escribir la hipótesis", text: "Un coeficiente, una combinación lineal o un conjunto de restricciones. Elegí t o F." },
            { n: "2", title: "Elegir el supuesto", text: "MLC para inferencia exacta; TCL para muestras grandes. Gauss-Markov se mantiene." },
            { n: "3", title: "Calcular el estadístico", text: "t, F o LM con errores estándar y grados de libertad correctos." },
            { n: "4", title: "Decidir e interpretar", text: "Compará con el valor crítico o el p; reportá magnitud, intervalo y límites causales." }
          ]
        },
        {
          type: "sourceStrip",
          chips: [
            { label: "Clase 3", text: "diap. 3–45" },
            { label: "Wooldridge 4ed", text: "Cap. 4–5" },
            { label: "TP 4", text: "inferencia" },
            { label: "Parciales", text: "1P 2024–2026" }
          ]
        }
      ]
    }
  ],

  concepts: {
    mlc: {
      title: "Modelo lineal clásico",
      sub: "Gauss-Markov más normalidad: la base de la inferencia exacta.",
      esencia: `
        <div class="definition">El modelo lineal clásico (MLC) es Gauss-Markov más un supuesto distribucional: u es independiente de X y se distribuye N(0, σ<sup>2</sup>). Bajo el MLC, β̂ | X es normal y los estadísticos t y F tienen distribuciones exactas.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La normalidad no es necesaria para el insesgamiento: eso ya lo da Gauss-Markov.</li>
          <li>Sirve para la distribución exacta de t y F en muestras chicas.</li>
          <li>Si el error es suma de muchos factores independientes, el TCL la vuelve plausible.</li>
        </ul>
        <div class="formula small">u | X ~ N(0, σ<sup>2</sup>)<span>Y | X ~ N(β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub>, σ<sup>2</sup>)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: qué agrega y qué no</span><span class="badge optional">Según el concepto: justificación por TCL</span></div>
      `,
      ejemplo: `
        <p>En un modelo de salario, el error reúne habilidad, contactos, calidad de la escuela y otros factores no observados. Si esos factores actúan de forma aditiva e independiente, su suma se parece a una normal. Si uno solo domina o si interactúan, la aproximación puede ser pobre.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Con 30 observaciones, la normalidad importa para los valores críticos. Con 3.000, el TCL suele alcanzar aunque los errores se alejen de la normal.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que sin normalidad MCO es sesgado.</strong> El insesgamiento depende de E(u | X) = 0, no de la forma de la distribución.</li>
          <li><strong>Creer que la normalidad corrige la heterocedasticidad.</strong> Son supuestos distintos: uno es la forma, el otro la varianza.</li>
          <li><strong>Confundir normalidad de u con normalidad marginal de Y.</strong> Lo que es normal es Y condicional a X; la distribución de Y sin condicionar puede no serlo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés separar qué propiedades dependen de Gauss-Markov y cuáles dependen de la normalidad.</p></div>
      `,
      conexiones: `
        <p>El MLC es el puente entre la estimación de la clase 2 y la inferencia de esta clase. También conecta con la consistencia, que no depende de la normalidad.</p>
        <div><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="ic">Intervalos →</button><button class="concept-chip" data-concept="consistencia">Consistencia →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 5–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2025, supuestos del MLC y consecuencia de errores no normales.</p></div>
      `
    },
    t: {
      title: "Estadístico t",
      sub: "La distancia entre la estimación y la hipótesis, medida en errores estándar.",
      esencia: `
        <div class="definition">Bajo el MLC y H<sub>0</sub>: β<sub>j</sub> = a, el estadístico t = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>) se distribuye t con n − k − 1 grados de libertad.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El numerador mide la distancia; el denominador, la precisión.</li>
          <li>Un t de 2 significa dos errores estándar, no dos unidades de Y.</li>
          <li>Los grados de libertad son n − k − 1, no n.</li>
        </ul>
        <div class="formula small">t = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>)<span>t ~ t<sub>n−k−1</sub> bajo H<sub>0</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: fórmula e interpretación</span><span class="badge optional">Según el concepto: una o dos colas</span></div>
      `,
      ejemplo: `
        <p>En el modelo de educación con WAGE2, β̂<sub>meduc</sub> = 0,131 y su error estándar es 0,033. El t contra cero es 0,131 / 0,033 ≈ 4,0: la estimación está cuatro errores estándar por encima de cero.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El mismo coeficiente con un error estándar de 0,13 tendría t ≈ 1,0 y no se distinguiría de cero al 5%. La precisión cambia la conclusión, no la magnitud estimada.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que un t grande implica un efecto grande.</strong> Depende de las unidades y del error estándar.</li>
          <li><strong>Usar z aunque σ sea desconocida.</strong> Al estimar σ² se usa t, no la normal estándar.</li>
          <li><strong>Usar n grados de libertad.</strong> Hay que descontar el intercepto y las k pendientes: n − k − 1.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué cambia el t si cambia la precisión aunque el coeficiente quede igual.</p></div>
      `,
      conexiones: `
        <p>El t es la pieza básica de los contrastes individuales y de los intervalos. También es la base del F cuando hay una sola restricción: F = t².</p>
        <div><button class="concept-chip" data-concept="valor-p">Valor p →</button><button class="concept-chip" data-concept="ic">Intervalos →</button><button class="concept-chip" data-concept="f">Estadístico F →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 11–14 y 17.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Actividad 2 y Ejercicio 1.</p></div>
      `
    },
    "valor-p": {
      title: "Valor p",
      sub: "La evidencia contra H₀, en una escala de probabilidad.",
      esencia: `
        <div class="definition">El valor p es la probabilidad de observar un estadístico al menos tan extremo como el de la muestra si H<sub>0</sub> fuera verdadera. Se rechaza H<sub>0</sub> cuando p < α.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>No es la probabilidad de que H₀ sea verdadera.</li>
          <li>Depende de n: con muestras grandes, efectos pequeños pueden dar p pequeños.</li>
          <li>Un p alto no prueba ausencia de efecto; indica poca evidencia contra H₀.</li>
        </ul>
        <div class="formula small">p = P(|T| ≥ |t<sub>obs</sub>| | H<sub>0</sub>)<span>Se compara con α, no con 0,05 por obligación</span></div>
        <div class="badge-row"><span class="badge always">Siempre: definición e interpretación</span><span class="badge optional">Según el concepto: una o dos colas</span></div>
      `,
      ejemplo: `
        <p>Si p = 0,03, significa que si H₀ fuera cierta, solo 3% de las muestras darían un estadístico tan o más extremo. Se rechaza al 5%, pero no al 1%. Es una medida de evidencia, no una medida del tamaño del efecto.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá el p junto con el coeficiente y el intervalo. Un p diminuto con un efecto irrelevante es una señal de muestra grande, no de importancia económica.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“p = 0,03 significa 3% de probabilidad de que H₀ sea cierta”.</strong> Es P(datos | H₀), no P(H₀ | datos).</li>
          <li><strong>“p > 0,05 significa que no hay efecto”.</strong> Solo indica que no se rechazó; el intervalo puede contener efectos relevantes.</li>
          <li><strong>Comparar valores p entre modelos con distintas muestras o variables dependientes.</strong> La escala no es comparable de ese modo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué probabilidad se calcula exactamente bajo H₀.</p></div>
      `,
      conexiones: `
        <p>El valor p traduce el t a una escala de evidencia. Se complementa con la potencia, porque un p alto puede reflejar baja potencia más que ausencia de efecto.</p>
        <div><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="potencia">Potencia →</button><button class="concept-chip" data-concept="ic">Intervalos →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 15–16.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Actividad 2b.</p></div>
      `
    },
    potencia: {
      title: "Errores y potencia",
      sub: "α, β y la probabilidad de detectar un efecto real.",
      esencia: `
        <div class="definition">α es la probabilidad de rechazar H<sub>0</sub> cuando es verdadera —error tipo I—; β es la probabilidad de no rechazarla cuando es falsa —error tipo II—; la potencia es 1 − β.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Bajar α reduce falsos positivos, pero también la potencia para un n fijo.</li>
          <li>La potencia crece con el efecto, con n y con la precisión; cae con el ruido.</li>
          <li>No rechazar no es lo mismo que aceptar H₀.</li>
        </ul>
        <div class="formula small">Potencia = P(rechazar H<sub>0</sub> | H<sub>0</sub> falsa) = 1 − β<span>α = P(rechazar H<sub>0</sub> | H<sub>0</sub> verdadera)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: definiciones y trade-off</span><span class="badge optional">Según el concepto: cálculo de potencia</span></div>
      `,
      ejemplo: `
        <p>Un estudio con 25 observaciones busca un efecto moderado. Si el error estándar es grande, el contraste tiene poca potencia: aunque el efecto exista, es probable que no se rechace H₀. El mismo efecto con 500 observaciones puede volverse significativo.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de interpretar un “no significativo”, preguntate si el diseño tenía capacidad para detectar un efecto de ese tamaño.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que α es la probabilidad de que H₀ sea cierta.</strong> α es una probabilidad condicional a H₀ verdadera.</li>
          <li><strong>Decir que potencia = 1 − α.</strong> La potencia depende del efecto, de n y de σ; no solo del nivel de significación.</li>
          <li><strong>Ignorar el error tipo II.</strong> Un resultado no significativo puede ser un falso negativo.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué subir n mejora la potencia sin cambiar α.</p></div>
      `,
      conexiones: `
        <p>La potencia es la contracara del valor p: explica por qué un contraste puede no detectar un efecto real. También se conecta con la amplitud de los intervalos.</p>
        <div><button class="concept-chip" data-concept="valor-p">Valor p →</button><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="ic">Intervalos →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 10.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Actividad 2a.</p></div>
      `
    },
    ic: {
      title: "Intervalo de confianza",
      sub: "Un rango de valores compatibles con los datos.",
      esencia: `
        <div class="definition">Un IC al (1 − α)% para β<sub>j</sub> es β̂<sub>j</sub> ± t<sub>α/2, n−k−1</sub> · ee(β̂<sub>j</sub>). En muestreo repetido, el (1 − α)% de los intervalos así construidos contiene al parámetro.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El centro es la estimación y el margen depende de la precisión y del nivel.</li>
          <li>No es “la probabilidad de que β esté en este intervalo concreto”.</li>
          <li>Un IC al 95% que no contiene a 0 equivale a rechazar H₀ bilateral al 5%.</li>
        </ul>
        <div class="formula small">β̂<sub>j</sub> ± t<sub>α/2, n−k−1</sub> · ee(β̂<sub>j</sub>)<span>Amplitud = 2 · t<sub>α/2</sub> · ee</span></div>
        <div class="badge-row"><span class="badge always">Siempre: construcción e interpretación</span><span class="badge optional">Según el concepto: relación con el contraste</span></div>
      `,
      ejemplo: `
        <p>En WAGE2, el efecto de la educación del padre es 0,210 con IC al 95% [0,156; 0,264]. El intervalo no contiene cero y es relativamente angosto: hay evidencia de un efecto positivo y la magnitud está acotada.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El intervalo es más informativo que el p: dice qué magnitudes son plausibles. Un intervalo muy amplio obliga a moderar cualquier conclusión.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“Hay 95% de probabilidad de que β esté en este intervalo”.</strong> En la interpretación frecuentista, β es fijo; el intervalo es aleatorio.</li>
          <li><strong>Comparar dos coeficientes mirando si sus IC se solapan.</strong> La comparación correcta usa la varianza de la diferencia y la covarianza.</li>
          <li><strong>Creer que un intervalo angosto prueba causalidad.</strong> La precisión no corrige la endogeneidad.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar qué significa “95%” en la construcción del intervalo.</p></div>
      `,
      conexiones: `
        <p>El IC es el mismo contraste t expresado como rango. También se usa para juzgar la importancia económica y para comparar magnitudes.</p>
        <div><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="combinacion">Combinaciones →</button><button class="concept-chip" data-concept="f">Estadístico F →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 18.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Ej. 1g, 2b y 4h.</p></div>
      `
    },
    combinacion: {
      title: "Combinación lineal de parámetros",
      sub: "Contrastar diferencias y sumas, no solo coeficientes individuales.",
      esencia: `
        <div class="definition">Una combinación lineal es θ = a<sub>1</sub>β<sub>1</sub> + … + a<sub>k</sub>β<sub>k</sub>. Se estima con θ̂ y se contrasta con t = (θ̂ − θ<sub>0</sub>) / ee(θ̂), que se distribuye t con n − k − 1 grados de libertad.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El error estándar de la diferencia no es la suma de los errores estándar.</li>
          <li>La covarianza entre estimadores puede reducir o aumentar la varianza de la diferencia.</li>
          <li>Reparametrizar el modelo permite leer el contraste directamente en la salida.</li>
        </ul>
        <div class="formula small">Var(β̂<sub>1</sub> − β̂<sub>2</sub>) = Var(β̂<sub>1</sub>) + Var(β̂<sub>2</sub>) − 2 Cov(β̂<sub>1</sub>, β̂<sub>2</sub>)<span>t = (β̂<sub>1</sub> − β̂<sub>2</sub>) / ee(β̂<sub>1</sub> − β̂<sub>2</sub>)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: varianza de la diferencia</span><span class="badge optional">Según el concepto: reparametrización</span></div>
      `,
      ejemplo: `
        <p>En WAGE2, β̂<sub>meduc</sub> − β̂<sub>feduc</sub> = −0,079 con ee = 0,053. El t es −1,50 y el p es 0,135: no hay evidencia suficiente para afirmar que la educación de la madre y la del padre tengan efectos distintos al 5%.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La no significación no prueba igualdad: el IC de la diferencia va de −0,183 a 0,025 y contiene valores distintos de cero.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Sumar los errores estándar.</strong> Es incorrecto: hay que incorporar la covarianza.</li>
          <li><strong>Concluir igualdad porque ambos t son significativos.</strong> La igualdad se contrasta con la diferencia, no con cada coeficiente por separado.</li>
          <li><strong>Interpretar “no significativo” como “son iguales”.</strong> Es ausencia de evidencia, no prueba de igualdad.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés escribir la varianza de β̂₁ − β̂₂ sin omitir la covarianza.</p></div>
      `,
      conexiones: `
        <p>Las combinaciones lineales generalizan el t individual. El F, a su vez, generaliza el contraste a varias restricciones simultáneas.</p>
        <div><button class="concept-chip" data-concept="ic">Intervalos →</button><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="f">Estadístico F →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 19–22.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Ej. 4k–l.</p></div>
      `
    },
    f: {
      title: "Estadístico F",
      sub: "El contraste conjunto de varias restricciones lineales.",
      esencia: `
        <div class="definition">El F compara la SCR del modelo restringido con la del no restringido: F = [(SCR<sub>R</sub> − SCR<sub>NR</sub>)/q] / [SCR<sub>NR</sub>/(n − k − 1)]. Bajo H<sub>0</sub> y el MLC se distribuye F<sub>q, n−k−1</sub>.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>q es el número de restricciones, no el número de variables del modelo.</li>
          <li>Los modelos deben estar anidados, con la misma Y y el mismo n.</li>
          <li>El F de la salida es el caso especial H₀: todas las pendientes son cero.</li>
        </ul>
        <div class="formula small">F = [(R²<sub>NR</sub> − R²<sub>R</sub>)/q] / [(1 − R²<sub>NR</sub>)/(n − k − 1)]<span>Con una sola restricción, F = t²</span></div>
        <div class="badge-row"><span class="badge always">Siempre: fórmula y grados de libertad</span><span class="badge optional">Según el concepto: forma R²</span></div>
      `,
      ejemplo: `
        <p>En un modelo con cuatro variables, H₀: β₃ = β₄ = 0 tiene q = 2 restricciones y se contrasta con F₂,ₙ₋₅. Rechazar indica que al menos una de las dos aporta; no dice cuál ni que ambas sean significativas.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Un F alto con t individuales bajos sugiere regresores correlacionados: el grupo aporta, pero cuesta separar efectos.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“F significativo implica que todos los coeficientes son distintos de cero”.</strong> Solo implica que al menos uno lo es.</li>
          <li><strong>Usar el F con modelos no anidados o con distinta Y.</strong> La comparación deja de ser válida.</li>
          <li><strong>Contar q como k.</strong> q son las restricciones impuestas, que pueden ser menos que las variables.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés identificar q y los grados de libertad del denominador en una hipótesis concreta.</p></div>
      `,
      conexiones: `
        <p>El F generaliza el t a restricciones múltiples. El LM ofrece una alternativa asintótica cuando no se quiere estimar el modelo no restringido.</p>
        <div><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="lm">LM →</button><button class="concept-chip" data-concept="combinacion">Combinaciones →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 23–29.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.5.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024 y 1P 2026, F basado en R² y en SCR.</p></div>
      `
    },
    lm: {
      title: "Multiplicador de Lagrange",
      sub: "Un contraste asintótico de restricciones de exclusión.",
      esencia: `
        <div class="definition">Se estima el modelo restringido, se guardan sus residuos ũ y se regresan sobre todas las X. El estadístico es LM = n R²<sub>ũ</sub>, que bajo H<sub>0</sub> se distribuye asintóticamente χ²<sub>q</sub>.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El R² es el de la regresión auxiliar de los residuos, no el del modelo original.</li>
          <li>q es el número de variables excluidas bajo H₀.</li>
          <li>Es asintótico: requiere muestras grandes y los supuestos de Gauss-Markov.</li>
        </ul>
        <div class="formula small">LM = n R²<sub>ũ</sub> ~ χ²<sub>q</sub><span>ũ: residuos del modelo restringido</span></div>
        <div class="badge-row"><span class="badge always">Siempre: pasos y distribución</span><span class="badge optional">Según el concepto: comparación con F</span></div>
      `,
      ejemplo: `
        <p>Para H₀: β₃ = β₄ = 0 en un modelo con cuatro variables, se estima el modelo sin X₃ ni X₄, se guardan los residuos y se regresan sobre X₁, X₂, X₃ y X₄. Si X₃ y X₄ explican esos residuos, el LM rechaza H₀.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Es útil cuando solo se estimó el modelo restringido o cuando se quiere una alternativa asintótica al F. Con muestras chicas, el F es más confiable.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar muestras distintas en las dos regresiones.</strong> El n debe ser exactamente el mismo.</li>
          <li><strong>Tratar el LM como un test exacto.</strong> Su distribución es asintótica; en muestras chicas puede diferir del F.</li>
          <li><strong>Confundir el R² auxiliar con el R² del modelo original.</strong> Miden cosas distintas.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué se regresan los residuos del modelo restringido sobre las variables excluidas.</p></div>
      `,
      conexiones: `
        <p>El LM y el F responden la misma pregunta con lógicas distintas: uno es exacto bajo normalidad, el otro es asintótico. Ambos se apoyan en los supuestos de Gauss-Markov.</p>
        <div><button class="concept-chip" data-concept="f">Estadístico F →</button><button class="concept-chip" data-concept="mlc">MLC →</button><button class="concept-chip" data-concept="consistencia">Consistencia →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 33–35.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §5.2.</p></div>
      `
    },
    consistencia: {
      title: "Consistencia y plim",
      sub: "Qué pasa con el estimador cuando la muestra crece.",
      esencia: `
        <div class="definition">Un estimador es consistente si plim β̂ = β: cuando n → ∞, su distribución se concentra en el parámetro. En el modelo simple, plim β̂<sub>1</sub> = β<sub>1</sub> + Cov(X<sub>1</sub>, u)/Var(X<sub>1</sub>).</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Si Cov(X, u) = 0, el estimador es consistente; si no, hay sesgo asintótico.</li>
          <li>Más observaciones no corrigen un problema de endogeneidad.</li>
          <li>Insesgamiento y consistencia son propiedades distintas.</li>
        </ul>
        <div class="formula small">plim β̂<sub>1</sub> = β<sub>1</sub> + Cov(X<sub>1</sub>, u) / Var(X<sub>1</sub>)<span>Sesgo asintótico = plim β̂<sub>1</sub> − β<sub>1</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: definición de plim</span><span class="badge optional">Según el concepto: sesgo asintótico</span></div>
      `,
      ejemplo: `
        <p>En un modelo de salario, la habilidad no observada queda en u. Si la educación está correlacionada positivamente con la habilidad, Cov(educ, u) > 0 y MCO sobreestima el efecto de la educación incluso con muestras enormes.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La consistencia es un requisito mínimo: un estimador inconsistente no se vuelve correcto por acumular datos. El diseño importa más que el tamaño.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“Con una muestra grande desaparece el sesgo por omisión”.</strong> Solo desaparece si Cov(X, u) = 0.</li>
          <li><strong>“Si β̂ está lejos de β, el estimador es inconsistente”.</strong> Una estimación concreta no prueba una propiedad asintótica.</li>
          <li><strong>Confundir consistencia con insesgamiento.</strong> Un estimador puede ser sesgado y consistente, o insesgado y no consistente.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el TCL no arregla la endogeneidad.</p></div>
      `,
      conexiones: `
        <p>La consistencia cierra la clase: conecta los supuestos de Gauss-Markov con el comportamiento en muestras grandes y con el sesgo asintótico. También explica los límites de la inferencia asintótica.</p>
        <div><button class="concept-chip" data-concept="mlc">MLC →</button><button class="concept-chip" data-concept="f">Estadístico F →</button><button class="concept-chip" data-concept="ic">Intervalos →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3, diap. 39–44.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §5.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2026, interpretación del límite de probabilidad.</p></div>
      `
    }
  },

  practice: {
    eyebrow: "De la teoría a la guía",
    title: "Práctica de la clase",
    intro: "La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto. Empezá por las actividades conceptuales y después usá el TP 4 para leer contrastes t, F e intervalos con datos reales.",
    guideHref: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-4",
    exercises: [
      {
        label: "TP 4 · Act. 1",
        title: "Verdadero o falso",
        text: "Poné a prueba las relaciones entre t y F, el valor p unilateral y bilateral, y el efecto de la varianza sobre la precisión y los intervalos.",
        tags: ["Conceptual", "V/F"],
        href: "guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-3"
      },
      {
        label: "TP 4 · Act. 2",
        title: "Errores, potencia y elección del estadístico",
        text: "Definí error tipo I, error tipo II y potencia; diferenciá nivel de significación y valor p; elegí t o F según la hipótesis.",
        tags: ["Conceptual", "Potencia"],
        href: "guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-1"
      },
      {
        label: "TP 4 · Ej. 1",
        title: "Contrastes t y F con datos de demanda",
        text: "Estimá el modelo, interpretá los contrastes individuales y conjunto, y construí los intervalos de confianza al 95% para los parámetros.",
        tags: ["Aplicar", "DEMANDA"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-3"
      },
      {
        label: "TP 4 · Ej. 2",
        title: "Inferencia sobre el gasto de los hogares",
        text: "Volvé al modelo del TP 3, interpretá t y F, construí intervalos y compará qué cambia al agregar CANTOCUP.",
        tags: ["Aplicar", "ENGHO"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-3"
      },
      {
        label: "TP 4 · Ej. 4",
        title: "Educación, padres y hermanos",
        text: "Estimá el modelo con WAGE2, interpretá t y F, calculá intervalos y contrastá si la educación de la madre y del padre tienen el mismo efecto.",
        tags: ["Aplicar", "WAGE2"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-3"
      },
      {
        label: "TP 4 · Ej. 5",
        title: "¿Elegir el modelo por R²?",
        text: "Analizá si el mayor R² justifica quitar el intercepto. Discutí supuestos, interpretación y comparabilidad de los modelos.",
        tags: ["Razonar", "R²"],
        href: "guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-5-3"
      }
    ],
    rLab: {
      eyebrow: "Laboratorio de lectura",
      tag: "TP 4 · Ej. 4",
      title: "Cómo se lee una salida de inferencia",
      intro: "La salida del TP 4, Ej. 4, permite leer en una sola tabla un contraste individual, un contraste conjunto, intervalos de confianza y una comparación entre coeficientes. Es el laboratorio natural para esta clase.",
      dataNote: "La salida usa la base WAGE2: educación de la persona en función de la educación de la madre, la del padre y la cantidad de hermanos. La base tiene 935 observaciones, pero meduc y feduc tienen datos faltantes: R estima con 722 y elimina 213. El n efectivo es parte del resultado.",
      script: `load("WAGE2.rda")

modelo <- lm(educ ~ meduc + feduc + sibs, data = wage2)
summary(modelo)
confint(modelo)

# El contraste β_meduc = β_feduc, directo desde la salida:
modelo_repar <- lm(educ ~ meduc + I(meduc + feduc) + sibs, data = wage2)
summary(modelo_repar)`,
      output: `Call:
lm(formula = educ ~ meduc + feduc + sibs, data = wage2)

Residuals:
    Min      1Q  Median      3Q     Max 
-4.0906 -1.5957 -0.3677  1.6138  5.6103 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 10.36426    0.35850  28.910  < 2e-16 ***
meduc        0.13079    0.03269   4.001 6.96e-05 ***
feduc        0.21000    0.02747   7.644 6.79e-14 ***
sibs        -0.09364    0.03447  -2.716  0.00676 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.987 on 718 degrees of freedom
  (213 observations deleted due to missingness)
Multiple R-squared:  0.2141,	Adjusted R-squared:  0.2108 
F-statistic: 65.2 on 3 and 718 DF,  p-value: < 2.2e-16

> modelo_repar <- lm(educ ~ meduc + I(meduc + feduc) + sibs, data = wage2)
> summary(modelo_repar)

Call:
lm(formula = educ ~ meduc + I(meduc + feduc) + sibs, data = wage2)

Residuals:
    Min      1Q  Median      3Q     Max 
-4.0906 -1.5957 -0.3677  1.6138  5.6103 

Coefficients:
                 Estimate Std. Error t value Pr(>|t|)    
(Intercept)      10.36426    0.35850  28.910  < 2e-16 ***
meduc            -0.07922    0.05299  -1.495    0.135    
I(meduc + feduc)  0.21000    0.02747   7.644 6.79e-14 ***
sibs             -0.09364    0.03447  -2.716  0.00676 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 1.987 on 718 degrees of freedom
  (213 observations deleted due to missingness)
Multiple R-squared:  0.2141,	Adjusted R-squared:  0.2108 
F-statistic: 65.2 on 3 and 718 DF,  p-value: < 2.2e-16`,
      confint: `                 2.5 %     97.5 %
(Intercept)  9.6604222 11.0680898
meduc        0.0666098  0.1949646
feduc        0.1560635  0.2639447
sibs        -0.1613124 -0.0259594`,
      readingTable: [
        { element: "Estimate", meaning: "Coeficiente estimado.", how: "Mide el cambio esperado en educ ante una unidad más de la variable, manteniendo las demás constantes." },
        { element: "Std. Error", meaning: "Error estándar del estimador.", how: "Mide la precisión. Es el denominador del estadístico t y la base de la amplitud del intervalo." },
        { element: "t value", meaning: "Estimate / Std. Error.", how: "Distancia estandarizada a cero. No mide el tamaño del efecto en unidades de educ." },
        { element: "Pr(>|t|)", meaning: "Valor p del contraste bilateral.", how: "Probabilidad de un t al menos tan extremo si H₀ fuera cierta. Se compara con α." },
        { element: "Residual standard error", meaning: "σ̂, dispersión residual.", how: "Resume el ruido del modelo. Entra en todos los errores estándar." },
        { element: "Multiple R-squared", meaning: "Proporción de variación explicada.", how: "0,2141: el modelo explica 21,4% de la variación de educ. No prueba significancia ni causalidad." },
        { element: "Adjusted R-squared", meaning: "R² corregido por grados de libertad.", how: "Penaliza variables adicionales; sirve para comparar modelos con la misma Y." },
        { element: "F-statistic", meaning: "Contraste conjunto.", how: "H₀: todas las pendientes son cero. Rechazar indica que al menos una aporta." },
        { element: "confint()", meaning: "Intervalos al 95%.", how: "Si el intervalo no contiene 0, se rechaza H₀ bilateral al 5%. También muestra magnitudes plausibles." },
        { element: "I(meduc + feduc)", meaning: "Modelo reparametrizado.", how: "El coeficiente de meduc pasa a ser β_meduc − β_feduc. Su t contrasta directamente la igualdad." },
        { element: "Observations deleted", meaning: "Casos con datos faltantes.", how: "La inferencia usa 722 observaciones, no 935. Si cambia el n entre modelos, la comparación puede no ser válida." }
      ],
      econometric: `
        <p><strong>β̂<sub>meduc</sub> = 0,131; t = 4,00; p &lt; 0,001.</strong> Un año más de educación de la madre se asocia con 0,131 años más de educación de la persona, manteniendo constantes la educación del padre y la cantidad de hermanos. El efecto es estadísticamente distinto de cero al 5%.</p>
        <p><strong>β̂<sub>feduc</sub> = 0,210; t = 7,64; p &lt; 0,001.</strong> El efecto estimado del padre es mayor, pero la comparación directa entre ambos requiere el error estándar de la diferencia, no una lectura a ojo de los coeficientes.</p>
        <p><strong>β̂<sub>sibs</sub> = −0,094; t = −2,72; p = 0,007.</strong> Cada hermano adicional se asocia con 0,094 años menos de educación, con las demás variables constantes. Es significativo, aunque la magnitud es pequeña.</p>
        <p><strong>F = 65,2; p &lt; 2,2 × 10<sup>−16</sup>.</strong> En conjunto, meduc, feduc y sibs explican educ. El F no dice cuál de las tres variables aporta ni que todas sean igual de relevantes.</p>
        <p><strong>R² = 0,2141; R² ajustado = 0,2108.</strong> El modelo explica 21,4% de la variación de educ. El resto queda en factores no incluidos: habilidad, escuela, ingresos familiares, entorno.</p>
        <p><strong>Reestimación:</strong> el coeficiente de meduc pasa a −0,079 con t = −1,50 y p = 0,135. Ya no estima el efecto de la madre: estima la diferencia β<sub>meduc</sub> − β<sub>feduc</sub>. El contraste no rechaza la igualdad de efectos al 5%.</p>
      `,
      economic: `
        <p>Los tres coeficientes tienen los signos esperados: más educación de los padres se asocia con más educación de los hijos; más hermanos, con menos. La lectura es condicional: compara personas con el mismo valor de las otras variables incluidas, no establece causalidad.</p>
        <p>La magnitud de sibs invita a una cuenta útil: si se quisiera una reducción de un año en la educación predicha manteniendo constantes meduc y feduc, haría falta un aumento de 1 / 0,0936 ≈ 10,7 hermanos. Es una forma de mostrar que “significativo” no es sinónimo de “económicamente grande”.</p>
        <p>Con el modelo, una persona con 12 años de educación de la madre, 12 del padre y sin hermanos tiene una predicción de 14,45 años. Otra con 14 de la madre, 16 del padre y dos hermanos tiene 15,37 años. La diferencia es de unos 0,91 años, no de dos ni de tres: los coeficientes son pendientes parciales, no reglas aditivas simples.</p>
        <p>Nada de esto identifica el efecto causal de la educación de los padres. La habilidad y el nivel socioeconómico no observados pueden estar correlacionados con las tres variables y quedar en el error. La inferencia describe asociaciones condicionales precisas; la causalidad exige un diseño adicional.</p>
      `,
      errors: [
        "Decir que meduc y feduc no afectan porque el R² es 0,21. El R² mide ajuste, no significancia; ambos coeficientes tienen t alto.",
        "Concluir que feduc importa más que meduc solo porque su coeficiente es mayor. Hay que contrastar la diferencia con su error estándar y su intervalo.",
        "Interpretar los coeficientes como efectos causales. La base es observacional y hay variables omitidas relevantes.",
        "Ignorar los 213 casos eliminados por datos faltantes. El n efectivo es 722 y debe reportarse; comparar modelos con distinto n puede invalidar el F.",
        "Leer el p-valor como probabilidad de que H₀ sea verdadera. El p es P(datos | H₀), no P(H₀ | datos).",
        "Creer que un coeficiente no significativo prueba que el efecto es cero. El intervalo de la diferencia incluye valores distintos de cero."
      ],
      checklist: [
        "Reportá el n efectivo y los casos perdidos por datos faltantes.",
        "Presentá cada coeficiente con error estándar, t, p e intervalo al 95%.",
        "Interpretá la magnitud en unidades de la variable dependiente, no solo la significancia.",
        "Distinguí el contraste individual (t) del conjunto (F).",
        "Para comparar dos coeficientes, usá la diferencia y su error estándar; no compares t ni intervalos a ojo.",
        "Separá asociación condicional de causalidad y mencioná las variables omitidas."
      ]
    },
    partials: [
      {
        label: "1P 2024",
        text: "Diferencias entre H₀: β₁ = 1 y H₀: β₁ = β₂ = 0; F basado en R² para distintas restricciones; distribución exacta versus asintótica."
      },
      {
        label: "1P 2025",
        text: "Supuestos de Gauss-Markov y del MLC; qué cambia en la inferencia con errores no normales y con muestras grandes."
      },
      {
        label: "1P 2026",
        text: "Por qué la inferencia requiere más que esperanza y varianza; F basado en R² y en SCR; interpretación del plim."
      }
    ]
  },

  assessment: {
    eyebrow: "Autoevaluación",
    title: "Preguntas de razonamiento",
    intro: "Las preguntas apuntan a distinguir supuestos de distribución, contrastes individuales de conjuntos y significancia estadística de importancia económica. Respondé antes de abrir la solución.",
    questions: [
      {
        q: "¿Por qué para hacer inferencia no alcanza con conocer E(β̂) y Var(β̂)?",
        a: "Porque esos son solo los dos primeros momentos de la distribución muestral. Para calcular valores p, valores críticos e intervalos se necesita la forma completa de la distribución. Gauss-Markov garantiza insesgamiento y eficiencia, pero no una forma funcional; el MLC agrega normalidad y, en muestras grandes, el TCL da una aproximación."
      },
      {
        q: "¿Qué agrega el modelo lineal clásico a los supuestos de Gauss-Markov? ¿Qué permite y qué no corrige?",
        a: "Agrega que u es independiente de las X y se distribuye normal con media cero y varianza constante. Permite que β̂ tenga distribución normal y que t y F tengan distribuciones exactas en muestras chicas. No corrige endogeneidad, variables omitidas ni heterocedasticidad, y no es necesario para el insesgamiento."
      },
      {
        q: "Escribí el estadístico t para H₀: βⱼ = a e indicá su distribución y sus grados de libertad.",
        a: "t = (β̂ⱼ − a) / ee(β̂ⱼ). Bajo el MLC y H₀ se distribuye t con n − k − 1 grados de libertad, donde k es la cantidad de pendientes y 1 es el intercepto. En regresión simple, n − 2."
      },
      {
        q: "¿Cuál es la diferencia entre el nivel de significación α y el valor p?",
        a: "α se elige antes de mirar los datos y fija la probabilidad máxima de error tipo I. El valor p se calcula con los datos y es la probabilidad de obtener un estadístico al menos tan extremo como el observado si H₀ fuera verdadera. Se rechaza si p < α, pero no son la misma cosa."
      },
      {
        q: "Definí error tipo I, error tipo II y potencia. ¿Qué pasa con la potencia si baja α o si sube n?",
        a: "Error tipo I: rechazar H₀ cuando es verdadera, con probabilidad α. Error tipo II: no rechazar H₀ cuando es falsa, con probabilidad β. Potencia: 1 − β, la probabilidad de detectar un efecto real. Si baja α, la potencia baja para un n fijo; si sube n, la potencia sube porque el error estándar se reduce."
      },
      {
        q: "¿Cómo se interpreta un intervalo de confianza al 95%? ¿Qué relación tiene con el contraste bilateral al 5%?",
        a: "En muestreo repetido, el 95% de los intervalos construidos del mismo modo contiene al parámetro. No es la probabilidad de que β esté en este intervalo concreto. En un contraste bilateral al 5%, H₀: βⱼ = a se rechaza si y solo si a queda fuera del intervalo al 95%."
      },
      {
        q: "¿Cómo se contrasta H₀: β₁ = β₂ y por qué no alcanza con comparar los t individuales?",
        a: "Se define θ = β₁ − β₂ y se usa t = θ̂ / ee(θ̂), con Var(θ̂) = Var(β̂₁) + Var(β̂₂) − 2Cov(β̂₁, β̂₂). Comparar los t individuales no responde la pregunta: dos coeficientes pueden ser significativos y no ser distintos entre sí. La covarianza entre estimadores afecta el error estándar de la diferencia."
      },
      {
        q: "En un modelo con cuatro variables se contrasta H₀: β₃ = β₄ = 0. Escribí el F basado en SCR y en R², e indicá q y los grados de libertad.",
        a: "F = [(SCR_R − SCR_NR)/q] / [SCR_NR/(n − k − 1)] = [(R²_NR − R²_R)/q] / [(1 − R²_NR)/(n − k − 1)]. Hay q = 2 restricciones; el modelo no restringido tiene k = 4 pendientes, así que el denominador tiene n − 5 grados de libertad. El estadístico se distribuye F₂,ₙ₋₅ bajo H₀ y normalidad."
      },
      {
        q: "¿Por qué un F significativo no implica que todos los coeficientes sean distintos de cero?",
        a: "Porque el F contrasta el conjunto: H₀ dice que todos los coeficientes del grupo son cero; la alternativa es que al menos uno sea distinto de cero. Rechazar indica que el grupo aporta, no que cada variable aporte por separado. Con regresores correlacionados, un F alto puede convivir con t individuales no significativos."
      },
      {
        q: "Describí los pasos del contraste LM y su distribución. ¿Cuándo preferís F y cuándo LM?",
        a: "Se estima el modelo restringido, se guardan los residuos, se regresan sobre todas las X —incluidas las excluidas— y se calcula LM = nR²_ũ, que bajo H₀ se distribuye asintóticamente χ²_q. Se prefiere F con muestras chicas porque es exacto bajo normalidad; LM es útil con muestras grandes o cuando solo se estima el modelo restringido."
      },
      {
        q: "¿Por qué en una muestra grande se puede usar t aunque los errores no sean normales? ¿Qué supuestos siguen siendo necesarios?",
        a: "Por el teorema central del límite: β̂ es aproximadamente normal en muestras grandes y el estadístico t converge a una normal estándar. La aproximación depende de n y de los grados de libertad. Siguen siendo necesarios los supuestos de Gauss-Markov, en particular E(u|X) = 0 y homocedasticidad; el TCL no corrige endogeneidad ni errores con varianza no constante."
      },
      {
        q: "¿Qué significa que un estimador sea consistente? ¿Por qué una muestra grande no corrige el sesgo por omisión?",
        a: "Significa que plim β̂ = β: cuando n → ∞, la distribución se concentra en el parámetro. Si Cov(X, u) ≠ 0, plim β̂ = β + Cov(X,u)/Var(X), así que aparece un sesgo asintótico que no desaparece al aumentar n. El tamaño de muestra reduce la varianza, no la correlación entre X y el error."
      },
      {
        q: "Un coeficiente es significativo al 5% pero su efecto es minúsculo. ¿Cómo puede ser? ¿Qué reportarías además del p?",
        a: "La significancia depende del cociente entre el coeficiente y su error estándar. Con una muestra grande, el error estándar se reduce y un efecto pequeño puede volverse significativo. Además del p, reportaría la magnitud del coeficiente en sus unidades, el intervalo de confianza y una evaluación de relevancia económica."
      }
    ]
  },

  review: {
    eyebrow: "Cierre y consolidación",
    title: "Kit de repaso y sesión de 90 minutos",
    intro: "Empezá por el formulario, seguí con el drill y la sesión, y cerrá con el plan de 7 días. La idea es repasar sin volver a leer todo desde cero.",
    formulas: [
      { title: "Modelo lineal clásico", eq: "u | X ~ N(0, σ<sup>2</sup>)", note: "Gauss-Markov más normalidad. Permite inferencia exacta en muestras chicas." },
      { title: "Distribución de β̂", eq: "β̂<sub>j</sub> | X ~ N(β<sub>j</sub>, Var(β̂<sub>j</sub>))", note: "Bajo el MLC. La media es el parámetro y la varianza depende de σ² y de X." },
      { title: "Estadístico t", eq: "t = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>)", note: "Se distribuye t con n − k − 1 grados de libertad bajo H₀ y normalidad." },
      { title: "Valor p", eq: "p = P(|T| ≥ |t<sub>obs</sub>| | H<sub>0</sub>)", note: "Se rechaza H₀ si p < α. No es P(H₀ | datos)." },
      { title: "Intervalo de confianza", eq: "β̂<sub>j</sub> ± t<sub>α/2, n−k−1</sub> · ee(β̂<sub>j</sub>)", note: "En muestreo repetido, el (1 − α)% de los intervalos contiene al parámetro." },
      { title: "Varianza de una diferencia", eq: "Var(β̂<sub>1</sub> − β̂<sub>2</sub>) = Var(β̂<sub>1</sub>) + Var(β̂<sub>2</sub>) − 2Cov(β̂<sub>1</sub>, β̂<sub>2</sub>)", note: "No se suman los errores estándar: la covarianza importa." },
      { title: "Reparametrización", eq: "Y = β<sub>0</sub> + θX<sub>1</sub> + β<sub>2</sub>(X<sub>1</sub> + X<sub>2</sub>) + β<sub>3</sub>X<sub>3</sub> + u", note: "Con θ = β₁ − β₂, el t sobre θ contrasta H₀: β₁ = β₂." },
      { title: "F basado en SCR", eq: "F = [(SCR<sub>R</sub> − SCR<sub>NR</sub>)/q] / [SCR<sub>NR</sub>/(n − k − 1)]", note: "q restricciones; grados de libertad q y n − k − 1." },
      { title: "F basado en R²", eq: "F = [(R²<sub>NR</sub> − R²<sub>R</sub>)/q] / [(1 − R²<sub>NR</sub>)/(n − k − 1)]", note: "Exige la misma variable dependiente y el mismo n." },
      { title: "F de significación global", eq: "F = [R²/k] / [(1 − R²)/(n − k − 1)]", note: "H₀: todas las pendientes son cero. Rechazar indica que al menos una aporta." },
      { title: "Multiplicador de Lagrange", eq: "LM = n R²<sub>ũ</sub> ~ χ²<sub>q</sub>", note: "R² de la regresión auxiliar de los residuos restringidos sobre todas las X." },
      { title: "Consistencia", eq: "plim β̂<sub>1</sub> = β<sub>1</sub> + Cov(X<sub>1</sub>, u) / Var(X<sub>1</sub>)", note: "Si Cov = 0, es consistente. Si no, hay sesgo asintótico." },
      { title: "Normalidad asintótica", eq: "t<sub>n−k−1</sub> → N(0,1) cuando n → ∞", note: "El TCL reemplaza la normalidad en muestras grandes; no reemplaza la homocedasticidad." }
    ],
    drills: [
      { q: "Enunciá el supuesto adicional del MLC y qué permite.", a: "u | X ~ N(0, σ²): errores independientes de X y normales con media cero y varianza constante. Permite que β̂ sea normal y que t y F tengan distribuciones exactas." },
      { q: "Escribí el t para H₀: βⱼ = a y sus grados de libertad.", a: "t = (β̂ⱼ − a)/ee(β̂ⱼ) ~ t<sub>n−k−1</sub> bajo H₀ y normalidad." },
      { q: "¿Qué es el valor p y cómo se usa?", a: "Es P(estadístico al menos tan extremo | H₀). Se rechaza H₀ si p < α. No es la probabilidad de que H₀ sea verdadera." },
      { q: "Escribí el IC al 95% y explicá cuándo rechaza H₀: βⱼ = 0.", a: "β̂ⱼ ± t<sub>0,025, n−k−1</sub> · ee(β̂ⱼ). Se rechaza la nula bilateral al 5% si 0 queda fuera del intervalo." },
      { q: "Definí α, β y potencia.", a: "α = P(rechazar H₀ | H₀ verdadera); β = P(no rechazar | H₀ falsa); potencia = 1 − β." },
      { q: "Escribí la varianza de β̂₁ − β̂₂.", a: "Var(β̂₁) + Var(β̂₂) − 2Cov(β̂₁, β̂₂). No es la suma de varianzas ni de errores estándar." },
      { q: "Escribí el F para q restricciones y sus dos pares de grados de libertad.", a: "F = [(SCR_R − SCR_NR)/q]/[SCR_NR/(n−k−1)] ~ F<sub>q, n−k−1</sub>. q restricciones en el numerador y n − k − 1 en el denominador." },
      { q: "¿Cuál es el caso especial del F que reporta la salida de R?", a: "H₀: β₁ = … = βₖ = 0. F = [R²/k]/[(1−R²)/(n−k−1)] ~ F<sub>k, n−k−1</sub>." },
      { q: "Describí el LM en tres pasos.", a: "Estimar el modelo restringido y guardar residuos; regresarlos sobre todas las X; calcular LM = nR²_ũ y compararlo con χ²_q." },
      { q: "¿Qué es el plim y cuándo MCO es consistente?", a: "El límite en probabilidad cuando n → ∞. MCO es consistente si Cov(X, u) = 0. Si no, plim β̂ − β es el sesgo asintótico." },
      { q: "¿Por qué el TCL no arregla la endogeneidad?", a: "Porque el TCL describe la forma de la distribución, no la correlación entre X y u. Si Cov(X,u) ≠ 0, el estimador sigue siendo sesgado e inconsistente aunque sea aproximadamente normal." }
    ],
    sourceGuide: [
      { stuck: "No entiendo por qué la normalidad no es un supuesto de Gauss-Markov", source: "Clase 3, diap. 5–7; Wooldridge §4.1." },
      { stuck: "No sé qué distribución tiene el estadístico t", source: "Clase 3, diap. 11–14; Wooldridge §4.2." },
      { stuck: "Confundo el valor p con el nivel de significación", source: "Clase 3, diap. 15–16; Wooldridge §4.2; TP 4, Actividad 2b." },
      { stuck: "No entiendo la diferencia entre error tipo I y tipo II", source: "Clase 3, diap. 10; TP 4, Actividad 2a." },
      { stuck: "No puedo interpretar un intervalo de confianza", source: "Clase 3, diap. 18; Wooldridge §4.3." },
      { stuck: "No sé contrastar β₁ = β₂", source: "Clase 3, diap. 19–22; Wooldridge §4.4; TP 4, Ej. 4k–l." },
      { stuck: "No entiendo el F de restricciones múltiples", source: "Clase 3, diap. 23–29; Wooldridge §4.5; TP 4, Ej. 1d y 2a." },
      { stuck: "No sé qué es el multiplicador de Lagrange", source: "Clase 3, diap. 33–35; Wooldridge §5.2." },
      { stuck: "No entiendo plim, consistencia y sesgo asintótico", source: "Clase 3, diap. 39–44; Wooldridge §5.1; 1P 2026." },
      { stuck: "No entiendo por qué t es válido en muestras grandes", source: "Clase 3, diap. 36–38 y 45; Wooldridge §5.2." }
    ],
    session: [
      { time: "0–10", title: "Pregunta guía", text: "¿Cuándo una estimación es evidencia suficiente para hablar de la población? Escribí una respuesta de tres líneas." },
      { time: "10–30", title: "MLC y estadístico t", text: "Explicá qué agrega la normalidad, qué no corrige y por qué el t tiene n − k − 1 grados de libertad. Fuente: clase 3, diap. 5–14." },
      { time: "30–50", title: "Valor p, IC y potencia", text: "Escribí qué mide un valor p, cómo se construye un IC y qué es la potencia. Resolvé el TP 4, Actividad 2." },
      { time: "50–70", title: "F y restricciones múltiples", text: "Escribí el F basado en SCR y en R². Resolvé el TP 4, Ejercicio 1 y el Ejercicio 2." },
      { time: "70–85", title: "Preguntas de parcial", text: "1P 2024–2026: F con R², supuestos del MLC, inferencia asintótica y plim. Respondé sin mirar la solución." },
      { time: "85–90", title: "Cierre", text: "Anotá una idea que puedas enseñar en dos minutos y una que todavía no puedas explicar sin mirar." }
    ],
    kit: [
      { k: "Kit 01", title: "Una página de ideas clave", text: "MLC, t, valor p, potencia, IC, combinaciones lineales, F, LM y consistencia, con una frase por concepto." },
      { k: "Kit 02", title: "Tabla de errores", text: "Qué se confunde, por qué y cómo corregirlo. La sección 12 es el punto de partida." },
      { k: "Kit 03", title: "Trece preguntas", text: "La pestaña de Autoevaluación, ordenada de menor a mayor dificultad." },
      { k: "Kit 04", title: "Plan de 7 días", text: "Una rutina corta para no volver a leer todo desde cero." }
    ],
    plan: [
      { day: "Día 1", title: "Teoría y mapa", text: "Leé la clase completa y explicá el mapa de los cuatro pasos sin mirar." },
      { day: "Día 2", title: "MLC y t", text: "Escribí los supuestos, la distribución de β̂ y el estadístico t con sus grados de libertad." },
      { day: "Día 3", title: "TP 4, Actividades 1 y 2", text: "Respondé las actividades conceptuales y justificá cada verdadero o falso." },
      { day: "Día 4", title: "TP 4, Ejercicios 1 y 2", text: "Interpretá t, F, R² e intervalos con DEMANDA y ENGHO." },
      { day: "Día 5", title: "TP 4, Ejercicio 4", text: "Replicá el laboratorio de WAGE2 y contrastá β_meduc = β_feduc con reparametrización." },
      { day: "Día 6", title: "Parciales y simulacro", text: "Resolvé las preguntas de 1P 2024–2026 sobre inferencia en 45 minutos, sin mirar." },
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
        title: "Clase 3 — Inferencia",
        text: "Fuente principal de la explicación, el orden y los énfasis de esta clase.",
        loc: "45 diapositivas · diap. 3–45"
      },
      {
        type: "Libro",
        typeClass: "book",
        title: "Wooldridge — Introducción a la Econometría, 4.ª ed.",
        text: "Cap. 4 para MLC, contrastes t y F, intervalos y combinaciones lineales; Cap. 5 para consistencia, normalidad asintótica y LM.",
        loc: "Cap. 4 · Cap. 5"
      },
      {
        type: "Guía",
        typeClass: "",
        title: "Guía de Trabajos Prácticos 2026 — TP 4",
        text: "Actividades 1 y 2 para los conceptos; ejercicios 1 a 5 para aplicar t, F, intervalos y restricciones lineales.",
        loc: "TP 4 · actividades 1–2; ejercicios 1–5",
        href: "guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-4"
      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2024",
        text: "Diferencias entre contrastes individuales y múltiples; F basado en R²; distribución exacta versus asintótica.",
        loc: "Solución orientativa"
      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2025",
        text: "Supuestos de Gauss-Markov y del MLC; consecuencias de errores no normales sobre las propiedades y la inferencia.",
        loc: "Solución orientativa"
      },
      {
        type: "Parcial",
        typeClass: "exam",
        title: "1P 2026",
        text: "Por qué la inferencia requiere más que los dos primeros momentos; F con R² y SCR; interpretación del plim.",
        loc: "Solución orientativa"
      }
    ]
  }
};
