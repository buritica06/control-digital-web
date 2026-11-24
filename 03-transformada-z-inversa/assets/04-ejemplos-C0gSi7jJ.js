import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="caso-brazo">1. Caso integrador: posicionamiento de un brazo robótico</h2>

<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    La posición angular discreta del eslabón de un brazo robótico ante una referencia escalón está descrita en el
    dominio \\(z\\) por:
  </p>
  \\[ Y(z) = \\frac{0.3678\\,z^2 + 0.2642\\,z}{(z - 1)(z^2 - 0.8\\,z + 0.36)} \\]
  <p>
    1) Ubica los polos y verifica estabilidad. 2) Halla la expresión cerrada \\(y[k]\\) por fracciones parciales.
    3) Evalúa \\(y[0], y[1], y[2], y[3]\\) y contrástalos con la división polinomial directa.
  </p>
</div>

<h3>Paso 1 — Polos y forma polar</h3>
<ul>
  <li><strong>Polo de la entrada escalón:</strong> \\(z_1 = 1\\) (genera el valor de estado estacionario).</li>
  <li>
    <strong>Polos de la planta en lazo cerrado (\\(z^2 - 0.8z + 0.36 = 0\\)):</strong>
    \\[ z_{2,3} = \\frac{0.8 \\pm \\sqrt{0.64 - 1.44}}{2} = 0.4 \\pm j\\,0.4472 \\]
    \\[ r = \\sqrt{0.36} = 0.60, \\qquad \\theta = \\arctan\\!\\left(\\frac{0.4472}{0.4}\\right) \\approx 0.8411\\text{ rad} \\approx 48.19^\\circ \\]
  </li>
</ul>
<p>
  Como \\(r = 0.60 &lt; 1\\), el par complejo conjugado está dentro del círculo unitario: el transitorio se amortigua y
  el lazo es <strong>estable</strong>.
</p>

<h3>Paso 2 — Expansión de \\(Y(z)/z\\)</h3>
\\[ \\frac{Y(z)}{z} = \\frac{0.3678\\,z + 0.2642}{(z - 1)(z^2 - 0.8\\,z + 0.36)} = \\frac{c_1}{z - 1} + \\frac{C\\,z + D}{z^2 - 0.8\\,z + 0.36} \\]
<p>Evaluamos primero el residuo del polo real simple en \\(z = 1\\):</p>
\\[ c_1 = \\left.\\frac{0.3678\\,z + 0.2642}{z^2 - 0.8\\,z + 0.36}\\right|_{z=1} = \\frac{0.6320}{0.56} \\approx 1.1286 \\]
<p>Igualando numeradores, \\(0.3678z + 0.2642 = c_1(z^2 - 0.8z + 0.36) + (Cz + D)(z - 1)\\), obtenemos:</p>
<ul>
  <li>Término en \\(z^2\\): \\(0 = c_1 + C \\implies C = -1.1286\\).</li>
  <li>Término independiente: \\(0.2642 = 0.36\\,c_1 - D \\implies D = 0.36(1.1286) - 0.2642 = 0.1421\\).</li>
</ul>

<h3>Paso 3 — Ajuste a los pares coseno y seno amortiguados</h3>
<p>
  Reescribimos \\(C\\,z + D = -1.1286\\,z + 0.1421\\) en función de \\((z - r\\cos\\theta) = (z - 0.4)\\) y
  \\(r\\sin\\theta = 0.4472\\):
</p>
\\[ -1.1286\\,z + 0.1421 = -1.1286(z - 0.4) - 0.3093 = -1.1286(z - 0.4) - 0.6917\\,(0.4472) \\]
<p>Multiplicando por \\(z\\) y aplicando la tabla de pares canónicos, resulta la secuencia cerrada:</p>
\\[ y[k] = 1.1286 - (0.6)^k\\!\\left[1.1286\\cos(0.8411\\,k) + 0.6917\\sin(0.8411\\,k)\\right] \\quad (k \\ge 0) \\]

<h3>Paso 4 — Verificación por división polinomial directa</h3>
<p>
  Expandimos el denominador \\((z - 1)(z^2 - 0.8z + 0.36) = z^3 - 1.8z^2 + 1.16z - 0.36\\) y dividimos entre \\(z^3\\):
</p>
\\[ Y(z) = \\frac{0.3678\\,z^{-1} + 0.2642\\,z^{-2}}{1 - 1.8\\,z^{-1} + 1.16\\,z^{-2} - 0.36\\,z^{-3}} \\]
<p>Al efectuar la división larga en potencias crecientes de \\(z^{-1}\\) obtenemos:</p>
\\[ Y(z) = 0 + 0.3678\\,z^{-1} + 0.9262\\,z^{-2} + 1.2406\\,z^{-3} + 1.2910\\,z^{-4} + \\dots \\]

