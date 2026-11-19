# Handoff — Econometría I

## Estado actual

- **Clase 1 completa:** teoría, conceptos, práctica, laboratorio de lectura de R, autoevaluación, kit de repaso con formulario, drill y plan de 7 días.
- **Clases 2A y 2B completas:** regresión múltiple, efectos parciales, Frisch-Waugh, sesgo por omisión, multicolinealidad, álgebra matricial, práctica con laboratorio de R, autoevaluación y kit de repaso.
- **Clases 3A y 3B completas:** 3A cubre inferencia sobre un parámetro (MLC, t, valor p, potencia e intervalos); 3B cubre combinaciones lineales, F, LM, normalidad asintótica y consistencia. Ambas con práctica, laboratorio de R sobre WAGE2 y kit de repaso.
- **Clases 4A y 4B completas:** 4A cubre escala, coeficientes beta, formas funcionales, logaritmos y cuadráticas; 4B cubre selección de modelos, AIC/BIC, RESET, sesgos de especificación y predicción promedio e individual. Ambas con práctica, laboratorio de R y kit de repaso.
- **Visualizaciones interactivas en clases 1 a 10:** curva de la SCR, sesgo por omisión, FIV y precisión, distribuciones t y F, familia de formas funcionales, cuadrática y efecto marginal, bandas de predicción, dummies y composición, heterocedasticidad, tendencia y estacionalidad, AR(1), proxy y MC2E con instrumentos débiles.
- **Clases 5 a 10 completas:** variables ficticias, heterocedasticidad, series de tiempo, autocorrelación, endogeneidad y variables instrumentales, y MC2E. Cada una con práctica, laboratorio de R y kit de repaso.
- **Mejoras de comprensión:** cada ficha de concepto incluye una explicación en palabras simples; las fichas que lo admiten tienen pestaña de visualización interactiva; cada clase suma una sección de profundización; las fórmulas del repaso se despliegan con información ampliada y se pueden comentar.
- **Anotaciones ampliadas:** se puede subrayar o comentar en cualquier pestaña, incluidos títulos, fórmulas, tarjetas, tablas y fuentes. Hay cuatro colores (amarillo, verde, celeste y rosa) y la selección funciona también con eventos táctiles en tablet y celular.
- **Comentarios:** botón flotante en el cuaderno y bandeja privada en `feedback.html`, con filtros, búsqueda y estado resuelto.
- **Buscador global:** atajo `Ctrl/Cmd + K`, índice de las 13 clases y búsqueda por concepto, palabra o fórmula. Si el concepto ya tiene ficha, la muestra primero; si no, lista todas las menciones con enlace a la clase, pestaña y fragmento. Cada término admite una nota propia, editable y sincronizada.
- **App live:** https://econometria-estudio.vercel.app
- **Hub Fukuro:** https://fukuro-sable.vercel.app (tile “Econometría I”)
- **Repo público:** https://github.com/Cecchi96/econometria-estudio

## Arquitectura

- Sitio estático: HTML + CSS + JavaScript, sin framework.
- `storage.js` reutiliza el login y el cliente Supabase de Fukuro.
- `assets/store.js` usa Supabase si existe `window.storage`; si no, IndexedDB/localStorage.
- `content/clase-01.js`, `content/clase-02a.js`, `content/clase-02b.js`, `content/clase-03a.js`, `content/clase-03b.js`, `content/clase-04a.js`, `content/clase-04b.js`, `content/clase-05.js`, `content/clase-06.js`, `content/clase-07.js`, `content/clase-08.js`, `content/clase-09.js` y `content/clase-10.js` contienen el contenido de las clases disponibles.
- `guia/Guía-TP-Eco-I-2026.html` es la guía de TP integrada, con enlaces profundos por ejercicio.
- `assets/app.js` renderiza, navega y maneja conceptos, anotaciones globales, gráfico, laboratorios de R y kit de fórmulas.
- `assets/viz.js` monta las visualizaciones interactivas; `assets/viz.css` contiene sus estilos. El contenido las invoca con bloques `{ type: "interactive", kind, title, intro, hint }` o con el campo `viz` de una ficha de concepto.
- `assets/feedback.js` y `assets/feedback.css` agregan el botón flotante y el formulario de comentarios.
- `assets/search.js` construye un índice de conceptos, teoría, práctica, autoevaluación, repaso y fuentes; maneja el modal, el resaltado y la navegación a cada mención. `assets/search.css` contiene sus estilos.
- `assets/termstore.js` guarda las notas del buscador reutilizando `eco_annotations` con el `class_id` reservado `__notas_del_buscador__`, sin tabla nueva.
- `feedback.html` + `assets/feedback-admin.js` son la bandeja privada del administrador.
- `docs/MEJORAS-CONTENIDO.md` documenta los campos `simple`, `viz`, `vizIntro`, `vizHint`, `more` y la sección de profundización.
- `supabase/eco_annotations.sql` documenta la tabla y las políticas RLS. La migración de colores está al final del archivo.
- `supabase/eco_feedback.sql` define `eco_feedback`, `eco_admins`, `eco_is_admin()` y sus políticas RLS.

## Supabase

