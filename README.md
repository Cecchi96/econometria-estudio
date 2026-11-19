# Econometría I · Cuaderno de estudio

Sitio de estudio para Econometría I, desarrollado como una aplicación estática con autenticación y anotaciones privadas por usuario en Supabase.

## Estado

- **Clase 1 completa:** teoría, conceptos, práctica con laboratorio de R, autoevaluación y kit de repaso.
- **Clases 2A y 2B completas:** regresión múltiple, efectos parciales, multicolinealidad y álgebra matricial, con práctica, laboratorio de R y kit de repaso.
- **Clases 3A y 3B completas:** 3A cubre inferencia sobre un parámetro (MLC, t, valor p, potencia e intervalos); 3B cubre combinaciones lineales, F, LM, normalidad asintótica y consistencia. Ambas con práctica, laboratorio de R y kit de repaso.
- **Clases 4A y 4B completas:** 4A cubre escala, coeficientes beta, formas funcionales, logaritmos y cuadráticas; 4B cubre selección de modelos, AIC/BIC, RESET, sesgos de especificación y predicción promedio e individual. Ambas con práctica, laboratorio de R y kit de repaso.
- **Clases 5 a 10 completas:** variables ficticias, heterocedasticidad, series de tiempo, autocorrelación, endogeneidad y variables instrumentales, y MC2E, cada una con práctica, laboratorio de R y kit de repaso.
- **Mapa de cobertura:** `docs/COBERTURA-PDFS.md` traza cada PDF de la cátedra a la sección, ficha o fórmula que lo cubre.
- **Anotaciones:** se guardan en Supabase y son privadas para cada cuenta.
- **Buscador global:** busca conceptos y palabras en las 13 clases, muestra la ficha si ya existe, enlaza cada mención y permite guardar notas propias por término.
- **Comentarios:** botón flotante para enviar sugerencias y una bandeja privada para el administrador.
- **Modo noche:** persistente y responsive.

## Funcionalidades

- Navegación por las clases del curso (clases 2, 3 y 4 divididas en A y B).
- Barra lateral de conceptos con explicación simple, definición, ejemplo, errores, conexiones y fuentes.
- Visualización interactiva dentro de las fichas de concepto que la admiten.
- Gráfico interactivo de MCO con sliders de β₀ y β₁, residuos, SCR y R² en vivo.
- Visualizaciones interactivas en las clases 1 a 10: curva de la SCR, sesgo por omisión, FIV y ancho de intervalos, distribuciones t y F, formas funcionales, cuadrática, predicción, dummies, heterocedasticidad, tendencia y estacionalidad, AR(1), proxy y MC2E con instrumentos débiles. Se suman visualizaciones para FRP/FRM, muestreo e insesgamiento, descomposición del R², efecto parcial, Frisch-Waugh, potencia, interacción, AIC/BIC, Chow, WLS y rezagos distribuidos.
- Laboratorios de lectura de salidas de R para las clases 1, 2A, 2B, 3A, 3B, 4A, 4B, 5, 6, 7, 8, 9 y 10.
- Selección de texto en cualquier sección, incluidos títulos, fórmulas, tarjetas, tablas y fuentes, para subrayar o comentar.
- Cuatro colores de subrayado y cambio de color posterior desde el panel de anotaciones.
- Panel de anotaciones con filtros, edición, borrado y “volver al fragmento”.
- Buscador global con atajo `Ctrl/Cmd + K`: si el concepto tiene ficha, la abre; si no, muestra todas las menciones con enlace a la clase, pestaña y fragmento exacto. Cada término puede llevar una nota propia, editable y sincronizada con la cuenta.
- Sección de profundización al final de la teoría de cada clase.
- Formulario de repaso con fórmulas desplegables, información ampliada y comentario directo.
- Autoevaluación con preguntas de razonamiento.
- Formulario, drill de fórmulas, sesión de 90 minutos y plan de repaso de 7 días.
- Guía de trabajos prácticos integrada con enlaces directos a cada ejercicio.
- Botón flotante “Comentarios” en cada clase, con contexto automático de clase y pestaña.
- Bandeja privada de comentarios con filtros, búsqueda, estado resuelto y borrado.
- Modo claro/oscuro, diseño responsive y selección táctil en tablet y celular.

## Stack

