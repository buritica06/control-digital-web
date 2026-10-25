/**
 * Módulo 6: Ejemplos Resueltos Paso a Paso
 */

export function renderModule06() {
  return `
    <section id="mod-06" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 06 · Práctica Guiada</span>
        <h2 class="module-title">Ejemplos Resueltos <span>Paso a Paso</span></h2>
        <p class="module-intro">
          Ejercicios modelo resueltos con total detalle para afianzar el cálculo analítico y preparar tus parciales.
        </p>
      </div>

      <!-- EJEMPLO 1 -->
      <div class="edu-card my-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-white text-base">Ejemplo 1: Señal Compuesta con Impulso y Exponenciales</h3>
          <span class="text-xs px-2 py-1 rounded bg-space-850 text-iub-amarillo font-mono">Dificultad: Básica</span>
        </div>
        <p class="text-xs text-slate-300 mt-2">
          Calcule la Transformada Z unilateral y determine la Región de Convergencia (ROC) de:
        </p>
        <div class="math-display text-xs">
          $$x[k] = 2(0.5)^k - 3(0.2)^k + 4\\delta[k] \\quad (k \\ge 0)$$
        </div>
        
        <details class="mt-4 p-4 rounded-xl bg-space-850 border border-slate-700 text-xs">
          <summary class="font-bold text-iub-azulClaro cursor-pointer hover:text-iub-amarillo transition">
            ▶ Ver Solución Paso a Paso
          </summary>
          <div class="mt-3 space-y-2 text-slate-200 leading-relaxed border-t border-slate-700 pt-3">
            <p><strong>Paso 1: Aplicar Linealidad:</strong> $\\mathcal{Z}\\{x[k]\\} = 2\\mathcal{Z}\\{(0.5)^k\\} - 3\\mathcal{Z}\\{(0.2)^k\\} + 4\\mathcal{Z}\\{\\delta[k]\\}$.</p>
            <p><strong>Paso 2: Sustituir transformadas canónicas:</strong></p>
            <div class="math-display text-xs">
              $$X(z) = 2\\left(\\frac{z}{z - 0.5}\\right) - 3\\left(\\frac{z}{z - 0.2}\\right) + 4(1)$$
            </div>
            <p><strong>Paso 3: Determinar la ROC:</strong></p>
            <p>La ROC de $(0.5)^k$ es $|z| > 0.5$; la de $(0.2)^k$ es $|z| > 0.2$; la de $\\delta[k]$ es todo el plano. La intersección de las tres regiones está dominada por el polo más externo:</p>
            <p class="font-mono text-iub-verde font-bold">$$\\text{ROC: } |z| > 0.5$$</p>
          </div>
        </details>
      </div>

      <!-- EJEMPLO 2 -->
      <div class="edu-card my-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-white text-base">Ejemplo 2: Multiplicación por la Variable Temporal k</h3>
          <span class="text-xs px-2 py-1 rounded bg-space-850 text-iub-azulClaro font-mono">Dificultad: Intermedia</span>
        </div>
        <p class="text-xs text-slate-300 mt-2">
          Calcule la Transformada Z de la secuencia $x[k] = k \\,(0.4)^k$ utilizando el teorema de diferenciación en Z.
        </p>
        
        <details class="mt-4 p-4 rounded-xl bg-space-850 border border-slate-700 text-xs">
          <summary class="font-bold text-iub-azulClaro cursor-pointer hover:text-iub-amarillo transition">
            ▶ Ver Solución Paso a Paso
          </summary>
          <div class="mt-3 space-y-2 text-slate-200 leading-relaxed border-t border-slate-700 pt-3">
            <p><strong>Paso 1: Identificar la señal base $x_0[k] = (0.4)^k$:</strong> Su transformada es $X_0(z) = \\frac{z}{z - 0.4}$.</p>
            <p><strong>Paso 2: Aplicar el Teorema de Diferenciación en Z:</strong> $\\mathcal{Z}\\{k \\cdot x_0[k]\\} = -z \\frac{d}{dz} X_0(z)$.</p>
            <p><strong>Paso 3: Calcular la derivada del cociente:</strong></p>
            <div class="math-display text-xs">
              $$\\frac{d}{dz}\\left(\\frac{z}{z - 0.4}\\right) = \\frac{1(z - 0.4) - z(1)}{(z - 0.4)^2} = \\frac{-0.4}{(z - 0.4)^2}$$
            </div>
            <p><strong>Paso 4: Multiplicar por $-z$:</strong></p>
            <div class="math-display text-xs">
              $$X(z) = -z \\left[\\frac{-0.4}{(z - 0.4)^2}\\right] = \\frac{0.4 z}{(z - 0.4)^2} \\quad (|z| > 0.4)$$
            </div>
            <p class="text-slate-300">¡Nota que la presencia de $k$ genera un polo doble en $z = 0.4$!</p>
          </div>
        </details>
      </div>

      <!-- EJEMPLO 3 -->
      <div class="edu-card my-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-white text-base">Ejemplo 3: Análisis de Límites con TVI y TVF</h3>
          <span class="text-xs px-2 py-1 rounded bg-space-850 text-iub-verde font-mono">Dificultad: Aplicada</span>
        </div>
        <p class="text-xs text-slate-300 mt-2">
          Dada la función $X(z) = \\frac{z(2z - 1)}{(z - 0.8)(z - 0.5)}$, encuentre $x[0]$ y el valor en régimen permanente $x[\\infty]$.
        </p>
        
        <details class="mt-4 p-4 rounded-xl bg-space-850 border border-slate-700 text-xs">
          <summary class="font-bold text-iub-azulClaro cursor-pointer hover:text-iub-amarillo transition">
            ▶ Ver Solución Paso a Paso
          </summary>
          <div class="mt-3 space-y-2 text-slate-200 leading-relaxed border-t border-slate-700 pt-3">
            <p><strong>Paso 1: Valor Inicial $x[0]$ vía TVI:</strong></p>
            <div class="math-display text-xs">
              $$x[0] = \\lim_{z \\to \\infty} \\frac{2z^2 - z}{z^2 - 1.3z + 0.4} = \\frac{2}{1} = 2$$
            </div>
            <p><strong>Paso 2: Verificar la condición del TVF:</strong> Los polos están en $z_1 = 0.8$ y $z_2 = 0.5$. Ambos tienen módulo menor a 1 ($|z_i| < 1$). Por lo tanto, el sistema es asintóticamente estable y el TVF es estrictamente aplicable.</p>
            <p><strong>Paso 3: Valor Final $x[\\infty]$ vía TVF:</strong></p>
            <div class="math-display text-xs">
              $$x[\\infty] = \\lim_{z \\to 1} \\left(\\frac{z - 1}{z}\\right) \\frac{z(2z - 1)}{(z - 0.8)(z - 0.5)} = \\frac{(0)(1)}{(0.2)(0.5)} = 0$$
            </div>
          </div>
        </details>
      </div>
    </section>
  `;
}
