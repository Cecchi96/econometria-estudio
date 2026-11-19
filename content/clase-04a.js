window.CLASE_CONTENIDOS = window.CLASE_CONTENIDOS || {};

window.CLASE_CONTENIDOS["clase-04a"] = {
  id: 'clase-04a',
  num: '04A',
  eyebrow: 'Clase 04A · Especificación I',
  title: 'Especificación I: escala, formas funcionales y logaritmos',
  lead: 'Antes de estimar hay que decidir cómo entran las variables al modelo. La escala cambia los coeficientes pero no los t; los logaritmos cambian la interpretación; las cuadráticas hacen que el efecto marginal dependa de X.',
  question: '¿Cómo se elige la forma funcional de un modelo y qué cambia —y qué no— cuando se transforman las variables?',
  pills: ['17 diapositivas', 'TP 6', '1P 2024', '8 conceptos clave'],
  sections: [
    {
      id: 'c04a-s01',
      number: '01',
      title: 'El problema: la forma funcional no es un detalle',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s01-p01',
          html: 'Dos personas miran la misma encuesta de gastos. Una estima el gasto en alimentos en función del ingreso en niveles; la otra, en logaritmos. Las dos corren MCO y obtienen coeficientes significativos. Sin embargo, no dicen lo mismo: la primera habla de pesos adicionales por peso adicional; la segunda, de porcentajes. La forma funcional es la decisión que define qué pregunta responde el modelo.'
        },
        {
          type: 'p',
          id: 'c04a-s01-p02',
          html: 'Antes de estimar hay que decidir cómo entran las variables: en niveles o en logaritmos, con un término cuadrático, con interacciones y en qué unidades. Esa decisión no la resuelve el software. Depende de la teoría económica, de lo que muestran las aplicaciones previas, de la interpretación que se quiere hacer y de si tiene más sentido pensar que X afecta a Y en pesos o en porcentajes. También depende del rango y de la positividad de los datos.'
        },
        {
          type: 'compare',
          left: {
            tag: 'Niveles',
            title: 'Pesos por peso',
            text: 'La pendiente es constante: cada peso adicional de ingreso se asocia con los mismos pesos de gasto, en todo el rango observado.',
            eq: 'G = β<sub>0</sub> + β<sub>1</sub>I'
          },
          right: {
            tag: 'Logaritmos',
            title: 'Porcentajes',
            text: 'La elasticidad es constante: cada 1% más de ingreso se asocia con el mismo porcentaje de gasto.',
            eq: 'log G = β<sub>0</sub> + β<sub>1</sub>log I'
          }
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Teoría',
              title: 'Qué relación se espera',
              text: 'Una función de producción, una curva de Engel o una demanda no se comportan igual en todo el rango.'
            },
            {
              sym: 'Datos',
              title: 'Qué permite la muestra',
              text: 'Variables positivas, ceros, observaciones atípicas y rango observado condicionan la transformación.'
            },
            {
              sym: 'Lectura',
              title: 'Qué frase quiero escribir',
              text: 'El coeficiente tiene que traducirse a una afirmación económica comprensible.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'Lineal en los parámetros, no en las variables',
          html: 'MCO exige que Y se escriba como β<sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + … + β<sub>k</sub>X<sub>k</sub> + u, con los parámetros entrando de forma lineal. Un logaritmo, un cuadrado o una interacción no rompen esa condición: cambian la variable, no la forma en que el coeficiente la multiplica. Lo que no admite MCO es, por ejemplo, β<sub>1</sub><sup>2</sup> o β<sub>1</sub>β<sub>2</sub>.'
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-01',
          question: '¿Un modelo con log(X) deja de ser lineal para MCO?',
          intro: 'Separá linealidad en variables de linealidad en parámetros.',
          answer: 'No. MCO requiere linealidad en los parámetros, no en las variables. En Y = β<sub>0</sub> + β<sub>1</sub>log X + u, el regresor es log X, pero β<sub>1</sub> entra linealmente. El método de estimación es el mismo que con cualquier otra X; lo que cambia es la interpretación del coeficiente. Un modelo con β<sub>1</sub><sup>2</sup> o con β<sub>1</sub>β<sub>2</sub> sí dejaría de ser lineal en los parámetros.'
        },
        {
          type: 'p',
          id: 'c04a-s01-p03',
          html: 'Elegir mal la forma funcional tiene consecuencias parecidas a omitir una variable. Si la relación verdadera es cuadrática y se estima una recta, el término X<sup>2</sup> queda dentro del error y suele estar correlacionado con X: el coeficiente lineal recoge algo que no le corresponde. Si se agregan términos innecesarios, se pierde precisión sin sesgar necesariamente. El diagnóstico sistemático de estos problemas —RESET, selección de modelos, sesgos por inclusión y omisión— se desarrolla en la clase 04B. Acá alcanza con retener que la forma funcional es parte de la especificación, no un detalle de presentación.'
        }
      ]
    },
    {
      id: 'c04a-s02',
      number: '02',
      title: 'Cambios de escala en Y y en X',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s02-p01',
          html: 'Las unidades son una convención. Si una variable se mide en pesos o en miles de pesos, la conclusión económica no debería cambiar. Lo que cambia es la escala de los coeficientes, no la evidencia. Entender esta invariancia evita dos errores frecuentes: creer que un coeficiente más grande es un efecto más fuerte y creer que un t cambia porque cambió la unidad. El primer caso se estudia con los <span class="concept" data-concept="cambios-escala" tabindex="0" role="button">cambios de escala</span>.'
        },
        {
          type: 'formula',
          main: 'Ŷ/c = β̂<sub>0</sub>/c + (β̂<sub>1</sub>/c)X<sub>1</sub> + (β̂<sub>2</sub>/c)X<sub>2</sub>',
          legend: [
            {
              key: 'c',
              text: 'Factor de escala. Si Y pasa de pesos a miles, c = 1000.'
            },
            {
              key: 'Coeficientes',
              text: 'Intercepto y pendientes quedan divididos por c.'
            },
            {
              key: 'Residuos',
              text: 'û/c: cada residuo se divide por c y la SCR por c².'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s02-p02',
          html: 'Al dividir Y por c, todos los coeficientes de nivel y sus errores estándar se dividen por c. El estadístico t de significancia (H<sub>0</sub>: β<sub>j</sub> = 0) no cambia, porque numerador y denominador se dividen por el mismo factor. La SCR se divide por c<sup>2</sup>, igual que la suma total; por eso el R<sup>2</sup> y el F de exclusión quedan iguales. El desvío estándar residual también se divide por c. La escala cambia la unidad de medida, no la calidad del ajuste.'
        },
        {
          type: 'formula',
          main: 'X<sub>2</sub>/c &nbsp;→&nbsp; β̂<sub>2</sub>·c &nbsp;·&nbsp; ee(β̂<sub>2</sub>)·c &nbsp;·&nbsp; t y R<sup>2</sup> sin cambios',
          legend: [
            {
              key: 'Pendiente',
              text: 'Al reducir X, el coeficiente se multiplica por c para que el producto βX no cambie.'
            },
            {
              key: 'Intercepto',
              text: 'No se modifica si el cambio es de escala; sí cambia si a X se le suma una constante.'
            },
            {
              key: 't',
              text: 'Coeficiente y error estándar se multiplican por c; el cociente no cambia.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s02-p03',
          html: 'Sumar una constante no es cambiar la escala. Si se reemplaza X por X + c, la pendiente no cambia y el intercepto se desplaza en −βc. Si se reemplaza Y por Y + c, el intercepto sube en c y las pendientes no cambian. El TP 6, Ejercicio 1, trabaja las dos cosas a la vez: escalas (multiplicar) y traslaciones (sumar). Conviene distinguirlas porque solo las primeras afectan la magnitud de la pendiente.'
        },
        {
          type: 'p',
          id: 'c04a-s02-p04',
          html: 'En logaritmos la invariancia es todavía más fuerte. log(cY) = log c + log Y: multiplicar Y por c solo suma una constante al intercepto y deja todas las pendientes iguales. Dividir Y por c resta log c. Lo mismo ocurre si se cambia la unidad de una X expresada en logaritmos: log(cX) = log c + log X; el intercepto se ajusta y la pendiente no. Por eso las elasticidades no dependen de si se mide en pesos, miles o millones.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'El R² cambia cuando Y pasa de pesos a miles.',
              why: 'Tanto la SCR como la suma total se dividen por c²; el cociente no cambia.',
              fix: 'Reportá el mismo R² y aclará la unidad de Y.'
            },
            {
              error: 'Los t cambian porque los coeficientes cambiaron.',
              why: 'Coeficiente y error estándar se escalan igual; el cociente del contraste de cero queda igual.',
              fix: 'Compará t, no magnitudes absolutas, entre escalas.'
            },
            {
              error: 'Los residuos quedan iguales.',
              why: 'Los residuos están en unidades de Y; se dividen por c y la SCR por c².',
              fix: 'Si cambiás la escala, reescalá también σ̂ y la SCR.'
            },
            {
              error: 'En logaritmos, cambiar unidades cambia las pendientes.',
              why: 'El cambio de unidad se absorbe en el intercepto mediante log c.',
              fix: 'Usá la invariancia de la elasticidad para comparar modelos con distintas unidades.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-02',
          question: 'Si Y se mide en miles en lugar de pesos, ¿qué pasa con β̂₁, su t y el R²?',
          intro: 'Pensá qué se divide y qué se mantiene.',
          answer: 'β̂<sub>1</sub> y su error estándar se dividen por 1000; el t no cambia porque el cociente entre ambos se mantiene. El R<sup>2</sup> tampoco cambia: la SCR y la suma total se dividen por 1000<sup>2</sup>. El desvío residual se divide por 1000. La lectura económica es la misma, solo cambia la unidad en la que se expresa el efecto.'
        }
      ]
    },
    {
      id: 'c04a-s03',
      number: '03',
      title: 'Coeficientes beta estandarizados',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s03-p01',
          html: 'Comparar coeficientes en sus unidades originales es comparar peras con manzanas cuando las variables no comparten unidad. Un modelo puede tener el PBI per cápita en pesos, la tasa de alfabetización en puntos porcentuales y la mortalidad en defunciones por mil nacidos. ¿Cuál pesa más? El coeficiente más grande no es necesariamente el más importante: depende de la dispersión de cada variable. Los <span class="concept" data-concept="beta" tabindex="0" role="button">coeficientes beta</span> resuelven ese problema: llevan todo a desvíos estándar.'
        },
        {
          type: 'formula',
          main: 'z<sub>Y</sub> = b̂<sub>1</sub>z<sub>1</sub> + b̂<sub>2</sub>z<sub>2</sub> + e &nbsp;·&nbsp; b̂<sub>j</sub> = β̂<sub>j</sub> · σ̂<sub>j</sub>/σ̂<sub>Y</sub>',
          legend: [
            {
              key: 'z',
              text: 'Variable estandarizada: (X − media)/desvío estándar muestral.'
            },
            {
              key: 'b',
              text: 'Coeficiente estandarizado. Mide desvíos estándar de Y por desvío estándar de X.'
            },
            {
              key: 'e',
              text: 'Error de la regresión estandarizada; no hay intercepto porque las variables tienen media cero.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s03-p02',
          html: 'Estandarizar es restar la media y dividir por el desvío estándar. Al hacerlo, todas las variables quedan sin unidad y con media cero. El modelo estimado no tiene intercepto y cada coeficiente se lee en desvíos estándar: si b̂<sub>j</sub> = 0,4, un desvío estándar más de X<sub>j</sub> se asocia con 0,4 desvíos estándar más de Y, manteniendo las demás variables constantes. La significancia no cambia: el t del modelo estandarizado es el mismo que el del modelo original.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: '&lt; 0,3',
              title: 'Efecto pequeño',
              text: 'Un desvío estándar de X se asocia con menos de 0,3 desvíos estándar de Y. Es una convención, no una prueba.'
            },
            {
              sym: '0,3 a 0,7',
              title: 'Efecto moderado',
              text: 'La asociación es visible, pero no domina la variación de Y.'
            },
            {
              sym: '&gt; 0,7',
              title: 'Efecto grande',
              text: 'Un desvío de X se asocia con más de 0,7 desvíos de Y. La etiqueta depende del contexto.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s03-p03',
          html: 'Ejemplo numérico ilustrativo, no una estimación. Supongamos que en un modelo de mortalidad infantil el coeficiente del PBI per cápita es −0,8 y el de alfabetización femenina es −0,5. Si σ<sub>PBI</sub>/σ<sub>MI</sub> = 0,25, el beta del PBI es −0,20; si σ<sub>alf</sub>/σ<sub>MI</sub> = 1,4, el beta de alfabetización es −0,70. En unidades originales el PBI parece más importante; en desvíos estándar, la alfabetización pesa más. La comparación cambió porque las variables tienen dispersiones muy distintas.'
        },
        {
          type: 'callout',
          variant: 'ochre',
          label: 'Beta no es causalidad ni importancia absoluta',
          html: 'El coeficiente beta depende de la variabilidad de la muestra: una variable con mucha dispersión puede tener un beta grande aunque su efecto por unidad sea pequeño. Tampoco corrige variables omitidas ni endogeneidad. Sirve para comparar asociaciones relativas dentro de la misma muestra y con el mismo conjunto de regresores, no para ordenar políticas entre poblaciones distintas.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'Un beta de 0,8 significa que X causa 0,8 desvíos de Y.',
              why: 'Beta es una asociación condicional, no un efecto causal.',
              fix: 'Hablá de asociación y agregá el diseño que haría falta para causalidad.'
            },
            {
              error: 'Se pueden comparar betas de muestras distintas.',
              why: 'Dependen de los desvíos estándar de cada muestra.',
              fix: 'Compará betas solo dentro del mismo modelo y la misma muestra.'
            },
            {
              error: 'Un beta más grande siempre implica un t más grande.',
              why: 'El t depende de la precisión; beta depende de la dispersión.',
              fix: 'Mirá beta para magnitud relativa y t para evidencia estadística.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-03',
          question: 'Dos variables tienen beta 0,4. ¿Tienen el mismo t?',
          intro: 'Pensá qué información agrega el error estándar.',
          answer: 'No necesariamente. Beta mide la magnitud en desvíos estándar, pero el t es b̂ dividido por su error estándar. Dos variables pueden tener la misma magnitud estandarizada y distinta precisión, por ejemplo si una está muy correlacionada con las demás. Beta no contiene información sobre la precisión de la estimación; para eso hay que mirar el error estándar y el t.'
        },
        {
          type: 'p',
          id: 'c04a-s03-p04',
          html: '¿Cuándo conviene reportarlos? Cuando las unidades no son comparables y se quiere comparar la magnitud relativa de dos asociaciones. También cuando un lector tiene que entender qué variable pesa más en la variación observada. No reemplazan al coeficiente original: para una política o una predicción se necesita el efecto en unidades. Si el texto lo permite, reportá ambos: el coeficiente en unidades para la magnitud y el beta para la comparación relativa.'
        }
      ]
    },
    {
      id: 'c04a-s04',
      number: '04',
      title: 'Modelos intrínsecamente lineales y la familia log',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s04-p01',
          html: 'MCO no exige que la relación sea una recta. Exige que sea lineal en los parámetros. Un modelo con logaritmos, cuadrados o interacciones puede estimarse por MCO si cada coeficiente multiplica a un regresor de forma aditiva. Esos son los <span class="concept" data-concept="intrinsecamente-lineales" tabindex="0" role="button">modelos intrínsecamente lineales</span>. La transformación cambia la forma de la curva y, sobre todo, la interpretación del coeficiente.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'lin-lin',
              title: 'Niveles',
              text: 'Y = β₀ + β₁X. Cada unidad de X cambia Y en β₁ unidades.'
            },
            {
              sym: 'log-log',
              title: 'Elasticidad',
              text: 'log Y = β₀ + β₁log X. Cada 1% de X cambia Y en β₁%.'
            },
            {
              sym: 'log-lin',
              title: 'Semi-elasticidad',
              text: 'log Y = β₀ + β₁X. Cada unidad de X cambia Y en aproximadamente 100β₁%.'
            },
            {
              sym: 'lin-log',
              title: 'Cambio en niveles',
              text: 'Y = β₀ + β₁log X. Cada 1% de X cambia Y en aproximadamente β₁/100 unidades.'
            }
          ]
        },
        {
          type: 'formula',
          main: 'log Y = β<sub>0</sub> + β<sub>1</sub> log X + u &nbsp;→&nbsp; β<sub>1</sub> = Δ%Y / Δ%X',
          legend: [
            {
              key: 'Elasticidad',
              text: 'Cambio porcentual de Y ante un cambio porcentual de X.'
            },
            {
              key: 'Constante',
              text: 'En log-log, β₁ es la misma elasticidad en todo el rango.'
            },
            {
              key: 'Ejemplo',
              text: 'β₁ = 0,6: 1% más de X se asocia con 0,6% más de Y.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s04-p02',
          html: 'En un <span class="concept" data-concept="log-log" tabindex="0" role="button">modelo log-log</span>, la elasticidad no depende de las unidades ni del nivel de X. Si β̂<sub>1</sub> = 0,6, un 10% más de X se asocia con aproximadamente 6% más de Y; el valor exacto es 100[(1,10)<sup>0,6</sup> − 1] ≈ 5,9%. La aproximación es buena porque el cambio es moderado. Si X pasa de pesos a miles, β̂<sub>1</sub> no se mueve: el logaritmo absorbe la unidad en el intercepto.'
        },
        {
          type: 'formula',
          main: 'log Y = β<sub>0</sub> + β<sub>1</sub>X + u &nbsp;→&nbsp; Δ%Y ≈ 100·β<sub>1</sub>·ΔX<br>Y = β<sub>0</sub> + β<sub>1</sub>log X + u &nbsp;→&nbsp; ΔY ≈ (β<sub>1</sub>/100)·Δ%X',
          legend: [
            {
              key: 'Semi-elasticidad',
              text: 'log-lin: cambio porcentual de Y por unidad de X.'
            },
            {
              key: 'Lin-log',
              text: 'Cambio en unidades de Y por 1% de X.'
            },
            {
              key: 'Signo',
              text: 'β₁ positivo: aumento; negativo: disminución.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s04-p03',
          html: 'Dos ejemplos para fijar la diferencia. En un <span class="concept" data-concept="log-lin" tabindex="0" role="button">modelo log-lin</span> con β̂<sub>1</sub> = 0,12, una unidad más de X se asocia con 12% más de Y en la aproximación; el <span class="concept" data-concept="cambio-exacto" tabindex="0" role="button">cambio porcentual exacto</span> es 12,75%. En un <span class="concept" data-concept="lin-log" tabindex="0" role="button">modelo lin-log</span> con β̂<sub>1</sub> = 12, un 1% más de X se asocia con 0,12 unidades más de Y. El primero se lee en porcentaje; el segundo, en unidades de Y. Confundirlos es el error más común de esta clase.'
        },
        {
          type: 'formula',
          main: 'Δ%Y = 100[exp(β̂<sub>1</sub>ΔX) − 1]',
          legend: [
            {
              key: 'Cuándo',
              text: 'Cuando el cambio en log Y es grande y la aproximación lineal deja de ser precisa.'
            },
            {
              key: 'ΔX',
              text: 'Cambio en X. Para una unidad, ΔX = 1.'
            },
            {
              key: 'Propiedad',
              text: 'Es consistente, pero no insesgado: la exponencial es una función no lineal.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'log es logaritmo natural',
          html: 'En econometría, log significa ln. R usa log() para el logaritmo natural. Si usás log10, cambia la escala de los coeficientes; la elasticidad log-log se mantiene si transformás ambos lados, pero la semi-elasticidad no. No mezcles bases. Y recordá: no se puede tomar log de cero ni de negativos; si hay ceros, log(1 + X) cambia la interpretación y no es una solución automática.'
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-04',
          question: 'En log-lin, β̂₁ = 0,08. ¿Cómo interpretás el efecto de una unidad más de X?',
          intro: 'Distinguí la aproximación del cambio exacto.',
          answer: 'La aproximación dice que una unidad más de X se asocia con 8% más de Y, porque 100 × 0,08 = 8. El cambio exacto es 100[exp(0,08) − 1] = 8,33%. No es 0,08%: el coeficiente está en escala logarítmica y se traduce a porcentaje multiplicando por 100. Para cambios pequeños la diferencia es chica, pero conviene decir cuál de las dos fórmulas usaste.'
        }
      ]
    },
    {
      id: 'c04a-s05',
      number: '05',
      title: 'Cobb-Douglas: elasticidades y rendimientos a escala',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s05-p01',
          html: 'Una función de producción Cobb-Douglas es el ejemplo clásico de modelo intrínsecamente lineal. En niveles, el producto es una potencia de los insumos y de un factor de eficiencia; en logaritmos, se vuelve una regresión lineal múltiple. Esa transformación no es un truco estadístico: es la forma de estimar elasticidades de producción con MCO.'
        },
        {
          type: 'formula',
          main: 'Q = A X<sub>1</sub><sup>β1</sup> X<sub>2</sub><sup>β2</sup> X<sub>3</sub><sup>β3</sup> v &nbsp;→&nbsp; log Q = β<sub>0</sub> + β<sub>1</sub>log X<sub>1</sub> + β<sub>2</sub>log X<sub>2</sub> + β<sub>3</sub>log X<sub>3</sub> + u',
          legend: [
            {
              key: 'β<sub>0</sub>',
              text: 'log A: parámetro de eficiencia tecnológica.'
            },
            {
              key: 'β<sub>j</sub>',
              text: 'Elasticidades del producto respecto de cada insumo.'
            },
            {
              key: 'u',
              text: 'log v: el error multiplicativo se vuelve aditivo en logaritmos.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s05-p02',
          html: 'Cada β<sub>j</sub> es una elasticidad: si el trabajo aumenta 1%, el producto aumenta β<sub>1</sub>% en promedio, manteniendo los otros insumos constantes. El producto marginal no es constante: ∂Q/∂X<sub>1</sub> = β<sub>1</sub>Q/X<sub>1</sub>. Si 0 &lt; β<sub>1</sub> &lt; 1, el producto marginal es positivo y decreciente, que es la propiedad económica que se espera de un insumo. La elasticidad constante y el producto marginal decreciente conviven sin contradicción.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Elasticidad',
              title: 'Lectura de cada β',
              text: 'Un 1% más de un insumo se asocia con βⱼ% más de producto, ceteris paribus.'
            },
            {
              sym: 'Rendimientos',
              title: 'La suma',
              text: 'r = β₁ + β₂ + β₃. Si se escalan todos los insumos por λ, el producto se escala por λ<sup>r</sup>.'
            },
            {
              sym: 'Eficiencia',
              title: 'El intercepto',
              text: 'A, o exp(β₀), recoge diferencias no observadas de eficiencia entre empresas.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s05-p03',
          html: 'Los rendimientos a escala describen qué pasa cuando se multiplican todos los insumos por la misma constante λ &gt; 1. Con Q = A X<sub>1</sub><sup>β1</sup>X<sub>2</sub><sup>β2</sup>X<sub>3</sub><sup>β3</sup>v, el producto pasa a λ<sup>r</sup>Q, con r = β<sub>1</sub> + β<sub>2</sub> + β<sub>3</sub>. Si r = 1, hay rendimientos constantes: duplicar todos los insumos duplica el producto. Si r &gt; 1, son crecientes; si r &lt; 1, decrecientes. La suma es una hipótesis económica, no un resultado automático de la estimación.'
        },
        {
          type: 'p',
          id: 'c04a-s05-p04',
          html: 'Para contrastar rendimientos constantes se plantea H<sub>0</sub>: β<sub>1</sub> + β<sub>2</sub> + β<sub>3</sub> = 1. Hay dos caminos equivalentes. Uno es un contraste F de una restricción lineal, como el que hace linearHypothesis en R. El otro es reparametrizar el modelo para que la suma sea un coeficiente. Con dos insumos, si θ = β<sub>1</sub> + β<sub>2</sub>, entonces β<sub>1</sub> = θ − β<sub>2</sub> y el modelo queda log Q = β<sub>0</sub> + θ log X<sub>1</sub> + β<sub>2</sub>log(X<sub>2</sub>/X<sub>1</sub>) + u. El coeficiente θ̂ y su error estándar permiten contrastar θ = 1 con un t calculado como (θ̂ − 1)/ee(θ̂), o con un F equivalente. Con tres insumos, el análogo es log Q = β<sub>0</sub> + θ log X<sub>1</sub> + β<sub>2</sub>log(X<sub>2</sub>/X<sub>1</sub>) + β<sub>3</sub>log(X<sub>3</sub>/X<sub>1</sub>) + u.'
        },
        {
          type: 'p',
          id: 'c04a-s05-p05',
          html: 'En el laboratorio de esta clase, con PRODUCCION1, la suma estimada es 0,9096. El contraste de la restricción β<sub>1</sub> + β<sub>2</sub> + β<sub>3</sub> = 1 da F(1, 81) = 0,201, p = 0,655: no se rechaza la hipótesis de rendimientos constantes. El intervalo al 95% para la suma es [0,508; 1,311], que también contiene a 1. Al mismo tiempo, el contraste conjunto de que cada elasticidad sea igual a 1 da F(3, 81) = 39,605, p &lt; 0,001: se rechaza. Las dos conclusiones conviven. Que la suma pueda ser 1 no implica que cada coeficiente sea 1; el laboratorio lo muestra con datos reales.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'La suma 0,91 prueba rendimientos decrecientes.',
              why: 'Es un punto estimado; hay que contrastar la hipótesis y mirar el intervalo.',
              fix: 'Planteá H₀: r = 1. No rechazar no prueba igualdad, pero tampoco permite afirmar r &lt; 1.'
            },
            {
              error: 'Un R² de 0,22 significa que el modelo es malo.',
              why: 'El R² mide la proporción de variación de log Q; la muestra puede ser muy homogénea.',
              fix: 'Mirá errores estándar, significancia, intervalos y relevancia económica.'
            },
            {
              error: 'Las elasticidades son productos marginales.',
              why: 'La elasticidad es un cambio porcentual; el producto marginal es un cambio en unidades.',
              fix: 'PMg = βⱼ Q/Xⱼ. La elasticidad es βⱼ.'
            },
            {
              error: 'Rendimientos constantes implica βⱼ = 1 en cada insumo.',
              why: 'La suma puede ser 1 con elasticidades muy distintas.',
              fix: 'Contrastá la suma y, por separado, cada igualdad individual.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-05',
          question: 'Si no rechazás β₁ + β₂ + β₃ = 1, ¿podés concluir que cada βⱼ es igual a 1?',
          intro: 'Pensá en una suma que da 1 con componentes distintos.',
          answer: 'No. La hipótesis de rendimientos constantes es sobre la suma, no sobre cada coeficiente. Por ejemplo, 0,5 + 0,3 + 0,2 = 1 y ninguna elasticidad es 1. En el laboratorio, la suma no se rechaza, pero el contraste conjunto de β₁ = β₂ = β₃ = 1 se rechaza con F = 39,605. Son dos hipótesis distintas y pueden dar conclusiones distintas.'
        }
      ]
    },
    {
      id: 'c04a-s06',
      number: '06',
      title: 'Funciones cuadráticas: efectos marginales que cambian',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s06-p01',
          html: 'El gerente de personal de una empresa observa que los vendedores mejoran con la experiencia, pero que los más antiguos pierden iniciativa. Un modelo lineal no puede captar ese patrón: impone un efecto constante. Una <span class="concept" data-concept="cuadraticas" tabindex="0" role="button">función cuadrática</span> permite que la función suba al principio y baje después, o al revés. Es la forma más simple de modelar una relación con un punto de giro.'
        },
        {
          type: 'formula',
          main: 'Y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sup>2</sup> + u &nbsp;·&nbsp; ∂Ŷ/∂X = β̂<sub>1</sub> + 2β̂<sub>2</sub>X &nbsp;·&nbsp; ΔŶ ≈ (β̂<sub>1</sub> + 2β̂<sub>2</sub>X)ΔX',
          legend: [
            {
              key: 'β<sub>1</sub>',
              text: 'Pendiente cuando X = 0. No es el efecto constante de X.'
            },
            {
              key: 'β<sub>2</sub>',
              text: 'Curvatura. Su signo decide si la parábola abre hacia arriba o hacia abajo.'
            },
            {
              key: 'Efecto marginal',
              text: 'Cambia con X: hay que evaluarlo en un valor concreto.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s06-p02',
          html: 'El coeficiente β<sub>1</sub> solo no mide el efecto de X. Mide la pendiente en X = 0, un punto que muchas veces está fuera del rango observado o no tiene sentido económico. Para saber qué pasa en X = 5 hay que calcular β̂<sub>1</sub> + 2β̂<sub>2</sub>·5. Por eso, en una cuadrática, la interpretación siempre se hace en un valor de X: “un año más de experiencia, partiendo de 5 años, se asocia con…”.'
        },
        {
          type: 'cards',
          items: [
            {
              sym: 'Máximo',
              title: 'β₁ &gt; 0, β₂ &lt; 0',
              text: 'La función sube y luego baja. El vértice X* es un máximo.'
            },
            {
              sym: 'Mínimo',
              title: 'β₁ &lt; 0, β₂ &gt; 0',
              text: 'La función baja y luego sube. El vértice X* es un mínimo.'
            },
            {
              sym: 'Esquina',
              title: 'Mismos signos',
              text: 'Si X solo toma valores no negativos, el extremo relevante está en X = 0: mínimo si ambos son positivos, máximo si ambos son negativos.'
            }
          ]
        },
        {
          type: 'formula',
          main: 'X* = −β̂<sub>1</sub> / (2β̂<sub>2</sub>)',
          legend: [
            {
              key: 'Máximo',
              text: 'Con β̂₁ &gt; 0 y β̂₂ &lt; 0, X* es el valor de X que maximiza Y.'
            },
            {
              key: 'Mínimo',
              text: 'Con β̂₁ &lt; 0 y β̂₂ &gt; 0, X* es el valor que minimiza Y.'
            },
            {
              key: 'Rango',
              text: 'El punto de giro solo es interpretable si cae dentro de los valores observados de X.'
            }
          ]
        },
        {
          type: 'assumptions',
          rows: [
            {
              title: 'β₁ &gt; 0 y β₂ &lt; 0',
              text: 'Parábola invertida: máximo en X*. El efecto marginal es positivo antes de X* y negativo después.'
            },
            {
              title: 'β₁ &lt; 0 y β₂ &gt; 0',
              text: 'Parábola en U: mínimo en X*. El efecto marginal es negativo antes de X* y positivo después.'
            },
            {
              title: 'β₁ &gt; 0 y β₂ &gt; 0',
              text: 'Si X ≥ 0, la función es creciente y cada vez con más pendiente; el mínimo relevante está en X = 0.'
            },
            {
              title: 'β₁ &lt; 0 y β₂ &lt; 0',
              text: 'Si X ≥ 0, la función es decreciente y cada vez con pendiente más negativa; el máximo relevante está en X = 0.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s06-p03',
          html: 'Ejemplo numérico ilustrativo. Si β̂<sub>1</sub> = 10 y β̂<sub>2</sub> = −0,5, el punto de giro es X* = −10/(2·−0,5) = 10. El efecto marginal en X = 4 es 10 + 2(−0,5)·4 = 6; en X = 12 es 10 − 12 = −2; en X = 10 es cero. La variable mejora el resultado hasta 10 y lo empeora después. Si la muestra solo va de 0 a 6, el máximo es una extrapolación: la parábola sugiere un patrón que los datos no observaron.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'β₁ es el efecto de X.',
              why: 'En una cuadrática, el efecto marginal es β₁ + 2β₂X y cambia con X.',
              fix: 'Elegí un valor de X y calculá el efecto marginal ahí.'
            },
            {
              error: 'El punto de giro siempre está dentro de la muestra.',
              why: 'X* puede caer fuera del rango observado y ser una extrapolación.',
              fix: 'Compará X* con el mínimo y el máximo de X antes de interpretarlo.'
            },
            {
              error: 'Si β₂ es significativo, la relación es una U.',
              why: 'β₂ detecta curvatura; la forma depende de los signos de β₁ y β₂ y del rango.',
              fix: 'Mirá ambos signos, el vértice y el tramo de X relevante.'
            },
            {
              error: 'La cuadrática capta cualquier no linealidad.',
              why: 'Impone una parábola simétrica; no representa saturación asimétrica ni cambios abruptos.',
              fix: 'Considerá logaritmos, interacciones u otras formas si la teoría lo sugiere.'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-06',
          question: 'Con β̂₁ = 10 y β̂₂ = −0,5, ¿cuál es el efecto marginal en X = 4 y en X = 12? ¿Dónde está el máximo?',
          intro: 'Derivá y evaluá; no uses β₁ como si fuera constante.',
          answer: 'El efecto marginal es 10 + 2(−0,5)X = 10 − X. En X = 4 es 6; en X = 12 es −2. El máximo está en X* = −10/(2·−0,5) = 10. La interpretación correcta es que cada unidad adicional de X se asocia con 6 unidades más de Y cuando se parte de 4, pero con 2 unidades menos cuando se parte de 12. Decir que el efecto es 10 en todo el rango es el error típico.'
        }
      ]
    },
    {
      id: 'c04a-s07',
      number: '07',
      title: 'Mapa de decisión de la forma funcional',
      blocks: [
        {
          type: 'p',
          id: 'c04a-s07-p01',
          html: 'No hay una forma funcional universalmente correcta. Hay una forma coherente con la pregunta, los datos y la teoría. El mapa de esta sección ordena la decisión y evita dos extremos: elegir por costumbre y elegir mirando solamente el R<sup>2</sup>. La forma se elige antes de estimar, se interpreta después de estimar y se diagnostica con contrastes.'
        },
        {
          type: 'map',
          steps: [
            {
              n: '1',
              title: 'Pregunta económica',
              text: '¿Hablo de unidades o de porcentajes? ¿Espero un efecto constante, saturación o un cambio de signo?'
            },
            {
              n: '2',
              title: 'Rango y positividad',
              text: '¿Y y X son positivas? ¿Hay ceros? ¿Hay atípicos? ¿El rango permite un punto de giro?'
            },
            {
              n: '3',
              title: 'Forma candidata',
              text: 'Niveles, log-log, log-lin, lin-log o cuadrática. Escribí la interpretación de cada coeficiente antes de estimar.'
            },
            {
              n: '4',
              title: 'Estimación y lectura',
              text: 'Coeficientes, errores estándar, t e intervalos. Traducí cada uno a una frase económica.'
            },
            {
              n: '5',
              title: 'Diagnóstico',
              text: 'Términos cuadráticos y comparación de formas. RESET y la selección formal se desarrollan en 04B.'
            },
            {
              n: '6',
              title: 'Reporte',
              text: 'Aclará transformación, unidades, n, R² comparable solo con la misma Y y límites causales.'
            }
          ]
        },
        {
          type: 'p',
          id: 'c04a-s07-p02',
          html: 'Tres tentaciones frecuentes. La primera es elegir el modelo con R<sup>2</sup> más alto: si la Y cambió de transformación (niveles, logaritmos u otra forma no lineal), el R<sup>2</sup> no es comparable. La segunda es probar transformaciones hasta que algo resulte significativo: eso es data mining y infla los falsos positivos. La tercera es extrapolar: un punto de giro fuera del rango observado, o una elasticidad constante aplicada a cambios enormes, son afirmaciones que los datos no sostienen.'
        },
        {
          type: 'errorTable',
          rows: [
            {
              error: 'El modelo con R² más alto es el mejor.',
              why: 'Con distintas transformaciones de Y, el R² no es comparable; además, agregar términos siempre puede subirlo.',
              fix: 'Compará R² solo con la misma Y y usá teoría, diagnóstico y relevancia económica.'
            },
            {
              error: 'Los logaritmos siempre mejoran el ajuste.',
              why: 'No se puede tomar log de cero o de negativos, y la interpretación cambia.',
              fix: 'Verificá positividad y preguntate si la pregunta es porcentual o en niveles.'
            },
            {
              error: 'Un beta grande prueba importancia causal.',
              why: 'Beta mide asociación relativa y depende de la dispersión muestral.',
              fix: 'Separá magnitud relativa, significancia y diseño causal.'
            },
            {
              error: 'No rechazar r = 1 prueba que r = 1.',
              why: 'No rechazar solo indica que los datos no aportan evidencia suficiente contra esa hipótesis.',
              fix: 'Reportá el intervalo y evitá convertir una no decisión en una afirmación.'
            },
            {
              error: 'La cuadrática siempre encuentra un punto de giro útil.',
              why: 'El vértice puede estar fuera del rango o carecer de sentido económico.',
              fix: 'Comprobá los signos, el rango y la teoría antes de interpretar X*.'
            }
          ]
        },
        {
          type: 'callout',
          variant: 'teal',
          label: 'Lo que queda para 04B',
          html: 'Esta clase dejó la caja de herramientas para escribir y leer formas funcionales. La clase 04B usa esa caja para elegir entre modelos: AIC y BIC, prueba RESET, sesgos por sobre y sub-especificación, y predicción promedio versus individual. Acá no se desarrollan esos contrastes; solo se anticipa que la forma funcional se diagnostica, no se decide por intuición.'
        },
        {
          type: 'sourceStrip',
          chips: [
            {
              label: 'Clase 4',
              text: 'diap. 3–19'
            },
            {
              label: 'Wooldridge 4ed',
              text: 'Cap. 6, §6.1–6.2'
            },
            {
              label: 'TP 6',
              text: 'act. 1; ej. 1–2, 4, 6–8'
            },
            {
              label: 'Parcial',
              text: '1P 2024'
            }
          ]
        },
        {
          type: 'miniCheck',
          id: 'c04a-check-07',
          question: 'Un modelo en niveles tiene R² = 0,85 y otro en logaritmos, R² = 0,22. ¿Elegís el primero por el R²?',
          intro: 'Pensá qué mide el R² cuando cambia la variable dependiente.',
          answer: 'No. Los R² no son comparables porque la variable dependiente es distinta: uno explica variación de Y en niveles y el otro, variación de log Y. El R² de 0,22 puede convivir con coeficientes precisos y una muestra homogénea. La elección depende de la pregunta económica, de la teoría, de la interpretación y del diagnóstico, no de comparar números de escalas distintas.'
        }
      ]
    }
  ],
  concepts: {
    'cambios-escala': {
      title: 'Cambios de escala',
      sub: 'Multiplicar una variable por una constante cambia los coeficientes, no la evidencia.',
      esencia: `
        <div class="definition">Cambiar la escala de Y o de una X multiplica los coeficientes y sus errores estándar por un factor, pero deja invariantes los estadísticos t, F y el R<sup>2</sup>.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Si Y se divide por c, todos los coeficientes de nivel y sus errores estándar se dividen por c; los residuos también, y la SCR por c<sup>2</sup>.</li>
          <li>Si una X se divide por c, su coeficiente y su error estándar se multiplican por c; el intercepto no cambia.</li>
          <li>En logaritmos, cambiar unidades solo desplaza el intercepto: las pendientes y las elasticidades no cambian.</li>
        </ul>
        <div class="formula small">Ŷ/c = β̂<sub>0</sub>/c + (β̂<sub>1</sub>/c)X<sub>1</sub> + …<span>t, F y R<sup>2</sup> invariantes</span></div>
        <div class="badge-row"><span class="badge always">Siempre: qué se divide y qué se mantiene</span><span class="badge optional">Según el concepto: escala en Y, en X o en logs</span></div>
      `,
      ejemplo: `
        <p>Si el gasto en alimentos se mide en pesos y se pasa a miles, el coeficiente del ingreso se divide por 1000 y su error estándar también. El t sigue siendo el mismo y el R<sup>2</sup> no se mueve. La frase económica cambia de unidad, no de sentido.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de comparar coeficientes entre modelos, verificá que las variables estén en la misma unidad. Un coeficiente 1000 veces mayor puede ser solo una unidad distinta.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que el R<sup>2</sup> cambia al cambiar unidades.</strong> La SCR y la suma total se escalan por el mismo factor al cuadrado.</li>
          <li><strong>Comparar coeficientes de modelos con escalas distintas.</strong> El número más grande puede reflejar una unidad más chica, no un efecto más fuerte.</li>
          <li><strong>Pensar que en logaritmos cambiar unidades altera la elasticidad.</strong> El cambio se absorbe en el intercepto mediante log c.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés decir qué se divide y qué se mantiene al pasar de pesos a miles.</p></div>
      `,
      conexiones: `<p>La invariancia de la escala es la base para comparar modelos y para entender los coeficientes estandarizados. También explica por qué las elasticidades no dependen de las unidades.</p>
        <div><button class="concept-chip" data-concept="beta">Coeficientes beta →</button><button class="concept-chip" data-concept="log-log">Log-log →</button><button class="concept-chip" data-concept="cuadraticas">Cuadráticas →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 4–6.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.1.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ejercicios 1 y 2.</p></div>
      `
    },
    beta: {
      title: 'Coeficientes beta',
      sub: 'La magnitud relativa, medida en desvíos estándar.',
      esencia: `
        <div class="definition">Los coeficientes beta son los coeficientes de una regresión con Y y las X estandarizadas: b̂<sub>j</sub> = β̂<sub>j</sub>σ̂<sub>j</sub>/σ̂<sub>Y</sub>. Miden cuántos desvíos estándar cambia Y por un desvío estándar de X<sub>j</sub>, ceteris paribus.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>Estandarizar es restar la media y dividir por el desvío estándar muestral.</li>
          <li>El modelo estandarizado no tiene intercepto porque todas las variables tienen media cero.</li>
          <li>Permiten comparar variables con unidades distintas, pero dependen de la dispersión de la muestra.</li>
        </ul>
        <div class="formula small">b̂<sub>j</sub> = β̂<sub>j</sub> · σ̂<sub>j</sub>/σ̂<sub>Y</sub><span>Desvíos estándar de Y por desvío estándar de X<sub>j</sub></span></div>
        <div class="badge-row"><span class="badge always">Siempre: fórmula e interpretación</span><span class="badge optional">Según el concepto: regla 0,3 / 0,7</span></div>
      `,
      ejemplo: `
        <p>Dos regresores con coeficientes 0,02 y 0,8 pueden tener betas 0,40 y 0,20 si el primero tiene mucha más dispersión. En unidades originales el segundo parece 40 veces mayor; en desvíos estándar, el primero pesa más. La comparación cambió porque las escalas no eran comparables.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá betas cuando quieras ordenar magnitudes relativas y coeficientes originales cuando necesites el efecto en unidades. No son sustitutos.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer beta como efecto causal.</strong> Es una asociación condicional, igual que el coeficiente original.</li>
          <li><strong>Comparar betas entre muestras.</strong> Dependen de los desvíos estándar de cada muestra y de las variables incluidas.</li>
          <li><strong>Creer que beta mide precisión.</strong> El t depende del error estándar; beta solo de la magnitud y la dispersión.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué un coeficiente pequeño puede tener un beta grande.</p></div>
      `,
      conexiones: `<p>Los beta son una aplicación directa de los cambios de escala: estandarizar es escalar por el desvío estándar. También se usan para comparar la magnitud relativa de regresores en modelos con logaritmos o cuadráticas.</p>
        <div><button class="concept-chip" data-concept="cambios-escala">Cambios de escala →</button><button class="concept-chip" data-concept="intrinsecamente-lineales">Intrínsecamente lineales →</button><button class="concept-chip" data-concept="cuadraticas">Cuadráticas →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 7–8.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.1.</p></div>
        <div class="source-mini"><span class="source-type exam">Parcial</span><p>1P 2024: modelo con variables estandarizadas e interpretación de un coeficiente.</p></div>
      `
    },
    'intrinsecamente-lineales': {
      title: 'Modelos intrínsecamente lineales',
      sub: 'No lineales en las variables, lineales en los parámetros.',
      esencia: `
        <div class="definition">Un modelo es intrínsecamente lineal si, aun con logaritmos, cuadrados o interacciones, puede escribirse como una combinación lineal de parámetros. MCO estima esos modelos sin problema.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La linealidad relevante es en los β, no en las X.</li>
          <li>Logaritmos, cuadráticas e interacciones son transformaciones admitidas.</li>
          <li>La interpretación cambia con la transformación; la estimación no.</li>
        </ul>
        <div class="formula small">Y = β<sub>0</sub> + β<sub>1</sub>log X + β<sub>2</sub>X<sup>2</sup> + u<span>Lineal en β; no en X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: linealidad en parámetros</span><span class="badge optional">Según el concepto: qué transformación usar</span></div>
      `,
      ejemplo: `
        <p>La función Cobb-Douglas Q = A L<sup>β1</sup>K<sup>β2</sup>v se linealiza con logaritmos: log Q = β<sub>0</sub> + β<sub>1</sub>log L + β<sub>2</sub>log K + u. MCO estima β<sub>0</sub>, β<sub>1</sub> y β<sub>2</sub>; A se recupera como exp(β̂<sub>0</sub>) bajo los supuestos del modelo.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Antes de decir que un modelo no se puede estimar por MCO, preguntate si es lineal en los parámetros. La respuesta no depende de que la curva sea recta.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Creer que MCO solo estima rectas.</strong> Estima cualquier modelo lineal en los parámetros.</li>
          <li><strong>Pensar que log(X) rompe la linealidad.</strong> El regresor es log X; el coeficiente sigue entrando linealmente.</li>
          <li><strong>Olvidar que la interpretación de β cambia.</strong> La misma estimación puede leerse en unidades, porcentajes o elasticidades.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés distinguir lineal en variables de lineal en parámetros.</p></div>
      `,
      conexiones: `<p>Los modelos intrínsecamente lineales son la puerta de entrada a la familia log y a las cuadráticas. La transformación no cambia el método de estimación, pero sí la pregunta y la lectura.</p>
        <div><button class="concept-chip" data-concept="log-log">Log-log →</button><button class="concept-chip" data-concept="log-lin">Log-lin →</button><button class="concept-chip" data-concept="lin-log">Lin-log →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 9–11.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Actividad 1c.</p></div>
      `
    },
    'log-log': {
      title: 'Modelo log-log',
      sub: 'Elasticidad constante.',
      esencia: `
        <div class="definition">log Y = β<sub>0</sub> + β<sub>1</sub>log X + u. β<sub>1</sub> es la elasticidad de Y respecto de X: el cambio porcentual de Y ante un cambio de 1% en X.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>β<sub>1</sub> no tiene unidades: es un cociente de porcentajes.</li>
          <li>La elasticidad es constante en todo el rango.</li>
          <li>Si β<sub>1</sub> = 0,6, 1% más de X se asocia con 0,6% más de Y.</li>
        </ul>
        <div class="formula small">log Y = β<sub>0</sub> + β<sub>1</sub>log X + u<span>β<sub>1</sub> = Δ%Y / Δ%X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: elasticidad e interpretación</span><span class="badge optional">Según el concepto: cambios porcentuales grandes</span></div>
      `,
      ejemplo: `
        <p>En una función Cobb-Douglas, las elasticidades del trabajo y del capital son los β. Si β<sub>L</sub> = 0,3, un 10% más de trabajo se asocia con aproximadamente 3% más de producto; el valor exacto es 100[(1,10)<sup>0,3</sup> − 1] ≈ 2,9%.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La elasticidad no cambia si X se mide en pesos, miles o millones. Esa invariancia es una de las razones para usar log-log.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Interpretar β<sub>1</sub> como unidades de Y.</strong> Es un cambio porcentual, no un cambio en unidades.</li>
          <li><strong>Decir que un 1% más de X cambia Y en β<sub>1</sub> unidades.</strong> Cambia β<sub>1</sub> por ciento.</li>
          <li><strong>Comparar el R<sup>2</sup> de log-log con el de niveles.</strong> La variable dependiente es distinta; no son comparables.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué la elasticidad no depende de las unidades.</p></div>
      `,
      conexiones: `<p>El log-log es el modelo de elasticidad constante y la forma natural de una Cobb-Douglas. Se diferencia del log-lin y del lin-log por qué lado está el logaritmo y por cómo se lee el coeficiente.</p>
        <div><button class="concept-chip" data-concept="log-lin">Log-lin →</button><button class="concept-chip" data-concept="lin-log">Lin-log →</button><button class="concept-chip" data-concept="cambio-exacto">Cambio exacto →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 12–14.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ejercicios 6 y 8.</p></div>
      `
    },
    'log-lin': {
      title: 'Modelo log-lin',
      sub: 'Semi-elasticidad: porcentaje por unidad.',
      esencia: `
        <div class="definition">log Y = β<sub>0</sub> + β<sub>1</sub>X + u. Un cambio de una unidad en X se asocia con aproximadamente 100β<sub>1</sub>% de cambio en Y. β<sub>1</sub> es una semi-elasticidad.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>El efecto se lee en porcentaje, no en unidades de Y.</li>
          <li>La aproximación es buena para β<sub>1</sub> pequeño; para β<sub>1</sub> grande se usa 100[exp(β<sub>1</sub>) − 1].</li>
          <li>Si β<sub>1</sub> = 0,12, una unidad más de X se asocia con 12% más de Y; el exacto es 12,75%.</li>
        </ul>
        <div class="formula small">log Y = β<sub>0</sub> + β<sub>1</sub>X + u<span>Δ%Y ≈ 100·β<sub>1</sub>·ΔX</span></div>
        <div class="badge-row"><span class="badge always">Siempre: porcentaje por unidad</span><span class="badge optional">Según el concepto: aproximación o valor exacto</span></div>
      `,
      ejemplo: `
        <p>Si log(salario) = β<sub>0</sub> + 0,08·educación + u, un año más de educación se asocia con 8% más de salario; el exacto es 8,33%. Con 0,5, la aproximación diría 50% y el exacto 64,9%: la diferencia ya no es menor.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Cuando el coeficiente es grande, reportá el cambio exacto. Decir “50%” cuando el modelo implica 64,9% es un error de magnitud, no de redondeo.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer 0,08 como 0,08%.</strong> Hay que multiplicar por 100: es 8%.</li>
          <li><strong>Usar la aproximación con β grandes.</strong> La exponencial se separa rápido de la recta.</li>
          <li><strong>Olvidar que el efecto es porcentual.</strong> No son pesos ni unidades de Y.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No sabés si 0,08 es 8%, 0,08% u 8 unidades.</p></div>
      `,
      conexiones: `<p>El log-lin es el modelo de semi-elasticidad. Su lectura exacta se conecta con la fórmula del cambio porcentual y su interpretación se compara con el log-log y el lin-log.</p>
        <div><button class="concept-chip" data-concept="log-log">Log-log →</button><button class="concept-chip" data-concept="cambio-exacto">Cambio exacto →</button><button class="concept-chip" data-concept="lin-log">Lin-log →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 14–15.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Actividad 1b: por qué modelar en logaritmos.</p></div>
      `
    },
    'lin-log': {
      title: 'Modelo lin-log',
      sub: 'Un porcentaje de X, unidades de Y.',
      esencia: `
        <div class="definition">Y = β<sub>0</sub> + β<sub>1</sub>log X + u. Un cambio de 1% en X se asocia con un cambio de β<sub>1</sub>/100 unidades en Y.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>β<sub>1</sub> está en unidades de Y por punto porcentual de X.</li>
          <li>Si β<sub>1</sub> = 12, 1% más de X se asocia con 0,12 unidades más de Y.</li>
          <li>El cambio en unidades de Y no depende del nivel de X: un 1% siempre cambia log X en la misma cantidad.</li>
        </ul>
        <div class="formula small">Y = β<sub>0</sub> + β<sub>1</sub>log X + u<span>ΔY ≈ (β<sub>1</sub>/100)·Δ%X</span></div>
        <div class="badge-row"><span class="badge always">Siempre: unidades por porcentaje</span><span class="badge optional">Según el concepto: aproximación o cálculo exacto</span></div>
      `,
      ejemplo: `
        <p>Si el gasto en alimentos es Y y el ingreso entra en logaritmos, β<sub>1</sub> = 12 implica que 1% más de ingreso se asocia con 0,12 unidades más de gasto. Si el ingreso sube 10%, el cambio aproximado es 1,2 unidades; el exacto usa β<sub>1</sub>·log(1,10) = 12·0,0953 = 1,14.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>La aproximación β<sub>1</sub>/100 es cómoda para cambios pequeños. Para cambios grandes, usá el logaritmo exacto del cambio porcentual.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Leer β<sub>1</sub> como elasticidad.</strong> La elasticidad es un cociente de porcentajes; acá β<sub>1</sub> está en unidades de Y.</li>
          <li><strong>Decir que 1% más de X cambia Y en 12 unidades.</strong> Cambia en 0,12 unidades.</li>
          <li><strong>Confundir un cambio de 1% con un cambio de una unidad de X.</strong> En lin-log, el regresor es log X: un 1% no es una unidad.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No distinguís lin-log de log-log.</p></div>
      `,
      conexiones: `<p>El lin-log completa la familia: el logaritmo está en X y el efecto se lee en unidades de Y. Se compara con el log-log y el log-lin por la posición del logaritmo.</p>
        <div><button class="concept-chip" data-concept="log-log">Log-log →</button><button class="concept-chip" data-concept="log-lin">Log-lin →</button><button class="concept-chip" data-concept="cambio-exacto">Cambio exacto →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 14.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Actividad 1b.</p></div>
      `
    },
    'cambio-exacto': {
      title: 'Cambio porcentual exacto',
      sub: 'Cuando la aproximación logarítmica no alcanza.',
      esencia: `
        <div class="definition">En un modelo log-lin, el cambio porcentual exacto de Y ante un cambio ΔX es 100[exp(β<sub>1</sub>ΔX) − 1]. La aproximación 100β<sub>1</sub>ΔX solo es buena para cambios pequeños.</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>La exponencial corrige la aproximación lineal de log(1 + x) ≈ x.</li>
          <li>El estimador exacto es consistente, pero no insesgado, porque la exponencial no es lineal.</li>
          <li>Para una unidad, ΔX = 1: 100[exp(β<sub>1</sub>) − 1].</li>
        </ul>
        <div class="formula small">Δ%Y = 100[exp(β̂<sub>1</sub>ΔX) − 1]<span>Fórmula exacta para log-lin</span></div>
        <div class="badge-row"><span class="badge always">Siempre: fórmula e interpretación</span><span class="badge optional">Según el concepto: aproximación vs exacto</span></div>
      `,
      ejemplo: `
        <p>Con β<sub>1</sub> = 0,5, la aproximación dice 50%; el exacto, 100[exp(0,5) − 1] = 64,9%. Con β<sub>1</sub> = 0,08, la diferencia es menor: 8% contra 8,33%. La brecha crece con el tamaño del coeficiente y con ΔX.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Si el parcial pide “interprete el coeficiente”, podés usar la aproximación y aclararlo. Si pide el cambio exacto, no hay atajo: exponencial y resta uno.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Usar 100β<sub>1</sub> sin aclarar que es aproximado.</strong> Para coeficientes grandes el error es material.</li>
          <li><strong>Creer que el estimador exacto es insesgado.</strong> Es consistente; la transformación no lineal introduce sesgo en muestras finitas.</li>
          <li><strong>Aplicar la fórmula de log-lin a un log-log.</strong> En log-log, un cambio de 1% usa 100[(1,01)<sup>β</sup> − 1], no exp(β) − 1.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés explicar por qué 0,5 no es exactamente 50%.</p></div>
      `,
      conexiones: `<p>El cambio exacto es la letra chica del log-lin y también aparece cuando se interpretan cambios grandes en log-log. Se conecta con la no linealidad de la exponencial y con la consistencia.</p>
        <div><button class="concept-chip" data-concept="log-lin">Log-lin →</button><button class="concept-chip" data-concept="log-log">Log-log →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 15.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Actividad 1b: interpretación de transformaciones logarítmicas.</p></div>
      `
    },
    cuadraticas: {
      title: 'Funciones cuadráticas',
      sub: 'Efectos marginales que cambian con X.',
      esencia: `
        <div class="definition">Y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>X<sup>2</sup> + u. El efecto marginal es β<sub>1</sub> + 2β<sub>2</sub>X; el punto de giro es X* = −β<sub>1</sub>/(2β<sub>2</sub>).</div>
        <div class="mini-label">Qué tenés que entender</div>
        <ul>
          <li>β<sub>1</sub> es la pendiente en X = 0, no el efecto constante.</li>
          <li>β<sub>1</sub> &gt; 0 y β<sub>2</sub> &lt; 0: máximo; β<sub>1</sub> &lt; 0 y β<sub>2</sub> &gt; 0: mínimo.</li>
          <li>El punto de giro solo es interpretable si cae dentro del rango observado.</li>
        </ul>
        <div class="formula small">∂Ŷ/∂X = β̂<sub>1</sub> + 2β̂<sub>2</sub>X<span>X* = −β̂<sub>1</sub>/(2β̂<sub>2</sub>)</span></div>
        <div class="badge-row"><span class="badge always">Siempre: efecto marginal y vértice</span><span class="badge optional">Según el concepto: signos y rango</span></div>
      `,
      ejemplo: `
        <p>Con β<sub>1</sub> = 10 y β<sub>2</sub> = −0,5, X* = 10. En X = 4 el efecto marginal es 6; en X = 12, −2. La variable suma hasta 10 y resta después. Si la muestra llega solo a 6, el máximo es una extrapolación.</p>
        <div class="mini-card"><span class="mini-label">En la práctica</span><p>Reportá el efecto marginal en dos o tres valores relevantes de X, no un único número. Eso muestra la curvatura y evita interpretaciones fuera de rango.</p></div>
      `,
      errores: `
        <ul>
          <li><strong>Interpretar β<sub>1</sub> como el efecto de X.</strong> El efecto es β<sub>1</sub> + 2β<sub>2</sub>X.</li>
          <li><strong>Reportar el punto de giro sin verificar el rango.</strong> El vértice puede estar fuera de la muestra.</li>
          <li><strong>Concluir U o U invertida solo por el signo de β<sub>2</sub>.</strong> Hacen falta los dos signos y el tramo relevante.</li>
        </ul>
        <div class="mini-card"><span class="mini-label">Señal de que no lo entendiste</span><p>No podés calcular el efecto marginal en un valor concreto de X.</p></div>
      `,
      conexiones: `<p>Las cuadráticas son modelos intrínsecamente lineales con un regresor transformado. Se leen con la lógica del efecto marginal y se comparan con los modelos logarítmicos según la forma de la relación.</p>
        <div><button class="concept-chip" data-concept="cambios-escala">Cambios de escala →</button><button class="concept-chip" data-concept="beta">Coeficientes beta →</button><button class="concept-chip" data-concept="intrinsecamente-lineales">Intrínsecamente lineales →</button></div>`,
      fuentes: `
        <div class="source-mini"><span class="source-type">Clase</span><p>Clase 4, diap. 16–19.</p></div>
        <div class="source-mini"><span class="source-type book">Libro</span><p>Wooldridge 4ed, Cap. 6, §6.2.</p></div>
        <div class="source-mini"><span class="source-type guía">Guía</span><p>TP 6, Ejercicio 4.</p></div>
      `
    }
  },
  practice: {
    eyebrow: 'De la teoría a la guía',
    title: 'Práctica de la especificación I',
    intro: 'La guía está integrada al sitio: cada tarjeta abre el ejercicio exacto del TP 6. Los primeros ejercicios trabajan escalas y formas funcionales con datos chicos, para ver la mecánica. Después vienen producción, cuadráticas y un modelo log-log aplicado. El laboratorio usa la base de producción del Ejercicio 7.',
    guideHref: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-6',
    exercises: [
      {
        label: 'TP 6 · Act. 1',
        title: 'Cuatro preguntas conceptuales',
        text: 'R² e invariancia de unidades; por qué modelar en logaritmos; por qué Cobb-Douglas es intrínsecamente lineal; y qué error de especificación se comete al eliminar una variable por multicolinealidad.',
        tags: ['Conceptual', 'V/F'],
        href: 'guia/Guía-TP-Eco-I-2026.html#actividad-nº-1-5'
      },
      {
        label: 'TP 6 · Ej. 1',
        title: 'Escalas, traslaciones y logaritmos',
        text: 'Con c₁ = 2 y c₂ = 3, calculá intercepto, pendiente y sus relaciones de cambio para diez combinaciones de Y y X: escaladas, desplazadas, en logaritmos y en logaritmos de una variable escalada.',
        tags: ['Escalas', 'Logaritmos'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-5'
      },
      {
        label: 'TP 6 · Ej. 2',
        title: 'Pesos, miles y estadísticos',
        text: 'Estimá la misma relación con Y y X en miles, con Y en pesos y X en miles, y al revés. Compará coeficientes, R² y t. Es el ejercicio para comprobar la invariancia con datos.',
        tags: ['Escalas', 'R²'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-2-5'
      },
      {
        label: 'TP 6 · Ej. 4',
        title: 'Antigüedad y productividad',
        text: 'Modelá el efecto diferencial de la antigüedad sobre las ventas. Interpretá el efecto marginal de un año más y calculá a partir de qué momento aparece la desmotivación.',
        tags: ['Cuadráticas', 'Antigüedad'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-4-5'
      },
      {
        label: 'TP 6 · Ej. 6',
        title: 'Cobb-Douglas con diez observaciones',
        text: 'Estimá una función de producción con transformación doble logarítmica, interpretá los coeficientes y explicá por qué no se puede aplicar MCO directamente en niveles con esa forma multiplicativa.',
        tags: ['Cobb-Douglas', 'Producción'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-6-3'
      },
      {
        label: 'TP 6 · Ej. 8',
        title: 'Modelo de gravedad',
        text: 'Decidí si la ecuación de gravedad es intrínsecamente lineal, proponé la especificación estimable y traducí el coeficiente de distancia a una elasticidad del comercio.',
        tags: ['Log-log', 'Gravedad'],
        href: 'guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-8'
      }
    ],
    rLab: {
      eyebrow: 'Laboratorio de lectura',
      tag: 'TP 6 · Ej. 7',
      title: 'Cobb-Douglas: elasticidades y rendimientos a escala',
      intro: 'La base PRODUCCION1 permite estimar una función de producción con tres insumos y contrastar una hipótesis económica concreta: rendimientos constantes a escala. La salida muestra, además, que la suma de elasticidades y cada elasticidad individual son dos hipótesis distintas.',
      dataNote: 'PRODUCCION1.rda contiene n = 85 empresas de electricidad. Q es la producción, X1 el consumo de trabajo, X2 el consumo de capital y X3 el consumo de combustible. Es un corte transversal, no una serie de tiempo. El modelo es una función de producción Cobb-Douglas estimada en logaritmos. La muestra es observacional: los coeficientes describen asociaciones condicionales, no efectos causales. El script supone que el archivo está en el directorio de trabajo.',
      script: `load("PRODUCCION1.rda")
modelo <- lm(log(Q) ~ log(X1) + log(X2) + log(X3), data = base)
summary(modelo)
confint(modelo)
suppressPackageStartupMessages(library(car))
linearHypothesis(modelo, "log(X1) + log(X2) + log(X3) = 1")
linearHypothesis(modelo, c("log(X1) = 1", "log(X2) = 1", "log(X3) = 1"))
# theta = beta1 + beta2 + beta3; el coeficiente de log(X1) en este modelo es theta
modelo_theta <- lm(log(Q) ~ log(X1) + I(log(X2) - log(X1)) + I(log(X3) - log(X1)), data = base)
summary(modelo_theta)$coefficients
confint(modelo_theta)`,
      output: `Call:
lm(formula = log(Q) ~ log(X1) + log(X2) + log(X3), data = base)

Residuals:
       Min         1Q     Median         3Q        Max 
-0.0192924 -0.0073503  0.0001739  0.0059505  0.0233284 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)   
(Intercept)   0.5795     1.4224   0.407  0.68476   
log(X1)       0.2925     0.1017   2.876  0.00515 **
log(X2)       0.2815     0.1620   1.738  0.08602 . 
log(X3)       0.3356     0.1061   3.165  0.00219 **
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.009856 on 81 degrees of freedom
Multiple R-squared:  0.2223,	Adjusted R-squared:  0.1935 
F-statistic: 7.718 on 3 and 81 DF,  p-value: 0.0001345

                  2.5 %    97.5 %
(Intercept) -2.25059596 3.4096682
log(X1)      0.09014010 0.4948666
log(X2)     -0.04076986 0.6037062
log(X3)      0.12460012 0.5466413

Linear hypothesis test:
log(X1)  + log(X2)  + log(X3) = 1

Model 1: restricted model
Model 2: log(Q) ~ log(X1) + log(X2) + log(X3)

  Res.Df       RSS Df  Sum of Sq     F Pr(>F)
1     82 0.0078883                           
2     81 0.0078688  1 1.9526e-05 0.201 0.6551

Linear hypothesis test:
log(X1) = 1
log(X2) = 1
log(X3) = 1

Model 1: restricted model
Model 2: log(Q) ~ log(X1) + log(X2) + log(X3)

  Res.Df       RSS Df Sum of Sq      F    Pr(>F)    
1     84 0.0194112                                   
2     81 0.0078688  3  0.011542 39.605 7.395e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
                      Estimate Std. Error   t value     Pr(>|t|)
(Intercept)          0.5795361  1.4224011 0.4074351 6.847633e-01
log(X1)              0.9095922  0.2016552 4.5106320 2.161271e-05
I(log(X2) - log(X1)) 0.2814682  0.1619542 1.7379493 8.602006e-02
I(log(X3) - log(X1)) 0.3356207  0.1060572 3.1645249 2.188448e-03
                           2.5 %    97.5 %
(Intercept)          -2.25059596 3.4096682
log(X1)               0.50836172 1.3108228
I(log(X2) - log(X1)) -0.04076986 0.6037062
I(log(X3) - log(X1))  0.12460012 0.5466413`,
      confint: `                  2.5 %    97.5 %
(Intercept) -2.25059596 3.4096682
log(X1)      0.09014010 0.4948666
log(X2)     -0.04076986 0.6037062
log(X3)      0.12460012 0.5466413`,
      readingTable: [
        {
          element: 'Estimate',
          meaning: 'Coeficiente estimado en el modelo de log Q.',
          how: 'Cada pendiente es una elasticidad: cambio porcentual de Q ante 1% más del insumo.'
        },
        {
          element: 'Std. Error',
          meaning: 'Error estándar del coeficiente.',
          how: 'Mide la precisión. Es el denominador del t y la base del intervalo.'
        },
        {
          element: 't value',
          meaning: 'Estimate / Std. Error.',
          how: 'Distancia estandarizada a cero. No mide la magnitud económica del efecto.'
        },
        {
          element: 'Pr(>|t|)',
          meaning: 'Valor p del contraste bilateral individual.',
          how: 'Se compara con α. No es la probabilidad de que H₀ sea verdadera.'
        },
        {
          element: 'Residual standard error',
          meaning: 'σ̂ en logaritmos.',
          how: '0,009856: dispersión residual en log puntos, aproximadamente 1% de Q.'
        },
        {
          element: 'Multiple R-squared',
          meaning: 'Proporción de variación de log Q explicada.',
          how: '0,2223. No es comparable con el R² de un modelo para Q en niveles.'
        },
        {
          element: 'Adjusted R-squared',
          meaning: 'R² corregido por grados de libertad.',
          how: 'Penaliza regresores adicionales. Sirve para comparar modelos con la misma Y.'
        },
        {
          element: 'F-statistic',
          meaning: 'Contraste conjunto de que todas las pendientes son cero.',
          how: 'F(3, 81) = 7,718, p = 0,00013: al menos una elasticidad aporta.'
        },
        {
          element: 'confint()',
          meaning: 'Intervalos al 95% para cada coeficiente.',
          how: 'El de log(X2) contiene cero; los de log(X1) y log(X3) no.'
        },
        {
          element: 'linearHypothesis r = 1',
          meaning: 'Contraste de rendimientos constantes a escala.',
          how: 'F(1, 81) = 0,201, p = 0,655: no se rechaza que la suma sea 1.'
        },
        {
          element: 'linearHypothesis βⱼ = 1',
          meaning: 'Contraste conjunto de que cada elasticidad sea 1.',
          how: 'F(3, 81) = 39,605, p &lt; 0,001: se rechaza. Es otra hipótesis.'
        },
        {
          element: 'modelo_theta',
          meaning: 'Reparametrización con θ = β₁ + β₂ + β₃.',
          how: 'θ̂ = 0,9096, ee = 0,2017, IC [0,508; 1,311]. Con estos valores, t = (0,9096 − 1)/0,2017 ≈ −0,45; su cuadrado es el F anterior.'
        }
      ],
      econometric: `<p><strong>Elasticidades estimadas.</strong> β̂<sub>1</sub> = 0,2925 (t = 2,876; p = 0,005), β̂<sub>2</sub> = 0,2815 (t = 1,738; p = 0,086) y β̂<sub>3</sub> = 0,3356 (t = 3,165; p = 0,002). Trabajo y combustible son significativos al 5%; capital no, al 5%, aunque su intervalo incluye el cero y valores positivos relevantes. La suma es 0,9096.</p>
        <p><strong>Ajuste.</strong> R<sup>2</sup> = 0,2223 y R<sup>2</sup> ajustado = 0,1935. El F(3, 81) = 7,718 (p = 0,00013) rechaza que todas las pendientes sean cero. El R<sup>2</sup> bajo no implica un modelo inútil: la producción de la muestra es muy homogénea (Q va de 847,7 a 892,7), y el error residual en logaritmos es 0,009856, es decir, aproximadamente 1% de Q.</p>
        <p><strong>Rendimientos a escala.</strong> H<sub>0</sub>: β<sub>1</sub> + β<sub>2</sub> + β<sub>3</sub> = 1. El contraste da F(1, 81) = 0,201, p = 0,655: no se rechaza. La reparametrización confirma θ̂ = 0,9096, ee = 0,2017, IC al 95% [0,508; 1,311]. El intervalo contiene a 1, así que los datos son compatibles con rendimientos constantes, con rendimientos levemente decrecientes y con rendimientos crecientes moderados.</p>
        <p><strong>Dos hipótesis distintas.</strong> El contraste conjunto β<sub>1</sub> = β<sub>2</sub> = β<sub>3</sub> = 1 da F(3, 81) = 39,605, p &lt; 0,001: se rechaza. La suma puede ser 1 sin que cada coeficiente sea 1. Es el error conceptual más importante del Ejercicio 7: no se pasa de “no rechazo la suma” a “cada elasticidad es unitaria”.</p>`,
      economic: `<p>La función de producción describe cómo se combinan trabajo, capital y combustible para generar producción. Las elasticidades estimadas son parecidas entre sí: un 1% más de trabajo se asocia con 0,29% más de producto; un 1% más de capital, con 0,28%; un 1% más de combustible, con 0,34%, manteniendo los otros insumos constantes.</p>
        <p>La suma de 0,91 se lee como una estimación de los rendimientos a escala. El valor puntual sugiere que duplicar todos los insumos multiplicaría el producto por 2<sup>0,91</sup> ≈ 1,88, algo menos del doble. Pero el contraste no rechaza r = 1 y el intervalo es amplio: los datos no permiten distinguir con precisión entre rendimientos constantes, levemente decrecientes o levemente crecientes. Reportar solo el 0,91 como si fuera una prueba de rendimientos decrecientes sería exagerar la precisión.</p>
        <p>El intercepto estimado es 0,5795; exp(0,5795) ≈ 1,785. Es una estimación del factor de eficiencia A en la escala de los datos, no una medida directa de “productividad total de los factores” comparable entre países o empresas sin más supuestos. La muestra son 85 empresas de electricidad, probablemente con tecnologías y escalas similares; esa homogeneidad es consistente con el R<sup>2</sup> bajo.</p>
        <p>La lectura causal exige cautela. Trabajo, capital y combustible se eligen conjuntamente con la producción y pueden estar correlacionados con eficiencia no observada. Los coeficientes describen asociaciones condicionales dentro de esta muestra; no identifican una función de producción estructural. La clase 9 y la 10 retoman el problema de endogeneidad y la estimación por variables instrumentales.</p>`,
      errors: [
        'Decir que la suma 0,91 prueba rendimientos decrecientes. Es un punto estimado y el contraste no rechaza r = 1; hay que reportar el intervalo.',
        'Confundir no rechazar r = 1 con aceptar que r = 1. La conclusión correcta es que los datos no aportan evidencia suficiente contra esa hipótesis.',
        'Leer el R² de 0,22 como prueba de que el modelo es malo. La muestra es homogénea y el error residual es aproximadamente 1% de Q.',
        'Interpretar las elasticidades como productos marginales. El producto marginal de un insumo es βⱼQ/Xⱼ, no βⱼ.',
        'Comparar este R² con el de un modelo para Q en niveles. La variable dependiente es distinta; el R² no es comparable.',
        'Afirmar causalidad. La base es observacional y los insumos pueden estar correlacionados con eficiencia no observada.'
      ],
      checklist: [
        'Reportá n, la unidad de Q y de cada insumo, y aclará que es un corte transversal.',
        'Presentá cada elasticidad con error estándar, t, p e intervalo al 95%.',
        'Calculá la suma de elasticidades y contrastá H₀: r = 1; informá el estadístico, los grados de libertad y el p.',
        'Agregá el intervalo para la suma usando la reparametrización o una combinación lineal.',
        'Separá el contraste de la suma del contraste conjunto de que cada βⱼ sea 1.',
        'Cerrá con los límites causales y con la diferencia entre significancia estadística y magnitud económica.'
      ]
    },
    partials: [
      {
        label: '1P 2024',
        text: 'Reescribir un modelo con variables estandarizadas, interpretar uno de los coeficientes y explicar por qué podría optarse por esa parametrización.'
      },
      {
        label: '1P 2024',
        text: 'Linealizar una Cobb-Douglas del tipo AX<sub>1</sub><sup>β1</sup>X<sub>2</sub><sup>β2</sup>v e interpretar un coeficiente; demostrar el efecto sobre los estimadores al dividir Y por una constante.'
      },
      {
        label: '1P 2024',
        text: 'Distinguir un contraste individual como H₀: β₁ = 1 de un contraste de restricciones múltiples como H₀: β₁ = β₂ = 0, y elegir el estadístico adecuado para cada uno.'
      }
    ]
  },
  assessment: {
    eyebrow: 'Autoevaluación',
    title: 'Preguntas de razonamiento',
    intro: 'Las preguntas apuntan a decidir formas funcionales y a leer coeficientes transformados. Respondé antes de abrir la solución; si tu respuesta no distingue estimación de interpretación, volvé a la sección correspondiente.',
    questions: [
      {
        q: 'Si Y pasa de pesos a miles, ¿por qué cambian los coeficientes pero no los t ni el R²?',
        a: 'Porque dividir Y por 1000 divide todos los coeficientes de nivel y sus errores estándar por 1000. El t es el cociente entre ambos y no cambia. La SCR y la suma total se dividen por 1000², así que el R² tampoco cambia. La evidencia estadística es la misma; solo cambia la unidad en la que se mide el efecto.'
      },
      {
        q: 'Si una X expresada en logaritmos cambia de pesos a miles, ¿qué pasa con el intercepto y con la pendiente?',
        a: 'La pendiente no cambia. Si X se expresa en miles en lugar de pesos, X se divide por 1000 y log(X/1000) = log X − log 1000. El término −β₁log 1000 se absorbe en el intercepto: el nuevo intercepto es β₀ − β₁log 1000. La elasticidad es invariante a la unidad. Si se pasa de miles a pesos, el signo se invierte.'
      },
      {
        q: '¿Para qué sirven los coeficientes beta y qué no resuelven?',
        a: 'Sirven para comparar magnitudes relativas cuando las variables tienen unidades distintas: miden desvíos estándar de Y por desvío estándar de X. No resuelven endogeneidad, variables omitidas ni causalidad. Además dependen de la dispersión de la muestra, por lo que no se comparan entre muestras distintas. Son una medida de asociación relativa, no de importancia económica absoluta.'
      },
      {
        q: 'Dos variables tienen beta 0,4. ¿Pueden tener t muy distintos?',
        a: 'Sí. Beta mide la magnitud estandarizada, pero el t es el coeficiente dividido por su error estándar. Una variable puede tener beta 0,4 y estar estimada con mucha precisión, y otra el mismo beta con un error estándar grande por colinealidad o poca variación independiente. Beta no contiene información sobre precisión.'
      },
      {
        q: '¿Cómo distinguís un modelo log-log de un log-lin al interpretar el coeficiente?',
        a: 'En log-log, log Y = β₀ + β₁log X, β₁ es una elasticidad: un 1% más de X se asocia con β₁% más de Y. En log-lin, log Y = β₀ + β₁X, β₁ es una semi-elasticidad: una unidad más de X se asocia con aproximadamente 100β₁% más de Y. En el primer caso el cambio de X es porcentual; en el segundo, en unidades.'
      },
      {
        q: 'En un lin-log con β̂ = 12, ¿cómo interpretás un aumento de 1% y uno de 10% en X?',
        a: 'Un 1% más de X se asocia con 0,12 unidades más de Y, porque β/100 = 0,12. Un 10% más se asocia con aproximadamente 1,2 unidades, pero el cálculo exacto es β·log(1,10) = 12·0,09531 ≈ 1,14. La aproximación β/100 es para cambios porcentuales pequeños; con 10% ya hay una diferencia visible.'
      },
      {
        q: 'En log-lin, β̂ = 0,5. ¿El cambio porcentual es 50%?',
        a: 'No exactamente. La aproximación es 100·0,5 = 50%, pero el cambio exacto es 100[exp(0,5) − 1] = 64,9%. La diferencia aparece porque log(1 + x) ≈ x solo funciona bien para x pequeño. El estimador exacto es consistente pero no insesgado, porque la exponencial es una función no lineal.'
      },
      {
        q: 'En una Cobb-Douglas, la suma de elasticidades es 0,91 y el contraste de r = 1 tiene p = 0,655. ¿Qué concluís?',
        a: 'Que no se rechaza la hipótesis de rendimientos constantes a escala al 5%. El valor puntual es menor que 1, pero el intervalo para la suma contiene a 1. No se puede afirmar que r = 1; tampoco que r &lt; 1. La conclusión honesta es que los datos son compatibles con un rango de rendimientos y que hace falta más precisión para distinguirlos.'
      },
      {
        q: 'En el mismo modelo, el contraste conjunto de que cada βⱼ sea 1 se rechaza. ¿Contradice la conclusión anterior?',
        a: 'No. Son hipótesis distintas. La suma puede ser 1 con elasticidades 0,5, 0,3 y 0,2, ninguna igual a 1. El primer contraste pregunta por la suma; el segundo, por tres igualdades individuales simultáneas. Que una no se rechace y la otra sí es informativo: los datos son compatibles con rendimientos constantes, pero no con una tecnología de elasticidades unitarias.'
      },
      {
        q: 'Con β̂₁ = 10 y β̂₂ = −0,5, ¿cuál es el efecto marginal en X = 4 y en X = 12? ¿Dónde está el máximo?',
        a: 'El efecto marginal es 10 − X. En X = 4 es 6; en X = 12 es −2. El máximo está en X* = 10. La lectura correcta es condicional al punto de partida: cada unidad adicional de X suma 6 cuando se parte de 4, pero resta 2 cuando se parte de 12. β₁ = 10 es la pendiente en X = 0, no el efecto en todo el rango.'
      },
      {
        q: 'Un modelo en niveles tiene R² = 0,85 y uno en logaritmos, R² = 0,22. ¿Cómo elegís?',
        a: 'No se elige por el R²: las variables dependientes son distintas y los R² no son comparables. Hay que decidir según la pregunta económica, la teoría, la interpretación que se necesita y el diagnóstico de la forma funcional. Un R² bajo en logaritmos puede convivir con coeficientes precisos y una muestra homogénea; un R² alto en niveles puede reflejar una relación lineal fuerte en esa escala, que no responde necesariamente la pregunta de interés.'
      },
      {
        q: '¿Por qué una forma funcional mal elegida puede producir un problema parecido a omitir una variable?',
        a: 'Porque la parte de la relación que el modelo no capta queda en el error. Si la verdadera relación es cuadrática y se estima una recta, el término X² termina en el error y suele estar correlacionado con X. Entonces el coeficiente lineal recoge ese efecto omitido y queda sesgado. La forma funcional es parte de la especificación, no un detalle cosmético.'
      }
    ]
  },
  review: {
    eyebrow: 'Cierre y consolidación',
    title: 'Kit de repaso: especificación I',
    intro: 'Empezá por las fórmulas, seguí con los drills y la sesión de 90 minutos, y cerrá con el plan de 7 días. La idea es tener una hoja de ruta para decidir y leer formas funcionales sin volver a leer todo desde cero.',
    formulas: [
      {
        title: 'Escala de Y',
        eq: 'Ŷ/c = β̂<sub>0</sub>/c + (β̂<sub>1</sub>/c)X<sub>1</sub> + …',
        note: 'Coeficientes y errores estándar se dividen por c; los t de significancia, el F de exclusión y R² no cambian; SCR por c².'
      },
      {
        title: 'Escala de X',
        eq: 'X<sub>2</sub>/c &nbsp;→&nbsp; β̂<sub>2</sub>·c &nbsp;·&nbsp; ee(β̂<sub>2</sub>)·c',
        note: 'La pendiente y su error estándar se multiplican por c; el intercepto no cambia.'
      },
      {
        title: 'Logaritmo de una escala',
        eq: 'log(cY) = log c + log Y',
        note: 'Solo se desplaza el intercepto; las pendientes y elasticidades quedan iguales.'
      },
      {
        title: 'Coeficiente beta',
        eq: 'b̂<sub>j</sub> = β̂<sub>j</sub> · σ̂<sub>j</sub>/σ̂<sub>Y</sub>',
        note: 'Desvíos estándar de Y por desvío estándar de X. Menos de 0,3: pequeño; hasta 0,7: moderado; más de 0,7: grande.'
      },
      {
        title: 'Log-log',
        eq: 'log Y = β<sub>0</sub> + β<sub>1</sub>log X + u',
        note: 'β₁ es la elasticidad: Δ%Y por 1% de X.'
      },
      {
        title: 'Log-lin',
        eq: 'log Y = β<sub>0</sub> + β<sub>1</sub>X + u',
        note: 'Δ%Y ≈ 100β₁ΔX. β₁ es una semi-elasticidad.'
      },
      {
        title: 'Lin-log',
        eq: 'Y = β<sub>0</sub> + β<sub>1</sub>log X + u',
        note: 'ΔY ≈ (β₁/100)Δ%X. β₁ está en unidades de Y por punto porcentual.'
      },
      {
        title: 'Cambio exacto',
        eq: 'Δ%Y = 100[exp(β̂<sub>1</sub>ΔX) − 1]',
        note: 'Para log-lin. Consistente, no insesgado. Necesario cuando β o ΔX son grandes.'
      },
      {
        title: 'Efecto marginal cuadrático',
        eq: '∂Ŷ/∂X = β̂<sub>1</sub> + 2β̂<sub>2</sub>X',
        note: 'Cambia con X. β₁ es la pendiente en X = 0.'
      },
      {
        title: 'Punto de giro',
        eq: 'X* = −β̂<sub>1</sub>/(2β̂<sub>2</sub>)',
        note: 'Máximo si β₁ &gt; 0 y β₂ &lt; 0; mínimo si β₁ &lt; 0 y β₂ &gt; 0. Verificar el rango.'
      },
      {
        title: 'Rendimientos a escala',
        eq: 'r = β<sub>1</sub> + β<sub>2</sub> + β<sub>3</sub>',
        note: 'r = 1 constantes; r &gt; 1 crecientes; r &lt; 1 decrecientes. Contrastar, no solo mirar.'
      },
      {
        title: 'Reparametrización Cobb-Douglas',
        eq: 'log Q = β<sub>0</sub> + θ log X<sub>1</sub> + β<sub>2</sub>log(X<sub>2</sub>/X<sub>1</sub>) + …',
        note: 'θ = suma de elasticidades. Con θ̂ y su ee se contrasta θ = 1; el t es (θ̂ − 1)/ee(θ̂).'
      }
    ],
    drills: [
      {
        q: 'Si Y se divide por 1000, ¿qué pasa con β̂₁, ee(β̂₁), t y R²?',
        a: 'β̂₁ y ee se dividen por 1000; t no cambia; R² no cambia; la SCR se divide por 1000².'
      },
      {
        q: 'Si X se divide por 1000, ¿qué pasa con β̂ y el intercepto?',
        a: 'β̂ y su ee se multiplican por 1000; el intercepto no cambia; t y R² tampoco.'
      },
      {
        q: '¿Qué cambia al medir Y en logaritmos y pasar de pesos a miles?',
        a: 'Solo el intercepto: se le resta log 1000. Al pasar de pesos a miles, Y se divide por 1000 y log(Y/1000) = log Y − log 1000. Las pendientes no cambian.'
      },
      {
        q: 'Escribí la fórmula del coeficiente beta e interpretala.',
        a: 'b̂ⱼ = β̂ⱼσ̂ⱼ/σ̂Y. Mide desvíos estándar de Y por desvío estándar de Xⱼ, ceteris paribus.'
      },
      {
        q: '¿Qué significa β₁ = 0,6 en un log-log?',
        a: 'Que 1% más de X se asocia con 0,6% más de Y: elasticidad constante de 0,6.'
      },
      {
        q: '¿Qué significa β₁ = 0,08 en un log-lin?',
        a: 'Que una unidad más de X se asocia con 8% más de Y en la aproximación; el exacto es 8,33%.'
      },
      {
        q: '¿Qué significa β₁ = 12 en un lin-log?',
        a: 'Que 1% más de X se asocia con 0,12 unidades más de Y.'
      },
      {
        q: '¿Por qué 0,5 en log-lin no es exactamente 50%?',
        a: 'Porque el cambio exacto es 100[exp(0,5) − 1] = 64,9%. La aproximación lineal falla con coeficientes grandes.'
      },
      {
        q: 'Con β₁ = 10 y β₂ = −0,5, ¿cuál es el efecto marginal en X = 6?',
        a: '10 + 2(−0,5)(6) = 10 − 6 = 4. En X = 10 es cero; en X = 12 es −2.'
      },
      {
        q: '¿Dónde está el punto de giro del drill anterior y qué tipo de extremo es?',
        a: 'X* = −10/(2·−0,5) = 10. Como β₁ &gt; 0 y β₂ &lt; 0, es un máximo.'
      },
      {
        q: '¿Cómo se contrasta r = 1 en una Cobb-Douglas de tres insumos?',
        a: 'Con H₀: β₁ + β₂ + β₃ = 1, un F de una restricción o un t calculado con θ̂ y su error estándar en la reparametrización. No es lo mismo que β₁ = β₂ = β₃ = 1.'
      }
    ],
    sourceGuide: [
      {
        stuck: 'No entiendo por qué cambiar unidades no cambia el t ni el R²',
        source: 'Clase 4, diap. 4–6; Wooldridge Cap. 6, §6.1; TP 6, Ejercicios 1 y 2.'
      },
      {
        stuck: 'Confundo los coeficientes beta con los coeficientes originales',
        source: 'Clase 4, diap. 7–8; Wooldridge Cap. 6, §6.1; 1P 2024.'
      },
      {
        stuck: 'No sé cuándo conviene usar logaritmos',
        source: 'Clase 4, diap. 12–13; Wooldridge Cap. 6, §6.2; TP 6, Actividad 1b.'
      },
      {
        stuck: 'No distingo log-log, log-lin y lin-log',
        source: 'Clase 4, diap. 13–15; sección 04 de esta clase.'
      },
      {
        stuck: 'No puedo interpretar una elasticidad o una semi-elasticidad',
        source: 'Clase 4, diap. 13–15; TP 6, Ejercicios 6 y 8 (elasticidad); sección 04 (semi-elasticidad).'
      },
      {
        stuck: 'No entiendo el cambio porcentual exacto',
        source: 'Clase 4, diap. 15; Wooldridge Cap. 6, §6.2; sección 04 de esta clase.'
      },
      {
        stuck: 'No sé cómo contrastar rendimientos a escala',
        source: 'Clase 4, diap. 10–11; TP 6, Ejercicio 7; laboratorio de esta clase.'
      },
      {
        stuck: 'No sé leer el efecto marginal de una cuadrática',
        source: 'Clase 4, diap. 16–19; TP 6, Ejercicio 4.'
      },
      {
        stuck: 'No sé qué forma funcional elegir',
        source: 'Clase 4, diap. 9–19; sección 07 de esta clase.'
      }
    ],
    session: [
      {
        time: '0–10',
        title: 'Pregunta guía',
        text: '¿Cómo se elige la forma funcional y qué cambia cuando se transforman las variables? Escribí una respuesta de tres líneas sin mirar.'
      },
      {
        time: '10–30',
        title: 'Escala y beta',
        text: 'Explicá qué se divide y qué se mantiene al cambiar unidades. Calculá a mano un beta con la fórmula y comprobá la regla 0,3 / 0,7. Fuente: secciones 02 y 03.'
      },
      {
        time: '30–50',
        title: 'Familia log',
        text: 'Escribí las cuatro formas, interpretá un coeficiente de cada una y resolvé el TP 6, Actividad 1 y Ejercicio 1. Fuente: sección 04.'
      },
      {
        time: '50–70',
        title: 'Cobb-Douglas',
        text: 'Reproducí el laboratorio de PRODUCCION1. Leé elasticidades, R², contraste de suma y contraste individual. Fuente: sección 05 y Ejercicio 7.'
      },
      {
        time: '70–85',
        title: 'Cuadráticas y parcial',
        text: 'Resolvé el TP 6, Ejercicio 4 y explicá el efecto marginal en dos valores de X. Después respondé las preguntas de 1P 2024 sobre estandarización y Cobb-Douglas.'
      },
      {
        time: '85–90',
        title: 'Cierre',
        text: 'Anotá una forma funcional que sepas explicar en dos minutos y una que todavía no puedas justificar sin mirar.'
      }
    ],
    kit: [
      {
        k: 'Kit 01',
        title: 'Una página de formas',
        text: 'Las cuatro formas lineales, su ecuación y una frase de interpretación por coeficiente.'
      },
      {
        k: 'Kit 02',
        title: 'Tabla de invariancias',
        text: 'Qué cambia y qué no al escalar Y, escalar X o tomar logaritmos. La sección 02 es el punto de partida.'
      },
      {
        k: 'Kit 03',
        title: 'Seis tarjetas de práctica',
        text: 'Actividad 1 y Ejercicios 1, 2, 4, 6 y 8 del TP 6, con el enlace profundo a cada uno.'
      },
      {
        k: 'Kit 04',
        title: 'Plan de 7 días',
        text: 'Una rutina corta para alternar teoría, ejercicios y parcial sin volver a leer todo desde cero.'
      }
    ],
    plan: [
      {
        day: 'Día 1',
        title: 'Teoría y mapa',
        text: 'Leé las secciones 01 y 07. Explicá el mapa de decisión de seis pasos sin mirar.'
      },
      {
        day: 'Día 2',
        title: 'Escala y beta',
        text: 'Estudiá las secciones 02 y 03. Escribí las fórmulas de invariancia y calculá un beta a mano.'
      },
      {
        day: 'Día 3',
        title: 'TP 6, Actividad 1 y Ejercicios 1–2',
        text: 'Respondé las cuatro preguntas conceptuales y resolvé las diez combinaciones de escalas. Verificá R² y t.'
      },
      {
        day: 'Día 4',
        title: 'Familia log',
        text: 'Estudiá la sección 04. Resolvé el Ejercicio 6 y el Ejercicio 8; interpretá cada coeficiente en la unidad correcta.'
      },
      {
        day: 'Día 5',
        title: 'Laboratorio Cobb-Douglas',
        text: 'Reproducí la salida de PRODUCCION1. Reportá elasticidades, suma, contraste de r = 1 y contraste individual.'
      },
      {
        day: 'Día 6',
        title: 'Cuadráticas y parcial',
        text: 'Resolvé el Ejercicio 4 y las preguntas de 1P 2024 sobre estandarización, Cobb-Douglas y escalas.'
      },
      {
        day: 'Día 7',
        title: 'Cierre',
        text: 'Volvé solo a lo que falló. Actualizá tu tabla de invariancias y tu página de formas funcionales.'
      }
    ]
  },
  sources: {
    eyebrow: 'Trazabilidad',
    title: 'Fuentes de esta clase',
    intro: 'Primero la cátedra; el libro complementa y profundiza. La guía está integrada al sitio para abrir cada ejercicio desde la práctica. Las citas de parciales se limitan a preguntas relacionadas con esta parte de la clase.',
    items: [
      {
        type: 'Clase',
        typeClass: '',
        title: 'Clase 4 — Especificación del modelo y predicción',
        text: 'Fuente principal de la explicación, el orden y los énfasis. Esta parte cubre escala, beta, formas funcionales, logaritmos y cuadráticas.',
        loc: 'Diapositivas 3–19'
      },
      {
        type: 'Libro',
        typeClass: 'book',
        title: 'Wooldridge — Introducción a la Econometría, 4.ª ed.',
        text: 'Cap. 6: efectos de los cambios de escala, coeficientes estandarizados, formas funcionales con logaritmos y cuadráticas.',
        loc: 'Cap. 6 · §6.1–6.2'
      },
      {
        type: 'Guía',
        typeClass: '',
        title: 'Guía de Trabajos Prácticos 2026 — TP 6',
        text: 'Actividad 1 para los conceptos; Ejercicios 1–2 para escalas; 4 para cuadráticas; 6 y 8 para formas logarítmicas; 7 para Cobb-Douglas y rendimientos a escala.',
        loc: 'TP 6 · act. 1; ej. 1–2, 4, 6–8',
        href: 'guia/Guía-TP-Eco-I-2026.html#trabajo-práctico-nº-6'
      },
      {
        type: 'Parcial',
        typeClass: 'exam',
        title: '1P 2024',
        text: 'Variables estandarizadas e interpretación de coeficientes beta; linealización de una Cobb-Douglas y efecto de cambiar la escala de Y; diferencia entre contraste individual y conjunto.',
        loc: 'Solución orientativa'
      }
    ]
  }
};
