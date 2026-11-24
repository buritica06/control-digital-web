import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="ejemplo-1">1. Ejemplo 1: señal compuesta con impulso y exponenciales</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado — Nivel básico</span>
  <p>
    Calcula la Transformada Z unilateral y determina la Región de Convergencia (ROC) de:
    \\[ x[k] = 2\\,(0.5)^k - 3\\,(0.2)^k + 4\\,\\delta[k] \\qquad (k \\ge 0) \\]
  </p>
</div>
<details class="disclosure">
  <summary>Ver solución paso a paso</summary>
  <div>
    <p><strong>Paso 1 — Aplicar linealidad:</strong> transformamos cada término por separado.</p>
    \\[ X(z) = 2\\,\\mathcal{Z}\\{(0.5)^k\\} - 3\\,\\mathcal{Z}\\{(0.2)^k\\} + 4\\,\\mathcal{Z}\\{\\delta[k]\\} \\]
    <p><strong>Paso 2 — Sustituir las transformadas elementales:</strong></p>
    \\[ X(z) = \\frac{2z}{z - 0.5} - \\frac{3z}{z - 0.2} + 4 \\]
    <p><strong>Paso 3 — Intersecar las regiones de convergencia:</strong></p>
    <ul>
      <li>\\((0.5)^k\\) converge en \\(|z| &gt; 0.5\\).</li>
      <li>\\((0.2)^k\\) converge en \\(|z| &gt; 0.2\\).</li>
      <li>\\(\\delta[k]\\) converge en todo el plano \\(z\\).</li>
    </ul>
    <p>
      La intersección de las tres regiones queda dominada por el polo más alejado del origen:
      <strong>\\(\\text{ROC}: |z| &gt; 0.5\\)</strong>.
    </p>
  </div>
</details>

<h2 id="ejemplo-2">2. Ejemplo 2: multiplicación por el índice temporal \\(k\\)</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado — Nivel intermedio</span>
  <p>
    Encuentra la Transformada Z y la ROC de la secuencia \\(x[k] = k\\,(0.4)^k\\) (\\(k \\ge 0\\)) usando el teorema de
    diferenciación en \\(z\\).
  </p>
</div>
<details class="disclosure">
  <summary>Ver solución paso a paso</summary>
  <div>
    <p>
      <strong>Paso 1 — Identificar la señal base:</strong> sea \\(x_0[k] = (0.4)^k\\), cuya transformada es
      \\(X_0(z) = \\dfrac{z}{z - 0.4}\\) con ROC \\(|z| &gt; 0.4\\).
    </p>
    <p><strong>Paso 2 — Aplicar diferenciación en \\(z\\):</strong> \\(\\mathcal{Z}\\{k\\,x_0[k]\\} = -z\\,\\dfrac{dX_0(z)}{dz}\\).</p>
    <p><strong>Paso 3 — Derivar el cociente:</strong></p>
    \\[ \\frac{d}{dz}\\left(\\frac{z}{z - 0.4}\\right) = \\frac{1(z - 0.4) - z(1)}{(z - 0.4)^2} = \\frac{-0.4}{(z - 0.4)^2} \\]
    <p><strong>Paso 4 — Multiplicar por \\(-z\\):</strong></p>
    \\[ X(z) = -z\\left[\\frac{-0.4}{(z - 0.4)^2}\\right] = \\frac{0.4\\,z}{(z - 0.4)^2} \\qquad (\\text{ROC: } |z| &gt; 0.4) \\]
    <p>
      <strong>Lectura sistémica:</strong> multiplicar una señal por \\(k\\) en el tiempo no mueve la frontera de la ROC,
      pero convierte el polo simple en \\(z = 0.4\\) en un <em>polo doble</em>.
    </p>
  </div>
</details>

<h2 id="ejemplo-3">3. Ejemplo 3: verificación de límites con TVI y TVF</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado — Nivel aplicado</span>
  <p>
    Dada la transformada \\(X(z) = \\dfrac{z(2z - 1)}{(z - 0.8)(z - 0.5)}\\), determina el valor inicial \\(x[0]\\) y el
    valor en régimen permanente \\(x[\\infty]\\) sin calcular la transformada inversa.
  </p>
</div>
<details class="disclosure">
  <summary>Ver solución paso a paso</summary>
  <div>
    <p><strong>Paso 1 — Valor inicial \\(x[0]\\) mediante el TVI:</strong></p>
    \\[ x[0] = \\lim_{z \\to \\infty} \\frac{2z^2 - z}{z^2 - 1.3z + 0.4} = \\frac{2}{1} = 2 \\]
    <p>
      <strong>Paso 2 — Verificar la validez del TVF:</strong> los polos de \\((1 - z^{-1})X(z)\\) están en \\(p_1 = 0.8\\) y
      \\(p_2 = 0.5\\). Ambos cumplen \\(|p_i| &lt; 1\\), por lo que la señal converge y el TVF es válido.
    </p>
    <p><strong>Paso 3 — Valor final \\(x[\\infty]\\) mediante el TVF:</strong></p>
    \\[ x[\\infty] = \\lim_{z \\to 1} \\left(\\frac{z - 1}{z}\\right)\\frac{z(2z - 1)}{(z - 0.8)(z - 0.5)} = \\frac{0 \\cdot 1}{(0.2)(0.5)} = 0 \\]
    <p>La secuencia arranca en \\(2\\) y se extingue completamente a \\(0\\).</p>
  </div>
</details>
`,objetivos:[`Combinar linealidad y la tabla elemental para transformar señales compuestas y hallar su ROC.`,`Aplicar el teorema de diferenciación en z cuando aparece el factor k en una secuencia.`,`Comprobar condiciones de estabilidad antes de evaluar el valor inicial y final de una señal.`]});export{t as default};