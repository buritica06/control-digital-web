/**
 * Punto de entrada principal de la aplicación educativa.
 * Asignatura: MEC36 - Control II | Institución Universitaria de Barranquilla (IUB).
 */

import { initProgreso, registrarHito, reiniciarProgreso } from './ui/progreso.js';
import { initNav } from './ui/nav.js';
import { initTheme } from './ui/theme.js';
import { initRouter } from './router.js';

// Respuestas correctas del cuestionario autoevaluativo
const QUIZ_ANSWERS = {
  1: { correct: 1, explanation: '¡Correcto! La ROC está limitada exteriormente por el polo de mayor módulo: |0.6 + 0.4j| = √(0.36 + 0.16) ≈ 0.721.' },
  2: { correct: 1, explanation: '¡Excelente! El TVF exige estrictamente que todos los polos estén dentro de |z| < 1. Como 1.2 > 1, el sistema es inestable y diverge.' },
  3: { correct: 1, explanation: '¡Exacto! Todo polo real negativo (-1 < z < 0) produce una respuesta alternante muestra a muestra debido al factor (-a)ᵏ.' }
};

// API global IUBApp disponible de inmediato en window
window.IUBApp = {
  resetProgress: () => {
    reiniciarProgreso();
  },
  checkQuiz: (quizId, selectedOption) => {
    const feedbackEl = document.getElementById(`quiz-feedback-${quizId}`);
    if (!feedbackEl) return;

    const data = QUIZ_ANSWERS[quizId];
    if (selectedOption === data.correct) {
      feedbackEl.className = 'mt-3 p-3 rounded-lg text-xs bg-emerald-950/80 border border-iub-verde text-slate-100 flex items-start gap-2';
      feedbackEl.innerHTML = `<span>✅</span> <div><strong>¡Respuesta Correcta!</strong> ${data.explanation}</div>`;
      registrarHito(`quiz-${quizId}`);
    } else {
      feedbackEl.className = 'mt-3 p-3 rounded-lg text-xs bg-red-950/80 border border-iub-coral text-slate-100 flex items-start gap-2';
      feedbackEl.innerHTML = `<span>❌</span> <div><strong>Respuesta incorrecta.</strong> Piénsalo de nuevo o repasa el capítulo correspondiente antes de reintentar.</div>`;
    }
    feedbackEl.classList.remove('hidden');
  }
};

function boot() {
  initTheme();
  initRouter();   // Renderiza los módulos en #app-content primero
  initNav();      // Ahora sí puede enlazar scrollspy con #mod-01...#mod-07
  initProgreso(); // Inicializa y restaura el estado de progreso
  console.log('MEC36 Control II - Semana 2 (Transformada Z) inicializado exitosamente.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