- HTML, CSS y JavaScript sin framework.
- Supabase Auth + Postgres + Row Level Security.
- Vercel para el deploy estático.
- `storage.js` reutiliza el login y el cliente de Supabase del proyecto Fukuro.

## Estructura

```text
index.html              shell de la aplicación
feedback.html           bandeja privada de comentarios
storage.js              login y cliente de Supabase
assets/
  styles.css            design system y modo noche
  viz.css               estilos de las visualizaciones interactivas
  feedback.css          estilos del botón flotante y de la bandeja
  search.css            estilos del buscador global
  app.js                render, navegación, conceptos, anotaciones y gráfico
  viz.js                motor de visualizaciones interactivas
  store.js              adaptador Supabase + fallback local
  termstore.js          notas del buscador sobre la tabla de anotaciones
  search.js             índice, búsqueda, menciones y notas por término
  feedback.js           botón flotante y formulario de comentarios
  feedback-admin.js     bandeja de comentarios del administrador
content/
  indice.js             lista de clases
  clase-01.js           contenido de la clase 1
  clase-02a.js          regresión múltiple, parte 1
  clase-02b.js          regresión múltiple, parte 2
  clase-03a.js          inferencia sobre un parámetro
  clase-03b.js          restricciones, F y propiedades asintóticas
  clase-04a.js          escala, formas funcionales y logaritmos
  clase-04b.js          selección de modelos, sesgos y predicción
  clase-05.js           variables ficticias
  clase-06.js           heterocedasticidad
  clase-07.js           series de tiempo
  clase-08.js           autocorrelación
  clase-09.js           endogeneidad y variables instrumentales
  clase-10.js           mínimos cuadrados en dos etapas
docs/
  BRIEF-CLASES.md       especificación de contenido de las clases
  COBERTURA-PDFS.md     mapa de cobertura de cada PDF a las unidades
  MEJORAS-CONTENIDO.md  campos simple, viz, more y sección de profundización
guia/
  Guía-TP-Eco-I-2026.html   guía de trabajos prácticos integrada
supabase/
  eco_annotations.sql   tabla, índices y políticas RLS
  eco_feedback.sql      comentarios y tabla privada de administradores
```

La guía conserva sus pestañas y acepta enlaces profundos a cada actividad o
ejercicio, por ejemplo `guia/Guía-TP-Eco-I-2026.html#ejercicio-nº-1-2`. Un script
al final del archivo abre la pestaña correspondiente y hace scroll al ejercicio,
incluso cuando el navegador codifica el `º`.

## Desarrollo local

Desde esta carpeta:

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000/`.

`storage.js` va a pedir correo y contraseña. Para probar anotaciones hace falta una cuenta del proyecto Supabase.

## Supabase

La app usa el proyecto `fukuro`:

- URL y publishable key en `storage.js`. La publishable key es pública por diseño.
- La tabla `eco_annotations` se crea con `supabase/eco_annotations.sql`.
- Si la tabla ya existía con los colores anteriores, ejecutá de nuevo el bloque de
  migración del final del archivo para habilitar `blue` y `rose`.
- RLS: cada usuario solo puede leer, crear, editar y borrar sus propias anotaciones.
- Las notas del buscador reutilizan `eco_annotations` con el `class_id` reservado
  `__notas_del_buscador__`. Sincronizan con la misma cuenta y las mismas políticas
  RLS, y no aparecen en el panel de anotaciones de las clases.
- La tabla `eco_feedback` y la tabla privada `eco_admins` se crean con
  `supabase/eco_feedback.sql`. Cualquier usuario autenticado puede enviar
  comentarios; solo las cuentas listadas en `eco_admins` pueden leerlos.
- Para habilitar la bandeja, después de ejecutar el SQL agregá tu cuenta:
  ```sql
  insert into public.eco_admins (user_id)
  select id from auth.users where lower(email) = lower('tu-correo@gmail.com')
  on conflict (user_id) do nothing;
  ```
- **Nunca** subir la `service_role key` ni tokens personales al repositorio.

## Material bibliográfico

La **guía de trabajos prácticos 2026** está integrada en `guia/` para que cada
tarjeta de práctica abra el ejercicio exacto. Los PDFs de clase, el libro y las
soluciones de parciales **no** se incluyen: quedan como referencias y cada
estudiante debe usar su propia copia.

## Deploy

El proyecto es estático: Vercel puede servirlo sin build.

```bash
vercel --prod
```

## Licencia

A definir por el autor.