- Proyecto: `guknbhqonmpjtcbjsbni` (`fukuro`).
- Tablas: `public.eco_annotations` y `public.eco_feedback`.
- Tabla privada `public.eco_admins`: solo esas cuentas leen la bandeja de comentarios.
- RLS: cada usuario solo ve, crea, edita y borra sus propias anotaciones; los comentarios los lee únicamente el administrador.
- Las notas del buscador usan `eco_annotations` con `class_id = '__notas_del_buscador__'` y `block_id = 'term:<clave>'`. No requieren SQL adicional y no se mezclan con las anotaciones de las clases.
- Login: email + contraseña, reutilizando el modal de Fukuro.
- La publishable key está en `storage.js`; es pública por diseño. Nunca subir `service_role`.
- Para habilitar la bandeja: ejecutar `supabase/eco_feedback.sql` y después insertar la cuenta administradora:
  ```sql
  insert into public.eco_admins (user_id)
  select id from auth.users where lower(email) = lower('tu-correo@gmail.com')
  on conflict (user_id) do nothing;
  ```

## Decisiones tomadas

- Anotaciones **privadas por usuario**.
- Comentarios **visibles solo para el administrador**. Se descartó el aviso por email para no agregar un servicio externo; la bandeja es la fuente de verdad.
- La clase 3 se dividió en **03A** (inferencia sobre un parámetro) y **03B** (restricciones, F, LM y asintótica) para separar la práctica individual de los contrastes conjuntos.
- La clase 4 se dividió en **04A** (escala, beta, formas funcionales y cuadráticas) y **04B** (selección de modelos, RESET, sesgos y predicción) por la misma razón: cada parte tiene su propio laboratorio y su propio kit de repaso.
- **No se publican PDFs de clase, libro ni parciales**: solo referencias bibliográficas.
- **La guía de TP 2026 sí está integrada y publicada** en `guia/` para enlazar cada ejercicio desde la práctica. Decisión revisada y aprobada por el autor.
- La app es un **repo público separado** para no exponer el hub personal de Fukuro.
- Deploy en Vercel como proyecto independiente; el hub enlaza a la app.
- Modo noche y responsive.

## Pendientes

1. Ejecutar `supabase/eco_feedback.sql` y registrar la cuenta administradora en
   `eco_admins` para habilitar la bandeja de comentarios. Sin ese paso, el botón
   flotante muestra un aviso de configuración y `feedback.html` no deja entrar.
2. Probar con una cuenta de compañero:
   - que no vea las anotaciones del dueño;
   - que pueda crear, recargar y borrar las propias;
   - que pueda enviar un comentario y que no pueda abrir la bandeja.
3. Definir política de registros:
   - dejar “Allow new users to sign up” abierto, o
   - cerrarlo y crear cuentas manualmente / usar allowlist.
4. Ejecutar en Supabase la migración de `supabase/eco_annotations.sql` para habilitar
   los colores `blue` y `rose` (si no se ejecuta, esas anotaciones se guardan solo
   en el dispositivo).
5. Probar el buscador con una cuenta de compañero: búsqueda por concepto, salto a
   una mención de otra clase y nota por término sincronizada entre dos dispositivos.
6. Revisar la consistencia global de las 13 unidades y actualizar las capturas del README.
7. Opcional: dominio propio, capturas para el README, licencia.

## Cómo trabajar

- Fuente canónica de la app: esta carpeta (`econometria-estudio`).
- Fuentes de la cátedra: `C:\Users\sdcec\OneDrive\Documentos\Lic Economia\Econometria\web app\fuentes`.
- Copia de desarrollo local: `web app\sitio` (desactualizada; no usar como fuente).
- Si se actualiza la guía original de `fuentes/ejericios/`, volver a copiarla a `guia/` y conservar el script de hash al final del HTML.
- Servidor local:
  ```bash
  python -m http.server 8000
  ```
  Abrir `http://localhost:8000/`. El login de Supabase puede pedir credenciales.
- Deploy:
  ```bash
  vercel --prod --yes
  ```
- Para agregar una clase: crear `content/clase-0X.js` (o `clase-0Xa.js` / `clase-0Xb.js` si se parte), registrarla en `content/indice.js`, agregar el `<script>` en `index.html` y marcar `available: true`. El brief de contenido y tono está en `docs/BRIEF-CLASES.md`.

## Notas

- No hay tokens ni `.env` en el repo público.
- El token read-only de Supabase quedó en `Fukuro/.env.supabase.txt`, fuera de este repo.
- El material bibliográfico no se incluye en el sitio por derechos de autor.
- Las anotaciones se guardan por `class_id`: las que hubiera con `clase-03` no se reasignan automáticamente a 03A/03B.
- Los comentarios guardan `page_class` y `page_tab` para saber desde qué sección se escribieron. El correo y el `user_id` los completa la base desde la sesión, no el navegador.
- Las notas del buscador se guardan como anotaciones con `class_id = '__notas_del_buscador__'`; por eso no aparecen en “Anotaciones” ni cuentan en el contador de la clase.
- El botón flotante solo aparece en el cuaderno (`index.html`), no en la guía de TP ni en la bandeja.
