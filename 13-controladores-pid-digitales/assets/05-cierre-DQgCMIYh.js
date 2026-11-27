import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7, 9 y 10 -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li><strong>PID incremental (velocidad):</strong> \\(\\Delta u[k] = q_0 e[k] + q_1 e[k-1] + q_2 e[k-2]\\) ofrece <em>bumpless transfer</em> y <em>anti-windup</em> inmediato.</li>
  <li><strong>Filtro derivativo (\\(N \\approx 8\\text{–}20\\)):</strong> indispensable para evitar que el ruido de cuantificación del ADC/encoder sature la etapa de potencia.</li>
  <li><strong>Anti-Windup:</strong> detiene la acumulación integral durante saturación física del actuador, previniendo sobrepasos peligrosos.</li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — PID Digital Industrial (MEC36-RA4 · CE2, CE3)</caption>
    <thead>
      <tr><th scope="col">Criterio</th><th scope="col">Peso</th><th scope="col">Sobresaliente</th><th scope="col">Aceptable</th><th scope="col">Insuficiente</th></tr>
    </thead>
    <tbody>
      <tr><td>Algoritmo incremental \\(q_0, q_1, q_2\\)</td><td>40 %</td><td>Calcula coeficientes exactos y codifica el lazo en tiempo real sin errores.</td><td>Calcula coeficientes con error menor de signo en \\(q_1\\).</td><td>No logra discretizar la ley PID.</td></tr>
      <tr><td>Filtro derivativo y Anti-Windup</td><td>40 %</td><td>Implementa ambos mecanismos y demuestra su efecto cuantitativo.</td><td>Implementa saturación pero omite el filtro derivativo.</td><td>No incluye protecciones contra saturación ni ruido.</td></tr>
      <tr><td>Validación 3D + 2D</td><td>20 %</td><td>Contrasta desempeño con y sin anti-windup en el simulador y en Python.</td><td>Simula solo el caso nominal.</td><td>No realiza simulación.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 4.</li>
  <li>M. S. Fadali y A. Visioli, <em>Digital Control Engineering: Analysis and Design</em>, 3.ª ed. Londres: Academic Press, 2019, cap. 5.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, cap. 4.</li>
  <li>K. J. Åström y T. Hägglund, <em>Advanced PID Control</em>. Research Triangle Park, NC: ISA, 2006.</li>
</ol>
<pre class="no-math"><code>class PIDIncremental:
    def __init__(self, Kp=2.5, Ti=0.2, Td=0.05, T=0.02, u_min=0.0, u_max=12.0):
        self.q0 = Kp * (1 + T/(2*Ti) + Td/T)
        self.q1 = -Kp * (1 - T/(2*Ti) + 2*Td/T)
        self.q2 = Kp * (Td/T)
        self.e1 = self.e2 = self.u1 = 0.0
        self.u_min, self.u_max = u_min, u_max

    def step(self, ref, y):
        e = ref - y
        u = max(self.u_min, min(self.u_max, self.u1 + self.q0*e + self.q1*self.e1 + self.q2*self.e2))
        self.e2, self.e1, self.u1 = self.e1, e, u
        return u</code></pre>

<h2 id="cierre">10. Cierre del curso MEC36 — Control II</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Cierre lectivo y preparación para Semana 14 (Proyecto Integrador y Examen Final)</span>
  <p>
    Con este módulo culmina el recorrido completo de <strong>MEC36 — Control II (Control Digital)</strong>: desde el
    muestreo y la Transformada Z (Corte 1), pasando por la función de transferencia de pulso, el mapeo \\(S \\to Z\\) y la
    estabilidad de Jury (Corte 2), hasta el LGR discreto, los compensadores de adelanto/atraso y el PID digital
    industrial (Corte 3). Todo está listo para el proyecto integrador y la evaluación final de la Semana 14.
  </p>
</div>
`,objetivos:[`Consolidar la implementación industrial del PID digital incremental con filtrado y anti-windup.`,`Integrar todos los conocimientos de MEC36 para el proyecto integrador final (Semana 14).`]});export{t as default};