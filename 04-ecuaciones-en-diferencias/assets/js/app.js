/**
 * Controlador Pedagógico Principal, Barra de Progreso, Laboratorio Simbólico-Numérico y Autoevaluación
 * Asignatura: MEC36 - Control II | Semana 04: Ecuaciones en Diferencias
 * Institución Universitaria de Barranquilla (IUB)
 */

(function () {
  const STORAGE_KEY = 'iub_mec36_semana04_ecdif_progress_v1';

  const MILESTONES = [
    'mod_intro',
    'mod_math',
    'mod_phys',
    'mod_step',
    'mod_apps',
    'manim_scene1',
    'manim_scene2',
    'manim_scene3',
    'manim_scene4',
    'lab_interacted',
    'examples_reviewed',
    'exercises_solved'
  ];

  let completedSet = new Set();

  // Presets de ecuaciones en diferencias de 2.º orden:
  // y[k] + a1*y[k-1] + a2*y[k-2] = b0*u[k] + b1*u[k-1]
  const SYSTEM_PRESETS = {
    servo_ci: {
      name: 'Caso Estudio Semana 4: Servomecanismo con CI (y[-1]=2, y[-2]=1)',
      a1: -1.3,
      a2: 0.4,
      b0: 1.0,
      b1: 0.0,
      ym1: 2.0,
      ym2: 1.0,
      uAmp: 1.0
    },
    canonical_3m: {
      name: 'Ejemplo Base 3 Métodos: y[k] - 0.7y[k-1] + 0.1y[k-2] = u[k] (CI nulas)',
      a1: -0.7,
      a2: 0.1,
      b0: 1.0,
      b1: 0.0,
      ym1: 0.0,
      ym2: 0.0,
      uAmp: 1.0
    },
    complex_underdamped: {
      name: 'Subamortiguado Complejo: y[k] - 1.0y[k-1] + 0.5y[k-2] = u[k] (r=0.707, θ=45°)',
      a1: -1.0,
      a2: 0.5,
      b0: 1.0,
      b1: 0.0,
      ym1: 1.0,
      ym2: 0.0,
      uAmp: 1.0
    },
    alternating_pole: {
      name: 'Polo Real Negativo Alternante: y[k] + 0.65y[k-1] = u[k] (p = -0.65)',
      a1: 0.65,
      a2: 0.0,
      b0: 1.0,
      b1: 0.0,
      ym1: 1.5,
      ym2: 0.0,
      uAmp: 1.0
    },
    unstable_jury: {
      name: 'Sistema Inestable (Viola Jury): y[k] - 1.45y[k-1] + 0.35y[k-2] = u[k]',
      a1: -1.45,
      a2: 0.35,
      b0: 1.0,
      b1: 0.0,
      ym1: 0.5,
      ym2: 0.0,
      uAmp: 1.0
    }
  };

  // Respuestas esperadas para los 4 ejercicios propuestos interactivos
  const EXERCISE_SOLUTIONS = {
    ex1: { expected: 15.74, tol: 0.25, unit: '°C', msg: '¡Correcto! θ(10) = 40·(1 - 0.951229¹⁰) = 15.74 °C.' },
    ex2: { expected: 3.20, tol: 0.05, unit: 'rad', msg: '¡Exacto! Para k=0: y[0] = 1.3(2) - 0.4(1) + 1 = 3.2000.' },
    ex3: { expected: 2.04, tol: 0.03, unit: '', msg: '¡Correcto! q₀ = Kp + Ki·T = 2.0 + 2.0(0.02) = 2.04.' },
    ex4: { expected: 240.0, tol: 1.0, unit: 's', msg: '¡Muy bien! Con p = 1 - T/120, |p| < 1 exige T < 2·τ = 240 s.' }
  };

  // Respuestas correctas del Quiz de 5 preguntas (índice 0-based)
  const QUIZ_ANSWERS = {
    q1: {
      correct: 1,
      explanation: 'Por el teorema de traslación hacia atrás, Z{y[k-1]} = z⁻¹Y(z) + y[-1]. Omitir y[-1] equivale a ignorar la energía inicial almacenada.'
    },
    q2: {
      correct: 2,
      explanation: 'Los pares elementales de transformada Z tienen un factor z en el numerador: z/(z-p) ↔ p^k. Por eso se expande Y(z)/z en fracciones parciales y luego se multiplica por z.'
    },
    q3: {
      correct: 0,
      explanation: 'La planta física precedida por un DAC mantiene constante la señal entre muestras, lo cual corresponde exactamente al modelo invariante al escalón (ZOH).'
    },
    q4: {
      correct: 2,
      explanation: 'Un polo en z = -0.6 tiene módulo |-0.6| = 0.6 < 1, por lo que es asintóticamente estable, pero su modo (-0.6)^k alterna de signo en cada muestra (frecuencia de Nyquist ω_s/2).'
    },
    q5: {
      correct: 1,
      explanation: 'Para P(z) = z² + a₁z + a₂, el criterio de Jury exige tres condiciones necesarias y suficientes: P(1) > 0, P(-1) > 0 y |a₂| < 1.'
    }
  };

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          arr.forEach(m => {
            if (MILESTONES.includes(m)) completedSet.add(m);
          });
        }
      }
    } catch (_) {}
    updateProgressUI();
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedSet)));
    } catch (_) {}
  }

  function markMilestone(id) {
    if (!MILESTONES.includes(id)) return;
    if (!completedSet.has(id)) {
      completedSet.add(id);
      saveProgress();
      updateProgressUI();
    }
  }

  function resetProgress() {
    completedSet.clear();
    saveProgress();
    updateProgressUI();
  }

  function updateProgressUI() {
    const total = MILESTONES.length;
    const count = completedSet.size;
    const pct = Math.round((count / total) * 100);

    const barEl = document.getElementById('learningProgressBar');
    const txtEl = document.getElementById('learningProgressText');
    const countEl = document.getElementById('learningProgressCount');

    if (barEl) barEl.style.width = `${pct}%`;
    if (txtEl) txtEl.textContent = `${pct}% Completado`;
    if (countEl) countEl.textContent = `${count} / ${total} Hitos`;

    // Actualizar indicadores visuales en tarjetas de módulos
    document.querySelectorAll('[data-milestone-badge]').forEach(el => {
      const mId = el.getAttribute('data-milestone-badge');
      if (completedSet.has(mId)) {
        el.textContent = '✓ Completado';
        el.classList.remove('bg-space-800', 'text-slate-400');
        el.classList.add('bg-iub-verde', 'text-iub-blanco');
      } else {
        el.textContent = 'Pendiente';
        el.classList.add('bg-space-800', 'text-slate-400');
        el.classList.remove('bg-iub-verde', 'text-iub-blanco');
      }
    });
  }

  /**
   * Lee los controles deslizantes del laboratorio de ecuaciones en diferencias y actualiza:
   * - Gráfica 1 (Respuesta Temporal Libre + Forzada + Total)
   * - Gráfica 2 (Plano Complejo Z y Polos)
   * - Visor 3D Three.js
   * - Indicadores de Jury y Tabla Comparativa
   */
  function updateMainDifferenceLab() {
    const a1 = parseFloat(document.getElementById('sliderA1')?.value ?? -1.3);
    const a2 = parseFloat(document.getElementById('sliderA2')?.value ?? 0.4);
    const b0 = parseFloat(document.getElementById('sliderB0')?.value ?? 1.0);
    const ym1 = parseFloat(document.getElementById('sliderYm1')?.value ?? 2.0);
    const ym2 = parseFloat(document.getElementById('sliderYm2')?.value ?? 1.0);
    const activeK = parseInt(document.getElementById('sliderActiveK')?.value ?? 3, 10);

    // Actualizar etiquetas de sliders
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt('valA1', a1.toFixed(2));
    setTxt('valA2', a2.toFixed(2));
    setTxt('valB0', b0.toFixed(2));
    setTxt('valYm1', ym1.toFixed(2));
    setTxt('valYm2', ym2.toFixed(2));
    setTxt('valActiveK', `k = ${activeK}`);

    const params = { a1, a2, b0, b1: 0.0, ym1, ym2, uAmp: 1.0, activeK, N: 18 };
    if (!window.IUBCharts) return;

    const simData = window.IUBCharts.computeSecondOrderSystem(params);
    window.IUBCharts.renderTimeDecompositionChart('chart-response-decomp', simData);
    window.IUBCharts.renderZPlaneChart('chart-zplane-poles', simData);

    if (window.IUBViewer3D) {
      window.IUBViewer3D.updateViewer3DParams(params);
    }

    // Actualizar telemetría de polos y Jury
    const p1 = simData.poles[0];
    const p2 = simData.poles[1];
    const polesStr =
      Math.abs(p1.im) < 1e-5
        ? `p₁ = ${p1.re.toFixed(3)},  p₂ = ${p2.re.toFixed(3)}`
        : `p₁,₂ = ${p1.re.toFixed(3)} ± j${Math.abs(p1.im).toFixed(3)} (|p|=${simData.maxPoleMag.toFixed(3)})`;
    setTxt('hudPolesText', polesStr);

    const kIdx = Math.min(simData.yTotal.length - 1, Math.max(0, activeK));
    setTxt('hudSampleValues', `y[${kIdx}] = ${simData.yTotal[kIdx].toFixed(4)} (Libre: ${simData.yLibre[kIdx].toFixed(4)} | Forz: ${simData.yForzada[kIdx].toFixed(4)})`);

    const juryBadge = document.getElementById('hudJuryBadge');
    if (juryBadge) {
      if (simData.jury.isStable) {
        juryBadge.textContent = `✓ BIBO Estable (|p|_máx = ${simData.maxPoleMag.toFixed(3)} < 1)`;
        juryBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-black bg-iub-verde/30 text-emerald-300 border border-emerald-400/50';
      } else {
        juryBadge.textContent = `⚠ Inestable / Marginal (|p|_máx = ${simData.maxPoleMag.toFixed(3)} ≥ 1)`;
        juryBadge.className = 'px-2.5 py-1 rounded-lg text-xs font-black bg-red-900/40 text-red-300 border border-red-400/50';
      }
    }

    // Condiciones individuales de Jury
    setTxt('juryCond1', `P(1) = ${simData.jury.p1.toFixed(3)} ${simData.jury.p1 > 0 ? '> 0 ✓' : '≤ 0 ✗'}`);
    setTxt('juryCond2', `P(-1) = ${simData.jury.pm1.toFixed(3)} ${simData.jury.pm1 > 0 ? '> 0 ✓' : '≤ 0 ✗'}`);
    setTxt('juryCond3', `|a₂| = ${simData.jury.a2Abs.toFixed(3)} ${simData.jury.a2Abs < 1 ? '< 1 ✓' : '≥ 1 ✗'}`);

    // Actualizar tabla dinámica de verificación paso a paso (k = 0..8)
    const tbody = document.getElementById('dynamicRecursionTableBody');
    if (tbody) {
      let rowsHtml = '';
      for (let k = 0; k <= 8; k++) {
        const yk_1 = k >= 1 ? simData.yTotal[k - 1] : ym1;
        const yk_2 = k >= 2 ? simData.yTotal[k - 2] : (k === 1 ? ym1 : ym2);
        const isCurrent = k === activeK;
        rowsHtml += `
          <tr class="${isCurrent ? 'bg-iub-amarillo/20 font-bold text-iub-amarillo' : 'border-b border-slate-800/80 text-slate-200'}">
            <td class="px-3 py-2 font-mono">${k}</td>
            <td class="px-3 py-2 font-mono">${yk_1.toFixed(4)}</td>
            <td class="px-3 py-2 font-mono">${yk_2.toFixed(4)}</td>
            <td class="px-3 py-2 font-mono text-orange-300">${simData.yLibre[k].toFixed(4)}</td>
            <td class="px-3 py-2 font-mono text-cyan-300">${simData.yForzada[k].toFixed(4)}</td>
            <td class="px-3 py-2 font-mono font-bold text-iub-amarillo">${simData.yTotal[k].toFixed(4)}</td>
          </tr>`;
      }
      tbody.innerHTML = rowsHtml;
    }
  }

  function applySystemPreset(presetKey) {
    const p = SYSTEM_PRESETS[presetKey];
    if (!p) return;

    const setVal = (id, v) => {
      const el = document.getElementById(id);
      if (el) el.value = v;
    };
    setVal('sliderA1', p.a1);
    setVal('sliderA2', p.a2);
    setVal('sliderB0', p.b0);
    setVal('sliderYm1', p.ym1);
    setVal('sliderYm2', p.ym2);

    const sel = document.getElementById('selectSystemPreset');
    if (sel) sel.value = presetKey;

    markMilestone('lab_interacted');
    updateMainDifferenceLab();
  }

  /**
   * Actualiza la gráfica comparativa de discretización (Motor DC / Planta RC)
   */
  function updateDiscretizationLab() {
    const T = parseFloat(document.getElementById('sliderDiscT')?.value ?? 0.05);
    const tau = parseFloat(document.getElementById('sliderDiscTau')?.value ?? 0.5);
    const K = parseFloat(document.getElementById('sliderDiscK')?.value ?? 20.0);

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setTxt('valDiscT', `${T.toFixed(2)} s`);
    setTxt('valDiscTau', `${tau.toFixed(2)} s`);
    setTxt('valDiscK', `${K.toFixed(1)}`);

    if (!window.IUBCharts) return;
    const res = window.IUBCharts.renderDiscretizationComparisonChart('chart-discretization-compare', {
      K,
      tau,
      T,
      uStep: 6.0
    });

    if (res) {
      setTxt('discPoleZoh', res.aZoh.toFixed(4));
      setTxt('discPoleTus', res.aTus.toFixed(4));
      setTxt('discPoleEf', `${res.aEulerF.toFixed(4)} ${res.eulerStable ? '(Estable)' : '(¡INESTABLE!)'}`);
      setTxt('discPoleEb', res.aEulerB.toFixed(4));
    }
  }

  /**
   * Actualiza el simulador de lazo cerrado con Controlador PI Digital en forma de velocidad
   */
  function updatePILoopLab() {
    const Kp = parseFloat(document.getElementById('sliderPiKp')?.value ?? 2.0);
    const Ki = parseFloat(document.getElementById('sliderPiKi')?.value ?? 2.0);
    const T = parseFloat(document.getElementById('sliderPiT')?.value ?? 0.04);
    const antiWindup = document.getElementById('chkAntiWindup')?.checked ?? true;

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setTxt('valPiKp', Kp.toFixed(2));
    setTxt('valPiKi', Ki.toFixed(2));
    setTxt('valPiT', `${T.toFixed(2)} s`);

    if (!window.IUBCharts) return;
    const res = window.IUBCharts.renderDigitalPILoopChart('chart-pi-digital-loop', {
      Kp,
      Ki,
      T,
      antiWindup
    });

    if (res) {
      setTxt('piCoeffQ0', res.q0.toFixed(4));
      setTxt('piCoeffQ1', res.q1.toFixed(4));
    }
  }

  /**
   * Verificador numérico de los 4 ejercicios propuestos
   */
  function checkProposedExercise(exId) {
    const spec = EXERCISE_SOLUTIONS[exId];
    const inputEl = document.getElementById(`input-${exId}`);
    const fbEl = document.getElementById(`feedback-${exId}`);
    if (!spec || !inputEl || !fbEl) return;

    const userVal = parseFloat(inputEl.value);
    if (Number.isNaN(userVal)) {
      fbEl.textContent = 'Por favor ingresa un valor numérico válido.';
      fbEl.className = 'text-xs font-bold text-amber-300 mt-2';
      return;
    }

    if (Math.abs(userVal - spec.expected) <= spec.tol) {
      fbEl.textContent = spec.msg;
      fbEl.className = 'text-xs font-bold text-emerald-300 mt-2 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40';
      markMilestone('exercises_solved');
    } else {
      fbEl.textContent = `Valor incorrecto (${userVal}). Revisa la pista o despliega la solución paso a paso.`;
      fbEl.className = 'text-xs font-bold text-red-300 mt-2 p-2 rounded-lg bg-red-950/60 border border-red-500/40';
    }
  }

  /**
   * Calificador del Quiz Conceptual de 5 Preguntas
   */
  function evaluateConceptualQuiz() {
    let score = 0;
    const total = Object.keys(QUIZ_ANSWERS).length;

    Object.entries(QUIZ_ANSWERS).forEach(([qId, info]) => {
      const selected = document.querySelector(`input[name="${qId}"]:checked`);
      const fb = document.getElementById(`quiz-fb-${qId}`);
      if (!fb) return;

      if (!selected) {
        fb.textContent = '⚠ Selecciona una opción antes de calificar.';
        fb.className = 'text-xs font-semibold text-amber-300 mt-2 block';
        return;
      }

      const val = parseInt(selected.value, 10);
      if (val === info.correct) {
        score++;
        fb.textContent = `✓ ¡Correcto! ${info.explanation}`;
        fb.className = 'text-xs font-semibold text-emerald-300 mt-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 block';
      } else {
        fb.textContent = `✗ Incorrecto. ${info.explanation}`;
        fb.className = 'text-xs font-semibold text-red-300 mt-2 p-2.5 rounded-lg bg-red-950/60 border border-red-500/40 block';
      }
    });

    const summaryEl = document.getElementById('quizScoreSummary');
    if (summaryEl) {
      const pct = Math.round((score / total) * 100);
      summaryEl.textContent = `Calificación obtenida: ${score} / ${total} (${pct}%)`;
      summaryEl.className =
        score >= 4
          ? 'text-sm font-black text-emerald-300 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-400/50'
          : 'text-sm font-black text-amber-300 px-4 py-2 rounded-xl bg-amber-950/80 border border-amber-400/50';
    }

    if (score >= 3) {
      markMilestone('exercises_solved');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadProgress();

    // Inicializar Visor 3D Three.js
    if (window.IUBViewer3D) {
      window.IUBViewer3D.initViewer3D('threejs-stage-container');
    }

    // Inicializar todas las gráficas Plotly
    updateMainDifferenceLab();
    updateDiscretizationLab();
    updatePILoopLab();

    // Inicializar primera escena de Manim
    if (typeof window.selectManimScene === 'function') {
      window.selectManimScene('scene1');
    }

    // Observador de intersección para marcar automáticamente los capítulos leídos al hacer scroll
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const mId = entry.target.getAttribute('data-milestone');
            if (mId) markMilestone(mId);
          }
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll('[data-milestone]').forEach(sec => sectionObserver.observe(sec));
  });

  window.IUBApp = {
    markMilestone,
    resetProgress,
    updateMainDifferenceLab,
    applySystemPreset,
    updateDiscretizationLab,
    updatePILoopLab,
    checkProposedExercise,
    evaluateConceptualQuiz
  };
})();
