/**
 * Gráfica 2D del Caso de Estudio: Error del Servomecanismo Mecatrónico (Plotly.js).
 * Valida los Teoremas del Valor Inicial (e[0]=1) y Valor Final (e[∞]=0).
 * Interfaz obligatoria: { mount, update, resize, dispose }
 */

import { getBaseLayout, BASE_PLOTLY_CONFIG, PLOTLY_IUB_THEME } from './plotly-utils.js';
import { obtenerCasoServomecanismo } from '../../math/discrete.js';

export function createChart(container, options = {}) {
  let isMounted = false;

  const state = {
    T: options.T ?? 0.1,
    N: options.N ?? 30,
  };

  function computeTraces() {
    const { T, N } = state;
    const info = obtenerCasoServomecanismo(T);

    const k = Array.from({ length: N }, (_, i) => i);
    const t = k.map((idx) => idx * T);
    const e = k.map((idx) => 4 * Math.pow(info.a1, idx) - 3 * Math.pow(info.a2, idx));

    const stemX = [];
    const stemY = [];
    for (let i = 0; i < k.length; i++) {
      stemX.push(k[i], k[i], null);
      stemY.push(0, e[i], null);
    }

    return [
      {
        x: stemX,
        y: stemY,
        mode: 'lines',
        name: 'Muestras e[k]',
        line: { color: PLOTLY_IUB_THEME.colors.discrete, width: 1.5 },
        hoverinfo: 'none',
        showlegend: false,
      },
      {
        x: k,
        y: e,
        mode: 'markers+lines',
        name: `e[k] Servomecanismo (T = ${T} s)`,
        line: { color: PLOTLY_IUB_THEME.colors.continuous, width: 2, shape: 'spline' },
        marker: {
          color: PLOTLY_IUB_THEME.colors.discrete,
          size: 7,
          symbol: 'diamond',
          line: { color: PLOTLY_IUB_THEME.bg, width: 1 },
        },
        hovertemplate: 'Muestra k = %{x}<br>Error e[k] = %{y:.4f}<extra></extra>',
      },
      // Marcador de Teorema de Valor Inicial
      {
        x: [0],
        y: [e[0]],
        mode: 'markers+text',
        name: 'Valor Inicial: e[0] = 1.0',
        marker: { color: PLOTLY_IUB_THEME.colors.reference, size: 12, symbol: 'star' },
        text: ['e[0]=1 (TVI)'],
        textposition: 'top right',
        textfont: { color: PLOTLY_IUB_THEME.colors.reference, size: 11, family: 'Inter' },
      },
      // Asíntota de Valor Final
      {
        x: [0, N - 1],
        y: [0, 0],
        mode: 'lines',
        name: 'Valor Final: e[∞] = 0.0 (TVF)',
        line: { color: PLOTLY_IUB_THEME.colors.reference, width: 2, dash: 'dashdot' },
      },
    ];
  }

  function mount() {
    const Plotly = window.Plotly;
    if (!Plotly) return;

    const traces = computeTraces();
    const layout = getBaseLayout(
      'Dinámica del Error de Posición: e[k] = 4(0.8187)ᵏ - 3(0.6065)ᵏ',
      'Muestras discretas k',
      'Error de seguimiento e[k] (grados / mm)'
    );

    Plotly.newPlot(container, traces, layout, BASE_PLOTLY_CONFIG).then(() => {
      isMounted = true;
    });
  }

  function update(newParams = {}) {
    Object.assign(state, newParams);
    const Plotly = window.Plotly;
    if (!Plotly || !isMounted) return;

    const traces = computeTraces();
    const layout = getBaseLayout(
      `Error de Posición con Muestreo T = ${state.T} s`,
      'Muestras discretas k',
      'Error e[k]'
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
