window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-03a"] = {
  id: 'clase-03a',
  num: '03A',
  eyebrow: 'Clase 03A · Inferencia sobre un parámetro',
  title: 'Inferencia sobre un parámetro: t, valor p e intervalos',
  lead: 'Una estimación viene con error. Para un solo coeficiente, la inferencia combina el MLC, el estadístico t, el valor p, la potencia y el intervalo de confianza.',
  question: '¿Cuándo una estimación de un coeficiente es evidencia suficiente para hablar de su parámetro poblacional?',
  pills: ['16 diapositivas', 'TP 4 · act. 1–2', '1P 2024–2026', '5 conceptos clave'],
  sections: [
    {
      id: 'c03a-s01',
      number: '01',
      title: 'El problema: estimar no es inferir',
      blocks: [
        {
          type: 'p',
          id: 'c03a-s01-p01',
          html: 'La clase 1 y la clase 2 terminaron con estimaciones: una recta, un vector de coeficientes, una matriz de varianzas y covarianzas. Todo eso describe lo que ocurrió en una muestra de tamaño n. La inferencia empieza cuando la pregunta deja de ser qué pasó en esos datos y pasa a ser qué puede decirse de la población que los generó.'
        },
        {
          type: 'p',
          id: 'c03a-s01-p02',
          html: 'El ejemplo que usa la clase es un modelo de salario en función de los años de educación y de experiencia. Con una muestra se obtiene una pendiente; con otra, la pendiente cambia. La pregunta relevante no es si el número es exactamente cero en la muestra —casi nunca lo es— sino si está lo suficientemente lejos de cero, en relación con su error estándar, como para sostener que el parámetro poblacional no es cero.'
        },
        {
          type: 'compare',
          left: {
            tag: 'Estimar',
            title: 'Describir la muestra',
            text: 'β̂ es una estadística muestral: cambia si cambia la muestra. Su valor concreto no es el parámetro poblacional.',
            eq: 'β̂ = (X′X)<sup>−1</sup>X′Y'
          },
          right: {
            tag: 'Inferir',
            title: 'Hablar de la población',
            text: 'β es fijo y desconocido. La inferencia usa β̂, su error estándar y una distribución de probabilidad para decidir.',
            eq: 'β̂  →  β'
          }
        },
        {
          type: 'cards',
          items: [
            {
              sym: '1',
              title: 'Distribución muestral',
              text: 'No alcanza con la esperanza y la varianza: hace falta la forma completa de la distribución de β̂.'
            },
            {
              sym: '2',
              title: 'Supuesto distribucional',
              text: 'El MLC agrega normalidad de los errores. Sin ella, t y F son exactos solo si n es grande.'
            },
            {
              sym: '3',
              title: 'Estadístico de prueba',
              text: 't o F resumen la distancia entre los datos y la hipótesis nula, en unidades de error estándar.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'La dirección de la inferencia',
          html: 'La hipótesis se escribe sobre parámetros poblacionales —por ejemplo, H<sub>0</sub>: β<sub>1</sub> = 0—, pero el estadístico se calcula con datos muestrales. Nunca se pasa de “no rechazo” a “β = 0”: se pasa de una muestra a una decisión sobre la población, con una probabilidad de error.'
        },
        {
          type: 'miniCheck',
          id: 'c03a-check-01',
          question: '¿Por qué no alcanza con conocer E(β̂) y Var(β̂) para hacer inferencia?',
          intro: 'Pensá qué información hace falta para construir un valor p o un intervalo.',
          answer: 'Porque la esperanza y la varianza son solo los dos primeros momentos. Para calcular probabilidades, valores críticos y valores p se necesita la forma completa de la distribución muestral. Gauss-Markov garantiza insesgamiento y eficiencia, pero no una forma funcional. El MLC agrega la normalidad; en muestras grandes, el teorema central del límite da una aproximación.'
        }
      ]
    },
    {
      id: 'c03a-s02',
      number: '02',
      title: 'El modelo lineal clásico',
      blocks: [
        {
          type: 'p',
          id: 'c03a-s02-p01',
          html: 'Los supuestos de Gauss-Markov alcanzan para demostrar que MCO es insesgado y, entre los estimadores lineales insesgados, de varianza mínima. No alcanzan para saber qué forma tiene la distribución de β̂. Dos estimadores pueden tener la misma media y la misma varianza y distribuciones muy distintas; los valores p y los intervalos dependen de esa forma.'
        },
        {
          type: 'p',
          id: 'c03a-s02-p02',
          html: 'El <span class="concept" data-concept="mlc" tabindex="0" role="button">modelo lineal clásico</span> (MLC) suma un supuesto sobre la distribución de los errores: u es independiente de las X y se distribuye normal con media cero y varianza constante. Condicional a X, Y también es normal, con media β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub> y varianza σ<sup>2</sup>.'
        },
        {
          type: 'formula',
          main: 'u | X ~ N(0, σ<sup>2</sup>) &nbsp;&nbsp;→&nbsp;&nbsp; Y | X ~ N(β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub>, σ<sup>2</sup>)',
          legend: [
            {
              key: 'u | X',
              text: 'El error condicional a las variables explicativas.'
            },
            {
              key: 'Y | X',
              text: 'La variable dependiente condicional a X hereda la normalidad del error.'
            },
            {
              key: 'MLC',
              text: 'Gauss-Markov más normalidad. Es el supuesto que permite inferencia exacta en muestras chicas.'
            }
          ]
        },
        {
          type: 'assumptions',
          rows: [
            {
              title: 'Linealidad en los parámetros',
              text: 'Y se escribe como combinación lineal de los β. El MLC no cambia la forma funcional.'
            },
            {
              title: 'Muestra aleatoria',
              text: 'Las observaciones son independientes y provienen de la misma población.'
            },
            {
              title: 'E(u | X) = 0',
              text: 'Exogeneidad: los factores omitidos no están sistemáticamente relacionados con las X incluidas.'
            },
            {
              title: 'Rango completo',
              text: 'No hay colinealidad perfecta: X′X es invertible.'
            },
            {
              title: 'Homocedasticidad',
              text: 'Var(u | X) = σ<sup>2</sup>. Es la varianza que aparece en los errores estándar.'
            },
            {
              title: 'Normalidad e independencia',
              text: 'u | X ~ N(0, σ<sup>2</sup>): la distribución del error no depende de X. Es el supuesto adicional del MLC para inferencia exacta.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03a-s02-p03',
          html: '¿De dónde sale la normalidad? De un argumento de teorema central del límite: si u es la suma de muchos factores no observados, pequeños e independientes, su distribución se aproxima a la normal. El argumento puede fallar si los factores no son aditivos, si tienen distribuciones muy distintas o si unos pocos dominan. Por eso la normalidad es una cuestión empírica y su importancia depende del tamaño de muestra.'
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Normalidad no es sinónimo de Gauss-Markov',
          html: 'Suponer errores normales no corrige endogeneidad, variables omitidas ni heterocedasticidad. Solo agrega una distribución conocida para los estimadores. En muestras grandes, el TCL puede reemplazarla; en muestras chicas, es la que permite usar t y F exactas.'
        },
        {
          type: 'miniCheck',
          id: 'c03a-check-02',
          question: '¿Qué se gana y qué no se gana al agregar normalidad a los supuestos de Gauss-Markov?',
          intro: 'Separá lo que depende de la distribución de lo que depende de la exogeneidad y de la varianza.',
          answer: 'Se gana la distribución muestral normal de β̂ y, con ella, estadísticos t y F con distribuciones exactas en muestras finitas. No se gana insesgamiento —eso ya venía de Gauss-Markov—, no se corrige la endogeneidad ni las variables omitidas, y no se vuelve innecesaria la homocedasticidad. La normalidad es un supuesto sobre la forma de la distribución, no sobre la identificación del parámetro.'
        }
      ]
    },
    {
      id: 'c03a-s03',
      number: '03',
      title: 'El estadístico t',
      blocks: [
        {
          type: 'p',
          id: 'c03a-s03-p01',
          html: 'Bajo el MLC, condicional a X, cada β̂<sub>j</sub> tiene distribución normal con media β<sub>j</sub> y varianza Var(β̂<sub>j</sub>). Si σ<sup>2</sup> fuera conocida, se podría estandarizar y usar una normal estándar. En la práctica σ<sup>2</sup> es desconocida y se reemplaza por σ̂<sup>2</sup>; al hacerlo, la distribución cambia: aparece una <span class="concept" data-concept="t" tabindex="0" role="button">t</span> con n − k − 1 grados de libertad.'
        },
        {
          type: 'formula',
          main: 'z<sub>j</sub> = (β̂<sub>j</sub> − β<sub>j</sub>) / √Var(β̂<sub>j</sub>) ~ N(0,1) &nbsp;&nbsp;→&nbsp;&nbsp; t<sub>j</sub> = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>) ~ t<sub>n−k−1</sub>',
          legend: [
            {
              key: 'z',
              text: 'Estadístico teórico si σ² fuera conocida.'
            },
            {
              key: 't',
              text: 'Estadístico usable: reemplaza el desvío poblacional por el error estándar estimado.'
            },
            {
              key: 'a',
              text: 'Valor del parámetro bajo la hipótesis nula. Lo habitual es a = 0.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03a-s03-p02',
          html: 'El estadístico t es una distancia estandarizada: el numerador mide cuánto se aleja la estimación del valor propuesto por H<sub>0</sub>; el denominador mide la precisión con la que se estimó. Un t de 2 significa “dos errores estándar lejos de H<sub>0</sub>”, no “dos unidades de Y”.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Numerador',
              title: 'Distancia',
              text: 'β̂ⱼ − a. Si H₀ es βⱼ = a, mide el error de estimación respecto de ese valor.'
            },
            {
              sym: 'Denominador',
              title: 'Precisión',
              text: 'ee(β̂ⱼ). Cuanto más grande, más ancho es el intervalo y menos evidencia aporta la misma distancia.'
            },
            {
              sym: 'gl',
              title: 'n − k − 1',
              text: 'Se pierden k + 1 grados de libertad por estimar el intercepto y las k pendientes.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03a-s03-p03',
          html: 'La distribución t tiene colas más gruesas que la normal y depende de los grados de libertad. Con pocos grados de libertad, el valor crítico para un 5% bilateral es bastante mayor que 1,96; a medida que n crece, la t se acerca a la normal estándar. Esa convergencia es la que permite usar t en muestras grandes sin normalidad exacta.'
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'El error estándar es la unidad',
          html: 'No se compara el coeficiente con cero en unidades de la variable dependiente. Se compara con su error estándar. Por eso dos coeficientes del mismo tamaño pueden tener t muy distintos si uno está estimado con mucha más precisión que el otro.'
        },
        {
          type: 'miniCheck',
          id: 'c03a-check-03',
          question: '¿Por qué los grados de libertad son n − k − 1 y no n?',
          intro: 'Contá cuántos parámetros se estiman antes de estimar σ².',
          answer: 'Porque se estiman k + 1 parámetros: el intercepto y k pendientes. La varianza residual se calcula con los residuos, que ya usaron esos parámetros; por eso la suma de cuadrados residual tiene n − k − 1 grados de libertad. En regresión simple, k = 1 y quedan n − 2.'
        }
      ]
    },
    {
      id: 'c03a-s04',
      number: '04',
      title: 'Contraste individual, valor p y decisiones',
      blocks: [
        {
          type: 'p',
          id: 'c03a-s04-p01',
          html: 'El contraste individual más frecuente es H<sub>0</sub>: β<sub>j</sub> = 0 frente a H<sub>1</sub>: β<sub>j</sub> ≠ 0. La estimación puntual casi nunca será exactamente cero, sea cierta o no H<sub>0</sub>; la pregunta es si está lo suficientemente lejos como para que el error muestral no explique la diferencia. También puede contrastarse cualquier valor: H<sub>0</sub>: β<sub>j</sub> = a.'
        },
        {
          type: 'formula',
          main: 't = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; se rechaza H<sub>0</sub> si |t| > t<sub>α/2, n−k−1</sub>',
          legend: [
            {
              key: 'Bilateral',
              text: 'H<sub>1</sub>: β<sub>j</sub> ≠ a. Se reparte α en las dos colas.'
            },
            {
              key: 'Unilateral',
              text: 'H<sub>1</sub>: β<sub>j</sub> > a o β<sub>j</sub> < a. Se concentra α en una cola.'
            },
            {
              key: 'Regla',
              text: 'El valor crítico depende del nivel α y de los grados de libertad.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03a-s04-p02',
          html: 'La hipótesis alternativa puede ser bilateral (β<sub>j</sub> ≠ 0) o unilateral (β<sub>j</sub> > 0 o β<sub>j</sub> < 0). La bilateral es la opción por defecto cuando la teoría no fija el signo; la unilateral se justifica antes de mirar los datos y concentra el 5% en una sola cola. Elegir la cola después de ver el signo infla el error tipo I.'
        },
        {
          type: 'p',
          id: 'c03a-s04-p03',
          html: 'El <span class="concept" data-concept="valor-p" tabindex="0" role="button">valor p</span> es la probabilidad de obtener un estadístico al menos tan extremo como el observado si H<sub>0</sub> fuera verdadera. Es una medida de evidencia en contra de H<sub>0</sub>, no la probabilidad de que H<sub>0</sub> sea verdadera. Se rechaza H<sub>0</sub> si p < α; cuanto menor sea p, más fuerte es la evidencia, pero eso no dice nada por sí solo sobre la importancia económica del efecto.'
        },
        {
          type: 'formula',
          main: 'p = P(|T| ≥ |t<sub>obs</sub>| | H<sub>0</sub>)',
          legend: [
            {
              key: 'T',
              text: 'Variable aleatoria con la distribución del estadístico bajo H₀.'
            },
            {
              key: 't<sub>obs</sub>',
              text: 'Valor calculado con la muestra.'
            },
            {
              key: 'α',
              text: 'Nivel de significación elegido antes de calcular el estadístico.'
            }
          ]
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'α',
              title: 'Nivel de significación',
              text: 'Se elige antes de mirar los datos. Es la probabilidad de error tipo I que se está dispuesto a tolerar.'
            },
            {
              sym: 'p',
              title: 'Valor p',
              text: 'Se calcula con los datos. Es el nivel de significación más pequeño al que se rechazaría H₀.'
            },
            {
              sym: 'Decisión',
              title: 'Rechazar o no rechazar',
              text: 'Si p < α, se rechaza H₀. Si p ≥ α, no se rechaza; no se “acepta”.'
            }
          ]
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: '“p = 0,03 significa que hay 3% de probabilidad de que H₀ sea verdadera”',
              why: 'El valor p es P(datos al menos tan extremos | H₀), no P(H₀ | datos).',
              fix: 'Leelo como evidencia: si H₀ fuera cierta, 3% de las muestras darían un estadístico así.'
            },
            {
              error: '“No rechacé H₀, entonces H₀ es verdadera”',
              why: 'No rechazar puede deberse a un efecto pequeño, poca potencia o un error estándar grande.',
              fix: 'Decí “no hay evidencia suficiente para rechazar” y mirá el intervalo y la potencia.'
            },
            {
              error: '“Un t grande implica un efecto económico grande”',
              why: 't = coeficiente / error estándar. Con n grande, un efecto minúsculo puede tener t grande.',
              fix: 'Interpretá la magnitud del coeficiente y su intervalo, no solo el p.'
            },
            {
              error: '“Como el t es significativo, el efecto es causal”',
              why: 'La significancia estadística no resuelve variables omitidas, endogeneidad ni diseño.',
              fix: 'Separá la inferencia estadística de la identificación causal.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Se rechaza o no se rechaza',
          html: 'La lógica es asimétrica: se rechaza H<sub>0</sub> cuando la evidencia es suficientemente fuerte en contra; si no, se dice que no hay evidencia suficiente para rechazarla. No se “acepta” H<sub>0</sub>, porque un intervalo amplio puede ser compatible con muchos valores, incluido el nulo.'
        },
        {
          type: 'miniCheck',
          id: 'c03a-check-04',
          question: 'Un coeficiente es estadísticamente significativo al 5% pero su magnitud es diminuta. ¿Cómo pueden convivir las dos cosas?',
          intro: 'Pensá qué pasa con el error estándar cuando la muestra crece.',
          answer: 'La significancia depende de la relación entre el coeficiente y su error estándar. Con una muestra grande, el error estándar se reduce y un efecto pequeño puede estimarse con mucha precisión: el t resulta grande aunque la magnitud sea económicamente menor. La significancia no mide importancia práctica; para eso hay que mirar el tamaño del coeficiente, sus unidades y el intervalo de confianza.'
        }
      ]
    },
    {
      id: 'c03a-s05',
      number: '05',
      title: 'Errores de tipo I y II, potencia',
      blocks: [
        {
          type: 'p',
          id: 'c03a-s05-p01',
          html: 'Contrastar no es adivinar sin error. Hay dos formas de equivocarse: rechazar H<sub>0</sub> cuando es verdadera —error tipo I— y no rechazarla cuando es falsa —error tipo II—. El nivel de significación α controla la primera; la <span class="concept" data-concept="potencia" tabindex="0" role="button">potencia</span> 1 − β mide la capacidad de detectar un efecto real.'
        },
        {
          type: 'assumptions',
          rows: [
            {
              title: 'H₀ verdadera · Se rechaza',
              text: 'Error tipo I. Su probabilidad es α, el nivel de significación elegido.'
            },
            {
              title: 'H₀ verdadera · No se rechaza',
              text: 'Decisión correcta. Su probabilidad es 1 − α, el nivel de confianza.'
            },
            {
              title: 'H₀ falsa · Se rechaza',
              text: 'Decisión correcta. Su probabilidad es la potencia, 1 − β.'
            },
            {
              title: 'H₀ falsa · No se rechaza',
              text: 'Error tipo II. Su probabilidad es β.'
            }
          ]
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'α',
              title: 'Error tipo I',
              text: 'Rechazar un efecto nulo. Es el precio de exigir evidencia fuerte.'
            },
            {
              sym: 'β',
              title: 'Error tipo II',
              text: 'No detectar un efecto que existe. Aumenta si la muestra es chica o el efecto es débil.'
            },
            {
              sym: '1 − β',
              title: 'Potencia',
              text: 'Probabilidad de detectar el efecto. No es 1 − α: depende del efecto, de n y del ruido.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03a-s05-p02',
          html: 'La potencia crece con el tamaño del efecto, con n y con la precisión; disminuye con σ y con niveles de α más exigentes. Bajar α de 0,05 a 0,01 reduce el error tipo I, pero también la potencia para un n fijo. La única forma de mejorar ambas cosas a la vez es aumentar la información: más observaciones, mejor diseño o menos ruido.'
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'Bajar α no es gratis',
          html: 'Un contraste más exigente reduce la probabilidad de falsos positivos, pero vuelve más probable no detectar efectos reales. Si un estudio no rechaza H<sub>0</sub>, antes de concluir que no hay efecto hay que preguntarse cuál era su potencia.'
        },
        {
          type: 'miniCheck',
          id: 'c03a-check-05',
          question: 'Si no rechazás H₀, ¿podés concluir que β = 0?',
          intro: 'Pensá en la diferencia entre “no hay evidencia” y “hay evidencia de ausencia”.',
          answer: 'No. No rechazar significa que los datos no aportan evidencia suficiente contra H₀. Puede haber un efecto real que el contraste no logró detectar por poca potencia, por un error estándar grande o por un n chico. El intervalo de confianza muestra qué valores siguen siendo compatibles con los datos; si es amplio, la conclusión honesta es que no se pudo precisar el efecto.'
        }
      ]
    },
    {
      id: 'c03a-s06',
      number: '06',
      title: 'Intervalos de confianza',
      blocks: [
        {
          type: 'p',
          id: 'c03a-s06-p01',
          html: 'Un <span class="concept" data-concept="ic" tabindex="0" role="button">intervalo de confianza</span> combina la estimación puntual con el error estándar y un valor crítico. Al 95%, se construye con el percentil 97,5 de la t correspondiente. El intervalo es una variable aleatoria: cambia con la muestra, aunque el parámetro sea fijo.'
        },
        {
          type: 'formula',
          main: 'β̂<sub>j</sub> ± t<sub>α/2, n−k−1</sub> · ee(β̂<sub>j</sub>)',
          legend: [
            {
              key: 'Centro',
              text: 'β̂<sub>j</sub>, la estimación puntual.'
            },
            {
              key: 'Margen',
              text: 't<sub>α/2</sub> · ee. La mitad de la amplitud del intervalo.'
            },
            {
              key: 'Nivel',
              text: '1 − α. Un nivel mayor exige un valor crítico mayor y produce un intervalo más ancho.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03a-s06-p02',
          html: 'La interpretación correcta es de muestreo repetido: si se construyeran muchos intervalos del mismo modo, aproximadamente el 95% contendría al parámetro. No es correcto decir “hay 95% de probabilidad de que β esté en este intervalo concreto”: en la visión frecuentista, β es fijo y el intervalo es lo aleatorio.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Centro',
              title: 'β̂ⱼ',
              text: 'La estimación puntual. Si el estimador es insesgado, el intervalo se centra en el valor esperado.'
            },
            {
              sym: 'Margen',
              title: 't · ee',
              text: 'La mitad de la amplitud. Depende del nivel de confianza, de los grados de libertad y de la precisión.'
            },
            {
              sym: 'Nivel',
              title: '1 − α',
              text: '95% es una convención. Un nivel mayor produce un intervalo más ancho y menos conclusiones tajantes.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'IC y contraste, dos caras',
          html: 'En un contraste bilateral al 5%, H<sub>0</sub>: β<sub>j</sub> = a se rechaza si y solo si a queda fuera del intervalo de confianza al 95%. El intervalo muestra, además, qué magnitudes son compatibles con los datos; el valor p solo responde sí o no a un valor de H<sub>0</sub>.'
        },
        {
          type: 'miniCheck',
          id: 'c03a-check-06',
          question: 'El IC 95% de β₁ es [−0,2; 0,8]. ¿Qué concluís sobre H₀: β₁ = 0?',
          intro: 'Fijate si el valor nulo está dentro del intervalo.',
          answer: 'No se rechaza H₀ al 5%: 0 está dentro del intervalo. Eso no prueba que β₁ sea cero; el intervalo es amplio y es compatible con efectos negativos moderados y positivos moderados. La conclusión correcta es que los datos no permiten distinguir el efecto de cero con ese nivel de confianza.'
        }
      ]
    },
    {
      id: 'c03a-s07',
      number: '07',
      title: 'Errores frecuentes y mapa de la inferencia individual',
      blocks: [
        {
          type: 'errorTable',
          rows: [
            {
              error: 'Confundir el nivel de significación α con el valor p',
              why: 'α se elige antes y fija la regla; p se calcula con los datos y mide la evidencia.',
              fix: 'Decí “rechazo al 5%” y reportá el p por separado, sin tratarlos como sinónimos.'
            },
            {
              error: 'Decir que se “acepta” H₀',
              why: 'La ausencia de evidencia no es evidencia de ausencia; el intervalo puede ser amplio.',
              fix: 'Usá “no se rechaza” y agregá el intervalo de confianza y la potencia cuando importe.'
            },
            {
              error: 'Tratar la normalidad como un supuesto de Gauss-Markov',
              why: 'G-M no impone una distribución; la normalidad es el supuesto adicional del MLC.',
              fix: 'Separá insesgamiento y eficiencia de la distribución exacta de t y F.'
            }
          ]
        },
        {
          type: 'map',
          steps: [
            {
              n: '1',
              title: 'Escribir la hipótesis',
              text: 'H₀ sobre un coeficiente: βⱼ = a, bilateral o unilateral. La hipótesis es poblacional; el estadístico es muestral.'
            },
            {
              n: '2',
              title: 'Elegir el supuesto',
              text: 'MLC para inferencia exacta en muestras chicas; TCL para muestras grandes. Gauss-Markov se mantiene.'
            },
            {
              n: '3',
              title: 'Calcular el estadístico',
              text: 't = (β̂ⱼ − a) / ee(β̂ⱼ), con n − k − 1 grados de libertad.'
            },
            {
              n: '4',
              title: 'Decidir e interpretar',
              text: 'Compará con el valor crítico o el p; reportá magnitud, intervalo y límites causales.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'La otra mitad de la inferencia',
          html: 'Las restricciones conjuntas, el estadístico F, el multiplicador de Lagrange y las propiedades asintóticas se desarrollan en la <a href="#clase-03b">clase 03B</a>. Ahí cambia la hipótesis: ya no es un coeficiente aislado, sino una combinación o un grupo de restricciones.'
        },
        {
          type: 'sourceStrip',
          chips: [
            {
              label: 'Clase 3A',
              text: 'diap. 3–18'
            },
            {
              label: 'Wooldridge 4ed',
              text: 'Cap. 4, §4.1–4.3'
            },
            {
              label: 'TP 4',
              text: 'act. 1–2; ej. 1 y 4'
            },
            {
              label: 'Parciales',
              text: '1P 2024–2026'
            }
          ]
        }
      ]
    }
  ],
  concepts: {
    mlc: {
      title: 'Modelo lineal clásico',
      sub: 'Gauss-Markov más normalidad: la base de la inferencia exacta.',
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
      conexiones: `<p>El MLC es el puente entre la estimación de las clases 2A y 2B y la inferencia de esta clase. La consistencia, que no depende de la normalidad, se desarrolla en la <a href="#clase-03b">clase 03B</a>.</p>
        <div><button class="concept-chip" data-concept="t">Estadístico t →</button><button class="concept-chip" data-concept="valor-p">Valor p →</button><button class="concept-chip" data-concept="ic">Intervalos →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3A, diap. 5–7.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2025, supuestos del MLC y consecuencia de errores no normales.</p></div>
      `
    },
    t: {
      title: 'Estadístico t',
      sub: 'La distancia entre la estimación y la hipótesis, medida en errores estándar.',
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
      conexiones: `<p>El t es la pieza básica de los contrastes individuales y de los intervalos. También es la base del F cuando hay una sola restricción: F = t². La extensión a restricciones conjuntas se desarrolla en la <a href="#clase-03b">clase 03B</a>.</p>
        <div><button class="concept-chip" data-concept="valor-p">Valor p →</button><button class="concept-chip" data-concept="ic">Intervalos →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3A, diap. 11–14 y 17.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Actividad 2 y Ejercicio 1.</p></div>
      `
    },
    'valor-p': {
      title: 'Valor p',
      sub: 'La evidencia contra H₀, en una escala de probabilidad.',
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
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3A, diap. 15–16.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Actividad 2b.</p></div>
      `
    },
    potencia: {
      title: 'Errores y potencia',
      sub: 'α, β y la probabilidad de detectar un efecto real.',
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
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3A, diap. 10.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Actividad 2a.</p></div>
      `
    },
    ic: {
      title: 'Intervalo de confianza',
      sub: 'Un rango de valores compatibles con los datos.',
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
      conexiones: `<p>El IC es el mismo contraste t expresado como rango. También se usa para juzgar la importancia económica y para comparar magnitudes. Las combinaciones lineales y el F se desarrollan en la <a href="#clase-03b">clase 03B</a>.</p>
        <div><button class="concept-chip" data-concept="t">Estadístico t →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3A, diap. 18.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Ej. 1g, 2b y 4h.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de la inferencia individual',
    intro: 'La primera mitad de la inferencia se practica con contrastes individuales: t, valor p, potencia e intervalos. La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto. Las restricciones conjuntas quedan en la práctica de 03B.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-4',
    exercises: [
      {
        label: 'TP 4 · Act. 1',
        title: 'Verdadero o falso',
        text: 'Poné a prueba las relaciones entre t y F, el valor p unilateral y bilateral, y el efecto de la varianza sobre la precisión y los intervalos.',
        tags: ['Conceptual', 'V/F'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-3'
      },
      {
        label: 'TP 4 · Act. 2',
        title: 'Errores, potencia y elección del estadístico',
        text: 'Definí error tipo I, error tipo II y potencia; diferenciá nivel de significación y valor p; elegí t o F según la hipótesis.',
        tags: ['Conceptual', 'Potencia'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-2-1'
      },
      {
        label: 'TP 4 · Ej. 1',
        title: 'Contrastes t e intervalos con datos de demanda',
        text: 'Estimá el modelo, interpretá los contrastes individuales y construí los intervalos de confianza al 95% para los parámetros. El contraste conjunto se retoma en 03B.',
        tags: ['Aplicar', 'DEMANDA'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-3'
      },
      {
        label: 'TP 4 · Ej. 4',
        title: 'Educación, padres y hermanos',
        text: 'Estimá el modelo con WAGE2, interpretá cada t, calculá los intervalos y leé la magnitud de los coeficientes. La comparación β_meduc = β_feduc se trabaja en 03B.',
        tags: ['Aplicar', 'WAGE2'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-3'
      }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 4 · Ej. 4',
      title: 'Cómo se lee un contraste individual',
      intro: 'La salida del TP 4, Ej. 4, permite leer en una sola tabla la estimación de un coeficiente, su error estándar, el estadístico t, el valor p y el intervalo de confianza. Es el laboratorio natural para esta clase.',
      dataNote: 'La salida usa la base WAGE2: educación de la persona en función de la educación de la madre, la del padre y la cantidad de hermanos. La base tiene 935 observaciones, pero meduc y feduc tienen datos faltantes: R estima con 722 y elimina 213. El n efectivo es parte del resultado.',
      script: `load("WAGE2.rda")

modelo <- lm(educ ~ meduc + feduc + sibs, data = wage2)
summary(modelo)
confint(modelo)`,
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
F-statistic: 65.2 on 3 and 718 DF,  p-value: < 2.2e-16`,
      confint: `                 2.5 %     97.5 %
(Intercept)  9.6604222 11.0680898
meduc        0.0666098  0.1949646
feduc        0.1560635  0.2639447
sibs        -0.1613124 -0.0259594`,
      readingTable: [
        {
          element: 'Estimate',
          meaning: 'Coeficiente estimado.',
          how: 'Mide el cambio esperado en educ ante una unidad más de la variable, manteniendo las demás constantes.'
        },
        {
          element: 'Std. Error',
          meaning: 'Error estándar del estimador.',
          how: 'Mide la precisión. Es el denominador del estadístico t y la base de la amplitud del intervalo.'
        },
        {
          element: 't value',
          meaning: 'Estimate / Std. Error.',
          how: 'Distancia estandarizada a cero. No mide el tamaño del efecto en unidades de educ.'
        },
        {
          element: 'Pr(>|t|)',
          meaning: 'Valor p del contraste bilateral.',
          how: 'Probabilidad de un t al menos tan extremo si H₀ fuera cierta. Se compara con α.'
        },
        {
          element: 'Residual standard error',
          meaning: 'σ̂, dispersión residual.',
          how: 'Resume el ruido del modelo. Entra en todos los errores estándar.'
        },
        {
          element: 'Multiple R-squared',
          meaning: 'Proporción de variación explicada.',
          how: '0,2141: el modelo explica 21,4% de la variación de educ. No prueba significancia ni causalidad.'
        },
        {
          element: 'Adjusted R-squared',
          meaning: 'R² corregido por grados de libertad.',
          how: 'Penaliza variables adicionales; sirve para comparar modelos con la misma Y.'
        },
        {
          element: 'confint()',
          meaning: 'Intervalos al 95%.',
          how: 'Si el intervalo no contiene 0, se rechaza H₀ bilateral al 5%. También muestra magnitudes plausibles.'
        }
      ],
      econometric: `<p><strong>β̂<sub>meduc</sub> = 0,131; t = 4,00; p &lt; 0,001.</strong> Un año más de educación de la madre se asocia con 0,131 años más de educación de la persona, manteniendo constantes la educación del padre y la cantidad de hermanos. El efecto es estadísticamente distinto de cero al 5%.</p>
        <p><strong>β̂<sub>feduc</sub> = 0,210; t = 7,64; p &lt; 0,001.</strong> El efecto estimado del padre es mayor, pero la comparación directa entre ambos requiere el error estándar de la diferencia, no una lectura a ojo de los coeficientes.</p>
        <p><strong>β̂<sub>sibs</sub> = −0,094; t = −2,72; p = 0,007.</strong> Cada hermano adicional se asocia con 0,094 años menos de educación, con las demás variables constantes. Es significativo, aunque la magnitud es pequeña.</p>
        <p><strong>R² = 0,2141; R² ajustado = 0,2108.</strong> El modelo explica 21,4% de la variación de educ. El resto queda en factores no incluidos: habilidad, escuela, ingresos familiares, entorno.</p>`,
      economic: `<p>Los tres coeficientes tienen los signos esperados: más educación de los padres se asocia con más educación de los hijos; más hermanos, con menos. La lectura es condicional: compara personas con el mismo valor de las otras variables incluidas, no establece causalidad.</p>
        <p>La magnitud de sibs invita a una cuenta útil: si se quisiera una reducción de un año en la educación predicha manteniendo constantes meduc y feduc, haría falta un aumento de 1 / 0,0936 ≈ 10,7 hermanos. Es una forma de mostrar que “significativo” no es sinónimo de “económicamente grande”.</p>
        <p>Con el modelo, una persona con 12 años de educación de la madre, 12 del padre y sin hermanos tiene una predicción de 14,45 años. Otra con 14 de la madre, 16 del padre y dos hermanos tiene 15,37 años. La diferencia es de unos 0,91 años, no de dos ni de tres: los coeficientes son pendientes parciales, no reglas aditivas simples.</p>
        <p>Nada de esto identifica el efecto causal de la educación de los padres. La habilidad y el nivel socioeconómico no observados pueden estar correlacionados con las tres variables y quedar en el error. La inferencia describe asociaciones condicionales precisas; la causalidad exige un diseño adicional.</p>`,
      errors: [
        'Decir que meduc y feduc no afectan porque el R² es 0,21. El R² mide ajuste, no significancia; ambos coeficientes tienen t alto.',
        'Interpretar los coeficientes como efectos causales. La base es observacional y hay variables omitidas relevantes.',
        'Ignorar los 213 casos eliminados por datos faltantes. El n efectivo es 722 y debe reportarse; la muestra efectiva cambia los errores estándar y la amplitud de los intervalos.',
        'Leer el p-valor como probabilidad de que H₀ sea verdadera. El p es P(datos | H₀), no P(H₀ | datos).'
      ],
      checklist: [
        'Reportá el n efectivo y los casos perdidos por datos faltantes.',
        'Presentá cada coeficiente con error estándar, t, p e intervalo al 95%.',
        'Interpretá la magnitud en unidades de la variable dependiente, no solo la significancia.',
        'Separá asociación condicional de causalidad y mencioná las variables omitidas.',
        'Leé el valor p y el intervalo como dos formas de la misma evidencia: el intervalo muestra qué magnitudes son plausibles.'
      ]
    },
    partials: [
      {
        label: '1P 2025',
        text: 'Supuestos de Gauss-Markov y del MLC; qué cambia en la inferencia con errores no normales y con muestras grandes.'
      },
      {
        label: '1P 2026',
        text: 'Por qué la inferencia requiere más que esperanza y varianza; interpretación de intervalos, valores p y potencia en muestras chicas y grandes.'
      }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a distinguir supuestos de distribución, contrastes individuales y significancia estadística de importancia económica. Respondé antes de abrir la solución.',
    questions: [
      {
        q: '¿Por qué para hacer inferencia no alcanza con conocer E(β̂) y Var(β̂)?',
        a: 'Porque esos son solo los dos primeros momentos de la distribución muestral. Para calcular valores p, valores críticos e intervalos se necesita la forma completa de la distribución. Gauss-Markov garantiza insesgamiento y eficiencia, pero no una forma funcional; el MLC agrega normalidad y, en muestras grandes, el TCL da una aproximación.'
      },
      {
        q: '¿Qué agrega el modelo lineal clásico a los supuestos de Gauss-Markov? ¿Qué permite y qué no corrige?',
        a: 'Agrega que u es independiente de las X y se distribuye normal con media cero y varianza constante. Permite que β̂ tenga distribución normal y que t y F tengan distribuciones exactas en muestras chicas. No corrige endogeneidad, variables omitidas ni heterocedasticidad, y no es necesario para el insesgamiento.'
      },
      {
        q: 'Escribí el estadístico t para H₀: βⱼ = a e indicá su distribución y sus grados de libertad.',
        a: 't = (β̂ⱼ − a) / ee(β̂ⱼ). Bajo el MLC y H₀ se distribuye t con n − k − 1 grados de libertad, donde k es la cantidad de pendientes y 1 es el intercepto. En regresión simple, n − 2.'
      },
      {
        q: '¿Cuál es la diferencia entre el nivel de significación α y el valor p?',
        a: 'α se elige antes de mirar los datos y fija la probabilidad máxima de error tipo I. El valor p se calcula con los datos y es la probabilidad de obtener un estadístico al menos tan extremo como el observado si H₀ fuera verdadera. Se rechaza si p < α, pero no son la misma cosa.'
      },
      {
        q: 'Definí error tipo I, error tipo II y potencia. ¿Qué pasa con la potencia si baja α o si sube n?',
        a: 'Error tipo I: rechazar H₀ cuando es verdadera, con probabilidad α. Error tipo II: no rechazar H₀ cuando es falsa, con probabilidad β. Potencia: 1 − β, la probabilidad de detectar un efecto real. Si baja α, la potencia baja para un n fijo; si sube n, la potencia sube porque el error estándar se reduce.'
      },
      {
        q: '¿Cómo se interpreta un intervalo de confianza al 95%? ¿Qué relación tiene con el contraste bilateral al 5%?',
        a: 'En muestreo repetido, el 95% de los intervalos construidos del mismo modo contiene al parámetro. No es la probabilidad de que β esté en este intervalo concreto. En un contraste bilateral al 5%, H₀: βⱼ = a se rechaza si y solo si a queda fuera del intervalo al 95%.'
      },
      {
        q: 'Un coeficiente es significativo al 5% pero su efecto es minúsculo. ¿Cómo puede ser? ¿Qué reportarías además del p?',
        a: 'La significancia depende del cociente entre el coeficiente y su error estándar. Con una muestra grande, el error estándar se reduce y un efecto pequeño puede volverse significativo. Además del p, reportaría la magnitud del coeficiente en sus unidades, el intervalo de confianza y una evaluación de relevancia económica.'
      }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: inferencia sobre un parámetro',
    intro: 'Empezá por el formulario, seguí con el drill y la sesión, y cerrá con el plan de 7 días. La idea es repasar sin volver a leer todo desde cero.',
    formulas: [
      {
        title: 'Modelo lineal clásico',
        eq: 'u | X ~ N(0, σ<sup>2</sup>)',
        note: 'Gauss-Markov más normalidad. Permite inferencia exacta en muestras chicas.'
      },
      {
        title: 'Distribución de β̂',
        eq: 'β̂<sub>j</sub> | X ~ N(β<sub>j</sub>, Var(β̂<sub>j</sub>))',
        note: 'Bajo el MLC. La media es el parámetro y la varianza depende de σ² y de X.'
      },
      {
        title: 'Estadístico t',
        eq: 't = (β̂<sub>j</sub> − a) / ee(β̂<sub>j</sub>)',
        note: 'Se distribuye t con n − k − 1 grados de libertad bajo H₀ y normalidad.'
      },
      {
        title: 'Valor p',
        eq: 'p = P(|T| ≥ |t<sub>obs</sub>| | H<sub>0</sub>)',
        note: 'Se rechaza H₀ si p < α. No es P(H₀ | datos).'
      },
      {
        title: 'Intervalo de confianza',
        eq: 'β̂<sub>j</sub> ± t<sub>α/2, n−k−1</sub> · ee(β̂<sub>j</sub>)',
        note: 'En muestreo repetido, el (1 − α)% de los intervalos contiene al parámetro.'
      },
      {
        title: 'Potencia',
        eq: 'Potencia = P(rechazar H<sub>0</sub> | H<sub>0</sub> falsa) = 1 − β',
        note: 'Crece con el efecto, con n y con la precisión; cae con el ruido y con un α más exigente.'
      }
    ],
    drills: [
      {
        q: 'Enunciá el supuesto adicional del MLC y qué permite.',
        a: 'u | X ~ N(0, σ²): errores independientes de X y normales con media cero y varianza constante. Permite que β̂ sea normal y que t y F tengan distribuciones exactas.'
      },
      {
        q: 'Escribí el t para H₀: βⱼ = a y sus grados de libertad.',
        a: 't = (β̂ⱼ − a)/ee(β̂ⱼ) ~ t<sub>n−k−1</sub> bajo H₀ y normalidad.'
      },
      {
        q: '¿Qué es el valor p y cómo se usa?',
        a: 'Es P(estadístico al menos tan extremo | H₀). Se rechaza H₀ si p < α. No es la probabilidad de que H₀ sea verdadera.'
      },
      {
        q: 'Escribí el IC al 95% y explicá cuándo rechaza H₀: βⱼ = 0.',
        a: 'β̂ⱼ ± t<sub>0,025, n−k−1</sub> · ee(β̂ⱼ). Se rechaza la nula bilateral al 5% si 0 queda fuera del intervalo.'
      },
      {
        q: 'Definí α, β y potencia.',
        a: 'α = P(rechazar H₀ | H₀ verdadera); β = P(no rechazar | H₀ falsa); potencia = 1 − β.'
      }
    ],
    sourceGuide: [
      {
        stuck: 'No entiendo por qué la normalidad no es un supuesto de Gauss-Markov',
        source: 'Clase 3A, diap. 5–7; Wooldridge §4.1.'
      },
      {
        stuck: 'No sé qué distribución tiene el estadístico t',
        source: 'Clase 3A, diap. 11–14; Wooldridge §4.2.'
      },
      {
        stuck: 'Confundo el valor p con el nivel de significación',
        source: 'Clase 3A, diap. 15–16; Wooldridge §4.2; TP 4, Actividad 2b.'
      },
      {
        stuck: 'No entiendo la diferencia entre error tipo I y tipo II',
        source: 'Clase 3A, diap. 10; TP 4, Actividad 2a.'
      },
      {
        stuck: 'No puedo interpretar un intervalo de confianza',
        source: 'Clase 3A, diap. 18; Wooldridge §4.3.'
      }
    ],
    session: [
      {
        time: '0–10',
        title: 'Pregunta guía',
        text: '¿Cuándo una estimación de un coeficiente es evidencia suficiente para hablar de su parámetro poblacional? Escribí una respuesta de tres líneas.'
      },
      {
        time: '10–30',
        title: 'MLC y estadístico t',
        text: 'Explicá qué agrega la normalidad, qué no corrige y por qué el t tiene n − k − 1 grados de libertad. Fuente: clase 3A, diap. 5–14.'
      },
      {
        time: '30–50',
        title: 'Valor p, IC y potencia',
        text: 'Escribí qué mide un valor p, cómo se construye un IC y qué es la potencia. Resolvé el TP 4, Actividad 2.'
      },
      {
        time: '50–70',
        title: 'Contraste individual',
        text: 'Resolvé el TP 4, Ejercicio 1 y el Ejercicio 4. Interpretá cada coeficiente con su error estándar, su t, su p y su intervalo.'
      },
      {
        time: '70–85',
        title: 'Preguntas de parcial',
        text: '1P 2024–2026: supuestos del MLC, errores no normales, intervalos y valores p. Respondé sin mirar la solución.'
      },
      {
        time: '85–90',
        title: 'Cierre',
        text: 'Anotá una idea que puedas enseñar en dos minutos y una que todavía no puedas explicar sin mirar.'
      }
    ],
    kit: [
      {
        k: 'Kit 01',
        title: 'Una página de ideas clave',
        text: 'MLC, t, valor p, potencia e intervalos, con una frase por concepto.'
      },
      {
        k: 'Kit 02',
        title: 'Tabla de errores',
        text: 'Qué se confunde, por qué y cómo corregirlo. La sección 07 es el punto de partida.'
      },
      {
        k: 'Kit 03',
        title: 'Siete preguntas',
        text: 'La pestaña de Autoevaluación, ordenada de menor a mayor dificultad.'
      },
      {
        k: 'Kit 04',
        title: 'Plan de 7 días',
        text: 'Una rutina corta para no volver a leer todo desde cero.'
      }
    ],
    plan: [
      {
        day: 'Día 1',
        title: 'Teoría y mapa',
        text: 'Leé la clase 03A completa y explicá el mapa de los cuatro pasos sin mirar.'
      },
      {
        day: 'Día 2',
        title: 'MLC y t',
        text: 'Escribí los supuestos, la distribución de β̂ y el estadístico t con sus grados de libertad.'
      },
      {
        day: 'Día 3',
        title: 'TP 4, Actividades 1 y 2',
        text: 'Respondé las actividades conceptuales y justificá cada verdadero o falso.'
      },
      {
        day: 'Día 4',
        title: 'TP 4, Ejercicio 1',
        text: 'Interpretá t, p e intervalos con DEMANDA y explicá qué aporta cada coeficiente.'
      },
      {
        day: 'Día 5',
        title: 'TP 4, Ejercicio 4',
        text: 'Replicá el laboratorio de WAGE2 y leé cada coeficiente con su error estándar y su intervalo.'
      },
      {
        day: 'Día 6',
        title: 'Parciales y simulacro',
        text: 'Resolvé las preguntas de 1P 2024–2026 sobre MLC, t, p e intervalos en 45 minutos, sin mirar.'
      },
      {
        day: 'Día 7',
        title: 'Cierre',
        text: 'Volvé solo a lo que falló y actualizá tu kit de una página.'
      }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para que puedas abrir cada ejercicio desde la práctica.',
    items: [
      {
        type: 'Clase',
        typeClass: '',
        title: 'Clase 3A — Inferencia sobre un parámetro',
        text: 'Fuente principal de la explicación, el orden y los énfasis de esta clase.',
        loc: 'Diapositivas 3–18'
      },
      {
        type: 'Libro',
        typeClass: 'book',
        title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.',
        text: 'Cap. 4, secciones 4.1 a 4.3: MLC, distribución de β̂, contrastes t, valores p e intervalos.',
        loc: 'Cap. 4 · §4.1–4.3'
      },
      {
        type: 'Guía',
        typeClass: '',
        title: 'Guía de Trabajos Prácticos 2026 — TP 4',
        text: 'Actividades 1 y 2 para los conceptos; ejercicios 1 y 4 para aplicar t, valores p e intervalos.',
        loc: 'TP 4 · act. 1–2; ej. 1 y 4',
        href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-4'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '1P 2025',
        text: 'Supuestos de Gauss-Markov y del MLC; consecuencias de errores no normales sobre las propiedades y la inferencia.',
        loc: 'Solución orientativa'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '1P 2026',
        text: 'Por qué la inferencia requiere más que los dos primeros momentos; interpretación de intervalos y valores p.',
        loc: 'Solución orientativa'
      }
    ]
  }
};
