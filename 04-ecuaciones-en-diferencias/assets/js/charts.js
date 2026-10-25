/**
 * Motor de Gráficas Científicas Dinámicas y Comparativas (Plotly.js)
 * Asignatura: MEC36 - Control II | Semana 04: Ecuaciones en Diferencias
 * Institución Universitaria de Barranquilla (IUB)
 *
 * Garantías de Ingeniería Visual:
 * - Cero superposición entre títulos, ejes, leyendas, etiquetas, marcadores y controles.
 * - Escalado adaptativo mediante ResizeObserver y automargin: true.
 * - Paleta cromática accesible de alto contraste institucional IUB.
 */

const IUB_COLORS = {
  oscuro: '#121023',
  panel: '#0B0A16',
  grid: '#2F2A54',
  amarillo: '#FFDF2D',
  azul: '#00ADE7',
  naranja: '#E39037',
  verde: '#3B9C6D',
  blanco: '#FFFFFF',
  gris: '#CBD5E1',
  coral: '#F87171',
  violeta: '#A78BFA'
};

const PLOTLY_CONFIG = {
  responsive: true,
  displaylogo: false,
  modeBarButtonsToRemove: ['lasso2d', 'select2d'],
  toImageButtonOptions: {
    format: 'png',
    filename: 'grafica_ecuaciones_diferencias_iub',
    height: 720,
    width: 1280,
    scale: 2
  }
};

/**
 * Calcula la solución exacta (recursiva, libre y forzada) de la ecuación en diferencias de 2.º orden:
 * y[k] + a1*y[k-1] + a2*y[k-2] = b0*u[k] + b1*u[k-1]
 */
function computeSecondOrderSystem(params) {
  const { a1, a2, b0, b1, ym1, ym2, uAmp, N = 20 } = params;
  const kArr = Array.from({ length: N }, (_, i) => i);

  const yTotal = new Array(N).fill(0);
  const yLibre = new Array(N).fill(0);
  const yForzada = new Array(N).fill(0);

  for (let k = 0; k < N; k++) {
    const uk = uAmp;
    const uk1 = k >= 1 ? uAmp : 0.0;

    // 1. Respuesta Libre (u[k] = 0, condiciones iniciales ym1, ym2)
    const yl_1 = k >= 1 ? yLibre[k - 1] : ym1;
    const yl_2 = k >= 2 ? yLibre[k - 2] : (k === 1 ? ym1 : ym2);
    yLibre[k] = -a1 * yl_1 - a2 * yl_2;

    // 2. Respuesta Forzada (ym1 = 0, ym2 = 0, entrada escalón uAmp)
    const yf_1 = k >= 1 ? yForzada[k - 1] : 0.0;
    const yf_2 = k >= 2 ? yForzada[k - 2] : 0.0;
    yForzada[k] = -a1 * yf_1 - a2 * yf_2 + b0 * uk + b1 * uk1;

    // 3. Respuesta Total Recursiva
    const yt_1 = k >= 1 ? yTotal[k - 1] : ym1;
    const yt_2 = k >= 2 ? yTotal[k - 2] : (k === 1 ? ym1 : ym2);
    yTotal[k] = -a1 * yt_1 - a2 * yt_2 + b0 * uk + b1 * uk1;
  }

  // Raíces del polinomio característico z^2 + a1*z + a2 = 0
  const disc = a1 * a1 - 4 * a2;
  let poles = [];
  if (disc >= 0) {
    poles = [
      { re: (-a1 + Math.sqrt(disc)) / 2, im: 0 },
      { re: (-a1 - Math.sqrt(disc)) / 2, im: 0 }
    ];
  } else {
    poles = [
      { re: -a1 / 2, im: Math.sqrt(-disc) / 2 },
      { re: -a1 / 2, im: -Math.sqrt(-disc) / 2 }
    ];
  }

  const maxPoleMag = Math.max(
    Math.hypot(poles[0].re, poles[0].im),
    Math.hypot(poles[1].re, poles[1].im)
  );

  // Condiciones de estabilidad de Jury para P(z) = z^2 + a1*z + a2
  const p1 = 1 + a1 + a2;
  const pm1 = 1 - a1 + a2;
  const juryStable = p1 > 1e-6 && pm1 > 1e-6 && Math.abs(a2) < 1 - 1e-6;

  // Valor estacionario teórico si es estable
  const ySS = juryStable ? ((b0 + b1) * uAmp) / (1 + a1 + a2) : null;

  return {
    kArr,
    yTotal,
    yLibre,
    yForzada,
    poles,
    maxPoleMag,
    jury: { p1, pm1, a2Abs: Math.abs(a2), isStable: juryStable },
    ySS
  };
}

