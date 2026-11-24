import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="serie-potencias">1. Dividir polinomios sin factorizar polos</h2>
<p>
  No siempre necesitas una fórmula cerrada para \\(k \\to \\infty\\). A veces solo quieres comprobar los primeros cinco
  valores que debería producir tu algoritmo en un microcontrolador, o trabajas con un denominador de orden 4 o 5 que no
  se factoriza fácilmente a mano. Para eso existe la <strong>división polinomial directa</strong>.
</p>
<p>
  La idea aprovecha la definición misma de la Transformada Z: si ordenamos numerador y denominador en potencias
  crecientes de \\(z^{-1}\\) y dividimos como polinomios ordinarios, cada coeficiente del cociente es directamente una
  muestra de la secuencia temporal:
</p>

\\[ X(z) = \\frac{b_0 + b_1 z^{-1} + \\dots + b_m z^{-m}}{a_0 + a_1 z^{-1} + \\dots + a_n z^{-n}} = x[0] + x[1]z^{-1} + x[2]z^{-2} + x[3]z^{-3} + \\dots \\]

<div class="callout callout--def" role="note">
  <span class="callout__title">Procedimiento en 3 pasos</span>
  <ol>
    <li>Divide numerador y denominador por la mayor potencia de \\(z\\) del denominador para escribir \\(X(z)\\) en \\(z^{-1}\\).</li>
    <li>Ejecuta la división larga algebraica buscando eliminar siempre la potencia más baja de \\(z^{-1}\\) en el residuo.</li>
    <li>Lee \\(x[k]\\) como el coeficiente que acompaña a \\(z^{-k}\\). Si un término falta en el cociente, esa muestra vale \\(0\\).</li>
  </ol>
</div>

<h2 id="lab-comparativa">2. Contraste vivo: fracciones parciales vs. división directa</h2>
<p>
  En el siguiente laboratorio puedes modificar los parámetros del brazo robótico
  \\(Y(z) = \\frac{b_1 z^2 + b_2 z}{(z-1)(z^2 + a_1 z + a_2)}\\). Comprueba cómo los círculos abiertos (división directa)
  caen exactamente sobre las barras analíticas (fracciones parciales), y cómo la respuesta total resulta de sumar un
  <strong>modo permanente</strong> \\(c_1\\) más un <strong>modo transitorio</strong> que desaparece si los polos están
  dentro de \\(|z| = 1\\).
</p>
<div data-viz="comparativaInversion" data-preset="brazo"></div>

<h2 id="criterio-seleccion">3. ¿Qué método conviene usar en cada situación?</h2>
<p>
  En ingeniería de control no hay un método «mejor» en abstracto; cada uno responde a una pregunta diferente:
</p>

<div class="table-wrap">
  <table>
    <caption>Comparativa práctica de los métodos de Transformada Z inversa</caption>
    <thead>
      <tr>
        <th scope="col">Criterio</th>
        <th scope="col">Fracciones parciales</th>
        <th scope="col">División directa</th>
        <th scope="col">Residuos de Cauchy</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Qué entrega</strong></td>
        <td>Fórmula cerrada \\(x[k]\\) para todo \\(k \\ge 0\\).</td>
        <td>Muestras numéricas paso a paso (\\(x[0], x[1], \\dots\\)).</td>
        <td>Fórmula cerrada general mediante suma de residuos.</td>
      </tr>
      <tr>
        <td><strong>Requisito previo</strong></td>
        <td>Factorizar los polos del denominador \\(D(z)\\).</td>
        <td>Solo ordenar \\(N(z^{-1})\\) y \\(D(z^{-1})\\).</td>
        <td>Ubicar los polos dentro del contorno \\(C\\) (ROC).</td>
      </tr>
      <tr>
        <td><strong>Visibilidad de estabilidad</strong></td>
        <td><strong>Total:</strong> expone \\(r = |p_i|\\) y \\(\\theta\\) explícitamente.</td>
        <td><strong>Limitada:</strong> no garantiza tendencia para \\(k \\to \\infty\\).</td>
        <td><strong>Alta:</strong> vincula la ROC con los polos encerrados.</td>
      </tr>
      <tr>
        <td><strong>Uso ideal en mecatrónica</strong></td>
        <td>Diseño de controladores, sobrepaso y tiempo de asentamiento.</td>
        <td>Pruebas unitarias rápidas y validación de firmware embebido.</td>
        <td>Sistemas no causales, bilaterales o polos de orden alto.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Cuidado con el orden de las potencias</span>
  <p>
    Si divides en potencias <em>crecientes</em> de \\(z\\) (en vez de \\(z^{-1}\\)), obtendrás una secuencia anticausal
    (\\(k \\le 0\\)). Para sistemas físicos causales, ordena siempre en potencias crecientes de \\(z^{-1}\\) (o decrecientes
    de \\(z\\)).
  </p>
</div>
`,objetivos:[`Aplicar el algoritmo de división polinomial directa en potencias de z⁻¹ para obtener muestras causales.`,`Verificar numéricamente que la división directa coincide con la solución analítica por fracciones parciales.`,`Seleccionar con criterio de ingeniería el método de inversión más adecuado según el problema.`],presets:{brazo:{titulo:`Descomposición modal y verificación por división directa`,descripcion:`Caso base del brazo robótico (a₁ = −0.80, a₂ = 0.36). Observa que el error entre ambos métodos es del orden de 10⁻¹⁶.`,params:{b1:.3678,b2:.2642,a1:-.8,a2:.36,muestras:18,mostrarModos:!0}}}});export{t as default};