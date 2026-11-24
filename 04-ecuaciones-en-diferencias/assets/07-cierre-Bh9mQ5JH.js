import{t as e}from"./chapter-C2599_w7.js";var t=e({html:`<h2 id="sintesis">1. Síntesis sistémica de la Semana 4</h2>
<ul>
  <li>
    <strong>Del mundo físico al algoritmo:</strong> un microcontrolador reemplaza las derivadas continuas por una
    ecuación en diferencias recursiva que se ejecuta cada \\(T\\) segundos en el ciclo ADC \\(\\to\\) error \\(\\to\\)
    recursión \\(\\to\\) DAC/ZOH.
  </li>
  <li>
    <strong>Descomposición exacta:</strong> toda respuesta LTI es la suma de la <em>respuesta libre</em> (energía
    inicial almacenada en \\(y[-1], y[-2]\\)) más la <em>respuesta forzada</em> (efecto de la entrada \\(u[k]\\)).
  </li>
  <li>
    <strong>Discretización con criterio:</strong> ZOH es exacta para plantas conectadas a un DAC; Tustin es ideal para
    filtros y controladores; Euler adelante puede volverse inestable si \\(T &gt; 2\\tau\\).
  </li>
  <li>
    <strong>Geometría de estabilidad:</strong> un sistema discreto es BIBO estable si y solo si todos sus polos están
    dentro del círculo unitario (\\(|p_i| &lt; 1\\)), condición que en segundo orden se verifica sin factorizar mediante
    el criterio de Jury.
  </li>
  <li>
    <strong>Control embebido real:</strong> el controlador PI en forma de velocidad \\(u[k] = u[k-1] + q_0 e[k] + q_1 e[k-1]\\)
    se programa en pocas líneas de C y previene el <em>windup</em> con solo guardar el valor saturado en \\(u[k-1]\\).
  </li>
</ul>

<h2 id="evaluacion">2. Criterios de evaluación (MEC36-RA2 · CE3 y CE4)</h2>
<div class="table-wrap">
  <table>
    <caption>Rúbrica de desempeño — Cierre del Corte Evaluativo 1 (30 %)</caption>
    <thead>
      <tr>
        <th scope="col">Criterio</th>
        <th scope="col">Peso</th>
        <th scope="col">Sobresaliente</th>
        <th scope="col">Aceptable</th>
        <th scope="col">Insuficiente</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Modelado y discretización (CE3)</td>
        <td>35 %</td>
        <td>Deduce la ecuación en diferencias con ZOH/Tustin, justifica \\(T\\) y separa respuesta libre y forzada sin errores.</td>
        <td>Obtiene la ecuación discreta con pequeños errores aritméticos o sin justificar el periodo \\(T\\).</td>
        <td>Confunde el dominio continuo con el discreto o aplica fórmulas incorrectas de retardo.</td>
      </tr>
      <tr>
        <td>Solución y estabilidad de Jury (CE4)</td>
        <td>35 %</td>
        <td>Resuelve por Transformada Z o método clásico, verifica por iteración y determina correctamente rangos de estabilidad.</td>
        <td>Resuelve la ecuación o aplica Jury parcialmente, con omisiones en alguna condición de frontera.</td>
        <td>No identifica los polos ni logra determinar si el sistema converge o diverge.</td>
      </tr>
      <tr>
        <td>Implementación PI digital</td>
        <td>30 %</td>
        <td>Calcula \\(q_0, q_1\\), estructura la rutina periódica en C con saturación y explica el efecto del anti-windup.</td>
        <td>Calcula coeficientes del PI pero omite la saturación o la actualización correcta de memoria \\(u[k-1]\\).</td>
        <td>No logra traducir el controlador discreto a un algoritmo ejecutable.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="siguiente">3. Conexión con la siguiente sesión</h2>
<p>
  Con la solución de ecuaciones en diferencias y la estabilidad en el plano \\(Z\\) dominadas, cerramos el Corte 1. En
  la próxima unidad darás el salto al <strong>diseño de compensadores digitales en lazo cerrado</strong>: lugar de
  raíces discreto, especificaciones transitorias (sobrepaso y tiempo de establecimiento mapeados en \\(z\\)) y
  sintonización sistemática de controladores PID discretos.
</p>

<h2 id="bibliografia">4. Bibliografía (formato IEEE)</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de Control en Tiempo Discreto</em>, 2.ª ed. México: Pearson Educación, 1996, caps. 2–4.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Half Moon Bay, CA: Ellis-Kagle Press, 1998, caps. 2–4.</li>
  <li>B. C. Kuo, <em>Sistemas de Control Digital</em>, 2.ª ed. México: CECSA, 1997, caps. 3–5.</li>
  <li>A. V. Oppenheim y R. W. Schafer, <em>Tratamiento de Señales en Tiempo Discreto</em>, 3.ª ed. Madrid: Pearson, 2011, cap. 3.</li>
</ol>
`,objetivos:[]});export{t as default};