import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="condiciones-jury">4.1 Condiciones necesarias y suficientes del Criterio de Jury</h2>
<p>
  Sea el polinomio característico de grado \\(n\\) en potencias decrecientes de \\(z\\) con \\(a_0 &gt; 0\\):
</p>
\\[
  P(z) = a_0 z^n + a_1 z^{n-1} + a_2 z^{n-2} + \\dots + a_{n-1} z + a_n = 0
\\]
<p>
  Para que todas las raíces satisfagan \\(|z_i| &lt; 1\\), deben cumplirse primero tres <strong>condiciones necesarias iniciales</strong>:
</p>
<ol>
  <li>\\(|a_n| &lt; a_0\\)</li>
  <li>\\(P(1) &gt; 0\\)</li>
  <li>\\((-1)^n P(-1) &gt; 0\\) (es decir, \\(P(-1) &gt; 0\\) si \\(n\\) es par, y \\(P(-1) &lt; 0\\) si \\(n\\) es impar).</li>
</ol>

<h2 id="tabla-jury">4.2 Construcción de la tabla de Jury (\\(n \\ge 3\\))</h2>
<p>
  Si el grado es \\(n = 2\\), las tres condiciones anteriores son <strong>necesarias y suficientes</strong>. Para \\(n \\ge 3\\),
  se construye la tabla de \\(2n - 3\\) filas calculando determinantes \\(2 \\times 2\\):
</p>
\\[
  b_k = \\begin{vmatrix} a_n &amp; a_{n-1-k} \\\\ a_0 &amp; a_{k+1} \\end{vmatrix}, \\qquad
  c_k = \\begin{vmatrix} b_{n-1} &amp; b_{n-2-k} \\\\ b_0 &amp; b_{k+1} \\end{vmatrix}
\\]
<p>
  y se exige además que en cada fila impar reducida se cumpla \\(|b_{n-1}| &gt; |b_0|\\), \\(|c_{n-2}| &gt; |c_0|\\), etc.
</p>

<h2 id="transformacion-bilineal">4.3 Método alternativo: Transformación Bilineal + Routh-Hurwitz</h2>
<p>
  Sustituyendo \\(z = \\dfrac{w + 1}{w - 1}\\) en \\(P(z) = 0\\), el interior del círculo unitario \\(|z| &lt; 1\\) se mapea
  exactamente al semiplano izquierdo \\(\\mathrm{Re}(w) &lt; 0\\), permitiendo aplicar el criterio clásico de Routh-Hurwitz.
</p>

<div class="table-wrap">
  <table>
    <caption>Comparación: Criterio de Jury vs. Transformación Bilineal + Routh</caption>
    <thead>
      <tr><th scope="col">Aspecto</th><th scope="col">Criterio de Jury</th><th scope="col">Transformación Bilineal + Routh</th></tr>
    </thead>
    <tbody>
      <tr><td>Dominio</td><td>Opera directo en el plano \\(Z\\)</td><td>Mapea al plano auxiliar \\(w\\)</td></tr>
      <tr><td>Complejidad (\\(n \\le 3\\))</td><td>Muy directa y rápida</td><td>Requiere expandir potencias \\((w+1)^k(w-1)^{n-k}\\)</td></tr>
      <tr><td>Rango de ganancia \\(K\\)</td><td>Inmediato mediante desigualdades</td><td>Útil para diseñar con técnicas continuas en \\(w\\)</td></tr>
    </tbody>
  </table>
</div>

<h2 id="lab-triangulo">4.4 Laboratorio 2D: Triángulo de Estabilidad de Jury (\\(n = 2\\))</h2>
<p>
  Para \\(P(z) = z^2 + a_1 z + a_2\\), las tres condiciones (\\(|a_2| &lt; 1\\), \\(1 + a_1 + a_2 &gt; 0\\), \\(1 - a_1 + a_2 &gt; 0\\))
  forman un <strong>triángulo de estabilidad</strong> en el plano \\((a_1, a_2)\\). Mueve los sliders para explorar las tres fronteras.
</p>
<div data-viz="trianguloJury" data-preset="default"></div>
`,objetivos:[`Evaluar las tres condiciones iniciales y los determinantes 2×2 de la tabla de Jury.`,`Visualizar el triángulo de estabilidad en el plano (a₁, a₂) para sistemas de segundo orden.`,`Comparar el Criterio de Jury con la transformación bilineal + Routh-Hurwitz.`],presets:{default:{params:{a1:-1.2,a2:.55}}}});export{t as default};