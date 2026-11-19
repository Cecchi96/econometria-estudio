(() => {
  "use strict";

  // Las notas del buscador viven en la misma tabla privada que las anotaciones.
  // Se guardan con un class_id reservado para que nunca aparezcan mezcladas
  // con los subrayados de una clase.
  const CLASS_ID = "__notas_del_buscador__";
  const PREFIX = "term:";

  let mode = "local";

  function nowISO() {
    return new Date().toISOString();
  }

  function normalize(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
  }

  function termKey(term) {
    return normalize(term)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function newId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
      const random = Math.floor(Math.random() * 16);
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  function fromAnnotation(annotation) {
    return {
      id: annotation.id,
      term: annotation.quote || "",
      termKey: String(annotation.blockId || "").replace(PREFIX, ""),
      note: annotation.note || "",
      createdAt: annotation.createdAt || nowISO(),
      updatedAt: annotation.updatedAt || annotation.createdAt || nowISO()
    };
  }

  function toAnnotation(note) {
    const term = normalize(note.term);
    const key = note.termKey || termKey(term);
    return {
      id: note.id || newId(),
      classId: CLASS_ID,
      blockId: `${PREFIX}${key}`,
      start: 0,
      end: Math.max(1, term.length),
      quote: term,
      note: String(note.note || "").trim(),
      color: "yellow",
      createdAt: note.createdAt || nowISO(),
      updatedAt: nowISO()
    };
  }

  async function getAll() {
    if (!window.AnnotationStore) {
      mode = "memory";
      return [];
    }
    try {
      const rows = await window.AnnotationStore.getAll(CLASS_ID);
      mode = window.AnnotationStore.getMode();
      return rows.map(fromAnnotation).filter(note => note.term);
    } catch (error) {
      mode = "memory";
      return [];
    }
  }

  async function put(note) {
    const clean = {
      id: note.id || newId(),
      term: normalize(note.term),
      termKey: note.termKey || termKey(note.term),
      note: String(note.note || "").trim(),
      createdAt: note.createdAt || nowISO(),
      updatedAt: nowISO()
    };
    if (!clean.term || !clean.note) return clean;
    if (window.AnnotationStore) {
      await window.AnnotationStore.put(toAnnotation(clean));
      mode = window.AnnotationStore.getMode();
    }
    return clean;
  }

  async function remove(id) {
    if (window.AnnotationStore) {
      await window.AnnotationStore.remove(id);
      mode = window.AnnotationStore.getMode();
    }
  }

  window.TermStore = {
    getAll,
    put,
    remove,
    termKey,
    newId,
    getMode: () => mode
  };
})();
