/**
 * Helpers y utilidades para escenas Three.js.
 * Garantiza ciclo de vida limpio, liberación de memoria y detección WebGL.
 */

export const IUB_COLORS = {
  oscuro: 0x121023,
  amarillo: 0xffdf2d,
  azulClaro: 0x00ade7,
  verde: 0x3b9c6d,
  naranja: 0xe39037,
  coral: 0xf87171,
  blanco: 0xffffff,
  grid: 0x2f2a54,
  gridSubtle: 0x1a1732,
};

/**
 * Detecta disponibilidad de WebGL 1 o 2
 */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch (e) {
    return false;
  }
}

/**
 * Libera de forma recursiva geometrías, materiales y texturas de un objeto Three.js
 */
export function disposeHierarchy(obj) {
  if (!obj) return;

  obj.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => disposeMaterial(mat));
      } else {
        disposeMaterial(child.material);
      }
    }
  });
}

function disposeMaterial(mat) {
  if (!mat) return;
  // Disponer mapas y texturas
  for (const key of Object.keys(mat)) {
    const value = mat[key];
    if (value && typeof value === 'object' && typeof value.dispose === 'function') {
      value.dispose();
    }
  }
  mat.dispose();
}

/**
 * Configura un ResizeObserver con debounce
 */
export function setupResizeObserver(container, onResize, debounceMs = 100) {
  let timeoutId = null;
  const observer = new ResizeObserver((entries) => {
    if (!entries.length) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onResize(container.clientWidth, container.clientHeight);
    }, debounceMs);
  });
  observer.observe(container);
  return observer;
}

/**
 * Configura un IntersectionObserver para pausar el render loop cuando no es visible
 */
export function setupVisibilityObserver(container, onVisibleChange) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        onVisibleChange(entry.isIntersecting);
      });
    },
    { threshold: 0.05 }
  );
  observer.observe(container);
  return observer;
}
