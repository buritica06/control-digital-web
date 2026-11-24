import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="operacionales">1. Teoremas operacionales: álgebra en lugar de sumatorias</h2>
<p>
  Los teoremas de la Transformada Z te permiten manipular señales, resolver ecuaciones en diferencias y predecir límites
  temporales sin volver a la definición de suma infinita.
</p>

<div class="table-wrap">
  <table>
    <caption>Resumen de propiedades y teoremas fundamentales</caption>
    <thead>
      <tr>
        <th scope="col">Propiedad / Teorema</th>
        <th scope="col">Dominio del tiempo \\(x[k]\\)</th>
        <th scope="col">Dominio Z \\(X(z)\\)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Linealidad</strong></td>
        <td>\\(\\alpha\\,x_1[k] + \\beta\\,x_2[k]\\)</td>
        <td>\\(\\alpha\\,X_1(z) + \\beta\\,X_2(z)\\)</td>
      </tr>
      <tr>
        <td><strong>Retardo temporal</strong></td>
        <td>\\(x[k - 1]\\)</td>
        <td>\\(z^{-1}X(z) + x[-1]\\)</td>
      </tr>
      <tr>
        <td><strong>Avance temporal</strong></td>
        <td>\\(x[k + 1]\\)</td>
        <td>\\(z\\,X(z) - z\\,x[0]\\)</td>
      </tr>
      <tr>
        <td><strong>Diferenciación en \\(z\\)</strong></td>
        <td>\\(k\\,x[k]\\)</td>
        <td>\\(-z\\,\\dfrac{dX(z)}{dz}\\)</td>
      </tr>
      <tr>
        <td><strong>Escalamiento en \\(z\\)</strong></td>
        <td>\\(a^k x[k]\\)</td>
        <td>\\(X(z/a)\\)</td>
      </tr>
    </tbody>
  </table>
</div>

<p>
  Cuando el sistema parte del reposo (condiciones iniciales nulas: \\(x[-1] = 0\\), \\(x[0] = 0\\)), retardar \\(n\\) muestras
  equivale simplemente a multiplicar por \\(z^{-n}\\), y adelantar \\(n\\) muestras a multiplicar por \\(z^n\\).
</p>

<h2 id="tvi-tvf">2. Teoremas de límites: valor inicial y valor final</h2>
<p>
  En control digital necesitas saber con frecuencia <strong>desde dónde arranca</strong> una señal y
  <strong>en qué valor se estabiliza</strong> al final del transitorio, sin tener que invertir \\(X(z)\\) por completo.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Teorema del Valor Inicial (TVI) y Teorema del Valor Final (TVF)</span>
  <p>Para una secuencia causal \\(x[k]\\) con transformada \\(X(z)\\):</p>
</div>
\\[ \\text{TVI:} \\quad x[0] = \\lim_{z \\to \\infty} X(z) \\]
\\[ \\text{TVF:} \\quad \\lim_{k \\to \\infty} x[k] = \\lim_{z \\to 1} (1 - z^{-1})\\,X(z) \\]

<div class="callout callout--warn" role="note">
  <span class="callout__title">Condición obligatoria antes de aplicar el TVF</span>
  <p>
    El Teorema del Valor Final <strong>solo es válido</strong> si todos los polos de \\((1 - z^{-1})X(z)\\) se encuentran
    estrictamente dentro del círculo unitario (\\(|p_i| &lt; 1\\)). Si existe un polo fuera del círculo unitario
    (\\(|p_i| &gt; 1\\)) o un par de polos complejos sobre \\(|z| = 1\\), la señal diverge u oscila sin converger: aplicar la
    fórmula a ciegas produciría un número falso.
  </p>
</div>

<h2 id="plano-z-3d">3. Laboratorio 3D: polos, ceros y estabilidad en el plano Z</h2>
<p>
  Ajusta los coeficientes del denominador \\(a_1\\) y \\(a_2\\) del sistema \\(z^2 + a_1 z + a_2 = 0\\). La escena muestra el
  disco estable \\(|z| &lt; 1\\), la posición de polos (\\(\\times\\)) y ceros (\\(\\circ\\)), y la espiral vertical del modo
  natural \\(p_1^k\\). Observa cómo la espiral se cierra hacia el eje cuando el sistema es estable y se abre violentamente
  al cruzar el círculo unitario.
</p>
<div data-viz="planoZ" data-preset="base"></div>
`,objetivos:[`Aplicar los teoremas de linealidad, desplazamiento temporal y diferenciación en z.`,`Calcular el valor inicial x[0] y el valor en régimen permanente x[∞] mediante el TVI y el TVF.`,`Verificar las condiciones de validez del TVF inspeccionando la ubicación de los polos respecto al círculo unitario.`],presets:{base:{params:{a1:-1.3,a2:.4,b0:1,b1:0,modo:!0,pasos:24}}}});export{t as default};