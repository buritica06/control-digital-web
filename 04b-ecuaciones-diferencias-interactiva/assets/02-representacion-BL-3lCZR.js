import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="forma-general">1. Forma general</h2>
<p>
  Una <strong>ecuación en diferencias lineal e invariante en el tiempo (LTI)</strong> de orden \\(n\\) relaciona la
  salida actual \\(y[k]\\) con sus \\(n\\) valores pasados y con la entrada actual y sus \\(m\\) valores pasados:
</p>
\\[ y[k] + a_1\\,y[k-1] + a_2\\,y[k-2] + \\dots + a_n\\,y[k-n] = b_0\\,u[k] + b_1\\,u[k-1] + \\dots + b_m\\,u[k-m] \\]
<p>
  Los coeficientes \\(a_i\\) y \\(b_j\\) son constantes reales que dependen de la planta, del algoritmo de control y del
  periodo de muestreo \\(T\\). El <strong>orden</strong> es el mayor retardo de la salida, \\(n\\). La ecuación es
  <strong>causal</strong> cuando \\(y[k]\\) no depende de entradas futuras, es decir, cuando solo aparecen
  \\(u[k], u[k-1], \\dots\\)
</p>

<h2 id="recursiva">2. Forma recursiva: lo que ejecuta el microcontrolador</h2>
<p>Despejando \\(y[k]\\) se obtiene una regla que calcula cada muestra a partir de valores ya conocidos:</p>
\\[ y[k] = -\\sum_{i=1}^{n} a_i\\,y[k-i] \\;+\\; \\sum_{j=0}^{m} b_j\\,u[k-j] \\]
<p>
  Esta es literalmente la línea de código que corre en el lazo de control. Para el sistema de segundo orden del curso
  \\(y[k] - 1.3\\,y[k-1] + 0.4\\,y[k-2] = u[k]\\):
</p>
<pre class="no-math"><code>// Cada periodo T (interrupción del temporizador):
u0 = leer_adc();                       // u[k]
y0 = 1.3f * y1 - 0.4f * y2 + u0;       // y[k] = 1.3 y[k-1] - 0.4 y[k-2] + u[k]
escribir_dac(y0);                      // salida al actuador (ZOH)
y2 = y1;  y1 = y0;                     // desplazar la memoria: y[k-2] ← y[k-1] ← y[k]</code></pre>
<p>
  Solo hacen falta \\(n + m + 1\\) multiplicaciones y sumas por muestra, y una memoria de \\(n\\) salidas y \\(m\\) entradas
  anteriores. Por eso las ecuaciones en diferencias son el modelo natural de cualquier controlador digital.
</p>

<h2 id="operador">3. Operador de desplazamiento \\(z^{-1}\\)</h2>
<p>
  Definimos el operador de retardo unitario \\(z^{-1}\\) por \\(z^{-1}\\,x[k] = x[k-1]\\). Con él, la ecuación completa se
  escribe de forma compacta como un cociente de polinomios:
</p>
\\[ \\underbrace{\\left(1 + a_1 z^{-1} + \\dots + a_n z^{-n}\\right)}_{A(z^{-1})}\\,y[k] = \\underbrace{\\left(b_0 + b_1 z^{-1} + \\dots + b_m z^{-m}\\right)}_{B(z^{-1})}\\,u[k] \\]
<p>
  Si además las condiciones iniciales son nulas, aplicar la transformada Z (teorema de retardo,
  \\(\\Z{x[k-1]} = z^{-1}X(z)\\)) convierte el operador en la variable compleja \\(z\\) y obtenemos la
  <strong>función de transferencia pulso</strong>:
</p>
\\[ G(z) = \\frac{Y(z)}{U(z)} = \\frac{b_0 + b_1 z^{-1} + \\dots + b_m z^{-m}}{1 + a_1 z^{-1} + \\dots + a_n z^{-n}} \\]

<div class="callout callout--def" role="note">
  <span class="callout__title">Definición — polos y ceros</span>
  <p>
    Multiplicando numerador y denominador por \\(z^{n}\\) se obtiene \\(G(z)\\) en potencias positivas. Las raíces del
    denominador son los <strong>polos</strong> \\(p_i\\) (raíces del <em>polinomio característico</em>) y las del
    numerador, los <strong>ceros</strong> \\(c_j\\). Los polos fijan los <em>modos naturales</em> \\(p_i^{\\,k}\\) de la
    respuesta; los ceros fijan cuánto pesa cada modo.
  </p>
</div>

<p>Para el caso de estudio:</p>
\\[ G(z) = \\frac{1}{1 - 1.3\\,z^{-1} + 0.4\\,z^{-2}} = \\frac{z^{2}}{z^{2} - 1.3\\,z + 0.4} = \\frac{z^{2}}{(z - 0.8)(z - 0.5)} \\]
<p>
  Polos en \\(p_1 = 0.8\\) y \\(p_2 = 0.5\\), ambos dentro del círculo unitario: el sistema es estable y su respuesta
  natural es una suma de \\(0.8^{k}\\) y \\(0.5^{k}\\), dos exponenciales que decaen.
