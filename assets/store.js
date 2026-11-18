(() => {
  "use strict";

  const DB_NAME = "econometria-estudio";
  const DB_VERSION = 1;
  const STORE_NAME = "annotations";
  const LS_KEY = "eco-annotations-v1";

  let dbPromise = null;
  let mode = "indexeddb";
  const memory = new Map();

  function remoteAvailable() {
    return Boolean(
      window.storage &&
      typeof window.storage.table === "function" &&
      window.fukuro &&
      window.fukuro.ready
    );
  }

  async function remoteClient() {
    if (!remoteAvailable()) return null;
    try {
      await window.fukuro.ready;
      return window.storage;
    } catch (error) {
      console.error("[annotations] No se pudo iniciar sesión en Supabase.", error);
      return null;
    }
  }

  function fromRemote(row) {
    return {
      id: row.id,
      classId: row.class_id,
      blockId: row.block_id,
      start: row.start_offset,
      end: row.end_offset,
      quote: row.quote,
      note: row.note || "",
      color: row.color || "yellow",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  function toRemote(annotation) {
    return {
      id: annotation.id,
      class_id: annotation.classId,
      block_id: annotation.blockId,
      start_offset: annotation.start,
      end_offset: annotation.end,
      quote: annotation.quote,
      note: annotation.note || "",
      color: annotation.color || "yellow",
      created_at: annotation.createdAt,
      updated_at: annotation.updatedAt
    };
  }

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("indexeddb-unavailable"));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("classId", "classId", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("indexeddb-open-failed"));
    });
    return dbPromise;
  }

  function readLocal() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch (error) {
      return [];
    }
  }

  function writeLocal(items) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
      return true;
    } catch (error) {
      return false;
    }
  }

  async function getAllLocal(classId) {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const index = tx.objectStore(STORE_NAME).index("classId");
        const request = index.getAll(classId);
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      const local = readLocal();
      if (local.length) {
        mode = "localstorage";
        return local.filter(item => item.classId === classId);
      }
      mode = "memory";
      return [...memory.values()].filter(item => item.classId === classId);
    }
  }

  async function putLocal(annotation) {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(annotation);
        tx.oncomplete = () => resolve(annotation);
        tx.onerror = () => reject(tx.error);
      });
    } catch (error) {
      const local = readLocal();
      const index = local.findIndex(item => item.id === annotation.id);
      if (index >= 0) local[index] = annotation;
      else local.push(annotation);
      if (writeLocal(local)) {
        if (mode !== "supabase-error") mode = "localstorage";
      } else {
        mode = "memory";
        memory.set(annotation.id, annotation);
      }
      return annotation;
    }
  }

  async function removeLocal(id) {
    try {
      const db = await openDB();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (error) {
      const local = readLocal().filter(item => item.id !== id);
      if (writeLocal(local)) {
        if (mode !== "supabase-error") mode = "localstorage";
      } else {
        mode = "memory";
        memory.delete(id);
      }
    }
  }

  async function getAll(classId) {
    const storage = await remoteClient();
    if (storage) {
      try {
        const query = await storage.table("eco_annotations");
        const { data, error } = await query
          .select("*")
          .eq("class_id", classId)
          .order("created_at", { ascending: false });
        if (error) throw error;
        mode = "supabase";
        return (data || []).map(fromRemote);
      } catch (error) {
        console.error("[annotations] Supabase falló; se usa el almacenamiento local.", error);
        mode = "supabase-error";
      }
    }
    return getAllLocal(classId);
  }

  async function put(annotation) {
    const storage = await remoteClient();
    if (storage) {
      try {
        const query = await storage.table("eco_annotations");
        const { error } = await query.upsert(toRemote(annotation), { onConflict: "id" });
        if (error) throw error;
        mode = "supabase";
        return annotation;
      } catch (error) {
        console.error("[annotations] No se pudo guardar en Supabase; se guarda localmente.", error);
        mode = "supabase-error";
      }
    }
    return putLocal(annotation);
  }

  async function remove(id) {
    const storage = await remoteClient();
    if (storage) {
      try {
        const query = await storage.table("eco_annotations");
        const { error } = await query.delete().eq("id", id);
        if (error) throw error;
        mode = "supabase";
        return;
      } catch (error) {
        console.error("[annotations] No se pudo borrar en Supabase; se borra localmente.", error);
        mode = "supabase-error";
      }
    }
    return removeLocal(id);
  }

  window.AnnotationStore = {
    getAll,
    put,
    remove,
    getMode: () => mode,
    isRemote: remoteAvailable
  };
})();
