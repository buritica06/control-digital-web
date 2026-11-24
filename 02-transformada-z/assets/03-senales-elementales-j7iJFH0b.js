import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="por-que-cinco">1. Cinco bloques para construir casi cualquier señal</h2>
<p>
  En la práctica casi nunca calculas una sumatoria infinita desde cero. Así como en Laplace descompones respuestas en
  escalones y exponenciales, en tiempo discreto cinco señales elementales cubren la mayoría de entradas y respuestas
  transitorias que encontrarás en control digital.
</p>

<div class="table-wrap">
  <table>
    <caption>Diccionario de señales discretas elementales (\\(k \\ge 0\\))</caption>
    <thead>
      <tr>
        <th scope="col">Señal \\(x[k]\\)</th>
        <th scope="col">En potencias de \\(z^{-1}\\)</th>
        <th scope="col">Forma racional \\(X(z)\\)</th>
        <th scope="col">ROC</th>
        <th scope="col">Polos</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Impulso unitario</strong> \\(\\delta[k]\\)</td>
        <td>\\(1\\)</td>
        <td>\\(1\\)</td>
        <td>Todo el plano \\(z\\)</td>
        <td>Sin polos finitos</td>
      </tr>
      <tr>
        <td><strong>Escalón unitario</strong> \\(u[k]\\)</td>
        <td>\\(\\dfrac{1}{1 - z^{-1}}\\)</td>
        <td>\\(\\dfrac{z}{z - 1}\\)</td>
        <td>\\(|z| &gt; 1\\)</td>
        <td>\\(z = 1\\)</td>
      </tr>
      <tr>
        <td><strong>Geométrica</strong> \\(a^k\\)</td>
        <td>\\(\\dfrac{1}{1 - a\\,z^{-1}}\\)</td>
        <td>\\(\\dfrac{z}{z - a}\\)</td>
        <td>\\(|z| &gt; |a|\\)</td>
        <td>\\(z = a\\)</td>
      </tr>
      <tr>
        <td><strong>Rampa</strong> \\(k\\,T\\)</td>
        <td>\\(\\dfrac{T\\,z^{-1}}{(1 - z^{-1})^2}\\)</td>
        <td>\\(\\dfrac{T\\,z}{(z - 1)^2}\\)</td>
        <td>\\(|z| &gt; 1\\)</td>
        <td>\\(z = 1\\) (doble)</td>
      </tr>
      <tr>
        <td><strong>Coseno amortiguado</strong> \\(a^k \\cos(\\omega_0 k)\\)</td>
        <td>\\(\\dfrac{1 - a\\cos\\omega_0\\,z^{-1}}{1 - 2a\\cos\\omega_0\\,z^{-1} + a^2 z^{-2}}\\)</td>
        <td>\\(\\dfrac{z(z - a\\cos\\omega_0)}{z^2 - 2az\\cos\\omega_0 + a^2}\\)</td>
        <td>\\(|z| &gt; |a|\\)</td>
        <td>\\(z = a\\,e^{\\pm j\\omega_0}\\)</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="trampa-z">2. El detalle que más se olvida: el factor \\(z\\) en el numerador</h2>
<div class="callout callout--warn" role="note">
  <span class="callout__title">Atención — error frecuente al venir de Laplace</span>
  <p>
    En Laplace, el escalón es \\(1/s\\). En la Transformada Z, el escalón causal es \\(\\dfrac{z}{z - 1}\\), con una
    <strong>\\(z\\) en el numerador</strong>. Ese cero en el origen existe porque la señal arranca en \\(k = 0\\) con
    \\(x[0] = 1\\). Cuando llegues a la Transformada Z Inversa en la Semana 03, trabajarás expandiendo \\(X(z)/z\\) en
    fracciones parciales y luego multiplicarás de vuelta por \\(z\\).
  </p>
</div>

<h2 id="intuicion-base">3. Cómo leer la base \\(a\\) de un vistazo</h2>
<p>La secuencia geométrica \\(a^k\\) es la columna vertebral de los sistemas lineales discretos. Su polo en \\(z = a\\) anticipa toda su dinámica:</p>
<ul>
  <li><strong>\\(0 &lt; a &lt; 1\\):</strong> decaimiento suave y monótono hacia cero (respuesta sobreamortiguada).</li>
  <li><strong>\\(-1 &lt; a &lt; 0\\):</strong> decaimiento que <em>alterna de signo</em> en cada muestra (polo real negativo).</li>
  <li><strong>\\(|a| = 1\\):</strong> amplitud constante u oscilación que nunca se apaga.</li>
  <li><strong>\\(|a| &gt; 1\\):</strong> crecimiento explosivo (sistema inestable).</li>
</ul>

<h2 id="laboratorio-secuencias">4. Laboratorio de formas de onda canónicas</h2>
<p>
  Cambia el tipo de señal y experimenta con \\(a\\) (prueba valores positivos, negativos y mayores que 1). Observa cómo se
  actualizan simultáneamente la forma de onda, la expresión algebraica \\(X(z)\\) y la ROC.
</p>
<div data-viz="secuencias" data-preset="base"></div>
`,objetivos:[`Reconocer la Transformada Z y la ROC de las cinco señales discretas elementales.`,`Explicar el origen del factor z en el numerador de las transformadas causales.`,`Predecir si una secuencia decae, alterna de signo o diverge a partir del valor de su polo real o complejo.`],presets:{base:{params:{tipo:`exponencial`,a:.8,T:.1,omega0:.6,N:24}}}});export{t as default};