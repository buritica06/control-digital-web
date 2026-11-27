import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7, 9 y 10 -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li><strong>Condiciones de Evans en \\(Z\\):</strong> \\(\\angle G(z) = \\pm 180^\\circ(2m+1)\\) define la trayectoria; \\(K = 1/|G(z)|\\) fija la ganancia.</li>
  <li><strong>Punto de ruptura:</strong> marca la transición entre respuesta sobreamortiguada (polos reales) y subamortiguada (polos complejos conjugados).</li>
  <li><strong>Cruce de \\(|z| = 1\\):</strong> determina gráficamente \\(K_{\\mathrm{cr}}\\) y la frecuencia de oscilación \\(\\omega_{\\mathrm{osc}} = \\theta_c/T\\).</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — LGR en el plano Z (MEC36-RA4 · CE1)</caption>
    <thead>
      <tr><th scope="col">Criterio</th><th scope="col">Peso</th><th scope="col">Sobresaliente</th><th scope="col">Aceptable</th><th scope="col">Insuficiente</th></tr>
    </thead>
    <tbody>
      <tr><td>Reglas de trazado</td><td>45 %</td><td>Determina correctamente eje real, asíntotas, ruptura y cruce con \\(|z|=1\\).</td><td>Traza eje real y asíntotas pero omite el punto de ruptura.</td><td>Confunde la frontera de estabilidad con el eje imaginario.</td></tr>
      <tr><td>Condición de magnitud</td><td>35 %</td><td>Calcula \\(K\\) exactamente en el polo deseado \\(z_{\\mathrm{des}}\\).</td><td>Aplica la fórmula con errores menores de módulo complejo.</td><td>No utiliza la condición de magnitud.</td></tr>
      <tr><td>Validación computacional</td><td>20 %</td><td>Corrobora los polos de lazo cerrado en el simulador 3D+2D y en Python.</td><td>Simula sin contrastar con el cálculo manual.</td><td>No realiza simulación.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 4.</li>
  <li>B. C. Kuo, <em>Digital Control Systems</em>, 2.ª ed. Nueva York: Oxford University Press, 1995, cap. 7.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, cap. 5.</li>
</ol>
<pre class="no-math"><code>import control as ctrl, numpy as np
Gz = ctrl.TransferFunction([0.04683, 0.04683 * 0.935], [1.0, -1.81873, 0.81873], dt=0.1)
Tcl = ctrl.feedback(1.26 * Gz, 1)
print("Polos LC (K=1.26):", ctrl.poles(Tcl), "|z|:", np.abs(ctrl.poles(Tcl)))</code></pre>

<h2 id="cierre">10. Cierre y conexión con el siguiente módulo</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Puente hacia la Semana 12 — Compensadores Digitales de Adelanto y Atraso</span>
  <p>
    Cuando el LGR de la planta original no pasa por la región deseada de desempeño, debemos deformar las ramas añadiendo
    polos y ceros. En la <strong>Semana 12</strong> diseñaremos <strong>compensadores digitales de adelanto y atraso de fase</strong>
    utilizando el defecto de ángulo en el LGR.
  </p>
</div>
`,objetivos:[`Consolidar las reglas de trazado del LGR discreto y la condición de magnitud.`,`Preparar el diseño de compensadores de adelanto y atraso mediante el LGR (Semana 12).`]});export{t as default};