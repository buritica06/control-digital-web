/**
 * Módulo 4: Teoremas Operacionales y el Plano Z
 */

export function renderModule04() {
  return `
    <section id="mod-04" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 04 · Propiedades Matemáticas</span>
        <h2 class="module-title">Teoremas Operacionales y <span>Estabilidad en el Plano Z</span></h2>
        <p class="module-intro">
          Los teoremas operacionales son tus herramientas de cálculo. Te permiten resolver sistemas complejos sin tener que calcular sumatorias infinitas a mano.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="edu-card">
          <h3 class="text-base font-bold text-iub-amarillo mb-2">1. Desplazamiento Temporal (Retardo y Avance)</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Multiplicar por $z^{-1}$ retarda la señal un período $T$; multiplicar por $z$ avanza la muestra:
          </p>
          <div class="math-display text-xs">
            $$\\mathcal{Z}\\{x[k - 1]\\} = z^{-1} X(z) + x[-1]$$
            $$\\mathcal{Z}\\{x[k + 1]\\} = z X(z) - z x[0]$$
          </div>
          <p class="text-xs text-slate-400 mt-2">
            Para sistemas con condiciones iniciales nulas en reposo ($x[-1]=0, x[0]=0$), los operadores se reducen a potencias limpias $z^{-n}$ y $z^n$.
          </p>
        </div>

        <div class="edu-card">
          <h3 class="text-base font-bold text-iub-azulClaro mb-2">2. Teoremas de Límites (Valor Inicial y Final)</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Permiten conocer el inicio y el régimen permanente directamente en el dominio $Z$:
          </p>
          <div class="math-display text-xs">
            $$\\text{TVI:} \\quad x[0] = \\lim_{z \\to \\infty} X(z)$$
            $$\\text{TVF:} \\quad \\lim_{k \\to \\infty} x[k] = \\lim_{z \\to 1} (1 - z^{-1}) X(z)$$
          </div>
          <p class="text-xs text-iub-coral font-semibold mt-2">
            ⚠️ Condición crítica del TVF: Solo es válido si todos los polos de $(1-z^{-1})X(z)$ están estrictamente dentro del círculo unitario ($|z_i| < 1$).
          </p>
        </div>
      </div>

      <!-- VISOR INTERACTIVO 3D DEL PLANO Z -->
      <div class="edu-card mt-8">
        <div class="edu-card-header">
          <span class="font-bold text-white text-base">🎯 Laboratorio 3D: Polos, Ceros y Estabilidad Dinámica</span>
          <span class="text-xs text-iub-amarillo font-mono">Three.js WebGL Engine</span>
        </div>
        <p class="text-xs text-slate-300 mb-3">
          Mueve los coeficientes $a_1, a_2$ para desplazar los polos en vivo. Si algún polo cruza el borde del Círculo Unitario ($|p| \\ge 1$), verás la advertencia visual inmediata de inestabilidad.
        </p>
        <div id="zplane-status" class="p-3 mb-3 rounded bg-space-850 border border-slate-700 text-xs"></div>
        <div class="viz-layout">
          <div id="three-planoz-container" class="viz-canvas-area" role="img" aria-label="Plano Z 3D interactivo con polos y ceros"></div>
          <aside id="gui-planoz-container" class="viz-controls-area"></aside>
        </div>
      </div>
    </section>
  `;
}