<div class="table-wrap">
  <table>
    <caption>Coincidencia exacta entre fracciones parciales y división directa (brazo robótico)</caption>
    <thead>
      <tr>
        <th scope="col">Muestra \\(k\\)</th>
        <th scope="col">Analítica \\(y[k]\\)</th>
        <th scope="col">División directa</th>
        <th scope="col">Lectura física</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>\\(0\\)</td><td>\\(0.0000\\)</td><td>\\(0.0000\\)</td><td>El brazo parte del reposo.</td></tr>
      <tr><td>\\(1\\)</td><td>\\(0.3678\\)</td><td>\\(0.3678\\)</td><td>Arranque inicial tras un periodo \\(T\\).</td></tr>
      <tr><td>\\(2\\)</td><td>\\(0.9262\\)</td><td>\\(0.9262\\)</td><td>Aceleración hacia la referencia.</td></tr>
      <tr><td>\\(3\\)</td><td>\\(1.2406\\)</td><td>\\(1.2406\\)</td><td>Supera el valor final \\(1.1286\\) (sobrepaso).</td></tr>
      <tr><td>\\(4\\)</td><td>\\(1.2910\\)</td><td>\\(1.2910\\)</td><td>Pico máximo (\\(\\approx 14.4\\,\\%\\) de sobrepaso).</td></tr>
    </tbody>
  </table>
</div>

<h2 id="caso-polo-doble">2. Caso de polo real doble (amortiguamiento crítico)</h2>

<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Un servomecanismo ajustado sin oscilación responde a un escalón unitario según:
  </p>
  \\[ X(z) = \\frac{0.25\\,z}{(z - 1)(z - 0.5)^2} \\]
  <p>Calcula \\(x[k]\\) en forma cerrada y verifica las primeras cuatro muestras.</p>
</div>

<p>Expandimos \\(X(z)/z\\) incluyendo las potencias \\(1\\) y \\(2\\) del polo repetido en \\(z = 0.5\\):</p>
\\[ \\frac{X(z)}{z} = \\frac{0.25}{(z - 1)(z - 0.5)^2} = \\frac{c_1}{z - 1} + \\frac{c_{2,1}}{z - 0.5} + \\frac{c_{2,2}}{(z - 0.5)^2} \\]
<ul>
  <li>\\(c_1 = \\left.\\dfrac{0.25}{(z - 0.5)^2}\\right|_{z=1} = \\dfrac{0.25}{0.25} = 1\\).</li>
  <li>\\(c_{2,2} = \\left.\\dfrac{0.25}{z - 1}\\right|_{z=0.5} = \\dfrac{0.25}{-0.5} = -0.5\\).</li>
  <li>\\(c_{2,1} = \\left.\\dfrac{d}{dz}\\!\\left(\\dfrac{0.25}{z - 1}\\right)\\right|_{z=0.5} = \\left.\\dfrac{-0.25}{(z - 1)^2}\\right|_{z=0.5} = -1\\).</li>
</ul>
<p>Multiplicamos por \\(z\\) y aplicamos los pares \\(\\frac{z}{z-a} \\leftrightarrow a^k\\) y \\(\\frac{a\\,z}{(z-a)^2} \\leftrightarrow k\\,a^k\\):</p>
\\[ X(z) = \\frac{z}{z - 1} - \\frac{z}{z - 0.5} - \\frac{0.5\\,z}{(z - 0.5)^2} \\;\\Longrightarrow\\; x[k] = 1 - (1 + k)(0.5)^k \\quad (k \\ge 0) \\]
<p>
  Evaluando: \\(x[0] = 0\\), \\(x[1] = 0\\), \\(x[2] = 0.25\\), \\(x[3] = 0.50\\), \\(x[4] = 0.6875 \\to 1\\). La respuesta se
  acerca a \\(1\\) de forma suave y sin sobrepaso.
</p>

<h2 id="validacion-python">3. Validación rápida en Python</h2>
<p>
  Puedes comprobar cualquier Transformada Z inversa en pocas líneas usando <code>scipy.signal.lfilter</code> (que
  equivale a la división polinomial directa) y <code>scipy.signal.residuez</code> (fracciones parciales):
</p>
<pre class="no-math"><code>import numpy as np
from scipy.signal import lfilter, residuez

# Caso brazo robótico: Y(z) en potencias de z^-1
b = [0.0, 0.3678, 0.2642]
a = [1.0, -1.8, 1.16, -0.36]

# 1) División directa (respuesta al impulso de Y(z))
delta = np.zeros(8)
delta[0] = 1.0
y_div = lfilter(b, a, delta)

# 2) Fracciones parciales (residuos y polos)
r, p, k_dir = residuez(b, a)

print("División directa y[0..5]:", np.round(y_div[:6], 4))
print("Polos:", np.round(p, 4))
print("Residuos:", np.round(r, 4))</code></pre>
`,objetivos:[`Resolver de principio a fin la Transformada Z inversa de un sistema con polos complejos conjugados.`,`Aplicar la regla de derivación para invertir funciones con polos reales repetidos.`,`Contrastar resultados analíticos con división directa y validación numérica en Python.`]});export{t as default};