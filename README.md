# Econometría I · Cuaderno de estudio

Sitio de estudio para Econometría I, desarrollado como una aplicación estática con autenticación y anotaciones privadas por usuario en Supabase.

## Estado

- **Clase 1 completa:** teoría, conceptos, práctica, autoevaluación, repaso y fuentes.
- **Clases 2 a 10:** estructura y navegación listas, contenido pendiente.
- **Anotaciones:** se guardan en Supabase y son privadas para cada cuenta.
- **Modo noche:** persistente y responsive.

## Funcionalidades

- Navegación por las 10 clases.
- Barra lateral de conceptos con definición, ejemplo, errores, conexiones y fuentes.
- Gráfico interactivo de MCO con sliders de β₀ y β₁, residuos, SCR y R² en vivo.
- Selección de texto para subrayar o comentar.
- Panel de anotaciones con filtros, edición, borrado y “volver al fragmento”.
- Autoevaluación con 10 preguntas de razonamiento.
- Sesión de 90 minutos y plan de repaso de 7 días.
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
supabase/
  eco_annotations.sql   tabla, índices y políticas RLS
```

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

El sitio **no incluye** PDFs, libros, guías ni parciales. Solo muestra referencias bibliográficas y consignas generales. Cada estudiante debe usar su propia copia de los materiales de la cátedra.

## Deploy

El proyecto es estático: Vercel puede servirlo sin build.

```bash
vercel --prod
```

## Licencia

A definir por el autor.
