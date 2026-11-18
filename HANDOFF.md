# Handoff — Econometría I

## Estado actual

- **Clase 1 completa:** teoría, conceptos, práctica, laboratorio de lectura de R, autoevaluación, kit de repaso con formulario, drill y plan de 7 días.
- **Clases 2 a 10:** navegación y placeholders listos, contenido pendiente.
- **App live:** https://econometria-estudio.vercel.app
- **Hub Fukuro:** https://fukuro-sable.vercel.app (tile “Econometría I”)
- **Repo público:** https://github.com/Cecchi96/econometria-estudio

## Arquitectura

- Sitio estático: HTML + CSS + JavaScript, sin framework.
- `storage.js` reutiliza el login y el cliente Supabase de Fukuro.
- `assets/store.js` usa Supabase si existe `window.storage`; si no, IndexedDB/localStorage.
- `content/clase-01.js` contiene todo el contenido de la clase 1.
- `assets/app.js` renderiza, navega y maneja conceptos, anotaciones y gráfico.
- `supabase/eco_annotations.sql` documenta la tabla y las políticas RLS.

## Supabase

- Proyecto: `guknbhqonmpjtcbjsbni` (`fukuro`).
- Tabla: `public.eco_annotations`.
- RLS: cada usuario solo ve, crea, edita y borra sus propias anotaciones.
- Login: email + contraseña, reutilizando el modal de Fukuro.
- La publishable key está en `storage.js`; es pública por diseño. Nunca subir `service_role`.

## Decisiones tomadas

- Anotaciones **privadas por usuario**.
- **No se publican PDFs, libros, guías ni parciales**: solo referencias bibliográficas.
- La app es un **repo público separado** para no exponer el hub personal de Fukuro.
- Deploy en Vercel como proyecto independiente; el hub enlaza a la app.
- Modo noche y responsive.

## Pendientes

1. Probar con una cuenta de compañero:
   - que no vea las anotaciones del dueño;
   - que pueda crear, recargar y borrar las propias.
2. Definir política de registros:
   - dejar “Allow new users to sign up” abierto, o
   - cerrarlo y crear cuentas manualmente / usar allowlist.
3. Continuar con **clase 2A y 2B: regresión múltiple**.
4. Opcional: dominio propio, capturas para el README, licencia.

## Cómo trabajar

- Fuente canónica de la app: esta carpeta (`econometria-estudio`).
- Fuentes de la cátedra: `C:\Users\sdcec\OneDrive\Documentos\Lic Economia\Econometria\web app\fuentes`.
- Copia de desarrollo local: `web app\sitio` (puede estar desactualizada).
- Servidor local:
  ```bash
  python -m http.server 8000
  ```
  Abrir `http://localhost:8000/`. El login de Supabase puede pedir credenciales.
- Deploy:
  ```bash
  vercel --prod --yes
  ```
- Para agregar una clase: crear `content/clase-02.js`, registrarla en `content/indice.js`, agregar el `<script>` en `index.html` y marcar `available: true`.

## Notas

- No hay tokens ni `.env` en el repo público.
- El token read-only de Supabase quedó en `Fukuro/.env.supabase.txt`, fuera de este repo.
- El material bibliográfico no se incluye en el sitio por derechos de autor.
