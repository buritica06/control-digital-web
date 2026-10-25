/**
 * Módulo 2: Definición Formal y Región de Convergencia (ROC)
 */

export function renderModule02() {
  return `
    <section id="mod-02" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 02 · Dominio Complejo</span>
        <h2 class="module-title">Definición Formal y la <span>Región de Convergencia (ROC)</span></h2>
        <p class="module-intro">
          Una sumatoria infinita sólo tiene sentido si converge a un valor finito. Conoce la Región de Convergencia (ROC) y por qué el Círculo Unitario es la frontera sagrada de los sistemas discretos.
        </p>
      </div>

      <div class="box-callout box-intuition">
        <div class="box-title">💡 La Región de Convergencia explicada sin dolor</div>
        <p>
          Piensa en la ROC como el "territorio seguro" del plano complejo. Para señales causales (que inician en $k=0$), las potencias negativas $z^{-k} = 1/z^k$ se vuelven pequeñísimas a medida que te alejas del origen ($|z|$ grande). Por eso, <strong>la ROC de una señal causal es siempre el exterior de un círculo</strong>: $|z| > R$. Si intentas evaluar $X(z)$ dentro de ese círculo prohibido, la sumatoria explota hacia el infinito.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="edu-card">
          <h3 class="text-base font-bold text-iub-amarillo mb-2">Definición de Serie de Potencias</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Para una secuencia causal acotada $x[k]$, la transformada Z unilateral se expande como:
          </p>
          <div class="math-display text-xs">
            $$X(z) = x[0] + x[1]z^{-1} + x[2]z^{-2} + x[3]z^{-3} + \\dots$$
          </div>
          <p class="text-xs text-slate-400 mt-2">
            La variable compleja $z$ tiene magnitud y ángulo: $z = r e^{j\\omega}$. Su módulo $r = |z|$ determina la convergencia, mientras que $\\omega$ representa la frecuencia angular discreta.
          </p>
        </div>

        <div class="edu-card">
          <h3 class="text-base font-bold text-iub-azulClaro mb-2">Criterio del Cociente (Radio R)</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            El radio mínimo de convergencia $R$ se calcula evaluando el límite de la razón de términos sucesivos:
          </p>
          <div class="math-display text-xs">
            $$\\text{ROC}: |z| > R = \\lim_{k\\to\\infty} \\left| \\frac{x[k+1]}{x[k]} \\right|$$
          </div>
          <p class="text-xs text-slate-400 mt-2">
            <strong>Regla de oro:</strong> Ningún polo puede estar dentro de la ROC. La frontera del círculo de convergencia siempre choca con el polo más alejado del origen.
          </p>
        </div>
      </div>

      <!-- VISOR 3D DE SUPERFICIE |X(z)| Y CILINDRO DE ROC -->
      <div class="edu-card mt-8">
        <div class="edu-card-header">
          <span class="font-bold text-white text-base">🌐 Explorador 3D: Relieve de Magnitud $|X(z)|$ y Cilindro de ROC</span>
          <span class="text-xs text-iub-amarillo font-mono">Three.js WebGL Engine</span>
        </div>
        <p class="text-xs text-slate-300 mb-3">
          El terreno 3D muestra la magnitud $|X(z)|$. Observa los polos como altas agujas que tocan el infinito y el cilindro translúcido verde que delimita la Región de Convergencia: <strong id="roc-indicator-val" class="text-iub-verde">|z| > 0.819</strong>.
        </p>
        <div class="viz-layout">
          <div id="three-roc-container" class="viz-canvas-area" role="img" aria-label="Visualizador 3D de la superficie de magnitud y cilindro de ROC"></div>
          <aside id="gui-roc-container" class="viz-controls-area"></aside>
        </div>
      </div>
    </section>
  `;
}
