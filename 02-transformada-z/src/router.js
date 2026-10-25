/**
 * Enrutador y coordinador de módulos didácticos.
 * Carga e inicializa módulos bajo demanda con lazy loading de motores gráficos.
 */

import { renderModule01 } from './modules/01-mapeo-conforme/index.js';
import { renderModule02 } from './modules/02-definicion-roc/index.js';
import { renderModule03 } from './modules/03-elementales/index.js';
import { renderModule04 } from './modules/04-teoremas/index.js';
import { renderModule05 } from './modules/05-caso-servomecanismo/index.js';
import { renderModule06 } from './modules/06-ejemplos/index.js';
import { renderModule07 } from './modules/07-ejercicios/index.js';

import { createScene as createPlanoZScene } from './viz/three/planoZ.js';
import { createScene as createROCScene } from './viz/three/superficieROC.js';
import { createChart as createMuestreoChart } from './viz/plotly/respuestaEscalon.js';
import { createChart as createSecuenciasChart } from './viz/plotly/secuencias.js';
import { createChart as createServoChart } from './viz/plotly/errorServomecanismo.js';
import { createGUI } from './ui/gui.js';
import { renderAllMath } from './math/katex-macros.js';

export function initRouter() {
  const contentEl = document.getElementById('app-content');
  if (!contentEl) return;

  // 1. Inyectar HTML solo si no viene ya pre-renderizado en la plantilla estática
  const needsHtml = !contentEl.innerHTML.trim() || contentEl.innerHTML.includes('<!-- El contenido dinámico');
  if (needsHtml) {
    contentEl.innerHTML = `
      ${renderModule01()}
      ${renderModule02()}
      ${renderModule03()}
      ${renderModule04()}
      ${renderModule05()}
      ${renderModule06()}
      ${renderModule07()}
    `;
  }

  // 2. Renderizar KaTeX en todo el documento (cuerpo, menú lateral y módulos)
  renderAllMath(document.body);

  // 3. Montar visualizadores 3D y 2D coordinados con sus paneles lil-gui
  initVisualizations();
}

function initVisualizations() {
  // --- Visualización Módulo 1: Muestreo continuo vs discreto (Plotly 2D) ---
  const muestreoChartEl = document.getElementById('chart-muestreo-container');
  const muestreoGuiEl = document.getElementById('gui-muestreo-container');
  if (muestreoChartEl && muestreoGuiEl) {
    const chart = createMuestreoChart(muestreoChartEl, { T: 0.1, mostrarContinua: true });
    chart.mount();

    const params = { T: 0.1, mostrarContinua: true };
    createGUI(muestreoGuiEl, params, (prop, val) => {
      chart.update({ [prop]: val });
    }, {
      title: 'Parámetros de Muestreo',
      controllers: [
        { property: 'T', name: 'Período T (s)', min: 0.02, max: 0.5, step: 0.01 },
        { property: 'mostrarContinua', name: 'Ver Continua y(t)', options: [true, false] },
      ]
    });
  }

  // --- Visualización Módulo 2: Superficie |X(z)| y Cilindro de ROC (Three.js 3D) ---
  const rocThreeEl = document.getElementById('three-roc-container');
  const rocGuiEl = document.getElementById('gui-roc-container');
  if (rocThreeEl && rocGuiEl) {
    const scene = createROCScene(rocThreeEl, { tipo: 'exponencial', a: 0.819 });
    scene.mount();

    const params = { tipo: 'exponencial', a: 0.819 };
    createGUI(rocGuiEl, params, (prop, val) => {
      scene.update({ [prop]: val });
    }, {
      title: 'Control de Superficie y ROC',
      controllers: [
        { property: 'tipo', name: 'Señal de prueba', options: ['exponencial', 'escalon', 'servo'] },
        { property: 'a', name: 'Polo base a', min: 0.1, max: 1.4, step: 0.01 },
      ]
    });
  }

  // --- Visualización Módulo 3: Catálogo Stem de Secuencias (Plotly 2D) ---
  const secuenciasChartEl = document.getElementById('chart-secuencias-container');
  const secuenciasGuiEl = document.getElementById('gui-secuencias-container');
  if (secuenciasChartEl && secuenciasGuiEl) {
    const chart = createSecuenciasChart(secuenciasChartEl, { tipo: 'exponencial', a: 0.8 });
    chart.mount();

    const params = { tipo: 'exponencial', a: 0.8, T: 0.1 };
    createGUI(secuenciasGuiEl, params, (prop, val) => {
      chart.update({ [prop]: val });
    }, {
      title: 'Parámetros de Forma de Onda',
      controllers: [
        { property: 'tipo', name: 'Tipo de Señal', options: ['impulso', 'escalon', 'rampa', 'exponencial', 'seno-amortiguado'] },
        { property: 'a', name: 'Base a (aᵏ)', min: -1.3, max: 1.3, step: 0.05 },
        { property: 'T', name: 'Período T (rampa)', min: 0.05, max: 0.5, step: 0.05 },
      ]
    });
  }

  // --- Visualización Módulo 4: Plano Z interactivo (Three.js 3D) ---
  const planoZThreeEl = document.getElementById('three-planoz-container');
  const planoZGuiEl = document.getElementById('gui-planoz-container');
  if (planoZThreeEl && planoZGuiEl) {
    const scene = createPlanoZScene(planoZThreeEl, { a1: -1.425, a2: 0.496, b0: 1.0, b1: 0.03 });
    scene.mount();

    const params = { a1: -1.425, a2: 0.496, b0: 1.0, b1: 0.03 };
    createGUI(planoZGuiEl, params, (prop, val) => {
      scene.update({ [prop]: val });
    }, {
      title: 'Polinomios A(z) y B(z)',
      controllers: [
        { property: 'a1', name: 'Coeficiente a₁', min: -2.5, max: 2.5, step: 0.02 },
        { property: 'a2', name: 'Coeficiente a₂', min: -1.5, max: 1.5, step: 0.02 },
        { property: 'b0', name: 'Ganancia b₀', min: 0.1, max: 3.0, step: 0.1 },
        { property: 'b1', name: 'Cero b₁', min: -2.0, max: 2.0, step: 0.05 },
      ]
    });
  }

  // --- Visualización Módulo 5: Caso Servomecanismo (Plotly 2D) ---
  const servoChartEl = document.getElementById('chart-servo-container');
  const servoGuiEl = document.getElementById('gui-servo-container');
  if (servoChartEl && servoGuiEl) {
    const chart = createServoChart(servoChartEl, { T: 0.1, N: 30 });
    chart.mount();

    const params = { T: 0.1, N: 30 };
    createGUI(servoGuiEl, params, (prop, val) => {
      chart.update({ [prop]: val });
    }, {
      title: 'Muestreo del Servomecanismo',
      controllers: [
        { property: 'T', name: 'Período T (s)', min: 0.02, max: 0.3, step: 0.02 },
        { property: 'N', name: 'Número de Muestras', min: 10, max: 60, step: 5 },
      ]
    });
  }
}