/**
 * 1. GRÁFICA DE EVOLUCIÓN TEMPORAL Y DESCOMPOSICIÓN (LIBRE + FORZADA = TOTAL)
 */
function renderTimeDecompositionChart(containerId, simData) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const { kArr, yTotal, yLibre, yForzada, ySS } = simData;

  // Construcción de tallos verticales (stem plot) para la respuesta total y[k]
  const stemX = [];
  const stemY = [];
  kArr.forEach((k, idx) => {
    stemX.push(k, k, null);
    stemY.push(0, yTotal[idx], null);
  });

  const traces = [
    {
      x: stemX,
      y: stemY,
      mode: 'lines',
      line: { color: 'rgba(255, 223, 45, 0.45)', width: 2.5 },
      hoverinfo: 'skip',
      showlegend: false
    },
    {
      x: kArr,
      y: yTotal,
      mode: 'lines+markers',
      name: 'Respuesta Total y[k] = y_libre + y_forzada',
      line: { color: IUB_COLORS.amarillo, width: 3 },
      marker: { color: IUB_COLORS.amarillo, size: 9, symbol: 'circle', line: { color: IUB_COLORS.oscuro, width: 1.5 } },
      hovertemplate: '<b>k = %{x}</b><br>y_total[k] = %{y:.4f}<extra></extra>'
    },
    {
      x: kArr,
      y: yForzada,
      mode: 'lines+markers',
      name: 'Respuesta Forzada y_forzada[k] (CI = 0)',
      line: { color: IUB_COLORS.azul, width: 2.2, dash: 'dash' },
      marker: { color: IUB_COLORS.azul, size: 7, symbol: 'diamond' },
      hovertemplate: '<b>k = %{x}</b><br>y_forzada[k] = %{y:.4f}<extra></extra>'
    },
    {
      x: kArr,
      y: yLibre,
      mode: 'lines+markers',
      name: 'Respuesta Libre y_libre[k] (u[k] = 0)',
      line: { color: IUB_COLORS.naranja, width: 2.2, dash: 'dot' },
      marker: { color: IUB_COLORS.naranja, size: 7, symbol: 'square' },
      hovertemplate: '<b>k = %{x}</b><br>y_libre[k] = %{y:.4f}<extra></extra>'
    }
  ];

  if (ySS !== null && Number.isFinite(ySS) && Math.abs(ySS) < 250) {
    traces.push({
      x: [0, kArr[kArr.length - 1]],
      y: [ySS, ySS],
      mode: 'lines',
      name: `Asíntota Valor Final y(∞) = ${ySS.toFixed(3)}`,
      line: { color: IUB_COLORS.verde, width: 2, dash: 'dashdot' },
      hoverinfo: 'name+y'
    });
  }

  const layout = {
    paper_bgcolor: IUB_COLORS.panel,
    plot_bgcolor: IUB_COLORS.panel,
    font: { family: 'Helvetica Neue, Inter, sans-serif', color: IUB_COLORS.blanco, size: 12 },
    margin: { t: 54, r: 28, b: 58, l: 68 },
    xaxis: {
      title: { text: 'Índice de Muestra Discreta k (t = k·T)', standoff: 14, font: { size: 13, color: IUB_COLORS.amarillo } },
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      dtick: 2,
      automargin: true
    },
    yaxis: {
      title: { text: 'Amplitud de Salida y[k]', standoff: 14, font: { size: 13, color: IUB_COLORS.azul } },
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.15,
      bgcolor: 'rgba(18, 16, 35, 0.90)',
      bordercolor: 'rgba(255, 223, 45, 0.28)',
      borderwidth: 1,
      font: { size: 11 }
    },
    hovermode: 'x unified'
  };

  Plotly.react(el, traces, layout, PLOTLY_CONFIG);
}

/**
 * 2. GRÁFICA DEL PLANO COMPLEJO Z Y CÍRCULO UNITARIO (ESTABILIDAD Y JURY)
 */
