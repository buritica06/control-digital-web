/**
 * Módulo 1: El Puente entre lo Continuo y lo Discreto (Mapeo z = e^{sT})
 */

export function renderModule01() {
  return `
    <section id="mod-01" class="module-section">
      <div class="module-header">
        <span class="edu-badge">Capítulo 01 · Fundamentación</span>
        <h2 class="module-title">El Puente entre Laplace y el Plano Z: <span>Mapeo Conforme $z = e^{sT}$</span></h2>
        <p class="module-intro">
          ¿Por qué necesitamos una nueva herramienta si ya conocíamos la Transformada de Laplace? Descubre cómo una simple sustitución algebraica transforma sumatorias infinitas de impulsos en elegantes polinomios.
        </p>
      </div>

      <div class="box-callout box-intuition">
        <div class="box-title">💡 ¿Cómo pensarlo intuitivamente?</div>
        <p>
          Imagina que tomas una muestra de un sensor cada $T$ segundos. En el mundo de Laplace, cada muestra introduce un factor $e^{-s T}$, $e^{-2s T}$, $e^{-3s T}\dots$ Trabajar con estas exponenciales infinitas es una pesadilla algebraica. La <strong>Transformada Z</strong> hace un truco de magia: define una nueva variable $z = e^{sT}$. De un solo golpe, $e^{-ksT}$ se convierte en $z^{-k}$, transformando un problema trascendente intratable en un polinomio común y corriente que puedes factorizar.
        </p>
      </div>

      <div class="edu-card my-6">
        <h3 class="text-lg font-bold text-iub-amarillo mb-3">1.1 Del Tren de Impulsos a la Variable Z</h3>
        <p class="text-sm text-slate-200 leading-relaxed">
          Al muestrear periódicamente una señal continua $x(t)$ con un tren de impulsos ideales se obtiene:
        </p>
        <div class="math-display">
          $$x^*(t) = \\sum_{k=0}^{\\infty} x(kT) \\,\\delta(t - kT)$$
        </div>
        <p class="text-sm text-slate-200 leading-relaxed mt-3">
          Aplicando la Transformada de Laplace $\\mathcal{L}\\{x^*(t)\\}$ a cada impulso desplazado:
        </p>
        <div class="math-display">
          $$X^*(s) = \\sum_{k=0}^{\\infty} x(kT) \\,e^{-skT}$$
        </div>
        <p class="text-sm text-slate-200 leading-relaxed mt-3">
          Introduciendo el mapeo conforme $z = e^{sT}$ y $z^{-1} = e^{-sT}$, nace la <strong>Transformada Z</strong>:
        </p>
        <div class="math-display">
          $$X(z) = \\mathcal{Z}\\{x[k]\\} = \\sum_{k=0}^{\\infty} x[k] \\,z^{-k}$$
        </div>
      </div>

      <div class="box-callout box-practice">
        <div class="box-title">⚙️ En la práctica mecatrónica: El significado de $z^{-1}$</div>
        <p>
          En la memoria de tu microcontrolador (ESP32, STM32, Arduino), <strong>$z^{-1}$ representa exactamente un registro de retardo</strong> (un buffer que almacena la lectura tomada en el ciclo anterior $k-1$). Si una ecuación dice $y[k] = 0.8 y[k-1] + u[k]$, en tu código C simplemente guardas la variable anterior en memoria: <code>y_prev = y;</code>.
        </p>
      </div>

      <!-- VISOR INTERACTIVO 2D DE MUESTREO -->
      <div class="edu-card mt-8">
        <div class="edu-card-header">
          <span class="font-bold text-white text-base">🔬 Laboratorio Interactivo: Efecto del Período de Muestreo $T$</span>
          <span class="text-xs text-iub-azulClaro font-mono">Plotly 2D Engine</span>
        </div>
        <p class="text-xs text-slate-300 mb-4">
          Modifica el período de muestreo $T$ con el control lateral para experimentar cómo la señal continua analógica se convierte en la secuencia discreta $x[k]$.
        </p>
        <div class="viz-layout">
          <div id="chart-muestreo-container" class="viz-canvas-area" role="img" aria-label="Gráfica de muestreo continuo contra discreto"></div>
          <aside id="gui-muestreo-container" class="viz-controls-area"></aside>
        </div>
      </div>
    </section>
  `;
}
