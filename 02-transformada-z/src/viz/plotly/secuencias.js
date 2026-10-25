/**
 * Gráfica 2D de Secuencias Canónicas Elementales (Plotly.js).
 * Genera stem plots interactivos para impulso, escalón, rampa, exponencial y senoidal.
 * Interfaz obligatoria: { mount, update, resize, dispose }
 */

import { getBaseLayout, BASE_PLOTLY_CONFIG, PLOTLY_IUB_THEME } from './plotly-utils.js';
import { generarSecuencia } from '../../math/discrete.js';

export function createChart(container, options = {}) {
  let isMounted = false;

  const state = {
    tipo: options.tipo ?? 'exponencial',
    a: options.a ?? 0.8,
    T: options.T ?? 0.1,
    omega0: options.omega0 ?? 0.5,
    N: options.N ?? 25,
  };

  function computeTraces() {
    const { k, x } = generarSecuencia(state.tipo, {
      a: state.a,
      T: state.T,
      omega0: state.omega0,
    }, state.N);

    // Stem lines
    const stemX = [];
    const stemY = [];
    for (let i = 0; i < k.length; i++) {
      stemX.push(k[i], k[i], null);
      stemY.push(0, x[i], null);
    }

    const isExplosive = Math.abs(state.a) > 1.0 && state.tipo === 'exponencial';
    const markerColor = isExplosive ? PLOTLY_IUB_THEME.colors.unstable : PLOTLY_IUB_THEME.colors.discrete;

    return [
      {
        x: stemX,
        y: stemY,
        mode: 'lines',
        name: 'Tallos de muestra',
        line: { color: markerColor, width: 1.5 },
        hoverinfo: 'none',
        showlegend: false,
      },
      {
        x: k,
        y: x,
        mode: 'markers',
        name: `Secuencia x[k] (${state.tipo})`,
        marker: {
          color: markerColor,
          size: 8,
          symbol: 'circle',
          line: { color: PLOTLY_IUB_THEME.bg, width: 1.5 },
        },
        hovertemplate: 'k = %{x}<br>x[k] = %{y:.4f}<extra></extra>',
      },
      // Línea de referencia y=0
      {
        x: [0, state.N - 1],
        y: [0, 0],
        mode: 'lines',
        name: 'Eje cero',
        line: { color: 'rgba(255, 255, 255, 0.25)', width: 1, dash: 'dash' },
        showlegend: false,
      }
    ];
  }

  function getTitle() {
    switch (state.tipo) {
      case 'impulso': return 'Impulso Unitario de Kronecker: δ[k] ⟷ X(z) = 1';
      case 'escalon': return 'Escalón Unitario: u[k] ⟷ X(z) = z / (z - 1)';
      case 'rampa': return `Rampa Unitaria (T=${state.T}s): k·T ⟷ X(z) = T·z / (z - 1)²`;
      case 'exponencial': return `Secuencia Geométrica aᵏ (a=${state.a}): X(z) = z / (z - ${state.a})`;
      case 'seno-amortiguado': return `Senoidal Amortiguada aᵏ·sin(ω₀k) (a=${state.a})`;
      default: return 'Secuencia Discreta x[k]';
    }
  }

  function mount() {
    const Plotly = window.Plotly;
    if (!Plotly) return;

    const traces = computeTraces();
    const layout = getBaseLayout(getTitle(), 'Índice de muestra k', 'Amplitud x[k]');

    Plotly.newPlot(container, traces, layout, BASE_PLOTLY_CONFIG).then(() => {
      isMounted = true;
    });
  }

  function update(newParams = {}) {
    Object.assign(state, newParams);
    const Plotly = window.Plotly;
    if (!Plotly || !isMounted) return;

    const traces = computeTraces();
    const layout = getBaseLayout(getTitle(), 'Índice de muestra k', 'Amplitud x[k]');

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
