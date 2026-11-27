import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Caso práctico: Compensador de adelanto para servoposicionador) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: servoposicionador mecatrónico compensado</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Planta discreta y especificaciones de diseño (T = 0.1 s)</span>
  <p>
    Para el servomotor discretizado \\(G(z) = \\dfrac{0.04683(z + 0.935)}{(z - 1)(z - 0.81873)}\\), se desea ubicar los
    polos dominantes de lazo cerrado con \\(\\zeta = 0.5\\) y \\(\\omega_n = 4.0\\ \\text{rad/s}\\), es decir,
    \\(z_d = 0.81873\\,e^{j 19.85^\\circ} \\approx 0.7701 + j\\,0.2780\\), mediante un compensador de adelanto
    \\(D(z) = K_c\\dfrac{z - z_0}{z - p_0}\\) que cancele el polo en \\(z = 0.81873\\).
  </p>
</div>

<h2 id="solucion-analitica">5.2 Síntesis analítica paso a paso</h2>
<ol>
  <li><strong>Cancelación del polo lento:</strong> fijamos \\(z_0 = 0.81873\\), simplificando la planta a \\(G'(z) = \\dfrac{0.04683(z+0.935)}{z - 1}\\).</li>
  <li>
    <strong>Deficiencia de fase en \\(z_d = 0.7701 + j\\,0.2780\\):</strong>
    \\[
      \\angle(z_d + 0.935) = 9.26^\\circ, \\quad \\angle(z_d - 1) = 129.59^\\circ
      \\;\\Rightarrow\\; \\angle G'(z_d) = 9.26^\\circ - 129.59^\\circ = -120.33^\\circ
    \\]
    El polo \\(p_0\\) debe aportar \\(-\\theta_{p0} = -180^\\circ - (-120.33^\\circ) \\Rightarrow \\theta_{p0} = 59.67^\\circ\\).
  </li>
  <li>
    <strong>Ubicación del polo \\(p_0\\):</strong>
    \\[
      p_0 = \\mathrm{Re}(z_d) - \\frac{\\mathrm{Im}(z_d)}{\\tan(59.67^\\circ)} = 0.7701 - \\frac{0.2780}{1.7090} \\approx \\mathbf{0.6074}
    \\]
    Como \\(p_0 = 0.6074 &lt; z_0 = 0.81873\\), se confirma un compensador estable de <strong>adelanto de fase</strong>.
  </li>
  <li>
    <strong>Ganancia \\(K_c\\) por condición de magnitud:</strong>
    \\[
      K_c = \\frac{|z_d - 0.6074|\\cdot|z_d - 1|}{0.04683\\,|z_d + 0.935|}
      = \\frac{(0.3221)(0.3608)}{0.04683(1.7275)} \\approx \\mathbf{1.436}
    \\]
  </li>
  <li>
    <strong>Controlador y ley recursiva implementable en microcontrolador:</strong>
    \\[
      D(z) = 1.436\\,\\frac{z - 0.81873}{z - 0.6074} \\;\\Longleftrightarrow\\;
      u[k] = 0.6074\\,u[k-1] + 1.436\\,e[k] - 1.1757\\,e[k-1]
    \\]
  </li>
</ol>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D: Compensado vs. Sin Compensar</h2>
<p>
  Compara en tiempo real el <strong>brazo azul (con compensador \\(D(z)\\))</strong> frente al
  <strong>indicador gris (planta proporcional sin compensar)</strong> en la escena 3D y en la gráfica 2D de respuesta
  temporal y señal de control \\(u[k]\\).
</p>
<div data-viz="compensadorServoSim" data-preset="nominal"></div>
`,objetivos:[`Sintetizar D(z) = 1.436(z − 0.81873)/(z − 0.6074) y su ecuación en diferencias.`,`Comparar en 3D + 2D el desempeño transitorio y esfuerzo de control con y sin compensación.`],presets:{nominal:{params:{Kc:1.436,z0:.819,p0:.607,refDeg:90}}}});export{t as default};