function renderZPlaneChart(containerId, simData) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const { poles, jury } = simData;

  const theta = Array.from({ length: 181 }, (_, i) => (i * 2 * Math.PI) / 180);
  const ucX = theta.map(t => Math.cos(t));
  const ucY = theta.map(t => Math.sin(t));

  // Círculo de módulo r actual de los polos
  const rPole = Math.hypot(poles[0].re, poles[0].im);
  const rX = theta.map(t => rPole * Math.cos(t));
  const rY = theta.map(t => rPole * Math.sin(t));

  const poleColor = jury.isStable ? IUB_COLORS.verde : IUB_COLORS.coral;

  const traces = [
    {
      x: ucX,
      y: ucY,
      mode: 'lines',
      fill: 'toself',
      fillcolor: 'rgba(59, 156, 109, 0.12)',
      name: 'Círculo Unitario |z| = 1 (Región Estable)',
      line: { color: IUB_COLORS.amarillo, width: 2.5 },
      hoverinfo: 'name'
    },
    {
      x: rX,
      y: rY,
      mode: 'lines',
      name: `Radio Característico |p| = ${rPole.toFixed(3)}`,
      line: { color: IUB_COLORS.azul, width: 1.6, dash: 'dot' },
      hoverinfo: 'name'
    },
    {
      x: poles.map(p => p.re),
      y: poles.map(p => p.im),
      mode: 'markers+text',
      name: 'Polos Característicos p₁, p₂',
      text: poles.map((p, idx) => `p${idx + 1}`),
      textposition: ['top right', 'bottom right'],
      textfont: { color: IUB_COLORS.blanco, size: 12 },
      marker: {
        color: poleColor,
        size: 13,
        symbol: 'x',
        line: { color: poleColor, width: 2 }
      },
      hovertemplate: '<b>Polo Característico</b><br>Re(z) = %{x:.4f}<br>Im(z) = %{y:.4f}<extra></extra>'
    }
  ];

  const maxCoord = Math.max(1.35, rPole + 0.25);

  const layout = {
    paper_bgcolor: IUB_COLORS.panel,
    plot_bgcolor: IUB_COLORS.panel,
    font: { family: 'Helvetica Neue, Inter, sans-serif', color: IUB_COLORS.blanco, size: 12 },
    margin: { t: 54, r: 28, b: 58, l: 64 },
    xaxis: {
      title: { text: 'Eje Real Re(z)', standoff: 12, font: { size: 13, color: IUB_COLORS.amarillo } },
      range: [-maxCoord, maxCoord],
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    yaxis: {
      title: { text: 'Eje Imaginario Im(z)', standoff: 12, font: { size: 13, color: IUB_COLORS.azul } },
      range: [-maxCoord, maxCoord],
      scaleanchor: 'x',
      scaleratio: 1,
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.15,
      bgcolor: 'rgba(18, 16, 35, 0.90)',
      bordercolor: 'rgba(0, 173, 231, 0.28)',
      borderwidth: 1,
      font: { size: 11 }
    }
  };

  Plotly.react(el, traces, layout, PLOTLY_CONFIG);
}

/**
 * 3. GRÁFICA COMPARATIVA DE MÉTODOS DE DISCRETIZACIÓN (CONTINUO VS. ZOH, TUSTIN, EULER)
 */
