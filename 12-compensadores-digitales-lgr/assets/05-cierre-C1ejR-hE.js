import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7, 9 y 10 -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li><strong>Compensador de adelanto (\\(0 \\le p_0 &lt; z_0 &lt; 1\\)):</strong> aporta fase positiva en \\(z_d\\), mejora \\(\\zeta\\), reduce \\(M_p\\) y acelera \\(t_s\\).</li>
  <li><strong>Compensador de atraso (\\(0 &lt; z_0 &lt; p_0 \\le 1\\)):</strong> incrementa la ganancia en \\(z \\to 1\\) para reducir el error estacionario sin deformar el LGR dominante.</li>
  <li><strong>Implementación digital:</strong> \\(D(z) = K_c\\frac{z-z_0}{z-p_0}\\) se programa directamente como \\(u[k] = p_0 u[k-1] + K_c e[k] - K_c z_0 e[k-1]\\).</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — Compensadores digitales por LGR (MEC36-RA4 · CE1)</caption>
    <thead>
      <tr><th scope="col">Criterio</th><th scope="col">Peso</th><th scope="col">Sobresaliente</th><th scope="col">Aceptable</th><th scope="col">Insuficiente</th></tr>
    </thead>
    <tbody>
      <tr><td>Deficiencia de fase y \\(p_0\\)</td><td>45 %</td><td>Calcula \\(\\phi\\), \\(p_0\\) y verifica \\(|p_0| &lt; 1\\) sin errores.</td><td>Calcula \\(\\phi\\) pero comete error trigonométrico en \\(p_0\\).</td><td>Invierte el orden de polo y cero.</td></tr>
      <tr><td>Ganancia \\(K_c\\) y ecuación \\(u[k]\\)</td><td>35 %</td><td>Obtiene \\(K_c\\) y deriva la ley recursiva exacta.</td><td>Calcula \\(K_c\\) pero omite la ecuación en diferencias.</td><td>No aplica la condición de magnitud.</td></tr>
      <tr><td>Validación 3D + 2D</td><td>20 %</td><td>Contrasta desempeño compensado vs. base y revisa picos de \\(u[k]\\).</td><td>Simula sin evaluar el esfuerzo de control.</td><td>No realiza simulación.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 4.</li>
  <li>B. C. Kuo, <em>Digital Control Systems</em>, 2.ª ed. Nueva York: Oxford University Press, 1995, cap. 8.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, cap. 5.</li>
</ol>
<pre class="no-math"><code>import control as ctrl, numpy as np
G = ctrl.TransferFunction([0.04683, 0.04683*0.935], [1, -1.81873, 0.81873], dt=0.1)
D = ctrl.TransferFunction([1.436, -1.436*0.81873], [1, -0.6074], dt=0.1)
Tcl = ctrl.feedback(D * G, 1)
print("Polos LC compensado:", ctrl.poles(Tcl))</code></pre>

<h2 id="cierre">10. Cierre y conexión con el módulo final</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Puente hacia la Semana 13 — Controladores PID Digitales Industriales</span>
  <p>
    Tras dominar los compensadores en adelanto y atraso por LGR, en la <strong>Semana 13</strong> (último módulo
    lectivo del curso) estudiaremos el controlador más extendido en la industria: el <strong>PID digital</strong>,
    incluyendo sus algoritmos de posición y velocidad, filtrado derivativo y protección <em>anti-windup</em>.
  </p>
</div>
`,objetivos:[`Consolidar la síntesis directa de compensadores de adelanto y atraso en el plano Z.`,`Preparar la transición al controlador PID digital industrial (Semana 13).`]});export{t as default};