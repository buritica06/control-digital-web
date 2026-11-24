import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="serie-potencias">1. La Transformada Z como serie de potencias</h2>
<p>
  Para una señal causal (que empieza en \\(k = 0\\) y vale cero para \\(k &lt; 0\\)), la Transformada Z unilateral se
  despliega término a término como:
</p>
\\[ X(z) = x[0] + x[1]\\,z^{-1} + x[2]\\,z^{-2} + x[3]\\,z^{-3} + \\cdots \\]
<p>
  La variable compleja \\(z = r\\,e^{j\\Omega}\\) combina dos piezas de información: su <strong>módulo</strong> \\(r = |z|\\)
  controla si la suma converge o diverge, mientras que su <strong>ángulo</strong> \\(\\Omega\\) representa la frecuencia
  angular discreta (en rad/muestra).
</p>

<h2 id="roc">2. ¿Qué es la Región de Convergencia (ROC)?</h2>
<p>
  Una suma infinita solo tiene sentido en los puntos \\(z\\) donde el resultado es un número finito. Ese conjunto de puntos
  válidos se llama <strong>Región de Convergencia (ROC)</strong>.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Definición — Región de Convergencia causal</span>
  <p>
    En una secuencia causal, las potencias negativas \\(z^{-k} = 1/z^k\\) se hacen más pequeñas cuando \\(|z|\\) es grande.
    Por eso, la ROC siempre es el <strong>exterior de un círculo</strong> centrado en el origen:
  </p>
</div>
\\[ \\text{ROC}: \\quad |z| &gt; R, \\qquad R = \\lim_{k \\to \\infty} \\left|\\frac{x[k+1]}{x[k]}\\right| \\]

<div class="callout callout--thm" role="note">
  <span class="callout__title">Regla de oro de la ROC</span>
  <p>
    <strong>Ningún polo puede pertenecer a la ROC.</strong> En un polo, \\(|X(z)|\\) tiende a infinito; por tanto, la
    frontera circular \\(|z| = R\\) siempre coincide exactamente con el módulo del <em>polo más alejado del origen</em>.
  </p>
</div>

<h2 id="circulo-unitario">3. ¿Por qué importa el círculo unitario \\(|z| = 1\\)?</h2>
<p>
  Cuando evalúas \\(X(z)\\) sobre \\(|z| = 1\\) (es decir, \\(z = e^{j\\Omega}\\)), obtienes el contenido en frecuencia de la
  señal. Para que un sistema causal sea <strong>estable</strong>, su energía debe extinguirse con el tiempo; en el plano
  Z esto exige que todos sus polos queden dentro del círculo unitario (\\(R &lt; 1\\)), de modo que la ROC
  <strong>contenga a \\(|z| = 1\\)</strong>.
</p>

<div class="table-wrap">
  <table>
    <caption>Relación sistémica entre radio \\(R\\), ROC y comportamiento temporal</caption>
    <thead>
      <tr>
        <th scope="col">Radio del polo más externo</th>
        <th scope="col">¿La ROC incluye \\(|z| = 1\\)?</th>
        <th scope="col">Comportamiento en el tiempo \\(x[k]\\)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>\\(R &lt; 1\\)</td>
        <td>Sí</td>
        <td>Estable: la respuesta decae hacia cero.</td>
      </tr>
      <tr>
        <td>\\(R = 1\\) (polos simples)</td>
        <td>En la frontera</td>
        <td>Marginalmente estable: amplitud constante u oscilación sostenida.</td>
      </tr>
      <tr>
        <td>\\(R &gt; 1\\)</td>
        <td>No</td>
        <td>Inestable: la secuencia crece sin límite.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="explorador-3d">4. Explorador 3D: relieve de \\(|X(z)|\\) y cilindro de la ROC</h2>
<p>
  Gira la superficie 3D para ver los polos como columnas que disparan la altura hacia el infinito. El cilindro translúcido
  señala la frontera \\(|z| = R\\): el territorio seguro de convergencia queda <em>por fuera</em> de ese cilindro. Prueba a
  mover \\(a_1\\) y \\(a_2\\) hasta que un polo cruce el círculo unitario punteado y observa el cambio de estado.
</p>
<div data-viz="superficieROC" data-preset="servo"></div>
`,objetivos:[`Formular la Transformada Z unilateral como una serie de potencias en z⁻¹.`,`Determinar la Región de Convergencia (ROC) a partir de la ubicación del polo de mayor módulo.`,`Relacionar la inclusión del círculo unitario |z| = 1 dentro de la ROC con la estabilidad del sistema.`],presets:{servo:{params:{a1:-1.425,a2:.497,b0:1,b1:.03,mostrarROC:!0}}}});export{t as default};