</p>

<h2 id="plano-z">4. Los coeficientes mueven los polos</h2>
<p>
  En la escena siguiente el sistema es
  \\(y[k] + a_1\\,y[k-1] + a_2\\,y[k-2] = b_0\\,u[k] + b_1\\,u[k-1]\\), con
  \\(G(z) = z(b_0 z + b_1)/(z^2 + a_1 z + a_2)\\). Prueba lo siguiente:
</p>
<ul>
  <li>Disminuye \\(a_1\\) hacia \\(-1.8\\): los polos se juntan, chocan en el eje real y se vuelven complejos conjugados.</li>
  <li>Lleva \\(a_2\\) por encima de \\(1\\): el producto de los polos es \\(p_1 p_2 = a_2\\), así que salen del círculo unitario y el marcador se vuelve rojo.</li>
  <li>Observa la espiral: es la secuencia \\(p_1^{\\,k}\\). Con polos complejos gira (oscila) y con \\(|p_1| &lt; 1\\) se cierra hacia el eje (decae).</li>
</ul>
<div data-viz="planoZ" data-preset="servo"></div>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Propiedad — relaciones de Vieta para orden 2</span>
  <p>
    Para \\(z^2 + a_1 z + a_2 = (z - p_1)(z - p_2)\\): \\(\\;p_1 + p_2 = -a_1\\;\\) y \\(\\;p_1\\,p_2 = a_2\\). Con polos
    complejos \\(p_{1,2} = r\\,e^{\\pm j\\theta}\\) resulta \\(a_2 = r^2\\): <strong>el coeficiente \\(a_2\\) controla
    directamente el radio</strong>, y la estabilidad exige \\(|a_2| &lt; 1\\).
  </p>
</div>

<h2 id="canonica">5. Forma canónica en espacio de estados</h2>
<p>
  La misma ecuación puede escribirse como un sistema de primer orden vectorial. Eligiendo como estados las salidas de
  los retardos de la <em>forma directa II</em>, se llega a la <strong>forma canónica controlable</strong> (para
  \\(n = 2\\)):
</p>
\\[
\\mathbf{x}[k+1] = \\begin{bmatrix} 0 & 1 \\\\ -a_2 & -a_1 \\end{bmatrix} \\mathbf{x}[k] + \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} u[k],
\\qquad
y[k] = \\begin{bmatrix} b_2 - a_2 b_0 & \\; b_1 - a_1 b_0 \\end{bmatrix} \\mathbf{x}[k] + b_0\\,u[k]
\\]
<p>
  Los valores propios de la matriz de estado coinciden con los polos de \\(G(z)\\): las tres representaciones
  (recursiva, función de transferencia y espacio de estados) describen exactamente el mismo sistema.
</p>

<div class="table-wrap">
  <table>
    <caption class="visually-hidden">Comparación de representaciones</caption>
    <thead>
      <tr><th scope="col">Representación</th><th scope="col">Forma</th><th scope="col">Útil para…</th></tr>
    </thead>
    <tbody>
      <tr><td>Recursiva</td><td>\\(y[k] = -\\sum a_i y[k-i] + \\sum b_j u[k-j]\\)</td><td>Implementar en firmware; simular.</td></tr>
      <tr><td>Operador / transferencia</td><td>\\(G(z) = B(z^{-1})/A(z^{-1})\\)</td><td>Polos, ceros, estabilidad, respuesta en frecuencia.</td></tr>
      <tr><td>Espacio de estados</td><td>\\(\\mathbf{x}[k+1] = \\mathbf{A}\\mathbf{x}[k] + \\mathbf{B}u[k]\\)</td><td>Sistemas multivariables, observadores, control moderno.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Atención — dos convenciones de signo</span>
  <p>
    Algunos textos escriben \\(y[k] = a_1 y[k-1] + a_2 y[k-2] + \\dots\\) (coeficientes con signo opuesto). En este curso,
    como en Ogata, los \\(a_i\\) van <em>del lado de la salida</em>: \\(y[k] + a_1 y[k-1] + \\dots\\). Revisa siempre la
    convención antes de copiar coeficientes de una tabla o de MATLAB (<code>filter(b, a, u)</code> usa la misma que
    nosotros con \\(a = [1, a_1, a_2]\\)).
  </p>
</div>
`,objetivos:[`Escribir una ecuación en diferencias LTI en forma general, recursiva y con el operador \\(z^{-1}\\).`,`Obtener la función de transferencia pulso \\(G(z)\\) y ubicar sus polos y ceros.`,`Relacionar los coeficientes \\(a_1, a_2\\) con la posición de los polos respecto al círculo unitario.`,`Reconocer la forma canónica controlable en espacio de estados.`],presets:{servo:{params:{a1:-1.3,a2:.4,b0:1,b1:0}}}});export{t as default};