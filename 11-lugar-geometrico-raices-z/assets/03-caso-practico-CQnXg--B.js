import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Caso práctico: LGR de Manipulador Robótico 1 GDL) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: manipulador robótico de 1 GDL discretizado con ZOH</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Planta discreta en lazo abierto (T = 0.1 s)</span>
  <p>
    Un manipulador robótico de 1 grado de libertad discretizado con Retenedor de Orden Cero (\\(T = 0.1\\ \\text{s}\\))
    presenta la función de transferencia de pulso:
  </p>
</div>
\\[
  G(z) = \\frac{0.04683\\,(z + 0.935)}{(z - 1)(z - 0.81873)}
\\]

<h2 id="solucion-analitica">5.2 Construcción analítica del LGR paso a paso</h2>
<ol>
  <li><strong>Polos y ceros:</strong> \\(p_1 = 1.0\\), \\(p_2 = 0.81873\\) (\\(n = 2\\)); cero de muestreo \\(z_1 = -0.935\\) (\\(m = 1\\)); \\(n - m = 1\\) asíntota a \\(\\theta_a = 180^\\circ\\).</li>
  <li><strong>Segmentos en el eje real:</strong> \\([0.81873,\\, 1.0]\\) y \\((-\\infty,\\, -0.935]\\).</li>
  <li>
    <strong>Puntos de ruptura y reingreso (\\(dK/dz = 0\\)):</strong>
    \\[
      (2z - 1.81873)(z + 0.935) - (z^2 - 1.81873z + 0.81873) = 0 \\;\\Rightarrow\\; z^2 + 1.870z - 2.5192 = 0
    \\]
    Las raíces son el punto de ruptura <strong>\\(z_b \\approx 0.9071\\)</strong> (entre los dos polos) y el punto de
    reingreso \\(z_r \\approx -2.777\\) (a la izquierda del cero).
  </li>
  <li>
    <strong>Ganancia para \\(\\zeta \\approx 0.5\\) (\\(z_{\\mathrm{des}} \\approx 0.77 \\pm j\\,0.278\\)):</strong>
    \\[
      K = \\frac{|z_{\\mathrm{des}} - 1|\\cdot|z_{\\mathrm{des}} - 0.81873|}{0.04683\\,|z_{\\mathrm{des}} + 0.935|}
      \\approx \\frac{(0.3608)(0.2823)}{0.04683(1.7275)} \\approx \\mathbf{1.26}
    \\]
  </li>
</ol>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D: Manipulador 1 GDL y LGR en el Plano Z</h2>
<p>
  Desliza la ganancia \\(K\\) para mover los polos de lazo cerrado directamente sobre la circunferencia del LGR en la
  <strong>gráfica 2D</strong> mientras observas en vivo la respuesta angular del <strong>manipulador robótico 3D</strong>.
</p>
<div data-viz="manipuladorLGRSim" data-preset="nominal"></div>
`,objetivos:[`Calcular analíticamente el punto de ruptura z_b ≈ 0.9071 y la ganancia K ≈ 1.26.`,`Observar en 3D + 2D el recorrido de los polos por el LGR y su impacto directo sobre el manipulador.`],presets:{nominal:{params:{K:1.26,refDeg:75}}}});export{t as default};