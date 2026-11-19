# Econometría I · Cuaderno de estudio

Sitio de estudio para Econometría I, desarrollado como una aplicación estática con autenticación y anotaciones privadas por usuario en Supabase.

## Estado

- **Clase 1 completa:** teoría, conceptos, práctica con laboratorio de R, autoevaluación y kit de repaso.
- **Clases 2A y 2B completas:** regresión múltiple, efectos parciales, multicolinealidad y álgebra matricial, con práctica, laboratorio de R y kit de repaso.
- **Clase 3 completa:** inferencia, MLC, t, F, intervalos, LM y consistencia, con práctica, laboratorio de R y kit de repaso.
- **Clases 4 a 10:** estructura y navegación listas, contenido pendiente.
- **Anotaciones:** se guardan en Supabase y son privadas para cada cuenta.
- **Modo noche:** persistente y responsive.

## Funcionalidades

- Navegación por las clases del curso (clase 2 dividida en 2A y 2B).
- Barra lateral de conceptos con definición, ejemplo, errores, conexiones y fuentes.
- Gráfico interactivo de MCO con sliders de β₀ y β₁, residuos, SCR y R² en vivo.
- Laboratorios de lectura de salidas de R para las clases 1, 2A, 2B y 3.
- Selección de texto para subrayar o comentar.
- Panel de anotaciones con filtros, edición, borrado y “volver al fragmento”.
- Autoevaluación con preguntas de razonamiento.
- Formulario, drill de fórmulas, sesión de 90 minutos y plan de repaso de 7 días.
- Guía de trabajos prácticos integrada con enlaces directos a cada ejercicio.
- Modo claro/oscuro y diseño responsive.

## Stack

- HTML, CSS y JavaScript sin framework.
- Supabase Auth + Postgres + Row Level Security.
- Vercel para el deploy estático.
- `storage.js` reutiliza el login y el cliente de Supabase del proyecto Fukuro.

## Estructura

```text
index.html              shell de la aplicación
storage.js              login y cliente de Supabase
assets/
  styles.css            design system y modo noche
  app.js                render, navegación, conceptos, anotaciones y gráfico
  store.js              adaptador Supabase + fallback local
content/
  indice.js             lista de clases
  clase-01.js           contenido de la clase 1
  clase-02a.js          regresión múltiple, parte 1
  clase-02b.js          regresión múltiple, parte 2
  clase-03.js           inferencia
guia/
  Guía-TP-Eco-I-2026.html   guía de trabajos prácticos integrada
supabase/
  eco_annotations.sql   tabla, índices y políticas RLS
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
- RLS: cada usuario solo puede leer, crear, editar y borrar sus propias anotaciones.
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
