/**
 * Módulo 3: El "Diccionario" de Señales Elementales
 */

export function renderModule03() {
  return `
    <section id="mod-03" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 03 · Señales Canónicas</span>
        <h2 class="module-title">El "Diccionario" de <span>Señales Elementales</span></h2>
        <p class="module-intro">
          Igual que en Laplace aprendiste que el escalón es $1/s$, en el mundo discreto existen 5 funciones fundamentales que componen casi cualquier respuesta de control.
        </p>
      </div>

      <div class="edu-card overflow-x-auto my-6">
        <table class="w-full text-left text-xs text-slate-200">
          <thead class="border-b-2 border-iub-amarillo text-iub-amarillo font-extrabold uppercase">
            <tr>
              <th class="p-3">Señal en el Tiempo $x[k]$</th>
              <th class="p-3">Transformada $X(z)$</th>
              <th class="p-3">Forma Racional</th>
              <th class="p-3">Región de Convergencia (ROC)</th>
              <th class="p-3">Ubicación de Polos</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr class="hover:bg-space-850">
              <td class="p-3 font-semibold text-white">Impulso Unitario $\\delta[k]$</td>
              <td class="p-3 font-mono">1</td>
              <td class="p-3 font-mono">1</td>
              <td class="p-3 text-iub-verde">Todo el plano $z$</td>
              <td class="p-3 text-slate-400">Sin polos finitos</td>
            </tr>
            <tr class="hover:bg-space-850">
              <td class="p-3 font-semibold text-white">Escalón Unitario $u[k]$</td>
              <td class="p-3 font-mono">$\\frac{1}{1 - z^{-1}}$</td>
              <td class="p-3 font-mono text-iub-azulClaro">$\\frac{z}{z - 1}$</td>
              <td class="p-3 text-iub-verde">$|z| > 1$</td>
              <td class="p-3 text-iub-amarillo">$z = 1$</td>
            </tr>
            <tr class="hover:bg-space-850">
              <td class="p-3 font-semibold text-white">Secuencia Geométrica $a^k$</td>
              <td class="p-3 font-mono">$\\frac{1}{1 - a z^{-1}}$</td>
              <td class="p-3 font-mono text-iub-azulClaro">$\\frac{z}{z - a}$</td>
              <td class="p-3 text-iub-verde">$|z| > |a|$</td>
              <td class="p-3 text-iub-amarillo">$z = a$</td>
            </tr>
            <tr class="hover:bg-space-850">
              <td class="p-3 font-semibold text-white">Rampa Unitaria $k T$</td>
              <td class="p-3 font-mono">$\\frac{T z^{-1}}{(1 - z^{-1})^2}$</td>
              <td class="p-3 font-mono text-iub-azulClaro">$\\frac{T z}{(z - 1)^2}$</td>
              <td class="p-3 text-iub-verde">$|z| > 1$</td>
              <td class="p-3 text-iub-naranja">$z = 1$ (doble)</td>
            </tr>
            <tr class="hover:bg-space-850">
              <td class="p-3 font-semibold text-white">Senoidal Amortiguada $a^k \\cos(\\omega_0 k)$</td>
              <td class="p-3 font-mono">-</td>
              <td class="p-3 font-mono text-iub-azulClaro">$\\frac{z(z - a\\cos\\omega_0)}{z^2 - 2az\\cos\\omega_0 + a^2}$</td>
              <td class="p-3 text-iub-verde">$|z| > |a|$</td>
              <td class="p-3 text-iub-coral">$z = a e^{\\pm j\\omega_0}$</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box-callout box-warning">
        <div class="box-title">⚠️ Trampa clásica de examen: El factor $z$ en el numerador</div>
        <p>
          En Laplace, el escalón es $1/s$. Pero en Z, el escalón causal es $\\frac{z}{z - 1}$, ¡con una $z$ arriba! No olvides ese cero en el origen: proviene de que la señal comienza exactamente en $k=0$ y vale $x[0]=1$. Cuando hagas expansión en fracciones parciales en la Semana 3, la técnica estándar será expandir $\\frac{X(z)}{z}$ para luego volver a multiplicar por $z$.
        </p>
      </div>

      <!-- VISOR INTERACTIVO 2D DEL CATÁLOGO STEM -->
      <div class="edu-card mt-8">
        <div class="edu-card-header">
          <span class="font-bold text-white text-base">📊 Laboratorio de Formas de Onda Canónicas (Stem Plot)</span>
          <span class="text-xs text-iub-azulClaro font-mono">Plotly 2D Engine</span>
        </div>
        <p class="text-xs text-slate-300 mb-3">
          Selecciona una señal canónica y varía el parámetro de base $a$. Observa cómo la señal oscila y alterna de signo cuando $a < 0$, decae suavemente cuando $0 < a < 1$, o explota cuando $|a| > 1$.
        </p>
        <div class="viz-layout">
          <div id="chart-secuencias-container" class="viz-canvas-area" role="img" aria-label="Catálogo interactivo de secuencias discretas"></div>
          <aside id="gui-secuencias-container" class="viz-controls-area"></aside>
        </div>
      </div>
    </section>
  `;
}
