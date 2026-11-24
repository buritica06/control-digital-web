import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="sintesis">1. Síntesis del módulo</h2>
<ul>
  <li>
    <strong>Mapeo \\(z = e^{sT}\\):</strong> convierte exponenciales de retardo en polinomios y comprime el semiplano
    izquierdo estable de Laplace dentro del círculo unitario \\(|z| &lt; 1\\).
  </li>
  <li>
    <strong>Operador \\(z^{-1}\\):</strong> en código embebido representa una casilla de memoria que retiene la muestra
    del ciclo anterior.
  </li>
  <li>
    <strong>Región de Convergencia (ROC):</strong> para señales causales es siempre \\(|z| &gt; R\\), donde \\(R\\) es el
    módulo del polo más externo. Si \\(R &lt; 1\\), la ROC incluye el círculo unitario y la señal es estable.
  </li>
  <li>
    <strong>Teoremas de límites:</strong> el TVI (\\(x[0] = \\lim_{z\\to\\infty} X(z)\\)) y el TVF
    (\\(x[\\infty] = \\lim_{z\\to 1}(1 - z^{-1})X(z)\\)) permiten anticipar el arranque y el estado estacionario sin invertir
    \\(X(z)\\), siempre que se verifique antes que los polos de \\((1 - z^{-1})X(z)\\) estén dentro de \\(|z| &lt; 1\\).
  </li>
</ul>

<h2 id="evaluacion">2. Criterios de evaluación del tema</h2>
<div class="table-wrap">
  <table>
    <caption>Rúbrica formativa — Semana 02: Transformada Z y Teoremas</caption>
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
        <td>Formulación de \\(X(z)\\) y ROC</td>
        <td>35 %</td>
        <td>Calcula \\(X(z)\\) con linealidad y tabla elemental, indicando polos, ceros y ROC exacta.</td>
        <td>Obtiene \\(X(z)\\) correctamente pero omite o imprecisa la frontera de la ROC.</td>
        <td>No identifica las señales elementales ni el factor \\(z\\) del numerador.</td>
      </tr>
      <tr>
        <td>Aplicación de teoremas (TVI/TVF)</td>
        <td>35 %</td>
        <td>Aplica desplazamiento, diferenciación, TVI y TVF verificando siempre la estabilidad previa.</td>
        <td>Aplica las fórmulas pero olvida comprobar la condición de validez del TVF.</td>
        <td>Confunde los límites o aplica el TVF en sistemas divergentes.</td>
      </tr>
      <tr>
        <td>Interpretación mecatrónica</td>
        <td>30 %</td>
        <td>Conecta el período \\(T\\), los polos en \\(|z| &lt; 1\\) y la respuesta física del actuador.</td>
        <td>Interpreta la gráfica pero no vincula los polos con el comportamiento temporal.</td>
        <td>Presenta resultados numéricos sin interpretación física ni de estabilidad.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="siguiente">3. Puente hacia la siguiente sesión</h2>
<p>
  En este módulo aprendiste el viaje de ida: ir desde la secuencia \\(x[k]\\) hasta su retrato algebraico \\(X(z)\\). En la
  <strong>Semana 03 (Transformada Z Inversa)</strong> harás el viaje de regreso: recuperar \\(x[k]\\) a partir de una
  función racional \\(X(z)\\) usando fracciones parciales de \\(X(z)/z\\), división larga y residuos de Cauchy.
</p>

<h2 id="bibliografia">4. Bibliografía (formato IEEE)</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall, 1996, cap. 2.</li>
  <li>
    G. F. Franklin, J. D. Powell y M. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Half Moon Bay, CA:
    Ellis-Kagle Press, 1998.
  </li>
  <li>B. C. Kuo, <em>Sistemas de control digital</em>. México: CECSA, 1997.</li>
</ol>
`,objetivos:[`Consolidar la relación entre muestreo, Transformada Z, ROC y estabilidad en el plano Z.`,`Revisar los criterios de evaluación formativa y la conexión con la Transformada Z Inversa.`]});export{t as default};