window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-04b"] = {
  id: 'clase-04b',
  num: '04B',
  eyebrow: 'Clase 04B · Especificación II y predicción',
  title: 'Especificación II: selección de modelos, sesgos y predicción',
  lead: 'Comparar modelos exige más que mirar el R². AIC y BIC penalizan la complejidad, RESET busca no linealidades, los sesgos de inclusión y omisión tienen costos distintos y la predicción cambia según se prometa un promedio o un caso individual.',
  question: '¿Cómo se elige una especificación y qué se puede prometer cuando se predice un valor que no está en la muestra?',
  pills: ['15 diapositivas', 'TP 6 y 7', '1P/2P 2024–2026', '8 conceptos clave'],
  sections: [
    {
      id: 'c04b-s01',
      number: '01',
      title: 'El problema: el R² no elige por vos',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s01-p01',
          html: 'La clase 4A mostró cómo cambiar escalas, estandarizar y elegir entre niveles, logaritmos y cuadráticas. Queda la pregunta incómoda: entre varios modelos plausibles, ¿cuál se elige? El R² no baja cuando se agrega cualquier regresor, incluso uno irrelevante. Comparar el ajuste bruto premia la complejidad y no distingue una relación bien especificada de una que solo copia el ruido de la muestra.'
        },
        {
          type: 'p',
          id: 'c04b-s01-p02',
          html: 'El problema tiene tres capas. Primero, la teoría: qué signo, qué magnitud y qué forma son plausibles. Segundo, el ajuste: cuánto de Y queda explicado y a qué costo en parámetros. Tercero, la predicción: qué tan bien funciona el modelo para valores de X que no están en la muestra. Un criterio de selección tiene que hablar de alguna de esas capas y decir con claridad a cuál responde.'
        },
        {
          type: 'compare',
          left: {
            tag: 'Más ajuste',
            title: 'R² y SCR',
            text: 'Agregar regresores nunca empeora el ajuste muestral. El R² no baja por construcción, aunque la variable no tenga relación con Y.',
            eq: 'R² = 1 − SCR/SCT'
          },
          right: {
            tag: 'Mejor especificación',
            title: 'Teoría, penalización y diagnóstico',
            text: 'La forma funcional se justifica con teoría, se contrasta con RESET y se compara con AIC o BIC solo cuando la Y es la misma.',
            eq: 'AIC · BIC · RESET · signos'
          }
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Teoría',
              title: 'Qué relación se espera',
              text: 'La teoría económica fija signos, magnitudes y si el efecto debe ser en niveles o en porcentajes. Sin eso, cualquier polinomio ajusta algo.'
            },
            {
              sym: 'Contraste',
              title: 'Qué dicen los datos',
              text: 'RESET, el F de términos cuadráticos y AIC o BIC aportan evidencia, pero no reemplazan la interpretación económica.'
            },
            {
              sym: 'Predicción',
              title: 'Qué pasa fuera de la muestra',
              text: 'Un modelo puede ajustar muy bien la muestra y predecir mal. La validación y el cuidado con la extrapolación son parte de la elección.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'El R² no es un árbitro',
          html: 'El R² ajustado descuenta grados de libertad, pero sigue siendo una medida de ajuste, no un contraste de especificación. Y si cambia la transformación de Y —niveles versus logaritmos—, ni el R², ni el AIC ni el BIC son comparables.'
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-01',
          question: 'Dos modelos explican la misma Y. El modelo B tiene R² más alto porque agrega tres variables. ¿Alcanza para elegirlo?',
          intro: 'Pensá qué pasa con el R² al agregar regresores y qué información falta.',
          answer: 'No. El R² no baja por construcción al agregar regresores, aunque sean irrelevantes; puede subir o quedarse igual. Para elegir hay que mirar si las variables se justifican teóricamente, si son conjuntamente significativas, si mejoran AIC o BIC y si el modelo predice mejor. Un R² más alto con tres parámetros extra puede ser sobreajuste.'
        }
      ]
    },
    {
      id: 'c04b-s02',
      number: '02',
      title: 'AIC y BIC: el precio de un parámetro más',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s02-p01',
          html: 'El <span class="concept" data-concept="aic-bic" tabindex="0" role="button">AIC y el BIC</span> formalizan una idea simple: comparar la falta de ajuste con una multa por cada parámetro estimado. Cuanto menor es el criterio, mejor es el modelo. No se busca el ajuste máximo, sino un equilibrio entre ajuste y complejidad.'
        },
        {
          type: 'formula',
          main: 'AIC = log(SCR/n) + 2k/n &nbsp;&nbsp;·&nbsp;&nbsp; BIC = log(SCR/n) + (k/n)·log(n)',
          legend: [
            {
              key: 'SCR',
              text: 'Suma de cuadrados residual del modelo: Σû<sub>i</sub><sup>2</sup>.'
            },
            {
              key: 'k',
              text: 'Cantidad de parámetros estimados, incluido el intercepto. Más parámetros, mayor penalización.'
            },
            {
              key: 'n',
              text: 'Tamaño de muestra. La penalización se expresa por observación.'
            },
            {
              key: 'Escala',
              text: 'R multiplica por n y agrega una constante; los valores absolutos cambian, el ordenamiento no.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s02-p02',
          html: 'La diferencia entre los dos criterios está en el precio de un parámetro adicional. AIC cobra 2/n; BIC cobra log(n)/n. Con n = 236, log(236) ≈ 5,46, así que BIC penaliza cada parámetro casi tres veces más que AIC. Por eso BIC tiende a elegir modelos más chicos y AIC, modelos algo más generosos.'
        },
        {
          type: 'compare',
          left: {
            tag: 'AIC',
            title: 'Akaike',
            text: 'Penalización 2k/n. Busca un buen equilibrio predictivo y puede quedarse con un modelo algo sobreparametrizado.',
            eq: 'log(SCR/n) + 2k/n'
          },
          right: {
            tag: 'BIC',
            title: 'Schwarz',
            text: 'Penalización k·log(n)/n. Con n grande es más severo, favorece la parsimonia y es consistente si el modelo verdadero está entre los candidatos.',
            eq: 'log(SCR/n) + k·log(n)/n'
          }
        },
        {
          type: 'p',
          id: 'c04b-s02-p03',
          html: 'Hay dos condiciones que no se negocian. La variable dependiente debe estar en la misma transformación: el AIC de un modelo para foodexp no se compara con el de un modelo para log(foodexp), porque la verosimilitud se mide en otra escala. Y el n debe ser el mismo: si un modelo pierde observaciones por datos faltantes, la comparación se contamina. La buena noticia es que los modelos no necesitan estar anidados; AIC y BIC pueden ordenar especificaciones alternativas si la Y y el n coinciden.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'Comparar el AIC de un modelo en niveles con uno en logaritmos',
              why: 'La transformación de Y cambia la escala de la verosimilitud; los números no son comparables.',
              fix: 'Elegí la misma Y o usá otras herramientas, como RESET o validación predictiva.'
            },
            {
              error: 'Leer una diferencia de AIC como un valor p',
              why: 'AIC y BIC no son contrastes formales: no tienen H₀ ni nivel de significación.',
              fix: 'Usalos para ordenar candidatos y complementá con teoría, RESET e intervalos.'
            },
            {
              error: 'Comparar modelos estimados con distinto n',
              why: 'Si cambia la muestra, cambia la SCR y la comparación deja de ser limpia.',
              fix: 'Fijá la misma muestra para todos los candidatos.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-02',
          question: 'Un modelo en niveles tiene AIC = 3155 y otro en logaritmos, AIC = 80. ¿El segundo es mejor?',
          intro: 'Mirá qué variable dependiente tiene cada modelo.',
          answer: 'No se puede concluir. La Y está transformada de otra manera y la verosimilitud se mide en otra escala. Para comparar hace falta la misma variable dependiente y el mismo n. El AIC bajo del modelo en logs puede reflejar que los residuos en escala logarítmica son pequeños, no que prediga mejor foodexp en niveles.'
        }
      ]
    },
    {
      id: 'c04b-s03',
      number: '03',
      title: 'Forma funcional: teoría, interpretación y datos',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s03-p01',
          html: 'La <span class="concept" data-concept="forma-funcional" tabindex="0" role="button">forma funcional</span> no se elige solo con un contraste. Un modelo está mal especificado cuando la relación que impone no representa la relación entre Y y las X; la forma funcional es una de las fuentes de ese error. La teoría dice si el efecto debe ser en niveles, en porcentajes o con saturación; las aplicaciones previas muestran qué formas funcionaron; la interpretación de los coeficientes tiene que ser defendible. Recién después vienen los contrastes.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Niveles',
              title: 'Y = β₀ + β₁X + u',
              text: 'β₁ es el cambio esperado en Y ante una unidad más de X. Es una pendiente, no una elasticidad.'
            },
            {
              sym: 'Log-log',
              title: 'log Y = β₀ + β₁ log X + u',
              text: 'β₁ es la elasticidad: el cambio porcentual de Y ante 1% más de X. Es constante en todo el rango.'
            },
            {
              sym: 'Log-lin',
              title: 'log Y = β₀ + β₁X + u',
              text: '100·β₁ aproxima el cambio porcentual de Y por unidad de X. En lin-log, β₁/100 aproxima el cambio de Y por 1% de X.'
            },
            {
              sym: 'Cuadrática',
              title: 'Y = β₀ + β₁X + β₂X² (+ β₃XZ)',
              text: 'Captura efectos marginales que cambian con X o que dependen de otra variable. Con Y = β₀ + β₁X + β₂Z + β₃XZ, el efecto de X es β₁ + β₃Z. Sigue siendo lineal en los parámetros.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s03-p02',
          html: '¿Cómo se elige en la práctica? Primero, la teoría y el rango de los datos. Segundo, la interpretación: una elasticidad constante puede ser más plausible que una pendiente constante. Tercero, los diagnósticos: un patrón en los residuos, un RESET que rechaza o un término cuadrático significativo son señales de que la forma lineal no alcanza. Cuarto, la comparación: AIC o BIC solo si la Y es la misma; R² ajustado, con las mismas precauciones.'
        },
        {
          type: 'formula',
          main: '∂Ŷ/∂X = β̂<sub>1</sub> + 2β̂<sub>2</sub>X &nbsp;&nbsp;·&nbsp;&nbsp; X* = −β̂<sub>1</sub>/(2β̂<sub>2</sub>)',
          legend: [
            {
              key: 'Efecto marginal',
              text: 'En una cuadrática, β̂₁ no es el efecto de X: el efecto cambia con el nivel de X.'
            },
            {
              key: 'Punto de giro',
              text: 'Máximo si β̂₂ &lt; 0; mínimo si β̂₂ &gt; 0. Solo tiene sentido económico si cae dentro del rango observado.'
            },
            {
              key: 'Interacción',
              text: 'Con β₃XZ, el efecto de X es β₁ + β₃Z: depende del nivel de Z.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'El vértice no siempre está en los datos',
          html: 'Una cuadrática puede tener un término cuadrático significativo y un vértice fuera del rango muestral. En ese caso la curvatura es real, pero el máximo o el mínimo es una extrapolación. No se puede afirmar que Y empieza a caer en un punto que la muestra nunca observó.'
        },
        {
          type: 'p',
          id: 'c04b-s03-p03',
          html: 'Un error frecuente es probar muchas formas y quedarse con la que da el R² más alto. Eso es minería de datos (data mining): los valores p y los intervalos dejan de tener su significado habitual porque el modelo se eligió mirando los mismos datos. La secuencia razonable es fijar la teoría, estimar pocas alternativas, contrastar restricciones y reportar la incertidumbre de la elección.'
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-03',
          question: 'En una cuadrática, β̂₂ es significativo y el vértice está en X = 6000, pero la muestra llega hasta 5000. ¿Qué concluís?',
          intro: 'Separá la curvatura observada del punto de giro estimado.',
          answer: 'Que hay evidencia de curvatura dentro del rango observado, pero el máximo estimado es una extrapolación: la muestra no contiene información sobre lo que pasa en 6000. No conviene afirmar que Y deja de crecer o empieza a caer allí. Hay que interpretar el efecto marginal dentro del rango y advertir el límite.'
        }
      ]
    },
    {
      id: 'c04b-s04',
      number: '04',
      title: 'RESET: buscar no linealidades que quedaron afuera',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s04-p01',
          html: 'La <span class="concept" data-concept="reset" tabindex="0" role="button">prueba RESET</span> de Ramsey pregunta si el modelo lineal dejó afuera no linealidades importantes. La idea es simple: si la especificación es correcta, los valores ajustados no deberían tener poder explicativo adicional cuando se agregan sus potencias. Si lo tienen, algo de la forma funcional quedó mal.'
        },
        {
          type: 'formula',
          main: 'Y = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub> + δ<sub>1</sub>Ŷ<sup>2</sup> + δ<sub>2</sub>Ŷ<sup>3</sup> + v &nbsp;&nbsp;·&nbsp;&nbsp; H<sub>0</sub>: δ<sub>1</sub> = δ<sub>2</sub> = 0',
          legend: [
            {
              key: 'Ŷ',
              text: 'Valores ajustados del modelo original, no una variable nueva.'
            },
            {
              key: 'δ',
              text: 'Coeficientes de las potencias. Bajo H₀, no aportan explicación adicional.'
            },
            {
              key: 'q = 2',
              text: 'Dos restricciones de exclusión conjuntas: las dos potencias.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s04-p02',
          html: 'Se estima la regresión ampliada y se compara con la original. El estadístico puede ser un F sobre las dos restricciones o un LM = nR² de la regresión auxiliar, con q = 2; en el LM, los residuos del modelo original se regresan sobre las X y las dos potencias. El F tiene grados de libertad 2 y n − k − 3, porque la regresión ampliada suma dos parámetros a las k pendientes y al intercepto. En la práctica, el software reporta directamente el F y el valor p.'
        },
        {
          type: 'map',
          steps: [
            {
              n: '1',
              title: 'Estimar el modelo base',
              text: 'Guardá los valores ajustados Ŷ y la suma de cuadrados residual.'
            },
            {
              n: '2',
              title: 'Ampliar con Ŷ² y Ŷ³',
              text: 'Agregá las dos potencias como regresores y estimá por MCO.'
            },
            {
              n: '3',
              title: 'Contrastar δ₁ = δ₂ = 0',
              text: 'F con q = 2 y n − k − 3 grados de libertad, o LM = nR² de la regresión auxiliar.'
            },
            {
              n: '4',
              title: 'Decidir y volver',
              text: 'Si rechazás, probá otra forma funcional; si no rechazás, no declares que el modelo es correcto.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s04-p03',
          html: '¿Qué informa y qué no? Informa que hay evidencia de no linealidad no capturada: la forma lineal, el logaritmo elegido o la cuadrática pueden ser insuficientes. Se puede aplicar al modelo con Y en niveles y al modelo con Y en logaritmos, cada uno en su propia escala. No dice cuál es la alternativa correcta ni qué variable agregar. Tampoco es una prueba de variable omitida: un RESET significativo puede deberse a una variable relevante fuera del modelo cuyas categorías generan no linealidad. Y no rechazar no prueba que la especificación sea verdadera: puede haber poca potencia o una no linealidad que las potencias de Ŷ no detectan.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'Rechazar RESET y concluir que la cuadrática es la forma correcta',
              why: 'RESET detecta un problema, no identifica la solución.',
              fix: 'Probá varias alternativas teóricamente plausibles y volvé a contrastar.'
            },
            {
              error: 'Usar RESET como prueba de variable omitida',
              why: 'Puede rechazar por una omitida, pero también por una forma funcional incorrecta.',
              fix: 'Leelo como diagnóstico de especificación, no como identificación de la causa.'
            },
            {
              error: 'No rechazar y afirmar que el modelo está bien especificado',
              why: 'La potencia depende de n y de la alternativa; no rechazar es ausencia de evidencia.',
              fix: 'Acompañá con teoría, residuos y validación predictiva.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-04',
          question: 'RESET da p = 0,30. ¿Podés afirmar que la forma funcional es correcta?',
          intro: 'Pensá qué significa no rechazar y qué alternativas detecta la prueba.',
          answer: 'No. No rechazar solo dice que no hay evidencia suficiente contra H₀ con ese contraste y esa muestra. La prueba puede tener poca potencia frente a algunas alternativas, y las potencias de Ŷ no cubren todas las formas posibles. La conclusión correcta es que no se detectaron no linealidades importantes, no que el modelo sea verdadero.'
        }
      ]
    },
    {
      id: 'c04b-s05',
      number: '05',
      title: 'Sesgos de especificación: incluir de más y omitir de menos',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s05-p01',
          html: 'Hay dos maneras de equivocarse con las variables de un modelo. Incluir de más: variables que no pertenecen a la relación. Incluir de menos: omitir una variable relevante. Las consecuencias no son simétricas, y esa asimetría es una de las preguntas clásicas de parcial. El <span class="concept" data-concept="sesgo-omision" tabindex="0" role="button">sesgo por omisión</span> y el <span class="concept" data-concept="sesgo-inclusion" tabindex="0" role="button">sesgo por inclusión</span> tienen costos distintos.'
        },
        {
          type: 'compare',
          left: {
            tag: 'Inclusión',
            title: 'Variable irrelevante',
            text: 'El estimador sigue insesgado y consistente si la variable es realmente irrelevante, pero pierde precisión: más parámetros, errores estándar más grandes y menos grados de libertad.',
            eq: 'E(β̂) = β, pero Var(β̂) ↑'
          },
          right: {
            tag: 'Omisión',
            title: 'Variable relevante',
            text: 'Si la omitida está correlacionada con alguna incluida, el estimador es sesgado e inconsistente. El error contiene algo que pertenece al modelo.',
            eq: 'E(β̃) ≠ β; plim β̃ ≠ β'
          }
        },
        {
          type: 'formula',
          main: 'E(β̃<sub>1</sub>) = β<sub>1</sub> + β<sub>2</sub>·δ &nbsp;&nbsp;·&nbsp;&nbsp; δ = Cov(X<sub>1</sub>, X<sub>2</sub>)/Var(X<sub>1</sub>)',
          legend: [
            {
              key: 'β̃1',
              text: 'Coeficiente estimado en el modelo que omite X₂.'
            },
            {
              key: 'β2',
              text: 'Efecto verdadero de la variable omitida sobre Y.'
            },
            {
              key: 'δ',
              text: 'Pendiente de X₂ sobre X₁ en el caso simple. En el modelo múltiple, δ se obtiene de regresar la omitida sobre todas las X incluidas.'
            },
            {
              key: 'Signo',
              text: 'El sesgo tiene el signo de β₂·δ. Si ambos son positivos, el estimador sobreestima.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s05-p02',
          html: 'La fórmula muestra por qué el sesgo no se arregla con más datos: en el límite, plim β̃<sub>1</sub> = β<sub>1</sub> + β<sub>2</sub>·Cov(X<sub>1</sub>,X<sub>2</sub>)/Var(X<sub>1</sub>). Si la covarianza no es cero, el estimador converge a un valor distinto del parámetro. Además, cuando la omitida está correlacionada con las incluidas, la omisión viola E(u | X) = 0, así que los errores estándar, los t y los F habituales dejan de ser válidos. El problema no es solo la magnitud: es toda la inferencia.'
        },
        {
          type: 'p',
          id: 'c04b-s05-p03',
          html: 'La inclusión de una variable irrelevante no sesga el coeficiente de las demás, pero aumenta su varianza. Se estiman más parámetros con el mismo n, se pierden grados de libertad y la colinealidad con las otras X puede inflar los errores estándar. El nombre “sesgo por inclusión” es engañoso: no hay sesgo en el coeficiente, hay pérdida de eficiencia. La distinción importa porque un estimador insesgado con un error estándar enorme puede ser inútil en la práctica.'
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'La asimetría que tenés que poder explicar',
          html: 'Omitir una variable relevante y correlacionada produce sesgo e inconsistencia; incluir una irrelevante cuesta eficiencia. Por eso, ante la duda teórica, el costo de omitir suele ser mayor. Pero eso no justifica llenar el modelo de variables: el sobreajuste también tiene costos de varianza, interpretación y predicción.'
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-05',
          question: '¿Por qué se dice que incluir una variable irrelevante no genera sesgo, si el nombre “sesgo por inclusión” sugiere lo contrario?',
          intro: 'Separá la esperanza del estimador de su varianza.',
          answer: 'Porque si la variable es realmente irrelevante —su coeficiente poblacional es cero—, incluirla no desplaza la esperanza de los otros coeficientes. Lo que aumenta es la varianza: se estima un parámetro extra, se pierden grados de libertad y los errores estándar crecen. El nombre es una etiqueta histórica; la consecuencia correcta es ineficiencia, no sesgo.'
        }
      ]
    },
    {
      id: 'c04b-s06',
      number: '06',
      title: 'Predicción promedio: la media de una subpoblación',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s06-p01',
          html: 'Predecir el promedio no es adivinar el valor de una persona. La pregunta es cuál es la esperanza condicional de Y para un vector de X fijo: E(Y | X<sub>1</sub> = c<sub>1</sub>, X<sub>2</sub> = c<sub>2</sub>). Ese número es un parámetro, θ<sub>0</sub>, y se estima con los coeficientes de MCO. La <span class="concept" data-concept="prediccion-promedio" tabindex="0" role="button">predicción promedio</span> responde por la subpoblación, no por una unidad.'
        },
        {
          type: 'formula',
          main: 'θ<sub>0</sub> = β<sub>0</sub> + β<sub>1</sub>c<sub>1</sub> + β<sub>2</sub>c<sub>2</sub> &nbsp;&nbsp;·&nbsp;&nbsp; θ̂<sub>0</sub> = β̂<sub>0</sub> + β̂<sub>1</sub>c<sub>1</sub> + β̂<sub>2</sub>c<sub>2</sub>',
          legend: [
            {
              key: 'θ0',
              text: 'El parámetro: media de Y en la subpoblación con X = c.'
            },
            {
              key: 'c1, c2',
              text: 'Valores fijos de las X. Pueden estar o no en la muestra.'
            },
            {
              key: 'θ̂0',
              text: 'Estimador. Es una combinación lineal de los β̂, no un promedio de valores observados de Y.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s06-p02',
          html: 'La estimación puntual es fácil; el intervalo es el problema. θ̂<sub>0</sub> es una combinación lineal de estimadores, y su error estándar no se obtiene sumando los errores estándar de los coeficientes. Bajo homocedasticidad, la forma más limpia de obtenerlo es reparametrizar el modelo para que θ<sub>0</sub> sea el intercepto.'
        },
        {
          type: 'formula',
          main: 'Y = θ<sub>0</sub> + β<sub>1</sub>(X<sub>1</sub> − c<sub>1</sub>) + β<sub>2</sub>(X<sub>2</sub> − c<sub>2</sub>) + u &nbsp;&nbsp;·&nbsp;&nbsp; θ̂<sub>0</sub> ± t<sub>n−k−1, α/2</sub>·ee(θ̂<sub>0</sub>)',
          legend: [
            {
              key: 'Reparametrización',
              text: 'Al centrar las X en c, el intercepto pasa a ser θ₀. El software reporta su error estándar directamente.'
            },
            {
              key: 'ee',
              text: 'Error estándar del intercepto en el modelo reparametrizado, no el error estándar de la regresión.'
            },
            {
              key: 't',
              text: 'Grados de libertad n − k − 1. Bajo el MLC la distribución es exacta; en muestras grandes, la aproximación asintótica.'
            }
          ]
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Punto',
              title: 'θ̂₀',
              text: 'La predicción. Cambia si cambia la muestra, porque depende de los β̂ estimados.'
            },
            {
              sym: 'Precisión',
              title: 'ee(θ̂₀)',
              text: 'Incluye la incertidumbre de todos los coeficientes y su covarianza. El error estándar es menor cerca de las medias de las X.'
            },
            {
              sym: 'Intervalo',
              title: 'θ̂₀ ± t·ee',
              text: 'Intervalo para la media condicional, no para una observación individual.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Mayor confianza en el centro',
          html: 'La varianza de θ̂<sub>0</sub> es mínima cuando c<sub>1</sub> = X̄<sub>1</sub> y c<sub>2</sub> = X̄<sub>2</sub>. Cuanto más lejos está el punto del centro de los datos, mayor es la palanca y más ancho el intervalo. Predecir en los extremos del rango ya cuesta precisión; predecir fuera del rango es extrapolar.'
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-06',
          question: '¿Por qué el intervalo para la predicción promedio es más angosto cerca de la media de X?',
          intro: 'Mirá el término que depende de la distancia entre c y la media.',
          answer: 'Porque la estimación de la media condicional usa información de todas las observaciones y su varianza depende de la distancia entre c y la media. En la fórmula de regresión simple, el término (c − X̄)²/Σ(Xi − X̄)² se hace cero en c = X̄. Lejos de la media, ese término crece y el intervalo se ensancha. No es una propiedad mágica: es la precisión del ajuste local.'
        }
      ]
    },
    {
      id: 'c04b-s07',
      number: '07',
      title: 'Predicción individual, varianza y mapa de decisión',
      blocks: [
        {
          type: 'p',
          id: 'c04b-s07-p01',
          html: 'La <span class="concept" data-concept="prediccion-individual" tabindex="0" role="button">predicción individual</span> responde otra pregunta: no cuál es el promedio de la subpoblación, sino qué valor puede tomar una unidad concreta con X = X<sub>0</sub>. Pensá en el salario de una persona con 15 años de educación y 10 de experiencia, cuyo sector y tamaño de empresa no observamos: eso es una unidad, no la media de su grupo. Ahí hay dos fuentes de incertidumbre: no conocemos los coeficientes y tampoco conocemos el error idiosincrático de esa unidad.'
        },
        {
          type: 'formula',
          main: 'Y<sub>0</sub> = X<sub>0</sub>′β + u<sub>0</sub> &nbsp;&nbsp;·&nbsp;&nbsp; ê<sub>0</sub> = Y<sub>0</sub> − Ŷ<sub>0</sub> = u<sub>0</sub> + X<sub>0</sub>′(β − β̂) &nbsp;&nbsp;·&nbsp;&nbsp; Var(ê<sub>0</sub>) = σ<sup>2</sup>[1 + X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>]',
          legend: [
            {
              key: 'u0',
              text: 'Error no observado de la unidad que se quiere predecir.'
            },
            {
              key: '1',
              text: 'La varianza del error idiosincrático, σ². Es lo que se suma respecto de la predicción promedio.'
            },
            {
              key: 'X0',
              text: 'Vector fila con 1 y los valores de las X para la unidad. Si el modelo tiene intercepto, X₀ incluye el 1.'
            }
          ]
        },
        {
          type: 'compare',
          left: {
            tag: 'Promedio',
            title: 'E(Y | X = X₀)',
            text: 'Se predice la media de la subpoblación. La incertidumbre viene solo de estimar β. El intervalo es más angosto.',
            eq: 'Var = σ²X₀′(X′X)⁻¹X₀'
          },
          right: {
            tag: 'Individual',
            title: 'Un Y₀ concreto',
            text: 'Se predice una realización. Se suma la varianza del error no observado. El intervalo es más ancho.',
            eq: 'Var = σ²[1 + X₀′(X′X)⁻¹X₀]'
          }
        },
        {
          type: 'formula',
          main: 'Promedio: σ̂<sup>2</sup>[1/n + (c − X̄)<sup>2</sup>/Σ(X<sub>i</sub> − X̄)<sup>2</sup>] &nbsp;&nbsp;·&nbsp;&nbsp; Individual: σ̂<sup>2</sup>[1 + 1/n + (c − X̄)<sup>2</sup>/Σ(X<sub>i</sub> − X̄)<sup>2</sup>]',
          legend: [
            {
              key: 'σ̂²',
              text: 'Varianza residual estimada. Es la misma en las dos fórmulas.'
            },
            {
              key: '1/n',
              text: 'Incertidumbre por estimar el nivel medio con n observaciones.'
            },
            {
              key: 'Distancia',
              text: 'El término (c − X̄)² mide cuán lejos está el punto del centro. Crece al alejarse.'
            },
            {
              key: 'Diferencia',
              text: 'La individual agrega 1 dentro del corchete: la varianza del error de la nueva unidad.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04b-s07-p02',
          html: 'En notación matricial, la predicción promedio es Ŷ<sub>0</sub> = X<sub>0</sub>′β̂, insesgada bajo Gauss-Markov, con varianza σ<sup>2</sup>X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>. La individual agrega σ<sup>2</sup> porque el error de predicción incluye u<sub>0</sub>; bajo homocedasticidad y con u<sub>0</sub> independiente de la muestra, Var(ê<sub>0</sub>) = σ<sup>2</sup>[1 + X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>]. En ambos casos se usa el mismo σ̂<sup>2</sup> y los mismos grados de libertad. La diferencia entre los intervalos no es un detalle de software: es la diferencia entre hablar de una subpoblación y hablar de un caso. El <span class="concept" data-concept="intervalo-prediccion" tabindex="0" role="button">intervalo de predicción</span> resume esa diferencia.'
        },
        {
          type: 'interactive',
          kind: 'prediction',
          label: 'Laboratorio visual',
          title: 'Dos intervalos, dos preguntas',
          intro: 'Con datos ilustrativos, la misma predicción puntual tiene dos intervalos distintos. La banda interna es para la media de la subpoblación; la externa, para una unidad concreta. Mové X₀ y cambiá el nivel de confianza para ver cómo se abren cerca de los extremos.',
          hint: 'La banda individual no se cierra aunque n crezca: siempre queda la varianza del error de la nueva unidad. La promedio sí se angosta con más datos. Cerca de X̄ ambas son más precisas; lejos, la distancia al centro castiga la predicción.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'Usar el intervalo de confianza promedio para una persona',
              why: 'El intervalo promedio no contiene la variabilidad idiosincrática de una unidad.',
              fix: 'Para una unidad, usá el intervalo de predicción individual, que suma σ̂².'
            },
            {
              error: 'Decir que el intervalo individual contiene al 95% de los individuos',
              why: 'Es un intervalo para una nueva observación construido con una muestra; no es una banda de cobertura poblacional.',
              fix: 'Interpretalo como: el 95% de los intervalos así construidos cubriría una nueva realización.'
            },
            {
              error: 'Predecir fuera del rango observado sin advertirlo',
              why: 'La fórmula se puede evaluar en cualquier c, pero los datos no sostienen esa extrapolación.',
              fix: 'Reportá el rango muestral y aclará que la predicción es una extrapolación.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04b-check-07',
          question: '¿Por qué el intervalo individual es más ancho que el promedio aunque la predicción puntual sea la misma?',
          intro: 'Pensá qué dos fuentes de variación entran en cada intervalo.',
          answer: 'Porque la predicción puntual estima la media condicional, mientras que la individual intenta cubrir una realización concreta. El error de predicción individual suma u₀, cuya varianza σ² no se reduce con más datos. Por eso el intervalo individual agrega σ̂² dentro del corchete y es más ancho; la diferencia no desaparece al aumentar n.'
        },
        {
          type: 'map',
          steps: [
            {
              n: '1',
              title: 'Definir el objetivo',
              text: '¿Media de la subpoblación o valor de una unidad? La respuesta cambia el intervalo y la interpretación.'
            },
            {
              n: '2',
              title: 'Fijar X₀',
              text: 'Valores de las X dentro del rango observado. Si el modelo tiene cuadrática o interacción, incluí esos términos.'
            },
            {
              n: '3',
              title: 'Estimar y diagnosticar',
              text: 'El modelo tiene que estar bien especificado: forma funcional, RESET, sesgos por omisión.'
            },
            {
              n: '4',
              title: 'Calcular la predicción y su error estándar',
              text: 'Reparametrizá para el promedio o usá la fórmula matricial. No confundas el ee de la regresión con el ee de la predicción.'
            },
            {
              n: '5',
              title: 'Reportar el intervalo y los límites',
              text: 't con n − k − 1, nivel de confianza, rango muestral y advertencia de extrapolación.'
            }
          ]
        },
        {
          type: 'sourceStrip',
          chips: [
            {
              label: 'Clase 4',
              text: 'diap. 20–34'
            },
            {
              label: 'Wooldridge 4ed',
              text: 'Cap. 6; §9.1'
            },
            {
              label: 'TP 6',
              text: 'ej. 3, 5, 10 y 11'
            },
            {
              label: 'TP 7',
              text: 'act. 1; ej. 1–6'
            },
            {
              label: 'Parcial',
              text: '2P 2024'
            }
          ]
        }
      ]
    }
  ],
  concepts: {
    'aic-bic': {
      title: 'AIC y BIC',
      sub: 'Comparar modelos con una multa por complejidad.',
      esencia: `
        <div class="definition">AIC y BIC comparan modelos sumando a la falta de ajuste una penalización por cantidad de parámetros. Se elige el modelo con el criterio más bajo. No son contrastes: no tienen H<sub>0</sub> ni valor p.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Comparan solo modelos con la misma transformación de Y y el mismo n.</li>
          <li>No necesitan que los modelos estén anidados.</li>
          <li>BIC penaliza más que AIC cuando n &gt; 7; tiende a modelos más parsimoniosos.</li>
        </ul>
        <div class="formula small">AIC = log(SCR/n) + 2k/n<span>BIC = log(SCR/n) + (k/n)·log(n)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: misma Y y mismo n</span><span class="badge optional">Según el concepto: AIC vs BIC</span></div>
      `,
      ejemplo: `
        <p>En ENGEL, el modelo lineal tiene AIC = 3154,945 y el cuadrático, AIC = 3135,408: una diferencia de 19,5 a favor de la cuadrática. El BIC también favorece a la cuadrática, pero con una diferencia menor: 3165,336 contra 3149,263.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El modelo log-log tiene un R² de 0,8324, pero su Y es log(foodexp). Ni ese R² ni su AIC se pueden comparar con los de los modelos en niveles. Para comparar hay que volver a la misma escala de Y.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Comparar AIC de modelos con distinta transformación de Y.</strong> La verosimilitud se mide en otra escala; los números no son comparables.</li>
          <li><strong>Tratar la diferencia de AIC como un valor p.</strong> No hay H₀ ni significación: es un criterio de ordenamiento.</li>
          <li><strong>Olvidar el mismo n.</strong> Si un modelo pierde casos por datos faltantes, la comparación se contamina.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>Elegís el modelo con AIC más bajo sin mirar qué variable dependiente tiene.</p></div>
      `,
      conexiones: `
        <p>AIC y BIC son el complemento cuantitativo de la elección de forma funcional. También ayudan a decidir si una cuadrática aporta lo suficiente, pero no reemplazan a RESET ni a la teoría.</p>
        <div><button class="concept-chip" data-concept="forma-funcional">Forma funcional →</button><button class="concept-chip" data-concept="reset">RESET →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 20.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ej. 5c.</p></div>
      `
    },
    'forma-funcional': {
      title: 'Forma funcional',
      sub: 'Niveles, logaritmos, cuadráticas e interacciones.',
      esencia: `
        <div class="definition">La forma funcional es la relación que se postula entre Y y las X. MCO puede estimar relaciones no lineales en las variables si son lineales en los parámetros: logaritmos, cuadráticas e interacciones.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La teoría y la interpretación pesan tanto como el ajuste.</li>
          <li>En una cuadrática, el efecto marginal es β₁ + 2β₂X; β₁ solo no alcanza.</li>
          <li>El vértice solo tiene sentido económico si cae dentro del rango observado.</li>
        </ul>
        <div class="formula small">∂Ŷ/∂X = β̂<sub>1</sub> + 2β̂<sub>2</sub>X<span>X* = −β̂<sub>1</sub>/(2β̂<sub>2</sub>)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: interpretación del efecto marginal</span><span class="badge optional">Según el concepto: elasticidad vs pendiente</span></div>
      `,
      ejemplo: `
        <p>En ENGEL, el log-log estima una elasticidad de 0,860: 1% más de ingreso se asocia con 0,86% más de gasto en alimentos. El lineal estima una pendiente de 0,486 unidades monetarias por unidad de ingreso; su elasticidad implícita en la media es 0,75 y cambia con el nivel de ingreso.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La cuadrática estima una pendiente de 0,587 en la media y de 0,026 en el máximo muestral. La curvatura es real, pero el vértice queda en 5145, apenas por encima del máximo de 4958: no hay datos para sostener una caída.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Elegir la forma por el R² más alto.</strong> El R² no es comparable entre transformaciones de Y y no baja con la complejidad.</li>
          <li><strong>Interpretar β₁ como el efecto constante en una cuadrática.</strong> El efecto es β₁ + 2β₂X.</li>
          <li><strong>Agregar una cuadrática sin mirar el vértice.</strong> Un término significativo no garantiza que el máximo o mínimo esté dentro de los datos.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el coeficiente de income cambia de significado entre el modelo lineal y el cuadrático.</p></div>
      `,
      conexiones: `
        <p>La forma funcional se decide junto con los criterios de selección y se diagnostica con RESET. También condiciona la predicción: un modelo cuadrático predice distinto según el punto, y extrapolar el vértice es riesgoso.</p>
        <div><button class="concept-chip" data-concept="aic-bic">AIC y BIC →</button><button class="concept-chip" data-concept="reset">RESET →</button><button class="concept-chip" data-concept="prediccion-promedio">Predicción promedio →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 21–22.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ej. 5a–b.</p></div>
      `
    },
    reset: {
      title: 'Prueba RESET',
      sub: '¿Quedaron no linealidades que el modelo no captura?',
      esencia: `
        <div class="definition">RESET estima una regresión ampliada con Ŷ² y Ŷ³ y contrasta H<sub>0</sub>: δ<sub>1</sub> = δ<sub>2</sub> = 0. Un F o un LM con q = 2 evalúa si las potencias de los valores ajustados aportan explicación adicional.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Detecta no linealidad no capturada, no identifica la forma correcta.</li>
          <li>No es una prueba de variable omitida, aunque puede rechazar por una omitida.</li>
          <li>No rechazar no prueba que el modelo esté bien especificado.</li>
        </ul>
        <div class="formula small">Y = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub> + δ<sub>1</sub>Ŷ<sup>2</sup> + δ<sub>2</sub>Ŷ<sup>3</sup> + v<span>H<sub>0</sub>: δ<sub>1</sub> = δ<sub>2</sub> = 0 · q = 2</span></div>
        <div class="badge-row"><span class="badge always">Siempre: H₀ y q = 2</span><span class="badge optional">Según el concepto: F o LM</span></div>
      `,
      ejemplo: `
        <p>En ENGEL, RESET sobre el modelo lineal da F = 11,139 con df1 = 2 y df2 = 232, p = 2,403e-05. Se rechaza la especificación lineal: hay evidencia de no linealidad que el modelo no captura.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La cuadrática mejora el ajuste y el AIC, pero RESET no dice que sea la forma verdadera. Habría que volver a contrastar la cuadrática y comparar con el log-log en su propia escala antes de adoptar una conclusión.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Rechazar y creer que la alternativa es la cuadrática.</strong> RESET detecta el problema, no la solución.</li>
          <li><strong>Leerlo como prueba de variable omitida.</strong> Una omitida puede generar el rechazo, pero no es su objeto.</li>
          <li><strong>No rechazar y declarar la especificación correcta.</strong> La potencia depende de n y de la alternativa.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué harías después de un RESET significativo.</p></div>
      `,
      conexiones: `
        <p>RESET es el diagnóstico natural después de elegir una forma funcional. Si rechaza, la respuesta es probar otra especificación y volver a contrastar, no quedarse con el p-valor.</p>
        <div><button class="concept-chip" data-concept="forma-funcional">Forma funcional →</button><button class="concept-chip" data-concept="sesgo-omision">Sesgo por omisión →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 23–24.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 9, §9.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ej. 3c.3.</p></div>
      `
    },
    'sesgo-omision': {
      title: 'Sesgo por omisión',
      sub: 'La variable relevante que queda en el error.',
      esencia: `
        <div class="definition">Si se omite una variable relevante correlacionada con alguna incluida, el estimador de MCO es sesgado e inconsistente. En el caso simple, E(β̃<sub>1</sub>) = β<sub>1</sub> + β<sub>2</sub>·δ, donde δ es la pendiente de X<sub>2</sub> sobre X<sub>1</sub>.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El sesgo tiene el signo de β₂·δ: importan el efecto de la omitida y su correlación con la incluida.</li>
          <li>Más observaciones no corrigen el problema: el sesgo se vuelve asintótico.</li>
          <li>Cuando la omitida está correlacionada con las incluidas, la omisión viola E(u | X) = 0 y afecta toda la inferencia, no solo el coeficiente.</li>
        </ul>
        <div class="formula small">E(β̃<sub>1</sub>) = β<sub>1</sub> + β<sub>2</sub>·Cov(X<sub>1</sub>, X<sub>2</sub>)/Var(X<sub>1</sub>)<span>Sesgo = β<sub>2</sub>·δ</span></div>
        <div class="badge-row"><span class="badge always">Siempre: signo y fórmula</span><span class="badge optional">Según el concepto: caso múltiple</span></div>
      `,
      ejemplo: `
        <p>En un modelo de salario, la habilidad no observada queda en u. Si la habilidad aumenta el salario (β₂ &gt; 0) y está correlacionada positivamente con la educación (δ &gt; 0), MCO sobreestima el efecto de la educación. El sesgo es positivo.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Ilustración numérica: si β₁ = 0,08, β₂ = 0,5 y δ = 0,3, el sesgo es 0,15 y la esperanza del estimador es 0,23. La estimación no converge a 0,08 ni con una muestra enorme.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que el sesgo desaparece con una muestra grande.</strong> Solo desaparece si la covarianza es cero.</li>
          <li><strong>Ignorar el signo.</strong> El sesgo puede ser positivo o negativo según β₂ y δ.</li>
          <li><strong>Creer que una variable omitida no importa porque no está disponible.</strong> La disponibilidad no cambia el sesgo; solo cambia lo que se puede hacer.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés predecir el signo del sesgo a partir de la correlación y del efecto de la omitida.</p></div>
      `,
      conexiones: `
        <p>El sesgo por omisión es la contracara del sesgo por inclusión: uno sacrifica insesgamiento, el otro eficiencia. RESET puede detectar algunos síntomas, pero no reemplaza el razonamiento sobre variables omitidas.</p>
        <div><button class="concept-chip" data-concept="sesgo-inclusion">Sesgo por inclusión →</button><button class="concept-chip" data-concept="reset">RESET →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 25.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 3, §3.3; Cap. 6.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>2P 2024, variable contenida en el error y proxy.</p></div>
      `
    },
    'sesgo-inclusion': {
      title: 'Sesgo por inclusión',
      sub: 'Incluir de más: insesgado, pero ineficiente.',
      esencia: `
        <div class="definition">Incluir una variable irrelevante no sesga los coeficientes de las demás, pero aumenta su varianza. Se estiman más parámetros con el mismo n, se pierden grados de libertad y los errores estándar crecen.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El estimador sigue siendo insesgado y consistente si la variable es realmente irrelevante.</li>
          <li>El costo es eficiencia: intervalos más anchos y t más chicos.</li>
          <li>El nombre “sesgo” es engañoso; la consecuencia es pérdida de precisión.</li>
        </ul>
        <div class="formula small">E(β̂<sub>j</sub>) = β<sub>j</sub>, pero Var(β̂<sub>j</sub>) ↑<span>Más parámetros, menos grados de libertad</span></div>
        <div class="badge-row"><span class="badge always">Siempre: insesgado pero ineficiente</span><span class="badge optional">Según el concepto: costo en grados de libertad</span></div>
      `,
      ejemplo: `
        <p>Si en el modelo de gasto en alimentos se agrega una variable que no tiene relación con foodexp, el coeficiente de income sigue centrado en su valor poblacional. Pero su error estándar aumenta y el intervalo se ensancha, porque se estima un parámetro adicional con la misma información.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>El daño crece si la variable irrelevante está muy correlacionada con las incluidas: la colinealidad infla la varianza y vuelve inestables los coeficientes. Ese es el costo real del sobreajuste.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Decir que incluir una variable irrelevante sesga el coeficiente.</strong> Si es irrelevante, no desplaza su esperanza; aumenta la varianza.</li>
          <li><strong>Creer que agregar variables es inocuo.</strong> Se pierden grados de libertad y puede aparecer colinealidad.</li>
          <li><strong>Confundir inclusión con omisión.</strong> La omisión de una relevante y correlacionada sí sesga e invalida la inferencia.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>Usás “sesgo por inclusión” para describir un desplazamiento de la esperanza del estimador.</p></div>
      `,
      conexiones: `
        <p>La inclusión se conecta con AIC y BIC, que castigan parámetros extra, y con la omisión, que tiene un costo mucho mayor cuando la variable omitida es relevante y está correlacionada.</p>
        <div><button class="concept-chip" data-concept="sesgo-omision">Sesgo por omisión →</button><button class="concept-chip" data-concept="aic-bic">AIC y BIC →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 25.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.3.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ej. 3c.1.</p></div>
      `
    },
    'prediccion-promedio': {
      title: 'Predicción promedio',
      sub: 'El valor esperado de Y para un vector X dado.',
      esencia: `
        <div class="definition">La predicción promedio estima θ<sub>0</sub> = β<sub>0</sub> + β<sub>1</sub>c<sub>1</sub> + β<sub>2</sub>c<sub>2</sub>, la media de Y en la subpoblación con X = c. Su intervalo es θ̂<sub>0</sub> ± t<sub>n−k−1, α/2</sub>·ee(θ̂<sub>0</sub>).</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>θ₀ es un parámetro, no el valor de una unidad concreta.</li>
          <li>El error estándar no es la suma de los errores estándar de los coeficientes.</li>
          <li>La reparametrización Y = θ₀ + β₁(X₁ − c₁) + β₂(X₂ − c₂) + u deja θ₀ como intercepto.</li>
        </ul>
        <div class="formula small">θ̂<sub>0</sub> = β̂<sub>0</sub> + β̂<sub>1</sub>c<sub>1</sub> + β̂<sub>2</sub>c<sub>2</sub><span>Var(θ̂<sub>0</sub>) = σ²X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: media condicional</span><span class="badge optional">Según el concepto: reparametrización</span></div>
      `,
      ejemplo: `
        <p>Con la cuadrática de ENGEL, en income = 1500 la predicción de foodexp es 938,19 y el IC al 95% para el promedio es [898,28; 978,10]. El intervalo es relativamente angosto porque se estima una media, no una observación.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Para obtener ese error estándar se estima lm(foodexp ~ I(income - 1500) + I(income^2 - 1500^2)) o se usa predict(..., interval = "confidence"). El intercepto de la reparametrización es la predicción promedio.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar el error estándar de la regresión como error estándar de la predicción.</strong> El primero mide el ruido; el segundo, la precisión de θ̂₀.</li>
          <li><strong>Darle el intervalo promedio a una persona.</strong> La variabilidad individual es otra y mucho mayor.</li>
          <li><strong>Predecir lejos del rango sin advertirlo.</strong> La fórmula se evalúa, pero los datos no sostienen la extrapolación.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué el intervalo promedio se angosta cerca de la media de X.</p></div>
      `,
      conexiones: `
        <p>La predicción promedio es el puente entre la estimación y la predicción individual. Comparte la predicción puntual con la individual, pero no la varianza: la individual suma el error no observado.</p>
        <div><button class="concept-chip" data-concept="prediccion-individual">Predicción individual →</button><button class="concept-chip" data-concept="intervalo-prediccion">Intervalo de predicción →</button><button class="concept-chip" data-concept="forma-funcional">Forma funcional →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 27–29 y 32–33.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 7, Ej. 1–2.</p></div>
      `
    },
    'prediccion-individual': {
      title: 'Predicción individual',
      sub: 'Un valor concreto, no el promedio de la subpoblación.',
      esencia: `
        <div class="definition">La predicción individual agrega la varianza del error no observado: Var(ê<sub>0</sub>) = σ<sup>2</sup>[1 + X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>]. El intervalo es más ancho que el de la predicción promedio.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Hay dos fuentes de incertidumbre: estimar β y el error idiosincrático u₀.</li>
          <li>La varianza del error no se reduce con más datos.</li>
          <li>El intervalo individual cubre una nueva realización, no el 95% de los individuos de la población.</li>
        </ul>
        <div class="formula small">Var(ê<sub>0</sub>) = σ<sup>2</sup> + σ<sup>2</sup>X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub><span>ê<sub>0</sub> = Y<sub>0</sub> − Ŷ<sub>0</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: sumar σ²</span><span class="badge optional">Según el concepto: intervalo más ancho</span></div>
      `,
      ejemplo: `
        <p>En ENGEL, para income = 1500 la predicción puntual es la misma, 938,19, pero el intervalo individual al 95% es [574,06; 1.302,32]. El promedio iba de 898,28 a 978,10; el individual es varias veces más ancho.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La diferencia de amplitud no es un error de R: es la varianza del error de una unidad concreta. Si se quiere hablar del gasto de una familia específica, el intervalo individual es el correcto.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar el intervalo promedio para una unidad.</strong> Subestima la incertidumbre y promete más precisión de la que hay.</li>
          <li><strong>Creer que más observaciones eliminan la variabilidad individual.</strong> σ² no desaparece con n.</li>
          <li><strong>Decir que el intervalo contiene al 95% de la población.</strong> Es un intervalo para una nueva observación, no una banda de cobertura.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué dos intervalos con la misma predicción puntual tienen amplitudes distintas.</p></div>
      `,
      conexiones: `
        <p>La predicción individual se obtiene de la promedio sumando σ². Es la respuesta correcta cuando la pregunta es por una persona, una empresa o una familia concreta, y no por la media de su subpoblación.</p>
        <div><button class="concept-chip" data-concept="prediccion-promedio">Predicción promedio →</button><button class="concept-chip" data-concept="intervalo-prediccion">Intervalo de predicción →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 30–31 y 34.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 7, Ej. 2–3.</p></div>
      `
    },
    'intervalo-prediccion': {
      title: 'Intervalo de predicción',
      sub: 'Incertidumbre muestral más incertidumbre del error.',
      esencia: `
        <div class="definition">El intervalo de predicción tiene la forma Ŷ<sub>0</sub> ± t<sub>n−k−1, α/2</sub>·ee(ê<sub>0</sub>). Para el promedio, la varianza es σ²X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>; para una observación individual, σ²[1 + X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>].</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El intervalo siempre es condicional al modelo estimado y a los valores de X.</li>
          <li>No cubre el error de especificación ni las variables omitidas.</li>
          <li>Se ensancha al alejarse del centro de los datos y es más ancho para una unidad que para un promedio.</li>
        </ul>
        <div class="formula small">Ŷ<sub>0</sub> ± t<sub>n−k−1, α/2</sub>·ee(ê<sub>0</sub>)<span>Promedio: ee² = σ̂²X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: promedio vs individual</span><span class="badge optional">Según el concepto: interpretación frecuentista</span></div>
      `,
      ejemplo: `
        <p>En ENGEL, a income = 1500, el intervalo promedio es [898,28; 978,10] y el individual [574,06; 1.302,32]. La amplitud pasa de 79,8 a 728,3: la mayor parte de la diferencia es la varianza del error no observado.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá siempre cuál de los dos intervalos usás. Un intervalo promedio angosto no implica que se pueda predecir con precisión a una familia; solo indica que la media de la subpoblación está bien estimada.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>“Hay 95% de probabilidad de que el próximo Y caiga en este intervalo”.</strong> En la interpretación frecuentista, el intervalo es aleatorio y el 95% se refiere a la cobertura de intervalos construidos así.</li>
          <li><strong>“El intervalo contiene al 95% de los individuos”.</strong> No es una banda de cobertura poblacional.</li>
          <li><strong>Ignorar el error de especificación.</strong> El intervalo supone que el modelo es correcto; no cubre variables omitidas ni forma funcional equivocada.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir qué parte de la amplitud viene de estimar β y qué parte del error individual.</p></div>
      `,
      conexiones: `
        <p>El intervalo de predicción es la aplicación directa de la inferencia a un valor de X. Cambia según se prediga una media o una unidad, y depende de la forma funcional y de la validez del modelo.</p>
        <div><button class="concept-chip" data-concept="prediccion-promedio">Predicción promedio →</button><button class="concept-chip" data-concept="prediccion-individual">Predicción individual →</button></div>
      `,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4B, diap. 29–34.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.4.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 7, Act. 1 y Ej. 3.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de especificación y predicción',
    intro: 'La primera parte trabaja la elección de modelos, RESET y los sesgos; la segunda, la predicción promedio e individual. La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto. El Ej. 2 del TP 7 se retoma en el laboratorio de R; la última tarjeta cubre el Ej. 2 y el Ej. 3.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-6',
    exercises: [
      {
        label: 'TP 6 · Ej. 3',
        title: 'Mortalidad infantil: especificación, sesgo y RESET',
        text: 'Estimá el modelo con PBI y alfabetización femenina, compará con la especificación que omite TAF, calculá el sesgo por omisión y aplicá RESET. Es el ejercicio que reúne los tres diagnósticos de la clase.',
        tags: ['Aplicar', 'RESET'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-3-5'
      },
      {
        label: 'TP 6 · Ej. 5',
        title: 'ENGEL: lineal, log-log y cuadrática',
        text: 'Estimá las tres formas funcionales, interpretá la pendiente y la elasticidad, compará el ajuste y usá el AIC para elegir entre lineal y cuadrática. Es la base del laboratorio.',
        tags: ['Aplicar', 'ENGEL'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-5-4'
      },
      {
        label: 'TP 6 · Ej. 10',
        title: 'Log-lin: menores, edad y variación exacta',
        text: 'Interpretá coeficientes en un modelo con log(Gasto), calculá el impacto de un menor más y de uno menos con la aproximación y con la fórmula exacta, y discutí insesgamiento y consistencia.',
        tags: ['Interpretar', 'Log-lin'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-10'
      },
      {
        label: 'TP 6 · Ej. 11',
        title: 'CES y competencia imperfecta: variable omitida',
        text: 'Analizá qué error de especificación se comete al estimar la elasticidad de sustitución sin el término de competencia imperfecta y qué consecuencias tiene sobre el estimador de β₂.',
        tags: ['Razonar', 'Omisión'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-11'
      },
      {
        label: 'TP 7 · Act. 1',
        title: 'Verdadero o falso sobre predicción',
        text: 'Poné a prueba las tres afirmaciones: variabilidad muestral de las predicciones, amplitud del intervalo individual frente al promedio y forma del intervalo alrededor de la media de X.',
        tags: ['Conceptual', 'V/F'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-6'
      },
      {
        label: 'TP 7 · Ej. 1',
        title: 'Ahorro e ingreso: predicción y reparametrización',
        text: 'Estimá el modelo, predecí el ahorro promedio para un ingreso de 16.000, reparametrizá para leer el intervalo en el intercepto y construí bandas de confianza para varios niveles de ingreso.',
        tags: ['Aplicar', 'Predicción'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-6'
      },
      {
        label: 'TP 7 · Ej. 2–3',
        title: 'Predicción matricial y comparación de intervalos',
        text: 'Usá la fórmula σ̂²X₀′(X′X)⁻¹X₀ para la predicción promedio y agregá σ̂² para la individual; después compará ambos intervalos en el ejercicio con tres variables explicativas.',
        tags: ['Aplicar', 'Matricial'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-6'
      }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 6 · Ej. 5 y TP 7 · Ej. 2',
      title: 'ENGEL: tres formas funcionales, AIC, RESET y predicción',
      intro: 'Una misma base permite recorrer toda la clase: comparar niveles con una cuadrática, ver por qué el log-log no se compara en AIC, contrastar la forma lineal con RESET y construir los dos intervalos de predicción en income = 1500.',
      dataNote: 'La base ENGEL tiene 236 observaciones completas y dos variables: foodexp (gasto anual en alimentos) e income (ingreso anual), en las unidades monetarias de la base. No hay datos faltantes. El modelo loglog tiene log(foodexp) como variable dependiente: su R² y su AIC no son comparables con los de lin y cuad, que explican foodexp en niveles. La comparación de AIC y BIC se hace solo entre lin y cuad.',
      script: `load("ENGEL.rda")

lin <- lm(foodexp ~ income, data = base)
loglog <- lm(log(foodexp) ~ log(income), data = base)
cuad <- lm(foodexp ~ income + I(income^2), data = base)

summary(lin)
summary(loglog)
summary(cuad)
AIC(lin, cuad)
BIC(lin, cuad)

suppressPackageStartupMessages(library(lmtest))
resettest(lin, power = 2:3, type = "f")

predict(cuad, newdata = data.frame(income = 1500), interval = "confidence")
predict(cuad, newdata = data.frame(income = 1500), interval = "prediction")

confint(cuad)
-coef(cuad)[2] / (2 * coef(cuad)[3])
max(base$income)
mean(base$foodexp)
mean(base$income)`,
      output: `Call:
lm(formula = foodexp ~ income, data = base)

Residuals:
    Min      1Q  Median      3Q     Max 
-738.33  -69.82  -13.91   44.09 2357.30 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
(Intercept) 156.86303   26.82042   5.849 1.66e-08 ***
income        0.48583    0.02416  20.112  < 2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 191.9 on 234 degrees of freedom
Multiple R-squared:  0.6335,	Adjusted R-squared:  0.6319 
F-statistic: 404.5 on 1 and 234 DF,  p-value: < 2.2e-16


Call:
lm(formula = log(foodexp) ~ log(income), data = base)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.50869 -0.10051  0.00748  0.09055  1.54183 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  0.52362    0.17155   3.052  0.00253 ** 
log(income)  0.86004    0.02523  34.094  < 2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.1698 on 234 degrees of freedom
Multiple R-squared:  0.8324,	Adjusted R-squared:  0.8317 
F-statistic:  1162 on 1 and 234 DF,  p-value: < 2.2e-16


Call:
lm(formula = foodexp ~ income + I(income^2), data = base)

Residuals:
    Min      1Q  Median      3Q     Max 
-537.25  -57.13   -6.18   41.25 2336.69 

Coefficients:
              Estimate Std. Error t value Pr(>|t|)    
(Intercept)  7.706e+00  4.073e+01   0.189     0.85    
income       7.262e-01  5.594e-02  12.981  < 2e-16 ***
I(income^2) -7.057e-05  1.496e-05  -4.718  4.1e-06 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 183.7 on 233 degrees of freedom
Multiple R-squared:  0.6655,	Adjusted R-squared:  0.6626 
F-statistic: 231.8 on 2 and 233 DF,  p-value: < 2.2e-16

     df      AIC
lin   3 3154.945
cuad  4 3135.408
     df      BIC
lin   3 3165.336
cuad  4 3149.263

	RESET test

data:  lin
RESET = 11.139, df1 = 2, df2 = 232, p-value = 2.403e-05

       fit      lwr      upr
1 938.1886 898.2764 978.1008
       fit      lwr      upr
1 938.1886 574.0625 1302.315
                    2.5 %        97.5 %
(Intercept) -72.534848410 87.9471068853
income        0.615962933  0.8364030662
I(income^2)  -0.000100043 -0.0000411055
  income 
5144.817 
[1] 4957.813
[1] 634.2173
[1] 982.5473`,
      confint: `                    2.5 %        97.5 %
(Intercept) -72.534848410 87.9471068853
income        0.615962933  0.8364030662
I(income^2)  -0.000100043 -0.0000411055`,
      readingTable: [
        {
          element: 'Estimate (income, lin)',
          meaning: 'Pendiente del modelo lineal.',
          how: '0,486: una unidad más de ingreso se asocia con 0,486 unidades más de gasto en alimentos. Es una propensión marginal, no una elasticidad.'
        },
        {
          element: 'Std. Error',
          meaning: 'Error estándar del coeficiente.',
          how: '0,0242 para income en el lineal. Mide precisión y entra en el t y en el intervalo.'
        },
        {
          element: 't value',
          meaning: 'Estimate / Std. Error.',
          how: '20,1 en el lineal: la pendiente está veinte errores estándar de cero. No mide la magnitud económica.'
        },
        {
          element: 'Multiple R-squared',
          meaning: 'Proporción de variación explicada.',
          how: '0,6335 en el lineal; 0,6655 en la cuadrática. Solo se comparan entre modelos con la misma Y; el 0,8324 del log-log es otra escala.'
        },
        {
          element: 'Residual standard error',
          meaning: 'σ̂, dispersión residual.',
          how: '191,9 en el lineal y 183,7 en la cuadrática. Es el ruido del modelo, no el error estándar de una predicción.'
        },
        {
          element: 'AIC / BIC',
          meaning: 'Criterios penalizados.',
          how: '3154,9 y 3165,3 para lin; 3135,4 y 3149,3 para cuad. Menor es mejor, con la misma Y y el mismo n. R cuenta además σ en df; lo que importa al comparar es la diferencia de df, que coincide con la de regresores.'
        },
        {
          element: 'I(income^2)',
          meaning: 'Término cuadrático.',
          how: '−7,06e-05 con t = −4,72: curvatura negativa. El efecto marginal es 0,726 − 2·0,0000706·income.'
        },
        {
          element: 'RESET',
          meaning: 'Contraste de no linealidad.',
          how: 'F = 11,14 con df1 = 2 y df2 = 232, p = 2,4e-05. Rechaza la forma lineal; no dice cuál es la alternativa correcta.'
        },
        {
          element: 'fit',
          meaning: 'Predicción puntual.',
          how: '938,19 para income = 1500 con la cuadrática. Es la misma en los dos tipos de intervalo.'
        },
        {
          element: 'lwr / upr (confidence)',
          meaning: 'Intervalo para el promedio.',
          how: '[898,28; 978,10]: cubre la media de foodexp en la subpoblación con income = 1500.'
        },
        {
          element: 'lwr / upr (prediction)',
          meaning: 'Intervalo para una unidad.',
          how: '[574,06; 1.302,32]: cubre una nueva familia con income = 1500. Es mucho más ancho porque suma σ̂².'
        }
      ],
      econometric: `<p><strong>Modelo lineal:</strong> β̂<sub>income</sub> = 0,486 con ee = 0,0242, t = 20,1 y p &lt; 0,001. El R² es 0,6335 y el error estándar residual, 191,9. La pendiente es precisa, pero el modelo impone el mismo efecto marginal en todo el rango de ingreso.</p>
        <p><strong>Modelo log-log:</strong> β̂<sub>log(income)</sub> = 0,860 con ee = 0,0252 y t = 34,1. Es una elasticidad: 1% más de ingreso se asocia con 0,86% más de gasto. El R² de 0,8324 y el AIC de este modelo no se comparan con los de niveles porque la Y es log(foodexp).</p>
        <p><strong>Modelo cuadrático:</strong> β̂<sub>income</sub> = 0,726 y β̂<sub>income²</sub> = −7,06 × 10<sup>−5</sup>, ambos significativos. El R² sube a 0,6655 y el AIC baja de 3154,9 a 3135,4; el BIC también favorece a la cuadrática, 3149,3 contra 3165,3. El efecto marginal en la media es 0,587 y en el máximo muestral, 0,026: sigue siendo positivo en todo el rango.</p>
        <p><strong>RESET:</strong> F = 11,139 con 2 y 232 grados de libertad, p = 2,403e-05. Se rechaza la especificación lineal. La cuadrática captura parte de esa no linealidad, pero RESET no prueba que sea la forma verdadera; solo indica que la lineal no alcanza.</p>
        <p><strong>Predicción:</strong> en income = 1500, foodexp predicho es 938,19. El IC promedio al 95% es [898,28; 978,10] y el intervalo individual, [574,06; 1.302,32]. La predicción puntual es la misma; la diferencia está en la varianza que se agrega.</p>`,
      economic: `<p>La relación entre ingreso y gasto en alimentos es positiva y cóncava. El log-log estima una elasticidad de 0,86: menor que uno, como corresponde a un bien de primera necesidad. Un aumento de 1% en el ingreso se asocia con un aumento de 0,86% en el gasto alimentario, no con un aumento proporcional.</p>
        <p>La lectura de Engel: a medida que el ingreso crece, la proporción del gasto destinada a alimentos tiende a caer. En la muestra, el gasto medio es 634,2 y el ingreso medio, 982,5; en income = 1500 la predicción es 938,2, un 62,5% del ingreso. Son asociaciones condicionales, no efectos causales.</p>
        <p>La cuadrática sugiere que la propensión marginal al gasto en alimentos disminuye con el ingreso: 0,587 en la media y 0,026 en el máximo muestral. Esa saturación es económicamente plausible, pero el vértice estimado en 5144,8 queda apenas por encima del máximo observado, 4957,8. La muestra no contiene información sobre una caída del gasto.</p>
        <p>Por eso no conviene extrapolar: la parábola puede predecir un descenso del gasto en alimentos para ingresos altos, pero ese tramo no está en los datos y el intervalo se ensancha. Además, la base es observacional y no controla tamaño del hogar, composición, región ni precios; cualquier afirmación causal requiere un diseño adicional.</p>`,
      errors: [
        'Comparar el AIC o el R² del log-log con los de lin y cuad. La Y está en logaritmos: la escala no es la misma.',
        'Leer el coeficiente de income en la cuadrática como si fuera el efecto marginal constante. El efecto es 0,726 − 2·0,0000706·income.',
        'Decir que el vértice está dentro de la muestra. Está en 5144,8 y el máximo observado es 4957,8: es una extrapolación.',
        'Usar el intervalo de confianza promedio para predecir a una familia concreta. El individual es [574,06; 1.302,32], mucho más ancho.',
        'Concluir que RESET demuestra que la cuadrática es la especificación correcta. RESET solo detecta que la lineal no alcanza.',
        'Ignorar que el intercepto de la cuadrática no es significativo. No invalida la curvatura, pero obliga a no interpretarlo como el nivel de gasto cuando income = 0.'
      ],
      checklist: [
        'Declará n, variable dependiente y transformación antes de comparar modelos.',
        'Compará AIC y BIC solo entre modelos con la misma Y y el mismo n.',
        'En una cuadrática, calculá el efecto marginal en puntos relevantes y ubicá el vértice dentro del rango.',
        'Reportá RESET con q, grados de libertad y p, y explicá qué no prueba.',
        'Distinguí predicción promedio de individual y usá el intervalo que corresponde.',
        'Advertí la extrapolación y separá asociación condicional de causalidad.'
      ]
    },
    partials: [
      {
        label: '2P 2024',
        text: 'Modelo con una variable contenida en el error y uso de una proxy: cuándo los estimadores son consistentes y qué ocurre cuando la variable omitida no está correlacionada con la incluida (δ1 = 0). Es el mismo problema del sesgo por omisión, formulado con una variable no observada.'
      },
      {
        label: '1P 2026',
        text: 'Por qué la inferencia requiere más que los dos primeros momentos y por qué la normalidad importa en muestras chicas. Es la base para construir intervalos de predicción con t y para entender qué supuestos sostienen el intervalo.'
      }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a elegir especificaciones, interpretar diagnósticos y distinguir tipos de predicción. Respondé antes de abrir la solución.',
    questions: [
      {
        q: '¿Por qué el R² no alcanza para elegir entre dos modelos con la misma Y?',
        a: 'Porque el R² no baja por construcción al agregar regresores, incluso si son irrelevantes; puede subir o quedarse igual. Elegir por R² premia la complejidad y el sobreajuste. Hay que mirar la teoría, la significancia conjunta, AIC o BIC, los diagnósticos de forma funcional y la capacidad predictiva.'
      },
      {
        q: 'Escribí AIC y BIC. ¿Cuál penaliza más y por qué?',
        a: 'AIC = log(SCR/n) + 2k/n; BIC = log(SCR/n) + (k/n)·log(n). Para n > 7, log(n) > 2, así que BIC cobra más por parámetro y tiende a modelos más parsimoniosos. AIC busca un mejor equilibrio predictivo; BIC es consistente si el modelo verdadero está entre los candidatos.'
      },
      {
        q: '¿Se puede comparar el AIC de un modelo para foodexp con el de un modelo para log(foodexp)?',
        a: 'No. La transformación de Y cambia la escala de la verosimilitud y los valores no son comparables. Tampoco se comparan si cambia el n. Para elegir entre esas especificaciones hay que usar otras herramientas: interpretación, RESET, residuos o validación predictiva en la escala de interés.'
      },
      {
        q: '¿Qué contrasta RESET, cuál es la hipótesis nula y cuántas restricciones hay?',
        a: 'Contrasta si el modelo lineal omitió no linealidades, ampliándolo con Ŷ² y Ŷ³. H₀: δ₁ = δ₂ = 0, con q = 2. Se usa un F con 2 y n − k − 3 grados de libertad o un LM = nR² auxiliar con χ²₂.'
      },
      {
        q: 'RESET rechaza. ¿Podés concluir que hay que agregar una cuadrática?',
        a: 'No. RESET detecta que la forma funcional no alcanza, pero no identifica la alternativa. La solución puede ser una cuadrática, un logaritmo, una interacción o una variable omitida. Hay que probar alternativas teóricamente plausibles y volver a contrastar.'
      },
      {
        q: 'Un modelo omite una variable relevante. Escribí el sesgo y explicá de qué depende su signo.',
        a: 'E(β̃₁) = β₁ + β₂·δ, con δ = Cov(X₁,X₂)/Var(X₁). El sesgo es β₂·δ: depende del efecto de la omitida sobre Y y de su correlación lineal con la incluida. Si ambos son positivos, el sesgo es positivo; si uno es negativo, el signo se invierte. El estimador también es inconsistente.'
      },
      {
        q: '¿Incluir una variable irrelevante genera sesgo? ¿Cuál es el costo real?',
        a: 'No sesga la esperanza de los otros coeficientes si la variable es realmente irrelevante. El costo es eficiencia: se estima un parámetro extra, se pierden grados de libertad, aumenta la varianza y los errores estándar se agrandan, sobre todo si hay colinealidad. El nombre “sesgo por inclusión” es engañoso.'
      },
      {
        q: '¿Es siempre mejor incluir todas las variables disponibles para evitar el sesgo por omisión?',
        a: 'No. Incluir variables irrelevantes aumenta la varianza y puede volver impreciso el modelo; además, complica la interpretación y la predicción. La estrategia correcta es usar la teoría y la evidencia previa para elegir las variables relevantes, no llenar el modelo por las dudas. La omisión de una relevante y correlacionada es más grave, pero eso no justifica el sobreajuste.'
      },
      {
        q: 'Definí θ₀ y explicá cómo se obtiene su error estándar con una reparametrización.',
        a: 'θ₀ = β₀ + β₁c₁ + β₂c₂ es la media condicional de Y para X = c. Se reescribe el modelo como Y = θ₀ + β₁(X₁ − c₁) + β₂(X₂ − c₂) + u, de modo que θ₀ es el intercepto. El error estándar del intercepto en esa regresión es el error estándar de la predicción promedio, y el IC usa t con n − k − 1 grados de libertad.'
      },
      {
        q: '¿Por qué el intervalo individual es más ancho que el promedio?',
        a: 'Porque la predicción individual suma la varianza del error no observado u₀. La varianza del promedio es σ²X₀′(X′X)⁻¹X₀; la individual es σ²[1 + X₀′(X′X)⁻¹X₀]. El término σ² no se reduce con más datos: refleja la variabilidad idiosincrática de la unidad.'
      },
      {
        q: '¿Dónde es más angosto el intervalo de predicción y qué pasa al alejarse de la media?',
        a: 'Es más angosto cerca de la media de las X, porque el término (c − X̄)²/Σ(Xi − X̄)² se hace cero. Al alejarse, el intervalo se ensancha: hay menos información local y mayor palanca. Fuera del rango observado la fórmula sigue funcionando, pero es una extrapolación que los datos no sostienen.'
      },
      {
        q: 'En ENGEL, el vértice de la cuadrática está en 5144,8 y el máximo muestral es 4957,8. ¿Qué se puede afirmar?',
        a: 'Que dentro de la muestra el gasto en alimentos todavía crece con el ingreso; la pendiente en el máximo es 0,026, positiva. El vértice es una extrapolación apenas fuera del rango. No se puede afirmar que el gasto empieza a caer en 5144,8 ni usar esa predicción como si estuviera respaldada por datos.'
      }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: especificación y predicción',
    intro: 'Empezá por el formulario, seguí con el drill y la sesión, y cerrá con el plan de 7 días. La idea es repasar sin volver a leer todo desde cero.',
    formulas: [
      {
        title: 'AIC',
        eq: 'AIC = log(SCR/n) + 2k/n',
        note: 'Menor es mejor. Misma Y y mismo n.'
      },
      {
        title: 'BIC',
        eq: 'BIC = log(SCR/n) + (k/n)·log(n)',
        note: 'Penaliza más que AIC cuando n > 7; favorece la parsimonia.'
      },
      {
        title: 'RESET',
        eq: 'Y = β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub> + δ<sub>1</sub>Ŷ<sup>2</sup> + δ<sub>2</sub>Ŷ<sup>3</sup> + v',
        note: 'H₀: δ₁ = δ₂ = 0; q = 2; F con n − k − 3 en el denominador.'
      },
      {
        title: 'Sesgo por omisión',
        eq: 'E(β̃<sub>1</sub>) = β<sub>1</sub> + β<sub>2</sub>·Cov(X<sub>1</sub>,X<sub>2</sub>)/Var(X<sub>1</sub>)',
        note: 'Sesgo = β₂·δ. Es sesgado e inconsistente si la covarianza no es cero.'
      },
      {
        title: 'Sesgo por inclusión',
        eq: 'E(β̂<sub>j</sub>) = β<sub>j</sub>, pero Var(β̂<sub>j</sub>) ↑',
        note: 'Insesgado pero ineficiente: más parámetros y menos grados de libertad.'
      },
      {
        title: 'Predicción promedio',
        eq: 'θ<sub>0</sub> = β<sub>0</sub> + β<sub>1</sub>c<sub>1</sub> + β<sub>2</sub>c<sub>2</sub>',
        note: 'Media condicional de Y para X = c.'
      },
      {
        title: 'Reparametrización',
        eq: 'Y = θ<sub>0</sub> + β<sub>1</sub>(X<sub>1</sub> − c<sub>1</sub>) + β<sub>2</sub>(X<sub>2</sub> − c<sub>2</sub>) + u',
        note: 'El intercepto es θ₀; su ee es el de la predicción promedio.'
      },
      {
        title: 'Varianza promedio (matricial)',
        eq: 'Var(Ŷ<sub>0</sub>) = σ<sup>2</sup>X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>',
        note: 'Solo variabilidad muestral de β̂.'
      },
      {
        title: 'Varianza individual (matricial)',
        eq: 'Var(ê<sub>0</sub>) = σ<sup>2</sup>[1 + X<sub>0</sub>′(X′X)<sup>−1</sup>X<sub>0</sub>]',
        note: 'Agrega la varianza del error no observado.'
      },
      {
        title: 'Varianza promedio (simple)',
        eq: 'σ̂<sup>2</sup>[1/n + (c − X̄)<sup>2</sup>/Σ(X<sub>i</sub> − X̄)<sup>2</sup>]',
        note: 'Mínima en c = X̄; crece al alejarse.'
      },
      {
        title: 'Varianza individual (simple)',
        eq: 'σ̂<sup>2</sup>[1 + 1/n + (c − X̄)<sup>2</sup>/Σ(X<sub>i</sub> − X̄)<sup>2</sup>]',
        note: 'La individual agrega 1 dentro del corchete.'
      },
      {
        title: 'Intervalo de predicción',
        eq: 'Ŷ<sub>0</sub> ± t<sub>n−k−1, α/2</sub>·ee(ê<sub>0</sub>)',
        note: 'Cambia el ee según sea promedio o individual.'
      }
    ],
    drills: [
      {
        q: 'Escribí AIC y BIC e indicá cuál elige modelos más chicos.',
        a: 'AIC = log(SCR/n) + 2k/n; BIC = log(SCR/n) + (k/n)·log(n). BIC penaliza más cuando n > 7 y tiende a modelos más parsimoniosos.'
      },
      {
        q: '¿Qué dos condiciones exige comparar AIC entre modelos?',
        a: 'La misma transformación de la variable dependiente y el mismo tamaño de muestra. No hace falta que estén anidados.'
      },
      {
        q: 'En el laboratorio, ¿cuánto baja el AIC al pasar de lin a cuad?',
        a: 'De 3154,945 a 3135,408: una diferencia de 19,537 a favor de la cuadrática. El BIC baja de 3165,336 a 3149,263.'
      },
      {
        q: '¿Por qué el AIC del log-log no se compara con el de lin?',
        a: 'Porque la Y del log-log es log(foodexp), no foodexp. La verosimilitud se mide en otra escala y los criterios no son comparables.'
      },
      {
        q: 'Escribí la regresión ampliada de RESET y la H₀.',
        a: 'Y = β₀ + β₁X₁ + … + βₖXₖ + δ₁Ŷ² + δ₂Ŷ³ + v; H₀: δ₁ = δ₂ = 0. Se contrasta con F de q = 2 y n − k − 3 grados de libertad, o con LM = nR² auxiliar.'
      },
      {
        q: '¿Qué hacés si RESET rechaza?',
        a: 'Probar otra forma funcional —logaritmos, cuadrática, interacciones—, revisar variables omitidas y volver a contrastar. RESET no dice cuál es la alternativa.'
      },
      {
        q: 'Escribí el sesgo por omisión y la regla del signo.',
        a: 'E(β̃₁) = β₁ + β₂·δ, con δ = Cov(X₁,X₂)/Var(X₁). El sesgo es β₂·δ: mismo signo que el producto del efecto de la omitida y su correlación con la incluida.'
      },
      {
        q: '¿Qué le pasa a la varianza al incluir una variable irrelevante?',
        a: 'Aumenta. Se estima un parámetro extra, se pierden grados de libertad y los errores estándar crecen, sobre todo si hay colinealidad. El estimador sigue insesgado.'
      },
      {
        q: 'Definí θ₀ y explicá la reparametrización.',
        a: 'θ₀ = β₀ + β₁c₁ + β₂c₂. Se centran las X en c y el modelo queda Y = θ₀ + β₁(X₁ − c₁) + β₂(X₂ − c₂) + u; el intercepto es θ₀ y su ee es el de la predicción promedio.'
      },
      {
        q: '¿Qué diferencia hay entre Var(Ŷ₀) y Var(ê₀)?',
        a: 'Var(Ŷ₀) = σ²X₀′(X′X)⁻¹X₀ mide la variabilidad del promedio estimado. Var(ê₀) = σ²[1 + X₀′(X′X)⁻¹X₀] agrega la varianza del error no observado de una unidad.'
      },
      {
        q: '¿Cómo se interpreta el intervalo individual del 95%?',
        a: 'En muestreo repetido, el 95% de los intervalos construidos así cubriría una nueva observación con X = X₀. No es la probabilidad de que el próximo Y esté en este intervalo concreto ni una banda que contenga al 95% de los individuos.'
      }
    ],
    sourceGuide: [
      {
        stuck: 'No entiendo las fórmulas de AIC y BIC',
        source: 'Clase 4B, diap. 20; Wooldridge Cap. 6, §6.3 (selección de modelos).'
      },
      {
        stuck: 'No sé cuándo puedo comparar dos AIC',
        source: 'Clase 4B, diap. 20; TP 6, Ej. 5c.'
      },
      {
        stuck: 'No sé elegir entre niveles, logaritmos y cuadráticas',
        source: 'Clase 4B, diap. 21–22; Wooldridge §6.2; TP 6, Ej. 5.'
      },
      {
        stuck: 'No entiendo qué contrasta RESET',
        source: 'Clase 4B, diap. 23–24; Wooldridge §9.1; TP 6, Ej. 3c.3.'
      },
      {
        stuck: 'No puedo explicar el sesgo por omisión',
        source: 'Clase 4B, diap. 25; Wooldridge §3.3; TP 6, Ej. 11.'
      },
      {
        stuck: 'Confundo inclusión con omisión',
        source: 'Clase 4B, diap. 25; TP 6, Ej. 3c.1.'
      },
      {
        stuck: 'No sé calcular el error estándar de la predicción promedio',
        source: 'Clase 4B, diap. 28–29; TP 7, Ej. 1.'
      },
      {
        stuck: 'No entiendo las fórmulas matriciales',
        source: 'Clase 4B, diap. 32–34; TP 7, Ej. 2.'
      },
      {
        stuck: 'No distingo intervalo promedio de individual',
        source: 'Clase 4B, diap. 30–31; TP 7, Act. 1 y Ej. 3.'
      }
    ],
    session: [
      {
        time: '0–10',
        title: 'Pregunta guía',
        text: '¿Cómo se elige una especificación y qué se puede prometer al predecir? Escribí una respuesta de tres líneas antes de mirar apuntes.'
      },
      {
        time: '10–25',
        title: 'AIC, BIC y comparabilidad',
        text: 'Escribí las dos fórmulas, explicá la penalización y las dos condiciones: misma Y y mismo n. Revisá la salida del laboratorio.'
      },
      {
        time: '25–40',
        title: 'Forma funcional y RESET',
        text: 'Compará niveles, log-log y cuadrática. Escribí la regresión ampliada de RESET, su H₀ y los grados de libertad. Fuente: diap. 21–24.'
      },
      {
        time: '40–55',
        title: 'Sesgos de especificación',
        text: 'Explicá la asimetría entre incluir y omitir, escribí la fórmula del sesgo y resolvé el TP 6, Ej. 3c y Ej. 11.'
      },
      {
        time: '55–75',
        title: 'Predicción',
        text: 'Construí θ₀, reparametrizá, calculá el IC promedio y el individual con el laboratorio. Explicá por qué el individual es más ancho.'
      },
      {
        time: '75–90',
        title: 'Parciales y cierre',
        text: 'Respondé las preguntas de 2P 2024 sobre variable omitida y proxy, y las de 1P 2026 sobre supuestos de inferencia. Cerrá anotando una idea que puedas enseñar en dos minutos y una que todavía no puedas explicar sin mirar.'
      }
    ],
    kit: [
      {
        k: 'Kit 01',
        title: 'Una página de ideas clave',
        text: 'AIC/BIC, forma funcional, RESET, inclusión/omisión y predicción, con una frase por concepto.'
      },
      {
        k: 'Kit 02',
        title: 'Tabla de errores',
        text: 'Qué se confunde, por qué y cómo corregirlo. La sección 07 y los errores del laboratorio son el punto de partida.'
      },
      {
        k: 'Kit 03',
        title: 'Doce preguntas',
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
        text: 'Leé la clase 04B completa y explicá el mapa de predicción sin mirar.'
      },
      {
        day: 'Día 2',
        title: 'AIC y BIC',
        text: 'Escribí las fórmulas, la comparación con n = 236 y las condiciones de comparabilidad.'
      },
      {
        day: 'Día 3',
        title: 'Forma funcional y RESET',
        text: 'Resolvé el TP 6, Ej. 5a–c y el Ej. 3c.3; interpretá el vértice y el contraste.'
      },
      {
        day: 'Día 4',
        title: 'Sesgos',
        text: 'Resolvé el TP 6, Ej. 3c.1–c.2 y el Ej. 11; escribí el signo del sesgo en cada caso.'
      },
      {
        day: 'Día 5',
        title: 'Predicción',
        text: 'Replicá el laboratorio y resolvé el TP 7, Ej. 1 y 2. Compará los dos intervalos.'
      },
      {
        day: 'Día 6',
        title: 'Parciales y simulacro',
        text: 'Respondé las preguntas de 2P 2024 y 1P 2026 en 45 minutos, sin mirar.'
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
        title: 'Clase 4 — Especificación del modelo y predicción',
        text: 'Fuente principal de la explicación, el orden y los énfasis de esta clase.',
        loc: '34 diapositivas · diap. 20–34'
      },
      {
        type: 'Libro',
        typeClass: 'book',
        title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.',
        text: 'Cap. 6: formas funcionales, criterios de selección y predicción. Cap. 9, §9.1: errores de especificación de la forma funcional y RESET. Cap. 3, §3.3: sesgo por omisión.',
        loc: 'Cap. 6 · §6.2–6.4; Cap. 9 · §9.1; Cap. 3 · §3.3'
      },
      {
        type: 'Guía',
        typeClass: '',
        title: 'Guía de Trabajos Prácticos 2026 — TP 6',
        text: 'Ejercicios 3, 5, 10 y 11: especificación, formas funcionales, AIC, RESET y sesgo por omisión.',
        loc: 'TP 6 · ej. 3, 5, 10 y 11',
        href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-6'
      },
      {
        type: 'Guía',
        typeClass: '',
        title: 'Guía de Trabajos Prácticos 2026 — TP 7',
        text: 'Predicción promedio e individual, reparametrización, intervalos y fórmulas matriciales. Los ejercicios 4 a 6 refuerzan el cálculo con matrices y la comparación de intervalos.',
        loc: 'TP 7 completo · act. 1; ej. 1–6',
        href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-7'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '2P 2024',
        text: 'Variable contenida en el error, proxy y consistencia: el mismo problema del sesgo por omisión con una variable no observada.',
        loc: 'Solución orientativa'
      }
    ]
  }
};
