/**
 * Helpers y configuración base accesible para gráficas Plotly.js.
 * Garantiza cumplimiento anti-superposición y diseño responsive.
 */

export const PLOTLY_IUB_THEME = {
  bg: '#121023',
  paper: '#121023',
  plot: '#1a1732',
  grid: '#2f2a54',
  text: '#ffffff',
  textMuted: '#94a3b8',
  colors: {
    continuous: '#00ade7',  // Azul IUB
    discrete: '#ffdf2d',    // Amarillo IUB
    reference: '#34d399',   // Verde esmeralda
    unstable: '#f87171',    // Coral
    secondary: '#e39037',   // Naranja
  }
};

/**
 * Devuelve la configuración base de layout con reglas anti-colisión
 */
export function getBaseLayout(titleText, xTitle, yTitle) {
  return {
    autosize: true,
    paper_bgcolor: PLOTLY_IUB_THEME.paper,
    plot_bgcolor: PLOTLY_IUB_THEME.plot,
    font: {
      family: 'Inter, system-ui, sans-serif',
      size: 12,
      color: PLOTLY_IUB_THEME.text,
    },
    title: {
      text: titleText,
      font: { size: 14, color: '#ffffff', weight: 800 },
      x: 0.5,
      xanchor: 'center',
      y: 0.95,
    },
    margin: { t: 50, r: 30, b: 65, l: 65 },
    xaxis: {
      title: { text: xTitle, standoff: 15, font: { size: 12, color: PLOTLY_IUB_THEME.textMuted } },
      gridcolor: PLOTLY_IUB_THEME.grid,
      zerolinecolor: PLOTLY_IUB_THEME.colors.continuous,
      tickfont: { size: 11, color: PLOTLY_IUB_THEME.textMuted },
    },
    yaxis: {
      title: { text: yTitle, standoff: 15, font: { size: 12, color: PLOTLY_IUB_THEME.textMuted } },
      gridcolor: PLOTLY_IUB_THEME.grid,
      zerolinecolor: PLOTLY_IUB_THEME.colors.continuous,
      tickfont: { size: 11, color: PLOTLY_IUB_THEME.textMuted },
    },
    legend: {
      orientation: 'h',
      y: -0.28,
      x: 0.5,
      xanchor: 'center',
      font: { size: 11, color: PLOTLY_IUB_THEME.text },
    },
    hovermode: 'x unified',
    hoverlabel: {
      bgcolor: '#0b0a16',
      bordercolor: PLOTLY_IUB_THEME.colors.discrete,
      font: { family: 'JetBrains Mono, monospace', size: 11, color: '#ffffff' },
    },
  };
}

export const BASE_PLOTLY_CONFIG = {
  responsive: true,
  displaylogo: false,
  modeBarButtonsToRemove: ['lasso2d', 'select2d'],
  toImageButtonOptions: {
    format: 'png',
    filename: 'grafica_iub_control2',
    scale: 2,
  },
};
