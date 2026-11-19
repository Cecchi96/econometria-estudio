/*
 * feedback.js — botón flotante y formulario de comentarios.
 *
 * Carga en index.html después de app.js. Guarda en la tabla eco_feedback
 * de Supabase (ver supabase/eco_feedback.sql). El correo y el user_id los
 * completa la base a partir de la sesión, nunca el navegador.
 */
(() => {
  "use strict";

  const MAX_LENGTH = 2000;
  const TIMEOUT_MS = 15000;

  const state = {
    busy: false,
    isAdmin: false,
    sent: false
  };

  const els = {};

  function mount() {
    const root = document.createElement("div");
    root.className = "fb-root";
    root.innerHTML = `
      <div class="fb-scrim" id="fbScrim" hidden></div>

      <button class="fb-fab" id="fbFab" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="fbPanel" aria-label="Comentarios y sugerencias" title="Comentarios y sugerencias">
        <svg class="fb-fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.8 8.8 0 0 1-3.2-.6L4 21l1.4-4.2a8.1 8.1 0 0 1-1.4-4.5A8.4 8.4 0 0 1 12.5 4 8.4 8.4 0 0 1 21 11.5Z"/>
          <path d="M8.5 10.5h7M8.5 13.5h4.5"/>
        </svg>
        <span class="fb-fab-text">Comentarios</span>
        <span class="fb-fab-close" aria-hidden="true">×</span>
      </button>

      <section class="fb-panel" id="fbPanel" role="dialog" aria-modal="true" aria-labelledby="fbTitle" hidden>
        <button class="fb-close" id="fbClose" type="button" aria-label="Cerrar">×</button>

        <div class="fb-view" id="fbFormView">
          <div class="fb-eyebrow">Tu opinión</div>
          <h2 id="fbTitle">Comentarios y sugerencias</h2>
          <p class="fb-intro">Contame qué mejorarías, qué no se entiende o qué te gustaría encontrar en el cuaderno.</p>

          <label class="fb-label" for="fbMessage">Tu comentario</label>
          <textarea class="fb-textarea" id="fbMessage" maxlength="${MAX_LENGTH}" rows="5" placeholder="Ej.: en la clase 5 no me quedó claro cómo interpretar la dummy de interacción…"></textarea>

          <div class="fb-meta">
            <span class="fb-context" id="fbContext"></span>
            <span class="fb-count" id="fbCount">0 / ${MAX_LENGTH}</span>
          </div>

          <div class="fb-error" id="fbError" role="alert" hidden></div>

          <div class="fb-actions">
            <span class="fb-note" id="fbIdentity">Se envía junto con tu correo.</span>
            <button class="fb-send" id="fbSend" type="button">Enviar comentario</button>
          </div>

          <a class="fb-admin-link" id="fbAdminLink" href="feedback.html" hidden>Ver todos los comentarios →</a>
        </div>

        <div class="fb-view fb-success" id="fbSuccessView" hidden>
          <div class="fb-check" aria-hidden="true">✓</div>
          <h2 id="fbSuccessTitle" tabindex="-1">¡Gracias!</h2>
          <p>Tu comentario quedó guardado. Lo voy a leer y tener en cuenta.</p>
          <div class="fb-success-actions">
            <button class="fb-send" id="fbAnother" type="button">Enviar otro</button>
            <button class="fb-ghost" id="fbSuccessClose" type="button">Cerrar</button>
          </div>
        </div>
      </section>
    `;
    document.body.appendChild(root);

    els.root = root;
    els.fab = root.querySelector("#fbFab");
    els.panel = root.querySelector("#fbPanel");
    els.scrim = root.querySelector("#fbScrim");
    els.close = root.querySelector("#fbClose");
    els.formView = root.querySelector("#fbFormView");
    els.successView = root.querySelector("#fbSuccessView");
    els.textarea = root.querySelector("#fbMessage");
    els.count = root.querySelector("#fbCount");
    els.context = root.querySelector("#fbContext");
    els.error = root.querySelector("#fbError");
    els.send = root.querySelector("#fbSend");
    els.identity = root.querySelector("#fbIdentity");
    els.adminLink = root.querySelector("#fbAdminLink");
    els.another = root.querySelector("#fbAnother");
    els.successClose = root.querySelector("#fbSuccessClose");

    els.fab.addEventListener("click", () => {
      if (document.body.classList.contains("fb-open")) close();
      else open();
    });
    els.close.addEventListener("click", close);
    els.scrim.addEventListener("click", close);
    els.send.addEventListener("click", send);
    els.another.addEventListener("click", resetForm);
    els.successClose.addEventListener("click", close);
    els.textarea.addEventListener("input", updateCount);
    els.textarea.addEventListener("keydown", event => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        send();
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && document.body.classList.contains("fb-open")) {
        close();
      }
    });
    window.addEventListener("hashchange", () => {
      if (document.body.classList.contains("fb-open")) close();
    });

    detectAdmin();
  }

  function open() {
    document.body.classList.add("fb-open");
    els.panel.hidden = false;
    els.scrim.hidden = false;
    els.fab.setAttribute("aria-expanded", "true");
    els.fab.classList.add("is-open");

    if (state.sent) resetForm();

    const context = pageContext();
    els.context.textContent = context.label;
    els.textarea.focus();
  }

  function close() {
    document.body.classList.remove("fb-open");
    els.panel.hidden = true;
    els.scrim.hidden = true;
    els.fab.setAttribute("aria-expanded", "false");
    els.fab.classList.remove("is-open");
    els.fab.focus();
  }

  function resetForm() {
    state.sent = false;
    els.textarea.value = "";
    updateCount();
    hideError();
    els.formView.hidden = false;
    els.successView.hidden = true;
    if (document.body.classList.contains("fb-open")) els.textarea.focus();
  }

  function updateCount() {
    els.count.textContent = `${els.textarea.value.length} / ${MAX_LENGTH}`;
  }

  function pageContext() {
    const activeLink = document.querySelector("[data-class-id].active");
    const id = (activeLink && activeLink.dataset.classId) ||
      location.hash.replace(/^#\/?/, "").trim();
    const classes = window.CLASE_INDICE || [];
    const meta = classes.find(item => item.id === id);
    const activeTab = document.querySelector(".tab.active");
    const tab = activeTab ? activeTab.textContent.trim() : "";

    if (meta) {
      return {
        page_class: meta.id,
        page_tab: tab,
        label: `Clase ${meta.num}${tab ? ` · ${tab}` : ""}`
      };
    }

    return {
      page_class: "",
      page_tab: tab,
      label: tab ? `Cuaderno · ${tab}` : "Cuaderno de estudio"
    };
  }

  async function send() {
    if (state.busy) return;

    const message = els.textarea.value.trim();
    if (!message) {
      showError("Escribí un comentario antes de enviar.");
      els.textarea.focus();
      return;
    }

    const context = pageContext();
    const payload = {
      message,
      page_class: context.page_class,
      page_tab: context.page_tab,
      page_url: location.href.slice(0, 400),
      user_agent: navigator.userAgent.slice(0, 400)
    };

    state.busy = true;
    setBusy(true);
    hideError();

    try {
      await withTimeout(insertFeedback(payload), TIMEOUT_MS);
      state.sent = true;
      els.formView.hidden = true;
      els.successView.hidden = false;
      const title = els.successView.querySelector("h2");
      if (title) title.focus();
    } catch (error) {
      console.error("[feedback] no se pudo enviar:", (error && error.message) || error);
      showError(explain(error));
    } finally {
      state.busy = false;
      setBusy(false);
    }
  }

  async function insertFeedback(payload) {
    if (!window.storage || typeof window.storage.table !== "function") {
      throw new Error("storage-unavailable");
    }
    const query = await window.storage.table("eco_feedback");
    const { error } = await query.insert(payload);
    if (error) throw error;
  }

  function withTimeout(promise, ms) {
    let timer;
    const timeout = new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error("timeout")), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
  }

  function setBusy(busy) {
    els.send.disabled = busy;
    els.send.textContent = busy ? "Enviando…" : "Enviar comentario";
    els.textarea.readOnly = busy;
  }

  function showError(message) {
    els.error.textContent = message;
    els.error.hidden = false;
  }

  function hideError() {
    els.error.hidden = true;
    els.error.textContent = "";
  }

  function explain(error) {
    const message = String((error && (error.message || error.details)) || error || "");
    if (/does not exist|PGRST205|could not find the table|schema cache/i.test(message)) {
      return "La bandeja de comentarios todavía no está configurada. Falta ejecutar supabase/eco_feedback.sql en Supabase.";
    }
    if (/row-level security|permission denied|jwt|not authenticated/i.test(message)) {
      return "No se pudo validar tu sesión. Recargá la página e iniciá sesión de nuevo.";
    }
    if (/timeout/i.test(message)) {
      return "La conexión está tardando demasiado. Probá de nuevo en unos segundos.";
    }
    if (/storage-unavailable/i.test(message)) {
      return "No hay conexión con el almacenamiento. Recargá la página.";
    }
    return "No se pudo enviar el comentario. Probá de nuevo en unos segundos.";
  }

  async function detectAdmin() {
    try {
      const isAdmin = await withTimeout(window.storage.rpc("eco_is_admin"), 20000);
      state.isAdmin = isAdmin === true;
    } catch (error) {
      state.isAdmin = false;
    }

    if (!state.isAdmin) return;

    els.adminLink.hidden = false;
    els.identity.textContent = "Estás viendo el cuaderno como administrador.";
    const sidebarLink = document.getElementById("feedbackInboxLink");
    if (sidebarLink) sidebarLink.hidden = false;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
