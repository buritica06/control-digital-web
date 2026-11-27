import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7, 9 y 10 -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li><strong>Estabilidad asintótica discreta:</strong> todas las raíces de \\(P(z) = 0\\) deben satisfacer \\(|z_i| &lt; 1\\).</li>
  <li><strong>Condiciones de Jury:</strong> \\(|a_n| &lt; a_0\\), \\(P(1) &gt; 0\\), \\((-1)^n P(-1) &gt; 0\\) más las desigualdades de las filas impares de la tabla para \\(n \\ge 3\\).</li>
  <li><strong>Triángulo de Jury (\\(n = 2\\)):</strong> sintetiza gráficamente todas las combinaciones estables de \\((a_1, a_2)\\).</li>
  <li><strong>Seguridad en ingeniería:</strong> sintonizar \\(K\\) con margen amplio debajo de \\(K_{\\mathrm{cr}}\\) protege el actuador y al personal.</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — Estabilidad y Criterio de Jury (MEC36-RA3)</caption>
    <thead>
      <tr><th scope="col">Criterio</th><th scope="col">Peso</th><th scope="col">Sobresaliente</th><th scope="col">Aceptable</th><th scope="col">Insuficiente</th></tr>
    </thead>
    <tbody>
      <tr><td>Aplicación de Jury</td><td>45 %</td><td>Plantea y resuelve todas las desigualdades sin errores de signo.</td><td>Evalúa las condiciones iniciales pero falla en un determinante \\(2\\times 2\\).</td><td>Aplica Routh-Hurwitz directo sobre \\(P(z)\\).</td></tr>
      <tr><td>Rango de ganancia \\(K\\)</td><td>35 %</td><td>Intersecta correctamente todas las cotas e identifica \\(K_{\\mathrm{cr}}\\).</td><td>Obtiene las cotas individuales pero no las intersecta.</td><td>No logra despejar \\(K\\).</td></tr>
      <tr><td>Validación 3D + 2D</td><td>20 %</td><td>Verifica el cruce de estabilidad en el simulador y en Python.</td><td>Ejecuta el script sin contrastar con la teoría.</td><td>No realiza verificación.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 4.</li>
  <li>M. S. Fadali y A. Visioli, <em>Digital Control Engineering: Analysis and Design</em>, 3.ª ed. Londres: Academic Press, 2019, cap. 4.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, cap. 3.</li>
</ol>
<pre class="no-math"><code>import numpy as np
K = 2.0
a = np.array([1.0, -1.81873 + 0.04683*K, 0.81873 + 0.04379*K])
ok = (abs(a[-1]) < a[0]) and (np.sum(a) > 0) and (a[0] - a[1] + a[2] > 0)
print("Jury estable:", ok, "Raíces:", np.abs(np.roots(a)))</code></pre>

<h2 id="cierre">10. Cierre del Corte 2 y conexión con el Corte 3</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Puente hacia la Semana 11 (Corte 3) — Lugar Geométrico de las Raíces en Z</span>
  <p>
    Con el Criterio de Jury concluimos el análisis de estabilidad del Corte 2. Tras el Segundo Examen Parcial
    (Semana 10), iniciaremos el <strong>Corte 3 (MEC36-RA4)</strong> en la <strong>Semana 11</strong> trazando las
    trayectorias completas de los polos en función de \\(K\\) mediante el <strong>Lugar Geométrico de las Raíces (LGR)</strong>
    en el plano \\(Z\\).
  </p>
</div>
`,objetivos:[`Consolidar las condiciones de Jury y el cálculo del rango seguro de ganancia.`,`Preparar la transición hacia el Corte 3: Lugar Geométrico de las Raíces en Z (Semana 11).`]});export{t as default};