import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="estructura-compensador">4.1 Deficiencia de fase y estructura del compensador en \\(Z\\)</h2>
<p>
  Un compensador digital de primer orden tiene la forma:
</p>
\\[
  D(z) = K_c\\,\\frac{z - z_0}{z - p_0}
\\]
<p>
  Para que el polo deseado \\(z_d\\) pertenezca al LGR compensado, el compensador debe aportar exactamente la
  <strong>deficiencia de fase</strong> \\(\\phi\\):
</p>
\\[
  \\angle D(z_d) + \\angle G(z_d) = \\pm 180^\\circ(2m+1) \\;\\Rightarrow\\;
  \\phi = \\angle(z_d - z_0) - \\angle(z_d - p_0) = -180^\\circ - \\angle G(z_d)
\\]

<h2 id="adelanto-vs-atraso">4.2 Compensador de adelanto vs. compensador de atraso</h2>
<ul>
  <li>
    <strong>Compensador de adelanto de fase (\\(0 \\le p_0 &lt; z_0 &lt; 1\\)):</strong> el cero \\(z_0\\) queda más cerca de
    \\(z = 1\\) que el polo \\(p_0\\), aportando fase positiva (\\(\\phi &gt; 0\\)). Atrae el LGR hacia el interior del círculo
    unitario, aumentando \\(\\zeta\\) y reduciendo \\(M_p\\) y \\(t_s\\).
  </li>
  <li>
    <strong>Compensador de atraso de fase (\\(0 &lt; z_0 &lt; p_0 \\le 1\\)):</strong> polo y cero se ubican muy cerca de
    \\(z = 1\\) con \\(p_0 &gt; z_0\\), aportando \\(\\phi \\approx 0^\\circ\\) en \\(z_d\\) pero multiplicando la ganancia DC por
    \\(\\dfrac{1 - z_0}{1 - p_0} \\gg 1\\) para reducir el error en estado estacionario.
  </li>
  <li>
    <strong>Ganancia \\(K_c\\):</strong> se calcula con la condición de magnitud:
    \\[
      K_c = \\frac{|z_d - p_0|}{|z_d - z_0|\\cdot|G(z_d)|}
    \\]
  </li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Comparación de técnicas de diseño de compensadores digitales</caption>
    <thead>
      <tr><th scope="col">Enfoque</th><th scope="col">Ventaja principal</th><th scope="col">Limitación</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Diseño directo en \\(Z\\) (LGR)</strong></td><td>Exacto; no sufre distorsión por discretización.</td><td>Exige álgebra compleja en el círculo unitario.</td></tr>
      <tr><td><strong>Emulación continua (Tustin)</strong></td><td>Reutiliza diseño clásico de Bode / LGR en \\(s\\).</td><td>Requiere \\(f_s\\) alta; distorsión cerca de Nyquist.</td></tr>
      <tr><td><strong>Espacio de estados</strong></td><td>Asigna todos los polos en sistemas MIMO.</td><td>Requiere sensores u observadores de estado.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="lab-adelanto-atraso">4.3 Laboratorio 2D: aporte angular \\(\\phi\\) y ganancia DC</h2>
<p>
  Mueve \\(z_0\\) y \\(p_0\\) respecto a \\(z_d = 0.77 + j\\,0.278\\) para observar la transición entre adelanto (\\(\\phi &gt; 0\\))
  y atraso (\\(\\phi &lt; 0\\)).
</p>
<div data-viz="adelantoAtrasoZ" data-preset="default"></div>
`,objetivos:[`Calcular la deficiencia angular φ en el polo dominante deseado zd.`,`Diferenciar la geometría polo-cero del compensador de adelanto frente al de atraso.`],presets:{default:{params:{z0:.82,p0:.61}}}});export{t as default};