function renderDiscretizationComparisonChart(containerId, discParams) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const { K = 20.0, tau = 0.5, T = 0.05, uStep = 6.0 } = discParams;
  const tFinal = Math.max(2.5 * tau * 2, 12 * T);
  const nCont = 250;
  const tCont = Array.from({ length: nCont }, (_, i) => (i * tFinal) / (nCont - 1));
  const yCont = tCont.map(t => K * uStep * (1 - Math.exp(-t / tau)));

  const nSamples = Math.min(60, Math.max(6, Math.floor(tFinal / T) + 1));
  const kSamples = Array.from({ length: nSamples }, (_, k) => k);
  const tSamples = kSamples.map(k => k * T);

  // 1. ZOH: y[k] = e^(-T/tau)*y[k-1] + K*(1 - e^(-T/tau))*u[k-1]
  const aZoh = Math.exp(-T / tau);
  const bZoh = K * (1 - aZoh);
  const yZoh = new Array(nSamples).fill(0);
  for (let k = 1; k < nSamples; k++) {
    yZoh[k] = aZoh * yZoh[k - 1] + bZoh * uStep;
  }

  // 2. Tustin: y[k] = ((2*tau - T)/(2*tau + T))*y[k-1] + (K*T/(2*tau + T))*(u[k] + u[k-1])
  const aTus = (2 * tau - T) / (2 * tau + T);
  const bTus = (K * T) / (2 * tau + T);
  const yTus = new Array(nSamples).fill(0);
  yTus[0] = bTus * uStep; // término directo en k=0
  for (let k = 1; k < nSamples; k++) {
    yTus[k] = aTus * yTus[k - 1] + bTus * (uStep + uStep);
  }

  // 3. Euler hacia adelante: y[k] = (1 - T/tau)*y[k-1] + (K*T/tau)*u[k-1]
  const aEulerF = 1 - T / tau;
  const bEulerF = (K * T) / tau;
  const yEulerF = new Array(nSamples).fill(0);
  for (let k = 1; k < nSamples; k++) {
    const nextVal = aEulerF * yEulerF[k - 1] + bEulerF * uStep;
    yEulerF[k] = Math.max(-2.5 * K * uStep, Math.min(3.0 * K * uStep, nextVal));
  }

  // 4. Euler hacia atrás: y[k] = (tau/(tau + T))*y[k-1] + (K*T/(tau + T))*u[k]
  const aEulerB = tau / (tau + T);
  const bEulerB = (K * T) / (tau + T);
  const yEulerB = new Array(nSamples).fill(0);
  yEulerB[0] = bEulerB * uStep;
  for (let k = 1; k < nSamples; k++) {
    yEulerB[k] = aEulerB * yEulerB[k - 1] + bEulerB * uStep;
  }

  const traces = [
    {
      x: tCont,
      y: yCont,
      mode: 'lines',
      name: 'Planta Continua Exacta y(t)',
      line: { color: IUB_COLORS.blanco, width: 2.5 }
    },
    {
      x: tSamples,
      y: yZoh,
      mode: 'lines+markers',
      line: { shape: 'hv', color: IUB_COLORS.amarillo, width: 2.5 },
      marker: { color: IUB_COLORS.amarillo, size: 8, symbol: 'circle' },
      name: `ZOH Invariante (p = ${aZoh.toFixed(3)})`
    },
    {
      x: tSamples,
      y: yTus,
      mode: 'lines+markers',
      line: { color: IUB_COLORS.azul, width: 2, dash: 'dash' },
      marker: { color: IUB_COLORS.azul, size: 7, symbol: 'diamond' },
      name: `Tustin Bilineal (p = ${aTus.toFixed(3)})`
    },
    {
      x: tSamples,
      y: yEulerF,
      mode: 'lines+markers',
      line: { color: IUB_COLORS.coral, width: 2, dash: 'dot' },
      marker: { color: IUB_COLORS.coral, size: 7, symbol: 'triangle-up' },
      name: `Euler Adelante (p = ${aEulerF.toFixed(3)})`
    },
    {
      x: tSamples,
      y: yEulerB,
      mode: 'lines+markers',
      line: { color: IUB_COLORS.verde, width: 2, dash: 'dashdot' },
      marker: { color: IUB_COLORS.verde, size: 6, symbol: 'square' },
      name: `Euler Atrás (p = ${aEulerB.toFixed(3)})`
    }
  ];

  const layout = {
    paper_bgcolor: IUB_COLORS.panel,
    plot_bgcolor: IUB_COLORS.panel,
    font: { family: 'Helvetica Neue, Inter, sans-serif', color: IUB_COLORS.blanco, size: 12 },
    margin: { t: 58, r: 28, b: 58, l: 68 },
    xaxis: {
      title: { text: 'Tiempo Físico t = k·T [segundos]', standoff: 14, font: { size: 13, color: IUB_COLORS.amarillo } },
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    yaxis: {
      title: { text: 'Respuesta del Sistema y(t) / y[k]', standoff: 14, font: { size: 13, color: IUB_COLORS.azul } },
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.16,
      bgcolor: 'rgba(18, 16, 35, 0.90)',
      bordercolor: 'rgba(255, 223, 45, 0.28)',
      borderwidth: 1,
      font: { size: 11 }
    },
    hovermode: 'x unified'
  };

  Plotly.react(el, traces, layout, PLOTLY_CONFIG);

  return {
    aZoh,
    aTus,
    aEulerF,
    aEulerB,
    eulerStable: Math.abs(aEulerF) < 1.0
  };
}

