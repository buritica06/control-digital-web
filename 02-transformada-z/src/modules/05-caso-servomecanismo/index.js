/**
 * Módulo 5: Caso Práctico Mecatrónico: Error en Servomecanismo
 */

export function renderModule05() {
  return `
    <section id="mod-05" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 05 · Caso de Estudio Aplicado</span>
        <h2 class="module-title">Análisis de Error en un <span>Servomecanismo Mecatrónico</span></h2>
        <p class="module-intro">
          Apliquemos la teoría a un caso de ingeniería real: el análisis de la señal de error muestreada de un lazo cerrado de posición angular.
        </p>
      </div>

      <div class="box-callout box-practice">
        <div class="box-title">🎯 Enunciado del Problema</div>
        <p>
          En un actuador mecatrónico de precisión ante una entrada escalón, la señal de error continuo en lazo cerrado responde a la dinámica biexponencial:
        </p>
        <div class="math-display">
          $$e(t) = 4 e^{-2t} - 3 e^{-5t} \\quad (t \\ge 0)$$
        </div>
        <p class="mt-2">
          El microcontrolador muestrea el encoder mediante una interrupción a frecuencia de muestreo $f_s = 10\\text{ Hz}$ ($T = 0.1\\text{ s}$). Se requiere formular la secuencia muestreada $e[k]$, calcular su Transformada Z analítica $E(z)$ y verificar los límites $e[0]$ y $e[\\infty]$.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="edu-card">
          <h3 class="text-base font-bold text-iub-amarillo mb-2">Paso 1: Secuencia Muestreada $e[k]$</h3>
          <p class="text-xs text-slate-300">
            Sustituyendo $t = k T = 0.1 k$:
          </p>
          <div class="math-display text-xs">
            $$a_1 = e^{-2(0.1)} = e^{-0.2} \\approx 0.81873$$
            $$a_2 = e^{-5(0.1)} = e^{-0.5} \\approx 0.60653$$
            $$e[k] = 4(0.81873)^k - 3(0.60653)^k$$
          </div>
          <p class="text-xs text-slate-400 mt-2">
            Ambas bases exponenciales están dentro del rango $(0, 1)$, lo que garantiza un decaimiento monótono sin oscilaciones alternantes.
          </p>
        </div>

        <div class="edu-card">
          <h3 class="text-base font-bold text-iub-azulClaro mb-2">Paso 2: Transformada Z Racional $E(z)$</h3>
          <p class="text-xs text-slate-300">
            Por superposición y la transformada de $a^k$:
          </p>
          <div class="math-display text-xs">
            $$E(z) = \\frac{4z}{z - 0.81873} - \\frac{3z}{z - 0.60653}$$
            $$E(z) = \\frac{z(z + 0.02997)}{z^2 - 1.42526z + 0.49658}$$
          </div>
          <p class="text-xs text-iub-verde font-semibold mt-2">
            Polos: $p_1 = 0.81873, p_2 = 0.60653$ | Cero: $z_0 = -0.02997$ | $\\text{ROC}: |z| > 0.81873$
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="edu-card">
          <h3 class="text-sm font-bold text-white mb-2">Paso 3: Verificación con el TVI</h3>
          <div class="math-display text-xs">
            $$e[0] = \\lim_{z \\to \\infty} \\frac{z^2 + 0.02997z}{z^2 - 1.42526z + 0.49658} = 1.0$$
          </div>
          <p class="text-xs text-slate-300 mt-1">
            Comprobación temporal: $e(0) = 4 e^0 - 3 e^0 = 4 - 3 = 1$ (¡Coincidencia exacta!).
          </p>
        </div>

        <div class="edu-card">
          <h3 class="text-sm font-bold text-white mb-2">Paso 4: Verificación con el TVF</h3>
          <div class="math-display text-xs">
            $$e[\\infty] = \\lim_{z \\to 1} \\frac{z - 1}{z} \\cdot \\frac{z(z + 0.02997)}{(z - 0.81873)(z - 0.60653)} = 0.0$$
          </div>
          <p class="text-xs text-slate-300 mt-1">
            Como ambos polos están estrictamente dentro de $|z| < 1$, el error en régimen permanente se extingue por completo.
          </p>
        </div>
      </div>

      <!-- VISOR INTERACTIVO 2D DEL CASO SERVO -->
      <div class="edu-card mt-8">
        <div class="edu-card-header">
          <span class="font-bold text-white text-base">📈 Simulación Dinámica del Error e[k]</span>
          <span class="text-xs text-iub-amarillo font-mono">Plotly 2D Engine</span>
        </div>
        <p class="text-xs text-slate-300 mb-3">
          Observa la trayectoria temporal del error $e[k]$, el marcador inicial en $k=0$ y la asíntota cero validando ambos teoremas operacionales.
        </p>
        <div class="viz-layout">
          <div id="chart-servo-container" class="viz-canvas-area" role="img" aria-label="Gráfica interactiva de la señal de error del servomecanismo"></div>
          <aside id="gui-servo-container" class="viz-controls-area"></aside>
        </div>
      </div>
    </section>
  `;
}
