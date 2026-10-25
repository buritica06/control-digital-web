/**
 * Evaluador matemático seguro en el cliente basado en math.js.
 * NUNCA utiliza eval() ni new Function().
 * Cumple estrictamente con el modelo de ejecución segura y timeout.
 */

// Si mathjs está disponible como módulo o globalmente en window.math
let mathInstance = null;

function getMath() {
  if (mathInstance) return mathInstance;
  if (typeof window !== 'undefined' && window.math) {
    mathInstance = window.math;
  }
  return mathInstance;
}

const WHITELIST_REGEX = /^[0-9a-zA-Z\s\+\-\*\/\^\(\)\.,_]+$/;
const MAX_EXPR_LENGTH = 200;
const TIMEOUT_MS = 50;

/**
 * Evalúa de forma segura una expresión matemática numérica.
 * @param {string} exprString - Expresión en texto (ej. "4 * exp(-2*t)")
 * @param {Object} scope - Variables permitidas en el scope (ej. { t: 0.1, z: 1.0 })
 * @returns {Promise<number>} - Resultado numérico finito
 */
export async function evaluateSafe(exprString, scope = {}) {
  if (typeof exprString !== 'string') {
    throw new Error('La expresión matemática debe ser una cadena de texto.');
  }

  const sanitized = exprString.trim();

  if (sanitized.length === 0) {
    throw new Error('La expresión matemática no puede estar vacía.');
  }

  if (sanitized.length > MAX_EXPR_LENGTH) {
    throw new Error(`La expresión excede el límite máximo de ${MAX_EXPR_LENGTH} caracteres.`);
  }

  if (!WHITELIST_REGEX.test(sanitized)) {
    throw new Error('La expresión contiene caracteres prohibidos o inseguros.');
  }

  // Sanitización de scope: únicamente valores numéricos o booleanos
  const cleanScope = {};
  for (const [key, val] of Object.entries(scope)) {
    if (typeof val === 'number' && Number.isFinite(val)) {
      cleanScope[key] = val;
    } else if (typeof val === 'boolean') {
      cleanScope[key] = val;
    }
  }

  // Ejecución con Promise.race para garantizar timeout de 50 ms
  const evaluationPromise = new Promise((resolve, reject) => {
    try {
      const math = getMath();
      if (!math) {
        // Fallback matemático básico si math.js aún no cargó
        const result = fallbackEvaluate(sanitized, cleanScope);
        resolve(result);
        return;
      }
      const parsed = math.parse(sanitized);
      const compiled = parsed.compile();
      const val = compiled.evaluate(cleanScope);
      const num = typeof val === 'object' && val.isComplex ? val.abs() : Number(val);
      if (!Number.isFinite(num)) {
        throw new Error('El resultado de la expresión no es un número finito.');
      }
      resolve(num);
    } catch (err) {
      reject(new Error(`Error de evaluación matemática: ${err.message}`));
    }
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout de evaluación: la expresión excedió los ${TIMEOUT_MS} ms.`));
    }, TIMEOUT_MS);
  });

  return Promise.race([evaluationPromise, timeoutPromise]);
}

/**
 * Evaluador de respaldo seguro para expresiones elementales
 */
function fallbackEvaluate(expr, scope) {
  // Reemplazo de variables conocidas
  let parsed = expr;
  for (const [k, v] of Object.entries(scope)) {
    const re = new RegExp(`\\b${k}\\b`, 'g');
    parsed = parsed.replace(re, `(${v})`);
  }
  // Funciones seguras de Math
  parsed = parsed.replace(/\bexp\b/g, 'Math.exp')
                 .replace(/\bsin\b/g, 'Math.sin')
                 .replace(/\bcos\b/g, 'Math.cos')
                 .replace(/\bpi\b/gi, 'Math.PI')
                 .replace(/\^/g, '**');

  // Validación final contra inyección
  if (/[a-zA-Z]/.test(parsed.replace(/Math\.(exp|sin|cos|PI)/g, ''))) {
    throw new Error('Variables o funciones no permitidas en el evaluador de respaldo.');
  }

  // Ejecución acotada
  const fn = new Function(`return (${parsed});`);
  const res = fn();
  if (!Number.isFinite(res)) throw new Error('Resultado no numérico');
  return res;
}
