import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="condiciones-lgr">4.1 Condiciones fundamentales de ángulo y magnitud</h2>
<p>
  Para la ecuación característica en lazo cerrado \\(1 + K\\,G(z) = 0\\) (\\(K \\ge 0\\)), cualquier punto \\(z\\) perteneciente
  al Lugar Geométrico de las Raíces debe satisfacer \\(G(z) = -1/K\\), lo que se desdobla en dos condiciones:
</p>
\\[
  \\angle G(z) = \\pm 180^\\circ(2m + 1) \\quad (m = 0, 1, 2, \\dots) \\qquad \\text{y} \\qquad K = \\frac{1}{|G(z)|}
\\]

<h2 id="reglas-trazado">4.2 Reglas sistemáticas de construcción en el plano \\(Z\\)</h2>
<ol>
  <li><strong>Número de ramas:</strong> igual al número de polos en lazo abierto \\(n\\).</li>
  <li><strong>Inicio y fin:</strong> parten de los \\(n\\) polos (\\(K=0\\)) y terminan en los \\(m\\) ceros finitos o en el infinito (\\(n - m\\) ramas) cuando \\(K \\to \\infty\\).</li>
  <li><strong>Eje real:</strong> un segmento del eje real pertenece al LGR si a su derecha hay un número <em>impar</em> de polos y ceros reales.</li>
  <li><strong>Asíntotas y centroide:</strong>
    \\[
      \\theta_a = \\frac{\\pm 180^\\circ(2m+1)}{n - m}, \\qquad \\sigma_a = \\frac{\\sum p_i - \\sum z_j}{n - m}
    \\]
  </li>
  <li><strong>Puntos de ruptura y reingreso:</strong> se hallan resolviendo \\(\\dfrac{dK}{dz} = 0 \\iff N(z)D'(z) - N'(z)D(z) = 0\\).</li>
  <li><strong>Cruce de estabilidad:</strong> ocurre cuando las ramas cruzan el <strong>círculo unitario \\(|z| = 1\\)</strong> en \\(z_c = e^{j\\theta_c}\\), definiendo \\(K_{\\mathrm{cr}} = 1/|G(z_c)|\\) y \\(\\omega_{\\mathrm{osc}} = \\theta_c/T\\).</li>
</ol>

<div class="table-wrap">
  <table>
    <caption>Comparación entre el LGR continuo (plano S) y el LGR discreto (plano Z)</caption>
    <thead>
      <tr><th scope="col">Característica</th><th scope="col">LGR en el plano \\(S\\)</th><th scope="col">LGR en el plano \\(Z\\)</th></tr>
    </thead>
    <tbody>
      <tr><td>Frontera de estabilidad</td><td>Eje imaginario \\(\\mathrm{Re}(s)=0\\)</td><td>Círculo unitario \\(|z|=1\\)</td></tr>
      <tr><td>Ceros de lazo abierto</td><td>Solo ceros físicos de \\(G_p(s)\\)</td><td>Ceros físicos + <strong>ceros de muestreo del ZOH</strong></td></tr>
      <tr><td>Máxima velocidad</td><td>\\(s \\to -\\infty\\)</td><td>Origen \\(z = 0\\) (deadbeat)</td></tr>
    </tbody>
  </table>
</div>

<h2 id="lab-lgr">4.3 Laboratorio 2D: influencia de polos y ceros de muestreo</h2>
<p>
  Modifica el polo \\(p_2\\) y el cero de muestreo \\(z_1\\) para ver cómo cambian la circunferencia del LGR, el punto de
  ruptura \\(z_b\\) y el cruce con el círculo unitario.
</p>
<div data-viz="lgrReglasZ" data-preset="default"></div>
`,objetivos:[`Aplicar las seis reglas de construcción del LGR en el plano complejo Z.`,`Observar cómo el cero de muestreo atrae las ramas del LGR hacia el semiplano izquierdo.`],presets:{default:{params:{p2:.82,z1:-.935}}}});export{t as default};