/**
 * 4. SIMULADOR DE CONTROLADOR PI DIGITAL EN FORMA DE VELOCIDAD (CIRCUITO RC + ARDUINO UNO)
 */
function renderDigitalPILoopChart(containerId, piParams) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const { Kp = 2.0, Ki = 2.0, T = 0.04, antiWindup = true } = piParams;
  const tau = 1.0; // RC = 10k * 100uF = 1.0 s
  const Kpl = 1.0;
  const VREF = 5.0;
  const N = Math.min(240, Math.max(60, Math.round(8.0 / T)));

  const a = Math.exp(-T / tau);
  const b = Kpl * (1 - a);
  const q0 = Kp + Ki * T;
  const q1 = -Kp;

  const tArr = [];
  const rArr = [];
  const yArr = [];
  const uArr = [];

  let xPlant = 0.0;
  let uPrev = 0.0;
  let ePrev = 0.0;

  for (let k = 0; k < N; k++) {
    const t = k * T;
    tArr.push(t);
    const ref = t < 4.0 ? 2.5 : 1.5;
    rArr.push(ref);

    // Lectura cuantizada a 10 bits (ADC Arduino UNO)
    const yAdc = Math.round((Math.max(0, Math.min(VREF, xPlant)) * 1023) / VREF) * (VREF / 1023);
    yArr.push(yAdc);

    const e = ref - yAdc;
    let uRaw = uPrev + q0 * e + q1 * ePrev;
    let uSat = Math.max(0.0, Math.min(VREF, uRaw));

    // Cuantización PWM a 8 bits
    const uPwm = Math.round((uSat * 255) / VREF) * (VREF / 255);
    uArr.push(uPwm);

    // Planta RC evolucionando con ZOH exacto
    xPlant = a * xPlant + b * uPwm;

    ePrev = e;
    uPrev = antiWindup ? uSat : uRaw;
  }

  const traces = [
    {
      x: tArr,
      y: rArr,
      mode: 'lines',
      name: 'Referencia r[k] [V]',
      line: { shape: 'hv', color: IUB_COLORS.blanco, width: 2, dash: 'dash' }
    },
    {
      x: tArr,
      y: yArr,
      mode: 'lines+markers',
      name: 'Salida Medida ADC y[k] [V]',
      line: { color: IUB_COLORS.amarillo, width: 2.8 },
      marker: { color: IUB_COLORS.amarillo, size: 5 }
    },
    {
      x: tArr,
      y: uArr,
      mode: 'lines',
      name: 'Acción de Control PWM u[k] [V]',
      line: { shape: 'hv', color: IUB_COLORS.azul, width: 2 }
    }
  ];

  const layout = {
    paper_bgcolor: IUB_COLORS.panel,
    plot_bgcolor: IUB_COLORS.panel,
    font: { family: 'Helvetica Neue, Inter, sans-serif', color: IUB_COLORS.blanco, size: 12 },
    margin: { t: 54, r: 28, b: 58, l: 64 },
    xaxis: {
      title: { text: 'Tiempo de Ejecución en Microcontrolador t [s]', standoff: 14, font: { size: 13, color: IUB_COLORS.amarillo } },
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    yaxis: {
      title: { text: 'Tensión [Voltios] (Límite PWM = 5.0 V)', standoff: 14, font: { size: 13, color: IUB_COLORS.azul } },
      range: [-0.2, 5.4],
      gridcolor: IUB_COLORS.grid,
      zerolinecolor: IUB_COLORS.gris,
      automargin: true
    },
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.15,
      bgcolor: 'rgba(18, 16, 35, 0.90)',
      bordercolor: 'rgba(59, 156, 109, 0.35)',
      borderwidth: 1,
      font: { size: 11 }
    },
    hovermode: 'x unified'
  };

  Plotly.react(el, traces, layout, PLOTLY_CONFIG);

  return { q0, q1, a, b };
}

window.IUBCharts = {
  computeSecondOrderSystem,
  renderTimeDecompositionChart,
  renderZPlaneChart,
  renderDiscretizationComparisonChart,
  renderDigitalPILoopChart
};
