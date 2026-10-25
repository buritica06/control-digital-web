/**
 * Gestor de progreso de aprendizaje guiado con persistencia en localStorage.
 */

const STORAGE_KEY = 'mec36_semana02_progress';

const TOTAL_HITOS = 10;

export function initProgreso() {
  const data = cargarProgreso();
  actualizarUI(data);

  // Escuchar eventos de interacción para sumar progreso
  window.addEventListener('iub:hito-completado', (e) => {
    const { hitoId } = e.detail;
    registrarHito(hitoId);
  });
}

export function cargarProgreso() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('No se pudo acceder a localStorage:', e);
  }
  return { hitos: [], porcentaje: 0 };
}

export function registrarHito(hitoId) {
  const data = cargarProgreso();
  if (!data.hitos.includes(hitoId)) {
    data.hitos.push(hitoId);
    data.porcentaje = Math.min(100, Math.round((data.hitos.length / TOTAL_HITOS) * 100));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Error al guardar progreso:', e);
    }
    actualizarUI(data);
  }
}

export function reiniciarProgreso() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  actualizarUI({ hitos: [], porcentaje: 0 });
}

function actualizarUI(data) {
  const bar = document.getElementById('learningProgressBar');
  const text = document.getElementById('learningProgressText');
  const count = document.getElementById('learningProgressCount');

  if (bar) {
    if (window.gsap) {
      window.gsap.to(bar, { width: `${data.porcentaje}%`, duration: 0.5, ease: 'power2.out' });
    } else {
      bar.style.width = `${data.porcentaje}%`;
    }
  }

  if (text) {
    text.textContent = `${data.porcentaje}% Completado`;
  }

  if (count) {
    count.textContent = `${data.hitos.length} / ${TOTAL_HITOS} Hitos`;
  }

  // Marcar checkboxes o botones completados en la UI
  data.hitos.forEach(id => {
    const checkEl = document.querySelector(`[data-hito-id="${id}"]`);
    if (checkEl) {
      checkEl.classList.add('completed');
    }
  });
}
