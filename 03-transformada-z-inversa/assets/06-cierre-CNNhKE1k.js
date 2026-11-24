import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="sintesis">1. Síntesis de la sesión</h2>
<ul>
  <li>
    <strong>Propósito físico:</strong> la Transformada Z inversa convierte un modelo racional \\(X(z)\\) en la secuencia
    real \\(x[k]\\) que experimenta el actuador en cada periodo de muestreo.
  </li>
  <li>
    <strong>Fracciones parciales con \\(X(z)/z\\):</strong> revela de forma cerrada los modos naturales del sistema
    (exponenciales reales, polos repetidos \\(k\\,a^k\\) y oscilaciones amortiguadas \\(r^k\\cos(k\\theta)\\)).
  </li>
  <li>
    <strong>Geometría de la estabilidad:</strong> el radio polar \\(r = |p|\\) decide si la respuesta se apaga
    (\\(r &lt; 1\\)), se sostiene (\\(r = 1\\)) o diverge (\\(r &gt; 1\\)); el ángulo \\(\\theta\\) fija la frecuencia de
    oscilación por muestra.
  </li>
  <li>
    <strong>División polinomial directa:</strong> ordenando en \\(z^{-1}\\) entrega \\(x[0], x[1], x[2], \\dots\\) sin
    factorizar polos; es la herramienta ideal para pruebas rápidas y validación de firmware.
  </li>
  <li>
    <strong>Verificación cruzada:</strong> contrastar fracciones parciales contra división directa (o Python) elimina
    errores de signo y garantiza que el modelo algebraico coincide con la simulación.
  </li>
</ul>

<h2 id="evaluacion">2. Criterios de evaluación (MEC36 — RA1)</h2>
<div class="table-wrap">
  <table>
    <caption>Rúbrica de desempeño — Transformada Z Inversa y Análisis Temporal Discreto</caption>
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
        <td>Expansión en fracciones parciales (\\(X(z)/z\\))</td>
        <td>35 %</td>
        <td>Factoriza polos, halla residuos (simples, múltiples o complejos) sin error y reconstruye \\(x[k]\\).</td>
        <td>Plantea bien la expansión, pero comete errores menores de signo o redondeo.</td>
        <td>Omite multiplicar por \\(z\\) o confunde la estructura de los polos.</td>
      </tr>
      <tr>
        <td>Interpretación polar \\((r, \\theta)\\) y estabilidad</td>
        <td>30 %</td>
        <td>Determina \\(r\\) y \\(\\theta\\), diagnostica estabilidad frente a \\(|z|=1\\) y explica el efecto físico.</td>
        <td>Calcula \\(r\\) y \\(\\theta\\) correctamente pero justifica parcialmente el comportamiento temporal.</td>
        <td>No relaciona el radio polar con la convergencia o divergencia de \\(x[k]\\).</td>
      </tr>
      <tr>
        <td>División directa y verificación</td>
        <td>20 %</td>
        <td>Ordena en \\(z^{-1}\\), obtiene \\(x[0..3]\\) y verifica coincidencia exacta con la forma analítica.</td>
        <td>Obtiene las primeras muestras pero presenta inconsistencias al contrastar métodos.</td>
        <td>Divide en potencias crecientes de \\(z\\) o no completa la iteración.</td>
      </tr>
      <tr>
        <td>Criterio de selección y claridad</td>
        <td>15 %</td>
        <td>Justifica qué método usar según el problema de control y comunica el resultado con rigor.</td>
        <td>Aplica un método válido sin argumentar sus ventajas o límites.</td>
        <td>Presenta resultados aislados sin interpretación técnica.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="siguiente">3. Puente a la siguiente sesión</h2>
<p>
  Ya sabes pasar del plano \\(z\\) al tiempo discreto \\(x[k]\\). En la <strong>Semana 4 (Ecuaciones en Diferencias)</strong>
  veremos cómo escribir y resolver directamente la recursión que programa el microcontrolador, incorporando
  condiciones iniciales distintas de cero (respuesta libre y respuesta forzada) y discretización de controladores.
</p>

<h2 id="bibliografia">4. Bibliografía (formato IEEE)</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall, 1996, cap. 2.</li>
  <li>M. S. Fadali y A. Visioli, <em>Digital Control Engineering: Analysis and Design</em>, 3.ª ed. Londres: Academic Press, 2019, cap. 3.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Reading, MA: Addison-Wesley, 1998, cap. 2.</li>
  <li>B. C. Kuo, <em>Digital Control Systems</em>, 2.ª ed. Nueva York: Oxford University Press, 1992, cap. 2.</li>
</ol>
`,objetivos:[`Integrar en una visión sistémica los métodos de inversión en Z y el criterio geométrico de estabilidad.`,`Reconocer los criterios de evaluación alineados a MEC36-RA1 y la conexión con ecuaciones en diferencias.`]});export{t as default};