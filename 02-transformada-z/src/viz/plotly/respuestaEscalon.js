/**
 * Gráfica 2D interactiva de Muestreo y Respuesta al Escalón (Plotly.js).
 * Compara la señal continua analógica y(t) con su tren muestreado y[k].
 * Interfaz obligatoria: { mount, update, resize, dispose }
 */

import { getBaseLayout, BASE_PLOTLY_CONFIG, PLOTLY_IUB_THEME } from './plotly-utils.js';

export function createChart(container, options = {}) {
  let isMounted = false;

  const state = {
    T: options.T ?? 0.1,
    mostrarContinua: options.mostrarContinua ?? true,
    a1: options.a1 ?? -1.425,
    a2: options.a2 ?? 0.496,
    b0: options.b0 ?? 1.0,
    tMax: options.tMax ?? 3.0,
  };

  function computeData() {
    const Plotly = window.Plotly;
    if (!Plotly) return [];

    const { T, mostrarContinua, tMax } = state;

    // 1. Curva continua y(t)
    const tPoints = 200;
    const tCont = [];
    const yCont = [];

    for (let i = 0; i <= tPoints; i++) {
      const t = (i / tPoints) * tMax;
      tCont.push(t);
      // Caso de estudio servo: e(t) = 4*exp(-2*t) - 3*exp(-5*t)
      const yt = 4.0 * Math.exp(-2.0 * t) - 3.0 * Math.exp(-5.0 * t);
      yCont.push(yt);
    }

    // 2. Muestras discretas y[k] = y(k*T)
    const numSamples = Math.floor(tMax / T) + 1;
    const tDisc = [];
    const kIndices = [];
    const yDisc = [];

    for (let k = 0; k < numSamples; k++) {
      const t = k * T;
      tDisc.push(t);
      kIndices.push(k);
      const yk = 4.0 * Math.exp(-2.0 * t) - 3.0 * Math.exp(-5.0 * t);
      yDisc.push(yk);
    }

    // Construcción de líneas verticales para stem plot
    const stemX = [];
    const stemY = [];
    for (let i = 0; i < tDisc.length; i++) {
      stemX.push(tDisc[i], tDisc[i], null);
      stemY.push(0, yDisc[i], null);
    }

    const traces = [];

    // Traza Continua
    if (mostrarContinua) {
      traces.push({
        x: tCont,
        y: yCont,
        mode: 'lines',
        name: 'y(t) Continua Analógica',
        line: { color: PLOTLY_IUB_THEME.colors.continuous, width: 2.5 },
        hoverinfo: 'x+y',
      });
    }

    // Tallos del Stem plot
    traces.push({
      x: stemX,
      y: stemY,
      mode: 'lines',
      name: 'Tallos de muestreo',
      line: { color: PLOTLY_IUB_THEME.colors.discrete, width: 1.5, dash: 'dot' },
      hoverinfo: 'none',
      showlegend: false,
    });

    // Marcadores del Stem plot y[k]
    traces.push({
      x: tDisc,
      y: yDisc,
      mode: 'markers',
      name: `y[k] Muestreada (T = ${T} s)`,
      marker: {
        color: PLOTLY_IUB_THEME.colors.discrete,
        size: 8,
        symbol: 'circle',
        line: { color: PLOTLY_IUB_THEME.bg, width: 1.5 },
      },
      text: kIndices.map((k, idx) => `k=${k} (t=${tDisc[idx].toFixed(2)}s)`),
      hovertemplate: '%{text}<br>y[k]=%{y:.4f}<extra></extra>',
    });

    return traces;
  }

  function mount() {
    const Plotly = window.Plotly;
    if (!Plotly) {
      container.innerHTML = '<div class="p-4 text-xs text-iub-amarillo">Cargando motor Plotly...</div>';
      return;
    }

    const traces = computeData();
    const layout = getBaseLayout(
      'Muestreo Periódico en Tiempo Discreto: e(t) vs e[k]',
      'Tiempo t (segundos)',
      'Amplitud e(t), e[k]'
    );

    Plotly.newPlot(container, traces, layout, BASE_PLOTLY_CONFIG).then(() => {
      isMounted = true;
    });
  }

  function update(newParams = {}) {
    Object.assign(state, newParams);
    const Plotly = window.Plotly;
    if (!Plotly || !isMounted) return;

    const traces = computeData();
    const layout = getBaseLayout(
      `Muestreo Periódico (T = ${state.T} s): e(t) vs e[k]`,
      'Tiempo t (segundos)',
      'Amplitud e(t), e[k]'
    );

    Plotly.react(container, traces, layout, BASE_PLOTLY_CONFIG);
  }

  function resize() {
    const Plotly = window.Plotly;
    if (Plotly && isMounted) {
      Plotly.Plots.resize(container);
    }
  }

  function dispose() {
    const Plotly = window.Plotly;
    if (Plotly && isMounted) {
      Plotly.purge(container);
      isMounted = false;
    }
  }

  return {
    mount,
    update,
    resize,
    dispose,
  };
}
