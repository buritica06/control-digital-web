import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Caso práctico: Brazo robótico y región de polos en Z) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: articulación de brazo robótico industrial</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Especificaciones de desempeño transitorio</span>
  <p>
    Se diseña el lazo de control digital de posición angular para la articulación de hombro de un
    <strong>brazo robótico industrial</strong> muestreado a \\(T = 0.05\\ \\text{s}\\) (\\(f_s = 20\\ \\text{Hz}\\)).
    Los requisitos ante un escalón de referencia son:
  </p>
</div>
<ul>
  <li>Sobrepaso máximo: \\(M_p \\le 16.3\\%\\) (equivalente a \\(\\zeta \\ge 0.5\\)).</li>
  <li>Tiempo de establecimiento al \\(2\\%\\): \\(t_s \\le 1.0\\ \\text{s}\\).</li>
  <li>Periodo de muestreo: \\(T = 0.05\\ \\text{s}\\).</li>
</ul>

<h2 id="solucion-analitica">5.2 Solución analítica paso a paso</h2>
<ol>
  <li>
    <strong>Radio máximo admisible en el plano \\(Z\\):</strong>
    \\[
      \\sigma = \\zeta\\omega_n = \\frac{4}{t_s} = \\frac{4}{1.0} = 4.0\\ \\text{rad/s}
      \\;\\Rightarrow\\; r_{\\max} = e^{-\\sigma T} = e^{-4.0(0.05)} = e^{-0.20} \\approx 0.81873
    \\]
  </li>
  <li>
    <strong>Frecuencia natural \\(\\omega_n\\) y frecuencia amortiguada \\(\\omega_d\\):</strong>
    \\[
      \\omega_n = \\frac{\\sigma}{\\zeta} = \\frac{4.0}{0.5} = 8.0\\ \\text{rad/s}, \\qquad
      \\omega_d = \\omega_n\\sqrt{1 - \\zeta^2} = 8.0\\sqrt{0.75} \\approx 6.9282\\ \\text{rad/s}
    \\]
  </li>
  <li>
    <strong>Ubicación del par de polos dominantes en \\(Z\\):</strong>
    \\[
      \\theta = \\omega_d T = 6.9282(0.05) \\approx 0.34641\\ \\text{rad} \\approx 19.85^\\circ
    \\]
    \\[
      z_{1,2} = r\\,e^{\\pm j\\theta} = 0.81873\\,e^{\\pm j 0.34641} = 0.77007 \\pm j\\,0.27801
    \\]
  </li>
  <li>
    <strong>Polinomio característico deseado de segundo orden:</strong>
    \\[
      P_d(z) = (z - z_1)(z - z_2) = z^2 - 2r\\cos(\\theta)\\,z + r^2 = z^2 - 1.5401\\,z + 0.6703 = 0
    \\]
  </li>
</ol>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D de la articulación robótica</h2>
<p>
  Ajusta \\(\\zeta\\), \\(t_s\\) y el periodo \\(T\\): el <strong>brazo robótico 3D</strong> reproduce en tiempo real la
  dinámica discreta gobernada por \\(P_d(z)\\), mientras la <strong>gráfica 2D</strong> actualiza simultáneamente la
  posición de los polos \\(z_{1,2}\\) y la respuesta al escalón \\(y[k]\\).
</p>
<div data-viz="brazoMapeoSZSim" data-preset="nominal"></div>
`,objetivos:[`Traducir especificaciones de Mp y ts a coordenadas polares y rectangulares en el plano Z.`,`Construir el polinomio característico deseado Pd(z) = z² − 2r·cos(θ)·z + r².`,`Observar en 3D + 2D cómo ζ, ts y T moldean la respuesta transitoria del brazo robótico.`],presets:{nominal:{params:{zeta:.5,ts:1,T:.05,refDeg:60}}}});export{t as default};