import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="mapeo-conforme">4.1 Mapeo conforme \\(z = e^{sT}\\) y banda primaria</h2>
<p>
  Sustituyendo la frecuencia compleja continua \\(s = \\sigma + j\\omega\\) en \\(z = e^{sT}\\) se obtiene la representación
  polar exacta en el plano \\(Z\\):
</p>
\\[
  z = e^{(\\sigma + j\\omega)T} = e^{\\sigma T}\\,e^{j\\omega T} = r\\,e^{j\\theta}
  \\qquad \\text{donde} \\qquad r = |z| = e^{\\sigma T}, \\quad \\theta = \\angle z = \\omega T\\ [\\text{rad}]
\\]
<ul>
  <li><strong>Semiplano izquierdo (\\(\\sigma &lt; 0\\)):</strong> se mapea al <em>interior</em> del círculo unitario (\\(|z| &lt; 1\\), estable).</li>
  <li><strong>Eje imaginario (\\(\\sigma = 0\\)):</strong> se mapea sobre la <em>circunferencia unitaria</em> (\\(|z| = 1\\), marginal).</li>
  <li><strong>Semiplano derecho (\\(\\sigma &gt; 0\\)):</strong> se mapea al <em>exterior</em> del círculo unitario (\\(|z| &gt; 1\\), inestable).</li>
  <li><strong>Banda primaria:</strong> como \\(e^{j(\\omega + k\\omega_s)T} = e^{j\\omega T}\\), toda la franja \\(-\\frac{\\omega_s}{2} \\le \\omega \\le \\frac{\\omega_s}{2}\\) cubre una vuelta completa del círculo unitario; las franjas complementarias se superponen (aliasing en el plano complejo).</li>
</ul>

<figure class="figura">
  <img
    src="./assets/images/mapeo-s-z.svg"
    alt="Mapeo conforme de la banda primaria del semiplano izquierdo S al interior del círculo unitario en Z"
    loading="lazy"
  />
  <figcaption>Figura 1. Correspondencia entre la banda primaria del plano \\(S\\) y el círculo unitario del plano \\(Z\\).</figcaption>
</figure>

<h2 id="curvas-zeta-ts">4.2 Curvas de amortiguamiento \\(\\zeta\\), tiempo de establecimiento \\(t_s\\) y \\(\\omega_n\\)</h2>
<ul>
  <li>
    <strong>Círculos de tiempo de establecimiento constante (\\(t_s \\approx 4/\\sigma\\)):</strong> una recta vertical
    \\(\\sigma = -\\sigma_0\\) en \\(S\\) se convierte en un <strong>círculo concéntrico</strong> en \\(Z\\):
    \\[
      |z| = e^{-\\sigma_0 T} = e^{-4T / t_s}
    \\]
    Cuanto más cerca del origen \\(z = 0\\) estén los polos, más rápido decae el transitorio.
  </li>
  <li>
    <strong>Espirales logarítmicas de amortiguamiento \\(\\zeta\\) constante:</strong> un rayo desde el origen en \\(S\\) con
    \\(s = -\\zeta\\omega_n \\pm j\\omega_n\\sqrt{1-\\zeta^2}\\) se mapea en una espiral que parte de \\(z = 1\\) y converge al origen:
    \\[
      |z| = \\exp\\!\\left(-\\frac{\\zeta}{\\sqrt{1 - \\zeta^2}}\\,\\theta\\right), \\qquad \\theta = \\omega_d T = \\omega_n\\sqrt{1-\\zeta^2}\\,T
    \\]
  </li>
  <li>
    <strong>Curvas de frecuencia natural \\(\\omega_n\\) constante:</strong> parten del eje real positivo y se curvan hacia
    el origen intersecando ortogonalmente a las espirales de \\(\\zeta\\) constante.
  </li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Interpretación física de la ubicación de polos en el plano Z</caption>
    <thead>
      <tr><th scope="col">Ubicación en \\(Z\\)</th><th scope="col">Modo discreto</th><th scope="col">Comportamiento físico</th></tr>
    </thead>
    <tbody>
      <tr><td>\\(z = 1\\)</td><td>Constante \\(1^k\\)</td><td>Integrador puro (polo en \\(s = 0\\)).</td></tr>
      <tr><td>\\(0.7 &lt; z &lt; 1\\)</td><td>Exponencial lenta</td><td>Respuesta suave, bien amortiguada, sin oscilación.</td></tr>
      <tr><td>\\(z = 0\\)</td><td>Anulación en 1 paso</td><td><strong>Respuesta deadbeat</strong> (tiempo mínimo finito).</td></tr>
      <tr><td>\\(-1 &lt; z &lt; 0\\)</td><td>\\((-1)^k |z|^k\\)</td><td>Alternancia de signo a \\(\\omega_s/2\\) (indeseable en mecánica).</td></tr>
      <tr><td>\\(|z| = 1\\)</td><td>Senoidal sostenida</td><td>Estabilidad marginal (oscilación permanente).</td></tr>
      <tr><td>\\(|z| &gt; 1\\)</td><td>Creciente</td><td>Sistema inestable (divergencia y saturación).</td></tr>
    </tbody>
  </table>
</div>

<h2 id="lab-zgrid">4.3 Laboratorio 2D: malla <code>zgrid</code> interactiva</h2>
<p>
  Ajusta \\(\\zeta\\), \\(t_s\\) y el periodo \\(T\\) para visualizar cómo cambian la espiral de amortiguamiento constante, el
  círculo de asentamiento \\(|z| = e^{-4T/t_s}\\) y el par de polos dominantes \\(z_{1,2} = r e^{\\pm j\\theta}\\).
</p>
<div data-viz="curvasZGrid" data-preset="default"></div>
`,objetivos:[`Interpretar el mapeo z = e^(sT) y la periodicidad de las bandas de Laplace.`,`Distinguir las espirales de ζ constante, círculos de t_s y modos sobre el eje real negativo.`,`Ubicar polos dominantes dentro de la región admisible en el plano Z.`],presets:{default:{params:{zeta:.5,ts:1,T:.05}}}});export{t as default};