/**
 * Módulo 7: Ejercicios Propuestos con Autoevaluación Interactiva
 */

export function renderModule07() {
  return `
    <section id="mod-07" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 07 · Autoevaluación</span>
        <h2 class="module-title">Taller Interactivo de <span>Ejercicios Propuestos</span></h2>
        <p class="module-intro">
          Pon a prueba tu comprensión conceptual con retroalimentación inmediata. Cada respuesta correcta sumará puntos a tu barra de progreso guiado.
        </p>
      </div>

      <!-- EJERCICIO 1 -->
      <div class="edu-card my-6" id="quiz-card-1">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white text-sm">Pregunta 1: Región de Convergencia</span>
          <span class="text-xs text-iub-amarillo font-mono">Hito #1</span>
        </div>
        <p class="text-xs text-slate-200 mt-2">
          Si una secuencia causal $x[k]$ tiene como polos $p_1 = 0.3$, $p_2 = -0.7$ y $p_3 = 0.6 + 0.4j$, ¿cuál es su Región de Convergencia (ROC)?
        </p>
        <div class="space-y-2 mt-4 text-xs">
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(1, 0)">
            A) $|z| > 0.3$
          </button>
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(1, 1)">
            B) $|z| > 0.721$ (pues $|0.6 + 0.4j| = \\sqrt{0.36 + 0.16} \\approx 0.721$)
          </button>
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(1, 2)">
            C) $|z| < 0.7$
          </button>
        </div>
        <div id="quiz-feedback-1" class="mt-3 p-3 rounded text-xs hidden"></div>
      </div>

      <!-- EJERCICIO 2 -->
      <div class="edu-card my-6" id="quiz-card-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white text-sm">Pregunta 2: Teorema del Valor Final</span>
          <span class="text-xs text-iub-amarillo font-mono">Hito #2</span>
        </div>
        <p class="text-xs text-slate-200 mt-2">
          Dada la función $X(z) = \\frac{z}{z - 1.2}$, ¿es válido aplicar el Teorema del Valor Final para calcular $\\lim_{k\\to\\infty} x[k]$?
        </p>
        <div class="space-y-2 mt-4 text-xs">
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(2, 0)">
            A) Sí, porque la fórmula $(1 - z^{-1})X(z)$ siempre puede evaluarse en $z=1$.
          </button>
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(2, 1)">
            B) No, porque el polo está en $z = 1.2$ ($|z| > 1$, inestable); la señal diverge hacia el infinito.
          </button>
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(2, 2)">
            C) Sí, pero el resultado es cero.
          </button>
        </div>
        <div id="quiz-feedback-2" class="mt-3 p-3 rounded text-xs hidden"></div>
      </div>

      <!-- EJERCICIO 3 -->
      <div class="edu-card my-6" id="quiz-card-3">
        <div class="flex items-center justify-between">
          <span class="font-bold text-white text-sm">Pregunta 3: Interpretación de Polos Reales Negativos</span>
          <span class="text-xs text-iub-amarillo font-mono">Hito #3</span>
        </div>
        <p class="text-xs text-slate-200 mt-2">
          ¿Qué tipo de respuesta temporal produce un polo ubicado en el semieje real negativo $z = -0.75$?
        </p>
        <div class="space-y-2 mt-4 text-xs">
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(3, 0)">
            A) Un decaimiento monótono suave sin cambio de signo.
          </button>
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(3, 1)">
            B) Una oscilación alternada que cambia de signo muestra a muestra ($(-0.75)^k$) mientras decae.
          </button>
          <button class="quiz-opt w-full text-left p-3 rounded-lg bg-space-850 hover:bg-space-800 border border-slate-700 transition" onclick="window.IUBApp.checkQuiz(3, 2)">
            C) Una rampa continua creciente.
          </button>
        </div>
        <div id="quiz-feedback-3" class="mt-3 p-3 rounded text-xs hidden"></div>
      </div>
    </section>
  `;
}
