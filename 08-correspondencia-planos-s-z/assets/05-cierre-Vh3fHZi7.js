import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7, 9 y 10 -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li><strong>Mapeo \\(z = e^{sT}\\):</strong> proyecta el semiplano izquierdo de Laplace al interior del círculo unitario \\(|z| &lt; 1\\).</li>
  <li><strong>Círculos de \\(t_s\\):</strong> \\(|z| = e^{-4T/t_s}\\); menor radio implica decaimiento más veloz.</li>
  <li><strong>Espirales de \\(\\zeta\\):</strong> \\(|z| = \\exp\\!\\left(-\\frac{\\zeta}{\\sqrt{1-\\zeta^2}}\\theta\\right)\\); mayor \\(\\zeta\\) reduce el sobrepaso \\(M_p\\).</li>
  <li><strong>Polinomio deseado:</strong> \\(P_d(z) = z^2 - 2r\\cos(\\theta)\\,z + r^2\\) sirve como objetivo directo para el diseño en el Corte 3.</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — Mapeo S → Z (MEC36-RA3)</caption>
    <thead>
      <tr><th scope="col">Criterio</th><th scope="col">Peso</th><th scope="col">Sobresaliente</th><th scope="col">Aceptable</th><th scope="col">Insuficiente</th></tr>
    </thead>
    <tbody>
      <tr><td>Cálculo de polos en \\(Z\\)</td><td>45 %</td><td>Obtiene \\(r, \\theta, z_{1,2}\\) y \\(P_d(z)\\) con total exactitud desde \\(M_p, t_s, T\\).</td><td>Comete errores menores de conversión grados/radianes.</td><td>Confunde coordenadas de \\(S\\) con \\(Z\\).</td></tr>
      <tr><td>Interpretación geométrica</td><td>35 %</td><td>Delimita la región admisible e interpreta modos reales negativos y deadbeat.</td><td>Identifica el círculo unitario pero no las espirales de \\(\\zeta\\).</td><td>No relaciona \\(|z|\\) con la velocidad de respuesta.</td></tr>
      <tr><td>Validación 3D + 2D</td><td>20 %</td><td>Corrobora los parámetros en el simulador del brazo robótico y en Python.</td><td>Ejecuta el simulador sin cuantificar \\(M_p\\) ni \\(t_s\\).</td><td>No realiza verificación computacional.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 4.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, cap. 3.</li>
  <li>M. S. Fadali y A. Visioli, <em>Digital Control Engineering: Analysis and Design</em>, 3.ª ed. Londres: Academic Press, 2019, cap. 4.</li>
</ol>
<pre class="no-math"><code>import numpy as np
Mp, ts, T = 16.3, 1.0, 0.05
zeta = -np.log(Mp/100) / np.sqrt(np.pi**2 + np.log(Mp/100)**2)
sigma = 4.0 / ts
wd = (sigma / zeta) * np.sqrt(1 - zeta**2)
r, theta = np.exp(-sigma * T), wd * T
print(f"z = {r*np.cos(theta):.5f} +/- j{r*np.sin(theta):.5f}, r={r:.5f}")</code></pre>

<h2 id="cierre">10. Cierre y conexión con el siguiente módulo</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Puente hacia la Semana 9 — Análisis de Estabilidad y Criterio de Jury</span>
  <p>
    Sabemos que la estabilidad exige que todas las raíces de la ecuación característica residan dentro de \\(|z| &lt; 1\\).
    En la <strong>Semana 9</strong> aprenderemos a verificar esta condición sin factorizar polinomios de orden superior
    mediante el <strong>Criterio Algebraico de Estabilidad de Jury</strong>.
  </p>
</div>
`,objetivos:[`Sintetizar la geometría del mapeo z = e^(sT) y las regiones de desempeño.`,`Verificar el cálculo analítico con Python y la rúbrica de evaluación.`,`Conectar la condición |z| < 1 con el Criterio Algebraico de Jury (Semana 9).`]});export{t as default};