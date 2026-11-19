window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-03b"] = {
  id: 'clase-03b',
  num: '03B',
  eyebrow: 'Clase 03B · Restricciones y muestras grandes',
  title: 'Restricciones, F y propiedades asintóticas',
  lead: 'No todas las hipótesis son sobre un coeficiente aislado. El F contrasta restricciones conjuntas; el LM y la teoría asintótica explican qué vale cuando n crece.',
  question: '¿Cómo se contrasta una hipótesis que involucra varios parámetros a la vez?',
  pills: ['27 diapositivas', 'TP 4 · ej. 1–5', '1P 2024–2026', '4 conceptos clave'],
  sections: [
    {
      id: 'c03b-s01',
      number: '01',
      title: 'Combinaciones lineales de parámetros',
      blocks: [
        {
          type: 'p',
          id: 'c03b-s01-p01',
          html: 'La clase 03A trabajó el contraste de un parámetro por vez. No todas las hipótesis son sobre un coeficiente aislado. La teoría puede afirmar que dos variables tienen el mismo efecto (β<sub>1</sub> = β<sub>2</sub>), que la suma de dos efectos es uno (β<sub>1</sub> + β<sub>2</sub> = 1) o que el efecto de una es el doble de otra. En esos casos hay una <span class="concept" data-concept="combinacion" tabindex="0" role="button">combinación lineal</span> de parámetros y el estadístico t se aplica a la combinación.'
        },
        {
          type: 'formula',
          main: 'θ = β<sub>1</sub> − β<sub>2</sub> &nbsp;&nbsp;·&nbsp;&nbsp; Var(θ̂) = Var(β̂<sub>1</sub>) + Var(β̂<sub>2</sub>) − 2 Cov(β̂<sub>1</sub>, β̂<sub>2</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; t = θ̂ / ee(θ̂)',
          legend: [
            {
              key: 'θ',
              text: 'La combinación que se quiere contrastar. Para H₀: β₁ = β₂, θ = β₁ − β₂ y H₀: θ = 0.'
            },
            {
              key: 'Var(θ̂)',
              text: 'No es la suma de varianzas: la covarianza entre estimadores cambia el resultado.'
            },
            {
              key: 't',
              text: 'Se distribuye t con n − k − 1 grados de libertad bajo el MLC y H₀.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s01-p02',
          html: 'El error estándar de la diferencia no es la suma de los errores estándar. Los estimadores suelen estar correlacionados porque comparten la misma muestra y los mismos regresores; si la covarianza es positiva, la varianza de la diferencia se reduce; si es negativa, aumenta. Ignorarla cambia el estadístico y la conclusión.'
        },
        {
          type: 'p',
          id: 'c03b-s01-p03',
          html: 'Una forma práctica de obtener el contraste es reparametrizar el modelo. Si se define θ = β<sub>1</sub> − β<sub>2</sub> y se reemplaza β<sub>1</sub> = θ + β<sub>2</sub>, el coeficiente que acompaña a X<sub>1</sub> pasa a ser θ. El software reporta directamente su estimación, su error estándar y su t. Es el mismo contraste, escrito de otra manera.'
        },
        {
          type: 'formula',
          main: 'Y = β<sub>0</sub> + θX<sub>1</sub> + β<sub>2</sub>(X<sub>1</sub> + X<sub>2</sub>) + β<sub>3</sub>X<sub>3</sub> + u',
          legend: [
            {
              key: 'θ',
              text: 'Coeficiente de X₁ en el modelo reparametrizado: estima β₁ − β₂.'
            },
            {
              key: 'X₁ + X₂',
              text: 'La suma se incluye como un solo regresor; su coeficiente estima β₂.'
            },
            {
              key: 'Ventaja',
              text: 'El t sobre θ contrasta H₀: β₁ = β₂ sin calcular covarianzas a mano.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'No compares intervalos a ojo',
          html: 'Que dos intervalos individuales se solapen no implica que la diferencia no sea significativa, y que no se solapen no implica lo contrario. El contraste correcto usa la varianza de la diferencia y la covarianza entre los estimadores.'
        },
        {
          type: 'miniCheck',
          id: 'c03b-check-01',
          question: '¿Por qué no alcanza con mirar los t individuales para concluir si β₁ = β₂?',
          intro: 'Pensá qué información falta cuando se comparan dos coeficientes estimados con la misma muestra.',
          answer: 'Porque dos coeficientes pueden ser individualmente significativos y, aun así, no ser estadísticamente distintos entre sí. La comparación requiere el error estándar de la diferencia, que depende de las varianzas de ambos estimadores y de su covarianza. Mirar los t por separado no responde la pregunta de igualdad.'
        }
      ]
    },
    {
      id: 'c03b-s02',
      number: '02',
      title: 'Restricciones múltiples y estadístico F',
      blocks: [
        {
          type: 'p',
          id: 'c03b-s02-p01',
          html: 'Muchas hipótesis involucran varias restricciones a la vez. En un modelo con cuatro variables, H<sub>0</sub>: β<sub>1</sub> = β<sub>2</sub> = 0 afirma que dos regresores no tienen efecto conjunto; H<sub>0</sub>: β<sub>1</sub> = β<sub>2</sub> = β<sub>3</sub> = 0, que tres quedan excluidos. No es equivalente a hacer tres contrastes t por separado: el <span class="concept" data-concept="f" tabindex="0" role="button">F</span> evalúa el aporte conjunto del grupo.'
        },
        {
          type: 'formula',
          main: 'F = [ (SCR<sub>R</sub> − SCR<sub>NR</sub>) / q ] / [ SCR<sub>NR</sub> / (n − k − 1) ] ~ F<sub>q, n−k−1</sub>',
          legend: [
            {
              key: 'SCR<sub>R</sub>',
              text: 'Suma de cuadrados residual del modelo restringido, que impone H₀.'
            },
            {
              key: 'SCR<sub>NR</sub>',
              text: 'Suma de cuadrados residual del modelo no restringido, con todas las variables.'
            },
            {
              key: 'q',
              text: 'Número de restricciones: la diferencia de grados de libertad entre ambos modelos.'
            }
          ]
        },
        {
          type: 'interactive',
          kind: 'f-dist',
          label: 'Laboratorio visual',
          title: 'La F y su cola derecha',
          intro: 'El contraste F nunca es bilateral: la evidencia en contra de H₀ está en la cola derecha. Mové el número de restricciones, los grados de libertad y el F observado para ver cómo cambia el valor crítico y la decisión.',
          hint: 'Más restricciones (q) o menos grados de libertad mueven el umbral. Rechazar exige que la pérdida de ajuste al imponer H₀ sea grande frente al ruido del modelo no restringido. El F no dice cuál restricción falla.'
        },
        {
          type: 'p',
          id: 'c03b-s02-p02',
          html: 'El modelo restringido impone H<sub>0</sub>; el no restringido incluye todas las variables. La SCR del restringido nunca puede ser menor que la del no restringido: al imponer restricciones se pierde ajuste. El F mide si esa pérdida es demasiado grande para atribuirla solo al azar. Los grados de libertad del denominador son los del modelo no restringido.'
        },
        {
          type: 'formula',
          main: 'F = [ (R<sup>2</sup><sub>NR</sub> − R<sup>2</sup><sub>R</sub>) / q ] / [ (1 − R<sup>2</sup><sub>NR</sub>) / (n − k − 1) ]',
          legend: [
            {
              key: 'R²<sub>NR</sub>',
              text: 'Coeficiente de determinación del modelo no restringido.'
            },
            {
              key: 'R²<sub>R</sub>',
              text: 'Coeficiente del modelo restringido.'
            },
            {
              key: 'Condición',
              text: 'Misma variable dependiente y mismo n en los dos modelos.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s02-p03',
          html: 'El F que reporta la salida de una regresión es un caso especial: contrasta H<sub>0</sub>: β<sub>1</sub> = … = β<sub>k</sub> = 0, o sea, que ninguna pendiente aporta. Como el modelo restringido es solo el intercepto y su R² es cero, queda F = [R²/k] / [(1 − R²)/(n − k − 1)]. Rechazar no significa que todas las variables sean significativas: significa que al menos una lo es.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'q',
              title: 'Restricciones',
              text: 'Cantidad de igualdades impuestas bajo H₀. Es la diferencia de grados de libertad entre los modelos.'
            },
            {
              sym: 'n − k − 1',
              title: 'Denominador',
              text: 'Grados de libertad del modelo no restringido, el que contiene todas las variables.'
            },
            {
              sym: 'F ≥ 0',
              title: 'Siempre positivo',
              text: 'La SCR restringida es mayor o igual que la no restringida; el cociente no puede ser negativo.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'F significativo, t no significativos',
          html: 'Es una combinación posible, sobre todo con regresores muy correlacionados. El F detecta que el grupo aporta en conjunto; los t individuales no logran separar qué variable aporta. No es una contradicción: son preguntas distintas.'
        },
        {
          type: 'miniCheck',
          id: 'c03b-check-02',
          question: 'En un modelo con cuatro variables explicativas se contrasta H₀: β₃ = β₄ = 0. ¿Cuántas restricciones hay y cuántos grados de libertad tiene el denominador?',
          intro: 'Contá las igualdades impuestas y los parámetros del modelo no restringido.',
          answer: 'Hay q = 2 restricciones: β₃ = 0 y β₄ = 0. El modelo no restringido tiene k = 4 pendientes y n − 4 − 1 = n − 5 grados de libertad. El estadístico se distribuye F₂,ₙ₋₅.'
        }
      ]
    },
    {
      id: 'c03b-s03',
      number: '03',
      title: 'El multiplicador de Lagrange',
      blocks: [
        {
          type: 'p',
          id: 'c03b-s03-p01',
          html: 'El <span class="concept" data-concept="lm" tabindex="0" role="button">multiplicador de Lagrange</span> (LM) es otra forma de contrastar restricciones de exclusión. La idea es indirecta: se estima el modelo restringido, se guardan sus residuos y se pregunta si esos residuos están correlacionados con las variables que se excluyeron. Si las variables omitidas importan, deberían explicar parte de lo que quedó en el residuo.'
        },
        {
          type: 'formula',
          main: 'ũ = residuos del modelo restringido &nbsp;→&nbsp; regresión auxiliar: ũ sobre X<sub>1</sub>, …, X<sub>k</sub> &nbsp;→&nbsp; LM = n R<sup>2</sup><sub>ũ</sub> ~ χ<sup>2</sup><sub>q</sub>',
          legend: [
            {
              key: 'ũ',
              text: 'Residuos del modelo que impone H₀, sin las variables excluidas.'
            },
            {
              key: 'R²<sub>ũ</sub>',
              text: 'R² de la regresión auxiliar de los residuos sobre todas las X, incluidas las excluidas.'
            },
            {
              key: 'q',
              text: 'Número de restricciones de exclusión. Son los grados de libertad de la chi-cuadrado.'
            }
          ]
        },
        {
          type: 'cards',
          items: [
            {
              sym: '1',
              title: 'Modelo restringido',
              text: 'Se estima imponiendo H₀ y se guardan los residuos. No hace falta estimar el no restringido para calcular el estadístico.'
            },
            {
              sym: '2',
              title: 'Regresión auxiliar',
              text: 'Se regresan los residuos sobre todas las X, incluidas las excluidas. Si no hay relación, el R² será bajo.'
            },
            {
              sym: '3',
              title: 'Decisión',
              text: 'LM se compara con una chi-cuadrado con q grados de libertad. Valores grandes llevan a rechazar H₀.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s03-p02',
          html: 'El LM es un contraste asintótico: no requiere normalidad exacta, pero sí muestras grandes y los supuestos de Gauss-Markov. Asintóticamente, F y LM tienen la misma probabilidad de error tipo I y suelen dar conclusiones parecidas. Con muestras chicas, el F es preferible porque tiene una distribución exacta bajo normalidad.'
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'La misma muestra en las dos regresiones',
          html: 'El modelo restringido y la regresión auxiliar deben usar exactamente las mismas observaciones. Si al agregar variables se pierden casos por datos faltantes, el n cambia y el estadístico deja de ser comparable. Es el mismo cuidado que exige el F con modelos anidados.'
        },
        {
          type: 'miniCheck',
          id: 'c03b-check-03',
          question: 'Si los residuos del modelo restringido no están correlacionados con las variables excluidas, ¿qué esperás del LM?',
          intro: 'Pensá en el R² de la regresión auxiliar.',
          answer: 'Un R² auxiliar cercano a cero y, por lo tanto, un LM cercano a cero. No habría evidencia de que las variables excluidas aporten para explicar lo que quedó en el residuo, y no se rechazaría H₀ de que sus coeficientes son conjuntamente cero.'
        }
      ]
    },
    {
      id: 'c03b-s04',
      number: '04',
      title: 'Normalidad asintótica y TCL',
      blocks: [
        {
          type: 'p',
          id: 'c03b-s04-p01',
          html: 'La normalidad exacta de los errores es un supuesto fuerte. Si los errores no son normales, β̂ no tiene distribución normal exacta y los estadísticos t y F no siguen exactamente t y F. Sin embargo, cuando n crece, el teorema central del límite entra en juego: los estimadores son combinaciones lineales de errores y su distribución se aproxima a la normal.'
        },
        {
          type: 'formula',
          main: 't<sub>n−k−1</sub> → N(0,1) cuando n → ∞ &nbsp;&nbsp;·&nbsp;&nbsp; ee(β̂<sub>j</sub>) se reduce a una tasa ≈ 1/√n',
          legend: [
            {
              key: 'TCL',
              text: 'La suma estandarizada de variables aleatorias independientes tiende a la normal.'
            },
            {
              key: 'Error estándar asintótico',
              text: 'Es el ee calculado sin suponer normalidad exacta; se usa en muestras grandes.'
            },
            {
              key: 'Calidad',
              text: 'La aproximación depende de n y de los grados de libertad; no es igual con 20 que con 2.000 observaciones.'
            }
          ]
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'TCL',
              title: 'Teorema central del límite',
              text: 'La suma estandarizada de variables aleatorias independientes tiende a la normal cuando n crece.'
            },
            {
              sym: 'LGN',
              title: 'Ley de los grandes números',
              text: 'Los momentos muestrales convergen en probabilidad a los poblacionales. Es la base de la consistencia.'
            },
            {
              sym: '1/√n',
              title: 'Velocidad',
              text: 'Los errores estándar se reducen con la raíz del tamaño muestral. Cuadruplicar n reduce el ee a la mitad.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s04-p02',
          html: 'En muestras grandes, los contrastes t y F son válidos asintóticamente aunque los errores no sean normales. Los errores estándar se llaman asintóticos y la aproximación mejora con n y con los grados de libertad. Pero hay un límite importante: la homocedasticidad sigue siendo necesaria para los errores estándar usuales. Con heterocedasticidad, t y F pueden ser inválidos por más grande que sea la muestra.'
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Muestras grandes no arreglan todo',
          html: 'El TCL reemplaza la normalidad, no la exogeneidad. Si hay variables omitidas o endogeneidad, el estimador sigue siendo sesgado e inconsistente aunque n sea enorme. La normalidad asintótica mejora la forma de la distribución, no la identificación del parámetro.'
        },
        {
          type: 'miniCheck',
          id: 'c03b-check-04',
          question: '¿Por qué en una muestra grande podés usar t aunque los errores no sean normales?',
          intro: 'Relacioná la distribución de β̂ con el teorema central del límite.',
          answer: 'Porque el TCL garantiza que β̂ sea aproximadamente normal en muestras grandes, aunque los errores no sean normales. Entonces el estadístico t converge a una normal estándar y los valores críticos de la t son una aproximación razonable. La aproximación es asintótica y depende de n y de los grados de libertad. Además, se mantienen los supuestos de Gauss-Markov, en particular la homocedasticidad.'
        }
      ]
    },
    {
      id: 'c03b-s05',
      number: '05',
      title: 'Consistencia y sesgo asintótico',
      blocks: [
        {
          type: 'p',
          id: 'c03b-s05-p01',
          html: 'La <span class="concept" data-concept="consistencia" tabindex="0" role="button">consistencia</span> es la propiedad mínima de un estimador: a medida que el tamaño de muestra crece, su distribución se concentra en el parámetro. El límite en probabilidad, o plim, es el valor al que converge. Bajo los supuestos de Gauss-Markov, MCO es consistente; si falla la exogeneidad, no lo es.'
        },
        {
          type: 'formula',
          main: 'plim β̂<sub>1</sub> = β<sub>1</sub> + Cov(X<sub>1</sub>, u) / Var(X<sub>1</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; sesgo asintótico = plim β̂<sub>1</sub> − β<sub>1</sub>',
          legend: [
            {
              key: 'Cov = 0',
              text: 'Si X₁ no está correlacionada con el error, el segundo término desaparece y el estimador es consistente.'
            },
            {
              key: 'Cov ≠ 0',
              text: 'El sesgo no se diluye con más observaciones: se vuelve un sesgo asintótico.'
            },
            {
              key: 'Modelo múltiple',
              text: 'La fórmula exacta es más compleja, pero la idea es la misma: importa la relación entre Xⱼ y u, descontadas las demás X.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s05-p02',
          html: 'Si Cov(X<sub>1</sub>, u) = 0, el estimador converge al parámetro. Si no, el signo del sesgo depende del signo de la covarianza. En un modelo de salario, si la habilidad no observada está en u y la educación está correlacionada positivamente con ella, MCO sobreestima el efecto de la educación. Agregar más observaciones no corrige ese problema: lo hace más evidente.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'plim',
              title: 'Límite en probabilidad',
              text: 'El valor al que converge el estimador cuando n → ∞. No es el promedio de una muestra finita.'
            },
            {
              sym: 'Consistencia',
              title: 'plim β̂ = β',
              text: 'La distribución se colapsa en el parámetro. Es una propiedad asintótica, no de una estimación concreta.'
            },
            {
              sym: 'Sesgo asintótico',
              title: 'plim β̂ − β',
              text: 'Lo que queda cuando la muestra crece. Si es distinto de cero, más datos no corrigen el problema.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s05-p03',
          html: 'Insesgamiento y consistencia no son lo mismo. Un estimador puede ser insesgado y no consistente si su varianza no se reduce; otro puede ser sesgado en muestras finitas pero consistente si el sesgo desaparece con n. MCO bajo Gauss-Markov es insesgado y consistente. La distinción importa porque muchas propiedades deseables se definen en muestras grandes, mientras que la inferencia se hace con una muestra fija.'
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'Una muestra no demuestra consistencia',
          html: 'Que β̂ esté lejos de β en tu muestra no prueba que el estimador sea inconsistente: puede ser variabilidad muestral. La consistencia se estudia como un experimento teórico con n → ∞. Lo que sí se puede diagnosticar en la muestra es si hay motivos para sospechar Cov(X, u) ≠ 0.'
        },
        {
          type: 'miniCheck',
          id: 'c03b-check-05',
          question: 'Un investigador dice: “mi estimación cambió al agregar observaciones, entonces el estimador es inconsistente”. ¿Qué le respondés?',
          intro: 'Distinguí variabilidad muestral de sesgo asintótico.',
          answer: 'Que la comparación de dos muestras no prueba inconsistencia. Un cambio puede ser variabilidad muestral normal: β̂ es una variable aleatoria y distintas muestras dan valores distintos. La consistencia es una propiedad del límite cuando n → ∞. Si sospecha endogeneidad, el argumento debe basarse en la relación entre X y u, no en el cambio de una estimación.'
        }
      ]
    },
    {
      id: 'c03b-s06',
      number: '06',
      title: 'Errores frecuentes y mapa de la inferencia conjunta',
      blocks: [
        {
          type: 'errorTable',
          rows: [
            {
              error: 'Contrastar β₁ = β₂ comparando los t individuales',
              why: 'La igualdad requiere el error estándar de la diferencia y la covarianza entre estimadores.',
              fix: 'Reparametrizá el modelo o usá una combinación lineal de parámetros.'
            },
            {
              error: 'Interpretar un F significativo como que todas las variables son significativas',
              why: 'El F contrasta el conjunto: rechaza que todas sean cero, no que cada una lo sea.',
              fix: 'Mirá el F junto con los t y los intervalos de cada coeficiente.'
            },
            {
              error: 'Creer que una muestra grande corrige endogeneidad',
              why: 'La consistencia requiere Cov(X, u) = 0; el TCL no arregla la identificación.',
              fix: 'Revisá el diseño, las variables omitidas y los instrumentos antes de confiar en el n.'
            }
          ]
        },
        {
          type: 'map',
          steps: [
            {
              n: '1',
              title: 'Escribir la hipótesis',
              text: 'Una combinación lineal, una igualdad entre coeficientes o un conjunto de exclusiones. Elegí t, F o LM.'
            },
            {
              n: '2',
              title: 'Elegir el supuesto',
              text: 'MLC para un F exacto; LM y TCL para muestras grandes. Gauss-Markov se mantiene.'
            },
            {
              n: '3',
              title: 'Calcular el estadístico',
              text: 'F con SCR o R² y q restricciones; LM = nR² auxiliar; t para una combinación lineal.'
            },
            {
              n: '4',
              title: 'Decidir e interpretar',
              text: 'Compará con el valor crítico o el p; decí qué restricción se rechaza y cuál no.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'La pieza anterior',
          html: 'El contraste de un coeficiente aislado, el valor p, la potencia y los intervalos se repasan en la <a href="#clase-03a">clase 03A</a>. Esta clase generaliza esa lógica a varias restricciones y estudia qué pasa cuando n crece.'
        },
        {
          type: 'sourceStrip',
          chips: [
            {
              label: 'Clase 3B',
              text: 'diap. 19–45'
            },
            {
              label: 'Wooldridge 4ed',
              text: 'Cap. 4–5'
            },
            {
              label: 'TP 4',
              text: 'ej. 1–5'
            },
            {
              label: 'Parciales',
              text: '1P 2024–2026'
            }
          ]
        }
      ]
    },
    {
      id: 'c03b-s07',
      number: '07',
      title: 'Profundización: lo que suele quedar en el aire',
      blocks: [
        {
          type: 'p',
          id: 'c03b-s07-p01',
          html: 'Esta sección cierra tres piezas que la clase usa pero no desarrolla del todo: el F sirve para cualquier restricción lineal, no solo para excluir variables; la multicolinealidad explica por qué un F puede ser significativo con t individuales que no lo son; y en muestras grandes la significancia estadística deja de ser una buena medida de importancia económica. Las tres aparecen en el parcial y en el TP 4.'
        },
        {
          type: 'p',
          id: 'c03b-s07-p02',
          html: 'Hasta acá el F apareció como un contraste de exclusiones: β<sub>3</sub> = β<sub>4</sub> = 0. Pero la fórmula acepta cualquier restricción lineal sobre los parámetros. Por ejemplo, β<sub>1</sub> + β<sub>2</sub> = 1, β<sub>1</sub> = 2β<sub>2</sub> o β<sub>1</sub> + β<sub>2</sub> + β<sub>3</sub> = 0. En todos los casos se estima el modelo que impone la restricción y se compara su SCR con la del modelo libre.'
        },
        {
          type: 'formula',
          main: 'H<sub>0</sub>: Rβ = r &nbsp;→&nbsp; F = [(SCR<sub>R</sub> − SCR<sub>NR</sub>)/q] / [SCR<sub>NR</sub>/(n − k − 1)] &nbsp;·&nbsp; con q = 1: F = t<sup>2</sup>',
          legend: [
            {
              key: 'Rβ = r',
              text: 'Forma general de q restricciones lineales. Incluye exclusiones, igualdades entre coeficientes y valores fijados.'
            },
            {
              key: 'q = 1',
              text: 'Con una sola restricción, el F y el t contrastan lo mismo y se cumple F = t².'
            },
            {
              key: 'Modelo restringido',
              text: 'Debe imponer exactamente la restricción que se quiere contrastar. Si impone otra, el contraste no responde la pregunta.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c03b-s07-p03',
          html: 'La multicolinealidad es la relación lineal fuerte entre regresores. No viola Gauss-Markov y no sesga los coeficientes, pero infla sus errores estándar. Por eso los t individuales pueden quedar no significativos mientras el F conjunto rechaza: cada coeficiente se estima con mucha imprecisión, aunque el grupo aporte en bloque. El caso extremo es la colinealidad perfecta: una variable es combinación exacta de otras y la matriz X<sup>T</sup>X no se puede invertir. Ahí el software directamente no estima. La colinealidad imperfecta es un problema de precisión, no de identificación. Como referencia, un FIV mayor a 10 suele tomarse como señal de colinealidad alta, aunque el corte no es una regla absoluta.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'No',
              title: 'No viola supuestos',
              text: 'Los coeficientes siguen siendo insesgados bajo Gauss-Markov. Lo que cambia es la precisión con la que se estiman.'
            },
            {
              sym: 'Sí',
              title: 'Infla las varianzas',
              text: 'Cuanto más se parece un regresor a una combinación de los otros, más ancho es su intervalo y menos claro su efecto parcial.'
            },
            {
              sym: 'FIV',
              title: 'Cómo se detecta',
              text: 'El factor de inflación de varianza resume esa relación. Un valor alto es una señal de alerta, no una prueba de que el modelo esté mal.'
            },
            {
              sym: 'Predicción',
              title: 'No impide pronosticar',
              text: 'Si el objetivo es predecir y las relaciones se mantienen, la colinealidad molesta menos que cuando se quiere separar efectos.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Significativo no es grande',
          html: 'Con n grande, casi cualquier coeficiente distinto de cero aparece como significativo. El error estándar se reduce con la raíz de n, así que un efecto pequeño puede tener un t enorme. Antes de celebrar el p, mirá la magnitud, las unidades y el intervalo. En el laboratorio, el coeficiente de sibs es significativo, pero haría falta un aumento de casi once hermanos para mover la educación predicha un año. La consistencia tampoco vuelve relevante un efecto: con más datos el estimador se acerca al parámetro, pero el parámetro puede ser pequeño.'
        },
        {
          type: 'miniCheck',
          id: 'c03b-check-08',
          question: 'Un modelo con diez regresores da un F conjunto significativo, pero ningún t individual lo es. ¿El modelo sirve? ¿Qué explicación es compatible con ese resultado?',
          intro: 'Pensá en la relación entre los regresores y en lo que cada contraste mide.',
          answer: 'Es un resultado compatible con multicolinealidad alta: los regresores están muy relacionados entre sí, el grupo aporta en conjunto, pero cuesta separar el efecto de cada uno. El F rechaza que todas las pendientes sean cero; los t no logran identificar cuál aporta. El modelo puede servir para predecir y para describir el grupo, pero no para afirmar el efecto parcial de una variable en particular. Antes de sacar conclusiones, mirá la matriz de correlaciones, el FIV y los intervalos.'
        }
      ]
    }
  ],
  concepts: {
    combinacion: {
      title: 'Combinación lineal de parámetros',
      sub: 'Contrastar diferencias y sumas, no solo coeficientes individuales.',
      simple: `<p>Imaginá que dos compañeros rinden el mismo examen y querés saber si uno es mejor que el otro. Las notas de los dos suben o bajan juntas según lo difícil que fue el examen, así que comparar la diferencia es más informativo que mirar cada nota por separado.</p><p>Con los coeficientes pasa algo parecido: se mueven juntos porque salen de la misma muestra. Por eso la comparación tiene que hacerse con la diferencia y con su propia medida de precisión.</p>`,
      viz: 't-dist',
      vizIntro: 'Fijate en los grados de libertad y en el valor crítico. El t de una combinación usa n − k − 1, los mismos grados de libertad del modelo.',
      vizHint: 'Con pocos grados de libertad, la t tiene colas más gordas y exige un valor crítico más alto. Cuando n crece, la t se acerca a la normal.',
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
      conexiones: `<p>Las combinaciones lineales generalizan el t individual. El F, a su vez, generaliza el contraste a varias restricciones simultáneas. El t individual y los intervalos se repasan en la <a href="#clase-03a">clase 03A</a>.</p>
        <div><button class="concept-chip" data-concept="f">Estadístico F →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3B, diap. 19–22.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 4, Ej. 4k–l.</p></div>
      `
    },
    f: {
      title: 'Estadístico F',
      sub: 'El contraste conjunto de varias restricciones lineales.',
      simple: `<p>Pensá en un equipo de trabajo: para saber si el grupo aporta, no alcanza con evaluar a cada persona por separado. Mirás cuánto se pierde si el equipo completo no está. El F hace esa cuenta con un modelo: compara el ajuste con el grupo de variables y sin él. Si la caída de ajuste es grande frente al ruido de los datos, rechazás que el grupo entero no sirva, aunque eso no te dice cuál de las variables aporta.</p>`,
      viz: 'f-dist',
      vizIntro: 'Movés q, los grados de libertad del denominador y el F observado. Mirá cómo se corre el valor crítico y cómo cambia la cola derecha.',
      vizHint: 'El umbral depende de q y de los grados de libertad, no de un número fijo. Un F grande frente a ese umbral indica que la pérdida de ajuste al imponer H₀ no se explica solo por azar.',
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
      conexiones: `<p>El F generaliza el t a restricciones múltiples. El LM ofrece una alternativa asintótica cuando no se quiere estimar el modelo no restringido. El contraste individual se repasa en la <a href="#clase-03a">clase 03A</a>.</p>
        <div><button class="concept-chip" data-concept="lm">LM →</button><button class="concept-chip" data-concept="combinacion">Combinaciones →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3B, diap. 23–29.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §4.5.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024 y 1P 2026, F basado en R² y en SCR.</p></div>
      `
    },
    lm: {
      title: 'Multiplicador de Lagrange',
      sub: 'Un contraste asintótico de restricciones de exclusión.',
      simple: `<p>Supongamos que limpiás una habitación y dejás una esquina sin barrer: después mirás el polvo que quedó y te preguntás si viene de ahí. El LM hace algo así: estima el modelo sin las variables que querés descartar y mira si lo que quedó sin explicar se relaciona con ellas. Si el residuo no tiene nada que ver con las variables excluidas, no hay motivo para sospechar que importan. Si las explica, la restricción de excluirlas pierde fuerza.</p>`,
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
      conexiones: `<p>El LM y el F responden la misma pregunta con lógicas distintas: uno es exacto bajo normalidad, el otro es asintótico. Ambos se apoyan en los supuestos de Gauss-Markov. El MLC y la normalidad se repasan en la <a href="#clase-03a">clase 03A</a>.</p>
        <div><button class="concept-chip" data-concept="f">Estadístico F →</button><button class="concept-chip" data-concept="consistencia">Consistencia →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3B, diap. 33–35.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §5.2.</p></div>
      `
    },
    consistencia: {
      title: 'Consistencia y plim',
      sub: 'Qué pasa con el estimador cuando la muestra crece.',
      simple: `<p>Pensá en alguien que tira dardos con la mira corrida: puede tirar mil veces y agrupar todos los tiros, pero el centro del grupo va a quedar lejos del blanco. Más tiros dan precisión, no corrigen la dirección. Un estimador consistente es el que, con más datos, se concentra en el parámetro correcto. Si el problema es de diseño, la muestra enorme solo hace más visible el error.</p>`,
      viz: 'sampling-bias',
      vizIntro: 'Cambiá el sesgo y el tamaño de muestra. Mirá qué pasa con el centro de la distribución y qué pasa con su ancho.',
      vizHint: 'Más n angosta la curva, pero no mueve el centro. Si el estimador apunta al lugar equivocado, la consistencia no se alcanza acumulando datos.',
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
      conexiones: `<p>La consistencia cierra el bloque asintótico: conecta los supuestos de Gauss-Markov con el comportamiento en muestras grandes y con el sesgo asintótico. El MLC y los intervalos se repasan en la <a href="#clase-03a">clase 03A</a>.</p>
        <div><button class="concept-chip" data-concept="f">Estadístico F →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 3B, diap. 39–44.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, §5.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2026, interpretación del límite de probabilidad.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de restricciones y muestras grandes',
    intro: 'La segunda mitad trabaja restricciones conjuntas y propiedades asintóticas: F, LM, normalidad asintótica y consistencia. La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-4',
    exercises: [
      {
        label: 'TP 4 · Ej. 1',
        title: 'El F con datos de demanda',
        text: 'Usá el modelo de demanda para plantear y leer el contraste conjunto, identificar q y los grados de libertad, y comparar la conclusión con los t individuales.',
        tags: ['Aplicar', 'DEMANDA'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-3'
      },
      {
        label: 'TP 4 · Ej. 2',
        title: 'Restricciones y modelos anidados en ENGHO',
        text: 'Volvé al modelo del TP 3, contrastá la restricción conjunta al agregar CANTOCUP y explicá por qué el F exige la misma Y y el mismo n.',
        tags: ['Aplicar', 'ENGHO'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-3'
      },
      {
        label: 'TP 4 · Ej. 4',
        title: '¿La educación de la madre y del padre tiene el mismo efecto?',
        text: 'Contrastá β_meduc = β_feduc con la diferencia, su error estándar y la reparametrización; leé el F del modelo y sus grados de libertad.',
        tags: ['Aplicar', 'WAGE2'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-3'
      },
      {
        label: 'TP 4 · Ej. 5',
        title: '¿Elegir el modelo por R²?',
        text: 'Analizá si el mayor R² justifica quitar el intercepto. Discutí supuestos, interpretación y comparabilidad de los modelos.',
        tags: ['Razonar', 'R²'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-5-3'
      }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 4 · Ej. 4',
      title: 'Cómo se lee un F y una combinación lineal',
      intro: 'La misma salida del TP 4, Ej. 4, permite leer el contraste conjunto del modelo y, con la reparametrización, el contraste β_meduc = β_feduc directamente en la tabla. Es el laboratorio natural para esta clase.',
      dataNote: 'La salida usa la base WAGE2: educación de la persona en función de la educación de la madre, la del padre y la cantidad de hermanos. La base tiene 935 observaciones, pero meduc y feduc tienen datos faltantes: R estima con 722 y elimina 213. El n efectivo es parte del resultado.',
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
        {
          element: 'F-statistic',
          meaning: 'Contraste conjunto.',
          how: 'H₀: todas las pendientes son cero. Rechazar indica que al menos una aporta.'
        },
        {
          element: 'Multiple R-squared',
          meaning: 'Proporción de variación explicada.',
          how: '0,2141: el modelo explica 21,4% de la variación de educ. No prueba significancia ni causalidad.'
        },
        {
          element: 'I(meduc + feduc)',
          meaning: 'Regresor suma del modelo reparametrizado.',
          how: 'Su coeficiente estima β_feduc. El coeficiente de meduc, en cambio, estima la diferencia β_meduc − β_feduc.'
        },
        {
          element: 'Estimate (reparametrizado)',
          meaning: 'Diferencia estimada entre los coeficientes.',
          how: '−0,079: la educación de la madre se asocia con 0,079 años menos de educación que la del padre, con las demás variables constantes.'
        },
        {
          element: 't value (reparametrizado)',
          meaning: 'Contraste de β_meduc − β_feduc = 0.',
          how: '−1,50 con p = 0,135: no se rechaza la igualdad al 5%. El intervalo de la diferencia va de −0,183 a 0,025.'
        },
        {
          element: 'Observations deleted',
          meaning: 'Casos con datos faltantes.',
          how: 'La inferencia usa 722 observaciones, no 935. Si cambia el n entre modelos, la comparación puede no ser válida.'
        }
      ],
      econometric: `<p><strong>F = 65,2; p &lt; 2,2 × 10<sup>−16</sup>.</strong> En conjunto, meduc, feduc y sibs explican educ. El F no dice cuál de las tres variables aporta ni que todas sean igual de relevantes.</p>
        <p><strong>Reestimación:</strong> el coeficiente de meduc pasa a −0,079 con t = −1,50 y p = 0,135. Ya no estima el efecto de la madre: estima la diferencia β<sub>meduc</sub> − β<sub>feduc</sub>. El contraste no rechaza la igualdad de efectos al 5%.</p>`,
      economic: `<p>La comparación de coeficientes es una hipótesis sobre una combinación lineal, no sobre cada coeficiente por separado. El signo y la magnitud de β̂<sub>meduc</sub> − β̂<sub>feduc</sub> describen la diferencia estimada; el error estándar y el intervalo dicen si esa diferencia puede atribuirse al azar muestral.</p>
        <p>La magnitud de sibs invita a una cuenta útil: si se quisiera una reducción de un año en la educación predicha manteniendo constantes meduc y feduc, haría falta un aumento de 1 / 0,0936 ≈ 10,7 hermanos. Es una forma de mostrar que “significativo” no es sinónimo de “económicamente grande”.</p>
        <p>Nada de esto identifica el efecto causal de la educación de los padres. La habilidad y el nivel socioeconómico no observados pueden estar correlacionados con las tres variables y quedar en el error. La inferencia describe asociaciones condicionales precisas; la causalidad exige un diseño adicional.</p>`,
      errors: [
        'Concluir que feduc importa más que meduc solo porque su coeficiente es mayor. Hay que contrastar la diferencia con su error estándar y su intervalo.',
        'Ignorar los 213 casos eliminados por datos faltantes. El n efectivo es 722 y debe reportarse; comparar modelos con distinto n puede invalidar el F.',
        'Creer que un coeficiente no significativo prueba que el efecto es cero. El intervalo de la diferencia incluye valores distintos de cero.',
        'Leer el F como si cada coeficiente fuera significativo. El F rechaza que todas las pendientes sean cero; no dice cuáles aportan.'
      ],
      checklist: [
        'Reportá q, los grados de libertad y el estadístico F o LM.',
        'Verificá que los modelos estén anidados, con la misma Y y el mismo n.',
        'Interpretá el F como un contraste conjunto: rechazar no implica que todas las variables aporten.',
        'Para comparar dos coeficientes, usá la diferencia, su error estándar y su intervalo.',
        'No leas un F no significativo como prueba de que ningún efecto existe.',
        'Separá la inferencia asintótica de la identificación causal.'
      ]
    },
    partials: [
      {
        label: '1P 2024',
        text: 'Diferencias entre H₀: β₁ = 1 y H₀: β₁ = β₂ = 0; F basado en R² para distintas restricciones; distribución exacta versus asintótica.'
      },
      {
        label: '1P 2025',
        text: 'Supuestos de Gauss-Markov y del MLC; qué cambia en la inferencia con errores no normales y con muestras grandes.'
      },
      {
        label: '1P 2026',
        text: 'Por qué la inferencia requiere más que esperanza y varianza; F basado en R² y en SCR; interpretación del plim.'
      }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a restricciones conjuntas, comparaciones entre coeficientes y el comportamiento de los estimadores en muestras grandes. Respondé antes de abrir la solución.',
    questions: [
      {
        q: '¿Cómo se contrasta H₀: β₁ = β₂ y por qué no alcanza con comparar los t individuales?',
        a: 'Se define θ = β₁ − β₂ y se usa t = θ̂ / ee(θ̂), con Var(θ̂) = Var(β̂₁) + Var(β̂₂) − 2Cov(β̂₁, β̂₂). Comparar los t individuales no responde la pregunta: dos coeficientes pueden ser significativos y no ser distintos entre sí. La covarianza entre estimadores afecta el error estándar de la diferencia.'
      },
      {
        q: 'En un modelo con cuatro variables se contrasta H₀: β₃ = β₄ = 0. Escribí el F basado en SCR y en R², e indicá q y los grados de libertad.',
        a: 'F = [(SCR_R − SCR_NR)/q] / [SCR_NR/(n − k − 1)] = [(R²_NR − R²_R)/q] / [(1 − R²_NR)/(n − k − 1)]. Hay q = 2 restricciones; el modelo no restringido tiene k = 4 pendientes, así que el denominador tiene n − 5 grados de libertad. El estadístico se distribuye F₂,ₙ₋₅ bajo H₀ y normalidad.'
      },
      {
        q: '¿Por qué un F significativo no implica que todos los coeficientes sean distintos de cero?',
        a: 'Porque el F contrasta el conjunto: H₀ dice que todos los coeficientes del grupo son cero; la alternativa es que al menos uno sea distinto de cero. Rechazar indica que el grupo aporta, no que cada variable aporte por separado. Con regresores correlacionados, un F alto puede convivir con t individuales no significativos.'
      },
      {
        q: 'Describí los pasos del contraste LM y su distribución. ¿Cuándo preferís F y cuándo LM?',
        a: 'Se estima el modelo restringido, se guardan los residuos, se regresan sobre todas las X —incluidas las excluidas— y se calcula LM = nR²_ũ, que bajo H₀ se distribuye asintóticamente χ²_q. Se prefiere F con muestras chicas porque es exacto bajo normalidad; LM es útil con muestras grandes o cuando solo se estima el modelo restringido.'
      },
      {
        q: '¿Por qué en una muestra grande se puede usar t aunque los errores no sean normales? ¿Qué supuestos siguen siendo necesarios?',
        a: 'Por el teorema central del límite: β̂ es aproximadamente normal en muestras grandes y el estadístico t converge a una normal estándar. La aproximación depende de n y de los grados de libertad. Siguen siendo necesarios los supuestos de Gauss-Markov, en particular E(u|X) = 0 y homocedasticidad; el TCL no corrige endogeneidad ni errores con varianza no constante.'
      },
      {
        q: '¿Qué significa que un estimador sea consistente? ¿Por qué una muestra grande no corrige el sesgo por omisión?',
        a: 'Significa que plim β̂ = β: cuando n → ∞, la distribución se concentra en el parámetro. Si Cov(X, u) ≠ 0, plim β̂ = β + Cov(X,u)/Var(X), así que aparece un sesgo asintótico que no desaparece al aumentar n. El tamaño de muestra reduce la varianza, no la correlación entre X y el error.'
      }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: restricciones y muestras grandes',
    intro: 'Empezá por el formulario, seguí con el drill y la sesión, y cerrá con el plan de 7 días. La idea es repasar sin volver a leer todo desde cero.',
    formulas: [
      {
        title: 'Varianza de una diferencia',
        eq: 'Var(β̂<sub>1</sub> − β̂<sub>2</sub>) = Var(β̂<sub>1</sub>) + Var(β̂<sub>2</sub>) − 2Cov(β̂<sub>1</sub>, β̂<sub>2</sub>)',
        note: 'No se suman los errores estándar: la covarianza importa.',
        more: `<p>La varianza de una diferencia no se obtiene sumando varianzas: el término de covarianza puede restar o sumar. Dos coeficientes de la misma regresión suelen estar correlacionados porque comparten muestra y regresores.</p><ul><li><b>Cuándo se usa:</b> al contrastar β₁ = β₂ o cualquier diferencia entre coeficientes.</li><li><b>Error típico:</b> sumar los errores estándar y olvidar la covarianza, que es lo que más cambia el resultado.</li><li><b>Conexión:</b> la reparametrización permite leer esa diferencia directo en la salida.</li></ul>`
      },
      {
        title: 'Reparametrización',
        eq: 'Y = β<sub>0</sub> + θX<sub>1</sub> + β<sub>2</sub>(X<sub>1</sub> + X<sub>2</sub>) + β<sub>3</sub>X<sub>3</sub> + u',
        note: 'Con θ = β₁ − β₂, el t sobre θ contrasta H₀: β₁ = β₂.',
        more: `<p>El modelo reparametrizado ajusta exactamente igual que el original: cambia la lectura de los coeficientes, no el ajuste. El coeficiente de X₁ pasa a estimar la diferencia θ = β₁ − β₂ y el de la suma estima β₂.</p><ul><li><b>Cuándo se usa:</b> para contrastar igualdades entre coeficientes sin calcular covarianzas a mano.</li><li><b>Error típico:</b> comparar los coeficientes de las dos parametrizaciones como si midieran lo mismo.</li><li><b>Conexión:</b> con una sola restricción, el t de θ y el F del contraste cumplen F = t².</li></ul>`
      },
      {
        title: 'F basado en SCR',
        eq: 'F = [(SCR<sub>R</sub> − SCR<sub>NR</sub>)/q] / [SCR<sub>NR</sub>/(n − k − 1)]',
        note: 'q restricciones; grados de libertad q y n − k − 1.',
        more: `<p>El numerador mide cuánto aumenta la SCR al imponer las q restricciones, repartido entre esas q. El denominador mide el ruido que queda en el modelo completo, por grado de libertad. El cociente crece cuando la restricción cuesta mucho ajuste.</p><ul><li><b>Cuándo se usa:</b> con restricciones de exclusión y modelos anidados, que difieren solo en las variables que se quitan.</li><li><b>Error típico:</b> confundir q con k o usar los grados de libertad del modelo restringido en el denominador.</li><li><b>Conexión:</b> es la misma lógica del LM, pero con una distribución exacta bajo normalidad.</li></ul>`
      },
      {
        title: 'F basado en R²',
        eq: 'F = [(R²<sub>NR</sub> − R²<sub>R</sub>)/q] / [(1 − R²<sub>NR</sub>)/(n − k − 1)]',
        note: 'Exige la misma variable dependiente y el mismo n.',
        more: `<p>Es la versión del F que usa el ajuste en lugar de la SCR. Como SCR = SCT(1 − R²), el cociente se reescribe con las R² de los dos modelos. Solo vale si la variable dependiente y el número de observaciones son idénticos.</p><ul><li><b>Cuándo se usa:</b> cuando el software reporta R² y no las sumas de cuadrados.</li><li><b>Error típico:</b> aplicarlo a modelos con distintas transformaciones de Y o con distinto n por datos faltantes.</li><li><b>Conexión:</b> con q = k y R² del modelo nulo igual a cero, queda el F de significación global.</li></ul>`
      },
      {
        title: 'F de significación global',
        eq: 'F = [R²/k] / [(1 − R²)/(n − k − 1)]',
        note: 'H₀: todas las pendientes son cero. Rechazar indica que al menos una aporta.',
        more: `<p>Contrasta si el conjunto de pendientes aporta algo frente a un modelo que solo tiene intercepto. Rechazar significa que al menos una pendiente es distinta de cero, no que todas lo sean.</p><ul><li><b>Cuándo se usa:</b> como primer diagnóstico de una regresión y para reportar la significancia conjunta.</li><li><b>Error típico:</b> leer el rechazo como prueba de que cada variable es relevante.</li><li><b>Conexión:</b> con regresores correlacionados puede convivir con t individuales no significativos.</li></ul>`
      },
      {
        title: 'Multiplicador de Lagrange',
        eq: 'LM = n R²<sub>ũ</sub> ~ χ²<sub>q</sub>',
        note: 'R² de la regresión auxiliar de los residuos restringidos sobre todas las X.',
        more: `<p>El estadístico resume si los residuos del modelo restringido conservan relación con las variables excluidas. Se calcula con el R² de esa regresión auxiliar, multiplicado por n. Su distribución es chi-cuadrado con q grados de libertad, siempre asintótica.</p><ul><li><b>Cuándo se usa:</b> con muestras grandes o cuando solo se estimó el modelo restringido.</li><li><b>Error típico:</b> usar el R² del modelo original o cambiar el n entre las dos regresiones.</li><li><b>Conexión:</b> asintóticamente coincide con el F; en muestras chicas, conviene el F.</li></ul>`
      },
      {
        title: 'Consistencia',
        eq: 'plim β̂<sub>1</sub> = β<sub>1</sub> + Cov(X<sub>1</sub>, u) / Var(X<sub>1</sub>)',
        note: 'Si Cov = 0, es consistente. Si no, hay sesgo asintótico.',
        more: `<p>El plim describe el valor al que se acerca el estimador cuando n crece. Si la covarianza entre X y el error es cero, el segundo término desaparece y el estimador converge al parámetro. Si no, queda un sesgo que no se diluye.</p><ul><li><b>Cuándo se usa:</b> para discutir si más datos mejorarían la estimación o solo la harían más precisa alrededor del valor equivocado.</li><li><b>Error típico:</b> creer que una muestra grande corrige la endogeneidad.</li><li><b>Conexión:</b> la solución pasa por el diseño o por variables instrumentales, no por el tamaño.</li></ul>`
      },
      {
        title: 'Normalidad asintótica',
        eq: 't<sub>n−k−1</sub> → N(0,1) cuando n → ∞',
        note: 'El TCL reemplaza la normalidad en muestras grandes; no reemplaza la homocedasticidad.',
        more: `<p>Cuando n crece, la distribución del estadístico t se aproxima a la normal estándar aunque los errores no sean normales. Los errores estándar pasan a llamarse asintóticos y los contrastes siguen siendo válidos como aproximación.</p><ul><li><b>Cuándo se usa:</b> en muestras grandes, cuando la normalidad exacta no es creíble.</li><li><b>Error típico:</b> suponer que el TCL también arregla la heterocedasticidad o la endogeneidad.</li><li><b>Conexión:</b> con varianza no constante hacen falta errores robustos; eso se retoma en la clase 6.</li></ul>`
      }
    ],
    drills: [
      {
        q: 'Escribí la varianza de β̂₁ − β̂₂.',
        a: 'Var(β̂₁) + Var(β̂₂) − 2Cov(β̂₁, β̂₂). No es la suma de varianzas ni de errores estándar.'
      },
      {
        q: 'Escribí el F para q restricciones y sus dos pares de grados de libertad.',
        a: 'F = [(SCR_R − SCR_NR)/q]/[SCR_NR/(n−k−1)] ~ F<sub>q, n−k−1</sub>. q restricciones en el numerador y n − k − 1 en el denominador.'
      },
      {
        q: '¿Cuál es el caso especial del F que reporta la salida de R?',
        a: 'H₀: β₁ = … = βₖ = 0. F = [R²/k]/[(1−R²)/(n−k−1)] ~ F<sub>k, n−k−1</sub>.'
      },
      {
        q: 'Describí el LM en tres pasos.',
        a: 'Estimar el modelo restringido y guardar residuos; regresarlos sobre todas las X; calcular LM = nR²_ũ y compararlo con χ²_q.'
      },
      {
        q: '¿Qué es el plim y cuándo MCO es consistente?',
        a: 'El límite en probabilidad cuando n → ∞. MCO es consistente si Cov(X, u) = 0. Si no, plim β̂ − β es el sesgo asintótico.'
      },
      {
        q: '¿Por qué el TCL no arregla la endogeneidad?',
        a: 'Porque el TCL describe la forma de la distribución, no la correlación entre X y u. Si Cov(X,u) ≠ 0, el estimador sigue siendo sesgado e inconsistente aunque sea aproximadamente normal.'
      }
    ],
    sourceGuide: [
      {
        stuck: 'No sé contrastar β₁ = β₂',
        source: 'Clase 3B, diap. 19–22; Wooldridge §4.4; TP 4, Ej. 4k–l.'
      },
      {
        stuck: 'No entiendo el F de restricciones múltiples',
        source: 'Clase 3B, diap. 23–29; Wooldridge §4.5; TP 4, Ej. 1d y 2a.'
      },
      {
        stuck: 'No sé qué es el multiplicador de Lagrange',
        source: 'Clase 3B, diap. 33–35; Wooldridge §5.2.'
      },
      {
        stuck: 'No entiendo plim, consistencia y sesgo asintótico',
        source: 'Clase 3B, diap. 39–44; Wooldridge §5.1; 1P 2026.'
      },
      {
        stuck: 'No entiendo por qué t es válido en muestras grandes',
        source: 'Clase 3B, diap. 36–38 y 45; Wooldridge §5.2.'
      }
    ],
    session: [
      {
        time: '0–10',
        title: 'Pregunta guía',
        text: '¿Cómo se contrasta una hipótesis que involucra varios parámetros a la vez? Escribí una respuesta de tres líneas.'
      },
      {
        time: '10–30',
        title: 'Combinaciones lineales',
        text: 'Escribí la varianza de β̂₁ − β̂₂ y explicá por qué no se suman los errores estándar. Fuente: clase 3B, diap. 19–22.'
      },
      {
        time: '30–50',
        title: 'F y restricciones múltiples',
        text: 'Escribí el F basado en SCR y en R². Resolvé el TP 4, Ejercicio 1 y el Ejercicio 2.'
      },
      {
        time: '50–70',
        title: 'LM y normalidad asintótica',
        text: 'Describí los tres pasos del LM y explicá por qué el TCL permite usar t en muestras grandes. Fuente: clase 3B, diap. 33–38.'
      },
      {
        time: '70–85',
        title: 'Consistencia y parciales',
        text: '1P 2024–2026: F con R² y SCR, distribución exacta versus asintótica e interpretación del plim. Respondé sin mirar la solución.'
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
        text: 'Combinaciones lineales, F, LM, normalidad asintótica y consistencia, con una frase por concepto.'
      },
      {
        k: 'Kit 02',
        title: 'Tabla de errores',
        text: 'Qué se confunde, por qué y cómo corregirlo. La sección 06 es el punto de partida.'
      },
      {
        k: 'Kit 03',
        title: 'Seis preguntas',
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
        text: 'Leé la clase 03B completa y explicá el mapa de los cuatro pasos sin mirar.'
      },
      {
        day: 'Día 2',
        title: 'Combinaciones y F',
        text: 'Escribí la varianza de una diferencia y el F basado en SCR y en R², con sus grados de libertad.'
      },
      {
        day: 'Día 3',
        title: 'TP 4, Ejercicios 1 y 2',
        text: 'Interpretá el F conjunto con DEMANDA y ENGHO, e identificá q en cada caso.'
      },
      {
        day: 'Día 4',
        title: 'TP 4, Ejercicio 4',
        text: 'Replicá el laboratorio de WAGE2 y contrastá β_meduc = β_feduc con reparametrización.'
      },
      {
        day: 'Día 5',
        title: 'TP 4, Ejercicio 5',
        text: 'Discutí si el R² justifica quitar el intercepto y qué supuestos se ponen en juego.'
      },
      {
        day: 'Día 6',
        title: 'Parciales y simulacro',
        text: 'Resolvé las preguntas de 1P 2024–2026 sobre F, LM y plim en 45 minutos, sin mirar.'
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
        title: 'Clase 3B — Restricciones y muestras grandes',
        text: 'Fuente principal de la explicación, el orden y los énfasis de esta clase.',
        loc: 'Diapositivas 19–45'
      },
      {
        type: 'Libro',
        typeClass: 'book',
        title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.',
        text: 'Cap. 4, secciones 4.4 y 4.5, para combinaciones lineales y F; Cap. 5 para LM, normalidad asintótica y consistencia.',
        loc: 'Cap. 4 · §4.4–4.5; Cap. 5'
      },
      {
        type: 'Guía',
        typeClass: '',
        title: 'Guía de Trabajos Prácticos 2026 — TP 4',
        text: 'Ejercicios 1 a 5 para aplicar F, restricciones lineales, comparaciones entre coeficientes y selección de modelos.',
        loc: 'TP 4 · ejercicios 1–5',
        href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-4'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '1P 2024',
        text: 'Diferencias entre contrastes individuales y múltiples; F basado en R²; distribución exacta versus asintótica.',
        loc: 'Solución orientativa'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '1P 2025',
        text: 'Supuestos de Gauss-Markov y del MLC; qué cambia en la inferencia con errores no normales y con muestras grandes.',
        loc: 'Solución orientativa'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '1P 2026',
        text: 'F con R² y SCR; interpretación del plim y del sesgo asintótico.',
        loc: 'Solución orientativa'
      }
    ]
  }
};
