/**
 * Macros y utilidades para renderizado KaTeX accesible y reactivo.
 */

export const KATEX_MACROS = {
  '\\Ztransform': '\\mathcal{Z}',
  '\\Laplace': '\\mathcal{L}',
  '\\ROC': '\\text{ROC}',
  '\\ejw': 'e^{j\\omega T}',
  '\\pole': '\\times',
  '\\zero': '\\circ',
  '\\ztransf': '\\xrightarrow{\\mathcal{Z}}',
  '\\invz': '\\mathcal{Z}^{-1}',
};

/**
 * Renderiza una fórmula KaTeX en un elemento HTML dado
 * @param {HTMLElement|string} target - Elemento o selector
 * @param {string} latex - Cadena de LaTeX a renderizar
 * @param {boolean} displayMode - Modo bloque (true) o inline (false)
 */
export function renderMath(target, latex, displayMode = false) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (typeof window !== 'undefined' && window.katex) {
    try {
      window.katex.render(latex, el, {
        displayMode,
        throwOnError: false,
        macros: KATEX_MACROS,
      });
    } catch (e) {
      el.textContent = latex;
    }
  } else {
    el.textContent = latex;
  }
}

/**
 * Auto-renderiza todas las expresiones matemáticas en un contenedor
 */
export function renderAllMath(container = document.body) {
  const tryRender = () => {
    if (typeof window !== 'undefined' && window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
        macros: KATEX_MACROS,
      });
      return true;
    }
    return false;
  };

  if (!tryRender()) {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', tryRender);
      setTimeout(tryRender, 250);
      setTimeout(tryRender, 800);
    }
  }
}
